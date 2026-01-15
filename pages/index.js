// pages/index.js - ULTIMATE LEAD PRINTING MACHINE v3.1
// Villa Renovation focused • WhatsApp-first • Ultra-fast • High-trust • Attribution

import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  weight: ['700', '900'],
  subsets: ['latin'],
  variable: '--font-playfair',
});

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function VillaLeadMachine() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: 'Villa',
    service: 'Full Renovation',
    community: '',
    name: '',
    phone: '',
    leadId: `UR_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  });
  const [slotsLeft, setSlotsLeft] = useState(3);
  const [showFloating, setShowFloating] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Dynamic content from URL params (PPC keyword injection)
  const [dynamic, setDynamic] = useState({
    keyword: 'Villa Renovation',
    location: 'Dubai',
    headline: 'Luxury Villa Renovation Dubai'
  });

  // 1. Parse URL params & generate lead ID
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get('keyword') || params.get('utm_term') || 'Villa Renovation';
    const location = params.get('location') || params.get('loc') || 'Dubai';
    const matchType = params.get('matchtype') || 'broad';

    const headlines = {
      exact: `#1 ${keyword} Company in ${location} • Municipality Approved`,
      phrase: `Professional ${keyword} Experts • ${location}`,
      broad: `Premium ${keyword} Services in ${location}`
    };

    setDynamic({
      keyword,
      location,
      headline: headlines[matchType] || `Luxury ${keyword} in ${location}`
    });

    // Track page view with full attribution
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_location: window.location.href,
        keyword,
        location,
        lead_id: formData.leadId
      });
    }
  }, []);

  // 2. Real-time urgency (very effective in UAE market)
  useEffect(() => {
    const updateSlots = () => {
      const h = new Date().getHours();
      if (h >= 20) setSlotsLeft(1);
      else if (h >= 16) setSlotsLeft(2);
      else if (h >= 12) setSlotsLeft(3);
      else setSlotsLeft(4);
    };
    updateSlots();
    const timer = setInterval(updateSlots, 60000);
    return () => clearInterval(timer);
  }, []);

  // 3. Floating CTA + Exit intent
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.35) setShowFloating(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const timeout = setTimeout(() => setShowFloating(true), 6000);

    const exitHandler = (e) => {
      if (e.clientY <= 0 && !showExit) {
        setShowExit(true);
        if (window.gtag) window.gtag('event', 'exit_intent_triggered');
      }
    };

    if (window.innerWidth > 768) document.addEventListener('mouseleave', exitHandler);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', exitHandler);
      clearTimeout(timeout);
    };
  }, [showExit]);

  // 4. WhatsApp deep link – pre-filled with all data
  const getWhatsAppLink = useCallback((customMsg = '') => {
    const msg = customMsg || 
      `🏠 *NEW VILLA LEAD – HIGH PRIORITY*\n\n` +
      `Lead ID: ${formData.leadId}\n` +
      `Property: ${formData.propertyType}\n` +
      `Service: ${formData.service}\n` +
      `Community: ${formData.community || 'Not specified'}\n` +
      `Name: ${formData.name || 'Not provided'}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n\n` +
      `Seen your ${dynamic.keyword} ad in ${dynamic.location}\n` +
      `Want FREE 3D design + detailed quote today!`;

    return `https://wa.me/971585658002?text=${encodeURIComponent(msg)}`;
  }, [formData, dynamic]);

  // 5. Form submission → direct to WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.phone) return;

    window.location.href = getWhatsAppLink();

    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-612864132/qqQcQNeM-bADEISh7qQC',
        value: 100000, // estimated avg project value
        currency: 'AED',
        transaction_id: formData.leadId
      });
      window.gtag('event', 'lead_submitted', {
        lead_id: formData.leadId,
        service: formData.service,
        community: formData.community
      });
    }

    setSubmitted(true);
  };

  // 6. Instant WhatsApp (no form needed)
  const quickWhatsApp = () => {
    window.open(getWhatsAppLink(`Hi! Interested in ${dynamic.keyword} in ${dynamic.location}. Can we discuss quickly?`), '_blank');
    if (window.gtag) window.gtag('event', 'quick_whatsapp_click');
  };

  return (
    <>
      <Head>
        <title>{dynamic.headline} • Free 3D Design & Quote Today</title>
        <meta name="description" content={`Luxury ${dynamic.keyword} in ${dynamic.location}. 800+ villas transformed • 4.9★ Google • Free 3D design & quote. WhatsApp now!`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </Head>

      {/* Floating CTAs */}
      {showFloating && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-4">
          <button
            onClick={quickWhatsApp}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-pulse"
            aria-label="WhatsApp Free Quote"
          >
            <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </button>

          <a
            href="tel:+971585658002"
            className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
            aria-label="Call Now"
          >
            <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </a>
        </div>
      )}

      {/* Sticky Urgency Bar */}
      <div className="sticky top-0 bg-gradient-to-r from-red-700 to-red-600 text-white py-3 text-center z-40 shadow-md">
        <strong>Only {slotsLeft} Slots Left Today!</strong> • Free 3D Design + Quote
      </div>

      {/* HERO – Conversion-first, 3-second decision */}
      <section className="relative min-h-[85vh] flex items-center bg-black text-white">
        <div className="absolute inset-0">
          <Image
            src="/villa-hero.avif"
            alt="Luxury renovated villa in Dubai"
            fill
            className="object-cover opacity-70"
            priority
            quality={70}
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <span className="text-amber-400 text-xl">★★★★★</span>
            <span className="text-lg">4.9 • 287 Reviews</span>
          </div>

          <h1 className={`text-5xl md:text-7xl font-black leading-tight mb-6 ${playfair.variable}`}>
            {dynamic.headline}
            <span className="block text-5xl text-amber-400 mt-4">Free 3D Design Today</span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto">
            800+ Villas Transformed • Dubai Municipality Approved • Instant WhatsApp Quote
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <button
              onClick={quickWhatsApp}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-2xl font-bold py-6 px-12 rounded-2xl shadow-2xl flex items-center justify-center gap-4 transition-transform hover:scale-105"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Free Quote
            </button>

            <a
              href="tel:+971585658002"
              className="flex-1 bg-white/10 backdrop-blur-lg border-2 border-white hover:bg-white hover:text-black text-white text-2xl font-bold py-6 px-12 rounded-2xl flex items-center justify-center gap-4 transition-all"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Call Now
            </a>
          </div>

          <p className="mt-8 text-lg opacity-90">
            ✓ Free • No Obligation • Response in < 30 min • 800+ Villas Done
          </p>
        </div>
      </section>

      {/* Trust Stack – Quick credibility */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-6xl font-black text-amber-600 mb-2">800+</div>
            <p className="text-xl font-bold">Villas Transformed</p>
          </div>
          <div>
            <div className="text-6xl font-black text-amber-600 mb-2">15+</div>
            <p className="text-xl font-bold">Years Experience</p>
          </div>
          <div>
            <div className="text-6xl font-black text-amber-600 mb-2">4.9★</div>
            <p className="text-xl font-bold">Google Rating</p>
          </div>
          <div>
            <div className="text-6xl font-black text-amber-600 mb-2">100%</div>
            <p className="text-xl font-bold">Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Final Mega CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-800 text-white text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-8">
            Ready to Start Your Dream Villa Project?
          </h2>
          <p className="text-2xl mb-12">
            Free 3D Design • Transparent Quote • Response in 30 Minutes
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center max-w-3xl mx-auto">
            <button
              onClick={quickWhatsApp}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-3xl font-black py-8 px-12 rounded-3xl shadow-2xl flex items-center justify-center gap-6 transition-transform hover:scale-105"
            >
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382..." />
              </svg>
              WhatsApp Free Quote
            </button>

            <a
              href="tel:+971585658002"
              className="flex-1 bg-white/10 backdrop-blur-lg border-4 border-white hover:bg-white hover:text-black text-white text-3xl font-black py-8 px-12 rounded-3xl flex items-center justify-center gap-6 transition-all"
            >
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28..." />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-10 bg-black text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Unicorn Renovations • Dubai's Premier Villa Renovation Company
      </footer>
    </>
  );
}
