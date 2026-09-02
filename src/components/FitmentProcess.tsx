import React from 'react';
import { 
  Car, 
  Sliders, 
  Scissors, 
  Wrench, 
  CheckCircle2, 
  ArrowRight,
  Truck,
  MapPin
} from 'lucide-react';

interface FitmentProcessProps {
  onStartQuote: () => void;
}

export const FitmentProcess: React.FC<FitmentProcessProps> = ({ onStartQuote }) => {
  const steps = [
    {
      step: '01',
      title: 'TELL US ABOUT YOUR VEHICLE',
      description: 'Provide your vehicle make, model, year, and specific cab layout (Single, Extra, or Double Cab), plus split bench details and side airbag information.',
      icon: Car,
      tag: 'Step 1: Vehicle Survey'
    },
    {
      step: '02',
      title: 'CHOOSE YOUR OPTIONS',
      description: 'Select your preferred fabric (Riptech® 510g canvas, 600D synthetic polyester, or automotive leatherette), thread stitch color, custom embroidery, and consoles.',
      icon: Sliders,
      tag: 'Step 2: Customise'
    },
    {
      step: '03',
      title: 'WE CRAFT YOUR COVERS',
      description: 'Your patterns are precision laser-cut and hand-stitched by skilled artisans at our Vereeniging workshop using UV-bonded nylon threads (10–20 working days).',
      icon: Scissors,
      tag: 'Step 3: Bespoke Tailoring'
    },
    {
      step: '04',
      title: 'PROFESSIONAL FITMENT',
      description: 'Fitted cleanly on-site at our Unit 6 Assegai St Vereeniging workshop, or couriered straight to your door via The Courier Guy with a step-by-step DIY guide.',
      icon: Wrench,
      tag: 'Step 4: Delivery & Fitment'
    }
  ];

  return (
    <section id="fitment-process" className="w-full bg-[#101014] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest bg-[#16161b] border border-orange-500/20 px-3 py-1 rounded-md font-mono">
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            THE 4-STEP TAILORING & FITMENT PROCESS
          </h2>
          <p className="text-xs sm:text-sm text-[#8C9BA8]">
            From your vehicle configuration to laser cutting and showroom fitment, we make custom protection effortless.
          </p>
        </div>

        {/* 4 Steps Progressive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#16161b] border border-white/10 hover:border-white/25 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition duration-300 relative group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-black text-white/30 group-hover:text-orange-500/50 transition">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 group-hover:bg-white/10 transition">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-orange-400 uppercase bg-orange-950/40 px-2 py-0.5 rounded border border-orange-500/20 inline-block">
                    {item.tag}
                  </span>

                  <h3 className="font-heading text-base font-bold uppercase text-white tracking-wide">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#8C9BA8] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Phase {item.step}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="bg-[#16161b] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading text-lg font-bold uppercase text-white">
              Ready to protect your vehicle interior?
            </h4>
            <p className="text-xs text-[#8C9BA8]">
              Get an instant itemized quotation with zero obligation.
            </p>
          </div>

          <button
            onClick={onStartQuote}
            className="py-3 px-6 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase text-xs tracking-wider transition shadow cursor-pointer flex items-center space-x-2 shrink-0"
          >
            <span>Start Step 1: Request Quote</span>
            <ArrowRight className="w-4 h-4 text-orange-600" />
          </button>
        </div>
      </div>
    </section>
  );
};
