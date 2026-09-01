import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Scissors, 
  Award, 
  Truck, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Flame, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Cpu,
  Tractor,
  Compass,
  Building2,
  HardHat,
  Car
} from 'lucide-react';

interface ManufacturingProcessProps {
  onOpenSwatches: () => void;
  onGoToCustomizer: () => void;
}

export const ManufacturingProcessAndDirector: React.FC<ManufacturingProcessProps> = ({
  onOpenSwatches,
  onGoToCustomizer
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const processSteps = [
    {
      step: '01',
      title: 'Digital 1:1 CAD Geometry Survey',
      lead: 'Digitally mapped to OEM seat skeletons',
      description: 'We do not sell generic "one-size-fits-many" slipcovers. Each pattern is surveyed and digitized directly from the vehicle manufacturer’s original seat architecture—accounting for split benches, ISOFIX points, folding armrests, and console geometry.',
      icon: Cpu,
      badge: 'Step 1: CAD Survey'
    },
    {
      step: '02',
      title: 'Automated Precision Laser Pattern Cutting',
      lead: 'Clean, sealed edges that never fray or pull',
      description: 'Raw Riptech® 510g canvas, 600D synthetic polyester, or automotive-grade leatherette is placed on our computerized cutting tables. Laser cutting seals every fabric edge with micron-level accuracy to eliminate rough unravelling over years of heavy use.',
      icon: Scissors,
      badge: 'Step 2: Laser Cutting'
    },
    {
      step: '03',
      title: 'Heavy-Duty Stitching & Airbag Safety Seams',
      lead: 'Certified side-airbag release pockets & UV threads',
      description: 'Master artisans assemble the panels using high-tensile UV-bonded industrial nylon thread. On vehicles with seat-integrated side airbags, we stitch computer-calibrated breakaway tear seams that allow uninhibited instant deployment in under 12 milliseconds.',
      icon: ShieldCheck,
      badge: 'Step 3: Hand Craftsmanship'
    },
    {
      step: '04',
      title: 'Multi-Point Quality Audit & Nationwide Courier',
      lead: 'Backed by our 24-Month Comprehensive Warranty',
      description: 'Before packaging, every finished cover undergoes a strict multi-point inspection for seam tension, anchor buckle strength, and alignment. Dispatched via The Courier Guy with direct tracking straight to your door or fitted on-site at our Polokwane showroom.',
      icon: Truck,
      badge: 'Step 4: Dispatch & Warranty'
    }
  ];

  const vehicleSectors = [
    {
      title: '4x4 Bakkies & Overland Rigs',
      description: 'Hilux GD-6, Ranger Next-Gen, Land Cruiser 79, D-Max, Jimny, Amarok, Navara, Mahindra Pik-Up.',
      icon: Compass,
      tag: 'Bakkie & 4x4'
    },
    {
      title: 'Mining & Heavy Construction',
      description: 'Earthmovers, yellow plant, front loaders, dump trucks, and site bakkies facing severe dust and abrasive PPE wear.',
      icon: HardHat,
      tag: 'Heavy Industrial'
    },
    {
      title: 'Safari & Game Viewers',
      description: 'Open-sided safari cruisers, 9-seater Land Cruisers, hunting vehicles, and game reserve guest transport.',
      icon: Flame,
      tag: 'Bush & Wildlife'
    },
    {
      title: 'Agricultural & Farm Tractors',
      description: 'Tractors, sprayers, farm workhorses exposed to red soil, fertilizer, chemicals, dogs, and sun.',
      icon: Tractor,
      tag: 'Agriculture'
    },
    {
      title: 'Commercial Courier & Security Fleets',
      description: 'Delivery vans, security response bakkies, and commuter taxis requiring indestructible, easy-wipe protection.',
      icon: Building2,
      tag: 'Fleet & Courier'
    }
  ];

  const directorFaqs = [
    {
      question: 'Why do our custom seat covers take 10 to 20 working days to manufacture?',
      answer: 'Because we never mass-import pre-made, generic stretchy covers that sit in a warehouse gathering dust. Every single set of seat covers is individually cut, tailored, and sewn specifically for your vehicle’s exact make, model, cab layout (Single, Extra, or Double Cab), and seat trim configuration. This made-to-order artisanal approach guarantees a glove-tight fit that will never sag, wrinkle, or shift.'
    },
    {
      question: 'Are our seat covers safe with side-impact airbags?',
      answer: 'Yes, 100%. Safety is our non-negotiable priority. For all modern vehicles equipped with seat-integrated side airbags, we build dedicated airbag release pockets and utilize certified breakaway tear-away stitching calibrated to rupture instantly upon airbag trigger (deploying in under 12 milliseconds), fully respecting manufacturer safety standards.'
    },
    {
      question: 'What is covered under our 24-Month South African Warranty?',
      answer: 'Our comprehensive 24-Month Warranty covers all defects in materials and workmanship under normal South African operating conditions—including seam failures, zipper/buckle defects, stitching unravelling, and material integrity. If you experience an issue, simply send us your order details and clear photos, and our factory will rectify it promptly.'
    },
    {
      question: 'Can I visit the showroom or have my covers fitted on-site?',
      answer: 'Absolutely. If you are in or traveling through Limpopo, you are welcome to visit our showroom and manufacturing facility at 16 Industria Street, Polokwane (0700), where our technicians can measure or fit your seat covers. For customers across the rest of South Africa, we provide free door-to-door courier delivery via The Courier Guy with a foolproof 30-minute DIY fitment guide.'
    },
    {
      question: 'Can I add custom embroidery with my name or company logo?',
      answer: 'Yes! We have high-speed commercial embroidery machines in our facility. You can personalize your front headrests or backrests with custom text, names, registration numbers, or corporate fleet logos using high-tensile contrasting threads.'
    }
  ];

  return (
    <section id="manufacturing-process" className="w-full bg-[#0c0c0e] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Co-Director Engineering Philosophy Banner */}
        <div className="bg-[#141418] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-[#8C9BA8] uppercase tracking-widest bg-black/50 border border-white/10 px-3 py-1 rounded-md font-mono">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span>FROM THE CO-DIRECTOR'S WORKSHOP • POLOKWANE, LIMPOPO</span>
              </div>
              
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
                WHY WE REFUSE TO KEEP <span className="text-white border-b-2 border-orange-500 pb-1">OFF-THE-SHELF</span> STOCK
              </h2>
              
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                "In South Africa, vehicle owners don’t compromise on their bakkies, 4x4s, or work fleets. A Hilux Legend is not identical to a Raider; a Next-Gen Ranger Wildtrak has different seat bolsters and lumbar dials than an XLT. 
                <br /><br />
                That’s why every set is <strong>100% custom-crafted from scratch</strong> at our Polokwane facility (16 Industria St). We survey the exact 1:1 OEM seat geometry, laser-cut genuine Riptech® 510g canvas or 600D synthetic polyester, integrate certified airbag tear-away seams, and test every stitch to withstand our harsh African sun, dust, and thorns."
              </p>

              {/* Director Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-black/50 border border-white/10 p-3 rounded-xl">
                  <div className="text-[10px] text-[#8C9BA8] uppercase font-mono font-bold">Manufacturing Lead Time</div>
                  <div className="text-sm font-bold text-white mt-0.5 font-mono">10 – 20 Working Days</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Bespoke artisanal tailoring</div>
                </div>

                <div className="bg-black/50 border border-white/10 p-3 rounded-xl">
                  <div className="text-[10px] text-[#8C9BA8] uppercase font-mono font-bold">Factory Guarantee</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5 font-mono">24-Month SA Warranty</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Materials & workmanship</div>
                </div>

                <div className="bg-black/50 border border-white/10 p-3 rounded-xl">
                  <div className="text-[10px] text-[#8C9BA8] uppercase font-mono font-bold">Direct Factory Pricing</div>
                  <div className="text-sm font-bold text-white mt-0.5 font-mono">Zero Middleman Markup</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Direct from Polokwane workshop</div>
                </div>
              </div>
            </div>

            {/* Right: Direct Contact & Workshop Location Card */}
            <div className="lg:col-span-4 bg-[#0c0c0e] border border-white/10 rounded-2xl p-6 space-y-5 shadow-xl">
              <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-white uppercase">Polokwane Showroom</h4>
                  <p className="text-[11px] text-[#8C9BA8]">Showroom, Factory & Fitment Hub</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-zinc-300">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>16 Industria Street, Polokwane, 0700, Limpopo, South Africa</span>
                </div>

                <div className="flex items-center space-x-2.5 font-mono">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <a href="tel:+27624679741" className="hover:text-white transition">
                    +27 62 467 9741
                  </a>
                </div>

                <div className="flex items-center space-x-2.5 font-mono">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a 
                    href="https://wa.me/27624679741?text=Hi%20Stealth%20Seat%20Covers,%20I%20would%20like%20to%20inquire%20about%20custom%20seat%20covers" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    WhatsApp Direct Co-Director Line
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={onGoToCustomizer}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold uppercase text-xs tracking-wider transition text-center cursor-pointer shadow"
                >
                  Configure My Vehicle
                </button>
                <button
                  onClick={onOpenSwatches}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold uppercase text-xs tracking-wider transition text-center cursor-pointer border border-white/10"
                >
                  Order Free Swatch Pack
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Stage Precision Manufacturing Pipeline */}
        <div className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-[#8C9BA8] uppercase tracking-widest bg-[#141418] border border-white/10 px-3 py-1 rounded-md font-mono">
              <Scissors className="w-3.5 h-3.5 text-orange-500" />
              <span>THE 4-STAGE CUSTOM TAILORING PIPELINE</span>
            </div>
            <h3 className="font-heading text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              HOW WE ENGINEER EVERY COVER TO PERFECTION
            </h3>
            <p className="text-xs sm:text-sm text-[#8C9BA8]">
              From digital CAD scan to heavy-gauge industrial stitching and courier dispatch across South Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#141418] border border-white/10 hover:border-white/30 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-black text-white/40">{step.step}</span>
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-orange-500">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <span className="text-[10px] font-mono font-bold text-orange-400 uppercase bg-orange-950/40 px-2 py-0.5 rounded border border-orange-500/20 inline-block">
                      {step.badge}
                    </span>

                    <h4 className="font-heading text-base font-bold uppercase text-white">
                      {step.title}
                    </h4>

                    <p className="text-xs font-semibold text-zinc-300">
                      {step.lead}
                    </p>

                    <p className="text-xs text-[#8C9BA8] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Strict QA Checkpoint Passed</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sectors We Protect Bento Section */}
        <div className="bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#8C9BA8] uppercase tracking-widest">
                BUILT FOR EVERY TOUGH SOUTH AFRICAN APPLICATION
              </div>
              <h3 className="font-heading text-2xl font-black uppercase text-white mt-1">
                SECTORS & FLEETS WE TAILOR FOR
              </h3>
            </div>
            <div className="text-xs text-[#8C9BA8] font-mono">
              Custom Patterns for Over 1,500+ Vehicle Models
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {vehicleSectors.map((sector, idx) => {
              const Icon = sector.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#0c0c0e] border border-white/10 p-4 rounded-xl space-y-2 flex flex-col justify-between hover:border-white/30 transition"
                >
                  <div className="space-y-2">
                    <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-orange-500">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">{sector.tag}</span>
                    <h5 className="font-heading text-sm font-bold uppercase text-white">{sector.title}</h5>
                    <p className="text-[11px] text-[#8C9BA8] leading-relaxed">{sector.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Co-Director Q&A / FAQs Accordion */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-[#8C9BA8] uppercase tracking-widest bg-[#141418] border border-white/10 px-3 py-1 rounded-md font-mono">
              <FileText className="w-3.5 h-3.5 text-orange-500" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">
              ANSWERS DIRECT FROM OUR WORKSHOP
            </h3>
          </div>

          <div className="space-y-3">
            {directorFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-[#141418] border border-white/10 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition"
                  >
                    <span className="font-heading text-sm sm:text-base font-bold uppercase text-white">
                      {faq.question}
                    </span>
                    <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#8C9BA8] leading-relaxed border-t border-white/5 bg-[#0c0c0e]/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
