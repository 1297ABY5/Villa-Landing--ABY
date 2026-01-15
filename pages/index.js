// pages/index.js - ULTIMATE LEAD TSUNAMI MACHINE
// Combines: Quiz Funnel + WhatsApp-First + Speed + Trust Stacking + Micro-Commitments

import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  weight: ["700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Move constants outside component (micro-optimization: avoids recreating arrays on each render)
const SOCIAL_PROOFS = [
  { name: "Ahmed K.", area: "Palm Jumeirah", action: "requested quote", time: "2 min" },
  { name: "Sarah M.", area: "Emirates Hills", action: "booked consultation", time: "5 min" },
  { name: "Rashid A.", area: "Arabian Ranches", action: "started project", time: "1 hr" },
  { name: "Lisa W.", area: "Dubai Hills", action: "requested quote", time: "8 min" },
  { name: "Omar H.", area: "Jumeirah Golf", action: "booked consultation", time: "12 min" },
];

const COMMUNITIES = [
  "Palm Jumeirah",
  "Emirates Hills",
  "Arabian Ranches",
  "Dubai Hills",
  "Jumeirah Golf Estates",
  "Al Barari",
  "District One",
  "Other",
];

export default function LeadTsunami() {
  const formRef = useRef(null);

  // ===== MINIMAL STATE (Performance Optimized) =====
  const [step, setStep] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showSocialProof, setShowSocialProof] = useState(false);
  const [currentProof, setCurrentProof] = useState(0);
  const [slotsLeft, setSlotsLeft] = useState(3);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form data with lead ID for tracking
  const [formData, setFormData] = useState({
    propertyType: "",
    service: "",
    community: "",
    name: "",
    phone: "",
    leadId: "",
  });

  // Dynamic content from URL params
  const [dynamic, setDynamic] = useState({
    keyword: "Villa Renovation",
    location: "Dubai",
    headline: "Luxury Villa Renovation Dubai",
  });

  // Refs for performance (no re-renders)
  const exitTriggeredRef = useRef(false);
  const analyticsLoadedRef = useRef(false);

  // ===== URL PARAMS + LEAD ID =====
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("keyword") || params.get("utm_term") || "Villa Renovation";
    const location = params.get("location") || params.get("loc") || "Dubai";
    const matchType = params.get("matchtype") || "broad";

    const headlines = {
      exact: `#1 ${keyword} in ${location}`,
      phrase: `Award-Winning ${keyword} in ${location}`,
      broad: `Luxury ${keyword} in ${location}`,
    };

    setDynamic({
      keyword,
      location,
      headline: headlines[matchType] || `Premium ${keyword} in ${location}`,
    });

    // Generate unique lead ID for attribution
    setFormData((prev) => ({
      ...prev,
      leadId: `UR_${Date.now()}_${keyword.replace(/\s+/g, "_").substring(0, 20)}`,
    }));
  }, []);

  // ===== URGENCY TIMER (Realistic) =====
  useEffect(() => {
    const updateSlots = () => {
      const hour = new Date().getHours();
      if (hour >= 20) setSlotsLeft(1);
      else if (hour >= 16) setSlotsLeft(2);
      else if (hour >= 12) setSlotsLeft(3);
      else setSlotsLeft(4);
    };
    updateSlots();
    const interval = setInterval(updateSlots, 60000);
    return () => clearInterval(interval);
  }, []);

  // ===== SCROLL + FLOATING CTA (Optimized) =====
  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          if (window.scrollY > window.innerHeight * 0.3) {
            setShowFloatingCTA(true);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Show floating CTA after 8s anyway
    const timeout = setTimeout(() => setShowFloatingCTA(true), 8000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  // ===== SOCIAL PROOF ROTATION =====
  useEffect(() => {
    const showProof = () => {
      setShowSocialProof(true);
      setTimeout(() => setShowSocialProof(false), 4000);
    };

    const initialTimeout = setTimeout(showProof, 6000);
    const interval = setInterval(() => {
      setCurrentProof((prev) => (prev + 1) % SOCIAL_PROOFS.length);
      showProof();
    }, 18000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // ===== EXIT INTENT =====
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !exitTriggeredRef.current && !submitted) {
        setShowExitPopup(true);
        exitTriggeredRef.current = true;
      }
    };

    if (typeof window !== "undefined" && window.innerWidth > 768) {
      document.addEventListener("mouseleave", handleMouseLeave);
      return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, [submitted]);

  // ===== ANALYTICS (Lazy Load) =====
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (analyticsLoadedRef.current) return;

    const loadAnalytics = () => {
      analyticsLoadedRef.current = true;

      // Avoid double-loading if already present
      if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;

      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=AW-612864132";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        // ✅ Fix: dataLayer must be referenced via window
        function gtag() {
          window.dataLayer.push(arguments);
        }
        window.gtag = gtag;

        window.gtag("js", new Date());
        window.gtag("config", "AW-612864132", { phone_conversion_number: "+971585658002" });
      };
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadAnalytics, { timeout: 3000 });
    } else {
      setTimeout(loadAnalytics, 2000);
    }
  }, []);

  // ===== WHATSAPP URL GENERATOR =====
  const getWhatsAppURL = useCallback(
    (customMsg = null) => {
      const msg =
        customMsg ||
        `🏠 *NEW VILLA PROJECT INQUIRY*
━━━━━━━━━━━━━━━━━━━━
*Lead ID:* ${formData.leadId}
*Property:* ${formData.propertyType || "Not specified"}
*Service:* ${formData.service || dynamic.keyword}
*Community:* ${formData.community || "Not specified"}
*Name:* ${formData.name || "Not provided"}
*Phone:* ${formData.phone || "Not provided"}
━━━━━━━━━━━━━━━━━━━━
*Source:* ${dynamic.keyword} Landing Page
*Time:* ${new Date().toLocaleString()}

I want FREE 3D design + quote!`;

      return `https://wa.me/971585658002?text=${encodeURIComponent(msg)}`;
    },
    [formData, dynamic]
  );

  // ===== FORM SUBMISSION =====
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);

      // Track conversion
      if (window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-612864132/qqQcQNeM-bADEISh7qQC",
          value: 100000,
          currency: "AED",
          transaction_id: formData.leadId,
        });
        window.gtag("event", "lead_form_submitted", {
          event_category: "conversion",
          event_label: formData.service,
          lead_id: formData.leadId,
        });
      }

      // Redirect to WhatsApp
      setSubmitted(true);
      window.location.href = getWhatsAppURL();
      // No need to setLoading(false) – page is navigating away
    },
    [formData, getWhatsAppURL]
  );

  // ===== STEP HANDLERS =====
  const selectPropertyType = (type) => {
    setFormData((prev) => ({ ...prev, propertyType: type }));
    setStep(2);
    if (window.gtag) {
      window.gtag("event", "lead_form_started", { step: "property_type", value: type });
    }
  };

  const selectService = (service) => {
    setFormData((prev) => ({ ...prev, service }));
    setStep(3);
  };

  const selectCommunity = (community) => {
    setFormData((prev) => ({ ...prev, community }));
    setStep(4);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // ===== QUICK WHATSAPP (Instant, no form) =====
  const quickWhatsApp = () => {
    const msg = `Hi! I'm interested in ${dynamic.keyword} in ${dynamic.location}. Can I get a quick estimate?

Lead ID: ${formData.leadId}`;

    window.open(`https://wa.me/971585658002?text=${encodeURIComponent(msg)}`, "_blank");

    if (window.gtag) {
      window.gtag("event", "click_to_whatsapp", {
        event_category: "engagement",
        lead_id: formData.leadId,
      });
    }
  };

  return (
    <>
      <Head>
        <title>{dynamic.headline} | Free 3D Design + Quote</title>
        <meta
          name="description"
          content={`${dynamic.keyword} in ${dynamic.location}. 800+ projects • 4.9★ Google • Dubai Municipality Approved • Free 3D design. WhatsApp now!`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </Head>

      <div className={`min-h-screen bg-white ${inter.variable} ${playfair.variable}`}>
        {/* ===== SOCIAL PROOF POPUP ===== */}
        <div
          className={`fixed bottom-28 left-4 z-50 transition-all duration-500 ${
            showSocialProof ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        >
          <div className="bg-white rounded-lg shadow-2xl border p-3 max-w-[280px]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                ✓
              </div>
              <div>
                <p className={`text-sm font-semibold text-gray-900 ${inter.className}`}>
                  {SOCIAL_PROOFS[currentProof]?.name} • {SOCIAL_PROOFS[currentProof]?.area}
                </p>
                <p className={`text-xs text-gray-500 ${inter.className}`}>
                  {SOCIAL_PROOFS[currentProof]?.action} • {SOCIAL_PROOFS[currentProof]?.time} ago
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== FLOATING CTA (WhatsApp + Call) ===== */}
        {showFloatingCTA && (
          <div className="fixed bottom-28 md:bottom-8 right-4 z-50 flex flex-col gap-3">
            <button
              onClick={quickWhatsApp}
              className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-pulse"
              aria-label="WhatsApp"
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </button>

            <a
              href="tel:+971585658002"
              className="w-14 h-14 bg-amber-600 hover:bg-amber-700 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
              aria-label="Call"
            >
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </a>
          </div>
        )}

        {/* ===== URGENCY BAR (Sticky) ===== */}
        <div className="bg-gradient-to-r from-red-700 to-red-600 text-white py-2.5 text-center sticky top-0 z-50">
          <p className={`text-sm ${inter.className}`}>
            <span className="animate-pulse">🔴</span> <strong>HIGH DEMAND:</strong> Only{" "}
            <strong className="text-yellow-300">{slotsLeft}</strong> consultation slots left for{" "}
            {new Date().toLocaleDateString("en-US", { weekday: "long" })}
          </p>
        </div>

        {/* ===== HEADER (Minimal) ===== */}
        <header
          className={`fixed top-10 w-full z-40 transition-all ${
            scrolled ? "bg-white/95 backdrop-blur shadow-md py-2" : "bg-transparent py-3"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className={`text-2xl font-black ${scrolled ? "text-gray-900" : "text-white"} ${playfair.className}`}>
              UNICORN<span className="text-amber-500">.</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="tel:+971585658002"
                className={`hidden md:flex items-center gap-2 font-bold ${scrolled ? "text-gray-900" : "text-white"} ${inter.className}`}
              >
                📞 +971 58 565 8002
              </a>
              <button
                onClick={scrollToForm}
                className={`px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-sm ${inter.className}`}
              >
                Get Free Quote
              </button>
            </div>
          </div>
        </header>

        {/* ===== HERO + QUIZ FORM ===== */}
        <section className="relative min-h-screen flex items-center pt-20 pb-12">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/before-after.avif"
              alt="Villa Renovation Dubai"
              fill
              className="object-cover"
              priority
              quality={60}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
            {/* LEFT: Value Proposition */}
            <div className="text-white text-center lg:text-left">
              {/* Trust Row */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                <span
                  className={`px-3 py-1 bg-green-500/20 backdrop-blur border border-green-400/30 text-green-300 text-xs font-semibold rounded-full ${inter.className}`}
                >
                  ✓ Dubai Municipality Approved
                </span>
                <span
                  className={`px-3 py-1 bg-amber-500/20 backdrop-blur border border-amber-400/30 text-amber-300 text-xs font-semibold rounded-full ${inter.className}`}
                >
                  ⭐ 4.9/5 (287 Reviews)
                </span>
              </div>

              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${playfair.className}`}>
                {dynamic.headline}
                <span className="block text-amber-400 mt-2">Free 3D Design Today</span>
              </h1>

              <p className={`text-lg text-gray-200 mb-8 max-w-xl mx-auto lg:mx-0 ${inter.className}`}>
                Join <strong>800+ homeowners</strong> who transformed their villas. Get transparent pricing and 3D concept
                before you commit.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                {[
                  { num: "15+", label: "Years" },
                  { num: "800+", label: "Projects" },
                  { num: "5yr", label: "Warranty" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className={`text-2xl font-bold text-amber-400 ${playfair.className}`}>{stat.num}</p>
                    <p className={`text-xs text-gray-400 ${inter.className}`}>{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Quick WhatsApp CTA (Desktop) */}
              <div className="hidden lg:block">
                <button
                  onClick={quickWhatsApp}
                  className={`inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-xl shadow-2xl hover:scale-105 transition-all ${inter.className}`}
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp Quick Quote
                </button>
                <p className={`text-xs text-gray-400 mt-3 ${inter.className}`}>💬 Instant response • No forms needed</p>
              </div>
            </div>

            {/* RIGHT: QUIZ FUNNEL FORM */}
            <div ref={formRef} className="w-full max-w-md mx-auto lg:ml-auto">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Progress Bar */}
                <div className="h-2 bg-gray-100">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>

                {/* Form Header */}
                <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-5 text-white">
                  <h2 className={`text-xl font-bold ${playfair.className}`}>Calculate Your Renovation Cost</h2>
                  <p className={`text-amber-100 text-sm ${inter.className}`}>
                    Answer 4 quick questions → Get instant estimate
                  </p>
                </div>

                <div className="p-5">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className={`text-xl font-bold text-gray-900 mb-2 ${playfair.className}`}>Request Sent!</h3>
                      <p className={`text-gray-600 ${inter.className}`}>We&apos;ll respond on WhatsApp within 30 minutes.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {/* STEP 1: Property Type */}
                      {step === 1 && (
                        <div className="space-y-3">
                          <p className={`font-semibold text-gray-900 mb-4 ${inter.className}`}>1. What type of property?</p>
                          <div className="grid grid-cols-2 gap-3">
                            {["Villa", "Townhouse", "Apartment", "Penthouse"].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => selectPropertyType(type)}
                                className={`p-4 border-2 rounded-xl text-left transition-all hover:border-amber-500 hover:bg-amber-50 ${
                                  formData.propertyType === type ? "border-amber-500 bg-amber-50" : "border-gray-200"
                                }`}
                              >
                                <span className="text-2xl block mb-1">
                                  {type === "Villa" ? "🏡" : type === "Townhouse" ? "🏘️" : type === "Apartment" ? "🏢" : "🌆"}
                                </span>
                                <span className={`font-semibold text-gray-900 ${inter.className}`}>{type}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* STEP 2: Service Type */}
                      {step === 2 && (
                        <div className="space-y-3">
                          <p className={`font-semibold text-gray-900 mb-4 ${inter.className}`}>2. What do you need?</p>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { id: "Full Renovation", icon: "🏠", label: "Full Renovation" },
                              { id: "Kitchen & Bath", icon: "🍳", label: "Kitchen & Bath" },
                              { id: "Pool & Landscape", icon: "🏊", label: "Pool & Landscape" },
                              { id: "Extension", icon: "🏗️", label: "Extension" },
                            ].map((service) => (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => selectService(service.id)}
                                className="p-4 border-2 border-gray-200 rounded-xl text-left hover:border-amber-500 hover:bg-amber-50 transition-all"
                              >
                                <span className="text-2xl block mb-1">{service.icon}</span>
                                <span className={`font-semibold text-gray-900 text-sm ${inter.className}`}>{service.label}</span>
                              </button>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className={`text-sm text-gray-500 hover:text-amber-600 ${inter.className}`}
                          >
                            ← Back
                          </button>
                        </div>
                      )}

                      {/* STEP 3: Community */}
                      {step === 3 && (
                        <div className="space-y-3">
                          <p className={`font-semibold text-gray-900 mb-4 ${inter.className}`}>3. Which community?</p>
                          <select
                            value={formData.community}
                            onChange={(e) => selectCommunity(e.target.value)}
                            className={`w-full p-4 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-0 outline-none ${inter.className}`}
                          >
                            <option value="">Select your community</option>
                            {COMMUNITIES.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className={`text-sm text-gray-500 hover:text-amber-600 ${inter.className}`}
                          >
                            ← Back
                          </button>
                        </div>
                      )}

                      {/* STEP 4: Contact */}
                      {step === 4 && (
                        <div className="space-y-4">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                            <p className={`text-sm text-green-800 ${inter.className}`}>
                              ✅ Perfect! Enter your details to receive your personalized estimate.
                            </p>
                          </div>

                          <input
                            type="text"
                            placeholder="Your Name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            className={`w-full p-4 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none ${inter.className}`}
                          />

                          <input
                            type="tel"
                            placeholder="WhatsApp Number"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                            className={`w-full p-4 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none ${inter.className}`}
                          />

                          <button
                            type="submit"
                            disabled={loading || !formData.name || !formData.phone}
                            className={`w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white text-lg font-bold rounded-xl flex items-center justify-center gap-3 transition-all ${inter.className}`}
                          >
                            {loading ? "Sending..." : "Get Estimate via WhatsApp"}
                          </button>

                          <button
                            type="button"
                            onClick={() => setStep(3)}
                            className={`text-sm text-gray-500 hover:text-amber-600 ${inter.className}`}
                          >
                            ← Back
                          </button>
                        </div>
                      )}

                      {/* Trust Indicators */}
                      <div className={`flex justify-center gap-4 mt-4 pt-4 border-t text-xs text-gray-400 ${inter.className}`}>
                        <span>🔒 Secure</span>
                        <span>📞 No spam</span>
                        <span>⚡ Instant</span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BRAND/TRUST BAR ===== */}
        <section className="bg-gray-50 py-6 border-b">
          <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <span className="font-bold">GROHE</span>
            <span className="font-bold">JOTUN</span>
            <span className="font-bold">RAK CERAMICS</span>
            <span className="font-bold">SIEMENS</span>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">★★★★★</span>
              <span className={`font-bold text-gray-600 ${inter.className}`}>4.9/5 Google</span>
            </div>
          </div>
        </section>

        {/* ===== VIDEO TESTIMONIALS ===== */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 mb-2 ${playfair.className}`}>
                Real Results, Real Clients
              </h2>
              <p className={`text-gray-600 ${inter.className}`}>Watch what our clients say about their experience</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {["/testimonial-1.mp4", "/testimonial-2.mp4", "/testimonial-3.mp4"].map((src, i) => (
                <div key={i} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                  <div className="aspect-[9/14]">
                    <video className="w-full h-full object-cover" controls playsInline preload="metadata">
                      <source src={src} type="video/mp4" />
                    </video>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY CHOOSE US ===== */}
        <section className="py-12 bg-gray-900 text-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className={`text-2xl md:text-3xl font-bold text-center mb-10 ${playfair.className}`}>
              Why {dynamic.location} Homeowners Choose Us
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: "🏆", title: "Municipality Approved", desc: "All permits handled" },
                { icon: "💰", title: "Fixed Pricing", desc: "No hidden costs" },
                { icon: "⏱️", title: "On-Time Delivery", desc: "Guaranteed timeline" },
                { icon: "🛡️", title: "5-Year Warranty", desc: "Complete peace of mind" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <span className="text-4xl mb-3 block">{item.icon}</span>
                  <h3 className={`font-bold text-amber-400 mb-1 ${inter.className}`}>{item.title}</h3>
                  <p className={`text-sm text-gray-400 ${inter.className}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${playfair.className}`}>
              Ready to Transform Your {formData.propertyType || "Villa"}?
            </h2>
            <p className={`text-lg mb-8 text-amber-100 ${inter.className}`}>
              Get your free 3D design + transparent quote in 30 minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={quickWhatsApp}
                className={`px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-xl flex items-center justify-center gap-3 ${inter.className}`}
              >
                WhatsApp Now →
              </button>
              <a
                href="tel:+971585658002"
                className={`px-8 py-4 border-2 border-white hover:bg-white hover:text-amber-600 text-lg font-bold rounded-xl transition-all ${inter.className}`}
              >
                📞 +971 58 565 8002
              </a>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="py-6 bg-black text-center">
          <p className={`text-sm text-gray-500 ${inter.className}`}>
            © {new Date().getFullYear()} Unicorn Renovations • Dubai&apos;s Premier {dynamic.keyword} Company
          </p>
        </footer>

        {/* ===== EXIT POPUP ===== */}
        {showExitPopup && (
          <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden relative">
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl z-10"
              >
                ×
              </button>

              <div className="bg-red-600 p-4 text-white text-center">
                <p className={`text-lg font-bold ${playfair.className}`}>🎁 Wait! Special Offer</p>
              </div>

              <div className="p-6">
                <h3 className={`text-2xl font-bold text-gray-900 mb-3 text-center ${playfair.className}`}>
                  Leaving Without Your Quote?
                </h3>
                <p className={`text-gray-600 mb-4 text-center ${inter.className}`}>
                  Drop your WhatsApp and we&apos;ll send you <strong>2 similar projects with budgets</strong> that match your villa type.
                </p>

                <input
                  type="tel"
                  placeholder="Your WhatsApp Number"
                  className={`w-full p-4 border-2 border-gray-200 rounded-xl mb-4 focus:border-amber-500 outline-none ${inter.className}`}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                />

                <button
                  onClick={() => {
                    const msg = `Hi! I was browsing your ${dynamic.keyword} page. Can you send me 2 similar project examples with budgets?\n\nLead ID: ${formData.leadId}`;
                    window.open(`https://wa.me/971585658002?text=${encodeURIComponent(msg)}`, "_blank");
                    setShowExitPopup(false);
                  }}
                  className={`w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl ${inter.className}`}
                >
                  Send Me Sample Projects →
                </button>

                <p className={`text-xs text-center text-gray-400 mt-3 ${inter.className}`}>No spam • Just helpful project examples</p>
              </div>
            </div>
          </div>
        )}

        {/* ===== MOBILE BOTTOM BAR ===== */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40 shadow-2xl">
          <div className="grid grid-cols-2 h-16">
            <a href="tel:+971585658002" className="flex items-center justify-center gap-2 border-r bg-gray-50">
              <span className="text-xl">📞</span>
              <span className={`font-bold text-gray-900 ${inter.className}`}>Call</span>
            </a>
            <button onClick={quickWhatsApp} className="flex items-center justify-center gap-2 bg-green-500 text-white">
              <span className={`font-bold ${inter.className}`}>WhatsApp</span>
            </button>
          </div>
        </div>

        <div className="h-16 md:hidden" />
      </div>
    </>
  );
}
