import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  Clock,
  Maximize2
} from 'lucide-react';
import { AssetImage } from './AssetImage';

export const InstallationGuides: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: 1,
      title: 'Headrest Removal & Slip-Over Fitment',
      time: '5 mins',
      description: 'Press the release pin on the factory headrest post and slide the headrest completely out. Pull the Lifestyle custom backrest cover down over the seat back like a glove, smoothing downwards to eliminate air pockets.',
      tip: 'Ensure the red side AIRBAG tag is positioned facing towards the vehicle doors, not the center console.',
      badge: 'Step 1: Slip-Over Fit',
      image: 'WhatsApp Image 2026-08-31 at 8.08.57 AM (1).jpeg',
      caption: 'Workshop demonstration: Slip-over upper backrest contour with reinforced headrest grommets'
    },
    {
      step: 2,
      title: 'Center Tuck Flap & Underseat Anchoring',
      time: '8 mins',
      description: 'Push the reinforced neoprene/canvas center flap through the seat bight (crevice between backrest and bottom cushion) until it emerges behind the seat. Fasten with the heavy-duty industrial hook-and-loop anchors.',
      tip: 'Pull firmly for a wrinkle-free contour that mirrors factory upholstery.',
      badge: 'Step 2: Center Flap Tuck',
      image: 'WhatsApp Image 2026-08-31 at 8.08.54 AM.jpeg',
      caption: 'Workshop demonstration: Center bight flap secured tightly around the lumbar junction'
    },
    {
      step: 3,
      title: 'Bottom Cushion Quick-Cinch Buckles',
      time: '10 mins',
      description: 'Slide the bottom cover over the seat base. Route the two underside nylon straps beneath the seat frame and click them into the quick-cinch tension buckles. Pull snug.',
      tip: 'Do not trap any electric seat wiring or seat rail motors under the straps.',
      badge: 'Step 3: Base Cinch',
      image: 'WhatsApp Image 2026-08-31 at 8.08.58 AM (1).jpeg',
      caption: 'Workshop demonstration: Tailored bottom cushion bolsters anchored securely'
    },
    {
      step: 4,
      title: 'Headrest Reinsertion & Center Console Cover',
      time: '5 mins',
      description: 'Slip the tailored headrest covers onto the detached headrests and cinch the velcro bottom. Reinsert the metal posts through the laser-cut reinforced grommet holes. Fit your free matching center console lid cover.',
      tip: 'Your seat covers are now fully installed, 100% airbag deployment safe, and ready for the bush!',
      badge: 'Step 4: Final Inspection',
      image: 'WhatsApp Image 2026-08-31 at 8.09.00 AM (1).jpeg',
      caption: 'Workshop demonstration: Finished cabin installation with matching console lid cover'
    }
  ];

  return (
    <section id="installation-guide" className="w-full bg-[#0c0c0e] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-[#8C9BA8] uppercase tracking-widest bg-[#141418] border border-white/10 px-3 py-1 rounded-md font-mono">
            <Wrench className="w-3.5 h-3.5 text-orange-500" />
            <span>FITMENT & INSTALLATION GUIDE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            NO TOOLS REQUIRED: <span className="text-white border-b-2 border-orange-500 pb-0.5">30-MINUTE DIY FITMENT</span>
          </h2>
          <p className="text-[#8C9BA8] text-sm sm:text-base">
            Every set includes custom quick-cinch buckles, laser-aligned headrest grommets, and SABS-certified side airbag breakaway stitching. Click any photo to enlarge.
          </p>
        </div>

        {/* Interactive Step-by-Step Bento Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#141418] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {/* Left: Step Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((st, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  activeStep === idx
                    ? 'bg-[#18181f] border-white shadow-xl shadow-white/5'
                    : 'bg-[#101014] border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div
                    className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-xs font-mono shrink-0 ${
                      activeStep === idx
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-[#8C9BA8] border border-white/10'
                    }`}
                  >
                    0{st.step}
                  </div>
                  <div className="truncate">
                    <h4 className="font-bold text-sm text-white truncate">{st.title}</h4>
                    <span className="text-[11px] text-[#8C9BA8] flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-orange-500" /> Approx {st.time}
                    </span>
                  </div>
                </div>
                {activeStep === idx && (
                  <CheckCircle2 className="w-5 h-5 text-orange-500 font-bold shrink-0 ml-2" />
                )}
              </div>
            ))}

            {/* Video Guide & Support Box */}
            <div className="pt-2">
              <a
                href="https://wa.me/27725916960?text=Hi%20Lifestyle%20Seat%20Covers,%20I%20need%20assistance%20fitting%20my%20covers"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-black/40 hover:bg-zinc-800 border border-white/10 text-xs font-bold text-white hover:text-orange-400 flex items-center justify-center space-x-2 transition font-mono"
              >
                <span>Need Fitment Help? WhatsApp Our Workshop</span>
              </a>
            </div>
          </div>

          {/* Right: Active Step Visual Breakdown with Contained Image */}
          <div className="lg:col-span-7 bg-[#0c0c0e] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-inner">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono">
              <span className="text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-md border border-white/20">
                {steps[activeStep].badge}
              </span>
              <span className="text-xs text-[#8C9BA8]">Step {activeStep + 1} of 4</span>
            </div>

            {/* Visual Element Box - Image strictly fits/contains, clickable to enlarge */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-black rounded-2xl overflow-hidden border border-white/15 flex items-center justify-center p-2 sm:p-3 group">
              <AssetImage
                key={steps[activeStep].image}
                filename={steps[activeStep].image}
                alt={steps[activeStep].caption}
                fit="contain"
                className="w-full h-full"
                allowEnlarge={true}
              />
              
              <div className="absolute bottom-2.5 left-2.5 z-10 bg-black/80 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-lg text-[10px] font-mono text-zinc-300 pointer-events-none">
                {steps[activeStep].caption}
              </div>

              <div className="absolute top-2.5 right-2.5 z-10 bg-black/80 backdrop-blur-md border border-white/20 text-orange-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded pointer-events-none flex items-center gap-1">
                <Maximize2 className="w-3 h-3" />
                <span>Click Photo to Enlarge</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading text-2xl font-bold uppercase text-white">
                {steps[activeStep].title}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {steps[activeStep].description}
              </p>
            </div>

            {/* Crucial Pro-Tip Alert Box */}
            <div className="p-4 bg-[#141418] border border-white/10 rounded-xl flex items-start space-x-3 text-xs text-[#8C9BA8]">
              <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white uppercase font-mono">PRO FITMENT TIP: </span>
                {steps[activeStep].tip}
              </div>
            </div>

            {/* Airbag Certified Safety Note */}
            <div className="flex items-center space-x-3 pt-4 border-t border-white/10 text-xs text-[#8C9BA8]">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-white">Side Airbag Guarantee:</strong> Precision computer-stitched tear-away thread tested to deploy in under 12 milliseconds in an impact.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
