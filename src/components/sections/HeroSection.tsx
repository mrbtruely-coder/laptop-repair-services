import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, MapPin, Laptop, Cpu, Network, Video } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20 bg-white overflow-hidden">
      {/* Background radial gradients in subtle tech navy & green */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-green-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Headlines, Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-black shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
              <span className="font-bold text-[#16A34A]">Doorstep IT Hardware Specialists</span>
              <span className="text-slate-300">|</span>
              <span className="text-black">Laptop, Desktop, Network & CCTV</span>
            </div>

            {/* Primary H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-[1.12]">
              Reliable IT Repair.{' '}
              <span className="gradient-text block mt-1">Smarter Technology.</span>
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-slate-800 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Professional computer and laptop repair, enterprise networking support, and certified CCTV solutions for homes and businesses. Transparent diagnosis, genuine parts, and verified technician dispatch across Bengaluru, Visakhapatnam, Chennai, and Hyderabad.
            </p>

            {/* Verified highlights bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs text-black font-semibold max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                <span>Up to 90 Days Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                <span>Zero Hidden Diagnostic Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                <span>Doorstep & Lab Service</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <Link
                to="/book-service"
                className="sand-btn-3d w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-2xl text-sm group transition-transform active:scale-95 shadow-md"
              >
                <span>Book a Repair</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#06223A] hover:bg-[#0A3356] text-white font-semibold px-6 py-3.5 rounded-2xl transition-all text-sm shadow-md"
              >
                <span>Explore Services</span>
              </Link>

              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-black hover:text-[#16A34A] font-bold px-4 py-3 text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[#22C55E]" />
                <span>{siteConfig.phoneDisplay}</span>
              </a>
            </div>

            {/* City Quick selector pill row */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="font-bold text-black">Target Cities:</span>
              <div className="flex items-center gap-2 font-medium">
                <Link to="/service-center/bengaluru" className="text-black hover:text-[#16A34A] underline decoration-slate-300 hover:decoration-[#22C55E]">
                  Bengaluru
                </Link>
                <span>•</span>
                <Link to="/service-center/vizag" className="text-black hover:text-[#16A34A] underline decoration-slate-300 hover:decoration-[#22C55E]">
                  Vizag
                </Link>
                <span>•</span>
                <Link to="/service-center/chennai" className="text-black hover:text-[#16A34A] underline decoration-slate-300 hover:decoration-[#22C55E]">
                  Chennai
                </Link>
                <span>•</span>
                <Link to="/service-center/hyderabad" className="text-black hover:text-[#16A34A] underline decoration-slate-300 hover:decoration-[#22C55E]">
                  Hyderabad
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Feature Board */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Outer decorative card frame */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 space-y-5 border border-slate-200 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#22C55E]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-black">Doorstep Dispatch Desk</span>
                  </div>
                  <span className="text-xs text-[#16A34A] font-mono font-bold bg-[#DCFCE7] px-2 py-0.5 rounded-full">ACTIVE</span>
                </div>

                {/* 4 Interactive Category Badges */}
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/services/laptop-repair"
                    className="p-3.5 rounded-2xl group flex flex-col justify-between bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#22C55E] transition-all hover:shadow-md"
                  >
                    <div>
                      <div className="p-2 w-fit rounded-xl bg-white border border-slate-200 text-[#22C55E] mb-2 group-hover:scale-110 transition-transform shadow-sm">
                        <Laptop className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-black group-hover:text-[#16A34A] transition-colors">Laptop Repair</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">Chip-level motherboard & display fix</p>
                    </div>
                  </Link>

                  <Link
                    to="/services/computer-repair"
                    className="p-3.5 rounded-2xl group flex flex-col justify-between bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#22C55E] transition-all hover:shadow-md"
                  >
                    <div>
                      <div className="p-2 w-fit rounded-xl bg-white border border-slate-200 text-[#06223A] mb-2 group-hover:scale-110 transition-transform shadow-sm">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-black group-hover:text-[#16A34A] transition-colors">Desktop Repair</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">SMPS power & BSOD diagnostics</p>
                    </div>
                  </Link>

                  <Link
                    to="/services/networking"
                    className="p-3.5 rounded-2xl group flex flex-col justify-between bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#22C55E] transition-all hover:shadow-md"
                  >
                    <div>
                      <div className="p-2 w-fit rounded-xl bg-white border border-slate-200 text-[#22C55E] mb-2 group-hover:scale-110 transition-transform shadow-sm">
                        <Network className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-black group-hover:text-[#16A34A] transition-colors">Networking</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">CAT6 cabling & Wi-Fi coverage</p>
                    </div>
                  </Link>

                  <Link
                    to="/services/cctv-repair-installation"
                    className="p-3.5 rounded-2xl group flex flex-col justify-between bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#22C55E] transition-all hover:shadow-md"
                  >
                    <div>
                      <div className="p-2 w-fit rounded-xl bg-white border border-slate-200 text-[#06223A] mb-2 group-hover:scale-110 transition-transform shadow-sm">
                        <Video className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-black group-hover:text-[#16A34A] transition-colors">CCTV Solutions</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">IP cameras & DVR recording setup</p>
                    </div>
                  </Link>
                </div>

                {/* Bottom Assurance strip */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 text-black font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                    <span>Tested OEM Components</span>
                  </div>
                  <Link to="/contact" className="text-xs font-bold text-[#16A34A] hover:text-[#06223A] flex items-center gap-1">
                    <span>Instant Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

