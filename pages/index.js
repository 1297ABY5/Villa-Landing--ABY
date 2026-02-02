// pages/index.js - FINAL PRODUCTION VERSION v3.8
// ✅ All fixes applied
// ✅ VERTICAL SCROLL ONLY (no horizontal carousels)
// ✅ Hidden CTA buttons in testimonials (cards still clickable)
// ✅ Reduced mobile padding and gaps
// ✅ Smart background click - tap dead space = WhatsApp
// ✅ SHORT REFERENCE CODE - Clean WhatsApp messages
// Version: 3.8 FINAL

import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';
import { useState, useMemo, useEffect, useRef } from 'react';

// ============================================
// FONTS - next/font/google (no @import)
// ============================================
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-display',
  display: 'swap',
});

// ============================================
// WHATSAPP CONFIGURATION
// ============================================
const WHATSAPP_NUMBER = '971585658002';

// Messages use positional args (not Object.values)
const WHATSAPP_MESSAGES = {
  hero: (service, location) => 
    `Hi! 👋 I'm interested in ${service} services in ${location}. Can we discuss my project?`,
  
  service: (serviceName, price) => 
    `Hi! I'm interested in *${serviceName}* (${price}). Can you tell me more about this service?`,
  
  testimonial: (clientName, project) => 
    `Hi! I just read ${clientName}'s review about their ${project}. I'd love similar results for my villa!`,
  
  videoTestimonial: (clientName, location) => 
    `Hi! I watched ${clientName}'s video testimonial from ${location}. Very impressive! I'd like to discuss my project.`,
  
  process: (stepName) => 
    `Hi! I'd like to start the *${stepName}* phase for my renovation project. What's the next step?`,
  
  faq: (question) => 
    `Hi! I have a question about: "${question}" - Can you help me understand better?`,
  
  area: (areaName) => 
    `Hi! I have a property in *${areaName}* and I'm interested in renovation services. Do you work in this area?`,
  
  pricing: (service) => 
    `Hi! I'd like to get a *fixed price quote* for ${service}. Can we schedule a site visit?`,
  
  warranty: () => 
    `Hi! I'm interested in your *5-year warranty*. Can you explain what's covered?`,
  
  urgency: (slotsLeft) => 
    `Hi! I saw you have only ${slotsLeft} consultation slots left. I'd like to book one before they're gone!`,
  
  gallery: (imageType) => 
    `Hi! I love the ${imageType} work I saw in your gallery. Can you do something similar for my villa?`,
  
  trustBadge: (badge) => 
    `Hi! I noticed you're ${badge}. Can you tell me more about your credentials?`,
  
  whyChooseUs: (feature) => 
    `Hi! I'm interested in your ${feature}. Can you tell me more?`,
  
  exitIntent: (service) => 
    `Hi! I was just browsing your ${service} page. Before I go, can you tell me about your free consultation?`,
  
  sticky: (isHot) => 
    isHot 
      ? `Hi! 🔥 I've been looking at your site and I'm VERY interested. Let's talk!`
      : `Hi! I have some questions about your renovation services.`,
  
  floatingButton: () => 
    `Hi! I'd like to discuss my renovation project. Are you available to chat?`,
  
  callToAction: () => 
    `Hi! I'm ready to start my villa transformation. What's the first step?`,
  
  qualified: (service, budget, timeline) => 
    `Hi! I'm interested in *${service}*.\n\n📊 Budget: ${budget}\n⏰ Timeline: ${timeline}\n\nCan we discuss my project?`,
  
  default: () => 
    `Hi! I'm interested in your renovation services. Can we chat?`
};

// Context-based conversion values
const CONVERSION_VALUES = {
  hero: 3,
  service: 5,
  callToAction: 6,
  qualified: 8,
  testimonial: 4,
  videoTestimonial: 5,
  process: 3,
  area: 3,
  urgency: 5,
  sticky: 4,
  exitIntent: 3,
  floatingButton: 3,
  trustBadge: 2,
  whyChooseUs: 3,
  faq: 2,
  gallery: 4,
  pricing: 5,
  warranty: 3,
  default: 1
};

// ============================================
// ATTRIBUTION TRACKING WITH LOCALSTORAGE
// Persist beyond session with 7-day expiry
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
    lp: 'villa-v3.8',
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
  } catch (e) {
    return getAttribution();
  }
}

// ============================================
// GTAG WITH STUB FALLBACK
// ============================================
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
// WHATSAPP OPENER - SHORT REFERENCE CODE
// Full tracking stored locally, customer sees clean message
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
      page: attr.lp || 'villa',
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
  
  fireGtag('event', 'whatsapp_click', {
    click_context: context,
    click_id: clickId,
    click_value: value
  });

  try { sessionStorage.setItem('wa_clicked', '1'); } catch(e) {}

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer'
  );
};

// ============================================
// ACCESSIBLE CLICKABLE CARD
// ============================================
function ClickableCard({ children, onClick, className = '', style = {}, ariaLabel = '' }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      className={`clickable-card ${className}`}
      style={{ cursor: 'pointer', ...style }}
    >
      {children}
    </div>
  );
}

// ============================================
// KEYWORD MAPPING
// ============================================
const KEYWORD_MAP = {
  'interior renovation company': { h1: 'Interior Renovation Company', h2: 'Bespoke Interior Transformations in Dubai', service: 'Interior Renovation', highlight: 'interior', metaDesc: 'Premier interior renovation company in Dubai. 800+ projects completed. Municipality approved. Complimentary 3D visualization.' },
  'interior renovation': { h1: 'Interior Renovation Dubai', h2: 'Elevated Interior Design & Renovation', service: 'Interior Renovation', highlight: 'interior', metaDesc: 'Luxury interior renovation in Dubai. Complete transformations with fixed pricing and 5-year warranty.' },
  'villa renovation dubai': { h1: 'Villa Renovation Dubai', h2: 'Where Architecture Meets Artistry', service: 'Villa Renovation', highlight: 'villa', metaDesc: 'Premier villa renovation in Dubai. 800+ villas transformed. Fixed pricing. 6-8 weeks delivery.' },
  'villa renovation in dubai': { h1: 'Villa Renovation in Dubai', h2: 'Timeless Villa Transformations', service: 'Villa Renovation', highlight: 'villa', metaDesc: 'Luxury villa renovation in Dubai. Municipality approved. 5-year craftsmanship warranty.' },
  'villa renovation': { h1: 'Villa Renovation Dubai', h2: "Dubai's Most Distinguished Villa Renovation Studio", service: 'Villa Renovation', highlight: 'villa', metaDesc: 'Bespoke villa renovation services in Dubai. Fixed pricing. On-time delivery guaranteed.' },
  'villa renovations': { h1: 'Villa Renovations Dubai', h2: 'Crafting Legacy Homes Since 2012', service: 'Villa Renovation', highlight: 'villa', metaDesc: 'Exquisite villa renovations in Dubai by master craftsmen. 800+ projects completed.' },
  'villa contractors in dubai': { h1: 'Villa Contractors in Dubai', h2: 'Licensed Master Contractors', service: 'Villa Contracting', highlight: 'contractor', metaDesc: 'Licensed villa contractors in Dubai. Municipality approved. Fixed price guarantee.' },
  'villa contractors': { h1: 'Villa Contractors Dubai', h2: 'Master Craftsmen for Discerning Homeowners', service: 'Villa Contracting', highlight: 'contractor', metaDesc: 'Elite villa contractors in Dubai. 15+ years mastery. 800+ prestigious projects.' },
  'villa renovation contractors': { h1: 'Villa Renovation Contractors Dubai', h2: 'The Architects of Transformation', service: 'Villa Contracting', highlight: 'contractor', metaDesc: 'Premier villa renovation contractors in Dubai. Licensed. Insured. 5-year warranty.' },
  'villa extension': { h1: 'Villa Extension Dubai', h2: 'Expand Your Living Legacy', service: 'Villa Extension', highlight: 'extension', metaDesc: 'Luxury villa extension Dubai. Additional rooms, floors, outdoor sanctuaries. Municipality approved.' },
  'villa extension dubai': { h1: 'Villa Extension Dubai', h2: 'Seamless Expansion, Timeless Design', service: 'Villa Extension', highlight: 'extension', metaDesc: 'Bespoke villa extension services in Dubai. Expert architects. Fixed pricing.' },
  'office fit out dubai': { h1: 'Office Fit Out Dubai', h2: 'Professional Workspaces, Exceptional Results', service: 'Office Fit Out', highlight: 'fitout', metaDesc: 'Premium office fit out Dubai. Complete commercial solutions. Complimentary 3D design.' },
  'office fitout dubai': { h1: 'Office Fitout Dubai', h2: 'Transforming Commercial Spaces', service: 'Office Fit Out', highlight: 'fitout', metaDesc: 'Expert office fitout Dubai. Turnkey solutions. Municipality approved.' },
  'office fit out': { h1: 'Office Fit Out Dubai', h2: 'Where Productivity Meets Design', service: 'Office Fit Out', highlight: 'fitout', metaDesc: 'Bespoke office fit out services in Dubai. Premium finishes. On-time delivery.' },
  'home renovation companies dubai': { h1: 'Home Renovation Company Dubai', h2: "Dubai's Premier Home Transformation Studio", service: 'Home Renovation', highlight: 'home', metaDesc: 'Leading home renovation company in Dubai. 800+ homes transformed. Complimentary consultation.' },
  'home renovation': { h1: 'Home Renovation Dubai', h2: 'Reimagine Your Living Space', service: 'Home Renovation', highlight: 'home', metaDesc: 'Luxury home renovation Dubai. Complete makeovers. Fixed price guarantee.' },
  'home remodeling': { h1: 'Home Remodeling Dubai', h2: 'Architectural Excellence, Personal Touch', service: 'Home Remodeling', highlight: 'home', metaDesc: 'Bespoke home remodeling Dubai. Kitchen, bathroom, complete transformation.' },
  'renovation companies': { h1: 'Renovation Company Dubai', h2: "Dubai's Distinguished Renovation Atelier", service: 'Renovation Services', highlight: 'company', metaDesc: 'Premier renovation company in Dubai. Villa, home, interior. 800+ projects.' },
  'renovation company in dubai': { h1: 'Renovation Company in Dubai', h2: 'Crafting Extraordinary Spaces', service: 'Renovation Services', highlight: 'company', metaDesc: 'Elite renovation company in Dubai. Municipality approved. Complimentary consultation.' },
  'apartment renovation': { h1: 'Apartment Renovation Dubai', h2: 'Elevated Urban Living', service: 'Apartment Renovation', highlight: 'apartment', metaDesc: 'Luxury apartment renovation Dubai. Studio to penthouse. Complimentary 3D design.' },
  'kitchen renovation': { h1: 'Kitchen Renovation Dubai', h2: 'Culinary Spaces Crafted for Modern Living', service: 'Kitchen Renovation', highlight: 'kitchen', metaDesc: 'Luxury kitchen renovation in Dubai. German fittings. Fixed pricing. 5-year warranty.' },
  'kitchen renovation dubai': { h1: 'Kitchen Renovation Dubai', h2: 'Where Culinary Dreams Come True', service: 'Kitchen Renovation', highlight: 'kitchen', metaDesc: 'Premium kitchen renovation Dubai. Complete transformations. Complimentary 3D design.' },
  'bathroom renovation': { h1: 'Bathroom Renovation Dubai', h2: 'Spa-Inspired Sanctuaries', service: 'Bathroom Renovation', highlight: 'bathroom', metaDesc: 'Luxury bathroom renovation in Dubai. Premium finishes. Fixed pricing.' },
  'bathroom renovation dubai': { h1: 'Bathroom Renovation Dubai', h2: 'Transform Your Daily Ritual', service: 'Bathroom Renovation', highlight: 'bathroom', metaDesc: 'Spa-inspired bathroom renovation Dubai. Italian tiles. German fittings.' },
  'damac hills villa renovation': { h1: 'DAMAC Hills Villa Renovation', h2: 'Local Expertise, Global Standards', service: 'Villa Renovation', highlight: 'location', metaDesc: 'DAMAC Hills villa renovation specialists. Community experts. Complimentary consultation.' },
  'arabian ranches villa renovation': { h1: 'Arabian Ranches Villa Renovation', h2: 'Transforming Arabian Ranches Since 2012', service: 'Villa Renovation', highlight: 'location', metaDesc: 'Arabian Ranches villa renovation. 100+ projects in community. Local specialists.' },
  'palm jumeirah villa renovation': { h1: 'Palm Jumeirah Villa Renovation', h2: 'Iconic Homes Deserve Iconic Craftsmanship', service: 'Villa Renovation', highlight: 'location', metaDesc: 'Palm Jumeirah villa renovation. Luxury waterfront specialists. Complimentary 3D design.' },
  'emirates hills villa renovation': { h1: 'Emirates Hills Villa Renovation', h2: 'Elevating Emirates Hills Estates', service: 'Villa Renovation', highlight: 'location', metaDesc: 'Emirates Hills villa renovation. Ultra-luxury specialists. Municipality approved.' },
  'dubai hills villa renovation': { h1: 'Dubai Hills Villa Renovation', h2: 'Modern Elegance in Dubai Hills', service: 'Villa Renovation', highlight: 'location', metaDesc: 'Dubai Hills villa renovation specialists. Contemporary design. Complimentary quote.' },
  default: { h1: 'Villa Renovation Dubai', h2: 'Where Vision Becomes Legacy', service: 'Villa Renovation', highlight: 'villa', metaDesc: 'Premier villa renovation studio in Dubai. 800+ projects. Complimentary 3D visualization.' },
};

// ============================================
// SERVICES DATA
// ============================================
const ALL_SERVICES = [
  { id: 'villa-renovation', title: 'Villa Renovation', desc: 'Complete villa transformation with bespoke finishes', price: 'From AED 150,000', image: '/villa-renovation.webp', tags: ['villa', 'home', 'company', 'contractor', 'location'] },
  { id: 'interior-renovation', title: 'Interior Renovation', desc: 'Reimagine your living spaces with artistry', price: 'From AED 60,000', image: '/Interior-Design.webp', tags: ['interior', 'fitout', 'home', 'apartment'] },
  { id: 'villa-extension', title: 'Villa Extension', desc: 'Seamlessly expand your living legacy', price: 'From AED 120,000', image: '/villa-extension.webp', tags: ['extension', 'villa', 'contractor'] },
  { id: 'office-fitout', title: 'Office Fit Out', desc: 'Professional workspaces crafted for success', price: 'From AED 80,000', image: '/office-fitout.webp', tags: ['fitout', 'office', 'commercial'] },
  { id: 'kitchen', title: 'Kitchen Renovation', desc: 'Culinary spaces crafted for modern living', price: 'From AED 45,000', image: '/v16.webp', tags: ['interior', 'home', 'villa', 'apartment', 'kitchen'] },
  { id: 'bathroom', title: 'Bathroom Renovation', desc: 'Spa-inspired sanctuaries of tranquility', price: 'From AED 25,000', image: '/v12.webp', tags: ['interior', 'home', 'villa', 'apartment', 'bathroom'] },
];

const getRelevantServices = (highlight) => {
  return [...ALL_SERVICES].sort((a, b) => {
    const aMatch = a.tags.includes(highlight) ? 0 : 1;
    const bMatch = b.tags.includes(highlight) ? 0 : 1;
    return aMatch - bMatch;
  }).slice(0, 6);
};

// ============================================
// PROCESS STEPS
// ============================================
const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', desc: 'Complimentary site visit & vision alignment', icon: '◈', time: 'Day 1' },
  { step: '02', title: 'Design', desc: '3D visualization & detailed proposal', icon: '◇', time: 'Days 2-5' },
  { step: '03', title: 'Approvals', desc: 'Municipality permits handled seamlessly', icon: '◆', time: 'Days 6-14' },
  { step: '04', title: 'Craft', desc: 'Master execution with weekly updates', icon: '▣', time: 'Weeks 3-7' },
  { step: '05', title: 'Handover', desc: 'Final walkthrough & warranty activation', icon: '✧', time: 'Week 8' },
];

// ============================================
// TESTIMONIALS
// ============================================
const TESTIMONIALS = [
  { name: 'Ahmed Al-Rashid', location: 'Emirates Hills', text: 'An exceptional experience from start to finish. The team understood our vision for a contemporary yet timeless aesthetic. The 3D visualization was remarkably accurate, and the craftsmanship exceeded our highest expectations.', rating: 5, project: 'Complete Villa Renovation' },
  { name: 'Sarah Mitchell', location: 'Arabian Ranches', text: 'We interviewed five contractors before choosing Unicorn. Their attention to detail, transparent pricing, and respect for our home during construction set them apart. The result is nothing short of transformative.', rating: 5, project: 'Interior Transformation' },
  { name: 'James & Victoria Chen', location: 'Palm Jumeirah', text: 'Our waterfront villa required specialists who understood both luxury and the unique challenges of Palm properties. Unicorn delivered impeccably—on time, on budget, and beyond our vision.', rating: 5, project: 'Villa Extension' },
];

// ============================================
// VIDEO TESTIMONIALS
// ============================================
const VIDEO_TESTIMONIALS = [
  { id: 'video-1', name: 'Fatima Al-Rashid', location: 'Emirates Hills', project: 'Villa Renovation', thumbnail: '/video-thumb-1.jpg', videoSrc: '/testimonial-1.mp4', duration: '0:06' },
  { id: 'video-2', name: 'Michelle Chen', location: 'Arabian Ranches', project: 'Interior Renovation', thumbnail: '/video-thumb-2.jpg', videoSrc: '/testimonial-2.mp4', duration: '0:06' },
  { id: 'video-3', name: 'Marco Valentino', location: 'Palm Jumeirah', project: 'Full Transformation', thumbnail: '/video-thumb-3.jpg', videoSrc: '/testimonial-3.mp4', duration: '0:06' },
];

// ============================================
// TRUST BADGES
// ============================================
const TRUST_BADGES = [
  { icon: '◈', title: 'DED Licensed', desc: 'Fully registered contractor', context: 'DED Licensed contractor' },
  { icon: '◇', title: 'Municipality Approved', desc: 'All permits handled', context: 'Municipality Approved' },
  { icon: '◆', title: 'Fully Insured', desc: 'Complete coverage', context: 'Fully Insured' },
  { icon: '✧', title: 'Flexible Payment', desc: 'Milestone-based plans', context: 'offering flexible payment plans' },
];

// ============================================
// WHY CHOOSE US
// ============================================
const WHY_CHOOSE_US = [
  { icon: '◈', title: 'Municipality Approved', desc: 'All permits and approvals handled seamlessly by our dedicated team', context: 'municipality approvals' },
  { icon: '◇', title: 'Fixed Price Guarantee', desc: 'Transparent pricing with no hidden costs or surprise additions', context: 'fixed pricing guarantee' },
  { icon: '◆', title: 'On-Time Delivery', desc: '6-8 weeks completion with weekly progress updates', context: 'project timeline' },
  { icon: '✧', title: '5-Year Warranty', desc: 'Comprehensive craftsmanship coverage for peace of mind', context: '5-year warranty' },
  { icon: '❖', title: 'Complimentary 3D Design', desc: 'Visualize your transformation before commitment', context: 'free 3D design service' },
  { icon: '✦', title: 'Highly Rated', desc: 'Trusted by distinguished homeowners across Dubai', context: 'client reviews and rating' },
];

// ============================================
// AREAS SERVED
// ============================================
const AREAS_SERVED = [
  'Emirates Hills', 'Palm Jumeirah', 'Dubai Hills Estate', 'Arabian Ranches',
  'DAMAC Hills', 'Jumeirah Golf Estates', 'Al Barari', 'District One',
  'The Lakes', 'The Meadows', 'Jumeirah Islands', 'MBR City',
  'Victory Heights', 'Motor City', 'JVC', 'Al Barsha', 'Jumeirah', 'The Springs',
];

// ============================================
// LEAD QUALIFIER OPTIONS
// ============================================
const BUDGETS = [
  { label: 'Under 100K', value: 'Under 100K AED' },
  { label: '100K – 200K', value: '100K-200K AED' },
  { label: '200K – 400K', value: '200K-400K AED' },
  { label: '400K+', value: '400K+ AED' },
];

const TIMELINES = [
  { label: 'ASAP', value: 'ASAP - Ready to start' },
  { label: '1-2 months', value: '1-2 months' },
  { label: '3-6 months', value: '3-6 months' },
  { label: 'Just exploring', value: 'Just exploring options' },
];

// ============================================
// COMPUTE SLOTS ON SERVER (Dubai timezone)
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

// ============================================
// SSR FUNCTIONS
// ============================================
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

  if (bestMatchScore === 0 && keyword.length > 3) {
    const capitalizedKeyword = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    config = {
      h1: `${capitalizedKeyword} Dubai`,
      h2: `Bespoke ${capitalizedKeyword} Excellence`,
      service: capitalizedKeyword,
      highlight: keyword.includes('interior') ? 'interior' : keyword.includes('extension') ? 'extension' : keyword.includes('fit') ? 'fitout' : keyword.includes('home') ? 'home' : 'villa',
      metaDesc: `Luxury ${capitalizedKeyword} in Dubai. 800+ projects. Complimentary consultation.`,
    };
  }

  return {
    content: { keyword: keyword || 'Villa Renovation', location, ...config },
    services: getRelevantServices(config.highlight)
  };
}

function buildFaq(content) {
  const service = content.service || 'Renovation';
  const loc = content.location || 'Dubai';
  return [
    { q: `What is the investment range for ${service.toLowerCase()} in ${loc}?`, a: `Investment varies based on scope, size, and specification level. We provide a comprehensive fixed-price proposal following a complimentary site assessment. No hidden costs, ever.` },
    { q: `What is the typical timeline for a ${service.toLowerCase()} project?`, a: `Most projects reach completion within 6–8 weeks, depending on approvals, material procurement, and scope complexity. We provide weekly progress updates throughout.` },
    { q: `Do you manage municipality permits and approvals?`, a: `Absolutely. We handle all required approvals and coordinate documentation seamlessly for your project type. This is included in our service at no extra charge.` },
    { q: `Is your quotation truly fixed?`, a: `Yes. We provide a fixed-price proposal for the agreed scope. No surprises, ever. Any scope changes are discussed and approved before proceeding.` },
    { q: `What warranty coverage do you provide?`, a: `We provide up to 5 years craftsmanship warranty depending on scope, complemented by manufacturer warranties on materials and appliances.` },
    { q: `Can I see examples of similar projects?`, a: `Yes! We have an extensive portfolio of completed projects. During your free consultation, we'll show you relevant examples and can arrange visits to completed properties with client permission.` },
  ];
}

export async function getServerSideProps(ctx) {
  const q = ctx.query || {};
  const keywordRaw = q.kw || q.keyword || q.utm_term || q.q || '';
  const locationRaw = q.loc || q.location || 'Dubai';
  const { content, services } = resolveKeywordConfig(keywordRaw, locationRaw);
  const initialSlots = computeSlotsLeft();
  
  return { 
    props: { 
      initialContent: content, 
      initialServices: services,
      initialSlots,
      currentYear: new Date().getFullYear(),
    } 
  };
}

// ============================================
// VIDEO CARD COMPONENT
// ============================================
function VideoCard({ video, onChatClick }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  return (
    <div className="video-card">
      {isPlaying ? (
        <video ref={videoRef} src={video.videoSrc} poster={video.thumbnail} controls playsInline autoPlay />
      ) : (
        <>
          <Image src={video.thumbnail} alt={`${video.name} testimonial video`} fill sizes="320px" style={{ objectFit: 'cover' }} loading="lazy" quality={75} />
          <div className="video-overlay" />
          <div className="video-duration">▶ {video.duration}</div>
          <div className="video-project">{video.project}</div>
          <button onClick={() => setIsPlaying(true)} aria-label={`Play ${video.name}'s testimonial video`} className="video-play-btn">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <div className="video-info">
            <p className="video-name">{video.name}</p>
            <p className="video-location"><span style={{ color: 'var(--gold-light)' }}>◆</span> {video.location}</p>
            <button onClick={(e) => { e.stopPropagation(); onChatClick(); }} className="video-cta" style={{ opacity: 0, height: 0, padding: 0, overflow: 'hidden' }}>I Want This Too!</button>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================
// LEAD QUALIFIER MODAL
// ============================================
function LeadQualifier({ service, price, onClose, onSubmit }) {
  const [budget, setBudget] = useState(null);
  const [timeline, setTimeline] = useState(null);

  const handleSubmit = () => {
    if (budget && timeline) onSubmit(budget.value, timeline.value);
  };

  return (
    <>
      <div className="qualifier-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="qualifier-sheet" role="dialog" aria-modal="true" aria-labelledby="qualifier-title">
        <div className="qualifier-handle" />
        <h3 id="qualifier-title" className="qualifier-title">Quick Questions 🎯</h3>
        <p className="qualifier-subtitle">Help us prepare the perfect quote for your <strong>{service}</strong></p>
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
        <button onClick={handleSubmit} disabled={!budget || !timeline} className={`qualifier-submit ${budget && timeline ? 'active' : ''}`}>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          {budget && timeline ? 'Chat on WhatsApp' : 'Select both options'}
        </button>
        <button onClick={() => { openWhatsApp('service', [service, price], { skipped_qualifier: true }); onClose(); }} className="qualifier-skip">Skip, just chat →</button>
      </div>
    </>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function FinalLandingPage({ initialContent, initialServices, initialSlots, currentYear }) {
  const [slotsLeft] = useState(initialSlots);
  const [showExitSheet, setShowExitSheet] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [qualifier, setQualifier] = useState(null);
  const exitShown = useRef(false);

  const content = initialContent;
  const services = initialServices;
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

  const handleQualifiedSubmit = (budget, timeline) => {
    openWhatsApp('qualified', [qualifier.service, budget, timeline], { budget, timeline, service: qualifier.service });
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

  const seoTitle = (content.h1 || 'Villa Renovation Dubai').slice(0, 50);

  return (
    <>
      <Head>
        <title>{seoTitle} | Unicorn Renovations Dubai</title>
        <meta name="description" content={content.metaDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href="https://wa.me" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://dubailuxrenovate.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "HomeAndConstructionBusiness", "name": "Unicorn Renovations", "description": content.metaDesc, "url": "https://dubailuxrenovate.com", "telephone": "+971585658002", "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" }, "areaServed": AREAS_SERVED }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <style dangerouslySetInnerHTML={{ __html: `:root{--gold:#c9a227;--gold-light:#d4af37;--gold-dark:#a68521;--charcoal:#1a1a1a;--charcoal-light:#2d2d2d;--cream:#faf8f5;--wa:#25D366;--wa-dark:#128c7e;--safe-b:env(safe-area-inset-bottom,0px)}*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}html{scroll-behavior:smooth}body{font-family:var(--font-inter),'Inter',-apple-system,sans-serif;color:var(--charcoal);line-height:1.6;background:#fff;-webkit-font-smoothing:antialiased}.font-display{font-family:var(--font-display),'Playfair Display',Georgia,serif}.c{width:100%;padding:0 12px;max-width:1200px;margin:0 auto}.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:14px 28px;border-radius:12px;font-size:16px;font-weight:600;border:none;cursor:pointer;transition:transform .15s,box-shadow .15s;text-decoration:none}.btn:active{transform:scale(.97)}.btn:focus-visible{outline:3px solid var(--wa);outline-offset:2px}.btn-wa{background:linear-gradient(135deg,var(--wa) 0%,var(--wa-dark) 100%);color:#fff;box-shadow:0 4px 16px rgba(37,211,102,.3)}.clickable-card{transition:transform .2s,box-shadow .2s;border-radius:16px;background:#fff;border:1px solid #f0f0f0}.clickable-card:active{transform:scale(.98)}.clickable-card:focus-visible{outline:3px solid var(--wa);outline-offset:2px}.clickable-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.08)}section{padding:40px 0}h1{font-size:28px;font-weight:700;line-height:1.15}h2{font-size:22px;font-weight:600;line-height:1.2}h3{font-size:16px;font-weight:600}.grid-1,.grid-2,.grid-3,.grid-5,.grid-6{display:grid;grid-template-columns:1fr;gap:12px}.grid-4{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.areas-grid{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}.sheet-bg{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:999;opacity:0;pointer-events:none;transition:opacity .25s}.sheet-bg.open{opacity:1;pointer-events:auto}.sheet{position:fixed;bottom:0;left:0;right:0;background:#fff;border-radius:24px 24px 0 0;padding:24px 20px calc(24px + var(--safe-b));z-index:1000;transform:translateY(100%);transition:transform .3s ease}.sheet.open{transform:translateY(0)}.sticky-b{position:fixed;bottom:0;left:0;right:0;background:var(--charcoal);padding:12px 16px calc(12px + var(--safe-b));z-index:100;display:flex;gap:12px}.sticky-b.hot{background:linear-gradient(135deg,var(--wa) 0%,var(--wa-dark) 100%)}.faq-item{border-bottom:1px solid #eee}.faq-q{padding:20px 0;font-size:16px;font-weight:500;display:flex;justify-content:space-between;align-items:center;cursor:pointer;min-height:60px;width:100%;background:none;border:none;text-align:left}.faq-q:focus-visible{outline:2px solid var(--wa);outline-offset:-2px}.faq-a{padding:0 0 20px;font-size:15px;color:#666;line-height:1.7;display:none}.faq-a.open{display:block}.video-card{position:relative;width:100%;border-radius:16px;overflow:hidden;background:#0a0a0a;aspect-ratio:16/9}.video-card video{width:100%;height:100%;object-fit:cover}.video-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.1) 0%,rgba(0,0,0,.75) 100%)}.video-duration{position:absolute;top:12px;right:12px;background:rgba(0,0,0,.6);color:#fff;padding:6px 12px;border-radius:20px;font-size:12px}.video-project{position:absolute;top:12px;left:12px;background:var(--gold);color:#fff;padding:6px 12px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:.5px;text-transform:uppercase}.video-play-btn{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:72px;height:72px;border-radius:50%;background:var(--gold);border:none;display:flex;align-items:center;justify-content:center;padding-left:4px;cursor:pointer;box-shadow:0 8px 32px rgba(201,162,39,.4)}.video-info{position:absolute;bottom:0;left:0;right:0;padding:16px;color:#fff}.video-name{font-weight:600;font-size:17px;margin-bottom:4px}.video-location{font-size:13px;opacity:.85;margin-bottom:14px}.video-cta{background:#25D366;color:#fff;border:none;padding:14px 20px;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:8px;width:100%;justify-content:center;min-height:48px}.qualifier-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:1000;backdrop-filter:blur(4px)}.qualifier-sheet{position:fixed;bottom:0;left:0;right:0;background:#fff;border-radius:24px 24px 0 0;padding:24px 20px calc(24px + var(--safe-b));z-index:1001;max-height:85vh;overflow:auto}.qualifier-handle{width:40px;height:4px;background:#ddd;border-radius:2px;margin:0 auto 20px}.qualifier-title{font-size:20px;font-weight:600;margin-bottom:8px;text-align:center}.qualifier-subtitle{color:#666;font-size:14px;margin-bottom:24px;text-align:center}.qualifier-label{font-weight:600;font-size:14px;margin-bottom:12px}.qualifier-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}.qualifier-chip{padding:12px 16px;border-radius:10px;border:1px solid #ddd;background:#fff;font-size:14px;cursor:pointer;min-height:48px;transition:all .15s}.qualifier-chip.selected{border:2px solid var(--wa);background:rgba(37,211,102,.1);font-weight:600}.qualifier-submit{width:100%;padding:16px;border-radius:12px;border:none;background:#ccc;color:#fff;font-size:16px;font-weight:600;cursor:not-allowed;min-height:52px;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .15s}.qualifier-submit.active{background:var(--wa);cursor:pointer}.qualifier-skip{width:100%;padding:14px;margin-top:12px;background:none;border:none;color:#666;font-size:14px;cursor:pointer;min-height:48px}@keyframes wa-pulse{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.4)}50%{box-shadow:0 0 0 12px rgba(37,211,102,0)}}.wa-pulse{animation:wa-pulse 2s infinite}@media(min-width:768px){.c{padding:0 24px}section{padding:100px 0}h1{font-size:56px}h2{font-size:40px}.mobile-only{display:none!important}.grid-2{grid-template-columns:repeat(2,1fr);gap:24px}.grid-3{grid-template-columns:repeat(3,1fr);gap:32px}.grid-4{grid-template-columns:repeat(4,1fr);gap:24px}.grid-5{grid-template-columns:repeat(5,1fr);gap:20px}.grid-6{grid-template-columns:repeat(3,1fr);gap:24px}.areas-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}.sticky-b{display:none}}@media(max-width:767px){.desktop-only{display:none!important}}` }} />
      </Head>

      <Script id="gtag-stub" strategy="beforeInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;gtag('js',new Date());gtag('config','AW-612864132');`}</Script>
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-612864132" strategy="afterInteractive" />
      <Script id="clarity" strategy="lazyOnload">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "v5bkaisuew");`}</Script>

      <div className={`${inter.variable} ${playfair.variable}`} style={{ paddingBottom: '80px', cursor: 'pointer' }} onClick={handleBackgroundClick}>
        
        {qualifier && <LeadQualifier service={qualifier.service} price={qualifier.price} onClose={() => setQualifier(null)} onSubmit={handleQualifiedSubmit} />}

        <div className={`sheet-bg ${showExitSheet ? 'open' : ''}`} onClick={() => setShowExitSheet(false)} aria-hidden="true" />
        <div className={`sheet ${showExitSheet ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Special offer">
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '40px', height: '4px', background: '#ddd', borderRadius: '2px', margin: '0 auto 20px' }} />
            <div style={{ fontSize: '48px', marginBottom: '12px' }} aria-hidden="true">🎁</div>
            <h3 className="font-display" style={{ fontSize: '24px', marginBottom: '8px' }}>Wait! Free Gift Inside</h3>
            <p style={{ color: '#666', marginBottom: '24px', fontSize: '15px' }}>Get a <strong>FREE 3D visualization</strong> of your dream {content.service.toLowerCase()}</p>
            <button className="btn btn-wa wa-pulse" onClick={() => { openWhatsApp('exitIntent', [content.service]); setShowExitSheet(false); }} style={{ width: '100%' }}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Claim Free 3D Design
            </button>
            <button onClick={() => setShowExitSheet(false)} style={{ background: 'none', border: 'none', color: '#999', fontSize: '14px', padding: '14px', marginTop: '8px', cursor: 'pointer', minHeight: '48px' }}>Maybe later</button>
          </div>
        </div>

        <button onClick={() => openWhatsApp('urgency', [slotsLeft])} style={{ width: '100%', background: 'linear-gradient(90deg, var(--charcoal) 0%, var(--charcoal-light) 100%)', color: '#fff', padding: '14px 16px', fontSize: '13px', cursor: 'pointer', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', border: 'none', letterSpacing: '0.3px' }}>
          <span style={{ color: 'var(--gold-light)' }}>✦</span>
          <span>FREE 3D VISUALIZATION</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span><strong>Only {slotsLeft} Consultation Slots Left</strong></span>
          <span style={{ background: 'var(--wa)', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>TAP TO BOOK →</span>
        </button>

        <header style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', padding: '14px 0', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="c" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="https://unicornrenovations.com" style={{ textDecoration: 'none' }}>
              <span className="font-display" style={{ fontSize: '22px', fontWeight: '600', color: 'var(--charcoal)', letterSpacing: '2px' }}>UNICORN</span>
            </a>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span className="desktop-only" style={{ fontSize: '13px', color: '#888' }}>★ Highly Rated</span>
              <button className="btn btn-wa" onClick={() => openWhatsApp('hero', [content.service, content.location])} style={{ padding: '10px 18px', minHeight: '44px', fontSize: '14px' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                <span className="desktop-only">Chat Now</span>
                <span className="mobile-only">💬</span>
              </button>
            </div>
          </div>
        </header>

        <section style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', background: 'var(--charcoal)' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <Image src="/villa-renovation.webp" alt={`${content.service} in ${content.location}`} fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.35 }} priority quality={75} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,26,26,0.6) 0%, rgba(26,26,26,0.9) 100%)' }} />
          </div>
          <div className="c" style={{ position: 'relative', zIndex: 10, color: '#fff', paddingTop: '24px', paddingBottom: '40px' }}>
            <button onClick={() => openWhatsApp('trustBadge', ['highly rated'])} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 14px', borderRadius: '30px', marginBottom: '16px', cursor: 'pointer', color: '#fff', fontSize: '12px' }}>
              <span style={{ color: 'var(--gold-light)' }}>★★★★★</span>
              <span>Highly Rated • Trusted by Dubai Homeowners</span>
            </button>
            <h1 className="font-display" style={{ fontSize: 'clamp(32px, 7vw, 72px)', fontWeight: '500', lineHeight: 1.1, marginBottom: '6px', letterSpacing: '-0.5px' }}>{content.h1}</h1>
            <h2 className="font-display" style={{ fontSize: 'clamp(16px, 3vw, 28px)', fontWeight: '400', color: 'var(--gold-light)', marginBottom: '14px', fontStyle: 'italic' }}>{content.h2}</h2>
            <p style={{ fontSize: '15px', opacity: 0.85, maxWidth: '550px', marginBottom: '24px', lineHeight: 1.6, fontWeight: '300' }}>Get a <strong style={{ fontWeight: '500' }}>FREE 3D visualization</strong> of your dream {content.service.toLowerCase()} in {content.location}. Chat with us now – response within 2 minutes!</p>
            <div style={{ display: 'flex', gap: '24px', marginBottom: '28px', flexWrap: 'wrap' }}>
              {[{ n: '800+', l: 'Villas Transformed', c: 'your 800+ completed projects' }, { n: '15+', l: 'Years of Mastery', c: 'your 15+ years of experience' }, { n: '5yr', l: 'Warranty', c: '5-year warranty coverage' }].map((s, i) => (
                <button key={i} onClick={() => openWhatsApp('trustBadge', [s.c])} style={{ textAlign: 'left', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--gold-light)', marginBottom: '2px' }}>{s.n}</div>
                  <div style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{s.l}</div>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
              <button className="btn btn-wa wa-pulse" onClick={() => openWhatsApp('hero', [content.service, content.location])} style={{ width: '100%', fontSize: '16px', padding: '16px 24px' }}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Chat With Us Now
              </button>
              <p style={{ fontSize: '12px', opacity: 0.65, textAlign: 'center' }}>⚡ Reply in 2 minutes • Free consultation</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
              {['Free 3D Design', 'Fixed Pricing', 'Municipality Approved', '5-Year Warranty'].map((item, i) => (
                <span key={i} style={{ fontSize: '11px', opacity: 0.8, padding: '5px 10px', background: 'rgba(255,255,255,0.06)', borderRadius: '16px' }}>✓ {item}</span>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '32px 0', background: 'var(--cream)' }}>
          <div className="c">
            <div className="grid-4">
              {TRUST_BADGES.map((b, i) => (
                <ClickableCard key={i} onClick={() => openWhatsApp('trustBadge', [b.context])} style={{ padding: '16px', textAlign: 'center' }} ariaLabel={`Learn more about ${b.title}`}>
                  <div style={{ fontSize: '24px', color: 'var(--gold)', marginBottom: '8px' }}>{b.icon}</div>
                  <h3 style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>{b.title}</h3>
                  <p style={{ fontSize: '11px', color: '#666' }}>{b.desc}</p>
                </ClickableCard>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#fff' }}>
          <div className="c">
            <p style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '500' }}>Our Expertise</p>
            <h2 className="font-display" style={{ marginBottom: '8px' }}>{content.service} Services</h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>Tap any service to get a personalized quote</p>
            <div className="grid-2">
              {services.map((s, i) => (
                <ClickableCard key={i} onClick={() => handleServiceClick(s)} style={{ overflow: 'hidden' }} ariaLabel={`Get quote for ${s.title}`}>
                  <div style={{ position: 'relative', height: '180px' }}>
                    <Image src={s.image} alt={`${s.title} in ${content.location}`} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} loading={i < 2 ? 'eager' : 'lazy'} quality={70} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 className="font-display" style={{ fontSize: '20px', marginBottom: '6px' }}>{s.title}</h3>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '14px', lineHeight: 1.5 }}>{s.desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '600', color: 'var(--gold-dark)', fontSize: '16px' }}>{s.price}</span>
                      <span style={{ background: 'var(--wa)', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}>Get Quote →</span>
                    </div>
                  </div>
                </ClickableCard>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--charcoal)', color: '#fff' }}>
          <div className="c">
            <p style={{ fontSize: '12px', color: 'var(--gold-light)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '500', textAlign: 'center' }}>The Journey</p>
            <h2 className="font-display" style={{ textAlign: 'center', marginBottom: '40px' }}>Our {content.service} Process</h2>
            <div className="grid-5">
              {PROCESS_STEPS.map((step, i) => (
                <ClickableCard key={i} onClick={() => openWhatsApp('process', [step.title])} style={{ textAlign: 'center', padding: '28px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} ariaLabel={`Start ${step.title} step`}>
                  <div style={{ fontSize: '12px', color: 'var(--gold-light)', letterSpacing: '1.5px', marginBottom: '12px', fontWeight: '600' }}>{step.step}</div>
                  <div style={{ fontSize: '24px', marginBottom: '12px', color: 'var(--gold-light)' }}>{step.icon}</div>
                  <h3 className="font-display" style={{ fontSize: '18px', fontWeight: '500', marginBottom: '6px', color: '#fff' }}>{step.title}</h3>
                  <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '10px', color: '#fff' }}>{step.desc}</p>
                  <span style={{ fontSize: '11px', color: 'var(--gold-light)', opacity: 0.8 }}>{step.time}</span>
                </ClickableCard>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#fff' }}>
          <div className="c">
            <p style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '500', textAlign: 'center' }}>The Difference</p>
            <h2 className="font-display" style={{ textAlign: 'center', marginBottom: '40px' }}>Why Discerning Homeowners Choose Us</h2>
            <div className="grid-6">
              {WHY_CHOOSE_US.map((item, i) => (
                <ClickableCard key={i} onClick={() => openWhatsApp('whyChooseUs', [item.context])} style={{ padding: '24px', background: 'var(--cream)' }} ariaLabel={`Learn about ${item.title}`}>
                  <div style={{ fontSize: '28px', color: 'var(--gold)', marginBottom: '16px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '17px', fontWeight: '600', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>{item.desc}</p>
                </ClickableCard>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--cream)' }}>
          <div className="c">
            <p style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '500', textAlign: 'center' }}>Client Stories</p>
            <h2 className="font-display" style={{ textAlign: 'center', marginBottom: '8px' }}>Voices of Transformation</h2>
            <p style={{ fontSize: '16px', color: '#666', textAlign: 'center', marginBottom: '40px' }}>Tap any review to start your transformation</p>
            <div className="grid-3">
              {TESTIMONIALS.map((t, i) => (
                <ClickableCard key={i} onClick={() => openWhatsApp('testimonial', [t.name, t.project])} style={{ padding: '28px' }} ariaLabel={`Chat about ${t.name}'s project`}>
                  <div style={{ color: 'var(--gold)', marginBottom: '14px', fontSize: '14px' }} aria-label={`${t.rating} out of 5 stars`}>{'★'.repeat(t.rating)}</div>
                  <p className="font-display" style={{ fontSize: '16px', color: '#444', marginBottom: '20px', lineHeight: 1.7, fontStyle: 'italic' }}>"{t.text}"</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <p style={{ fontWeight: '600', fontSize: '15px' }}>{t.name}</p>
                      <p style={{ fontSize: '13px', color: '#888' }}>{t.location}</p>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--gold-dark)', background: 'rgba(201,162,39,0.1)', padding: '4px 10px', borderRadius: '4px' }}>{t.project}</span>
                  </div>
                </ClickableCard>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)' }}>
          <div className="c">
            <p style={{ fontSize: '12px', color: 'var(--gold-light)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '500', textAlign: 'center' }}>Hear Their Stories</p>
            <h2 className="font-display" style={{ color: '#fff', textAlign: 'center', marginBottom: '8px' }}>Video Testimonials</h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: '40px' }}>Watch, then tap "I Want This Too!" to start</p>
            <div className="grid-3">
              {VIDEO_TESTIMONIALS.map((video) => (
                <div key={video.id}><VideoCard video={video} onChatClick={() => openWhatsApp('videoTestimonial', [video.name, video.location])} /></div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#fff' }}>
          <div className="c" style={{ maxWidth: '800px' }}>
            <p style={{ fontSize: '12px', color: 'var(--gold)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '500', textAlign: 'center' }}>Common Questions</p>
            <h2 className="font-display" style={{ textAlign: 'center', marginBottom: '8px' }}>{content.service} FAQ</h2>
            <p style={{ fontSize: '16px', color: '#666', textAlign: 'center', marginBottom: '32px' }}>Have a question? Tap to ask us directly!</p>
            {faqs.map((f, i) => (
              <div key={i} className="faq-item">
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} aria-controls={`faq-${i}`}>
                  <span>{f.q}</span>
                  <span style={{ color: 'var(--gold)', fontSize: '22px', transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: '0.2s' }} aria-hidden="true">+</span>
                </button>
                <div id={`faq-${i}`} className={`faq-a ${openFaq === i ? 'open' : ''}`} role="region" aria-hidden={openFaq !== i}>
                  <p style={{ marginBottom: '16px' }}>{f.a}</p>
                  <button onClick={() => openWhatsApp('faq', [f.q])} style={{ background: 'var(--wa)', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', minHeight: '48px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>💬 Ask About This</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
          <div className="c" style={{ maxWidth: '600px', textAlign: 'center' }}>
            <div style={{ fontSize: '56px', marginBottom: '20px' }}>💬</div>
            <h2 className="font-display" style={{ marginBottom: '12px' }}>Skip the Form.<br />Just Chat.</h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px' }}>No forms, no emails, no waiting. Just tap and tell us about your project. Get a personalized quote within minutes.</p>
            <button className="btn btn-wa wa-pulse" onClick={() => openWhatsApp('callToAction', [])} style={{ fontSize: '18px', padding: '20px 40px' }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Start Chatting Now
            </button>
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
              {[{ icon: '⚡', text: '2 min response' }, { icon: '🎁', text: 'Free 3D design' }, { icon: '🔒', text: 'No spam ever' }].map((item, i) => (
                <span key={i} style={{ fontSize: '13px', color: '#666' }}>{item.icon} {item.text}</span>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '50px 0', background: '#fff' }}>
          <div className="c">
            <h3 className="font-display" style={{ fontSize: '24px', textAlign: 'center', marginBottom: '8px' }}>Serving Dubai's Finest Communities</h3>
            <p style={{ textAlign: 'center', marginBottom: '28px', color: '#888', fontSize: '14px' }}>Tap your area for local expertise</p>
            <div className="areas-grid">
              {AREAS_SERVED.map((area, i) => (
                <button key={i} onClick={() => openWhatsApp('area', [area])} style={{ background: 'var(--cream)', border: '1px solid #e8e8e8', padding: '12px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', minHeight: '48px', transition: 'all 0.15s' }}>{area}</button>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 0', background: 'var(--charcoal)', color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(37,211,102,0.08) 0%, transparent 70%)' }} />
          <div className="c" style={{ position: 'relative', zIndex: 10 }}>
            <p style={{ fontSize: '12px', color: 'var(--gold-light)', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '20px', fontWeight: '500' }}>Your Dream Villa Awaits</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', marginBottom: '16px', lineHeight: 1.2 }}>One Tap Away From<br />Your Dream Home</h2>
            <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '36px', maxWidth: '500px', margin: '0 auto 36px' }}>800+ homeowners started their journey with a simple WhatsApp message. You're next.</p>
            <button className="btn btn-wa wa-pulse" onClick={() => openWhatsApp('callToAction', [])} style={{ fontSize: '18px', padding: '20px 40px' }}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Let's Create Magic Together
            </button>
          </div>
        </section>

        <footer style={{ padding: '40px 0', background: '#0d0d0d', color: '#fff' }}>
          <div className="c" style={{ textAlign: 'center' }}>
            <span className="font-display" style={{ fontSize: '24px', fontWeight: '600', letterSpacing: '2px' }}>UNICORN</span>
            <p style={{ fontSize: '13px', opacity: 0.5, marginTop: '8px', marginBottom: '20px' }}>Crafting Timeless Villa Transformations Since 2012</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
              {[{ label: 'Villa Renovation', url: 'https://unicornrenovations.com/villa-renovation/' }, { label: 'Interior Design', url: 'https://unicornrenovations.com/interior-design/' }, { label: 'Portfolio', url: 'https://unicornrenovations.com/portfolio/' }, { label: 'Contact', url: 'https://unicornrenovations.com/contact/' }].map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}>{link.label}</a>
              ))}
            </div>
            <p style={{ fontSize: '12px', opacity: 0.4 }}>© {currentYear} Unicorn Renovations. All rights reserved.</p>
          </div>
        </footer>

        <button onClick={() => openWhatsApp('floatingButton', [])} aria-label="Chat on WhatsApp" className="desktop-only wa-pulse" style={{ position: 'fixed', bottom: '28px', right: '28px', width: '64px', height: '64px', background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)', borderRadius: '50%', border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(37, 211, 102, 0.4)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="32" height="32" fill="#fff" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </button>

        <div className={`sticky-b mobile-only ${isHot ? 'hot' : ''}`}>
          <a href="tel:+971585658002" aria-label="Call us" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '10px', padding: '12px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', minHeight: '48px' }}>📞 Call</a>
          <button className="btn btn-wa" onClick={() => openWhatsApp('sticky', [isHot])} style={{ flex: 2, minHeight: '48px', padding: '12px' }}>
            {isHot ? "🔥 I'm Ready!" : '💬 WhatsApp'}
          </button>
        </div>
      </div>
    </>
  );
}
