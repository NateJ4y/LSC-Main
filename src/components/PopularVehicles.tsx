import React from 'react';
import { POPULAR_SA_VEHICLES } from '../data/vehicleDatabase';
import { VehicleSelection } from '../types';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PopularVehiclesProps {
  onSelectPopular: (veh: typeof POPULAR_SA_VEHICLES[0]) => void;
}

export const PopularVehicles: React.FC<PopularVehiclesProps> = ({ onSelectPopular }) => {
  return (
    <section id="popular-bakkies" className="w-full bg-[#0c0c0e] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-[#8C9BA8] uppercase tracking-widest bg-[#141418] border border-white/10 px-3 py-1 rounded-md mb-2 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>SOUTH AFRICA'S TOP 4X4 & BAKKIE PATTERNS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              PRECISION DIGITAL PATTERNS FOR POPULAR VEHICLES
            </h2>
            <p className="text-[#8C9BA8] text-sm mt-1">
              Select your vehicle below to load laser-measured CAD seat geometry instantly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_SA_VEHICLES.map((v) => (
            <div
              key={`${v.make}-${v.model}`}
              onClick={() => onSelectPopular(v)}
              className="bg-[#141418] border border-white/10 hover:border-white/40 rounded-3xl overflow-hidden shadow-xl cursor-pointer group transition duration-300 flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-black/60">
                <img
                  src={v.image}
                  alt={`${v.make} ${v.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-[#141418]/30 to-transparent" />

                <div className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-white text-black shadow font-mono">
                  {v.badge}
                </div>

                <div className="absolute bottom-3 left-3">
                  <div className="text-[10px] text-[#8C9BA8] font-mono font-bold uppercase">
                    {v.cab}
                  </div>
                  <h3 className="font-heading text-2xl font-black uppercase text-white">
                    {v.make} {v.model.split(' ')[0]}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="text-xs text-zinc-300">
                  <span className="text-[#8C9BA8]">Trim:</span>{' '}
                  <span className="font-semibold text-white">{v.submodel}</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-3 border-t border-white/10">
                  <div className="text-[#8C9BA8] text-[11px]">
                    Top Fabric:{' '}
                    <span className="text-white font-semibold">{v.popularMaterial}</span>
                  </div>

                  <span className="text-xs font-bold text-white group-hover:text-orange-400 flex items-center space-x-1 group-hover:translate-x-1 transition-all font-mono">
                    <span>Configure</span>
                    <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
