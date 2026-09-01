import { MaterialSpec } from '../types';

export const MATERIALS_DATA: MaterialSpec[] = [
  {
    id: 'heavy-duty-ripstop-canvas',
    name: 'Riptech® 510g Ripstop Canvas',
    tagline: 'Field-Proven Extreme Tear-Resistant Military Canvas Built for Harsh SA Conditions',
    description: 'Our most legendary South African heavy-duty fabric. Engineered with high-tensile ripstop grid weave, treated with SABS-compliant water repellency, and coated with fluorocarbon dirt protection. Built for extreme mining, agriculture, Karoo 4x4s, safari game viewers, bakkies, dogs, and red Kalahari dust.',
    basePriceZAR: 3950,
    waterproofRating: 9.9,
    uvResistanceRating: 10,
    abrasionRating: 10,
    petProofRating: 10,
    breathabilityRating: 8.5,
    comfortRating: 8.2,
    cleaningEase: 'Hose Down',
    warrantyYears: 2, // 24-Month Stealth Warranty
    idealFor: ['4x4 Overlanding & Bakkies', 'Safari & Game Viewers', 'Farms & Agriculture', 'Mining & Construction Heavy Machinery'],
    colors: [
      { id: 'canvas-charcoal', name: 'Stealth Charcoal Grey', hex: '#2c3035', patternType: 'solid' },
      { id: 'canvas-sand', name: 'Kalahari Sand / Tan', hex: '#b39c7d', patternType: 'solid', badge: 'Safari Favorite' },
      { id: 'canvas-olive', name: 'Bushveld Olive Green', hex: '#484b38', patternType: 'solid' },
      { id: 'canvas-black', name: 'Midnight Black', hex: '#171717', patternType: 'solid' },
      { id: 'canvas-twotone-sand-charcoal', name: 'Two-Tone Sand & Charcoal', hex: '#b39c7d', hexSecondary: '#2c3035', patternType: 'twotone' },
      { id: 'canvas-camo', name: 'Bushveld Woodland Camo', hex: '#3f4534', hexSecondary: '#6e5f4a', patternType: 'camo', badge: 'Hunting Spec' }
    ],
    badgeText: '🇿🇦 Gold Standard 4x4 & Mining Spec',
    isBestseller: true
  },
  {
    id: '600d-synthetic-polyester',
    name: '600D Heavy-Duty Synthetic Polyester',
    tagline: 'Lightweight, Water-Resistant & UV-Guarded — Will Never Dry, Crack or Fade',
    description: 'Engineered specifically for daily drivers, family SUVs, urban commuters, security fleets, courier vans, and light-use commercial vehicles. High-density 600D synthetic weave is liquid-resistant, breathable, UV-stabilized, and won’t peel or perish over time.',
    basePriceZAR: 3450,
    waterproofRating: 9.4,
    uvResistanceRating: 9.8,
    abrasionRating: 9.2,
    petProofRating: 9.0,
    breathabilityRating: 9.0,
    comfortRating: 9.2,
    cleaningEase: 'Wipe Clean',
    warrantyYears: 2, // 24-Month Stealth Warranty
    idealFor: ['Daily Commuters', 'Family SUVs', 'Courier & Delivery Vans', 'Security & Fleet Bakkies'],
    colors: [
      { id: 'poly-charcoal', name: 'Shadow Charcoal', hex: '#2b2d30', patternType: 'solid' },
      { id: 'poly-black', name: 'Stealth Solid Black', hex: '#121212', patternType: 'solid' },
      { id: 'poly-grey-twotone', name: 'Black & Carbon Two-Tone', hex: '#121212', hexSecondary: '#495057', patternType: 'twotone' },
      { id: 'poly-sand-twotone', name: 'Black & Sand Accent', hex: '#121212', hexSecondary: '#a38d72', patternType: 'twotone' }
    ],
    badgeText: 'Best Value Fleet & Family',
    isBestseller: true
  },
  {
    id: 'rhino-hide-leatherette',
    name: 'Automotive-Grade Premium Leather & Leatherette',
    tagline: 'Luxury Look with Indestructible Wipe-Clean Commercial Toughness',
    description: 'Engineered multi-layer synthetic polyurethane and automotive leather embossing. Backed with a 10mm high-density memory foam scrim for plush posture support. Spilled coffee, mud, milk, or beach sand wipes clean in seconds with a damp microfiber cloth.',
    basePriceZAR: 4650,
    waterproofRating: 10,
    uvResistanceRating: 9.5,
    abrasionRating: 9.6,
    petProofRating: 9.2,
    breathabilityRating: 6.8,
    comfortRating: 9.8,
    cleaningEase: 'Wipe Clean',
    warrantyYears: 2, // 24-Month Stealth Warranty
    idealFor: ['Family Road Trips', 'Uber & Executive Shuttles', 'Dogs & Toddlers', 'Sport SUVs & Double Cabs'],
    colors: [
      { id: 'rhino-onyx', name: 'Onyx Black Diamond Stitch', hex: '#151515', patternType: 'quilted' },
      { id: 'rhino-cognac', name: 'Cognac Saddle Brown', hex: '#6e3c1b', patternType: 'solid', badge: 'Luxury Favorite' },
      { id: 'rhino-dark-grey', name: 'Gunmetal Titanium Grey', hex: '#343a40', patternType: 'solid' },
      { id: 'rhino-black-red', name: 'Black with Red GT Stitching', hex: '#151515', hexSecondary: '#c92a2a', patternType: 'twotone' },
      { id: 'rhino-beige', name: 'Sahara Cream / Beige', hex: '#d9cbba', patternType: 'solid' }
    ],
    badgeText: 'Premium Luxury Comfort',
    isBestseller: true
  },
  {
    id: 'tactical-molle-expedition',
    name: 'Tactical MOLLE Overland Canvas',
    tagline: 'Custom Fit Canvas with Integrated Military-Spec Webbing & Storage Pockets',
    description: 'Designed for serious overland explorers, farmers, and gear enthusiasts. Features high-tensile 1000D Ballistic Nylon backings equipped with laser-cut PALS/MOLLE webbing grids. Includes 3 modular utility pouches (First Aid pouch, Multi-tool sheath, Binocular/Drink pouch).',
    basePriceZAR: 4850,
    waterproofRating: 9.6,
    uvResistanceRating: 9.8,
    abrasionRating: 10,
    petProofRating: 9.9,
    breathabilityRating: 7.9,
    comfortRating: 8.2,
    cleaningEase: 'Spot Clean',
    warrantyYears: 2, // 24-Month Stealth Warranty
    idealFor: ['Overland Expeditions', 'Security & Tactical Vehicles', 'Camping Enthusiasts', 'Bakkie Gear Heads'],
    colors: [
      { id: 'molle-black', name: 'Tactical Stealth Black', hex: '#1a1a1a', patternType: 'solid' },
      { id: 'molle-coyote', name: 'Coyote Desert Tan', hex: '#947a57', patternType: 'solid', badge: 'Expedition Favorite' },
      { id: 'molle-ranger-green', name: 'Ranger Field Olive', hex: '#383d31', patternType: 'solid' },
      { id: 'molle-urban-camo', name: 'Night Ops Hex Camo', hex: '#22252a', hexSecondary: '#495057', patternType: 'camo' }
    ],
    badgeText: 'Includes 3 Free MOLLE Pouches'
  },
  {
    id: 'genuine-neoprene-waterproof',
    name: 'Surfer-Grade Wetsuit Neoprene',
    tagline: '100% Waterproof, Thermal Insulating & Shock-Absorbing Stretch Fit',
    description: 'Crafted from genuine CR-grade 3mm automotive neoprene laminated with high-gauge nylon knit. Offers glove-like custom fit contouring without loose wrinkles. Thermal properties prevent scalding hot seats in Durban and freezing morning leather in Dullstroom.',
    basePriceZAR: 4200,
    waterproofRating: 10,
    uvResistanceRating: 9.0,
    abrasionRating: 8.6,
    petProofRating: 8.4,
    breathabilityRating: 7.0,
    comfortRating: 9.5,
    cleaningEase: 'Spot Clean',
    warrantyYears: 2, // 24-Month Stealth Warranty
    idealFor: ['Coastal Surfers & Divers', 'Gym & Mountain Bikers', 'Active Outdoor Lifestyle', 'Hatchbacks & Sport Bakkies'],
    colors: [
      { id: 'neo-black', name: 'Pitch Black', hex: '#111111', patternType: 'solid' },
      { id: 'neo-twotone-black-charcoal', name: 'Black & Carbon Insert', hex: '#111111', hexSecondary: '#3f4448', patternType: 'twotone' },
      { id: 'neo-twotone-black-blue', name: 'Black & Ocean Blue', hex: '#111111', hexSecondary: '#1971c2', patternType: 'twotone' },
      { id: 'neo-twotone-black-red', name: 'Black & Sport Red', hex: '#111111', hexSecondary: '#e03131', patternType: 'twotone' },
      { id: 'neo-twotone-black-sand', name: 'Black & Safari Sand', hex: '#111111', hexSecondary: '#c2a688', patternType: 'twotone' }
    ],
    badgeText: '100% Wetsuit Waterproof'
  },
  {
    id: 'heavy-poly-cotton-twill',
    name: 'Tradeworks Heavy Poly-Cotton Twill',
    tagline: 'Breathable, Machine-Washable, Heavy-Duty Fleet Workhorse Seat Cover',
    description: 'Heavy 380g poly-cotton blend with Scotchgard stain release. Combines the natural cool comfort of cotton with the tear-resistant longevity of high-tenacity polyester. Loved by commercial mining fleets, courier vans, and budget-conscious bakkie owners.',
    basePriceZAR: 2950,
    waterproofRating: 7.2,
    uvResistanceRating: 8.5,
    abrasionRating: 8.8,
    petProofRating: 8.0,
    breathabilityRating: 9.2,
    comfortRating: 8.8,
    cleaningEase: 'Machine Washable',
    warrantyYears: 2, // 24-Month Stealth Warranty
    idealFor: ['Fleet & Work Bakkies', 'Tradesmen & Contractors', 'Affordable Full-Vehicle Protection'],
    colors: [
      { id: 'twill-charcoal', name: 'Industrial Charcoal', hex: '#33373b', patternType: 'solid' },
      { id: 'twill-navy', name: 'Fleet Navy Blue', hex: '#1b263b', patternType: 'solid' },
      { id: 'twill-black', name: 'Solid Black', hex: '#141414', patternType: 'solid' }
    ],
    badgeText: 'Best Value Everyday'
  }
];
