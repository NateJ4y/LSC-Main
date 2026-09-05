import React, { useState, useEffect } from 'react';
import { 
  AUTHENTIC_IMAGE_FILENAMES, 
  OFFICIAL_LOGO_FILENAME, 
  LOGO_ALIASES,
  uploadAssetToServer, 
  batchUploadAssetsToServer, 
  deleteAssetFromServer,
  syncAssetsFromServer,
  hasUserUploadedAsset,
  getAuthenticImageUrl,
  ServerAssetInfo
} from '../utils/userAssetStore';
import { 
  ShieldCheck, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  FolderUp, 
  Trash2, 
  ArrowLeft, 
  RefreshCw, 
  Server, 
  HardDrive, 
  Image as ImageIcon,
  ExternalLink,
  Lock,
  Sparkles,
  Info
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [serverAssets, setServerAssets] = useState<ServerAssetInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'images' | 'info'>('images');
  const [filter, setFilter] = useState<'all' | 'uploaded' | 'missing'>('all');
  const [isSyncing, setIsSyncing] = useState(false);

  const refreshAssets = async () => {
    setIsSyncing(true);
    const assets = await syncAssetsFromServer();
    setServerAssets(assets);
    setIsSyncing(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshAssets();
    }
  }, [isAuthenticated]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Only authorized staff PIN: 6202lsc
    if (pinInput.trim() === '6202lsc') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
  };

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') resolve(reader.result);
        else reject(new Error('Failed reading file'));
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Process incoming files from drag-and-drop or file input
  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsLoading(true);
    setUploadStatus('Uploading assets permanently to server...');

    try {
      const fileList = Array.from(files);
      const payload: Array<{ filename: string; base64Data: string }> = [];

      for (const file of fileList) {
        const base64Data = await fileToBase64(file);

        // Check if file is official logo
        const isLogo = LOGO_ALIASES.some(
          alias => alias.toLowerCase() === file.name.toLowerCase() ||
                   alias.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === file.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
        );

        const targetFilename = isLogo ? OFFICIAL_LOGO_FILENAME : file.name;
        payload.push({ filename: targetFilename, base64Data });
      }

      const result = await batchUploadAssetsToServer(payload);
      if (result.success) {
        setUploadStatus(`✅ Successfully saved ${result.count} asset(s) permanently to server! Live on site for all customers.`);
      } else {
        setUploadStatus(`⚠️ Upload partially complete. Refreshing server status...`);
      }
      await refreshAssets();
    } catch (err: any) {
      setUploadStatus(`❌ Upload failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSingleFileUpload = async (targetFilename: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    setUploadStatus(`Saving ${targetFilename} permanently to server...`);

    try {
      const base64Data = await fileToBase64(file);
      const res = await uploadAssetToServer(targetFilename, base64Data);
      if (res.success) {
        setUploadStatus(`✅ ${targetFilename} saved permanently to server disk. Visible to all customers.`);
      } else {
        setUploadStatus(`❌ Failed to save: ${res.error}`);
      }
      await refreshAssets();
    } catch (err: any) {
      setUploadStatus(`❌ Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAsset = async (filename: string) => {
    if (!window.confirm(`Are you sure you want to remove "${filename}" from the server?`)) return;
    setIsLoading(true);
    await deleteAssetFromServer(filename);
    await refreshAssets();
    setIsLoading(false);
    setUploadStatus(`Removed ${filename} from server.`);
  };

  // Total status counts
  const totalProtectedCount = AUTHENTIC_IMAGE_FILENAMES.length + 1; // 21 + 1 logo
  const logoUploaded = hasUserUploadedAsset(OFFICIAL_LOGO_FILENAME);
  const photosUploadedCount = AUTHENTIC_IMAGE_FILENAMES.filter(name => hasUserUploadedAsset(name)).length;
  const totalUploadedCount = (logoUploaded ? 1 : 0) + photosUploadedCount;

  // PIN Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#121316] border border-zinc-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="font-heading text-2xl font-black uppercase text-white tracking-tight">
            Workshop Admin Portal
          </h2>
          <p className="text-xs text-zinc-400 mt-1 mb-6">
            Permanent Asset Manager • Vereeniging Workshop Staff Only
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Staff PIN"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                className={`w-full px-4 py-3 bg-black/60 border ${
                  pinError ? 'border-red-500 text-red-400' : 'border-zinc-700 text-white'
                } rounded-xl text-center font-mono text-sm tracking-widest focus:outline-none focus:border-orange-500`}
                autoFocus
              />
              {pinError && (
                <p className="text-[11px] text-red-400 mt-1.5 font-mono">
                  Incorrect staff PIN. Access restricted to authorized personnel.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase text-xs tracking-wider transition shadow-lg cursor-pointer"
            >
              Enter Admin Portal
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-800/80">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition font-mono"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Customer Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white flex flex-col font-sans">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#121316]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={onBackToSite}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            title="Return to public customer website"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Customer Website</span>
          </button>

          <div className="h-6 w-px bg-white/10" />

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-heading font-black uppercase text-white tracking-tight leading-tight">
                Original Image Asset Manager
              </h1>
              <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Permanent Server Storage Active</span>
                <span>•</span>
                <span>Port 3000 API</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={refreshAssets}
            disabled={isSyncing}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-mono transition flex items-center gap-1.5 cursor-pointer"
            title="Sync with server"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-orange-400' : ''}`} />
            <span className="hidden sm:inline">Refresh Server Cache</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-xs font-mono transition cursor-pointer"
          >
            Lock Admin
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Permanent Storage Notice Banner */}
        <div className="bg-gradient-to-r from-orange-950/40 via-zinc-900 to-zinc-900 border border-orange-500/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 shrink-0">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>Permanent Server-Side Storage Enabled</span>
                <span className="text-[10px] bg-orange-500 text-white font-mono px-2 py-0.5 rounded-full font-bold">1-Time Upload</span>
              </h3>
              <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed max-w-3xl">
                Images uploaded here are saved directly to the server's public disk (<code className="text-orange-400 font-mono">/public/images/</code> and <code className="text-orange-400 font-mono">/public/Logo-removebg-preview.png</code>). 
                Once set, they stay on the website <strong className="text-white">permanently</strong> for all visitors, page reloads, and new customers without requiring re-uploading.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-right font-mono">
              <div className="text-[10px] text-zinc-400 uppercase">Live Assets</div>
              <div className="text-sm font-bold text-emerald-400">
                {totalUploadedCount} / {totalProtectedCount} Active
              </div>
            </div>
          </div>
        </div>

        {/* Global Status Message */}
        {uploadStatus && (
          <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-mono flex items-center justify-between gap-2 shadow-lg animate-in fade-in">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-orange-400 shrink-0" />
              <span>{uploadStatus}</span>
            </div>
            <button
              onClick={() => setUploadStatus(null)}
              className="text-zinc-400 hover:text-white text-xs px-2 py-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Universal Batch Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            processFiles(e.dataTransfer.files);
          }}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all ${
            dragOver 
              ? 'border-orange-500 bg-orange-500/10 scale-[1.01]' 
              : 'border-zinc-700 hover:border-zinc-600 bg-[#121316]'
          }`}
        >
          <FolderUp className="w-12 h-12 text-orange-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">
            Drop Official Logo & 21 WhatsApp Fitment Photographs Here
          </h3>
          <p className="text-xs text-zinc-400 max-w-xl mx-auto mb-4 leading-relaxed">
            Drag and drop <code className="text-orange-400 font-mono">Logo-removebg-preview.png</code> and all workshop JPEG photos simultaneously.
            The server automatically maps each file to its designated vehicle card and writes it directly to disk.
          </p>

          <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition shadow-lg">
            <Upload className="w-4 h-4" />
            <span>Select Files From Computer</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => processFiles(e.target.files)}
            />
          </label>
        </div>

        {/* SECTION 1: OFFICIAL PROTECTED BRAND LOGO */}
        <div className="bg-[#121316] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-black uppercase text-white tracking-wider flex items-center gap-2">
                  <span>Protected Brand Logo Asset</span>
                  <span className="text-[10px] bg-zinc-800 text-zinc-300 font-mono px-2 py-0.5 rounded">
                    {OFFICIAL_LOGO_FILENAME}
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Displayed unaltered with transparent background across header, footer, & invoices.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {logoUploaded ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Live on Server Disk
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-950/40 border border-amber-800/50 text-amber-400 text-xs font-mono">
                  <AlertCircle className="w-4 h-4" /> Awaiting Upload
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Live Logo Visual Preview */}
            <div className="lg:col-span-2 bg-[#0a0a0c] border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[140px]">
              <div className="text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-wider">
                Live Server Preview (Transparent PNG)
              </div>
              <div className="p-4 bg-zinc-950/80 rounded-xl border border-white/5 flex items-center justify-center">
                <BrandLogo size="lg" />
              </div>
              <div className="mt-3 text-[11px] font-mono text-zinc-400 flex items-center gap-2">
                <span>Direct Path: <code className="text-orange-400">/Logo-removebg-preview.png</code></span>
                <a 
                  href={`/${OFFICIAL_LOGO_FILENAME}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-zinc-500 hover:text-white inline-flex items-center gap-0.5"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Logo Actions */}
            <div className="space-y-3">
              <label className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition shadow-md">
                <Upload className="w-4 h-4" />
                <span>{logoUploaded ? 'Replace Logo Permanently' : 'Upload Logo-removebg-preview.png'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleSingleFileUpload(OFFICIAL_LOGO_FILENAME, e)}
                />
              </label>

              {logoUploaded && (
                <button
                  onClick={() => handleDeleteAsset(OFFICIAL_LOGO_FILENAME)}
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-red-950/60 text-zinc-400 hover:text-red-300 border border-zinc-800 hover:border-red-800 text-xs font-mono transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset / Delete Logo</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: 21 WORKSHOP FITMENT PHOTOGRAPHS */}
        <div className="bg-[#121316] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-sm font-heading font-black uppercase text-white tracking-wider flex items-center gap-2">
                <span>21 Genuine South African Workshop Fitments</span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  ({photosUploadedCount} / 21 Live on Server)
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Unmodified photographic evidence from the Vereeniging workshop floor.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10 font-mono text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filter === 'all' ? 'bg-orange-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                All (21)
              </button>
              <button
                onClick={() => setFilter('uploaded')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filter === 'uploaded' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Live ({photosUploadedCount})
              </button>
              <button
                onClick={() => setFilter('missing')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filter === 'missing' ? 'bg-amber-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Missing ({21 - photosUploadedCount})
              </button>
            </div>
          </div>

          {/* Grid of 21 Protected Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AUTHENTIC_IMAGE_FILENAMES.filter(name => {
              const isLive = hasUserUploadedAsset(name);
              if (filter === 'uploaded') return isLive;
              if (filter === 'missing') return !isLive;
              return true;
            }).map((filename, idx) => {
              const isLive = hasUserUploadedAsset(filename);
              const imageUrl = getAuthenticImageUrl(filename);

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                    isLive 
                      ? 'bg-[#16181d] border-emerald-900/40 hover:border-emerald-700/60' 
                      : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="space-y-2">
                    {/* Thumbnail preview or Placeholder */}
                    <div className="aspect-video w-full rounded-lg bg-black/60 border border-white/5 overflow-hidden flex items-center justify-center relative group">
                      {isLive ? (
                        <>
                          <img
                            src={imageUrl}
                            alt={filename}
                            className="w-full h-full object-contain select-none"
                          />
                          <a
                            href={imageUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute top-2 right-2 p-1.5 rounded-md bg-black/80 text-white opacity-0 group-hover:opacity-100 transition shadow"
                            title="Open high-res in new tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </>
                      ) : (
                        <div className="flex flex-col items-center text-zinc-600 p-2 text-center">
                          <ImageIcon className="w-6 h-6 mb-1 text-zinc-500" />
                          <span className="text-[10px] font-mono">Awaiting Upload</span>
                        </div>
                      )}

                      {/* Status indicator on top left */}
                      <div className="absolute top-2 left-2">
                        {isLive ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-800 text-[10px] font-mono text-emerald-300 font-bold flex items-center gap-1 shadow">
                            <CheckCircle2 className="w-3 h-3" /> Live
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-zinc-900/90 border border-zinc-700 text-[10px] font-mono text-zinc-400">
                            Slot #{idx + 1}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* File info */}
                    <div className="text-left font-mono">
                      <div className="text-xs font-bold text-white truncate" title={filename}>
                        {filename}
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">
                        {isLive ? `Permanent URL: /images/${encodeURIComponent(filename).slice(0, 20)}...` : 'Not loaded yet'}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between gap-2">
                    <label className="flex-1 py-1.5 px-2 rounded-lg bg-zinc-800 hover:bg-orange-600 text-zinc-300 hover:text-white text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer transition">
                      <Upload className="w-3 h-3" />
                      <span>{isLive ? 'Replace' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleSingleFileUpload(filename, e)}
                      />
                    </label>

                    {isLive && (
                      <button
                        onClick={() => handleDeleteAsset(filename)}
                        className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-red-950 text-zinc-400 hover:text-red-400 transition"
                        title="Delete this asset from server"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification Card */}
        <div className="bg-[#121316] border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase">Verification & Customer Live Preview</h4>
              <p className="text-xs text-zinc-400">
                Click below to view the customer-facing website with all current permanent assets loaded.
              </p>
            </div>
          </div>

          <button
            onClick={onBackToSite}
            className="py-2.5 px-5 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase text-xs tracking-wider transition shadow cursor-pointer shrink-0 flex items-center gap-2"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </main>
    </div>
  );
};
