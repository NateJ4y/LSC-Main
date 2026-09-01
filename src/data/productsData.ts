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
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80',
    badge: 'Overland Essential',
    features: ['Laser cut 1000D Cordura backing', '6 detachable utility pouches included', 'Universal buckle fastening system', 'Velcro patch area for club badges']
  },
  {
    id: 'heavy-duty-pet-seat-hammock',
    name: 'Waterproof Overland Pet Seat Hammock & Door Guard',
    category: 'Pet Accessories',
    tagline: 'Full rear cabin protection for boerboels, ridgebacks, and sandy beach dogs',
    description: 'Heavy duty 600D quilted waterproof oxford with mesh viewing window so your dog can see the front cabin and receive A/C ventilation. Protects rear seats, backrest, floor, and door panels from wet mud, drool, hair, and scratches.',
    priceZAR: 1150,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
    badge: 'Ridgeback & Boerboel Proof',
    features: ['Non-slip rubber backing & seat anchors', 'Built-in seatbelt access openings', 'Side flaps protect door panels from claw marks', 'Machine washable & waterproof']
  }
];

export const SA_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Frikkie van der Merwe',
    location: 'Bethlehem, Free State',
    vehicle: 'Toyota Hilux 2.8 GD-6 4x4 Double Cab',
    material: '510g Tough Ripstop Canvas (Kalahari Sand)',
    rating: 5,
    date: '14 August 2026',
    title: 'Indestructible on the farm — best bakkie covers in SA!',
    comment: 'Been farming with cattle and sheep for 25 years. Every normal seat cover rips within 6 months from pocket knives and tools. These Lifestyle canvas covers fit like a second skin with zero movement, and after a year of red dirt and rain, a quick spray with the hose makes them look brand new.',
    verified: true,
    usageType: 'Farm & Heavy Duty'
  },
  {
    id: 'rev-2',
    name: 'Gareth & Claire Sterling',
    location: 'Somerset West, Western Cape',
    vehicle: 'Ford Ranger Next-Gen Wildtrak V6',
    material: 'Tactical MOLLE Expedition Canvas (Stealth Black)',
    rating: 5,
    date: '28 July 2026',
    title: 'Overland trip through Namibia & Kgalagadi tested!',
    comment: 'Just returned from 4,500km through deep Kalahari dunes and gravel tracks. The MOLLE pouches held our tire gauges and sat-phone within reach. Not a single spec of sand made it through to the original leather seats. Airbag seams are cleanly engineered. Worth every single Rand.',
    verified: true,
    usageType: 'Overlanding & 4x4'
  },
  {
    id: 'rev-3',
    name: 'Sipho Ndlovu',
    location: 'Sandton, Johannesburg',
    vehicle: 'Toyota Fortuner 2.8 VX 7-Seater',
    material: 'Rhino-Hide™ Synthetic Leather (Onyx Quilted)',
    rating: 5,
    date: '3 August 2026',
    title: 'Saved my interior from 3 energetic kids and soccer practice',
    comment: 'My kids spill juice, ice cream, and muddy cleats all over the back. The Rhino-Hide leatherette looks even better than the factory leather and wipes completely clean with a wet wipe in seconds. The custom tailoring around the rear 60/40 split and cup holder is millimeter perfect.',
    verified: true,
    usageType: 'Family & Kids'
  },
  {
    id: 'rev-4',
    name: 'Liam Botha',
    location: 'Ballito, KwaZulu-Natal',
    vehicle: 'Suzuki Jimny 5-Door GLX 4x4',
    material: 'Surfer-Grade Wetsuit Neoprene (Black & Ocean Blue)',
    rating: 5,
    date: '19 June 2026',
    title: 'Surfing everyday — completely waterproof and looks epic',
    comment: 'Hop straight in soaking wet after dawn surf sessions. The neoprene absorbs zero water, doesn’t stink or hold mildew, and stays cool even when parked in the North Coast sun. The two-tone blue and black matches the Jimny kinetic yellow exterior perfectly.',
    verified: true,
    usageType: 'Surfing / Coastal'
  },
  {
    id: 'rev-5',
    name: 'Jaco Pretorius',
    location: 'Centurion, Gauteng',
    vehicle: 'Isuzu D-Max 3.0 V-Cross 4x4',
    material: '510g Tough Ripstop Canvas (Charcoal Grey)',
    rating: 5,
    date: '10 July 2026',
    title: 'Courier Guy delivered in 4 days. Incredible craftsmanship.',
    comment: 'Ordered on a Monday, delivered to my gate in Centurion on Friday. Installation took about 35 minutes following the video guide. Tightest fit I have ever seen on an Isuzu — no sagging at all. Even got the embroidered V-Cross logo in red thread.',
    verified: true,
    usageType: 'Overlanding & 4x4'
  },
  {
    id: 'rev-6',
    name: 'Morné du Plessis',
    location: 'Nelspruit, Mpumalanga',
    vehicle: 'Toyota Land Cruiser 79 Double Cab V8',
    material: 'Tactical MOLLE Expedition Canvas (Coyote Tan)',
    rating: 5,
    date: '2 May 2026',
    title: 'Cruiser 79 essential upgrade for Kruger & Mozambique',
    comment: 'If you drive a 79 Cruiser, you know the factory seat foam needs good protection. The heavy canvas and high density padding makes long corrugated gravel roads way more comfortable. 100% recommended to any 4x4 club member.',
    verified: true,
    usageType: 'Overlanding & 4x4'
  }
];
