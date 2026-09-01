import React, { useState } from 'react';
import { X, Layers, Check, Truck, Sparkles, Send } from 'lucide-react';
import { MATERIALS_DATA } from '../data/materialsData';

interface FreeSwatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeSwatchModal: React.FC<FreeSwatchModalProps> = ({ isOpen, onClose }) => {
  const [selectedSwatches, setSelectedSwatches] = useState<string[]>([
    'heavy-duty-ripstop-canvas',
    'rhino-hide-leatherette'
  ]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [suburb, setSuburb] = useState('');
  const [city, setCity] = useState('Johannesburg');
  const [province, setProvince] = useState('Gauteng');
  const [postalCode, setPostalCode] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleSwatch = (id: string) => {
    if (selectedSwatches.includes(id)) {
      if (selectedSwatches.length > 1) {
        setSelectedSwatches(selectedSwatches.filter((s) => s !== id));
      }
    } else {
      if (selectedSwatches.length < 4) {
        setSelectedSwatches([...selectedSwatches, id]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const saProvinces = [
    'Gauteng',
    'Western Cape',
    'KwaZulu-Natal',
    'Eastern Cape',
    'Free State',
    'Mpumalanga',
    'Limpopo',
    'North West',
    'Northern Cape'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0c0c0e] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#141418] text-[#8C9BA8] hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-[#8C9BA8] uppercase tracking-widest bg-[#141418] border border-white/10 px-3 py-1 rounded-md mb-2 font-mono">
                <Truck className="w-3.5 h-3.5 text-orange-500" />
                <span>FREE SOUTH AFRICAN COURIER DELIVERY</span>
              </div>
              <h3 className="font-heading text-3xl font-bold uppercase text-white tracking-tight">
                REQUEST FREE FABRIC SWATCH SAMPLE PACK
              </h3>
              <p className="text-xs sm:text-sm text-[#8C9BA8] mt-1">
                Touch, feel, and test the water-repellency of our heavy-duty South African automotive fabrics in person. Delivered directly to your door in 2-3 days.
              </p>
            </div>

            {/* Step 1: Select up to 4 swatches */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#8C9BA8] uppercase block font-mono">
                1. Select Up To 4 Fabric Samples ({selectedSwatches.length}/4 Selected):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {MATERIALS_DATA.map((mat) => {
                  const isChecked = selectedSwatches.includes(mat.id);
                  return (
                    <div
                      key={mat.id}
                      onClick={() => toggleSwatch(mat.id)}
                      className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#141418] border-white text-white shadow-md'
                          : 'bg-[#141418]/50 border-white/10 text-[#8C9BA8] hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div
                          className="w-5 h-5 rounded-lg border border-white/10 shrink-0"
                          style={{ backgroundColor: mat.colors[0]?.hex || '#333' }}
                        />
                        <span className="text-xs font-bold uppercase text-white">{mat.name}</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                          isChecked ? 'bg-white border-white text-black' : 'border-white/10'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 font-bold" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Shipping Details Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-white/10">
              <div className="text-xs font-bold text-[#8C9BA8] uppercase font-mono">
                2. Where Should We Courier Your Free Sample Pack?
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#8C9BA8] uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Johan van Zyl"
                    className="w-full bg-[#141418] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#8C9BA8] uppercase mb-1">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 082 123 4567"
                    className="w-full bg-[#141418] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#8C9BA8] uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. johan@example.co.za"
                    className="w-full bg-[#141418] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#8C9BA8] uppercase mb-1">
                    Your Vehicle (Make & Model)
                  </label>
                  <input
                    type="text"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    placeholder="e.g. 2024 Toyota Hilux Double Cab"
                    className="w-full bg-[#141418] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8C9BA8] uppercase mb-1">
                  Street Address (for Courier Guy Hand-to-Hand) *
                </label>
                <input
                  type="text"
                  required
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="e.g. 14 Protea Way, Farm / Complex"
                  className="w-full bg-[#141418] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#8C9BA8] uppercase mb-1">
                    Suburb *
                  </label>
                  <input
                    type="text"
                    required
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                    placeholder="e.g. Sandton"
                    className="w-full bg-[#141418] border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#8C9BA8] uppercase mb-1">
                    Province *
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full bg-[#141418] border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none"
                  >
                    {saProvinces.map((p) => (
                      <option key={p} value={p} className="bg-[#141418]">
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#8C9BA8] uppercase mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="e.g. 2196"
                    className="w-full bg-[#141418] border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold uppercase text-sm tracking-wider flex items-center justify-center space-x-2 shadow transition cursor-pointer"
              >
                <Send className="w-4 h-4 text-orange-600" />
                <span>DISPATCH MY FREE SWATCH PACK (100% FREE)</span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-8 h-8 font-black" />
            </div>

            <div>
              <h3 className="font-heading text-3xl font-bold uppercase text-white">
                SWATCH PACK DISPATCHED!
              </h3>
              <p className="text-sm text-[#8C9BA8] max-w-md mx-auto mt-2">
                Thank you, <span className="text-white font-bold">{fullName}</span>. Your sample pack containing {selectedSwatches.length} fabrics is being packed at our Sandton dispatch hub.
              </p>
            </div>

            <div className="bg-[#141418] p-4 rounded-2xl border border-white/10 max-w-md mx-auto text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between text-[#8C9BA8]">
                <span>Courier Service:</span>
                <span className="font-bold text-white">The Courier Guy (Flyer Overnight)</span>
              </div>
              <div className="flex justify-between text-[#8C9BA8]">
                <span>Destination:</span>
                <span className="font-bold text-white">{suburb}, {province} ({postalCode})</span>
              </div>
              <div className="flex justify-between text-[#8C9BA8]">
                <span>Tracking Reference:</span>
                <span className="font-mono font-bold text-orange-400">TCG-LSC-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="py-3 px-8 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition"
            >
              Back to Seat Covers Studio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
