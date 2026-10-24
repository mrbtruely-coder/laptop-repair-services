import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { siteConfig } from '../config/site';
import {
  ShieldCheck,
  CheckCircle2,
  Zap,
  Phone,
  MessageSquare,
  MapPin,
  Sparkles
} from 'lucide-react';

export const BookServicePage: React.FC = () => {
  return (
    <>
      <SEO
        title={`Book Doorstep IT & Laptop Repair | ${siteConfig.brandName}`}
        description="Easy 2-step repair booking. Select your computer, laptop, networking, or CCTV service, and request verified technician dispatch in Bengaluru, Hyderabad, Vizag, and Chennai. Pay after service."
        canonicalPath="/book-service"
        keywords={[
          'book laptop service',
          'doorstep computer repair booking',
          'online CCTV installation booking',
          'wifi networking service appointment',
          'schedule IT repair'
        ]}
        breadcrumbs={[{ name: 'Book Service', url: '/book-service' }]}
      />

      <Breadcrumbs items={[{ label: 'Book Service' }]} />

      {/* Main 2-Step Repair Dispatch Section (Matching Reference Structure) */}
      <section className="py-10 sm:py-16 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Easy 2-Step Repair Dispatch & Trust Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Pill badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-bold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>FREE BOOKING</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-tight">
                Easy 2-Step Repair Dispatch
              </h1>

              {/* Subtitle / Description */}
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                <strong className="text-black font-extrabold">Simple Booking:</strong> 1. Tap the icon of your device, 2. Enter your name and mobile number.
              </p>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                A certified local engineer will arrive at your doorstep in{' '}
                <strong className="text-black font-semibold">Bengaluru</strong>,{' '}
                <strong className="text-black font-semibold">Hyderabad</strong>,{' '}
                <strong className="text-black font-semibold">Visakhapatnam</strong>, or{' '}
                <strong className="text-black font-semibold">Chennai</strong> within{' '}
                <span className="text-[#16A34A] font-bold">45–90 minutes</span>.
              </p>

              {/* Trust Cards */}
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
                      Registration is completely free. Pay only after technician doorstep diagnostics.
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
                      Background-checked, highly-rated technicians with 90-day warranty on spare replacements.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Request Service Form Card */}
            <div className="lg:col-span-7">
              <EnquiryForm
                title="Request Service"
                subtitle="Tap your device, select service type, enter details, and book your technician."
                initialCity="hyderabad"
                initialService="laptop-repair"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Rapid Response Helpline Section (Matching Reference Structure) */}
      <section className="py-14 sm:py-18 bg-slate-50 border-t border-slate-200 text-center relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>RAPID RESPONSE HELPLINE</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl font-extrabold text-black tracking-tight leading-tight">
            Need Quick IT &amp; Laptop Repair?
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed max-w-2xl mx-auto">
            Don't let a hardware issue, motherboard fault, broken screen, or network downtime interrupt your business or routine. Tap below to call or chat with our certified technicians immediately.
          </p>

          {/* Sub-label */}
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mt-8 mb-4">
            TAP ICONS BELOW TO CONNECT WITH US DIRECTLY
          </span>

          {/* 3 Clean Icon Cards (CALL, WHATSAPP, LOCATION) */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 max-w-md mx-auto">
            
            {/* CALL */}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="flex-1 p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#22C55E] shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#06223A] text-[#06223A] group-hover:text-[#22C55E] flex items-center justify-center transition-colors">
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-black group-hover:text-[#16A34A] transition-colors">
                CALL
              </span>
            </a>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
                'Hello Door Step Service, I want to book an emergency repair dispatch.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#22C55E] shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-[#22C55E]/15 group-hover:bg-[#22C55E] text-[#16A34A] group-hover:text-white flex items-center justify-center transition-colors">
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-black group-hover:text-[#16A34A] transition-colors">
                WHATSAPP
              </span>
            </a>

            {/* LOCATION */}
            <Link
              to="/contact"
              className="flex-1 p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#22C55E] shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#06223A] text-[#06223A] group-hover:text-[#22C55E] flex items-center justify-center transition-colors">
                <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-black group-hover:text-[#16A34A] transition-colors">
                LOCATION
              </span>
            </Link>

          </div>

        </div>
      </section>
    </>
  );
};

export default BookServicePage;
