/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroVehicleSelector } from './components/HeroVehicleSelector';
import { TrustProofBar } from './components/TrustProofBar';
import { WhySeatCovers } from './components/WhySeatCovers';
import { CustomizerStudio } from './components/CustomizerStudio';
import { RealFitmentGallery } from './components/RealFitmentGallery';
import { MaterialMatrix } from './components/MaterialMatrix';
import { VehicleApplications } from './components/VehicleApplications';
import { CustomisationShowcase } from './components/CustomisationShowcase';
import { FitmentProcess } from './components/FitmentProcess';
import { CommercialFleetSection } from './components/CommercialFleetSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ManufacturingProcessAndDirector } from './components/ManufacturingProcessAndDirector';
import { CompanyHeritageAbout } from './components/CompanyHeritageAbout';
import { CustomerReviews } from './components/CustomerReviews';
import { ComprehensiveQuoteSystem } from './components/ComprehensiveQuoteSystem';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsAppCTA } from './components/FloatingWhatsAppCTA';
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

  const handleSelectMaterial = (materialId: string) => {
    const mat = MATERIALS_DATA.find((m) => m.id === materialId) || MATERIALS_DATA[0];
    setCustomizerState((prev) => ({
      ...prev,
      materialId: mat.id,
      primaryColorId: mat.colors[0]?.id || 'canvas-charcoal'
    }));

    scrollToSection('customizer-studio');
    setActiveNav('customise');
  };

  const handleSelectApplication = (appId: string) => {
    if (appId === '4x4-overland') {
      setCustomizerState((prev) => ({
        ...prev,
        materialId: 'heavy-duty-ripstop-canvas',
        primaryColorId: 'canvas-sand'
      }));
    } else if (appId === 'daily-suv') {
      setCustomizerState((prev) => ({
        ...prev,
        materialId: 'rhino-hide-leatherette',
        primaryColorId: 'rhino-onyx'
      }));
    } else if (appId === 'commercial-fleet') {
      setCustomizerState((prev) => ({
        ...prev,
        materialId: '600d-synthetic-polyester',
        primaryColorId: 'poly-charcoal'
      }));
    } else if (appId === 'luxury-executive') {
      setCustomizerState((prev) => ({
        ...prev,
        materialId: 'rhino-hide-leatherette',
        primaryColorId: 'rhino-cognac'
      }));
    }

    scrollToSection('customizer-studio');
    setActiveNav('customise');
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
    } else if (nav === 'gallery') {
      scrollToSection('gallery');
    } else if (nav === 'fabrics' || nav === 'seat-covers') {
      scrollToSection('fabric-matrix');
    } else if (nav === 'vehicles') {
      scrollToSection('vehicle-applications');
    } else if (nav === 'customise') {
      scrollToSection('customizer-studio');
    } else if (nav === 'reviews') {
      scrollToSection('reviews');
    } else if (nav === 'quote') {
      scrollToSection('quote-builder');
    } else if (nav === 'contact') {
      scrollToSection('contact-us');
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
        {/* 1. Hero & Fast Quote Calculator with Gallery Slide Preview */}
        <HeroVehicleSelector
          vehicle={customizerState.vehicle}
          onVehicleChange={handleVehicleChange}
          onStartConfiguring={() => {
            scrollToSection('customizer-studio');
            setActiveNav('customise');
          }}
          onViewGallery={() => {
            scrollToSection('gallery');
            setActiveNav('gallery');
          }}
        />

        {/* 2. Trust & Proof Bar */}
        <TrustProofBar />

        {/* 3. Simple Material Guide (Canvas, Leatherette, Polyester) */}
        <MaterialMatrix
          onSelectMaterial={handleSelectMaterial}
          onOpenSwatches={() => setIsSwatchesOpen(true)}
        />

        {/* 4. Interactive Seat Customizer & Live Preview */}
        <CustomizerStudio
          customizerState={customizerState}
          onUpdateCustomizer={setCustomizerState}
          onAddToCart={handleAddToCart}
          onOpenSwatches={() => setIsSwatchesOpen(true)}
        />

        {/* 5. Real Vehicle Fitment & Customer Gallery */}
        <RealFitmentGallery
          onStartQuote={(vehSummary) => {
            if (vehSummary) {
              // Try to adapt customizer state or scroll to quote
              const el = document.getElementById('quote-builder');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              setActiveNav('quote');
            }
          }}
        />

        {/* 6. Vehicle Fitments Showcase (Hilux, Ranger, D-Max, Cruiser, etc.) */}
        <VehicleApplications
          onSelectApplication={handleSelectApplication}
          onStartQuote={() => {
            scrollToSection('quote-builder');
            setActiveNav('quote');
          }}
        />

        {/* 7. Real South African Customer Reviews */}
        <CustomerReviews />

        {/* 8. Fast 1-Step Quote System */}
        <ComprehensiveQuoteSystem
          currentVehicle={customizerState.vehicle}
        />

        {/* 9. Vereeniging Workshop, Showroom & Contact */}
        <ContactSection
          onStartQuote={() => {
            scrollToSection('quote-builder');
            setActiveNav('quote');
          }}
        />
      </main>

      {/* Floating Persistent WhatsApp Trigger */}
      <FloatingWhatsAppCTA />

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
