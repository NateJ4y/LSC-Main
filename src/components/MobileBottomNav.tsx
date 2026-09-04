import React from 'react';
import { Calculator, Sparkles, ShoppingBag, MessageCircle, Camera, Palette } from 'lucide-react';

interface MobileBottomNavProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartCount,
  onOpenCart,
  onNavigate
}) => {
  return (
    <nav
      aria-label="Mobile Quick Actions"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0e]/95 backdrop-blur-lg border-t border-white/10 lg:hidden px-2 py-2 safe-area-pb select-none shadow-2xl transition-colors"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Instant Quote */}
        <button
          onClick={() => onNavigate('quote-builder')}
          className="flex flex-col items-center justify-center p-1 text-zinc-400 hover:text-white active:scale-95 transition min-w-[56px] min-h-[44px] cursor-pointer"
        >
          <div className="p-1 rounded-xl hover:bg-white/10 transition">
            <Calculator className="w-5 h-5 text-orange-500" />
          </div>
          <span className="text-[10px] font-bold tracking-tight uppercase font-mono mt-0.5">
            Quote
          </span>
        </button>

        {/* Customizer */}
        <button
          onClick={() => onNavigate('customizer-studio')}
          className="flex flex-col items-center justify-center p-1 text-zinc-400 hover:text-white active:scale-95 transition min-w-[56px] min-h-[44px] cursor-pointer"
        >
          <div className="p-1 rounded-xl hover:bg-white/10 transition">
            <Palette className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-[10px] font-bold tracking-tight uppercase font-mono mt-0.5">
            Studio
          </span>
        </button>

        {/* Gallery */}
        <button
          onClick={() => onNavigate('fitment-gallery')}
          className="flex flex-col items-center justify-center p-1 text-zinc-400 hover:text-white active:scale-95 transition min-w-[56px] min-h-[44px] cursor-pointer"
        >
          <div className="p-1 rounded-xl hover:bg-white/10 transition">
            <Camera className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-[10px] font-bold tracking-tight uppercase font-mono mt-0.5">
            Gallery
          </span>
        </button>

        {/* Direct WhatsApp */}
        <a
          href="https://wa.me/27834455370?text=Hi%20Lifestyle%20Seat%20Covers,%20I%20would%20like%20to%20chat%20about%20custom%20seat%20covers%20for%20my%20vehicle."
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center p-1 text-zinc-400 hover:text-white active:scale-95 transition min-w-[56px] min-h-[44px] cursor-pointer"
        >
          <div className="p-1 rounded-xl bg-emerald-700/30 text-emerald-400 hover:bg-emerald-700 hover:text-white transition">
            <MessageCircle className="w-5 h-5 fill-current" />
          </div>
          <span className="text-[10px] font-bold tracking-tight uppercase font-mono mt-0.5 text-emerald-400">
            WhatsApp
          </span>
        </a>

        {/* Shopping Cart with Live Badge */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center p-1 text-zinc-400 hover:text-white active:scale-95 transition min-w-[56px] min-h-[44px] cursor-pointer"
        >
          <div className="relative p-1 rounded-xl hover:bg-white/10 transition">
            <ShoppingBag className="w-5 h-5 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-orange-600 text-white font-bold text-[9px] flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight uppercase font-mono mt-0.5">
            Cart
          </span>
        </button>
      </div>
    </nav>
  );
};
