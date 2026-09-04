import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
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
  ArrowRight,
  Sun,
  Moon,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { CartItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { useTheme } from '../context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { key: 'home', label: 'HOME' },
    { key: 'gallery', label: 'GALLERY' },
    { key: 'fabrics', label: 'FABRICS' },
    { key: 'vehicles', label: 'VEHICLES' },
    { key: 'customise', label: 'CUSTOMISE' },
    { key: 'reviews', label: 'REVIEWS' },
    { key: 'contact', label: 'CONTACT' }
  ];

  const handleNavClick = (key: string) => {
    onSelectNav(key);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c0c0e]/95 backdrop-blur-md border-b border-white/10 transition-all font-sans">
      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Official Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group py-1 shrink-0 flex items-center"
          >
            {/* Adaptive Brand Logo for mobile screens */}
            <div className="hidden sm:block">
              <BrandLogo size="md" />
            </div>
            <div className="block sm:hidden">
              <BrandLogo size="sm" />
            </div>
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
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            {/* Free Swatch Request Button (Large Desktop Only) */}
            <button
              onClick={onOpenSwatches}
              className="hidden xl:flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 hover:border-orange-500/40 transition shadow-sm cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-orange-500" />
              <span>Free Swatches</span>
            </button>

            {/* Primary High-Conversion GET A QUOTE CTA (Hidden on tiny mobile to keep space clean) */}
            <button
              onClick={() => onSelectNav('quote')}
              className="hidden md:flex px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase text-xs tracking-wider transition shadow cursor-pointer items-center space-x-1.5 shrink-0"
            >
              <Calculator className="w-3.5 h-3.5 text-orange-600" />
              <span>GET A QUOTE</span>
            </button>

            {/* Dark / Light Mode Switch Button */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 hover:border-orange-500/40 transition-all duration-200 cursor-pointer flex items-center justify-center group relative shadow-sm min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px]"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 sm:p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 hover:border-orange-500/40 transition group cursor-pointer min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-200 group-hover:text-white transition-colors" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-[20px] px-1 rounded-full bg-orange-600 text-white text-[10px] sm:text-xs font-black flex items-center justify-center ring-2 ring-[#0c0c0e]">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 rounded-xl bg-zinc-900 text-zinc-300 border border-white/10 hover:text-white cursor-pointer min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center active:scale-95 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu & Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[96px] z-50 flex flex-col justify-between bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Backdrop Click Dismiss */}
          <div 
            className="absolute inset-0"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content Panel */}
          <div className="relative z-10 w-full bg-[#121216] border-b border-white/10 shadow-2xl max-h-[calc(100vh-100px)] overflow-y-auto px-4 pt-4 pb-8 space-y-4">
            
            {/* Theme & Fast Action Header */}
            <div className="flex items-center justify-between p-3 bg-zinc-900/90 border border-white/10 rounded-2xl">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-zinc-300">
                {theme === 'dark' ? (
                  <>
                    <Moon className="w-4 h-4 text-indigo-400" />
                    <span>Dark Mode Active</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>Light Mode Active</span>
                  </>
                )}
              </div>
              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-orange-500 hover:text-white text-white text-xs font-bold uppercase tracking-wider transition border border-white/10 flex items-center space-x-1.5 cursor-pointer min-h-[36px]"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Switch to Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Switch to Dark</span>
                  </>
                )}
              </button>
            </div>

            {/* Navigation Grid */}
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={`p-3.5 text-left rounded-xl border text-xs font-bold uppercase tracking-wider transition min-h-[48px] flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-white text-black border-white shadow'
                        : 'bg-zinc-900/90 border-white/10 text-white hover:border-orange-500/50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-zinc-500'}`} />
                  </button>
                );
              })}
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <button
                onClick={() => handleNavClick('quote')}
                className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-white text-black font-bold uppercase text-xs tracking-wider flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-orange-600" />
                <span>CALCULATE PRICE / GET QUOTE</span>
              </button>

              <button
                onClick={() => {
                  onOpenSwatches();
                  setMobileMenuOpen(false);
                }}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-zinc-900 text-white font-bold uppercase text-xs tracking-wider flex items-center justify-center space-x-2 border border-white/10 cursor-pointer hover:border-orange-500/40"
              >
                <Layers className="w-4 h-4 text-orange-500" />
                <span>Request Free Fabric Swatches</span>
              </button>
            </div>

            {/* Workshop Helpline / Location Footer */}
            <div className="p-3 bg-black/60 rounded-xl border border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>Vereeniging Workshop</span>
              </div>
              <a
                href="https://wa.me/27834455370"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3 h-3 fill-current" />
                083 445 5370
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
