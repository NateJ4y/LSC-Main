import React, { useState } from 'react';
import { 
  Palette, 
  Sparkles, 
  Scissors, 
  Layers, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Sliders,
  Type,
  Maximize2
} from 'lucide-react';

interface CustomisationShowcaseProps {
  onStartQuote: () => void;
  onOpenCustomizer: () => void;
}

export const CustomisationShowcase: React.FC<CustomisationShowcaseProps> = ({
  onStartQuote,
  onOpenCustomizer
}) => {
  const [selectedStitch, setSelectedStitch] = useState({ name: 'GT Golden Stitch', color: '#d4af37' });
  const [selectedEmbroidery, setSelectedEmbroidery] = useState('HILUX 4X4');
  const [activeTab, setActiveTab] = useState<'stitching' | 'embroidery' | 'pockets' | 'twotone'>('stitching');

  const stitchColors = [
    { name: 'GT Golden Stitch', color: '#d4af37' },
    { name: 'Rally Red', color: '#ef4444' },
    { name: 'Kalahari Orange', color: '#f97316' },
    { name: 'Expedition Blue', color: '#3b82f6' },
    { name: 'Titanium Silver', color: '#e4e4e7' },
    { name: 'Stealth Black', color: '#18181b' }
  ];

  const embroideryPresets = [
    'HILUX 4X4',
    'RANGER WILDTRAK',
    'CRUISER 79',
    'JIMNY 4X4',
    'FARM WORKHORSE',
    'SECURITY UNIT 01'
  ];

  return (
    <section id="customisation-options" className="w-full bg-[#0c0c0e] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest bg-[#141418] border border-orange-500/20 px-3 py-1 rounded-md font-mono">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>BESPOKE SOUTH AFRICAN CRAFTSMANSHIP</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            THIS ISN'T A UNIVERSAL COVER. <br />
            <span className="text-white border-b-2 border-orange-500 pb-1">IT IS BUILT AROUND YOU</span>.
          </h2>
          <p className="text-xs sm:text-sm text-[#8C9BA8] max-w-2xl mx-auto leading-relaxed">
            Every set is individually cut and sewn to your exact vehicle model and personal styling preferences. From high-tensile contrast stitching to commercial fleet embroidery and custom console armrest protectors.
          </p>
        </div>

        {/* Feature Interactive Bento Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Interactive Customisation Features Tabs (7 Cols) */}
          <div className="lg:col-span-7 bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
              <button
                onClick={() => setActiveTab('stitching')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center space-x-1.5 ${
                  activeTab === 'stitching'
                    ? 'bg-white text-black shadow'
                    : 'bg-black/50 text-[#8C9BA8] hover:text-white border border-white/5'
                }`}
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Contrast Stitching</span>
              </button>

              <button
                onClick={() => setActiveTab('embroidery')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center space-x-1.5 ${
                  activeTab === 'embroidery'
                    ? 'bg-white text-black shadow'
                    : 'bg-black/50 text-[#8C9BA8] hover:text-white border border-white/5'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Custom Embroidery</span>
              </button>

              <button
                onClick={() => setActiveTab('twotone')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center space-x-1.5 ${
                  activeTab === 'twotone'
                    ? 'bg-white text-black shadow'
                    : 'bg-black/50 text-[#8C9BA8] hover:text-white border border-white/5'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Two-Tone Colors</span>
              </button>

              <button
                onClick={() => setActiveTab('pockets')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center space-x-1.5 ${
                  activeTab === 'pockets'
                    ? 'bg-white text-black shadow'
                    : 'bg-black/50 text-[#8C9BA8] hover:text-white border border-white/5'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Pockets & Consoles</span>
              </button>
            </div>

            {/* Tab 1: Contrast Stitching */}
            {activeTab === 'stitching' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="font-heading text-xl font-bold uppercase text-white">
                    High-Tensile UV-Bonded Nylon Stitching
                  </h3>
                  <p className="text-xs text-[#8C9BA8]">
                    We use German-engineered industrial UV nylon thread that resists rot from sweat, heat, and direct African sunlight. Choose your accent thread:
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  {stitchColors.map((st, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedStitch(st)}
                      className={`p-3 rounded-xl border text-left flex items-center space-x-3 transition cursor-pointer ${
                        selectedStitch.name === st.name
                          ? 'bg-black border-orange-500 ring-1 ring-orange-500 text-white'
                          : 'bg-[#0c0c0e] border-white/10 hover:border-white/20 text-zinc-300'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/30 shrink-0"
                        style={{ backgroundColor: st.color }}
                      />
                      <span className="text-xs font-bold">{st.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Custom Embroidery */}
            {activeTab === 'embroidery' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="font-heading text-xl font-bold uppercase text-white">
                    Computerized Commercial Headrest & Backrest Embroidery
                  </h3>
                  <p className="text-xs text-[#8C9BA8]">
                    Add your vehicle model, farm name, expedition moniker, or corporate fleet logo stitched directly into the front seat headrests or upper backrests.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-zinc-300 uppercase">Test Custom Embroidery Text:</label>
                  <input
                    type="text"
                    value={selectedEmbroidery}
                    onChange={(e) => setSelectedEmbroidery(e.target.value.toUpperCase())}
                    placeholder="E.G. HILUX 4X4 OR FLEET UNIT 12"
                    className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2.5 text-sm font-mono font-bold text-white focus:outline-none"
                    maxLength={20}
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {embroideryPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedEmbroidery(preset)}
                      className="text-[10px] font-mono font-bold bg-black/60 hover:bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-lg border border-white/5 cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Two Tone */}
            {activeTab === 'twotone' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="font-heading text-xl font-bold uppercase text-white">
                    Two-Tone Contrast Inserts
                  </h3>
                  <p className="text-xs text-[#8C9BA8]">
                    Pair dark charcoal outer bolsters with desert sand or warm brown center inserts for a premium overland aesthetic that stays cool in summer.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-[#0c0c0e] border border-white/10 rounded-xl space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-[#2b2d30] border border-white/20" />
                      <div className="w-4 h-4 rounded bg-[#8a7968] border border-white/20" />
                      <span className="text-xs font-bold text-white">Charcoal & Kalahari Sand</span>
                    </div>
                    <p className="text-[11px] text-[#8C9BA8]">Most popular for Toyota Hilux, Land Cruiser 79, and Next-Gen Ranger.</p>
                  </div>

                  <div className="p-3.5 bg-[#0c0c0e] border border-white/10 rounded-xl space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded bg-[#18181b] border border-white/20" />
                      <div className="w-4 h-4 rounded bg-[#3b423b] border border-white/20" />
                      <span className="text-xs font-bold text-white">Stealth Black & Bush Olive</span>
                    </div>
                    <p className="text-[11px] text-[#8C9BA8]">Selected by safari game reserves, hunting operators, and overland rigs.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Pockets & Consoles */}
            {activeTab === 'pockets' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="font-heading text-xl font-bold uppercase text-white">
                    Rear Map Pockets & Padded Center Consoles
                  </h3>
                  <p className="text-xs text-[#8C9BA8]">
                    Expand your vehicle’s utility with heavy-duty elasticized rear backrest map pockets and tailored armrest console covers that prevent elbow sweat discoloration.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-[#0c0c0e] border border-white/10 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-white uppercase">Deep Rear Backrest Pockets</span>
                    <p className="text-[11px] text-[#8C9BA8]">Perfect for tablets, maps, guidebooks, and tire deflator gauges.</p>
                  </div>
                  <div className="p-3.5 bg-[#0c0c0e] border border-white/10 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-white uppercase">Center Armrest Lid Cover</span>
                    <p className="text-[11px] text-[#8C9BA8]">Protects the high-contact center console lid from cracking and dirt.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={onOpenCustomizer}
                className="py-3 px-6 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase text-xs tracking-wider transition shadow cursor-pointer flex items-center space-x-2"
              >
                <span>Launch Interactive Studio</span>
                <Sliders className="w-4 h-4 text-orange-600" />
              </button>

              <button
                onClick={onStartQuote}
                className="py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold uppercase text-xs tracking-wider transition border border-white/10 cursor-pointer"
              >
                Start Your Quote
              </button>
            </div>
          </div>

          {/* Right Column: Visual Summary Preview Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#8C9BA8] uppercase">LIVE PREVIEW SPEC</span>
                <h4 className="font-heading text-lg font-bold uppercase text-white">CUSTOM CRAFT SUMMARY</h4>
              </div>
              <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
            </div>

            {/* Visual Swatch Box */}
            <div className="p-5 rounded-2xl bg-[#0c0c0e] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">Thread Accent:</span>
                <div className="flex items-center space-x-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/30"
                    style={{ backgroundColor: selectedStitch.color }}
                  />
                  <span className="text-xs font-bold text-white font-mono">{selectedStitch.name}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-xs font-mono text-zinc-400">Headrest Stitch:</span>
                <span className="text-xs font-bold text-orange-400 font-mono tracking-widest bg-orange-950/40 px-2 py-0.5 rounded border border-orange-500/20">
                  {selectedEmbroidery || 'NONE'}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-xs font-mono text-zinc-400">Airbag Release:</span>
                <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Certified Safe
                </span>
              </div>
            </div>

            <div className="p-4 bg-black/40 border border-white/5 rounded-xl space-y-2 text-xs text-zinc-300">
              <div className="font-bold text-white uppercase text-[11px] font-mono">Guaranteed 100% Fitment:</div>
              <p className="text-[11px] text-[#8C9BA8] leading-relaxed">
                Because we hand-cut and sew each order individually in Polokwane, you can specify custom pocket locations, contrasting piping, and exact seat configuration notes in your quote request.
              </p>
            </div>

            <button
              onClick={onStartQuote}
              className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase text-xs tracking-wider transition shadow text-center cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Request Quote With These Options</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
