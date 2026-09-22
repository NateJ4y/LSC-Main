// Authentic workshop photographs supplied by Lifestyle Seat Covers.
// The September 2026 design set is the active customer-facing portfolio.

import { WORKSHOP_PHOTOS_2026_09_16 } from './workshopImages20260916';

export interface WorkshopPhoto {
  id: string;
  title: string;
  vehicle: string;
  category: 'bakkies' | 'suv' | 'fleet' | 'diamond' | 'interior';
  rawFilename: string;
  localPath: string;
  embroidery: string;
  material: string;
  stitchStyle: string;
  highlights: string[];
  description: string;
  featured?: boolean;
}

export const WORKSHOP_PHOTOS: WorkshopPhoto[] = WORKSHOP_PHOTOS_2026_09_16;
