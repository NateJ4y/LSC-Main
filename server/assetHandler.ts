import fs from 'fs';
import path from 'path';

// Standard directories
const CWD = process.cwd();
const PUBLIC_DIR = path.join(CWD, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const DATA_DIR = path.join(CWD, 'data');
const STORE_FILE = path.join(DATA_DIR, 'assets-store.json');

// Ensure required directories exist
function ensureDirs() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory / persistent registry
interface StoredAsset {
  filename: string;
  base64Data: string;
  size: number;
  updatedAt: string;
}

function loadStore(): Record<string, StoredAsset> {
  ensureDirs();
  if (fs.existsSync(STORE_FILE)) {
    try {
      const data = fs.readFileSync(STORE_FILE, 'utf-8');
      return JSON.parse(data);
    } catch {
      return {};
    }
  }
  return {};
}

function saveStore(store: Record<string, StoredAsset>) {
  ensureDirs();
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write assets-store.json:', err);
  }
}

// Restore all saved assets into public/ and public/images/ on startup
export function restoreAssetsOnBoot() {
  ensureDirs();
  const store = loadStore();
  const filenames = Object.keys(store);

  for (const filename of filenames) {
    const item = store[filename];
    if (!item?.base64Data) continue;

    try {
      const base64Content = item.base64Data.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Content, 'base64');
      
      const targetPath = path.join(IMAGES_DIR, filename);
      if (!fs.existsSync(targetPath)) {
        fs.writeFileSync(targetPath, buffer);
      }

      // If logo, ensure it's also at public root
      if (filename.toLowerCase().includes('logo') || filename === 'Logo-removebg-preview.png') {
        const rootLogoPath = path.join(PUBLIC_DIR, filename);
        if (!fs.existsSync(rootLogoPath)) {
          fs.writeFileSync(rootLogoPath, buffer);
        }
        const canonicalLogoPath = path.join(PUBLIC_DIR, 'Logo-removebg-preview.png');
        if (!fs.existsSync(canonicalLogoPath)) {
          fs.writeFileSync(canonicalLogoPath, buffer);
        }
      }
    } catch (e) {
      console.error(`Failed restoring asset ${filename}:`, e);
    }
  }
}

// Run boot restore
restoreAssetsOnBoot();

export interface AssetInfo {
  filename: string;
  url: string;
  size: number;
  updatedAt: string;
  isLogo: boolean;
}

export function listAssets(): AssetInfo[] {
  ensureDirs();
  const store = loadStore();
  const results: AssetInfo[] = [];
  const foundNames = new Set<string>();

  // 1. Files currently in public/images
  if (fs.existsSync(IMAGES_DIR)) {
    const files = fs.readdirSync(IMAGES_DIR);
    for (const f of files) {
      if (f.startsWith('.')) continue;
      const fullPath = path.join(IMAGES_DIR, f);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isFile()) {
          foundNames.add(f);
          const isLogo = f.toLowerCase().includes('logo');
          results.push({
            filename: f,
            url: `/images/${encodeURIComponent(f)}`,
            size: stat.size,
            updatedAt: stat.mtime.toISOString(),
            isLogo,
          });
        }
      } catch {}
    }
  }

  // 2. Check canonical Logo in public root
  const rootLogo = path.join(PUBLIC_DIR, 'Logo-removebg-preview.png');
  if (fs.existsSync(rootLogo) && !foundNames.has('Logo-removebg-preview.png')) {
    try {
      const stat = fs.statSync(rootLogo);
      results.push({
        filename: 'Logo-removebg-preview.png',
        url: '/Logo-removebg-preview.png',
        size: stat.size,
        updatedAt: stat.mtime.toISOString(),
        isLogo: true,
      });
      foundNames.add('Logo-removebg-preview.png');
    } catch {}
  }

  // 3. Any in store not yet on disk
  for (const filename of Object.keys(store)) {
    if (!foundNames.has(filename)) {
      const item = store[filename];
      results.push({
        filename,
        url: `/images/${encodeURIComponent(filename)}`,
        size: item.size,
        updatedAt: item.updatedAt,
        isLogo: filename.toLowerCase().includes('logo'),
      });
      foundNames.add(filename);
    }
  }

  return results;
}

export function saveAsset(filename: string, base64Data: string): { success: boolean; filename: string; url: string } {
  ensureDirs();
  const cleanFilename = path.basename(filename);
  const base64Content = base64Data.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Content, 'base64');

  // Write to public/images/<filename>
  const targetPath = path.join(IMAGES_DIR, cleanFilename);
  fs.writeFileSync(targetPath, buffer);

  const isLogo = cleanFilename.toLowerCase().includes('logo') || cleanFilename === 'Logo-removebg-preview.png';

  // Also write to root of public/ if it's the logo
  if (isLogo) {
    fs.writeFileSync(path.join(PUBLIC_DIR, cleanFilename), buffer);
    fs.writeFileSync(path.join(PUBLIC_DIR, 'Logo-removebg-preview.png'), buffer);
  }

  // Save to permanent JSON store
  const store = loadStore();
  store[cleanFilename] = {
    filename: cleanFilename,
    base64Data,
    size: buffer.length,
    updatedAt: new Date().toISOString(),
  };
  saveStore(store);

  const publicUrl = isLogo && cleanFilename === 'Logo-removebg-preview.png' 
    ? '/Logo-removebg-preview.png' 
    : `/images/${encodeURIComponent(cleanFilename)}`;

  return {
    success: true,
    filename: cleanFilename,
    url: publicUrl,
  };
}

export function getMimeType(filename: string): string {
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

export function getAsset(filename: string): { buffer: Buffer; mimeType: string } | null {
  ensureDirs();
  const cleanFilename = path.basename(filename);
  
  // 1. Check public/images/<filename>
  const imagePath = path.join(IMAGES_DIR, cleanFilename);
  if (fs.existsSync(imagePath)) {
    try {
      return {
        buffer: fs.readFileSync(imagePath),
        mimeType: getMimeType(cleanFilename),
      };
    } catch {}
  }

  // 2. Check public/<filename>
  const rootPath = path.join(PUBLIC_DIR, cleanFilename);
  if (fs.existsSync(rootPath)) {
    try {
      return {
        buffer: fs.readFileSync(rootPath),
        mimeType: getMimeType(cleanFilename),
      };
    } catch {}
  }

  // 3. Check JSON store
  const store = loadStore();
  if (store[cleanFilename]?.base64Data) {
    try {
      const base64Content = store[cleanFilename].base64Data.replace(/^data:[^;]+;base64,/, '');
      return {
        buffer: Buffer.from(base64Content, 'base64'),
        mimeType: getMimeType(cleanFilename),
      };
    } catch {}
  }

  return null;
}

export function deleteAsset(filename: string): boolean {
  ensureDirs();
  const cleanFilename = path.basename(filename);
  let removed = false;

  const imagePath = path.join(IMAGES_DIR, cleanFilename);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
    removed = true;
  }

  if (cleanFilename.toLowerCase().includes('logo')) {
    const rootPath = path.join(PUBLIC_DIR, cleanFilename);
    if (fs.existsSync(rootPath)) fs.unlinkSync(rootPath);
  }

  const store = loadStore();
  if (store[cleanFilename]) {
    delete store[cleanFilename];
    saveStore(store);
    removed = true;
  }

  return removed;
}
