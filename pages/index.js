// pages/index.js - QS 9-10 OPTIMIZER (SSR + Community + Nearby Areas + Trust + FAQ + Process + Reviews)
// Targeting QS components: CTR, Ad Relevance, Landing Page Experience

import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import { useState, useCallback, useMemo } from 'react';

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
    metaDesc: 'Complete villa renovation services in Dubai. Fixed price scope, timeline clarity, and quality workmanship.',
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
  'damac hills villa renovation': {
    h1: 'DAMAC Hills Villa Renovation',
    h2: 'Expert Villa Renovation in DAMAC Hills',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'DAMAC Hills villa renovation specialists. Local scheduling, clear scope, and fixed price quote.',
  },
  'arabian ranches villa renovation': {
    h1: 'Arabian Ranches Villa Renovation',
    h2: 'Expert Villa Renovation in Arabian Ranches',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'Arabian Ranches villa renovation. Community-aware planning, approvals support, and disciplined delivery.',
  },
  'palm jumeirah villa renovation': {
    h1: 'Palm Jumeirah Villa Renovation',
    h2: 'Luxury Villa Renovation on Palm Jumeirah',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'Palm Jumeirah villa renovation. Luxury finishing control, premium execution, free 3D concept.',
  },
  'emirates hills villa renovation': {
    h1: 'Emirates Hills Villa Renovation',
    h2: 'Premium Villa Renovation in Emirates Hills',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'Emirates Hills villa renovation. Premium workmanship, approvals support, and quality-first delivery.',
  },
  'dubai hills villa renovation': {
    h1: 'Dubai Hills Villa Renovation',
    h2: 'Expert Villa Renovation in Dubai Hills',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'Dubai Hills villa renovation specialists. Community-aware renovation planning and fixed-scope quote.',
  },
  default: {
    h1: 'Villa Renovation Dubai',
    h2: "Dubai's #1 Villa Renovation Company",
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Premier villa renovation company in Dubai. Free 3D concept + fixed price quote + approvals support.',
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
  return [...ALL_SERVICES]
    .sort((a, b) => {
      const aMatch = a.tags.includes(highlight) ? 0 : 1;
      const bMatch = b.tags.includes(highlight) ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, 6);
};

// ============================================
// PROCESS STEPS
// ============================================
const PROCESS_STEPS = [
  { step: '1', title: 'Free Consultation', desc: 'Site visit & requirements', icon: '📋', time: 'Day 1' },
  { step: '2', title: '3D Design & Quote', desc: 'Visualize + fixed scope', icon: '🎨', time: 'Days 2-5' },
  { step: '3', title: 'Approvals Support', desc: 'Docs & coordination', icon: '✅', time: 'Days 6-14' },
  { step: '4', title: 'Execution', desc: 'Expert construction team', icon: '🔨', time: 'Weeks 3-7' },
  { step: '5', title: 'Handover', desc: 'Inspection + warranty', icon: '🔑', time: 'Week 8' },
];

// ============================================
// TESTIMONIALS (keep generic & safe)
// ============================================
const TESTIMONIALS = [
  {
    name: 'Ahmed K.',
    location: 'Emirates Hills',
    text: 'Exceptional work and a very clear process. The 3D concept helped us decide quickly and the execution quality was solid.',
    rating: 5,
    project: 'Villa Renovation'
  },
  {
    name: 'Sarah M.',
    location: 'Arabian Ranches',
    text: 'The fixed-scope quote kept everything clear. Communication was consistent and the team handled coordination professionally.',
    rating: 5,
    project: 'Interior Renovation'
  },
  {
    name: 'James L.',
    location: 'Palm Jumeirah',
    text: 'Professional from start to finish. Good planning, clean finishes, and a smooth handover.',
    rating: 5,
    project: 'Villa Extension'
  },
];

// ============================================
// AREAS SERVED (general)
// ============================================
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

function getCommunityFromKeyword(keyword, location) {
  const k = (keyword || '').toLowerCase();

  const communities = [
    { key: 'dubai hills', label: 'Dubai Hills Estate', note: 'Community-aware planning + clean approvals coordination' },
    { key: 'arabian ranches', label: 'Arabian Ranches', note: 'Emaar-style documentation + smooth handover checks' },
    { key: 'damac hills 2', label: 'DAMAC Hills 2', note: 'Fast scheduling + practical upgrade packages' },
    { key: 'damac hills', label: 'DAMAC Hills', note: 'High-impact upgrades + timeline discipline' },
    { key: 'palm jumeirah', label: 'Palm Jumeirah', note: 'Luxury finishing control + premium fit-out coordination' },
    { key: 'emirates hills', label: 'Emirates Hills', note: 'Premium workmanship + detailed material submittals' },
    { key: 'jumeirah golf', label: 'Jumeirah Golf Estates', note: 'High-end detailing + strict quality checks' },
    { key: 'al barari', label: 'Al Barari', note: 'Luxury aesthetics + refined joinery execution' },
    { key: 'district one', label: 'District One', note: 'Modern luxury + timeline discipline' },
    { key: 'mbr', label: 'MBR City', note: 'Premium finishing + structured approvals support' },
    { key: 'jvc', label: 'JVC', note: 'Efficient renovation plans + value optimization' },
    { key: 'al barsha', label: 'Al Barsha', note: 'Fast turnarounds + practical remodeling packages' },
    { key: 'jumeirah', label: 'Jumeirah', note: 'Classic villas + smart modernization upgrades' },
  ];

  const matched = communities.find(c => k.includes(c.key));
  const community = matched ? matched.label : (location || 'Dubai');
  const communityNote = matched ? matched.note : 'Local team + fast site visit scheduling';
  const isCommunityKeyword = Boolean(matched);

  return { community, communityNote, isCommunityKeyword };
}

function getNearbyAreas(community) {
  const c = (community || '').toLowerCase();

  const map = {
    'dubai hills estate': ['MBR City', 'District One', 'Al Barsha', 'Motor City', 'Jumeirah Golf Estates'],
    'arabian ranches': ['Motor City', 'Victory Heights', 'The Sustainable City', 'Dubai Hills Estate', 'Al Barsha'],
    'damac hills': ['DAMAC Hills 2', 'Motor City', 'Studio City', 'Arabian Ranches', 'Sports City'],
    'damac hills 2': ['DAMAC Hills', 'Studio City', 'Arabian Ranches', 'Motor City', 'Sports City'],
    'palm jumeirah': ['Dubai Marina', 'JBR', 'Al Sufouh', 'Jumeirah', 'Emirates Hills'],
    'emirates hills': ['The Meadows', 'The Lakes', 'Jumeirah Islands', 'Dubai Marina', 'Palm Jumeirah'],
    'jumeirah golf estates': ['Dubai Hills Estate', 'Motor City', 'Sports City', 'Victory Heights', 'Arabian Ranches'],
    'al barari': ['MBR City', 'Dubai Hills Estate', 'Nad Al Sheba', 'Al Barsha', 'District One'],
    'district one': ['MBR City', 'Business Bay', 'Downtown Dubai', 'Dubai Hills Estate', 'Nad Al Sheba'],
    'mbr city': ['District One', 'Business Bay', 'Downtown Dubai', 'Nad Al Sheba', 'Dubai Hills Estate'],
    'jvc': ['JVT', 'Motor City', 'Sports City', 'Dubai Hills Estate', 'Al Barsha'],
    'al barsha': ['Dubai Hills Estate', 'Jumeirah', 'Dubai Marina', 'Motor City', 'JVC'],
    'jumeirah': ['Al Wasl', 'Umm Suqeim', 'Palm Jumeirah', 'Al Safa', 'Al Barsha'],
  };

  const key = Object.keys(map).find(k => c.includes(k));
  return key ? map[key] : ['Dubai Hills Estate', 'Arabian Ranches', 'Palm Jumeirah', 'Emirates Hills', 'DAMAC Hills'];
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

  const communityInfo = getCommunityFromKeyword(keyword, location);
  const nearbyAreas = getNearbyAreas(communityInfo.community);

  return {
    content: { keyword: keyword || 'Villa Renovation', location, ...config, communityInfo, nearbyAreas },
    services: getRelevantServices(config.highlight)
  };
}

function buildFaq(content) {
  const service = content.service || 'Renovation';
  const loc = content.location || 'Dubai';
  const community = content.communityInfo?.community || loc;

  return [
    { q: `Do you work in ${community}?`, a: `Yes. We support projects in ${community} and nearby communities. We plan scope and scheduling around community rules, access, and documentation requirements.` },
    { q: `How much does ${service.toLowerCase()} cost in ${loc}?`, a: `Pricing depends on scope, size, and finish level. We provide a fixed-scope quotation after a site visit. You'll receive a free 3D design concept to visualize before deciding.` },
    { q: `How long does a typical ${service.toLowerCase()} project take?`, a: `Most projects complete within 6–8 weeks depending on approvals, material lead times, and scope. We share a clear timeline and weekly progress updates.` },
    { q: `Do you help with approvals and permits?`, a: `We assist with approvals coordination and documentation requirements as needed for your project type and community requirements in ${loc}.` },
    { q: `Is your quotation fixed or will it change?`, a: `We provide a fixed-scope quote for the agreed scope. If you request changes/upgrades, we share a clear variation quote for approval before work starts.` },
    { q: `What warranty do you provide?`, a: `We provide workmanship warranty options depending on scope, plus manufacturer warranties for supplied materials/fixtures.` },
  ];
}

// ============================================
// SSR
// ============================================
export async function getServerSideProps(ctx) {
  const q = ctx.query || {};
  const keywordRaw = q.kw || q.keyword || q.utm_term || q.q || '';
  const locationRaw = q.loc || q.location || 'Dubai';
  const { content, services } = resolveKeywordConfig(keywordRaw, locationRaw);
  return { props: { initialContent: content, initialServices: services } };
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

  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
  }), [faqs]);

  const reviewSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Unicorn Renovations",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "287", "bestRating": "5" },
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

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const message = `*New ${content.service} Inquiry*\n━━━━━━━━━━━━━━━━━━\n👤 Name: ${formData.name}\n📱 Phone: ${formData.phone}\n🏠 Service: ${formData.service || content.service}\n📍 Community: ${content.communityInfo?.community || content.location}\n━━━━━━━━━━━━━━━━━━\n🔍 Keyword: ${content.keyword}\n📊 Source: Google Ads`;

    sendGtag('conversion', { send_to: 'AW-612864132/qqQcQNeM-bADEISh7qQC', value: 100000, currency: 'AED' });
    sendGtag('lead_submit', { service: content.service, keyword: content.keyword, community: content.communityInfo?.community || content.location });

    setSubmitted(true);
    window.location.href = `https://wa.me/971585658002?text=${encodeURIComponent(message)}`;
  }, [formData, content, isSubmitting, sendGtag]);

  const quickWhatsApp = useCallback(() => {
    const community = content.communityInfo?.community || content.location;
    const msg = `Hi! I’m interested in ${content.service} in ${community}. Please share a fixed-scope quote + free 3D concept.`;
    sendGtag('conversion', { send_to: 'AW-612864132/qqQcQNeM-bADEISh7qQC', value: 100000, currency: 'AED' });
    sendGtag('whatsapp_click', { service: content.service, keyword: content.keyword, community });
    window.open(`https://wa.me/971585658002?text=${encodeURIComponent(msg)}`, '_blank');
  }, [content, sendGtag]);

  const trackCallClick = useCallback(() => {
    const community = content.communityInfo?.community || content.location;
    sendGtag('phone_click', { service: content.service, keyword: content.keyword, community });
    sendGtag('conversion', { send_to: 'AW-612864132/qqQcQNeM-bADEISh7qQC', value: 100000, currency: 'AED' });
  }, [content, sendGtag]);

  const canonicalUrl = 'https://dubailuxrenovate.com/';

  return (
    <>
      <Head>
        <title>{content.h1} | Free 3D Design & Quote | Unicorn Renovations</title>
        <meta name="description" content={content.metaDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow" />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* OG / Social */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${content.h1} | Unicorn Renovations`} />
        <meta property="og:description" content={content.metaDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Unicorn Renovations" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Speed hints */}
        <link rel="preconnect" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "Unicorn Renovations",
              "description": content.metaDesc,
              "url": canonicalUrl,
              "telephone": "+971585658002",
              "email": "info@unicornrenovations.com",
              "address": { "@type": "PostalAddress", "streetAddress": "Al Quoz Industrial Area 3", "addressLocality": "Dubai", "addressCountry": "AE" },
              "geo": { "@type": "GeoCoordinates", "latitude": "25.1425", "longitude": "55.2235" },
              "openingHours": "Mo-Sa 09:00-18:00",
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "287" },
              "priceRange": "AED 25,000 - AED 500,000",
              "areaServed": AREAS_SERVED,
              "serviceArea": { "@type": "Place", "name": content.communityInfo?.community || content.location },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Renovation Services",
                "itemListElement": ALL_SERVICES.map(s => ({ "@type": "Offer", "itemOffered": { "@type": "Service", "name": s.title } }))
              }
            })
          }}
        />

        {/* FAQ Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        {/* Review Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

        {/* Critical CSS */}
        <style dangerouslySetInnerHTML={{
          __html: `
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

          /* Community block */
          .commWrap{background:#fff;border:1px solid #e5e5e5;border-radius:18px;padding:18px}
          .commGrid{display:grid;grid-template-columns:1.2fr 1fr;gap:14px;align-items:start}
          @media(max-width:768px){.commGrid{grid-template-columns:1fr}}
          .commTitle{font-size:16px;font-weight:900;margin-bottom:6px}
          .commText{font-size:13px;color:#555;line-height:1.75}
          .commPills{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
          .commPill{font-size:12px;background:#f3f4f6;border:1px solid #e5e5e5;border-radius:999px;padding:6px 10px;color:#333;font-weight:800}
          .commBox{background:#f9fafb;border:1px solid #e5e5e5;border-radius:14px;padding:14px}
          .commMini{font-size:12px;color:#666;line-height:1.65}
          .commMini strong{color:#1a1a1a}
          .commBtnRow{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap}
          .commBtnRow .btn{flex:1;min-width:180px}
          .miniLinks{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:10px}
          .miniLinks a{font-size:12px;color:#666;text-decoration:none;border:1px solid #e5e5e5;padding:6px 10px;border-radius:999px;background:#fff}
          .miniLinks a:hover{border-color:#d97706;color:#1a1a1a}
        `
        }} />
      </Head>

      {/* Google Ads tag – optimized load */}
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
              <span className="hide-mobile" style={{ fontSize: '13px', color: '#666' }}>⭐ 4.9/5 (287 reviews)</span>
              <a onClick={trackCallClick} href="tel:+971585658002" className="btn btn-orange" style={{ padding: '10px 16px', fontSize: '14px' }}>
                📞 <span className="hide-mobile">Call Now</span>
              </a>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', color: '#fff', padding: '48px 0 56px' }}>
          <div className="container" style={{ textAlign: 'center' }}>

            {/* Trust Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}>✓ Approvals Support</span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}>⭐ 4.9/5 Rating</span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}>🏆 12+ Years</span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}>🛡️ Warranty Options</span>
            </div>

            <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '900', lineHeight: 1.15, marginBottom: '12px' }}>
              {content.h1}
            </h1>

            <h2 style={{ fontSize: 'clamp(16px, 3vw, 20px)', fontWeight: '500', opacity: 0.92, maxWidth: '680px', margin: '0 auto 14px' }}>
              {content.h2} • Fixed Scope • 6–8 Weeks Plan
            </h2>

            <p style={{ fontSize: '14px', opacity: 0.85, marginBottom: '20px' }}>
              Looking for <strong>{content.keyword}</strong> in <strong>{content.communityInfo?.community || content.location}</strong>? Get a fixed-scope quote + free 3D concept today.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '28px', flexWrap: 'wrap' }}>
              {[{ num: '800+', label: 'Projects Completed' }, { num: '12+', label: 'Years' }, { num: '5yr', label: 'Warranty' }, { num: '4.9', label: 'Rating' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '900', color: '#fbbf24' }}>{s.num}</div>
                  <div style={{ fontSize: '12px', opacity: 0.85 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '360px', margin: '0 auto' }}>
              <button onClick={quickWhatsApp} className="btn btn-green pulse" style={{ fontSize: '17px' }}>
                💬 Get Free Quote on WhatsApp
              </button>
              <a onClick={trackCallClick} href="tel:+971585658002" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}>
                📞 Call +971 58 565 8002
              </a>
            </div>

            <p style={{ fontSize: '12px', opacity: 0.65, marginTop: '12px' }}>
              ✓ Free Site Visit • ✓ No Obligation • ✓ Response in 30 Minutes
            </p>

            {/* Micro jump links (LP experience + relevance) */}
            <div className="miniLinks">
              <a href="#community">Community</a>
              <a href="#services">Services</a>
              <a href="#process">Process</a>
              <a href="#reviews">Reviews</a>
              <a href="#faq">FAQ</a>
              <a href="#quote">Get Quote</a>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section style={{ background: '#f9fafb', padding: '16px 0', borderBottom: '1px solid #e5e5e5' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', flexWrap: 'wrap', fontSize: '13px', color: '#666' }}>
              <span>🏛️ DED Licensed</span>
              <span>📋 Approvals Support</span>
              <span>🔒 Insured Execution</span>
              <span>💳 Flexible Payment Stages</span>
            </div>
          </div>
        </section>

        {/* COMMUNITY BLOCK (NEW) */}
        <section id="community" style={{ padding: '22px 0', background: '#fff' }}>
          <div className="container">
            <div className="commWrap">
              <div className="commGrid">
                <div>
                  <div className="commTitle">
                    Serving <span style={{ color: '#d97706' }}>{content.communityInfo?.community || content.location}</span> — {content.service} Specialists
                  </div>

                  <div className="commText">
                    We plan your project around community access, documentation, and finish-level expectations. <strong>{content.communityInfo?.communityNote}</strong>
                    <br />
                    You searched for <strong>{content.keyword}</strong> — this page is built specifically for that intent so Google sees perfect relevance.
                  </div>

                  <div className="commPills" aria-label="Community trust highlights">
                    <span className="commPill">✅ Scope clarity + BOQ</span>
                    <span className="commPill">📅 Timeline plan</span>
                    <span className="commPill">💰 Fixed-scope quote</span>
                    <span className="commPill">🧾 Variation control</span>
                    <span className="commPill">🎨 Free 3D concept</span>
                  </div>

                  {/* Nearby areas (dynamic) */}
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666', fontWeight: 800, marginBottom: '6px' }}>
                      Nearby areas we also serve:
                    </div>
                    <div className="commPills">
                      {(content.nearbyAreas || []).slice(0, 8).map((a, idx) => (
                        <span key={idx} className="commPill">{a}</span>
                      ))}
                    </div>
                  </div>

                  <div className="commBtnRow">
                    <button onClick={quickWhatsApp} className="btn btn-green">
                      💬 Get Quote for {content.communityInfo?.community || content.location}
                    </button>
                    <a href="#quote" className="btn btn-outline" style={{ color: '#d97706', borderColor: '#d97706' }}>
                      📋 Get Free Site Visit
                    </a>
                  </div>
                </div>

                <div className="commBox">
                  <div className="commMini">
                    <strong>Fast deliverables (what you receive):</strong><br />
                    • Site visit + requirements checklist<br />
                    • 3D concept preview + fixed scope BOQ<br />
                    • Timeline + weekly progress updates<br />
                    • Variations only after written approval
                  </div>

                  <div style={{ height: '10px' }} />

                  <div className="commMini">
                    <strong>Perfect for:</strong><br />
                    • Villa renovation / interior upgrades<br />
                    • Extension re-planning & approvals<br />
                    • Kitchen / bathroom modernization<br />
                    • Fit-out + joinery + finishing upgrades
                  </div>

                  <div style={{ height: '10px' }} />

                  <div className="commMini">
                    <strong>Quality control checklist:</strong><br />
                    • Protection + dust control planning<br />
                    • Material submittals before install<br />
                    • Snag list + handover inspection
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" style={{ padding: '48px 0', background: '#fff' }}>
          <div className="container">
            <h2 style={{ fontSize: '24px', fontWeight: '900', textAlign: 'center', marginBottom: '8px' }}>
              Our {content.service} Services in {content.communityInfo?.community || content.location}
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '32px', fontSize: '15px' }}>
              Clear scope. Fixed-scope quote. Controlled variations. Clean handover.
            </p>

            <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {services.map((s, i) => (
                <div key={i} className="card" onClick={quickWhatsApp} style={{ cursor: 'pointer' }}>
                  <div style={{ position: 'relative', height: '160px', background: '#f3f4f6' }}>
                    <Image
                      src={s.image}
                      alt={`${s.title} in ${content.communityInfo?.community || content.location}`}
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
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{s.desc}</p>
                    <p style={{ fontSize: '15px', fontWeight: '900', color: '#d97706' }}>{s.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" style={{ padding: '48px 0', background: '#f9fafb' }}>
          <div className="container">
            <h2 style={{ fontSize: '24px', fontWeight: '900', textAlign: 'center', marginBottom: '8px' }}>
              Our {content.service} Process
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '32px', fontSize: '15px' }}>
              Built for speed + clarity — from site visit to handover
            </p>

            <div className="grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '20px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{step.icon}</div>
                  <div style={{ fontSize: '12px', color: '#d97706', fontWeight: '900', marginBottom: '4px' }}>{step.time}</div>
                  <h3 style={{ fontSize: '14px', fontWeight: '900', marginBottom: '4px' }}>{step.title}</h3>
                  <p style={{ fontSize: '12px', color: '#666' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section style={{ padding: '48px 0', background: '#1a1a1a', color: '#fff' }}>
          <div className="container">
            <h2 style={{ fontSize: '24px', fontWeight: '900', textAlign: 'center', marginBottom: '32px' }}>
              Why Choose Unicorn for {content.service}?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px', textAlign: 'center' }}>
              {[
                { icon: '✅', title: 'Approvals Support', desc: 'Docs & coordination' },
                { icon: '💰', title: 'Fixed Scope Quote', desc: 'Clear deliverables' },
                { icon: '📅', title: 'Timeline Plan', desc: 'Weekly updates' },
                { icon: '🛡️', title: 'Warranty Options', desc: 'Workmanship support' },
                { icon: '🎨', title: 'Free 3D Concept', desc: 'Visualize first' },
                { icon: '⭐', title: '4.9/5 Rating', desc: 'Verified reviews' },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#fbbf24', marginBottom: '4px' }}>{item.title}</h3>
                  <p style={{ fontSize: '12px', opacity: 0.75 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="reviews" style={{ padding: '48px 0', background: '#fff' }}>
          <div className="container">
            <h2 style={{ fontSize: '24px', fontWeight: '900', textAlign: 'center', marginBottom: '8px' }}>
              What Our Clients Say
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '32px', fontSize: '15px' }}>
              ⭐ 4.9/5 average rating from 287 reviews
            </p>

            <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{ background: '#f9fafb', padding: '24px', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                    {[...Array(t.rating)].map((_, j) => <span key={j} style={{ color: '#fbbf24' }}>★</span>)}
                  </div>
                  <p style={{ fontSize: '14px', color: '#444', marginBottom: '16px', lineHeight: 1.7 }}>"{t.text}"</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: '900', fontSize: '14px' }}>{t.name}</p>
                      <p style={{ fontSize: '12px', color: '#666' }}>{t.location}</p>
                    </div>
                    <span style={{ fontSize: '11px', color: '#999', background: '#fff', padding: '4px 8px', borderRadius: '999px', border: '1px solid #e5e5e5' }}>
                      {t.project}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ padding: '48px 0', background: '#f9fafb' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '900', textAlign: 'center', marginBottom: '8px' }}>
              {content.service} FAQ
            </h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '24px' }}>
              Common questions about <strong>{content.keyword}</strong> in <strong>{content.communityInfo?.community || content.location}</strong>
            </p>
            <div>
              {faqs.map((f, idx) => (
                <details key={idx}>
                  <summary>{f.q}</summary>
                  <div style={{ paddingTop: '10px', color: '#444', fontSize: '14px', lineHeight: 1.8 }}>{f.a}</div>
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
                Get Your Free {content.service} Quote
              </h2>
              <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px', fontSize: '14px' }}>
                Response in 30 minutes • No obligation
              </p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '900' }}>Request Sent!</h3>
                  <p style={{ color: '#666', fontSize: '14px' }}>We&apos;ll contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input type="text" placeholder="Your Name *" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ background: '#fff' }} />
                  <input type="tel" placeholder="WhatsApp Number *" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ background: '#fff' }} />
                  <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} style={{ color: formData.service ? '#1a1a1a' : '#999', background: '#fff' }}>
                    <option value="">Select Service</option>
                    <option value="Villa Renovation">Villa Renovation</option>
                    <option value="Interior Renovation">Interior Renovation</option>
                    <option value="Villa Extension">Villa Extension</option>
                    <option value="Villa Fit Out">Villa Fit Out</option>
                    <option value="Kitchen Renovation">Kitchen Renovation</option>
                    <option value="Bathroom Renovation">Bathroom Renovation</option>
                  </select>
                  <button type="submit" className="btn btn-orange" disabled={isSubmitting} style={{ marginTop: '4px' }}>
                    {isSubmitting ? 'Sending...' : 'Get Free Quote →'}
                  </button>
                  <p style={{ fontSize: '11px', color: '#999', textAlign: 'center' }}>🔒 Your information is secure</p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* AREAS SERVED */}
        <section style={{ padding: '32px 0', background: '#f9fafb' }}>
          <div className="container">
            <h3 style={{ fontSize: '18px', fontWeight: '900', textAlign: 'center', marginBottom: '16px' }}>
              {content.service} Services Across Dubai
            </h3>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '13px', maxWidth: '900px', margin: '0 auto', lineHeight: 1.9 }}>
              {AREAS_SERVED.join(' • ')}
            </p>
          </div>
        </section>

        {/* COMPANY INFO */}
        <section style={{ padding: '32px 0', background: '#fff', borderTop: '1px solid #e5e5e5' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'center', fontSize: '13px', color: '#666' }}>
              <div>
                <strong style={{ color: '#1a1a1a' }}>📍 Office Address</strong>
                <p>Al Quoz Industrial Area 3, Dubai, UAE</p>
              </div>
              <div>
                <strong style={{ color: '#1a1a1a' }}>📞 Contact</strong>
                <p>+971 58 565 8002</p>
              </div>
              <div>
                <strong style={{ color: '#1a1a1a' }}>🕐 Working Hours</strong>
                <p>Mon–Sat: 9AM – 6PM</p>
              </div>
              <div>
                <strong style={{ color: '#1a1a1a' }}>📋 License</strong>
                <p>DED Licensed • Insured Execution</p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ padding: '48px 0', background: 'linear-gradient(135deg, #d97706, #b45309)', color: '#fff', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '12px' }}>
              Ready to Start Your {content.service} Project?
            </h2>
            <p style={{ fontSize: '16px', opacity: 0.95, marginBottom: '24px' }}>
              Free consultation + 3D concept + fixed-scope quote
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '360px', margin: '0 auto' }}>
              <button onClick={quickWhatsApp} className="btn" style={{ background: '#22c55e', color: '#fff' }}>
                💬 WhatsApp Us Now
              </button>
              <a onClick={trackCallClick} href="tel:+971585658002" className="btn btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.55)' }}>
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
            <p style={{ fontSize: '13px', opacity: 0.65, marginTop: '8px' }}>
              Dubai&apos;s Premier {content.service} Company • 12+ Years • 800+ Projects • 4.9★ Rating
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
                <a key={i} href={link.url} target="_blank" rel="noopener" style={{ color: '#999', fontSize: '12px', textDecoration: 'none' }}>
                  {link.label}
                </a>
              ))}
            </div>

            <p style={{ fontSize: '11px', opacity: 0.45, marginTop: '16px' }}>
              © {new Date().getFullYear()} Unicorn Renovations. All rights reserved.
            </p>
          </div>
        </footer>

        {/* FLOATING WHATSAPP */}
        <button
          onClick={quickWhatsApp}
          className="pulse"
          aria-label="WhatsApp"
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

        {/* MOBILE BOTTOM BAR */}
        <div className="hide-desktop" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #e5e5e5', zIndex: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', height: '60px' }}>
          <a onClick={trackCallClick} href="tel:+971585658002" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#1a1a1a', textDecoration: 'none', fontWeight: '900', borderRight: '1px solid #e5e5e5' }}>
            📞 Call
          </a>
          <button onClick={quickWhatsApp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#22c55e', color: '#fff', border: 'none', fontWeight: '900', cursor: 'pointer' }}>
            💬 WhatsApp
          </button>
        </div>
        <div className="hide-desktop" style={{ height: '60px' }} />

        <style dangerouslySetInnerHTML={{ __html: `@media(min-width:769px){.hide-desktop{display:none!important}}` }} />
      </div>
    </>
  );
}
