import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
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
  { id: 'hilux-gd6', vehicleTitle: 'Toyota Hilux GD-6 Raider & Legend', vehicleModel: '2024 Toyota Hilux GD-6 Double Cab', badge: 'SA Best Seller', material: '510g Tough Ripstop Canvas', stitchStyle: 'Upper Fluted Ribs + Diamond Quilt', embroidery: 'Embroidered Dual-Tone GD-6 Badge', description: 'Precision handcrafted seat covers made for hard-working South African bakkies.', rawFilename: 'WhatsApp Image 2026-08-31 at 8.09.01 AM.jpeg', suggestedMatType: 'canvas', highlights: ['Airbag-safe breakaway seams', 'Water-resistant ripstop', 'Tailored vehicle fit'] },
  { id: 'cruiser-79', vehicleTitle: 'Land Cruiser 79 Series', vehicleModel: '2024 Toyota Land Cruiser 79 Series', badge: 'Overland Ready', material: '510g Heavy-Duty Riptech Canvas', stitchStyle: 'Double-Needle Heavy Duty Seams', embroidery: 'Land Cruiser Contrast Header Bar', description: 'Built for dust, bushveld, farming and serious overland miles.', rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.57 AM (2).jpeg', suggestedMatType: 'canvas', highlights: ['Thorn resistant', 'Heavy-duty stitching', 'Easy-clean canvas'] },
  { id: 'ranger-wildtrak', vehicleTitle: 'Ford Ranger Wildtrak', vehicleModel: '2024 Ford Ranger Wildtrak Double Cab', badge: 'Sport Performance Fit', material: '600D Poly Canvas + Sport Cushioning', stitchStyle: 'High-Contrast Diamond Quilt', embroidery: 'Sport Red RANGER Lettering', description: 'Aggressive styling, tailored protection and comfort for the next-gen Ranger.', rawFilename: 'WhatsApp Image 2026-08-31 at 8.09.00 AM (1).jpeg', suggestedMatType: 'canvas', highlights: ['Padded console cover', 'Full front + rear set', 'Tailored controls clearance'] },
  { id: 'amarok-diamond', vehicleTitle: 'Volkswagen Amarok V6 & BiTDI', vehicleModel: '2024 Volkswagen Amarok Double Cab', badge: 'Executive Diamond', material: 'Heavy-Duty Canvas with High-Density Foam', stitchStyle: 'Full Geometric Diamond Stitch', embroidery: 'Embroidered AMAROK Script', description: 'Executive comfort fused with heavy-duty everyday protection.', rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.55 AM.jpeg', suggestedMatType: 'leatherette', highlights: ['High-density foam core', 'Spill resistant', 'Sculpted side bolsters'] },
  { id: 'jeep-wrangler', vehicleTitle: 'Jeep Wrangler Rubicon', vehicleModel: '2024 Jeep Wrangler Unlimited', badge: 'Trail & All-Weather', material: 'Tactical 510g Ripstop Canvas', stitchStyle: 'Precision Contour Edging', embroidery: 'Embroidered Jeep Script', description: 'Protection engineered for open-air adventures, rain, mud and sand.', rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.53 AM.jpeg', suggestedMatType: 'canvas', highlights: ['UV & rain protection', 'Machine washable', 'Quick drying'] }
];

interface HeroGallerySliderProps {
  onSelectSlideVehicle: (vehicleName: string, materialType: 'canvas' | 'leatherette' | 'polyester') => void;
  onViewGallery: () => void;
  onStartConfiguring?: () => void;
}

export const HeroGallerySlider: React.FC<HeroGallerySliderProps> = ({ onSelectSlideVehicle, onViewGallery, onStartConfiguring }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStart = useRef<number | null>(null);
  const currentSlide = HERO_SLIDES[currentIndex];

  const next = () => setCurrentIndex((i) => (i + 1) % HERO_SLIDES.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  useEffect(() => {
    onSelectSlideVehicle(currentSlide.vehicleModel, currentSlide.suggestedMatType);
  }, [currentSlide.id]);

  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const timer = window.setInterval(next, 6500);
    return () => window.clearInterval(timer);
  }, [isPlaying, isHovered]);

  return (
    <section
      className="relative min-h-[640px] overflow-hidden bg-black sm:min-h-[700px] lg:min-h-[calc(100vh-76px)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const distance = touchStart.current - e.changedTouches[0].clientX;
        if (Math.abs(distance) > 50) distance > 0 ? next() : prev();
        touchStart.current = null;
      }}
    >
      {HERO_SLIDES.map((slide, index) => (
        <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ease-out ${index === currentIndex ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'}`}>
          <AssetImage filename={slide.rawFilename} alt={slide.vehicleTitle} fit="cover" className="absolute inset-0 h-full w-full scale-[1.01]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
        </div>
      ))}

      <div className="relative z-20 mx-auto flex min-h-[640px] max-w-7xl items-end px-5 pb-28 pt-32 sm:min-h-[700px] sm:px-8 sm:pb-32 lg:min-h-[calc(100vh-76px)] lg:px-10 lg:pb-36">
        <div className="max-w-3xl">
          <div key={currentSlide.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-orange-400/50 bg-orange-500/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-orange-300 backdrop-blur-md">{currentSlide.badge}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">Lifestyle Seat Covers</span>
            </div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-orange-400 sm:text-sm">Custom fit • Premium protection • South Africa</p>
            <h1 className="max-w-3xl font-heading text-4xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-8xl">{currentSlide.vehicleTitle}</h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base lg:text-lg">{currentSlide.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={onStartConfiguring} className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-6 py-3 text-xs font-black uppercase tracking-wider text-black transition hover:bg-orange-500">Get a quote <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></button>
              <button onClick={onViewGallery} className="min-h-12 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-xs font-black uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white/20">View gallery</button>
            </div>
            <div className="mt-7 hidden items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/55 sm:flex">
              <span>{currentSlide.material}</span><span className="h-1 w-1 rounded-full bg-orange-500" /><span>Tailored to your vehicle</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-30 flex w-[calc(100%-2.5rem)] max-w-7xl -translate-x-1/2 items-center justify-between gap-4 sm:bottom-7">
        <div className="flex items-center gap-2">
          <button onClick={prev} aria-label="Previous slide" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/10"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={next} aria-label="Next slide" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/10"><ChevronRight className="h-4 w-4" /></button>
          <button onClick={() => setIsPlaying(!isPlaying)} aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'} className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/10">{isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}</button>
        </div>
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((slide, index) => <button key={slide.id} onClick={() => setCurrentIndex(index)} aria-label={`Go to slide ${index + 1}`} className="group p-1"><span className={`block h-1 rounded-full transition-all duration-500 ${index === currentIndex ? 'w-10 bg-orange-500' : 'w-4 bg-white/35 group-hover:bg-white/70'}`} /></button>)}
        </div>
        <div className="hidden text-right sm:block"><div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{String(currentIndex + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}</div></div>
      </div>
    </section>
  );
};
