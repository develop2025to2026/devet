import React, { useState, useRef } from "react";
import { 
  Scissors, 
  Sparkles, 
  Calendar, 
  Heart, 
  Star, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  Check, 
  Instagram, 
  Facebook, 
  Eye,
  Gift,
  ShieldCheck,
  Map,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Image constants generated representing the luxury salon
const IMAGES = {
  hero: "/src/assets/images/spa_hero_banner_1781161567404.png",
  hair: "/src/assets/images/hair_styling_1781161587320.png",
  facial: "/src/assets/images/skincare_facial_1781161604658.png",
  bridal: "/src/assets/images/luxury_bridal_1781161624319.png"
};

// Services Data with Descriptions and pricing in both USD and LKR
const SERVICES_DATA = [
  {
    id: "hair",
    category: "Hair Care & Styling",
    icon: Scissors,
    tagline: "Tailored cuts, premium colors, and structural therapies.",
    items: [
      { name: "Couture Balayage & Highlight", duration: "180 mins", priceUSD: 120, priceLKR: 36000, desc: "Exquisite hand-painted color blending tailored to illuminate your profile." },
      { name: "Signature Keratin Therapy", duration: "120 mins", priceUSD: 150, priceLKR: 45000, desc: "Restructuring treatment that leaves hair silk-smooth and frizz-free." },
      { name: "Artisanal Haircut & Blowout", duration: "60 mins", priceUSD: 45, priceLKR: 13500, desc: "Personalized designer cut and voluminous luxury finish." },
      { name: "Glaze & Deep Moisture Ritual", duration: "45 mins", priceUSD: 55, priceLKR: 16500, desc: "High-shine color glaze coupled with intensive nourishment." }
    ]
  },
  {
    id: "skin",
    category: "Skin & Facials",
    icon: Sparkles,
    tagline: "Scientific dermal treatments for cellular radiance.",
    items: [
      { name: "HydraFacial Glow Elixir", duration: "75 mins", priceUSD: 90, priceLKR: 27000, desc: "Multi-step resurfacing and deep hydration for an ultimate glass skin finish." },
      { name: "Sculpting Jade & Rose Ritual", duration: "60 mins", priceUSD: 75, priceLKR: 22500, desc: "Manual lymphatic massage with premium organic botanical oils." },
      { name: "Advanced Anti-Aging Facial", duration: "90 mins", priceUSD: 110, priceLKR: 33000, desc: "Firming skin therapy targeting micro-circulation and cellular youth." },
      { name: "Gold-Leaf Hydrojelly Radiance", duration: "50 mins", priceUSD: 65, priceLKR: 19500, desc: "Illuminating clinical facial paired with real gold extract jelly mask." }
    ]
  },
  {
    id: "bridal",
    category: "Cosmetics & Bridal",
    icon: Heart,
    tagline: "Master artistry for your most memorable milestones.",
    items: [
      { name: "Luxury Bridal Makeup & Veil Setup", duration: "150 mins", priceUSD: 250, priceLKR: 75000, desc: "Comprehensive bridal transformation including high-fidelity contouring and styling." },
      { name: "Elegance Event Airbrushing", duration: "90 mins", priceUSD: 110, priceLKR: 33000, desc: "Ultra-precise airbrush makeup formulation designed for high-resolution photography." },
      { name: "Soft Glam Portrait Editorial", duration: "75 mins", priceUSD: 85, priceLKR: 25500, desc: "Luminous, minimalist makeup emphasizing your natural structural assets." }
    ]
  },
  {
    id: "nail",
    category: "Nail Lounge Spa",
    icon: Sparkles,
    tagline: "Exceptional manicures, protective coatings, and fine nail art.",
    items: [
      { name: "Royal Gel Manicure & Scrub", duration: "65 mins", priceUSD: 45, priceLKR: 13500, desc: "Exfoliating botanical scrub, precision cuticle care, and chip-resistant gel finish." },
      { name: "Couture Hand-Painted Art Extensions", duration: "120 mins", priceUSD: 85, priceLKR: 25500, desc: "Luxury full-set extensions detailed with custom hand-painted minimal gold leaf patterns." },
      { name: "Organic Lavender Spa Pedicure", duration: "75 mins", priceUSD: 60, priceLKR: 18000, desc: "Relaxing warm herbal soak, professional dead-skin smoothing, and essential oil touch." }
    ]
  }
];

// Testimonials Data
const TESTIMONIALS = [
  {
    name: "Eleanor Sterling",
    role: "Regular Guest",
    rating: 5,
    text: "The Couture Balayage exceeded my expectations. The stylists are true artists, and the entire ambience feels like a tranquil sanctuary of luxury. It is simply the finest salon I have ever stepped foot in.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Dr. Amara Perera",
    role: "Bridal Client",
    rating: 5,
    text: "For my wedding, they created a soft glam look that lasted all day under harsh photography lights. The airbrushing was completely flawless and weightless. I cannot recommend internal staff highly enough!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Samantha Wright",
    role: "Wellness Member",
    rating: 5,
    text: "The HydraFacial Glow is worth every single dollar. My skin has never looked so clear, smooth, and naturally plump. They pay incredible attention to every touch point of comfort.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

// Available times for pure frontend interactive booking
const TIME_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM",
  "06:00 PM"
];

export default function App() {
  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active Category State for Services List
  const [activeTab, setActiveTab] = useState("hair");

  // Currency State (USD vs LKR)
  const [currency, setCurrency] = useState<"USD" | "LKR">("USD");

  // Before/After Image Slider Interactive Position (Percentage)
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Appointment Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceCategory: "hair",
    subService: "Couture Balayage & Highlight",
    date: "",
    time: "10:30 AM",
    notes: ""
  });

  // Success Notification State
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Handle Before/After drag interaction
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left mouse click held
      handleSliderMove(e.clientX);
    }
  };

  const handleSliderClick = (e: React.MouseEvent) => {
    handleSliderMove(e.clientX);
  };

  // Safe subset services list based on category
  const activeSubServices = SERVICES_DATA.find((s) => s.id === formData.serviceCategory)?.items || [];

  const handleCategoryChange = (cat: string) => {
    const list = SERVICES_DATA.find((s) => s.id === cat)?.items || [];
    setFormData({
      ...formData,
      serviceCategory: cat,
      subService: list[0]?.name || ""
    });
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert("Please fill in your Name, Phone Number, and Date to schedule your session.");
      return;
    }
    // Pure frontend interactive success action
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
    }, 6000);
  };

  // Scroll smoothly helper
  const scrollToId = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1D1B18] font-sans antialiased relative overflow-x-hidden selection:bg-gold-200 selection:text-gold-900">
      
      {/* Dynamic Background Design Flourishes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[30%] left-0 w-[500px] h-[500px] bg-gold-200/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-0 w-80 h-80 bg-gold-350/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* HEADER / STICKY NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-gold-200/30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToId("hero")}>
              <div className="flex items-center gap-2">
                <span className="p-2.5 rounded-full bg-gold-100/60 border border-gold-200 text-gold-700">
                  <Scissors className="w-5 h-5" />
                </span>
                <div>
                  <h1 className="font-serif text-xl tracking-wider font-semibold text-gold-900">AURELIA</h1>
                  <p className="text-[9px] uppercase tracking-[0.25em] -mt-1 font-sans text-gold-600 font-bold">Salon & Luxury Spa</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10">
              <button 
                onClick={() => scrollToId("services")} 
                className="font-medium text-sm text-stone-600 hover:text-gold-700 transition"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToId("pricing")} 
                className="font-medium text-sm text-stone-600 hover:text-gold-700 transition"
              >
                Pricing & Menu
              </button>
              <button 
                onClick={() => scrollToId("gallery")} 
                className="font-medium text-sm text-stone-600 hover:text-gold-700 transition"
              >
                Visual Gallery
              </button>
              <button 
                onClick={() => scrollToId("testimonials")} 
                className="font-medium text-sm text-stone-600 hover:text-gold-700 transition"
              >
                Reviews
              </button>
            </nav>

            {/* CTA action / Currency Toggle */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-full text-xs">
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-3 py-1 rounded-full transition font-semibold ${currency === "USD" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-800"}`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setCurrency("LKR")}
                  className={`px-3 py-1 rounded-full transition font-semibold ${currency === "LKR" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-800"}`}
                >
                  LKR (₨)
                </button>
              </div>

              <button 
                onClick={() => scrollToId("book-appointment")}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-gold-800 text-white rounded-full text-sm font-semibold hover:bg-gold-900 shadow-sm hover:shadow-md transition active:scale-[0.98] cursor-pointer"
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile menu and currency buttons */}
            <div className="flex items-center gap-3 md:hidden">
              <button 
                onClick={() => setCurrency(currency === "USD" ? "LKR" : "USD")}
                className="text-[11px] font-bold text-stone-600 border border-stone-300 rounded-full px-2.5 py-1 bg-stone-150 transition active:bg-stone-200"
              >
                {currency === "USD" ? "USD ($)" : "LKR (₨)"}
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-[#2D2D2D] hover:bg-gold-50 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-gold-950" /> : <Menu className="w-6 h-6 text-stone-800" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#FAF8F5] border-t border-gold-200/45 overflow-hidden shadow-md"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                <button 
                  onClick={() => scrollToId("services")} 
                  className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-stone-700 hover:bg-gold-50 hover:text-gold-800 transition"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToId("pricing")} 
                  className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-stone-700 hover:bg-gold-50 hover:text-gold-800 transition"
                >
                  Pricing & Menu
                </button>
                <button 
                  onClick={() => scrollToId("gallery")} 
                  className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-stone-700 hover:bg-gold-50 hover:text-gold-800 transition"
                >
                  Visual Gallery
                </button>
                <button 
                  onClick={() => scrollToId("testimonials")} 
                  className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-stone-700 hover:bg-gold-50 hover:text-gold-800 transition"
                >
                  Reviews
                </button>
                
                <div className="pt-4 border-t border-stone-200">
                  <button 
                    onClick={() => scrollToId("book-appointment")}
                    className="flex w-full items-center justify-center py-3 px-4 bg-gold-800 text-white rounded-full font-semibold text-center hover:bg-gold-900 transition shadow-xs"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-8 pb-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="sm:text-center md:max-w-3xl md:mx-auto lg:col-span-6 lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-100 border border-gold-200/50 mb-6 text-gold-800 text-xs tracking-wider uppercase font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
                <span>The Pinnacle of Pure Wellness & Aesthetics</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-900 tracking-tight leading-[1.1]"
              >
                Unveil Your True, <br />
                <span className="text-gold-600 italic font-normal">Radiant Glow</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl lg:max-w-none"
              >
                Welcome to Aurelia, an exquisite sanctuary for high-end wellness, creative hair couture, precision facials, and premium transformations. Our tailored boutique approach pairs state-of-the-art styling with pure therapeutic botanical care.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4 space-y-3 sm:space-y-0"
              >
                <button
                  onClick={() => scrollToId("book-appointment")}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gold-800 text-white font-semibold rounded-full hover:bg-gold-900 transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
                >
                  Schedule Appointment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                
                <button
                  onClick={() => scrollToId("services")}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-stone-800 border border-stone-200/80 font-semibold rounded-full hover:bg-stone-50 hover:border-gold-300 transition active:scale-98 cursor-pointer"
                >
                  Explore Services
                </button>
              </motion.div>

              {/* Minimal Trust markers */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-12 pt-8 border-t border-gold-200/30 grid grid-cols-3 gap-4"
              >
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">4.9★</h3>
                  <p className="text-xs text-stone-500 uppercase tracking-wider mt-0.5">Customer Rating</p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">12k+</h3>
                  <p className="text-xs text-stone-500 uppercase tracking-wider mt-0.5">Happy Guests</p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">15+</h3>
                  <p className="text-xs text-stone-500 uppercase tracking-wider mt-0.5">Years Expertise</p>
                </div>
              </motion.div>
            </div>

            {/* Right Image Column with Premium Custom Generated Asset */}
            <div className="mt-14 lg:mt-0 lg:col-span-6 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative mx-auto max-w-lg lg:max-w-none px-4 sm:px-0"
              >
                {/* Visual backdrop frame */}
                <div className="absolute inset-0 bg-gold-100 rounded-3xl translate-x-4 translate-y-4 -z-10 border border-gold-200/50" />
                
                {/* Hero Asset */}
                <div className="overflow-hidden rounded-3xl shadow-xl aspect-16/9 bg-stone-100 border border-[#E5DEC9]">
                  <img 
                    src={IMAGES.hero} 
                    alt="Luxury spa and serene facial therapy" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Flying Overlay Cards showing genuine quality detail */}
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md border border-gold-200/60 p-4 rounded-2xl shadow-lg hidden sm:flex items-center gap-3 max-w-xs animate-bounce" style={{ animationDuration: '4s' }}>
                  <span className="p-2.5 bg-green-50 text-green-700 rounded-full">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Pure Organic Care</h4>
                    <p className="text-[10px] text-stone-500 mt-0.5">Cruelty-free, vegan botanical elements safely certified.</p>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-md border border-gold-200/60 p-4 rounded-2xl shadow-lg hidden sm:flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gold-200" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" />
                    <img className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gold-200" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" />
                    <img className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gold-200" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-stone-900">Highly Trusted</span>
                    <span className="text-[10px] text-stone-500 block">5★ Reviews across 300+ platforms</span>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* THE BOUTIQUE DIFFERENCE / PROMOTION */}
      <section className="bg-gold-50 py-16 border-y border-gold-205/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start p-4">
              <span className="p-3 bg-white rounded-2xl border border-gold-200 text-gold-700 font-bold shrink-0">01</span>
              <div>
                <h3 className="font-serif text-lg text-stone-900 font-semibold mb-1">Tailored Consultations</h3>
                <p className="text-stone-600 text-sm leading-relaxed">Every treatment begins with a thorough scalp & skin evaluation to construct customizable beauty formulas designed specifically for you.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4">
              <span className="p-3 bg-white rounded-2xl border border-gold-200 text-gold-700 font-bold shrink-0">02</span>
              <div>
                <h3 className="font-serif text-lg text-stone-900 font-semibold mb-1">Certified Master Elite Stylists</h3>
                <p className="text-stone-600 text-sm leading-relaxed">Our artisans participate in continuous global beauty seminars ensuring the latest techniques in organic airbrushing and Balayage.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-4">
              <span className="p-3 bg-white rounded-2xl border border-gold-200 text-gold-700 font-bold shrink-0">03</span>
              <div>
                <h3 className="font-serif text-lg text-stone-900 font-semibold mb-1">Boutique Luxury Sanctuary</h3>
                <p className="text-stone-600 text-sm leading-relaxed">Step away into sensory perfection. Enjoy aromatherapy lounge rooms, direct fresh herbal tea treatments, and complete soothing privacy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES SECTION */}
      <section id="services" className="py-20 md:py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-600 uppercase tracking-widest text-xs font-bold block mb-3">Our Core Menu</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">Luxury Services Structured with Excellence</h2>
            <div className="h-0.5 w-16 bg-gold-400 mx-auto mt-4" />
            <p className="mt-4 text-stone-600">Discover custom color treatments, clinical revitalizing peels, elite hand craft manicures, and complete high-end bridal transformations.</p>
          </div>

          {/* Grid Layout of Primary Services with Quality Custom Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Service 1: Hair Carey */}
            <div className="group bg-white rounded-2xl border border-stone-200/60 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="aspect-4/3 overflow-hidden bg-stone-100 relative">
                <img 
                  src={IMAGES.hair} 
                  alt="Elite Hair Styling & Couture coloring" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-medium text-gold-800 border border-gold-250/30">Couture Color</div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 text-gold-600">
                  <Scissors className="w-5 h-5 shrink-0" />
                  <span className="text-xs uppercase tracking-wider font-bold">Hair Couture</span>
                </div>
                <h3 className="font-serif text-xl text-stone-900 font-semibold mb-2 group-hover:text-gold-700 transition">Hair Styling & Creative Coloring</h3>
                <p className="text-xs text-stone-600 leading-relaxed flex-grow">Master balayage artists, premium structural keratin care, high-gloss glossing, and bespoke cut structures perfectly designed for your facial contours.</p>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-505">Starts from <span className="text-gold-700 font-bold">{currency === "USD" ? "$45" : "₨ 13,500"}</span></span>
                  <button onClick={() => { handleCategoryChange("hair"); scrollToId("pricing"); }} className="text-xs font-bold text-gold-800 hover:text-gold-900 flex items-center gap-1 transition">
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Service 2: Skin Care */}
            <div className="group bg-white rounded-2xl border border-stone-200/60 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="aspect-4/3 overflow-hidden bg-stone-100 relative">
                <img 
                  src={IMAGES.facial} 
                  alt="Scientific skin care & Hydradermabrasion" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-medium text-gold-800 border border-gold-250/30">Radiance Facials</div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 text-gold-600">
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <span className="text-xs uppercase tracking-wider font-bold">Dermal Therapy</span>
                </div>
                <h3 className="font-serif text-xl text-stone-900 font-semibold mb-2 group-hover:text-gold-700 transition">Skin Care & Clinical Facials</h3>
                <p className="text-xs text-stone-600 leading-relaxed flex-grow">HydraFacial deep hydration, lymphatic jade stone sculpting, intensive collagen boost rituals, and expert chemical micro-peels.</p>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-505">Starts from <span className="text-gold-700 font-bold">{currency === "USD" ? "$65" : "₨ 19,500"}</span></span>
                  <button onClick={() => { handleCategoryChange("skin"); scrollToId("pricing"); }} className="text-xs font-bold text-gold-800 hover:text-gold-900 flex items-center gap-1 transition">
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Service 3: Cosmetics */}
            <div className="group bg-white rounded-2xl border border-stone-200/60 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="aspect-4/3 overflow-hidden bg-stone-100 relative">
                <img 
                  src={IMAGES.bridal} 
                  alt="Flawless Airbrush Event Makeup" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-medium text-gold-800 border border-gold-250/30">Elite Bridal</div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 text-gold-600">
                  <Heart className="w-5 h-5 shrink-0" />
                  <span className="text-xs uppercase tracking-wider font-bold">Bridal Specialists</span>
                </div>
                <h3 className="font-serif text-xl text-stone-900 font-semibold mb-2 group-hover:text-gold-700 transition">Bridal Makeup & Premium Styling</h3>
                <p className="text-xs text-stone-600 leading-relaxed flex-grow">Complete wedding transformations, light glamour airbrush contour, customized veil settings, and photography-ready bridal hair trial packages.</p>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-505">Starts from <span className="text-gold-700 font-bold">{currency === "USD" ? "$85" : "₨ 25,500"}</span></span>
                  <button onClick={() => { handleCategoryChange("bridal"); scrollToId("pricing"); }} className="text-xs font-bold text-gold-800 hover:text-gold-900 flex items-center gap-1 transition">
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Service 4: Nail Lounge */}
            <div className="group bg-white rounded-2xl border border-stone-200/60 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full">
              <div className="aspect-4/3 overflow-hidden bg-stone-100 relative">
                <img 
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600" 
                  alt="Custom nail detailing and protective coatings" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-medium text-gold-800 border border-gold-250/30">Hand Painted Art</div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 text-gold-600">
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <span className="text-xs uppercase tracking-wider font-bold">Nail Lounge</span>
                </div>
                <h3 className="font-serif text-xl text-stone-900 font-semibold mb-2 group-hover:text-gold-700 transition">Exquisite Manicures & Fine Nail Art</h3>
                <p className="text-xs text-stone-600 leading-relaxed flex-grow">Nourishing lavender mineral scrubs, elegant gel polishes, highly protective custom acrylic extensions, and specialized minimal gold-leaf decals.</p>
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-505">Starts from <span className="text-gold-700 font-bold">{currency === "USD" ? "$45" : "₨ 13,500"}</span></span>
                  <button onClick={() => { handleCategoryChange("nail"); scrollToId("pricing"); }} className="text-xs font-bold text-gold-800 hover:text-gold-900 flex items-center gap-1 transition">
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-16 bg-neutral-900 text-[#FAF6F0] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="md:flex md:items-center md:justify-between relative z-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-gold-450 text-xs tracking-widest uppercase mb-3">
                  <Gift className="w-4 h-4 text-gold-400" />
                  <span className="text-gold-300 font-medium font-mono">Bespoke Gifting</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium mb-3">Give the Eternal Gift of Aurelia Beauty Spa</h3>
                <p className="text-stone-300 text-sm leading-relaxed">Present family, spouses, or bridal circles with customizable, beautifully embossed membership vouchers or physical golden cards printed on organic stock material.</p>
              </div>
              <div className="mt-6 md:mt-0">
                <button 
                  onClick={() => scrollToId("book-appointment")}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-gold-400 text-stone-900 font-bold rounded-full hover:bg-gold-300 hover:text-stone-950 transition active:scale-[0.98]"
                >
                  Order Gift Certificate
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BEFORE / AFTER INTERACTIVE SLIDER GALLERY */}
      <section id="gallery" className="py-20 md:py-24 bg-gold-50 border-y border-gold-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold-600 uppercase tracking-widest text-xs font-bold block mb-3">Transformation Spotlight</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900">Before & After Masterpieces</h2>
            <div className="h-0.5 w-16 bg-gold-400 mx-auto mt-4" />
            <p className="mt-4 text-stone-600 text-sm">Experience the true protective quality of our formulas. Drag the divider below to reveal the breathtaking outcome of our keratin structure repairs.</p>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            
            {/* Interactive Slider Panel */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full max-w-2xl">
                
                {/* Image Container frame */}
                <div 
                  ref={sliderRef}
                  className="relative h-[350px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-stone-250 cursor-ew-resize select-none"
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                  onClick={handleSliderClick}
                >
                  
                  {/* Before state (Base original) */}
                  <div className="absolute inset-0 bg-stone-200">
                    <img 
                      src={IMAGES.hair}
                      alt="Before Styling Treatment" 
                      className="h-full w-full object-cover filter grayscale-30 sepia brightness-[0.8]" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs font-mono tracking-widest px-3 py-1 rounded-full uppercase">
                      Before (Dry Ends)
                    </div>
                  </div>

                  {/* After state (Revealed glowing hair) */}
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
                  >
                    <img 
                      src={IMAGES.hair} 
                      alt="After Premium Voluminous Therapy" 
                      className="absolute top-0 left-0 h-full w-full object-cover"
                      style={{ width: sliderRef.current ? sliderRef.current.getBoundingClientRect().width : '100%', maxWidth: 'none' }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-4 left-4 bg-gold-800 text-white text-xs font-mono tracking-widest px-3 py-1 rounded-full uppercase z-10">
                      After Aurelia Elite Therapy
                    </div>
                  </div>

                  {/* Slider Line handle */}
                  <div 
                    className="absolute top-0 bottom-0 w-[4px] bg-white cursor-ew-resize z-20 shadow-md"
                    style={{ left: `${sliderPos}%` }}
                  >
                    {/* Floating gold coin button */}
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gold-800 border-2 border-white flex items-center justify-between px-1 shadow-lg pointer-events-none text-white">
                      <span className="text-[10px] font-bold">◀</span>
                      <span className="text-[10px] font-bold">▶</span>
                    </div>
                  </div>

                </div>
                
                <p className="text-center text-xs text-stone-500 mt-4 italic">
                  *Hold and drag the center handle left or right to inspect the seamless follicular shine finish.
                </p>

              </div>
            </div>

            {/* Side Gallery Cards (Concept Grid) */}
            <div className="lg:col-span-5 mt-10 lg:mt-0 space-y-6">
              
              <div className="p-6 bg-white rounded-2xl border border-stone-200/60 shadow-xs flex items-center gap-4">
                <div className="w-20 h-20 bg-stone-100 rounded-xl overflow-hidden shrink-0">
                  <img src={IMAGES.facial} alt="HydraFacial detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900">Dermal Surface Renewal</h4>
                  <p className="text-xs text-stone-600 mt-1">Dramatically reduced redness, improved cellular water retention, and immediate soft bounce certified by clinical testers.</p>
                  <span className="text-[11px] font-bold text-gold-700 block mt-2 uppercase tracking-wide">Skin hydration uplifted by 85%</span>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-stone-200/60 shadow-xs flex items-center gap-4">
                <div className="w-20 h-20 bg-stone-100 rounded-xl overflow-hidden shrink-0">
                  <img src={IMAGES.bridal} alt="Bridal detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-900">Advanced Makeup Contouring</h4>
                  <p className="text-xs text-stone-600 mt-1">Precision coverage masking subtle hyper-pigmentation while retaining a lightweight, gorgeous satin-finish touch all day.</p>
                  <span className="text-[11px] font-bold text-gold-700 block mt-2 uppercase tracking-wide">Up to 16 Hours Flawless Wear</span>
                </div>
              </div>

              <div className="p-6 bg-white/70 rounded-2xl border border-gold-300/40 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-100/80 flex items-center justify-center text-gold-700 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-stone-900">Quick Transform Sessions</h4>
                  <p className="text-xs text-stone-650">Short on schedule? Book our express 30-minute Blowdry & Hydrate formula for key events on the go.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SERVICES PRICE LIST MENU SECTION */}
      <section id="pricing" className="py-20 md:py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-gold-600 uppercase tracking-widest text-xs font-bold block mb-2">Artisanal Menu</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-stone-900">Tailored Sessions & Essential Pricing</h2>
              <div className="h-0.5 w-16 bg-gold-400 mt-3" />
            </div>

            {/* Currency and Category switcher for mobile / tabbed view */}
            <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full text-xs shrink-0">
                <button 
                  onClick={() => setCurrency("USD")}
                  className={`px-3 py-1 rounded-full text-xs transition font-semibold ${currency === 'USD' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500'}`}
                >
                  US Dollar ($)
                </button>
                <button 
                  onClick={() => setCurrency("LKR")}
                  className={`px-3 py-1 rounded-full text-xs transition font-semibold ${currency === 'LKR' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500'}`}
                >
                  Sri Lankan LKR (₨)
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Category Selector Tabs */}
          <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar justify-start md:justify-center border-b border-stone-200">
            {SERVICES_DATA.map((cat) => {
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition shrink-0 whitespace-nowrap cursor-pointer ${
                    activeTab === cat.id 
                    ? "bg-gold-805 bg-stone-900 text-[#FAF6F0] shadow-sm" 
                    : "bg-white hover:bg-stone-50 text-stone-600 border border-stone-200"
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  {cat.category}
                </button>
              );
            })}
          </div>

          {/* Pricing Grid details */}
          <div className="mt-12 bg-white rounded-3xl border border-stone-200/80 p-6 md:p-12 shadow-sm">
            <AnimatePresence mode="wait">
              {SERVICES_DATA.map((serviceGroup) => {
                if (serviceGroup.id !== activeTab) return null;
                return (
                  <motion.div
                    key={serviceGroup.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                  >
                    
                    {/* Left Column Summary */}
                    <div className="lg:col-span-4 lg:pr-8 lg:border-r border-stone-200">
                      <span className="p-3 bg-gold-50 text-gold-700 rounded-full inline-block mb-4 border border-gold-200">
                        <serviceGroup.icon className="w-6 h-6" />
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">{serviceGroup.category}</h3>
                      <p className="text-sm text-stone-600 leading-relaxed mb-6">{serviceGroup.tagline}</p>
                      
                      {/* Interactive form connector click */}
                      <button 
                        onClick={() => {
                          handleCategoryChange(serviceGroup.id);
                          scrollToId("book-appointment");
                        }} 
                        className="inline-flex items-center text-xs font-bold text-gold-800 hover:text-gold-950 transition uppercase tracking-wider group"
                      >
                        Find openings for this
                        <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Right Column Price list table */}
                    <div className="lg:col-span-8 space-y-6">
                      {serviceGroup.items.map((item, index) => (
                        <div key={index} className="flex flex-col group py-3 border-b border-dashed border-stone-200 last:border-0 hover:border-gold-300 transition-colors">
                          <div className="flex items-baseline justify-between gap-4">
                            <h4 className="font-serif font-semibold text-lg text-stone-900 group-hover:text-gold-800 transition">
                              {item.name}
                            </h4>
                            <div className="flex-grow border-b border-[#E5DEC9]/40 border-dotted mx-2 hidden sm:block" />
                            <span className="font-serif text-lg font-bold text-gold-900 shrink-0">
                              {currency === "USD" 
                                ? `$${item.priceUSD}` 
                                : `₨ ${item.priceLKR.toLocaleString()}`}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3 mt-1 text-xs text-stone-550">
                            <span className="flex items-center gap-1 text-gold-600 font-medium font-mono">
                              <Clock className="w-3.5 h-3.5" />
                              {item.duration}
                            </span>
                            <span className="text-stone-300">•</span>
                            <p className="text-stone-600 italic line-clamp-2 md:line-clamp-none">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* CLIENT REVIEWS TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-20 md:py-24 bg-gold-50 border-y border-gold-200/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold-600 uppercase tracking-widest text-xs font-bold block mb-3">Revered Guest Notes</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900">Loved by Aesthetic Connoisseurs</h2>
            <div className="h-0.5 w-16 bg-gold-400 mx-auto mt-4" />
            <p className="mt-4 text-stone-600 text-sm">Nothing validates our commitment to luxury like real words from our loving, loyal community members.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((review, i) => (
              <div 
                key={i} 
                className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  
                  {/* Stars list */}
                  <div className="flex items-center gap-1 text-yellow-500 mb-6">
                    {[...Array(review.rating)].map((_, index) => (
                      <Star key={index} className="w-4 h-4 fill-current text-gold-500" />
                    ))}
                  </div>

                  <p className="text-sm text-stone-700 leading-relaxed italic mb-8">
                    "{review.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-stone-100">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-100 shrink-0 border border-gold-200">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-sm">{review.name}</h4>
                    <p className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">{review.role}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* QUICK APPOINTMENT FORM SECTION (PURE FRONTEND INTERACTIVE) */}
      <section id="book-appointment" className="py-20 md:py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden max-w-5xl mx-auto lg:grid lg:grid-cols-12">
            
            {/* Form Information Column */}
            <div className="bg-[#1A1816] text-[#FAF6F0] p-8 md:p-12 lg:col-span-5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <span className="text-gold-400 uppercase tracking-widest text-xs font-semibold block mb-4">Scheduling</span>
                <h3 className="text-3xl font-serif tracking-tight mb-4">Request Your Boutique Session</h3>
                <p className="text-stone-300 text-sm leading-relaxed mb-8">
                  Once submitted, our reservation desk verifies availability against master therapist slates and will place a call within 15 minutes to secure your requested chair.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-3 text-stone-300">
                    <Phone className="w-5 h-5 text-gold-400 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fast Assistance</h4>
                      <p className="text-sm mt-0.5">+94 (11) 2345 6789</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-stone-300">
                    <MapPin className="w-5 h-5 text-gold-405 text-gold-400 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Our Sanctuary Address</h4>
                      <p className="text-sm mt-0.5">85/A Ward Place, Cinnamon Gardens, Colombo 07</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-stone-300">
                    <Clock className="w-5 h-5 text-gold-400 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Operational Hours</h4>
                      <p className="text-sm mt-0.5">Mon – Sun: 09:00 AM – 08:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-stone-850 text-[10px] text-stone-400 relative z-10 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                No prepayment required online. Secure confirmation via call or SMTP voucher.
              </div>
            </div>

            {/* Actual Form Column */}
            <div className="p-8 md:p-12 lg:col-span-7">
              
              <h3 className="text-xl sm:text-2xl font-serif text-stone-900 mb-2">Service Details</h3>
              <p className="text-xs text-stone-550 mb-8">All fields marked with (*) are necessary to prevent double bookings.</p>

              {/* SUCCESS TOAST MESSAGE */}
              <AnimatePresence>
                {bookingSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-6 bg-gold-50 border border-gold-300 rounded-2xl mb-8 flex gap-4 items-start shadow-sm"
                  >
                    <span className="p-2.5 bg-gold-200 text-gold-805 rounded-full shrink-0">
                      <Calendar className="w-6 h-6 text-gold-800" />
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-[#4F351B] text-base">Request Successfully Lodged!</h4>
                      <p className="text-sm text-stone-705 mt-1 leading-relaxed text-stone-700">
                        Thank you, <span className="font-bold text-stone-900">{formData.name}</span>! We have locked the time slot for <span className="font-bold text-[#4B3012]">{formData.time} ({formData.date})</span> on our calendar. Our host will place a personal call to <span className="font-bold text-stone-900">{formData.phone}</span> in a few minutes to finalize appointment details.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleBookSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* User Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rachel Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-250 rounded-xl text-stone-850 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-gold-400 focus:bg-white transition text-sm"
                    />
                  </div>

                  {/* Phone number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">Contact Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +94 77 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-250 rounded-xl text-stone-850 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-gold-400 focus:bg-white transition text-sm"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Category select */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">Service Category *</label>
                    <div className="relative">
                      <select 
                        value={formData.serviceCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full appearance-none px-4 py-3 bg-stone-50 border border-stone-250 rounded-xl text-stone-850 focus:outline-none focus:ring-1 focus:ring-gold-400 focus:bg-white transition text-sm cursor-pointer pr-10"
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.id}>{s.category}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Treatment subselect */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">Specific Treatment *</label>
                    <div className="relative">
                      <select 
                        value={formData.subService}
                        onChange={(e) => setFormData({ ...formData, subService: e.target.value })}
                        className="w-full appearance-none px-4 py-3 bg-stone-50 border border-stone-250 rounded-xl text-stone-850 focus:outline-none focus:ring-1 focus:ring-gold-400 focus:bg-white transition text-sm cursor-pointer pr-10"
                      >
                        {activeSubServices.map((sub, index) => (
                          <option key={index} value={sub.name}>
                            {sub.name} ({currency === 'USD' ? `$${sub.priceUSD}` : `₨ ${sub.priceLKR.toLocaleString()}`})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Date Picker */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">Preferred Date *</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        required
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-250 rounded-xl text-stone-850 focus:outline-none focus:ring-1 focus:ring-gold-400 focus:bg-white transition text-sm"
                      />
                    </div>
                  </div>

                  {/* Time picker */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">Preferred Hour *</label>
                    <div className="grid grid-cols-4 gap-2">
                      {TIME_SLOTS.slice(0, 4).map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData({ ...formData, time })}
                          className={`py-2 px-1 text-[11px] font-semibold text-center rounded-lg border transition ${
                            formData.time === time 
                              ? "bg-gold-800 text-white border-gold-850 shadow-xs" 
                              : "bg-stone-50 text-stone-700 border-stone-250 hover:bg-stone-100"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {TIME_SLOTS.slice(4).map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData({ ...formData, time })}
                          className={`py-2 text-[11px] font-semibold text-center rounded-lg border transition ${
                            formData.time === time 
                              ? "bg-gold-800 text-white border-gold-850 shadow-xs" 
                              : "bg-stone-50 text-stone-700 border-stone-250 hover:bg-stone-100"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Additional instructions */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">Special Requests or Medical Accommodations (Optional)</label>
                  <textarea 
                    rows={3}
                    placeholder="Provide any considerations (e.g. skin allergies, customized coloring targets)..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-250 rounded-xl text-stone-850 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-gold-400 focus:bg-white transition text-sm resize-none"
                  />
                </div>

                {/* Secure CTA */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gold-800 hover:bg-gold-900 text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
                >
                  Verify and Lock Time Slot
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1816] text-[#FAF6F0] pt-16 pb-12 border-t border-stone-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-stone-800">
            
            {/* Branding Column */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-2.5 rounded-full bg-gold-900 border border-gold-800 text-gold-400">
                  <Scissors className="w-5 h-5 animate-pulse" />
                </span>
                <div>
                  <h2 className="font-serif text-xl tracking-wider font-semibold text-white">AURELIA</h2>
                  <p className="text-[9px] uppercase tracking-[0.25em] -mt-1 text-gold-400 font-bold">Salon & Luxury Spa</p>
                </div>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed max-w-sm mt-4">
                An award-winning premier sanctuary, constructing exceptional modern styles, restorative holistic skin programs, and memorable custom bridal masterpieces.
              </p>
              
              <div className="flex gap-4 mt-6">
                <a href="#instagram" className="p-2 bg-stone-900 hover:bg-gold-900 hover:text-white rounded-full transition border border-stone-850 text-stone-400" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#facebook" className="p-2 bg-stone-900 hover:bg-gold-900 hover:text-white rounded-full transition border border-stone-850 text-stone-400" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#contact" className="p-2 bg-stone-900 hover:bg-gold-900 hover:text-white rounded-full transition border border-stone-850 text-stone-400" aria-label="Contact Contact">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold-450 text-gold-400 mb-6">Explore</h4>
              <ul className="space-y-3.5 text-xs text-stone-400">
                <li><button onClick={() => scrollToId("services")} className="hover:text-gold-300 transition block text-left">Professional Services</button></li>
                <li><button onClick={() => scrollToId("pricing")} className="hover:text-gold-300 transition block text-left">Detailed Pricing & Packages</button></li>
                <li><button onClick={() => scrollToId("gallery")} className="hover:text-gold-300 transition block text-left">Interactive Gallery</button></li>
                <li><button onClick={() => scrollToId("testimonials")} className="hover:text-gold-300 transition block text-left">Revered Testimonials</button></li>
                <li><button onClick={() => scrollToId("book-appointment")} className="hover:text-gold-300 transition block text-left">Register Appointments</button></li>
              </ul>
            </div>

            {/* Opening Hours Column */}
            <div className="md:col-span-5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold-450 text-gold-400 mb-6">Operational Schedule</h4>
              <div className="space-y-3.5 text-xs text-stone-400">
                <div className="flex justify-between border-b border-stone-850 pb-2">
                  <span>Monday – Friday</span>
                  <span className="font-mono text-[11px] text-white font-medium">09:00 AM – 08:30 PM</span>
                </div>
                <div className="flex justify-between border-b border-stone-850 pb-2">
                  <span>Saturday</span>
                  <span className="font-mono text-[11px] text-white font-medium">09:00 AM – 07:30 PM</span>
                </div>
                <div className="flex justify-between border-b border-stone-850 pb-2">
                  <span>Sunday & Poya Days</span>
                  <span className="font-mono text-[11px] text-gold-400 font-bold">10:00 AM – 05:00 PM</span>
                </div>
                <div className="text-[10px] text-stone-500 italic mt-4">
                  *Advance holiday slot registration requested to assure matching stylist allocation.
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 text-center text-[11px] text-stone-505 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-stone-500">© 2026 Aurelia Luxury Salon & Spa (Cinnamon Gardens). All rights reserved.</p>
            <div className="flex gap-6 text-stone-500">
              <a href="#privacy" className="hover:text-gold-300 transition">Privacy Statement</a>
              <a href="#terms" className="hover:text-gold-300 transition">Terms of Service</a>
              <a href="#licensing" className="hover:text-gold-300 transition">Esthetic Licensure</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
