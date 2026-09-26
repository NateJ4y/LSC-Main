import React, { useEffect, useRef } from 'react';
import { ArrowRight, ChevronRight, MessageCircle } from 'lucide-react';
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

/** Seven original/gallery photographs already present in the project. */
export const HERO_GALLERY_IMAGES = [
  { id: 'new-design-01', filename: 'WhatsApp Image 2026-09-16 at 8.32.12 AM (1).jpeg', title: 'New Design 01', category: 'New Designs' },
  { id: 'new-design-10', filename: 'WhatsApp Image 2026-09-16 at 8.32.15 AM (2).jpeg', title: 'New Design 10', category: 'New Designs' },
  { id: 'new-design-14', filename: 'WhatsApp Image 2026-09-16 at 8.32.16 AM.jpeg', title: 'New Design 14', category: 'New Designs' },
  { id: 'new-design-21', filename: 'WhatsApp Image 2026-09-16 at 8.32.19 AM (1).jpeg', title: 'New Design 21', category: 'New Designs' },
  { id: 'new-design-32', filename: 'WhatsApp Image 2026-09-16 at 8.32.22 AM.jpeg', title: 'New Design 32', category: 'New Designs' },
  { id: 'new-design-43', filename: 'WhatsApp Image 2026-09-16 at 8.32.28 AM.jpeg', title: 'New Design 43', category: 'New Designs' },
  { id: 'new-design-53', filename: 'WhatsApp Image 2026-09-16 at 8.32.31 AM.jpeg', title: 'New Design 53', category: 'New Designs' },
] as const;

interface HeroGallerySliderProps {
  onSelectSlideVehicle: (vehicleName: string, materialType: 'canvas' | 'leatherette' | 'polyester') => void;
  onViewGallery: () => void;
  onStartConfiguring?: () => void;
}

export const HeroGallerySlider: React.FC<HeroGallerySliderProps> = ({
  onSelectSlideVehicle,
  onViewGallery,
  onStartConfiguring,
}) => {
  const hasSelectedDefault = useRef(false);

  useEffect(() => {
    if (hasSelectedDefault.current) return;
    hasSelectedDefault.current = true;
    onSelectSlideVehicle('2024 Toyota Hilux GD-6 Double Cab', 'canvas');
  }, [onSelectSlideVehicle]);

  return (
    <section
      className="lsc-hero-marquee relative min-h-[650px] overflow-hidden bg-[#070707] text-white lg:min-h-[calc(100vh-76px)]"
      aria-labelledby="lsc-hero-title"
    >
      <style>{`
        @keyframes lscHeroMarquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        .lsc-hero-marquee__track {
          animation: lscHeroMarquee 38s linear infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .lsc-hero-marquee__track {
            animation: none;
            transform: none;
          }
        }
      `}</style>

      <div className="absolute inset-y-0 right-0 w-full overflow-hidden lg:w-[69%]" aria-label="Lifestyle Seat Covers gallery">
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-black/35 to-transparent lg:z-20 lg:w-[38%]" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-black/15" />

        <div className="lsc-hero-marquee__track flex h-full w-max items-stretch gap-1 px-0 sm:gap-1 lg:gap-2">
          {[0, 1].map((setIndex) => (
            <div
              key={setIndex}
              className="flex h-full items-stretch gap-1 sm:gap-1 lg:gap-2"
              aria-hidden={setIndex === 1}
            >
              {HERO_GALLERY_IMAGES.map((image) => (
                <button
                  key={`${setIndex}-${image.id}`}
                  type="button"
                  onClick={onViewGallery}
                  className="group relative h-full w-[42vw] max-w-[300px] min-w-[190px] shrink-0 overflow-hidden text-left outline-none sm:w-[30vw] lg:w-[15vw] lg:min-w-[190px]"
                  style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }}
                  aria-label={`View ${image.title} gallery image`}
                  tabIndex={setIndex === 1 ? -1 : 0}
                >
                  <AssetImage
                    filename={image.filename}
                    alt={image.title}
                    fit="cover"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-black/10" />
                  <div className="absolute bottom-8 left-7 right-4 z-10">
                    <span className="block text-[9px] font-black uppercase tracking-[0.22em] text-orange-400">{image.category}</span>
                    <span className="mt-1 block text-sm font-black uppercase leading-tight text-white drop-shadow-lg">{image.title}</span>
                  </div>
                  <span className="absolute right-5 top-7 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100 group-focus-visible:opacity-100">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2 bg-gradient-to-r from-[#070707] via-[#070707]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#070707]/60 to-transparent" />
      </div>

      <div className="relative z-30 flex min-h-[650px] items-end lg:min-h-[calc(100vh-76px)]">
        <div className="mx-auto flex w-full max-w-[1600px] items-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white/70">Vereeniging • Gauteng • South Africa</span>
            </div>

            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-orange-400 sm:text-xs">Custom fit. Built properly.</p>
            <h1
              id="lsc-hero-title"
              className="max-w-xl font-heading text-3xl font-black uppercase leading-[0.9] tracking-[-0.025em] text-white sm:text-4xl lg:text-5xl"
            >
              Seat covers
              <br />
              <span className="text-white/55">made for</span>
              <br />
              your vehicle.
            </h1>
            <p className="mt-4 max-w-md text-xs leading-6 text-white/68 sm:text-sm sm:leading-7">
              Precision-tailored seat covers for bakkies, SUVs and commercial fleets — fitted for real South African roads and built around your vehicle.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href="#customizer-studio"
                onClick={onStartConfiguring}
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-black shadow-2xl transition duration-300 hover:-translate-y-0.5 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/80"
              >
                Get my quote
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#gallery"
                onClick={onViewGallery}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                Explore fitments
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[8px] font-black uppercase tracking-[0.16em] text-white/45">
              <span>7 real workshop fitments</span>
              <span className="h-1 w-1 rounded-full bg-orange-500" />
              <span>Custom embroidery</span>
              <span className="h-1 w-1 rounded-full bg-orange-500" />
              <span>Quote only</span>
            </div>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/27674736068"
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-7 right-7 z-40 hidden items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-600/85 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-xl backdrop-blur-md transition hover:bg-emerald-500 lg:flex"
        aria-label="Chat with Lifestyle Seat Covers on WhatsApp"
      >
        <MessageCircle className="h-4 w-4 fill-current" />
        WhatsApp us
      </a>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-40 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};
