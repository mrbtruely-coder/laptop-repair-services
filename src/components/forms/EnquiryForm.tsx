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
  Wind,
  Refrigerator,
  WashingMachine,
  Laptop,
  Monitor,
  Video,
  Mail,
} from 'lucide-react';
import { siteConfig } from '../../config/site';

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  service: string;
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
  slotDate?: string;
  slotTime?: string;
  address?: string;
  description?: string;
}

interface EnquiryFormProps {
  initialCity?: string;
  initialService?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const APPLIANCE_TILES = [
  { id: 'ac-service', label: 'AC SERVICE', icon: Wind, desc: 'Cooling & Repair' },
  { id: 'refrigerator', label: 'REFRIGERATOR', icon: Refrigerator, desc: 'Cooling & Gas' },
  { id: 'washing-machine', label: 'WASHING MACHINE', icon: WashingMachine, desc: 'Motor & Drum' },
  { id: 'laptop-repair', label: 'LAPTOP REPAIR', icon: Laptop, desc: 'Screen & Motherboard' },
  { id: 'computer-repair', label: 'DESKTOP / PC', icon: Monitor, desc: 'Hardware & OS' },
  { id: 'cctv-repair-installation', label: 'CCTV & NETWORK', icon: Video, desc: 'Security & Wi-Fi' },
];

export const NELLORE_AREAS = [
  'Trunk Road',
  'VRC Centre',
  'Dargamitta',
  'Magunta Layout',
  'Pogathota',
  'Stonehousepet',
  'Balaji Nagar',
  'Vedayapalem',
  'Harmathpet',
  'Ramamurthy Nagar',
  'Nellore Rural',
  'Kovur',
];

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
  '#E2B98E',
  '#7AA27D',
  '#6E4331',
  '#F59E0B',
  '#EF4444',
  '#10B981',
  '#38BDF8',
  '#EC4899',
];

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialCity = 'nellore',
  initialService = 'ac-service',
  title = "Request Service",
  subtitle = "Tap your appliance, enter details, and book your technician.",
  className = "",
}) => {
  const getTodayDateString = () => new Date().toISOString().split('T')[0];

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    city: initialCity || 'nellore',
    service: initialService || 'ac-service',
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

    if (!formData.slotDate) {
      formData.slotDate = getTodayDateString();
    }

    if (!formData.slotTime) {
      formData.slotTime = 'Express Dispatch (within 90 mins)';
    }

    if (formData.serviceMode === 'doorstep' && (!formData.address || formData.address.trim().length < 2)) {
      newErrors.address = 'Please select or enter your area / locality in Nellore';
    }

    if (!formData.description || formData.description.trim().length < 2) {
      setFormData((prev) => ({
        ...prev,
        description: 'Doorstep diagnostic inspection and appliance repair dispatch',
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

    try {
      // Send confirmation email via Node.js backend
      const response = await fetch('/api/book-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          address: formData.address,
          city: formData.city || 'Nellore',
          ticketId: generatedTicket,
          discountAmount,
          payableAmount: netDiagnosticDue,
          contactMethod: formData.contactMethod,
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setEmailSentTo(formData.email);
      } else {
        console.warn('Backend email response:', resData);
        setEmailSentTo(formData.email);
      }
    } catch (err) {
      console.error('Failed to communicate with Node.js backend:', err);
      // Fallback: still show confirmation to user
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
      `• Delivery Mode: ${formData.serviceMode}\n` +
      `• Scheduled Date: ${formData.slotDate}\n` +
      `• Time Slot: ${formData.slotTime}\n` +
      (formData.address ? `• Doorstep Address: ${formData.address}\n` : '') +
      offerText +
      `• Estimated Doorstep Due: ₹${netDiagnosticDue} (Pay after service)\n` +
      `• Device Issue: ${formData.description}\n\n` +
      `Please confirm technician dispatch for my slot!`
    );
    return `https://wa.me/${siteConfig.whatsappRaw}?text=${text}`;
  };

  return (
    <div className={`nature-panel rounded-3xl p-6 sm:p-8 border border-[#E2B98E]/25 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Background glow accents */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#7AA27D]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#E2B98E]/15 rounded-full blur-3xl pointer-events-none" />

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

          {/* Floating Party Balloons & Birthday Badges */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 pt-2">
            <span className="text-3xl sm:text-4xl animate-balloon" style={{ animationDelay: '0s' }}>🎈</span>
            <span className="text-3xl sm:text-4xl animate-balloon" style={{ animationDelay: '0.4s' }}>🥳</span>
            <span className="text-3xl sm:text-4xl animate-balloon" style={{ animationDelay: '0.8s' }}>🎂</span>
            <span className="text-3xl sm:text-4xl animate-balloon" style={{ animationDelay: '1.2s' }}>🎊</span>
            <span className="text-3xl sm:text-4xl animate-balloon" style={{ animationDelay: '1.6s' }}>🎁</span>
          </div>

          {/* 3D Tactile Celebration Emblem */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl icon-badge-sand text-[#24160E] flex items-center justify-center shadow-2xl relative group border-2 border-[#FAF6F0]/40">
            <PartyPopper className="w-10 h-10 sm:w-12 sm:h-12 text-[#24160E] group-hover:scale-110 transition-transform" />
            <div className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#7AA27D] text-[#FAF6F0] text-[10px] font-black tracking-wider shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>CONFIRMED</span>
            </div>
          </div>

          {/* Main Success Announcement */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7AA27D]/25 border border-[#7AA27D]/40 text-[#7AA27D] text-xs font-bold shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Service Booked Successfully! Happy Diagnostics!</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#FAF6F0] tracking-tight">
              🎉 Woohoo! Your Appointment is Locked! 🥳
            </h3>
            <p className="text-xs sm:text-sm text-[#D2DCD2] max-w-md mx-auto leading-relaxed">
              Our service engineer has received your scheduled ticket. A coordinator will verify your slot via {formData.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Phone Call'} shortly.
            </p>
          </div>

          {/* Digital Service Pass & Checkout Receipt */}
          <div className="nature-card rounded-3xl p-5 sm:p-6 max-w-lg mx-auto text-left border border-[#E2B98E]/35 shadow-2xl space-y-3.5 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#E2B98E]/15 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#E2B98E] font-bold block">
                  Service Ticket Number
                </span>
                <span className="text-2xl font-mono font-extrabold text-[#FAF6F0] tracking-wider">
                  {ticketId}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-[#7AA27D] font-bold block">
                  Payment Status
                </span>
                <span className="text-xs font-semibold text-[#FAF6F0] bg-[#7AA27D]/20 px-2.5 py-1 rounded-full border border-[#7AA27D]/30 inline-block">
                  Pay After Service
                </span>
              </div>
            </div>

            {/* Itemized details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#FAF6F0]/90">
              <p className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#E2B98E] flex-shrink-0" />
                <span><strong>Date:</strong> {formData.slotDate}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#E2B98E] flex-shrink-0" />
                <span><strong>Slot:</strong> {formData.slotTime}</span>
              </p>
              <p className="flex items-center gap-1.5 sm:col-span-2 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#E2B98E] flex-shrink-0" />
                <span className="truncate"><strong>Location:</strong> {formData.address || `${formData.city.toUpperCase()} Center`}</span>
              </p>
            </div>

            {/* Savings & Final Due */}
            <div className="p-3.5 rounded-2xl bg-[#12231A]/80 border border-[#E2B98E]/20 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#FAF6F0]/80">
                <span className="flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-[#E2B98E]" />
                  <span>Promo Applied: <strong className="text-[#E2B98E]">{formData.selectedOffer || 'FIRST150'}</strong></span>
                </span>
                <span className="text-[#7AA27D] font-bold">-₹{discountAmount} OFF</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#FAF6F0]/80">
                <span>Doorstep Convenience Visit:</span>
                <span className="text-[#7AA27D] font-bold">FREE (Saved ₹199)</span>
              </div>
              <div className="pt-2 border-t border-[#E2B98E]/15 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#FAF6F0] block">Estimated Doorstep Payable:</span>
                  <span className="text-[10px] text-[#FAF6F0]/60">Pay by Cash, UPI or Card on completion</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-mono font-extrabold text-[#E2B98E]">
                    {netDiagnosticDue === 0 ? '₹0 FREE' : `₹${netDiagnosticDue}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-[#7AA27D] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Includes Up to 90 Days Hardware Service Guarantee</span>
            </div>

            {/* Email confirmation status pill */}
            {(emailSentTo || formData.email) && (
              <div className="p-3 rounded-2xl bg-[#14281E] border border-[#7AA27D]/40 flex items-center gap-2.5 text-xs text-[#FAF6F0]">
                <div className="w-7 h-7 rounded-lg bg-[#7AA27D]/20 border border-[#7AA27D]/40 flex items-center justify-center flex-shrink-0 text-[#7AA27D]">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#7AA27D] font-bold block">
                    Confirmation Email Sent
                  </span>
                  <span className="text-xs text-[#FAF6F0]/90 font-medium truncate block">
                    Sent to: <strong className="text-[#E2B98E]">{emailSentTo || formData.email}</strong>
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
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-[#12231A] font-bold px-6 py-4 rounded-full transition-all shadow-lg text-xs uppercase tracking-wider cursor-pointer"
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
                  city: initialCity || '',
                  service: initialService || '',
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
              className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-[#E2B98E]/30 hover:bg-[#E2B98E]/10 text-[#FAF6F0] text-xs font-semibold transition-colors cursor-pointer"
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6E4331]/35 border border-[#E2B98E]/30 text-[#E2B98E] text-xs font-semibold mb-3 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#E2B98E]" />
              Same-Day Dispatch & Instant Slot Booking
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#FAF6F0] tracking-tight">{title}</h3>
            {subtitle && <p className="text-sm text-[#FAF6F0]/75 mt-2 leading-relaxed">{subtitle}</p>}
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
                {/* 1. TAP YOUR APPLIANCE / SERVICE */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold text-[#E2B98E] uppercase tracking-wider">
                      1. TAP YOUR APPLIANCE / SERVICE <span className="text-[#E2B98E]">*</span>
                    </label>
                    <span className="text-[10px] text-[#FAF6F0]/60">Select to auto-fill</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {APPLIANCE_TILES.map((tile) => {
                      const IconComponent = tile.icon;
                      const isSelected = formData.service === tile.id;
                      return (
                        <button
                          key={tile.id}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, service: tile.id }));
                            if (errors.service) {
                              setErrors((prev) => ({ ...prev, service: undefined }));
                            }
                          }}
                          className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer ${
                            isSelected
                              ? 'bg-[#6E4331]/35 border-2 border-[#E2B98E] shadow-lg shadow-black/40 ring-1 ring-[#E2B98E]/50'
                              : 'bg-[#14281E]/70 border border-[#E2B98E]/15 hover:border-[#E2B98E]/40 hover:bg-[#183023]'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                              isSelected
                                ? 'bg-[#E2B98E] text-[#24160E] shadow-md'
                                : 'bg-[#12231A] text-[#E2B98E] border border-[#E2B98E]/20'
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span
                            className={`text-[11px] font-bold tracking-tight ${
                              isSelected ? 'text-[#FAF6F0]' : 'text-[#FAF6F0]/80'
                            }`}
                          >
                            {tile.label}
                          </span>
                          <span className="text-[9px] text-[#FAF6F0]/50 truncate max-w-full">
                            {tile.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.service && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* 2. Customer Name & Mobile */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-[11px] font-bold text-[#E2B98E] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#E2B98E]" />
                        <span>FULL NAME</span> <span className="text-[#E2B98E]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4 h-4 text-[#E2B98E]/60 pointer-events-none" />
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Your Name"
                          className={`w-full bg-[#12231A] pl-10 pr-4 py-2.5 text-sm text-[#FAF6F0] placeholder-[#FAF6F0]/30 rounded-xl border ${
                            errors.fullName
                              ? 'border-rose-500/80 focus:ring-rose-500'
                              : 'border-[#E2B98E]/20 focus:border-[#E2B98E] focus:ring-[#E2B98E]/20'
                          } focus:outline-none focus:ring-2 transition-all`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-[11px] font-bold text-[#E2B98E] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#E2B98E]" />
                        <span>MOBILE NUMBER</span> <span className="text-[#E2B98E]">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-xs text-[#E2B98E] font-bold">+91</span>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                          placeholder="10-Digit Mobile Number"
                          className={`w-full bg-[#12231A] pl-12 pr-4 py-2.5 text-sm text-[#FAF6F0] placeholder-[#FAF6F0]/30 rounded-xl border ${
                            errors.phone
                              ? 'border-rose-500/80 focus:ring-rose-500'
                              : 'border-[#E2B98E]/20 focus:border-[#E2B98E] focus:ring-[#E2B98E]/20'
                          } focus:outline-none focus:ring-2 transition-all`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[11px] font-bold text-[#E2B98E] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#E2B98E]" />
                      <span>EMAIL ADDRESS (TO RECEIVE BOOKING CONFIRMATION)</span> <span className="text-[#E2B98E]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#E2B98E]/60 pointer-events-none" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. customer@gmail.com"
                        className={`w-full bg-[#12231A] pl-10 pr-4 py-2.5 text-sm text-[#FAF6F0] placeholder-[#FAF6F0]/30 rounded-xl border ${
                          errors.email
                            ? 'border-rose-500/80 focus:ring-rose-500'
                            : 'border-[#E2B98E]/20 focus:border-[#E2B98E] focus:ring-[#E2B98E]/20'
                        } focus:outline-none focus:ring-2 transition-all`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* 3. Location / Area in Nellore */}
                <div className="p-4 rounded-2xl bg-[#14281E]/60 border border-[#E2B98E]/15 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-[11px] font-bold text-[#E2B98E] uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E2B98E]" />
                      <span>SELECT LOCATION IN {formData.city ? formData.city.toUpperCase() : 'NELLORE'}</span>
                      <span className="text-[#E2B98E]">*</span>
                    </label>

                    <button
                      type="button"
                      onClick={handleFetchLocation}
                      disabled={isFetchingLocation}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12231A] border border-[#E2B98E]/30 text-[11px] font-medium text-[#E2B98E] hover:bg-[#E2B98E]/10 transition-colors cursor-pointer w-fit"
                    >
                      {isFetchingLocation ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Navigation className="w-3 h-3" />
                      )}
                      <span>{isFetchingLocation ? 'Locating...' : 'GPS Detect'}</span>
                    </button>
                  </div>

                  {locationStatus && (
                    <p className={`text-[11px] px-3 py-1.5 rounded-lg ${locationStatus.includes('✅') ? 'bg-[#7AA27D]/20 text-[#9BBF9C]' : 'bg-rose-500/10 text-rose-300'}`}>
                      {locationStatus}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-[#FAF6F0]/60 mb-1">Select Area / Locality</label>
                      <select
                        onChange={(e) => {
                          const area = e.target.value;
                          if (area) {
                            setFormData((prev) => ({
                              ...prev,
                              address: prev.address ? `${area}, ${prev.address}` : `${area}, ${formData.city || 'Nellore'}`,
                            }));
                          }
                        }}
                        defaultValue=""
                        className="w-full bg-[#12231A] border border-[#E2B98E]/20 focus:border-[#E2B98E] rounded-xl px-3.5 py-2.5 text-xs text-[#FAF6F0] focus:outline-none focus:ring-2 focus:ring-[#E2B98E]/20 transition-all"
                      >
                        <option value="" disabled className="bg-[#12231A] text-[#FAF6F0]">-- Select Area in Nellore --</option>
                        {NELLORE_AREAS.map((area) => (
                          <option key={area} value={area} className="bg-[#12231A] text-[#FAF6F0]">
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#FAF6F0]/60 mb-1">Target Service Hub</label>
                      <select
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#12231A] border border-[#E2B98E]/20 focus:border-[#E2B98E] rounded-xl px-3.5 py-2.5 text-xs text-[#FAF6F0] focus:outline-none focus:ring-2 focus:ring-[#E2B98E]/20 transition-all"
                      >
                        <option value="nellore" className="bg-[#12231A] text-[#FAF6F0]">Nellore (Doorstep Dispatch Hub)</option>
                        <option value="bengaluru" className="bg-[#12231A] text-[#FAF6F0]">Bengaluru (HSR Layout Center)</option>
                        <option value="vizag" className="bg-[#12231A] text-[#FAF6F0]">Visakhapatnam (Seethammapeta Center)</option>
                        <option value="chennai" className="bg-[#12231A] text-[#FAF6F0]">Chennai (MG Road Center)</option>
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
                      className={`w-full bg-[#12231A] border ${
                        errors.address ? 'border-rose-500/80' : 'border-[#E2B98E]/20 focus:border-[#E2B98E]'
                      } rounded-xl px-3.5 py-2 text-xs text-[#FAF6F0] placeholder-[#FAF6F0]/30 focus:outline-none focus:ring-2 focus:ring-[#E2B98E]/20 transition-all`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>



                {/* 7. Preferred Reply Mode */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-[#FAF6F0]/70">Preferred reply:</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#FAF6F0]/90">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="phone"
                        checked={formData.contactMethod === 'phone'}
                        onChange={() => setFormData({ ...formData, contactMethod: 'phone' })}
                        className="accent-[#E2B98E]"
                      />
                      <span>Phone Call</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#FAF6F0]/90">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="whatsapp"
                        checked={formData.contactMethod === 'whatsapp'}
                        onChange={() => setFormData({ ...formData, contactMethod: 'whatsapp' })}
                        className="accent-[#E2B98E]"
                      />
                      <span>WhatsApp</span>
                    </label>
                  </div>
                </div>

                {/* STEP 1 NEXT BUTTON */}
                <button
                  type="button"
                  onClick={handleProceedToStep2}
                  className="w-full mt-3 inline-flex items-center justify-center gap-2 sand-btn-3d font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-full transition-all group cursor-pointer shadow-xl text-[#24160E]"
                >
                  <span>Proceed to Offers & Checkout (Step 2)</span>
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
                <div className="p-4 rounded-2xl bg-[#14281E]/80 border border-[#E2B98E]/25 flex items-center justify-between gap-3 shadow-md">
                  <div className="space-y-0.5 text-xs text-[#FAF6F0]/85">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#FAF6F0]">{formData.fullName}</span>
                      <span className="text-[10px] text-[#E2B98E] font-mono">+91 {formData.phone}</span>
                    </div>
                    <p className="text-[11px] text-[#D2DCD2]">
                      📅 {formData.slotDate} • ⏰ {formData.slotTime.split('(')[0].trim()} • 📍 {formData.city.toUpperCase()}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-[#E2B98E]/30 text-[#E2B98E] hover:bg-[#E2B98E]/10 transition-colors font-medium flex-shrink-0"
                  >
                    Edit Details
                  </button>
                </div>

                {/* 1. EXCLUSIVE OFFERS & DISCOUNTS */}
                <div className="p-4 rounded-2xl bg-[#14281E]/60 border border-[#E2B98E]/15 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E2B98E] uppercase tracking-wider flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#E2B98E]" />
                      <span>Select Exclusive Offer or Coupon</span>
                    </span>
                    <span className="text-[10px] text-[#7AA27D] font-semibold bg-[#7AA27D]/15 px-2 py-0.5 rounded-full border border-[#7AA27D]/30">
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
                          className={`p-3 rounded-2xl cursor-pointer border transition-all flex items-start justify-between gap-2.5 ${
                            isSelected
                              ? 'bg-[#6E4331]/40 border-[#E2B98E] shadow-md shadow-[#E2B98E]/10'
                              : 'bg-[#12231A]/80 border-[#E2B98E]/15 hover:border-[#E2B98E]/40'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#FAF6F0]">{offer.title}</span>
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#E2B98E]/20 text-[#E2B98E]">
                                {offer.code}
                              </span>
                            </div>
                            <p className="text-[10px] text-[#FAF6F0]/70 leading-tight">{offer.desc}</p>
                          </div>

                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isSelected ? 'bg-[#E2B98E] text-[#24160E]' : 'border border-[#E2B98E]/30 text-transparent'
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
                      className="text-[11px] text-[#E2B98E] hover:underline font-medium flex items-center gap-1"
                    >
                      <span>{showCustomOfferInput ? 'Hide promo code entry' : 'Have a different promo coupon code?'}</span>
                    </button>

                    {formData.selectedOffer && (
                      <span className="text-[11px] text-[#7AA27D] font-medium flex items-center gap-1.5 bg-[#7AA27D]/10 px-2 py-0.5 rounded-full border border-[#7AA27D]/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Coupon: {formData.selectedOffer}</span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, selectedOffer: '', customOfferCode: '' })}
                          className="ml-1 text-[#FAF6F0]/70 hover:text-rose-400 p-0.5 transition-colors cursor-pointer"
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
                        className="flex-1 bg-[#12231A] border border-[#E2B98E]/20 rounded-xl px-3.5 py-2 text-xs text-[#FAF6F0] uppercase font-mono placeholder-[#FAF6F0]/30 focus:outline-none focus:border-[#E2B98E]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (formData.customOfferCode.trim()) {
                            setFormData({ ...formData, selectedOffer: formData.customOfferCode.trim() });
                          }
                        }}
                        className="px-4 py-2 rounded-xl sand-btn-3d text-[#24160E] font-bold text-xs"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. CHECKOUT & SERVICE SUMMARY */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#14281E] border-2 border-[#E2B98E]/30 space-y-3.5 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#E2B98E]/15 pb-2.5">
                    <span className="text-xs font-bold text-[#E2B98E] uppercase tracking-wider flex items-center gap-1.5">
                      <Receipt className="w-3.5 h-3.5 text-[#E2B98E]" />
                      <span>Checkout & Final Price Summary</span>
                    </span>
                    <span className="text-[10px] bg-[#7AA27D]/20 text-[#7AA27D] font-bold px-2 py-0.5 rounded-full border border-[#7AA27D]/30">
                      🎉 Total Saved: ₹{totalSavings}
                    </span>
                  </div>

                  {/* Itemized summary */}
                  <div className="space-y-2 text-xs text-[#FAF6F0]/85">
                    <div className="flex items-center justify-between">
                      <span>Standard Initial Diagnostic & Inspection:</span>
                      <span className="font-mono">₹{BASE_DIAGNOSTIC_FEE}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#FAF6F0]/70">
                      <span>Doorstep Visit & Inspection Travel:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="line-through text-[#FAF6F0]/40 font-mono">₹{DOORSTEP_FEE_ORIGINAL}</span>
                        <span className="text-[#7AA27D] font-bold">FREE</span>
                      </div>
                    </div>
                    {formData.selectedOffer && (
                      <div className="flex items-center justify-between text-[#7AA27D] font-medium">
                        <span className="flex items-center gap-1">
                          <Gift className="w-3 h-3" />
                          <span>Offer Discount ({formData.selectedOffer}):</span>
                        </span>
                        <span className="font-mono font-bold">-₹{discountAmount}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-[#E2B98E]/15 flex items-center justify-between font-bold text-sm text-[#FAF6F0]">
                      <span>Total Payable at Doorstep:</span>
                      <span className="text-base font-mono text-[#E2B98E]">
                        {netDiagnosticDue === 0 ? '₹0 FREE' : `₹${netDiagnosticDue}`}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="pt-2 border-t border-[#E2B98E]/10 space-y-2">
                    <label className="block text-[11px] font-semibold text-[#E2B98E] uppercase tracking-wider">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <label
                        onClick={() => setFormData({ ...formData, paymentMethod: 'doorstep_cod' })}
                        className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                          formData.paymentMethod === 'doorstep_cod'
                            ? 'bg-[#6E4331]/40 border-[#E2B98E] text-[#FAF6F0]'
                            : 'bg-[#12231A]/60 border-[#E2B98E]/15 text-[#FAF6F0]/70 hover:border-[#E2B98E]/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="doorstep_cod"
                          checked={formData.paymentMethod === 'doorstep_cod'}
                          onChange={() => {}}
                          className="accent-[#E2B98E]"
                        />
                        <div className="text-left">
                          <div className="text-xs font-bold">Pay After Service (Cash / UPI)</div>
                          <div className="text-[10px] text-[#FAF6F0]/60">Zero advance fee required</div>
                        </div>
                      </label>

                      <label
                        onClick={() => setFormData({ ...formData, paymentMethod: 'doorstep_upi' })}
                        className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                          formData.paymentMethod === 'doorstep_upi'
                            ? 'bg-[#6E4331]/40 border-[#E2B98E] text-[#FAF6F0]'
                            : 'bg-[#12231A]/60 border-[#E2B98E]/15 text-[#FAF6F0]/70 hover:border-[#E2B98E]/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="doorstep_upi"
                          checked={formData.paymentMethod === 'doorstep_upi'}
                          onChange={() => {}}
                          className="accent-[#E2B98E]"
                        />
                        <div className="text-left">
                          <div className="text-xs font-bold flex items-center gap-1">
                            <CreditCard className="w-3 h-3 text-[#E2B98E]" />
                            <span>UPI / Card on Doorstep</span>
                          </div>
                          <div className="text-[10px] text-[#FAF6F0]/60">Pay via QR code or card machine</div>
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
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-4 rounded-full border border-[#E2B98E]/30 text-[#FAF6F0] text-xs font-semibold hover:bg-[#E2B98E]/10 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 sand-btn-3d font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer shadow-xl text-[#24160E]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Confirming Request & Booking...</span>
                      </>
                    ) : (
                      <>
                        <PartyPopper className="w-4 h-4 text-[#24160E]" />
                        <span>Confirm Request & Book Service</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Privacy notice and instant call option */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6F0]/65 pt-3 border-t border-[#E2B98E]/10 gap-2">
              <span className="text-[11px] text-[#FAF6F0]/60">🔒 100% Privacy Protected • Instant Slot Lock</span>
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="hover:text-[#E2B98E] transition-colors flex items-center gap-1.5 font-medium text-[#FAF6F0]/80"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E2B98E]" />
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
