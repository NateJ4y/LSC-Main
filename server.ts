import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { listAssets, saveAsset, deleteAsset, restoreAssetsOnBoot, getAsset } from './server/assetHandler';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser with generous limit for high-resolution images
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Ensure persistent assets are restored to public/ on server startup
  restoreAssetsOnBoot();

  // Explicitly serve static public assets so /images/* and /Logo-removebg-preview.png are instantly reachable
  const publicDir = path.join(process.cwd(), 'public');
  app.use(express.static(publicDir));
  app.use('/images', express.static(path.join(publicDir, 'images')));

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Get all active assets on the server
  app.get('/api/assets', (req, res) => {
    try {
      const assets = listAssets();
      res.json({ assets, count: assets.length, storage: 'local-and-blobs' });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to list assets' });
    }
  });

  // Serve image blob directly
  app.get(['/api/blob/:filename', '/blob/:filename'], (req, res) => {
    try {
      const { filename } = req.params;
      const cleanFilename = decodeURIComponent(filename);
      const asset = getAsset(cleanFilename);
      if (!asset) {
        return res.status(404).send('Asset not found');
      }
      res.setHeader('Content-Type', asset.mimeType);
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return res.send(asset.buffer);
    } catch (err: any) {
      return res.status(500).send('Error serving blob');
    }
  });

  // Upload single asset (admin only)
  app.post('/api/admin/assets/upload', (req, res) => {
    try {
      const { filename, base64Data } = req.body;
      if (!filename || !base64Data) {
        return res.status(400).json({ error: 'Both filename and base64Data are required' });
      }

      const result = saveAsset(filename, base64Data);
      console.log(`[Admin Asset Upload] Saved ${filename} permanently to server.`);
      return res.json({ success: true, ...result });
    } catch (err: any) {
      console.error('Error saving asset:', err);
      return res.status(500).json({ error: err.message || 'Failed to save asset' });
    }
  });

  // Batch upload assets (admin only)
  app.post('/api/admin/assets/batch-upload', (req, res) => {
    try {
      const { files } = req.body;
      if (!Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ error: 'files array is required' });
      }

      const results = files.map((f: { filename: string; base64Data: string }) => {
        if (f.filename && f.base64Data) {
          return saveAsset(f.filename, f.base64Data);
        }
        return { success: false, filename: f.filename, error: 'Missing data' };
      });

      console.log(`[Admin Batch Upload] Saved ${results.filter(r => r.success).length} assets permanently to server.`);
      return res.json({ success: true, count: results.length, results });
    } catch (err: any) {
      console.error('Error in batch upload:', err);
      return res.status(500).json({ error: err.message || 'Failed to save batch assets' });
    }
  });

  // Delete an asset
  app.delete('/api/admin/assets/:filename', (req, res) => {
    try {
      const { filename } = req.params;
      const success = deleteAsset(filename);
      return res.json({ success });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to delete asset' });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lifestyle Seat Covers Full-Stack Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
