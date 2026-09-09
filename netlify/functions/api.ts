import { getStore } from '@netlify/blobs';
import { Buffer } from 'node:buffer';

export const config = { path: ['/api/*', '/blob/*'] };

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
  const options: any = { name: 'lifestyle-assets', consistency: 'strong' };
  if (customSiteID) options.siteID = customSiteID;
  if (customToken) options.token = customToken;
  return getStore(options);
}

function assetUrl(filename: string, updatedAt?: string) {
  const revision = updatedAt ? encodeURIComponent(updatedAt) : Date.now().toString();
  return `/api/blob/${encodeURIComponent(filename)}?v=${revision}`;
}

async function saveAsset(store: any, filename: string, base64Data: string) {
  const cleanFilename = filename.trim();
  const base64Content = base64Data.replace(/^data:[^;]+;base64,/, '');
  const binaryData = Buffer.from(base64Content, 'base64');
  const mimeType = getMimeType(cleanFilename);
  const isLogo = cleanFilename.toLowerCase().includes('logo') || cleanFilename === 'Logo-removebg-preview.png';
  const updatedAt = new Date().toISOString();

  await store.set(cleanFilename, binaryData, {
    metadata: {
      filename: cleanFilename,
      contentType: mimeType,
      size: binaryData.length,
      updatedAt,
      isLogo,
    }
  });

  if (isLogo && cleanFilename !== 'Logo-removebg-preview.png') {
    await store.set('Logo-removebg-preview.png', binaryData, {
      metadata: {
        filename: 'Logo-removebg-preview.png',
        contentType: mimeType,
        size: binaryData.length,
        updatedAt,
        isLogo: true,
      }
    });
  }

  return { cleanFilename, binaryData, mimeType, isLogo, updatedAt };
}

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });

  const url = new URL(req.url);
  let subpath = url.pathname;
  if (subpath.startsWith('/.netlify/functions/api')) subpath = subpath.replace('/.netlify/functions/api', '');
  else if (subpath.startsWith('/api')) subpath = subpath.replace('/api', '');
  if (!subpath.startsWith('/')) subpath = '/' + subpath;

  try {
    if (subpath === '/health') {
      return new Response(JSON.stringify({ status: 'ok', service: 'Netlify Blobs API', store: 'lifestyle-assets', time: new Date().toISOString() }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (subpath === '/assets' && req.method === 'GET') {
      const store = getBlobStore(req);
      const { blobs } = await store.list();
      const assets = await Promise.all(blobs.map(async (b: any) => {
        try {
          const meta = await store.getMetadata(b.key);
          const metadata = (meta?.metadata || {}) as Record<string, any>;
          const isLogo = b.key.toLowerCase().includes('logo') || b.key === 'Logo-removebg-preview.png';
          const updatedAt = (metadata.updatedAt as string) || new Date().toISOString();
          return {
            filename: b.key,
            url: assetUrl(b.key, updatedAt),
            size: Number(metadata.size) || 0,
            updatedAt,
            isLogo,
            storage: 'netlify-blob'
          };
        } catch {
          const updatedAt = new Date().toISOString();
          return { filename: b.key, url: assetUrl(b.key, updatedAt), size: 0, updatedAt, isLogo: b.key.toLowerCase().includes('logo'), storage: 'netlify-blob' };
        }
      }));
      return new Response(JSON.stringify({ assets, count: assets.length, storage: 'netlify-blobs', storeName: 'lifestyle-assets' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (subpath.startsWith('/blob/') && req.method === 'GET') {
      const rawFilename = subpath.replace(/^\/blob\//, '');
      const filename = decodeURIComponent(rawFilename);
      const store = getBlobStore(req);
      const arrayBuf = await store.get(filename, { type: 'arrayBuffer' });
      if (!arrayBuf) return new Response('Asset not found in Netlify Blobs', { status: 404, headers: { ...corsHeaders, 'Content-Type': 'text/plain' } });
      let mimeType = getMimeType(filename);
      try {
        const meta = await store.getMetadata(filename);
        if (meta?.metadata?.contentType) mimeType = meta.metadata.contentType as string;
      } catch {}
      return new Response(arrayBuf, {
        headers: { ...corsHeaders, 'Content-Type': mimeType, 'Cache-Control': 'public, max-age=31536000, must-revalidate' }
      });
    }

    if (subpath === '/admin/assets/upload' && req.method === 'POST') {
      const body = await req.json();
      const { filename, base64Data } = body;
      if (!filename || !base64Data) return new Response(JSON.stringify({ error: 'Both filename and base64Data are required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      const store = getBlobStore(req);
      const saved = await saveAsset(store, filename, base64Data);
      return new Response(JSON.stringify({ success: true, filename: saved.cleanFilename, url: assetUrl(saved.cleanFilename, saved.updatedAt), size: saved.binaryData.length, storage: 'netlify-blobs', storeName: 'lifestyle-assets', updatedAt: saved.updatedAt }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (subpath === '/admin/assets/batch-upload' && req.method === 'POST') {
      const body = await req.json();
      const files = body.files || [];
      const store = getBlobStore(req);
      const results = [];
      for (const f of files) {
        if (!f.filename || !f.base64Data) continue;
        const saved = await saveAsset(store, f.filename, f.base64Data);
        results.push({ filename: saved.cleanFilename, url: assetUrl(saved.cleanFilename, saved.updatedAt), success: true });
      }
      return new Response(JSON.stringify({ success: true, count: results.length, results, storage: 'netlify-blobs', storeName: 'lifestyle-assets' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (subpath.startsWith('/admin/assets/') && req.method === 'DELETE') {
      const rawFilename = subpath.replace(/^\/admin\/assets\//, '');
      const filename = decodeURIComponent(rawFilename);
      const store = getBlobStore(req);
      await store.delete(filename);
      if (filename.toLowerCase().includes('logo')) {
        try { await store.delete('Logo-removebg-preview.png'); } catch {}
      }
      return new Response(JSON.stringify({ success: true, deleted: filename }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Endpoint not found', subpath }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err: any) {
    console.error('Netlify Blobs API error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal error in Netlify Blobs API', details: String(err) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
}
