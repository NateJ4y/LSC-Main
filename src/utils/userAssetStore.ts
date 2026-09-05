// Store for authentic customer images & brand assets
// Strictly compliant with AGENTS.md: original assets only, no AI manipulation, no CSS filters
// Synchronized with permanent server-side storage via /api/assets

export const OFFICIAL_LOGO_FILENAME = 'Logo-removebg-preview.png';

export const LOGO_ALIASES = [
  'Logo-removebg-preview.png',
  'logo-removebg-preview.png',
  'Logo-removebg.png',
  'logo-removebg.png',
  'Logo.png',
  'logo.png',
  'Logo.jpeg',
  'logo.svg'
] as const;

export const AUTHENTIC_IMAGE_FILENAMES = [
  'WhatsApp Image 2026-08-31 at 8.08.53 AM.jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.54 AM.jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.55 AM (1).jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.55 AM (2).jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.55 AM.jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.56 AM (1).jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.56 AM (2).jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.56 AM.jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.57 AM (1).jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.57 AM (2).jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.57 AM.jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.58 AM (1).jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.58 AM.jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.59 AM (1).jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.59 AM (2).jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.59 AM.jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.00 AM (1).jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.00 AM.jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.01 AM (1).jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.01 AM (2).jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.01 AM (3).jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.01 AM.jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.02 AM (1).jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.02 AM (2).jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.03 AM (1).jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.03 AM (2).jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.03 AM (3).jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.03 AM.jpeg',
] as const;

export type AuthenticImageFilename = (typeof AUTHENTIC_IMAGE_FILENAMES)[number];

export interface ServerAssetInfo {
  filename: string;
  url: string;
  size: number;
  updatedAt: string;
  isLogo: boolean;
  storage?: string;
}

// In-memory cache for loaded image URLs
const loadedBlobUrls = new Map<string, string>();
const serverAssetsRegistry = new Map<string, ServerAssetInfo>();
const listeners = new Set<() => void>();
let currentStorageType: 'netlify-blobs' | 'server-disk' | 'local-cache' = 'local-cache';

export function getNetlifyConfig(): { siteId: string; token: string } {
  if (typeof window === 'undefined') return { siteId: '', token: '' };
  return {
    siteId: localStorage.getItem('netlify_site_id') || '',
    token: localStorage.getItem('netlify_blobs_token') || '',
  };
}

export function saveNetlifyConfig(siteId: string, token: string): void {
  if (typeof window === 'undefined') return;
  if (siteId) localStorage.setItem('netlify_site_id', siteId.trim());
  else localStorage.removeItem('netlify_site_id');

  if (token) localStorage.setItem('netlify_blobs_token', token.trim());
  else localStorage.removeItem('netlify_blobs_token');

  syncAssetsFromServer();
}

function getRequestHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const { siteId, token } = getNetlifyConfig();
  if (siteId) headers['x-netlify-site-id'] = siteId;
  if (token) headers['x-netlify-blobs-token'] = token;
  return headers;
}

export function getActiveStorageType(): 'netlify-blobs' | 'server-disk' | 'local-cache' {
  return currentStorageType;
}

// Helper to query API with Netlify Functions fallback
async function fetchApi(path: string, init?: RequestInit): Promise<Response> {
  const headers = {
    ...getRequestHeaders(),
    ...(init?.headers || {})
  };

  try {
    const res = await fetch(path, { ...init, headers });
    if (res.ok || res.status !== 404) {
      return res;
    }
  } catch (err) {
    // If primary failed, try direct netlify function path
  }

  // Fallback to direct Netlify Functions path
  const functionPath = path.startsWith('/api/') 
    ? path.replace('/api/', '/.netlify/functions/api/')
    : `/.netlify/functions/api${path}`;

  return fetch(functionPath, { ...init, headers });
}

// Hydrate from localStorage as initial instant fallback
if (typeof window !== 'undefined') {
  try {
    const cachedLogo = localStorage.getItem(`asset:${OFFICIAL_LOGO_FILENAME}`);
    if (cachedLogo) {
      loadedBlobUrls.set(OFFICIAL_LOGO_FILENAME, cachedLogo);
      LOGO_ALIASES.forEach(alias => loadedBlobUrls.set(alias, cachedLogo));
    }

    AUTHENTIC_IMAGE_FILENAMES.forEach(name => {
      const saved = localStorage.getItem(`asset:${name}`);
      if (saved) {
        loadedBlobUrls.set(name, saved);
      }
    });
  } catch {}
}

// Test Netlify Blobs connection health
export async function testNetlifyBlobsConnection(): Promise<{ ok: boolean; message: string; details?: any }> {
  try {
    const res = await fetchApi('/api/health');
    if (!res.ok) {
      return { ok: false, message: `Server responded with status ${res.status}` };
    }
    const data = await res.json();
    return { ok: true, message: 'Connected to Netlify Blobs API successfully!', details: data };
  } catch (err: any) {
    return { ok: false, message: `Failed to connect to API: ${err.message || String(err)}` };
  }
}

// Query the server API to discover all permanently stored assets
export async function syncAssetsFromServer(): Promise<ServerAssetInfo[]> {
  try {
    const res = await fetchApi('/api/assets');
    if (!res.ok) return [];
    const data = await res.json();
    const assets: ServerAssetInfo[] = data.assets || [];

    if (data.storage === 'netlify-blobs') {
      currentStorageType = 'netlify-blobs';
    } else {
      currentStorageType = 'server-disk';
    }

    assets.forEach((asset) => {
      serverAssetsRegistry.set(asset.filename, asset);
      loadedBlobUrls.set(asset.filename, asset.url);

      if (asset.isLogo || asset.filename === OFFICIAL_LOGO_FILENAME) {
        LOGO_ALIASES.forEach(alias => {
          loadedBlobUrls.set(alias, asset.url);
        });
      }
    });

    listeners.forEach(fn => fn());

    // Check if browser has cached assets that are not yet on the server filesystem
    if (typeof window !== 'undefined') {
      const cachedCount = getBrowserCachedAssetsCount();
      if (cachedCount > 0 && assets.length < cachedCount) {
        // Automatically sync browser cache to server filesystem in background
        setTimeout(() => {
          syncBrowserCacheToRepository().catch(e => console.warn('Auto-sync browser cache failed:', e));
        }, 1000);
      }
    }

    return assets;
  } catch (err) {
    console.warn('[AssetStore] Server asset sync skipped (offline/static):', err);
    return [];
  }
}

export function getBrowserCachedAssetsCount(): number {
  if (typeof window === 'undefined') return 0;
  let count = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('asset:')) {
        const val = localStorage.getItem(key);
        if (val && val.startsWith('data:')) count++;
      }
    }
  } catch {}
  return count;
}

// Sync all browser cached assets directly to the server's public/images and public/assets filesystem
export async function syncBrowserCacheToRepository(): Promise<{ count: number; syncedFiles: string[]; message?: string }> {
  if (typeof window === 'undefined') return { count: 0, syncedFiles: [] };

  const filesToSync: Array<{ filename: string; base64Data: string }> = [];

  // 1. Check official logo
  const cachedLogo = localStorage.getItem(`asset:${OFFICIAL_LOGO_FILENAME}`);
  if (cachedLogo && cachedLogo.startsWith('data:')) {
    filesToSync.push({ filename: OFFICIAL_LOGO_FILENAME, base64Data: cachedLogo });
  }

  // 2. Check authentic workshop filenames
  AUTHENTIC_IMAGE_FILENAMES.forEach(name => {
    const cached = localStorage.getItem(`asset:${name}`);
    if (cached && cached.startsWith('data:') && !filesToSync.some(f => f.filename === name)) {
      filesToSync.push({ filename: name, base64Data: cached });
    }
  });

  // 3. Check any other custom asset keys in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('asset:')) {
      const filename = key.replace('asset:', '');
      if (!filesToSync.some(f => f.filename === filename)) {
        const val = localStorage.getItem(key);
        if (val && val.startsWith('data:')) {
          filesToSync.push({ filename, base64Data: val });
        }
      }
    }
  }

  if (filesToSync.length === 0) {
    return { count: 0, syncedFiles: [], message: 'No cached browser assets to sync.' };
  }

  try {
    const res = await fetchApi('/api/admin/assets/sync-browser-cache', {
      method: 'POST',
      body: JSON.stringify({ files: filesToSync }),
    });

    if (res.ok) {
      const data = await res.json();
      await syncAssetsFromServer();
      return { 
        count: data.count || filesToSync.length, 
        syncedFiles: data.syncedFiles || filesToSync.map(f => f.filename),
        message: data.message
      };
    }
  } catch (err: any) {
    console.warn('[AssetStore] Browser cache push failed:', err);
  }

  return { count: 0, syncedFiles: [] };
}

// Auto sync on client initialization
if (typeof window !== 'undefined') {
  syncAssetsFromServer();
}

export function getAuthenticImageUrl(filename: string): string {
  // If registered in cache, use that
  if (loadedBlobUrls.has(filename)) {
    return loadedBlobUrls.get(filename)!;
  }
  
  // If it's the logo, check canonical path
  if (filename === OFFICIAL_LOGO_FILENAME || LOGO_ALIASES.includes(filename as any)) {
    return `/${OFFICIAL_LOGO_FILENAME}`;
  }

  // Direct clean server path
  return `/images/${encodeURIComponent(filename)}`;
}

export function registerUserUploadedAsset(filename: string, objectUrlOrDataUrl: string): void {
  loadedBlobUrls.set(filename, objectUrlOrDataUrl);
  const cleanName = filename.trim();
  loadedBlobUrls.set(cleanName, objectUrlOrDataUrl);

  const isLogo = LOGO_ALIASES.some(alias => alias.toLowerCase() === filename.toLowerCase());
  if (isLogo) {
    LOGO_ALIASES.forEach(alias => loadedBlobUrls.set(alias, objectUrlOrDataUrl));
  }

  if (typeof window !== 'undefined' && objectUrlOrDataUrl.startsWith('data:')) {
    try {
      localStorage.setItem(`asset:${filename}`, objectUrlOrDataUrl);
      if (isLogo) {
        localStorage.setItem(`asset:${OFFICIAL_LOGO_FILENAME}`, objectUrlOrDataUrl);
      }
    } catch {}
  }
  
  listeners.forEach(fn => fn());
}

// Upload an asset permanently to the Netlify Blobs / server backend
export async function uploadAssetToServer(filename: string, base64Data: string): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const res = await fetchApi('/api/admin/assets/upload', {
      method: 'POST',
      body: JSON.stringify({ filename, base64Data }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Server upload failed');
    }

    const finalUrl = data.url || `/api/blob/${encodeURIComponent(filename)}`;
    registerUserUploadedAsset(filename, finalUrl);

    // Also persist dataUrl locally so it's instant everywhere
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`asset:${filename}`, base64Data);
        if (filename === OFFICIAL_LOGO_FILENAME) {
          localStorage.setItem(`asset:${OFFICIAL_LOGO_FILENAME}`, base64Data);
        }
      } catch {}
    }

    await syncAssetsFromServer();
    return { success: true, url: finalUrl };
  } catch (err: any) {
    console.error('Failed to upload asset to server:', err);
    // Fallback: register locally in session and localStorage
    registerUserUploadedAsset(filename, base64Data);
    return { success: false, error: err.message };
  }
}

// Batch upload multiple assets permanently to Netlify Blobs / server backend
export async function batchUploadAssetsToServer(
  files: Array<{ filename: string; base64Data: string }>
): Promise<{ success: boolean; count: number; errors?: string[] }> {
  try {
    const res = await fetchApi('/api/admin/assets/batch-upload', {
      method: 'POST',
      body: JSON.stringify({ files }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Batch upload failed');

    // Register all locally
    files.forEach(f => {
      registerUserUploadedAsset(f.filename, f.base64Data);
    });

    await syncAssetsFromServer();
    return { success: true, count: files.length };
  } catch (err: any) {
    console.error('Batch upload error:', err);
    // Fallback: register all locally
    files.forEach(f => {
      registerUserUploadedAsset(f.filename, f.base64Data);
    });
    return { success: false, count: files.length, errors: [err.message] };
  }
}

export async function deleteAssetFromServer(filename: string): Promise<boolean> {
  try {
    const res = await fetchApi(`/api/admin/assets/${encodeURIComponent(filename)}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    loadedBlobUrls.delete(filename);
    serverAssetsRegistry.delete(filename);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`asset:${filename}`);
    }
    listeners.forEach(fn => fn());
    return data.success;
  } catch {
    return false;
  }
}

export function subscribeToAssetChanges(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function hasUserUploadedAsset(filename: string): boolean {
  if (serverAssetsRegistry.has(filename)) return true;
  if (loadedBlobUrls.has(filename)) return true;
  const isLogo = LOGO_ALIASES.some(alias => alias.toLowerCase() === filename.toLowerCase());
  if (isLogo && (loadedBlobUrls.has(OFFICIAL_LOGO_FILENAME) || serverAssetsRegistry.has(OFFICIAL_LOGO_FILENAME))) return true;
  return false;
}

export function getServerAssetsList(): ServerAssetInfo[] {
  return Array.from(serverAssetsRegistry.values());
}
