import React from 'react';
import { 
  ShieldCheck, 
  Droplets, 
  Sun, 
  Dog, 
  Check, 
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { MATERIALS_DATA } from '../data/materialsData';

interface MaterialMatrixProps {
  onSelectMaterial: (materialId: string) => void;
  onOpenSwatches: () => void;
}

export const MaterialMatrix: React.FC<MaterialMatrixProps> = ({
  onSelectMaterial,
  onOpenSwatches
}) => {
  return (
    <section id="fabric-matrix" className="w-full bg-[#0c0c0e] py-14 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-orange-400 uppercase tracking-widest bg-[#141418] border border-orange-500/20 px-3 py-1 rounded-md font-mono">
            <Layers className="w-3.5 h-3.5 text-orange-500" />
            <span>SIMPLE MATERIAL GUIDE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            CHOOSE YOUR FABRIC
          </h2>
          <p className="text-sm text-[#8C9BA8]">
            Built specifically for South African conditions, active lifestyles, pets, workouts, and everyday vehicle use. Handcrafted in our Vereeniging workshop.
          </p>
        </div>

        {/* 3 Core Material Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Heavy Duty Ripstop Canvas */}
          <div className="bg-[#141418] border-2 border-orange-500/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative shadow-xl hover:border-orange-500 transition">
            <div className="absolute top-4 right-4 bg-orange-500 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
              #1 FOR BAKKIES & 4X4
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs font-mono font-bold text-orange-400 uppercase">510g Heavy-Duty</div>
                <h3 className="font-heading text-2xl font-bold uppercase text-white mt-0.5">
                  Ripstop Canvas
                </h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  Toughest fabric on the market. Waterproof, tear-resistant, Kalahari thorn-proof, and impervious to red mud.
                </p>
              </div>

              {/* Quick Feature Bullets */}
              <div className="space-y-2 text-xs text-zinc-300 py-2 border-y border-white/10">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Waterproof & Mud Resistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dog claw & heavy equipment proof</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>UV stabilized (won't fade or rot in SA sun)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Available in Charcoal, Khaki Sand, Black & Olive</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Starting from</span>
                <span className="text-2xl font-black font-mono text-white">R2,650</span>
                <span className="text-xs text-zinc-400 block">Front Set / R3,950 Full Set</span>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/10">
              <button
                onClick={() => onSelectMaterial('heavy-duty-ripstop-canvas')}
                className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold uppercase text-xs tracking-wider transition cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Customize in Canvas</span>
                <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
              </button>
            </div>
          </div>

          {/* 2. Rhino Leatherette */}
          <div className="bg-[#141418] border border-white/15 rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative shadow-xl hover:border-white/40 transition">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-mono font-bold text-zinc-400 uppercase">Automotive Grade</div>
                <h3 className="font-heading text-2xl font-bold uppercase text-white mt-0.5">
                  Rhino Leatherette
                </h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  Executive luxury look with padded foam comfort. Easy to wipe clean with a damp cloth — perfect for family SUVs.
                </p>
              </div>

              {/* Quick Feature Bullets */}
              <div className="space-y-2 text-xs text-zinc-300 py-2 border-y border-white/10">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Wipe-clean in seconds (coffee, juice, mud)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Laminated with high-density comfort foam</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pet hair doesn't stick to surface</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Available in Onyx Black, Cognac Brown & Grey</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Starting from</span>
                <span className="text-2xl font-black font-mono text-white">R2,950</span>
                <span className="text-xs text-zinc-400 block">Front Set / R4,450 Full Set</span>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/10">
              <button
                onClick={() => onSelectMaterial('rhino-hide-leatherette')}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold uppercase text-xs tracking-wider transition border border-white/20 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Customize in Leatherette</span>
                <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
              </button>
            </div>
          </div>

          {/* 3. 600D Heavy Duty Polyester */}
          <div className="bg-[#141418] border border-white/15 rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative shadow-xl hover:border-white/40 transition">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-mono font-bold text-zinc-400 uppercase">Workhorse & Commuter</div>
                <h3 className="font-heading text-2xl font-bold uppercase text-white mt-0.5">
                  600D Polyester
                </h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  Hard-wearing and breathable everyday protection. Ideal for daily drivers, work teams, delivery bakkies and fleets.
                </p>
              </div>

              {/* Quick Feature Bullets */}
              <div className="space-y-2 text-xs text-zinc-300 py-2 border-y border-white/10">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Durable 600D synthetic weave</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Breathable & cool in summer heat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Stain resistant & machine washable</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Great budget-friendly complete protection</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">Starting from</span>
                <span className="text-2xl font-black font-mono text-white">R2,450</span>
                <span className="text-xs text-zinc-400 block">Front Set / R3,650 Full Set</span>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/10">
              <button
                onClick={() => onSelectMaterial('600d-synthetic-polyester')}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold uppercase text-xs tracking-wider transition border border-white/20 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Customize in Polyester</span>
                <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
              </button>
            </div>
          </div>

        </div>

        {/* Free Swatch Pack Banner */}
        <div className="p-4 sm:p-5 bg-black/50 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <Sparkles className="w-6 h-6 text-orange-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white uppercase">Want to touch and feel the fabrics first?</h4>
              <p className="text-xs text-[#8C9BA8]">We couriered free physical sample swatches across South Africa.</p>
            </div>
          </div>
          <button
            onClick={onOpenSwatches}
            className="py-2 px-5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition shrink-0 cursor-pointer"
          >
            Request Free Fabric Swatches
          </button>
        </div>

      </div>
    </section>
  );
};
