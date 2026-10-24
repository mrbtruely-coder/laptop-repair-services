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
        description="Learn about our certified engineering ethos, component-level motherboard diagnostic labs, genuine spare parts policy, and doorstep operations across Bengaluru, Vizag, Chennai, and Chanda Nagar."
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
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Our Engineering Ethos</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-black tracking-tight leading-tight">
            Reliable IT Hardware & Infrastructure Specialists
          </h1>
          <p className="text-slate-800 text-sm sm:text-base mt-4 leading-relaxed font-normal">
            {siteConfig.brandName} was built to provide honest, component-level repairs without hidden fees or unnecessary full-motherboard replacements. We serve homes and enterprises across Bengaluru, Visakhapatnam, Chennai, and Chanda Nagar.
          </p>
        </div>
      </section>

      {/* Philosophy and Core Values */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider block">
                Why We Exist
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                Demystifying Computer & Hardware Repairs
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                For too long, customers facing laptop or desktop failures have had to endure vague diagnoses, inflated quotes, and unverified parts. Many service centers push for complete board replacements when a simple ₹500 power MOSFET or capacitor failed.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                At {siteConfig.brandName}, our laboratory engineers use precision multi-meters, thermal imaging, and schematic board diagrams to trace faults directly to the component level, saving our clients up to 70% of replacement costs while restoring equipment to manufacturer tolerances.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-2xl font-bold text-[#16A34A] font-mono block">90 Days</span>
                  <span className="text-xs text-black font-medium">Hardware Service Warranty</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-2xl font-bold text-[#06223A] font-mono block">4 Hubs</span>
                  <span className="text-xs text-black font-medium">Bengaluru • Vizag • Chennai • Chanda Nagar</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5 shadow-sm">
              <h3 className="text-lg font-bold text-black">Our 4 Pillars of Operation</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16A34A] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-sm">Transparent Diagnostics</h4>
                    <p className="text-slate-600 mt-0.5">We explain the root failure cause clearly in plain language before quoting.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-[#06223A] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-sm">Authentic OEM Components</h4>
                    <p className="text-slate-600 mt-0.5">We only use genuine screens, batteries, SMPS units, and tested IC components.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-black flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-sm">Strict Specialization</h4>
                    <p className="text-slate-600 mt-0.5">We focus strictly on computing, networking, and CCTV. No kitchen appliances or unrelated electronics.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16A34A] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-sm">Customer Data Privacy</h4>
                    <p className="text-slate-600 mt-0.5">Zero unauthorized disk exploration or data transfer. Your files remain strictly confidential.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* City Coverage note */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold text-black">Have a technical question or need a quote?</h3>
              <p className="text-xs text-slate-600 max-w-xl">
                Our support team is available 7 days a week from 8:30 AM to 8:30 PM.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="px-5 py-3 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2"
              >
                <span>Contact Our Helpdesk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="px-4 py-3 rounded-xl bg-[#06223A] hover:bg-[#0A3356] text-white text-xs font-semibold border border-slate-300 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#22C55E]" />
                <span>{siteConfig.phoneDisplay}</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};
