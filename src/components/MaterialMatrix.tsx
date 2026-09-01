import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Droplets, 
  Sun, 
  Sparkles, 
  Dog, 
  Wind, 
  Award, 
  Check, 
  HelpCircle, 
  ArrowRight,
  Layers
} from 'lucide-react';
import { MATERIALS_DATA } from '../data/materialsData';
import { MaterialSpec } from '../types';

interface MaterialMatrixProps {
  onSelectMaterial: (materialId: string) => void;
  onOpenSwatches: () => void;
}

export const MaterialMatrix: React.FC<MaterialMatrixProps> = ({
  onSelectMaterial,
  onOpenSwatches
}) => {
  // Fabric Quiz State
  const [quizUse, setQuizUse] = useState<string>('overland');
  const [quizPets, setQuizPets] = useState<string>('yes');
  const [quizFeel, setQuizFeel] = useState<string>('canvas');
  const [recommendedId, setRecommendedId] = useState<string>('heavy-duty-ripstop-canvas');

  const handleCalculateRecommendation = (use: string, pets: string, feel: string) => {
    setQuizUse(use);
    setQuizPets(pets);
    setQuizFeel(feel);

    if (feel === 'leather') {
      setRecommendedId('rhino-hide-leatherette');
    } else if (feel === 'neoprene' || use === 'surfing') {
      setRecommendedId('genuine-neoprene-waterproof');
    } else if (feel === 'mesh' || use === 'commute') {
      setRecommendedId('cool-breathe-3d-spacer');
    } else if (use === 'overland' && feel === 'tactical') {
      setRecommendedId('tactical-molle-expedition');
    } else if (use === 'fleet') {
      setRecommendedId('heavy-poly-cotton-twill');
    } else {
      setRecommendedId('heavy-duty-ripstop-canvas');
    }
  };

  const recMaterial = MATERIALS_DATA.find((m) => m.id === recommendedId) || MATERIALS_DATA[0];

  return (
    <section id="fabric-matrix" className="w-full bg-[#0c0c0e] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-[#8C9BA8] uppercase tracking-widest bg-[#141418] border border-white/10 px-3 py-1 rounded-md font-mono">
            <Layers className="w-3.5 h-3.5 text-orange-500" />
            <span>FABRIC ENGINEERING LAB</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            COMPARE OUR <span className="text-white border-b-2 border-orange-500 pb-0.5">SOUTH AFRICAN</span> FABRICS
          </h2>
          <p className="text-[#8C9BA8] text-sm sm:text-base">
            Every material is laser cut to 1:1 original factory CAD seat specs and rigorously tested against South Africa's intense UV index, thornveld abrasions, and mud.
          </p>
        </div>

        {/* Interactive Material Finder Quiz Bento Card */}
        <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8">
            <div className="space-y-4 w-full lg:w-7/12 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-[#8C9BA8] uppercase tracking-wider font-mono">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span>3-STEP FABRIC ADVISOR QUIZ</span>
                </div>
                <h3 className="font-heading text-2xl font-black uppercase text-white mt-1">
                  NOT SURE WHICH FABRIC SUITS YOUR LIFESTYLE?
                </h3>
              </div>

              <div className="space-y-3 pt-2">
                {/* Q1: Primary Use */}
                <div>
                  <label className="text-xs font-bold text-[#8C9BA8] uppercase block mb-1.5 font-mono">
                    1. Primary Vehicle Usage:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'overland', label: '🏕️ 4x4 / Overland' },
                      { id: 'farm', label: '🚜 Farm / Mining' },
                      { id: 'family', label: '👨‍👩‍👧 Family & Kids' },
                      { id: 'surfing', label: '🏄 Coastal Surfing' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleCalculateRecommendation(opt.id, quizPets, quizFeel)}
                        className={`p-2 rounded-xl font-semibold border text-center transition cursor-pointer ${
                          quizUse === opt.id
                            ? 'bg-white text-black border-white shadow-md'
                            : 'bg-[#0c0c0e] text-zinc-300 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q2: Pets */}
                <div>
                  <label className="text-xs font-bold text-[#8C9BA8] uppercase block mb-1.5 font-mono">
                    2. Dogs or Boerboels in vehicle?
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      { id: 'yes', label: '🐕 Yes, Heavy Dogs' },
                      { id: 'occasional', label: '🐾 Small / Rare' },
                      { id: 'no', label: '🚫 No Pets' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleCalculateRecommendation(quizUse, opt.id, quizFeel)}
                        className={`p-2 rounded-xl font-semibold border text-center transition cursor-pointer ${
                          quizPets === opt.id
                            ? 'bg-white text-black border-white shadow-md'
                            : 'bg-[#0c0c0e] text-zinc-300 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q3: Feel & Texture */}
                <div>
                  <label className="text-xs font-bold text-[#8C9BA8] uppercase block mb-1.5 font-mono">
                    3. Preferred Look & Feel:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'canvas', label: '🛡️ Tough Canvas' },
                      { id: 'leather', label: '✨ Luxury Leather' },
                      { id: 'neoprene', label: '🤿 Wetsuit Foam' },
                      { id: 'mesh', label: '💨 High Airflow' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleCalculateRecommendation(quizUse, quizPets, opt.id)}
                        className={`p-2 rounded-xl font-semibold border text-center transition cursor-pointer ${
                          quizFeel === opt.id
                            ? 'bg-white text-black border-white shadow-md'
                            : 'bg-[#0c0c0e] text-zinc-300 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Recommendation Result Box */}
            <div className="w-full lg:w-5/12 bg-[#0c0c0e] border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-[#8C9BA8] uppercase tracking-widest font-mono">
                  MATCH RESULT FOR YOUR PROFILE:
                </div>
                <h4 className="font-heading text-2xl font-black uppercase text-white mt-1">
                  {recMaterial.name}
                </h4>
                <p className="text-xs text-white font-medium mt-0.5">{recMaterial.tagline}</p>
                <p className="text-xs text-[#8C9BA8] mt-2 leading-relaxed">
                  {recMaterial.description}
                </p>

                {/* Mini Ratings */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-semibold text-zinc-300 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-blue-400" />
                    <span>Waterproof: {recMaterial.waterproofRating}/10</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>UV Guard: {recMaterial.uvResistanceRating}/10</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Dog className="w-3.5 h-3.5 text-orange-400" />
                    <span>Pet Proof: {recMaterial.petProofRating}/10</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Warranty: {recMaterial.warrantyYears} Years</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] text-[#8C9BA8] font-mono">FROM</div>
                  <div className="font-mono font-bold text-white text-lg">
                    R{recMaterial.basePriceZAR.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => onSelectMaterial(recMaterial.id)}
                  className="py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-black uppercase text-xs tracking-wider flex items-center space-x-1.5 shadow transition cursor-pointer"
                >
                  <span>CONFIGURE THIS FABRIC</span>
                  <ArrowRight className="w-4 h-4 text-orange-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Side-by-Side Comparison Table */}
        <div className="bg-[#141418] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-2xl font-black uppercase text-white">
                TECHNICAL SPECIFICATIONS MATRIX
              </h3>
              <p className="text-xs text-[#8C9BA8]">
                Independent laboratory metrics for heavy African climate exposure.
              </p>
            </div>
            <button
              onClick={onOpenSwatches}
              className="text-xs font-bold text-white bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl hover:bg-white/10 transition flex items-center space-x-1.5 cursor-pointer font-mono"
            >
              <Layers className="w-3.5 h-3.5 text-orange-500" />
              <span>Get Free Physical Swatches</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0c0c0e] text-[#8C9BA8] text-xs uppercase font-bold border-b border-white/10 font-mono">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Material</th>
                  <th className="py-4 px-3 text-center">Waterproof</th>
                  <th className="py-4 px-3 text-center">UV Guard</th>
                  <th className="py-4 px-3 text-center">Tear Abrasion</th>
                  <th className="py-4 px-3 text-center">Pet Claw Proof</th>
                  <th className="py-4 px-3 text-center">Cleaning</th>
                  <th className="py-4 px-3 text-center">Warranty</th>
                  <th className="py-4 px-4 text-right">Price (Full Set)</th>
                  <th className="py-4 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y border-white/5 text-zinc-200">
                {MATERIALS_DATA.map((mat) => (
                  <tr key={mat.id} className="hover:bg-white/5 transition">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-white text-sm sm:text-base font-heading uppercase">
                        {mat.name}
                      </div>
                      <div className="text-[11px] text-[#8C9BA8] font-medium line-clamp-1">
                        {mat.tagline}
                      </div>
                    </td>

                    <td className="py-4 px-3 text-center">
                      <span className="font-mono font-bold text-blue-400">{mat.waterproofRating}/10</span>
                    </td>

                    <td className="py-4 px-3 text-center">
                      <span className="font-mono font-bold text-amber-400">{mat.uvResistanceRating}/10</span>
                    </td>

                    <td className="py-4 px-3 text-center">
                      <span className="font-mono font-bold text-zinc-200">{mat.abrasionRating}/10</span>
                    </td>

                    <td className="py-4 px-3 text-center">
                      <span className="font-mono font-bold text-orange-400">{mat.petProofRating}/10</span>
                    </td>

                    <td className="py-4 px-3 text-center text-xs font-semibold text-zinc-300">
                      {mat.cleaningEase}
                    </td>

                    <td className="py-4 px-3 text-center font-bold text-emerald-400 font-mono">
                      {mat.warrantyYears} Years
                    </td>

                    <td className="py-4 px-4 text-right font-mono font-bold text-white text-sm sm:text-base">
                      R{mat.basePriceZAR.toLocaleString()}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => onSelectMaterial(mat.id)}
                        className="py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white hover:text-black text-white font-bold text-xs transition uppercase cursor-pointer border border-white/10 font-mono"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
