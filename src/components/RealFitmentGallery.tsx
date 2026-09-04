import React, { useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  Maximize2, 
  X, 
  MessageCircle, 
  Calculator, 
  Filter, 
  Search, 
  ShieldCheck,
  FolderUp
} from 'lucide-react';
import { WORKSHOP_PHOTOS, WorkshopPhoto } from '../data/workshopImages';
import { AssetImage } from './AssetImage';
import { AssetUploaderModal } from './AssetUploaderModal';

interface RealFitmentGalleryProps {
  onStartQuote?: (vehicleName?: string) => void;
}

export const RealFitmentGallery: React.FC<RealFitmentGalleryProps> = ({ onStartQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<WorkshopPhoto | null>(null);
  const [isUploaderOpen, setIsUploaderOpen] = useState<boolean>(false);

  const categories = [
    { key: 'all', label: `All Workshop Photos (${WORKSHOP_PHOTOS.length})` },
    { key: 'bakkies', label: '4x4 Bakkies & Cruisers' },
    { key: 'suv', label: 'SUVs & Wranglers' },
    { key: 'fleet', label: 'Commercial & Corporate Logos' },
    { key: 'diamond', label: 'Diamond Quilted' },
    { key: 'interior', label: 'Cabin & Interior Views' }
  ];

  const filteredItems = WORKSHOP_PHOTOS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.stitchStyle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.embroidery.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="gallery" className="py-20 bg-[#0c0c0e] border-b border-white/10 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-zinc-700/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest bg-[#141418] border border-orange-500/20 px-3 py-1 rounded-md font-mono">
              <Camera className="w-3.5 h-3.5 text-orange-500" />
              <span>AUTHENTIC WORKSHOP PHOTOGRAPHY • {WORKSHOP_PHOTOS.length} VEHICLE FITMENTS</span>
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              GENUINE SOUTH AFRICAN FITMENTS. <br />
              <span className="text-white border-b-2 border-orange-500 pb-1">UNEDITED ORIGINAL CRAFTSMANSHIP</span>
            </h2>

            <p className="text-sm text-[#8C9BA8] max-w-2xl leading-relaxed">
              Every photograph shown here is an unmodified capture from our Vereeniging workshop floor. 
              Review real embroidery badges, high-tensile stitching, and tight custom anchoring across South Africa’s favorite 4x4s, SUVs, and commercial fleets.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsUploaderOpen(true)}
              className="py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 text-xs font-mono font-bold transition flex items-center gap-2"
              title="Manage and drop authentic image assets"
            >
              <FolderUp className="w-4 h-4 text-orange-400" />
              <span>Original Asset Manager</span>
            </button>
            <div className="bg-[#141418] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-left font-mono">
                <div className="text-xs text-zinc-400">Airbag Certification</div>
                <div className="text-sm font-bold text-white">SABS Compliant Seams</div>
                <div className="text-[10px] text-emerald-400">ISO 9001 Threading</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#141418] border border-white/10 p-3 sm:p-4 rounded-2xl">
          {/* Category Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-zinc-500 ml-1 mr-1 shrink-0 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition cursor-pointer shrink-0 ${
                  selectedCategory === cat.key
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-white/5 text-[#8C9BA8] hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vehicle or embroidery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid: 21 Authentic Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#141418] border border-white/10 hover:border-orange-500/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              {/* Image Container - Strictly fits/contains to element box, click to enlarge */}
              <div 
                onClick={() => setActiveModalItem(item)}
                className="relative aspect-[4/3] bg-[#0c0c0e] overflow-hidden flex items-center justify-center p-2 sm:p-3 cursor-pointer"
              >
                <AssetImage
                  filename={item.rawFilename}
                  alt={item.title}
                  fit="contain"
                  className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

                {/* Vehicle Badge */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-white/15 text-orange-400 font-mono text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider z-10">
                  {item.vehicle.split('(')[0]}
                </div>

                {/* Zoom Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveModalItem(item);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/70 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-500 hover:text-black cursor-pointer shadow-lg z-10"
                  title="Inspect High Resolution Photo"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Embroidery Tag on Image */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <div className="inline-flex items-center space-x-1.5 bg-black/90 backdrop-blur-md border border-orange-500/30 text-white px-2.5 py-1 rounded-lg text-[11px] font-mono">
                    <Sparkles className="w-3 h-3 text-orange-400 shrink-0" />
                    <span className="truncate">{item.embroidery}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold text-white uppercase tracking-tight group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#8C9BA8] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Technical Specifications Matrix */}
                <div className="bg-black/40 border border-white/5 rounded-2xl p-3.5 space-y-2 text-[11px] font-mono">
                  <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                    <span className="text-zinc-500">Material Spec:</span>
                    <span className="text-zinc-300 font-bold truncate max-w-[170px]">{item.material.split('+')[0]}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                    <span className="text-zinc-500">Stitch Style:</span>
                    <span className="text-zinc-300 font-bold truncate max-w-[170px]">{item.stitchStyle}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Source Photo:</span>
                    <span className="text-orange-400 font-bold truncate max-w-[170px]">{item.rawFilename}</span>
                  </div>
                </div>

                {/* Key Highlight Badges */}
                <div className="flex flex-wrap gap-1">
                  {item.highlights.slice(0, 2).map((hl, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-white/5 border border-white/10 text-zinc-300 px-2 py-0.5 rounded-md"
                    >
                      • {hl}
                    </span>
                  ))}
                </div>

                {/* Card Action Row */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onStartQuote?.(item.vehicle)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-white text-black hover:bg-zinc-200 font-heading font-black uppercase text-[11px] tracking-wider transition cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <Calculator className="w-3.5 h-3.5 text-orange-600" />
                    <span>Quote This Fitment</span>
                  </button>

                  <a
                    href={`https://wa.me/27725916960?text=${encodeURIComponent(
                      `Hello, I would like more information and a quote for the ${item.title} fitment (Photo: ${item.rawFilename}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/30 transition"
                    title="Inquire via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-[#141418] border border-white/10 rounded-3xl space-y-4">
            <Camera className="w-10 h-10 text-zinc-600 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white uppercase font-heading">No Matching Workshop Photos Found</h3>
              <p className="text-xs text-zinc-400">Try adjusting your category filter or search keywords.</p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="py-2 px-4 rounded-xl bg-orange-500 text-white text-xs font-bold uppercase transition hover:bg-orange-600"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Modal: Full Resolution View */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <div className="relative max-w-6xl w-full bg-[#121216] border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#18181e] border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">
                  AUTHENTIC CLIENT WORKSHOP ASSET • {activeModalItem.rawFilename}
                </span>
                <h4 className="text-lg sm:text-xl font-black uppercase text-white font-heading">
                  {activeModalItem.title}
                </h4>
              </div>

              <button
                onClick={() => setActiveModalItem(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 text-white transition flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Image & Spec Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Photo Display - Strictly fits/contains to preview box */}
              <div className="lg:col-span-8 bg-black p-3 sm:p-6 flex items-center justify-center min-h-[320px] sm:min-h-[480px] max-h-[75vh] overflow-hidden">
                <AssetImage
                  filename={activeModalItem.rawFilename}
                  alt={activeModalItem.title}
                  fit="contain"
                  className="max-h-[70vh] max-w-full w-auto h-auto rounded-xl shadow-2xl"
                />
              </div>

              {/* Specifications Sidebar */}
              <div className="lg:col-span-4 p-6 sm:p-8 bg-[#16161c] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Vehicle Target</div>
                    <div className="text-sm font-bold text-white font-mono mt-0.5">{activeModalItem.vehicle}</div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Embroidery & Customization</div>
                    <div className="text-xs text-orange-400 font-bold mt-0.5 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>{activeModalItem.embroidery}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Material & Threading</div>
                    <div className="text-xs text-zinc-200 mt-0.5">{activeModalItem.material}</div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Stitch Technique</div>
                    <div className="text-xs text-zinc-200 mt-0.5">{activeModalItem.stitchStyle}</div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Workshop Highlights</div>
                    <div className="space-y-1 mt-1">
                      {activeModalItem.highlights.map((h, i) => (
                        <div key={i} className="text-xs text-zinc-300 flex items-start space-x-1.5">
                          <span className="text-orange-500 font-bold">✓</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed border-t border-white/10 pt-3">
                    {activeModalItem.description}
                  </p>
                </div>

                {/* Modal Action Buttons */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      const veh = activeModalItem.vehicle;
                      setActiveModalItem(null);
                      onStartQuote?.(veh);
                    }}
                    className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-heading font-black uppercase text-xs tracking-wider transition shadow-lg cursor-pointer"
                  >
                    Configure My {activeModalItem.vehicle.split('(')[0]}
                  </button>

                  <a
                    href={`https://wa.me/27725916960?text=${encodeURIComponent(
                      `Hi Lifestyle Seat Covers, I am looking at the genuine workshop photo of ${activeModalItem.title} (${activeModalItem.rawFilename}). Can you give me pricing and lead time?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold uppercase text-xs tracking-wider transition flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Direct Workshop</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Asset Uploader Modal */}
      <AssetUploaderModal
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
      />
    </section>
  );
};
