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
import { siteConfig, servicesData, citiesData } from '../../config/site';

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
    'laptop-repair': <Laptop className="w-4 h-4 text-[#E2B98E]" />,
    'computer-repair': <Monitor className="w-4 h-4 text-[#9BBF9C]" />,
    'networking': <Network className="w-4 h-4 text-[#E2B98E]" />,
    'cctv-repair-installation': <Video className="w-4 h-4 text-[#9BBF9C]" />,
  };

  return (
    <>
      {/* Top emergency announcement bar */}
      <div className="bg-[#0E1B14] text-xs py-2 px-4 border-b border-[#E2B98E]/10 text-[#FAF6F0]/75 hidden sm:block">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#E2B98E]">
              <span className="w-2 h-2 rounded-full bg-[#7AA27D] animate-pulse" />
              <span className="font-semibold text-[#FAF6F0]/85">Verified Service Coverage:</span>
              <span className="text-[#E2B98E]">Bengaluru • Vizag • Chennai • Nellore</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#FAF6F0]/70">
              <Clock className="w-3.5 h-3.5 text-[#E2B98E]" />
              <span>{siteConfig.workingHours}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#FAF6F0]/75">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7AA27D]" />
              <span>Up to 90 Days Service Warranty</span>
            </span>
            <a
              href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Hello Door Step Service, I have a service enquiry.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold"
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
            ? 'bg-[#14281E]/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-[#E2B98E]/15 py-2.5'
            : 'bg-[#14281E]/90 backdrop-blur-sm border-b border-[#E2B98E]/10 py-3'
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center group">
              <div className="bg-white/95 hover:bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl shadow-md border border-[#E2B98E]/30 flex items-center transition-all group-hover:scale-102 group-hover:shadow-lg">
                <img
                  src="/logo.png"
                  alt="Doorstep Laptop Repair Services"
                  className="h-7 sm:h-9 md:h-10 w-auto object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav ref={navContainerRef} className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                onMouseEnter={() => setActiveDropdown(null)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === '/'
                    ? 'text-[#E2B98E] bg-[#E2B98E]/10 font-bold'
                    : 'text-[#FAF6F0]/80 hover:text-[#FAF6F0] hover:bg-[#FAF6F0]/5'
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
                  className={`px-3 py-2 text-sm font-medium rounded-lg inline-flex items-center gap-1.5 transition-colors ${
                    activeDropdown === 'services' || location.pathname.startsWith('/services')
                      ? 'text-[#E2B98E] bg-[#E2B98E]/10 font-bold'
                      : 'text-[#FAF6F0]/80 hover:text-[#FAF6F0] hover:bg-[#FAF6F0]/5'
                  }`}
                  aria-expanded={activeDropdown === 'services'}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'services' && (
                  <div
                    className="absolute top-full left-0 w-80 mt-1 py-2 bg-[#183023] border border-[#E2B98E]/25 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-[#E2B98E] uppercase tracking-wider border-b border-[#E2B98E]/10">
                      Core Repair & IT Verticals
                    </div>
                    {Object.values(servicesData).map((srv) => (
                      <Link
                        key={srv.id}
                        to={`/services/${srv.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-3 px-3.5 py-2.5 hover:bg-[#203F30] transition-colors rounded-xl mx-1.5 group"
                      >
                        <div className="p-2 rounded-lg bg-[#12231A] border border-[#E2B98E]/20 text-[#E2B98E] group-hover:border-[#E2B98E]/50 transition-colors mt-0.5">
                          {serviceIcons[srv.id]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#FAF6F0] group-hover:text-[#E2B98E] transition-colors">
                            {srv.shortTitle}
                          </p>
                          <p className="text-xs text-[#D2DCD2] truncate mt-0.5">
                            {srv.tagline}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <div className="p-2 border-t border-[#E2B98E]/10 mt-1">
                      <Link
                        to="/services"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between text-xs font-semibold text-[#E2B98E] hover:text-[#FAF6F0] px-3 py-1.5 rounded-lg hover:bg-[#203F30] transition-colors"
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
                  className={`px-3 py-2 text-sm font-medium rounded-lg inline-flex items-center gap-1.5 transition-colors ${
                    activeDropdown === 'locations' || location.pathname.startsWith('/service-center') || location.pathname.startsWith('/locations')
                      ? 'text-[#E2B98E] bg-[#E2B98E]/10 font-bold'
                      : 'text-[#FAF6F0]/80 hover:text-[#FAF6F0] hover:bg-[#FAF6F0]/5'
                  }`}
                  aria-expanded={activeDropdown === 'locations'}
                >
                  <span>Locations</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'locations' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'locations' && (
                  <div
                    className="absolute top-full left-0 w-80 mt-1 py-2 bg-[#183023] border border-[#E2B98E]/25 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-[#E2B98E] uppercase tracking-wider border-b border-[#E2B98E]/10">
                      Service Hubs & Cities
                    </div>
                    {Object.values(citiesData).map((city) => (
                      <Link
                        key={city.id}
                        to={`/service-center/${city.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-3 px-3.5 py-2.5 hover:bg-[#203F30] transition-colors rounded-xl mx-1.5 group"
                      >
                        <div className="p-2 rounded-lg bg-[#12231A] border border-[#E2B98E]/20 text-[#E2B98E] group-hover:border-[#E2B98E]/50 transition-colors mt-0.5">
                          <MapPin className="w-4 h-4 text-[#E2B98E]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#FAF6F0] group-hover:text-[#E2B98E] transition-colors">
                            {city.name}
                          </p>
                          <p className="text-xs text-[#D2DCD2] truncate mt-0.5">
                            {city.state} • {city.serviceHub}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <div className="p-2 border-t border-[#E2B98E]/10 mt-1">
                      <Link
                        to="/service-center"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between text-xs font-semibold text-[#E2B98E] hover:text-[#FAF6F0] px-3 py-1.5 rounded-lg hover:bg-[#203F30] transition-colors"
                      >
                        <span>All City Hubs & Coverage Areas</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Book Service - matching user screenshot */}
              <Link
                to="/contact"
                onMouseEnter={() => setActiveDropdown(null)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === '/contact' || location.pathname === '/book-service'
                    ? 'text-[#E2B98E] bg-[#E2B98E]/10 font-bold'
                    : 'text-[#FAF6F0]/80 hover:text-[#FAF6F0] hover:bg-[#FAF6F0]/5'
                }`}
              >
                Book Service
              </Link>

              <Link
                to="/faq"
                onMouseEnter={() => setActiveDropdown(null)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === '/faq'
                    ? 'text-[#E2B98E] bg-[#E2B98E]/10 font-bold'
                    : 'text-[#FAF6F0]/80 hover:text-[#FAF6F0] hover:bg-[#FAF6F0]/5'
                }`}
              >
                FAQs
              </Link>

              <Link
                to="/about"
                onMouseEnter={() => setActiveDropdown(null)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === '/about'
                    ? 'text-[#E2B98E] bg-[#E2B98E]/10 font-bold'
                    : 'text-[#FAF6F0]/80 hover:text-[#FAF6F0] hover:bg-[#FAF6F0]/5'
                }`}
              >
                About Us
              </Link>
            </nav>

            {/* Header Right Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#6E4331]/60 hover:bg-[#6E4331] text-[#FAF6F0] border border-[#E2B98E]/30 text-xs font-semibold transition-all shadow-md"
                title="Direct Phone Call"
              >
                <Phone className="w-3.5 h-3.5 text-[#E2B98E] animate-bounce" />
                <span className="hidden xl:inline">{siteConfig.phoneDisplay}</span>
                <span className="xl:hidden">Call Now</span>
              </a>

              <Link
                to="/contact"
                className="sand-btn-3d inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[#24160E] text-xs font-bold transition-all"
              >
                <span>Book a Repair</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="w-9 h-9 rounded-full icon-badge-3d flex items-center justify-center text-[#E2B98E] shadow-sm"
                aria-label="Call Helpline"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-[#12231A] border border-[#E2B98E]/20 text-[#FAF6F0] hover:text-[#E2B98E] focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E2B98E]/15 bg-[#14281E] px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-3 duration-200 shadow-2xl">
            <div className="space-y-1">
              <Link
                to="/"
                className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#FAF6F0] hover:bg-[#203F30]"
              >
                Home
              </Link>

              {/* Mobile Services */}
              <div className="px-3.5 pt-2 text-xs font-bold uppercase tracking-wider text-[#E2B98E]">
                Services
              </div>
              <div className="grid grid-cols-1 gap-1 pl-2">
                {Object.values(servicesData).map((srv) => (
                  <Link
                    key={srv.id}
                    to={`/services/${srv.slug}`}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-[#FAF6F0]/85 hover:bg-[#203F30]"
                  >
                    {serviceIcons[srv.id]}
                    <span>{srv.title}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Locations */}
              <div className="px-3.5 pt-2 text-xs font-bold uppercase tracking-wider text-[#E2B98E] mt-2">
                Target Cities
              </div>
              <div className="grid grid-cols-1 gap-1 pl-2">
                {Object.values(citiesData).map((city) => (
                  <Link
                    key={city.id}
                    to={`/service-center/${city.slug}`}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-[#FAF6F0]/85 hover:bg-[#203F30]"
                  >
                    <MapPin className="w-4 h-4 text-[#E2B98E]" />
                    <span>{city.name}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-[#E2B98E]/10 my-2 pt-2">
                <Link
                  to="/about"
                  className="block px-3.5 py-2 rounded-xl text-sm font-medium text-[#FAF6F0]/85 hover:bg-[#203F30]"
                >
                  About Us
                </Link>
                <Link
                  to="/faq"
                  className="block px-3.5 py-2 rounded-xl text-sm font-medium text-[#FAF6F0]/85 hover:bg-[#203F30]"
                >
                  Frequently Asked Questions
                </Link>
                <Link
                  to="/contact"
                  className="block px-3.5 py-2 rounded-xl text-sm font-medium text-[#FAF6F0]/85 hover:bg-[#203F30]"
                >
                  Contact & Book Repair
                </Link>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="w-full py-3 px-4 rounded-full sand-btn-3d text-[#24160E] font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call {siteConfig.phoneDisplay}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Hello Door Step Service, I need a repair quote.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#12231A] font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md"
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
