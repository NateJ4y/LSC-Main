import React, { useState } from 'react';
import { SA_REVIEWS } from '../data/productsData';
import { Star, ShieldCheck, ThumbsUp, MessageSquare, MapPin } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All SA Reviews (450+)' },
    { id: 'Overlanding & 4x4', label: '🏕️ 4x4 & Overlanding' },
    { id: 'Farm & Heavy Duty', label: '🚜 Farm & Heavy Duty' },
    { id: 'Family & Kids', label: '👨‍👩‍👦 Family SUVs' },
    { id: 'Surfing / Coastal', label: '🏄 Coastal & Water Sports' }
  ];

  const filteredReviews =
    selectedFilter === 'all'
      ? SA_REVIEWS
      : SA_REVIEWS.filter((r) => r.usageType === selectedFilter);

  return (
    <section id="reviews" className="w-full bg-[#0c0c0e] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header Bento */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-[#8C9BA8] uppercase tracking-widest bg-[#141418] border border-white/10 px-3 py-1 rounded-md mb-2 font-mono">
              <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              <span>VERIFIED SOUTH AFRICAN OWNERS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              TESTED FROM THE KAROO TO THE KRUGER
            </h2>
            <p className="text-[#8C9BA8] text-xs sm:text-sm mt-1">
              Real feedback from farmers, overland expeditions, surfers, and families across South Africa.
            </p>
          </div>

          {/* Average Rating Block */}
          <div className="flex items-center space-x-4 bg-[#141418] border border-white/10 px-5 py-3 rounded-2xl shrink-0 self-start md:self-auto shadow-lg">
            <div className="text-3xl font-black font-heading text-white">4.96</div>
            <div>
              <div className="flex text-orange-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-500" />
                ))}
              </div>
              <div className="text-[11px] text-[#8C9BA8] font-semibold font-mono mt-0.5">
                Over 1,280+ 5-Star Reviews
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedFilter(opt.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                selectedFilter === opt.id
                  ? 'bg-white text-black shadow-md'
                  : 'bg-[#141418] text-[#8C9BA8] border border-white/10 hover:border-white/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#141418] border border-white/10 hover:border-white/30 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4 transition group"
            >
              <div className="space-y-3">
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-orange-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-500" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Fitment
                    </span>
                  )}
                </div>

                {/* Review Title & Content */}
                <h4 className="font-heading text-lg font-bold text-white uppercase">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Vehicle Specs */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-white">{rev.name}</div>
                  <div className="flex items-center text-[11px] text-[#8C9BA8] gap-1 font-mono">
                    <MapPin className="w-3 h-3 text-orange-500" />
                    {rev.location}
                  </div>
                </div>

                <div className="text-[11px] text-[#8C9BA8]">
                  <span className="text-white font-semibold">Vehicle:</span> {rev.vehicle}
                </div>
                <div className="text-[11px] text-[#8C9BA8]">
                  <span className="text-zinc-500">Fabric:</span> {rev.material}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
