import React from 'react';
import { ArrowRight, Check, Droplets, ShieldCheck, Sparkles } from 'lucide-react';
import { AssetImage } from './AssetImage';

interface MaterialMatrixProps {
  onSelectMaterial: (materialId: string) => void;
  onOpenSwatches: () => void;
}

const MATERIALS = [
  { id: 'heavy-duty-ripstop-canvas', name: 'Tough Ripstop Canvas', short: 'Rugged protection for bakkies, 4x4s and working vehicles.', image: 'WhatsApp Image 2026-09-16 at 8.32.12 AM.jpeg', tone: 'Best for 4x4 & work', points: ['Hard-wearing', 'Water resistant', 'Adventure ready'] },
  { id: 'rhino-hide-leatherette', name: 'Automotive Leatherette', short: 'A cleaner, more refined finish for daily drivers and SUVs.', image: 'WhatsApp Image 2026-09-16 at 8.32.15 AM.jpeg', tone: 'Best for comfort & style', points: ['Easy clean', 'Premium finish', 'Custom stitching'] },
  { id: '600d-synthetic-polyester', name: 'Heavy-Duty Polyester', short: 'Practical protection for commuters, fleets and high-use vehicles.', image: 'WhatsApp Image 2026-09-16 at 8.32.23 AM (1).jpeg', tone: 'Best for fleets', points: ['Durable weave', 'Easy maintenance', 'Daily ready'] },
];

export const MaterialMatrix: React.FC<MaterialMatrixProps> = ({ onSelectMaterial, onOpenSwatches }) => (
  <section id="fabric-matrix" className="w-full bg-[#0c0c0e] py-14 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20" aria-label="Custom seat cover materials">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
        <div className="max-w-2xl">
          <span className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-400">Choose your finish</span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">Three materials. One proper fit.</h2>
          <p className="mt-2 text-sm text-zinc-400">Start with the look and protection you want. We’ll tailor the cover to your vehicle.</p>
        </div>
        <button onClick={onOpenSwatches} className="self-start md:self-auto inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.14em] text-white hover:bg-white/10 transition">Request fabric swatches <ArrowRight className="w-3.5 h-3.5" /></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MATERIALS.map((material, index) => (
          <article key={material.id} className={`group relative overflow-hidden rounded-2xl border ${index === 0 ? 'border-orange-500/40' : 'border-white/10'} bg-[#121216] min-h-[330px]`}>
            <AssetImage filename={material.image} alt={material.name} fit="cover" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/10" />
            <div className="relative z-10 min-h-[330px] flex flex-col justify-end p-5">
              <span className="inline-flex self-start mb-2 rounded-full bg-black/55 border border-white/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-orange-300 backdrop-blur-sm">{material.tone}</span>
              <h3 className="font-heading text-xl font-black uppercase text-white">{material.name}</h3>
              <p className="mt-1.5 max-w-sm text-xs leading-5 text-white/70">{material.short}</p>
              <div className="mt-3 flex flex-wrap gap-2">{material.points.map((point) => <span key={point} className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-white/80"><Check className="w-3 h-3 text-orange-400" />{point}</span>)}</div>
              <button onClick={() => onSelectMaterial(material.id)} className="mt-4 inline-flex self-start items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-black hover:bg-orange-500 hover:text-white transition">Choose this material <ArrowRight className="w-3.5 h-3.5" /></button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[10px] uppercase tracking-[0.12em] font-bold text-zinc-400">
        <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Airbag-conscious fitment</div>
        <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3"><Droplets className="w-4 h-4 text-blue-400" /> Everyday spill protection</div>
        <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3"><Sparkles className="w-4 h-4 text-orange-400" /> Custom colours & stitching</div>
      </div>
    </div>
  </section>
);
