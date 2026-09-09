import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  Sun,
  Moon,
  ChevronRight,
  Mail,
  MapPin
} from 'lucide-react';
import { CartItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { useTheme } from '../context/ThemeContext';
import { getGeneralWhatsAppUrl } from '../utils/whatsappHelper';

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

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = [
    { key: 'home', label: 'HOME' },
    { 
      key: 'gallery', 
      label: 'GALLERY', 
      hasDropdown: true,
      dropdownType: 'gallery'
    },
    { 
      key: 'fabrics', 
      label: 'FABRICS', 
      hasDropdown: true,
      dropdownType: 'fabrics'
    },
    { 
      key: 'vehicles', 
      label: 'VEHICLES', 
      hasDropdown: true,
      dropdownType: 'vehicles'
    },
    { key: 'customise', label: 'CUSTOMISE' },
    { key: 'reviews', label: 'REVIEWS' },
    { key: 'contact', label: 'CONTACT' }
  ];

  const handleNavClick = (key: string) => {
    onSelectNav(key);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full overflow-x-clip bg-[#0c0c0e]/95 backdrop-blur-md border-b border-white/10 transition-all font-sans">
      {/* Top Banner - South African Workshop Context & Fast Helpline */}
      <div className="bg-[#141417] text-zinc-300 text-xs font-semibold py-1.5 px-3 sm:px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[11px] sm:text-xs">
          {/* Left: Origin & Trust Proof */}
          <div className="flex items-center space-x-2 overflow-hidden truncate">
            <span className="inline-flex items-center gap-1.5 font-bold text-white uppercase tracking-wider text-[10px] sm:text-[11px] shrink-0">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500 inline-block animate-pulse" />
              <span>🇿🇦 VEREENIGING WORKSHOP</span>
            </span>
            <span className="text-zinc-600 hidden xs:inline">•</span>
            <span className="hidden xs:inline-flex items-center gap-1 text-zinc-300 text-[10px] sm:text-[11px] truncate">
              <Truck className="w-3 h-3 text-orange-400 shrink-0" /> Free Courier SA
            </span>
          </div>

          {/* Right: Quick Direct Contact */}
          <div className="flex items-center space-x-3 text-[11px] font-medium shrink-0">
            {/* Top Bar WhatsApp Link */}
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition py-0.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
              <span className="font-semibold">WhatsApp</span>
            </a>
            <span className="text-zinc-700 hidden sm:inline">|</span>
            <a
              href="tel:+27834455370"
              className="hidden sm:flex items-center space-x-1 text-zinc-300 hover:text-white transition font-mono text-[11px]"
            >
              <Phone className="w-3 h-3 text-[#8C9BA8]" />
              <span>083 445 5370</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
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

          {/* Desktop Navigation Links with Apple/LV Style Dropdowns */}
          <nav 
            className="hidden lg:flex items-center space-x-1 xl:space-x-2"
            onMouseLeave={() => setActiveDropdown(null)}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.key;
              const hasDropdown = Boolean(item.hasDropdown);
              const isDropdownOpen = activeDropdown === item.key;

              return (
                <div 
                  key={item.key} 
                  className="relative"
                  onMouseEnter={() => {
                    if (hasDropdown) setActiveDropdown(item.key);
                    else setActiveDropdown(null);
                  }}
                >
                  <button
                    onClick={() => {
                      if (hasDropdown) {
                        setActiveDropdown(isDropdownOpen ? null : item.key);
                      }
                      onSelectNav(item.key);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1 ${
                      isActive
                        ? 'text-white bg-zinc-900 border border-white/20 shadow-sm relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:bg-orange-500'
                        : 'text-[#8C9BA8] hover:text-white hover:bg-zinc-900/60 border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <span className={`text-[9px] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-orange-400' : 'text-zinc-500'}`}>
                        ▼
                      </span>
                    )}
                  </button>

                  {/* Apple / Louis Vuitton Frosted Dropdown Menus */}
                  {hasDropdown && isDropdownOpen && (
                    <div 
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-72 sm:w-80"
                      onMouseEnter={() => setActiveDropdown(item.key)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="bg-[#0e0e13]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 shadow-[0_25px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/10 space-y-3 animate-in fade-in zoom-in-95 duration-200">
                        {item.dropdownType === 'vehicles' && (
                          <>
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-bold">
                                Popular SA Fitments
                              </span>
                              <span className="text-[9px] font-mono text-zinc-500">2024 Patterns</span>
                            </div>
                            <div className="space-y-1">
                              {[
                                { name: 'Toyota Hilux Double Cab', tag: 'SA #1 Bakkie' },
                                { name: 'Ford Ranger / Raptor T6.2', tag: 'Wildtrak Ready' },
                                { name: 'Isuzu D-Max 3.0 Ddi', tag: 'V-Cross / Extended' },
                                { name: 'Toyota Land Cruiser 76 / 79', tag: 'Expedition Spec' },
                                { name: 'Suzuki Jimny 3-Door & 5-Door', tag: 'Rugged Canvas' },
                                { name: 'Commercial & Security Fleets', tag: 'Corporate Logos' }
                              ].map((v, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => {
                                    onSelectNav('vehicles');
                                    setActiveDropdown(null);
                                  }}
                                  className="p-2 rounded-xl hover:bg-white/10 transition cursor-pointer flex items-center justify-between group"
                                >
                                  <span className="text-xs font-medium text-zinc-200 group-hover:text-white">
                                    {v.name}
                                  </span>
                                  <span className="text-[10px] font-mono text-orange-400/80 group-hover:text-orange-400 bg-black/40 px-1.5 py-0.5 rounded">
                                    {v.tag}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        {item.dropdownType === 'fabrics' && (
                          <>
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-bold">
                                Tailored Materials
                              </span>
                              <span className="text-[9px] font-mono text-emerald-400">100% Waterproof</span>
                            </div>
                            <div className="space-y-1.5">
                              {[
                                { title: '510g Tough Ripstop Canvas', desc: 'SABS UV-resistant 100% waterproof', badge: 'Flagship' },
                                { title: 'Diamond Quilted Matrix', desc: 'Prestige double-needle diamond stitch', badge: 'Prestige' },
                                { title: 'Automotive Bovine Leather', desc: 'South African genuine leather hide', badge: 'Luxury' },
                                { title: 'High-Density Neoprene', desc: 'Waterproof surf & ocean composite', badge: 'Comfort' }
                              ].map((f, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => {
                                    onSelectNav('fabrics');
                                    setActiveDropdown(null);
                                  }}
                                  className="p-2 rounded-xl hover:bg-white/10 transition cursor-pointer group flex items-center justify-between"
                                >
                                  <div>
                                    <div className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                                      {f.title}
                                    </div>
                                    <div className="text-[10px] text-zinc-400">
                                      {f.desc}
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full shrink-0 ml-2">
                                    {f.badge}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        {item.dropdownType === 'gallery' && (
                          <>
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-bold">
                                Real Workshop Photos
                              </span>
                              <span className="text-[9px] font-mono text-zinc-500">21 Fitments</span>
                            </div>
                            <div className="space-y-1">
                              {[
                                { name: '4x4 Bakkies & Cruisers', count: '9 Photos' },
                                { name: 'SUVs & Jeep Wranglers', count: '4 Photos' },
                                { name: 'Commercial Fleets & Logos', count: '3 Photos' },
                                { name: 'Diamond Quilted Luxury', count: '3 Photos' },
                                { name: 'Full Cabin & Rear Views', count: '2 Photos' }
                              ].map((g, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => {
                                    onSelectNav('gallery');
                                    setActiveDropdown(null);
                                  }}
                                  className="p-2 rounded-xl hover:bg-white/10 transition cursor-pointer flex items-center justify-between group"
                                >
                                  <span className="text-xs font-medium text-zinc-200 group-hover:text-white">
                                    {g.name}
                                  </span>
                                  <span className="text-[10px] font-mono text-zinc-400 group-hover:text-white">
                                    {g.count}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-zinc-500">Custom Tailored SA</span>
                          <button
                            onClick={() => {
                              onSelectNav(item.key);
                              setActiveDropdown(null);
                            }}
                            className="text-orange-400 hover:text-orange-300 font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                          >
                            <span>Explore All</span>
                            <span>→</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex shrink-0 items-center space-x-1.5 sm:space-x-2.5">
            {/* Free Swatch Request Button (Large Desktop Only) */}
            <button
              onClick={onOpenSwatches}
              className="hidden xl:flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 hover:border-orange-500/40 transition shadow-sm cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-orange-500" />
              <span>Free Swatches</span>
            </button>

            {/* Direct WhatsApp Quick Button (Mobile & Tablet) */}
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden sm:flex lg:hidden items-center justify-center w-11 h-11 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>

            {/* High-Conversion GET A QUOTE CTA (Visible on both Mobile and Desktop with 44px min touch target) */}
            <button
              onClick={() => onSelectNav('quote')}
              className="hidden sm:flex px-3 sm:px-4 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase text-[11px] sm:text-xs tracking-wider transition shadow cursor-pointer items-center space-x-1.5 shrink-0 min-h-[44px]"
            >
              <Calculator className="w-3.5 h-3.5 text-orange-600" />
              <span>GET A QUOTE</span>
            </button>

            {/* Desktop Theme Switch Button */}
            <button
              onClick={toggleTheme}
              className="hidden lg:flex p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 hover:border-orange-500/40 transition-all duration-200 cursor-pointer items-center justify-center group relative shadow-sm min-w-[44px] min-h-[44px]"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Desktop Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="hidden lg:flex relative p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 hover:border-orange-500/40 transition group cursor-pointer min-w-[44px] min-h-[44px] items-center justify-center"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-zinc-200 group-hover:text-white transition-colors" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-orange-600 text-white text-xs font-black flex items-center justify-center ring-2 ring-[#0c0c0e]">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-zinc-900 text-zinc-300 border border-white/10 hover:text-white cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95 transition"
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
                <span>REQUEST A CUSTOM QUOTE</span>
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
                href={getGeneralWhatsAppUrl()}
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
