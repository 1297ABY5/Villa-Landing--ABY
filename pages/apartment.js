// pages/apartment.js - APARTMENT RENOVATION LANDING PAGE v1.1
// High-converting page optimized for apartment renovation keywords
// ✅ Clean short tracking code (Ref: XXXXXX only)
// Adapted from villa v3.8 with apartment-specific content, pricing, areas, testimonials

import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import { useState, useMemo, useEffect, useRef } from 'react';

// ============================================
// FONTS - Ultra Luxury + Modern
// Cormorant Garamond: High-end editorial, thin elegant strokes
// Plus Jakarta Sans: Premium modern, clean luxury feel
// ============================================
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// ============================================
// WHATSAPP CONFIGURATION
// ============================================
const WHATSAPP_NUMBER = '971585658002';

const WHATSAPP_MESSAGES = {
  hero: (service, location) => 
    `Hi! 👋 I'm interested in ${service} services in ${location}. Can we discuss my apartment project?`,
  
  service: (serviceName, price) => 
    `Hi! I'm interested in *${serviceName}* (${price}). Can you tell me more about this for my apartment?`,
  
  testimonial: (clientName, project) => 
    `Hi! I just read ${clientName}'s review about their ${project}. I'd love similar results for my apartment!`,
  
  videoTestimonial: (clientName, location) => 
    `Hi! I watched ${clientName}'s video testimonial from ${location}. Very impressive! I'd like to discuss my apartment.`,
  
  process: (stepName) => 
    `Hi! I'd like to start the *${stepName}* phase for my apartment renovation. What's the next step?`,
  
  faq: (question) => 
    `Hi! I have a question about apartment renovation: "${question}"`,
  
  area: (areaName) => 
    `Hi! I have an apartment in *${areaName}* and I'm interested in renovation services. Do you work in this building/area?`,
  
  pricing: (service) => 
    `Hi! I'd like to get a *fixed price quote* for ${service} in my apartment.`,
  
  warranty: () => 
    `Hi! I'm interested in your *5-year warranty* for apartment renovations. Can you explain what's covered?`,
  
  urgency: (slotsLeft) => 
    `Hi! I saw you have only ${slotsLeft} consultation slots left. I'd like to book one for my apartment!`,
  
  trustBadge: (badge) => 
    `Hi! I noticed you're ${badge}. Can you tell me more about your apartment renovation credentials?`,
  
  whyChooseUs: (feature) => 
    `Hi! I'm interested in your ${feature} for apartment projects. Can you tell me more?`,
  
  exitIntent: (service) => 
    `Hi! I was just browsing your ${service} page. Before I go, can you tell me about your free apartment consultation?`,
  
  sticky: (isHot) => 
    isHot 
      ? `Hi! 🔥 I've been looking at your apartment renovation work and I'm VERY interested. Let's talk!`
      : `Hi! I have some questions about apartment renovation services.`,
  
  floatingButton: () => 
    `Hi! I'd like to discuss my apartment renovation project. Are you available to chat?`,
  
  callToAction: () => 
    `Hi! I'm ready to start my apartment transformation. What's the first step?`,
  
  qualified: (service, budget, timeline, apartmentSize) => 
    `Hi! I'm interested in *${service}*.\n\n📊 Budget: ${budget}\n⏰ Timeline: ${timeline}\n🏠 Size: ${apartmentSize}\n\nCan we discuss my apartment project?`,
  
  default: () => 
    `Hi! I'm interested in your apartment renovation services. Can we chat?`
};

const CONVERSION_VALUES = {
  hero: 3, service: 5, callToAction: 6, qualified: 8, testimonial: 4,
  videoTestimonial: 5, process: 3, area: 3, urgency: 5, sticky: 4,
  exitIntent: 3, floatingButton: 3, trustBadge: 2, whyChooseUs: 3,
  faq: 2, pricing: 5, warranty: 3, default: 1
};

// ============================================
// ATTRIBUTION TRACKING
// ============================================
const ATTR_EXPIRY_DAYS = 7;

function getAttribution() {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  const attr = {
    gclid: p.get('gclid') || '',
    wbraid: p.get('wbraid') || '',
    gbraid: p.get('gbraid') || '',
    utm_source: p.get('utm_source') || '',
    utm_campaign: p.get('utm_campaign') || '',
    utm_adgroup: p.get('utm_adgroup') || '',
    utm_term: p.get('utm_term') || p.get('kw') || p.get('keyword') || '',
    utm_content: p.get('utm_content') || '',
    loc: p.get('loc') || p.get('location') || 'Dubai',
    lp: 'apartment-v1.1',
    ts: Date.now(),
  };
  const hasNewParams = attr.gclid || attr.wbraid || attr.gbraid || attr.utm_source || attr.utm_campaign || attr.utm_term;
  if (hasNewParams) {
    try { 
      sessionStorage.setItem('unicorn_attr', JSON.stringify(attr)); 
      localStorage.setItem('unicorn_attr_persist', JSON.stringify(attr));
    } catch (e) {}
  }
  return attr;
}

function readAttribution() {
  if (typeof window === 'undefined') return {};
  try {
    const sessionAttr = sessionStorage.getItem('unicorn_attr');
    if (sessionAttr) return JSON.parse(sessionAttr);
    const persistAttr = localStorage.getItem('unicorn_attr_persist');
    if (persistAttr) {
      const parsed = JSON.parse(persistAttr);
      const ageMs = Date.now() - (parsed.ts || 0);
      const expiryMs = ATTR_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      if (ageMs < expiryMs) return parsed;
      localStorage.removeItem('unicorn_attr_persist');
    }
    return getAttribution();
  } catch (e) { return getAttribution(); }
}

function fireGtag(command, eventName, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function() { window.dataLayer.push(arguments); };
  }
  window.gtag(command, eventName, params);
}

function hasClickedWhatsApp() {
  try { return sessionStorage.getItem('wa_clicked') === '1'; } catch(e) { return false; }
}

// ============================================
// WHATSAPP OPENER - Clean short ref code
// ============================================
const openWhatsApp = (context, args = [], meta = {}) => {
  let message = WHATSAPP_MESSAGES.default();
  if (typeof WHATSAPP_MESSAGES[context] === 'function') {
    message = WHATSAPP_MESSAGES[context](...args);
  }
  
  const attr = readAttribution();
  const clickId = Math.random().toString(36).slice(2, 8).toUpperCase();
  
  // Store full tracking data locally for your reference
  try {
    const trackingData = {
      id: clickId,
      context,
      keyword: attr.utm_term || '',
      gclid: attr.gclid || '',
      wbraid: attr.wbraid || '',
      gbraid: attr.gbraid || '',
      campaign: attr.utm_campaign || '',
      page: attr.lp || 'apartment',
      time: new Date().toISOString()
    };
    const existing = JSON.parse(localStorage.getItem('unicorn_leads') || '[]');
    existing.push(trackingData);
    localStorage.setItem('unicorn_leads', JSON.stringify(existing.slice(-100)));
  } catch(e) {}
  
  // Clean short footer for customer
  const trackingFooter = `\n\n— Ref: ${clickId}`;
  message += trackingFooter;
  
  const value = CONVERSION_VALUES[context] || CONVERSION_VALUES.default;
  fireGtag('event', 'conversion', {
    send_to: 'AW-612864132/qqQcQNeM-bADEISh7qQC',
    value: value,
    currency: 'AED',
    event_category: 'WhatsApp',
    event_label: context,
    gclid: attr.gclid || undefined,
    wbraid: attr.wbraid || undefined,
    gbraid: attr.gbraid || undefined,
    ...meta
  });
  fireGtag('event', 'whatsapp_click', { click_context: context, click_id: clickId, click_value: value });
  try { sessionStorage.setItem('wa_clicked', '1'); } catch(e) {}
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
};

// ============================================
// CLICKABLE CARD
// ============================================
function ClickableCard({ children, onClick, className = '', style = {}, ariaLabel = '' }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); }
  };
  return (
    <div role="button" tabIndex={0} onClick={onClick} onKeyDown={handleKeyDown} aria-label={ariaLabel} className={`clickable-card ${className}`} style={{ cursor: 'pointer', ...style }}>
      {children}
    </div>
  );
}

// ============================================
// APARTMENT-SPECIFIC KEYWORD MAPPING
// ============================================
const KEYWORD_MAP = {
  'apartment renovation dubai': {
    h1: 'Apartment Renovation Dubai',
    h2: 'Transform Your Urban Living Space',
    service: 'Apartment Renovation',
    highlight: 'apartment',
    metaDesc: 'Premium apartment renovation in Dubai. Studio to penthouse. NOC & building approvals handled. Complimentary 3D design.',
  },
  'apartment renovation': {
    h1: 'Apartment Renovation Dubai',
    h2: 'Elevate Your City Living',
    service: 'Apartment Renovation',
    highlight: 'apartment',
    metaDesc: 'Luxury apartment renovation Dubai. Kitchen, bathroom, full remodel. Fixed pricing. 4-6 weeks delivery.',
  },
  'flat renovation dubai': {
    h1: 'Flat Renovation Dubai',
    h2: 'Modern Living, Masterfully Crafted',
    service: 'Flat Renovation',
    highlight: 'apartment',
    metaDesc: 'Expert flat renovation in Dubai. All sizes from studio to 4BR. Building approvals included.',
  },
  'apartment interior design dubai': {
    h1: 'Apartment Interior Design Dubai',
    h2: 'Bespoke Interiors for Urban Living',
    service: 'Apartment Interior Design',
    highlight: 'interior',
    metaDesc: 'Luxury apartment interior design Dubai. Space optimization experts. Free 3D visualization.',
  },
  'studio renovation dubai': {
    h1: 'Studio Apartment Renovation Dubai',
    h2: 'Maximize Every Square Foot',
    service: 'Studio Renovation',
    highlight: 'studio',
    metaDesc: 'Smart studio apartment renovation Dubai. Space-saving solutions. From AED 25,000.',
  },
  'penthouse renovation dubai': {
    h1: 'Penthouse Renovation Dubai',
    h2: 'Luxury Living at the Top',
    service: 'Penthouse Renovation',
    highlight: 'penthouse',
    metaDesc: 'Ultra-luxury penthouse renovation Dubai. Bespoke design. Premium finishes. White-glove service.',
  },
  'kitchen renovation apartment': {
    h1: 'Apartment Kitchen Renovation Dubai',
    h2: 'Culinary Spaces for Modern City Living',
    service: 'Kitchen Renovation',
    highlight: 'kitchen',
    metaDesc: 'Apartment kitchen renovation Dubai. Space-optimized designs. German fittings. From AED 35,000.',
  },
  'bathroom renovation apartment': {
    h1: 'Apartment Bathroom Renovation Dubai',
    h2: 'Spa-Inspired Urban Sanctuaries',
    service: 'Bathroom Renovation',
    highlight: 'bathroom',
    metaDesc: 'Apartment bathroom renovation Dubai. Premium finishes. Waterproofing guaranteed. From AED 18,000.',
  },
  'downtown dubai apartment renovation': {
    h1: 'Downtown Dubai Apartment Renovation',
    h2: 'Iconic Living, Exceptional Design',
    service: 'Apartment Renovation',
    highlight: 'location',
    metaDesc: 'Downtown Dubai apartment renovation specialists. Burj Khalifa views preserved. Building approved.',
  },
  'dubai marina apartment renovation': {
    h1: 'Dubai Marina Apartment Renovation',
    h2: 'Waterfront Living, Reimagined',
    service: 'Apartment Renovation',
    highlight: 'location',
    metaDesc: 'Dubai Marina apartment renovation. Tower-approved contractors. Complimentary consultation.',
  },
  'jbr apartment renovation': {
    h1: 'JBR Apartment Renovation Dubai',
    h2: 'Beachfront Living, Elevated',
    service: 'Apartment Renovation',
    highlight: 'location',
    metaDesc: 'JBR apartment renovation specialists. Beach lifestyle designs. NOC handling included.',
  },
  default: {
    h1: 'Apartment Renovation Dubai',
    h2: 'Urban Living, Masterfully Transformed',
    service: 'Apartment Renovation',
    highlight: 'apartment',
    metaDesc: 'Premier apartment renovation in Dubai. Studio to penthouse. Fixed pricing. Free 3D design.',
  },
};

// ============================================
// APARTMENT SERVICES (Different pricing than villas)
// ============================================
const APARTMENT_SERVICES = [
  { id: 'full-apartment', title: 'Full Apartment Renovation', desc: 'Complete transformation from floor to ceiling', price: 'From AED 60,000', image: '/ap1.jpg', tags: ['apartment', 'full'] },
  { id: 'kitchen', title: 'Kitchen Renovation', desc: 'Space-optimized culinary spaces for city living', price: 'From AED 35,000', image: '/v16.webp', tags: ['kitchen', 'apartment'] },
  { id: 'bathroom', title: 'Bathroom Renovation', desc: 'Spa-inspired sanctuaries with waterproofing guarantee', price: 'From AED 18,000', image: '/v12.webp', tags: ['bathroom', 'apartment'] },
  { id: 'studio', title: 'Studio Renovation', desc: 'Smart space solutions that maximize every foot', price: 'From AED 25,000', image: '/ap3.jpg', tags: ['studio', 'apartment'] },
  { id: 'living-dining', title: 'Living & Dining Makeover', desc: 'Open-plan designs for modern entertaining', price: 'From AED 28,000', image: '/ap2.jpg', tags: ['apartment', 'interior'] },
  { id: 'penthouse', title: 'Penthouse Renovation', desc: 'Ultra-luxury transformations at the top', price: 'From AED 150,000', image: '/ap4.jpg', tags: ['penthouse', 'luxury'] },
];

// ============================================
// APARTMENT-SPECIFIC PROCESS
// ============================================
const PROCESS_STEPS = [
  { step: '01', title: 'Free Consultation', desc: 'Site visit & building requirements check', icon: '🏢', time: 'Day 1', cta: 'Book Free Visit' },
  { step: '02', title: 'NOC & Approvals', desc: 'Building management paperwork handled', icon: '📋', time: 'Days 2-5', cta: 'Learn More' },
  { step: '03', title: '3D Design', desc: 'Visualize your new apartment in 3D', icon: '🎨', time: 'Days 6-10', cta: 'See Samples' },
  { step: '04', title: 'Renovation', desc: 'Neighbor-friendly work with daily cleanup', icon: '🔨', time: 'Weeks 2-5', cta: 'View Timeline' },
  { step: '05', title: 'Handover', desc: 'Final inspection & warranty activation', icon: '🔑', time: 'Week 6', cta: 'Start Now' },
];

// ============================================
// APARTMENT TESTIMONIALS
// ============================================
const TESTIMONIALS = [
  { 
    name: 'Priya Sharma', 
    location: 'Downtown Dubai', 
    text: 'Living in a high-rise, I was worried about the renovation process disturbing neighbors. Unicorn handled everything professionally - building approvals, noise management, and daily cleanup. My 2BR looks completely transformed!',
    rating: 5,
    project: '2BR Apartment Renovation',
    building: 'Burj Vista'
  },
  { 
    name: 'Michael & Emma Roberts', 
    location: 'Dubai Marina', 
    text: 'Our marina apartment had an outdated kitchen and bathrooms. The team maximized our space brilliantly - we gained so much storage! The 3D design was exactly what we got. Fixed price, no surprises.',
    rating: 5,
    project: 'Kitchen & 2 Bathrooms',
    building: 'Marina Gate'
  },
  { 
    name: 'Omar Al-Farsi', 
    location: 'JBR', 
    text: 'I bought a dated apartment in Rimal and needed a full renovation before moving in. They coordinated everything with building management, finished in 5 weeks, and the result is stunning. Worth every dirham!',
    rating: 5,
    project: 'Full Apartment Renovation',
    building: 'Rimal 4'
  },
];

// ============================================
// VIDEO TESTIMONIALS
// ============================================
const VIDEO_TESTIMONIALS = [
  { id: 'video-1', name: 'Sarah Ahmed', location: 'Business Bay', project: 'Studio Renovation', thumbnail: '/video-thumb-1.jpg', videoSrc: '/testimonial-1.mp4', duration: '0:06' },
  { id: 'video-2', name: 'David Chen', location: 'Downtown Dubai', project: '3BR Apartment', thumbnail: '/video-thumb-2.jpg', videoSrc: '/testimonial-2.mp4', duration: '0:06' },
  { id: 'video-3', name: 'Layla Hassan', location: 'Palm Jumeirah', project: 'Penthouse Remodel', thumbnail: '/video-thumb-3.jpg', videoSrc: '/testimonial-3.mp4', duration: '0:06' },
];

// ============================================
// APARTMENT-SPECIFIC TRUST BADGES
// ============================================
const TRUST_BADGES = [
  { icon: '🏢', title: 'Building Approved', desc: 'All tower requirements met', context: 'approved by building management' },
  { icon: '📋', title: 'NOC Handling', desc: 'We manage all paperwork', context: 'handling NOC approvals' },
  { icon: '🔇', title: 'Neighbor-Friendly', desc: 'Controlled work hours', context: 'neighbor-friendly renovation process' },
  { icon: '🛡️', title: '5-Year Warranty', desc: 'Complete peace of mind', context: '5-year warranty coverage' },
];

// ============================================
// WHY CHOOSE US - APARTMENT SPECIFIC
// ============================================
const WHY_CHOOSE_US = [
  { icon: '🏢', title: 'High-Rise Experts', desc: 'We understand tower regulations, elevator bookings, and building requirements', context: 'high-rise building expertise' },
  { icon: '📋', title: 'NOC & Approvals Handled', desc: 'All building management paperwork and permits managed by us', context: 'NOC and building approvals' },
  { icon: '🔇', title: 'Neighbor-Considerate', desc: 'Controlled work hours, daily cleanup, and noise management', context: 'neighbor-friendly work practices' },
  { icon: '💰', title: 'Fixed Price Guarantee', desc: 'Transparent pricing with no hidden costs or surprise additions', context: 'fixed pricing guarantee' },
  { icon: '📐', title: 'Space Optimization', desc: 'Maximize every square foot with smart storage solutions', context: 'space optimization expertise' },
  { icon: '🎨', title: 'Free 3D Design', desc: 'Visualize your transformed apartment before we start', context: 'free 3D visualization service' },
];

// ============================================
// AREAS SERVED - APARTMENT BUILDINGS/AREAS
// ============================================
const AREAS_SERVED = [
  'Downtown Dubai', 'Dubai Marina', 'JBR', 'Business Bay', 'DIFC',
  'Palm Jumeirah', 'City Walk', 'Dubai Hills', 'Jumeirah Village Circle',
  'Al Barsha', 'Jumeirah Lake Towers', 'Dubai Sports City', 'Motor City',
  'Discovery Gardens', 'International City', 'Dubai Silicon Oasis',
  'Mirdif', 'Al Nahda',
];

// ============================================
// APARTMENT SIZE OPTIONS (for qualifier)
// ============================================
const APARTMENT_SIZES = [
  { label: 'Studio', value: 'Studio apartment' },
  { label: '1 Bedroom', value: '1 Bedroom apartment' },
  { label: '2 Bedrooms', value: '2 Bedroom apartment' },
  { label: '3+ Bedrooms', value: '3+ Bedroom apartment' },
  { label: 'Penthouse', value: 'Penthouse' },
];

const BUDGETS = [
  { label: 'Under 50K', value: 'Under 50K AED' },
  { label: '50K – 100K', value: '50K-100K AED' },
  { label: '100K – 200K', value: '100K-200K AED' },
  { label: '200K+', value: '200K+ AED' },
];

const TIMELINES = [
  { label: 'ASAP', value: 'ASAP - Ready to start' },
  { label: '1-2 months', value: '1-2 months' },
  { label: '3-6 months', value: '3-6 months' },
  { label: 'Just exploring', value: 'Just exploring options' },
];

// ============================================
// SSR FUNCTIONS
// ============================================
function computeSlotsLeft() {
  const now = new Date();
  const dubaiOffset = 4 * 60;
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const dubaiMinutes = utcMinutes + dubaiOffset;
  const dubaiHour = Math.floor(dubaiMinutes / 60) % 24;
  if (dubaiHour >= 18) return 1;
  if (dubaiHour >= 14) return 2;
  if (dubaiHour >= 10) return 3;
  return 4;
}

function normalizeKeyword(raw) {
  return (raw || '').toString().toLowerCase().replace(/[+_-]/g, ' ').replace(/[\[\]"'{}]/g, '').trim();
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
  return { content: { keyword: keyword || 'Apartment Renovation', location, ...config } };
}

function buildFaq(content) {
  const service = content.service || 'Apartment Renovation';
  return [
    { q: `How much does ${service.toLowerCase()} cost in Dubai?`, a: `Investment varies based on apartment size and scope. Studios start from AED 25,000, 1-2BR from AED 45,000, and larger units from AED 80,000+. We provide a fixed-price proposal after a free site visit.` },
    { q: `How long does apartment renovation take?`, a: `Most apartment renovations complete in 4-6 weeks. Studios and single-room projects can be faster (2-3 weeks). We provide weekly updates throughout.` },
    { q: `Do you handle building approvals and NOC?`, a: `Yes! We manage all building management communications, NOC applications, and required approvals. This is included in our service at no extra charge.` },
    { q: `What about my neighbors during renovation?`, a: `We follow strict building regulations for work hours (typically 9am-6pm), conduct daily cleanup, and use noise-reducing methods where possible. Your neighbors will barely notice!` },
    { q: `Can you work while I'm living in the apartment?`, a: `Yes, we can phase the work room-by-room if needed. However, for full renovations, we recommend temporary accommodation for 4-6 weeks for the best results and your comfort.` },
    { q: `What warranty do you provide?`, a: `We provide a 5-year craftsmanship warranty covering all work, plus manufacturer warranties on appliances and materials.` },
  ];
}

export async function getServerSideProps(ctx) {
  const q = ctx.query || {};
  const keywordRaw = q.kw || q.keyword || q.utm_term || q.q || '';
  const locationRaw = q.loc || q.location || 'Dubai';
  const { content } = resolveKeywordConfig(keywordRaw, locationRaw);
  return { 
    props: { 
      initialContent: content,
      initialSlots: computeSlotsLeft(),
      currentYear: new Date().getFullYear(),
    } 
  };
}

// ============================================
// VIDEO CARD COMPONENT
// ============================================
function VideoCard({ video, onChatClick }) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="video-card">
      {isPlaying ? (
        <video src={video.videoSrc} poster={video.thumbnail} controls playsInline autoPlay style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <>
          <Image src={video.thumbnail} alt={`${video.name} testimonial`} fill sizes="320px" style={{ objectFit: 'cover' }} loading="lazy" quality={75} />
          <div className="video-overlay" />
          <div className="video-duration">▶ {video.duration}</div>
          <div className="video-project">{video.project}</div>
          <button onClick={() => setIsPlaying(true)} aria-label={`Play ${video.name}'s video`} className="video-play-btn">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <div className="video-info">
            <p className="video-name">{video.name}</p>
            <p className="video-location">📍 {video.location}</p>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================
// LEAD QUALIFIER MODAL - APARTMENT VERSION
// ============================================
function LeadQualifier({ service, price, onClose, onSubmit }) {
  const [apartmentSize, setApartmentSize] = useState(null);
  const [budget, setBudget] = useState(null);
  const [timeline, setTimeline] = useState(null);

  const handleSubmit = () => {
    if (apartmentSize && budget && timeline) {
      onSubmit(budget.value, timeline.value, apartmentSize.value);
    }
  };

  return (
    <>
      <div className="qualifier-backdrop" onClick={onClose} />
      <div className="qualifier-sheet" role="dialog" aria-modal="true">
        <div className="qualifier-handle" />
        <h3 className="qualifier-title">Quick Questions 🏢</h3>
        <p className="qualifier-subtitle">Help us prepare the perfect quote for your apartment</p>

        <p className="qualifier-label">🏠 Apartment Size</p>
        <div className="qualifier-chips">
          {APARTMENT_SIZES.map((s) => (
            <button key={s.label} onClick={() => setApartmentSize(s)} className={`qualifier-chip ${apartmentSize?.label === s.label ? 'selected' : ''}`}>{s.label}</button>
          ))}
        </div>

        <p className="qualifier-label">💰 Approximate Budget (AED)</p>
        <div className="qualifier-chips">
          {BUDGETS.map((b) => (
            <button key={b.label} onClick={() => setBudget(b)} className={`qualifier-chip ${budget?.label === b.label ? 'selected' : ''}`}>{b.label}</button>
          ))}
        </div>

        <p className="qualifier-label">⏰ When do you want to start?</p>
        <div className="qualifier-chips">
          {TIMELINES.map((t) => (
            <button key={t.label} onClick={() => setTimeline(t)} className={`qualifier-chip ${timeline?.label === t.label ? 'selected' : ''}`}>{t.label}</button>
          ))}
        </div>

        <button onClick={handleSubmit} disabled={!apartmentSize || !budget || !timeline} className={`qualifier-submit ${apartmentSize && budget && timeline ? 'active' : ''}`}>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          {apartmentSize && budget && timeline ? 'Chat on WhatsApp' : 'Select all options'}
        </button>

        <button onClick={() => { openWhatsApp('service', [service, price]); onClose(); }} className="qualifier-skip">Skip, just chat →</button>
      </div>
    </>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function ApartmentLandingPage({ initialContent, initialSlots, currentYear }) {
  const [slotsLeft] = useState(initialSlots);
  const [showExitSheet, setShowExitSheet] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [qualifier, setQualifier] = useState(null);
  const exitShown = useRef(false);

  const content = initialContent;
  const faqs = useMemo(() => buildFaq(content), [content]);
  const isHot = scrollPct >= 60;

  const handleBackgroundClick = (e) => {
    const interactive = ['BUTTON', 'A', 'INPUT', 'VIDEO', 'SVG', 'PATH'];
    if (interactive.includes(e.target.tagName)) return;
    if (e.target.closest('button, a, .clickable-card, .btn, video, .faq-q, .qualifier-sheet, .sheet')) return;
    openWhatsApp('floatingButton', []);
  };

  useEffect(() => { getAttribution(); }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable > 0) setScrollPct(Math.round((window.scrollY / scrollable) * 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!exitShown.current && !hasClickedWhatsApp() && typeof window !== 'undefined' && window.innerWidth < 768) {
        exitShown.current = true;
        setShowExitSheet(true);
      }
    }, 45000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouseOut = (e) => {
      if (exitShown.current || hasClickedWhatsApp()) return;
      if (scrollPct < 15) return;
      if (!e.relatedTarget && e.clientY < 50) {
        exitShown.current = true;
        setShowExitSheet(true);
      }
    };
    window.addEventListener('mouseout', handleMouseOut);
    return () => window.removeEventListener('mouseout', handleMouseOut);
  }, [scrollPct]);

  const handleQualifiedSubmit = (budget, timeline, apartmentSize) => {
    openWhatsApp('qualified', [qualifier.service, budget, timeline, apartmentSize]);
    setQualifier(null);
  };

  const handleServiceClick = (service) => {
    setQualifier({ service: service.title, price: service.price });
  };

  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
  }), [faqs]);

  return (
    <>
      <Head>
        <title>{content.h1} | Unicorn Renovations Dubai</title>
        <meta name="description" content={content.metaDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href="https://wa.me" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://dubailuxrenovate.com/apartment" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "name": "Unicorn Renovations - Apartment Specialists",
          "description": content.metaDesc,
          "url": "https://dubailuxrenovate.com/apartment",
          "telephone": "+971585658002",
          "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" },
          "areaServed": AREAS_SERVED,
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --gold: #c9a227;
            --gold-light: #d4af37;
            --gold-dark: #a68521;
            --charcoal: #1a1a1a;
            --charcoal-light: #2d2d2d;
            --cream: #faf8f5;
            --wa: #25D366;
            --wa-dark: #128c7e;
            --safe-b: env(safe-area-inset-bottom, 0px);
            --accent: #2563eb;
          }
          
          * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
          html { scroll-behavior: smooth; }
          body { font-family: var(--font-body), 'Plus Jakarta Sans', -apple-system, sans-serif; color: var(--charcoal); line-height: 1.6; background: #fff; -webkit-font-smoothing: antialiased; font-weight: 400; letter-spacing: -0.01em; }
          
          .font-display { font-family: var(--font-display), 'Cormorant Garamond', Georgia, serif; font-weight: 500; letter-spacing: 0.02em; }
          .c { width: 100%; padding: 0 12px; max-width: 1200px; margin: 0 auto; }
          
          .btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 52px; padding: 14px 28px; border-radius: 12px; font-size: 15px; font-weight: 600; border: none; cursor: pointer; transition: transform 0.15s; text-decoration: none; letter-spacing: 0.02em; }
          .btn:active { transform: scale(0.97); }
          .btn:focus-visible { outline: 3px solid var(--wa); outline-offset: 2px; }
          .btn-wa { background: linear-gradient(135deg, var(--wa) 0%, var(--wa-dark) 100%); color: #fff; box-shadow: 0 4px 16px rgba(37, 211, 102, 0.3); }
          
          .clickable-card { transition: transform 0.2s, box-shadow 0.2s; border-radius: 16px; background: #fff; border: 1px solid #f0f0f0; }
          .clickable-card:active { transform: scale(0.98); }
          .clickable-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
          
          section { padding: 40px 0; }
          h1 { font-size: 32px; font-weight: 400; line-height: 1.1; letter-spacing: 0.01em; }
          h2 { font-size: 26px; font-weight: 400; line-height: 1.15; letter-spacing: 0.01em; }
          h3 { font-size: 16px; font-weight: 600; letter-spacing: -0.01em; }
          
          .grid-2 { display: grid; grid-template-columns: 1fr; gap: 12px; }
          .grid-3 { display: grid; grid-template-columns: 1fr; gap: 12px; }
          .grid-4 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .grid-5 { display: grid; grid-template-columns: 1fr; gap: 12px; }
          .grid-6 { display: grid; grid-template-columns: 1fr; gap: 12px; }
          
          .areas-grid { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
          
          .sheet-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999; opacity: 0; pointer-events: none; transition: opacity 0.25s; }
          .sheet-bg.open { opacity: 1; pointer-events: auto; }
          .sheet { position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-radius: 24px 24px 0 0; padding: 24px 20px calc(24px + var(--safe-b)); z-index: 1000; transform: translateY(100%); transition: transform 0.3s ease; }
          .sheet.open { transform: translateY(0); }
          
          .sticky-b { position: fixed; bottom: 0; left: 0; right: 0; background: var(--charcoal); padding: 12px 16px calc(12px + var(--safe-b)); z-index: 100; display: flex; gap: 12px; }
          .sticky-b.hot { background: linear-gradient(135deg, var(--wa) 0%, var(--wa-dark) 100%); }
          
          .faq-item { border-bottom: 1px solid #eee; }
          .faq-q { padding: 20px 0; font-size: 16px; font-weight: 500; display: flex; justify-content: space-between; align-items: center; cursor: pointer; min-height: 60px; width: 100%; background: none; border: none; text-align: left; }
          .faq-a { padding: 0 0 20px; font-size: 15px; color: #666; line-height: 1.7; display: none; }
          .faq-a.open { display: block; }
          
          .video-card { position: relative; width: 100%; border-radius: 16px; overflow: hidden; background: #0a0a0a; aspect-ratio: 16/9; }
          .video-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%); }
          .video-duration { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.6); color: #fff; padding: 6px 12px; border-radius: 20px; font-size: 12px; }
          .video-project { position: absolute; top: 12px; left: 12px; background: var(--accent); color: #fff; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
          .video-play-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 72px; height: 72px; border-radius: 50%; background: var(--accent); border: none; display: flex; align-items: center; justify-content: center; padding-left: 4px; cursor: pointer; box-shadow: 0 8px 32px rgba(37, 99, 235, 0.4); }
          .video-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; color: #fff; }
          .video-name { font-weight: 600; font-size: 17px; margin-bottom: 4px; }
          .video-location { font-size: 13px; opacity: 0.85; }
          
          .qualifier-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 1000; backdrop-filter: blur(4px); }
          .qualifier-sheet { position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-radius: 24px 24px 0 0; padding: 24px 20px calc(24px + var(--safe-b)); z-index: 1001; max-height: 90vh; overflow: auto; }
          .qualifier-handle { width: 40px; height: 4px; background: #ddd; border-radius: 2px; margin: 0 auto 20px; }
          .qualifier-title { font-size: 20px; font-weight: 600; margin-bottom: 8px; text-align: center; }
          .qualifier-subtitle { color: #666; font-size: 14px; margin-bottom: 24px; text-align: center; }
          .qualifier-label { font-weight: 600; font-size: 14px; margin-bottom: 12px; }
          .qualifier-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
          .qualifier-chip { padding: 12px 16px; border-radius: 10px; border: 1px solid #ddd; background: #fff; font-size: 14px; cursor: pointer; min-height: 48px; transition: all 0.15s; }
          .qualifier-chip.selected { border: 2px solid var(--wa); background: rgba(37, 211, 102, 0.1); font-weight: 600; }
          .qualifier-submit { width: 100%; padding: 16px; border-radius: 12px; border: none; background: #ccc; color: #fff; font-size: 16px; font-weight: 600; cursor: not-allowed; min-height: 52px; display: flex; align-items: center; justify-content: center; gap: 8px; }
          .qualifier-submit.active { background: var(--wa); cursor: pointer; }
          .qualifier-skip { width: 100%; padding: 14px; margin-top: 12px; background: none; border: none; color: #666; font-size: 14px; cursor: pointer; }
          
          @keyframes wa-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); } 50% { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); } }
          .wa-pulse { animation: wa-pulse 2s infinite; }
          
          @media (min-width: 768px) {
            .c { padding: 0 24px; }
            section { padding: 80px 0; }
            h1 { font-size: 56px; font-weight: 400; }
            h2 { font-size: 42px; font-weight: 400; }
            .mobile-only { display: none !important; }
            .grid-2 { grid-template-columns: repeat(2, 1fr); gap: 24px; }
            .grid-3 { grid-template-columns: repeat(3, 1fr); gap: 32px; }
            .grid-4 { grid-template-columns: repeat(4, 1fr); gap: 24px; }
            .grid-5 { grid-template-columns: repeat(5, 1fr); gap: 20px; }
            .grid-6 { grid-template-columns: repeat(3, 1fr); gap: 24px; }
            .areas-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
            .sticky-b { display: none; }
          }
          @media (max-width: 767px) { .desktop-only { display: none !important; } }
        `}} />
      </Head>

      <Script id="gtag-stub" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;gtag('js',new Date());gtag('config','AW-612864132');`}
      </Script>
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-612864132" strategy="afterInteractive" />
      <Script id="clarity" strategy="lazyOnload">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "v5bkaisuew");`}
      </Script>

      <div className={`${jakarta.variable} ${cormorant.variable}`} style={{ paddingBottom: '80px', cursor: 'pointer' }} onClick={handleBackgroundClick}>
        
        {qualifier && (
          <LeadQualifier service={qualifier.service} price={qualifier.price} onClose={() => setQualifier(null)} onSubmit={handleQualifiedSubmit} />
        )}

        {/* EXIT SHEET */}
        <div className={`sheet-bg ${showExitSheet ? 'open' : ''}`} onClick={() => setShowExitSheet(false)} />
        <div className={`sheet ${showExitSheet ? 'open' : ''}`} role="dialog">
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '40px', height: '4px', background: '#ddd', borderRadius: '2px', margin: '0 auto 20px' }} />
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏢</div>
            <h3 className="font-display" style={{ fontSize: '24px', marginBottom: '8px' }}>Wait! Free Apartment Design</h3>
            <p style={{ color: '#666', marginBottom: '24px', fontSize: '15px' }}>Get a <strong>FREE 3D visualization</strong> of your dream apartment renovation</p>
            <button className="btn btn-wa wa-pulse" onClick={() => { openWhatsApp('exitIntent', [content.service]); setShowExitSheet(false); }} style={{ width: '100%' }}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Claim Free 3D Design
            </button>
            <button onClick={() => setShowExitSheet(false)} style={{ background: 'none', border: 'none', color: '#999', fontSize: '14px', padding: '14px', marginTop: '8px', cursor: 'pointer' }}>Maybe later</button>
          </div>
        </div>

        {/* URGENCY BAR */}
        <button onClick={() => openWhatsApp('urgency', [slotsLeft])} style={{ width: '100%', background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff', padding: '14px 16px', fontSize: '13px', cursor: 'pointer', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', border: 'none', flexWrap: 'wrap' }}>
          <span>🏢</span>
          <span>APARTMENT RENOVATION SPECIALISTS</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span><strong>Only {slotsLeft} Slots Left This Week</strong></span>
          <span style={{ background: 'var(--wa)', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>BOOK FREE VISIT →</span>
        </button>

        {/* HEADER */}
        <header style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', padding: '14px 0', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="c" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="https://unicornrenovations.com" style={{ textDecoration: 'none' }}>
              <span className="font-display" style={{ fontSize: '22px', fontWeight: '600', color: 'var(--charcoal)', letterSpacing: '2px' }}>UNICORN</span>
            </a>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span className="desktop-only" style={{ fontSize: '13px', color: '#888' }}>🏢 Apartment Experts</span>
              <button className="btn btn-wa" onClick={() => openWhatsApp('hero', [content.service, content.location])} style={{ padding: '10px 18px', minHeight: '44px', fontSize: '14px' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                <span className="desktop-only">Chat Now</span>
                <span className="mobile-only">💬</span>
              </button>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <Image src="/ap1.jpg" alt={content.h1} fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.25 }} priority quality={75} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,23,42,0.7) 0%, rgba(15,23,42,0.95) 100%)' }} />
          </div>

          <div className="c" style={{ position: 'relative', zIndex: 10, color: '#fff', paddingTop: '24px', paddingBottom: '40px' }}>
            <button onClick={() => openWhatsApp('trustBadge', ['apartment renovation specialists'])} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(37,99,235,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(37,99,235,0.3)', padding: '8px 14px', borderRadius: '30px', marginBottom: '16px', cursor: 'pointer', color: '#fff', fontSize: '12px' }}>
              <span>🏢</span>
              <span>Dubai's #1 Apartment Renovation Specialists</span>
            </button>

            <h1 className="font-display" style={{ fontSize: 'clamp(36px, 8vw, 72px)', fontWeight: '400', lineHeight: 1.05, marginBottom: '8px', letterSpacing: '0.02em' }}>{content.h1}</h1>
            <h2 className="font-display" style={{ fontSize: 'clamp(18px, 3vw, 28px)', fontWeight: '300', color: '#93c5fd', marginBottom: '16px', fontStyle: 'italic', letterSpacing: '0.03em' }}>{content.h2}</h2>
            
            <p style={{ fontSize: '15px', opacity: 0.9, maxWidth: '550px', marginBottom: '24px', lineHeight: 1.6 }}>
              From <strong>studio to penthouse</strong> – we handle building approvals, NOC paperwork, and deliver stunning results in <strong>4-6 weeks</strong>. Free 3D design included!
            </p>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
              {[{ n: '500+', l: 'Apartments Done', c: '500+ apartments renovated' }, { n: '4-6', l: 'Weeks Delivery', c: 'fast 4-6 week delivery' }, { n: '5yr', l: 'Warranty', c: '5-year warranty' }].map((s, i) => (
                <button key={i} onClick={() => openWhatsApp('trustBadge', [s.c])} style={{ textAlign: 'left', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#60a5fa', marginBottom: '2px' }}>{s.n}</div>
                  <div style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{s.l}</div>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
              <button className="btn btn-wa wa-pulse" onClick={() => openWhatsApp('hero', [content.service, content.location])} style={{ width: '100%', fontSize: '16px', padding: '16px 24px' }}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Get Free Quote Now
              </button>
              <p style={{ fontSize: '12px', opacity: 0.65, textAlign: 'center' }}>⚡ Reply in 2 minutes • NOC & approvals included</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
              {['NOC Handled', 'Building Approved', 'Fixed Pricing', '5-Year Warranty'].map((item, i) => (
                <span key={i} style={{ fontSize: '11px', opacity: 0.8, padding: '5px 10px', background: 'rgba(255,255,255,0.08)', borderRadius: '16px' }}>✓ {item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST BADGES */}
        <section style={{ padding: '32px 0', background: '#f8fafc' }}>
          <div className="c">
            <div className="grid-4">
              {TRUST_BADGES.map((b, i) => (
                <ClickableCard key={i} onClick={() => openWhatsApp('trustBadge', [b.context])} style={{ padding: '16px', textAlign: 'center' }} ariaLabel={b.title}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{b.icon}</div>
                  <h3 style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>{b.title}</h3>
                  <p style={{ fontSize: '11px', color: '#666' }}>{b.desc}</p>
                </ClickableCard>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section style={{ background: '#fff' }}>
          <div className="c">
            <p style={{ fontSize: '12px', color: '#2563eb', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '500' }}>Our Services</p>
            <h2 className="font-display" style={{ marginBottom: '8px' }}>Apartment Renovation Services</h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>Tap any service for a personalized quote</p>
            
            <div className="grid-2">
              {APARTMENT_SERVICES.map((s, i) => (
                <ClickableCard key={i} onClick={() => handleServiceClick(s)} style={{ overflow: 'hidden' }} ariaLabel={`Get quote for ${s.title}`}>
                  <div style={{ position: 'relative', height: '160px' }}>
                    <Image src={s.image} alt={s.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} loading={i < 2 ? 'eager' : 'lazy'} quality={70} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 className="font-display" style={{ fontSize: '18px', marginBottom: '6px' }}>{s.title}</h3>
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '14px', lineHeight: 1.5 }}>{s.desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '600', color: '#2563eb', fontSize: '15px' }}>{s.price}</span>
                      <span style={{ background: 'var(--wa)', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>Get Quote →</span>
                    </div>
                  </div>
                </ClickableCard>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section style={{ background: '#0f172a', color: '#fff' }}>
          <div className="c">
            <p style={{ fontSize: '12px', color: '#60a5fa', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '500', textAlign: 'center' }}>Our Process</p>
            <h2 className="font-display" style={{ textAlign: 'center', marginBottom: '40px' }}>5 Steps to Your Dream Apartment</h2>
            
            <div className="grid-5">
              {PROCESS_STEPS.map((step, i) => (
                <ClickableCard key={i} onClick={() => openWhatsApp('process', [step.title])} style={{ textAlign: 'center', padding: '24px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} ariaLabel={`Start ${step.title}`}>
                  <div style={{ fontSize: '11px', color: '#60a5fa', letterSpacing: '1px', marginBottom: '10px', fontWeight: '600' }}>{step.step}</div>
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{step.icon}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '6px', color: '#fff' }}>{step.title}</h3>
                  <p style={{ fontSize: '12px', opacity: 0.7, marginBottom: '8px', color: '#fff' }}>{step.desc}</p>
                  <span style={{ fontSize: '10px', color: '#60a5fa' }}>{step.time}</span>
                </ClickableCard>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section style={{ background: '#fff' }}>
          <div className="c">
            <p style={{ fontSize: '12px', color: '#2563eb', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '500', textAlign: 'center' }}>Why Us</p>
            <h2 className="font-display" style={{ textAlign: 'center', marginBottom: '40px' }}>The Apartment Renovation Specialists</h2>
            
            <div className="grid-6">
              {WHY_CHOOSE_US.map((item, i) => (
                <ClickableCard key={i} onClick={() => openWhatsApp('whyChooseUs', [item.context])} style={{ padding: '24px', background: '#f8fafc' }} ariaLabel={item.title}>
                  <div style={{ fontSize: '28px', marginBottom: '16px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>{item.desc}</p>
                </ClickableCard>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ background: '#f8fafc' }}>
          <div className="c">
            <p style={{ fontSize: '12px', color: '#2563eb', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '500', textAlign: 'center' }}>Success Stories</p>
            <h2 className="font-display" style={{ textAlign: 'center', marginBottom: '8px' }}>Happy Apartment Owners</h2>
            <p style={{ fontSize: '16px', color: '#666', textAlign: 'center', marginBottom: '40px' }}>Tap any review to start your transformation</p>
            
            <div className="grid-3">
              {TESTIMONIALS.map((t, i) => (
                <ClickableCard key={i} onClick={() => openWhatsApp('testimonial', [t.name, t.project])} style={{ padding: '24px' }} ariaLabel={`Chat about ${t.name}'s project`}>
                  <div style={{ color: '#f59e0b', marginBottom: '12px', fontSize: '14px' }}>{'★'.repeat(t.rating)}</div>
                  <p className="font-display" style={{ fontSize: '15px', color: '#374151', marginBottom: '16px', lineHeight: 1.8, fontStyle: 'italic', fontWeight: '400' }}>"{t.text}"</p>
                  <div style={{ marginBottom: '12px' }}>
                    <p style={{ fontWeight: '600', fontSize: '14px' }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: '#888' }}>{t.building}, {t.location}</p>
                  </div>
                  <span style={{ fontSize: '11px', color: '#2563eb', background: 'rgba(37,99,235,0.1)', padding: '4px 10px', borderRadius: '4px' }}>{t.project}</span>
                </ClickableCard>
              ))}
            </div>
          </div>
        </section>

        {/* VIDEO TESTIMONIALS */}
        <section style={{ background: '#0f172a' }}>
          <div className="c">
            <p style={{ fontSize: '12px', color: '#60a5fa', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '500', textAlign: 'center' }}>Watch & See</p>
            <h2 className="font-display" style={{ color: '#fff', textAlign: 'center', marginBottom: '40px' }}>Video Testimonials</h2>
            
            <div className="grid-3">
              {VIDEO_TESTIMONIALS.map((video) => (
                <div key={video.id}>
                  <VideoCard video={video} onChatClick={() => openWhatsApp('videoTestimonial', [video.name, video.location])} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: '#fff' }}>
          <div className="c" style={{ maxWidth: '800px' }}>
            <p style={{ fontSize: '12px', color: '#2563eb', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '500', textAlign: 'center' }}>FAQ</p>
            <h2 className="font-display" style={{ textAlign: 'center', marginBottom: '32px', fontWeight: '400', letterSpacing: '0.02em' }}>Apartment Renovation Questions</h2>
            
            {faqs.map((f, i) => (
              <div key={i} className="faq-item">
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span>{f.q}</span>
                  <span style={{ color: '#2563eb', fontSize: '22px', transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: '0.2s' }}>+</span>
                </button>
                <div className={`faq-a ${openFaq === i ? 'open' : ''}`}>
                  <p style={{ marginBottom: '16px' }}>{f.a}</p>
                  <button onClick={() => openWhatsApp('faq', [f.q])} style={{ background: 'var(--wa)', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    💬 Ask About This
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKIP THE FORM */}
        <section style={{ padding: '80px 0', background: '#f8fafc' }}>
          <div className="c" style={{ maxWidth: '600px', textAlign: 'center' }}>
            <div style={{ fontSize: '56px', marginBottom: '20px' }}>💬</div>
            <h2 className="font-display" style={{ marginBottom: '12px', fontWeight: '400', letterSpacing: '0.02em' }}>No Forms. Just Chat.</h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>Skip the paperwork. Tap and tell us about your apartment. Get a personalized quote in minutes.</p>
            <button className="btn btn-wa wa-pulse" onClick={() => openWhatsApp('callToAction', [])} style={{ fontSize: '18px', padding: '20px 40px' }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Start Chatting Now
            </button>
          </div>
        </section>

        {/* AREAS */}
        <section style={{ padding: '50px 0', background: '#fff' }}>
          <div className="c">
            <h3 className="font-display" style={{ fontSize: '28px', textAlign: 'center', marginBottom: '8px', fontWeight: '400', letterSpacing: '0.02em' }}>Serving All Dubai Areas</h3>
            <p style={{ textAlign: 'center', marginBottom: '28px', color: '#888', fontSize: '14px' }}>Tap your area for local expertise</p>
            <div className="areas-grid">
              {AREAS_SERVED.map((area, i) => (
                <button key={i} onClick={() => openWhatsApp('area', [area])} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', minHeight: '48px' }}>{area}</button>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)', color: '#fff', textAlign: 'center' }}>
          <div className="c">
            <p style={{ fontSize: '12px', color: '#60a5fa', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '20px' }}>Ready to Transform?</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 6vw, 56px)', marginBottom: '16px', fontWeight: '400', letterSpacing: '0.02em' }}>Your Dream Apartment<br />Is One Tap Away</h2>
            <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '36px', maxWidth: '500px', margin: '0 auto 36px' }}>500+ apartment owners started with a simple WhatsApp message. You're next.</p>
            <button className="btn btn-wa wa-pulse" onClick={() => openWhatsApp('callToAction', [])} style={{ fontSize: '18px', padding: '20px 40px' }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Let's Transform Your Apartment
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: '40px 0', background: '#0d0d0d', color: '#fff' }}>
          <div className="c" style={{ textAlign: 'center' }}>
            <span className="font-display" style={{ fontSize: '24px', fontWeight: '600', letterSpacing: '2px' }}>UNICORN</span>
            <p style={{ fontSize: '13px', opacity: 0.5, marginTop: '8px', marginBottom: '20px' }}>Dubai's Apartment Renovation Specialists</p>
            <p style={{ fontSize: '12px', opacity: 0.4 }}>© {currentYear} Unicorn Renovations. All rights reserved.</p>
          </div>
        </footer>

        {/* FLOATING WHATSAPP - Desktop */}
        <button onClick={() => openWhatsApp('floatingButton', [])} aria-label="Chat on WhatsApp" className="desktop-only wa-pulse" style={{ position: 'fixed', bottom: '28px', right: '28px', width: '64px', height: '64px', background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)', borderRadius: '50%', border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(37, 211, 102, 0.4)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="32" height="32" fill="#fff" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </button>

        {/* STICKY BOTTOM - Mobile */}
        <div className={`sticky-b mobile-only ${isHot ? 'hot' : ''}`}>
          <a href="tel:+971585658002" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '10px', padding: '12px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', minHeight: '48px' }}>📞 Call</a>
          <button className="btn btn-wa" onClick={() => openWhatsApp('sticky', [isHot])} style={{ flex: 2, minHeight: '48px', padding: '12px' }}>
            {isHot ? "🔥 I'm Ready!" : '💬 WhatsApp'}
          </button>
        </div>
      </div>
    </>
  );
}
