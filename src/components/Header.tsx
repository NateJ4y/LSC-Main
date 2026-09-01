import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Phone, 
  ShoppingCart, 
  Menu, 
  X, 
  MessageCircle, 
  Layers, 
  Car, 
  Sparkles,
  Scissors
} from 'lucide-react';
import { CartItem } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenSwatches: () => void;
  onSelectNav: (nav: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  onOpenCart,
  onOpenSwatches,
  onSelectNav,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0c0e]/95 backdrop-blur-md border-b border-white/10 transition-all">
      {/* Top Banner (Sleek dark graphite bar with crisp white typography and subtle orange accents) */}
      <div className="bg-[#141417] text-zinc-300 text-xs font-semibold py-2 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 font-bold text-white uppercase tracking-wider text-[11px]">
              <span className="w-2 h-2 rounded-full bg-orange-500 inline-block animate-pulse"></span>
              <span className="text-sm">🇿🇦</span> HANDCRAFTED IN POLOKWANE, SOUTH AFRICA
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-zinc-300 text-[11px]">
              <Truck className="w-3.5 h-3.5 text-[#8C9BA8]" /> Free Courier Guy Delivery Over R2,500
            </span>
            <span className="hidden md:inline text-zinc-600">•</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-zinc-300 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 24-Month Factory Warranty & SABS Airbag Safe
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-medium">
            <a
              href="https://wa.me/27624679741?text=Hi%20Stealth%20Seat%20Covers,%20I%20need%20a%20quote%20for%20my%20vehicle"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 text-zinc-300 hover:text-white transition"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-current" />
              <span>WhatsApp Workshop</span>
            </a>
            <span className="text-zinc-700 hidden sm:inline">|</span>
            <a
              href="tel:+27624679741"
              className="hidden sm:flex items-center space-x-1.5 text-zinc-300 hover:text-white transition font-mono text-[11px]"
            >
              <Phone className="w-3.5 h-3.5 text-[#8C9BA8]" />
              <span>+27 62 467 9741</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Brand Logo */}
          <div
            onClick={() => onSelectNav('home')}
            className="cursor-pointer group py-2"
          >
            <BrandLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            <button
              onClick={() => onSelectNav('customizer')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                activeSection === 'customizer'
                  ? 'text-white bg-zinc-900 border border-white/20 shadow-sm relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-orange-500'
                  : 'text-[#8C9BA8] hover:text-white hover:bg-zinc-900/60 border border-transparent'
              }`}
            >
              Seat Covers Studio
            </button>

            <button
              onClick={() => onSelectNav('materials')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                activeSection === 'materials'
                  ? 'text-white bg-zinc-900 border border-white/20 shadow-sm relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-orange-500'
                  : 'text-[#8C9BA8] hover:text-white hover:bg-zinc-900/60 border border-transparent'
              }`}
            >
              Fabric Matrix
            </button>

            <button
              onClick={() => onSelectNav('process')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                activeSection === 'process'
                  ? 'text-white bg-zinc-900 border border-white/20 shadow-sm relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-orange-500'
                  : 'text-[#8C9BA8] hover:text-white hover:bg-zinc-900/60 border border-transparent'
              }`}
            >
              The Workshop Process
            </button>

            <button
              onClick={() => onSelectNav('popular-vehicles')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                activeSection === 'popular-vehicles'
                  ? 'text-white bg-zinc-900 border border-white/20 shadow-sm relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-orange-500'
                  : 'text-[#8C9BA8] hover:text-white hover:bg-zinc-900/60 border border-transparent'
              }`}
            >
              Bakkie 4x4 Fits
            </button>

            <button
              onClick={() => onSelectNav('categories')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                activeSection === 'categories'
                  ? 'text-white bg-zinc-900 border border-white/20 shadow-sm relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-orange-500'
                  : 'text-[#8C9BA8] hover:text-white hover:bg-zinc-900/60 border border-transparent'
              }`}
            >
              Dash & Mats
            </button>

            <button
              onClick={() => onSelectNav('installation')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                activeSection === 'installation'
                  ? 'text-white bg-zinc-900 border border-white/20 shadow-sm relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-orange-500'
                  : 'text-[#8C9BA8] hover:text-white hover:bg-zinc-900/60 border border-transparent'
              }`}
            >
              Fitment Guide
            </button>

            <button
              onClick={() => onSelectNav('reviews')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                activeSection === 'reviews'
                  ? 'text-white bg-zinc-900 border border-white/20 shadow-sm relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-orange-500'
                  : 'text-[#8C9BA8] hover:text-white hover:bg-zinc-900/60 border border-transparent'
              }`}
            >
              SA Reviews
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Free Swatch Request Button */}
            <button
              onClick={onOpenSwatches}
              className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 hover:border-orange-500/40 transition shadow-sm cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-orange-500" />
              <span>Free Swatches</span>
            </button>

            {/* Currency Pill */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-zinc-900/90 text-zinc-300 border border-white/10">
              <span className="text-orange-500 font-bold text-[11px]">ZAR</span>
              <span className="text-[#8C9BA8] text-[11px]">Rands</span>
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 hover:border-orange-500/40 transition group cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-zinc-200 group-hover:text-white transition-colors" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-orange-600 text-white text-xs font-black flex items-center justify-center ring-2 ring-[#0c0c0e]">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-zinc-900 text-zinc-300 border border-white/10 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121212] border-b border-white/10 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                onSelectNav('customizer');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-zinc-900 border border-white/10 text-xs font-bold uppercase tracking-wider text-white hover:border-orange-500 flex flex-col gap-1"
            >
              <Car className="w-4 h-4 text-orange-400" />
              <span>Seat Covers Studio</span>
            </button>
            <button
              onClick={() => {
                onSelectNav('materials');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-zinc-900 border border-white/10 text-xs font-bold uppercase tracking-wider text-white hover:border-orange-500 flex flex-col gap-1"
            >
              <Layers className="w-4 h-4 text-orange-400" />
              <span>Fabric Matrix</span>
            </button>
            <button
              onClick={() => {
                onSelectNav('process');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-zinc-900 border border-white/10 text-xs font-bold uppercase tracking-wider text-white hover:border-orange-500 flex flex-col gap-1"
            >
              <Scissors className="w-4 h-4 text-orange-400" />
              <span>Workshop Process</span>
            </button>
            <button
              onClick={() => {
                onSelectNav('popular-vehicles');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-zinc-900 border border-white/10 text-xs font-bold uppercase tracking-wider text-white hover:border-orange-500 flex flex-col gap-1"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Bakkie / 4x4 Finder</span>
            </button>
          </div>

          <div className="flex flex-col space-y-1 text-xs font-semibold text-zinc-300 pt-2 border-t border-white/10">
            <button
              onClick={() => {
                onSelectNav('installation');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 hover:bg-zinc-900 rounded-lg"
            >
              🛠️ Installation & Fitment Guide
            </button>
            <button
              onClick={() => {
                onSelectNav('reviews');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 hover:bg-zinc-900 rounded-lg"
            >
              ⭐ South African Reviews
            </button>
            <button
              onClick={() => {
                onOpenSwatches();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 text-orange-400 font-bold hover:bg-zinc-900 rounded-lg flex items-center justify-between"
            >
              <span>📦 Request Free Fabric Swatch Pack</span>
              <span className="text-[10px] bg-orange-600/20 px-2 py-0.5 rounded text-orange-400 border border-orange-500/30">Free Courier</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
