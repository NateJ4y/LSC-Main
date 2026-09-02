import React, { useState } from 'react';
import { 
  Camera, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Maximize2, 
  X, 
  MessageCircle, 
  Calculator, 
  MapPin, 
  Filter, 
  Search, 
  SlidersHorizontal,
  Layers,
  ArrowRight,
  Award
} from 'lucide-react';
import hiluxGd6Img from '../assets/images/hilux_gd6_covers_1788330516757.jpg';
import cruiser79Img from '../assets/images/cruiser_79_covers_1788330530981.jpg';
import rangerRedImg from '../assets/images/ranger_red_covers_1788330546716.jpg';
import amarokDiamondImg from '../assets/images/amarok_diamond_covers_1788330560423.jpg';
import showroomImg from '../assets/images/showroom_display_seats_1788330578843.jpg';
import jeepImg from '../assets/images/jeep_wrangler_covers_1788330596374.jpg';
import fleetImg from '../assets/images/gwm_fleet_covers_1788330612996.jpg';

export interface GalleryItem {
  id: string;
  title: string;
  vehicle: string;
  category: 'bakkies' | 'suv' | 'fleet' | 'diamond' | 'showroom';
  material: string;
  stitchStyle: string;
  embroidery: string;
  location: string;
  image: string;
  highlights: string[];
  description: string;
  featured?: boolean;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'hilux-gd6-custom',
    title: 'Toyota Hilux GD-6 Raider & Legend',
    vehicle: 'Toyota Hilux (2016–2025+ GD-6 Double Cab)',
    category: 'bakkies',
    material: '510g Tough Ripstop Canvas + Micro-Silicone Non-Slip Backing',
    stitchStyle: 'Upper Fluted Ribs + Lower Diamond Quilt Center',
    embroidery: 'Bespoke Dual-Tone "GD-6" Chrome/Red Badge',
    location: 'Fitted at Vereeniging Workshop',
    image: hiluxGd6Img,
    highlights: [
      'Certified Side Airbag Breakaway Seam Tagged',
      'Dual Flute + Diamond Quilted Padding',
      'Full Lumbar & Side Lever Clearance',
      'Waterproof & Mud Resistant'
    ],
    description: 'Precision handcrafted for South Africa’s bestselling bakkie. Features a custom embroidered GD-6 badge, breathable high-density padded diamond quilt, and zero interference with seat-adjust levers.',
    featured: true
  },
  {
    id: 'cruiser-79-overland',
    title: 'Toyota Land Cruiser 79 Series Single & Double Cab',
    vehicle: 'Toyota Land Cruiser 79 (4.5L V8 / 2.8L GD-6)',
    category: 'bakkies',
    material: '510g Heavy-Duty Riptech Canvas (Tactical Charcoal & Sand)',
    stitchStyle: 'Heavy-Gauge Double-Needle Nylon Stitching',
    embroidery: 'Official "LAND CRUISER" Contrast Header Bar',
    location: 'Direct Workshop Installation',
    image: cruiser79Img,
    highlights: [
      'Indestructible 510g Canvas against Thorns & Red Dust',
      'Twin-Tone Sand Beige Accent Bar',
      'Reinforced Bottom Anchor Straps',
      'Designed for Kalahari & Bush Expeditions'
    ],
    description: 'Built for extreme African conditions. Designed to wrap tightly around the rugged Cruiser seats, shielding factory upholstery from abrasive red soil, hunting gear, and blazing sun.',
    featured: true
  },
  {
    id: 'ranger-wildtrak-red',
    title: 'Ford Ranger Wildtrak & XLT Next-Gen',
    vehicle: 'Ford Ranger / Everest (2019–2025+ Double Cab)',
    category: 'bakkies',
    material: 'Waterproof 600D Poly Canvas with Sport Padding',
    stitchStyle: 'High-Contrast Red Sport Perimeter & Fluted Inset',
    embroidery: 'Custom Red "RANGER" Upper Backrest Branding',
    location: 'Dispatched Nationwide via The Courier Guy',
    image: rangerRedImg,
    highlights: [
      'Matching Padded Center Armrest Console Cover',
      'Vibrant Red UV-Bonded Thread (Zero Fade)',
      '100% Retained Electric Seat Adjustments',
      'Airbag-Safe Breakaway Seams'
    ],
    description: 'Sporty, aggressive styling tailored for the Ford Ranger cabin. Includes a snug matching center console lid cover and bold red accent stitching that complements factory interior trims.',
    featured: true
  },
  {
    id: 'amarok-diamond-luxury',
    title: 'Volkswagen Amarok V6 & BiTDI Double Cab',
    vehicle: 'Volkswagen Amarok (2010–2025+ Double Cab)',
    category: 'diamond',
    material: 'Heavy-Duty Canvas with High-Density Quilted Foam Core',
    stitchStyle: 'Full Geometric Diamond Quilt in Silver Needle',
    embroidery: 'Embroidered "AMAROK" Silver Upper Script',
    location: 'Vereeniging Workshop Fitment',
    image: amarokDiamondImg,
    highlights: [
      'Deep Diamond Quilt for Enhanced Lumbar Comfort',
      'Tightly Sculpted Deep-Seat Side Bolsters',
      'Resistant to Gym Sweat, Spills & Dogs',
      'Machine Washable & Quick Dry'
    ],
    description: 'Combines executive styling with heavy-duty defense. The full diamond-stitched center cushions provide extra padding for long highway hauls while preventing sweat and water seepage.',
    featured: true
  },
  {
    id: 'jeep-wrangler-tactical',
    title: 'Jeep Wrangler Rubicon & Gladiator',
    vehicle: 'Jeep Wrangler JK / JL & Gladiator JT',
    category: 'bakkies',
    material: 'Tactical 510g Ripstop Canvas (Charcoal Black)',
    stitchStyle: 'White Precision Contour Lines & Double Edging',
    embroidery: 'Official "Jeep" White Script on Backrest',
    location: 'Custom Order from Vereeniging Workshop',
    image: jeepImg,
    highlights: [
      'Open-Top UV & Rain Protection',
      'Included Armrest & Headrest Sets',
      'Zero Bunched Fabric on Entry/Exit',
      'Easy Sponge-Down or Machine Wash'
    ],
    description: 'Engineered for open-air trail exploration. Repels sudden rain downpours, river crossings, mud, and dust without soaking through to the factory foam.',
    featured: true
  },
  {
    id: 'corporate-fleet-gwm',
    title: 'Corporate Fleet & Commercial Branding',
    vehicle: 'GWM P-Series / Steed / Isuzu D-Max Fleets',
    category: 'fleet',
    material: 'Industrial Grade 600D Oxford Polyester',
    stitchStyle: 'Reinforced Twin-Needle Seams',
    embroidery: 'Custom Company Logo & Headrest Department Badges',
    location: 'Vereeniging Direct Fleet Production',
    image: fleetImg,
    highlights: [
      'Custom Corporate Logo Embroidery (e.g. Mining / Logistics)',
      'Resistant to Dirty Workwear, Tools & Grease',
      'Fast 10-Min Wipe-Down Maintenance',
      'Massive Resale Value Protection'
    ],
    description: 'We outfit company bakkie fleets with custom embroidered corporate logos. Protects fleet equity from rough workboots, grease, chemicals, and daily crew turnover.',
    featured: true
  },
  {
    id: 'showroom-display-bench',
    title: 'Lifestyle Seat Covers Workshop Showroom',
    vehicle: 'Live Demonstration Seats (Unit 6 Assegai St, Vereeniging)',
    category: 'showroom',
    material: 'All Fabric Options: 510g Canvas, Leatherette, 600D Poly',
    stitchStyle: 'Diamond Quilt, Horizontal Flutes, Red Sport & Plain',
    embroidery: 'Lifestyle Seat Covers Official Brand Demo',
    location: 'Unit 6 Assegai St, South, Vereeniging, 1939',
    image: showroomImg,
    highlights: [
      'Inspect Stitches, Padding & Materials in Person',
      'Compare Diamond Quilt vs Fluted vs Plain Styles',
      'On-Site Measurements & Professional Fitment Service',
      'Open Mon–Fri 08:00–17:00'
    ],
    description: 'Visit our Vereeniging showroom to physically feel our 510g Riptech canvas, luxury diamond stitch padding, and test the tight non-slip fitment on our demo seating bench.',
    featured: true
  }
];

interface RealFitmentGalleryProps {
  onStartQuote?: (vehicleName?: string) => void;
}

export const RealFitmentGallery: React.FC<RealFitmentGalleryProps> = ({ onStartQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = [
    { key: 'all', label: 'All Real Fitments' },
    { key: 'bakkies', label: '4x4 Bakkies & Cruisers' },
    { key: 'diamond', label: 'Luxury Diamond Stitch' },
    { key: 'fleet', label: 'Corporate & Custom Logos' },
    { key: 'showroom', label: 'Workshop Showroom' }
  ];

  const filteredItems = GALLERY_DATA.filter((item) => {
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
              <span>REAL WORKSHOP & CUSTOMER FITMENTS</span>
            </div>
            
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              PROVEN ON SOUTH AFRICAN ROADS. <br />
              <span className="text-white border-b-2 border-orange-500 pb-1">INSPECT OUR ACTUAL FITMENTS</span>
            </h2>

            <p className="text-sm sm:text-base text-[#8C9BA8] leading-relaxed">
              No generic CGI mockups. Browse actual photographs of our handcrafted seat covers fitted to Toyota Hilux GD-6, Land Cruiser 79 Series, Ford Ranger, VW Amarok, Jeep Wrangler, and corporate fleets — straight from our Vereeniging workshop.
            </p>
          </div>

          {/* Workshop Trust Badge */}
          <div className="bg-[#141418] border border-white/10 p-4 rounded-2xl flex items-center space-x-3.5 shrink-0 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase font-mono">100% Handcrafted</div>
              <div className="text-[11px] text-[#8C9BA8]">Unit 6 Assegai St, Vereeniging</div>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#141418] border border-white/10 p-3 rounded-2xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-black/40 text-[#8C9BA8] hover:text-white hover:bg-black/80 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#8C9BA8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search make or model (e.g. Hilux, Cruiser)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0c0c0e] border border-white/10 focus:border-orange-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#141418] border border-white/10 hover:border-orange-500/50 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              {/* Image Container with Zoom Overlay */}
              <div 
                onClick={() => setActiveModalItem(item)}
                className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden bg-black cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500 ease-out"
                />

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-md text-orange-400">
                    Real Fitment
                  </span>
                  
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md border border-white/15 px-2 py-1 rounded-md text-zinc-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Airbag Safe
                  </span>
                </div>

                {/* Hover CTA Button Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <span className="py-2.5 px-4 rounded-xl bg-orange-500 text-white font-bold uppercase text-xs tracking-wider flex items-center space-x-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Inspect Details</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-orange-400 font-semibold uppercase">
                    {item.vehicle}
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold uppercase text-white group-hover:text-orange-400 transition leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#8C9BA8] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Specs Pill Summary */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500 font-mono">Stitch Pattern:</span>
                    <span className="text-white font-medium truncate max-w-[60%] text-right">{item.stitchStyle}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500 font-mono">Embroidery:</span>
                    <span className="text-orange-400 font-medium truncate max-w-[60%] text-right">{item.embroidery}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (onStartQuote) {
                        onStartQuote(item.vehicle);
                      } else {
                        const el = document.getElementById('quote-builder');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-orange-500 text-white font-bold uppercase text-[11px] tracking-wider transition border border-white/10 hover:border-orange-500 flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Quote This</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/27834455370?text=Hi%20Lifestyle%20Seat%20Covers,%20I%20saw%20the%20gallery%20photo%20of%20the%20${encodeURIComponent(item.title)}%20and%20would%20like%20a%20quote%20for%20my%20vehicle.`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white transition border border-emerald-500/30 flex items-center justify-center cursor-pointer shrink-0"
                    title="WhatsApp about this vehicle"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Showroom Direct Invitation Card */}
        <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono font-bold text-orange-400 uppercase">
              <MapPin className="w-3.5 h-3.5" />
              <span>VISIT OUR WORKSHOP SHOWROOM IN VEREENIGING</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-white">
              WANT TO SEE THE STITCHING & CANVAS IN PERSON?
            </h3>
            <p className="text-xs sm:text-sm text-[#8C9BA8] max-w-2xl">
              Drop by Unit 6 Assegai St, South, Vereeniging (1939). Sit on our demonstration seating bench, test our genuine 510g Ripstop canvas swatches, and have our technicians fit your covers on-site.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://wa.me/27834455370?text=Hi%20Lifestyle%20Seat%20Covers,%20I%20would%20like%20to%20book%20a%20visit%20or%20fitment%20at%20your%20Vereeniging%20workshop."
              target="_blank"
              rel="noreferrer"
              className="py-3 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase text-xs tracking-wider transition flex items-center justify-center space-x-2 shadow cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book Workshop Fitment</span>
            </a>

            <button
              onClick={() => {
                const el = document.getElementById('quote-builder');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-3 px-6 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase text-xs tracking-wider transition flex items-center justify-center space-x-2 shadow cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-orange-600" />
              <span>Get Vehicle Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal / Lightbox */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
        >
          <div 
            className="bg-[#141418] border border-white/20 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white hover:bg-orange-500 hover:border-orange-500 transition flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image View */}
            <div className="md:w-1/2 bg-black relative flex items-center justify-center min-h-[300px] md:min-h-full">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover max-h-[500px]"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-[10px] font-mono text-zinc-300">
                Authentic Workshop Fitment
              </div>
            </div>

            {/* Right Details Panel */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-orange-500 font-bold uppercase tracking-wider">
                    {activeModalItem.vehicle}
                  </div>
                  <h3 className="font-heading text-2xl font-black uppercase text-white leading-tight">
                    {activeModalItem.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {activeModalItem.description}
                </p>

                {/* Key Technical Specifications */}
                <div className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-2.5 text-xs">
                  <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    SPECIFICATIONS
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-zinc-500">Fabric:</span>
                    <span className="text-white font-medium text-right max-w-[65%]">{activeModalItem.material}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-zinc-500">Stitch Work:</span>
                    <span className="text-white font-medium text-right max-w-[65%]">{activeModalItem.stitchStyle}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-zinc-500">Embroidery:</span>
                    <span className="text-orange-400 font-medium text-right max-w-[65%]">{activeModalItem.embroidery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Location:</span>
                    <span className="text-white font-medium text-right">{activeModalItem.location}</span>
                  </div>
                </div>

                {/* Engineering Highlights */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    KEY HIGHLIGHTS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeModalItem.highlights.map((h, i) => (
                      <div key={i} className="flex items-start space-x-2 text-[11px] text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct CTAs */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const veh = activeModalItem.vehicle;
                    setActiveModalItem(null);
                    if (onStartQuote) {
                      onStartQuote(veh);
                    } else {
                      const el = document.getElementById('quote-builder');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider transition flex items-center justify-center space-x-2 shadow cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Quote This Vehicle</span>
                </button>

                <a
                  href={`https://wa.me/27834455370?text=Hi%20Lifestyle%20Seat%20Covers,%20I%20am%20interested%20in%20the%20${encodeURIComponent(activeModalItem.title)}%20shown%20in%20your%20gallery.%20Can%20I%20get%20a%20direct%20quote?`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase text-xs tracking-wider transition flex items-center justify-center space-x-2 cursor-pointer shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Quote</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
