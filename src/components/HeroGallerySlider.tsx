import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Camera, 
  ShieldCheck, 
  Maximize2, 
  ArrowRight, 
  MessageCircle,
  Calculator,
  X,
  Sparkles
} from 'lucide-react';
import { AssetImage } from './AssetImage';
import { getGalleryInquiryWhatsAppUrl } from '../utils/whatsappHelper';

export interface HeroSlide {
  id: string;
  vehicleTitle: string;
  vehicleModel: string;
  badge: string;
  material: string;
  stitchStyle: string;
  embroidery: string;
  description: string;
  rawFilename: string;
  suggestedMatType: 'canvas' | 'leatherette' | 'polyester';
  highlights: string[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hilux-gd6',
    vehicleTitle: 'Toyota Hilux GD-6 Raider & Legend',
    vehicleModel: '2024 Toyota Hilux GD-6 Double Cab',
    badge: 'SA #1 Best Seller',
    material: '510g Tough Ripstop Canvas',
    stitchStyle: 'Upper Fluted Ribs + Diamond Quilt',
    embroidery: 'Embroidered Dual-Tone GD-6 Badge',
    description: 'Precision handcrafted for South Africa’s bestselling bakkie with non-slip micro-silicone backing and certified airbag-safe breakaway seams.',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.09.01 AM.jpeg',
    suggestedMatType: 'canvas',
    highlights: ['Airbag Breakaway Seam Certified', 'Fluted + Diamond Quilt Comfort', 'Waterproof 510g Ripstop']
  },
  {
    id: 'cruiser-79',
    vehicleTitle: 'Land Cruiser 79 Series (V8 / GD-6)',
    vehicleModel: '2024 Toyota Land Cruiser 79 Series',
    badge: 'Overland & Bush Ready',
    material: '510g Heavy-Duty Riptech Canvas',
    stitchStyle: 'Double-Needle Heavy Duty Seams',
    embroidery: 'Land Cruiser Contrast Header Bar',
    description: 'Built to withstand extreme Kalahari dust, thorny bushveld expeditions, and heavy farming work with indestructible canvas defense.',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.57 AM (2).jpeg',
    suggestedMatType: 'canvas',
    highlights: ['Thorn & Red Dust Resistant', 'Sand Beige Accent Strip', 'Heavy-Gauge Double-Needle Seams']
  },
  {
    id: 'ranger-wildtrak',
    vehicleTitle: 'Ford Ranger Wildtrak & Next-Gen',
    vehicleModel: '2024 Ford Ranger Wildtrak Double Cab',
    badge: 'Sport Performance Fit',
    material: '600D Poly Canvas + Sport Cushioning',
    stitchStyle: 'High-Contrast Diamond Quilt & Rear Bench',
    embroidery: 'Sport Red Embroidered RANGER Lettering',
    description: 'Aggressive interior styling featuring high-density diamond quilting, matching rear 60/40 bench, and tailored padded console cover.',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.09.00 AM (1).jpeg',
    suggestedMatType: 'canvas',
    highlights: ['Matching Padded Console Cover', 'Full Front & Rear Bench Set', 'Retains Full Electric Seat Levers']
  },
  {
    id: 'amarok-diamond',
    vehicleTitle: 'Volkswagen Amarok V6 & BiTDI',
    vehicleModel: '2024 Volkswagen Amarok Double Cab',
    badge: 'Executive Diamond Stitch',
    material: 'Heavy-Duty Canvas with High-Density Foam',
    stitchStyle: 'Full Geometric Diamond Silver Needle',
    embroidery: 'Embroidered AMAROK Script',
    description: 'Executive elegance fused with heavy-duty defense. The padded diamond quilt provides extra lumbar cushioning for long highway journeys.',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.55 AM.jpeg',
    suggestedMatType: 'leatherette',
    highlights: ['High-Density Foam Core', 'Sweat & Spill Resistant', 'Sculpted Side Bolsters']
  },
  {
    id: 'jeep-wrangler',
    vehicleTitle: 'Jeep Wrangler Rubicon & Gladiator',
    vehicleModel: '2024 Jeep Wrangler Unlimited',
    badge: 'Trail & All-Weather',
    material: 'Tactical 510g Ripstop Canvas',
    stitchStyle: 'White Precision Contour Edging & Chevron Inserts',
    embroidery: 'Embroidered Jeep Script & Console Cover',
    description: 'Engineered for open-air trail exploration. Repels sudden rain downpours, muddy trails, and abrasive sand without water soaking through.',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.53 AM.jpeg',
    suggestedMatType: 'canvas',
    highlights: ['Open-Top UV & Rain Shield', 'Includes Headrests & Armrests', 'Machine Washable & Quick Dry']
  },
  {
    id: 'corporate-fleet',
    vehicleTitle: 'Optimum Roofing & Commercial Fleets',
    vehicleModel: '2024 GWM Steed / P-Series Fleet',
    badge: 'Fleet Equity Protection',
    material: 'Industrial Grade 510g Ripstop Canvas',
    stitchStyle: 'Reinforced Twin-Needle Red Sport Seams',
    embroidery: 'Custom Corporate Logo & Headrest Embroidery',
    description: 'Protect company vehicle resale value against rough workboots, grease, tools, and daily crew rotation with custom embroidered corporate branding.',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.56 AM (1).jpeg',
    suggestedMatType: 'polyester',
    highlights: ['Custom Company Logo Embroidery', 'Fast 10-Min Wipe-Down Care', 'Commercial Grade Durability']
  },
  {
    id: 'saxen-lifting',
    vehicleTitle: 'Saxen Lifting Solutions Fleet Bakkies',
    vehicleModel: 'Toyota Hilux / Isuzu Workhorse Fleet',
    badge: 'Heavy Industrial Fit',
    material: 'Heavy-Duty Canvas with Gold Contrast Diamond Stitch',
    stitchStyle: 'Diamond Quilted Cushion Panels',
    embroidery: 'Saxen Lifting Solutions Custom Embroidery',
    description: 'Mining and industrial grade seat defense with customized enterprise corporate branding embroidered directly into high-durability canvas.',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.59 AM (1).jpeg',
    suggestedMatType: 'canvas',
    highlights: ['Multi-Color Company Logo', 'Heavy-Duty Workwear Resistant', 'Eliminates Re-Trim Expenses']
  }
];

interface HeroGallerySliderProps {
  onSelectSlideVehicle: (vehicleName: string, materialType: 'canvas' | 'leatherette' | 'polyester') => void;
  onViewGallery: () => void;
}

export const HeroGallerySlider: React.FC<HeroGallerySliderProps> = ({
  onSelectSlideVehicle,
  onViewGallery
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Touch / Drag swipe state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);
  const dragStartX = useRef<number>(0);

  const thumbnailContainerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = HERO_SLIDES[currentIndex];

  // Auto-play interval
  useEffect(() => {
    if (isPlaying && !isHovered) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, currentIndex]);

  // Scroll active thumbnail smoothly within its horizontal container ONLY (never affects page/window scroll)
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const activeBtn = container.children[currentIndex] as HTMLElement;
      if (activeBtn) {
        const targetLeft = activeBtn.offsetLeft - (container.clientWidth / 2) + (activeBtn.clientWidth / 2);
        container.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isZoomOpen) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Desktop Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = dragStartX.current - e.clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  return (
    <div 
      className="relative w-full bg-[#0e0e12]/95 border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isDragging.current = false;
      }}
    >
      {/* Top Banner: Authentic Workshop Photo Indicator & Status Bar */}
      <div className="px-4 py-2.5 bg-black/75 border-b border-white/10 flex items-center justify-between text-xs text-zinc-300 font-mono backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <Camera className="w-4 h-4 text-orange-400 shrink-0" />
          <span className="font-bold text-white tracking-wide truncate">AUTHENTIC VEREENIGING WORKSHOP INSTALLATIONS</span>
          <span className="hidden sm:inline-block text-[10px] text-zinc-500">|</span>
          <span className="hidden sm:inline-block text-zinc-400 text-[11px] truncate">Unmodified Client Photography</span>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <span className="text-[11px] font-bold text-orange-400 font-mono">
            0{currentIndex + 1} / 0{HERO_SLIDES.length}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 hover:text-white text-zinc-400 transition cursor-pointer"
            title={isPlaying ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div 
        className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch flex-1 relative select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* Left / Top: Slide Photography with Ultra-Smooth Apple-Style Crossfade & Zoom */}
        <div 
          onClick={() => setIsZoomOpen(true)}
          className="md:col-span-7 relative min-h-[340px] sm:min-h-[440px] bg-[#09090b] overflow-hidden flex items-center justify-center group cursor-pointer border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-5"
        >
          {/* Subtle Ambient Studio Light Halo behind image */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.08)_0%,_transparent_70%)] pointer-events-none" />

          {/* Smooth Fade Transition Container */}
          <div 
            key={currentSlide.id}
            className="w-full h-full max-h-[460px] flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] animate-in fade-in zoom-in-95"
          >
            <AssetImage
              filename={currentSlide.rawFilename}
              alt={currentSlide.vehicleTitle}
              fit="contain"
              className="w-full h-full max-h-[450px] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>

          {/* Overlay Tag Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-black/85 backdrop-blur-xl border border-orange-500/40 text-orange-400 px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              {currentSlide.badge}
            </span>

            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-black/85 backdrop-blur-xl border border-white/15 text-zinc-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Airbag Safe
            </span>
          </div>

          {/* Floating Navigation Controls on Image Hover (Apple & LV Style) */}
          <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="pointer-events-auto w-10 h-10 rounded-full bg-black/70 hover:bg-orange-500 text-white hover:text-black border border-white/20 hover:border-orange-400 flex items-center justify-center transition-all duration-300 shadow-xl opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="pointer-events-auto w-10 h-10 rounded-full bg-black/70 hover:bg-orange-500 text-white hover:text-black border border-white/20 hover:border-orange-400 flex items-center justify-center transition-all duration-300 shadow-xl opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Zoom Hover Badge */}
          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xl border border-white/20 text-white text-[11px] font-bold px-3 py-1.5 rounded-full opacity-90 group-hover:opacity-100 flex items-center gap-1.5 shadow-lg transition duration-300 pointer-events-none">
            <Maximize2 className="w-3.5 h-3.5 text-orange-400" />
            <span>Click to View Full Photo</span>
          </div>
          
          <div className="absolute bottom-3 left-3 text-[10px] font-mono text-zinc-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 pointer-events-none">
            🇿🇦 Handcrafted in Vereeniging
          </div>

          {/* Swipe indicator hint for mobile touch */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 md:hidden bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 text-[9px] font-mono text-zinc-400 pointer-events-none">
            Swipe or scroll pictures ↔
          </div>
        </div>

        {/* Right / Bottom: Specifications & Instant Quote Launcher */}
        <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-b from-[#141419] to-[#0f0f13] transition-all duration-500">
          <div className="space-y-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-orange-400 uppercase tracking-widest font-bold">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>PROVEN WORKSHOP FITMENT</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1.5 leading-tight font-heading">
                {currentSlide.vehicleTitle}
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {currentSlide.description}
              </p>
            </div>

            {/* Spec Sheet Table - Apple/LV Precision styling */}
            <div className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-3 text-xs font-mono shadow-inner">
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                <span className="text-zinc-400">Material Spec:</span>
                <span className="text-white font-bold">{currentSlide.material}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                <span className="text-zinc-400">Stitch Architecture:</span>
                <span className="text-white font-bold">{currentSlide.stitchStyle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Embroidery:</span>
                <span className="text-orange-400 font-bold truncate max-w-[190px]">{currentSlide.embroidery}</span>
              </div>
            </div>

            {/* Key Feature Pills */}
            <div className="flex flex-wrap gap-1.5">
              {currentSlide.highlights.map((h, i) => (
                <span key={i} className="text-[10px] font-medium bg-white/5 border border-white/10 text-zinc-300 px-3 py-1 rounded-full backdrop-blur-sm">
                  ✓ {h}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => onSelectSlideVehicle(currentSlide.vehicleModel, currentSlide.suggestedMatType)}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:brightness-110 active:scale-[0.99] text-white font-heading font-black uppercase text-xs sm:text-sm tracking-wider transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(249,115,22,0.4)] flex items-center justify-center space-x-2 cursor-pointer group"
            >
              <Calculator className="w-4 h-4 text-white" />
              <span>Configure This Vehicle Fitment</span>
              <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onViewGallery}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-orange-400" />
                <span>See All Workshop Photos</span>
              </button>

              <a
                href={getGalleryInquiryWhatsAppUrl(currentSlide.vehicleTitle, currentSlide.vehicleModel)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/40 text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Ask Workshop</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Picture Scroll Track & Filmstrip (Apple / Louis Vuitton Style) */}
      <div className="p-3 sm:p-4 bg-[#0a0a0d] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Scrollable Picture Thumbnails Track */}
        <div 
          ref={thumbnailContainerRef}
          className="w-full sm:flex-1 flex items-center gap-2.5 overflow-x-auto py-1 scroll-smooth scrollbar-none"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                style={{ scrollSnapAlign: 'center' }}
                className={`relative group shrink-0 rounded-xl overflow-hidden p-1 transition-all duration-300 cursor-pointer flex items-center gap-2.5 border ${
                  isActive 
                    ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.3)]' 
                    : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                {/* Mini Image Preview */}
                <div className="w-12 h-10 sm:w-14 sm:h-11 rounded-lg overflow-hidden bg-black/60 shrink-0 relative flex items-center justify-center">
                  <AssetImage
                    filename={slide.rawFilename}
                    alt={slide.vehicleTitle}
                    fit="contain"
                    className="w-full h-full"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-orange-500/15 border border-orange-500/40 rounded-lg pointer-events-none" />
                  )}
                </div>

                {/* Mini Label */}
                <div className="text-left pr-2 py-0.5 hidden xs:block">
                  <div className={`text-[10px] font-bold font-heading uppercase truncate max-w-[120px] sm:max-w-[140px] ${
                    isActive ? 'text-orange-400' : 'text-zinc-300 group-hover:text-white'
                  }`}>
                    {slide.vehicleTitle.split('(')[0]}
                  </div>
                  <div className="text-[9px] font-mono text-zinc-500 truncate max-w-[120px]">
                    {slide.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Carousel Quick Arrow Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white border border-white/10 hover:border-white/25 transition-all duration-300 hover:scale-105 cursor-pointer shadow-md"
            aria-label="Previous Installation"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white border border-white/10 hover:border-white/25 transition-all duration-300 hover:scale-105 cursor-pointer shadow-md"
            aria-label="Next Installation"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Full-Screen Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4">
          <div className="relative max-w-5xl w-full bg-[#101014] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 bg-[#18181c] border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">
                  AUTHENTIC CLIENT WORKSHOP ASSET
                </div>
                <h4 className="text-lg font-black uppercase text-white font-heading">{currentSlide.vehicleTitle}</h4>
              </div>

              <button
                onClick={() => setIsZoomOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 hover:text-black text-white transition flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Unedited Original Image View - Strictly fits/contains to preview box */}
            <div className="relative w-full flex-1 bg-black flex items-center justify-center p-3 sm:p-6 min-h-[320px] sm:min-h-[480px] max-h-[75vh] overflow-hidden">
              <AssetImage
                filename={currentSlide.rawFilename}
                alt={currentSlide.vehicleTitle}
                fit="contain"
                className="max-h-[70vh] max-w-full w-auto h-auto rounded-xl shadow-2xl"
              />
            </div>

            {/* Modal Footer Specs & CTA */}
            <div className="p-4 sm:p-5 bg-[#141418] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-zinc-300 space-y-0.5 text-center sm:text-left">
                <div className="font-bold text-white">{currentSlide.material} • {currentSlide.stitchStyle}</div>
                <div className="text-zinc-400">{currentSlide.embroidery} • Certified SABS Airbag Breakaway Seams</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsZoomOpen(false);
                    onSelectSlideVehicle(currentSlide.vehicleModel, currentSlide.suggestedMatType);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider transition cursor-pointer"
                >
                  Configure My Vehicle
                </button>
                <a
                  href={getGalleryInquiryWhatsAppUrl(currentSlide.vehicleTitle, currentSlide.vehicleModel)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold uppercase text-xs tracking-wider transition flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Quote</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

