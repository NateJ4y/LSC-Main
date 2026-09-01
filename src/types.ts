export type VehicleCategory = 'Bakkie / Ute' | '4x4 & SUV' | 'Passenger Car' | 'Commercial & Fleet';

export interface VehicleModel {
  name: string;
  category: VehicleCategory;
  cabs?: string[];
  submodels: string[];
  years: number[];
  seatsDescription?: string;
  popular?: boolean;
}

export interface VehicleMake {
  id: string;
  name: string;
  models: VehicleModel[];
}

export interface MaterialSpec {
  id: string;
  name: string;
  tagline: string;
  description: string;
  basePriceZAR: number;
  waterproofRating: number; // 1-10
  uvResistanceRating: number; // 1-10 (Crucial for SA sun)
  abrasionRating: number; // 1-10
  petProofRating: number; // 1-10
  breathabilityRating: number; // 1-10
  comfortRating: number; // 1-10
  cleaningEase: 'Machine Washable' | 'Wipe Clean' | 'Spot Clean' | 'Hose Down';
  warrantyYears: number;
  idealFor: string[];
  colors: {
    id: string;
    name: string;
    hex: string;
    hexSecondary?: string;
    patternType?: 'solid' | 'twotone' | 'camo' | 'quilted';
    badge?: string;
  }[];
  badgeText?: string;
  isBestseller?: boolean;
}

export interface VehicleSelection {
  year: number | '';
  make: string;
  model: string;
  cabOrBody: string;
  submodel: string;
  seatRows: 'front_only' | 'front_and_rear' | 'full_7_seater';
}

export interface CustomizerState {
  vehicle: VehicleSelection;
  materialId: string;
  primaryColorId: string;
  secondaryColorId: string;
  rowOption: 'front_only' | 'front_and_rear' | 'full_7_seater';
  includeConsoleCover: boolean;
  embroideryOption: {
    enabled: boolean;
    text: string;
    font: 'block' | 'italic' | 'rugged';
    threadColor: string;
  };
  mollePocketsAddon: boolean;
  waterproofSeatHeaterCutout: boolean;
  notes: string;
}

export interface CartItem {
  id: string;
  productType: 'Seat Covers' | 'Dash Cover' | 'Floor Mats' | 'Storm Cover' | 'MOLLE Organizer' | 'Pet Protector';
  title: string;
  subtitle: string;
  vehicleSummary: string;
  materialName: string;
  colorName: string;
  rowOption: string;
  priceZAR: number;
  quantity: number;
  customDetails?: {
    embroideryText?: string;
    consoleCoverIncluded?: boolean;
    addons?: string[];
  };
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  vehicle: string;
  material: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  usageType: 'Overlanding & 4x4' | 'Farm & Heavy Duty' | 'Family & Kids' | 'Surfing / Coastal' | 'Everyday Commute';
}
