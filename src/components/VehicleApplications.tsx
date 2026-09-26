import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Car, Compass, Building2, Tractor } from 'lucide-react';
import { AssetImage } from './AssetImage';

interface VehicleApplicationsProps {
  onSelectApplication: (categoryKey: string) => void;
  onStartQuote: () => void;
}

const APPLICATIONS = [
  {
    key: '4x4-overland',
    title: '4x4 & Bakkies',
    image: 'WhatsApp Image 2026-09-16 at 8.32.13 AM (1).jpeg',
    icon: Compass,
    copy: 'Rugged protection for Hilux, Ranger, Land Cruiser, D-Max and more.',
    tags: ['Hilux', 'Ranger', 'Land Cruiser'],
  },
  {
    key: 'daily-suv',
    title: 'Cars & SUVs',
    image: 'WhatsApp Image 2026-09-16 at 8.32.15 AM (2).jpeg',
    icon: Car,
    copy: 'A cleaner, more refined fit for daily drivers, families and SUVs.',
    tags: ['Fortuner', 'Polo', 'Tiguan'],
  },
  {
    key: 'commercial-fleet',
    title: 'Fleets & Work Vehicles',
    image: 'WhatsApp Image 2026-09-16 at 8.32.20 AM (3).jpeg',
    icon: Building2,
    copy: 'Built for high-use seats, delivery vehicles and commercial fleets.',
    tags: ['Trucks', 'Vans', 'Fleets'],
  },
  {
    key: 'agriculture',
    title: 'Agriculture & Plant',
    image: 'WhatsApp Image 2026-09-16 at 8.32.28 AM.jpeg',
    icon: Tractor,
    copy: 'Protection for farm vehicles, machinery and tough working environments.',
    tags: ['Tractors', 'Plant', 'Farm rigs'],
  },
];

export const VehicleApplications: React.FC<VehicleApplicationsProps> = ({ onSelectApplication, onStartQuote }) => {
  const [active, setActive] = useState(0);
  const current = APPLICATIONS[active];
  const Icon = current.icon;

  return (
    <section id="vehicle-applications" className="w-full bg-[#101014] py-14 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20" aria-label="Vehicle applications for custom seat covers">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-7">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-400">Built around your vehicle</span>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">One fitment. Your vehicle.</h2>
            <p className="mt-2 text-sm text-zinc-400">From daily SUVs to working bakkies, we make the cover around the seat — not the other way around.</p>
          </div>
          <button onClick={onStartQuote} className="self-start lg:self-auto inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-black hover:bg-orange-500 hover:text-white transition">Check my vehicle <ArrowRight className="w-3.5 h-3.5" /></button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
          {APPLICATIONS.map((app, index) => {
            const AppIcon = app.icon;
            return (
              <button key={app.key} onClick={() => { setActive(index); onSelectApplication(app.key); }} className={`group relative overflow-hidden rounded-xl border text-left min-h-[120px] ${active === index ? 'border-orange-500/60' : 'border-white/10'} bg-black`}>
                <AssetImage filename={app.image} alt={app.title} fit="cover" className="absolute inset-0 w-full h-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="relative z-10 h-full min-h-[120px] flex flex-col justify-end p-3">
                  <AppIcon className="w-4 h-4 text-orange-400 mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-white">{app.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e]">
          <div className="relative min-h-[280px] lg:col-span-5">
            <AssetImage filename={current.image} alt={current.title} fit="cover" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
              <div><span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-300">Lifestyle Seat Covers</span><h3 className="mt-1 font-heading text-2xl font-black uppercase text-white">{current.title}</h3></div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-black/40 backdrop-blur-sm"><Icon className="w-5 h-5 text-orange-400" /></div>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
            <p className="max-w-xl text-sm leading-6 text-zinc-300">{current.copy}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {current.tags.map((tag) => <span key={tag} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-white"><CheckCircle2 className="w-3 h-3 text-emerald-400" />{tag}</span>)}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={onStartQuote} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[10px] font-black uppercase tracking-wider text-black hover:bg-orange-500 hover:text-white transition">Get a fitment quote <ArrowRight className="w-3.5 h-3.5" /></button>
              <button onClick={() => onSelectApplication(current.key)} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[10px] font-black uppercase tracking-wider text-white hover:bg-white/10 transition">Use this application</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
