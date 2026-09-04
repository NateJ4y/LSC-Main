// Original Workshop Photographs provided by the client
// Compliant with AGENTS.md: original assets only, no AI manipulation, no CSS filters

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

export const WORKSHOP_PHOTOS: WorkshopPhoto[] = [
  {
    id: 'hilux-gd6-red-badge',
    title: 'Toyota Hilux GD-6 Raider & Legend',
    vehicle: 'Toyota Hilux 2.8 / 2.4 GD-6 Double Cab',
    category: 'bakkies',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.09.01 AM.jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.09.01 AM.jpeg',
    embroidery: 'Authentic 2-tone embroidered "GD-6" badge with red numerical accent',
    material: '510g Heavy-Duty Ripstop Canvas + 12mm High-Density Laminated Foam',
    stitchStyle: 'Upper fluted horizontal ribs + lower CNC diamond quilted center',
    highlights: [
      'Official dual-tone "GD-6" custom embroidered badge with red "6"',
      'Side airbag certified break-away seam technology',
      'Full factory seat adjust lever clearance',
      'Non-slip silicone grip lining'
    ],
    description: 'Direct workshop photograph of a bespoke Toyota Hilux GD-6 installation. Built to resist harsh South African sun, red gravel dust, and mud while maintaining factory seat comfort.',
    featured: true
  },
  {
    id: 'lc79-safari-sand',
    title: 'Toyota Land Cruiser 79 Series Single Cab',
    vehicle: 'Toyota Land Cruiser 79 (4.5 V8 / 4.0 V6 / 2.8 GD-6)',
    category: 'bakkies',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.57 AM (2).jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.08.57 AM (2).jpeg',
    embroidery: 'Contrast white header bar with bold embroidered "LAND CRUISER" lettering',
    material: '510g Waterproof Riptech Military Canvas',
    stitchStyle: 'Heavy-gauge double-needle white stitching with sand beige accent bars',
    highlights: [
      'Genuine "LAND CRUISER" backrest badge panel',
      'Tear-proof 510g canvas engineered for Kalahari & bushveld',
      'Reinforced bottom anchor brackets',
      'Full protection against thorny gear, mud, and dust'
    ],
    description: 'Fitted directly in our workshop for a Land Cruiser 79 Single Cab in classic sand-beige exterior. Features a distinct contrast band with "LAND CRUISER" badging.',
    featured: true
  },
  {
    id: 'lc79-exterior-workshop',
    title: 'Land Cruiser 79 Single Cab – Workshop Exterior View',
    vehicle: 'Toyota Land Cruiser 79 4.5 V8 D-4D',
    category: 'bakkies',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.59 AM.jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.08.59 AM.jpeg',
    embroidery: 'High-contrast "LAND CRUISER" embroidery visible through open cabin',
    material: '510g Heavy-Duty Water-Repellent Military Ripstop',
    stitchStyle: 'Double-stitched structural border seams',
    highlights: [
      'Full vehicle profile at the Vereeniging workshop',
      'Integrated roof rack and heavy-duty overlanding setup',
      'Clearance for mechanical seat sliders and 4x4 transfer case levers',
      'UV-bonded thread resistant to African sun'
    ],
    description: 'Full exterior view of a customer Land Cruiser 79 Single Cab receiving custom seat covers at our workshop facility.',
    featured: false
  },
  {
    id: 'jeep-wrangler-arctic',
    title: 'Jeep Wrangler Rubicon & Sahara Bucket Seats',
    vehicle: 'Jeep Wrangler (JK / JL) & Gladiator',
    category: 'suv',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.53 AM.jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.08.53 AM.jpeg',
    embroidery: 'Embroidered "Jeep" in Arctic White across upper backrest',
    material: '600D Waterproof Poly-Canvas with Padded Core',
    stitchStyle: 'Contoured chevron-ribbed backrest & cushion inserts with matching armrest',
    highlights: [
      'Embroidered "Jeep" branding on both front bucket seats',
      'Matching padded center console lid cover included',
      'Full access to manual recline levers and seat sliders',
      'Waterproof barrier against rain, mud, and open-top trail dust'
    ],
    description: 'Precision tailored for Jeep Wrangler bucket seats. Includes matching padded center armrest cover and chevron stitch detailing for trail-rated durability.',
    featured: true
  },
  {
    id: 'jeep-wrangler-door-angle',
    title: 'Jeep Wrangler Cabin Fitment – Driver Side Angle',
    vehicle: 'Jeep Wrangler Unlimited Rubicon',
    category: 'suv',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.54 AM.jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.08.54 AM.jpeg',
    embroidery: 'Arctic White "Jeep" embroidered logo on upper seatback',
    material: 'Heavy-Duty 510g Canvas with Non-Slip Backing',
    stitchStyle: 'Chevron ribbed lumbar contours',
    highlights: [
      'Driver door threshold angle showing smooth contour fit',
      'Factory height adjustment lever unobstructed',
      'Snug fit over high-bolster trail seats',
      'Airbag break-away deployment seams'
    ],
    description: 'Driver-door perspective of the Jeep Wrangler installation showcasing how tightly the canvas wraps around the aggressive factory side bolsters.',
    featured: false
  },
  {
    id: 'amarok-diamond-quilt',
    title: 'Volkswagen Amarok Single & Double Cab',
    vehicle: 'Volkswagen Amarok (V6 TDI / BiTDI Highline & PanAmericana)',
    category: 'bakkies',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.55 AM.jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.08.55 AM.jpeg',
    embroidery: 'High-contrast white "AMAROK" upper block embroidery',
    material: 'Heavy-Duty 510g Canvas with Diamond Quilted Lumbar Inset',
    stitchStyle: 'Double-needle high-contrast diamond stitch quilting',
    highlights: [
      'Bold embroidered "AMAROK" lettering',
      'Full diamond quilt coverage across backrest and seat base',
      'Certified SABS side airbag break-away seams',
      'Tight, wrinkle-free workshop tailored fit'
    ],
    description: 'Heavy-duty diamond quilted seat covers tailored for the Volkswagen Amarok cabin, offering superior foam padding and resale protection.',
    featured: true
  },
  {
    id: 'amarok-driver-door',
    title: 'Volkswagen Amarok – Driver Door Fitment',
    vehicle: 'Volkswagen Amarok V6 TDI',
    category: 'bakkies',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.55 AM (1).jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.08.55 AM (1).jpeg',
    embroidery: 'Embroidered "AMAROK" lettering on headrest/backrest zone',
    material: 'Waterproof 510g Charcoal Canvas',
    stitchStyle: 'Precision diamond quilt insert',
    highlights: [
      'Tight wrap around front seat corner bolster',
      'Seat cushion edge anchoring prevents sliding when entering/exiting',
      'Factory electric seat adjustment switch clearance',
      'Spill-resistant surface for coffee and drinks'
    ],
    description: 'Driver entry angle on the VW Amarok showing the zero-slip base fitment and clean diamond quilting.',
    featured: false
  },
  {
    id: 'toyota-emblem-contour',
    title: 'Toyota Fortuner & Hilux Raider Bucket Seats',
    vehicle: 'Toyota Fortuner / Hilux GD-6 (2016–2025+)',
    category: 'suv',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.55 AM (2).jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.08.55 AM (2).jpeg',
    embroidery: 'Crisp white embroidered Toyota circular emblem',
    material: '510g Black Ripstop Canvas with Non-Slip Grip Underlay',
    stitchStyle: 'Upper horizontal contour band + lower chevron cushion ribbing',
    highlights: [
      'Official circular Toyota emblem embroidery',
      'Ergonomic foam-backed contouring for long-distance road trips',
      'Water-repellent barrier against spilled coffee, water & pet mud',
      'Full clearance for steering wheel & center console access'
    ],
    description: 'Tailored for Toyota Fortuner and Hilux bucket seats with an embroidered circular Toyota logo and contoured support seams.',
    featured: true
  },
  {
    id: 'toyota-emblem-front',
    title: 'Toyota Bucket Seat – Direct Frontal Perspective',
    vehicle: 'Toyota Prado / Fortuner / Hilux',
    category: 'suv',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.59 AM (2).jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.08.59 AM (2).jpeg',
    embroidery: 'Embroidered Toyota triple-oval brand emblem',
    material: 'Heavy-Duty 510g Canvas',
    stitchStyle: 'Contoured horizontal ribs with double-needle borders',
    highlights: [
      'Centered emblem embroidery with high stitch count',
      'Full headrest tailored cover included',
      'Smooth transition between backrest and cushion',
      'Airbag certified side release stitching'
    ],
    description: 'Centered view of the Toyota custom fit seat cover displaying the precision-aligned embroidered brand emblem.',
    featured: false
  },
  {
    id: 'gwm-fleet-optimum',
    title: 'Commercial Fleet – Optimum Solutions (GWM)',
    vehicle: 'GWM Steed / P-Series Commercial Fleet Bakkies',
    category: 'fleet',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.56 AM (1).jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.08.56 AM (1).jpeg',
    embroidery: 'Full multi-color corporate "OPTIMUM" logo on headrests + Red "GWM" embroidery',
    material: 'Heavy-Duty Workhorse 510g Canvas with Red Sport Contrast Stitching',
    stitchStyle: 'Ribbed contour stitching with red high-tensile bonded thread',
    highlights: [
      'Full company corporate branding embroidered on headrests',
      'Red contrast stitching matching corporate vehicle livery',
      'Abrasion-resistant canvas protecting fleet vehicle value',
      'Easy to wipe clean with water and mild detergent'
    ],
    description: 'Custom corporate fleet order for commercial bakkies. Built to withstand daily heavy industrial use, construction site dirt, and heavy worker overalls.',
    featured: true
  },
  {
    id: 'gwm-fleet-driver-angle',
    title: 'Commercial Fleet – Optimum GWM (Driver Angle)',
    vehicle: 'GWM Steed / P-Series Fleet Bakkie',
    category: 'fleet',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.57 AM.jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.08.57 AM.jpeg',
    embroidery: 'Corporate logo on headrest and red model badging on backrest',
    material: '510g Heavy-Duty Commercial Canvas',
    stitchStyle: 'Red sport double-stitched perimeter',
    highlights: [
      'Driver door threshold view showcasing heavy-duty durability',
      'Red accent stitching resistant to fraying',
      'Heavy worker overall abrasion defense',
      'High resale value retention for fleet companies'
    ],
    description: 'Driver seat perspective of the commercial fleet GWM fitment featuring red livery stitching and branded company headrests.',
    featured: false
  },
  {
    id: 'fleet-saxen-lifting',
    title: 'Commercial Fleet – Saxen Lifting Solutions',
    vehicle: 'Isuzu D-Max / Toyota Hilux Commercial Bakkie',
    category: 'fleet',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.08.59 AM (1).jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.08.59 AM (1).jpeg',
    embroidery: 'Full "SAXEN LIFTING SOLUTIONS" custom corporate crest embroidery with crane emblem',
    material: 'Heavy-Duty 510g Canvas with Orange / Gold Accent Stitching',
    stitchStyle: 'Executive diamond quilting with industrial bonded thread',
    highlights: [
      'High-detail multi-color industrial fleet crest embroidery',
      'Contrasting orange/gold diamond quilt pattern',
      'Engineered for heavy crane and rigging service crews',
      'Grease, oil, and workshop grime barrier'
    ],
    description: 'Custom corporate installation for Saxen Lifting Solutions. Combines an executive diamond stitch with high-stitch-count industrial fleet branding.',
    featured: true
  },
  {
    id: 'ranger-red-badging',
    title: 'Ford Ranger – Sport Red "RANGER" Embroidery',
    vehicle: 'Ford Ranger Double / Super / Single Cab',
    category: 'bakkies',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.09.00 AM (1).jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.09.00 AM (1).jpeg',
    embroidery: 'Bold red embroidered "RANGER" lettering with red contrast contours',
    material: '510g Heavy Black Canvas with High-Density Foam',
    stitchStyle: 'Red sport perimeter double-needle stitching',
    highlights: [
      'Sport red "RANGER" lettering across upper seatback',
      'Contoured sport bolsters designed for Ford Ranger seats',
      'Full factory seatbelt receiver and recline knob clearance',
      'Waterproof barrier against sports gear, mud, and rain'
    ],
    description: 'Ford Ranger bucket seats fitted with custom red embroidered "RANGER" branding and matching red sport stitching.',
    featured: true
  },
  {
    id: 'diamond-quilt-macro',
    title: 'Executive Diamond Quilted Cushion – Macro Detail',
    vehicle: 'Universal Custom Tailored Fit',
    category: 'diamond',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.09.01 AM (1).jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.09.01 AM (1).jpeg',
    embroidery: 'White contrast diamond quilting with double outer border',
    material: '510g Canvas Laminated to 12mm High-Density Foam Core',
    stitchStyle: 'CNC diamond quilt pattern with UV-bonded thread',
    highlights: [
      'Plush 12mm foam backing for long-distance lumbar comfort',
      'Precision diamond symmetry stitched with UV-bonded thread',
      'Non-slip silicone underlay preventing cover migration',
      'Water and coffee spill repellent'
    ],
    description: 'Close-up photograph showcasing the dense padding, stitch depth, and craftsmanship of the executive diamond quilt option.',
    featured: true
  },
  {
    id: 'diamond-quilt-side-profile',
    title: 'Diamond Quilted Seat Cover – Side Profile & Controls',
    vehicle: 'Executive Bakkie / SUV Fitment',
    category: 'diamond',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.09.01 AM (2).jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.09.01 AM (2).jpeg',
    embroidery: 'Full diamond quilted lumbar panel',
    material: '510g Canvas with Reinforced Bolster Panels',
    stitchStyle: 'Diamond quilt with heavy-gauge edge binding',
    highlights: [
      'Unobstructed access to seat adjustment levers and switches',
      'Curved side wrap preventing bolster wear when sliding in and out',
      'Tight tension straps hidden under seat frame',
      'Certified airbag breakaway seam'
    ],
    description: 'Side profile showing how the seat cover anchors securely around factory seat adjustment hardware with zero interference.',
    featured: false
  },
  {
    id: 'diamond-quilt-passenger-bucket',
    title: 'Sculpted Diamond Quilt – Passenger Bucket Seat',
    vehicle: 'Double Cab Bakkie / SUV',
    category: 'diamond',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.09.01 AM (3).jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.09.01 AM (3).jpeg',
    embroidery: 'Double-stitched diamond quilt center insert',
    material: '510g Heavy-Duty Ripstop Canvas',
    stitchStyle: 'Curved bolster contouring with diamond center',
    highlights: [
      'Ergonomic bolster padding supporting thighs and torso',
      'Factory headrest fitted smoothly with matching material',
      'Tough canvas surface impervious to tool belts and sharp keys',
      'Fade-resistant under severe African UV exposure'
    ],
    description: 'Passenger seat installation demonstrating the full three-dimensional contouring around the seat cushions.',
    featured: false
  },
  {
    id: 'interior-dual-bucket-view',
    title: 'Double Cab Front Cabin – Dual Bucket Seats',
    vehicle: 'Double Cab 4x4 Bakkie',
    category: 'interior',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.09.02 AM (1).jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.09.02 AM (1).jpeg',
    embroidery: 'Matching diamond quilted center panels on both front seats',
    material: '510g Waterproof Canvas with Laminated Foam',
    stitchStyle: 'Matched dual diamond quilt',
    highlights: [
      'Harmonious cabin appearance with matched driver & passenger covers',
      'Center console and armrest unobstructed',
      'Clean interior fit without loose wrinkles or baggy fabric',
      'Heavy-duty floor protection pairing'
    ],
    description: 'Wide view inside the front cabin showing both driver and passenger seats outfitted with custom diamond quilted canvas covers.',
    featured: false
  },
  {
    id: 'interior-passenger-door-rain',
    title: 'Double Cab Installation – Exterior Door Profile',
    vehicle: 'Double Cab 4x4 Bakkie',
    category: 'interior',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.09.02 AM (2).jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.09.02 AM (2).jpeg',
    embroidery: 'Diamond quilt insert with double perimeter lines',
    material: '510g Heavy Ripstop Canvas',
    stitchStyle: 'Precision diamond grid',
    highlights: [
      'Captured on an authentic rainy workshop morning',
      'Water beads immediately on the exterior-facing canvas edge',
      'Protects original factory fabric/leather from wet clothes and mud',
      'Durable for outdoor enthusiasts and farmers'
    ],
    description: 'View through the open passenger door on a rainy day, highlighting the water-repellent nature of our 510g heavy-duty canvas.',
    featured: false
  },
  {
    id: 'workshop-fitting-live',
    title: 'Vereeniging Workshop Fitment – Driver Perspective',
    vehicle: 'Double Cab Bakkie',
    category: 'interior',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.09.03 AM (2).jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.09.03 AM (2).jpeg',
    embroidery: 'Diamond quilt center panel with double outer border',
    material: '510g Waterproof Canvas',
    stitchStyle: 'Diamond quilt with heavy bolster seams',
    highlights: [
      'Authentic workshop installation setting in Vereeniging, Gauteng',
      'Zero-bunching fit on seat cushion entry edge',
      'Seat adjustment lever cutout tailored with exact millimeter precision',
      'Handcrafted by South African canvas artisans'
    ],
    description: 'Real workshop photograph taken during final fitment inspection at our Assegai Street facility in Vereeniging.',
    featured: true
  },
  {
    id: 'rear-bench-map-pockets',
    title: 'Double Cab Rear Cabin – Bench Cover & Seat-Back Storage',
    vehicle: 'Double Cab Bakkie (Rear 60/40 Split Bench)',
    category: 'interior',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.09.03 AM (3).jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.09.03 AM (3).jpeg',
    embroidery: 'Heavy-gauge double stitching with reinforced pocket openings',
    material: '510g Canvas with Non-Slip Backing',
    stitchStyle: 'Diamond quilt bench inserts + smooth heavy utility seatback pockets',
    highlights: [
      'Front seat backs fully protected with built-in heavy-duty map pockets',
      'Complete rear bench coverage with air vent and seatbelt buckle clearance',
      'Child ISOFIX anchor points fully accessible',
      'Shields rear upholstery from muddy kids boots, pets, and tools'
    ],
    description: 'Full rear cabin view showcasing the 60/40 rear bench seat cover, matching rear headrests, and the rugged storage map pockets on front seat backs.',
    featured: true
  },
  {
    id: 'driver-seat-floor-liner',
    title: 'Driver Seat Diamond Fitment with Heavy-Duty Floor Liner',
    vehicle: 'Double Cab Bakkie',
    category: 'interior',
    rawFilename: 'WhatsApp Image 2026-08-31 at 8.09.03 AM.jpeg',
    localPath: '/images/WhatsApp Image 2026-08-31 at 8.09.03 AM.jpeg',
    embroidery: 'Diamond quilted lumbar support',
    material: '510g Heavy Canvas + Molded All-Weather Floor Tray',
    stitchStyle: 'Diamond quilt cushion and backrest',
    highlights: [
      'Complete interior protection: custom seat cover + deep-dish floor liner',
      'Pedal clearance guaranteed with zero interference',
      'Protects driver footwell carpet from red farm dirt, oil, and gravel',
      'Easy to vacuum and wipe down in minutes'
    ],
    description: 'Driver cockpit showing the diamond quilted seat cover paired with an all-weather high-wall floor tray for comprehensive interior defense.',
    featured: false
  }
];
