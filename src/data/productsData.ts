import { ReviewItem } from '../types';

export interface AccessoryProduct {
  id: string;
  name: string;
  category: 'Dash Covers' | 'Floor Mats' | 'Storm Covers' | 'Tactical & Storage' | 'Pet Accessories';
  tagline: string;
  description: string;
  priceZAR: number;
  image: string;
  badge?: string;
  features: string[];
}

export const ACCESSORY_PRODUCTS: AccessoryProduct[] = [
  {
    id: 'custom-molded-dash-cover',
    name: 'Precision-Tailored Anti-Glare Dash Cover',
    category: 'Dash Covers',
    tagline: 'Custom laser cut for your exact dashboard — Prevents severe African sun cracking & reflection',
    description: 'Custom-fit to every curve, A/C vent, defroster grille, and HUD screen of your vehicle. Eliminates blinding windshield glare when driving into the low morning sun on the N1/N2/N3 highway and stops dashboard warping.',
    priceZAR: 750,
    image: '/images/WhatsApp Image 2026-08-31 at 8.08.53 AM.jpeg',
    badge: '🇿🇦 UV SunShield 50+',
    features: ['Non-slip silicone backing', 'Airbag deployment certified seams', 'Fade-resistant poly-carpet or suede', 'Defroster & sensor laser cutouts']
  },
  {
    id: '3d-laser-all-weather-mats',
    name: '3D Laser-Scanned Deep-Dish All-Weather Floor Liners',
    category: 'Floor Mats',
    tagline: 'Raised high-wall containment for red mud, beach sand, coffee spills & farm slush',
    description: 'Digitally scanned for your specific bakkie or SUV floor contours. Patented TPE rubber material stays flexible in freezing winter temperatures and will not curl, deform, or emit chemical odors under extreme 40°C heat.',
    priceZAR: 1850,
    image: '/images/WhatsApp Image 2026-08-31 at 8.09.03 AM.jpeg',
    badge: 'Laser-Measured Fit',
    features: ['Raised 45mm containment walls', 'Anti-slip floor retention anchor clips', 'Quick 30-second hose rinse clean', 'Full driver, passenger & rear humps']
  },
  {
    id: 'hail-guard-all-weather-storm-cover',
    name: 'Highveld 6mm Armor Hail-Guard™ Outdoor Vehicle Cover',
    category: 'Storm Covers',
    tagline: 'Multi-layer padded impact protection against Highveld golf-ball hail & UV sun storms',
    description: 'Engineered specifically for Gauteng, Mpumalanga, and Free State thunderstorm seasons. Features a 6mm compressed EVA foam impact barrier laminated inside waterproof 300D Oxford fabric with soft scratch-free cotton lining.',
    priceZAR: 3450,
    image: '/images/WhatsApp Image 2026-08-31 at 8.08.59 AM.jpeg',
    badge: '⚡ Highveld Hail Protected',
    features: ['6mm thick EVA hail absorption core', 'High wind tie-down wheel straps & center buckle', 'Dual driver zipper door access', 'Reflective night safety strips']
  },
  {
    id: 'tactical-molle-seatback-organizer',
    name: 'Expedition Tactical Seat-Back MOLLE Grid Panel',
    category: 'Tactical & Storage',
    tagline: 'Rigid military-grade modular gear organizer with 6 quick-attach tactical pouches',
    description: 'Fastens securely to any driver or front passenger seat back. Keep your two-way radios, 4x4 tire deflators, torches, first aid kit, recovery gloves, and water bottles organized and instantly accessible on rough corrugated roads.',
    priceZAR: 1250,
    image: '/images/WhatsApp Image 2026-08-31 at 8.09.03 AM (3).jpeg',
    badge: 'Overland Essential',
    features: ['Laser cut 1000D Cordura backing', '6 detachable utility pouches included', 'Universal buckle fastening system', 'Velcro patch area for club badges']
  },
  {
    id: 'heavy-duty-waterproof-dog-seat-hammock',
    name: 'Safari Dog Protector Rear Bench Hammock & Door Shields',
    category: 'Pet Accessories',
    tagline: 'Full rear cabin protection for boerboels, ridgebacks, and sandy beach dogs',
    description: 'Heavy duty 600D quilted waterproof oxford with mesh viewing window so your dog can see the front cabin and receive A/C ventilation. Protects rear seats, backrest, floor, and door panels from wet mud, drool, hair, and scratches.',
    priceZAR: 1150,
    image: '/images/WhatsApp Image 2026-08-31 at 8.08.56 AM (1).jpeg',
    badge: 'Ridgeback & Boerboel Proof',
    features: ['Non-slip rubber backing & seat anchors', 'Built-in seatbelt access openings', 'Side flaps protect door panels from claw marks', 'Machine washable & waterproof']
  }
];

export const SA_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Pieter van der Merwe',
    location: 'Polokwane, Limpopo',
    vehicle: 'Toyota Land Cruiser 79 4.5 V8 D-4D',
    material: '510g Tough Ripstop Canvas',
    rating: 5,
    date: '14 Feb 2026',
    title: 'Indestructible in the bushveld and on the farm',
    comment: 'Fitted these before a 3-week hunting trip in the Kalahari. Dust, thorns, wet dogs and diesel spills wiped right off with a wet cloth. Fits so tight people think it is factory upholstery from Toyota.',
    verified: true,
    usageType: 'Farm & Heavy Duty'
  },
  {
    id: 'rev-2',
    name: 'Dr. Jason Khumalo',
    location: 'Sandton, Johannesburg',
    vehicle: 'Ford Ranger Wildtrak 3.0L V6',
    material: 'High-Density Diamond Quilted Canvas',
    rating: 5,
    date: '28 Jan 2026',
    title: 'Executive luxury look with total spill defense',
    comment: 'The diamond stitching gives my Wildtrak an executive feel that matches the digital cockpit. My kids spilled strawberry milkshake on the back seats on day two — cleaned off with zero stain. Worth every cent.',
    verified: true,
    usageType: 'Family & Kids'
  },
  {
    id: 'rev-3',
    name: 'Dirk & Anel Badenhorst',
    location: 'Vereeniging, Gauteng',
    vehicle: 'Toyota Hilux 2.8 GD-6 Legend 4x4',
    material: 'Military Spec 510g Canvas',
    rating: 5,
    date: '03 Feb 2026',
    title: 'Precision fit done right at the Vereeniging factory',
    comment: 'Visited their workshop in Assegai Street for fitment. Done in under 45 minutes while having coffee. You can feel the quality of the South African canvas immediately. Solid, heavy-duty build.',
    verified: true,
    usageType: 'Overlanding & 4x4'
  },
  {
    id: 'rev-4',
    name: 'Marius Engelbrecht',
    location: 'Nelspruit, Mpumalanga',
    vehicle: 'Isuzu D-Max 3.0 Ddi V-Cross',
    material: 'Ripstop Canvas with Red Accent Stitch',
    rating: 5,
    date: '19 Jan 2026',
    title: 'Survived 6 months on forestry and logging tracks',
    comment: 'Timber transport fleet manager. We ordered 12 sets with our company logo embroidered on the headrests. After 6 months of logging site abuse, zero tears or broken seams. Outstanding durability.',
    verified: true,
    usageType: 'Farm & Heavy Duty'
  },
  {
    id: 'rev-5',
    name: 'Sipho Sithole',
    location: 'Ballito, KwaZulu-Natal',
    vehicle: 'Volkswagen Amarok 3.0 TDI V6',
    material: 'Diamond Quilted Canvas',
    rating: 5,
    date: '11 Jan 2026',
    title: 'Saltwater, sand and dogs — completely impervious',
    comment: 'Beach sand and saltwater from surfing used to ruin my leather. These covers protect the seats 100% and look incredibly smart. The tailored side airbag breakaway gives complete peace of mind.',
    verified: true,
    usageType: 'Surfing / Coastal'
  }
];

export const CUSTOMER_REVIEWS = SA_REVIEWS;
