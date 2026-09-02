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
  Scissors,
  Building2,
  Calculator,
  ArrowRight
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

  const navItems = [
    { key: 'home', label: 'HOME' },
    { key: 'gallery', label: 'GALLERY' },
    { key: 'fabrics', label: 'FABRICS' },
    { key: 'vehicles', label: 'VEHICLES' },
    { key: 'customise', label: 'CUSTOMISE' },
    { key: 'reviews', label: 'REVIEWS' },
    { key: 'contact', label: 'CONTACT' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0c0e]/95 backdrop-blur-md border-b border-white/10 transition-all font-sans">
      {/* Top Banner (Real South African Context & Direct Workshop Access) */}
      <div className="bg-[#141417] text-zinc-300 text-xs font-semibold py-2 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 font-bold text-white uppercase tracking-wider text-[11px]">
              <span className="w-2 h-2 rounded-full bg-orange-500 inline-block animate-pulse" />
              <span className="text-sm">🇿🇦</span> HANDCRAFTED IN VEREENIGING, SOUTH AFRICA
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-zinc-300 text-[11px]">
              <Truck className="w-3.5 h-3.5 text-[#8C9BA8]" /> Door-to-Door Delivery via The Courier Guy
            </span>
            <span className="hidden md:inline text-zinc-600">•</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-zinc-300 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Active Lifestyle Protection
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-medium">
            <a
              href="https://wa.me/27834455370?text=Hi%20Lifestyle%20Seat%20Covers,%20I%20would%20like%20to%20enquire%20about%20custom%20seat%20covers%20for%20my%20vehicle."
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 text-zinc-300 hover:text-white transition"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-current" />
              <span>WhatsApp Us</span>
            </a>
            <span className="text-zinc-700 hidden sm:inline">|</span>
            <a
              href="tel:+27834455370"
              className="hidden sm:flex items-center space-x-1.5 text-zinc-300 hover:text-white transition font-mono text-[11px]"
            >
              <Phone className="w-3.5 h-3.5 text-[#8C9BA8]" />
              <span>+27 83 445 5370</span>
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
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onSelectNav(item.key)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                    isActive
                      ? 'text-white bg-zinc-900 border border-white/20 shadow-sm relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-orange-500'
                      : 'text-[#8C9BA8] hover:text-white hover:bg-zinc-900/60 border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Free Swatch Request Button */}
            <button
              onClick={onOpenSwatches}
              className="hidden xl:flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 hover:border-orange-500/40 transition shadow-sm cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-orange-500" />
              <span>Free Swatches</span>
            </button>

            {/* Primary High-Conversion GET A QUOTE CTA */}
            <button
              onClick={() => onSelectNav('quote')}
              className="px-4 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase text-xs tracking-wider transition shadow cursor-pointer flex items-center space-x-1.5 shrink-0"
            >
              <Calculator className="w-3.5 h-3.5 text-orange-600" />
              <span>GET A QUOTE</span>
            </button>

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
              className="lg:hidden p-2.5 rounded-xl bg-zinc-900 text-zinc-300 border border-white/10 hover:text-white cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121212] border-b border-white/10 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  onSelectNav(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 text-left rounded-xl border text-xs font-bold uppercase tracking-wider transition ${
                  activeSection === item.key
                    ? 'bg-white text-black border-white'
                    : 'bg-zinc-900 border-white/10 text-white hover:border-orange-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                onSelectNav('quote');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 px-4 rounded-xl bg-white text-black font-bold uppercase text-xs tracking-wider flex items-center justify-center space-x-2 shadow cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-orange-600" />
              <span>GET AN INSTANT QUOTE</span>
            </button>

            <button
              onClick={() => {
                onOpenSwatches();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 text-white font-bold uppercase text-xs tracking-wider flex items-center justify-center space-x-2 border border-white/10"
            >
              <Layers className="w-4 h-4 text-orange-500" />
              <span>Request Free Fabric Swatches</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
