import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Lock, 
  FileText, 
  MessageCircle,
  Building,
  Sparkles
} from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  grandTotal: number;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  grandTotal,
  onClearCart
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [suburb, setSuburb] = useState('');
  const [city, setCity] = useState('Johannesburg');
  const [province, setProvince] = useState('Gauteng');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'payfast' | 'ozow' | 'capitec' | 'card' | 'eft'>('payfast');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedOrderNum = `LSC-ZA-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNum);
      setIsProcessing(false);
      setStep('confirmation');
      onClearCart();
    }, 1500);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0c0c0e] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        {/* Close Button */}
        {step !== 'confirmation' && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-[#141418] border border-white/10 text-[#8C9BA8] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* STEP 1: DELIVERY & VEHICLE SPEC CONFIRMATION */}
        {step === 'details' && (
          <form onSubmit={handleProceedToPayment} className="space-y-5">
            <div>
              <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-[#8C9BA8] uppercase tracking-widest bg-[#141418] border border-white/10 px-3 py-1 rounded-md mb-2 font-mono">
                <Truck className="w-3.5 h-3.5 text-orange-500" />
                <span>STEP 1 OF 2: SOUTH AFRICAN COURIER DELIVERY</span>
              </div>
              <h3 className="font-heading text-3xl font-bold uppercase text-white tracking-tight">
                DELIVERY DETAILS & SPECIFICATION
              </h3>
              <p className="text-xs text-[#8C9BA8]">
                Your custom tailored order is precision manufactured in Gauteng and shipped via The Courier Guy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#8C9BA8] uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Johan van der Berg"
                  className="w-full bg-[#141418] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8C9BA8] uppercase mb-1">
                  South African Mobile (for Courier SMS updates) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 082 555 1234"
                  className="w-full bg-[#141418] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#8C9BA8] uppercase mb-1">
                Email Address (for Tax Invoice & Tracking) *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. johan@lifestylecovers.co.za"
                className="w-full bg-[#141418] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#8C9BA8] uppercase mb-1">
                Street Address (Physical Delivery) *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 24 Jacaranda Avenue, Farmstead / Complex"
                className="w-full bg-[#141418] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white"
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
                  placeholder="e.g. Bryanston"
                  className="w-full bg-[#141418] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#8C9BA8] uppercase mb-1">
                  Province *
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full bg-[#141418] border border-white/10 rounded-xl px-2 py-2.5 text-xs text-white focus:outline-none"
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
                  placeholder="e.g. 2191"
                  className="w-full bg-[#141418] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>
            </div>

            {/* Total Summary */}
            <div className="p-4 bg-[#141418] rounded-2xl border border-white/10 flex items-center justify-between font-mono">
              <div>
                <div className="text-[11px] text-[#8C9BA8] font-mono">ORDER TOTAL ({cartItems.length} ITEMS)</div>
                <div className="font-heading text-2xl font-bold text-white">
                  R{grandTotal.toLocaleString()}
                </div>
              </div>

              <div className="text-right text-xs text-[#8C9BA8]">
                <span className="text-emerald-400 font-bold">✓ Free Door-to-Door Delivery</span>
                <div>5-7 Days Custom Tailoring</div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold uppercase text-sm tracking-wider flex items-center justify-center space-x-2 shadow transition cursor-pointer"
            >
              <span>CONTINUE TO SECURE PAYMENT</span>
            </button>
          </form>
        )}

        {/* STEP 2: PAYMENT METHOD */}
        {step === 'payment' && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-[#8C9BA8] uppercase tracking-widest bg-[#141418] border border-white/10 px-3 py-1 rounded-md mb-2 font-mono">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>STEP 2 OF 2: SECURE SOUTH AFRICAN GATEWAY</span>
              </div>
              <h3 className="font-heading text-3xl font-bold uppercase text-white tracking-tight">
                SELECT PAYMENT METHOD
              </h3>
              <p className="text-xs text-[#8C9BA8]">
                Encrypted 256-bit secure checkout. Choose your preferred South African payment option.
              </p>
            </div>

            {/* Payment Options */}
            <div className="space-y-3">
              {[
                {
                  id: 'payfast',
                  name: 'PayFast by Network',
                  desc: 'Visa, Mastercard, Debit Card & Instant EFT',
                  badge: 'Instant Confirmation'
                },
                {
                  id: 'ozow',
                  name: 'Ozow Instant EFT',
                  desc: 'FNB, ABSA, Standard Bank, Nedbank, Capitec, Investec',
                  badge: 'Zero Fees'
                },
                {
                  id: 'capitec',
                  name: 'Capitec Pay',
                  desc: 'Pay in 1-click via the Capitec Banking App',
                  badge: 'Fast Mobile'
                },
                {
                  id: 'eft',
                  name: 'Official Pro-Forma Invoice / Direct Bank EFT',
                  desc: 'We issue an official tax invoice with company bank details',
                  badge: 'Business & Fleet'
                }
              ].map((pm) => (
                <div
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id as any)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    paymentMethod === pm.id
                      ? 'bg-[#141418] border-white shadow-md'
                      : 'bg-[#141418]/50 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        paymentMethod === pm.id
                          ? 'border-white bg-white text-black'
                          : 'border-white/20'
                      }`}
                    >
                      {paymentMethod === pm.id && <Check className="w-3.5 h-3.5 font-bold" />}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white uppercase flex items-center gap-2">
                        <span>{pm.name}</span>
                        <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded border border-white/10 font-mono">
                          {pm.badge}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#8C9BA8]">{pm.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary */}
            <div className="p-4 bg-[#141418] rounded-2xl border border-white/10 flex items-center justify-between font-mono">
              <div>
                <div className="text-[11px] text-[#8C9BA8] font-mono">TOTAL PAYABLE</div>
                <div className="font-heading text-2xl font-bold text-white">
                  R{grandTotal.toLocaleString()}
                </div>
              </div>
              <div className="text-right text-xs text-[#8C9BA8]">
                <div>Recipient: <strong className="text-white">{name}</strong></div>
                <div>{suburb}, {province}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="py-4 px-6 rounded-2xl bg-[#141418] hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase cursor-pointer transition"
              >
                Back
              </button>

              <button
                onClick={handleCompleteOrder}
                disabled={isProcessing}
                className="flex-1 py-4 px-6 rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold uppercase text-sm tracking-wider flex items-center justify-center space-x-2 shadow transition cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>AUTHORIZING TRANSACTION...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-orange-600" />
                    <span>PAY R{grandTotal.toLocaleString()} & PLACE ORDER</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMED */}
        {step === 'confirmation' && (
          <div className="py-6 text-center space-y-5 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
              <Check className="w-10 h-10 font-black" />
            </div>

            <div>
              <div className="text-xs font-bold text-orange-400 uppercase font-mono tracking-widest">
                ORDER CONFIRMED & QUEUED FOR TAILORING
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-white mt-1">
                BAIE DANKIE, {name.toUpperCase()}!
              </h3>
              <p className="text-sm text-[#8C9BA8] max-w-md mx-auto mt-2">
                Your custom Lifestyle Seat Covers order has been queued at our Johannesburg production line.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="bg-[#141418] p-5 rounded-2xl border border-white/10 max-w-md mx-auto text-left text-xs space-y-2.5 font-mono">
              <div className="flex justify-between text-[#8C9BA8]">
                <span>Order Reference:</span>
                <span className="font-mono font-bold text-orange-400">{orderNumber}</span>
              </div>
              <div className="flex justify-between text-[#8C9BA8]">
                <span>Confirmation Sent To:</span>
                <span className="font-bold text-white">{email}</span>
              </div>
              <div className="flex justify-between text-[#8C9BA8]">
                <span>Delivery Address:</span>
                <span className="font-bold text-white">{address}, {suburb}, {province}</span>
              </div>
              <div className="flex justify-between text-[#8C9BA8]">
                <span>Estimated Courier Dispatch:</span>
                <span className="font-bold text-emerald-400">5-7 Business Days</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/27118874000?text=Hi%20Lifestyle%20Seat%20Covers,%20I%20just%20placed%20order%20${orderNumber}%20for%20${encodeURIComponent(
                  name
                )}`}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Track on WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="py-3.5 px-8 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Return to Store
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
