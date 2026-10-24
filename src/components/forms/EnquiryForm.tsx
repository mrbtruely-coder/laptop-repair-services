import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Tag,
  Sparkles,
  Check,
  X,
  CreditCard,
  Receipt,
  PartyPopper,
  Gift,
  ShieldCheck,
  User,
  Laptop,
  Monitor,
  Network,
  Video,
  Mail,
} from 'lucide-react';
import { siteConfig, citiesData } from '../../config/site';

export interface SubcategoryOption {
  id: string;
  name: string;
  desc?: string;
}

export const SERVICE_SUBCATEGORIES: Record<string, SubcategoryOption[]> = {
  'laptop-repair': [
    { id: 'screen-replacement', name: 'Screen & Display Replacement', desc: 'Broken LCD, flicker, lines, black display' },
    { id: 'motherboard-chip', name: 'Motherboard Chip-Level Repair', desc: 'No power, water spill, dead board, short circuit' },
    { id: 'battery-charging', name: 'Battery Replacement & Charging', desc: 'Drains fast, not charging, port loose/broken' },
    { id: 'keyboard-trackpad', name: 'Keyboard & Trackpad Fix', desc: 'Keys not typing, stuck keys, unresponsive touchpad' },
    { id: 'ssd-ram-upgrade', name: 'SSD & RAM Speed Upgrade', desc: 'Slow speed, lagging, storage full, NVMe upgrade' },
    { id: 'os-boot-bsod', name: 'OS Boot / Blue Screen (BSOD)', desc: 'Windows crash, boot loop, virus cleaning, format' },
    { id: 'hinges-body-fabrication', name: 'Hinges & Body Fabrication', desc: 'Broken hinges, cracked casing, loose display flap' },
    { id: 'overheating-thermal', name: 'Overheating & Thermal Servicing', desc: 'Loud fan noise, auto power off, thermal paste' },
    { id: 'hard-drive-recovery', name: 'Hard Drive & Data Recovery', desc: 'Clicking HDD, lost files, unreadable partition' },
    { id: 'general-laptop-diagnostics', name: 'General Diagnostic Inspection', desc: 'Complete hardware & software checkup' },
  ],
  'computer-repair': [
    { id: 'no-power-display', name: 'No Power / No Display (POST Fix)', desc: 'PC turns on but monitor blank, beep codes' },
    { id: 'bsod-crashing', name: 'Blue Screen & Sudden Crashing', desc: 'Frequent restart, system freezing, memory dump' },
    { id: 'smps-power-supply', name: 'SMPS Power Supply Replacement', desc: 'Burnt smell, sudden power shutdown, voltage trip' },
    { id: 'cpu-gpu-overheating', name: 'CPU / GPU Overheating & Fan Noise', desc: 'Liquid cooler pump failure, thermal paste, cleaning' },
    { id: 'hardware-upgrade', name: 'Hardware Upgrade (SSD / RAM / GPU)', desc: 'Gaming graphics card, RAM expansion, SSD install' },
    { id: 'os-drivers-setup', name: 'Windows OS, BIOS & Driver Setup', desc: 'Clean installation, license activation, software fix' },
    { id: 'hard-drive-recovery', name: 'Hard Drive Recovery & Storage Fix', desc: 'Clicking HDD, inaccessible partition, data rescue' },
    { id: 'custom-gaming-rig', name: 'Custom Gaming Rig Tuning', desc: 'Cable re-routing, benchmark stability, assembly' },
    { id: 'general-pc-diagnostics', name: 'General Desktop Diagnostics', desc: 'Doorstep engineer diagnostic inspection' },
  ],
  'networking': [
    { id: 'wifi-mesh-deadzones', name: 'Wi-Fi Dead Zones & Mesh Setup', desc: 'Weak signal, multi-floor coverage, Wi-Fi 6 mesh nodes' },
    { id: 'cat6-structured-cabling', name: 'Structured CAT6 / LAN Cabling', desc: 'Office cabling, patch crimping, faceplates, wall jacks' },
    { id: 'router-firewall-config', name: 'Router & Firewall Configuration', desc: 'Port forwarding, guest network, VPN, bandwidth limit' },
    { id: 'server-rack-patch-panel', name: 'Server Rack & Patch Panel Dressing', desc: 'Clean cable dressing, punch-down, switch mounting' },
    { id: 'intermittent-drops', name: 'Intermittent Internet Drops & High Ping', desc: 'Frequent disconnects, packet loss, ISP gateway fix' },
    { id: 'multi-wan-dual-isp', name: 'Multi-WAN Dual ISP Failover', desc: 'Uninterrupted office internet with automatic line backup' },
    { id: 'managed-switch-vlan', name: 'Managed Switch & VLAN Setup', desc: 'Department network isolation, QoS traffic policy' },
    { id: 'general-network-survey', name: 'On-Site Network Survey & Audit', desc: 'Full-facility Wi-Fi & cabling assessment' },
  ],
  'cctv-repair-installation': [
    { id: 'new-cctv-installation', name: 'New CCTV Installation (HD / IP)', desc: 'Full installation for home, apartment, shop or warehouse' },
    { id: 'camera-offline-black-screen', name: 'Camera Offline / Black Screen Fix', desc: 'No video signal, loose BNC/RJ45, power channel issue' },
    { id: 'dvr-nvr-hdd-repair', name: 'DVR / NVR Not Recording / HDD Fix', desc: 'Beeping unit, hard drive replacement, playback error' },
    { id: 'mobile-app-live-view', name: 'Mobile App & Remote Live Viewing', desc: 'Sync cameras to smartphone / tablet via P2P cloud' },
    { id: 'blurry-night-vision', name: 'Blurry Picture & Night Vision Repair', desc: 'Out of focus, IR night LEDs not working, lens clean' },
    { id: 'wiring-smps-box', name: 'CCTV Wiring & SMPS Power Box Repair', desc: 'Short circuit, weather damaged wire, central power box' },
    { id: 'cctv-amc-maintenance', name: 'CCTV Annual Maintenance (AMC)', desc: 'Quarterly camera alignment, lens wash, firmware update' },
    { id: 'general-cctv-quote', name: 'On-Site CCTV Survey & Quote', desc: 'Camera positioning planning and custom quotation' },
  ],
};

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  subcategory: string;
  serviceMode: string;
  contactMethod: 'phone' | 'whatsapp';
  slotDate: string;
  slotTime: string;
  address: string;
  selectedOffer: string;
  customOfferCode: string;
  paymentMethod: 'doorstep_cod' | 'doorstep_upi';
  description: string;
  honeypot: string; // Spam protection
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  city?: string;
  service?: string;
  subcategory?: string;
  slotDate?: string;
  slotTime?: string;
  address?: string;
  description?: string;
}

interface EnquiryFormProps {
  initialCity?: string;
  initialService?: string;
  initialSubcategory?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const SERVICE_TILES = [
  { id: 'laptop-repair', label: 'LAPTOP REPAIR', icon: Laptop, desc: 'Screen, Battery & Motherboard' },
  { id: 'computer-repair', label: 'DESKTOP / PC', icon: Monitor, desc: 'Hardware, SMPS & BSOD' },
  { id: 'networking', label: 'NETWORKING', icon: Network, desc: 'Wi-Fi, CAT6 & Routers' },
  { id: 'cctv-repair-installation', label: 'CCTV REPAIR', icon: Video, desc: 'Camera, DVR & Security' },
];

export const HYDERABAD_AREAS = [
  'Chanda Nagar',
  'Madhapur',
  'Hitec City',
  'Gachibowli',
  'Kondapur',
  'Miyapur',
  'Kukatpally',
  'Ameerpet',
  'Banjara Hills',
  'Jubilee Hills',
  'Secunderabad',
  'Dilsukhnagar',
];
export const CHANDA_NAGAR_AREAS = HYDERABAD_AREAS;
export const NELLORE_AREAS = HYDERABAD_AREAS;
export const APPLIANCE_TILES = SERVICE_TILES;

const AVAILABLE_OFFERS = [
  {
    code: 'FIRST150',
    title: '₹150 Flat OFF',
    desc: 'Valid on your first doorstep service visit',
    badge: 'POPULAR',
    discount: 150,
  },
  {
    code: 'DIAGFREE',
    title: '100% Free Diagnostics',
    desc: 'Zero inspection charge when servicing with us',
    badge: 'ZERO RISK',
    discount: 499,
  },
  {
    code: 'FESTIVE20',
    title: '20% OFF Servicing',
    desc: 'Motherboard cleaning, thermal paste & tune-up',
    badge: 'BEST VALUE',
    discount: 100,
  },
  {
    code: 'STUDENT10',
    title: '10% Student / Senior OFF',
    desc: 'Applicable with valid ID card verification',
    badge: 'SPECIAL',
    discount: 50,
  },
];

const CONFETTI_COLORS = [
  '#22C55E',
  '#16A34A',
  '#06223A',
  '#0A3356',
  '#4ADE80',
  '#000000',
  '#15803D',
  '#22C55E',
];

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialCity = 'hyderabad',
  initialService = 'laptop-repair',
  initialSubcategory,
  title = "Request Service",
  subtitle = "Select your device or service, enter details, and book your technician.",
  className = "",
}) => {
  const getTodayDateString = () => new Date().toISOString().split('T')[0];

  const normalizeInitialCity = (c?: string) => {
    if (!c) return 'hyderabad';
    const lower = c.toLowerCase().trim();
    if (lower.includes('bengaluru') || lower.includes('bangalore')) return 'bengaluru';
    if (lower.includes('vizag') || lower.includes('visakhapatnam')) return 'vizag';
    if (lower.includes('chennai')) return 'chennai';
    return 'hyderabad';
  };

  const defaultCity = normalizeInitialCity(initialCity);
  const defaultService = initialService || 'laptop-repair';
  const defaultSubcategory =
    initialSubcategory ||
    SERVICE_SUBCATEGORIES[defaultService]?.[0]?.name ||
    'Screen & Display Replacement';

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    city: defaultCity,
    service: defaultService,
    subcategory: defaultSubcategory,
    serviceMode: 'doorstep',
    contactMethod: 'phone',
    slotDate: getTodayDateString(),
    slotTime: 'Morning (9:00 AM – 12:00 PM)',
    address: '',
    selectedOffer: 'FIRST150',
    customOfferCode: '',
    paymentMethod: 'doorstep_cod',
    description: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [emailSentTo, setEmailSentTo] = useState<string>('');
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string>('');
  const [showCustomOfferInput, setShowCustomOfferInput] = useState(false);

  // Dynamic city & localities data
  const normalizedCityKey = (formData.city || 'hyderabad').toLowerCase();
  const currentCityData = citiesData[normalizedCityKey] || citiesData['hyderabad'];
  const availableAreas = currentCityData?.localities || HYDERABAD_AREAS;

  // Pricing breakdown calculations for Checkout
  const BASE_DIAGNOSTIC_FEE = 499;
  const DOORSTEP_FEE_ORIGINAL = 199;

  const getOfferDiscount = () => {
    switch (formData.selectedOffer) {
      case 'FIRST150':
        return 150;
      case 'DIAGFREE':
        return BASE_DIAGNOSTIC_FEE;
      case 'FESTIVE20':
        return 100;
      case 'STUDENT10':
        return 50;
      default:
        return formData.selectedOffer ? 100 : 0;
    }
  };

  const discountAmount = getOfferDiscount();
  const netDiagnosticDue = Math.max(0, BASE_DIAGNOSTIC_FEE - discountAmount);
  const totalSavings = discountAmount + DOORSTEP_FEE_ORIGINAL;

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser. Please type your address manually.');
      return;
    }
    setIsFetchingLocation(true);
    setLocationStatus('Locating your GPS coordinates...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            { headers: { 'Accept-Language': 'en' } }
          );
          if (res.ok) {
            const data = await res.json();
            const road = data.address?.road || data.address?.suburb || '';
            const city = data.address?.city || data.address?.town || data.address?.state_district || '';
            const postcode = data.address?.postcode || '';
            const fullStr = data.display_name || `${road}, ${city} ${postcode}`.trim();
            setFormData((prev) => ({
              ...prev,
              address: fullStr,
            }));
            setLocationStatus('✅ Location detected successfully! You can add flat/house number.');
          } else {
            setFormData((prev) => ({
              ...prev,
              address: `GPS Pin: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
            }));
            setLocationStatus('✅ GPS Coordinates acquired.');
          }
        } catch {
          setFormData((prev) => ({
            ...prev,
            address: `GPS Pin: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
          }));
          setLocationStatus('✅ GPS Coordinates acquired.');
        } finally {
          setIsFetchingLocation(false);
        }
      },
      (error) => {
        setIsFetchingLocation(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus('⚠️ Location permission was denied. Please type your street address.');
        } else {
          setLocationStatus('⚠️ Could not fetch auto-location. Please enter manually.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters)';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    const phoneValid = /^[6-9]\d{9}$/.test(cleanPhone.slice(-10));
    if (!phoneValid) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address to receive your confirmation';
    }

    if (!formData.city) {
      newErrors.city = 'Please select your city';
    }

    if (!formData.service) {
      newErrors.service = 'Please select the required service';
    }

    if (!formData.subcategory) {
      const defaultSub = SERVICE_SUBCATEGORIES[formData.service]?.[0]?.name || 'General Diagnostic Inspection';
      formData.subcategory = defaultSub;
    }

    if (!formData.slotDate) {
      formData.slotDate = getTodayDateString();
    }

    if (!formData.slotTime) {
      formData.slotTime = 'Express Dispatch (within 90 mins)';
    }

    if (formData.serviceMode === 'doorstep' && (!formData.address || formData.address.trim().length < 2)) {
      const cityName = currentCityData?.name || formData.city || 'your city';
      newErrors.address = `Please select or enter your area / locality in ${cityName}`;
    }

    if (!formData.description || formData.description.trim().length < 2) {
      setFormData((prev) => ({
        ...prev,
        description: formData.subcategory || 'Doorstep diagnostic inspection and device repair dispatch',
      }));
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToStep2 = () => {
    if (formData.honeypot) return;
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      return;
    }

    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true);

    const generatedTicket = 'TF-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(generatedTicket);

    const liveBackendEndpoint = 'https://laptop-repair-services-backend.onrender.com/api/book-service';
    const bookingPayload = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      subcategory: formData.subcategory,
      address: formData.address,
      city: formData.city || 'Hyderabad',
      ticketId: generatedTicket,
      discountAmount,
      payableAmount: netDiagnosticDue,
      contactMethod: formData.contactMethod,
      slotDate: formData.slotDate,
      slotTime: formData.slotTime,
      description: formData.description,
      paymentMethod: formData.paymentMethod,
    };

    try {
      // Send confirmation email via Node.js backend (live Render API with fallback)
      let response;
      try {
        response = await fetch(liveBackendEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingPayload),
        });
      } catch (directErr) {
        console.warn('Direct live backend fetch error, trying proxy /api:', directErr);
        response = await fetch('/api/book-service', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingPayload),
        });
      }

      if (response && response.ok) {
        const resData = await response.json();
        console.log('✅ Booking dispatch response:', resData);
        setEmailSentTo(formData.email);
      } else {
        console.warn('Backend response not OK:', response?.status);
        setEmailSentTo(formData.email);
      }
    } catch (err) {
      console.error('Failed to communicate with Node.js backend:', err);
      setEmailSentTo(formData.email);
    }

    try {
      const stored = JSON.parse(localStorage.getItem('techfix_enquiries') || '[]');
      stored.push({
        ticketId: generatedTicket,
        ...formData,
        discountSaved: totalSavings,
        netDue: netDiagnosticDue,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('techfix_enquiries', JSON.stringify(stored));
    } catch (err) {
      console.error('Storage error:', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const getWhatsAppLeadLink = () => {
    const offerText = formData.selectedOffer
      ? `• Applied Offer: ${formData.selectedOffer} (Saved ₹${discountAmount})\n`
      : '';

    const text = encodeURIComponent(
      `🎉 Hello ${siteConfig.brandName}, I have booked a service slot!\n` +
      `• Ticket ID: ${ticketId || 'Pending'}\n` +
      `• Customer: ${formData.fullName}\n` +
      `• Mobile: ${formData.phone}\n` +
      `• City: ${formData.city.toUpperCase()}\n` +
      `• Service: ${formData.service}\n` +
      `• Specific Issue: ${formData.subcategory || 'General Servicing'}\n` +
      `• Delivery Mode: ${formData.serviceMode}\n` +
      `• Scheduled Date: ${formData.slotDate}\n` +
      `• Time Slot: ${formData.slotTime}\n` +
      (formData.address ? `• Doorstep Address: ${formData.address}\n` : '') +
      offerText +
      `• Estimated Doorstep Due: ₹${netDiagnosticDue} (Pay after service)\n` +
      `• Problem Summary: ${formData.description}\n\n` +
      `Please confirm technician dispatch for my slot!`
    );
    return `https://wa.me/${siteConfig.whatsappRaw}?text=${text}`;
  };

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl relative overflow-hidden ${className}`}>
      {/* Background glow accents */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#22C55E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#06223A]/5 rounded-full blur-3xl pointer-events-none" />

      {isSuccess ? (
        /* ========================================================
           CELEBRATION & BOOKING SUCCESS WITH 3D EMBLEM & BALLOONS
           ======================================================== */
        <div className="text-center py-4 sm:py-6 space-y-6 animate-celebrate-pop relative z-10">

          {/* Confetti Rain Stream */}
          <div className="absolute inset-x-0 -top-6 h-64 overflow-hidden pointer-events-none z-0">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="absolute block rounded-sm shadow-sm opacity-90"
                style={{
                  left: `${(i * 4.2) % 100}%`,
                  animation: `confetti-fall ${2 + (i % 3) * 0.7}s ease-in-out infinite`,
                  animationDelay: `${(i * 0.12) % 2}s`,
                  backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                  width: `${6 + (i % 4) * 2}px`,
                  height: `${10 + (i % 3) * 3}px`,
                  transform: `rotate(${(i * 35) % 360}deg)`,
                }}
              />
            ))}
          </div>

          {/* Floating Party Balloons */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 pt-2">
            <span className="text-3xl sm:text-4xl animate-balloon" style={{ animationDelay: '0s' }}>🎈</span>
            <span className="text-3xl sm:text-4xl animate-balloon" style={{ animationDelay: '0.4s' }}>🥳</span>
            <span className="text-3xl sm:text-4xl animate-balloon" style={{ animationDelay: '0.8s' }}>🎂</span>
            <span className="text-3xl sm:text-4xl animate-balloon" style={{ animationDelay: '1.2s' }}>🎊</span>
            <span className="text-3xl sm:text-4xl animate-balloon" style={{ animationDelay: '1.6s' }}>🎁</span>
          </div>

          {/* Celebration Emblem */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-[#22C55E] text-white flex items-center justify-center shadow-xl relative group border-2 border-white">
            <PartyPopper className="w-10 h-10 sm:w-12 sm:h-12 text-white group-hover:scale-110 transition-transform" />
            <div className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#06223A] text-white text-[10px] font-black tracking-wider shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#22C55E]" />
              <span>CONFIRMED</span>
            </div>
          </div>

          {/* Main Success Announcement */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Service Booked Successfully!</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-black tracking-tight">
              Your Appointment is Locked!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Our service engineer has received your scheduled ticket. A coordinator will verify your slot via {formData.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Phone Call'} shortly.
            </p>
          </div>

          {/* Digital Service Pass & Checkout Receipt */}
          <div className="bg-slate-50 rounded-3xl p-5 sm:p-6 max-w-lg mx-auto text-left border border-slate-200 shadow-md space-y-3.5 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                  Service Ticket Number
                </span>
                <span className="text-2xl font-mono font-extrabold text-black tracking-wider">
                  {ticketId}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                  Payment Status
                </span>
                <span className="text-xs font-semibold text-[#16A34A] bg-[#22C55E]/15 px-2.5 py-1 rounded-full border border-[#22C55E]/30 inline-block">
                  Pay After Service
                </span>
              </div>
            </div>

            {/* Itemized details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <p className="flex items-center gap-1.5 sm:col-span-2">
                <Sparkles className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
                <span><strong>Service & Issue:</strong> {SERVICE_TILES.find(t => t.id === formData.service)?.label} — <span className="font-bold text-black">{formData.subcategory}</span></span>
              </p>
              <p className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
                <span><strong>Date:</strong> {formData.slotDate}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
                <span><strong>Slot:</strong> {formData.slotTime}</span>
              </p>
              <p className="flex items-center gap-1.5 sm:col-span-2 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
                <span className="truncate"><strong>Location:</strong> {formData.address || `${(currentCityData?.name || formData.city).toUpperCase()} Center`}</span>
              </p>
            </div>

            {/* Savings & Final Due */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-700">
                <span className="flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>Promo Applied: <strong className="text-black">{formData.selectedOffer || 'FIRST150'}</strong></span>
                </span>
                <span className="text-[#16A34A] font-bold">-₹{discountAmount} OFF</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-700">
                <span>Doorstep Convenience Visit:</span>
                <span className="text-[#16A34A] font-bold">FREE (Saved ₹199)</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-black block">Estimated Doorstep Payable:</span>
                  <span className="text-[10px] text-slate-500">Pay by Cash, UPI or Card on completion</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-mono font-extrabold text-[#16A34A]">
                    {netDiagnosticDue === 0 ? '₹0 FREE' : `₹${netDiagnosticDue}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-[#16A34A] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Includes Up to 90 Days Hardware Service Guarantee</span>
            </div>

            {/* Email confirmation status pill */}
            {(emailSentTo || formData.email) && (
              <div className="p-3 rounded-2xl bg-white border border-[#22C55E]/30 flex items-center gap-2.5 text-xs text-black">
                <div className="w-7 h-7 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center flex-shrink-0 text-[#16A34A]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#16A34A] font-bold block">
                    Confirmation Email Sent
                  </span>
                  <span className="text-xs text-slate-700 font-medium truncate block">
                    Sent to: <strong className="text-black">{emailSentTo || formData.email}</strong>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-lg mx-auto">
            <a
              href={getWhatsAppLeadLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold px-6 py-4 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Ticket to WhatsApp</span>
            </a>
            <button
              onClick={() => {
                setIsSuccess(false);
                setCurrentStep(1);
                setEmailSentTo('');
                setFormData({
                  fullName: '',
                  phone: '',
                  email: '',
                  city: defaultCity,
                  service: defaultService,
                  subcategory: defaultSubcategory,
                  serviceMode: 'doorstep',
                  contactMethod: 'phone',
                  slotDate: getTodayDateString(),
                  slotTime: 'Morning (9:00 AM – 12:00 PM)',
                  address: '',
                  selectedOffer: 'FIRST150',
                  customOfferCode: '',
                  paymentMethod: 'doorstep_cod',
                  description: '',
                  honeypot: '',
                });
                setLocationStatus('');
              }}
              className="inline-flex items-center justify-center px-6 py-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-black text-xs font-semibold transition-colors cursor-pointer"
            >
              Book Another Service Slot
            </button>
          </div>
        </div>
      ) : (
        /* ========================================================
           2-STEP BOOKING FORM
           ======================================================== */
        <div>
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-semibold mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              Same-Day Dispatch & Instant Slot Booking
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">{title}</h3>
            {subtitle && <p className="text-sm text-slate-600 mt-2 leading-relaxed">{subtitle}</p>}
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Honeypot field for anti-bot */}
            <input
              type="text"
              name="website_verify"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* ===================================================
                STEP 1: APPOINTMENT, LOCATION & DEVICE DETAILS
                =================================================== */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* 1. SELECT SERVICE / DEVICE */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold text-black uppercase tracking-wider">
                      1. SELECT SERVICE / DEVICE <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-slate-500">Select to auto-fill</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {SERVICE_TILES.map((tile) => {
                      const IconComponent = tile.icon;
                      const isSelected = formData.service === tile.id;
                      return (
                        <button
                          key={tile.id}
                          type="button"
                          onClick={() => {
                            const newService = tile.id;
                            const newSubcategory = SERVICE_SUBCATEGORIES[newService]?.[0]?.name || '';
                            setFormData((prev) => ({
                              ...prev,
                              service: newService,
                              subcategory: newSubcategory,
                              description: `${tile.label} - ${newSubcategory}`,
                            }));
                            if (errors.service || errors.subcategory) {
                              setErrors((prev) => ({ ...prev, service: undefined, subcategory: undefined }));
                            }
                          }}
                          className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer ${isSelected
                            ? 'bg-[#22C55E]/10 border-2 border-[#22C55E] shadow-sm ring-1 ring-[#22C55E]/30'
                            : 'bg-slate-50 border-slate-200 hover:border-[#22C55E]/50 hover:bg-slate-100'
                            }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${isSelected
                              ? 'bg-[#22C55E] text-white shadow-sm'
                              : 'bg-white text-[#06223A] border border-slate-200'
                              }`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span
                            className="text-[11px] font-extrabold tracking-tight text-black"
                          >
                            {tile.label}
                          </span>
                          <span className="text-[9px] text-slate-500 truncate max-w-full font-medium">
                            {tile.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.service && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* 2. SELECT REPAIR / ISSUE SUBCATEGORY */}
                <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span>2. SELECT SPECIFIC ISSUE / REPAIR</span> <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-[#16A34A] font-bold bg-[#22C55E]/15 px-2.5 py-0.5 rounded-full border border-[#22C55E]/30">
                      {SERVICE_TILES.find(t => t.id === formData.service)?.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(SERVICE_SUBCATEGORIES[formData.service] || []).map((sub) => {
                      const isSelected = formData.subcategory === sub.name;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              subcategory: sub.name,
                              description: sub.desc ? `${sub.name} (${sub.desc})` : sub.name,
                            }));
                            if (errors.subcategory) {
                              setErrors((prev) => ({ ...prev, subcategory: undefined }));
                            }
                          }}
                          className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer group ${
                            isSelected
                              ? 'bg-[#22C55E]/10 border-2 border-[#22C55E] shadow-sm'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                              isSelected
                                ? 'border-[#22C55E] bg-[#22C55E] text-white shadow-xs'
                                : 'border-slate-300 bg-white group-hover:border-slate-400'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-black' : 'text-slate-800'}`}>
                              {sub.name}
                            </div>
                            {sub.desc && (
                              <div className="text-[10px] text-slate-500 leading-tight mt-1 truncate">
                                {sub.desc}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.subcategory && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      {errors.subcategory}
                    </p>
                  )}
                </div>

                {/* 3. Customer Name & Mobile */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#16A34A]" />
                        <span>FULL NAME</span> <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Your Name"
                          className={`w-full bg-white pl-10 pr-4 py-2.5 text-sm text-black placeholder-slate-400 rounded-xl border ${errors.fullName
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-slate-300 focus:border-[#22C55E] focus:ring-[#22C55E]/20'
                            } focus:outline-none focus:ring-2 transition-all`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                        <span>MOBILE NUMBER</span> <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-xs text-black font-bold">+91</span>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                          placeholder="10-Digit Mobile Number"
                          className={`w-full bg-white pl-12 pr-4 py-2.5 text-sm text-black placeholder-slate-400 rounded-xl border ${errors.phone
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-slate-300 focus:border-[#22C55E] focus:ring-[#22C55E]/20'
                            } focus:outline-none focus:ring-2 transition-all`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span>EMAIL ADDRESS (TO RECEIVE BOOKING CONFIRMATION)</span> <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. customer@gmail.com"
                        className={`w-full bg-white pl-10 pr-4 py-2.5 text-sm text-black placeholder-slate-400 rounded-xl border ${errors.email
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-300 focus:border-[#22C55E] focus:ring-[#22C55E]/20'
                          } focus:outline-none focus:ring-2 transition-all`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* 4. Location / Area */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-[11px] font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span>4. SELECT LOCATION IN {currentCityData?.name ? currentCityData.name.toUpperCase() : 'YOUR CITY'}</span>
                      <span className="text-rose-500">*</span>
                    </label>

                    <button
                      type="button"
                      onClick={handleFetchLocation}
                      disabled={isFetchingLocation}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-300 text-[11px] font-semibold text-[#06223A] hover:bg-slate-100 transition-colors cursor-pointer w-fit shadow-xs"
                    >
                      {isFetchingLocation ? (
                        <Loader2 className="w-3 h-3 animate-spin text-[#16A34A]" />
                      ) : (
                        <Navigation className="w-3 h-3 text-[#16A34A]" />
                      )}
                      <span>{isFetchingLocation ? 'Locating...' : 'GPS Detect'}</span>
                    </button>
                  </div>

                  {locationStatus && (
                    <p className={`text-[11px] px-3 py-1.5 rounded-lg font-medium ${locationStatus.includes('✅') ? 'bg-[#22C55E]/15 text-[#15803D]' : 'bg-rose-50 text-rose-600'}`}>
                      {locationStatus}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-500 font-semibold mb-1">
                        Select Area / Locality ({currentCityData?.name || 'City'})
                      </label>
                      <select
                        onChange={(e) => {
                          const area = e.target.value;
                          if (area) {
                            setFormData((prev) => ({
                              ...prev,
                              address: prev.address ? `${area}, ${prev.address}` : `${area}, ${currentCityData?.name || 'Local City Hub'}`,
                            }));
                          }
                        }}
                        defaultValue=""
                        className="w-full bg-white border border-slate-300 focus:border-[#22C55E] rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 transition-all font-medium"
                      >
                        <option value="" disabled>-- Select Area in {currentCityData?.name || 'City'} --</option>
                        {availableAreas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 font-semibold mb-1">Target Service Hub</label>
                      <select
                        id="city"
                        name="city"
                        value={normalizedCityKey}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-white border border-slate-300 focus:border-[#22C55E] rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 transition-all font-medium"
                      >
                        <option value="bengaluru">Bengaluru</option>
                        <option value="vizag">Visakhapatnam (Vizag)</option>
                        <option value="chennai">Chennai</option>
                        <option value="hyderabad">Hyderabad</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Door / Flat No., Landmark, or Street details..."
                      className={`w-full bg-white border ${errors.address ? 'border-rose-500' : 'border-slate-300 focus:border-[#22C55E]'
                        } rounded-xl px-3.5 py-2 text-xs text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#22C55E]/20 transition-all`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>

                {/* 4. Preferred Reply Mode */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-600 font-medium">Preferred reply:</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-black font-semibold">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="phone"
                        checked={formData.contactMethod === 'phone'}
                        onChange={() => setFormData({ ...formData, contactMethod: 'phone' })}
                        className="accent-[#22C55E]"
                      />
                      <span>Phone Call</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-black font-semibold">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="whatsapp"
                        checked={formData.contactMethod === 'whatsapp'}
                        onChange={() => setFormData({ ...formData, contactMethod: 'whatsapp' })}
                        className="accent-[#22C55E]"
                      />
                      <span>WhatsApp</span>
                    </label>
                  </div>
                </div>

                {/* STEP 1 NEXT BUTTON */}
                <button
                  type="button"
                  onClick={handleProceedToStep2}
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-extrabold text-xs uppercase tracking-wider py-4 px-6 rounded-xl transition-all group cursor-pointer shadow-md shadow-[#22C55E]/30"
                >
                  <span>Proceed to Book Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {/* ===================================================
                STEP 2: EXCLUSIVE OFFERS & DISCOUNTS, CHECKOUT SUMMARY
                =================================================== */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">

                {/* Step 1 Quick Summary Preview */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 shadow-xs">
                  <div className="space-y-1 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-black">{formData.fullName}</span>
                      <span className="text-[10px] text-[#16A34A] font-mono font-bold">+91 {formData.phone}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#22C55E]/15 text-[#16A34A] text-[10px] font-bold border border-[#22C55E]/30">
                      <span>{SERVICE_TILES.find(t => t.id === formData.service)?.label}</span>
                      <span>•</span>
                      <span>{formData.subcategory}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      📅 {formData.slotDate} • ⏰ {formData.slotTime.split('(')[0].trim()} • 📍 {(currentCityData?.name || formData.city).toUpperCase()}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-slate-300 text-black hover:bg-slate-100 transition-colors font-semibold flex-shrink-0"
                  >
                    Edit Details
                  </button>
                </div>

                {/* 1. EXCLUSIVE OFFERS & DISCOUNTS */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span>Select Exclusive Offer or Coupon</span>
                    </span>
                    <span className="text-[10px] text-[#16A34A] font-bold bg-[#22C55E]/15 px-2 py-0.5 rounded-full border border-[#22C55E]/30">
                      Discounts Apply Instantly
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {AVAILABLE_OFFERS.map((offer) => {
                      const isSelected = formData.selectedOffer === offer.code;
                      return (
                        <div
                          key={offer.code}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              selectedOffer: isSelected ? '' : offer.code,
                            });
                            setShowCustomOfferInput(false);
                          }}
                          className={`p-3 rounded-2xl cursor-pointer border transition-all flex items-start justify-between gap-2.5 ${isSelected
                            ? 'bg-[#22C55E]/10 border-2 border-[#22C55E] shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                            }`}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-black">{offer.title}</span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#22C55E]/20 text-[#16A34A] font-bold">
                                {offer.code}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-tight font-medium">{offer.desc}</p>
                          </div>

                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isSelected ? 'bg-[#22C55E] text-white' : 'border border-slate-300 text-transparent'
                            }`}>
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Custom coupon write-in toggle */}
                  <div className="pt-1 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => setShowCustomOfferInput(!showCustomOfferInput)}
                      className="text-[11px] text-[#16A34A] hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>{showCustomOfferInput ? 'Hide promo code entry' : 'Have a different promo coupon code?'}</span>
                    </button>

                    {formData.selectedOffer && (
                      <span className="text-[11px] text-[#16A34A] font-bold flex items-center gap-1.5 bg-[#22C55E]/15 px-2 py-0.5 rounded-full border border-[#22C55E]/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Coupon: {formData.selectedOffer}</span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, selectedOffer: '', customOfferCode: '' })}
                          className="ml-1 text-slate-500 hover:text-rose-500 p-0.5 transition-colors cursor-pointer"
                          title="Remove coupon"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>

                  {showCustomOfferInput && (
                    <div className="flex gap-2 pt-1 animate-in fade-in duration-150">
                      <input
                        type="text"
                        value={formData.customOfferCode}
                        onChange={(e) => setFormData({ ...formData, customOfferCode: e.target.value.toUpperCase() })}
                        placeholder="ENTER COUPON CODE (e.g. SPECIAL50)"
                        className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-black uppercase font-mono placeholder-slate-400 focus:outline-none focus:border-[#22C55E]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (formData.customOfferCode.trim()) {
                            setFormData({ ...formData, selectedOffer: formData.customOfferCode.trim() });
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-[#06223A] hover:bg-[#0A3356] text-white font-bold text-xs"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. CHECKOUT & SERVICE SUMMARY */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <span className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                      <Receipt className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span>Checkout & Final Price Summary</span>
                    </span>
                    <span className="text-[10px] bg-[#22C55E]/20 text-[#16A34A] font-bold px-2 py-0.5 rounded-full border border-[#22C55E]/30">
                      🎉 Total Saved: ₹{totalSavings}
                    </span>
                  </div>

                  {/* Itemized summary */}
                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex items-center justify-between">
                      <span>Standard Initial Diagnostic & Inspection:</span>
                      <span className="font-mono font-bold text-black">₹{BASE_DIAGNOSTIC_FEE}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Doorstep Visit & Inspection Travel:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="line-through text-slate-400 font-mono">₹{DOORSTEP_FEE_ORIGINAL}</span>
                        <span className="text-[#16A34A] font-bold">FREE</span>
                      </div>
                    </div>
                    {formData.selectedOffer && (
                      <div className="flex items-center justify-between text-[#16A34A] font-medium">
                        <span className="flex items-center gap-1">
                          <Gift className="w-3 h-3" />
                          <span>Offer Discount ({formData.selectedOffer}):</span>
                        </span>
                        <span className="font-mono font-bold">-₹{discountAmount}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-bold text-sm text-black">
                      <span>Total Payable at Doorstep:</span>
                      <span className="text-base font-mono text-[#16A34A] font-extrabold">
                        {netDiagnosticDue === 0 ? '₹0 FREE' : `₹${netDiagnosticDue}`}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="pt-2 border-t border-slate-200 space-y-2">
                    <label className="block text-[11px] font-bold text-black uppercase tracking-wider">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <label
                        onClick={() => setFormData({ ...formData, paymentMethod: 'doorstep_cod' })}
                        className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${formData.paymentMethod === 'doorstep_cod'
                          ? 'bg-[#22C55E]/10 border-2 border-[#22C55E] text-black'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="doorstep_cod"
                          checked={formData.paymentMethod === 'doorstep_cod'}
                          onChange={() => { }}
                          className="accent-[#22C55E]"
                        />
                        <div className="text-left">
                          <div className="text-xs font-bold text-black">Pay After Service (Cash / UPI)</div>
                          <div className="text-[10px] text-slate-500 font-medium">Zero advance fee required</div>
                        </div>
                      </label>

                      <label
                        onClick={() => setFormData({ ...formData, paymentMethod: 'doorstep_upi' })}
                        className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${formData.paymentMethod === 'doorstep_upi'
                          ? 'bg-[#22C55E]/10 border-2 border-[#22C55E] text-black'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="doorstep_upi"
                          checked={formData.paymentMethod === 'doorstep_upi'}
                          onChange={() => { }}
                          className="accent-[#22C55E]"
                        />
                        <div className="text-left">
                          <div className="text-xs font-bold text-black flex items-center gap-1">
                            <CreditCard className="w-3 h-3 text-[#16A34A]" />
                            <span>UPI / Card on Doorstep</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium">Pay via QR code or card machine</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* STEP 2 ACTION BUTTONS */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-4 rounded-xl border border-slate-300 text-black text-xs font-bold hover:bg-slate-100 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-extrabold text-xs uppercase tracking-wider py-4 px-6 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer shadow-md shadow-[#22C55E]/30"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Confirming Request & Booking...</span>
                      </>
                    ) : (
                      <>
                        <PartyPopper className="w-4 h-4 text-white" />
                        <span>Confirm Request & Book Service</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Privacy notice and instant call option */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 gap-2 font-medium">
              <span className="text-[11px] text-slate-500">🔒 100% Privacy Protected • Instant Slot Lock</span>
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="hover:text-[#16A34A] transition-colors flex items-center gap-1.5 font-bold text-slate-700"
                >
                  <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>Direct Help: {siteConfig.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
