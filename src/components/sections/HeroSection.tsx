import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, MapPin, Laptop, Cpu, Network, Video } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-4 pb-8 sm:pt-6 sm:pb-12 lg:pt-8 lg:pb-14 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Column: Headlines, Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6E4331]/40 border border-[#E2B98E]/40 text-xs font-semibold text-[#E2B98E] shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#E2B98E] animate-ping" />
              <span>Doorstep Computer & IT Hardware Specialists</span>
              <span className="text-[#D2DCD2]/50">|</span>
              <span className="text-[#FAF6F0]">Laptop, Desktop, Network & CCTV</span>
            </div>

            {/* Primary H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAF6F0] leading-[1.12]">
              Reliable IT Repair.{' '}
              <span className="gradient-text block mt-1">Smarter Technology.</span>
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-[#D2DCD2] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Professional computer and laptop repair, enterprise networking support, and certified CCTV solutions for homes and businesses. Transparent diagnosis, genuine parts, and verified technician dispatch across Bengaluru, Visakhapatnam, and Chennai.
            </p>

            {/* Verified highlights bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs text-[#FAF6F0] max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E2B98E] flex-shrink-0" />
                <span>Up to 90 Days Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E2B98E] flex-shrink-0" />
                <span>Zero Hidden Diagnostic Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E2B98E] flex-shrink-0" />
                <span>Doorstep & Lab Service</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <Link
                to="/contact"
                className="sand-btn-3d w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-2xl text-sm group transition-transform active:scale-95"
              >
                <span>Book a Repair</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#203F30] hover:bg-[#2A523F] text-[#FAF6F0] border border-[#E2B98E]/25 font-semibold px-6 py-3.5 rounded-2xl transition-all text-sm"
              >
                <span>Explore Services</span>
              </Link>

              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[#E2B98E] hover:text-[#FAF6F0] font-semibold px-4 py-3 text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[#E2B98E]" />
                <span>{siteConfig.phoneDisplay}</span>
              </a>
            </div>

            {/* City Quick selector pill row */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-2 text-xs text-[#D2DCD2]">
              <MapPin className="w-3.5 h-3.5 text-[#E2B98E]" />
              <span className="font-medium text-[#FAF6F0]">Target Cities:</span>
              <div className="flex items-center gap-2">
                <Link to="/service-center/bengaluru" className="text-[#D2DCD2] hover:text-[#E2B98E] underline decoration-[#E2B98E]/40 hover:decoration-[#E2B98E]">
                  Bengaluru
                </Link>
                <span>•</span>
                <Link to="/service-center/vizag" className="text-[#D2DCD2] hover:text-[#E2B98E] underline decoration-[#E2B98E]/40 hover:decoration-[#E2B98E]">
                  Vizag
                </Link>
                <span>•</span>
                <Link to="/service-center/chennai" className="text-[#D2DCD2] hover:text-[#E2B98E] underline decoration-[#E2B98E]/40 hover:decoration-[#E2B98E]">
                  Chennai
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Feature Board Inspired by Reference */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Outer decorative card frame */}
              <div className="nature-panel rounded-3xl p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2B98E]/15">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#E2B98E]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#FAF6F0]">Doorstep Dispatch Desk</span>
                  </div>
                  <span className="text-xs text-[#E2B98E] font-mono font-bold">ACTIVE</span>
                </div>

                {/* 4 Interactive Category Badges with 3D tactile palette */}
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/services/laptop-repair"
                    className="nature-card p-3.5 rounded-2xl group flex flex-col justify-between"
                  >
                    <div>
                      <div className="icon-badge-3d p-2 w-fit rounded-xl text-[#E2B98E] mb-2 group-hover:scale-110 transition-transform">
                        <Laptop className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-[#FAF6F0] group-hover:text-[#E2B98E] transition-colors">Laptop Repair</h4>
                      <p className="text-[11px] text-[#D2DCD2] mt-0.5 leading-snug">Chip-level motherboard & display fix</p>
                    </div>
                  </Link>

                  <Link
                    to="/services/computer-repair"
                    className="clay-card p-3.5 rounded-2xl group flex flex-col justify-between"
                  >
                    <div>
                      <div className="p-2 w-fit rounded-xl bg-[#4A2B1D] text-[#E2B98E] border border-[#E2B98E]/20 mb-2 group-hover:scale-110 transition-transform shadow-md">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-[#FAF6F0] group-hover:text-[#E2B98E] transition-colors">Desktop Repair</h4>
                      <p className="text-[11px] text-[#F4E7D7]/80 mt-0.5 leading-snug">SMPS power & BSOD diagnostics</p>
                    </div>
                  </Link>

                  <Link
                    to="/services/networking"
                    className="sand-card p-3.5 rounded-2xl group flex flex-col justify-between"
                  >
                    <div>
                      <div className="p-2 w-fit rounded-xl bg-[#6E4331] text-[#FAF6F0] border border-white/20 mb-2 group-hover:scale-110 transition-transform shadow-md">
                        <Network className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-[#24160E] group-hover:text-white transition-colors">Networking</h4>
                      <p className="text-[11px] text-[#24160E]/90 mt-0.5 leading-snug">CAT6 cabling & Wi-Fi coverage</p>
                    </div>
                  </Link>

                  <Link
                    to="/services/cctv-repair-installation"
                    className="nature-card p-3.5 rounded-2xl group flex flex-col justify-between"
                  >
                    <div>
                      <div className="icon-badge-3d p-2 w-fit rounded-xl text-[#E2B98E] mb-2 group-hover:scale-110 transition-transform">
                        <Video className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold text-[#FAF6F0] group-hover:text-[#E2B98E] transition-colors">CCTV Solutions</h4>
                      <p className="text-[11px] text-[#D2DCD2] mt-0.5 leading-snug">IP cameras & DVR recording setup</p>
                    </div>
                  </Link>
                </div>

                {/* Bottom Assurance strip */}
                <div className="pt-3 border-t border-[#E2B98E]/15 flex items-center justify-between text-xs text-[#D2DCD2]">
                  <div className="flex items-center gap-1.5 text-[#FAF6F0]">
                    <ShieldCheck className="w-4 h-4 text-[#E2B98E]" />
                    <span>Tested OEM Components</span>
                  </div>
                  <Link to="/contact" className="text-xs font-bold text-[#E2B98E] hover:text-[#FAF6F0] flex items-center gap-1">
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

