import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Phone, 
  MapPin, 
  MessageCircle, 
  HeartHandshake,
  Award,
  Clock
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenSwatches: () => void;
  onSelectNav: (nav: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSwatches, onSelectNav }) => {
  return (
    <footer className="w-full bg-[#09090b] text-zinc-400 border-t border-white/10 text-xs">
      {/* Top Value Bento Strip */}
      <div className="border-b border-white/10 py-10 px-4 sm:px-6 lg:px-8 bg-[#101014]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#16161b] border border-white/10 p-4 rounded-2xl flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-white uppercase tracking-tight">100% Laser CAD Fit</h4>
              <p className="text-[11px] text-[#8C9BA8] mt-0.5">Zero generic shelf stock. Mapped to OEM seat geometry for 1,500+ SA models.</p>
            </div>
          </div>

          <div className="bg-[#16161b] border border-white/10 p-4 rounded-2xl flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-white uppercase tracking-tight">Free Courier Guy Delivery</h4>
              <p className="text-[11px] text-[#8C9BA8] mt-0.5">Door-to-door courier service across SA on all orders over R2,500.</p>
            </div>
          </div>

          <div className="bg-[#16161b] border border-white/10 p-4 rounded-2xl flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-white uppercase tracking-tight">24-Month SA Warranty</h4>
              <p className="text-[11px] text-[#8C9BA8] mt-0.5">Comprehensive manufacturer guarantee against material and seam defects.</p>
            </div>
          </div>

          <div className="bg-[#16161b] border border-white/10 p-4 rounded-2xl flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-white uppercase tracking-tight">Airbag Certified Seams</h4>
              <p className="text-[11px] text-[#8C9BA8] mt-0.5">Computer-calibrated side-airbag tear-away release pockets for total safety.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Summary */}
        <div className="lg:col-span-2 space-y-4">
          <BrandLogo size="lg" />

          <p className="text-[#8C9BA8] text-xs leading-relaxed max-w-sm">
            South Africa’s premier custom seat cover manufacturer. Engineering heavy-duty Riptech® 510g canvas, 600D synthetic polyester, and automotive leatherette covers built to endure the African bush, mining fleets, farms, and city commutes.
          </p>

          {/* Workshop Details Badge */}
          <div className="flex flex-col space-y-1 text-xs font-semibold text-zinc-300 bg-[#16161b] p-3 rounded-xl border border-white/10 w-fit font-mono">
            <div className="flex items-center gap-1.5 text-white">
              <span className="text-base">🇿🇦</span>
              <span>Direct-from-Factory Workshop & Showroom</span>
            </div>
            <span className="text-[11px] text-[#8C9BA8]">16 Industria Street, Polokwane, Limpopo</span>
          </div>
        </div>

        {/* Popular Seat Cover Fits */}
        <div className="space-y-3">
          <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
            Popular Bakkies & 4x4s
          </h4>
          <ul className="space-y-2 text-xs text-[#8C9BA8]">
            <li>
              <button onClick={() => onSelectNav('popular-vehicles')} className="hover:text-white transition cursor-pointer">
                Toyota Hilux Double & Extra Cab
              </button>
            </li>
            <li>
              <button onClick={() => onSelectNav('popular-vehicles')} className="hover:text-white transition cursor-pointer">
                Ford Ranger Next-Gen Wildtrak
              </button>
            </li>
            <li>
              <button onClick={() => onSelectNav('popular-vehicles')} className="hover:text-white transition cursor-pointer">
                Land Cruiser 79 / 76 / Prado
              </button>
            </li>
            <li>
              <button onClick={() => onSelectNav('popular-vehicles')} className="hover:text-white transition cursor-pointer">
                Isuzu D-Max V-Cross / LSE
              </button>
            </li>
            <li>
              <button onClick={() => onSelectNav('popular-vehicles')} className="hover:text-white transition cursor-pointer">
                Suzuki Jimny 3-Door & 5-Door
              </button>
            </li>
            <li>
              <button onClick={() => onSelectNav('popular-vehicles')} className="hover:text-white transition cursor-pointer">
                Toyota Fortuner 7-Seater
              </button>
            </li>
          </ul>
        </div>

        {/* Protection Products & Fabrics */}
        <div className="space-y-3">
          <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
            Custom Fabrics & Range
          </h4>
          <ul className="space-y-2 text-xs text-[#8C9BA8]">
            <li>
              <button onClick={() => onSelectNav('materials')} className="hover:text-white transition cursor-pointer">
                Riptech® 510g Ripstop Canvas
              </button>
            </li>
            <li>
              <button onClick={() => onSelectNav('materials')} className="hover:text-white transition cursor-pointer">
                600D Synthetic Polyester
              </button>
            </li>
            <li>
              <button onClick={() => onSelectNav('materials')} className="hover:text-white transition cursor-pointer">
                Automotive Leather & Leatherette
              </button>
            </li>
            <li>
              <button onClick={() => onSelectNav('process')} className="hover:text-white transition cursor-pointer">
                The Workshop Tailoring Process
              </button>
            </li>
            <li>
              <button onClick={() => onSelectNav('categories')} className="hover:text-white transition cursor-pointer">
                Anti-Glare Custom Dash Covers
              </button>
            </li>
            <li>
              <button onClick={onOpenSwatches} className="text-white font-bold hover:text-orange-400 transition cursor-pointer flex items-center gap-1">
                <span>Request Free Swatches</span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block"></span>
              </button>
            </li>
          </ul>
        </div>

        {/* Contact & Workshop */}
        <div className="space-y-3">
          <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
            Showroom & Inquiries
          </h4>
          <div className="space-y-2.5 text-xs text-[#8C9BA8]">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Polokwane Facility:</strong><br />
                16 Industria Street, Polokwane, 0700, Limpopo
              </span>
            </div>
            <div className="flex items-center space-x-2 font-mono text-zinc-300">
              <Clock className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Lead Time: 10–20 Working Days</span>
            </div>
            <div className="flex items-center space-x-2 font-mono text-zinc-300">
              <Phone className="w-4 h-4 text-orange-500 shrink-0" />
              <a href="tel:+27624679741" className="hover:text-white transition">
                +27 62 467 9741
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href="https://wa.me/27624679741?text=Hi%20Stealth%20Seat%20Covers,%20I%20need%20a%20quote"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 font-semibold hover:underline"
              >
                WhatsApp Workshop Line
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Payment Options */}
      <div className="border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-zinc-500 text-[11px] text-center md:text-left">
            © {new Date().getFullYear()} Lifestyle Seat Covers (Pty) Ltd. In association with Stealth Seat Covers South Africa. Handcrafted in Polokwane.
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono text-zinc-400">
            <span className="bg-[#16161b] px-2 py-1 rounded border border-white/10">PayFast</span>
            <span className="bg-[#16161b] px-2 py-1 rounded border border-white/10">Ozow Instant EFT</span>
            <span className="bg-[#16161b] px-2 py-1 rounded border border-white/10">Capitec Pay</span>
            <span className="bg-[#16161b] px-2 py-1 rounded border border-white/10">Visa / Mastercard</span>
            <span className="bg-[#16161b] px-2 py-1 rounded border border-white/10">The Courier Guy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
