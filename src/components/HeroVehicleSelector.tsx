import React, { useState } from 'react';
import { 
  Car, 
  ChevronRight, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Sun, 
  Award,
  Truck,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { VEHICLE_MAKES, POPULAR_SA_VEHICLES } from '../data/vehicleDatabase';
import { VehicleSelection } from '../types';

interface HeroVehicleSelectorProps {
  vehicle: VehicleSelection;
  onVehicleChange: (vehicle: VehicleSelection) => void;
  onStartConfiguring: () => void;
}

export const HeroVehicleSelector: React.FC<HeroVehicleSelectorProps> = ({
  vehicle,
  onVehicleChange,
  onStartConfiguring
}) => {
  const [selectedMakeObj, setSelectedMakeObj] = useState(
    VEHICLE_MAKES.find((m) => m.name.toLowerCase() === (vehicle.make || 'toyota').toLowerCase()) || VEHICLE_MAKES[0]
  );
  const [selectedModelObj, setSelectedModelObj] = useState(
    selectedMakeObj.models.find((m) => m.name.toLowerCase().includes((vehicle.model || 'hilux').toLowerCase())) || selectedMakeObj.models[0]
  );

  // Update cascade when make changes
  const handleMakeChange = (makeName: string) => {
    const make = VEHICLE_MAKES.find((m) => m.name === makeName) || VEHICLE_MAKES[0];
    setSelectedMakeObj(make);
    const firstModel = make.models[0];
    setSelectedModelObj(firstModel);

    onVehicleChange({
      ...vehicle,
      make: make.name,
      model: firstModel.name,
      cabOrBody: firstModel.cabs?.[0] || 'Standard Body',
      submodel: firstModel.submodels[0] || 'Standard Spec',
      year: firstModel.years[0] || 2024
    });
  };

  const handleModelChange = (modelName: string) => {
    const model = selectedMakeObj.models.find((m) => m.name === modelName) || selectedMakeObj.models[0];
    setSelectedModelObj(model);

    onVehicleChange({
      ...vehicle,
      model: model.name,
      cabOrBody: model.cabs?.[0] || 'Standard Body',
      submodel: model.submodels[0] || 'Standard Spec',
      year: model.years[0] || 2024
    });
  };

  const selectQuickVehicle = (pop: typeof POPULAR_SA_VEHICLES[0]) => {
    const make = VEHICLE_MAKES.find((m) => m.name === pop.make);
    if (make) {
      setSelectedMakeObj(make);
      const model = make.models.find((m) => m.name === pop.model) || make.models[0];
      setSelectedModelObj(model);

      onVehicleChange({
        make: pop.make,
        model: pop.model,
        cabOrBody: pop.cab,
        submodel: pop.submodel,
        year: pop.year,
        seatRows: 'front_and_rear'
      });
      onStartConfiguring();
    }
  };

  return (
    <section className="relative w-full bg-[#0c0c0e] pt-6 pb-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-4">
        {/* Bento Grid Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Bento Cell 1: Main Flagship Hero Banner (7 Cols) */}
          <div className="lg:col-span-7 bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-6 opacity-5 pointer-events-none text-9xl font-black select-none text-white">
              LS
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-white text-black px-3 py-1 rounded-md shadow-sm">
                  SOUTH AFRICA'S #1
                </span>
                <span className="text-xs font-semibold text-[#8C9BA8] bg-black/50 px-3 py-1 rounded-md border border-white/10">
                  1:1 CAD Laser Cut
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-md border border-emerald-500/20 flex items-center gap-1">
                  <span>🇿🇦</span> Handcrafted in SA
                </span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl xl:text-6xl font-black uppercase tracking-tight text-white leading-none">
                UNCOMPROMISED <span className="text-white border-b-2 border-orange-500 pb-1">VEHICLE DEFENSE</span> BUILT FOR AFRICA
              </h1>

              <p className="text-sm sm:text-base text-[#8C9BA8] max-w-xl leading-relaxed">
                Precision laser-tailored seat covers for your bakkie, SUV, or overland rig. Heavy-duty 510g ripstop canvas, Rhino-Hide leatherette, and wetsuit neoprene tested against South Africa's intense sun, red mud, and bushveld thorns.
              </p>

              {/* Value Trust Markers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="bg-black/40 border border-white/5 p-2.5 rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-zinc-400">Fit Guarantee</div>
                  <div className="text-xs font-bold text-white flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" /> 100% Laser-Fit
                  </div>
                </div>
                <div className="bg-black/40 border border-white/5 p-2.5 rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-zinc-400">Safety</div>
                  <div className="text-xs font-bold text-white flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SABS Airbag
                  </div>
                </div>
                <div className="bg-black/40 border border-white/5 p-2.5 rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-zinc-400">Climate</div>
                  <div className="text-xs font-bold text-white flex items-center gap-1 mt-0.5">
                    <Sun className="w-3.5 h-3.5 text-orange-500" /> UV Stabilized
                  </div>
                </div>
                <div className="bg-black/40 border border-white/5 p-2.5 rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-zinc-400">Logistics</div>
                  <div className="text-xs font-bold text-white flex items-center gap-1 mt-0.5">
                    <Truck className="w-3.5 h-3.5 text-[#8C9BA8]" /> Free Courier
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
              <button
                onClick={onStartConfiguring}
                className="py-3 px-6 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase text-xs sm:text-sm tracking-wider flex items-center space-x-2 transition shadow cursor-pointer"
              >
                <span>OPEN CUSTOMIZER STUDIO</span>
                <ChevronRight className="w-4 h-4 text-orange-600" />
              </button>

              <div className="text-xs text-[#8C9BA8] font-mono">
                Over <span className="text-white font-bold">1,500+</span> SA Vehicle Patterns in Database
              </div>
            </div>
          </div>

          {/* Bento Cell 2: Vehicle Dropdown Cascade Selector Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#141418] border border-white/15 hover:border-orange-500/40 transition rounded-3xl p-6 sm:p-7 shadow-2xl relative flex flex-col justify-between">
            <div>
              {/* Card Header Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div>
                  <div className="text-[10px] font-bold text-[#8C9BA8] tracking-widest uppercase font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    STEP-BY-STEP FITMENT
                  </div>
                  <h3 className="font-heading text-2xl font-bold uppercase text-white tracking-wide">
                    FIND YOUR EXACT PATTERN
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Car className="w-5 h-5" />
                </div>
              </div>

              {/* Cascade Selector Grid */}
              <div className="space-y-3">
                {/* Step 1: Select Year */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    1. Model Year
                  </label>
                  <select
                    value={vehicle.year || selectedModelObj.years[0]}
                    onChange={(e) => onVehicleChange({ ...vehicle, year: Number(e.target.value) })}
                    className="w-full bg-[#0c0c0e] border border-zinc-700 hover:border-white/40 focus:border-orange-500 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-white focus:outline-none transition"
                  >
                    {selectedModelObj.years.map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Step 2: Select Make */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    2. Vehicle Brand (Make)
                  </label>
                  <select
                    value={selectedMakeObj.name}
                    onChange={(e) => handleMakeChange(e.target.value)}
                    className="w-full bg-[#0c0c0e] border border-zinc-700 hover:border-white/40 focus:border-orange-500 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-white focus:outline-none transition"
                  >
                    {VEHICLE_MAKES.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Step 3: Select Model */}
                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    3. Vehicle Model
                  </label>
                  <select
                    value={selectedModelObj.name}
                    onChange={(e) => handleModelChange(e.target.value)}
                    className="w-full bg-[#0c0c0e] border border-zinc-700 hover:border-white/40 focus:border-orange-500 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-white focus:outline-none transition"
                  >
                    {selectedMakeObj.models.map((mod) => (
                      <option key={mod.name} value={mod.name}>
                        {mod.name} ({mod.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Step 4: Select Cab / Body / Submodel */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      4. Cab / Body
                    </label>
                    <select
                      value={vehicle.cabOrBody || selectedModelObj.cabs?.[0] || 'Standard'}
                      onChange={(e) => onVehicleChange({ ...vehicle, cabOrBody: e.target.value })}
                      className="w-full bg-[#0c0c0e] border border-zinc-700 hover:border-white/40 focus:border-orange-500 rounded-xl px-2.5 py-2.5 text-xs font-semibold text-white focus:outline-none transition"
                    >
                      {(selectedModelObj.cabs || ['Standard Body']).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      Trim / Edition
                    </label>
                    <select
                      value={vehicle.submodel || selectedModelObj.submodels[0] || 'Standard'}
                      onChange={(e) => onVehicleChange({ ...vehicle, submodel: e.target.value })}
                      className="w-full bg-[#0c0c0e] border border-zinc-700 hover:border-white/40 focus:border-orange-500 rounded-xl px-2.5 py-2.5 text-xs font-semibold text-white focus:outline-none transition"
                    >
                      {selectedModelObj.submodels.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seats Description Helper */}
                <div className="text-[11px] text-[#8C9BA8] bg-black/40 p-2.5 rounded-xl border border-white/5 flex items-center space-x-2">
                  <span className="text-white font-bold uppercase font-mono">CAD Spec:</span>
                  <span className="truncate">{selectedModelObj.seatsDescription}</span>
                </div>
              </div>
            </div>

            {/* Main Action CTA Button */}
            <button
              onClick={onStartConfiguring}
              className="w-full mt-4 py-3.5 px-5 rounded-xl bg-white hover:bg-zinc-200 text-black font-black uppercase text-sm tracking-wider flex items-center justify-center space-x-2 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition transform cursor-pointer border border-white/20"
            >
              <span>CONFIGURE SEAT COVERS & FABRICS</span>
              <ChevronRight className="w-4 h-4 text-orange-600" />
            </button>
          </div>
        </div>

        {/* Bento Grid Bottom Row (3 Modular Tiles) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Bento Cell 3: Quick Select Popular Bakkies (6 Cols) */}
          <div className="md:col-span-6 bg-[#141418] border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#8C9BA8] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                POPULAR SA BAKKIE SHORTCUTS
              </span>
              <span className="text-[10px] text-white font-semibold">1-Click Load</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_SA_VEHICLES.slice(0, 5).map((pop) => (
                <button
                  key={`${pop.make}-${pop.model}`}
                  onClick={() => selectQuickVehicle(pop)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-black/50 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/5 hover:border-white/20 transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>{pop.make} {pop.model.split(' ')[0]}</span>
                  <span className="text-[10px] text-orange-400 font-mono">({pop.cab.split(' ')[0]})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bento Cell 4: Overland Promo Special (3 Cols) */}
          <div className="md:col-span-3 bg-[#141418] border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-[#8C9BA8] uppercase tracking-widest font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                OVERLAND SPECIAL
              </div>
              <div className="text-lg font-bold uppercase text-white leading-tight font-heading mt-0.5">
                SAVE 10% WITH CODE
              </div>
              <div className="mt-1 inline-block bg-white/10 text-white text-xs font-mono font-bold px-2 py-0.5 rounded border border-white/20">
                LIFESTYLE10
              </div>
            </div>
            <div className="text-[10px] text-[#8C9BA8] mt-2">
              Free Courier Guy delivery included over R2,500
            </div>
          </div>

          {/* Bento Cell 5: Free Swatches + Johannesburg Hotline (3 Cols) */}
          <div className="md:col-span-3 bg-[#141418] border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-[#8C9BA8] uppercase tracking-widest font-mono">
                FABRIC SAMPLES
              </div>
              <div className="text-sm font-bold uppercase text-white mt-0.5">
                Physical Swatch Pack
              </div>
              <div className="text-[11px] text-[#8C9BA8] mt-1">
                Touch ripstop canvas & Rhino leatherette before ordering.
              </div>
            </div>
            <div className="mt-2 text-xs font-bold text-white hover:text-orange-400 transition flex items-center gap-1">
              <span>Free Courier Across SA</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-orange-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
