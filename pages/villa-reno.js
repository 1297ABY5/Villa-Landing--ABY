// pages/index.js - QS 9-10 OPTIMIZER (SSR + Community + Trust + FAQ + Process + Reviews + Lead Fallback)
// Fixes: hydration, noreferrer, lead fallback, review count single source, guardrails, a11y, scroll tracking

import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import { useState, useCallback, useMemo, useEffect } from 'react';

// ===============================
// SINGLE SOURCE OF TRUTH CONSTANTS
// ===============================
const BRAND = {
  name: 'Unicorn Renovations',
  phone: '+971585658002',
  whatsapp: '971585658002',
  site: 'https://dubailuxrenovate.com/',
  office: 'Al Quoz Industrial Area 3, Dubai, UAE',
  ratingValue: '4.9',
  reviewCount: '287', // ✅ keep in one place
};

// ============================================
// KEYWORD MAPPING
// ============================================
const KEYWORD_MAP = {
  'interior renovation company': {
    h1: 'Interior Renovation Company in Dubai',
    h2: "Dubai's #1 Interior Renovation Specialists",
    service: 'Interior Renovation',
    highlight: 'interior',
    metaDesc: 'Top interior renovation company in Dubai. Municipality approved. Free 3D design and fixed price quote.',
  },
  'interior renovation': {
    h1: 'Interior Renovation Dubai',
    h2: 'Professional Interior Renovation Services',
    service: 'Interior Renovation',
    highlight: 'interior',
    metaDesc: 'Expert interior renovation in Dubai. Complete makeovers. Fixed price guarantee and free 3D concept.',
  },
  'villa renovation dubai': {
    h1: 'Villa Renovation Dubai',
    h2: 'Expert Villa Renovation Contractors in Dubai',
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Villa renovation Dubai specialists. Fixed price quote, free 3D design, and on-time delivery planning.',
  },
  'villa renovation in dubai': {
    h1: 'Villa Renovation in Dubai',
    h2: 'Premium Villa Renovation Company',
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Villa renovation in Dubai. Municipality approved support. 5-year workmanship warranty options. Free consultation.',
  },
  'villa renovation': {
    h1: 'Villa Renovation Dubai',
    h2: "Dubai's Most Trusted Villa Renovation Company",
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Complete villa renovation services in Dubai. Fixed scope pricing, timeline clarity, and quality workmanship.',
  },
  'villa renovations': {
    h1: 'Villa Renovations Dubai',
    h2: 'Expert Villa Renovation Services',
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Villa renovations in Dubai by experienced contractors. Transparent scope, quality finishes, and clear handover.',
  },
  'villa contractors in dubai': {
    h1: 'Villa Contractors in Dubai',
    h2: 'Licensed Villa Renovation Contractors',
    service: 'Villa Contracting',
    highlight: 'contractor',
    metaDesc: 'Licensed villa contractors in Dubai. Municipality approval support, fixed pricing, and clear execution plan.',
  },
  'villa contractors': {
    h1: 'Villa Contractors Dubai',
    h2: 'Trusted Villa Renovation Contractors',
    service: 'Villa Contracting',
    highlight: 'contractor',
    metaDesc: 'Professional villa contractors in Dubai. Experienced team, transparent scope, and controlled variations.',
  },
  'villa renovation contractors': {
    h1: 'Villa Renovation Contractors Dubai',
    h2: 'Expert Villa Renovation Contractors',
    service: 'Villa Contracting',
    highlight: 'contractor',
    metaDesc: 'Villa renovation contractors in Dubai. Insured execution, approvals assistance, and quality workmanship.',
  },
  'villa extension': {
    h1: 'Villa Extension Dubai',
    h2: 'Expert Villa Extension Services',
    service: 'Villa Extension',
    highlight: 'extension',
    metaDesc: 'Villa extension Dubai. Add rooms/floors with approvals support. Fixed scope quote + timeline plan.',
  },
  'villa extension dubai': {
    h1: 'Villa Extension Dubai',
    h2: 'Professional Villa Extension Contractors',
    service: 'Villa Extension',
    highlight: 'extension',
    metaDesc: 'Villa extension services in Dubai. Expert contractors, approvals support, and fixed scope quote.',
  },
  'villa fit out dubai': {
    h1: 'Villa Fit Out Dubai',
    h2: 'Complete Villa Fit Out Services',
    service: 'Villa Fit Out',
    highlight: 'fitout',
    metaDesc: 'Villa fit out Dubai. Turnkey interior solutions. Fixed pricing, free 3D concept, and smooth execution.',
  },
  'villa fitout dubai': {
    h1: 'Villa Fitout Dubai',
    h2: 'Professional Villa Fitout Services',
    service: 'Villa Fit Out',
    highlight: 'fitout',
    metaDesc: 'Villa fitout Dubai specialists. Turnkey solutions with approvals support and warranty options.',
  },
  'villa fit out': {
    h1: 'Villa Fit Out Dubai',
    h2: 'Expert Villa Fit Out Contractors',
    service: 'Villa Fit Out',
    highlight: 'fitout',
    metaDesc: 'Villa fit out services in Dubai. Premium finishes, clear scope, and disciplined project delivery.',
  },
  'home renovation companies dubai': {
    h1: 'Home Renovation Companies Dubai',
    h2: "Dubai's Top Home Renovation Company",
    service: 'Home Renovation',
    highlight: 'home',
    metaDesc: 'Home renovation company in Dubai. Complete upgrades, free consultation, and fixed-scope quote.',
  },
  'home renovation': {
    h1: 'Home Renovation Dubai',
    h2: 'Professional Home Renovation Services',
    service: 'Home Renovation',
    highlight: 'home',
    metaDesc: 'Home renovation Dubai. Fixed scope pricing, quality finishes, and clear project timeline.',
  },
  'home remodeling': {
    h1: 'Home Remodeling Dubai',
    h2: 'Expert Home Remodeling Contractors',
    service: 'Home Remodeling',
    highlight: 'home',
    metaDesc: 'Home remodeling Dubai. Kitchen/bath/full home. Free consultation + fixed-scope quotation.',
  },
  'home remodelling': {
    h1: 'Home Remodelling Dubai',
    h2: 'Professional Home Remodelling Services',
    service: 'Home Remodelling',
    highlight: 'home',
    metaDesc: 'Home remodelling Dubai specialists. Clear scope, quality workmanship, and controlled variations.',
  },
  'renovation companies': {
    h1: 'Renovation Companies Dubai',
    h2: "Dubai's Leading Renovation Company",
    service: 'Renovation Services',
    highlight: 'company',
    metaDesc: 'Renovation company in Dubai. Villa, home, and interior solutions. Free quote and timeline plan.',
  },
  'renovation company in dubai': {
    h1: 'Renovation Company in Dubai',
    h2: 'Trusted Renovation Services',
    service: 'Renovation Services',
    highlight: 'company',
    metaDesc: 'Renovation company in Dubai. Approvals support, fixed-scope quote, and professional execution.',
  },
  'apartment renovation': {
    h1: 'Apartment Renovation Dubai',
    h2: 'Professional Apartment Renovation Services',
    service: 'Apartment Renovation',
    highlight: 'apartment',
    metaDesc: 'Apartment renovation Dubai. Studio to penthouse. Free 3D concept and fixed-scope quote.',
  },
  default: {
    h1: 'Villa Renovation Dubai',
    h2: "Dubai's #1 Villa Renovation Company",
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Premier villa renovation company in Dubai. Free 3D concept + fixed scope quote + approvals support.',
  },
};

// ============================================
// SERVICES
// ============================================
const ALL_SERVICES = [
  { id: 'villa-renovation', title: 'Villa Renovation', desc: 'Complete villa transformation', price: 'From AED 150,000', image: '/villa-renovation.webp', tags: ['villa', 'home', 'company', 'contractor', 'location'] },
  { id: 'interior-renovation', title: 'Interior Renovation', desc: 'Full interior makeover', price: 'From AED 60,000', image: '/Interior-Design.webp', tags: ['interior', 'fitout', 'home', 'apartment', 'location'] },
  { id: 'villa-extension', title: 'Villa Extension', desc: 'Add rooms & floors', price: 'From AED 120,000', image: '/villa-extension.webp', tags: ['extension', 'villa', 'contractor', 'location'] },
  { id: 'villa-fitout', title: 'Villa Fit Out', desc: 'Complete fit out solutions', price: 'From AED 80,000', image: '/office-fitout.webp', tags: ['fitout', 'interior', 'villa', 'location'] },
  { id: 'kitchen', title: 'Kitchen Renovation', desc: 'Modern kitchen makeover', price: 'From AED 45,000', image: '/v16.webp', tags: ['interior', 'home', 'villa', 'apartment'] },
  { id: 'bathroom', title: 'Bathroom Renovation', desc: 'Luxury bathroom upgrade', price: 'From AED 25,000', image: '/v12.webp', tags: ['interior', 'home', 'villa', 'apartment'] },
];

const getRelevantServices = (highlight) => {
  const safe = Array.isArray(ALL_SERVICES) ? ALL_SERVICES : [];
  return [...safe]
    .sort((a, b) => {
      const aMatch = a.tags?.includes(highlight) ? 0 : 1;
      const bMatch = b.tags?.includes(highlight) ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, 6);
};

// ============================================
// PROCESS
// ============================================
const PROCESS_STEPS = [
  { step: '1', title: 'Free Consultation', desc: 'Site visit & requirements', icon: '📋', time: 'Day 1' },
  { step: '2', title: '3D Design & Quote', desc: 'Visualize + fixed scope', icon: '🎨', time: 'Days 2-5' },
  { step: '3', title: 'Approvals Support', desc: 'Docs & coordination', icon: '✅', time: 'Days 6-14' },
  { step: '4', title: 'Execution', desc: 'Expert construction team', icon: '🔨', time: 'Weeks 3-7' },
  { step: '5', title: 'Handover', desc: 'Inspection + warranty', icon: '🔑', time: 'Week 8' },
];

// ============================================
// TESTIMONIALS
// ============================================
const TESTIMONIALS = [
  { name: 'Ahmed K.', location: 'Emirates Hills', text: 'Exceptional work and a very clear process. The 3D concept helped us decide quickly and the execution quality was solid.', rating: 5, project: 'Villa Renovation' },
  { name: 'Sarah M.', location: 'Arabian Ranches', text: 'The fixed-scope quote kept everything clear. Communication was consistent and the team handled coordination professionally.', rating: 5, project: 'Interior Renovation' },
  { name: 'James L.', location: 'Palm Jumeirah', text: 'Professional from start to finish. Good planning, clean finishes, and a smooth handover.', rating: 5, project: 'Villa Extension' },
];

const AREAS_SERVED = [
  'Dubai Hills Estate', 'Emirates Hills', 'Palm Jumeirah', 'Arabian Ranches',
  'DAMAC Hills', 'Jumeirah Golf Estates', 'Al Barari', 'The Lakes',
  'The Meadows', 'The Springs', 'Jumeirah Islands', 'Victory Heights',
  'Motor City', 'JVC', 'Al Barsha', 'Jumeirah', 'District One', 'MBR City',
];

// ============================================
// SSR HELPERS
// ============================================
function normalizeKeyword(raw) {
  return (raw || '').toString().toLowerCase().replace(/[+_-]/g, ' ').replace(/[[\]"'{}]/g, '').trim();
}

function resolveKeywordConfig(keywordRaw, locationRaw) {
  const keyword = normalizeKeyword(keywordRaw);
  const location = (locationRaw || 'Dubai').toString();

  let config = KEYWORD_MAP.default;
  let bestMatchScore = 0;

  for (const [key, value] of Object.entries(KEYWORD_MAP)) {
    if (key === 'default') continue;
    let score = 0;
    if (keyword === key) score = 100;
    else if (keyword.includes(key)) score = key.length;
    else if (key.includes(keyword) && keyword.length > 3) score = keyword.length;
    if (score > bestMatchScore) { config = value; bestMatchScore = score; }
  }

  if (bestMatchScore === 0 && keyword.length > 3) {
    const capitalizedKeyword = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    config = {
      h1: `${capitalizedKeyword} Dubai`,
      h2: `Professional ${capitalizedKeyword} Services in Dubai`,
      service: capitalizedKeyword,
      highlight: keyword.includes('interior') ? 'interior'
        : keyword.includes('extension') ? 'extension'
        : keyword.includes('fit') ? 'fitout'
        : keyword.includes('home') ? 'home'
        : keyword.includes('apartment') ? 'apartment'
        : 'villa',
      metaDesc: `${capitalizedKeyword} in Dubai. Free consultation + fixed scope quote.`,
    };
  }

  return {
    content: { keyword: keyword || 'Villa Renovation', location, ...config },
    services: getRelevantServices(config.highlight),
  };
}

function buildFaq(content) {
  const service = content?.service || 'Renovation';
  const loc = content?.location || 'Dubai';
  return [
    { q: `How much does ${service.toLowerCase()} cost in ${loc}?`, a: `Pricing depends on scope, size, and finish level. We provide a fixed-scope quotation after a site visit. You'll receive a free 3D concept to visualize before deciding.` },
    { q: `How long does a typical ${service.toLowerCase()} project take?`, a: `Most projects complete within 6–8 weeks depending on approvals, material lead times, and scope. We share a clear timeline and weekly updates.` },
    { q: `Do you handle permits/approvals?`, a: `We assist with approvals coordination and documentation requirements as needed for your project type and community requirements in ${loc}.` },
    { q: `Is your quotation fixed or will it change?`, a: `We provide a fixed-scope quote for the agreed scope. If you request changes/upgrades, we share a clear variation quote for approval before work starts.` },
    { q: `What warranty do you provide?`, a: `We provide workmanship warranty options depending on scope, plus manufacturer warranties for supplied materials/fixtures.` },
  ];
}

// ============================================
// SSR
// ============================================
export async function getServerSideProps(ctx) {
  const q = ctx?.query || {};
  const keywordRaw = q.kw || q.keyword || q.utm_term || q.q || '';
  const locationRaw = q.loc || q.location || 'Dubai';
  const { content, services } = resolveKeywordConfig(keywordRaw, locationRaw);

  // ✅ Fix hydration risk by freezing year on server and passing to client
  const year = new Date().getFullYear();

  return { props: { initialContent: content, initialServices: services, year } };
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function QualityScoreOptimizer({ initialContent, initialServices, year }) {
  // ✅ Guardrails
  const safeContent = initialContent && typeof initialContent === 'object'
    ? initialContent
    : KEYWORD_MAP.default;

  const safeServices = Array.isArray(initialServices) ? initialServices : getRelevantServices('villa');

  const [formData, setFormData] = useState({ name: '', phone: '', service: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fallbackError, setFallbackError] = useState('');

  const faqs = useMemo(() => buildFaq(safeContent), [safeContent]);

  // ✅ Scroll depth tracking (simple + useful)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const marks = new Set();

    const handler = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const height = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.round((scrollTop / height) * 100);

      const thresholds = [25, 50, 75, 90];
      thresholds.forEach(t => {
        if (pct >= t && !marks.has(t)) {
          marks.add(t);
          if (window.gtag) window.gtag('event', 'scroll_depth', { percent: t, keyword: safeContent.keyword, service: safeContent.service });
        }
      });
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [safeContent.keyword, safeContent.service]);

  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
  }), [faqs]);

  const reviewSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BRAND.name,
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": BRAND.ratingValue, "reviewCount": BRAND.reviewCount, "bestRating": "5" },
    "review": TESTIMONIALS.map(t => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": t.name },
      "reviewRating": { "@type": "Rating", "ratingValue": t.rating },
      "reviewBody": t.text
    }))
  }), []);

  const sendGtag = useCallback((eventName, params = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
    }
  }, []);

  // ✅ Lead fallback: save lead to /api/lead before opening WhatsApp
  const saveLead = useCallback(async (payload) => {
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Lead API failed');
      return true;
    } catch (err) {
      // localStorage backup
      try {
        const key = 'unicorn_leads_backup';
        const prev = JSON.parse(localStorage.getItem(key) || '[]');
        prev.push({ ...payload, ts: Date.now(), backup: true });
        localStorage.setItem(key, JSON.stringify(prev));
      } catch (_) {}
      return false;
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFallbackError('');

    const lead = {
      name: formData.name,
      phone: formData.phone,
      service: formData.service || safeContent.service,
      location: safeContent.location,
      keyword: safeContent.keyword,
      source: 'Google Ads',
      page: 'landing',
      ts: Date.now(),
    };

    // Save lead first (fallback)
    const saved = await saveLead(lead);
    if (!saved) setFallbackError('Could not save lead in the background. WhatsApp will still open.');

    const message =
      `*New ${lead.service} Inquiry*\n━━━━━━━━━━━━━━━━━━\n👤 Name: ${lead.name}\n📱 Phone: ${lead.phone}\n🏠 Service: ${lead.service}\n📍 Location: ${lead.location}\n━━━━━━━━━━━━━━━━━━\n🔍 Keyword: ${lead.keyword}\n📊 Source: ${lead.source}`;

    sendGtag('conversion', { send_to: 'AW-612864132/qqQcQNeM-bADEISh7qQC', value: 100000, currency: 'AED' });
    sendGtag('lead_submit', { service: lead.service, keyword: lead.keyword, location: lead.location });

    setSubmitted(true);

    // Try open WhatsApp new tab (better than hard redirect)
    const url = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
    const opened = window.open(url, '_blank', 'noopener,noreferrer');

    // If popup blocked, fallback to redirect
    if (!opened) window.location.href = url;

    setIsSubmitting(false);
  }, [formData, isSubmitting, safeContent, saveLead, sendGtag]);

  const quickWhatsApp = useCallback(async () => {
    const lead = {
      name: '',
      phone: '',
      service: safeContent.service,
      location: safeContent.location,
      keyword: safeContent.keyword,
      source: 'Google Ads',
      action: 'whatsapp_click',
      ts: Date.now(),
    };
    await saveLead(lead);

    const msg = `Hi! I’m interested in ${safeContent.service} services in ${safeContent.location}. Please share a fixed-scope quote + free 3D concept.`;
    sendGtag('conversion', { send_to: 'AW-612864132/qqQcQNeM-bADEISh7qQC', value: 100000, currency: 'AED' });
    sendGtag('whatsapp_click', { service: safeContent.service, keyword: safeContent.keyword, location: safeContent.location });

    window.open(`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  }, [safeContent, saveLead, sendGtag]);

  const trackCallClick = useCallback(async () => {
    const lead = {
      name: '',
      phone: '',
      service: safeContent.service,
      location: safeContent.location,
      keyword: safeContent.keyword,
      source: 'Google Ads',
      action: 'phone_click',
      ts: Date.now(),
    };
    await saveLead(lead);

    sendGtag('phone_click', { service: safeContent.service, keyword: safeContent.keyword, location: safeContent.location });
    sendGtag('conversion', { send_to: 'AW-612864132/qqQcQNeM-bADEISh7qQC', value: 100000, currency: 'AED' });
  }, [safeContent, saveLead, sendGtag]);

  return (
    <>
      <Head>
        <title>{safeContent.h1} | Free 3D Design & Quote | {BRAND.name}</title>
        <meta name="description" content={safeContent.metaDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={BRAND.site} />
        <link rel="preconnect" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="icon" href="/favicon.ico" />

        {/* Business Schema (review count single source) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "name": BRAND.name,
          "description": safeContent.metaDesc,
          "url": BRAND.site,
          "telephone": BRAND.phone,
          "address": { "@type": "PostalAddress", "streetAddress": "Al Quoz Industrial Area 3", "addressLocality": "Dubai", "addressCountry": "AE" },
          "openingHours": "Mo-Sa 09:00-18:00",
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": BRAND.ratingValue, "reviewCount": BRAND.reviewCount },
          "priceRange": "AED 25,000 - AED 500,000",
          "areaServed": AREAS_SERVED,
        })}} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

        {/* Critical CSS (slightly stronger contrast for accessibility) */}
        <style dangerouslySetInnerHTML={{ __html: `
          *{margin:0;padding:0;box-sizing:border-box}
          html{scroll-behavior:smooth}
          body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;line-height:1.6;background:#fff}
          .container{max-width:1200px;margin:0 auto;padding:0 16px}
          .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 28px;border-radius:10px;font-weight:800;font-size:16px;cursor:pointer;transition:all .2s;border:none;text-decoration:none}
          .btn:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.18)}
          .btn-green{background:#22c55e;color:#fff}
          .btn-orange{background:#d97706;color:#fff}
          .btn-outline{background:transparent;border:2px solid currentColor}
          input,select{width:100%;padding:14px;border:2px solid #e5e5e5;border-radius:10px;font-size:16px}
          input:focus,select:focus{outline:none;border-color:#d97706}
          .card{background:#fff;border-radius:14px;border:1px solid #e5e5e5;overflow:hidden;transition:all .28s}
          .card:hover{border-color:#d97706;box-shadow:0 10px 26px rgba(0,0,0,.10)}
          @media(max-width:768px){.btn{width:100%}.hide-mobile{display:none}.grid-2,.grid-3,.grid-5{grid-template-columns:1fr!important}}
          .pulse{animation:pulse 2s infinite}
          @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
          details{background:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:14px;margin-bottom:8px}
          details[open]{border-color:#d97706}
          summary{cursor:pointer;font-weight:800;list-style:none}
          summary::-webkit-details-marker{display:none}
          summary::before{content:'+'!important;margin-right:10px;font-weight:900}
          details[open] summary::before{content:'-'!important}
          .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}
        `}} />
      </Head>

      {/* ✅ Analytics loaded safely */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-612864132" strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', 'AW-612864132');
        `}
      </Script>

      <div style={{ minHeight: '100vh' }}>

        {/* URGENCY BAR */}
        <div style={{ background: '#dc2626', color: '#fff', padding: '10px 16px', textAlign: 'center', fontSize: '14px', fontWeight: '800' }}>
          🔥 LIMITED OFFER: Free 3D Design Worth AED 5,000 – Only 3 Slots Left This Month
        </div>

        {/* HEADER */}
        <header style={{ background: '#fff', borderBottom: '1px solid #e5e5e5', padding: '12px 0', position: 'sticky', top: 0, zIndex: 50 }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="https://unicornrenovations.com" style={{ fontSize: '22px', fontWeight: '900', color: '#1a1a1a', textDecoration: 'none' }}>
              UNICORN<span style={{ color: '#d97706' }}>.</span>
            </a>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span className="hide-mobile" style={{ fontSize: '13px', color: '#444' }}>
                ⭐ {BRAND.ratingValue}/5 ({BRAND.reviewCount} reviews)
              </span>
              <a
                onClick={trackCallClick}
                href={`tel:${BRAND.phone}`}
                className="btn btn-orange"
                style={{ padding: '10px 16px', fontSize: '14px' }}
                aria-label="Call Unicorn Renovations"
              >
                📞 <span className="hide-mobile">Call Now</span>
              </a>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', color: '#fff', padding: '48px 0 56px' }}>
          <div className="container" style={{ textAlign: 'center' }}>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ background: 'rgba(255,255,255,0.12)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}>✓ Approvals Support</span>
              <span style={{ background: 'rgba(255,255,255,0.12)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}>⭐ {BRAND.ratingValue}/5 Rating</span>
              <span style={{ background: 'rgba(255,255,255,0.12)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}>🏆 12+ Years</span>
              <span style={{ background: 'rgba(255,255,255,0.12)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}>🛡️ Warranty Options</span>
            </div>

            <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '12px' }}>
              {safeContent.h1}
            </h1>

            <h2 style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: '500', opacity: 0.95, maxWidth: '680px', margin: '0 auto 14px' }}>
              {safeContent.h2} • Fixed Scope • 6–8 Weeks Plan
            </h2>

            <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '20px' }}>
              Looking for <strong>{safeContent.keyword}</strong> in <strong>{safeContent.location}</strong>? Get a fixed-scope quote + free 3D concept today.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '360px', margin: '0 auto' }}>
              <button onClick={quickWhatsApp} className="btn btn-green pulse" style={{ fontSize: '17px' }} aria-label="Get free quote on WhatsApp">
                💬 Get Free Quote on WhatsApp
              </button>
              <a onClick={trackCallClick} href={`tel:${BRAND.phone}`} className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.40)' }} aria-label="Call Unicorn Renovations">
                📞 Call {BRAND.phone.replace('+', '+ ')}
              </a>
            </div>

            <p style={{ fontSize: '12px', opacity: 0.75, marginTop: '12px' }}>
              ✓ Free Site Visit • ✓ No Obligation • ✓ Response in 30 Minutes
            </p>
          </div>
        </section>

        {/* SERVICES */}
        <section style={{ padding: '48px 0', background: '#fff' }}>
          <div className="container">
            <h2 style={{ fontSize: '24px', fontWeight: '900', textAlign: 'center', marginBottom: '8px' }}>
              Our {safeContent.service} Services in {safeContent.location}
            </h2>
            <p style={{ textAlign: 'center', color: '#555', marginBottom: '32px', fontSize: '15px' }}>
              Clear scope. Fixed-scope quote. Controlled variations. Clean handover.
            </p>

            <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {safeServices.map((s, i) => (
                <div key={s.id || i} className="card" onClick={quickWhatsApp} style={{ cursor: 'pointer' }} role="button" tabIndex={0} aria-label={`View ${s.title} and request a quote`}>
                  <div style={{ position: 'relative', height: '160px', background: '#f3f4f6' }}>
                    <Image
                      src={s.image}
                      alt={`${s.title} in ${safeContent.location}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: 'cover' }}
                      priority={i === 0}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      quality={60}
                    />
                  </div>
                  <div style={{ padding: '16px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '900', marginBottom: '4px' }}>{s.title}</h3>
                    <p style={{ fontSize: '13px', color: '#555', marginBottom: '8px' }}>{s.desc}</p>
                    <p style={{ fontSize: '15px', fontWeight: '900', color: '#d97706' }}>{s.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '48px 0', background: '#f9fafb' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '900', textAlign: 'center', marginBottom: '8px' }}>
              {safeContent.service} FAQ
            </h2>
            <p style={{ textAlign: 'center', color: '#555', fontSize: '14px', marginBottom: '24px' }}>
              Common questions about <strong>{safeContent.keyword}</strong> in <strong>{safeContent.location}</strong>
            </p>
            <div>
              {faqs.map((f, idx) => (
                <details key={idx}>
                  <summary>{f.q}</summary>
                  <div style={{ paddingTop: '10px', color: '#333', fontSize: '14px', lineHeight: 1.8 }}>{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* LEAD FORM */}
        <section id="quote" style={{ padding: '48px 0', background: '#fff' }}>
          <div className="container" style={{ maxWidth: '440px' }}>
            <div style={{ background: '#f9fafb', borderRadius: '16px', padding: '28px', border: '2px solid #d97706' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '900', textAlign: 'center', marginBottom: '6px' }}>
                Get Your Free {safeContent.service} Quote
              </h2>
              <p style={{ textAlign: 'center', color: '#555', marginBottom: '20px', fontSize: '14px' }}>
                Response in 30 minutes • No obligation
              </p>

              {fallbackError ? (
                <p style={{ fontSize: '12px', color: '#b91c1c', marginBottom: '10px', textAlign: 'center' }}>
                  {fallbackError}
                </p>
              ) : null}

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '900' }}>Request Sent!</h3>
                  <p style={{ color: '#555', fontSize: '14px' }}>We&apos;ll contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label className="sr-only" htmlFor="name">Your Name</label>
                  <input id="name" type="text" placeholder="Your Name *" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ background: '#fff' }} />

                  <label className="sr-only" htmlFor="phone">WhatsApp Number</label>
                  <input id="phone" type="tel" placeholder="WhatsApp Number *" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ background: '#fff' }} />

                  <label className="sr-only" htmlFor="service">Service</label>
                  <select id="service" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} style={{ color: formData.service ? '#1a1a1a' : '#666', background: '#fff' }}>
                    <option value="">Select Service</option>
                    <option value="Villa Renovation">Villa Renovation</option>
                    <option value="Interior Renovation">Interior Renovation</option>
                    <option value="Villa Extension">Villa Extension</option>
                    <option value="Villa Fit Out">Villa Fit Out</option>
                    <option value="Kitchen Renovation">Kitchen Renovation</option>
                    <option value="Bathroom Renovation">Bathroom Renovation</option>
                  </select>

                  <button type="submit" className="btn btn-orange" disabled={isSubmitting} style={{ marginTop: '4px' }} aria-label="Submit and open WhatsApp">
                    {isSubmitting ? 'Sending...' : 'Get Free Quote →'}
                  </button>

                  <p style={{ fontSize: '11px', color: '#666', textAlign: 'center' }}>🔒 Your information is secure</p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: '32px 0', background: '#1a1a1a', color: '#fff' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <a href="https://unicornrenovations.com" style={{ fontSize: '20px', fontWeight: '900', color: '#fff', textDecoration: 'none' }}>
              UNICORN<span style={{ color: '#d97706' }}>.</span>
            </a>
            <p style={{ fontSize: '13px', opacity: 0.8, marginTop: '8px' }}>
              Dubai&apos;s Premier {safeContent.service} Company • 12+ Years • 800+ Projects • {BRAND.ratingValue}★ Rating
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
              {[
                { label: 'Villa Renovation', url: 'https://unicornrenovations.com/villa-renovation/' },
                { label: 'Interior Design', url: 'https://unicornrenovations.com/interior-design/' },
                { label: 'Villa Extension', url: 'https://unicornrenovations.com/villa-extension/' },
                { label: 'Portfolio', url: 'https://unicornrenovations.com/portfolio/' },
                { label: 'About Us', url: 'https://unicornrenovations.com/about-us/' },
                { label: 'Contact', url: 'https://unicornrenovations.com/contact/' },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"   // ✅ fixed
                  style={{ color: '#bdbdbd', fontSize: '12px', textDecoration: 'none' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <p style={{ fontSize: '11px', opacity: 0.55, marginTop: '16px' }}>
              © {year} {BRAND.name}. All rights reserved.
            </p>
          </div>
        </footer>

        {/* FLOATING WHATSAPP (aria added) */}
        <button
          onClick={quickWhatsApp}
          className="pulse"
          aria-label="Chat on WhatsApp"
          style={{
            position: 'fixed',
            bottom: '76px',
            right: '16px',
            width: '56px',
            height: '56px',
            background: '#22c55e',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg style={{ width: '28px', height: '28px' }} fill="#fff" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </button>
      </div>
    </>
  );
}
