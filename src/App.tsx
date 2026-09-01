/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroVehicleSelector } from './components/HeroVehicleSelector';
import { CustomizerStudio } from './components/CustomizerStudio';
import { MaterialMatrix } from './components/MaterialMatrix';
import { CategoryShowcase } from './components/CategoryShowcase';
import { PopularVehicles } from './components/PopularVehicles';
import { InstallationGuides } from './components/InstallationGuides';
import { CustomerReviews } from './components/CustomerReviews';
import { ManufacturingProcessAndDirector } from './components/ManufacturingProcessAndDirector';
import { FreeSwatchModal } from './components/FreeSwatchModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { CustomizerState, CartItem, VehicleSelection } from './types';
import { POPULAR_SA_VEHICLES } from './data/vehicleDatabase';
import { MATERIALS_DATA } from './data/materialsData';

export default function App() {
  // Initial Vehicle Configuration (Defaults to Toyota Hilux Double Cab - SA's favorite)
  const [customizerState, setCustomizerState] = useState<CustomizerState>({
    vehicle: {
      year: 2024,
      make: 'Toyota',
      model: 'Hilux',
      cabOrBody: 'Double Cab',
      submodel: 'Legend RS / Raider GD-6',
      seatRows: 'front_and_rear'
    },
    materialId: 'heavy-duty-ripstop-canvas',
    primaryColorId: 'canvas-charcoal',
    secondaryColorId: 'canvas-sand',
    rowOption: 'front_and_rear',
    includeConsoleCover: true,
    embroideryOption: {
      enabled: true,
      text: 'HILUX 4X4',
      font: 'rugged',
      threadColor: '#d4af37'
    },
    mollePocketsAddon: false,
    waterproofSeatHeaterCutout: false,
    notes: ''
  });

  // Shopping Cart & Modals State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-sample-hilux',
      productType: 'Seat Covers',
      title: '510g Tough Ripstop Canvas Custom Seat Covers',
      subtitle: 'Charcoal Grey • Full Set (Front + Rear 60/40 Bench)',
      vehicleSummary: '2024 Toyota Hilux (Double Cab - Legend RS / Raider GD-6)',
      materialName: '510g Tough Ripstop Canvas',
      colorName: 'Charcoal Grey',
      rowOption: 'Full 2-Row Set',
      priceZAR: 3950,
      quantity: 1,
      customDetails: {
        embroideryText: 'HILUX 4X4',
        consoleCoverIncluded: true
      }
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSwatchesOpen, setIsSwatchesOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  // Coupon State
  const [activeCoupon, setActiveCoupon] = useState<string | null>('LIFESTYLE10');
  const [discountPercentage, setDiscountPercentage] = useState<number>(10);
  const [discountFixed, setDiscountFixed] = useState<number>(0);

  const handleApplyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'LIFESTYLE10') {
      setActiveCoupon('LIFESTYLE10');
      setDiscountPercentage(10);
      setDiscountFixed(0);
      return { success: true, message: '🎉 10% South African launch discount applied!' };
    }
    if (cleanCode === 'BAKKIE15' || cleanCode === 'BAKKIE500') {
      setActiveCoupon('BAKKIE15');
      setDiscountPercentage(0);
      setDiscountFixed(500);
      return { success: true, message: '🎉 R500 Bakkie overland discount applied!' };
    }
    if (cleanCode === 'SAFARI15' || cleanCode === 'OVERLAND') {
      setActiveCoupon('SAFARI15');
      setDiscountPercentage(15);
      setDiscountFixed(0);
      return { success: true, message: '🎉 15% Expedition Overland discount applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try "LIFESTYLE10" or "BAKKIE15".' };
  };

  const handleVehicleChange = (newVeh: VehicleSelection) => {
    setCustomizerState((prev) => ({
      ...prev,
      vehicle: newVeh,
      embroideryOption: {
        ...prev.embroideryOption,
        text: prev.embroideryOption.enabled ? `${newVeh.model.split(' ')[0].toUpperCase()} 4X4` : ''
      }
    }));
  };

  const handleSelectPopular = (pop: typeof POPULAR_SA_VEHICLES[0]) => {
    setCustomizerState((prev) => ({
      ...prev,
      vehicle: {
        year: pop.year,
        make: pop.make,
        model: pop.model,
        cabOrBody: pop.cab,
        submodel: pop.submodel,
        seatRows: 'front_and_rear'
      },
      embroideryOption: {
        ...prev.embroideryOption,
        text: `${pop.model.split(' ')[0].toUpperCase()}`
      }
    }));

    scrollToSection('customizer-studio');
    setActiveNav('customizer');
  };

  const handleSelectMaterial = (materialId: string) => {
    const mat = MATERIALS_DATA.find((m) => m.id === materialId) || MATERIALS_DATA[0];
    setCustomizerState((prev) => ({
      ...prev,
      materialId: mat.id,
      primaryColorId: mat.colors[0]?.id || 'canvas-charcoal'
    }));

    scrollToSection('customizer-studio');
    setActiveNav('customizer');
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.title === newItem.title &&
          i.subtitle === newItem.subtitle &&
          i.vehicleSummary === newItem.vehicleSummary
      );
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [newItem, ...prev];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i)));
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavSelection = (nav: string) => {
    setActiveNav(nav);
    if (nav === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (nav === 'customizer') {
      scrollToSection('customizer-studio');
    } else if (nav === 'materials') {
      scrollToSection('fabric-matrix');
    } else if (nav === 'process') {
      scrollToSection('manufacturing-process');
    } else if (nav === 'categories') {
      scrollToSection('vehicle-accessories');
    } else if (nav === 'popular-vehicles') {
      scrollToSection('popular-bakkies');
    } else if (nav === 'installation') {
      scrollToSection('installation-guide');
    } else if (nav === 'reviews') {
      scrollToSection('reviews');
    }
  };

  // Grand total calculation
  const rawSubtotal = cartItems.reduce((sum, item) => sum + item.priceZAR * item.quantity, 0);
  const percentDiscountAmount = (rawSubtotal * discountPercentage) / 100;
  const totalDiscount = percentDiscountAmount + discountFixed;
  const subtotal = Math.max(0, rawSubtotal - totalDiscount);
  const shippingCost = rawSubtotal >= 2500 || cartItems.length === 0 ? 0 : 250;
  const grandTotal = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white flex flex-col font-sans selection:bg-orange-600 selection:text-white">
      {/* Global Header */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSwatches={() => setIsSwatchesOpen(true)}
        onSelectNav={handleNavSelection}
        activeSection={activeNav}
      />

      <main className="flex-1">
        {/* Coverking-Style Hero Vehicle Selector */}
        <HeroVehicleSelector
          vehicle={customizerState.vehicle}
          onVehicleChange={handleVehicleChange}
          onStartConfiguring={() => {
            scrollToSection('customizer-studio');
            setActiveNav('customizer');
          }}
        />

        {/* The Flagship Interactive Customizer Studio */}
        <CustomizerStudio
          customizerState={customizerState}
          onUpdateCustomizer={setCustomizerState}
          onAddToCart={handleAddToCart}
          onOpenSwatches={() => setIsSwatchesOpen(true)}
        />

        {/* Technical Material Matrix & Fabric Advisor Quiz */}
        <MaterialMatrix
          onSelectMaterial={handleSelectMaterial}
          onOpenSwatches={() => setIsSwatchesOpen(true)}
        />

        {/* Dash Covers, 3D All-Weather Floor Mats & Storm Covers */}
        <CategoryShowcase
          vehicle={customizerState.vehicle}
          onAddToCart={handleAddToCart}
          onGoToCustomizer={() => {
            scrollToSection('customizer-studio');
            setActiveNav('customizer');
          }}
        />

        {/* South Africa's Top Bakkie Fits (Hilux, Ranger, Cruiser, D-Max, Jimny, Fortuner) */}
        <PopularVehicles onSelectPopular={handleSelectPopular} />

        {/* The Stealth Manufacturing Process & Director's Guarantee */}
        <ManufacturingProcessAndDirector
          onOpenSwatches={() => setIsSwatchesOpen(true)}
          onGoToCustomizer={() => {
            scrollToSection('customizer-studio');
            setActiveNav('customizer');
          }}
        />

        {/* 30-Minute DIY Installation Helper */}
        <InstallationGuides />

        {/* Customer Reviews by SA Region */}
        <CustomerReviews />
      </main>

      {/* Shopping Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        discountPercentage={discountPercentage}
        discountFixed={discountFixed}
        onApplyCoupon={handleApplyCoupon}
        activeCoupon={activeCoupon}
      />

      {/* Free Fabric Swatch Sample Pack Request Modal */}
      <FreeSwatchModal
        isOpen={isSwatchesOpen}
        onClose={() => setIsSwatchesOpen(false)}
      />

      {/* Complete South African Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        grandTotal={grandTotal}
        onClearCart={() => setCartItems([])}
      />

      {/* Global Footer */}
      <Footer
        onOpenSwatches={() => setIsSwatchesOpen(true)}
        onSelectNav={handleNavSelection}
      />
    </div>
  );
}
