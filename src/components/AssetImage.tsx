import React, { useState, useEffect } from 'react';
import { getAuthenticImageUrl, subscribeToAssetChanges } from '../utils/userAssetStore';
import { Image as ImageIcon, CheckCircle2, ShieldCheck, Maximize2, X, Sparkles } from 'lucide-react';

interface AssetImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  filename?: string;
  rawFilename?: string;
  alt: string;
  fit?: 'cover' | 'contain';
  caption?: string;
  className?: string;
  badge?: string;
  allowEnlarge?: boolean;
}

export const AssetImage: React.FC<AssetImageProps> = ({
  filename,
  rawFilename,
  alt,
  fit = 'contain',
  caption,
  className = '',
  badge,
  allowEnlarge = false,
  onClick,
  ...props
}) => {
  const targetFilename = filename || rawFilename || '';

  const candidatePaths = [
    getAuthenticImageUrl(targetFilename),
    `/api/blob/${encodeURIComponent(targetFilename)}`,
    `/.netlify/functions/api/blob/${encodeURIComponent(targetFilename)}`,
    `/images/${encodeURIComponent(targetFilename)}`,
    `/${encodeURIComponent(targetFilename)}`,
  ];

  const [pathIndex, setPathIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    // Listen for uploaded assets
    const unsubscribe = subscribeToAssetChanges(() => {
      setHasError(false);
      setPathIndex(0);
      setIsLoaded(false);
      setTick(t => t + 1);
    });
    return unsubscribe;
  }, []);

  // Handle ESC key to close enlarged preview
  useEffect(() => {
    if (!isEnlarged) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEnlarged(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEnlarged]);

  const currentImageUrl = candidatePaths[pathIndex] || candidatePaths[0];

  const handleImageError = () => {
    if (pathIndex < candidatePaths.length - 1) {
      setPathIndex(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div 
        className={`relative flex flex-col items-center justify-center p-6 bg-[#141418] border border-white/10 rounded-2xl text-center overflow-hidden min-h-[220px] ${className}`}
      >
        <div className="w-12 h-12 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center text-zinc-400 mb-3">
          <ImageIcon className="w-6 h-6 text-orange-500" />
        </div>
        
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/30 text-[11px] font-mono text-orange-400 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-500 shrink-0" />
          <span>Workshop Fitment Portfolio</span>
        </div>

        <p className="text-xs font-bold text-white max-w-xs line-clamp-2 mb-1 uppercase tracking-wide">
          {alt || 'Handcrafted Seat Covers'}
        </p>
        
        <p className="text-[11px] text-[#8C9BA8] max-w-xs leading-relaxed">
          Custom tailored vehicle interior protection handcrafted in Vereeniging.
        </p>

        {caption && (
          <span className="text-[10px] text-zinc-500 mt-2 italic">{caption}</span>
        )}
      </div>
    );
  }

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e as unknown as React.MouseEvent<HTMLImageElement>);
    }
    if (allowEnlarge) {
      setIsEnlarged(true);
    }
  };

  return (
    <>
      <div 
        onClick={handleContainerClick}
        className={`relative overflow-hidden flex items-center justify-center ${allowEnlarge ? 'cursor-zoom-in group/asset' : ''} ${className}`}
      >
        <img
          src={currentImageUrl}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={handleImageError}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} object-center transition-all duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-90'
          }`}
          {...props}
        />

        {badge && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-zinc-900/90 backdrop-blur-md border border-zinc-700/60 text-[11px] font-mono text-zinc-200 flex items-center gap-1.5 shadow-lg pointer-events-none">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{badge}</span>
          </div>
        )}

        {allowEnlarge && (
          <div className="absolute bottom-2.5 right-2.5 z-10 bg-black/80 backdrop-blur-md border border-white/20 text-white p-1.5 rounded-lg opacity-0 group-hover/asset:opacity-100 transition-opacity flex items-center gap-1 shadow-lg pointer-events-none">
            <Maximize2 className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[10px] font-mono font-bold pr-1">Enlarge</span>
          </div>
        )}
      </div>

      {/* Enlarged Modal Preview Box - Strict Fit/Contain */}
      {isEnlarged && (
        <div 
          onClick={() => setIsEnlarged(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl max-h-[92vh] bg-[#121216] border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="px-4 py-3 sm:py-4 bg-[#18181e] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3 overflow-hidden pr-2">
                <div className="px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] font-mono font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>ORIGINAL WORKSHOP ASSET</span>
                </div>
                <h4 className="text-sm sm:text-base font-heading font-black uppercase text-white truncate">
                  {alt || targetFilename}
                </h4>
              </div>

              <button
                onClick={() => setIsEnlarged(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 text-white flex items-center justify-center transition cursor-pointer shrink-0"
                title="Close Preview (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Box - Strictly fits/contains the enlarged image */}
            <div className="relative w-full flex-1 min-h-[300px] sm:min-h-[500px] max-h-[76vh] bg-black p-3 sm:p-6 flex items-center justify-center overflow-hidden">
              <img
                src={currentImageUrl}
                alt={alt}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="max-w-full max-h-[72vh] w-auto h-auto object-contain rounded-lg shadow-2xl select-none"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-3 bg-[#141418] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% Unaltered High-Resolution Photography • Vereeniging Workshop</span>
              </div>
              <div className="text-[11px] text-zinc-500">
                <span>{filename}</span> • <span className="hidden sm:inline">Press ESC or click outside to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
