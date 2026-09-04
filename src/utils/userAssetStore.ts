// Store for authentic customer images & brand assets
// Strictly compliant with AGENTS.md: original assets only, no AI manipulation, no CSS filters

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

// In-memory cache for loaded image data URLs or object URLs
const loadedBlobUrls = new Map<string, string>();
const listeners = new Set<() => void>();

// Hydrate from localStorage if present
if (typeof window !== 'undefined') {
  try {
    // Check for cached logo
    const cachedLogo = localStorage.getItem(`asset:${OFFICIAL_LOGO_FILENAME}`);
    if (cachedLogo) {
      loadedBlobUrls.set(OFFICIAL_LOGO_FILENAME, cachedLogo);
      LOGO_ALIASES.forEach(alias => loadedBlobUrls.set(alias, cachedLogo));
    }

    // Check for cached photos
    AUTHENTIC_IMAGE_FILENAMES.forEach(name => {
      const saved = localStorage.getItem(`asset:${name}`);
      if (saved) {
        loadedBlobUrls.set(name, saved);
      }
    });
  } catch {
    // Ignore localStorage errors
  }
}

export function getAuthenticImageUrl(filename: string): string {
  // If user dropped or loaded the image dynamically, use that
  if (loadedBlobUrls.has(filename)) {
    return loadedBlobUrls.get(filename)!;
  }
  // Try checking clean path or direct path
  return `/images/${filename}`;
}

export function registerUserUploadedAsset(filename: string, objectUrlOrDataUrl: string): void {
  loadedBlobUrls.set(filename, objectUrlOrDataUrl);
  // Also match normalized filename if without whitespace or slight variations
  const cleanName = filename.trim();
  loadedBlobUrls.set(cleanName, objectUrlOrDataUrl);

  // If this is the logo or any alias, map all logo aliases
  const isLogo = LOGO_ALIASES.some(alias => alias.toLowerCase() === filename.toLowerCase());
  if (isLogo) {
    LOGO_ALIASES.forEach(alias => loadedBlobUrls.set(alias, objectUrlOrDataUrl));
  }

  // Persist to localStorage if it's a data URL or small string
  if (typeof window !== 'undefined' && objectUrlOrDataUrl.startsWith('data:')) {
    try {
      localStorage.setItem(`asset:${filename}`, objectUrlOrDataUrl);
      if (isLogo) {
        localStorage.setItem(`asset:${OFFICIAL_LOGO_FILENAME}`, objectUrlOrDataUrl);
      }
    } catch {
      // Storage quota reached, in-memory cache remains active
    }
  }
  
  // Notify subscribers
  listeners.forEach(fn => fn());
}

export function subscribeToAssetChanges(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function hasUserUploadedAsset(filename: string): boolean {
  if (loadedBlobUrls.has(filename)) return true;
  const isLogo = LOGO_ALIASES.some(alias => alias.toLowerCase() === filename.toLowerCase());
  if (isLogo && loadedBlobUrls.has(OFFICIAL_LOGO_FILENAME)) return true;
  return false;
}
