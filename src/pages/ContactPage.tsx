import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { siteConfig, primaryCities, parseLocality } from '../config/site';
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Zap,
  CalendarCheck,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<string>('bengaluru');

  const activeCity =
    primaryCities.find((c) => c.id === selectedCityId) || primaryCities[0];

  const cleanLocalities = activeCity.localities
    .slice(0, 6)
    .map((l) => parseLocality(l).name)
    .join(', ');

  return (
    <>
      <SEO
        title="Contact Us & Service Hubs | Bengaluru, Hyderabad, Vizag, Chennai"
        description="Connect with our doorstep computer, laptop, networking, and CCTV service hubs across Bengaluru, Hyderabad, Visakhapatnam, and Chennai. Rapid dispatch within 45–90 minutes."
        canonicalPath="/contact"
        keywords={[
          'contact laptop repair',
          'computer service helpline',
          'laptop repair center Bengaluru',
          'computer service hub Hyderabad',
          'doorstep CCTV technician Vizag',
          'networking repair Chennai'
        ]}
        breadcrumbs={[{ name: 'Contact Us', url: '/contact' }]}
      />

      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      {/* Main Locate Us / Service Area Section (Matching Reference Structure) */}
      <section className="py-12 sm:py-16 bg-white relative overflow-hidden border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Title & Subtitle */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>LOCATE US</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-tight">
              Our Service Area in{' '}
              <span className="text-[#16A34A]">{activeCity.name}</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
              We operate fully equipped service vans across{' '}
              <strong className="text-black font-semibold">Bengaluru</strong>,{' '}
              <strong className="text-black font-semibold">Hyderabad</strong>,{' '}
              <strong className="text-black font-semibold">Visakhapatnam</strong>, and{' '}
              <strong className="text-black font-semibold">Chennai</strong>, delivering rapid doorstep restoration whenever you book support.
            </p>
          </div>

          {/* City Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {primaryCities.map((city) => {
              const isSelected = city.id === activeCity.id;
              return (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => setSelectedCityId(city.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                    isSelected
                      ? 'bg-[#06223A] text-white border border-[#06223A] ring-2 ring-[#22C55E]/40'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                  }`}
                >
                  {city.name} Hub
                </button>
              );
            })}
          </div>

          {/* 2-Column Grid: Info Cards (Left) & Map Embed (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: 3 Contact & Address Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              
              {/* Card 1: Dispatch Hub Address */}
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm hover:border-[#22C55E] transition-all flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#16A34A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#16A34A]" />
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#16A34A] block">
                    DISPATCH HUB ADDRESS
                  </span>
                  <h2 className="text-base font-extrabold text-black tracking-tight">
                    DOORSTEP SERVICE ({activeCity.name.toUpperCase()})
                  </h2>
                  <p className="text-xs text-slate-600 leading-snug">
                    {activeCity.address}
                  </p>
                  <p className="text-[11px] text-slate-700 pt-1 leading-relaxed">
                    <strong className="text-black font-semibold">Coverage:</strong>{' '}
                    {cleanLocalities}
                  </p>
                </div>
              </div>

              {/* Card 2: Service Helpline */}
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm hover:border-[#22C55E] transition-all flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#06223A]/10 border border-[#06223A]/20 text-[#06223A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-[#06223A]" />
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#16A34A] block">
                    SERVICE HELPLINE
                  </span>
                  <div className="text-xs space-y-1 pt-0.5">
                    <p className="text-slate-600">
                      Phone:{' '}
                      <a
                        href={`tel:${siteConfig.phoneRaw}`}
                        className="font-extrabold text-black hover:text-[#16A34A] transition-colors"
                      >
                        {siteConfig.phoneDisplay}
                      </a>
                    </p>
                    <p className="text-slate-600">
                      WhatsApp:{' '}
                      <a
                        href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                          `Hello Doorstep Service, I need support in ${activeCity.name}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-extrabold text-[#16A34A] hover:underline"
                      >
                        {siteConfig.whatsappDisplay}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Working Hours */}
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm hover:border-[#22C55E] transition-all flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#16A34A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 text-[#16A34A]" />
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#16A34A] block">
                    WORKING HOURS
                  </span>
                  <h3 className="text-sm font-extrabold text-black tracking-tight">
                    {siteConfig.workingHours}
                  </h3>
                  <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-[#16A34A] bg-[#22C55E]/15 border border-[#22C55E]/30 px-2.5 py-0.5 rounded-full mt-1">
                    EMERGENCY DISPATCH: 24 HOURS ACTIVE
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Map Embed (Matching Reference) */}
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 min-h-[360px] sm:min-h-[420px] flex">
              <iframe
                title={`${activeCity.name} Service Bounds Map`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  `${activeCity.name}, ${activeCity.state}`
                )}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0 absolute inset-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Overlay Card (Top-Left) */}
              <div className="absolute top-4 left-4 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-lg text-xs space-y-1.5 max-w-[210px] z-10">
                <div>
                  <span className="font-extrabold text-black block leading-tight">
                    {activeCity.name} Hub
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {activeCity.state}, India
                  </span>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${activeCity.name} IT laptop repair service`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-[#06223A] hover:bg-[#0A3356] px-3 py-1.5 rounded-xl transition-all shadow-xs"
                >
                  <ExternalLink className="w-3 h-3 text-[#22C55E]" />
                  <span>Open in Maps</span>
                </a>
              </div>

              {/* Floating Overlay Badge (Top-Right) */}
              <div className="absolute top-4 right-4 hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#06223A]/90 backdrop-blur-md text-white text-[10px] font-extrabold tracking-wider uppercase shadow-md border border-white/10 z-10">
                <MapPin className="w-3 h-3 text-[#22C55E]" />
                <span>{activeCity.name.toUpperCase()} SERVICE BOUNDS</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Middle Rapid Response Helpline CTA Section */}
      <section className="py-14 sm:py-18 bg-slate-50 border-b border-slate-200 text-center relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>RAPID RESPONSE HELPLINE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-black tracking-tight leading-tight">
            Need Quick Computer or Laptop Repair?
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed max-w-2xl mx-auto">
            Don't let a laptop crash, motherboard fault, broken screen, or network failure interrupt your work. Tap below to call or chat with our {activeCity.name} technicians immediately.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-7 max-w-2xl mx-auto">
            {/* Call Support Now */}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#06223A] hover:bg-[#0A3356] text-white font-extrabold text-xs py-3.5 px-6 rounded-2xl transition-all shadow-md active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#22C55E]" />
              <span>CALL SUPPORT NOW: {siteConfig.phoneDisplay}</span>
            </a>

            {/* WhatsApp Support */}
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                `Hello Doorstep Service, I need quick repair assistance in ${activeCity.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-extrabold text-xs py-3.5 px-6 rounded-2xl transition-all shadow-md active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Chat on WhatsApp</span>
            </a>

            {/* Book Online */}
            <Link
              to="/book-service"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-black border border-slate-300 font-extrabold text-xs py-3.5 px-6 rounded-2xl transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <CalendarCheck className="w-4 h-4 text-[#16A34A]" />
              <span>Book Online</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
