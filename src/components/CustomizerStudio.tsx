import React, { useState } from 'react';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft,
  Car, 
  Users, 
  Layers, 
  Palette, 
  Sparkles, 
  Plus, 
  MessageCircle, 
  FileText, 
  ShoppingCart, 
  ShieldCheck, 
  Sun, 
  Droplets, 
  Award, 
  Eye, 
  X, 
  Smartphone, 
  Box, 
  Flame,
  CheckCircle2,
  Sliders,
  Maximize2
} from 'lucide-react';
import { MATERIALS_DATA } from '../data/materialsData';
import { CustomizerState, CartItem } from '../types';
import { SeatVisualizer } from './SeatVisualizer';
import { VEHICLE_MAKES, POPULAR_SA_VEHICLES } from '../data/vehicleDatabase';
import { getConfigurationWhatsAppUrl } from '../utils/whatsappHelper';

interface CustomizerStudioProps {
  customizerState: CustomizerState;
  onUpdateCustomizer: (updater: (prev: CustomizerState) => CustomizerState) => void;
  onAddToCart: (item: CartItem) => void;
  onOpenSwatches: () => void;
}

export const CustomizerStudio: React.FC<CustomizerStudioProps> = ({
  customizerState,
  onUpdateCustomizer,
  onAddToCart,
  onOpenSwatches
}) => {
  // 7 Guided Steps
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'front' | 'rear' | 'detail' | 'real_photo'>('front');
  const [addedToast, setAddedToast] = useState(false);
  const [mobilePreviewModal, setMobilePreviewModal] = useState(false);

  const steps = [
    { num: 1, label: 'Vehicle', icon: Car, title: 'Step 1: Vehicle Selection' },
    { num: 2, label: 'Rows', icon: Users, title: 'Step 2: Seating Rows' },
    { num: 3, label: 'Fabric', icon: Layers, title: 'Step 3: Material Selection' },
    { num: 4, label: 'Colour', icon: Palette, title: 'Step 4: Colour Choice' },
    { num: 5, label: 'Finish', icon: Sparkles, title: 'Step 5: Stitching & Finish' },
    { num: 6, label: 'Extras', icon: Box, title: 'Step 6: Practical Extras' },
    { num: 7, label: 'Summary', icon: FileText, title: 'Step 7: Summary & Quote Request' },
  ];

  const currentMaterial =
    MATERIALS_DATA.find((m) => m.id === customizerState.materialId) || MATERIALS_DATA[0];

  const currentColor =
    currentMaterial.colors.find((c) => c.id === customizerState.primaryColorId) ||
    currentMaterial.colors[0];

  // Calculate starting price based on material, row choice and extras
  let calculatedPrice = currentMaterial.basePriceZAR;
  if (customizerState.rowOption === 'front_only') {
    calculatedPrice = Math.round(currentMaterial.basePriceZAR * 0.6);
  } else if (customizerState.rowOption === 'full_7_seater') {
    calculatedPrice = Math.round(currentMaterial.basePriceZAR * 1.45);
  }

  if (customizerState.embroideryOption.enabled && customizerState.embroideryOption.text.trim()) {
    calculatedPrice += 350;
  }
  if (customizerState.mollePocketsAddon) {
    calculatedPrice += 450;
  }

  const vehicleDisplay = `${customizerState.vehicle.year || 2024} ${customizerState.vehicle.make || 'Toyota'} ${customizerState.vehicle.model || 'Hilux'}${customizerState.vehicle.cabOrBody ? ` (${customizerState.vehicle.cabOrBody})` : ''}`;

  const rowTitle =
    customizerState.rowOption === 'front_only'
      ? 'Front Seats Only'
      : customizerState.rowOption === 'full_7_seater'
      ? 'Full 3-Row Set (7-Seater)'
      : 'Full Set (Front + Rear)';

  const handleAddToCart = () => {
    const newItem: CartItem = {
      id: `lsc-${Date.now()}`,
      productType: 'Seat Covers',
      title: `${currentMaterial.name} Custom Seat Covers`,
      subtitle: `${currentColor.name} • ${rowTitle}`,
      vehicleSummary: vehicleDisplay,
      materialName: currentMaterial.name,
      colorName: currentColor.name,
      rowOption: rowTitle,
      priceZAR: calculatedPrice,
      quantity: 1,
      customDetails: {
        embroideryText: customizerState.embroideryOption.enabled
          ? customizerState.embroideryOption.text
          : undefined,
        consoleCoverIncluded: customizerState.includeConsoleCover,
        addons: [
          customizerState.mollePocketsAddon ? 'MOLLE Utility Grid & Pouches' : null,
          customizerState.includeConsoleCover ? 'Matching Console Lid Cover' : null,
          customizerState.includePhonePocket ? 'Quick-Access Phone Pocket' : null
        ].filter(Boolean) as string[]
      }
    };

    onAddToCart(newItem);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleRequestFormalQuote = () => {
    handleAddToCart();
    const quoteEl = document.getElementById('quote-builder');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const extrasList = [
    customizerState.embroideryOption.enabled ? `Embroidery: "${customizerState.embroideryOption.text}"` : null,
    customizerState.includeConsoleCover ? 'Console Lid Cover' : null,
    customizerState.mollePocketsAddon ? 'Expedition MOLLE Pockets' : null,
    customizerState.includePhonePocket ? 'Cell Phone Pocket' : null
  ].filter(Boolean) as string[];

  const whatsappUrl = getConfigurationWhatsAppUrl({
    vehicle: vehicleDisplay,
    material: currentMaterial.name,
    color: currentColor.name,
    stitching: customizerState.customPiping ? `Piping (${customizerState.pipingColor || 'Standard'})` : undefined,
    extras: extrasList.length > 0 ? extrasList.join(', ') : undefined
  });

  return (
    <section id="customizer-studio" className="w-full bg-[#0c0c0e] py-10 sm:py-14 px-3 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-orange-400 uppercase tracking-widest bg-[#141418] border border-orange-500/20 px-2.5 py-1 rounded-md mb-2 font-mono">
              <Sliders className="w-3.5 h-3.5 text-orange-500" />
              <span>CUSTOM SEAT COVER CONFIGURATOR</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-tight">
              DESIGN FOR <span className="text-orange-500">{vehicleDisplay}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#8C9BA8] mt-1">
              7-step guided journey to configure bespoke vehicle seat covers handcrafted in Vereeniging.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSwatches}
              className="text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-xl bg-[#141418] hover:bg-zinc-800 text-white border border-white/10 hover:border-orange-500/40 transition flex items-center space-x-1.5 cursor-pointer min-h-[40px]"
            >
              <Layers className="w-3.5 h-3.5 text-orange-500" />
              <span>Free Fabric Swatches</span>
            </button>
          </div>
        </div>

        {/* 7-Step Horizontal Stepper Bar */}
        <div className="bg-[#141418] border border-white/10 rounded-2xl p-2 sm:p-2.5 overflow-x-auto select-none">
          <div className="flex items-center justify-between min-w-[620px] gap-1.5">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.num;
              const isPassed = currentStep > step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer min-h-[42px] ${
                    isActive
                      ? 'bg-white text-black shadow-lg font-black'
                      : isPassed
                      ? 'bg-white/10 text-white hover:bg-white/15'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-mono shrink-0 ${
                    isActive ? 'bg-black text-white' : isPassed ? 'bg-orange-500 text-black' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {isPassed ? '✓' : step.num}
                  </span>
                  <span className="truncate">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Area: Left Visualizer (5 Cols) + Right Step Form (7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Visualizer & Live Price Box (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Visualizer Frame */}
            <div className="bg-[#141418] border border-white/10 rounded-3xl p-3 sm:p-5 shadow-2xl space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase font-mono text-zinc-300">
                    3D Studio
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobilePreviewModal(true)}
                    className="lg:hidden text-[10px] font-mono font-bold text-orange-400 hover:text-orange-300 bg-orange-500/10 hover:bg-orange-500/20 px-2 py-0.5 rounded-md border border-orange-500/30 flex items-center gap-1 cursor-pointer"
                    title="Open Fullscreen Studio"
                  >
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>Expand</span>
                  </button>
                </div>
                
                {/* View Switchers */}
                <div className="flex items-center gap-0.5 sm:gap-1 bg-black/60 p-0.5 sm:p-1 rounded-xl border border-white/10 text-[9px] sm:text-[10px] font-bold uppercase">
                  <button
                    onClick={() => setViewMode('front')}
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg transition cursor-pointer ${viewMode === 'front' ? 'bg-white text-black font-black shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Front
                  </button>
                  <button
                    onClick={() => setViewMode('rear')}
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg transition cursor-pointer ${viewMode === 'rear' ? 'bg-white text-black font-black shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Rear
                  </button>
                  <button
                    onClick={() => setViewMode('real_photo')}
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg transition cursor-pointer ${viewMode === 'real_photo' ? 'bg-orange-500 text-white font-black shadow-sm' : 'text-orange-400 hover:text-orange-300'}`}
                  >
                    Photo
                  </button>
                  <button
                    onClick={() => setViewMode('detail')}
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg transition cursor-pointer ${viewMode === 'detail' ? 'bg-white text-black font-black shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Zoom
                  </button>
                </div>
              </div>

              {/* Render Photorealistic Visualizer Component */}
              <SeatVisualizer
                material={currentMaterial}
                primaryColorHex={currentColor.hex}
                secondaryColorHex={currentColor.hexSecondary || '#2b3035'}
                patternType={currentColor.patternType || 'solid'}
                embroideryText={customizerState.embroideryOption.enabled ? customizerState.embroideryOption.text : undefined}
                embroideryFont={customizerState.embroideryOption.font}
                embroideryColor={customizerState.embroideryOption.threadColor}
                includeConsoleCover={customizerState.includeConsoleCover}
                mollePocketsAddon={customizerState.mollePocketsAddon}
                viewMode={viewMode}
                vehicleTitle={vehicleDisplay}
              />

              {/* Active Selection Summary Pill */}
              <div className="bg-black/50 p-3 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full border border-white/30 shrink-0" style={{ backgroundColor: currentColor.hex }} />
                  <span className="font-bold text-white uppercase">{currentMaterial.name}</span>
                </div>
                <span className="text-zinc-400">{currentColor.name} • {rowTitle}</span>
              </div>
            </div>

            {/* Live Price Indicator Card (Visible in all steps) */}
            <div className="p-4 sm:p-5 bg-[#141418] border-2 border-orange-500/40 rounded-3xl space-y-2 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block font-mono">
                    Custom-fit pricing
                  </span>
                  <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                    REQUEST A PERSONALISED QUOTE
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-orange-400 uppercase block font-mono">
                    24-Month Warranty
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    Free SA Delivery
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-0.5 text-[11px] text-[#8C9BA8] font-mono leading-tight">
                <div className="text-amber-400/90 font-bold uppercase tracking-wider text-[10px]">
                  PRICING PROVIDED BY REQUEST
                </div>
                <div>
                  Our team will price your exact vehicle, material, configuration and selected extras.
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Step-Specific Content (7 Cols) */}
          <div className="lg:col-span-7 bg-[#141418] border border-white/10 rounded-3xl p-5 sm:p-7 space-y-6 shadow-2xl">
            
            {/* Step Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest">
                  {steps[currentStep - 1].title}
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-white">
                  {currentStep === 1 && 'Select Your Vehicle Details'}
                  {currentStep === 2 && 'Choose Seating Configuration'}
                  {currentStep === 3 && 'Select Seat Cover Material'}
                  {currentStep === 4 && 'Choose Your Fabric Colour'}
                  {currentStep === 5 && 'Custom Stitching & Personalization'}
                  {currentStep === 6 && 'Add Practical Extras'}
                  {currentStep === 7 && 'Review Configuration & Get Quote'}
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-400 bg-black/60 px-2.5 py-1 rounded-lg border border-white/10">
                {currentStep} of 7
              </span>
            </div>

            {/* STEP 1: VEHICLE SELECTION */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <p className="text-xs text-zinc-300">
                  Select or enter your vehicle specifications. We have tailored laser-measured patterns for over 1,500+ South African models.
                </p>

                {/* Popular Quick-Select Bakkie Chips */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase font-mono block">
                    Quick Select Popular Vehicles:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_SA_VEHICLES.slice(0, 6).map((pop) => (
                      <button
                        key={`${pop.make}-${pop.model}`}
                        type="button"
                        onClick={() => {
                          onUpdateCustomizer((prev) => ({
                            ...prev,
                            vehicle: {
                              ...prev.vehicle,
                              make: pop.make,
                              model: pop.model,
                              cabOrBody: pop.cab,
                              submodel: pop.submodel,
                              year: pop.year || 2024
                            }
                          }));
                        }}
                        className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg border transition cursor-pointer ${
                          customizerState.vehicle.make === pop.make && customizerState.vehicle.model === pop.model
                            ? 'bg-orange-500 text-black border-orange-500 font-black'
                            : 'bg-[#0c0c0e] text-zinc-300 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {pop.make} {pop.model}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Inputs: Year, Make, Model, Cab */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Make / Brand</label>
                    <input
                      type="text"
                      value={customizerState.vehicle.make}
                      onChange={(e) => {
                        const val = e.target.value;
                        onUpdateCustomizer((prev) => ({
                          ...prev,
                          vehicle: { ...prev.vehicle, make: val }
                        }));
                      }}
                      placeholder="e.g. Toyota"
                      className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Model & Trim</label>
                    <input
                      type="text"
                      value={customizerState.vehicle.model}
                      onChange={(e) => {
                        const val = e.target.value;
                        onUpdateCustomizer((prev) => ({
                          ...prev,
                          vehicle: { ...prev.vehicle, model: val }
                        }));
                      }}
                      placeholder="e.g. Hilux Legend RS / Raider"
                      className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Model Year</label>
                    <input
                      type="text"
                      value={String(customizerState.vehicle.year || '')}
                      onChange={(e) => {
                        const val = e.target.value;
                        onUpdateCustomizer((prev) => ({
                          ...prev,
                          vehicle: { ...prev.vehicle, year: Number(val) || '' }
                        }));
                      }}
                      placeholder="e.g. 2024"
                      className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Cab / Body Style</label>
                    <select
                      value={customizerState.vehicle.cabOrBody}
                      onChange={(e) => {
                        const val = e.target.value;
                        onUpdateCustomizer((prev) => ({
                          ...prev,
                          vehicle: { ...prev.vehicle, cabOrBody: val }
                        }));
                      }}
                      className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    >
                      <option value="Double Cab">Double Cab</option>
                      <option value="Single Cab">Single Cab</option>
                      <option value="Extra Cab / Super Cab">Extra Cab / Super Cab</option>
                      <option value="5-Door SUV">5-Door SUV</option>
                      <option value="7-Seater SUV">7-Seater SUV</option>
                      <option value="Station Wagon">Station Wagon</option>
                      <option value="Panel Van / Bus">Panel Van / Bus</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-xs text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Pattern Verified: Laser measured for {vehicleDisplay}</span>
                </div>
              </div>
            )}

            {/* STEP 2: SEATING ROWS */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <p className="text-xs text-zinc-300">
                  Select which seating rows you need protected. Front sets protect daily driver seats; full sets protect children, gear and passengers.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Front Only */}
                  <div
                    onClick={() => {
                      onUpdateCustomizer((prev) => ({
                        ...prev,
                        rowOption: 'front_only'
                      }));
                    }}
                    className={`p-4 rounded-2xl border-2 transition cursor-pointer space-y-2 ${
                      customizerState.rowOption === 'front_only'
                        ? 'bg-orange-500/10 border-orange-500 text-white'
                        : 'bg-black/40 border-white/10 text-zinc-300 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-lg font-bold uppercase">Front Seats Only</span>
                      {customizerState.rowOption === 'front_only' && (
                        <Check className="w-5 h-5 text-orange-400" />
                      )}
                    </div>
                    <p className="text-xs text-zinc-400">
                      Driver and passenger bucket seats with tailored headrests and armrests.
                    </p>
                    <div className="text-xs font-mono font-bold text-orange-400">
                      Pricing available by quote
                    </div>
                  </div>

                  {/* Full Set */}
                  <div
                    onClick={() => {
                      onUpdateCustomizer((prev) => ({
                        ...prev,
                        rowOption: 'front_and_rear'
                      }));
                    }}
                    className={`p-4 rounded-2xl border-2 transition cursor-pointer space-y-2 ${
                      customizerState.rowOption === 'front_and_rear'
                        ? 'bg-orange-500/10 border-orange-500 text-white'
                        : 'bg-black/40 border-white/10 text-zinc-300 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-lg font-bold uppercase">Full Set (Front + Rear)</span>
                      {customizerState.rowOption === 'front_and_rear' && (
                        <Check className="w-5 h-5 text-orange-400" />
                      )}
                    </div>
                    <p className="text-xs text-zinc-400">
                      Complete vehicle protection. Front buckets plus rear split folding bench or solid bench.
                    </p>
                    <div className="text-xs font-mono font-bold text-emerald-400">
                      Most popular choice for bakkies & SUVs
                    </div>
                  </div>

                  {/* 7-Seater Option */}
                  <div
                    onClick={() => {
                      onUpdateCustomizer((prev) => ({
                        ...prev,
                        rowOption: 'full_7_seater'
                      }));
                    }}
                    className={`sm:col-span-2 p-4 rounded-2xl border-2 transition cursor-pointer space-y-2 ${
                      customizerState.rowOption === 'full_7_seater'
                        ? 'bg-orange-500/10 border-orange-500 text-white'
                        : 'bg-black/40 border-white/10 text-zinc-300 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-lg font-bold uppercase">Full 3-Row Set (7-Seater / 8-Seater)</span>
                      {customizerState.rowOption === 'full_7_seater' && (
                        <Check className="w-5 h-5 text-orange-400" />
                      )}
                    </div>
                    <p className="text-xs text-zinc-400">
                      Covers all 3 rows (Front, Middle split bench, and rear 3rd row fold seats) for Fortuner, Prado, LC200/300, Everest, Patrol.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: MATERIAL SELECTION */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <p className="text-xs text-zinc-300">
                  Choose between our 3 proven South African fabrics. All fabrics are tested against extreme UV and water.
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {MATERIALS_DATA.map((mat) => {
                    const isSelected = customizerState.materialId === mat.id;
                    return (
                      <div
                        key={mat.id}
                        onClick={() => {
                          onUpdateCustomizer((prev) => ({
                            ...prev,
                            materialId: mat.id,
                            primaryColorId: mat.colors[0].id
                          }));
                        }}
                        className={`p-4 sm:p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-orange-500/10 border-orange-500'
                            : 'bg-black/40 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-heading text-xl font-bold uppercase text-white">
                              {mat.name}
                            </span>
                            {mat.badgeText && (
                              <span className="text-[10px] bg-orange-500 text-black font-black uppercase px-2 py-0.5 rounded-full font-mono">
                                {mat.badgeText}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-300 max-w-md">
                            {mat.description}
                          </p>
                          <div className="text-[11px] text-zinc-400 font-mono">
                            {mat.warrantyYears}-Year Local Warranty • {mat.cleaningEase}
                          </div>
                        </div>

                        <div className="text-left sm:text-right shrink-0">
                          <span className="text-xs text-zinc-400 uppercase font-mono block">Pricing</span>
                          <span className="text-base font-black font-mono text-white">REQUEST QUOTE</span>
                          <span className="text-[10px] text-emerald-400 block font-semibold">
                            {isSelected ? '✓ Selected' : 'Click to choose'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: COLOUR CHOICE */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <p className="text-xs text-zinc-300">
                  Select from verified automotive colors in {currentMaterial.name}. All colors are UV-stabilized against sun fading.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {currentMaterial.colors.map((col) => {
                    const isSelected = customizerState.primaryColorId === col.id;
                    return (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => {
                          onUpdateCustomizer((prev) => ({
                            ...prev,
                            primaryColorId: col.id
                          }));
                        }}
                        className={`p-3.5 rounded-2xl border-2 transition cursor-pointer flex flex-col items-center text-center space-y-2.5 ${
                          isSelected
                            ? 'bg-orange-500/10 border-orange-500 shadow-lg'
                            : 'bg-black/40 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div
                          className="w-12 h-12 rounded-full border-2 border-white/30 shadow-md relative"
                          style={{ backgroundColor: col.hex }}
                        >
                          {isSelected && (
                            <div className="absolute inset-0 m-auto w-5 h-5 rounded-full bg-orange-500 text-black flex items-center justify-center font-bold text-xs">
                              ✓
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white uppercase">{col.name}</div>
                          {col.badge && (
                            <span className="text-[9px] text-orange-400 uppercase font-mono block">
                              {col.badge}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: STITCHING & EMBROIDERY */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <p className="text-xs text-zinc-300">
                  Personalize your seat covers with custom headrest or backrest embroidery and contrast stitching.
                </p>

                <div className="p-4 bg-black/40 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-heading text-base font-bold uppercase text-white block">
                        Custom Headrest Embroidery
                      </span>
                      <span className="text-xs text-zinc-400">
                        Add a vehicle name, farm name, or custom text to your quote request
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateCustomizer((prev) => ({
                          ...prev,
                          embroideryOption: {
                            ...prev.embroideryOption,
                            enabled: !prev.embroideryOption.enabled
                          }
                        }));
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${
                        customizerState.embroideryOption.enabled
                          ? 'bg-orange-500 text-black font-black'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {customizerState.embroideryOption.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>

                  {customizerState.embroideryOption.enabled && (
                    <div className="space-y-3 pt-2 border-t border-white/10">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                          Embroidery Text
                        </label>
                        <input
                          type="text"
                          value={customizerState.embroideryOption.text}
                          onChange={(e) => {
                            const val = e.target.value;
                            onUpdateCustomizer((prev) => ({
                              ...prev,
                              embroideryOption: {
                                ...prev.embroideryOption,
                                text: val
                              }
                            }));
                          }}
                          placeholder="e.g. HILUX 4X4"
                          className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-sm uppercase font-bold text-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                            Thread Color
                          </label>
                          <select
                            value={customizerState.embroideryOption.threadColor}
                            onChange={(e) => {
                              const val = e.target.value;
                              onUpdateCustomizer((prev) => ({
                                ...prev,
                                embroideryOption: {
                                  ...prev.embroideryOption,
                                  threadColor: val
                                }
                              }));
                            }}
                            className="w-full bg-[#0c0c0e] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          >
                            <option value="#ffffff">Pure White / Silver</option>
                            <option value="#ea580c">Fiery Orange</option>
                            <option value="#e03131">Sport Red</option>
                            <option value="#b39c7d">Kalahari Sand</option>
                            <option value="#000000">Stealth Black</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                            Font Style
                          </label>
                          <select
                            value={customizerState.embroideryOption.font}
                            onChange={(e) => {
                              const val = e.target.value as any;
                              onUpdateCustomizer((prev) => ({
                                ...prev,
                                embroideryOption: {
                                  ...prev.embroideryOption,
                                  font: val
                                }
                              }));
                            }}
                            className="w-full bg-[#0c0c0e] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          >
                            <option value="block">Bold Heavy Block</option>
                            <option value="rugged">Rugged Overland Serif</option>
                            <option value="italic">Sport Italic GT</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 6: PRACTICAL EXTRAS */}
            {currentStep === 6 && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <p className="text-xs text-zinc-300">
                  Add functional utility accessories designed specifically for South African bakkies and active drivers.
                </p>

                {/* 1. Center Console Lid Cover */}
                <div className="p-4 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-heading text-sm font-bold uppercase text-white">
                      Padded Center Console Lid Cover
                    </div>
                    <div className="text-xs text-zinc-400">
                      Protects the armrest from sweat, sunscreen, and dog paws.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateCustomizer((prev) => ({
                        ...prev,
                        includeConsoleCover: !prev.includeConsoleCover
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${
                      customizerState.includeConsoleCover
                        ? 'bg-white text-black font-black'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {customizerState.includeConsoleCover ? '✓ Included' : '+ Add'}
                  </button>
                </div>

                {/* 2. Cell Phone / Pen Pocket */}
                <div className="p-4 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-heading text-sm font-bold uppercase text-white">
                      Quick-Access Smartphone & Pen Pocket
                    </div>
                    <div className="text-xs text-zinc-400">
                      Integrated on the front seat bolster for easy access while driving.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateCustomizer((prev) => ({
                        ...prev,
                        includePhonePocket: !prev.includePhonePocket
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${
                      customizerState.includePhonePocket
                        ? 'bg-white text-black font-black'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {customizerState.includePhonePocket ? '✓ Included' : '+ Add'}
                  </button>
                </div>

                {/* 3. Expedition MOLLE Storage Grid */}
                <div className="p-4 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-heading text-sm font-bold uppercase text-white flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      <span>Expedition MOLLE Organizer Grid</span>
                    </div>
                    <div className="text-xs text-zinc-400">
                      Laser-cut webbing with 2 detachable pouches on the back of front seats.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateCustomizer((prev) => ({
                        ...prev,
                        mollePocketsAddon: !prev.mollePocketsAddon
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition cursor-pointer ${
                      customizerState.mollePocketsAddon
                        ? 'bg-white text-black font-black'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {customizerState.mollePocketsAddon ? '✓ Added' : '+ Add'}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: SUMMARY & QUOTE REQUEST */}
            {currentStep === 7 && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <p className="text-xs text-zinc-300">
                  Please review your custom seat cover specification below. Request a formal quote or chat directly with our Vereeniging workshop team on WhatsApp.
                </p>

                {/* Specification Summary Card */}
                <div className="p-4 bg-black/60 rounded-2xl border border-white/10 space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-zinc-400 uppercase font-mono">Vehicle:</span>
                    <span className="font-bold text-white">{vehicleDisplay}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-zinc-400 uppercase font-mono">Seating Rows:</span>
                    <span className="font-bold text-white">{rowTitle}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-zinc-400 uppercase font-mono">Material:</span>
                    <span className="font-bold text-orange-400 uppercase">{currentMaterial.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-zinc-400 uppercase font-mono">Colour:</span>
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full border border-white/30 inline-block" style={{ backgroundColor: currentColor.hex }} />
                      {currentColor.name}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-zinc-400 uppercase font-mono">Embroidery:</span>
                    <span className="font-bold text-white">
                      {customizerState.embroideryOption.enabled && customizerState.embroideryOption.text
                        ? `"${customizerState.embroideryOption.text}"`
                        : 'None'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 uppercase font-mono">Selected Extras:</span>
                    <span className="font-bold text-white text-right">
                      {[
                        customizerState.includeConsoleCover ? 'Console Cover' : null,
                        customizerState.includePhonePocket ? 'Phone Pocket' : null,
                        customizerState.mollePocketsAddon ? 'MOLLE Organizer' : null
                      ].filter(Boolean).join(', ') || 'Standard fit'}
                    </span>
                  </div>
                </div>

                {/* Quote-only notice */}
                <div className="p-4 bg-orange-500/10 border-2 border-orange-500/40 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-400 block font-mono">
                        Custom-fit pricing
                      </span>
                      <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                        REQUEST A PERSONALISED QUOTE
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-400 font-bold block">
                        ✓ Free Courier Delivery SA
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        Lead time: 5-7 working days
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-1 text-[11px] text-[#8C9BA8] font-mono leading-tight">
                    <div className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                      PRICING PROVIDED BY REQUEST
                    </div>
                    <div>
                      Our team will price your exact vehicle, material, configuration and selected extras.
                    </div>
                  </div>
                </div>

                {/* Primary & Secondary Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={handleRequestFormalQuote}
                    className="w-full min-h-[48px] py-3.5 px-5 rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold uppercase text-xs sm:text-sm tracking-wider flex items-center justify-center space-x-2 shadow-2xl transition cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-orange-600" />
                    <span>REQUEST FORMAL QUOTE</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full min-h-[46px] py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-xs sm:text-sm tracking-wider flex items-center justify-center space-x-2 transition shadow-lg cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WHATSAPP THIS CONFIGURATION</span>
                  </a>
                </div>

                {addedToast && (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-center text-xs font-bold text-emerald-300 animate-in fade-in">
                    ✓ Custom configuration saved to your quote & cart!
                  </div>
                )}
              </div>
            )}

            {/* Stepper Navigation Buttons (Previous / Next) */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition cursor-pointer min-h-[40px] ${
                  currentStep === 1
                    ? 'opacity-30 cursor-not-allowed text-zinc-500'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentStep < 7 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => Math.min(7, prev + 1))}
                  className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase text-xs tracking-wider flex items-center space-x-1.5 transition cursor-pointer shadow-lg min-h-[40px]"
                >
                  <span>Next: {steps[currentStep].label}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRequestFormalQuote}
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-bold uppercase text-xs tracking-wider flex items-center space-x-1.5 transition cursor-pointer shadow-lg min-h-[40px]"
                >
                  <span>Submit Quote Request</span>
                  <ChevronRight className="w-4 h-4 text-orange-600" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
