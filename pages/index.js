// pages/index.js - ULTIMATE QUALITY SCORE OPTIMIZER (SSR + FAQ Schema)
// Key upgrades:
// 1) Server-side keyword rendering (Google sees the right H1/meta immediately)
// 2) Keyword-matched FAQ section + FAQPage schema (relevance/QS boost)
// 3) Fix form submit state handling
// 4) No painting service category

import Head from 'next/head';
import Image from 'next/image';
import { useState, useCallback, useMemo } from 'react';

// ============================================
// KEYWORD MAPPING - Based on actual Google Ads report
// ============================================
const KEYWORD_MAP = {
  'interior renovation company': {
    h1: 'Interior Renovation Company in Dubai',
    h2: "Dubai's #1 Interior Renovation Specialists",
    service: 'Interior Renovation',
    highlight: 'interior',
    metaDesc: 'Top interior renovation company in Dubai. 800+ projects. Municipality approved. Free 3D design.',
  },
  'interior renovation': {
    h1: 'Interior Renovation Dubai',
    h2: 'Professional Interior Renovation Services',
    service: 'Interior Renovation',
    highlight: 'interior',
    metaDesc: 'Expert interior renovation in Dubai. Complete makeovers. Fixed price guarantee.',
  },
  'villa renovation dubai': {
    h1: 'Villa Renovation Dubai',
    h2: 'Expert Villa Renovation Contractors in Dubai',
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Villa renovation Dubai specialists. 800+ villas completed. Fixed price. 6-8 weeks.',
  },
  'villa renovation in dubai': {
    h1: 'Villa Renovation in Dubai',
    h2: 'Premium Villa Renovation Company',
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Villa renovation in Dubai. Municipality approved. 5-year warranty. Free consultation.',
  },
  'villa renovation': {
    h1: 'Villa Renovation Dubai',
    h2: "Dubai's Most Trusted Villa Renovation Company",
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Complete villa renovation services in Dubai. Fixed price. On-time delivery.',
  },
  'villa renovations': {
    h1: 'Villa Renovations Dubai',
    h2: 'Expert Villa Renovation Services',
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Villa renovations in Dubai by certified contractors. 800+ projects completed.',
  },
  'villa contractors in dubai': {
    h1: 'Villa Contractors in Dubai',
    h2: 'Licensed Villa Renovation Contractors',
    service: 'Villa Contracting',
    highlight: 'contractor',
    metaDesc: 'Licensed villa contractors in Dubai. Municipality approved. Fixed price guarantee.',
  },
  'villa contractors': {
    h1: 'Villa Contractors Dubai',
    h2: 'Trusted Villa Renovation Contractors',
    service: 'Villa Contracting',
    highlight: 'contractor',
    metaDesc: 'Professional villa contractors in Dubai. 12+ years experience. 800+ projects.',
  },
  'villa renovation contractors': {
    h1: 'Villa Renovation Contractors Dubai',
    h2: 'Expert Villa Renovation Contractors',
    service: 'Villa Contracting',
    highlight: 'contractor',
    metaDesc: 'Villa renovation contractors in Dubai. Licensed. Insured. 5-year warranty.',
  },
  'villa extension': {
    h1: 'Villa Extension Dubai',
    h2: 'Expert Villa Extension Services',
    service: 'Villa Extension',
    highlight: 'extension',
    metaDesc: 'Villa extension Dubai. Add rooms, floors, outdoor spaces. Municipality approved.',
  },
  'villa extension dubai': {
    h1: 'Villa Extension Dubai',
    h2: 'Professional Villa Extension Contractors',
    service: 'Villa Extension',
    highlight: 'extension',
    metaDesc: 'Villa extension services in Dubai. Expert contractors. Fixed price.',
  },
  'villa fit out dubai': {
    h1: 'Villa Fit Out Dubai',
    h2: 'Complete Villa Fit Out Services',
    service: 'Villa Fit Out',
    highlight: 'fitout',
    metaDesc: 'Villa fit out Dubai. Complete interior solutions. Fixed price. Free 3D design.',
  },
  'villa fitout dubai': {
    h1: 'Villa Fitout Dubai',
    h2: 'Professional Villa Fitout Services',
    service: 'Villa Fit Out',
    highlight: 'fitout',
    metaDesc: 'Villa fitout Dubai specialists. Turnkey solutions. Municipality approved.',
  },
  'villa fit out': {
    h1: 'Villa Fit Out Dubai',
    h2: 'Expert Villa Fit Out Contractors',
    service: 'Villa Fit Out',
    highlight: 'fitout',
    metaDesc: 'Villa fit out services in Dubai. Premium finishes. 5-year warranty.',
  },
  'home renovation companies dubai': {
    h1: 'Home Renovation Companies Dubai',
    h2: "Dubai's Top Home Renovation Company",
    service: 'Home Renovation',
    highlight: 'home',
    metaDesc: 'Leading home renovation company in Dubai. 800+ homes transformed. Free quote.',
  },
  'home renovation': {
    h1: 'Home Renovation Dubai',
    h2: 'Professional Home Renovation Services',
    service: 'Home Renovation',
    highlight: 'home',
    metaDesc: 'Home renovation Dubai. Complete makeovers. Fixed price guarantee.',
  },
  'home remodeling': {
    h1: 'Home Remodeling Dubai',
    h2: 'Expert Home Remodeling Contractors',
    service: 'Home Remodeling',
    highlight: 'home',
    metaDesc: 'Home remodeling Dubai. Kitchen, bathroom, full home. Free consultation.',
  },
  'home remodelling': {
    h1: 'Home Remodelling Dubai',
    h2: 'Professional Home Remodelling Services',
    service: 'Home Remodelling',
    highlight: 'home',
    metaDesc: 'Home remodelling Dubai specialists. Quality workmanship. 5-year warranty.',
  },
  'home remodeling contractors': {
    h1: 'Home Remodeling Contractors Dubai',
    h2: 'Licensed Home Remodeling Contractors',
    service: 'Home Remodeling',
    highlight: 'home',
    metaDesc: 'Home remodeling contractors Dubai. Licensed. Insured. Fixed price.',
  },
  'renovation companies': {
    h1: 'Renovation Companies Dubai',
    h2: "Dubai's Leading Renovation Company",
    service: 'Renovation Services',
    highlight: 'company',
    metaDesc: 'Top renovation company in Dubai. Villa, home, interior. 800+ projects.',
  },
  'renovation company in dubai': {
    h1: 'Renovation Company in Dubai',
    h2: 'Trusted Renovation Services',
    service: 'Renovation Services',
    highlight: 'company',
    metaDesc: 'Premier renovation company in Dubai. Municipality approved. Free quote.',
  },
  'villa renovation companies dubai': {
    h1: 'Villa Renovation Companies Dubai',
    h2: "Dubai's Best Villa Renovation Company",
    service: 'Villa Renovation',
    highlight: 'company',
    metaDesc: 'Top villa renovation company in Dubai. 800+ villas. 5-year warranty.',
  },
  'residential remodeling': {
    h1: 'Residential Remodeling Dubai',
    h2: 'Expert Residential Remodeling Services',
    service: 'Residential Remodeling',
    highlight: 'home',
    metaDesc: 'Residential remodeling Dubai. Complete home transformations. Fixed price.',
  },
  'apartment renovation': {
    h1: 'Apartment Renovation Dubai',
    h2: 'Professional Apartment Renovation Services',
    service: 'Apartment Renovation',
    highlight: 'apartment',
    metaDesc: 'Apartment renovation Dubai. Studio to penthouse. Free 3D design.',
  },
  'damac hills villa renovation': {
    h1: 'DAMAC Hills Villa Renovation',
    h2: 'Expert Villa Renovation in DAMAC Hills',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'DAMAC Hills villa renovation specialists. Local experts. Free consultation.',
  },
  'damac hills 2 villa renovation': {
    h1: 'DAMAC Hills 2 Villa Renovation',
    h2: 'Villa Renovation in DAMAC Hills 2',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'DAMAC Hills 2 villa renovation. Experienced local contractors. Fixed price.',
  },
  'arabian ranches villa renovation': {
    h1: 'Arabian Ranches Villa Renovation',
    h2: 'Expert Villa Renovation in Arabian Ranches',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'Arabian Ranches villa renovation. Local specialists. 100+ projects in area.',
  },
  'palm jumeirah villa renovation': {
    h1: 'Palm Jumeirah Villa Renovation',
    h2: 'Luxury Villa Renovation on Palm Jumeirah',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'Palm Jumeirah villa renovation. Luxury specialists. Free 3D design.',
  },
  'emirates hills villa renovation': {
    h1: 'Emirates Hills Villa Renovation',
    h2: 'Premium Villa Renovation in Emirates Hills',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'Emirates Hills villa renovation. Luxury experts. Municipality approved.',
  },
  'dubai hills villa renovation': {
    h1: 'Dubai Hills Villa Renovation',
    h2: 'Expert Villa Renovation in Dubai Hills',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'Dubai Hills villa renovation specialists. Local expertise. Free quote.',
  },
  default: {
    h1: 'Villa Renovation Dubai',
    h2: "Dubai's #1 Villa Renovation Company",
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Premier villa renovation company in Dubai. 800+ projects. Free 3D design.',
  },
};

// ============================================
// SERVICES (No painting category)
// ============================================
const ALL_SERVICES = [
  { id: 'villa-renovation', title: 'Villa Renovation', desc: 'Complete villa transformation', price: 'From AED 150,000', image: '/villa-renovation.webp', icon: '🏠', tags: ['villa', 'home', 'company', 'contractor', 'location'] },
  { id: 'interior-renovation', title: 'Interior Renovation', desc: 'Full interior makeover', price: 'From AED 60,000', image: '/Interior-Design.webp', icon: '🎨', tags: ['interior', 'fitout', 'home', 'apartment'] },
  { id: 'villa-extension', title: 'Villa Extension', desc: 'Add rooms & floors', price: 'From AED 120,000', image: '/villa-extension.webp', icon: '🏗️', tags: ['extension', 'villa', 'contractor'] },
  { id: 'villa-fitout', title: 'Villa Fit Out', desc: 'Complete fit out solutions', price: 'From AED 80,000', image: '/office-fitout.webp', icon: '✨', tags: ['fitout', 'interior', 'villa'] },
  { id: 'kitchen', title: 'Kitchen Renovation', desc: 'Modern kitchen makeover', price: 'From AED 45,000', image: '/v16.webp', icon: '🍳', tags: ['interior', 'home', 'villa', 'apartment'] },
  { id: 'bathroom', title: 'Bathroom Renovation', desc: 'Luxury bathroom upgrade', price: 'From AED 25,000', image: '/v12.webp', icon: '🛁', tags: ['interior', 'home', 'villa', 'apartment'] },
  { id: 'swimming-pool', title: 'Pool Construction', desc: 'Custom pools & landscaping', price: 'From AED 80,000', image: '/swimming-pool.webp', icon: '🏊', tags: ['villa', 'extension', 'contractor'] },
];

const getRelevantServices = (highlight) => {
  return [...ALL_SERVICES]
    .sort((a, b) => {
      const aMatch = a.tags.includes(highlight) ? 0 : 1;
      const bMatch = b.tags.includes(highlight) ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, 6);
};

// ============================================
// AREAS SERVED
// ============================================
const AREAS_SERVED = [
  'Dubai Hills Estate', 'Emirates Hills', 'Palm Jumeirah', 'Arabian Ranches',
  'DAMAC Hills', 'Jumeirah Golf Estates', 'Al Barari', 'The Lakes',
  'The Meadows', 'The Springs', 'Jumeirah Islands', 'Victory Heights',
  'Motor City', 'JVC', 'Al Barsha', 'Jumeirah', 'District One', 'MBR City',
];

// ============================================
// SSR keyword resolver (so Google sees correct content immediately)
// ============================================
function normalizeKeyword(raw) {
  return (raw || '')
    .toString()
    .toLowerCase()
    .replace(/[+_-]/g, ' ')
    .replace(/[[\]"'{}]/g, '')
    .trim();
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

    if (score > bestMatchScore) {
      config = value;
      bestMatchScore = score;
    }
  }

  if (bestMatchScore === 0 && keyword.length > 3) {
    const words = keyword.split(' ');
    const capitalizedKeyword = words.map(w => (w ? w.charAt(0).toUpperCase() + w.slice(1) : '')).join(' ').trim();

    config = {
      h1: `${capitalizedKeyword} Dubai`,
      h2: `Professional ${capitalizedKeyword} Services in Dubai`,
      service: capitalizedKeyword,
      highlight:
        keyword.includes('interior') ? 'interior' :
        keyword.includes('extension') ? 'extension' :
        keyword.includes('fit') ? 'fitout' :
        keyword.includes('contract') ? 'contractor' :
        keyword.includes('home') ? 'home' :
        keyword.includes('apartment') ? 'apartment' : 'villa',
      metaDesc: `${capitalizedKeyword} in Dubai. 800+ projects. Free quote.`,
    };
  }

  const content = {
    keyword: keyword || 'Villa Renovation',
    location,
    h1: config.h1,
    h2: config.h2,
    service: config.service,
    highlight: config.highlight,
    metaDesc: config.metaDesc,
  };

  return { content, services: getRelevantServices(config.highlight) };
}

// ============================================
// FAQ generator (keyword-matched + QS relevance)
// ============================================
function buildFaq(content) {
  const service = content.service || 'Renovation';
  const loc = content.location || 'Dubai';

  return [
    {
      q: `How much does ${service.toLowerCase()} cost in ${loc}?`,
      a: `Pricing depends on scope, size, and finish level. We provide a fixed-price quotation after a site visit. You'll also receive a free 3D design concept to visualize the result before you decide.`,
    },
    {
      q: `How long does a typical ${service.toLowerCase()} take?`,
      a: `Most projects complete within 6–8 weeks depending on approvals, material lead times, and scope. We share a clear timeline and weekly progress updates.`,
    },
    {
      q: `Do you handle permits and approvals in Dubai?`,
      a: `Yes. We assist with required approvals and coordinate documentation as needed for your project type and community requirements.`,
    },
    {
      q: `Is your quote fixed or will it change later?`,
      a: `We give a fixed-price quote for the agreed scope. If you request upgrades or add extra items, we share a clear variation quote for approval before any work starts.`,
    },
    {
      q: `Do you provide warranty?`,
      a: `Yes. We provide a workmanship warranty (typically up to 5 years depending on scope) and manufacturer warranties for supplied materials where applicable.`,
    },
  ];
}

// ============================================
// SSR: This is the important part for QS
// ============================================
export async function getServerSideProps(ctx) {
  const q = ctx.query || {};
  const keywordRaw = q.kw || q.keyword || q.utm_term || q.q || '';
  const locationRaw = q.loc || q.location || 'Dubai';

  const { content, services } = resolveKeywordConfig(keywordRaw, locationRaw);

  return {
    props: {
      initialContent: content,
      initialServices: services,
    },
  };
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function QualityScoreOptimizer({ initialContent, initialServices }) {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const content = initialContent;
  const services = initialServices;

  const faqs = useMemo(() => buildFaq(content), [content]);

  // FAQ schema (adds strong relevance signals)
  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  }), [faqs]);

  // Form submission
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const message = `*New ${content.service} Inquiry*
━━━━━━━━━━━━━━━━━━
👤 Name: ${formData.name}
📱 Phone: ${formData.phone}
🏠 Service: ${formData.service || content.service}
📍 Location: ${content.location}
━━━━━━━━━━━━━━━━━━
🔍 Keyword: ${content.keyword}
📊 Source: Google Ads
🎁 Offer: FREE 3D Design`;

    // Track conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-612864132/qqQcQNeM-bADEISh7qQC',
        value: 100000,
        currency: 'AED'
      });
    }

    // Mark submitted before redirect
    setSubmitted(true);

    // Redirect to WhatsApp
    window.location.href = `https://wa.me/971585658002?text=${encodeURIComponent(message)}`;
  }, [formData, content, isSubmitting]);

  // Quick WhatsApp
  const quickWhatsApp = () => {
    const msg = `Hi! I'm interested in ${content.service} services in ${content.location}. Please send me a free quote.`;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-612864132/qqQcQNeM-bADEISh7qQC',
        value: 100000,
        currency: 'AED'
      });
    }

    window.open(`https://wa.me/971585658002?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      <Head>
        <title>{content.h1} | Free 3D Design & Quote | Unicorn Renovations</title>
        <meta name="description" content={content.metaDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow" />

        {/* Speed */}
        <link rel="preconnect" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "Unicorn Renovations",
              "description": content.metaDesc,
              "url": "https://dubailuxrenovate.com",
              "telephone": "+971585658002",
              "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" },
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "287" },
              "priceRange": "AED 25,000 - AED 500,000",
              "areaServed": AREAS_SERVED
            })
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Critical CSS */}
        <style dangerouslySetInnerHTML={{
          __html: `
          *{margin:0;padding:0;box-sizing:border-box}
          html{scroll-behavior:smooth}
          body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;line-height:1.5;background:#fff}
          .container{max-width:1200px;margin:0 auto;padding:0 16px}
          .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 28px;border-radius:8px;font-weight:700;font-size:16px;cursor:pointer;transition:transform 0.2s;border:none;text-decoration:none}
          .btn:hover{transform:translateY(-2px)}
          .btn-green{background:#22c55e;color:#fff}
          .btn-orange{background:#d97706;color:#fff}
          .btn-outline{background:transparent;border:2px solid currentColor}
          input,select{width:100%;padding:14px;border:2px solid #e5e5e5;border-radius:8px;font-size:16px}
          input:focus,select:focus{outline:none;border-color:#d97706}
          .card{background:#fff;border-radius:12px;border:1px solid #e5e5e5;overflow:hidden;transition:all 0.3s}
          .card:hover{border-color:#d97706;box-shadow:0 8px 24px rgba(0,0,0,0.1)}
          @media(max-width:768px){.btn{width:100%}.hide-mobile{display:none}.grid-2{grid-template-columns:1fr!important}}
          .pulse{animation:pulse 2s infinite}
          @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
          details{background:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:14px}
          summary{cursor:pointer;font-weight:700}
        `}} />
      </Head>

      <div style={{ minHeight: '100vh' }}>
        {/* URGENCY BAR */}
        <div style={{ background: '#dc2626', color: '#fff', padding: '10px 16px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>
          🔥 LIMITED: Free 3D Design Worth AED 5,000 for {content.service} Projects
        </div>

        {/* HEADER */}
        <header style={{ background: '#fff', borderBottom: '1px solid #e5e5e5', padding: '12px 0', position: 'sticky', top: 0, zIndex: 50 }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="https://unicornrenovations.com" style={{ fontSize: '22px', fontWeight: '900', color: '#1a1a1a', textDecoration: 'none' }}>
              UNICORN<span style={{ color: '#d97706' }}>.</span>
            </a>
            <a href="tel:+971585658002" className="btn btn-orange" style={{ padding: '10px 16px', fontSize: '14px' }}>
              📞 <span className="hide-mobile">Call Now</span>
            </a>
          </div>
        </header>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', color: '#fff', padding: '48px 0 56px' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}>✓ Municipality Approved</span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}>⭐ 4.9/5 Rating</span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}>🏆 12+ Years</span>
            </div>

            <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '800', lineHeight: 1.15, marginBottom: '12px' }}>
              {content.h1}
            </h1>

            <h2 style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: '400', opacity: 0.9, marginBottom: '20px', maxWidth: '600px', margin: '0 auto 20px' }}>
              {content.h2} • Fixed Price • 6-8 Weeks
            </h2>

            {/* Keyword reinforcement (helps relevance without looking spammy) */}
            <p style={{ fontSize: '13px', opacity: 0.75, marginBottom: '16px' }}>
              Looking for <strong>{content.keyword}</strong> in <strong>{content.location}</strong>? Get a fixed quote + free 3D concept today.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '28px', flexWrap: 'wrap' }}>
              {[{ num: '800+', label: 'Projects Done' }, { num: '12+', label: 'Years Experience' }, { num: '5yr', label: 'Warranty' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#fbbf24' }}>{s.num}</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '360px', margin: '0 auto' }}>
              <button onClick={quickWhatsApp} className="btn btn-green pulse" style={{ fontSize: '17px' }}>
                💬 Get Free Quote on WhatsApp
              </button>
              <a href="tel:+971585658002" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                📞 Call +971 58 565 8002
              </a>
            </div>

            <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '12px' }}>
              ✓ Free Consultation • ✓ No Obligation • ✓ Response in 30 min
            </p>
          </div>
        </section>

        {/* SERVICES */}
        <section style={{ padding: '48px 0', background: '#fff' }}>
          <div className="container">
            <h2 style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', marginBottom: '32px' }}>
              Our {content.service} Services in {content.location}
            </h2>

            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {services.map((s, i) => (
                <div key={i} className="card" onClick={quickWhatsApp} style={{ cursor: 'pointer' }}>
                  <div style={{ position: 'relative', height: '160px', background: '#f3f4f6' }}>
                    <Image
                      src={s.image}
                      alt={`${s.title} in ${content.location}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: 'cover' }}
                      priority={i === 0}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      quality={60}
                    />
                  </div>
                  <div style={{ padding: '16px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>{s.title}</h3>
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{s.desc}</p>
                    <p style={{ fontSize: '15px', fontWeight: '700', color: '#d97706' }}>{s.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section style={{ padding: '48px 0', background: '#1a1a1a', color: '#fff' }}>
          <div className="container">
            <h2 style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', marginBottom: '32px' }}>
              Why Choose Unicorn for {content.service}?
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px', textAlign: 'center' }}>
              {[
                { icon: '✅', title: 'Municipality Approved', desc: 'All permits handled' },
                { icon: '💰', title: 'Fixed Price', desc: 'No hidden costs' },
                { icon: '📅', title: 'On-Time Delivery', desc: '6-8 weeks guaranteed' },
                { icon: '🛡️', title: '5-Year Warranty', desc: 'Full coverage' },
                { icon: '🎨', title: 'Free 3D Design', desc: 'Visualize first' },
                { icon: '⭐', title: '4.9/5 Rating', desc: '287 reviews' },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#fbbf24', marginBottom: '4px' }}>{item.title}</h3>
                  <p style={{ fontSize: '12px', opacity: 0.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ (keyword matched) */}
        <section style={{ padding: '48px 0', background: '#fff' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', textAlign: 'center', marginBottom: '10px' }}>
              {content.service} FAQ in {content.location}
            </h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '22px' }}>
              Quick answers about {content.keyword} — pricing, timelines, approvals & warranty.
            </p>

            <div style={{ display: 'grid', gap: '12px' }}>
              {faqs.map((f, idx) => (
                <details key={idx}>
                  <summary>{f.q}</summary>
                  <div style={{ paddingTop: '10px', color: '#444', fontSize: '14px', lineHeight: 1.7 }}>
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* LEAD FORM */}
        <section id="quote" style={{ padding: '48px 0', background: '#f9fafb' }}>
          <div className="container" style={{ maxWidth: '440px' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', textAlign: 'center', marginBottom: '6px' }}>
                Get Your Free {content.service} Quote
              </h2>
              <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px', fontSize: '14px' }}>
                Response in 30 minutes • No obligation
              </p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Request Sent!</h3>
                  <p style={{ color: '#666', fontSize: '14px' }}>We&apos;ll contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="text"
                    placeholder="Your Name *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp Number *"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{ color: formData.service ? '#1a1a1a' : '#999' }}
                  >
                    <option value="">Select Service</option>
                    <option value="Villa Renovation">Villa Renovation</option>
                    <option value="Interior Renovation">Interior Renovation</option>
                    <option value="Villa Extension">Villa Extension</option>
                    <option value="Villa Fit Out">Villa Fit Out</option>
                    <option value="Kitchen Renovation">Kitchen Renovation</option>
                    <option value="Bathroom Renovation">Bathroom Renovation</option>
                    <option value="Home Remodeling">Home Remodeling</option>
                    <option value="Pool Construction">Pool Construction</option>
                  </select>

                  <button type="submit" className="btn btn-orange" disabled={isSubmitting} style={{ marginTop: '4px' }}>
                    {isSubmitting ? 'Sending...' : 'Get Free Quote →'}
                  </button>

                  <p style={{ fontSize: '11px', color: '#999', textAlign: 'center' }}>
                    🔒 Your information is secure
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* AREAS SERVED */}
        <section style={{ padding: '32px 0', background: '#fff' }}>
          <div className="container">
            <h3 style={{ fontSize: '18px', fontWeight: '700', textAlign: 'center', marginBottom: '16px' }}>
              {content.service} Services Across Dubai
            </h3>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '13px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
              {AREAS_SERVED.join(' • ')}
            </p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ padding: '48px 0', background: 'linear-gradient(135deg, #d97706, #b45309)', color: '#fff', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '12px' }}>
              Ready to Start Your {content.service} Project?
            </h2>
            <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '24px' }}>
              Free consultation + 3D design + fixed price quote
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '360px', margin: '0 auto' }}>
              <button onClick={quickWhatsApp} className="btn" style={{ background: '#22c55e', color: '#fff' }}>
                💬 WhatsApp Us Now
              </button>
              <a href="tel:+971585658002" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}>
                📞 +971 58 565 8002
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: '32px 0', background: '#1a1a1a', color: '#fff' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <a href="https://unicornrenovations.com" style={{ fontSize: '20px', fontWeight: '900', color: '#fff', textDecoration: 'none' }}>
              UNICORN<span style={{ color: '#d97706' }}>.</span>
            </a>
            <p style={{ fontSize: '13px', opacity: 0.6, marginTop: '8px' }}>
              Dubai&apos;s Premier {content.service} Company • 12+ Years • 800+ Projects
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
              {[
                { label: 'Villa Renovation', url: 'https://unicornrenovations.com/villa-renovation/' },
                { label: 'Interior Design', url: 'https://unicornrenovations.com/interior-design/' },
                { label: 'Villa Extension', url: 'https://unicornrenovations.com/villa-extension/' },
                { label: 'About', url: 'https://unicornrenovations.com/about-us/' },
              ].map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener" style={{ color: '#999', fontSize: '12px', textDecoration: 'none' }}>
                  {link.label}
                </a>
              ))}
            </div>

            <p style={{ fontSize: '11px', opacity: 0.4, marginTop: '16px' }}>
              © {new Date().getFullYear()} Unicorn Renovations
            </p>
          </div>
        </footer>

        {/* FLOATING WHATSAPP */}
        <button
          onClick={quickWhatsApp}
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
          className="pulse"
          aria-label="WhatsApp"
        >
          <svg style={{ width: '28px', height: '28px' }} fill="#fff" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </button>

        {/* MOBILE BOTTOM BAR */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#fff',
          borderTop: '1px solid #e5e5e5',
          zIndex: 40,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          height: '60px'
        }} className="hide-desktop">
          <a href="tel:+971585658002" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#1a1a1a', textDecoration: 'none', fontWeight: '700', borderRight: '1px solid #e5e5e5' }}>
            📞 Call
          </a>
          <button onClick={quickWhatsApp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#22c55e', color: '#fff', border: 'none', fontWeight: '700', cursor: 'pointer' }}>
            💬 WhatsApp
          </button>
        </div>

        <div style={{ height: '60px' }} className="hide-desktop"></div>

        {/* DEFERRED ANALYTICS */}
        <script dangerouslySetInnerHTML={{
          __html: `
          window.addEventListener('load', function() {
            setTimeout(function() {
              var s = document.createElement('script');
              s.src = 'https://www.googletagmanager.com/gtag/js?id=AW-612864132';
              s.async = true;
              document.head.appendChild(s);
              s.onload = function() {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', 'AW-612864132');
              };
            }, 1500);
          });
        `}} />

        <style dangerouslySetInnerHTML={{ __html: `@media(min-width:769px){.hide-desktop{display:none!important}}` }} />
      </div>
    </>
  );
}
