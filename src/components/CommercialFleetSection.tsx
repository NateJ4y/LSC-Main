import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Truck, 
  HardHat, 
  Calculator, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle,
  FileText,
  Clock,
  Compass,
  Zap
} from 'lucide-react';

interface CommercialFleetSectionProps {
  onOpenQuoteModal: (fleetContext?: string) => void;
}

export const CommercialFleetSection: React.FC<CommercialFleetSectionProps> = ({
  onOpenQuoteModal
}) => {
  const [fleetSize, setFleetSize] = useState<number>(10);
  const [vehicleType, setVehicleType] = useState('Bakkie Single / Double Cab');
  const [fleetSubmitted, setFleetSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const fleetSectors = [
    { title: 'Logistics & Distribution', desc: 'Freight, inter-city transport, panel vans, and distribution box trucks.' },
    { title: 'Security & Armed Patrols', desc: 'Continuous tactical shift patrols, ballistic vest entry, and heavy gear wear.' },
    { title: 'Courier & Last-Mile Delivery', desc: 'Hundreds of daily driver seat ingress/egress cycles across urban routes.' },
    { title: 'Construction & Mining', desc: 'Yellow plant machinery, abrasive dust, cement residues, and site supervision bakkies.' },
    { title: 'Agriculture & Farm Workhorses', desc: 'Fertilizers, chemical sprayers, tractors, and livestock feed transport.' },
    { title: 'Safari Lodges & Tourism', desc: 'Open game viewers, 9-seater cruisers, and guest airport transfer shuttles.' }
  ];

  // Estimated asset preservation value: ~R12,500 replacement cost avoided per vehicle
  const estimatedSavings = fleetSize * 11500;

  const handleFleetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFleetSubmitted(true);
  };

  return (
    <section id="commercial-fleets" className="w-full bg-[#0c0c0e] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest bg-[#141418] border border-orange-500/20 px-3 py-1 rounded-md font-mono">
            <Building2 className="w-3.5 h-3.5 text-orange-500" />
            <span>COMMERCIAL & CORPORATE FLEET SOLUTIONS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            ONE VEHICLE IS AN EXPENSE. <br />
            <span className="text-white border-b-2 border-orange-500 pb-1">A FLEET IS AN ASSET. PROTECT IT</span>.
          </h2>
          <p className="text-sm sm:text-base text-[#8C9BA8] max-w-2xl leading-relaxed">
            High-turnover drivers, tool belts, red soil, and constant ingress/egress shred factory automotive seats in under 12 months. Our industrial-grade Riptech® 510g canvas and heavy-duty 600D synthetic polyester seat covers protect your vehicles' interior residual value across 3 to 5-year lease cycles.
          </p>
        </div>

        {/* Sectors Served Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fleetSectors.map((sector, idx) => (
            <div
              key={idx}
              className="bg-[#141418] border border-white/10 hover:border-white/20 p-5 rounded-2xl space-y-2 flex flex-col justify-between transition group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Sector 0{idx + 1}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="font-heading text-base font-bold uppercase text-white group-hover:text-orange-400 transition-colors">
                  {sector.title}
                </h3>
                <p className="text-xs text-[#8C9BA8] leading-relaxed">
                  {sector.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fleet ROI Calculator & B2B Inquiry Box */}
        <div className="bg-[#141418] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Fleet Value Calculator */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-orange-400 uppercase">
                  <Calculator className="w-4 h-4" />
                  <span>FLEET RESIDUAL PRESERVATION ESTIMATOR</span>
                </div>
                <h3 className="font-heading text-2xl font-bold uppercase text-white">
                  CALCULATE YOUR FLEET ASSET PROTECTION
                </h3>
                <p className="text-xs text-[#8C9BA8]">
                  Adjust the slider to your fleet vehicle count to estimate replacement costs avoided during lease de-fleeting.
                </p>
              </div>

              {/* Slider Controls */}
              <div className="space-y-4 bg-[#0c0c0e] p-5 rounded-2xl border border-white/10">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase text-zinc-300">Number of Fleet Vehicles:</span>
                    <span className="font-mono text-base font-black text-white">{fleetSize} Vehicles</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={100}
                    value={fleetSize}
                    onChange={(e) => setFleetSize(Number(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>2 (Small Business)</span>
                    <span>50+ (Enterprise Fleet)</span>
                    <span>100+ (Heavy Logistics)</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">Estimated Reupholstery / De-fleet Penalties Saved:</span>
                    <span className="font-mono text-lg font-black text-emerald-400">
                      R{estimatedSavings.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    *Based on average dealership upholstery restoration fees of R11,500 to R15,000 per commercial vehicle upon return.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-zinc-300 font-mono">
                <div className="bg-black/50 p-3 rounded-xl border border-white/5 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24-Month Warranty</span>
                </div>
                <div className="bg-black/50 p-3 rounded-xl border border-white/5 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Tax Invoices for SARS</span>
                </div>
              </div>
            </div>

            {/* Right: Direct Fleet Quote Request Form */}
            <div className="lg:col-span-6 bg-[#0c0c0e] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl">
              <div className="border-b border-white/10 pb-3">
                <h4 className="font-heading text-lg font-bold uppercase text-white">
                  REQUEST A B2B FLEET PROPOSAL
                </h4>
                <p className="text-xs text-[#8C9BA8]">
                  Direct factory tier volume pricing from our Polokwane facility.
                </p>
              </div>

              {fleetSubmitted ? (
                <div className="p-6 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h5 className="font-heading text-base font-bold uppercase text-white">
                    Fleet Request Received
                  </h5>
                  <p className="text-xs text-zinc-300">
                    Thank you, {contactName || 'Corporate Client'}. Our commercial fleet specialist will review your {fleetSize}-vehicle requirement and provide an itemized corporate quotation within 2 business hours.
                  </p>
                  <button
                    onClick={() => setFleetSubmitted(false)}
                    className="text-xs font-mono text-emerald-400 underline hover:text-white pt-2 cursor-pointer"
                  >
                    Submit Another Vehicle Fleet
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFleetSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Company Name</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Barlow Logistics"
                        className="w-full bg-[#141418] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Fleet Manager Name</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Johan van der Merwe"
                        className="w-full bg-[#141418] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Contact Phone / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="e.g. +27 82 123 4567"
                        className="w-full bg-[#141418] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Vehicle Type / Models</label>
                      <input
                        type="text"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        placeholder="e.g. 10x Hilux Single Cab & 5x Hino"
                        className="w-full bg-[#141418] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase text-xs tracking-wider transition shadow cursor-pointer text-center"
                    >
                      Enquire About Fleet Solutions
                    </button>

                    <a
                      href={`https://wa.me/27834455370?text=Hi%20Lifestyle%20Seat%20Covers,%20I%20represent%20${encodeURIComponent(companyName || 'our company')}%20and%20would%20like%20a%20fleet%20quote%20for%20${fleetSize}%20vehicles.`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase text-xs tracking-wider transition flex items-center justify-center space-x-1.5 cursor-pointer shrink-0"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>WhatsApp Fleet Specialist</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
