import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  SlidersHorizontal,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface BeforeAfterSliderProps {
  onGetQuote: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onGetQuote }) => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activePreset, setActivePreset] = useState<'bakkie' | 'suv'>('bakkie');

  return (
    <section id="transformation-before-after" className="w-full bg-[#101014] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest bg-[#16161b] border border-orange-500/20 px-3 py-1 rounded-md font-mono">
            <span>REAL-WORLD TRANSFORMATION</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            ORIGINAL WORN SEAT VS. LIFESTYLE PROTECTED DEFENSE
          </h2>
          <p className="text-xs sm:text-sm text-[#8C9BA8]">
            Slide to see how our custom-tailored covers shield your vehicle's original upholstery against grease, sun cracking, and torn bolsters.
          </p>
        </div>

        {/* Visual Interactive Before/After Component */}
        <div className="max-w-4xl mx-auto bg-[#16161b] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Preset Buttons */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setActivePreset('bakkie')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activePreset === 'bakkie' ? 'bg-white text-black' : 'bg-black/50 text-[#8C9BA8] border border-white/10'
              }`}
            >
              Toyota Hilux / 4x4 Bakkie Set
            </button>
            <button
              onClick={() => setActivePreset('suv')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activePreset === 'suv' ? 'bg-white text-black' : 'bg-black/50 text-[#8C9BA8] border border-white/10'
              }`}
            >
              Executive SUV / Overland Leather
            </button>
          </div>

          {/* Interactive Split View Container */}
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-black select-none">
            
            {/* Left Side: "BEFORE" - Unprotected Worn Seat */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-stone-950 flex flex-col justify-between p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="bg-red-500/20 border border-red-500/40 text-red-400 font-mono text-xs font-bold uppercase px-3 py-1 rounded-md flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" /> UNPROTECTED FACTORY SEAT
                </span>
              </div>

              {/* Graphic Representation of Worn Upholstery */}
              <div className="space-y-3 max-w-sm">
                <div className="p-3.5 bg-black/60 border border-red-500/20 rounded-xl space-y-1">
                  <div className="text-red-400 font-bold text-xs font-mono">⚠️ Severe UV Degradation & Red Dust</div>
                  <p className="text-[11px] text-zinc-400">
                    Frayed bolster stitching, cracked vinyl edges from farm sweat, and deep coffee stain penetration into core foam cushions.
                  </p>
                </div>
                <div className="text-xs font-mono text-zinc-500">
                  Dealer Reupholstery Quote: <span className="text-red-400 line-through font-bold">R28,500</span>
                </div>
              </div>
            </div>

            {/* Right Side: "AFTER" - Lifestyle Custom Protected (Clipped with slider) */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-[#1c1d22] to-[#121316] flex flex-col justify-between p-6 sm:p-8 border-l border-white/30"
              style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
            >
              <div className="flex items-center justify-end">
                <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold uppercase px-3 py-1 rounded-md flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> LIFESTYLE PROTECTED
                </span>
              </div>

              {/* Graphic Representation of Protected Seat */}
              <div className="space-y-3 max-w-sm ml-auto text-right">
                <div className="p-3.5 bg-black/70 border border-emerald-500/30 rounded-xl space-y-1">
                  <div className="text-emerald-400 font-bold text-xs font-mono">✅ 100% Laser-Fit Protective Shield</div>
                  <p className="text-[11px] text-zinc-300">
                    510g Heavy Riptech® Canvas, high-tensile contrast stitching, and SABS airbag break-away seams.
                  </p>
                </div>
                <div className="text-xs font-mono text-emerald-400 font-bold">
                  Guaranteed Resale Protection • 24-Mo Warranty
                </div>
              </div>
            </div>

            {/* Slider Divider Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-2xl border-2 border-orange-600">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Slider Controls Slider Input */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-zinc-400">
              <span>← Slide Left for Factory Damage</span>
              <span>Slide Right for Lifestyle Defense →</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-ew-resize"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="text-xs text-zinc-400 text-center sm:text-left">
              Protect your vehicle interior today before wear reduces your trade-in value.
            </div>
            <button
              onClick={onGetQuote}
              className="py-3 px-6 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase text-xs tracking-wider transition shadow cursor-pointer flex items-center space-x-2 shrink-0"
            >
              <span>Get Your Protective Quote</span>
              <ArrowRight className="w-4 h-4 text-orange-600" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
