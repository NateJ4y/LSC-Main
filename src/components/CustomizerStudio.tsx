import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Check, 
  Sliders, 
  Type, 
  Plus, 
  ShoppingCart, 
  MessageCircle, 
  Eye, 
  HelpCircle, 
  ChevronRight, 
  Award,
  Sun,
  Flame,
  Droplets,
  PenLine,
  Car
} from 'lucide-react';
import { MATERIALS_DATA } from '../data/materialsData';
import { CustomizerState, CartItem, VehicleSelection } from '../types';
import { SeatVisualizer } from './SeatVisualizer';

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
  const [activeTab, setActiveTab] = useState<'material' | 'color' | 'rows' | 'embroidery'>('material');
  const [viewMode, setViewMode] = useState<'front' | 'rear' | 'detail'>('front');
  const [addedToast, setAddedToast] = useState(false);
  const [showVehicleEditor, setShowVehicleEditor] = useState(false);

  // Editable vehicle state
  const [editYear, setEditYear] = useState(String(customizerState.vehicle.year || 2024));
  const [editMake, setEditMake] = useState(customizerState.vehicle.make || 'Toyota');
  const [editModel, setEditModel] = useState(customizerState.vehicle.model || 'Hilux');
  const [editCab, setEditCab] = useState(customizerState.vehicle.cabOrBody || 'Double Cab');

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCustomizer((prev) => ({
      ...prev,
      vehicle: {
        ...prev.vehicle,
        year: editYear ? Number(editYear) || (editYear as any) : 2024,
        make: editMake,
        model: editModel,
        cabOrBody: editCab
      }
    }));
    setShowVehicleEditor(false);
  };

  const currentMaterial =
    MATERIALS_DATA.find((m) => m.id === customizerState.materialId) || MATERIALS_DATA[0];

  const currentColor =
    currentMaterial.colors.find((c) => c.id === customizerState.primaryColorId) ||
    currentMaterial.colors[0];

  // Calculate Price based on material, rows, and add-ons
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

  const handleAddToCart = () => {
    const rowTitle =
      customizerState.rowOption === 'front_only'
        ? 'Front Bucket Seats Only'
        : customizerState.rowOption === 'full_7_seater'
        ? 'Full 3-Row 7-Seater Set'
        : 'Full Set (Front + Rear 60/40 Bench)';

    const vehicleSummary = `${customizerState.vehicle.year} ${customizerState.vehicle.make} ${customizerState.vehicle.model} (${customizerState.vehicle.cabOrBody} - ${customizerState.vehicle.submodel})`;

    const newItem: CartItem = {
      id: `lsc-${Date.now()}`,
      productType: 'Seat Covers',
      title: `${currentMaterial.name} Custom Seat Covers`,
      subtitle: `${currentColor.name} • ${rowTitle}`,
      vehicleSummary,
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
          customizerState.mollePocketsAddon ? 'Tactical MOLLE Utility Pouches' : null,
          customizerState.includeConsoleCover ? 'Matching Console Cover' : null
        ].filter(Boolean) as string[]
      }
    };

    onAddToCart(newItem);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const vehicleDisplay = `${customizerState.vehicle.year || 2024} ${customizerState.vehicle.make || 'Toyota'} ${customizerState.vehicle.model || 'Hilux'} ${customizerState.vehicle.cabOrBody ? `(${customizerState.vehicle.cabOrBody})` : ''}`;

  return (
    <section id="customizer-studio" className="w-full bg-[#0c0c0e] py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-[#8C9BA8] uppercase tracking-widest bg-[#141418] border border-white/10 px-3 py-1 rounded-md mb-2 font-mono">
              <Sliders className="w-3.5 h-3.5 text-orange-500" />
              <span>CUSTOM SEAT COVER STUDIO</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              CONFIGURE FOR <span className="text-white border-b-2 border-orange-500 pb-0.5">{vehicleDisplay}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#8C9BA8] mt-1">
              Select your fabric, colors, seating rows, and personalized embroidery with real-time 3D CAD preview.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowVehicleEditor(!showVehicleEditor)}
              className="text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition flex items-center space-x-2 cursor-pointer"
            >
              <PenLine className="w-3.5 h-3.5 text-orange-500" />
              <span>{showVehicleEditor ? 'Close Editor' : 'Type / Change Vehicle'}</span>
            </button>

            <button
              onClick={onOpenSwatches}
              className="text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl bg-[#141418] hover:bg-zinc-800 text-white border border-white/10 hover:border-orange-500/40 transition flex items-center space-x-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-orange-500" />
              <span>Request Free Swatch Pack</span>
            </button>
          </div>
        </div>

        {/* Inline Vehicle Type-In Editor Drawer */}
        {showVehicleEditor && (
          <form onSubmit={handleSaveVehicle} className="mb-6 p-4 sm:p-5 bg-[#141418] border border-orange-500/40 rounded-2xl shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase text-white flex items-center gap-1.5 font-mono">
                <Car className="w-4 h-4 text-orange-500" />
                Type or Edit Your Exact Vehicle Spec
              </span>
              <span className="text-[10px] text-zinc-400">Over 1,500+ CAD laser cut patterns available</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block text-[10px] font-bold text-zinc-300 uppercase mb-1">Model Year</label>
                <input
                  type="text"
                  value={editYear}
                  onChange={(e) => setEditYear(e.target.value)}
                  placeholder="e.g. 2024"
                  className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-2.5 py-2 text-xs font-semibold text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-300 uppercase mb-1">Make / Brand</label>
                <input
                  type="text"
                  value={editMake}
                  onChange={(e) => setEditMake(e.target.value)}
                  placeholder="e.g. Toyota, Ford, Isuzu"
                  className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-2.5 py-2 text-xs font-semibold text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-300 uppercase mb-1">Model & Trim</label>
                <input
                  type="text"
                  value={editModel}
                  onChange={(e) => setEditModel(e.target.value)}
                  placeholder="e.g. Hilux Legend 50 / Wildtrak"
                  className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-2.5 py-2 text-xs font-semibold text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-300 uppercase mb-1">Cab / Body</label>
                <input
                  type="text"
                  value={editCab}
                  onChange={(e) => setEditCab(e.target.value)}
                  placeholder="e.g. Double Cab / SUV"
                  className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-2.5 py-2 text-xs font-semibold text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-1">
              <button
                type="button"
                onClick={() => setShowVehicleEditor(false)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider cursor-pointer shadow"
              >
                Apply Vehicle
              </button>
            </div>
          </form>
        )}

        {/* Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Visualizer & View Mode Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            {/* View Mode Switcher Pills */}
            <div className="flex items-center justify-between bg-[#141418] p-1.5 rounded-2xl border border-white/10">
              <span className="text-[11px] font-bold text-[#8C9BA8] px-2 uppercase font-mono">View:</span>
              <div className="flex space-x-1">
                <button
                  onClick={() => setViewMode('front')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                    viewMode === 'front'
                      ? 'bg-white text-black shadow'
                      : 'text-[#8C9BA8] hover:text-white'
                  }`}
                >
                  Front Buckets
                </button>
                <button
                  onClick={() => setViewMode('rear')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                    viewMode === 'rear'
                      ? 'bg-white text-black shadow'
                      : 'text-[#8C9BA8] hover:text-white'
                  }`}
                >
                  Rear 60/40
                </button>
                <button
                  onClick={() => setViewMode('detail')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                    viewMode === 'detail'
                      ? 'bg-white text-black shadow'
                      : 'text-[#8C9BA8] hover:text-white'
                  }`}
                >
                  Fabric Zoom
                </button>
              </div>
            </div>

            {/* Interactive Seat Render */}
            <SeatVisualizer
              material={currentMaterial}
              primaryColorHex={currentColor.hex}
              secondaryColorHex={currentColor.hexSecondary || '#2b3035'}
              patternType={currentColor.patternType || 'solid'}
              embroideryText={
                customizerState.embroideryOption.enabled
                  ? customizerState.embroideryOption.text
                  : undefined
              }
              embroideryFont={customizerState.embroideryOption.font}
              embroideryColor={customizerState.embroideryOption.threadColor}
              includeConsoleCover={customizerState.includeConsoleCover}
              mollePocketsAddon={customizerState.mollePocketsAddon}
              viewMode={viewMode}
              vehicleTitle={vehicleDisplay}
            />

            {/* Quality Badges */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#141418] border border-white/10 p-2.5 rounded-2xl">
                <div className="text-[10px] text-[#8C9BA8] font-bold uppercase">UV Protection</div>
                <div className="text-xs sm:text-sm font-black text-white flex items-center justify-center gap-1 mt-0.5">
                  <Sun className="w-3.5 h-3.5 text-orange-500" />
                  {currentMaterial.uvResistanceRating}/10 UPF50+
                </div>
              </div>
              <div className="bg-[#141418] border border-white/10 p-2.5 rounded-2xl">
                <div className="text-[10px] text-[#8C9BA8] font-bold uppercase">Waterproof</div>
                <div className="text-xs sm:text-sm font-black text-blue-400 flex items-center justify-center gap-1 mt-0.5">
                  <Droplets className="w-3.5 h-3.5" />
                  {currentMaterial.waterproofRating}/10 SABS
                </div>
              </div>
              <div className="bg-[#141418] border border-white/10 p-2.5 rounded-2xl">
                <div className="text-[10px] text-[#8C9BA8] font-bold uppercase">SA Warranty</div>
                <div className="text-xs sm:text-sm font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                  <Award className="w-3.5 h-3.5" />
                  {currentMaterial.warrantyYears} Years
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customizer Configuration Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step Navigation Tabs */}
            <div className="grid grid-cols-4 gap-1.5 bg-[#141418] p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab('material')}
                className={`py-2.5 px-1 sm:px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'material'
                    ? 'bg-white text-black shadow-md'
                    : 'text-[#8C9BA8] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5 shrink-0 text-orange-600" />
                <span className="truncate">1. Fabric</span>
              </button>

              <button
                onClick={() => setActiveTab('color')}
                className={`py-2.5 px-1 sm:px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'color'
                    ? 'bg-white text-black shadow-md'
                    : 'text-[#8C9BA8] hover:text-white'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full border border-black/40 shrink-0" style={{ backgroundColor: currentColor.hex }} />
                <span className="truncate">2. Colors</span>
              </button>

              <button
                onClick={() => setActiveTab('rows')}
                className={`py-2.5 px-1 sm:px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'rows'
                    ? 'bg-white text-black shadow-md'
                    : 'text-[#8C9BA8] hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5 shrink-0 text-orange-600" />
                <span className="truncate">3. Rows</span>
              </button>

              <button
                onClick={() => setActiveTab('embroidery')}
                className={`py-2.5 px-1 sm:px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'embroidery'
                    ? 'bg-white text-black shadow-md'
                    : 'text-[#8C9BA8] hover:text-white'
                }`}
              >
                <Type className="w-3.5 h-3.5 shrink-0 text-orange-600" />
                <span className="truncate">4. Custom</span>
              </button>
            </div>

            {/* TAB 1: MATERIAL SELECTION */}
            {activeTab === 'material' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-[#8C9BA8] uppercase tracking-wider flex items-center justify-between font-mono">
                  <span>Choose Your High-Performance Fabric:</span>
                  <span className="text-white font-semibold">100% Laser-Fit Tailored</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                        className={`p-4 sm:p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between space-y-3 ${
                          isSelected
                            ? 'bg-[#18181f] border-orange-500 shadow-xl shadow-orange-500/10'
                            : 'bg-[#141418] border-white/10 hover:border-white/30'
                        }`}
                      >
                        {/* Top Info Bar */}
                        <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 font-mono">
                            {mat.warrantyYears} YEAR WARRANTY
                          </span>
                          {mat.badgeText && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10 shrink-0">
                              {mat.badgeText}
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="font-heading text-lg font-bold text-white uppercase flex items-center justify-between gap-2">
                            <span>{mat.name}</span>
                            {isSelected && <Check className="w-4 h-4 text-orange-500 shrink-0" />}
                          </h4>
                          <p className="text-xs text-[#8C9BA8] font-medium mt-1">{mat.tagline}</p>
                          <p className="text-xs text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
                            {mat.description}
                          </p>
                        </div>

                        {/* Specs Mini-Badges */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                          <div className="text-zinc-400 text-[11px]">
                            Care: <span className="text-white font-semibold">{mat.cleaningEase}</span>
                          </div>
                          <div className="font-mono font-bold text-white text-sm">
                            From R{mat.basePriceZAR.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: COLOR & TWO-TONE PATTERNS */}
            {activeTab === 'color' && (
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-[#8C9BA8] uppercase tracking-wider mb-2 font-mono">
                    Available Colors & Patterns for {currentMaterial.name}:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {currentMaterial.colors.map((c) => {
                      const isSelected = customizerState.primaryColorId === c.id;
                      return (
                        <div
                          key={c.id}
                          onClick={() => {
                            onUpdateCustomizer((prev) => ({
                              ...prev,
                              primaryColorId: c.id
                            }));
                          }}
                          className={`p-3 rounded-2xl border-2 cursor-pointer transition flex flex-col items-center text-center ${
                            isSelected
                              ? 'bg-[#18181f] border-white shadow-md'
                              : 'bg-[#141418] border-white/10 hover:border-white/30'
                          }`}
                        >
                          {/* Visual Color Pill Swatch */}
                          <div className="relative w-14 h-14 rounded-full border-2 border-zinc-700 shadow-inner overflow-hidden mb-2.5 flex items-center justify-center">
                            <div
                              className="absolute inset-0"
                              style={{ backgroundColor: c.hex }}
                            />
                            {c.hexSecondary && (
                              <div
                                className="absolute right-0 top-0 bottom-0 w-1/2 border-l border-black/40"
                                style={{ backgroundColor: c.hexSecondary }}
                              />
                            )}
                            {isSelected && (
                              <div className="relative z-10 w-6 h-6 rounded-full bg-white text-black flex items-center justify-center shadow">
                                <Check className="w-3.5 h-3.5 font-black stroke-[3]" />
                              </div>
                            )}
                          </div>

                          <div className="text-xs font-bold text-white uppercase">{c.name}</div>
                          {c.badge && (
                            <span className="mt-1 text-[9px] font-semibold text-orange-400 bg-orange-600/20 px-1.5 py-0.5 rounded border border-orange-500/30">
                              {c.badge}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 bg-[#141418] rounded-2xl border border-white/10 text-xs text-zinc-300 flex items-start space-x-3">
                  <Sparkles className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Factory Color Match:</span> All dyes and pigments are UV-stabilized to withstand the harsh South African sun without fading, cracking, or turning brittle.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ROW CONFIGURATION */}
            {activeTab === 'rows' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-[#8C9BA8] uppercase tracking-wider font-mono">
                  Select Seating Row Coverage:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Front Row Only */}
                  <div
                    onClick={() => onUpdateCustomizer((prev) => ({ ...prev, rowOption: 'front_only' }))}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                      customizerState.rowOption === 'front_only'
                        ? 'bg-[#18181f] border-white shadow-md'
                        : 'bg-[#141418] border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading text-lg font-bold text-white uppercase">Front Row Only</span>
                      {customizerState.rowOption === 'front_only' && <Check className="w-4 h-4 text-orange-500" />}
                    </div>
                    <p className="text-xs text-[#8C9BA8] leading-relaxed">
                      Driver + Front Passenger bucket seat covers + matching headrests.
                    </p>
                    <div className="mt-3 font-mono font-bold text-white text-sm">
                      R{Math.round(currentMaterial.basePriceZAR * 0.6).toLocaleString()}
                    </div>
                  </div>

                  {/* Front + Rear Set (Most Popular) */}
                  <div
                    onClick={() => onUpdateCustomizer((prev) => ({ ...prev, rowOption: 'front_and_rear' }))}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition relative ${
                      customizerState.rowOption === 'front_and_rear'
                        ? 'bg-[#18181f] border-white shadow-md'
                        : 'bg-[#141418] border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="absolute -top-2.5 right-3 text-[10px] font-bold bg-white text-black px-2 py-0.5 rounded-full shadow">
                      POPULAR
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading text-lg font-bold text-white uppercase">Full 2-Row Set</span>
                      {customizerState.rowOption === 'front_and_rear' && <Check className="w-4 h-4 text-orange-500" />}
                    </div>
                    <p className="text-xs text-[#8C9BA8] leading-relaxed">
                      Front pair + 60/40 or solid rear bench with cup holder access & headrests.
                    </p>
                    <div className="mt-3 font-mono font-bold text-white text-sm">
                      R{currentMaterial.basePriceZAR.toLocaleString()}
                    </div>
                  </div>

                  {/* Full 7-Seater 3-Row Set */}
                  <div
                    onClick={() => onUpdateCustomizer((prev) => ({ ...prev, rowOption: 'full_7_seater' }))}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                      customizerState.rowOption === 'full_7_seater'
                        ? 'bg-[#18181f] border-white shadow-md'
                        : 'bg-[#141418] border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading text-lg font-bold text-white uppercase">Full 7-Seater</span>
                      {customizerState.rowOption === 'full_7_seater' && <Check className="w-4 h-4 text-orange-500" />}
                    </div>
                    <p className="text-xs text-[#8C9BA8] leading-relaxed">
                      All 3 Rows: Front + Middle 60/40 + 3rd Row Jump/Fold seats.
                    </p>
                    <div className="mt-3 font-mono font-bold text-white text-sm">
                      R{Math.round(currentMaterial.basePriceZAR * 1.45).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Free Included Console Cover Toggle */}
                <div className="mt-4 p-4 bg-[#141418] rounded-2xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                      <ShieldCheck className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase">
                        Matching Center Armrest / Console Lid Cover
                      </div>
                      <div className="text-[11px] text-[#8C9BA8]">
                        Tailored in matching fabric to prevent elbow sweat & pet claw scratches
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    FREE INCLUDED
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: EMBROIDERY & ADD-ONS */}
            {activeTab === 'embroidery' && (
              <div className="space-y-5">
                {/* Custom Embroidery Card */}
                <div className="p-5 bg-[#141418] rounded-2xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                        <Type className="w-4 h-4 text-orange-500" />
                        <span>Custom Headrest / Backrest Embroidery</span>
                      </h4>
                      <p className="text-xs text-[#8C9BA8]">
                        Add your vehicle name (e.g. HILUX 4X4, WILDTRAK, KAROO), family name, or farm initials.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        onUpdateCustomizer((prev) => ({
                          ...prev,
                          embroideryOption: {
                            ...prev.embroideryOption,
                            enabled: !prev.embroideryOption.enabled,
                            text: !prev.embroideryOption.enabled && !prev.embroideryOption.text ? 'HILUX 4X4' : prev.embroideryOption.text
                          }
                        }))
                      }
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition ${
                        customizerState.embroideryOption.enabled
                          ? 'bg-white text-black border-white'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                      }`}
                    >
                      {customizerState.embroideryOption.enabled ? '✓ Enabled (+R350)' : '+ Add (+R350)'}
                    </button>
                  </div>

                  {customizerState.embroideryOption.enabled && (
                    <div className="space-y-3 pt-2 border-t border-white/10">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                          Embroidery Text (Max 14 characters)
                        </label>
                        <input
                          type="text"
                          maxLength={14}
                          value={customizerState.embroideryOption.text}
                          onChange={(e) =>
                            onUpdateCustomizer((prev) => ({
                              ...prev,
                              embroideryOption: {
                                ...prev.embroideryOption,
                                text: e.target.value.toUpperCase()
                              }
                            }))
                          }
                          placeholder="e.g. WILDTRAK V6"
                          className="w-full bg-[#0c0c0e] border border-zinc-700 rounded-xl px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white focus:outline-none focus:border-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                            Thread Color
                          </label>
                          <select
                            value={customizerState.embroideryOption.threadColor}
                            onChange={(e) =>
                              onUpdateCustomizer((prev) => ({
                                ...prev,
                                embroideryOption: {
                                  ...prev.embroideryOption,
                                  threadColor: e.target.value
                                }
                              }))
                            }
                            className="w-full bg-[#0c0c0e] border border-zinc-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none"
                          >
                            <option value="#ffffff">Silver / Pure White</option>
                            <option value="#ea580c">Fiery Orange Thread</option>
                            <option value="#e03131">Sport GT Red</option>
                            <option value="#1971c2">Royal Blue</option>
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
                            onChange={(e) =>
                              onUpdateCustomizer((prev) => ({
                                ...prev,
                                embroideryOption: {
                                  ...prev.embroideryOption,
                                  font: e.target.value as 'block' | 'italic' | 'rugged'
                                }
                              }))
                            }
                            className="w-full bg-[#0c0c0e] border border-zinc-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none"
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

                {/* Tactical MOLLE Addon Card */}
                <div className="p-4 bg-[#141418] rounded-2xl border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      <span>Expedition MOLLE Side Grid + 2 Tactical Pouches</span>
                    </div>
                    <div className="text-[11px] text-[#8C9BA8]">
                      Laser-cut webbing grid on driver/passenger bolster with detachable first aid & flashlight pouch.
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      onUpdateCustomizer((prev) => ({
                        ...prev,
                        mollePocketsAddon: !prev.mollePocketsAddon
                      }))
                    }
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition whitespace-nowrap ${
                      customizerState.mollePocketsAddon
                        ? 'bg-white text-black border-white'
                        : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                    }`}
                  >
                    {customizerState.mollePocketsAddon ? '✓ Added (+R450)' : '+ Add (+R450)'}
                  </button>
                </div>
              </div>
            )}

            {/* Price & Order Action Bar */}
            <div className="p-6 bg-[#141418] rounded-3xl border border-white/20 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs text-[#8C9BA8] uppercase font-mono">Custom Tailored Price (VAT Incl.)</div>
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-white">
                    R{calculatedPrice.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                    <span>✓ Free Courier Guy Delivery across South Africa</span>
                  </div>
                </div>

                <div className="text-right sm:text-right text-xs text-[#8C9BA8] font-mono">
                  <div className="font-bold text-white uppercase">Crafted in Sandton & Bellville</div>
                  <div>Lead time: 5-7 working days</div>
                </div>
              </div>

              {/* Order Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold uppercase text-sm tracking-wider flex items-center justify-center space-x-2 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer"
                >
                  <ShoppingCart className="w-5 h-5 text-orange-600" />
                  <span>ADD TO CART & CHECKOUT</span>
                </button>

                <a
                  href={`https://wa.me/27118874000?text=Hi%20Lifestyle%20Seat%20Covers!%20I%20would%20like%20a%20quote%20for%20my%20${encodeURIComponent(
                    vehicleDisplay
                  )}%20in%20${encodeURIComponent(
                    currentMaterial.name
                  )}%20(${encodeURIComponent(
                    currentColor.name
                  )})%20-%20R${calculatedPrice}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-xs sm:text-sm tracking-wider flex items-center justify-center space-x-2 transition shadow-lg shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>ORDER VIA WHATSAPP</span>
                </a>
              </div>

              {/* Success Toast */}
              {addedToast && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-center text-xs font-bold text-emerald-300 animate-in fade-in">
                  ✓ Custom configured seat covers added to your shopping cart!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
