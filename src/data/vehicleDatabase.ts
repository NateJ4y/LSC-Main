import { VehicleMake } from '../types';

export const VEHICLE_MAKES: VehicleMake[] = [
  {
    id: 'toyota',
    name: 'Toyota',
    models: [
      {
        name: 'Hilux',
        category: 'Bakkie / Ute',
        cabs: ['Double Cab', 'Xtra / Extended Cab', 'Single Cab'],
        submodels: ['Legend RS / Legend 50', 'Raider GD-6', 'GR-Sport', 'SRX / SR', 'Legend 45 / Heritage'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2005],
        seatsDescription: 'Standard Bucket Fronts + 60/40 Split or Bench Rear',
        popular: true
      },
      {
        name: 'Land Cruiser 79 / 70 Series',
        category: '4x4 & SUV',
        cabs: ['Double Cab', 'Single Cab (Bakkie)', '76 Station Wagon', '78 Troop Carrier'],
        submodels: ['4.5L V8 D-4D', '2.8L GD-6 Auto/Manual', '4.0L V6 Petrol', '4.2L 1HZ Diesel', 'Namib Edition'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2016, 2014, 2010, 2007, 2000, 1995],
        seatsDescription: 'High-back heavy-duty bucket seats with heavy underseat anchor brackets',
        popular: true
      },
      {
        name: 'Land Cruiser Prado',
        category: '4x4 & SUV',
        cabs: ['5-Door SUV (250 Series New)', '5-Door SUV (150 Series)'],
        submodels: ['First Edition / VX-R', 'TX / VX', 'Kakadu / Altitude'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018, 2015, 2010],
        seatsDescription: '7-Seater or 5-Seater configurations with power fold third row',
        popular: true
      },
      {
        name: 'Fortuner',
        category: '4x4 & SUV',
        cabs: ['7-Seater SUV'],
        submodels: ['2.8 GD-6 VX / 4x4', '2.4 GD-6 RB', 'Epic / Epic Black', 'GR-Sport', 'Heritage Edition'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2010],
        seatsDescription: 'Front Buckets + 60/40 Split Slide Rear + 3rd Row Side-Fold jump seats',
        popular: true
      },
      {
        name: 'Land Cruiser 300 / 200',
        category: '4x4 & SUV',
        cabs: ['Full Size 4x4 SUV'],
        submodels: ['LC300 GR-Sport', 'LC300 ZX', 'LC300 GX-R', 'LC200 VX'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018, 2015, 2010],
        seatsDescription: 'Luxury contoured multi-way electric seats with integrated cooling vents'
      },
      {
        name: 'Corolla Cross',
        category: '4x4 & SUV',
        cabs: ['5-Door Compact SUV'],
        submodels: ['GR-Sport', 'XR Hybrid / Petrol', 'XS', 'Xi'],
        years: [2026, 2025, 2024, 2023, 2022, 2021],
        seatsDescription: 'Front sport buckets + 60/40 split folding rear bench'
      },
      {
        name: 'RAV4',
        category: '4x4 & SUV',
        cabs: ['5-Door SUV'],
        submodels: ['GX-R AWD', 'VX AWD / Hybrid', 'GX'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2015]
      },
      {
        name: 'Quantum / HiAce',
        category: 'Commercial & Fleet',
        cabs: ['14-Seater Taxi / Commuter', '6-Seater Crew Cab', 'Panel Van', 'VX Luxury 9-Seater'],
        submodels: ['2.8 GD-6 GL', '2.5 D-4D', 'VX VIP Cruiser'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2015, 2010]
      },
      {
        name: 'Starlet / Urban Cruiser',
        category: 'Passenger Car',
        cabs: ['5-Door Hatch / Crossover'],
        submodels: ['XR', 'XS', 'Xi'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020]
      }
    ]
  },
  {
    id: 'ford',
    name: 'Ford',
    models: [
      {
        name: 'Ranger (Next-Gen & T6)',
        category: 'Bakkie / Ute',
        cabs: ['Double Cab', 'SuperCab (Extended)', 'Single Cab'],
        submodels: ['Raptor 3.0L V6 EcoBoost / 2.0 Bi-Turbo', 'Wildtrak 3.0L V6 / 2.0 Bi-Turbo', 'Tremor / Wildtrak X', 'XLT 2.0 Single/Bi-Turbo', 'XL Workhorse'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012],
        seatsDescription: 'High bolster sport seats or work bench with fold-up rear cushion storage',
        popular: true
      },
      {
        name: 'Everest (Next-Gen & Previous)',
        category: '4x4 & SUV',
        cabs: ['7-Seater 4x4 SUV'],
        submodels: ['Platinum 3.0L V6', 'Wildtrak 3.0L V6', 'Sport 2.0 Bi-Turbo', 'XLT 4x4 / 4x2'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2016],
        seatsDescription: 'Full 3-row layout with child ISOFIX anchor access points'
      },
      {
        name: 'EcoSport',
        category: 'Passenger Car',
        cabs: ['Compact Crossover'],
        submodels: ['Titanium', 'Trend', 'Ambiente'],
        years: [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2016, 2014]
      }
    ]
  },
  {
    id: 'isuzu',
    name: 'Isuzu',
    models: [
      {
        name: 'D-Max (Current & KB Series)',
        category: 'Bakkie / Ute',
        cabs: ['Double Cab', 'Extended Cab', 'Single Cab'],
        submodels: ['V-Cross 3.0 Ddi 4x4', 'LSE 3.0 / 1.9 Ddi', 'LS 1.9 Ddi', 'L / Workman Spec', 'KB 300 / KB 250 Heritage'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2010],
        seatsDescription: 'Rugged high-bolster front seats with side airbags & 60/40 rear seat bench',
        popular: true
      },
      {
        name: 'mu-X',
        category: '4x4 & SUV',
        cabs: ['7-Seater SUV'],
        submodels: ['3.0 Ddi Onyx 4x4', '3.0 Ddi LSE', '1.9 Ddi LS'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018]
      }
    ]
  },
  {
    id: 'volkswagen',
    name: 'Volkswagen',
    models: [
      {
        name: 'Amarok (Next-Gen & V6 Heritage)',
        category: 'Bakkie / Ute',
        cabs: ['Double Cab', 'Single Cab'],
        submodels: ['Aventura 3.0 V6 TDI', 'PanAmericana 3.0 V6 TDI Offroad', 'Style 2.0 Bi-TDI', 'Life 2.0 TDI', 'Base Workhorse', 'Canyon / Highline (Gen 1)'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2016, 2014, 2012],
        seatsDescription: 'ErgoComfort contoured seats with integrated electric lumbar & side airbags',
        popular: true
      },
      {
        name: 'Polo / Polo Vivo',
        category: 'Passenger Car',
        cabs: ['5-Door Hatchback'],
        submodels: ['Polo GTI 2.0 TSI', 'Polo R-Line', 'Polo Life / Style', 'Polo Vivo GT', 'Polo Vivo Trendline / Comfortline'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2016, 2014, 2010],
        seatsDescription: 'Front sport buckets + folding rear bench'
      },
      {
        name: 'Tiguan / Tiguan Allspace',
        category: '4x4 & SUV',
        cabs: ['5-Seater SUV', '7-Seater Allspace'],
        submodels: ['R-Line 4Motion', 'Elegance', 'Life', 'Tiguan R'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018, 2016]
      },
      {
        name: 'Transporter / Kombi / Caravelle (T6.1 / T6)',
        category: 'Commercial & Fleet',
        cabs: ['Crew Bus 5-Seater', 'Kombi 8-Seater', 'Caravelle Executive 7-Seater', 'Panel Van'],
        submodels: ['2.0 BiTDI 4Motion', '2.0 TDI Trendline', 'California Beach Edition'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018, 2016]
      }
    ]
  },
  {
    id: 'suzuki',
    name: 'Suzuki',
    models: [
      {
        name: 'Jimny (3-Door & 5-Door)',
        category: '4x4 & SUV',
        cabs: ['5-Door Long Wheelbase (JC74)', '3-Door Classic (JB74)', 'JB43 Classic Generation'],
        submodels: ['GLX 4x4 Manual/Auto', 'GL 4x4', 'Heritage Overland Edition', 'Rhino Edition'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2016, 2012, 2008],
        seatsDescription: 'Compact lightweight front buckets + 50/50 split fold-flat rear seats',
        popular: true
      },
      {
        name: 'Swift',
        category: 'Passenger Car',
        cabs: ['5-Door Hatchback'],
        submodels: ['Swift Sport 1.4T Boosterjet', 'GLX', 'GL', 'GA'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018]
      },
      {
        name: 'Grand Vitara / Fronx',
        category: '4x4 & SUV',
        cabs: ['Compact Crossover / SUV'],
        submodels: ['GLX AllGrip Hybrid', 'GLX 1.5', 'GL 1.5'],
        years: [2026, 2025, 2024, 2023, 2022]
      }
    ]
  },
  {
    id: 'nissan',
    name: 'Nissan',
    models: [
      {
        name: 'Navara',
        category: 'Bakkie / Ute',
        cabs: ['Double Cab', 'Single Cab', 'King Cab'],
        submodels: ['PRO-4X 4x4', 'PRO-2X', 'LE 4x4', 'SE Plus', 'XE Workhorse'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2016],
        seatsDescription: 'Zero Gravity comfort front seats + full rear bench with anchor clips',
        popular: true
      },
      {
        name: 'Patrol (Y62)',
        category: '4x4 & SUV',
        cabs: ['Full Size 4x4 SUV (7-Seater)'],
        submodels: ['5.6L V8 LE Premium', 'Warrior Edition', 'Ti'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018, 2015]
      },
      {
        name: 'NP200 (Half-Ton Bakkie Legend)',
        category: 'Bakkie / Ute',
        cabs: ['Single Cab (Half-Ton)'],
        submodels: ['1.6 8V ICE Edition', '1.5 dCi High Spec', 'Safety Pack Standard'],
        years: [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2016, 2014, 2010],
        popular: true
      },
      {
        name: 'Magnite',
        category: 'Passenger Car',
        cabs: ['Compact SUV'],
        submodels: ['Acenta Plus Turbo', 'Acenta', 'Visia'],
        years: [2026, 2025, 2024, 2023, 2022, 2021]
      }
    ]
  },
  {
    id: 'land-rover',
    name: 'Land Rover',
    models: [
      {
        name: 'Defender (L663 New & Classic)',
        category: '4x4 & SUV',
        cabs: ['110 (5-Door / 7-Seater)', '90 (3-Door)', '130 (8-Seater Extended)', 'Defender Classic TD5 / Puma TDI'],
        submodels: ['V8 525PS', 'X-Dynamic HSE D300', 'X D300', 'SE / S Spec', 'Trophy Overland Edition'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2015, 2012, 2008, 2000, 1995],
        popular: true
      },
      {
        name: 'Discovery 4 / 5',
        category: '4x4 & SUV',
        cabs: ['7-Seater 4x4 SUV'],
        submodels: ['D300 Dynamic HSE', 'SDV6 Landmark', 'HSE Luxury'],
        years: [2026, 2025, 2024, 2023, 2022, 2020, 2018, 2016, 2014, 2012]
      }
    ]
  },
  {
    id: 'mahindra',
    name: 'Mahindra',
    models: [
      {
        name: 'Pik-Up / Karoo',
        category: 'Bakkie / Ute',
        cabs: ['Double Cab', 'Single Cab'],
        submodels: ['Karoo Dusk / Dawn / Storm 4x4', 'S11 4x4 Auto', 'S6 4x4 / 4x2 Workhorse'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018],
        popular: true
      },
      {
        name: 'Scorpio-N / XUV700',
        category: '4x4 & SUV',
        cabs: ['7-Seater SUV', '6-Seater Captain Chairs'],
        submodels: ['Z8L 4xplor 4WD', 'Z8', 'AX7 L AWD'],
        years: [2026, 2025, 2024, 2023, 2022]
      }
    ]
  },
  {
    id: 'gwm-haval',
    name: 'GWM / Haval',
    models: [
      {
        name: 'P-Series / P500 Bakkie',
        category: 'Bakkie / Ute',
        cabs: ['Double Cab', 'Commercial Single Cab'],
        submodels: ['LT 4x4 High Spec', 'LS 4x4', 'SX Commercial', 'P500 Ultra Luxury Hybrid'],
        years: [2026, 2025, 2024, 2023, 2022, 2021],
        popular: true
      },
      {
        name: 'Tank 300 / Tank 500',
        category: '4x4 & SUV',
        cabs: ['5-Seater Heavy 4x4', '7-Seater Luxury 4x4'],
        submodels: ['2.0T HEV 4x4 Super Luxury', 'Ultra Luxury 4x4'],
        years: [2026, 2025, 2024]
      },
      {
        name: 'Haval Jolion / H6',
        category: '4x4 & SUV',
        cabs: ['5-Door Compact / Medium SUV'],
        submodels: ['H6 GT 2.0T 4WD', 'H6 HEV', 'Jolion Pro S', 'Jolion Luxury'],
        years: [2026, 2025, 2024, 2023, 2022, 2021]
      }
    ]
  },
  {
    id: 'mitsubishi',
    name: 'Mitsubishi',
    models: [
      {
        name: 'Triton',
        category: 'Bakkie / Ute',
        cabs: ['Double Cab (All-New & Previous)', 'Single Cab Club Cab'],
        submodels: ['Athlete 4x4 Super Select II', 'Heritage 4x4', 'GLX 4x4', 'Shogun Edition'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018, 2016],
        popular: true
      },
      {
        name: 'Pajero Sport',
        category: '4x4 & SUV',
        cabs: ['7-Seater 4x4 SUV'],
        submodels: ['2.4 D4 Exceed 4x4', 'Aspire 4x4', 'Shogun'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018]
      }
    ]
  },
  {
    id: 'hyundai',
    name: 'Hyundai',
    models: [
      {
        name: 'Tucson / Creta',
        category: '4x4 & SUV',
        cabs: ['5-Door SUV'],
        submodels: ['N-Line 2.0D AWD', 'Executive', 'Premium'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018]
      },
      {
        name: 'H100 Bakkie / Staria',
        category: 'Commercial & Fleet',
        cabs: ['Single Cab Dropside Bakkie', 'Multicab 5-Seater', 'Staria Luxury 9/11 Seater'],
        submodels: ['2.6D Dropside Deck', 'Staria Executive', 'Staria Luxury'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018, 2015]
      }
    ]
  },
  {
    id: 'jeep',
    name: 'Jeep',
    models: [
      {
        name: 'Wrangler & Gladiator',
        category: '4x4 & SUV',
        cabs: ['Unlimited 4-Door (JL)', '2-Door (JL)', 'Gladiator Double Cab Rubicon', 'Wrangler JK Series'],
        submodels: ['Rubicon 3.6L Rock-Trac', 'Sahara 3.6L V6', 'Sport S'],
        years: [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2018, 2015, 2012, 2008],
        popular: true
      }
    ]
  }
];

export const POPULAR_SA_VEHICLES = [
  {
    make: 'Toyota',
    model: 'Hilux',
    cab: 'Double Cab',
    submodel: 'Legend RS / Raider GD-6',
    year: 2024,
    badge: 'SA #1 Bestselling Bakkie',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    popularMaterial: '510g Tough Ripstop Canvas'
  },
  {
    make: 'Ford',
    model: 'Ranger (Next-Gen & T6)',
    cab: 'Double Cab',
    submodel: 'Wildtrak 3.0L V6 / 2.0 Bi-Turbo',
    year: 2024,
    badge: 'Top Overland Spec',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=600&q=80',
    popularMaterial: 'Tactical MOLLE Expedition Canvas'
  },
  {
    make: 'Toyota',
    model: 'Land Cruiser 79 / 70 Series',
    cab: 'Double Cab',
    submodel: '4.5L V8 D-4D / 2.8 GD-6',
    year: 2024,
    badge: 'Bushveld Legend 4x4',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80',
    popularMaterial: 'Heavy Duty Safari Canvas'
  },
  {
    make: 'Isuzu',
    model: 'D-Max (Current & KB Series)',
    cab: 'Double Cab',
    submodel: 'V-Cross 3.0 Ddi 4x4',
    year: 2024,
    badge: 'Highveld Farm & Fleet Tough',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    popularMaterial: 'Rhino-Hide™ Heavy Duty Leatherette'
  },
  {
    make: 'Suzuki',
    model: 'Jimny (3-Door & 5-Door)',
    cab: '5-Door Long Wheelbase (JC74)',
    submodel: 'GLX 4x4 Manual/Auto',
    year: 2024,
    badge: 'Adventure 4x4 Favorite',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
    popularMaterial: 'Neoprene Waterproof Dual-Tone'
  },
  {
    make: 'Toyota',
    model: 'Fortuner',
    cab: '7-Seater SUV',
    submodel: '2.8 GD-6 VX / 4x4',
    year: 2024,
    badge: 'Ultimate Family Tourer',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    popularMaterial: 'Cool-Breathe Spacer Mesh'
  }
];
