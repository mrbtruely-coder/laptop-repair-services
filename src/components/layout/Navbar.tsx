import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Phone,
  MessageSquare,
  Menu,
  X,
  Laptop,
  Monitor,
  Network,
  Video,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { siteConfig, servicesData, primaryCities } from '../../config/site';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'locations' | null>(null);
  const location = useLocation();

  const navContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Click outside to close desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const serviceIcons: Record<string, React.ReactNode> = {
    'laptop-repair': <Laptop className="w-4 h-4 text-[#22C55E]" />,
    'computer-repair': <Monitor className="w-4 h-4 text-[#4ADE80]" />,
    'networking': <Network className="w-4 h-4 text-[#22C55E]" />,
    'cctv-repair-installation': <Video className="w-4 h-4 text-[#4ADE80]" />,
  };

  return (
    <>
      {/* Top emergency announcement bar */}
      <div className="bg-[#03101B] text-xs py-2 px-4 border-b border-[#22C55E]/15 text-[#FFFFFF]/80 hidden sm:block">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#22C55E]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="font-semibold text-[#FFFFFF]/90">Verified Service Coverage:</span>
              <span className="text-[#22C55E] font-medium">Bengaluru • Vizag • Chennai • Hyderabad</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#FFFFFF]/75">
              <Clock className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>{siteConfig.workingHours}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#FFFFFF]/80">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Up to 90 Days Service Warranty</span>
            </span>
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Hello Door Step Service, I have a service enquiry.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22C55E] hover:underline flex items-center gap-1 font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-2.5'
          : 'bg-white/95 backdrop-blur-sm border-b border-slate-200 py-3'
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="p-0.5 flex items-center justify-center transition-transform group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="Laptop Repairs & Services"
                  className="h-10 sm:h-12 w-10 sm:w-12 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#06223A] flex items-center gap-1.5 leading-tight">
                  Laptop Repairs
                  <span className="text-white text-[10px] px-1.5 py-0.5 rounded-full bg-[#22C55E] font-bold">
                    DOORSTEP
                  </span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#16A34A] font-bold">
                  & Services
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav ref={navContainerRef} className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                onMouseEnter={() => setActiveDropdown(null)}
                className={`px-3 py-2 text-sm rounded-xl transition-all ${location.pathname === '/'
                    ? 'text-black font-extrabold bg-[#22C55E]/20 border border-[#22C55E]/40 shadow-sm'
                    : 'text-slate-800 font-semibold hover:text-black hover:bg-slate-100'
                  }`}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                  onMouseEnter={() => setActiveDropdown('services')}
                  className={`px-3 py-2 text-sm rounded-xl inline-flex items-center gap-1.5 transition-all ${activeDropdown === 'services' || location.pathname.startsWith('/services')
                      ? 'text-black font-extrabold bg-[#22C55E]/20 border border-[#22C55E]/40 shadow-sm'
                      : 'text-slate-800 font-semibold hover:text-black hover:bg-slate-100'
                    }`}
                  aria-expanded={activeDropdown === 'services'}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180 text-black' : 'text-slate-600'}`} />
                </button>

                {activeDropdown === 'services' && (
                  <div
                    className="absolute top-full left-0 w-80 mt-1 py-2 bg-white border border-slate-200 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                  >
                    <div className="px-3.5 py-2 text-[11px] font-bold text-black uppercase tracking-wider border-b border-slate-100">
                      Core Repair & IT Verticals
                    </div>
                    {Object.values(servicesData).map((srv) => (
                      <Link
                        key={srv.id}
                        to={`/services/${srv.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-3 px-3.5 py-2.5 hover:bg-slate-50 transition-colors rounded-xl mx-1.5 group"
                      >
                        <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-[#22C55E] group-hover:border-[#22C55E]/50 transition-colors mt-0.5">
                          {serviceIcons[srv.id]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-black group-hover:text-[#16A34A] transition-colors">
                            {srv.shortTitle}
                          </p>
                          <p className="text-xs text-slate-500 truncate mt-0.5">
                            {srv.tagline}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <div className="p-2 border-t border-slate-100 mt-1">
                      <Link
                        to="/services"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between text-xs font-semibold text-[#16A34A] hover:text-[#06223A] px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <span>Explore All Services</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Locations Dropdown */}
              <div
                className="relative"
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'locations' ? null : 'locations')}
                  onMouseEnter={() => setActiveDropdown('locations')}
                  className={`px-3 py-2 text-sm rounded-xl inline-flex items-center gap-1.5 transition-all ${activeDropdown === 'locations' || location.pathname.startsWith('/service-center') || location.pathname.startsWith('/locations')
                      ? 'text-black font-extrabold bg-[#22C55E]/20 border border-[#22C55E]/40 shadow-sm'
                      : 'text-slate-800 font-semibold hover:text-black hover:bg-slate-100'
                    }`}
                  aria-expanded={activeDropdown === 'locations'}
                >
                  <span>Locations</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'locations' ? 'rotate-180 text-black' : 'text-slate-600'}`} />
                </button>

                {activeDropdown === 'locations' && (
                  <div
                    className="absolute top-full left-0 w-64 mt-1 py-2 bg-white border border-slate-200 rounded-2xl shadow-xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                  >
                    <div className="px-3.5 py-2 text-[11px] font-bold text-black uppercase tracking-wider border-b border-slate-100">
                      Service Hubs & Cities
                    </div>
                    {primaryCities.map((city) => (
                      <Link
                        key={city.id}
                        to={`/service-center/${city.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-50 transition-colors rounded-xl mx-1.5 group"
                      >
                        <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-[#22C55E] group-hover:border-[#22C55E]/50 transition-colors">
                          <MapPin className="w-4 h-4 text-[#22C55E]" />
                        </div>
                        <span className="text-sm font-bold text-black group-hover:text-[#16A34A] transition-colors">
                          {city.name}
                        </span>
                      </Link>
                    ))}
                    <div className="p-2 border-t border-slate-100 mt-1">
                      <Link
                        to="/service-center"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between text-xs font-semibold text-[#16A34A] hover:text-[#06223A] px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <span>All City Hubs & Coverage</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Book Service */}
              <Link
                to="/book-service"
                onMouseEnter={() => setActiveDropdown(null)}
                className={`px-3 py-2 text-sm rounded-xl transition-all ${location.pathname === '/book-service'
                    ? 'text-black font-extrabold bg-[#22C55E]/20 border border-[#22C55E]/40 shadow-sm'
                    : 'text-slate-800 font-semibold hover:text-black hover:bg-slate-100'
                  }`}
              >
                Book Service
              </Link>

              <Link
                to="/faq"
                onMouseEnter={() => setActiveDropdown(null)}
                className={`px-3 py-2 text-sm rounded-xl transition-all ${location.pathname === '/faq'
                    ? 'text-black font-extrabold bg-[#22C55E]/20 border border-[#22C55E]/40 shadow-sm'
                    : 'text-slate-800 font-semibold hover:text-black hover:bg-slate-100'
                  }`}
              >
                FAQs
              </Link>

              <Link
                to="/contact"
                onMouseEnter={() => setActiveDropdown(null)}
                className={`px-3 py-2 text-sm rounded-xl transition-all ${location.pathname === '/contact'
                    ? 'text-black font-extrabold bg-[#22C55E]/20 border border-[#22C55E]/40 shadow-sm'
                    : 'text-slate-800 font-semibold hover:text-black hover:bg-slate-100'
                  }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Header Right Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#06223A] hover:bg-[#0A3356] text-white text-xs font-semibold transition-all shadow-md"
                title="Direct Phone Call"
              >
                <Phone className="w-3.5 h-3.5 text-[#22C55E] animate-bounce" />
                <span className="hidden xl:inline">{siteConfig.phoneDisplay}</span>
                <span className="xl:hidden">Call Now</span>
              </a>

              <Link
                to="/book-service"
                className="sand-btn-3d inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-md"
              >
                <span>Book a Repair</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[#22C55E] shadow-sm"
                aria-label="Call Helpline"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-white border border-slate-200 text-[#06223A] hover:text-[#22C55E] focus:outline-none shadow-sm"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-3 duration-200 shadow-2xl">
            <div className="space-y-1">
              <Link
                to="/"
                className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#06223A] hover:bg-slate-50"
              >
                Home
              </Link>

              {/* Mobile Services */}
              <div className="px-3.5 pt-2 text-xs font-bold uppercase tracking-wider text-[#22C55E]">
                Services
              </div>
              <div className="grid grid-cols-1 gap-1 pl-2">
                {Object.values(servicesData).map((srv) => (
                  <Link
                    key={srv.id}
                    to={`/services/${srv.slug}`}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-[#06223A]/85 hover:bg-slate-50"
                  >
                    {serviceIcons[srv.id]}
                    <span>{srv.title}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Locations */}
              <div className="px-3.5 pt-2 text-xs font-bold uppercase tracking-wider text-[#22C55E] mt-2">
                Target Cities
              </div>
              <div className="grid grid-cols-1 gap-1 pl-2">
                {primaryCities.map((city) => (
                  <Link
                    key={city.id}
                    to={`/service-center/${city.slug}`}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-black font-medium hover:bg-slate-50"
                  >
                    <MapPin className="w-4 h-4 text-[#22C55E]" />
                    <span>{city.name}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-slate-100 my-2 pt-2">
                <Link
                  to="/book-service"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3.5 py-2 rounded-xl text-sm font-medium text-[#06223A]/85 hover:bg-slate-50"
                >
                  Book Service
                </Link>
                <Link
                  to="/faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3.5 py-2 rounded-xl text-sm font-medium text-[#06223A]/85 hover:bg-slate-50"
                >
                  Frequently Asked Questions
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3.5 py-2 rounded-xl text-sm font-medium text-[#06223A]/85 hover:bg-slate-50"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="w-full py-3 px-4 rounded-full bg-[#06223A] text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#0A3356]"
              >
                <Phone className="w-4 h-4 text-[#22C55E]" />
                <span>Call {siteConfig.phoneDisplay}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Hello Door Step Service, I need a repair quote.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
