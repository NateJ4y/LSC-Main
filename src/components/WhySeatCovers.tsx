import React from 'react';
import { 
  ShieldAlert, 
  Sun, 
  Dog, 
  Coffee, 
  HardHat, 
  Users, 
  Sparkles, 
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface WhySeatCoversProps {
  onGetQuote: () => void;
  onExploreMaterials: () => void;
}

export const WhySeatCovers: React.FC<WhySeatCoversProps> = ({
  onGetQuote,
  onExploreMaterials
}) => {
  const threats = [
    {
      title: 'Dirt, Dust & Mud',
      desc: 'Fine red Kalahari dust and clay mud embed deep into factory seat foam, causing permanent fabric staining and odor.',
      icon: HardHat
    },
    {
      title: 'Intense African Sun',
      desc: 'High UV index dries out factory leather, cracks vinyl seams, and bleaches original automotive fabric bolsters.',
      icon: Sun
    },
    {
      title: 'Spills & Work Chemicals',
      desc: 'Coffee, energy drinks, diesel residues, and grease soak through stock upholstery, destroying underlying foam cushions.',
      icon: Coffee
    },
    {
      title: 'Work Gear & PPE',
      desc: 'Tool belts, abrasive work denim, measuring tapes, and heavy gear cause severe bolster wear and torn seam stitching.',
      icon: ShieldAlert
    },
    {
      title: 'Pets & Sharp Claws',
      desc: 'Hunting dogs and family pets scratch leather finishes, snag woven threads, and leave difficult-to-remove hair.',
      icon: Dog
    },
    {
      title: 'High-Turnover Passengers',
      desc: 'Frequent commercial, shuttle, and fleet passenger traffic rapidly degrades seat cushioning and causes premature sagging.',
      icon: Users
    }
  ];

  return (
    <section className="w-full bg-[#0c0c0e] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-white/10 pb-8">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest bg-[#141418] border border-orange-500/20 px-3 py-1 rounded-md font-mono">
              <span>PREVENTATIVE ASSET PROTECTION</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              YOUR ORIGINAL SEATS AREN'T <span className="text-white border-b-2 border-orange-500 pb-1">CHEAP TO REPLACE</span>.
            </h2>
            <p className="text-sm sm:text-base text-[#8C9BA8] max-w-2xl leading-relaxed">
              Replacing or reupholstering OEM seats from a vehicle dealership easily costs upwards of <strong className="text-white">R15,000 to R45,000</strong>. Factory upholstery takes daily punishment from South Africa’s extreme environment. Prevent the damage before it destroys your resale value.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
            <button
              onClick={onGetQuote}
              className="py-3 px-6 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase text-xs tracking-wider transition shadow text-center cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Get A Custom Quote</span>
              <ArrowRight className="w-4 h-4 text-orange-600" />
            </button>
            <button
              onClick={onExploreMaterials}
              className="py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold uppercase text-xs tracking-wider transition border border-white/10 text-center cursor-pointer"
            >
              View Protective Materials
            </button>
          </div>
        </div>

        {/* Threat Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {threats.map((threat, idx) => {
            const Icon = threat.icon;
            return (
              <div
                key={idx}
                className="bg-[#141418] border border-white/10 hover:border-white/20 transition rounded-2xl p-5 space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 group-hover:bg-white/10 transition">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-base font-bold uppercase text-white tracking-wide">
                  {threat.title}
                </h3>
                <p className="text-xs text-[#8C9BA8] leading-relaxed">
                  {threat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Protection Equation Comparison Strip */}
        <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
                THE LIFESTYLE SOLUTION
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-white">
                WE BUILD A SACRIFICIAL, INDESTRUCTIBLE SHIELD OVER YOUR OEM UPHOLSTERY
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
                When you trade in or sell your vehicle, unclip your Lifestyle seat covers to reveal factory-fresh, showroom-condition original seats — securing top trade-in valuation.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#0c0c0e] border border-white/10 p-4.5 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">OEM Reupholstery:</span>
                <span className="text-red-400 font-bold line-through">R18,000 – R45,000</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono border-t border-white/5 pt-2">
                <span className="text-white font-bold">Lifestyle Custom Set:</span>
                <span className="text-emerald-400 font-bold text-sm">From R3,950</span>
              </div>
              <div className="text-[11px] text-zinc-400 pt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>24-Month Comprehensive SA Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
