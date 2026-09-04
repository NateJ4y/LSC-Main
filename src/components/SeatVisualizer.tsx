import React from 'react';
import { MaterialSpec } from '../types';
import { getMatchingWorkshopPhoto } from '../utils/imageRegistry';
import { AssetImage } from './AssetImage';

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
  vehicleTitle
}) => {
  const isTwoTone = patternType === 'twotone';
  const isQuilted = patternType === 'quilted';
  const isCamo = patternType === 'camo';

  // Determine matched unedited original photo based on vehicle or material
  const matchedData = getMatchingWorkshopPhoto(vehicleTitle);
  const matchedFilename = matchedData.rawFilename;
  const photoLabel = `${matchedData.title} – ${matchedData.embroidery}`;

  const fontClass =
    embroideryFont === 'rugged'
      ? 'font-serif tracking-widest uppercase font-extrabold'
      : embroideryFont === 'italic'
      ? 'font-sans italic font-bold tracking-wider'
      : 'font-sans font-black uppercase tracking-wider';

  return (
    <div className="relative w-full bg-zinc-900 border border-white/10 rounded-3xl p-3 sm:p-5 overflow-hidden flex flex-col items-center justify-between min-h-[340px] sm:min-h-[440px] shadow-2xl">
      {/* Background Lighting / Studio Shadow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-600/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Clean Top Status Bar with No Overlap */}
      <div className="w-full flex items-center justify-between gap-2 z-10 pb-2 border-b border-white/10">
        <div className="flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-[11px] font-bold text-zinc-300 bg-black/60 px-2.5 sm:px-3 py-1 rounded-full border border-white/10 truncate max-w-[70%]">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0"></span>
          <span className="text-white truncate">{vehicleTitle || 'Vehicle Tailored Fit'}</span>
        </div>
        <span className="bg-black/60 text-zinc-300 text-[9px] sm:text-[10px] font-semibold px-2 sm:px-2.5 py-1 rounded-full border border-white/10 shrink-0 font-mono">
          Airbag Safe 🛡️
        </span>
      </div>

      {/* SVG Canvas for Seat Simulation */}
      <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] flex items-center justify-center py-2 sm:py-4">
        {viewMode === 'front' ? (
          <svg
            viewBox="0 0 400 480"
            className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] select-none transition-all duration-300"
          >
            <defs>
              {/* Quilted diamond pattern */}
              <pattern id="diamondPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 20 10 L 10 20 L 0 10 Z" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              </pattern>

              {/* Camo bushveld pattern */}
              <pattern id="camoPattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect width="60" height="60" fill={primaryColorHex} />
                <path d="M0,20 Q15,5 30,25 T60,15 L60,40 Q40,55 20,35 Z" fill={secondaryColorHex} opacity="0.8" />
                <path d="M10,0 Q30,10 40,0 T60,5 L50,20 Q30,15 15,20 Z" fill="#2d3024" opacity="0.6" />
                <path d="M5,45 Q25,35 45,55 T60,45 L60,60 L0,60 Z" fill="#4d4432" opacity="0.5" />
              </pattern>

              {/* Ripstop Grid pattern */}
              <pattern id="ripstopPattern" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
              </pattern>

              {/* Linear highlights */}
              <linearGradient id="seatLightGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="25%" stopColor="rgba(255,255,255,0.0)" />
                <stop offset="75%" stopColor="rgba(0,0,0,0.2)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
              </linearGradient>

              {/* Leather sheen */}
              <linearGradient id="leatherSheen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.02)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
              </linearGradient>
            </defs>

            {/* SEAT SHADOW */}
            <ellipse cx="200" cy="460" rx="160" ry="18" fill="rgba(0,0,0,0.6)" filter="blur(8px)" />

            {/* HEADREST */}
            <g id="headrest" className="transition-all duration-300">
              {/* Headrest Posts */}
              <rect x="165" y="65" width="10" height="28" rx="3" fill="#666" stroke="#333" strokeWidth="1" />
              <rect x="225" y="65" width="10" height="28" rx="3" fill="#666" stroke="#333" strokeWidth="1" />
              
              {/* Headrest Main Pillow */}
              <rect
                x="140"
                y="15"
                width="120"
                height="65"
                rx="16"
                fill={isCamo ? 'url(#camoPattern)' : primaryColorHex}
                stroke="#111"
                strokeWidth="2.5"
              />
              {/* Headrest Center Insert for Two-Tone */}
              {isTwoTone && (
                <rect
                  x="160"
                  y="20"
                  width="80"
                  height="55"
                  rx="10"
                  fill={secondaryColorHex}
                  stroke="rgba(0,0,0,0.25)"
                  strokeWidth="1.5"
                />
              )}
              {isQuilted && (
                <rect x="140" y="15" width="120" height="65" rx="16" fill="url(#diamondPattern)" />
              )}
              <rect x="140" y="15" width="120" height="65" rx="16" fill="url(#ripstopPattern)" />
              <rect x="140" y="15" width="120" height="65" rx="16" fill="url(#leatherSheen)" />

              {/* Headrest Top Highlight */}
              <path
                d="M 152 22 Q 200 18 248 22"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>

            {/* SEAT BACKREST (MAIN BODY) */}
            <g id="backrest" className="transition-all duration-300">
              {/* Outer Left & Right Bolsters */}
              <path
                d="M 100 120 C 90 190, 80 270, 95 320 C 105 340, 135 345, 145 345 C 130 280, 135 180, 140 120 Z"
                fill={isCamo ? 'url(#camoPattern)' : primaryColorHex}
                stroke="#111"
                strokeWidth="2"
              />
              <path
                d="M 300 120 C 310 190, 320 270, 305 320 C 295 340, 265 345, 255 345 C 270 280, 265 180, 260 120 Z"
                fill={isCamo ? 'url(#camoPattern)' : primaryColorHex}
                stroke="#111"
                strokeWidth="2"
              />

              {/* Center Backrest Panel */}
              <path
                d="M 140 100 Q 200 95 260 100 L 260 345 Q 200 350 140 345 Z"
                fill={
                  isTwoTone
                    ? secondaryColorHex
                    : isCamo
                    ? 'url(#camoPattern)'
                    : primaryColorHex
                }
                stroke="#111"
                strokeWidth="2"
              />

              {/* Quilted overlay if selected */}
              {isQuilted && (
                <path
                  d="M 140 100 Q 200 95 260 100 L 260 345 Q 200 350 140 345 Z"
                  fill="url(#diamondPattern)"
                />
              )}

              {/* Ripstop Grid overlay */}
              <path
                d="M 95 100 Q 200 92 305 100 C 325 220, 310 320, 260 345 L 140 345 C 90 320, 75 220, 95 100 Z"
                fill="url(#ripstopPattern)"
                opacity="0.6"
              />

              {/* Realistic 3D lighting gradient */}
              <path
                d="M 95 100 Q 200 92 305 100 C 325 220, 310 320, 260 345 L 140 345 C 90 320, 75 220, 95 100 Z"
                fill="url(#seatLightGrad)"
              />

              {/* Contrast Double-Stitch Seams */}
              <path
                d="M 142 102 L 142 343 M 258 102 L 258 343"
                stroke={isTwoTone ? 'rgba(255,255,255,0.4)' : 'rgba(212,175,55,0.7)'}
                strokeWidth="1.8"
                strokeDasharray="4 3"
              />

              {/* Airbag Deployment Tag on Side */}
              <g transform="translate(74, 210)">
                <rect x="0" y="0" width="18" height="34" rx="3" fill="#c92a2a" stroke="#fff" strokeWidth="0.8" />
                <text x="9" y="22" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90, 9, 22)">
                  AIRBAG
                </text>
              </g>

              {/* Lifestyle Brand Micro-Tag */}
              <g transform="translate(308, 230)">
                <rect x="0" y="0" width="14" height="28" rx="2" fill="#1e293b" stroke="#f59e0b" strokeWidth="0.8" />
                <text x="7" y="18" fill="#f59e0b" fontSize="7" fontWeight="bold" textAnchor="middle" transform="rotate(90, 7, 18)">
                  LSC•SA
                </text>
              </g>

              {/* Tactical MOLLE Webbing Side Grid if enabled */}
              {mollePocketsAddon && (
                <g transform="translate(68, 260)">
                  <rect x="0" y="0" width="22" height="60" rx="3" fill="#1c1917" stroke="#44403c" strokeWidth="1" />
                  <line x1="2" y1="12" x2="20" y2="12" stroke="#78716c" strokeWidth="2.5" />
                  <line x1="2" y1="26" x2="20" y2="26" stroke="#78716c" strokeWidth="2.5" />
                  <line x1="2" y1="40" x2="20" y2="40" stroke="#78716c" strokeWidth="2.5" />
                  <line x1="2" y1="52" x2="20" y2="52" stroke="#78716c" strokeWidth="2.5" />
                </g>
              )}
            </g>

            {/* SEAT BOTTOM CUSHION */}
            <g id="bottomCushion" className="transition-all duration-300">
              {/* Bottom Cushion Base */}
              <path
                d="M 90 345 C 80 370, 75 410, 85 435 C 95 450, 140 455, 200 455 C 260 455, 305 450, 315 435 C 325 410, 320 370, 310 345 Z"
                fill={isCamo ? 'url(#camoPattern)' : primaryColorHex}
                stroke="#111"
                strokeWidth="2.5"
              />

              {/* Bottom Center Cushion Insert */}
              <path
                d="M 135 345 L 125 440 Q 200 450 275 440 L 265 345 Z"
                fill={
                  isTwoTone
                    ? secondaryColorHex
                    : isCamo
                    ? 'url(#camoPattern)'
                    : primaryColorHex
                }
                stroke="#111"
                strokeWidth="1.5"
              />

              {isQuilted && (
                <path
                  d="M 135 345 L 125 440 Q 200 450 275 440 L 265 345 Z"
                  fill="url(#diamondPattern)"
                />
              )}

              <path
                d="M 90 345 C 80 370, 75 410, 85 435 C 95 450, 140 455, 200 455 C 260 455, 305 450, 315 435 C 325 410, 320 370, 310 345 Z"
                fill="url(#ripstopPattern)"
                opacity="0.6"
              />

              {/* Bottom Cushion Front Bolster Lip */}
              <path
                d="M 88 425 Q 200 445 312 425 C 314 440, 280 455, 200 455 C 120 455, 86 440, 88 425 Z"
                fill="rgba(0,0,0,0.35)"
              />

              {/* Center Stitches */}
              <path
                d="M 138 348 L 128 438 M 262 348 L 272 438"
                stroke={isTwoTone ? 'rgba(255,255,255,0.4)' : 'rgba(212,175,55,0.7)'}
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            </g>

            {/* CUSTOM EMBROIDERY OVERLAY */}
            {embroideryText && (
              <g transform="translate(200, 165)">
                {/* Subtle backplate/shadow for embroidery */}
                <text
                  x="0"
                  y="1"
                  fill="rgba(0,0,0,0.8)"
                  fontSize="13"
                  fontWeight="900"
                  textAnchor="middle"
                  className={fontClass}
                >
                  {embroideryText}
                </text>
                <text
                  x="0"
                  y="0"
                  fill={embroideryColor}
                  fontSize="13"
                  fontWeight="900"
                  textAnchor="middle"
                  className={fontClass}
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.9))' }}
                >
                  {embroideryText}
                </text>
              </g>
            )}
          </svg>
        ) : viewMode === 'rear' ? (
          /* REAR BENCH VIEW (60/40 SPLIT) */
          <svg
            viewBox="0 0 440 400"
            className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] select-none transition-all duration-300"
          >
            <defs>
              <pattern id="camoPatternRear" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect width="60" height="60" fill={primaryColorHex} />
                <path d="M0,20 Q15,5 30,25 T60,15 L60,40 Q40,55 20,35 Z" fill={secondaryColorHex} opacity="0.8" />
                <path d="M10,0 Q30,10 40,0 T60,5 L50,20 Q30,15 15,20 Z" fill="#2d3024" opacity="0.6" />
              </pattern>
            </defs>

            {/* Rear Headrests (3-pieces) */}
            <rect x="60" y="30" width="80" height="45" rx="10" fill={isCamo ? 'url(#camoPatternRear)' : primaryColorHex} stroke="#111" strokeWidth="2" />
            <rect x="180" y="38" width="80" height="40" rx="8" fill={isCamo ? 'url(#camoPatternRear)' : primaryColorHex} stroke="#111" strokeWidth="2" />
            <rect x="300" y="30" width="80" height="45" rx="10" fill={isCamo ? 'url(#camoPatternRear)' : primaryColorHex} stroke="#111" strokeWidth="2" />

            {/* 60% Left Section Backrest */}
            <path
              d="M 35 90 L 255 90 L 255 280 L 35 280 Z"
              fill={isCamo ? 'url(#camoPatternRear)' : primaryColorHex}
              stroke="#111"
              strokeWidth="2"
            />
            {isTwoTone && (
              <path d="M 65 95 L 225 95 L 225 275 L 65 275 Z" fill={secondaryColorHex} />
            )}

            {/* 40% Right Section Backrest */}
            <path
              d="M 265 90 L 405 90 L 405 280 L 265 280 Z"
              fill={isCamo ? 'url(#camoPatternRear)' : primaryColorHex}
              stroke="#111"
              strokeWidth="2"
            />
            {isTwoTone && (
              <path d="M 280 95 L 390 95 L 390 275 L 280 275 Z" fill={secondaryColorHex} />
            )}

            {/* Center Fold-down Armrest Outline */}
            <rect x="195" y="120" width="50" height="120" rx="6" fill="rgba(0,0,0,0.25)" stroke="#333" strokeDasharray="3 3" />
            <circle cx="220" cy="180" r="10" fill="#111" />
            <text x="220" y="184" fill="#888" fontSize="8" textAnchor="middle">CUP</text>

            {/* Bottom Rear Bench Cushion */}
            <path
              d="M 30 280 Q 220 275 410 280 L 400 370 Q 220 380 40 370 Z"
              fill={isCamo ? 'url(#camoPatternRear)' : primaryColorHex}
              stroke="#111"
              strokeWidth="2.5"
            />

            {/* ISOFIX & Seatbelt Cutout Markers */}
            <rect x="90" y="270" width="24" height="8" rx="2" fill="#c92a2a" />
            <rect x="330" y="270" width="24" height="8" rx="2" fill="#c92a2a" />
            <text x="220" y="320" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle" opacity="0.6">
              60/40 Split Tailored Bench
            </text>
          </svg>
        ) : viewMode === 'real_photo' ? (
          /* UNEDITED ORIGINAL WORKSHOP PHOTO VIEW - Contained in box, click to enlarge */
          <div className="w-full h-full flex flex-col items-center justify-center p-1 sm:p-2 relative group">
            <div className="w-full h-full max-h-[380px] bg-black rounded-2xl overflow-hidden border border-white/20 relative flex items-center justify-center shadow-2xl p-2 cursor-pointer">
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
                <span>Click to Enlarge</span>
              </div>
              <div className="absolute bottom-2.5 inset-x-2.5 bg-black/85 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-center pointer-events-none">
                <div className="text-white text-xs font-bold font-mono truncate">{photoLabel}</div>
                <div className="text-[10px] text-zinc-400">Authentic double-needle stitching & tailored contours</div>
              </div>
            </div>
          </div>
        ) : (
          /* FABRIC DETAIL / TEXTURE CLOSEUP VIEW */
          <div className="w-full h-full flex flex-col items-center justify-center space-y-4 p-4">
            <div
              className="w-48 h-48 rounded-2xl border-4 border-neutral-700 shadow-2xl relative overflow-hidden flex items-center justify-center"
              style={{
                backgroundColor: primaryColorHex,
                backgroundImage: isQuilted
                  ? 'radial-gradient(#444 15%, transparent 16%)'
                  : isCamo
                  ? 'repeating-linear-gradient(45deg, rgba(0,0,0,0.15) 0, rgba(0,0,0,0.15) 10px, transparent 10px, transparent 20px)'
                  : 'none'
              }}
            >
              {isTwoTone && (
                <div
                  className="absolute right-0 top-0 bottom-0 w-1/2 border-l-2 border-amber-500/80"
                  style={{ backgroundColor: secondaryColorHex }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10" />
              <div className="relative z-10 text-center bg-black/75 px-3 py-2 rounded-xl backdrop-blur-md border border-white/10">
                <span className="text-xs font-mono font-bold text-amber-400 block uppercase">
                  {material.name}
                </span>
                <span className="text-[10px] text-neutral-300">SABS High-UV Tested</span>
              </div>
            </div>
            <div className="text-center text-xs text-neutral-400 max-w-xs">
              <span className="font-semibold text-neutral-200">5-Layer Composite:</span> Waterproof Top Weave + 10mm Memory Cushioning + Breathable Scrim + Non-Slip Grip Base.
            </div>
          </div>
        )}
      </div>

      {/* Included Free Console Cover Badge */}
      {includeConsoleCover && (
        <div className="mt-1 flex items-center space-x-2 bg-neutral-800/80 px-3 py-1 rounded-full border border-neutral-700 text-xs text-neutral-300">
          <span className="text-emerald-400">✓</span>
          <span>Matching Center Console Lid Cover Included Free</span>
        </div>
      )}
    </div>
  );
};
