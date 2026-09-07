/**
 * Standardized WhatsApp contact & pre-filled message generator
 * Lifestyle Seat Covers (South Africa)
 */

export const LSC_WHATSAPP_NUMBER = '27834455370';

export function getGeneralWhatsAppUrl(): string {
  const msg = "Hi Lifestyle Seat Covers, I'd like to get a quote for custom seat covers.";
  return `https://wa.me/${LSC_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function getVehicleWhatsAppUrl(vehicleName: string): string {
  const cleanVehicle = vehicleName.trim() || 'my vehicle';
  const msg = `Hi Lifestyle Seat Covers, I'd like a quote for my ${cleanVehicle}.`;
  return `https://wa.me/${LSC_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function getQuoteWhatsAppUrl(vehicleText: string, materialName: string): string {
  const cleanVeh = vehicleText.trim() || 'my vehicle';
  const cleanMat = materialName.trim() || 'Seat Covers';
  const msg = `Hi Lifestyle Seat Covers, I would like a formal quote for custom seat covers.\n\n• Vehicle: ${cleanVeh}\n• Material: ${cleanMat}\n\nPlease confirm exact pricing, lead time, and shipping details.`;
  return `https://wa.me/${LSC_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function getFitmentWhatsAppUrl(fitmentOrVehicle: string): string {
  const cleanName = fitmentOrVehicle.trim() || 'the fitment';
  const msg = `Hi Lifestyle Seat Covers, I'd like a quote for the ${cleanName} shown on your website.`;
  return `https://wa.me/${LSC_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function getGalleryInquiryWhatsAppUrl(title: string, vehicle: string): string {
  const cleanTitle = title.trim() || 'custom fitment';
  const cleanVehicle = vehicle.trim();
  const target = cleanVehicle ? `${cleanTitle} for ${cleanVehicle}` : cleanTitle;
  const msg = `Hi Lifestyle Seat Covers, I am looking at the genuine workshop photo of ${target} on your website. Could you provide a quote and lead time?`;
  return `https://wa.me/${LSC_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function getConfigurationWhatsAppUrl(details: {
  vehicle: string;
  material: string;
  color: string;
  stitching?: string;
  extras?: string;
  estimatedPrice?: number;
}): string {
  let msg = `Hi Lifestyle Seat Covers, I would like a quote for my configuration:\n\n` +
    `• Vehicle: ${details.vehicle}\n` +
    `• Material: ${details.material}\n` +
    `• Colour: ${details.color}`;

  if (details.stitching) {
    msg += `\n• Stitching: ${details.stitching}`;
  }
  if (details.extras) {
    msg += `\n• Extras: ${details.extras}`;
  }
  if (details.estimatedPrice) {
    msg += `\n• Estimated Price: From R${details.estimatedPrice.toLocaleString()}`;
  }
  msg += `\n\nPlease confirm final pricing, lead time, and delivery.`;

  return `https://wa.me/${LSC_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function getFleetWhatsAppUrl(companyName?: string, fleetCount?: number): string {
  const company = companyName?.trim() ? ` representing ${companyName.trim()}` : '';
  const count = fleetCount ? ` for approximately ${fleetCount} vehicles` : '';
  const msg = `Hi Lifestyle Seat Covers, I would like to request a commercial fleet quote${company}${count}.`;
  return `https://wa.me/${LSC_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
