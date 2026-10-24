import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  Smartphone
} from 'lucide-react';
import { siteConfig, servicesData, primaryCities } from '../../config/site';
import { AppDownloadBadges } from '../common/AppDownloadBadges';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F8FAFC] border-t border-slate-200 text-black text-sm mt-auto">
      {/* City-specific quick links banner */}
      <div className="border-b border-slate-200 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className="text-black font-bold text-base tracking-tight flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#22C55E]" />
                <span>Local Service Coverage in India</span>
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Verified on-site technician dispatch & diagnostic facilities across Bengaluru, Vizag, Chennai, and Chanda Nagar.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {primaryCities.map((city) => (
                <Link
                  key={city.id}
                  to={`/service-center/${city.slug}`}
                  className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#22C55E] border border-slate-200 hover:border-[#16A34A] text-xs text-black hover:text-white transition-all flex items-center gap-1.5 shadow-sm font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] group-hover:bg-white" />
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
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-md">
                <img
                  src="/logo.png"
                  alt="Laptop Repairs & Services"
                  className="h-12 sm:h-14 w-12 sm:w-14 object-contain rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold text-black tracking-tight flex items-center gap-2">
                  Laptop Repairs
                  <span className="text-white text-[10px] px-2 py-0.5 rounded-full bg-[#22C55E] font-bold">
                    DOORSTEP
                  </span>
                </span>
                <span className="text-xs uppercase tracking-wider text-[#16A34A] font-bold">
                  & Services
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-700 leading-relaxed max-w-sm">
              Professional laptop servicing, desktop computer diagnostics, enterprise networking, and CCTV security. Focused on customer transparency and verified technicians.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-black font-medium">
                <ShieldCheck className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                <span>{siteConfig.warrantyHighlight}</span>
              </div>
              <div className="flex items-center gap-2 text-black font-medium">
                <Clock className="w-4 h-4 text-[#06223A] flex-shrink-0" />
                <span>{siteConfig.workingHours}</span>
              </div>
            </div>

            {/* Mobile App Download Badges in Footer */}
            <div className="pt-3 border-t border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-black uppercase tracking-wider mb-2.5">
                <Smartphone className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Download Mobile App:</span>
              </div>
              <AppDownloadBadges size="sm" theme="navy" />
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h5 className="text-xs font-bold text-black uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
              Our Services
            </h5>
            <ul className="space-y-2.5 text-xs">
              {Object.values(servicesData).map((srv) => (
                <li key={srv.id}>
                  <Link
                    to={`/services/${srv.slug}`}
                    className="hover:text-[#16A34A] transition-colors flex items-center gap-1.5 group text-slate-700 font-medium"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#16A34A] transition-colors" />
                    <span>{srv.shortTitle}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/services" className="text-[#16A34A] hover:underline font-bold">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular City Pages */}
          <div>
            <h5 className="text-xs font-bold text-black uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
              City Landing Pages
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/service-center/bengaluru/laptop-repair" className="hover:text-[#16A34A] transition-colors flex items-center gap-1.5 group text-slate-700 font-medium">
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#16A34A] transition-colors" />
                  <span>Bengaluru Laptop Repair</span>
                </Link>
              </li>
              <li>
                <Link to="/service-center/vizag/computer-repair" className="hover:text-[#16A34A] transition-colors flex items-center gap-1.5 group text-slate-700 font-medium">
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#16A34A] transition-colors" />
                  <span>Vizag Computer Repair</span>
                </Link>
              </li>
              <li>
                <Link to="/service-center/chennai/cctv-repair-installation" className="hover:text-[#16A34A] transition-colors flex items-center gap-1.5 group text-slate-700 font-medium">
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#16A34A] transition-colors" />
                  <span>Chennai CCTV Services</span>
                </Link>
              </li>
              <li>
                <Link to="/service-center/bengaluru/networking" className="hover:text-[#16A34A] transition-colors flex items-center gap-1.5 group text-slate-700 font-medium">
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#16A34A] transition-colors" />
                  <span>Bengaluru Office Networking</span>
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-[#16A34A] hover:underline font-bold pt-1 block">
                  All Locations Directory →
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h5 className="text-xs font-bold text-black uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
              Service Helpline
            </h5>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="flex items-center gap-2.5 hover:text-[#16A34A] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#06223A] group-hover:bg-[#22C55E] group-hover:text-white transition-all shadow-sm">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Phone Support</span>
                    <span className="text-black font-bold">{siteConfig.phoneDisplay}</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Hello Door Step Service, I have a service enquiry.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#16A34A] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all shadow-sm">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">WhatsApp Chat</span>
                    <span className="text-black font-bold">{siteConfig.whatsappDisplay}</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="flex items-center gap-2.5 hover:text-[#16A34A] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#06223A] group-hover:bg-[#22C55E] group-hover:text-white transition-all shadow-sm">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Email Desk</span>
                    <span className="text-black font-medium truncate block max-w-[150px]">{siteConfig.supportEmail}</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Verification & Transparency Disclaimer */}
        <div className="mt-12 pt-6 border-t border-slate-200 text-[11px] text-slate-600 leading-relaxed bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p>
            <strong className="text-black font-bold">Service Policy & Disclaimer:</strong> {siteConfig.brandName} operates for computer, laptop, networking, and CCTV diagnostics across Bengaluru, Visakhapatnam, Chennai, and Chanda Nagar. All diagnostic estimates are quoted before work begins. Brand names (Dell, HP, Lenovo, Apple, Asus, Acer, Cisco, Hikvision, Dahua, etc.) are used solely for descriptive compatibility identification.
          </p>
        </div>

        {/* Copyright and Bottom Links */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-black transition-colors font-medium">About</Link>
            <Link to="/faq" className="hover:text-black transition-colors font-medium">FAQs</Link>
            <Link to="/contact" className="hover:text-black transition-colors font-medium">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
