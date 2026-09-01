import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  iconOnly?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  iconOnly = false,
  className = ''
}) => {
  // Dimension mappings for the circular badge & typography matching official Logo.jpeg
  const sizeMap = {
    sm: { 
      badge: 34, 
      lifestyle: 'text-lg sm:text-xl', 
      seatCovers: 'text-[9px] sm:text-[10px]', 
      sub: 'text-[8px]' 
    },
    md: { 
      badge: 48, 
      lifestyle: 'text-2xl sm:text-3xl', 
      seatCovers: 'text-[11px] sm:text-xs', 
      sub: 'text-[9px]' 
    },
    lg: { 
      badge: 60, 
      lifestyle: 'text-3xl sm:text-4xl', 
      seatCovers: 'text-xs sm:text-sm', 
      sub: 'text-[10px]' 
    },
    xl: { 
      badge: 76, 
      lifestyle: 'text-4xl sm:text-5xl', 
      seatCovers: 'text-sm sm:text-base', 
      sub: 'text-xs' 
    },
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex items-center space-x-3.5 select-none ${className}`}>
      {/* Precision Circular LS Monogram Emblem SVG replicating the exact official logo */}
      <svg
        width={current.badge}
        height={current.badge}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-label="Lifestyle Seat Covers Monogram Logo"
      >
        {/* Top-Left Outer White Swoosh Arc */}
        <path
          d="M 16 102 C 14 62 46 22 96 16 C 104 15 110 15 110 15"
          stroke="#FFFFFF"
          strokeWidth="13"
          strokeLinecap="round"
        />

        {/* Bottom-Right Outer White Arc */}
        <path
          d="M 98 184 C 146 182 184 148 184 100 C 184 88 180 72 174 62"
          stroke="#FFFFFF"
          strokeWidth="13"
          strokeLinecap="round"
        />

        {/* The 'L' Monogram (Solid Crisp White, Left Half) */}
        <path
          d="M 48 38 L 84 38 L 84 136 L 98 136 L 98 162 L 48 162 Z"
          fill="#FFFFFF"
        />

        {/* The 'S' Monogram (Automotive Slate Grey, Right Half) */}
        <path
          d="M 106 38 H 162 V 80 H 132 V 96 H 162 V 162 H 106 V 120 H 136 V 104 H 106 Z"
          fill="#8C9BA8"
        />
      </svg>

      {/* Brand Logotype Typography matching Logo.jpeg */}
      {!iconOnly && (
        <div className="flex flex-col justify-center">
          <div className="flex flex-col leading-none">
            <span
              className={`font-heading font-black tracking-tight text-white uppercase ${current.lifestyle}`}
              style={{ letterSpacing: '0.035em', fontFamily: 'Montserrat, sans-serif' }}
            >
              LIFESTYLE
            </span>
            <span
              className={`font-heading font-bold uppercase text-[#8C9BA8] tracking-[0.26em] mt-1 ${current.seatCovers}`}
              style={{ letterSpacing: '0.24em', fontFamily: 'Montserrat, sans-serif' }}
            >
              SEAT COVERS
            </span>
          </div>
          {showSubtitle && (
            <span className={`text-zinc-500 font-mono tracking-wider uppercase mt-1 ${current.sub}`}>
              Custom-Fit Automotive Defense • SA
            </span>
          )}
        </div>
      )}
    </div>
  );
};
