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
  X
} from 'lucide-react';
import { AssetImage } from './AssetImage';

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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = HERO_SLIDES[currentIndex];

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
      }, 6500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <div className="relative w-full bg-[#121216] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top Banner: Authentic Workshop Photo Indicator */}
      <div className="px-4 py-2.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs text-zinc-300 font-mono">
        <div className="flex items-center space-x-2">
          <Camera className="w-4 h-4 text-orange-400" />
          <span className="font-bold text-white tracking-wide">AUTHENTIC VEREENIGING WORKSHOP INSTALLATIONS</span>
          <span className="hidden sm:inline-block text-[10px] text-zinc-500">|</span>
          <span className="hidden sm:inline-block text-zinc-400 text-[11px]">Unmodified Client Photography</span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-[11px] font-bold text-orange-400">
            0{currentIndex + 1} / 0{HERO_SLIDES.length}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 hover:text-white text-zinc-400 transition"
            title={isPlaying ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Slide Content: Split Image & Text */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch flex-1">
        {/* Left / Top: Slide Photography - Contained within element box, click to enlarge */}
        <div 
          onClick={() => setIsZoomOpen(true)}
          className="md:col-span-7 relative min-h-[320px] sm:min-h-[420px] bg-[#0c0c0e] overflow-hidden flex items-center justify-center group cursor-pointer border-b md:border-b-0 md:border-r border-white/10 p-2 sm:p-4"
        >
          <AssetImage
            key={currentSlide.id}
            filename={currentSlide.rawFilename}
            alt={currentSlide.vehicleTitle}
            fit="contain"
            className="w-full h-full max-h-[440px] animate-in fade-in zoom-in-95 duration-500 group-hover:scale-105 transition duration-500"
          />

          {/* Overlay Tag Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-black/85 backdrop-blur-md border border-orange-500/40 text-orange-400 px-2.5 py-1 rounded-md shadow">
              {currentSlide.badge}
            </span>

            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-black/85 backdrop-blur-md border border-white/15 text-zinc-200 px-2 py-1 rounded-md flex items-center gap-1 shadow">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Airbag Safe
            </span>
          </div>

          {/* Zoom Hover Badge */}
          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl opacity-90 group-hover:opacity-100 flex items-center gap-1.5 shadow-lg transition">
            <Maximize2 className="w-3.5 h-3.5 text-orange-400" />
            <span>Click to View Full Photo</span>
          </div>
          
          <div className="absolute bottom-3 left-3 text-[10px] font-mono text-zinc-300 bg-black/70 px-2.5 py-1 rounded border border-white/10">
            🇿🇦 Handcrafted in Vereeniging
          </div>
        </div>

        {/* Right / Bottom: Specifications & Instant Quote Launcher */}
        <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-b from-[#141418] to-[#101014]">
          <div className="space-y-4">
            <div>
              <div className="text-[11px] font-mono text-orange-500 uppercase tracking-widest font-bold">
                PROVEN WORKSHOP FITMENT
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1 leading-tight font-heading">
                {currentSlide.vehicleTitle}
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {currentSlide.description}
              </p>
            </div>

            {/* Spec Sheet Table */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-3.5 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-zinc-400">Material Spec:</span>
                <span className="text-white font-bold">{currentSlide.material}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-zinc-400">Stitch Architecture:</span>
                <span className="text-white font-bold">{currentSlide.stitchStyle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Embroidery:</span>
                <span className="text-orange-400 font-bold truncate max-w-[180px]">{currentSlide.embroidery}</span>
              </div>
            </div>

            {/* Key Feature Pills */}
            <div className="flex flex-wrap gap-1.5">
              {currentSlide.highlights.map((h, i) => (
                <span key={i} className="text-[10px] font-medium bg-white/5 border border-white/10 text-zinc-300 px-2.5 py-1 rounded-md">
                  ✓ {h}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => onSelectSlideVehicle(currentSlide.vehicleModel, currentSlide.suggestedMatType)}
              className="w-full py-3.5 px-5 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-heading font-black uppercase text-xs sm:text-sm tracking-wider transition shadow-lg flex items-center justify-center space-x-2 cursor-pointer group"
            >
              <Calculator className="w-4 h-4 text-white" />
              <span>Configure This Vehicle Fitment</span>
              <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onViewGallery}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-orange-400" />
                <span>See All 21 Photos</span>
              </button>

              <a
                href={`https://wa.me/27725916960?text=${encodeURIComponent(
                  `Hi Lifestyle Seat Covers, I am interested in the ${currentSlide.vehicleTitle} custom seat covers shown in your workshop photos.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 text-xs font-bold transition flex items-center space-x-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Ask Workshop</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer Row */}
      <div className="px-4 sm:px-6 py-3 bg-[#0e0e12] border-t border-white/10 flex items-center justify-between">
        {/* Slide Indicators */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto py-1">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex 
                  ? 'w-8 bg-orange-500' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              title={slide.vehicleTitle}
            />
          ))}
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white border border-white/10 transition cursor-pointer"
            aria-label="Previous Installation"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white border border-white/10 transition cursor-pointer"
            aria-label="Next Installation"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Full-Screen Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
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
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-orange-500 text-white transition flex items-center justify-center cursor-pointer"
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
                  href={`https://wa.me/27725916960?text=${encodeURIComponent(
                    `Hi, I am looking at the unedited photo of the ${currentSlide.vehicleTitle} fitment. Can you give me a quote?`
                  )}`}
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
