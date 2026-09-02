import React from 'react';
import { 
  Award, 
  MapPin, 
  ShieldCheck, 
  Scissors, 
  Car, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Phone
} from 'lucide-react';

interface CompanyHeritageAboutProps {
  onStartQuote: () => void;
  onOpenContact: () => void;
}

export const CompanyHeritageAbout: React.FC<CompanyHeritageAboutProps> = ({
  onStartQuote,
  onOpenContact
}) => {
  return (
    <section id="about-company" className="w-full bg-[#0c0c0e] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest bg-[#141418] border border-orange-500/20 px-3 py-1 rounded-md font-mono">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span>VEREENIGING, SOUTH AFRICA HERITAGE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            PRACTICAL INTERIOR PROTECTION. <br />
            <span className="text-white border-b-2 border-orange-500 pb-1">FOR ACTIVE LIFESTYLES & DAILY DRIVERS</span>.
          </h2>
          <p className="text-sm sm:text-base text-[#8C9BA8] max-w-2xl leading-relaxed">
            Located in Vereeniging, LIFESTYLE SEAT COVERS offers practical solutions for drivers seeking to protect their vehicle interiors from the rigors of daily use. We cater to athletes, pet owners, and outdoor adventurers who value durability, hygiene, and a clean cabin.
          </p>
        </div>

        {/* 4 Story Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1: WHERE IT STARTED */}
          <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-orange-400 uppercase bg-orange-950/40 px-2.5 py-1 rounded border border-orange-500/20">
                01. WATERPROOF BARRIER
              </span>
              <span className="text-xs font-mono text-zinc-500">Sweat & Rain Defense</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-white">
              PROTECTION FOR ACTIVE LIVING
            </h3>
            <p className="text-xs sm:text-sm text-[#8C9BA8] leading-relaxed">
              Modern seat covers serve as a critical barrier against moisture and grime. Our waterproof materials prevent sweat and rain from soaking into upholstery, eliminating stains and bad odors after hikes, gym workouts, surf trips, or trail runs.
            </p>
          </div>

          {/* Pillar 2: WHAT WE BELIEVE */}
          <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-500/20">
                02. NON-SLIP STABILITY
              </span>
              <span className="text-xs font-mono text-zinc-500">Micro-Silicone & Elastic</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-white">
              STAYS SECURELY IN PLACE
            </h3>
            <p className="text-xs sm:text-sm text-[#8C9BA8] leading-relaxed">
              Engineered with non-slip backing using micro-silicone beads or elastic hems, our covers remain firmly in place during entry and exit without bunching, sliding, or loosening over time.
            </p>
          </div>

          {/* Pillar 3: WHAT WE BUILD */}
          <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-sky-400 uppercase bg-sky-950/40 px-2.5 py-1 rounded border border-sky-500/20">
                03. EASY MAINTENANCE
              </span>
              <span className="text-xs font-mono text-zinc-500">Machine Washable</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-white">
              EFFORTLESS CLEANING
            </h3>
            <p className="text-xs sm:text-sm text-[#8C9BA8] leading-relaxed">
              Most options are machine washable or simple wipe-clean, allowing quick freshening up after muddy dogs, sandy beach trips, or kid spills so your cabin remains hygienic and fresh.
            </p>
          </div>

          {/* Pillar 4: WHY CUSTOM FIT MATTERS */}
          <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase bg-amber-950/40 px-2.5 py-1 rounded border border-amber-500/20">
                04. TAILORED & UNIVERSAL
              </span>
              <span className="text-xs font-mono text-zinc-500">Airbag-Safe Fit</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-white">
              PRESERVE VEHICLE RESALE VALUE
            </h3>
            <p className="text-xs sm:text-sm text-[#8C9BA8] leading-relaxed">
              By choosing a specialized lifestyle seat cover, drivers preserve their vehicle's original factory interior in pristine condition while enjoying peace of mind on every journey.
            </p>
          </div>
        </div>

        {/* Vereeniging Workshop Direct Banner */}
        <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="text-[10px] font-mono font-bold text-orange-400 uppercase">
              VISIT OUR VEREENIGING WORKSHOP
            </div>
            <h4 className="font-heading text-xl sm:text-2xl font-black uppercase text-white">
              UNIT 6 ASSEGAI ST, SOUTH, VEREENIGING, 1939
            </h4>
            <p className="text-xs text-[#8C9BA8]">
              Open Monday to Friday 8:00 AM – 5:00 PM. Call or WhatsApp +27 83 445 5370.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenContact}
              className="py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold uppercase text-xs tracking-wider transition border border-white/10 cursor-pointer"
            >
              Showroom & Directions
            </button>
            <button
              onClick={onStartQuote}
              className="py-3 px-6 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase text-xs tracking-wider transition shadow cursor-pointer flex items-center space-x-2"
            >
              <span>Get Your Custom Quote</span>
              <ArrowRight className="w-4 h-4 text-orange-600" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
