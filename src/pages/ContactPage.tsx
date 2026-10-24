import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { siteConfig, primaryCities } from '../config/site';
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
        title="Book Doorstep Repair & Dispatch | Chanda Nagar, Bengaluru, Vizag, Chennai"
        description="Easy 2-step repair booking. Select your computer, laptop, networking, or CCTV service, and request verified technician dispatch in Chanda Nagar, Bengaluru, Vizag & Chennai. Pay after service."
        canonicalPath="/contact"
        keywords={[
          'book laptop repair',
          'doorstep technician booking Chanda Nagar',
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
      <section className="py-10 sm:py-16 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* ========================================================
               LEFT COLUMN: Easy 2-Step Repair Dispatch & Trust Cards
               ======================================================== */}
            <div className="lg:col-span-5 space-y-6">

              {/* Pill badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>FREE BOOKING</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl font-extrabold text-black tracking-tight leading-tight">
                Easy 2-Step Repair Dispatch
              </h1>

              {/* Description */}
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                <strong className="text-black font-extrabold">Simple Booking:</strong> 1. Select your device or service, 2. Enter your name and mobile number.
              </p>

              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                A certified local engineer will arrive at your doorstep in Chanda Nagar within <span className="text-[#16A34A] font-bold">90 minutes</span> with full diagnostic equipment.
              </p>

              {/* Value Proposition Cards */}
              <div className="space-y-3.5 pt-2">
                {/* Card 1: No Booking Fee */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#22C55E] transition-all flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-black tracking-tight">
                      No Booking Fee
                    </h2>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Registration is free. Pay only after diagnostics and explicit repair approval.
                    </p>
                  </div>
                </div>

                {/* Card 2: Certified Vetted Techs */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#22C55E] transition-all flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#06223A]/10 border border-[#06223A]/20 text-[#06223A] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#06223A]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-black tracking-tight">
                      Certified Vetted Techs
                    </h2>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Background-checked, highly-rated Chanda Nagar & regional field technicians.
                    </p>
                  </div>
                </div>

                {/* Card 3: Warranty & Speed Assurance */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#22C55E] transition-all flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-[#16A34A]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-black tracking-tight">
                      Up to 90 Days Guarantee
                    </h2>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Guaranteed warranty coverage on all replacement hardware and servicing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Operating hours note */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-800">
                <Clock className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
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
                initialCity="Chanda Nagar"
                initialService="laptop-repair"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
         BOTTOM RAPID RESPONSE HELPLINE BANNER
         ======================================================== */}
      <section className="py-14 sm:py-18 bg-slate-50 border-t border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-[#22C55E] animate-pulse" />
            <span>RAPID RESPONSE HELPLINE</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Need Quick Computer or Laptop Repair?
          </h2>

          {/* Subtitle */}
          <p className="text-slate-700 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
            Don't let a broken laptop screen, desktop failure, network drop, or faulty CCTV interrupt your business or routine. Tap below to call or chat with our certified technicians immediately.
          </p>

          {/* 3 Prominent Action Buttons (Logo Palette: Navy, Circuit Green) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-8 max-w-2xl mx-auto">
            {/* 1. Call Support Now (Deep Navy) */}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="p-4 rounded-2xl bg-[#06223A] hover:bg-[#0A3356] border border-[#06223A] text-white transition-all flex flex-col items-center justify-center gap-1 shadow-md group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/10 text-[#4ADE80] flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#4ADE80]">
                  CALL SUPPORT NOW
                </span>
              </div>
              <span className="text-base font-extrabold tracking-tight text-white">
                {siteConfig.phoneDisplay}
              </span>
            </a>

            {/* 2. WhatsApp Support (Tech Green) */}
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Hello Door Step Service, I want to book an emergency repair dispatch in Chanda Nagar.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white transition-all flex flex-col items-center justify-center gap-1 shadow-md group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-white" />
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-white/90">
                  WHATSAPP SUPPORT
                </span>
              </div>
              <span className="text-base font-extrabold tracking-tight text-white">
                Chat on WhatsApp
              </span>
            </a>

            {/* 3. Fast Booking Online (Navy Outline / Tech Green Accent) */}
            <button
              type="button"
              onClick={scrollToForm}
              className="p-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-[#22C55E] text-[#06223A] transition-all flex flex-col items-center justify-center gap-1 shadow-md cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-[#16A34A]" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#16A34A]">
                  FAST BOOKING
                </span>
              </div>
              <span className="text-base font-extrabold tracking-tight text-black">
                Book Online
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
         REGIONAL SERVICE HUBS & DIRECT DESKS
         ======================================================== */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider block mb-2">
              Verified Service Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
              Our Regional Diagnostic Hubs & Cities
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Fast doorstep technician dispatch and certified labs across Chanda Nagar, Bengaluru, Vizag, and Chennai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {primaryCities.map((city) => (
              <div
                key={city.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#22C55E] transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 font-bold text-sm text-black">
                      <MapPin className="w-4 h-4 text-[#16A34A]" />
                      {city.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono font-semibold">
                      {city.state}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {city.address}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-[#16A34A] font-bold">{city.leadTime}</span>
                  <button
                    type="button"
                    onClick={() => {
                      scrollToForm();
                    }}
                    className="text-[#16A34A] hover:underline font-bold text-[10px]"
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
