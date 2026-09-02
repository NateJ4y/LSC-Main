import React, { useState } from 'react';
import { 
  Compass, 
  HardHat, 
  Tractor, 
  Flame, 
  Building2, 
  Car, 
  ArrowRight, 
  CheckCircle2,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface VehicleApplicationsProps {
  onSelectCategory: (categoryKey: string) => void;
  onGetQuote: () => void;
}

export const VehicleApplications: React.FC<VehicleApplicationsProps> = ({
  onSelectCategory,
  onGetQuote
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const applications = [
    {
      key: 'bakkies',
      title: '4x4 & BAKKIES',
      headline: 'Built for Adventure, Red Sand & Farm Abuse',
      desc: 'South Africa’s most demanding category. Engineered specifically for the split benches, ISOFIX points, and aggressive seat bolsters of Toyota Hilux GD-6, Next-Gen Ford Ranger, Land Cruiser 79, Isuzu D-Max, Suzuki Jimny, and Amarok.',
      popularModels: ['Toyota Hilux (Single, Extra & Double Cab)', 'Ford Ranger Next-Gen Wildtrak/XLT', 'Toyota Land Cruiser 79 / 76 Series', 'Isuzu D-Max V-Cross', 'Suzuki Jimny 3-Door & 5-Door', 'Mahindra Pik-Up Single/Double Cab'],
      recommendedMaterial: 'Riptech® 510g Ripstop Canvas or 600D Polyester',
      icon: Compass,
      tag: 'Bakkie & 4x4 Off-Road'
    },
    {
      key: 'daily',
      title: 'DAILY DRIVERS & SUVS',
      headline: 'Family Defense with Executive Comfort',
      desc: 'Precision tailored for passenger cars, crossovers, and family 7-seater SUVs. Shields original upholstery from spilled snacks, kids sports gear, and beach sand without feeling like rough industrial workwear.',
      popularModels: ['Toyota Fortuner & Prado', 'Volkswagen Polo & Tiguan', 'Hyundai Tucson & Creta', 'Toyota Corolla Cross', 'Kia Sportage & Seltos', 'Haval Jolion & H6'],
      recommendedMaterial: '600D Synthetic Polyester or Automotive Leatherette',
      icon: Car,
      tag: 'Passenger Cars & SUVs'
    },
    {
      key: 'fleets',
      title: 'TRUCKS & FLEETS',
      headline: 'Commercial Vehicle Asset Protection',
      desc: 'Heavy logistics, inter-provincial freight, delivery vans, and commercial fleet bakkies. Designed for maximum cycle durability, easy weekly wipe-downs, and driver bolster reinforcement.',
      popularModels: ['Toyota Hino Trucks', 'Isuzu NPR / NQR Commercials', 'Mercedes-Benz Sprinter & Vito', 'Toyota Quantum Panel Vans', 'Hyundai H100 Bakkies', 'Kia K2700 Workhorses'],
      recommendedMaterial: 'Riptech® 510g Canvas or Heavy 600D Polyester',
      icon: Building2,
      tag: 'Logistics & Commercial Fleets'
    },
    {
      key: 'agriculture',
      title: 'AGRICULTURE & EARTHMOVING',
      headline: 'Engineered for Red Dust, Fertilizer & Yellow Plant',
      desc: 'From farm tractors to CAT and Komatsu excavators, loaders, and site bakkies. Built to repel greasy coveralls, sharp tool belts, diesel splashes, and relentless dust.',
      popularModels: ['John Deere & Massey Ferguson Tractors', 'New Holland Agricultural Machinery', 'CAT Front Loaders & Excavators', 'Komatsu & JCB Earthmovers', 'Bell Equipment Heavy Plant', 'Toyota Land Cruiser Farm Rigs'],
      recommendedMaterial: 'Heavy 510g Ripstop Canvas with Double Reinforcements',
      icon: Tractor,
      tag: 'Farms & Yellow Plant'
    },
    {
      key: 'safari',
      title: 'SAFARI & TOURISM',
      headline: 'Rugged Bushveld Aesthetic for Game Viewers',
      desc: 'Purpose-built for open-sided 9-seater safari cruisers, hunting vehicles, and game reserve guest transports. Waterproof, UV-stabilized against midday savannah heat, and easy to hose down after dusty game drives.',
      popularModels: ['Custom 9-Seater Open Land Cruisers', 'Toyota Hilux Game Viewer Conversions', 'Land Rover Defender Safari Builds', 'Lodge Transfer Quantum Shuttles'],
      recommendedMaterial: 'Riptech® 510g Canvas in Bush Canvas Sand / Olive Green',
      icon: Flame,
      tag: 'Game Lodges & Safari'
    },
    {
      key: 'taxi-security',
      title: 'TAXI, COURIER & SECURITY',
      headline: 'Indestructible Protection for 24/7 Shift Operations',
      desc: 'Security response vehicles with armed personnel, high-turnover commuter taxis, and urban courier vans. Built with reinforced double-stitched seams that survive continuous tactical gear entry and exit.',
      popularModels: ['Toyota Quantum Sesfikile Commuter Taxis', 'Security Patrol NP200 & D-Max Single Cabs', 'Armed Response Golf 7 & Polo Sedans', 'Urban Courier Express Delivery Vans'],
      recommendedMaterial: 'Indestructible 600D Polyester or Riptech® Canvas',
      icon: HardHat,
      tag: 'Tactical & High Turnover'
    }
  ];

  const current = applications[activeTab];
  const IconComp = current.icon;

  return (
    <section id="vehicle-applications" className="w-full bg-[#101014] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest bg-[#16161b] border border-orange-500/20 px-3 py-1 rounded-md font-mono">
            <span>TAILORED FOR EVERY SOUTH AFRICAN VEHICLE SECTOR</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            VEHICLE APPLICATIONS & SECTOR SPECIALISMS
          </h2>
          <p className="text-xs sm:text-sm text-[#8C9BA8]">
            We don't manufacture one generic cover. We hold CAD digitizations for over 1,500+ South African passenger cars, bakkies, commercial trucks, tractors, and safari rigs.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {applications.map((app, idx) => {
            const AppIcon = app.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'bg-[#16161b] text-[#8C9BA8] hover:text-white hover:bg-[#202028] border border-white/5'
                }`}
              >
                <AppIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-orange-600' : 'text-zinc-400'}`} />
                <span>{app.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Application Detail Bento Card */}
        <div className="bg-[#16161b] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold text-orange-400 uppercase bg-orange-950/40 px-2.5 py-1 rounded border border-orange-500/20">
                  {current.tag}
                </span>
                <span className="text-xs font-mono text-zinc-400">• CAD Surveyed Fit</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                {current.headline}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {current.desc}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-mono font-bold text-zinc-400 uppercase">
                  Popular Models In This Category:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {current.popularModels.map((model, mIdx) => (
                    <div key={mIdx} className="flex items-center space-x-2 text-xs text-white bg-black/40 border border-white/5 px-3 py-2 rounded-xl">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span className="truncate">{model}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={onGetQuote}
                  className="py-3 px-6 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase text-xs tracking-wider transition shadow cursor-pointer flex items-center space-x-2"
                >
                  <span>Get Quote for {current.title}</span>
                  <ArrowRight className="w-4 h-4 text-orange-600" />
                </button>
                <div className="text-xs font-mono text-zinc-400">
                  Recommended: <strong className="text-white">{current.recommendedMaterial}</strong>
                </div>
              </div>
            </div>

            {/* Right Card: Technical Highlights */}
            <div className="lg:col-span-5 bg-[#0c0c0e] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-white uppercase">{current.title}</h4>
                  <p className="text-[11px] text-[#8C9BA8]">Category Engineering Spec</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-zinc-300">
                <div className="flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Airbag Safe:</strong> Certified break-away tear stitching for seat-integrated side airbags.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span><strong>Anchored Glove Fit:</strong> Heavy-gauge webbing and cam buckles prevent sliding or bunching.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span><strong>ISOFIX & Split Seat Retained:</strong> 100% full access to factory seatbelts, child seat anchors, and armrests.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span><strong>24-Month Warranty:</strong> Guaranteed against seam splitting and fabric degradation.</span>
                </div>
              </div>

              <div className="p-3 bg-[#16161b] rounded-xl border border-white/5 text-[11px] font-mono text-[#8C9BA8] flex items-center justify-between">
                <span>Direct Polokwane Workshop</span>
                <span className="text-white font-bold">10–20 Days Lead Time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
