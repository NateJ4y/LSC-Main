import React, { useState } from 'react';
import { 
  AUTHENTIC_IMAGE_FILENAMES, 
  OFFICIAL_LOGO_FILENAME, 
  LOGO_ALIASES,
  registerUserUploadedAsset, 
  hasUserUploadedAsset 
} from '../utils/userAssetStore';
import { Upload, CheckCircle, Shield, X, FolderUp, Image as ImageIcon } from 'lucide-react';

interface AssetUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssetUploaderModal: React.FC<AssetUploaderModalProps> = ({ isOpen, onClose }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const processFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      // If smaller than 5MB, read as dataURL for localStorage persistence
      if (file.size < 5 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(typeof reader.result === 'string' ? reader.result : URL.createObjectURL(file));
        };
        reader.onerror = () => {
          resolve(URL.createObjectURL(file));
        };
        reader.readAsDataURL(file);
      } else {
        resolve(URL.createObjectURL(file));
      }
    });
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    let count = 0;
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      const url = await processFile(file);

      // Check if this is the logo
      const isLogoMatch = LOGO_ALIASES.some(
        alias => alias.toLowerCase() === file.name.toLowerCase() ||
                 alias.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === file.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
      );

      if (isLogoMatch) {
        registerUserUploadedAsset(OFFICIAL_LOGO_FILENAME, url);
        registerUserUploadedAsset(file.name, url);
        count++;
        continue;
      }

      // Find matching filename in AUTHENTIC_IMAGE_FILENAMES
      const matched = AUTHENTIC_IMAGE_FILENAMES.find(
        name => name.toLowerCase() === file.name.toLowerCase() ||
                name.replace(/[()]/g, '').toLowerCase() === file.name.replace(/[()]/g, '').toLowerCase()
      );

      const targetFilename = matched || file.name;
      registerUserUploadedAsset(targetFilename, url);
      registerUserUploadedAsset(file.name, url);
      count++;
    }

    setUploadedCount(prev => prev + count);
    setStatusMessage(`Successfully loaded ${count} original asset(s). Pixels preserved 100% without modification per AGENTS.md.`);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const isLogoLoaded = hasUserUploadedAsset(OFFICIAL_LOGO_FILENAME);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#121316] border border-zinc-800 rounded-2xl p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Original Asset Manager</h3>
            <p className="text-xs text-zinc-400">
              Strict Asset Preservation Rule Active • Original Asset In → Original Asset Out
            </p>
          </div>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-colors ${
            dragOver ? 'border-orange-500 bg-orange-500/5' : 'border-zinc-700 hover:border-zinc-600 bg-zinc-900/40'
          }`}
        >
          <FolderUp className="w-10 h-10 text-orange-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-zinc-200 mb-1">
            Drag and drop your logo (<code className="text-orange-400 font-mono">Logo-removebg-preview.png</code>) or workshop photos
          </p>
          <p className="text-xs text-zinc-400 mb-4 max-w-md mx-auto">
            Files are mapped directly into the website components without any AI redesign, filters, or resizing distortion.
          </p>

          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold cursor-pointer transition shadow-md">
            <Upload className="w-4 h-4" />
            <span>Select Files From Computer</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
        </div>

        {statusMessage && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Official Brand Logo Status Box */}
        <div className="mt-4 p-3 rounded-xl bg-[#16171b] border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center border border-white/10 text-orange-400 shrink-0">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                <span>{OFFICIAL_LOGO_FILENAME}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 font-sans font-semibold">Protected Brand Logo</span>
              </div>
              <div className="text-[11px] text-zinc-400 truncate">
                Displayed unaltered in header, footer, & brand badges
              </div>
            </div>
          </div>

          <div className="shrink-0 pl-2">
            {isLogoLoaded ? (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-mono font-bold bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
                <CheckCircle className="w-3.5 h-3.5" /> Loaded
              </span>
            ) : (
              <label className="inline-flex items-center gap-1 text-xs text-orange-400 hover:text-white bg-orange-500/10 hover:bg-orange-500 border border-orange-500/30 px-2.5 py-1 rounded-lg cursor-pointer transition font-mono">
                <Upload className="w-3 h-3" />
                <span>Upload Logo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>
            )}
          </div>
        </div>

        {/* 21 Workshop Photos List */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono">
            <span>21 Protected Workshop Photos ({uploadedCount} active):</span>
          </div>
          <div className="max-h-36 overflow-y-auto space-y-1 pr-1 font-mono text-[11px]">
            {AUTHENTIC_IMAGE_FILENAMES.map((name, idx) => {
              const isLoaded = hasUserUploadedAsset(name);
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800/60 text-zinc-300"
                >
                  <span className="truncate max-w-[420px]">{name}</span>
                  {isLoaded ? (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
                      <CheckCircle className="w-3 h-3" /> Loaded
                    </span>
                  ) : (
                    <span className="text-[10px] text-zinc-500">Ready</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
