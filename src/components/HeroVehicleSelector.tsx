import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Sun, 
  Truck, 
  MessageCircle, 
  Sparkles, 
  Car, 
  ChevronRight, 
  Flame, 
  Zap, 
  Layers,
  Award
} from 'lucide-react';
import { POPULAR_SA_VEHICLES } from '../data/vehicleDatabase';
import { VehicleSelection } from '../types';
import { HeroGallerySlider } from './HeroGallerySlider';

interface HeroVehicleSelectorProps {
  vehicle: VehicleSelection;
  onVehicleChange: (vehicle: VehicleSelection) => void;
  onStartConfiguring: () => void;
  onViewGallery?: () => void;
}

export const HeroVehicleSelector: React.FC<HeroVehicleSelectorProps> = ({
  vehicle,
  onVehicleChange,
  onStartConfiguring,
  onViewGallery
}) => {
  // Simple free-form vehicle text
  const [vehicleText, setVehicleText] = useState(
    `${vehicle.year || 2024} ${vehicle.make || 'Toyota'} ${vehicle.model || 'Hilux'} ${vehicle.cabOrBody ? `(${vehicle.cabOrBody})` : 'Double Cab'}`
  );

  // Quick Material Choice (Canvas, Leatherette, Polyester)
  const [selectedMatType, setSelectedMatType] = useState<'canvas' | 'leatherette' | 'polyester'>('canvas');
  const [seatingRow, setSeatingRow] = useState<'front' | 'full'>('full');

  // Pricing helper in ZAR
  const pricingMatrix = {
    canvas: { name: '510g Tough Ripstop Canvas', front: 2650, full: 3950, tag: 'Most Popular for Bakkies & 4x4' },
    leatherette: { name: 'Rhino Hide Leatherette', front: 2950, full: 4450, tag: 'Luxury & Easy Wipe-Clean' },
    polyester: { name: '600D Heavy-Duty Polyester', front: 2450, full: 3650, tag: 'Everyday Durable & Affordable' }
  };

  const currentPrice = seatingRow === 'front' 
    ? pricingMatrix[selectedMatType].front 
    : pricingMatrix[selectedMatType].full;

  const handleQuickVehicleClick = (pop: typeof POPULAR_SA_VEHICLES[0]) => {
    const text = `${pop.year} ${pop.make} ${pop.model} (${pop.cab})`;
    setVehicleText(text);
    onVehicleChange({
      make: pop.make,
      model: pop.model,
      cabOrBody: pop.cab,
      submodel: pop.submodel,
      year: pop.year,
      seatRows: 'front_and_rear'
    });
  };

  const handleSlideSelect = (slideVehicleModel: string, materialType: 'canvas' | 'leatherette' | 'polyester') => {
    setVehicleText(slideVehicleModel);
    setSelectedMatType(materialType);
    onVehicleChange({
      ...vehicle,
      model: slideVehicleModel
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setVehicleText(val);
    onVehicleChange({
      ...vehicle,
      model: val
    });
  };

  const scrollToGallery = () => {
    if (onViewGallery) {
      onViewGallery();
    } else {
      const el = document.getElementById('gallery');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappMessage = `Hi Lifestyle Seat Covers, I would like a quote for my vehicle:%0A%0A` +
    `*Vehicle:* ${vehicleText}%0A` +
    `*Material:* ${pricingMatrix[selectedMatType].name}%0A` +
    `*Seating:* ${seatingRow === 'front' ? 'Front Seats Only' : 'Full Set (Front + Rear)'}%0A` +
    `*Estimated Price:* R${currentPrice.toLocaleString()}%0A%0A` +
    `Please advise on availability and delivery to my area.`;

  return (
    <section className="relative w-full bg-[#0c0c0e] pt-6 pb-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Top Header Intro Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Trust Badges Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-orange-500 text-black px-3 py-1 rounded-md shadow-sm font-mono">
                🇿🇦 Handcrafted in Vereeniging
              </span>
              <span className="text-xs font-semibold text-zinc-300 bg-black/60 px-3 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-orange-400" /> Free Courier SA
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 2-Year Warranty
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Practical Seat Covers for <span className="text-orange-500">Active Lifestyles</span> & Daily Drivers.
            </h1>

            {/* Simple Description */}
            <p className="text-sm sm:text-base text-[#8C9BA8] max-w-2xl leading-relaxed">
              Handcrafted in Vereeniging. Engineered to protect your vehicle from sweat, mud, dogs, children, and heavy workwear with 100% waterproof materials, non-slip backing, certified airbag breakaway seams, and easy wipe or wash care.
            </p>
          </div>

          {/* Quick Confidence Metric / Location */}
          <div className="bg-[#141418] border border-white/10 p-4 rounded-2xl flex items-center space-x-3.5 shrink-0 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase font-mono">1,500+ Tailored Patterns</div>
              <div className="text-[11px] text-[#8C9BA8]">Toyota, Ford, Isuzu, VW, Jeep & More</div>
            </div>
          </div>
        </div>

        {/* Main 2-Column Hero: Left Slider Preview (7 Cols) + Right Fast Calculator (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Interactive Hero Gallery Slider with Live Text & Specs (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <HeroGallerySlider
              onSelectSlideVehicle={handleSlideSelect}
              onViewGallery={scrollToGallery}
            />
          </div>

          {/* Right Column: Instant 1-Minute Price & Quote Calculator (5 Cols) */}
          <div className="lg:col-span-5 bg-[#141418] border-2 border-orange-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between space-y-4">
            
            <div className="space-y-4">
              
              {/* Card Header */}
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-orange-400 uppercase tracking-widest font-mono flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>INSTANT ESTIMATE</span>
                  </div>
                  <h2 className="font-heading text-xl font-bold uppercase text-white">
                    QUICK PRICE CALCULATOR
                  </h2>
                </div>
                <span className="text-[10px] bg-white/10 text-zinc-300 font-mono px-2 py-1 rounded">
                  ZAR Pricing
                </span>
              </div>

              {/* Step 1: Type Vehicle */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-200 uppercase tracking-wider">
                  1. Vehicle Make & Model:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={vehicleText}
                    onChange={handleTextChange}
                    placeholder="e.g. 2024 Toyota Hilux Double Cab"
                    className="w-full bg-[#0c0c0e] border border-zinc-700 hover:border-orange-500 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none transition"
                  />
                  <Car className="w-4 h-4 text-zinc-400 absolute right-3.5 top-3" />
                </div>
                <p className="text-[11px] text-[#8C9BA8]">
                  Select from slide preview or type any car/bakkie make.
                </p>
              </div>

              {/* Step 2: Choose Material */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-200 uppercase tracking-wider">
                  2. Choose Material:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMatType('canvas')}
                    className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                      selectedMatType === 'canvas'
                        ? 'bg-orange-500/20 border-orange-500 text-white font-bold'
                        : 'bg-[#0c0c0e] border-white/10 text-zinc-400 hover:border-white/30'
                    }`}
                  >
                    <div className="text-xs">Canvas</div>
                    <div className="text-[10px] text-orange-400 font-mono mt-0.5">Toughest</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMatType('leatherette')}
                    className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                      selectedMatType === 'leatherette'
                        ? 'bg-orange-500/20 border-orange-500 text-white font-bold'
                        : 'bg-[#0c0c0e] border-white/10 text-zinc-400 hover:border-white/30'
                    }`}
                  >
                    <div className="text-xs">Leatherette</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">Luxury</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMatType('polyester')}
                    className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                      selectedMatType === 'polyester'
                        ? 'bg-orange-500/20 border-orange-500 text-white font-bold'
                        : 'bg-[#0c0c0e] border-white/10 text-zinc-400 hover:border-white/30'
                    }`}
                  >
                    <div className="text-xs">Polyester</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">Budget</div>
                  </button>
                </div>
              </div>

              {/* Step 3: Choose Seating Row */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-200 uppercase tracking-wider">
                  3. Select Seating:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSeatingRow('front')}
                    className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                      seatingRow === 'front'
                        ? 'bg-white text-black font-bold'
                        : 'bg-[#0c0c0e] border-white/10 text-zinc-400 hover:border-white/30'
                    }`}
                  >
                    <div className="text-xs uppercase">Front Seats Only</div>
                    <div className="text-[10px] font-mono mt-0.5">2 Front Buckets</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSeatingRow('full')}
                    className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                      seatingRow === 'full'
                        ? 'bg-white text-black font-bold'
                        : 'bg-[#0c0c0e] border-white/10 text-zinc-400 hover:border-white/30'
                    }`}
                  >
                    <div className="text-xs uppercase">Full Set (Front + Rear)</div>
                    <div className="text-[10px] font-mono mt-0.5">Complete Cab</div>
                  </button>
                </div>
              </div>

              {/* Calculated Price Display */}
              <div className="p-3.5 bg-black/60 border border-white/10 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block font-mono">
                    Estimated Workshop Price
                  </span>
                  <span className="text-2xl font-black font-mono text-white">
                    R{currentPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-400 block">
                    ✓ Includes VAT & Free SA Delivery
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-orange-400 uppercase block">
                    {pricingMatrix[selectedMatType].name}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    24-Month Local Warranty
                  </span>
                </div>
              </div>

            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/27834455370?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-xs sm:text-sm tracking-wider flex items-center justify-center space-x-2 shadow-lg transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Get Instant Quote on WhatsApp</span>
              </a>

              <button
                onClick={onStartConfiguring}
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-200 font-bold uppercase text-xs tracking-wider flex items-center justify-center space-x-2 border border-white/10 transition cursor-pointer"
              >
                <span>Customize Colors & Stitching</span>
                <ChevronRight className="w-3.5 h-3.5 text-orange-400" />
              </button>
            </div>

          </div>

        </div>

        {/* Popular Quick-Select Vehicle Buttons Strip */}
        <div className="bg-[#141418] border border-white/10 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>Quick-Load Popular Bakkies:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {POPULAR_SA_VEHICLES.slice(0, 7).map((pop) => (
              <button
                key={`${pop.make}-${pop.model}`}
                onClick={() => handleQuickVehicleClick(pop)}
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-black/60 hover:bg-orange-500 hover:text-black text-zinc-200 border border-white/10 transition cursor-pointer"
              >
                {pop.make} {pop.model.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
