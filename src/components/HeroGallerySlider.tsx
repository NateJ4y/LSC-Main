import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Camera, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Maximize2, 
  ArrowRight, 
  MessageCircle,
  Calculator,
  Layers,
  Award
} from 'lucide-react';
import hiluxGd6Img from '../assets/images/hilux_gd6_covers_1788330516757.jpg';
import cruiser79Img from '../assets/images/cruiser_79_covers_1788330530981.jpg';
import rangerRedImg from '../assets/images/ranger_red_covers_1788330546716.jpg';
import amarokDiamondImg from '../assets/images/amarok_diamond_covers_1788330560423.jpg';
import showroomImg from '../assets/images/showroom_display_seats_1788330578843.jpg';
import jeepImg from '../assets/images/jeep_wrangler_covers_1788330596374.jpg';
import fleetImg from '../assets/images/gwm_fleet_covers_1788330612996.jpg';

export interface HeroSlide {
  id: string;
  vehicleTitle: string;
  vehicleModel: string;
  badge: string;
  material: string;
  stitchStyle: string;
  embroidery: string;
  description: string;
  image: string;
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
    image: hiluxGd6Img,
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
    image: cruiser79Img,
    suggestedMatType: 'canvas',
    highlights: ['Thorn & Red Dust Resistant', 'Sand Beige Accent Strip', 'Heavy-Gauge Double-Needle Seams']
  },
  {
    id: 'ranger-wildtrak',
    vehicleTitle: 'Ford Ranger Wildtrak & Next-Gen',
    vehicleModel: '2024 Ford Ranger Wildtrak Double Cab',
    badge: 'Sport Performance Fit',
    material: '600D Poly Canvas + Sport Cushioning',
    stitchStyle: 'High-Contrast Red Sport Stitching',
    embroidery: 'Red RANGER Upper Script',
    description: 'Aggressive sport interior styling featuring high-contrast red perimeter stitching and a tailored matching padded console armrest cover.',
    image: rangerRedImg,
    suggestedMatType: 'canvas',
    highlights: ['Matching Padded Console Cover', 'UV-Bonded Red Contrast Thread', 'Retains Full Electric Seat Levers']
  },
  {
    id: 'amarok-diamond',
    vehicleTitle: 'Volkswagen Amarok V6 & BiTDI',
    vehicleModel: '2024 Volkswagen Amarok Double Cab',
    badge: 'Executive Diamond Stitch',
    material: 'Heavy-Duty Canvas with High-Density Foam',
    stitchStyle: 'Full Geometric Diamond Silver Needle',
    embroidery: 'Embroidered AMAROK Silver Script',
    description: 'Executive elegance fused with heavy-duty defense. The padded diamond quilt provides extra lumbar cushioning for long highway journeys.',
    image: amarokDiamondImg,
    suggestedMatType: 'leatherette',
    highlights: ['High-Density Foam Core', 'Sweat & Spill Resistant', 'Sculpted Side Bolsters']
  },
  {
    id: 'jeep-wrangler',
    vehicleTitle: 'Jeep Wrangler Rubicon & Gladiator',
    vehicleModel: '2024 Jeep Wrangler Unlimited',
    badge: 'Trail & All-Weather',
    material: 'Tactical 510g Ripstop Canvas',
    stitchStyle: 'White Precision Contour Edging',
    embroidery: 'Embroidered Jeep Script',
    description: 'Engineered for open-air trail exploration. Repels sudden rain downpours, muddy trails, and abrasive sand without water soaking through.',
    image: jeepImg,
    suggestedMatType: 'canvas',
    highlights: ['Open-Top UV & Rain Shield', 'Includes Headrests & Armrests', 'Machine Washable & Quick Dry']
  },
  {
    id: 'corporate-fleet',
    vehicleTitle: 'Commercial & Corporate Bakkie Fleets',
    vehicleModel: '2024 GWM P-Series / Isuzu D-Max Fleet',
    badge: 'Fleet Equity Protection',
    material: 'Industrial Grade 600D Oxford Polyester',
    stitchStyle: 'Reinforced Twin-Needle Seams',
    embroidery: 'Custom Corporate Logo & Dept Badges',
    description: 'Protect company vehicle resale value against rough workboots, grease, tools, and daily crew rotation with custom embroidered branding.',
    image: fleetImg,
    suggestedMatType: 'polyester',
    highlights: ['Custom Company Logo Embroidery', 'Fast 10-Min Wipe-Down Care', 'Commercial Grade Durability']
  },
  {
    id: 'showroom-bench',
    vehicleTitle: 'Vereeniging Workshop Showroom',
    vehicleModel: 'Unit 6 Assegai St, Vereeniging',
    badge: 'Visit Us In Person',
    material: 'All Fabric Options on Live Demo Stand',
    stitchStyle: 'Diamond, Fluted, Red Sport & Plain',
    embroidery: 'Lifestyle Seat Covers Demo Stand',
    description: 'Inspect our 510g Riptech canvas and test the snug fitment on our live demonstration seating bench at our Vereeniging factory.',
    image: showroomImg,
    suggestedMatType: 'canvas',
    highlights: ['Live Demo Seating Bench', 'Feel Real Canvas Swatches', 'On-Site Fitment Service Available']
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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = HERO_SLIDES[currentIndex];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div 
      className="bg-[#141418] border border-white/10 hover:border-orange-500/30 transition-colors duration-300 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Top Bar with Title & Navigation Controls */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-black/40">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>REAL WORKSHOP FITMENTS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-tight">
              Slide Preview ({currentIndex + 1} of {HERO_SLIDES.length})
            </div>
          </div>
        </div>

        {/* Carousel Prev / Next / Play Controls */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="w-8 h-8 rounded-lg bg-black/60 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition flex items-center justify-center cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
          
          <button
            onClick={handlePrev}
            title="Previous fitment"
            className="w-8 h-8 rounded-lg bg-black/60 hover:bg-orange-500 hover:text-black border border-white/10 text-white transition flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            title="Next fitment"
            className="w-8 h-8 rounded-lg bg-black/60 hover:bg-orange-500 hover:text-black border border-white/10 text-white transition flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Content: Split Image & Text */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch flex-1">
        {/* Left / Top: Slide Photography */}
        <div className="md:col-span-7 relative min-h-[260px] sm:min-h-[320px] bg-black overflow-hidden flex items-center justify-center group">
          <img
            key={currentSlide.id}
            src={currentSlide.image}
            alt={currentSlide.vehicleTitle}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center animate-in fade-in zoom-in-95 duration-500"
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

          {/* Bottom Gradient for Contrast */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-zinc-300 bg-black/70 px-2 py-0.5 rounded border border-white/10">
            🇿🇦 Handcrafted in Vereeniging
          </div>
        </div>

        {/* Right / Bottom: Detailed Specs & Quick Actions */}
        <div className="md:col-span-5 p-5 sm:p-6 flex flex-col justify-between space-y-4 bg-[#141418]">
          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest block">
                {currentSlide.material}
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-black uppercase text-white tracking-tight leading-snug mt-0.5">
                {currentSlide.vehicleTitle}
              </h3>
            </div>

            <p className="text-xs text-[#8C9BA8] leading-relaxed line-clamp-2">
              {currentSlide.description}
            </p>

            {/* Spec Matrix Box */}
            <div className="bg-black/60 border border-white/10 rounded-xl p-3 space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-zinc-500 font-mono">Stitch Pattern:</span>
                <span className="text-white font-medium truncate max-w-[60%] text-right">{currentSlide.stitchStyle}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-zinc-500 font-mono">Embroidery:</span>
                <span className="text-orange-400 font-medium truncate max-w-[60%] text-right">{currentSlide.embroidery}</span>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-1.5">
              {currentSlide.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-[11px] text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs for this Slide */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <button
              onClick={() => onSelectSlideVehicle(currentSlide.vehicleModel, currentSlide.suggestedMatType)}
              className="w-full py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider transition flex items-center justify-center space-x-2 shadow cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Use This in Quick Calculator</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onViewGallery}
                className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-200 font-bold uppercase text-[10px] tracking-wider transition border border-white/10 flex items-center justify-center space-x-1 cursor-pointer"
              >
                <Maximize2 className="w-3 h-3 text-orange-400" />
                <span>View in Gallery</span>
              </button>

              <a
                href={`https://wa.me/27834455370?text=Hi%20Lifestyle%20Seat%20Covers,%20I%20saw%20the%20Hero%20preview%20for%20the%20${encodeURIComponent(currentSlide.vehicleTitle)}%20and%20would%20like%20a%20quote.`}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold uppercase text-[10px] tracking-wider transition border border-emerald-500/30 flex items-center justify-center space-x-1 cursor-pointer"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp Quote</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Thumbnail Strip with Progress Indicator */}
      <div className="p-3 bg-black/60 border-t border-white/10 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 w-full">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-1 min-w-[70px] sm:min-w-[90px] py-1.5 px-2 rounded-lg text-left transition border cursor-pointer ${
                currentIndex === idx
                  ? 'bg-orange-500/20 border-orange-500 text-white'
                  : 'bg-black/40 border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold block">
                  0{idx + 1}
                </span>
                {currentIndex === idx && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                )}
              </div>
              <div className="text-[10px] font-semibold truncate leading-tight mt-0.5">
                {slide.vehicleTitle.split(' ')[0]} {slide.vehicleTitle.split(' ')[1] || ''}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
