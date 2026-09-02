import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Wrench,
  Navigation,
  Building2
} from 'lucide-react';

interface ContactSectionProps {
  onStartQuote: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onStartQuote }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact-us" className="w-full bg-[#101014] py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 text-[10px] font-bold text-orange-500 uppercase tracking-widest bg-[#16161b] border border-orange-500/20 px-3 py-1 rounded-md font-mono">
            <Building2 className="w-3.5 h-3.5 text-orange-500" />
            <span>FACTORY & SHOWROOM FITMENT BAY</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            CONTACT & WORKSHOP <span className="text-white border-b-2 border-orange-500 pb-1">VEREENIGING</span>
          </h2>
          <p className="text-sm sm:text-base text-[#8C9BA8] leading-relaxed">
            Visit our workshop in Vereeniging, or contact our team directly for advice on custom patterns, active lifestyle seat protection, and quotes.
          </p>
        </div>

        {/* Contact Info Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Cards: Contact Details & Showroom (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Location Card */}
            <div className="bg-[#16161b] border border-white/10 rounded-2xl p-6 space-y-3 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold uppercase text-white">Physical Workshop</h4>
                  <p className="text-xs text-zinc-400 font-mono">Vereeniging, South Africa</p>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed pl-0.5">
                <strong className="text-white">Unit 6 Assegai St, South</strong>, Vereeniging, 1939, South Africa
              </p>
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Unit+6+Assegai+St+South+Vereeniging+1939+South+Africa"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-orange-400 hover:text-white transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Direct Phone & WhatsApp */}
            <div className="bg-[#16161b] border border-white/10 rounded-2xl p-6 space-y-3 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold uppercase text-white">Direct Phone & WhatsApp</h4>
                  <p className="text-xs text-zinc-400 font-mono">Instant Support</p>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Phone & WhatsApp:</span>
                  <a href="tel:+27834455370" className="font-mono font-bold text-white hover:text-orange-400">
                    +27 83 445 5370
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Email:</span>
                  <a href="mailto:info@stealthseatcovers.co.za" className="font-mono text-zinc-300 hover:text-white">
                    info@stealthseatcovers.co.za
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Official Website:</span>
                  <a href="https://stealthseatcovers.co.za/" target="_blank" rel="noreferrer" className="font-mono text-orange-400 hover:underline">
                    stealthseatcovers.co.za
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/27834455370?text=Hi%20Lifestyle%20Seat%20Covers,%20I%20have%20an%20enquiry%20regarding%20vehicle%20seat%20covers."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase text-xs tracking-wider transition flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat With Our Team on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Business Operating Hours */}
            <div className="bg-[#16161b] border border-white/10 rounded-2xl p-6 space-y-3 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sky-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold uppercase text-white">Opening Hours</h4>
                  <p className="text-xs text-zinc-400 font-mono">Workshop & Inquiries</p>
                </div>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-zinc-300">
                  <span>Monday – Friday:</span>
                  <span className="font-bold text-white">8:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Saturday & Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Card: Direct Contact Message Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#16161b] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-3">
              <h3 className="font-heading text-xl font-bold uppercase text-white">
                SEND US A MESSAGE
              </h3>
              <p className="text-xs text-[#8C9BA8]">
                Have a question about a vehicle model, active lifestyle protection, or custom quote?
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-heading text-lg font-bold uppercase text-white">
                  Message Sent Successfully
                </h4>
                <p className="text-xs text-zinc-300">
                  Thank you, {name}. Our Vereeniging workshop customer team will get back to you promptly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-mono text-emerald-400 underline hover:text-white pt-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dawie Pretorius"
                      className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 082 123 4567"
                      className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. dawie@example.co.za"
                    className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-300 uppercase mb-1">Your Message / Enquiry</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please specify your vehicle year, make, model and how we can assist you..."
                    className="w-full bg-[#0c0c0e] border border-zinc-700 focus:border-orange-500 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <button
                    type="submit"
                    className="w-full sm:w-auto py-3 px-6 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold uppercase text-xs tracking-wider transition shadow cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 text-orange-600" />
                  </button>

                  <button
                    type="button"
                    onClick={onStartQuote}
                    className="w-full sm:w-auto py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold uppercase text-xs tracking-wider transition border border-white/10 cursor-pointer text-center"
                  >
                    Need a Quote? Use Quote Builder
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
