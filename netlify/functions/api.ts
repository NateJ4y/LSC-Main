import { getStore } from '@netlify/blobs';
import { Buffer } from 'node:buffer';

export const config = {
  path: ['/api/*', '/blob/*']
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-netlify-blobs-token, x-netlify-site-id',
};

function getMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  switch (ext) {
    case 'png': return 'image/png';
    case 'jpg':
    case 'jpeg': return 'image/jpeg';
    case 'webp': return 'image/webp';
    case 'svg': return 'image/svg+xml';
    case 'gif': return 'image/gif';
    default: return 'application/octet-stream';
  }
}

function getBlobStore(req: Request) {
  const customToken = req.headers.get('x-netlify-blobs-token') || process.env.NETLIFY_BLOBS_TOKEN;
  const customSiteID = req.headers.get('x-netlify-site-id') || process.env.NETLIFY_SITE_ID;

  const options: any = {
    name: 'lifestyle-assets',
    consistency: 'strong',
  };
  if (customSiteID) options.siteID = customSiteID;
  if (customToken) options.token = customToken;

  return getStore(options);
}

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const url = new URL(req.url);
  let subpath = url.pathname;

  // Normalize path if rewritten from Netlify redirects or /api
  if (subpath.startsWith('/.netlify/functions/api')) {
    subpath = subpath.replace('/.netlify/functions/api', '');
  } else if (subpath.startsWith('/api')) {
    subpath = subpath.replace('/api', '');
  }

  if (!subpath.startsWith('/')) {
    subpath = '/' + subpath;
  }

  try {
    // 1. Health check
    if (subpath === '/health') {
      return new Response(JSON.stringify({
        status: 'ok',
        service: 'Netlify Blobs API',
        store: 'lifestyle-assets',
        time: new Date().toISOString(),
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 2. GET /assets -> list all stored assets from Netlify Blobs
    if (subpath === '/assets' && req.method === 'GET') {
      const store = getBlobStore(req);
      const { blobs } = await store.list();
      
      const assets = await Promise.all(
        blobs.map(async (b) => {
          try {
            const meta = await store.getMetadata(b.key);
            const metadata = (meta?.metadata || {}) as Record<string, any>;
            const isLogo = b.key.toLowerCase().includes('logo') || b.key === 'Logo-removebg-preview.png';
            return {
              filename: b.key,
              url: `/api/blob/${encodeURIComponent(b.key)}`,
              size: Number(metadata.size) || 0,
              updatedAt: (metadata.updatedAt as string) || new Date().toISOString(),
              isLogo,
              storage: 'netlify-blob'
            };
          } catch {
            return {
              filename: b.key,
              url: `/api/blob/${encodeURIComponent(b.key)}`,
              size: 0,
              updatedAt: new Date().toISOString(),
              isLogo: b.key.toLowerCase().includes('logo'),
              storage: 'netlify-blob'
            };
          }
        })
      );

      return new Response(JSON.stringify({
        assets,
        count: assets.length,
        storage: 'netlify-blobs',
        storeName: 'lifestyle-assets'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 3. GET /blob/:filename -> Serve raw image binary directly from Netlify Blobs
    if (subpath.startsWith('/blob/') && req.method === 'GET') {
      const rawFilename = subpath.replace(/^\/blob\//, '');
      const filename = decodeURIComponent(rawFilename);
      const store = getBlobStore(req);

      const arrayBuf = await store.get(filename, { type: 'arrayBuffer' });
      if (!arrayBuf) {
        return new Response('Asset not found in Netlify Blobs', {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
        });
      }

      let mimeType = getMimeType(filename);
      try {
        const meta = await store.getMetadata(filename);
        if (meta?.metadata?.contentType) {
          mimeType = meta.metadata.contentType as string;
        }
      } catch {}

      return new Response(arrayBuf, {
        headers: {
          ...corsHeaders,
          'Content-Type': mimeType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        }
      });
    }

    // 4. POST /admin/assets/upload -> Save single asset to Netlify Blobs
    if (subpath === '/admin/assets/upload' && req.method === 'POST') {
      const body = await req.json();
      const { filename, base64Data } = body;

      if (!filename || !base64Data) {
        return new Response(JSON.stringify({ error: 'Both filename and base64Data are required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const cleanFilename = filename.trim();
      const base64Content = base64Data.replace(/^data:[^;]+;base64,/, '');
      const binaryData = Buffer.from(base64Content, 'base64');
      const mimeType = getMimeType(cleanFilename);
      const isLogo = cleanFilename.toLowerCase().includes('logo') || cleanFilename === 'Logo-removebg-preview.png';

      const store = getBlobStore(req);
      await store.set(cleanFilename, binaryData, {
        metadata: {
          filename: cleanFilename,
          contentType: mimeType,
          size: binaryData.length,
          updatedAt: new Date().toISOString(),
          isLogo,
        }
      });

      // If this is a logo, also set canonical key
      if (isLogo && cleanFilename !== 'Logo-removebg-preview.png') {
        await store.set('Logo-removebg-preview.png', binaryData, {
          metadata: {
            filename: 'Logo-removebg-preview.png',
            contentType: mimeType,
            size: binaryData.length,
            updatedAt: new Date().toISOString(),
            isLogo: true,
          }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        filename: cleanFilename,
        url: `/api/blob/${encodeURIComponent(cleanFilename)}`,
        size: binaryData.length,
        storage: 'netlify-blobs',
        storeName: 'lifestyle-assets'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 5. POST /admin/assets/batch-upload -> Save multiple assets to Netlify Blobs
    if (subpath === '/admin/assets/batch-upload' && req.method === 'POST') {
      const body = await req.json();
      const files = body.files || [];
      const store = getBlobStore(req);
      const results = [];

      for (const f of files) {
        if (!f.filename || !f.base64Data) continue;
        const cleanFilename = f.filename.trim();
        const base64Content = f.base64Data.replace(/^data:[^;]+;base64,/, '');
        const binaryData = Buffer.from(base64Content, 'base64');
        const mimeType = getMimeType(cleanFilename);
        const isLogo = cleanFilename.toLowerCase().includes('logo') || cleanFilename === 'Logo-removebg-preview.png';

        await store.set(cleanFilename, binaryData, {
          metadata: {
            filename: cleanFilename,
            contentType: mimeType,
            size: binaryData.length,
            updatedAt: new Date().toISOString(),
            isLogo,
          }
        });

        if (isLogo && cleanFilename !== 'Logo-removebg-preview.png') {
          await store.set('Logo-removebg-preview.png', binaryData, {
            metadata: {
              filename: 'Logo-removebg-preview.png',
              contentType: mimeType,
              size: binaryData.length,
              updatedAt: new Date().toISOString(),
              isLogo: true,
            }
          });
        }

        results.push({
          filename: cleanFilename,
          url: `/api/blob/${encodeURIComponent(cleanFilename)}`,
          success: true
        });
      }

      return new Response(JSON.stringify({
        success: true,
        count: results.length,
        results,
        storage: 'netlify-blobs',
        storeName: 'lifestyle-assets'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // 6. DELETE /admin/assets/:filename -> Remove asset from Netlify Blobs
    if (subpath.startsWith('/admin/assets/') && req.method === 'DELETE') {
      const rawFilename = subpath.replace(/^\/admin\/assets\//, '');
      const filename = decodeURIComponent(rawFilename);
      const store = getBlobStore(req);
      await store.delete(filename);

      if (filename.toLowerCase().includes('logo')) {
        try {
          await store.delete('Logo-removebg-preview.png');
        } catch {}
      }

      return new Response(JSON.stringify({ success: true, deleted: filename }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Endpoint not found', subpath }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Netlify Blobs API error:', err);
    return new Response(JSON.stringify({
      error: err.message || 'Internal error in Netlify Blobs API',
      details: String(err)
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
