import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { siteConfig, servicesData, citiesData } from '../../config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0E1B14] border-t border-[#E2B98E]/15 text-[#FAF6F0]/70 text-sm mt-auto">
      {/* City-specific quick links banner */}
      <div className="border-b border-[#E2B98E]/10 py-8 bg-[#14281E]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className="text-[#FAF6F0] font-bold text-base tracking-tight flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E2B98E]" />
                <span>Local Service Coverage in India</span>
              </h4>
              <p className="text-xs text-[#FAF6F0]/65 mt-1">
                Verified on-site technician dispatch & diagnostic facilities across Bengaluru, Vizag, Chennai, and Nellore.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.values(citiesData).map((city) => (
                <Link
                  key={city.id}
                  to={`/service-center/${city.slug}`}
                  className="px-3.5 py-1.5 rounded-full bg-[#12231A] hover:bg-[#203F30] border border-[#E2B98E]/15 hover:border-[#E2B98E]/40 text-xs text-[#FAF6F0]/85 hover:text-[#FAF6F0] transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2B98E]" />
                  <span>{city.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl icon-badge-3d flex items-center justify-center text-[#E2B98E] shadow-md">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-[#FAF6F0] tracking-tight">
                {siteConfig.brandName} <span className="text-[#E2B98E] font-medium">DOORSTEP</span>
              </span>
            </Link>

            <p className="text-xs text-[#FAF6F0]/70 leading-relaxed max-w-sm">
              Professional laptop servicing, desktop computer diagnostics, enterprise networking, and CCTV security. Focused on customer transparency and verified technicians.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#FAF6F0]/80">
                <ShieldCheck className="w-4 h-4 text-[#7AA27D] flex-shrink-0" />
                <span>{siteConfig.warrantyHighlight}</span>
              </div>
              <div className="flex items-center gap-2 text-[#FAF6F0]/80">
                <Clock className="w-4 h-4 text-[#E2B98E] flex-shrink-0" />
                <span>{siteConfig.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h5 className="text-xs font-bold text-[#E2B98E] uppercase tracking-wider mb-4 border-b border-[#E2B98E]/10 pb-2">
              Our Services
            </h5>
            <ul className="space-y-2.5 text-xs">
              {Object.values(servicesData).map((srv) => (
                <li key={srv.id}>
                  <Link
                    to={`/services/${srv.slug}`}
                    className="hover:text-[#E2B98E] transition-colors flex items-center gap-1.5 group text-[#FAF6F0]/75"
                  >
                    <ChevronRight className="w-3 h-3 text-[#FAF6F0]/40 group-hover:text-[#E2B98E] transition-colors" />
                    <span>{srv.shortTitle}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/services" className="text-[#E2B98E] hover:underline font-semibold">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular City Pages */}
          <div>
            <h5 className="text-xs font-bold text-[#E2B98E] uppercase tracking-wider mb-4 border-b border-[#E2B98E]/10 pb-2">
              City Landing Pages
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/bengaluru/laptop-repair" className="hover:text-[#E2B98E] transition-colors flex items-center gap-1.5 group text-[#FAF6F0]/75">
                  <ChevronRight className="w-3 h-3 text-[#FAF6F0]/40 group-hover:text-[#E2B98E] transition-colors" />
                  <span>Bengaluru Laptop Repair</span>
                </Link>
              </li>
              <li>
                <Link to="/vizag/computer-repair" className="hover:text-[#E2B98E] transition-colors flex items-center gap-1.5 group text-[#FAF6F0]/75">
                  <ChevronRight className="w-3 h-3 text-[#FAF6F0]/40 group-hover:text-[#E2B98E] transition-colors" />
                  <span>Vizag Computer Repair</span>
                </Link>
              </li>
              <li>
                <Link to="/chennai/cctv-repair-installation" className="hover:text-[#E2B98E] transition-colors flex items-center gap-1.5 group text-[#FAF6F0]/75">
                  <ChevronRight className="w-3 h-3 text-[#FAF6F0]/40 group-hover:text-[#E2B98E] transition-colors" />
                  <span>Chennai CCTV Services</span>
                </Link>
              </li>
              <li>
                <Link to="/bengaluru/networking" className="hover:text-[#E2B98E] transition-colors flex items-center gap-1.5 group text-[#FAF6F0]/75">
                  <ChevronRight className="w-3 h-3 text-[#FAF6F0]/40 group-hover:text-[#E2B98E] transition-colors" />
                  <span>Bengaluru Office Networking</span>
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-[#E2B98E] hover:underline font-semibold pt-1 block">
                  All Locations Directory →
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h5 className="text-xs font-bold text-[#E2B98E] uppercase tracking-wider mb-4 border-b border-[#E2B98E]/10 pb-2">
              Service Helpline
            </h5>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="flex items-center gap-2.5 hover:text-[#FAF6F0] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full icon-badge-3d flex items-center justify-center text-[#E2B98E] group-hover:scale-105 transition-transform shadow-sm">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#FAF6F0]/50 block">Phone Support</span>
                    <span className="text-[#FAF6F0] font-semibold">{siteConfig.phoneDisplay}</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Hello Door Step Service, I have a service enquiry.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#FAF6F0] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full icon-badge-clay flex items-center justify-center text-[#25D366] group-hover:scale-105 transition-transform shadow-sm">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#FAF6F0]/50 block">WhatsApp Chat</span>
                    <span className="text-[#FAF6F0] font-semibold">{siteConfig.whatsappDisplay}</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="flex items-center gap-2.5 hover:text-[#FAF6F0] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full icon-badge-3d flex items-center justify-center text-[#E2B98E] group-hover:scale-105 transition-transform shadow-sm">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#FAF6F0]/50 block">Email Desk</span>
                    <span className="text-[#FAF6F0]/80 truncate block max-w-[150px]">{siteConfig.supportEmail}</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Verification & Transparency Disclaimer */}
        <div className="mt-12 pt-6 border-t border-[#E2B98E]/10 text-[11px] text-[#FAF6F0]/55 leading-relaxed bg-[#14281E]/60 p-5 rounded-2xl border border-[#E2B98E]/10">
          <p>
            <strong className="text-[#E2B98E]">Service Policy & Disclaimer:</strong> {siteConfig.brandName} operates for computer, laptop, networking, and CCTV diagnostics across Bengaluru, Visakhapatnam, Chennai, and Nellore. All diagnostic estimates are quoted before work begins. Brand names (Dell, HP, Lenovo, Apple, Asus, Acer, Cisco, Hikvision, Dahua, etc.) are used solely for descriptive compatibility identification.
          </p>
        </div>

        {/* Copyright and Bottom Links */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6F0]/50 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-[#E2B98E] transition-colors">About</Link>
            <Link to="/faq" className="hover:text-[#E2B98E] transition-colors">FAQs</Link>
            <Link to="/contact" className="hover:text-[#E2B98E] transition-colors">Contact</Link>

          </div>
        </div>
      </div>
    </footer>
  );
};

