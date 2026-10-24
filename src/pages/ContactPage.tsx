import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { siteConfig, citiesData } from '../config/site';
import {
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  CalendarCheck
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const scrollToForm = () => {
    const el = document.getElementById('booking-dispatch-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO
        title="Book Doorstep Repair & Dispatch | Nellore, Bengaluru, Vizag, Chennai"
        description="Easy 2-step repair booking. Select your computer, laptop, networking, or CCTV service, and request verified technician dispatch in Nellore, Bengaluru, Vizag & Chennai. Pay after service."
        canonicalPath="/contact"
        keywords={[
          'book laptop repair',
          'doorstep technician booking Nellore',
          'schedule computer repair Bengaluru',
          'book CCTV installation Chennai',
          'laptop service dispatch Vizag',
          'pay after repair doorstep'
        ]}
        breadcrumbs={[
          { name: 'Book Service', url: '/contact' }
        ]}
      />

      <Breadcrumbs items={[{ label: 'Book Service Dispatch' }]} />

      {/* Main 2-Step Repair Dispatch Section */}
      <section className="py-10 sm:py-16 bg-[#12231A] relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ========================================================
               LEFT COLUMN: Easy 2-Step Repair Dispatch & Trust Cards
               ======================================================== */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Pill badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-bold uppercase tracking-wider shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-[#E2B98E]" />
                <span>FREE BOOKING</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6F0] tracking-tight leading-tight">
                Easy 2-Step Repair Dispatch
              </h1>

              {/* Description */}
              <p className="text-[#FAF6F0]/80 text-sm sm:text-base leading-relaxed">
                <strong className="text-[#E2B98E]">Simple Booking:</strong> 1. Select your device or service, 2. Enter your name and mobile number.
              </p>
              
              <p className="text-[#FAF6F0]/75 text-xs sm:text-sm leading-relaxed">
                A certified local engineer will arrive at your doorstep in Nellore within <span className="text-[#E2B98E] font-semibold">90 minutes</span> with full diagnostic equipment.
              </p>

              {/* Value Proposition Cards */}
              <div className="space-y-3.5 pt-2">
                {/* Card 1: No Booking Fee */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#14281E]/90 border border-[#E2B98E]/20 shadow-lg hover:border-[#E2B98E]/40 transition-all flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#12231A] border border-[#7AA27D]/40 text-[#7AA27D] flex items-center justify-center flex-shrink-0 shadow-inner">
                    <CheckCircle2 className="w-5 h-5 text-[#7AA27D]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#FAF6F0] tracking-tight">
                      No Booking Fee
                    </h2>
                    <p className="text-xs text-[#FAF6F0]/70 mt-0.5 leading-relaxed">
                      Registration is free. Pay only after diagnostics and explicit repair approval.
                    </p>
                  </div>
                </div>

                {/* Card 2: Certified Vetted Techs */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#14281E]/90 border border-[#E2B98E]/20 shadow-lg hover:border-[#E2B98E]/40 transition-all flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#12231A] border border-[#E2B98E]/40 text-[#E2B98E] flex items-center justify-center flex-shrink-0 shadow-inner">
                    <ShieldCheck className="w-5 h-5 text-[#E2B98E]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#FAF6F0] tracking-tight">
                      Certified Vetted Techs
                    </h2>
                    <p className="text-xs text-[#FAF6F0]/70 mt-0.5 leading-relaxed">
                      Background-checked, highly-rated Nellore & regional field technicians.
                    </p>
                  </div>
                </div>

                {/* Card 3: Warranty & Speed Assurance */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#14281E]/90 border border-[#E2B98E]/20 shadow-lg hover:border-[#E2B98E]/40 transition-all flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#12231A] border border-[#E2B98E]/40 text-[#E2B98E] flex items-center justify-center flex-shrink-0 shadow-inner">
                    <Zap className="w-5 h-5 text-[#E2B98E]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#FAF6F0] tracking-tight">
                      Up to 90 Days Guarantee
                    </h2>
                    <p className="text-xs text-[#FAF6F0]/70 mt-0.5 leading-relaxed">
                      Guaranteed warranty coverage on all replacement hardware and servicing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Operating hours note */}
              <div className="p-4 rounded-2xl bg-[#14281E]/60 border border-[#E2B98E]/15 flex items-center gap-3 text-xs text-[#FAF6F0]/75">
                <Clock className="w-4 h-4 text-[#E2B98E] flex-shrink-0" />
                <span>
                  <strong>Schedule:</strong> {siteConfig.workingHours} (Same-Day Emergency Response)
                </span>
              </div>

            </div>

            {/* ========================================================
               RIGHT COLUMN: Request Service Form Card
               ======================================================== */}
            <div id="booking-dispatch-card" className="lg:col-span-7">
              <EnquiryForm
                title="Request Service"
                subtitle="Select your service, enter details, and book your technician."
                initialCity="nellore"
                initialService="laptop-repair"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
         BOTTOM RAPID RESPONSE HELPLINE BANNER
         ======================================================== */}
      <section className="py-14 sm:py-18 bg-[#0E1B14] border-t border-b border-[#E2B98E]/15 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6E4331]/40 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-bold uppercase tracking-wider mb-4 shadow-inner">
            <Zap className="w-3.5 h-3.5 text-[#E2B98E] animate-pulse" />
            <span>RAPID RESPONSE HELPLINE</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF6F0] tracking-tight">
            Need Quick Computer or Laptop Repair?
          </h2>

          {/* Subtitle */}
          <p className="text-[#FAF6F0]/75 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
            Don't let a broken laptop screen, desktop failure, network drop, or faulty CCTV interrupt your business or routine. Tap below to call or chat with our certified technicians immediately.
          </p>

          {/* 3 Prominent Action Buttons (Warm Tactile Palette: NO blue, NO white!) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-8 max-w-2xl mx-auto">
            {/* 1. Call Support Now */}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="p-4 rounded-2xl bg-[#6E4331] hover:bg-[#8C5740] border border-[#E2B98E]/30 text-[#FAF6F0] transition-all flex flex-col items-center justify-center gap-1 shadow-lg shadow-black/40 group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#12231A] text-[#E2B98E] flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#E2B98E]">
                  CALL SUPPORT NOW
                </span>
              </div>
              <span className="text-base font-extrabold tracking-tight text-[#FAF6F0]">
                {siteConfig.phoneDisplay}
              </span>
            </a>

            {/* 2. WhatsApp Support */}
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Hello Door Step Service, I want to book an emergency repair dispatch in Nellore.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-[#12231A] transition-all flex flex-col items-center justify-center gap-1 shadow-lg shadow-black/40 group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#12231A]" />
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#12231A]/80">
                  WHATSAPP SUPPORT
                </span>
              </div>
              <span className="text-base font-extrabold tracking-tight text-[#12231A]">
                Chat on WhatsApp
              </span>
            </a>

            {/* 3. Fast Booking Online */}
            <button
              type="button"
              onClick={scrollToForm}
              className="sand-btn-3d p-4 rounded-2xl text-[#24160E] transition-all flex flex-col items-center justify-center gap-1 shadow-lg cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-[#24160E]" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#24160E]/80">
                  FAST BOOKING
                </span>
              </div>
              <span className="text-base font-extrabold tracking-tight text-[#24160E]">
                Book Online
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
         REGIONAL SERVICE HUBS & DIRECT DESKS
         ======================================================== */}
      <section className="py-14 sm:py-16 bg-[#12231A]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#E2B98E] uppercase tracking-wider block mb-2">
              Verified Service Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF6F0] tracking-tight">
              Our Regional Diagnostic Hubs & Cities
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/70 mt-2">
              Fast doorstep technician dispatch and certified labs across Nellore, Bengaluru, Vizag, and Chennai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(citiesData).map((city) => (
              <div
                key={city.id}
                className="p-5 rounded-2xl bg-[#14281E]/90 border border-[#E2B98E]/15 hover:border-[#E2B98E]/40 transition-all flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 font-bold text-sm text-[#FAF6F0]">
                      <MapPin className="w-4 h-4 text-[#E2B98E]" />
                      {city.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6E4331]/40 border border-[#E2B98E]/20 text-[#E2B98E] font-mono">
                      {city.state}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#FAF6F0]/70 line-clamp-2 leading-relaxed">
                    {city.address}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2B98E]/10 mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-[#7AA27D] font-medium">{city.leadTime}</span>
                  <button
                    type="button"
                    onClick={() => {
                      scrollToForm();
                    }}
                    className="text-[#E2B98E] hover:underline font-bold text-[10px]"
                  >
                    Book Here →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
