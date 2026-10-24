import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { siteConfig } from '../config/site';
import { ShieldCheck, Award, Cpu, Users, ArrowRight, Phone, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEO
        title="About Us | Certified Computer, Laptop & IT Repair Specialists"
        description="Learn about our certified engineering ethos, component-level motherboard diagnostic labs, genuine spare parts policy, and doorstep operations across Bengaluru, Vizag, Chennai, and Nellore."
        canonicalPath="/about"
        keywords={[
          'about TechFix computer repair',
          'certified laptop repair engineers',
          'chip-level diagnostic lab',
          'laptop repair warranty South India',
          'doorstep IT repair company'
        ]}
        breadcrumbs={[
          { name: 'About Us', url: '/about' }
        ]}
      />

      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero */}
      <section className="py-14 sm:py-20 bg-[#12231A] border-b border-[#E2B98E]/15 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7AA27D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#E2B98E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-semibold mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#E2B98E]" />
            <span>Our Engineering Ethos</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAF6F0] tracking-tight">
            Reliable IT Hardware & Infrastructure Specialists
          </h1>
          <p className="text-[#D2DCD2] text-sm sm:text-base mt-4 leading-relaxed">
            {siteConfig.brandName} was built to provide honest, component-level repairs without hidden fees or unnecessary full-motherboard replacements. We serve homes and enterprises across Bengaluru, Visakhapatnam, and Chennai.
          </p>
        </div>
      </section>

      {/* Philosophy and Core Values */}
      <section className="py-14 sm:py-20 bg-[#12231A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#E2B98E] uppercase tracking-wider block">
                Why We Exist
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAF6F0] tracking-tight">
                Demystifying Computer & Hardware Repairs
              </h2>
              <p className="text-sm text-[#D2DCD2] leading-relaxed">
                For too long, customers facing laptop or desktop failures have had to endure vague diagnoses, inflated quotes, and unverified parts. Many service centers push for complete board replacements when a simple ₹500 power MOSFET or capacitor failed.
              </p>
              <p className="text-sm text-[#D2DCD2] leading-relaxed">
                At {siteConfig.brandName}, our laboratory engineers use precision multi-meters, thermal imaging, and schematic board diagrams to trace faults directly to the component level, saving our clients up to 70% of replacement costs while restoring equipment to manufacturer tolerances.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-[#14281E] border border-[#E2B98E]/15 shadow-md">
                  <span className="text-2xl font-bold text-[#7AA27D] font-mono block">90 Days</span>
                  <span className="text-xs text-[#FAF6F0]/80">Hardware Service Warranty</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#14281E] border border-[#E2B98E]/15 shadow-md">
                  <span className="text-2xl font-bold text-[#E2B98E] font-mono block">3 Hubs</span>
                  <span className="text-xs text-[#FAF6F0]/80">Bengaluru • Vizag • Chennai</span>
                </div>
              </div>
            </div>

            <div className="nature-panel p-6 sm:p-8 rounded-3xl border border-[#E2B98E]/25 space-y-5 shadow-2xl">
              <h3 className="text-lg font-bold text-[#FAF6F0]">Our 4 Pillars of Operation</h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl icon-badge-sage text-[#FAF6F0] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FAF6F0] text-sm">Transparent Diagnostics</h4>
                    <p className="text-[#D2DCD2] mt-0.5">We explain the root failure cause clearly in plain language before quoting.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl icon-badge-sand text-[#24160E] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FAF6F0] text-sm">Authentic OEM Components</h4>
                    <p className="text-[#D2DCD2] mt-0.5">We only use genuine screens, batteries, SMPS units, and tested IC components.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl icon-badge-clay text-[#FAF6F0] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FAF6F0] text-sm">Strict Specialization</h4>
                    <p className="text-[#D2DCD2] mt-0.5">We focus strictly on computing, networking, and CCTV. No kitchen appliances or unrelated electronics.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl icon-badge-3d text-[#E2B98E] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#FAF6F0] text-sm">Customer Data Privacy</h4>
                    <p className="text-[#D2DCD2] mt-0.5">Zero unauthorized disk exploration or data transfer. Your files remain strictly confidential.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* City Coverage note */}
          <div className="p-8 rounded-3xl clay-card border border-[#E2B98E]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold text-[#FAF6F0]">Have a technical question or need a quote?</h3>
              <p className="text-xs text-[#FAF6F0]/80 max-w-xl">
                Our support team is available 7 days a week from 8:30 AM to 8:30 PM.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="px-5 py-3 rounded-xl sand-btn-3d text-[#24160E] font-bold text-xs transition-all shadow-md flex items-center gap-2"
              >
                <span>Contact Our Helpdesk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="px-4 py-3 rounded-xl bg-[#12231A] hover:bg-[#12231A]/80 text-[#FAF6F0] text-xs font-semibold border border-[#E2B98E]/30 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-[#E2B98E]" />
                <span>{siteConfig.phoneDisplay}</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};
