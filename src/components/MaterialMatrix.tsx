import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight,
  Layers,
  Sparkles,
  ShieldCheck,
  Droplets,
  Flame,
  Sun,
  ChevronDown,
  ChevronUp,
  Cpu,
  Award,
  Zap
} from 'lucide-react';

interface MaterialMatrixProps {
  onSelectMaterial: (materialId: string) => void;
  onOpenSwatches: () => void;
}

interface FabricDetail {
  id: string;
  name: string;
  subtitle: string;
  categoryBadge: string;
  badgeColor: string;
  priceFront: string;
  priceFull: string;
  description: string;
  gsm: string;
  waterproofRating: string;
  abrasionRating: string;
  uvRating: string;
  petRating: string;
  cleanTime: string;
  colors: { name: string; hex: string; border?: string }[];
  bulletPoints: string[];
  tactileType: 'ripstop' | 'leatherette' | 'polyester';
}

const FABRICS: FabricDetail[] = [
  {
    id: 'heavy-duty-ripstop-canvas',
    name: '510g Tough Ripstop Canvas',
    subtitle: 'Military-Spec Woven Canvas',
    categoryBadge: '⭐ #1 SA 4X4 & BAKKIES',
    badgeColor: 'bg-gradient-to-r from-orange-500 to-amber-600 text-black',
    priceFront: 'FROM R2,650',
    priceFull: 'FROM R3,950',
    description: 'South Africa’s toughest off-road shield. 100% waterproof military-grade cotton/polyester canvas that shrugs off red Kalahari mud, thorns, and wet hunting dogs.',
    gsm: '510 GSM Mil-Spec',
    waterproofRating: '100% (Hydrostatic > 12,000mm)',
    abrasionRating: '65,000+ Martindale Rubs',
    uvRating: 'UPF 50+ Extreme Karoo Defense',
    petRating: 'Claw, Mud & Dog Hair Proof',
    cleanTime: '10-min brush or pressure wipe',
    colors: [
      { name: 'Overland Khaki', hex: '#63533c' },
      { name: 'Kalahari Desert Sand', hex: '#9c8c70' },
      { name: 'Tactical Charcoal', hex: '#2c2d30' },
      { name: 'Stealth Black', hex: '#151517' }
    ],
    bulletPoints: [
      '100% Impervious to water, mud & spilled coffee',
      'Guaranteed rip-stop grid prevents snag propagation',
      'Certified SABS-compliant airbag breakaway seams',
      'UV-stabilized pigment resists fading under high African sun'
    ],
    tactileType: 'ripstop'
  },
  {
    id: 'rhino-hide-leatherette',
    name: 'Rhino Hide Luxury Leatherette',
    subtitle: 'Executive Supple Grain Synthetic',
    categoryBadge: '👑 EXECUTIVE LUXURY & SUVS',
    badgeColor: 'bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 text-black',
    priceFront: 'FROM R2,950',
    priceFull: 'FROM R4,450',
    description: 'Louis Vuitton grade supple automotive leatherette with French double-needle contrast stitching. Gives your interior an executive finish that wipes clean in 5 seconds.',
    gsm: '650 GSM Multi-Laminate',
    waterproofRating: '100% Spill & Stain Impermeable',
    abrasionRating: '80,000+ Martindale Rubs',
    uvRating: 'Non-Cracking Thermal Coating',
    petRating: 'Hair Slides Off Instantaneous',
    cleanTime: '5-sec damp microfiber wipe',
    colors: [
      { name: 'Executive Obsidian', hex: '#18181b' },
      { name: 'Saddle Tan Heritage', hex: '#875128' },
      { name: 'Truffle Grey', hex: '#4b4844' },
      { name: 'Cognac Brown', hex: '#6b361a' }
    ],
    bulletPoints: [
      'Instant wipe-down defense against spills and mud',
      'Laminated 6mm high-density lumbar comfort foam',
      'Pet hair does not embed into the supple surface',
      'Precision French double-stitch contrast needlework'
    ],
    tactileType: 'leatherette'
  },
  {
    id: '600d-synthetic-polyester',
    name: '600D Ballistic Poly Canvas',
    subtitle: 'High-Density Commuter Weave',
    categoryBadge: '⚡ FLEETS & DAILY COMMUTERS',
    badgeColor: 'bg-zinc-800 border border-white/20 text-white',
    priceFront: 'FROM R2,450',
    priceFull: 'FROM R3,650',
    description: 'High-density synthetic ballistic polyester tailored for commercial fleets, delivery vehicles, and active daily commuters seeking breathable comfort.',
    gsm: '420 GSM High-Tensile',
    waterproofRating: 'Water-Repellent DWR Coating',
    abrasionRating: '45,000+ Martindale Rubs',
    uvRating: 'Anti-Fade UV Inhibitor Treated',
    petRating: 'Tough Anti-Scratch Finish',
    cleanTime: 'Quick damp sponge or brush',
    colors: [
      { name: 'Urban Graphite', hex: '#374151' },
      { name: 'Deep Midnight Black', hex: '#111827' },
      { name: 'Navy Fleet Blue', hex: '#1e3a5f' }
    ],
    bulletPoints: [
      'Breathable weave remains comfortable on 40°C summer days',
      'High-tensile ballistic strength protects against heavy tool friction',
      'Machine-washable & quick dry formulation',
      'Cost-effective corporate fleet equity preservation'
    ],
    tactileType: 'polyester'
  }
];

export const MaterialMatrix: React.FC<MaterialMatrixProps> = ({
  onSelectMaterial,
  onOpenSwatches
}) => {
  const [selectedColors, setSelectedColors] = useState<{ [key: string]: number }>({
    'heavy-duty-ripstop-canvas': 0,
    'rhino-hide-leatherette': 0,
    '600d-synthetic-polyester': 0
  });
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  return (
    <section id="fabric-matrix" className="w-full bg-[#0c0c0e] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header: Apple/LV Inspired Minimalist Display */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-orange-400 uppercase tracking-[0.25em] bg-black/60 border border-orange-500/20 px-3.5 py-1.5 rounded-full font-mono shadow-sm">
            <Layers className="w-3.5 h-3.5 text-orange-400" />
            <span>VEREENIGING WORKSHOP TEXTILE LABORATORY</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
            CUSTOM FABRIC MATRIX
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Engineered exclusively for South Africa’s extreme climate, Kalahari dust, agricultural work, and executive luxury. Choose your tactile material below.
          </p>
        </div>

        {/* 3 Core Material Cards (No image previews as requested, high-end tactile tech styling) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {FABRICS.map((fabric) => {
            const activeColorIdx = selectedColors[fabric.id] ?? 0;
            const activeColor = fabric.colors[activeColorIdx];

            return (
              <div 
                key={fabric.id}
                className={`relative rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-500 group ${
                  fabric.id === 'heavy-duty-ripstop-canvas'
                    ? 'bg-gradient-to-b from-[#18181f] via-[#121217] to-[#0d0d10] border-2 border-orange-500/50 shadow-[0_15px_40px_rgba(249,115,22,0.15)] hover:border-orange-500'
                    : 'bg-[#121216] border border-white/10 hover:border-white/30 shadow-xl hover:shadow-2xl'
                }`}
              >
                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className={`text-[10px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg ${fabric.badgeColor}`}>
                    {fabric.categoryBadge}
                  </span>
                </div>

                {/* Tactile Weave Simulation Header (Vector-Crafted, No Photos) */}
                <div className="relative p-6 sm:p-7 border-b border-white/10 overflow-hidden bg-black/50">
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    {fabric.tactileType === 'ripstop' && (
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="ripstop-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
                            <path d="M 0 16 L 16 0 M 0 0 L 16 16" fill="none" stroke="#f97316" strokeWidth="0.75" />
                            <rect width="16" height="16" fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="4,4" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#ripstop-pattern)" />
                      </svg>
                    )}
                    {fabric.tactileType === 'leatherette' && (
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="leather-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
                            <circle cx="12" cy="12" r="7" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                            <path d="M 4 20 Q 12 12 20 4" fill="none" stroke="#d4af37" strokeWidth="0.75" strokeDasharray="3,3" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#leather-pattern)" />
                      </svg>
                    )}
                    {fabric.tactileType === 'polyester' && (
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="poly-pattern" width="12" height="12" patternUnits="userSpaceOnUse">
                            <line x1="0" y1="6" x2="12" y2="6" stroke="#94a3b8" strokeWidth="0.5" />
                            <line x1="6" y1="0" x2="6" y2="12" stroke="#94a3b8" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#poly-pattern)" />
                      </svg>
                    )}
                  </div>

                  <div className="relative z-10 space-y-1">
                    <div className="text-[11px] font-mono uppercase tracking-widest font-bold text-orange-400">
                      {fabric.gsm}
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                      {fabric.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      {fabric.subtitle}
                    </p>
                  </div>

                  {/* Interactive Swatch Palette Selector */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-400">Color Tone:</span>
                    <div className="flex items-center space-x-2">
                      {fabric.colors.map((col, cIdx) => (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColors(prev => ({ ...prev, [fabric.id]: cIdx }))}
                          title={col.name}
                          style={{ backgroundColor: col.hex }}
                          className={`w-6 h-6 rounded-full border transition-all duration-300 cursor-pointer ${
                            activeColorIdx === cIdx 
                              ? 'ring-2 ring-orange-500 scale-110 border-white shadow-lg' 
                              : 'border-white/20 opacity-80 hover:opacity-100 hover:scale-105'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-orange-300 text-right mt-1">
                    Active: {activeColor.name}
                  </div>
                </div>

                {/* Card Body & Tech Matrix */}
                <div className="p-6 sm:p-7 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {fabric.description}
                    </p>

                    {/* Incredible Connection Tech Performance Spec Indicators */}
                    <div className="bg-black/60 border border-white/10 rounded-2xl p-4 space-y-3 font-mono text-[11px] shadow-inner">
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-zinc-400 flex items-center gap-1.5">
                          <Droplets className="w-3.5 h-3.5 text-blue-400" /> Waterproof:
                        </span>
                        <span className="text-white font-bold">{fabric.waterproofRating}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-zinc-400 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400" /> Durability:
                        </span>
                        <span className="text-white font-bold">{fabric.abrasionRating}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="text-zinc-400 flex items-center gap-1.5">
                          <Sun className="w-3.5 h-3.5 text-orange-400" /> UV Shield:
                        </span>
                        <span className="text-white font-bold">{fabric.uvRating}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Cleaning Care:
                        </span>
                        <span className="text-emerald-400 font-bold">{fabric.cleanTime}</span>
                      </div>
                    </div>

                    {/* Bullet List */}
                    <div className="space-y-2 text-xs text-zinc-300">
                      {fabric.bulletPoints.map((bp, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{bp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-zinc-400 block">Single Row Front Set</span>
                        <span className="text-2xl font-black font-mono text-white tracking-tight">{fabric.priceFront}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-mono text-zinc-400 block">Full Vehicle Set</span>
                        <span className="text-sm font-bold font-mono text-orange-400">{fabric.priceFull}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectMaterial(fabric.id)}
                      className={`w-full py-3.5 px-5 rounded-2xl font-heading font-black uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg group ${
                        fabric.id === 'heavy-duty-ripstop-canvas'
                          ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:brightness-110 text-white shadow-orange-500/20'
                          : 'bg-white hover:bg-zinc-200 text-black'
                      }`}
                    >
                      <span>SELECT THIS FABRIC SPEC</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Incredible Connection Style: Expandable Tech Comparison Table */}
        <div className="bg-[#101014] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
          <button
            onClick={() => setIsCompareOpen(!isCompareOpen)}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-white/5 transition cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <Cpu className="w-5 h-5 text-orange-400 shrink-0" />
              <div>
                <h4 className="font-heading text-base sm:text-lg font-bold text-white uppercase">
                  Compare Fabric Technical Specifications Side-By-Side
                </h4>
                <p className="text-xs text-zinc-400">
                  Comprehensive performance ratings for waterproofing, abrasion, pets, UV, and washing
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-orange-400 text-xs font-mono font-bold shrink-0">
              <span className="hidden sm:inline">{isCompareOpen ? 'COLLAPSE' : 'EXPAND SPEC MATRIX'}</span>
              {isCompareOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          {isCompareOpen && (
            <div className="p-5 sm:p-6 border-t border-white/10 bg-black/40 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono text-zinc-300 min-w-[620px]">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-400">
                    <th className="py-3 px-3">Performance Metric</th>
                    <th className="py-3 px-3 text-orange-400 font-bold">510g Ripstop Canvas</th>
                    <th className="py-3 px-3 text-amber-300 font-bold">Rhino Leatherette</th>
                    <th className="py-3 px-3 text-white font-bold">600D Ballistic Poly</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-2.5 px-3 text-zinc-400">Primary Intended Use</td>
                    <td className="py-2.5 px-3 text-white">4x4, Bakkies, Farms, Overlanding</td>
                    <td className="py-2.5 px-3 text-white">Luxury SUVs, Families, Executive Cars</td>
                    <td className="py-2.5 px-3 text-white">Fleets, Tradesmen, Daily Commuters</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-zinc-400">Fabric Density / Weight</td>
                    <td className="py-2.5 px-3 text-white font-bold">510 GSM Heavy-Duty Cotton-Poly</td>
                    <td className="py-2.5 px-3 text-white font-bold">650 GSM Multi-Laminate</td>
                    <td className="py-2.5 px-3 text-white font-bold">420 GSM Ballistic Weave</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-zinc-400">Water & Liquid Defense</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">100% Impermeable (12,000mm)</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">100% Solid Non-Porous</td>
                    <td className="py-2.5 px-3 text-yellow-400 font-bold">Water-Repellent DWR</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-zinc-400">Dog Claws & Active Pets</td>
                    <td className="py-2.5 px-3 text-white">Virtually Indestructible</td>
                    <td className="py-2.5 px-3 text-white">Hair Slides Off, Resists Punctures</td>
                    <td className="py-2.5 px-3 text-white">Tough Synthetic Scratch Resistance</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-zinc-400">Airbag Breakaway Seams</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">Certified SABS Breakaway</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">Certified SABS Breakaway</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">Certified SABS Breakaway</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-zinc-400">Cleaning Method</td>
                    <td className="py-2.5 px-3 text-white">Pressure sponge / brush rinse</td>
                    <td className="py-2.5 px-3 text-white">Instant 5-sec damp cloth wipe</td>
                    <td className="py-2.5 px-3 text-white">Machine wash gentle or sponge</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-zinc-400">South African Sun UV Rating</td>
                    <td className="py-2.5 px-3 text-white">UPF 50+ Anti-Fade Pigments</td>
                    <td className="py-2.5 px-3 text-white">Thermal UV Non-Crack Seal</td>
                    <td className="py-2.5 px-3 text-white">UV Inhibitor Coating</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Free Swatch Pack Banner (Apple/LV Luxury Touch) */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#141418] via-black to-[#141418] border border-white/10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center space-x-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white font-heading uppercase tracking-tight">
                Want to touch and feel our authentic fabrics first?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                We courier complimentary physical sample swatches directly to your door across all 9 provinces.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenSwatches}
            className="py-3 px-6 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-heading font-black uppercase tracking-wider transition shrink-0 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
          >
            Request Free Fabric Swatches
          </button>
        </div>

      </div>
    </section>
  );
};

