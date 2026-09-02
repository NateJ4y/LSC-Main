import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Car, 
  Layers, 
  ShieldCheck, 
  Scissors, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle,
  FileText,
  Sparkles,
  Info,
  PenLine,
  Zap
} from 'lucide-react';
import { VEHICLE_MAKES } from '../data/vehicleDatabase';
import { MATERIALS_DATA } from '../data/materialsData';
import { VehicleSelection } from '../types';

interface ComprehensiveQuoteSystemProps {
  currentVehicle?: VehicleSelection;
}

export const ComprehensiveQuoteSystem: React.FC<ComprehensiveQuoteSystemProps> = ({
  currentVehicle
}) => {
  // Quote Mode: 'simple' (Super fast 1-step) vs 'detailed' (Itemized customization)
  const [quoteMode, setQuoteMode] = useState<'simple' | 'detailed'>('simple');

  // Vehicle Details State (Free-form editable text)
  const [selectedMake, setSelectedMake] = useState(currentVehicle?.make || 'Toyota');
  const [selectedModel, setSelectedModel] = useState(currentVehicle?.model || 'Hilux');
  const [selectedYear, setSelectedYear] = useState<string>(String(currentVehicle?.year || 2024));
  const [selectedCab, setSelectedCab] = useState(currentVehicle?.cabOrBody || 'Double Cab');

  // Quick 1-line vehicle text for simple mode
  const [quickVehicleText, setQuickVehicleText] = useState(
    `${currentVehicle?.year || 2024} ${currentVehicle?.make || 'Toyota'} ${currentVehicle?.model || 'Hilux'} ${currentVehicle?.cabOrBody ? `(${currentVehicle?.cabOrBody})` : 'Double Cab'}`
  );

  // Sync when prop updates
  useEffect(() => {
    if (currentVehicle) {
      if (currentVehicle.make) setSelectedMake(currentVehicle.make);
      if (currentVehicle.model) setSelectedModel(currentVehicle.model);
      if (currentVehicle.year) setSelectedYear(String(currentVehicle.year));
      if (currentVehicle.cabOrBody) setSelectedCab(currentVehicle.cabOrBody);
      setQuickVehicleText(
        `${currentVehicle.year || 2024} ${currentVehicle.make || ''} ${currentVehicle.model || ''} ${currentVehicle.cabOrBody ? `(${currentVehicle.cabOrBody})` : ''}`.trim()
      );
    }
  }, [currentVehicle]);

  // Seat Configuration
  const [seatConfig, setSeatConfig] = useState<'front_only' | 'front_and_rear' | 'front_rear_third'>('front_and_rear');
  const [hasAirbags, setHasAirbags] = useState(true);

  // Material & Customization State
  const [materialId, setMaterialId] = useState('heavy-duty-ripstop-canvas');
  const [stitchColor, setStitchColor] = useState('GT Gold Stitch');
  const [embroideryText, setEmbroideryText] = useState('HILUX 4X4');
  const [includeConsole, setIncludeConsole] = useState(true);
  const [includeMapPockets, setIncludeMapPockets] = useState(true);

  // Customer Details State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerLocation, setCustomerLocation] = useState('Gauteng / Courier Delivery');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculate live estimate price
  const basePrices: Record<string, { front: number; full: number; threeRow: number }> = {
    '600d-synthetic-polyester': { front: 2450, full: 3650, threeRow: 5150 },
    'heavy-duty-ripstop-canvas': { front: 2650, full: 3950, threeRow: 5650 },
    'rhino-hide-leatherette': { front: 2950, full: 4450, threeRow: 6450 }
  };

  const selectedMaterialObj = MATERIALS_DATA.find((m) => m.id === materialId) || MATERIALS_DATA[0];
  const matPricing = basePrices[materialId] || { front: 2650, full: 3950, threeRow: 5650 };
  
  let estimatedTotal = 
    seatConfig === 'front_only' 
      ? matPricing.front 
      : seatConfig === 'front_and_rear' 
      ? matPricing.full 
      : matPricing.threeRow;

  if (embroideryText.trim().length > 0) estimatedTotal += 200;
  if (includeConsole) estimatedTotal += 150;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const vehicleSummaryText = quoteMode === 'simple' && quickVehicleText.trim()
    ? quickVehicleText
    : `${selectedYear} ${selectedMake} ${selectedModel} (${selectedCab})`;

  const whatsappMessage = `Hi Lifestyle Seat Covers, I would like to request an official vehicle seat cover quote:%0A%0A` +
    `*Vehicle:* ${vehicleSummaryText}%0A` +
    `*Seating:* ${seatConfig === 'front_only' ? 'Front Rows Only' : seatConfig === 'front_and_rear' ? 'Full Set (Front + Rear)' : '3-Row Complete Set'} (Side Airbags: ${hasAirbags ? 'Yes' : 'No'})%0A` +
    `*Material:* ${selectedMaterialObj.name}%0A` +
    `*Stitching:* ${stitchColor}%0A` +
    `*Embroidery:* ${embroideryText || 'None'}%0A` +
    `*Console Cover:* ${includeConsole ? 'Yes' : 'No'}%0A` +
    `*Client Name:* ${customerName || 'Customer'}%0A` +
    `*Phone:* ${customerPhone || 'Not provided'}%0A` +
    `*Location:* ${customerLocation}%0A` +
    `*Notes:* ${additionalNotes || 'None'}`;

  return (
    <section id="quote-builder" className="w-full bg-[#0c0c0e] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest bg-[#141418] border border-orange-500/20 px-3 py-1 rounded-md font-mono">
            <Calculator className="w-3.5 h-3.5 text-orange-500" />
            <span>INSTANT ITEMISED VEHICLE ESTIMATE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            REQUEST YOUR <span className="text-white border-b-2 border-orange-500 pb-1">CUSTOM FIT QUOTE</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#8C9BA8] max-w-2xl mx-auto leading-relaxed">
            Type in your vehicle details below to receive a formal quotation from our Vereeniging workshop, or tap WhatsApp for an instant direct estimate.
          </p>

          {/* Simple vs Detailed Toggle Switch */}
          <div className="inline-flex bg-[#141418] p-1 rounded-2xl border border-white/15 shadow-md mt-2">
            <button
              type="button"
              onClick={() => setQuoteMode('simple')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition ${
                quoteMode === 'simple'
                  ? 'bg-white text-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-orange-600" />
              <span>⚡ Fast 1-Step Quote</span>
            </button>
            <button
              type="button"
              onClick={() => setQuoteMode('detailed')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition ${
                quoteMode === 'detailed'
                  ? 'bg-white text-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <PenLine className="w-3.5 h-3.5 text-orange-600" />
              <span>🛠️ Detailed Customizer</span>
            </button>
          </div>
        </div>

        {/* The Quote Form & Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form (8 Cols) */}
          <div className="lg:col-span-8 bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
            {isSubmitted ? (
              <div className="p-8 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-heading text-2xl font-bold uppercase text-white">
                  Quotation Request Received
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{customerName || 'Valued Customer'}</strong>. Your custom quote specification for your <strong className="text-white">{vehicleSummaryText}</strong> has been received. Our Vereeniging workshop team will email your formal PDF quotation promptly.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={`https://wa.me/27834455370?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase text-xs tracking-wider transition flex items-center justify-center space-x-2 shadow cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Send Directly via WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-bold uppercase text-xs tracking-wider transition border border-white/10 cursor-pointer"
                  >
                    Edit Quote Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-8">
                
                {/* MODE 1: FAST 1-STEP QUOTE */}
                {quoteMode === 'simple' && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-zinc-200 uppercase tracking-wider">
                        1. Type Your Vehicle (Year, Make, Model & Cab):
                      </label>
                      <input
                        type="text"
                        required
                        value={quickVehicleText}
                        onChange={(e) => setQuickVehicleText(e.target.value)}
                        placeholder="e.g. 2024 Toyota Hilux Double Cab Legend RS"
                        className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none"
                      />
                      <p className="text-[11px] text-[#8C9BA8]">
                        You can type any vehicle, year, or model in plain text. Over 1,500+ CAD patterns are available.
                      </p>
                    </div>

                    {/* Quick Material Selection */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-zinc-200 uppercase tracking-wider">
                        2. Choose Preferred Material:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {MATERIALS_DATA.map((mat) => (
                          <div
                            key={mat.id}
                            onClick={() => setMaterialId(mat.id)}
                            className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-1.5 cursor-pointer transition ${
                              materialId === mat.id
                                ? 'bg-black border-orange-500 ring-1 ring-orange-500 text-white'
                                : 'bg-[#0c0c0e] border-white/10 text-zinc-400 hover:border-white/20'
                            }`}
                          >
                            <span className="text-xs font-bold uppercase">{mat.name}</span>
                            <span className="text-[10px] text-[#8C9BA8]">{mat.tagline}</span>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold">{mat.warrantyYears} Year SA Warranty</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Row Selection */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-zinc-200 uppercase tracking-wider">
                        3. Seating Option:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <label
                          onClick={() => setSeatConfig('front_only')}
                          className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition ${
                            seatConfig === 'front_only'
                              ? 'bg-black border-orange-500 ring-1 ring-orange-500 text-white'
                              : 'bg-[#0c0c0e] border-white/10 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase">Front Row Only</span>
                          <span className="font-mono text-xs font-bold text-orange-400 mt-1">From R{matPricing.front.toLocaleString()}</span>
                        </label>

                        <label
                          onClick={() => setSeatConfig('front_and_rear')}
                          className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition ${
                            seatConfig === 'front_and_rear'
                              ? 'bg-black border-orange-500 ring-1 ring-orange-500 text-white'
                              : 'bg-[#0c0c0e] border-white/10 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase">Full Set (Front + Rear)</span>
                          <span className="font-mono text-xs font-bold text-orange-400 mt-1">From R{matPricing.full.toLocaleString()}</span>
                        </label>

                        <label
                          onClick={() => setSeatConfig('front_rear_third')}
                          className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition ${
                            seatConfig === 'front_rear_third'
                              ? 'bg-black border-orange-500 ring-1 ring-orange-500 text-white'
                              : 'bg-[#0c0c0e] border-white/10 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase">3-Row (7 Seater)</span>
                          <span className="font-mono text-xs font-bold text-orange-400 mt-1">From R{matPricing.threeRow.toLocaleString()}</span>
                        </label>
                      </div>
                    </div>

                    {/* Quick Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Dawie Pretorius"
                          className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="e.g. 082 123 4567"
                          className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="e.g. dawie@gmail.com"
                          className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* MODE 2: DETAILED STEP-BY-STEP CUSTOMIZER */}
                {quoteMode === 'detailed' && (
                  <div className="space-y-8">
                    {/* Section 1: Vehicle Details with free text + suggestions */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
                        <Car className="w-4 h-4 text-orange-500" />
                        <h3 className="font-heading text-sm font-bold uppercase text-white tracking-wider">
                          1. Vehicle Details (Type or Select)
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Make / Brand</label>
                          <input
                            type="text"
                            list="makes-list"
                            required
                            value={selectedMake}
                            onChange={(e) => setSelectedMake(e.target.value)}
                            placeholder="e.g. Toyota / Ford / Isuzu"
                            className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none"
                          />
                          <datalist id="makes-list">
                            {VEHICLE_MAKES.map((m) => (
                              <option key={m.id} value={m.name} />
                            ))}
                            <option value="Mahindra" />
                            <option value="GWM" />
                            <option value="Haval" />
                            <option value="Suzuki" />
                            <option value="Land Rover" />
                            <option value="Mercedes-Benz" />
                            <option value="Jeep" />
                            <option value="BAIC" />
                            <option value="Chery" />
                          </datalist>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Model & Trim</label>
                          <input
                            type="text"
                            required
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                            placeholder="e.g. Hilux / Ranger / Cruiser 79"
                            className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Year</label>
                          <input
                            type="text"
                            required
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            placeholder="e.g. 2024"
                            className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Cab / Body</label>
                          <input
                            type="text"
                            list="cabs-list"
                            required
                            value={selectedCab}
                            onChange={(e) => setSelectedCab(e.target.value)}
                            placeholder="e.g. Double Cab"
                            className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none"
                          />
                          <datalist id="cabs-list">
                            <option value="Double Cab" />
                            <option value="Single Cab" />
                            <option value="Extra Cab / SuperCab" />
                            <option value="SUV / Hatchback / Sedan" />
                            <option value="Commercial Panel Van" />
                            <option value="Safari Game Viewer" />
                          </datalist>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Seat Configuration */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
                        <Layers className="w-4 h-4 text-orange-500" />
                        <h3 className="font-heading text-sm font-bold uppercase text-white tracking-wider">
                          2. Seating Configuration & Safety
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <label
                          onClick={() => setSeatConfig('front_only')}
                          className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 cursor-pointer transition ${
                            seatConfig === 'front_only'
                              ? 'bg-black border-orange-500 ring-1 ring-orange-500 text-white'
                              : 'bg-[#0c0c0e] border-white/10 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase">Front Row Only</span>
                          <span className="text-[11px] text-[#8C9BA8]">Driver + Passenger bucket seats</span>
                          <span className="font-mono text-xs font-bold text-orange-400">From R{matPricing.front.toLocaleString()}</span>
                        </label>

                        <label
                          onClick={() => setSeatConfig('front_and_rear')}
                          className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 cursor-pointer transition ${
                            seatConfig === 'front_and_rear'
                              ? 'bg-black border-orange-500 ring-1 ring-orange-500 text-white'
                              : 'bg-[#0c0c0e] border-white/10 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase">Full Set (Front + Rear)</span>
                          <span className="text-[11px] text-[#8C9BA8]">Complete 2-row cab protection</span>
                          <span className="font-mono text-xs font-bold text-orange-400">From R{matPricing.full.toLocaleString()}</span>
                        </label>

                        <label
                          onClick={() => setSeatConfig('front_rear_third')}
                          className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 cursor-pointer transition ${
                            seatConfig === 'front_rear_third'
                              ? 'bg-black border-orange-500 ring-1 ring-orange-500 text-white'
                              : 'bg-[#0c0c0e] border-white/10 text-zinc-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase">Complete 3-Row Set</span>
                          <span className="text-[11px] text-[#8C9BA8]">7-seater SUVs (Fortuner, Everest, Prado)</span>
                          <span className="font-mono text-xs font-bold text-orange-400">From R{matPricing.threeRow.toLocaleString()}</span>
                        </label>
                      </div>

                      <div className="flex items-center space-x-2 pt-1">
                        <input
                          type="checkbox"
                          id="quoteAirbags"
                          checked={hasAirbags}
                          onChange={(e) => setHasAirbags(e.target.checked)}
                          className="w-4 h-4 accent-orange-500 rounded"
                        />
                        <label htmlFor="quoteAirbags" className="text-xs text-zinc-300 cursor-pointer">
                          Vehicle has seat-integrated side airbags (We stitch certified SABS break-away release seams at no extra charge)
                        </label>
                      </div>
                    </div>

                    {/* Section 3: Material & Custom Styling */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
                        <Scissors className="w-4 h-4 text-orange-500" />
                        <h3 className="font-heading text-sm font-bold uppercase text-white tracking-wider">
                          3. Material & Custom Styling
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {MATERIALS_DATA.map((mat) => (
                          <div
                            key={mat.id}
                            onClick={() => setMaterialId(mat.id)}
                            className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 cursor-pointer transition ${
                              materialId === mat.id
                                ? 'bg-black border-orange-500 ring-1 ring-orange-500 text-white'
                                : 'bg-[#0c0c0e] border-white/10 text-zinc-400 hover:border-white/20'
                            }`}
                          >
                            <span className="text-xs font-bold uppercase">{mat.name}</span>
                            <span className="text-[11px] text-[#8C9BA8]">{mat.tagline}</span>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold">{mat.warrantyYears} Year Factory Warranty</span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Thread Stitch Color</label>
                          <select
                            value={stitchColor}
                            onChange={(e) => setStitchColor(e.target.value)}
                            className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          >
                            <option value="GT Gold Stitch">GT Golden Thread</option>
                            <option value="Rally Red Stitch">Rally Red</option>
                            <option value="Kalahari Orange Stitch">Kalahari Orange</option>
                            <option value="Titanium Silver Stitch">Titanium Silver</option>
                            <option value="Stealth Matching Black">Stealth Black (Matching)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Custom Headrest Embroidery Text</label>
                          <input
                            type="text"
                            value={embroideryText}
                            onChange={(e) => setEmbroideryText(e.target.value.toUpperCase())}
                            placeholder="e.g. HILUX 4X4 or leave empty"
                            className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <label className="flex items-center space-x-2 text-xs text-zinc-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeConsole}
                            onChange={(e) => setIncludeConsole(e.target.checked)}
                            className="w-4 h-4 accent-orange-500 rounded"
                          />
                          <span>Include Padded Center Console Lid Cover (+R150)</span>
                        </label>

                        <label className="flex items-center space-x-2 text-xs text-zinc-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeMapPockets}
                            onChange={(e) => setIncludeMapPockets(e.target.checked)}
                            className="w-4 h-4 accent-orange-500 rounded"
                          />
                          <span>Include Dual Rear Backrest Map Pockets</span>
                        </label>
                      </div>
                    </div>

                    {/* Section 4: Customer Contact & Delivery Details */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
                        <User className="w-4 h-4 text-orange-500" />
                        <h3 className="font-heading text-sm font-bold uppercase text-white tracking-wider">
                          4. Your Contact & Delivery Details
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Full Name</label>
                          <input
                            type="text"
                            required
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="e.g. Pieter Venter"
                            className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Phone / WhatsApp</label>
                          <input
                            type="tel"
                            required
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            placeholder="e.g. 082 123 4567"
                            className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Email Address</label>
                          <input
                            type="email"
                            required
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            placeholder="e.g. pieter@gmail.com"
                            className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Delivery / Fitment Preference</label>
                          <select
                            value={customerLocation}
                            onChange={(e) => setCustomerLocation(e.target.value)}
                            className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          >
                            <option value="Vereeniging Workshop Fitment">Direct Fitment at Vereeniging Workshop (Unit 6 Assegai St)</option>
                            <option value="Gauteng / Courier Delivery">Nationwide Door Delivery via The Courier Guy (Gauteng)</option>
                            <option value="Free State / Vaal / Courier Delivery">Nationwide Door Delivery (Vaal / Free State)</option>
                            <option value="Limpopo / Mpumalanga / Courier Delivery">Nationwide Door Delivery (Limpopo / Mpumalanga)</option>
                            <option value="Western Cape / Courier Delivery">Nationwide Door Delivery (Western Cape / Garden Route)</option>
                            <option value="KZN / Courier Delivery">Nationwide Door Delivery (KZN / Drakensberg)</option>
                            <option value="Other SA Province">Other South African Province / SADC Cross-Border</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Additional Notes / Vehicle Specifics</label>
                          <input
                            type="text"
                            value={additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                            placeholder="e.g. Has electric driver seat adjustment, rear 60/40 split"
                            className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <button
                    type="submit"
                    className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase text-xs tracking-wider transition shadow cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Request My Official PDF Quote</span>
                    <ArrowRight className="w-4 h-4 text-orange-600" />
                  </button>

                  <a
                    href={`https://wa.me/27834455370?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase text-xs tracking-wider transition flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Instant WhatsApp Quote</span>
                  </a>
                </div>

              </form>
            )}
          </div>

          {/* Real-Time Estimated Summary Card (4 Cols) */}
          <div className="lg:col-span-4 bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-7 space-y-6 shadow-2xl sticky top-24">
            <div className="border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono font-bold text-orange-400 uppercase">LIVE ESTIMATE</span>
              <h4 className="font-heading text-xl font-bold uppercase text-white">QUOTE SPECIFICATION</h4>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Vehicle:</span>
                <span className="font-bold text-white text-right max-w-[200px] truncate">{vehicleSummaryText}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Seating:</span>
                <span className="font-bold text-white text-right">
                  {seatConfig === 'front_only' ? 'Front Rows Only' : seatConfig === 'front_and_rear' ? 'Full Set (Front+Rear)' : '3-Row Complete'}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Material:</span>
                <span className="font-bold text-white text-right">{selectedMaterialObj.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Stitching:</span>
                <span className="font-bold text-white text-right">{stitchColor}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400">Airbag Break-Away:</span>
                <span className="font-bold text-emerald-400 text-right">Included (SABS)</span>
              </div>
              {includeConsole && (
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-zinc-400">Console Protector:</span>
                  <span className="font-bold text-white text-right">Included (+R150)</span>
                </div>
              )}
            </div>

            {/* Price Box */}
            <div className="p-4 bg-[#0c0c0e] border border-white/10 rounded-2xl space-y-1">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">Estimated Factory Price</div>
              <div className="text-2xl font-black font-mono text-white">
                R{estimatedTotal.toLocaleString()}
              </div>
              <div className="text-[10px] text-zinc-400">
                *Includes VAT. Lead time 10–20 working days. Direct from Vereeniging workshop.
              </div>
            </div>

            <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center gap-2 text-xs text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Includes 24-Month Local SA Warranty</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
