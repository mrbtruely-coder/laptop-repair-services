import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const FloatingActionWidget: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const whatsappMessage = encodeURIComponent(
    'Hello! I need computer / laptop / networking / CCTV repair service. Please assist me.'
  );
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappRaw}?text=${whatsappMessage}`;

  return (
    <div
      className="fixed bottom-24 right-4 sm:bottom-8 sm:right-6 z-[9999] flex flex-col items-end gap-3.5 pointer-events-auto select-none"
      aria-label="Floating Contact & Navigation Actions"
    >
      {/* 1. CALL BUTTON (TOP) */}
      <a
        href={`tel:${siteConfig.phoneRaw}`}
        aria-label={`Call us at ${siteConfig.phoneDisplay}`}
        className="group relative flex items-center"
      >
        {/* Tooltip / Label */}
        <span className="hidden sm:inline-block absolute right-14 px-3 py-1.5 rounded-lg bg-[#0F1E16] text-[#FAF6F0] text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md border border-blue-500/30">
          Call: {siteConfig.phoneDisplay}
        </span>

        {/* Circular Blue Call Button */}
        <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white flex items-center justify-center shadow-lg shadow-blue-500/50 border border-blue-400/40 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer">
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-current animate-[wiggle_1.5s_ease-in-out_infinite]" />
        </div>
      </a>

      {/* 2. WHATSAPP CHAT BUTTON (MIDDLE) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex items-center"
      >
        {/* Badge Pill on the left (matches user's screenshot) */}
        <span className="hidden sm:flex items-center px-3.5 py-1.5 mr-2 rounded-xl bg-[#0F1E16]/95 text-[#FAF6F0] text-xs font-bold tracking-wide shadow-xl border border-emerald-500/30 group-hover:border-emerald-400 group-hover:bg-[#14281E] transition-all duration-200">
          WhatsApp Chat
        </span>

        {/* Circular Green WhatsApp Button */}
        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white flex items-center justify-center shadow-xl shadow-emerald-500/50 border border-emerald-300/40 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer">
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.652-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
      </a>

      {/* 3. SCROLL TO TOP (UP ARROW) BUTTON (BOTTOM) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          type="button"
          aria-label="Scroll to top of page"
          title="Scroll to Top"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#141C24] text-[#FAF6F0] border border-white/20 hover:border-[#E2B98E] shadow-xl hover:shadow-black/50 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer animate-in fade-in zoom-in-75"
        >
          {/* Tooltip on hover */}
          <span className="absolute right-14 px-3 py-1.5 rounded-lg bg-[#0F1E16] text-[#FAF6F0] text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md border border-[#E2B98E]/20">
            Back to Top
          </span>
          <ArrowUp className="w-5 h-5 text-slate-200 group-hover:text-[#E2B98E] group-hover:-translate-y-0.5 transition-all duration-200" />
        </button>
      )}
    </div>
  );
};
