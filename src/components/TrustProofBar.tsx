import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  MapPin, 
  Wrench, 
  CheckCircle2, 
  Car,
  Award,
  Truck
} from 'lucide-react';

interface TrustProofBarProps {
  onGetQuote?: () => void;
}

export const TrustProofBar: React.FC<TrustProofBarProps> = () => {
  const proofItems = [
    {
      title: 'ACTIVE LIFESTYLE PROTECTION',
      subtitle: 'Waterproof barrier stops sweat, mud, and spills from soaking into upholstery and causing odors.',
      icon: ShieldCheck,
      tag: 'Sweat & Water Barrier'
    },
    {
      title: 'NON-SLIP & EASY CLEAN',
      subtitle: 'Micro-silicone bead backing or elastic hems keep covers firmly in place. Machine washable.',
      icon: Layers,
      tag: 'Washable & Stable'
    },
    {
      title: 'VEREENIGING WORKSHOP',
      subtitle: 'Located at Unit 6 Assegai St, South, Vereeniging. Practical solutions for active drivers.',
      icon: MapPin,
      tag: 'Local SA Craft'
    },
    {
      title: 'NATIONWIDE DELIVERY',
      subtitle: 'Door-to-door delivery across South Africa via The Courier Guy with fast, simple DIY fitment.',
      icon: Truck,
      tag: 'Courier Delivery'
    }
  ];

  return (
    <section className="w-full bg-[#101014] border-b border-white/10 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {proofItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-[#16161b] border border-white/10 hover:border-white/20 transition-all rounded-2xl p-4.5 flex flex-col justify-between space-y-3 shadow-sm group"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0 group-hover:bg-white/10 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                      {item.tag}
                    </span>
                    <h3 className="font-heading text-sm sm:text-base font-black uppercase text-white tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[#8C9BA8] leading-relaxed pl-0.5">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
