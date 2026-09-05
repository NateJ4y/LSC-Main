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
  'WhatsApp Image 2026-08-31 at 8.08.57 AM (2).jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.57 AM.jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.59 AM (1).jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.59 AM (2).jpeg',
  'WhatsApp Image 2026-08-31 at 8.08.59 AM.jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.00 AM (1).jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.01 AM (1).jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.01 AM (2).jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.01 AM (3).jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.01 AM.jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.02 AM (1).jpeg',
  'WhatsApp Image 2026-08-31 at 8.09.02 AM (2).jpeg',
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
}

// In-memory cache for loaded image URLs
const loadedBlobUrls = new Map<string, string>();
const serverAssetsRegistry = new Map<string, ServerAssetInfo>();
const listeners = new Set<() => void>();

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

// Query the server API to discover all permanently stored assets
export async function syncAssetsFromServer(): Promise<ServerAssetInfo[]> {
  try {
    const res = await fetch('/api/assets');
    if (!res.ok) return [];
    const data = await res.json();
    const assets: ServerAssetInfo[] = data.assets || [];

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
    return assets;
  } catch (err) {
    console.warn('[AssetStore] Server asset sync skipped (offline/static):', err);
    return [];
  }
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

// Upload an asset permanently to the Express backend server
export async function uploadAssetToServer(filename: string, base64Data: string): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const res = await fetch('/api/admin/assets/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, base64Data }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Server upload failed');
    }

    const finalUrl = data.url || (filename === OFFICIAL_LOGO_FILENAME ? `/${OFFICIAL_LOGO_FILENAME}` : `/images/${encodeURIComponent(filename)}`);
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

// Batch upload multiple assets permanently to the server
export async function batchUploadAssetsToServer(
  files: Array<{ filename: string; base64Data: string }>
): Promise<{ success: boolean; count: number; errors?: string[] }> {
  try {
    const res = await fetch('/api/admin/assets/batch-upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    const res = await fetch(`/api/admin/assets/${encodeURIComponent(filename)}`, {
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
