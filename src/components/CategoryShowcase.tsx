import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Car, 
  Sun, 
  Sparkles, 
  ShoppingCart, 
  Check, 
  Layers, 
  Droplets,
  Award
} from 'lucide-react';
import { ACCESSORY_PRODUCTS, AccessoryProduct } from '../data/productsData';
import { CartItem, VehicleSelection } from '../types';
import { AssetImage } from './AssetImage';

interface CategoryShowcaseProps {
  vehicle: VehicleSelection;
  onAddToCart: (item: CartItem) => void;
  onGoToCustomizer: () => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  vehicle,
  onAddToCart,
  onGoToCustomizer
}) => {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddAccessory = (prod: AccessoryProduct) => {
    const vehicleSummary = `${vehicle.year || 2024} ${vehicle.make || 'Toyota'} ${vehicle.model || 'Hilux'} (${vehicle.cabOrBody || 'Double Cab'})`;

    const newItem: CartItem = {
      id: `acc-${prod.id}-${Date.now()}`,
      productType: prod.category === 'Dash Covers' ? 'Dash Cover' : prod.category === 'Floor Mats' ? 'Floor Mats' : prod.category === 'Storm Covers' ? 'Storm Cover' : prod.category === 'Tactical & Storage' ? 'MOLLE Organizer' : 'Pet Protector',
      title: prod.name,
      subtitle: prod.tagline,
      vehicleSummary,
      materialName: 'Custom Laser-Fit',
      colorName: 'Standard Fitment Spec',
      rowOption: 'Vehicle Tailored',
      priceZAR: prod.priceZAR,
      quantity: 1
    };

    onAddToCart(newItem);
    setAddedId(prod.id);
    setTimeout(() => setAddedId(null), 2500);
  };

  const vehicleSummary = `${vehicle.year || 2024} ${vehicle.make || 'Toyota'} ${vehicle.model || 'Hilux'}`;

  return (
    <section id="vehicle-accessories" className="w-full bg-[#0c0c0e] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-[#8C9BA8] uppercase tracking-widest bg-[#141418] border border-white/10 px-3 py-1 rounded-md mb-2 font-mono">
              <Sun className="w-3.5 h-3.5 text-orange-500" />
              <span>TOTAL VEHICLE DEFENSE SUITE</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              DASH COVERS, ALL-WEATHER MATS & STORM SHIELDS
            </h2>
            <p className="text-[#8C9BA8] text-sm sm:text-base mt-1">
              Custom molded protection engineered for {vehicleSummary} and South Africa's extreme climate.
            </p>
          </div>

          <button
            onClick={onGoToCustomizer}
            className="py-2.5 px-4 rounded-xl bg-[#141418] hover:bg-white/10 text-white border border-white/10 text-xs font-bold transition flex items-center space-x-2 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <Car className="w-4 h-4 text-orange-500" />
            <span>Customize Seat Covers Instead</span>
          </button>
        </div>

        {/* Product Grid - Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACCESSORY_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-[#141418] border border-white/10 hover:border-white/30 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition duration-300 group"
            >
              {/* Product Visual Top Image with Badge - Contained to element box, click to enlarge */}
              <div className="relative w-full h-52 overflow-hidden bg-[#0c0c0e] flex items-center justify-center p-2 sm:p-3 cursor-pointer">
                <AssetImage
                  filename={prod.image}
                  alt={prod.name}
                  fit="contain"
                  className="w-full h-full group-hover:scale-105 transition duration-300"
                  allowEnlarge={true}
                />

                {prod.badge && (
                  <div className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 shadow-md font-mono">
                    {prod.badge}
                  </div>
                )}

                <div className="absolute bottom-3 right-3 text-[11px] font-mono font-bold bg-black/80 backdrop-blur-md text-[#8C9BA8] px-2.5 py-1 rounded-lg border border-white/10">
                  Fit for <span className="text-white">{vehicle.model || 'Hilux'}</span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-[#8C9BA8] uppercase tracking-wider font-mono">
                    {prod.category}
                  </div>
                  <h3 className="font-heading text-xl font-bold uppercase text-white transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#8C9BA8] leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-1.5 pt-2">
                    {prod.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Add to Cart Button */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] text-[#8C9BA8] uppercase font-mono">Laser Fit Price</div>
                    <div className="font-mono font-bold text-white text-xl">
                      R{prod.priceZAR.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddAccessory(prod)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition cursor-pointer ${
                      addedId === prod.id
                        ? 'bg-emerald-500 text-black'
                        : 'bg-white hover:bg-zinc-200 text-black shadow'
                    }`}
                  >
                    {addedId === prod.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 text-orange-600" />
                        <span>Add to Order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
