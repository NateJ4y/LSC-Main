import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import { listAssets, saveAsset, deleteAsset, restoreAssetsOnBoot } from './server/assetHandler';

function assetApiPlugin(): Plugin {
  return {
    name: 'asset-api-plugin',
    configureServer(server) {
      restoreAssetsOnBoot();

      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        
        if (url === '/api/health') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
          return;
        }

        if (url === '/api/assets') {
          res.setHeader('Content-Type', 'application/json');
          try {
            const assets = listAssets();
            res.end(JSON.stringify({ assets, count: assets.length }));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        if (url === '/api/admin/assets/upload' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { filename, base64Data } = JSON.parse(body);
              if (!filename || !base64Data) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Both filename and base64Data required' }));
                return;
              }
              const result = saveAsset(filename, base64Data);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, ...result }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (url === '/api/admin/assets/batch-upload' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { files } = JSON.parse(body);
              const results = (files || []).map((f: any) => saveAsset(f.filename, f.base64Data));
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, count: results.length, results }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (url.startsWith('/api/admin/assets/') && req.method === 'DELETE') {
          const filename = decodeURIComponent(url.replace('/api/admin/assets/', ''));
          const success = deleteAsset(filename);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success }));
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), assetApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
