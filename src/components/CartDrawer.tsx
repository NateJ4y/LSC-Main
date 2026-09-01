import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Tag, 
  MessageCircle,
  CreditCard
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: () => void;
  discountPercentage: number;
  discountFixed: number;
  onApplyCoupon: (code: string) => { success: boolean; message: string };
  activeCoupon: string | null;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  discountPercentage,
  discountFixed,
  onApplyCoupon,
  activeCoupon
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((sum, item) => sum + item.priceZAR * item.quantity, 0);
  const percentDiscountAmount = (rawSubtotal * discountPercentage) / 100;
  const totalDiscount = percentDiscountAmount + discountFixed;
  const subtotal = Math.max(0, rawSubtotal - totalDiscount);
  const freeShippingThreshold = 2500;
  const freeShippingUnlocked = rawSubtotal >= freeShippingThreshold;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - rawSubtotal);
  const shippingCost = freeShippingUnlocked || cartItems.length === 0 ? 0 : 250;
  const grandTotal = subtotal + shippingCost;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const result = onApplyCoupon(couponInput.trim());
    setCouponFeedback(result);
  };

  const whatsappSummary = cartItems
    .map(
      (item) =>
        `• ${item.quantity}x ${item.title} (${item.subtitle}) for ${item.vehicleSummary} = R${item.priceZAR * item.quantity}`
    )
    .join('%0A');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c0c0e] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
          {/* Drawer Header */}
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                <h3 className="font-heading text-xl font-bold uppercase text-white tracking-tight">
                  YOUR SHOPPING CART ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#141418] border border-white/10 text-[#8C9BA8] hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="mt-4 p-3.5 bg-[#141418] rounded-2xl border border-white/10 space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-[#8C9BA8]">
                  <Truck className="w-3.5 h-3.5 text-orange-500" />
                  {freeShippingUnlocked
                    ? '🎉 You qualified for FREE SA Courier Delivery!'
                    : `Add R${freeShippingRemaining.toLocaleString()} more for Free Courier`}
                </span>
                <span className="font-mono text-white font-bold">
                  {Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100))}%
                </span>
              </div>
              <div className="w-full bg-[#0c0c0e] h-2 rounded-full overflow-hidden border border-white/5">
                <div
                  className="bg-orange-500 h-full rounded-full transition-all duration-500 shadow-sm shadow-orange-500/50"
                  style={{
                    width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%`
                  }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="mt-6 space-y-4 max-h-[42vh] overflow-y-auto pr-1">
              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-[#8C9BA8] space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto text-zinc-700" />
                  <p className="text-sm font-semibold text-[#8C9BA8]">Your cart is currently empty.</p>
                  <button
                    onClick={onClose}
                    className="text-xs font-bold text-white underline underline-offset-4 cursor-pointer hover:text-orange-400"
                  >
                    Start Configuring Seat Covers
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-[#141418] rounded-2xl border border-white/10 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[10px] font-bold text-[#8C9BA8] font-mono uppercase">
                          {item.productType}
                        </div>
                        <h4 className="font-heading text-base font-bold text-white uppercase">
                          {item.title}
                        </h4>
                        <p className="text-xs text-zinc-300">{item.subtitle}</p>
                        <p className="text-[11px] text-[#8C9BA8] mt-1 font-mono">
                          Fit: {item.vehicleSummary}
                        </p>
                        {item.customDetails?.embroideryText && (
                          <div className="text-[11px] text-white mt-0.5 font-mono">
                            🧵 Custom Embroidery: "{item.customDetails.embroideryText}"
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-zinc-500 hover:text-red-400 p-1.5 transition cursor-pointer rounded-lg hover:bg-zinc-800"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-2 bg-[#0c0c0e] px-2 py-1 rounded-xl border border-white/10">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="text-[#8C9BA8] hover:text-white p-0.5 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-white px-2 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="text-[#8C9BA8] hover:text-white p-0.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="font-mono font-bold text-white text-base">
                        R{(item.priceZAR * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-4">
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Coupon: LIFESTYLE10"
                    className="w-full bg-[#141418] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs uppercase font-bold text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#141418] hover:bg-white/10 text-xs font-bold text-white rounded-xl transition cursor-pointer border border-white/10"
                >
                  Apply
                </button>
              </form>

              {couponFeedback && (
                <div
                  className={`text-xs p-2 rounded-xl font-mono ${
                    couponFeedback.success
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-red-500/20 text-red-300 border border-red-500/40'
                  }`}
                >
                  {couponFeedback.message}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-300 font-mono">
                <div className="flex justify-between">
                  <span className="text-[#8C9BA8]">Subtotal:</span>
                  <span className="font-mono text-white">R{rawSubtotal.toLocaleString()}</span>
                </div>

                {totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount ({activeCoupon}):</span>
                    <span className="font-mono">-R{totalDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-[#8C9BA8]">Courier Delivery (The Courier Guy):</span>
                  <span className="font-mono text-white">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE</span>
                    ) : (
                      `R${shippingCost}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span className="font-heading uppercase">Grand Total (VAT Incl.):</span>
                  <span className="font-mono text-white">R{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenCheckout();
                  }}
                  className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold uppercase text-sm tracking-wider flex items-center justify-center space-x-2 shadow transition cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-orange-600" />
                  <span>PROCEED TO SECURE CHECKOUT</span>
                </button>

                <a
                  href={`https://wa.me/27118874000?text=Hi%20Lifestyle%20Seat%20Covers!%20I%20would%20like%20to%20place%20an%20order%20for:%0A${whatsappSummary}%0ATotal:%20R${grandTotal}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase text-xs tracking-wider flex items-center justify-center space-x-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>ORDER DIRECTLY ON WHATSAPP</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="text-[10px] text-[#8C9BA8] text-center flex items-center justify-center space-x-2 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>PayFast • Ozow Instant EFT • Capitec Pay • SABS Airbag Safe</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
