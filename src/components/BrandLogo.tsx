import React, { useState, useEffect } from 'react';
import { OFFICIAL_LOGO_FILENAME, getAuthenticImageUrl, subscribeToAssetChanges, hasUserUploadedAsset } from '../utils/userAssetStore';
import { ShieldCheck } from 'lucide-react';

interface BrandLogoProps { size?: 'sm' | 'md' | 'lg' | 'xl'; showSubtitle?: boolean; iconOnly?: boolean; className?: string; onClick?: () => void; }

// Global customer-facing price scrubber. Pricing is intentionally not displayed anywhere on the public site.
function scrubPublicPrices(root: Node = document.body) {
  const pricePattern = /(?:\b(?:FROM\s*)?R\s?\d[\d\s,.]*|\bR\{[^}]+\})/gi;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) nodes.push(node as Text);
  nodes.forEach((textNode) => {
    const value = textNode.nodeValue || '';
    if (pricePattern.test(value)) {
      pricePattern.lastIndex = 0;
      textNode.nodeValue = value.replace(pricePattern, 'GET A QUOTE');
    }
    pricePattern.lastIndex = 0;
  });
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', className = '', onClick }) => {
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

  useEffect(() => {
    const unsubscribe = subscribeToAssetChanges(() => { setHasFailedAll(false); setPathIndex(0); setTick(t => t + 1); });
    return unsubscribe;
  }, []);

  useEffect(() => {
    scrubPublicPrices();
    const observer = new MutationObserver(() => scrubPublicPrices());
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);

  const heightClasses = {
    sm: 'h-16 sm:h-18 max-w-[400px]',
    md: 'h-20 sm:h-24 max-w-[480px]',
    lg: 'h-28 sm:h-32 max-w-[560px]',
    xl: 'h-32 sm:h-40 max-w-[640px]',
  }[size];

  const handleImageError = () => {
    if (pathIndex < candidatePaths.length - 1) setPathIndex(prev => prev + 1);
    else setHasFailedAll(true);
  };

  if (hasFailedAll && !hasUserUploadedAsset(OFFICIAL_LOGO_FILENAME)) {
    return (
      <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#141418] border border-white/10 text-zinc-300 select-none shadow-sm ${className}`} id="brand-logo-badge">
        <div className="w-8 h-8 rounded-lg bg-orange-600/20 border border-orange-500/40 flex items-center justify-center shrink-0"><ShieldCheck className="w-4 h-4 text-orange-500" /></div>
        <div className="flex flex-col text-left"><span className="font-heading text-sm font-black text-white tracking-wider uppercase leading-none">LIFESTYLE</span><span className="text-[9px] font-bold tracking-widest text-orange-400 uppercase leading-tight font-mono">SEAT COVERS SA</span></div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`} onClick={onClick}>
      <img src={candidatePaths[pathIndex]} alt="Lifestyle Seat Covers South Africa" referrerPolicy="no-referrer" onError={handleImageError} className={`w-auto ${heightClasses} object-contain object-left transition-opacity duration-200`} style={{ objectFit: 'contain', maxWidth: '100%' }} />
    </div>
  );
};
