import React, { useState } from 'react';
import { MessageCircle, X, ShieldCheck, ArrowRight } from 'lucide-react';

export const FloatingWhatsAppCTA: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end space-y-2 font-sans select-none">
      {/* Quick WhatsApp Popover Card */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] max-w-xs bg-[#141418] border border-white/15 rounded-2xl shadow-2xl p-4.5 space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-heading text-xs font-bold uppercase text-white tracking-wider">
                Vereeniging Workshop Online
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-lg transition min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#8C9BA8] leading-relaxed">
            Need an instant seat cover quote or have questions about active lifestyle protection? Chat directly with our Vereeniging team.
          </p>

          <a
            href="https://wa.me/27834455370?text=Hi%20Lifestyle%20Seat%20Covers,%20I%20would%20like%20to%20enquire%20about%20custom%20seat%20covers%20for%20my%20vehicle."
            target="_blank"
            rel="noreferrer"
            className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase text-xs tracking-wider transition flex items-center justify-center space-x-2 shadow cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Open WhatsApp Chat</span>
          </a>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1">
            <span>Direct Line: +27 83 445 5370</span>
            <span className="text-emerald-400">Avg 5m reply</span>
          </div>
        </div>
      )}

      {/* Floating Trigger Button (Hidden on very small screens to avoid clutter with bottom bar, or tapable) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center space-x-2.5 bg-emerald-700 hover:bg-emerald-600 text-white px-3 sm:px-4 py-3 rounded-full shadow-2xl transition duration-200 cursor-pointer border border-emerald-500/30 min-h-[44px]"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold tracking-wide uppercase hidden sm:inline">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
};
