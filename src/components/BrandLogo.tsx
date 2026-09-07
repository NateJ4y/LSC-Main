import React, { useState, useEffect } from 'react';
import { 
  OFFICIAL_LOGO_FILENAME, 
  getAuthenticImageUrl, 
  subscribeToAssetChanges, 
  hasUserUploadedAsset
} from '../utils/userAssetStore';
import { ShieldCheck } from 'lucide-react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  iconOnly?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  className = '',
  onClick
}) => {
  // Candidate image paths to check for the supplied Logo-removebg-preview.png
  const candidatePaths = [
    getAuthenticImageUrl(OFFICIAL_LOGO_FILENAME),
    `/api/blob/${encodeURIComponent(OFFICIAL_LOGO_FILENAME)}`,
    `/.netlify/functions/api/blob/${encodeURIComponent(OFFICIAL_LOGO_FILENAME)}`,
    `/${OFFICIAL_LOGO_FILENAME}`,
    `/images/${OFFICIAL_LOGO_FILENAME}`,
    `/assets/${OFFICIAL_LOGO_FILENAME}`,
  ];

  const [pathIndex, setPathIndex] = useState(0);
  const [hasFailedAll, setHasFailedAll] = useState(false);
  const [, setTick] = useState(0);

  // Subscribe to changes if the user uploads the logo during the session
  useEffect(() => {
    const unsubscribe = subscribeToAssetChanges(() => {
      setHasFailedAll(false);
      setPathIndex(0);
      setTick(t => t + 1);
    });
    return unsubscribe;
  }, []);

  // Size specifications preserving proportional height and natural aspect ratio
  const heightClasses = {
    sm: 'h-8 sm:h-9 max-w-[200px]',
    md: 'h-10 sm:h-12 max-w-[240px]',
    lg: 'h-14 sm:h-16 max-w-[320px]',
    xl: 'h-20 sm:h-24 max-w-[420px]',
  }[size];

  const handleImageError = () => {
    if (pathIndex < candidatePaths.length - 1) {
      setPathIndex(prev => prev + 1);
    } else {
      setHasFailedAll(true);
    }
  };

  // Professional brand fallback when image file is loading or awaiting placement
  if (hasFailedAll && !hasUserUploadedAsset(OFFICIAL_LOGO_FILENAME)) {
    return (
      <div
        className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#141418] border border-white/10 text-zinc-300 select-none shadow-sm ${className}`}
        id="brand-logo-badge"
      >
        <div className="w-8 h-8 rounded-lg bg-orange-600/20 border border-orange-500/40 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4 text-orange-500" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-heading text-sm font-black text-white tracking-wider uppercase leading-none">
            LIFESTYLE
          </span>
          <span className="text-[9px] font-bold tracking-widest text-orange-400 uppercase leading-tight font-mono">
            SEAT COVERS SA
          </span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`inline-flex items-center select-none ${className}`}
      onClick={onClick}
    >
      {/* 
        CRITICAL IMAGE ASSET PRESERVATION RULE COMPLIANT:
        - Exact supplied PNG file (Logo-removebg-preview.png)
        - Preserves 100% transparency
        - Preserves exact original typography, colors, and proportions
        - object-fit: contain ensures no stretching, cropping, or distortion
        - No CSS filters (no brightness, contrast, saturate, or hue alterations)
      */}
      <img
        src={candidatePaths[pathIndex]}
        alt="Lifestyle Seat Covers South Africa"
        referrerPolicy="no-referrer"
        onError={handleImageError}
        className={`w-auto ${heightClasses} object-contain object-left transition-opacity duration-200`}
        style={{
          objectFit: 'contain',
          maxWidth: '100%',
        }}
      />
    </div>
  );
};
