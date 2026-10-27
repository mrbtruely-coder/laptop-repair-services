import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Check,
  X,
  PartyPopper,
  ShieldCheck,
  User,
  Laptop,
  Monitor,
  Network,
  Video,
  Mail,
  ChevronDown,
  Search,
  Crosshair,
  FileText,
} from 'lucide-react';
import { siteConfig, citiesData, primaryCities, parseLocality } from '../../config/site';

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
  subArea: string;
  otherSubArea: string;
  paymentMethod: 'doorstep_cod';
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
  subArea?: string;
  otherSubArea?: string;
  description?: string;
}

interface EnquiryFormProps {
  initialCity?: string;
  initialService?: string;
  initialSubcategory?: string;
  initialSubArea?: string;
  initialOtherSubArea?: string;
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

export interface TimeSlot {
  id: string;
  label: string;
  startHour: number; // 24-hr format (e.g. 9 for 9:00 AM, 14 for 2:00 PM, 17 for 5:00 PM)
}

export const ALL_TIME_SLOTS: TimeSlot[] = [
  { id: '09-11', label: '09:00 AM – 11:00 AM', startHour: 9 },
  { id: '11-13', label: '11:00 AM – 01:00 PM', startHour: 11 },
  { id: '01-03', label: '01:00 PM – 03:00 PM', startHour: 13 },
  { id: '03-05', label: '03:00 PM – 05:00 PM', startHour: 15 },
  { id: '05-07', label: '05:00 PM – 07:00 PM', startHour: 17 },
  { id: '07-09', label: '07:00 PM – 09:00 PM', startHour: 19 },
];

export interface DayOption {
  dateStr: string; // "YYYY-MM-DD"
  dayName: string; // "Today", "Tomorrow", "Wed", "Thu", etc.
  dateDisplay: string; // "27 Oct"
  fullFormatted: string; // "Tuesday, 27 Oct"
  isToday: boolean;
  isTomorrow: boolean;
  availableSlots: TimeSlot[];
}

export const getLocalDateString = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const generateNext7Days = (): DayOption[] => {
  const days: DayOption[] = [];
  const now = new Date();
  const currentHour = now.getHours();
  // 3-hour buffer: only slots starting at least 3 hours from now are available for today
  const minStartHourToday = currentHour + 3;
  const todayAvailableSlots = ALL_TIME_SLOTS.filter((s) => s.startHour >= minStartHourToday);

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(now.getDate() + i);
    const dateStr = getLocalDateString(d);
    const isToday = i === 0;
    const isTomorrow = i === 1;

    let dayName = isToday ? 'Today' : isTomorrow ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const dateDisplay = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    const fullFormatted = d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
    const availableSlots = isToday ? todayAvailableSlots : ALL_TIME_SLOTS;

    days.push({
      dateStr,
      dayName,
      dateDisplay,
      fullFormatted,
      isToday,
      isTomorrow,
      availableSlots,
    });
  }
  return days;
};

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialCity = '',
  initialService = '',
  initialSubcategory,
  initialSubArea = '',
  initialOtherSubArea = '',
  title = "Request Service",
  subtitle = "Select your device or service, enter details, and book your technician.",
  className = "",
}) => {
  const normalizeInitialCity = (c?: string) => {
    if (!c) return '';
    const lower = c.toLowerCase().trim();
    if (lower.includes('bengaluru') || lower.includes('bangalore')) return 'bengaluru';
    if (lower.includes('vizag') || lower.includes('visakhapatnam')) return 'vizag';
    if (lower.includes('chennai')) return 'chennai';
    if (lower.includes('vijayawada')) return 'vijayawada';
    if (lower.includes('hyderabad')) return 'hyderabad';
    return lower;
  };

  const defaultCity = normalizeInitialCity(initialCity);
  const defaultService = initialService || '';
  const defaultSubcategory =
    initialSubcategory ||
    (initialService ? (SERVICE_SUBCATEGORIES[initialService]?.[0]?.name || '') : '');

  const next7Days = useMemo(() => generateNext7Days(), []);
  const defaultDay = next7Days[0].availableSlots.length > 0 ? next7Days[0] : next7Days[1];
  const defaultSlot = defaultDay.availableSlots[0]?.label || '09:00 AM – 11:00 AM';

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    city: defaultCity,
    service: defaultService,
    subcategory: defaultSubcategory,
    serviceMode: 'doorstep',
    contactMethod: 'phone',
    slotDate: defaultDay.dateStr,
    slotTime: defaultSlot,
    address: '',
    subArea: initialSubArea || (initialOtherSubArea ? 'Other' : ''),
    otherSubArea: initialOtherSubArea || '',
    paymentMethod: 'doorstep_cod',
    description: '',
    honeypot: '',
  });

  const selectedDayObj = next7Days.find((d) => d.dateStr === formData.slotDate) || next7Days[0];

  const handleSelectDate = (day: DayOption) => {
    if (day.availableSlots.length === 0) return;
    setFormData((prev) => {
      const isCurrentSlotValid = day.availableSlots.some((s) => s.label === prev.slotTime);
      return {
        ...prev,
        slotDate: day.dateStr,
        slotTime: isCurrentSlotValid ? prev.slotTime : (day.availableSlots[0]?.label || ''),
      };
    });
    if (errors.slotDate) {
      setErrors((prev) => ({ ...prev, slotDate: undefined }));
    }
  };

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [emailSentTo, setEmailSentTo] = useState<string>('');
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string>('');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [isSubAreaDropdownOpen, setIsSubAreaDropdownOpen] = useState(false);
  const [subAreaSearchQuery, setSubAreaSearchQuery] = useState('');

  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const subAreaDropdownRef = useRef<HTMLDivElement>(null);
  const citySearchInputRef = useRef<HTMLInputElement>(null);
  const subAreaSearchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Sync state if initial props change
  useEffect(() => {
    if (initialCity) {
      const norm = normalizeInitialCity(initialCity);
      setFormData((prev) => ({ ...prev, city: norm }));
    }
  }, [initialCity]);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        service: initialService,
        subcategory: SERVICE_SUBCATEGORIES[initialService]?.[0]?.name || prev.subcategory,
      }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialSubArea) {
      if (initialSubArea === 'Other') {
        setFormData((prev) => ({
          ...prev,
          subArea: 'Other',
          otherSubArea: initialOtherSubArea || prev.otherSubArea || '',
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          subArea: initialSubArea,
          otherSubArea: '',
        }));
      }
    } else if (initialOtherSubArea) {
      setFormData((prev) => ({
        ...prev,
        subArea: 'Other',
        otherSubArea: initialOtherSubArea,
      }));
    }
  }, [initialSubArea, initialOtherSubArea]);

  // Dynamic city & localities data
  const normalizedCityKey = (formData.city || '').toLowerCase();
  const currentCityData = normalizedCityKey ? (citiesData[normalizedCityKey] || null) : null;
  const availableAreas = currentCityData?.localities || [];
  const availableParsedAreas = availableAreas.map((locStr) => parseLocality(locStr));

  const filteredCities = primaryCities.filter((c) => {
    const query = citySearchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      c.name.toLowerCase().includes(query) ||
      c.state.toLowerCase().includes(query) ||
      (c.popularName && c.popularName.toLowerCase().includes(query))
    );
  });

  const filteredSubAreas = availableParsedAreas.filter((loc) => {
    const query = subAreaSearchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      loc.name.toLowerCase().includes(query) ||
      (loc.distance && loc.distance.toLowerCase().includes(query))
    );
  });

  const handleSelectCity = (cityId: string) => {
    setFormData((prev) => ({
      ...prev,
      city: cityId,
      subArea: '',
      otherSubArea: '',
    }));
    setIsCityDropdownOpen(false);
    setCitySearchQuery('');
    if (errors.city) {
      setErrors((prev) => ({ ...prev, city: undefined }));
    }
    setTimeout(() => {
      setIsSubAreaDropdownOpen(true);
    }, 120);
  };

  const handleSelectSubArea = (areaName: string) => {
    setFormData((prev) => ({
      ...prev,
      subArea: areaName,
      otherSubArea: '',
    }));
    setIsSubAreaDropdownOpen(false);
    setSubAreaSearchQuery('');
    if (errors.subArea) {
      setErrors((prev) => ({ ...prev, subArea: undefined }));
    }
  };

  const handleSelectOtherArea = () => {
    setFormData((prev) => ({
      ...prev,
      subArea: 'Other',
    }));
    setIsSubAreaDropdownOpen(false);
    setSubAreaSearchQuery('');
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCityDropdownOpen(false);
      }
      if (
        subAreaDropdownRef.current &&
        !subAreaDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSubAreaDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-focus search inputs when opened
  useEffect(() => {
    if (isCityDropdownOpen) {
      setTimeout(() => citySearchInputRef.current?.focus(), 50);
    }
  }, [isCityDropdownOpen]);

  useEffect(() => {
    if (isSubAreaDropdownOpen) {
      setTimeout(() => subAreaSearchInputRef.current?.focus(), 50);
    }
  }, [isSubAreaDropdownOpen]);

  // Pricing breakdown calculations for Checkout
  const BASE_DIAGNOSTIC_FEE = 299;
  const DOORSTEP_FEE_ORIGINAL = 199;
  const netDiagnosticDue = BASE_DIAGNOSTIC_FEE;
  const totalSavings = DOORSTEP_FEE_ORIGINAL;

  // Helper to format high-precision, exact user location
  const formatExactLocation = (data: any): string => {
    if (!data) return '';
    const addr = data.address || {};
    const clean = (s?: string) => (s || '').replace(/^Ward \d+\s*/i, '').trim();
    const parts: string[] = [];

    // 1. Specific building, house number, shop, office, or landmark
    const building = addr.building || addr.house_name || addr.amenity || addr.office || addr.shop || '';
    if (building && building !== addr.road && !parts.includes(building)) {
      parts.push(building);
    }
    if (addr.house_number && !parts.some((p) => p.includes(addr.house_number))) {
      parts.push(addr.house_number);
    }

    // 2. Road, Street, or Lane
    const road = addr.road || addr.street || addr.pedestrian || addr.footway || '';
    if (road && !parts.some((p) => p.toLowerCase() === road.toLowerCase())) {
      parts.push(road);
    }

    // 3. Exact Colony, Neighbourhood, Residential Area, Sector, Phase, or Block
    const colony = clean(
      addr.neighbourhood ||
      addr.residential ||
      addr.subdivision ||
      addr.quarter ||
      addr.commercial ||
      addr.hamlet ||
      addr.village
    );
    if (colony && !parts.some((p) => p.toLowerCase() === colony.toLowerCase())) {
      parts.push(colony);
    }

    // 4. Suburb / Main Locality (e.g. Banjara Hills, Madhapur, Hitec City)
    const suburb = clean(addr.suburb || addr.city_district || addr.district);
    if (suburb && !parts.some((p) => p.toLowerCase().includes(suburb.toLowerCase()))) {
      parts.push(suburb);
    }

    // 5. City / Town
    const city = clean(addr.city || addr.town || addr.municipality || '');
    if (city && !parts.some((p) => p.toLowerCase().includes(city.toLowerCase()))) {
      parts.push(city);
    }

    // 6. Postcode / PIN Code
    if (addr.postcode && !parts.some((p) => p.includes(addr.postcode))) {
      parts.push(addr.postcode);
    }

    // If structured address details are rich (2+ parts), return them
    if (parts.length >= 2) {
      return parts.join(', ');
    }

    // Fallback: clean display_name by filtering out broad administrative labels
    if (data.display_name) {
      const rawSegments = data.display_name.split(',').map((s: string) => s.trim());
      const filtered = rawSegments.filter((seg: string) => {
        const lower = seg.toLowerCase();
        return (
          !lower.includes('greater hyderabad') &&
          !lower.includes('municipal corporation') &&
          !lower.includes('zone') &&
          !lower.includes('mandal') &&
          lower !== 'india'
        );
      });
      if (filtered.length > 0) {
        return filtered.slice(0, 4).join(', ');
      }
    }

    return parts.join(', ') || data.display_name || 'Current Location';
  };

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser. Please type your address manually.');
      return;
    }
    setIsFetchingLocation(true);
    setLocationStatus('Locating high-precision GPS coordinates...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1&zoom=18`,
            { headers: { 'Accept-Language': 'en' } }
          );
          if (res.ok) {
            const data = await res.json();
            const fullStr = formatExactLocation(data);
            const addr = data.address || {};

            const detectedCityCandidate = (
              addr.city || addr.town || addr.county || addr.state_district || ''
            ).toLowerCase();

            let matchedCityKey = '';
            if (detectedCityCandidate.includes('bengaluru') || detectedCityCandidate.includes('bangalore')) {
              matchedCityKey = 'bengaluru';
            } else if (detectedCityCandidate.includes('vizag') || detectedCityCandidate.includes('visakhapatnam')) {
              matchedCityKey = 'vizag';
            } else if (detectedCityCandidate.includes('chennai')) {
              matchedCityKey = 'chennai';
            } else if (detectedCityCandidate.includes('vijayawada')) {
              matchedCityKey = 'vijayawada';
            } else if (detectedCityCandidate.includes('hyderabad')) {
              matchedCityKey = 'hyderabad';
            }

            const detectedSuburb = (
              addr.suburb || addr.neighbourhood || addr.residential || addr.quarter || ''
            ).trim();

            setFormData((prev) => {
              const nextCity = matchedCityKey || prev.city;
              const cityLocalities = nextCity ? (citiesData[nextCity]?.localities || []) : [];
              const matchedLocality = detectedSuburb
                ? cityLocalities.find((l) => l.toLowerCase().includes(detectedSuburb.toLowerCase()))
                : undefined;

              return {
                ...prev,
                city: nextCity || prev.city,
                subArea: matchedLocality ? parseLocality(matchedLocality).name : (detectedSuburb || prev.subArea || 'Other'),
                otherSubArea: matchedLocality ? '' : (detectedSuburb || prev.otherSubArea),
                address: fullStr,
              };
            });

            if (errors.city || errors.subArea || errors.address) {
              setErrors((prev) => ({ ...prev, city: undefined, subArea: undefined, address: undefined }));
            }
            setLocationStatus(`✅ Exact location detected: ${fullStr}`);
          } else {
            const fallback = `GPS Pin: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
            setFormData((prev) => ({
              ...prev,
              address: fallback,
            }));
            setLocationStatus('✅ GPS Coordinates acquired.');
          }
        } catch {
          const fallback = `GPS Pin: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
          setFormData((prev) => ({
            ...prev,
            address: fallback,
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
      { timeout: 15000, enableHighAccuracy: true, maximumAge: 0 }
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

    if (!formData.subArea) {
      newErrors.subArea = 'Please select your locality / sub-area';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service or device above';
    } else if (!formData.subcategory) {
      newErrors.subcategory = 'Please select a specific repair issue / subcategory';
    }

    if (!formData.slotDate) {
      newErrors.slotDate = 'Please select an appointment date';
    }

    if (!formData.slotTime) {
      newErrors.slotTime = 'Please select a preferred time slot';
    }

    const isOtherSelected = formData.subArea === 'Other';
    if (isOtherSelected && (!formData.otherSubArea || formData.otherSubArea.trim().length < 2)) {
      newErrors.otherSubArea = 'Please enter your other location / area name';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      return;
    }

    if (!validateStep1()) {
      return;
    }

    setIsSubmitting(true);
    setToast(null);

    const generatedTicket = 'TF-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(generatedTicket);

    const isOtherSelected = formData.subArea === 'Other';
    const effectiveLocation = isOtherSelected ? formData.otherSubArea.trim() : formData.subArea.trim();

    // Construct unified address string
    let fullAddressString = formData.address.trim();
    if (effectiveLocation) {
      if (fullAddressString) {
        if (!fullAddressString.toLowerCase().includes(effectiveLocation.toLowerCase())) {
          fullAddressString = `${fullAddressString}, ${effectiveLocation}`;
        }
      } else {
        fullAddressString = effectiveLocation;
      }
    }

    const backendEndpoint = 'https://serviceapis.laptoprepairsservices.com/api/book-service';
    const serviceDisplayNames: Record<string, string> = {
      'laptop-repair': 'Laptop Hardware Diagnostics & Motherboard Servicing',
      'computer-repair': 'Desktop & PC Repair & Troubleshooting',
      'networking': 'Structured IT Networking, CAT6 Cabling & Wi-Fi Setup',
      'cctv-repair-installation': 'CCTV Camera Surveillance, Mounting & DVR Setup',
    };
    const resolvedServiceName = serviceDisplayNames[formData.service] || formData.service || 'Laptop Hardware Diagnostics & Motherboard Servicing';

    const bookingPayload = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      serviceType: resolvedServiceName,
      subcategory: formData.subcategory,
      address: fullAddressString,
      streetAddress: formData.address.trim(),
      subArea: effectiveLocation,
      otherLocation: isOtherSelected ? effectiveLocation : '',
      isOtherArea: isOtherSelected,
      area: effectiveLocation,
      locality: effectiveLocation,
      city: currentCityData?.name || formData.city || 'Hyderabad',
      state: 'Telangana',
      ticketId: generatedTicket,
      discountAmount: 0,
      payableAmount: netDiagnosticDue,
      contactMethod: formData.contactMethod,
      slotDate: formData.slotDate || new Date().toISOString().split('T')[0],
      slotTime: formData.slotTime || 'Within 90 Minutes (Express Dispatch)',
      preferredDate: formData.slotDate || new Date().toISOString().split('T')[0],
      preferredTime: formData.slotTime || 'Within 90 Minutes (Express Dispatch)',
      description: formData.description || 'Doorstep diagnostic and repair service',
      issueDescription: formData.description || 'Doorstep diagnostic and repair service',
      notes: formData.description || '',
      paymentMethod: 'doorstep_cod',
    };

    try {
      const response = await fetch(backendEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        const errMsg = resData.error || resData.message;
        setToast({ type: 'error', message: errMsg });
        setIsSubmitting(false);
        return;
      }

      // Dynamic toast message directly from backend response with NO static or fallback string
      setToast({ type: 'success', message: resData.message });
      setEmailSentTo(formData.email);
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Failed to communicate with Node.js backend:', err);
      setToast({ type: 'error', message: err?.message || String(err) });
      setIsSubmitting(false);
      return;
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
  };

  const getWhatsAppLeadLink = () => {
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
      `• Payment Mode: Cash on Delivery (Pay after service)\n` +
      `• Estimated Doorstep Due: ₹${netDiagnosticDue}\n` +
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

      {/* Floating Dynamic Backend Toast Notification (No static or fallback text) */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 max-w-md w-[calc(100vw-2.5rem)] animate-in slide-in-from-top-4 duration-300">
          <div
            className={`rounded-2xl p-4 shadow-2xl border flex items-start gap-3 backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-[#06223A] border-[#22C55E] text-white shadow-[#22C55E]/30'
                : 'bg-rose-950 border-rose-500 text-white shadow-rose-900/30'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-xs">
              <div className="font-extrabold uppercase tracking-wider text-[10px] text-slate-300 mb-0.5">
                {toast.type === 'success' ? 'Server Notification' : 'Server Alert'}
              </div>
              <p className="font-semibold text-slate-100 leading-relaxed">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

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
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#16A34A] text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Service Booked Successfully!</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-black tracking-tight">
              Your Appointment is Locked!
            </h3>
            {toast?.message && (
              <div className="max-w-md mx-auto p-3.5 rounded-2xl bg-[#22C55E]/15 border-2 border-[#22C55E] text-[#06223A] text-xs sm:text-sm font-semibold flex items-start gap-2.5 shadow-sm text-left">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-wider text-[#16A34A] font-extrabold">
                    Response from Server
                  </div>
                  <div className="text-slate-900 mt-0.5 font-medium">{toast.message}</div>
                </div>
              </div>
            )}
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
                  Cash on Delivery
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
                <span className="truncate">
                  <strong>Location:</strong>{' '}
                  {formData.address || (formData.subArea === 'Other' ? formData.otherSubArea : formData.subArea)
                    ? `${formData.address ? `${formData.address}, ` : ''}${formData.subArea === 'Other' ? formData.otherSubArea : formData.subArea || (currentCityData?.name || formData.city).toUpperCase()}`
                    : `${(currentCityData?.name || formData.city).toUpperCase()} Center`}
                </span>
              </p>
            </div>

            {/* Savings & Final Due */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-700">
                <span>Doorstep Convenience Visit:</span>
                <span className="text-[#16A34A] font-bold">FREE (Saved ₹199)</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-black block">Estimated Doorstep Payable:</span>
                  <span className="text-[10px] text-slate-500">Pay by Cash on completion (COD Only)</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-mono font-extrabold text-[#16A34A]">
                    ₹{netDiagnosticDue}
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
                  slotDate: defaultDay.dateStr,
                  slotTime: defaultSlot,
                  address: '',
                  subArea: initialSubArea || '',
                  otherSubArea: '',
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
                BOOKING FORM: SERVICE, DETAILS & APPOINTMENT
                =================================================== */}
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
                            const isSame = formData.service === newService;
                            setFormData((prev) => ({
                              ...prev,
                              service: newService,
                              subcategory: isSame ? prev.subcategory : '',
                              description: tile.label,
                            }));
                            if (errors.service) {
                              setErrors((prev) => ({ ...prev, service: undefined }));
                            }
                          }}
                          className={`relative p-3.5 sm:p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-center gap-2 transition-all duration-300 ease-out cursor-pointer group transform select-none ${
                            isSelected
                              ? 'bg-[#22C55E]/15 border-[#22C55E] shadow-md ring-2 ring-[#22C55E]/30 scale-[1.03] -translate-y-1'
                              : 'bg-gradient-to-b from-slate-50 to-white border-slate-200/90 shadow-2xs hover:border-[#22C55E] hover:bg-[#22C55E]/5 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-sm active:scale-95'
                          }`}
                        >
                          {/* Top right selected check badge */}
                          {isSelected && (
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#22C55E] text-white rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-75 duration-200">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}

                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              isSelected
                                ? 'bg-[#22C55E] text-white shadow-md scale-105 ring-2 ring-white'
                                : 'bg-[#06223A] text-[#22C55E] shadow-sm border border-[#06223A] group-hover:scale-110 group-hover:shadow-md'
                            }`}
                          >
                            <IconComponent className="w-6 h-6 transition-transform duration-300" />
                          </div>
                          <span
                            className={`text-[11px] font-extrabold tracking-tight transition-colors duration-200 ${
                              isSelected ? 'text-[#06223A]' : 'text-[#06223A] group-hover:text-[#16A34A]'
                            }`}
                          >
                            {tile.label}
                          </span>
                          <span className="text-[9px] text-slate-500 truncate max-w-full font-medium">
                            {tile.desc}
                          </span>
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full transition-all duration-200 ${
                              isSelected
                                ? 'bg-[#22C55E] text-white shadow-xs'
                                : 'bg-[#22C55E]/15 text-[#16A34A] border border-[#22C55E]/30'
                            }`}
                          >
                            Starts from ₹299
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.service && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium animate-in fade-in">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* 2. SELECT REPAIR / ISSUE SUBCATEGORY - ONLY SHOWN WHEN A SERVICE CATEGORY IS SELECTED */}
                {Boolean(formData.service) && (
                  <div className="space-y-2 pt-1 animate-in fade-in slide-in-from-top-4 duration-300 ease-out">
                    <div className="flex items-center justify-between">
                      <label className="block text-[11px] font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
                        <span>2. SELECT SPECIFIC ISSUE / REPAIR</span> <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[10px] text-[#16A34A] font-bold bg-[#22C55E]/15 px-2.5 py-0.5 rounded-full border border-[#22C55E]/30 animate-in fade-in duration-200">
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
                            className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all duration-200 ease-out cursor-pointer group transform select-none ${
                              isSelected
                                ? 'bg-[#22C55E]/10 border-2 border-[#22C55E] shadow-xs ring-1 ring-[#22C55E]/25 scale-[1.01] -translate-y-0.5'
                                : 'bg-white border-slate-200 hover:border-[#22C55E]/60 hover:bg-[#22C55E]/5 hover:translate-x-1 hover:shadow-2xs active:scale-[0.99]'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${
                                isSelected
                                  ? 'border-[#22C55E] bg-[#22C55E] text-white shadow-xs scale-105'
                                  : 'border-slate-300 bg-white group-hover:border-[#22C55E] group-hover:scale-105'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3] animate-in zoom-in-75 duration-150" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-1.5">
                                <div className={`text-xs font-bold leading-tight transition-colors duration-200 ${
                                  isSelected ? 'text-[#06223A]' : 'text-slate-800 group-hover:text-[#06223A]'
                                }`}>
                                  {sub.name}
                                </div>
                                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md whitespace-nowrap flex-shrink-0 ${
                                  isSelected
                                    ? 'bg-[#22C55E] text-white'
                                    : 'bg-[#22C55E]/15 text-[#16A34A] border border-[#22C55E]/30'
                                }`}>
                                  ₹299
                                </span>
                              </div>
                              {sub.desc && (
                                <div className="text-[10px] text-slate-500 leading-tight mt-1 truncate">
                                  {sub.desc}
                                </div>
                              )}
                              <div className="text-[10px] font-bold text-slate-500 mt-1 flex items-center gap-1">
                                <span>Starts from</span>
                                <span className="text-[#06223A] font-extrabold">₹299</span>
                                <span className="text-[9px] text-slate-400 font-normal">• Adjusted in bill</span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {errors.subcategory && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium animate-in fade-in">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.subcategory}
                      </p>
                    )}
                  </div>
                )}

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

                {/* 4. Location / Metro Area (Searchable Dropdowns: City & Subarea) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                    <div>
                      <label className="text-[11px] sm:text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#06223A]" />
                        <span>
                          SERVICE LOCALITY IN{' '}
                          {currentCityData?.name ? currentCityData.name.toUpperCase() : 'YOUR CITY'}
                        </span>
                        <span className="text-rose-500">*</span>
                      </label>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Choose your metro city and neighborhood or specify your exact colony
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleFetchLocation}
                      disabled={isFetchingLocation}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A34A] hover:text-[#15803D] cursor-pointer transition-colors self-start sm:self-auto"
                    >
                      {isFetchingLocation ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#16A34A]" />
                      ) : (
                        <Crosshair className="w-3.5 h-3.5 text-[#16A34A]" />
                      )}
                      <span>{isFetchingLocation ? 'Locating...' : 'Auto Detect Location'}</span>
                    </button>
                  </div>

                  {locationStatus && (
                    <p className={`text-[11px] px-3 py-1.5 rounded-lg font-medium ${locationStatus.includes('✅') ? 'bg-[#22C55E]/15 text-[#15803D]' : 'bg-rose-50 text-rose-600'}`}>
                      {locationStatus}
                    </p>
                  )}

                  {/* Two Dropdown Inputs: City & Subarea (Side-by-side as shown in reference) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                    {/* LEFT: CITY DROPDOWN WITH SEARCH */}
                    <div ref={cityDropdownRef} className="relative">
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        City / Metro Hub <span className="text-rose-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCityDropdownOpen(!isCityDropdownOpen);
                          setIsSubAreaDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 sm:py-3.5 rounded-2xl border bg-white flex items-center justify-between text-left text-xs sm:text-sm transition-all cursor-pointer shadow-2xs ${
                          isCityDropdownOpen
                            ? 'border-[#22C55E] ring-2 ring-[#22C55E]/20'
                            : errors.city
                            ? 'border-rose-400 bg-rose-50/20'
                            : 'border-slate-300 hover:border-[#22C55E]'
                        }`}
                      >
                        <span className={formData.city ? 'font-bold text-slate-900' : 'text-slate-400 font-medium'}>
                          {currentCityData?.name || 'Select City'}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ml-1 ${isCityDropdownOpen ? 'rotate-180 text-[#16A34A]' : ''}`} />
                      </button>

                      {/* City Popover Dropdown */}
                      {isCityDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 animate-in fade-in zoom-in-95 duration-150">
                          {/* Search Input */}
                          <div className="relative mb-2">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              ref={citySearchInputRef}
                              type="text"
                              value={citySearchQuery}
                              onChange={(e) => setCitySearchQuery(e.target.value)}
                              placeholder="Search city..."
                              className="w-full pl-8 pr-7 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E]"
                              autoComplete="off"
                            />
                            {citySearchQuery && (
                              <button
                                type="button"
                                onClick={() => setCitySearchQuery('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>

                          {/* Filtered Cities List */}
                          <div className="max-h-56 overflow-y-auto space-y-0.5 pr-1">
                            {filteredCities.length > 0 ? (
                              filteredCities.map((c) => {
                                const isSelected = normalizedCityKey === c.id;
                                return (
                                  <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => handleSelectCity(c.id)}
                                    className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#22C55E]/15 text-[#06223A] font-bold'
                                        : 'hover:bg-slate-50 text-slate-700'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                                      <div>
                                        <div className="font-bold text-slate-900">{c.name}</div>
                                        <div className="text-[10px] text-slate-400">{c.state}</div>
                                      </div>
                                    </div>
                                    {isSelected && <Check className="w-4 h-4 text-[#16A34A] stroke-[2.5]" />}
                                  </button>
                                );
                              })
                            ) : (
                              <div className="py-4 text-center text-xs text-slate-400">
                                No city found matching "{citySearchQuery}"
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {errors.city && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          {errors.city}
                        </p>
                      )}
                    </div>

                    {/* RIGHT: SUBAREA / LOCALITY DROPDOWN WITH SEARCH */}
                    <div ref={subAreaDropdownRef} className="relative">
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Subarea / Locality <span className="text-rose-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          if (!formData.city) {
                            setIsCityDropdownOpen(true);
                            setIsSubAreaDropdownOpen(false);
                            return;
                          }
                          setIsSubAreaDropdownOpen(!isSubAreaDropdownOpen);
                          setIsCityDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 sm:py-3.5 rounded-2xl border bg-white flex items-center justify-between text-left text-xs sm:text-sm transition-all cursor-pointer shadow-2xs ${
                          isSubAreaDropdownOpen
                            ? 'border-[#22C55E] ring-2 ring-[#22C55E]/20'
                            : errors.subArea
                            ? 'border-rose-400 bg-rose-50/20'
                            : 'border-slate-300 hover:border-[#22C55E]'
                        }`}
                      >
                        <span className={formData.subArea ? 'font-bold text-slate-900 truncate' : 'text-slate-400 font-medium'}>
                          {!formData.city
                            ? 'Select City First'
                            : formData.subArea === 'Other'
                            ? formData.otherSubArea ? `${formData.otherSubArea} (Other)` : 'Other / Custom Locality'
                            : formData.subArea || 'Select Subarea / Locality'}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ml-1 ${isSubAreaDropdownOpen ? 'rotate-180 text-[#16A34A]' : ''}`} />
                      </button>

                      {/* Subarea Popover Dropdown */}
                      {isSubAreaDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 animate-in fade-in zoom-in-95 duration-150">
                          {/* Search Input */}
                          <div className="relative mb-2">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              ref={subAreaSearchInputRef}
                              type="text"
                              value={subAreaSearchQuery}
                              onChange={(e) => setSubAreaSearchQuery(e.target.value)}
                              placeholder={`Search subarea in ${currentCityData?.name || 'city'}...`}
                              className="w-full pl-8 pr-7 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E]"
                              autoComplete="off"
                            />
                            {subAreaSearchQuery && (
                              <button
                                type="button"
                                onClick={() => setSubAreaSearchQuery('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>

                          {/* Filtered Subareas List */}
                          <div className="max-h-56 overflow-y-auto space-y-0.5 pr-1">
                            {filteredSubAreas.length > 0 ? (
                              filteredSubAreas.map((loc) => {
                                const isSelected = formData.subArea === loc.name;
                                return (
                                  <button
                                    key={loc.name}
                                    type="button"
                                    onClick={() => handleSelectSubArea(loc.name)}
                                    className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#22C55E]/15 text-[#06223A] font-bold'
                                        : 'hover:bg-slate-50 text-slate-700'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <MapPin className="w-3.5 h-3.5 text-[#22C55E] flex-shrink-0" />
                                      <span className="truncate font-semibold">{loc.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                                      {loc.distance && (
                                        <span className="text-[10px] text-slate-400 font-medium">
                                          {loc.distance}
                                        </span>
                                      )}
                                      {isSelected && <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[2.5]" />}
                                    </div>
                                  </button>
                                );
                              })
                            ) : (
                              <div className="py-2 text-center text-xs text-slate-400">
                                No locality found matching "{subAreaSearchQuery}"
                              </div>
                            )}

                            {/* + Other / Custom Locality Button */}
                            <button
                              type="button"
                              onClick={handleSelectOtherArea}
                              className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between text-xs border-t border-slate-100 transition-colors cursor-pointer mt-1 ${
                                formData.subArea === 'Other'
                                  ? 'bg-[#22C55E]/15 text-[#06223A] font-bold'
                                  : 'hover:bg-slate-50 text-[#16A34A] font-bold'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
                                <span>+ Other / Enter Custom Locality</span>
                              </div>
                              {formData.subArea === 'Other' && <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[2.5]" />}
                            </button>
                          </div>
                        </div>
                      )}

                      {errors.subArea && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          {errors.subArea}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Inline custom locality input when "Other" is chosen */}
                  {formData.subArea === 'Other' && (
                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <label className="block text-[11px] font-bold text-black uppercase tracking-wider">
                        Enter Colony / Area Name in {currentCityData?.name || 'City'}: <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.otherSubArea}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, otherSubArea: e.target.value }));
                          if (errors.otherSubArea) {
                            setErrors((prev) => ({ ...prev, otherSubArea: undefined }));
                          }
                        }}
                        placeholder="e.g. Colony name, Sector, Landmark or Community"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E]"
                        autoFocus
                      />
                      {errors.otherSubArea && (
                        <p className="text-xs text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" />
                          {errors.otherSubArea}
                        </p>
                      )}
                    </div>
                  )}

                  {/* 10 KM Radial Radius Assurance Banner */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3 text-slate-800 shadow-2xs">
                    <div className="w-7 h-7 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#16A34A] flex-shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="text-xs leading-relaxed">
                      <strong className="font-extrabold text-[#06223A]">10 KM Radial Radius Assurance:</strong>{' '}
                      <span className="text-slate-600 font-medium">
                        Our service vans cover all residential colonies, apartments, and IT parks within a 10 KM radial perimeter across {currentCityData?.name || 'your city'}.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5. DOOR NO / STREET / LANDMARK (OPTIONAL) - Matches screenshot */}
                <div>
                  <label htmlFor="address" className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>DOOR NO / STREET / LANDMARK (OPTIONAL)</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. Flat 302, Green Meadows Apt, Near SBI Bank"
                      className="w-full bg-white pl-10 pr-4 py-2.5 text-sm text-black placeholder-slate-400 rounded-xl border border-slate-300 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 focus:outline-none transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* 6. DYNAMIC DATE & TIME SLOT SCHEDULING (Next 7 Days + 3-Hour Buffer for Today) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-200/80 pb-3">
                    <div>
                      <label className="text-[11px] sm:text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#16A34A]" />
                        <span>SCHEDULE DATE & TIME SLOT</span>
                        <span className="text-rose-500">*</span>
                      </label>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Guaranteed doorstep technician arrival within your selected window
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#16A34A] bg-[#22C55E]/10 px-2.5 py-1 rounded-full border border-[#22C55E]/20 self-start sm:self-auto">
                      <Sparkles className="w-3 h-3 text-[#16A34A]" />
                      <span>3-Hour Dispatch Lead Time</span>
                    </div>
                  </div>

                  {/* Horizontal 7-Day Date Picker */}
                  <div>
                    <span className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">
                      Select Arrival Date (Next 7 Days)
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-0.5 scrollbar-thin">
                      {next7Days.map((day) => {
                        const isSelected = formData.slotDate === day.dateStr;
                        const isSlotsEmpty = day.availableSlots.length === 0;

                        return (
                          <button
                            key={day.dateStr}
                            type="button"
                            disabled={isSlotsEmpty}
                            onClick={() => handleSelectDate(day)}
                            className={`min-w-[76px] sm:min-w-[86px] px-3 py-2.5 rounded-2xl border text-center transition-all flex-shrink-0 cursor-pointer ${
                              isSlotsEmpty
                                ? 'bg-slate-100/80 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                                : isSelected
                                ? 'bg-[#06223A] border-[#22C55E] text-white ring-2 ring-[#22C55E]/30 shadow-md scale-[1.02]'
                                : 'bg-white border-slate-200 hover:border-[#22C55E] text-slate-700 hover:bg-emerald-50/20 shadow-2xs'
                            }`}
                          >
                            <div className={`text-[10px] font-black uppercase tracking-wider ${
                              isSelected ? 'text-[#22C55E]' : isSlotsEmpty ? 'text-slate-400' : 'text-slate-500'
                            }`}>
                              {day.dayName}
                            </div>
                            <div className={`text-xs sm:text-sm font-extrabold mt-0.5 ${
                              isSelected ? 'text-white' : isSlotsEmpty ? 'text-slate-400' : 'text-black'
                            }`}>
                              {day.dateDisplay}
                            </div>
                            {isSlotsEmpty && (
                              <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-md mt-1">
                                Full
                              </span>
                            )}
                            {isSelected && !isSlotsEmpty && (
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-1 mx-auto" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {errors.slotDate && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.slotDate}
                      </p>
                    )}
                  </div>

                  {/* Time Slot Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#16A34A]" />
                        <span>
                          Available Slots for {selectedDayObj.dayName === 'Today' ? 'Today' : selectedDayObj.dayName === 'Tomorrow' ? 'Tomorrow' : selectedDayObj.fullFormatted}:
                        </span>
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">
                        {selectedDayObj.availableSlots.length} Slots Available
                      </span>
                    </div>

                    {selectedDayObj.availableSlots.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {selectedDayObj.availableSlots.map((slot) => {
                          const isSlotSelected = formData.slotTime === slot.label;
                          return (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, slotTime: slot.label }));
                                if (errors.slotTime) setErrors((prev) => ({ ...prev, slotTime: undefined }));
                              }}
                              className={`p-2.5 sm:p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                                isSlotSelected
                                  ? 'border-[#22C55E] bg-[#22C55E]/10 ring-2 ring-[#22C55E]/20 text-[#06223A] font-extrabold shadow-xs'
                                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 text-slate-700 font-semibold shadow-2xs'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <Clock className={`w-3.5 h-3.5 flex-shrink-0 ${isSlotSelected ? 'text-[#16A34A]' : 'text-slate-400'}`} />
                                <span className="truncate">{slot.label}</span>
                              </div>
                              {isSlotSelected && (
                                <Check className="w-3.5 h-3.5 text-[#16A34A] stroke-[2.5] flex-shrink-0 ml-1.5" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">No remaining slots for Today</div>
                          <div className="text-[11px] text-amber-800 mt-0.5">
                            Due to our 3-hour engineer dispatch buffer, same-day slots are closed. Please select Tomorrow or an upcoming date.
                          </div>
                        </div>
                      </div>
                    )}

                    {errors.slotTime && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.slotTime}
                      </p>
                    )}
                  </div>
                </div>

                {/* 7. DESCRIBE APPLIANCE ISSUE / NOTE FOR TECHNICIAN (OPTIONAL) - Matches screenshot */}
                <div>
                  <label htmlFor="description" className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>DESCRIBE APPLIANCE ISSUE / NOTE FOR TECHNICIAN (OPTIONAL)</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="e.g. AC cooling slowly, making clicking noise, etc."
                    className="w-full bg-white p-3.5 text-sm text-black placeholder-slate-400 rounded-xl border border-slate-300 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 focus:outline-none transition-all resize-none shadow-2xs"
                  />
                </div>

                {/* 8. Preferred Reply Mode */}
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

                {/* 9. Transparent Pricing Summary & COD Assurance */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Standard Diagnostic & Inspection Visit:</span>
                    <span className="font-mono font-bold text-black">₹{BASE_DIAGNOSTIC_FEE}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Doorstep Technician Travel Fee:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="line-through text-slate-400 font-mono text-[11px]">₹{DOORSTEP_FEE_ORIGINAL}</span>
                      <span className="text-[#16A34A] font-bold">FREE (Saved ₹199)</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-black block">Estimated Doorstep Payable:</span>
                      <span className="text-[11px] text-slate-500 font-medium">Pay after service completion (Cash on Delivery Only)</span>
                    </div>
                    <span className="text-xl font-mono font-extrabold text-[#16A34A]">
                      ₹{netDiagnosticDue}
                    </span>
                  </div>
                </div>

                {/* DIRECT SUBMIT ACTION BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white font-extrabold text-sm uppercase tracking-wider py-4 px-6 rounded-2xl transition-all disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer shadow-lg shadow-[#22C55E]/30"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Request & Dispatching...</span>
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
