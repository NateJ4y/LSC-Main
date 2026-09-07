import React, { useState, useRef, useEffect, useId } from 'react';
import { MaterialSpec } from '../types';
import { getMatchingWorkshopPhoto } from '../utils/imageRegistry';
import { AssetImage } from './AssetImage';
import { 
  ShieldCheck, 
  Sparkles, 
  Sun, 
  Moon, 
  Maximize2, 
  Rotate3d,
  Layers,
  Eye,
  Camera
} from 'lucide-react';

interface SeatVisualizerProps {
  material: MaterialSpec;
  primaryColorHex: string;
  secondaryColorHex?: string;
  patternType?: 'solid' | 'twotone' | 'camo' | 'quilted';
  embroideryText?: string;
  embroideryFont?: 'block' | 'italic' | 'rugged';
  embroideryColor?: string;
  includeConsoleCover?: boolean;
  mollePocketsAddon?: boolean;
  viewMode: 'front' | 'rear' | 'detail' | 'real_photo';
  vehicleTitle: string;
  isMobileCompact?: boolean;
}

export const SeatVisualizer: React.FC<SeatVisualizerProps> = ({
  material,
  primaryColorHex,
  secondaryColorHex = '#222222',
  patternType = 'solid',
  embroideryText,
  embroideryFont = 'rugged',
  embroideryColor = '#d4af37',
  includeConsoleCover = true,
  mollePocketsAddon = false,
  viewMode = 'front',
  vehicleTitle,
  isMobileCompact = false
}) => {
  const isTwoTone = patternType === 'twotone';
  const isQuilted = patternType === 'quilted';
  const isCamo = patternType === 'camo';

  const uid = useId().replace(/:/g, '');

  // 3D tilt tracking state (Apple Pro style smooth perspective)
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'sun' | 'night'>('studio');
  const [isTouchActive, setIsTouchActive] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Detect touch devices to avoid continuous heavy mousemove recalculations on mobile
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !containerRef.current || viewMode !== 'front') return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 8; // subtle max 8 deg
    const rotateX = -(y / (rect.height / 2)) * 7; // subtle max 7 deg
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Mobile Touch Orbit / Drag handler (smooth & throttled)
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isTouchActive || !containerRef.current || viewMode !== 'front') return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left - rect.width / 2;
    const y = touch.clientY - rect.top - rect.height / 2;
    const rotateY = Math.max(-10, Math.min(10, (x / (rect.width / 2)) * 10));
    const rotateX = Math.max(-8, Math.min(8, -(y / (rect.height / 2)) * 8));
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleTouchEnd = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Matched real unedited workshop photo
  const matchedData = getMatchingWorkshopPhoto(vehicleTitle);
  const matchedFilename = matchedData.rawFilename;
  const photoLabel = `${matchedData.title} – ${matchedData.embroidery}`;

  const fontClass =
    embroideryFont === 'rugged'
      ? 'font-serif tracking-widest uppercase font-extrabold'
      : embroideryFont === 'italic'
      ? 'font-sans italic font-bold tracking-wider'
      : 'font-sans font-black uppercase tracking-wider';

  // Contrast thread color
  const stitchColor = isTwoTone ? '#ffffff' : '#d4af37';

  // Material classification for specialized tactile shaders
  const isLeather = material.id.includes('leather') || material.id.includes('rhino');
  const isNeoprene = material.id.includes('neoprene');
  const isRipstop = material.id.includes('ripstop') || material.id.includes('canvas');

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full bg-gradient-to-b from-[#131318] via-[#0d0d12] to-[#07070a] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col items-center justify-between shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-300 group ${
        isMobileCompact ? 'p-2 sm:p-3 min-h-[260px]' : 'p-3 sm:p-5 min-h-[320px] sm:min-h-[460px]'
      }`}
      style={{ perspective: 1200 }}
    >
      {/* 3D Studio Ambience & Specular Top Light */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          lightingPreset === 'sun'
            ? 'bg-[radial-gradient(ellipse_at_70%_20%,_rgba(245,158,11,0.22)_0%,_rgba(180,83,9,0.06)_40%,_transparent_75%)]'
            : lightingPreset === 'night'
            ? 'bg-[radial-gradient(ellipse_at_50%_15%,_rgba(59,130,246,0.18)_0%,_rgba(14,165,233,0.05)_45%,_transparent_75%)]'
            : 'bg-[radial-gradient(ellipse_at_50%_10%,_rgba(249,115,22,0.16)_0%,_rgba(255,255,255,0.04)_40%,_transparent_80%)]'
        }`} 
      />

      {/* Subtle Studio Floor Grid Lines (Perspective Floor) */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.05)_0%,_transparent_70%)] pointer-events-none" />

      {/* Top Precision Status Bar: Highly Responsive for Mobile */}
      <div className="w-full flex items-center justify-between gap-2 z-10 pb-2 border-b border-white/10">
        <div className="flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-[11px] font-bold text-zinc-300 bg-black/80 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-white/10 truncate max-w-[62%] sm:max-w-[70%] shadow-inner">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0" />
          <span className="text-white truncate font-mono tracking-tight">{vehicleTitle || 'Laser Tailored Fitment'}</span>
        </div>

        {/* Studio Lighting Mood Switcher */}
        <div className="flex items-center space-x-0.5 sm:space-x-1 bg-black/70 p-0.5 rounded-full border border-white/10 text-[9px] font-mono shrink-0 shadow-sm">
          <button
            onClick={() => setLightingPreset('studio')}
            className={`px-2 py-0.5 rounded-full transition cursor-pointer flex items-center gap-1 ${
              lightingPreset === 'studio' ? 'bg-orange-500 text-black font-bold shadow' : 'text-zinc-400 hover:text-white'
            }`}
            title="Automotive Studio Lighting"
          >
            <span>Studio</span>
          </button>
          <button
            onClick={() => setLightingPreset('sun')}
            className={`px-1.5 py-0.5 rounded-full transition cursor-pointer flex items-center gap-1 ${
              lightingPreset === 'sun' ? 'bg-amber-400 text-black font-bold shadow' : 'text-zinc-400 hover:text-white'
            }`}
            title="Kalahari Overland Sun"
          >
            <Sun className="w-3 h-3" />
            <span className="hidden sm:inline">Sun</span>
          </button>
          <button
            onClick={() => setLightingPreset('night')}
            className={`px-1.5 py-0.5 rounded-full transition cursor-pointer flex items-center gap-1 ${
              lightingPreset === 'night' ? 'bg-blue-500 text-white font-bold shadow' : 'text-zinc-400 hover:text-white'
            }`}
            title="Midnight Cockpit"
          >
            <Moon className="w-3 h-3" />
            <span className="hidden sm:inline">Night</span>
          </button>
        </div>
      </div>

      {/* Main Seat Simulation Stage Container */}
      <div 
        className={`relative w-full aspect-[4/5] flex items-center justify-center py-1 sm:py-2 transition-transform duration-150 ease-out select-none ${
          isMobileCompact 
            ? 'max-w-[240px] xs:max-w-[270px]' 
            : 'max-w-[270px] xs:max-w-[310px] sm:max-w-[380px] md:max-w-[410px]'
        }`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          willChange: isHovered || isTouchActive ? 'transform' : 'auto'
        }}
      >
        {viewMode === 'front' ? (
          <svg
            viewBox="0 0 400 495"
            className="w-full h-full drop-shadow-[0_28px_50px_rgba(0,0,0,0.95)]"
          >
            <defs>
              {/* --- PHOTOREALISTIC MATERIAL & LIGHTING SHADERS --- */}

              {/* 1. Chrome Guide Rods Specular Shading */}
              <linearGradient id={`chromeGrad-${uid}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3f3f46" />
                <stop offset="20%" stopColor="#71717a" />
                <stop offset="40%" stopColor="#f8fafc" />
                <stop offset="60%" stopColor="#e2e8f0" />
                <stop offset="85%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              {/* 2. Bolster 3D Curvature Gradients (Left and Right Wings) */}
              <linearGradient id={`leftBolsterCurvature-${uid}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(0,0,0,0.7)" />
                <stop offset="25%" stopColor={lightingPreset === 'sun' ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.22)"} />
                <stop offset="55%" stopColor="rgba(255,255,255,0.03)" />
                <stop offset="85%" stopColor="rgba(0,0,0,0.5)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.85)" />
              </linearGradient>

              <linearGradient id={`rightBolsterCurvature-${uid}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(0,0,0,0.85)" />
                <stop offset="15%" stopColor="rgba(0,0,0,0.5)" />
                <stop offset="45%" stopColor="rgba(255,255,255,0.03)" />
                <stop offset="75%" stopColor={lightingPreset === 'sun' ? "rgba(251,191,36,0.28)" : "rgba(255,255,255,0.2)"} />
                <stop offset="100%" stopColor="rgba(0,0,0,0.7)" />
              </linearGradient>

              {/* 3. Center Backrest Recessed Ambient Occlusion Gradient */}
              <linearGradient id={`centerBackrestAO-${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,0,0,0.6)" />
                <stop offset="15%" stopColor="rgba(0,0,0,0.15)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="85%" stopColor="rgba(0,0,0,0.2)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.75)" />
              </linearGradient>

              {/* 4. Headrest Anatomical Contour Shading */}
              <radialGradient id={`headrestShading-${uid}`} cx="46%" cy="28%" r="68%">
                <stop offset="0%" stopColor={lightingPreset === 'sun' ? "rgba(253,230,138,0.35)" : "rgba(255,255,255,0.28)"} />
                <stop offset="45%" stopColor="rgba(255,255,255,0.02)" />
                <stop offset="85%" stopColor="rgba(0,0,0,0.55)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.85)" />
              </radialGradient>

              {/* 5. Bottom Waterfall Cushion Front Edge Specular Reflection */}
              <linearGradient id={`waterfallLighting-${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,0,0,0.55)" />
                <stop offset="18%" stopColor="rgba(0,0,0,0.1)" />
                <stop offset="40%" stopColor={lightingPreset === 'sun' ? "rgba(251,191,36,0.16)" : "rgba(255,255,255,0.15)"} />
                <stop offset="70%" stopColor="rgba(0,0,0,0.2)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.88)" />
              </linearGradient>

              {/* 6. True 3D Puffed Quilted Diamond Matrix Pattern with Specular Pillowing */}
              <pattern id={`quiltedDiamond3D-${uid}`} width="24" height="24" patternUnits="userSpaceOnUse">
                {/* Convex pillow surface highlight */}
                <polygon points="12,1 23,12 12,23 1,12" fill="rgba(255,255,255,0.08)" />
                <polygon points="12,3 21,12 12,21 3,12" fill="rgba(0,0,0,0.15)" />
                {/* Deep stitch valley shadow */}
                <path d="M 12 0 L 24 12 L 12 24 L 0 12 Z" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="1.8" />
                {/* Precision automotive double-needle stitch thread with highlight */}
                <path d="M 12 0 L 24 12 L 12 24 L 0 12 Z" fill="none" stroke={stitchColor} strokeWidth="0.85" strokeDasharray="3 1.5" />
              </pattern>

              {/* 7. Authentic Heavy-Duty Ripstop Weave Grid (Crosshatch Tensile Micro-Texture) */}
              <pattern id={`ripstopGrid3D-${uid}`} width="9" height="9" patternUnits="userSpaceOnUse">
                <path d="M 9 0 L 0 0 0 9" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.9" />
                <rect width="9" height="9" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.5" />
              </pattern>

              {/* 8. Micro-Perforated Automotive Leather Pattern */}
              <pattern id={`leatherPerforations-${uid}`} width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="2.5" r="0.6" fill="rgba(0,0,0,0.4)" />
                <circle cx="2.5" cy="2.2" r="0.3" fill="rgba(255,255,255,0.08)" />
              </pattern>

              {/* 9. Tactical Bushveld Camouflage Pattern */}
              <pattern id={`bushveldCamoPattern-${uid}`} width="75" height="75" patternUnits="userSpaceOnUse">
                <rect width="75" height="75" fill={primaryColorHex} />
                <path d="M0,28 Q22,4 38,32 T75,18 L75,48 Q48,65 26,42 Z" fill={secondaryColorHex} opacity="0.88" />
                <path d="M14,0 Q36,14 48,0 T75,9 L65,28 Q38,20 20,28 Z" fill="#2d3024" opacity="0.75" />
                <path d="M6,52 Q32,42 54,65 T75,52 L75,75 L0,75 Z" fill="#4b4231" opacity="0.68" />
                <path d="M28,15 Q35,32 50,22 Z" fill="#181a14" opacity="0.5" />
              </pattern>

              {/* 10. Heavy Turntable Contact Floor Shadow */}
              <radialGradient id={`studioFloorShadow-${uid}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.92)" />
                <stop offset="50%" stopColor="rgba(0,0,0,0.45)" />
                <stop offset="85%" stopColor="rgba(0,0,0,0.08)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>

            {/* --- REALISTIC TURNTABLE FLOOR SHADOW --- */}
            <ellipse cx="200" cy="470" rx="175" ry="18" fill={`url(#studioFloorShadow-${uid})`} />

            {/* --- REINFORCED LOWER AUTOMOTIVE SEAT BUCKET FRAME & CONTROLS --- */}
            <g id="seatChassisBaseGroup">
              {/* Lower Molded Base Valance */}
              <path
                d="M 82 432 L 72 463 Q 200 475 328 463 L 318 432 Z"
                fill="#161619"
                stroke="#2a2a30"
                strokeWidth="1.5"
              />
              {/* Electric Power Seat Reclining Control Panel */}
              <g transform="translate(62, 442)">
                <rect x="0" y="0" width="20" height="9" rx="2.5" fill="#27272a" stroke="#3f3f46" strokeWidth="0.8" />
                <circle cx="5" cy="4.5" r="2" fill="#71717a" />
                <line x1="10" y1="4.5" x2="16" y2="4.5" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
              </g>
              {/* Seat Slider Rail Glimpse */}
              <rect x="100" y="462" width="200" height="4" rx="1" fill="#09090b" stroke="#27272a" strokeWidth="0.5" />
            </g>

            {/* --- 1. ANATOMICAL HEADREST (3D SCULPTED CONTOURS) --- */}
            <g id="headrestPhotorealisticGroup">
              {/* Dual Heavy-Gauge Chrome Mounting Posts */}
              <g>
                {/* Left Chrome Post */}
                <rect x="159" y="58" width="9.5" height="36" rx="2" fill={`url(#chromeGrad-${uid})`} stroke="#1e293b" strokeWidth="0.75" />
                <line x1="161" y1="70" x2="166" y2="70" stroke="#334155" strokeWidth="1" />
                <line x1="161" y1="76" x2="166" y2="76" stroke="#334155" strokeWidth="1" />
                {/* Left Mounting Escutcheon Collar */}
                <ellipse cx="163.5" cy="94" rx="7.5" ry="3" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />

                {/* Right Chrome Post */}
                <rect x="231.5" y="58" width="9.5" height="36" rx="2" fill={`url(#chromeGrad-${uid})`} stroke="#1e293b" strokeWidth="0.75" />
                <line x1="233.5" y1="70" x2="238.5" y2="70" stroke="#334155" strokeWidth="1" />
                <line x1="233.5" y1="76" x2="238.5" y2="76" stroke="#334155" strokeWidth="1" />
                {/* Right Mounting Escutcheon Collar & Height Lock Tab */}
                <ellipse cx="236" cy="94" rx="7.5" ry="3" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
                <rect x="242.5" y="92" width="3.5" height="4" rx="1" fill="#71717a" stroke="#18181b" strokeWidth="0.5" />
              </g>

              {/* Headrest Main Sculpted Pillow Body */}
              <path
                d="M 134 32 C 134 16, 155 10, 200 10 C 245 10, 266 16, 266 32 C 268 53, 263 76, 253 80 C 240 84, 160 84, 147 80 C 137 76, 132 53, 134 32 Z"
                fill={isCamo ? `url(#bushveldCamoPattern-${uid})` : primaryColorHex}
                stroke="#09090b"
                strokeWidth="2.2"
              />

              {/* Two-Tone Center Inset for Headrest */}
              {isTwoTone && (
                <path
                  d="M 158 18 C 170 16, 200 16, 200 16 C 200 16, 230 16, 242 18 C 245 36, 242 68, 235 74 C 220 77, 180 77, 165 74 C 158 68, 155 36, 158 18 Z"
                  fill={secondaryColorHex}
                  stroke="rgba(0,0,0,0.35)"
                  strokeWidth="1.2"
                />
              )}

              {/* Quilted Pattern Layer */}
              {isQuilted && (
                <path
                  d="M 134 32 C 134 16, 155 10, 200 10 C 245 10, 266 16, 266 32 C 268 53, 263 76, 253 80 C 240 84, 160 84, 147 80 C 137 76, 132 53, 134 32 Z"
                  fill={`url(#quiltedDiamond3D-${uid})`}
                />
              )}

              {/* Ripstop Tensile Grid Texture */}
              {isRipstop && (
                <path
                  d="M 134 32 C 134 16, 155 10, 200 10 C 245 10, 266 16, 266 32 C 268 53, 263 76, 253 80 C 240 84, 160 84, 147 80 C 137 76, 132 53, 134 32 Z"
                  fill={`url(#ripstopGrid3D-${uid})`}
                  opacity="0.4"
                />
              )}

              {/* Leather Micro-Perforations */}
              {isLeather && (
                <path
                  d="M 134 32 C 134 16, 155 10, 200 10 C 245 10, 266 16, 266 32 C 268 53, 263 76, 253 80 C 240 84, 160 84, 147 80 C 137 76, 132 53, 134 32 Z"
                  fill={`url(#leatherPerforations-${uid})`}
                  opacity="0.5"
                />
              )}

              {/* Headrest 3D Volume Light Shader */}
              <path
                d="M 134 32 C 134 16, 155 10, 200 10 C 245 10, 266 16, 266 32 C 268 53, 263 76, 253 80 C 240 84, 160 84, 147 80 C 137 76, 132 53, 134 32 Z"
                fill={`url(#headrestShading-${uid})`}
              />

              {/* French Perimeter Seam Threading */}
              <path
                d="M 142 30 C 148 18, 170 14, 200 14 C 230 14, 252 18, 258 30 C 260 48, 255 70, 246 74 C 235 77, 165 77, 154 74 C 145 70, 140 48, 142 30 Z"
                fill="none"
                stroke={stitchColor}
                strokeWidth="1.1"
                strokeDasharray="4 2"
                opacity="0.9"
              />

              {/* Top Crest Specular Highlight Line */}
              <path
                d="M 152 20 Q 200 16 248 20"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* --- 2. PHOTOREALISTIC CONTOURED BACKREST (ERGONOMIC BUCKET) --- */}
            <g id="backrestPhotorealisticGroup">
              
              {/* Left Thoracic Bolster Wing */}
              <path
                d="M 136 94 C 110 96, 80 126, 76 178 C 70 232, 66 288, 85 340 C 95 356, 126 360, 144 360 C 124 300, 120 215, 134 140 C 136 120, 136 100, 136 94 Z"
                fill={isCamo ? `url(#bushveldCamoPattern-${uid})` : primaryColorHex}
                stroke="#09090b"
                strokeWidth="2.2"
              />
              <path
                d="M 136 94 C 110 96, 80 126, 76 178 C 70 232, 66 288, 85 340 C 95 356, 126 360, 144 360 C 124 300, 120 215, 134 140 C 136 120, 136 100, 136 94 Z"
                fill={`url(#leftBolsterCurvature-${uid})`}
              />

              {/* Right Thoracic Bolster Wing */}
              <path
                d="M 264 94 C 290 96, 320 126, 324 178 C 330 232, 334 288, 315 340 C 305 356, 274 360, 256 360 C 276 300, 280 215, 266 140 C 264 120, 264 100, 264 94 Z"
                fill={isCamo ? `url(#bushveldCamoPattern-${uid})` : primaryColorHex}
                stroke="#09090b"
                strokeWidth="2.2"
              />
              <path
                d="M 264 94 C 290 96, 320 126, 324 178 C 330 232, 334 288, 315 340 C 305 356, 274 360, 256 360 C 276 300, 280 215, 266 140 C 264 120, 264 100, 264 94 Z"
                fill={`url(#rightBolsterCurvature-${uid})`}
              />

              {/* Center Backrest Contoured Core Panel */}
              <path
                d="M 136 94 Q 200 88 264 94 L 260 360 Q 200 366 140 360 Z"
                fill={
                  isTwoTone
                    ? secondaryColorHex
                    : isCamo
                    ? `url(#bushveldCamoPattern-${uid})`
                    : primaryColorHex
                }
                stroke="#09090b"
                strokeWidth="2"
              />

              {/* Quilted Diamond Pattern in Center Panel */}
              {isQuilted && (
                <path
                  d="M 136 94 Q 200 88 264 94 L 260 360 Q 200 366 140 360 Z"
                  fill={`url(#quiltedDiamond3D-${uid})`}
                />
              )}

              {/* Ripstop Grid on Center & Bolsters */}
              {isRipstop && (
                <path
                  d="M 76 178 C 70 232, 66 288, 85 340 C 95 356, 128 360, 140 360 L 260 360 C 272 360, 305 356, 315 340 C 334 288, 330 232, 324 178 C 320 126, 290 96, 264 94 Q 200 88 136 94 C 110 96, 80 126, 76 178 Z"
                  fill={`url(#ripstopGrid3D-${uid})`}
                  opacity="0.38"
                />
              )}

              {/* Leather Grain on Center & Bolsters */}
              {isLeather && (
                <path
                  d="M 136 94 Q 200 88 264 94 L 260 360 Q 200 366 140 360 Z"
                  fill={`url(#leatherPerforations-${uid})`}
                  opacity="0.45"
                />
              )}

              {/* Center Backrest Ambient Occlusion Falloff */}
              <path
                d="M 136 94 Q 200 88 264 94 L 260 360 Q 200 366 140 360 Z"
                fill={`url(#centerBackrestAO-${uid})`}
              />

              {/* Horizontal Lumbar Cushioning Crease Channels */}
              <g opacity="0.65">
                <path d="M 137 218 Q 200 225 263 218" stroke="rgba(0,0,0,0.6)" strokeWidth="3" fill="none" />
                <path d="M 137 217 Q 200 224 263 217" stroke={stitchColor} strokeWidth="1" strokeDasharray="4 2" fill="none" />

                <path d="M 138 288 Q 200 295 262 288" stroke="rgba(0,0,0,0.6)" strokeWidth="3" fill="none" />
                <path d="M 138 287 Q 200 294 262 287" stroke={stitchColor} strokeWidth="1" strokeDasharray="4 2" fill="none" />
              </g>

              {/* Signature Double-Needle French Seams on Bolsters */}
              <g>
                {/* Left Bolster Seam Lines */}
                <path
                  d="M 137 98 C 129 140, 122 215, 141 358"
                  stroke="rgba(0,0,0,0.7)"
                  strokeWidth="2.8"
                  fill="none"
                />
                <path
                  d="M 137 98 C 129 140, 122 215, 141 358"
                  stroke={stitchColor}
                  strokeWidth="1.2"
                  strokeDasharray="4.5 2.5"
                  fill="none"
                />

                {/* Right Bolster Seam Lines */}
                <path
                  d="M 263 98 C 271 140, 278 215, 259 358"
                  stroke="rgba(0,0,0,0.7)"
                  strokeWidth="2.8"
                  fill="none"
                />
                <path
                  d="M 263 98 C 271 140, 278 215, 259 358"
                  stroke={stitchColor}
                  strokeWidth="1.2"
                  strokeDasharray="4.5 2.5"
                  fill="none"
                />
              </g>

              {/* SABS Airbag Safe Deployment Seam Tag */}
              <g transform="translate(60, 215)">
                <rect x="0" y="0" width="16" height="38" rx="3" fill="#dc2626" stroke="#ffffff" strokeWidth="0.8" />
                <text x="8" y="25" fill="#ffffff" fontSize="7.5" fontWeight="900" textAnchor="middle" transform="rotate(-90, 8, 25)" fontFamily="sans-serif">
                  AIRBAG
                </text>
              </g>

              {/* LSC South Africa Woven Workshop Heritage Tag */}
              <g transform="translate(324, 235)">
                <rect x="0" y="0" width="15" height="34" rx="2.5" fill="#18181b" stroke="#f59e0b" strokeWidth="0.8" />
                <text x="7.5" y="22" fill="#f59e0b" fontSize="6.5" fontWeight="bold" textAnchor="middle" transform="rotate(90, 7.5, 22)" fontFamily="sans-serif">
                  🇿🇦 LSC•SA
                </text>
              </g>

              {/* Laser-Cut Tactical MOLLE Side Webbing (if selected) */}
              {mollePocketsAddon && (
                <g transform="translate(54, 265)">
                  <rect x="0" y="0" width="22" height="66" rx="3.5" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
                  <line x1="2" y1="14" x2="20" y2="14" stroke="#71717a" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="2" y1="28" x2="20" y2="28" stroke="#71717a" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="2" y1="42" x2="20" y2="42" stroke="#71717a" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="2" y1="56" x2="20" y2="56" stroke="#71717a" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              )}
            </g>

            {/* --- 3. SCULPTED THIGH & BUCKET BOTTOM CUSHION --- */}
            <g id="bottomCushionPhotorealisticGroup">
              {/* Deep Base Cushion Body */}
              <path
                d="M 78 356 C 66 376, 60 422, 72 447 C 84 464, 134 468, 200 468 C 266 468, 316 464, 328 447 C 340 422, 334 376, 322 356 Z"
                fill={isCamo ? `url(#bushveldCamoPattern-${uid})` : primaryColorHex}
                stroke="#09090b"
                strokeWidth="2.5"
              />

              {/* Left Thigh Support Curvature */}
              <path
                d="M 78 356 C 66 376, 60 422, 72 447 C 80 457, 108 460, 125 457 C 113 432, 117 386, 127 358 Z"
                fill={`url(#leftBolsterCurvature-${uid})`}
              />

              {/* Right Thigh Support Curvature */}
              <path
                d="M 322 356 C 334 376, 340 422, 328 447 C 320 457, 292 460, 275 457 C 287 432, 283 386, 273 358 Z"
                fill={`url(#rightBolsterCurvature-${uid})`}
              />

              {/* Center Cushion Bucket Insert */}
              <path
                d="M 127 358 L 121 454 Q 200 464 279 454 L 273 358 Z"
                fill={
                  isTwoTone
                    ? secondaryColorHex
                    : isCamo
                    ? `url(#bushveldCamoPattern-${uid})`
                    : primaryColorHex
                }
                stroke="#09090b"
                strokeWidth="1.5"
              />

              {/* Center Bucket Quilted Pattern */}
              {isQuilted && (
                <path
                  d="M 127 358 L 121 454 Q 200 464 279 454 L 273 358 Z"
                  fill={`url(#quiltedDiamond3D-${uid})`}
                />
              )}

              {/* Bottom Cushion Waterfall Lighting Falloff */}
              <path
                d="M 78 356 C 66 376, 60 422, 72 447 C 84 464, 134 468, 200 468 C 266 468, 316 464, 328 447 C 340 422, 334 376, 322 356 Z"
                fill={`url(#waterfallLighting-${uid})`}
              />

              {/* Thigh Bolster Double French Seams */}
              <g>
                <path d="M 127 360 L 121 452" stroke={stitchColor} strokeWidth="1.2" strokeDasharray="4 2.5" fill="none" />
                <path d="M 273 360 L 279 452" stroke={stitchColor} strokeWidth="1.2" strokeDasharray="4 2.5" fill="none" />
              </g>

              {/* Front Waterfall Roll-Over Specular Highlight */}
              <path
                d="M 86 442 Q 200 460 314 442"
                fill="none"
                stroke={lightingPreset === 'sun' ? "rgba(253,230,138,0.3)" : "rgba(255,255,255,0.25)"}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>

            {/* --- 4. CUSTOM SATIN-THREAD METALLIC EMBROIDERY --- */}
            {embroideryText && (
              <g transform="translate(200, 168)">
                {/* 3D Debossed Cast Shadow */}
                <text
                  x="0"
                  y="2.5"
                  fill="rgba(0,0,0,0.9)"
                  fontSize="13.5"
                  fontWeight="900"
                  textAnchor="middle"
                  className={fontClass}
                  style={{ filter: 'blur(1px)' }}
                >
                  {embroideryText}
                </text>
                {/* Precision Satin Stitch Metallic Highlight */}
                <text
                  x="0"
                  y="0"
                  fill={embroideryColor}
                  fontSize="13.5"
                  fontWeight="900"
                  textAnchor="middle"
                  className={fontClass}
                  style={{ 
                    filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.5)) drop-shadow(0 2px 5px rgba(0,0,0,0.95))' 
                  }}
                >
                  {embroideryText}
                </text>
              </g>
            )}
          </svg>
        ) : viewMode === 'rear' ? (
          /* REAR 60/40 SPLIT TAILORED BENCH WITH REALISTIC CONTOURS */
          <svg
            viewBox="0 0 440 410"
            className="w-full h-full drop-shadow-[0_28px_50px_rgba(0,0,0,0.95)]"
          >
            <defs>
              <linearGradient id={`rearBenchLighting-${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="50%" stopColor="rgba(0,0,0,0.08)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.7)" />
              </linearGradient>
            </defs>

            {/* Rear Headrests (Triple Anatomical Units) */}
            <rect x="54" y="26" width="86" height="50" rx="14" fill={primaryColorHex} stroke="#09090b" strokeWidth="2.2" />
            <rect x="178" y="34" width="84" height="42" rx="11" fill={primaryColorHex} stroke="#09090b" strokeWidth="2.2" />
            <rect x="300" y="26" width="86" height="50" rx="14" fill={primaryColorHex} stroke="#09090b" strokeWidth="2.2" />

            {/* 60% Left Section Backrest */}
            <path
              d="M 28 88 L 256 88 L 256 288 L 28 288 Z"
              fill={primaryColorHex}
              stroke="#09090b"
              strokeWidth="2.5"
            />
            {isTwoTone && (
              <rect x="64" y="94" width="162" height="186" rx="8" fill={secondaryColorHex} />
            )}

            {/* 40% Right Section Backrest */}
            <path
              d="M 264 88 L 412 88 L 412 288 L 264 288 Z"
              fill={primaryColorHex}
              stroke="#09090b"
              strokeWidth="2.5"
            />
            {isTwoTone && (
              <rect x="280" y="94" width="116" height="186" rx="8" fill={secondaryColorHex} />
            )}

            {/* Fold-down Center Armrest with Cupholders */}
            <rect x="194" y="114" width="54" height="128" rx="8" fill="#18181b" stroke="#3f3f46" strokeDasharray="3 3" />
            <circle cx="221" cy="176" r="11" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
            <text x="221" y="180" fill="#71717a" fontSize="8" textAnchor="middle" fontFamily="sans-serif">CUP</text>

            {/* Bottom Rear Bench Cushion */}
            <path
              d="M 22 288 Q 220 282 418 288 L 408 378 Q 220 392 32 378 Z"
              fill={primaryColorHex}
              stroke="#09090b"
              strokeWidth="2.5"
            />
            <path
              d="M 22 288 Q 220 282 418 288 L 408 378 Q 220 392 32 378 Z"
              fill={`url(#rearBenchLighting-${uid})`}
            />

            {/* ISOFIX Anchors */}
            <g transform="translate(85, 278)">
              <rect x="0" y="0" width="28" height="8" rx="2" fill="#dc2626" />
              <text x="14" y="7" fill="#fff" fontSize="6" fontWeight="bold" textAnchor="middle">ISOFIX</text>
            </g>
            <g transform="translate(328, 278)">
              <rect x="0" y="0" width="28" height="8" rx="2" fill="#dc2626" />
              <text x="14" y="7" fill="#fff" fontSize="6" fontWeight="bold" textAnchor="middle">ISOFIX</text>
            </g>

            <text x="220" y="338" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" opacity="0.85" fontFamily="sans-serif">
              60/40 Split Tailored Rear Bench
            </text>
          </svg>
        ) : viewMode === 'real_photo' ? (
          /* UNEDITED WORKSHOP ASSET PHOTO PREVIEW */
          <div className="w-full h-full flex flex-col items-center justify-center p-1 relative">
            <div className="w-full h-full max-h-[360px] bg-black rounded-2xl overflow-hidden border border-white/20 relative flex items-center justify-center shadow-2xl p-2 cursor-pointer">
              <AssetImage
                filename={matchedFilename}
                alt={photoLabel}
                fit="contain"
                className="w-full h-full"
                allowEnlarge={true}
              />
              <div className="absolute top-2.5 left-2.5 bg-black/85 backdrop-blur-md border border-white/20 text-orange-400 font-mono text-[10px] font-bold px-2.5 py-1 rounded-md">
                Original Unedited Photo
              </div>
              <div className="absolute top-2.5 right-2.5 bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 pointer-events-none">
                <Maximize2 className="w-3 h-3 text-orange-400" />
                <span>Enlarge</span>
              </div>
              <div className="absolute bottom-2.5 inset-x-2.5 bg-black/85 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-center pointer-events-none">
                <div className="text-white text-xs font-bold font-mono truncate">{photoLabel}</div>
                <div className="text-[10px] text-zinc-400">Authentic double-needle stitching & tailored contours</div>
              </div>
            </div>
          </div>
        ) : (
          /* TACTILE FABRIC CLOSEUP INSPECTOR */
          <div className="w-full h-full flex flex-col items-center justify-center space-y-3 p-3">
            <div
              className="w-40 h-40 sm:w-44 sm:h-44 rounded-2xl border-4 border-zinc-700 shadow-2xl relative overflow-hidden flex items-center justify-center"
              style={{
                backgroundColor: primaryColorHex,
                backgroundImage: isQuilted
                  ? 'radial-gradient(#444 16%, transparent 17%)'
                  : isCamo
                  ? 'repeating-linear-gradient(45deg, rgba(0,0,0,0.18) 0, rgba(0,0,0,0.18) 10px, transparent 10px, transparent 20px)'
                  : 'none'
              }}
            >
              {isTwoTone && (
                <div
                  className="absolute right-0 top-0 bottom-0 w-1/2 border-l-2 border-white/80"
                  style={{ backgroundColor: secondaryColorHex }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/20" />
              <div className="relative z-10 text-center bg-black/85 px-3.5 py-2 rounded-xl backdrop-blur-md border border-white/15">
                <span className="text-xs font-mono font-bold text-amber-400 block uppercase">
                  {material.name}
                </span>
                <span className="text-[10px] text-zinc-300">SABS UV-Certified Composite</span>
              </div>
            </div>
            <div className="text-center text-xs text-zinc-400 max-w-xs leading-tight">
              <span className="font-semibold text-zinc-200">Composite Spec:</span> 100% Waterproof Face + 10mm Lumbar Cushioning + Breathable Scrim.
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer: Touch Orbit Hint on Mobile & Matching Console Cover */}
      <div className="w-full flex flex-col xs:flex-row items-center justify-between gap-1 text-[10px] sm:text-xs text-zinc-300 pt-1.5 border-t border-white/10">
        {includeConsoleCover ? (
          <div className="flex items-center space-x-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Matching Console Lid Cover Included Free</span>
          </div>
        ) : <div />}

        {/* Dynamic Hint: Desktop hover vs Mobile Touch Tilt toggle */}
        {isTouchDevice ? (
          <button
            onClick={() => setIsTouchActive(!isTouchActive)}
            className={`px-2 py-0.5 rounded-md text-[9px] font-mono transition flex items-center gap-1 cursor-pointer ${
              isTouchActive ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Rotate3d className="w-3 h-3" />
            <span>{isTouchActive ? '3D Orbit Active (Drag to tilt)' : 'Enable Touch 3D Tilt'}</span>
          </button>
        ) : (
          <div className="text-[9px] font-mono text-zinc-500 hidden sm:block">
            Interactive 3D Studio • Move cursor to tilt
          </div>
        )}
      </div>
    </div>
  );
};
