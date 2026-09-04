import { WORKSHOP_PHOTOS, WorkshopPhoto } from '../data/workshopImages';
import { getAuthenticImageUrl } from './userAssetStore';

// Helper to get image URL for any workshop photo
export function getWorkshopImageUrl(rawFilename: string): string {
  const photo = WORKSHOP_PHOTOS.find(p => p.rawFilename === rawFilename);
  if (photo) {
    return getAuthenticImageUrl(photo.rawFilename);
  }
  return getAuthenticImageUrl(rawFilename);
}

// Get photo by ID
export function getWorkshopPhotoById(id: string): WorkshopPhoto | undefined {
  return WORKSHOP_PHOTOS.find(p => p.id === id);
}

// Get photo by vehicle title match
export function getMatchingWorkshopPhoto(vehicleTitle: string): WorkshopPhoto {
  const v = (vehicleTitle || '').toLowerCase();
  
  if (v.includes('hilux') || v.includes('gd-6') || v.includes('gd6')) {
    return WORKSHOP_PHOTOS.find(p => p.id === 'hilux-gd6-red-badge') || WORKSHOP_PHOTOS[0];
  }
  if (v.includes('cruiser') || v.includes('land cruiser') || v.includes('79')) {
    return WORKSHOP_PHOTOS.find(p => p.id === 'lc79-safari-sand') || WORKSHOP_PHOTOS[1];
  }
  if (v.includes('jeep') || v.includes('wrangler') || v.includes('gladiator') || v.includes('rubicon')) {
    return WORKSHOP_PHOTOS.find(p => p.id === 'jeep-wrangler-arctic') || WORKSHOP_PHOTOS[3];
  }
  if (v.includes('amarok') || v.includes('vw') || v.includes('volkswagen')) {
    return WORKSHOP_PHOTOS.find(p => p.id === 'amarok-diamond-quilt') || WORKSHOP_PHOTOS[5];
  }
  if (v.includes('saxen') || v.includes('lifting')) {
    return WORKSHOP_PHOTOS.find(p => p.id === 'fleet-saxen-lifting') || WORKSHOP_PHOTOS[11];
  }
  if (v.includes('fleet') || v.includes('gwm') || v.includes('steed') || v.includes('optimum') || v.includes('isuzu')) {
    return WORKSHOP_PHOTOS.find(p => p.id === 'gwm-fleet-optimum') || WORKSHOP_PHOTOS[9];
  }
  if (v.includes('ranger') || v.includes('ford') || v.includes('wildtrak') || v.includes('everest')) {
    return WORKSHOP_PHOTOS.find(p => p.id === 'ranger-red-badging') || WORKSHOP_PHOTOS[12];
  }
  if (v.includes('fortuner') || v.includes('prado')) {
    return WORKSHOP_PHOTOS.find(p => p.id === 'toyota-emblem-contour') || WORKSHOP_PHOTOS[7];
  }
  if (v.includes('diamond') || v.includes('quilt')) {
    return WORKSHOP_PHOTOS.find(p => p.id === 'diamond-quilt-macro') || WORKSHOP_PHOTOS[13];
  }
  
  return WORKSHOP_PHOTOS[0];
}
