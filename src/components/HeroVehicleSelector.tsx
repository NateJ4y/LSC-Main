import React from 'react';
import { MessageCircle } from 'lucide-react';
import { VehicleSelection } from '../types';
import { HeroGallerySlider } from './HeroGallerySlider';
import { getGeneralWhatsAppUrl } from '../utils/whatsappHelper';

interface HeroVehicleSelectorProps {
  vehicle: VehicleSelection;
  onVehicleChange: (vehicle: VehicleSelection) => void;
  onStartConfiguring: () => void;
  onViewGallery?: () => void;
}

export const HeroVehicleSelector: React.FC<HeroVehicleSelectorProps> = ({
  vehicle,
  onVehicleChange,
  onStartConfiguring,
  onViewGallery
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#09090b]">
      <HeroGallerySlider
        onSelectSlideVehicle={(vehicleName) => {
          onVehicleChange({ ...vehicle, model: vehicleName });
        }}
        onViewGallery={onViewGallery || (() => {})}
        onStartConfiguring={onStartConfiguring}
      />

      <a
        href={getGeneralWhatsAppUrl()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Lifestyle Seat Covers on WhatsApp"
        className="absolute bottom-5 right-5 z-30 hidden items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-600/90 px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-2xl backdrop-blur-md transition hover:bg-emerald-500 sm:flex"
      >
        <MessageCircle className="h-4 w-4 fill-current" />
        WhatsApp
      </a>
    </section>
  );
};
