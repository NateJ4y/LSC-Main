import React, { useState, useRef, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Layers
} from 'lucide-react';
import { WORKSHOP_PHOTOS, WorkshopPhoto } from '../data/workshopImages';
import { AssetImage } from './AssetImage';
import { getGalleryInquiryWhatsAppUrl } from '../utils/whatsappHelper';

interface RealFitmentGalleryProps {
  onStartQuote?: (vehicleName?: string) => void;
}

export const RealFitmentGallery: React.FC<RealFitmentGalleryProps> = ({ onStartQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<WorkshopPhoto | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  // Mobile single-card slideshow state
  const [mobileSlideIndex, setMobileSlideIndex] = useState<number>(0);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);

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

  // Desktop/Tablet displayed items: first 3 if not expanded, all if expanded
  const displayedItems = isExpanded ? filteredItems : filteredItems.slice(0, 3);

  // Reset mobile index when category changes
  useEffect(() => {
    setMobileSlideIndex(0);
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [selectedCategory, searchQuery]);

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const cardWidth = el.offsetWidth;
    if (cardWidth > 0) {
      const newIndex = Math.round(el.scrollLeft / cardWidth);
      if (newIndex !== mobileSlideIndex && newIndex >= 0 && newIndex < filteredItems.length) {
        setMobileSlideIndex(newIndex);
      }
    }
  };

  const scrollToMobileSlide = (index: number) => {
    const targetIdx = Math.max(0, Math.min(index, filteredItems.length - 1));
    setMobileSlideIndex(targetIdx);
    if (mobileScrollRef.current) {
      const cardWidth = mobileScrollRef.current.offsetWidth;
      mobileScrollRef.current.scrollTo({
        left: targetIdx * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-[#0c0c0e] border-b border-white/10 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-zinc-700/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex max-w-full items-center space-x-2 text-[10px] font-bold text-orange-400 uppercase tracking-[0.18em] sm:tracking-[0.25em] bg-black/60 border border-orange-500/20 px-3.5 py-1.5 rounded-full font-mono shadow-sm">
              <Camera className="w-3.5 h-3.5 shrink-0 text-orange-400" />
              <span className="min-w-0 truncate">AUTHENTIC WORKSHOP GALLERY • {WORKSHOP_PHOTOS.length} TAILORED FITMENTS</span>
            </div>
            
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              GENUINE VEHICLE FITMENTS. <br />
              <span className="text-white border-b-2 border-orange-500 pb-1">UNEDITED VEREENIGING CRAFTSMANSHIP</span>
            </h2>

            <p className="text-sm text-[#8C9BA8] max-w-2xl leading-relaxed">
              Every photograph shown here is an unmodified capture from our Vereeniging workshop floor. 
              Review real embroidery badges, high-tensile stitching, and tight custom anchoring across South Africa’s favorite 4x4s, SUVs, and commercial fleets.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#141418] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center space-x-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#141418] border border-white/10 p-3 sm:p-4 rounded-2xl shadow-lg">
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* MOBILE VIEW: Single Card View + Slideshow & Manual Horizontal Scroll */}
        <div className="block md:hidden">
          {filteredItems.length > 0 ? (
            <div className="space-y-4">
              {/* Mobile Slideshow Controls & Counter */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
                  <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2.5 py-0.5 rounded-full font-bold">
                    {mobileSlideIndex + 1} / {filteredItems.length}
                  </span>
                  <span>Swipe to browse</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => scrollToMobileSlide(mobileSlideIndex - 1)}
                    disabled={mobileSlideIndex === 0}
                    className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-orange-500 hover:text-black transition"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollToMobileSlide(mobileSlideIndex + 1)}
                    disabled={mobileSlideIndex >= filteredItems.length - 1}
                    className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-orange-500 hover:text-black transition"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Snap Container (Single Card Visible At A Time) */}
              <div
                ref={mobileScrollRef}
                onScroll={handleMobileScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4 gap-4"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {filteredItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="w-[calc(100vw-3rem)] max-w-full shrink-0 snap-center bg-[#141418] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
                  >
                    {/* Image Container */}
                    <div 
                      onClick={() => setActiveModalItem(item)}
                      className="relative aspect-[4/3] bg-[#0c0c0e] overflow-hidden flex items-center justify-center p-3 cursor-pointer"
                    >
                      <AssetImage
                        filename={item.rawFilename}
                        alt={item.title}
                        fit="contain"
                        className="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 pointer-events-none" />
                      
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-white/15 text-orange-400 font-mono text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider z-10">
                        {item.vehicle.split('(')[0]}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalItem(item);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/70 border border-white/20 text-white flex items-center justify-center cursor-pointer shadow-lg z-10"
                        title="Enlarge"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>

                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <div className="flex w-fit max-w-full min-w-0 items-center space-x-1.5 bg-black/90 backdrop-blur-md border border-orange-500/30 text-white px-2.5 py-1 rounded-lg text-[11px] font-mono">
                          <Sparkles className="w-3 h-3 text-orange-400 shrink-0" />
                          <span className="min-w-0 truncate">{item.embroidery}</span>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Card Details */}
                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <h3 className="font-heading text-lg font-bold text-white uppercase tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="bg-black/40 border border-white/5 rounded-2xl p-3 space-y-1.5 text-[11px] font-mono">
                        <div className="flex justify-between items-center border-b border-white/5 pb-1">
                          <span className="text-zinc-500">Material:</span>
                          <span className="max-w-[55%] truncate text-right font-bold text-zinc-300">{item.material.split('+')[0]}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-1">
                          <span className="text-zinc-500">Stitch Style:</span>
                          <span className="max-w-[55%] truncate text-right font-bold text-zinc-300">{item.stitchStyle}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-500">Origin:</span>
                          <span className="max-w-[60%] truncate text-right font-bold text-orange-400">Vereeniging Workshop</span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => onStartQuote?.(item.vehicle)}
                          className="flex-1 py-3 px-4 rounded-xl bg-white text-black hover:bg-zinc-200 font-heading font-black uppercase text-xs tracking-wider transition cursor-pointer flex items-center justify-center space-x-1.5 shadow-md"
                        >
                          <Calculator className="w-4 h-4 text-orange-600" />
                          <span>Quote This Fitment</span>
                        </button>
                        <a
                          href={getGalleryInquiryWhatsAppUrl(item.title, item.vehicle)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 transition"
                          title="WhatsApp Inquire"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Dots Indicator for Mobile */}
              <div className="flex justify-center items-center space-x-1.5 pt-2">
                {filteredItems.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => scrollToMobileSlide(dotIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      mobileSlideIndex === dotIdx 
                        ? 'w-6 bg-orange-500' 
                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* DESKTOP/TABLET VIEW: 3 Items Preview + Expandable Grid */}
        <div className="hidden md:block space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedItems.map((item) => (
              <div
                key={item.id}
                className="group bg-[#141418] border border-white/10 hover:border-orange-500/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Image Container */}
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
                      <span className="text-zinc-500">Workshop Provenance:</span>
                      <span className="text-orange-400 font-bold truncate max-w-[170px]">Vereeniging Tailored</span>
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
                      href={getGalleryInquiryWhatsAppUrl(item.title, item.vehicle)}
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

          {/* "SHOW MORE" / "SHOW LESS" Toggle Button */}
          {filteredItems.length > 3 && (
            <div className="text-center pt-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white font-heading font-black uppercase text-xs tracking-widest hover:brightness-110 transition-all duration-300 shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>
                  {isExpanded 
                    ? 'SHOW LESS (COLLAPSE GALLERY)' 
                    : `SHOW MORE (${filteredItems.length - 3} MORE WORKSHOP FITMENTS)`}
                </span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          )}
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
              className="py-2 px-4 rounded-xl bg-orange-500 text-white text-xs font-bold uppercase transition hover:bg-orange-600 cursor-pointer"
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
                    href={getGalleryInquiryWhatsAppUrl(activeModalItem.title, activeModalItem.vehicle)}
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
    </section>
  );
};
