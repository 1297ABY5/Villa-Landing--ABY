// pages/index.js - WHATSAPP EVERYWHERE EDITION
// Every single click leads to WhatsApp with smart context
// Optimized for Dubai market where WhatsApp is KING

import Head from 'next/head';
import Image from 'next/image';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';

// ============================================
// WHATSAPP CONFIGURATION - THE HEART OF EVERYTHING
// ============================================
const WHATSAPP_NUMBER = '971585658002';

// Context-aware messages based on what user clicked
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
  
  exitIntent: (service) => 
    `Hi! I was just browsing your ${service} page. Before I go, can you quickly tell me about your free consultation?`,
  
  sticky: (engagement) => 
    engagement === 'hot' 
      ? `Hi! 🔥 I've been looking at your site and I'm VERY interested. Let's talk!`
      : `Hi! I have some questions about your renovation services.`,
  
  floatingButton: () => 
    `Hi! I'd like to discuss my renovation project. Are you available to chat?`,
  
  callToAction: () => 
    `Hi! I'm ready to start my villa transformation. What's the first step?`,
  
  default: () => 
    `Hi! I'm interested in your renovation services. Can we chat?`
};

// Universal WhatsApp opener with tracking
const openWhatsApp = (context, params = {}) => {
  let message = WHATSAPP_MESSAGES.default();
  
  // Get the right message based on context
  if (typeof WHATSAPP_MESSAGES[context] === 'function') {
    message = WHATSAPP_MESSAGES[context](...Object.values(params));
  }
  
  // Track the click (Google Ads conversion)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', { 
      send_to: 'AW-612864132/qqQcQNeM-bADEISh7qQC', 
      value: 150000, 
      currency: 'AED',
      event_category: 'WhatsApp',
      event_label: context
    });
    
    // Also track as custom event for analytics
    window.gtag('event', 'whatsapp_click', {
      click_context: context,
      click_params: JSON.stringify(params)
    });
  }
  
  // Open WhatsApp
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
};

// ============================================
// KEYWORD MAPPING (QS Critical - Keep All)
// ============================================
const KEYWORD_MAP = {
  'interior renovation company': {
    h1: 'Interior Renovation Company',
    h2: 'Bespoke Interior Transformations in Dubai',
    service: 'Interior Renovation',
    highlight: 'interior',
    metaDesc: 'Premier interior renovation company in Dubai. 800+ projects completed. Municipality approved. Complimentary 3D visualization.',
  },
  'interior renovation': {
    h1: 'Interior Renovation Dubai',
    h2: 'Elevated Interior Design & Renovation',
    service: 'Interior Renovation',
    highlight: 'interior',
    metaDesc: 'Luxury interior renovation in Dubai. Complete transformations with fixed pricing and 5-year warranty.',
  },
  'villa renovation dubai': {
    h1: 'Villa Renovation Dubai',
    h2: 'Where Architecture Meets Artistry',
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Premier villa renovation in Dubai. 800+ villas transformed. Fixed pricing. 6-8 weeks delivery.',
  },
  'villa renovation in dubai': {
    h1: 'Villa Renovation in Dubai',
    h2: 'Timeless Villa Transformations',
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Luxury villa renovation in Dubai. Municipality approved. 5-year craftsmanship warranty.',
  },
  'villa renovation': {
    h1: 'Villa Renovation Dubai',
    h2: "Dubai's Most Distinguished Villa Renovation Studio",
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Bespoke villa renovation services in Dubai. Fixed pricing. On-time delivery guaranteed.',
  },
  'villa renovations': {
    h1: 'Villa Renovations Dubai',
    h2: 'Crafting Legacy Homes Since 2012',
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Exquisite villa renovations in Dubai by master craftsmen. 800+ projects completed.',
  },
  'villa contractors in dubai': {
    h1: 'Villa Contractors in Dubai',
    h2: 'Licensed Master Contractors',
    service: 'Villa Contracting',
    highlight: 'contractor',
    metaDesc: 'Licensed villa contractors in Dubai. Municipality approved. Fixed price guarantee.',
  },
  'villa contractors': {
    h1: 'Villa Contractors Dubai',
    h2: 'Master Craftsmen for Discerning Homeowners',
    service: 'Villa Contracting',
    highlight: 'contractor',
    metaDesc: 'Elite villa contractors in Dubai. 15+ years mastery. 800+ prestigious projects.',
  },
  'villa renovation contractors': {
    h1: 'Villa Renovation Contractors Dubai',
    h2: 'The Architects of Transformation',
    service: 'Villa Contracting',
    highlight: 'contractor',
    metaDesc: 'Premier villa renovation contractors in Dubai. Licensed. Insured. 5-year warranty.',
  },
  'villa extension': {
    h1: 'Villa Extension Dubai',
    h2: 'Expand Your Living Legacy',
    service: 'Villa Extension',
    highlight: 'extension',
    metaDesc: 'Luxury villa extension Dubai. Additional rooms, floors, outdoor sanctuaries. Municipality approved.',
  },
  'villa extension dubai': {
    h1: 'Villa Extension Dubai',
    h2: 'Seamless Expansion, Timeless Design',
    service: 'Villa Extension',
    highlight: 'extension',
    metaDesc: 'Bespoke villa extension services in Dubai. Expert architects. Fixed pricing.',
  },
  'office fit out dubai': {
    h1: 'Office Fit Out Dubai',
    h2: 'Professional Workspaces, Exceptional Results',
    service: 'Office Fit Out',
    highlight: 'fitout',
    metaDesc: 'Premium office fit out Dubai. Complete commercial solutions. Complimentary 3D design.',
  },
  'office fitout dubai': {
    h1: 'Office Fitout Dubai',
    h2: 'Transforming Commercial Spaces',
    service: 'Office Fit Out',
    highlight: 'fitout',
    metaDesc: 'Expert office fitout Dubai. Turnkey solutions. Municipality approved.',
  },
  'office fit out': {
    h1: 'Office Fit Out Dubai',
    h2: 'Where Productivity Meets Design',
    service: 'Office Fit Out',
    highlight: 'fitout',
    metaDesc: 'Bespoke office fit out services in Dubai. Premium finishes. On-time delivery.',
  },
  'home renovation companies dubai': {
    h1: 'Home Renovation Company Dubai',
    h2: "Dubai's Premier Home Transformation Studio",
    service: 'Home Renovation',
    highlight: 'home',
    metaDesc: 'Leading home renovation company in Dubai. 800+ homes transformed. Complimentary consultation.',
  },
  'home renovation': {
    h1: 'Home Renovation Dubai',
    h2: 'Reimagine Your Living Space',
    service: 'Home Renovation',
    highlight: 'home',
    metaDesc: 'Luxury home renovation Dubai. Complete makeovers. Fixed price guarantee.',
  },
  'home remodeling': {
    h1: 'Home Remodeling Dubai',
    h2: 'Architectural Excellence, Personal Touch',
    service: 'Home Remodeling',
    highlight: 'home',
    metaDesc: 'Bespoke home remodeling Dubai. Kitchen, bathroom, complete transformation.',
  },
  'renovation companies': {
    h1: 'Renovation Company Dubai',
    h2: "Dubai's Distinguished Renovation Atelier",
    service: 'Renovation Services',
    highlight: 'company',
    metaDesc: 'Premier renovation company in Dubai. Villa, home, interior. 800+ projects.',
  },
  'renovation company in dubai': {
    h1: 'Renovation Company in Dubai',
    h2: 'Crafting Extraordinary Spaces',
    service: 'Renovation Services',
    highlight: 'company',
    metaDesc: 'Elite renovation company in Dubai. Municipality approved. Complimentary consultation.',
  },
  'apartment renovation': {
    h1: 'Apartment Renovation Dubai',
    h2: 'Elevated Urban Living',
    service: 'Apartment Renovation',
    highlight: 'apartment',
    metaDesc: 'Luxury apartment renovation Dubai. Studio to penthouse. Complimentary 3D design.',
  },
  'damac hills villa renovation': {
    h1: 'DAMAC Hills Villa Renovation',
    h2: 'Local Expertise, Global Standards',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'DAMAC Hills villa renovation specialists. Community experts. Complimentary consultation.',
  },
  'arabian ranches villa renovation': {
    h1: 'Arabian Ranches Villa Renovation',
    h2: 'Transforming Arabian Ranches Since 2012',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'Arabian Ranches villa renovation. 100+ projects in community. Local specialists.',
  },
  'palm jumeirah villa renovation': {
    h1: 'Palm Jumeirah Villa Renovation',
    h2: 'Iconic Homes Deserve Iconic Craftsmanship',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'Palm Jumeirah villa renovation. Luxury waterfront specialists. Complimentary 3D design.',
  },
  'emirates hills villa renovation': {
    h1: 'Emirates Hills Villa Renovation',
    h2: 'Elevating Emirates Hills Estates',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'Emirates Hills villa renovation. Ultra-luxury specialists. Municipality approved.',
  },
  'dubai hills villa renovation': {
    h1: 'Dubai Hills Villa Renovation',
    h2: 'Modern Elegance in Dubai Hills',
    service: 'Villa Renovation',
    highlight: 'location',
    metaDesc: 'Dubai Hills villa renovation specialists. Contemporary design. Complimentary quote.',
  },
  default: {
    h1: 'Villa Renovation Dubai',
    h2: 'Where Vision Becomes Legacy',
    service: 'Villa Renovation',
    highlight: 'villa',
    metaDesc: 'Premier villa renovation studio in Dubai. 800+ projects. Complimentary 3D visualization.',
  },
};

// ============================================
// SERVICES - All Clickable to WhatsApp
// ============================================
const ALL_SERVICES = [
  { id: 'villa-renovation', title: 'Villa Renovation', desc: 'Complete villa transformation with bespoke finishes', price: 'From AED 150,000', image: '/villa-renovation.webp', tags: ['villa', 'home', 'company', 'contractor', 'location'] },
  { id: 'interior-renovation', title: 'Interior Renovation', desc: 'Reimagine your living spaces with artistry', price: 'From AED 60,000', image: '/Interior-Design.webp', tags: ['interior', 'fitout', 'home', 'apartment'] },
  { id: 'villa-extension', title: 'Villa Extension', desc: 'Seamlessly expand your living legacy', price: 'From AED 120,000', image: '/villa-extension.webp', tags: ['extension', 'villa', 'contractor'] },
  { id: 'office-fitout', title: 'Office Fit Out', desc: 'Professional workspaces crafted for success', price: 'From AED 80,000', image: '/office-fitout.webp', tags: ['fitout', 'office', 'commercial'] },
  { id: 'kitchen', title: 'Kitchen Renovation', desc: 'Culinary spaces crafted for modern living', price: 'From AED 45,000', image: '/v16.webp', tags: ['interior', 'home', 'villa', 'apartment'] },
  { id: 'bathroom', title: 'Bathroom Renovation', desc: 'Spa-inspired sanctuaries of tranquility', price: 'From AED 25,000', image: '/v12.webp', tags: ['interior', 'home', 'villa', 'apartment'] },
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
// PROCESS STEPS - All Clickable
// ============================================
const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', desc: 'Complimentary site visit & vision alignment', icon: '◈', time: 'Day 1', cta: 'Book Free Visit' },
  { step: '02', title: 'Design', desc: '3D visualization & detailed proposal', icon: '◇', time: 'Days 2-5', cta: 'See 3D Samples' },
  { step: '03', title: 'Approvals', desc: 'Municipality permits handled seamlessly', icon: '◆', time: 'Days 6-14', cta: 'Learn More' },
  { step: '04', title: 'Craft', desc: 'Master execution with weekly updates', icon: '▣', time: 'Weeks 3-7', cta: 'View Timeline' },
  { step: '05', title: 'Handover', desc: 'Final walkthrough & warranty activation', icon: '✧', time: 'Week 8', cta: 'Start Now' },
];

// ============================================
// TESTIMONIALS - All Clickable
// ============================================
const TESTIMONIALS = [
  { 
    name: 'Ahmed Al-Rashid', 
    location: 'Emirates Hills', 
    text: 'An exceptional experience from start to finish. The team understood our vision for a contemporary yet timeless aesthetic. The 3D visualization was remarkably accurate, and the craftsmanship exceeded our highest expectations.',
    rating: 5,
    project: 'Complete Villa Renovation',
    avatar: '/avatar-1.webp'
  },
  { 
    name: 'Sarah Mitchell', 
    location: 'Arabian Ranches', 
    text: 'We interviewed five contractors before choosing Unicorn. Their attention to detail, transparent pricing, and respect for our home during construction set them apart. The result is nothing short of transformative.',
    rating: 5,
    project: 'Interior Transformation',
    avatar: '/avatar-2.webp'
  },
  { 
    name: 'James & Victoria Chen', 
    location: 'Palm Jumeirah', 
    text: 'Our waterfront villa required specialists who understood both luxury and the unique challenges of Palm properties. Unicorn delivered impeccably—on time, on budget, and beyond our vision.',
    rating: 5,
    project: 'Villa Extension',
    avatar: '/avatar-3.webp'
  },
];

// ============================================
// VIDEO TESTIMONIALS
// ============================================
const VIDEO_TESTIMONIALS = [
  {
    id: 'video-1',
    name: 'Fatima Al-Rashid',
    location: 'Emirates Hills',
    project: 'Villa Renovation',
    thumbnail: '/video-thumb-1.jpg',
    videoSrc: '/testimonial-1.mp4',
    duration: '0:06'
  },
  {
    id: 'video-2',
    name: 'Michelle Chen',
    location: 'Arabian Ranches',
    project: 'Interior Renovation',
    thumbnail: '/video-thumb-2.jpg',
    videoSrc: '/testimonial-2.mp4',
    duration: '0:06'
  },
  {
    id: 'video-3',
    name: 'Marco Valentino',
    location: 'Palm Jumeirah',
    project: 'Full Transformation',
    thumbnail: '/video-thumb-3.jpg',
    videoSrc: '/testimonial-3.mp4',
    duration: '0:06'
  },
];

// ============================================
// TRUST BADGES - All Clickable
// ============================================
const TRUST_BADGES = [
  { icon: '◈', title: 'DED Licensed', desc: 'Fully registered contractor', context: 'DED Licensed contractor' },
  { icon: '◇', title: 'Municipality Approved', desc: 'All permits handled', context: 'Municipality Approved' },
  { icon: '◆', title: 'Fully Insured', desc: 'Complete coverage', context: 'Fully Insured' },
  { icon: '✧', title: 'Flexible Payment', desc: 'Milestone-based plans', context: 'offering flexible payment plans' },
];

// ============================================
// WHY CHOOSE US - All Clickable
// ============================================
const WHY_CHOOSE_US = [
  { icon: '◈', title: 'Municipality Approved', desc: 'All permits and approvals handled seamlessly by our dedicated team', context: 'municipality approvals' },
  { icon: '◇', title: 'Fixed Price Guarantee', desc: 'Transparent pricing with no hidden costs or surprise additions', context: 'fixed pricing guarantee' },
  { icon: '◆', title: 'On-Time Delivery', desc: '6-8 weeks completion with weekly progress updates', context: 'project timeline' },
  { icon: '✧', title: '5-Year Warranty', desc: 'Comprehensive craftsmanship coverage for peace of mind', context: '5-year warranty' },
  { icon: '❖', title: 'Complimentary 3D Design', desc: 'Visualize your transformation before commitment', context: 'free 3D design service' },
  { icon: '✦', title: '4.9/5 Client Rating', desc: '287 verified reviews from distinguished homeowners', context: 'client reviews and rating' },
];

// ============================================
// AREAS SERVED - All Clickable
// ============================================
const AREAS_SERVED = [
  'Emirates Hills', 'Palm Jumeirah', 'Dubai Hills Estate', 'Arabian Ranches',
  'DAMAC Hills', 'Jumeirah Golf Estates', 'Al Barari', 'District One',
  'The Lakes', 'The Meadows', 'Jumeirah Islands', 'MBR City',
  'Victory Heights', 'Motor City', 'JVC', 'Al Barsha', 'Jumeirah', 'The Springs',
];

// ============================================
// SSR FUNCTIONS
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
    { q: `What is the investment range for ${service.toLowerCase()} in ${loc}?`, a: `Investment varies based on scope, size, and specification level. We provide a comprehensive fixed-price proposal following a complimentary site assessment.` },
    { q: `What is the typical timeline for a ${service.toLowerCase()} project?`, a: `Most projects reach completion within 6–8 weeks, depending on approvals, material procurement, and scope complexity.` },
    { q: `Do you manage municipality permits and approvals?`, a: `Absolutely. We handle all required approvals and coordinate documentation seamlessly for your project type.` },
    { q: `Is your quotation truly fixed?`, a: `Yes. We provide a fixed-price proposal for the agreed scope. No surprises, ever.` },
    { q: `What warranty coverage do you provide?`, a: `We provide up to 5 years craftsmanship warranty depending on scope, complemented by manufacturer warranties.` },
  ];
}

export async function getServerSideProps(ctx) {
  const q = ctx.query || {};
  const keywordRaw = q.kw || q.keyword || q.utm_term || q.q || '';
  const locationRaw = q.loc || q.location || 'Dubai';
  const { content, services } = resolveKeywordConfig(keywordRaw, locationRaw);
  return { props: { initialContent: content, initialServices: services } };
}

// ============================================
// INTERSECTION OBSERVER HOOK
// ============================================
function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

// ============================================
// CLICKABLE CARD COMPONENT - Everything Leads to WhatsApp
// ============================================
function ClickableCard({ children, onClick, className = '', style = {} }) {
  return (
    <div 
      onClick={onClick}
      className={`clickable-card ${className}`}
      style={{ 
        cursor: 'pointer', 
        transition: 'all 0.3s ease',
        ...style 
      }}
    >
      {children}
    </div>
  );
}

// ============================================
// LAZY VIDEO COMPONENT
// ============================================
function LazyVideo({ video, isVisible, onChatClick }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(true);
  };

  const handleChatClick = (e) => {
    e.stopPropagation();
    onChatClick();
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play();
    }
  }, [isPlaying]);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '320px',
    margin: '0 auto',
    borderRadius: '16px',
    overflow: 'hidden',
    background: '#0a0a0a',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  };

  return (
    <div style={containerStyle} className="video-card">
      <div style={{ paddingBottom: '148%', position: 'relative' }}>
        {isPlaying ? (
          <video
            ref={videoRef}
            src={video.videoSrc}
            controls
            playsInline
            poster={video.thumbnail}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <>
            {isVisible && (
              <Image
                src={video.thumbnail}
                alt={`${video.name} video testimonial`}
                fill
                sizes="(max-width: 768px) 280px, 320px"
                style={{ objectFit: 'cover' }}
                loading="lazy"
                quality={75}
              />
            )}
            
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.85) 100%)',
            }} />

            {/* Play Button */}
            <div 
              onClick={handlePlay}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '72px',
                height: '72px',
                background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(201, 162, 39, 0.4)',
                cursor: 'pointer',
                paddingLeft: '4px',
              }}
              className="play-btn"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>

            {/* Duration Badge */}
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '24px',
              fontSize: '13px',
              fontWeight: '500',
            }}>
              ▶ {video.duration}
            </div>

            {/* Project Badge */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '24px',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              {video.project}
            </div>

            {/* Client Info + WhatsApp CTA */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px',
              color: '#fff',
            }}>
              <p className="font-display" style={{ 
                fontWeight: '600', 
                fontSize: '20px', 
                marginBottom: '4px',
              }}>
                {video.name}
              </p>
              <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '12px' }}>
                <span style={{ color: 'var(--gold-light)' }}>◆</span> {video.location}
              </p>
              
              {/* WhatsApp CTA */}
              <button
                onClick={handleChatClick}
                style={{
                  background: '#25D366',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '24px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                I Want This Too!
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function WhatsAppEverywhereLP({ initialContent, initialServices }) {
  const [slotsLeft, setSlotsLeft] = useState(3);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [engagement, setEngagement] = useState('new'); // new, browsing, engaged, hot
  const exitPopupShown = useRef(false);

  // Intersection observers
  const [heroRef, heroInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [servicesRef, servicesInView] = useInView();
  const [processRef, processInView] = useInView();
  const [testimonialsRef, testimonialsInView] = useInView();
  const [videoRef, videoInView] = useInView();
  const [faqRef, faqInView] = useInView();
  const [whyRef, whyInView] = useInView();

  const content = initialContent;
  const services = initialServices;
  const faqs = useMemo(() => buildFaq(content), [content]);

  // Dynamic urgency
  useEffect(() => {
    const updateSlots = () => {
      const h = new Date().getHours();
      if (h >= 20) setSlotsLeft(1);
      else if (h >= 16) setSlotsLeft(2);
      else if (h >= 12) setSlotsLeft(3);
      else setSlotsLeft(4);
    };
    updateSlots();
    const t = setInterval(updateSlots, 60000);
    return () => clearInterval(t);
  }, []);

  // Scroll tracking + engagement level
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = Math.round((scrollTop / docHeight) * 100);
      setScrollDepth(scrollPct);

      // Update engagement level
      if (scrollPct >= 75) setEngagement('hot');
      else if (scrollPct >= 50) setEngagement('engaged');
      else if (scrollPct > 20) setEngagement('browsing');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 50 && !exitPopupShown.current) {
        exitPopupShown.current = true;
        setShowExitPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // Schema markup
  const faqSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
  }), [faqs]);

  const reviewSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Unicorn Renovations",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "287", "bestRating": "5" }
  }), []);

  return (
    <>
      <Head>
        <title>{content.h1} | Bespoke Transformations | Unicorn Renovations</title>
        <meta name="description" content={content.metaDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href="https://wa.me" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "name": "Unicorn Renovations",
          "description": content.metaDesc,
          "url": "https://dubailuxrenovate.com",
          "telephone": "+971585658002",
          "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "287" },
          "areaServed": AREAS_SERVED,
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
          
          :root {
            --gold: #c9a227;
            --gold-light: #d4af37;
            --gold-dark: #a68521;
            --gold-muted: #b8860b;
            --charcoal: #1a1a1a;
            --charcoal-light: #2d2d2d;
            --cream: #faf8f5;
            --cream-dark: #f5f0e8;
            --whatsapp: #25D366;
            --whatsapp-dark: #128c7e;
          }
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
            color: var(--charcoal); 
            line-height: 1.6; 
            background: #fff;
            -webkit-font-smoothing: antialiased;
          }
          
          .font-display { font-family: 'Playfair Display', Georgia, serif; }
          .container { max-width: 1400px; margin: 0 auto; padding: 0 24px; }
          
          /* Clickable Card Hover */
          .clickable-card {
            position: relative;
          }
          .clickable-card::after {
            content: '💬 Tap to Chat';
            position: absolute;
            bottom: 12px;
            right: 12px;
            background: var(--whatsapp);
            color: #fff;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 11px;
            font-weight: 600;
            opacity: 0;
            transform: translateY(8px);
            transition: all 0.3s ease;
          }
          .clickable-card:hover::after {
            opacity: 1;
            transform: translateY(0);
          }
          .clickable-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(37, 211, 102, 0.15);
          }
          
          /* WhatsApp Pulse Animation */
          @keyframes whatsapp-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
            50% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
          }
          .whatsapp-pulse {
            animation: whatsapp-pulse 2s infinite;
          }
          
          /* Buttons */
          .btn-whatsapp {
            background: linear-gradient(135deg, var(--whatsapp) 0%, var(--whatsapp-dark) 100%);
            color: #fff;
            border: none;
            padding: 18px 36px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            display: inline-flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
          }
          .btn-whatsapp:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 8px 30px rgba(37, 211, 102, 0.4);
          }
          
          .btn-gold {
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
            color: #fff;
            border: none;
            padding: 18px 36px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.4s ease;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            box-shadow: 0 4px 20px rgba(201, 162, 39, 0.3);
          }
          .btn-gold:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(201, 162, 39, 0.4);
          }
          
          .btn-outline-light {
            background: transparent;
            color: #fff;
            border: 1px solid rgba(255,255,255,0.4);
            padding: 18px 36px;
            font-size: 16px;
            font-weight: 500;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.4s ease;
            text-transform: uppercase;
            letter-spacing: 1.5px;
          }
          .btn-outline-light:hover {
            background: rgba(255,255,255,0.1);
            border-color: rgba(255,255,255,0.6);
          }
          
          .btn-dark {
            background: var(--charcoal);
            color: #fff;
            border: none;
            padding: 18px 36px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.4s ease;
          }
          .btn-dark:hover {
            background: var(--charcoal-light);
            transform: translateY(-2px);
          }
          
          /* Cards */
          .luxury-card {
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid #f0f0f0;
            cursor: pointer;
            position: relative;
          }
          .luxury-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            border-color: var(--whatsapp);
          }
          .luxury-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--whatsapp), var(--gold));
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .luxury-card:hover::before {
            opacity: 1;
          }
          
          /* Animations */
          .fade-up {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .fade-up.visible {
            opacity: 1;
            transform: translateY(0);
          }
          .fade-up-delay-1 { transition-delay: 0.1s; }
          .fade-up-delay-2 { transition-delay: 0.2s; }
          .fade-up-delay-3 { transition-delay: 0.3s; }
          .fade-up-delay-4 { transition-delay: 0.4s; }
          .fade-up-delay-5 { transition-delay: 0.5s; }
          
          /* FAQ */
          .faq-item {
            border-bottom: 1px solid #e8e8e8;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .faq-item:hover { background: var(--cream); }
          .faq-summary {
            padding: 24px 0;
            cursor: pointer;
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            font-weight: 500;
          }
          .faq-summary::-webkit-details-marker { display: none; }
          .faq-summary::after {
            content: '+';
            font-size: 24px;
            color: var(--gold);
            font-weight: 300;
            transition: transform 0.3s ease;
          }
          details[open] .faq-summary::after {
            transform: rotate(45deg);
          }
          .faq-content {
            padding: 0 0 24px 0;
            color: #666;
            line-height: 1.8;
          }
          
          /* Exit Popup */
          .exit-popup-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
          }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          
          /* Sticky Bar */
          .sticky-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
            transition: all 0.3s ease;
          }
          .sticky-bar.new { background: var(--charcoal); }
          .sticky-bar.browsing { background: var(--charcoal); }
          .sticky-bar.engaged { background: linear-gradient(135deg, var(--charcoal) 0%, #2a2a2a 100%); }
          .sticky-bar.hot { background: linear-gradient(135deg, var(--whatsapp-dark) 0%, var(--whatsapp) 100%); }
          
          /* Responsive */
          @media (max-width: 768px) {
            .container { padding: 0 16px; }
            .hide-mobile { display: none !important; }
            .btn-whatsapp, .btn-gold, .btn-outline-light, .btn-dark {
              padding: 16px 24px;
              font-size: 14px;
              width: 100%;
              justify-content: center;
            }
            section { padding: 60px 0 !important; }
            .services-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
            .process-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
            .testimonials-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
            .video-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
            .why-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
            .areas-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .hero-stats { justify-content: center !important; gap: 24px !important; text-align: center; }
            .hero-stats > div { text-align: center !important; min-width: 100px !important; }
            .clickable-card::after { display: none; }
          }
          @media (min-width: 769px) {
            .hide-desktop { display: none !important; }
            .video-grid { grid-template-columns: repeat(3, 320px) !important; }
            .services-grid { grid-template-columns: repeat(3, 1fr) !important; }
            .process-grid { grid-template-columns: repeat(5, 1fr) !important; }
            .testimonials-grid { grid-template-columns: repeat(3, 1fr) !important; }
            .why-grid { grid-template-columns: repeat(3, 1fr) !important; }
            .video-card:hover { transform: translateY(-12px) !important; box-shadow: 0 30px 80px rgba(0,0,0,0.5) !important; }
            .video-card:hover .play-btn { transform: scale(1.1); }
          }
        `}} />
      </Head>

      <div style={{ minHeight: '100vh' }}>
        
        {/* EXIT INTENT POPUP */}
        {showExitPopup && (
          <div className="exit-popup-overlay" onClick={() => setShowExitPopup(false)}>
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '48px',
                maxWidth: '480px',
                textAlign: 'center',
                position: 'relative',
                margin: '20px'
              }}
            >
              <button 
                onClick={() => setShowExitPopup(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#999'
                }}
              >×</button>
              
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎁</div>
              <h2 className="font-display" style={{ fontSize: '28px', marginBottom: '12px' }}>
                Wait! Don't Leave Empty-Handed
              </h2>
              <p style={{ color: '#666', marginBottom: '24px', fontSize: '16px' }}>
                Get a <strong>FREE 3D visualization</strong> of your dream renovation – no strings attached!
              </p>
              
              <button 
                onClick={() => {
                  openWhatsApp('exitIntent', { service: content.service });
                  setShowExitPopup(false);
                }}
                className="btn-whatsapp whatsapp-pulse"
                style={{ width: '100%', fontSize: '18px', padding: '20px' }}
              >
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Claim My Free 3D Design
              </button>
              
              <p style={{ marginTop: '16px', fontSize: '13px', color: '#999' }}>
                ⏱️ Response within 2 minutes • No spam, ever
              </p>
            </div>
          </div>
        )}

        {/* URGENCY BAR - Clickable */}
        <div 
          onClick={() => openWhatsApp('urgency', { slotsLeft })}
          style={{ 
            background: 'linear-gradient(90deg, var(--charcoal) 0%, var(--charcoal-light) 100%)', 
            color: '#fff', 
            padding: '14px 24px', 
            textAlign: 'center', 
            fontSize: '14px', 
            letterSpacing: '0.5px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          <span style={{ color: 'var(--gold-light)' }}>✦</span>
          &nbsp;&nbsp;FREE 3D VISUALIZATION&nbsp;&nbsp;•&nbsp;&nbsp;
          <strong>Only {slotsLeft} Consultation Slots Left</strong>&nbsp;&nbsp;•&nbsp;&nbsp;
          <span style={{ 
            background: 'var(--whatsapp)', 
            padding: '4px 12px', 
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            TAP TO BOOK →
          </span>
        </div>

        {/* HEADER */}
        <header style={{ 
          background: 'rgba(255,255,255,0.95)', 
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)', 
          padding: '20px 0', 
          position: 'sticky', 
          top: 0, 
          zIndex: 50 
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="https://unicornrenovations.com" style={{ textDecoration: 'none' }}>
              <span className="font-display" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--charcoal)', letterSpacing: '2px' }}>
                UNICORN
              </span>
            </a>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span 
                className="hide-mobile" 
                onClick={() => openWhatsApp('trustBadge', { badge: 'rated 4.9/5' })}
                style={{ fontSize: '13px', color: '#888', cursor: 'pointer' }}
              >
                ★ 4.9/5 from 287 Reviews
              </span>
              <button 
                onClick={() => openWhatsApp('hero', { service: content.service, location: content.location })}
                className="btn-whatsapp"
                style={{ padding: '12px 20px', fontSize: '13px', borderRadius: '8px' }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                <span className="hide-mobile">Chat Now</span>
                <span className="hide-desktop">💬</span>
              </button>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section ref={heroRef} style={{ 
          position: 'relative', 
          minHeight: '90vh', 
          display: 'flex', 
          alignItems: 'center',
          background: 'var(--charcoal)'
        }}>
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <Image
              src="/villa-renovation.webp"
              alt={`${content.service} in ${content.location}`}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', opacity: 0.4, filter: 'brightness(0.6)' }}
              priority
              quality={75}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,26,26,0.7) 0%, rgba(26,26,26,0.9) 100%)' }} />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 10, color: '#fff', paddingTop: '40px', paddingBottom: '60px' }}>
            <div className={`fade-up ${heroInView ? 'visible' : ''}`}>
              
              {/* Trust Badge - Clickable */}
              <div 
                onClick={() => openWhatsApp('trustBadge', { badge: 'rated 4.9/5 with 287 reviews' })}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  background: 'rgba(255,255,255,0.08)', 
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '10px 20px', 
                  borderRadius: '40px', 
                  marginBottom: '32px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ color: 'var(--gold-light)' }}>★★★★★</span>
                <span style={{ fontSize: '14px' }}>4.9 Rating • 287 Reviews</span>
                <span style={{ background: 'var(--whatsapp)', padding: '2px 8px', borderRadius: '10px', fontSize: '11px' }}>Verify →</span>
              </div>

              <h1 className="font-display" style={{ 
                fontSize: 'clamp(40px, 7vw, 80px)', 
                fontWeight: '500', 
                lineHeight: 1.1, 
                marginBottom: '16px',
                letterSpacing: '-1px'
              }}>
                {content.h1}
              </h1>

              <h2 className="font-display" style={{ 
                fontSize: 'clamp(20px, 3vw, 32px)', 
                fontWeight: '400', 
                color: 'var(--gold-light)',
                marginBottom: '24px',
                fontStyle: 'italic'
              }}>
                {content.h2}
              </h2>

              <p style={{ 
                fontSize: '18px', 
                opacity: 0.8, 
                maxWidth: '600px', 
                marginBottom: '40px',
                lineHeight: 1.7,
                fontWeight: '300'
              }}>
                Seeking exceptional <strong style={{ fontWeight: '500' }}>{content.keyword}</strong> in <strong style={{ fontWeight: '500' }}>{content.location}</strong>? 
                Chat with us now – get a free 3D visualization in 24 hours!
              </p>

              {/* Stats Row - All Clickable */}
              <div className="hero-stats" style={{ display: 'flex', gap: '32px', marginBottom: '48px', flexWrap: 'wrap' }}>
                {[
                  { num: '800+', label: 'Villas Transformed', context: 'your 800+ completed projects' },
                  { num: '15+', label: 'Years of Mastery', context: 'your 15+ years of experience' },
                  { num: '5yr', label: 'Warranty', context: '5-year warranty coverage' },
                ].map((s, i) => (
                  <div 
                    key={i} 
                    onClick={() => openWhatsApp('trustBadge', { badge: s.context })}
                    style={{ textAlign: 'left', minWidth: '120px', cursor: 'pointer' }}
                  >
                    <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--gold-light)', marginBottom: '4px' }}>{s.num}</div>
                    <div style={{ fontSize: '12px', opacity: 0.7, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
                <button 
                  onClick={() => openWhatsApp('hero', { service: content.service, location: content.location })}
                  className="btn-whatsapp whatsapp-pulse"
                  style={{ fontSize: '18px', padding: '20px 36px' }}
                >
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Chat With Us Now
                </button>
                <p style={{ fontSize: '14px', opacity: 0.7, textAlign: 'center' }}>
                  ⚡ Average response: 2 minutes • Free consultation
                </p>
              </div>

              {/* Trust Points - All Clickable */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '32px' }}>
                {[
                  { text: '✓ Free 3D Design', context: 'free 3D design service' },
                  { text: '✓ Fixed Pricing', context: 'fixed pricing guarantee' },
                  { text: '✓ Municipality Approved', context: 'municipality approvals' },
                  { text: '✓ 5-Year Warranty', context: '5-year warranty' },
                ].map((item, i) => (
                  <span 
                    key={i}
                    onClick={() => openWhatsApp('trustBadge', { badge: item.context })}
                    style={{ 
                      fontSize: '13px', 
                      opacity: 0.8, 
                      cursor: 'pointer',
                      padding: '6px 12px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '20px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR - All Clickable */}
        <section ref={statsRef} style={{ padding: '80px 0', background: 'var(--cream)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', textAlign: 'center' }}>
              {TRUST_BADGES.map((item, i) => (
                <ClickableCard 
                  key={i} 
                  onClick={() => openWhatsApp('trustBadge', { badge: item.context })}
                  className={`fade-up fade-up-delay-${i+1} ${statsInView ? 'visible' : ''}`}
                  style={{ padding: '24px', borderRadius: '12px', background: '#fff' }}
                >
                  <div style={{ fontSize: '32px', color: 'var(--gold)', marginBottom: '16px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>{item.desc}</p>
                  <span style={{ fontSize: '12px', color: 'var(--whatsapp)', fontWeight: '600' }}>Learn More →</span>
                </ClickableCard>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES - All Clickable */}
        <section ref={servicesRef} style={{ padding: '100px 0', background: '#fff' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '13px', color: 'var(--gold)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: '500' }}>
                Our Expertise
              </p>
              <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '500', marginBottom: '16px' }}>
                {content.service} Services
              </h2>
              <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                Tap any service to chat about your project
              </p>
            </div>

            <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
              {services.map((s, i) => (
                <div 
                  key={i} 
                  className={`luxury-card fade-up fade-up-delay-${i+1} ${servicesInView ? 'visible' : ''}`}
                  onClick={() => openWhatsApp('service', { serviceName: s.title, price: s.price })}
                >
                  <div style={{ position: 'relative', height: '240px', background: 'var(--cream)' }}>
                    <Image src={s.image} alt={`${s.title} in ${content.location}`} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: 'cover' }} loading={i < 2 ? 'eager' : 'lazy'} quality={70} />
                    {/* WhatsApp overlay on hover */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 50%, rgba(37, 211, 102, 0.9) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      padding: '20px'
                    }} className="service-overlay">
                      <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>
                        💬 Tap to discuss this service
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '28px' }}>
                    <h3 className="font-display" style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px' }}>{s.title}</h3>
                    <p style={{ fontSize: '15px', color: '#666', marginBottom: '16px', lineHeight: 1.6 }}>{s.desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '18px', fontWeight: '600', color: 'var(--gold-dark)' }}>{s.price}</p>
                      <span style={{ 
                        background: 'var(--whatsapp)', 
                        color: '#fff', 
                        padding: '8px 16px', 
                        borderRadius: '20px', 
                        fontSize: '13px',
                        fontWeight: '600'
                      }}>
                        Get Quote →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS - All Steps Clickable */}
        <section ref={processRef} style={{ padding: '100px 0', background: 'var(--charcoal)', color: '#fff' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '13px', color: 'var(--gold-light)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: '500' }}>
                The Journey
              </p>
              <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '500', marginBottom: '16px' }}>
                Our {content.service} Process
              </h2>
              <p style={{ fontSize: '18px', opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
                Tap any step to start your journey
              </p>
            </div>

            <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              {PROCESS_STEPS.map((step, i) => (
                <ClickableCard 
                  key={i} 
                  onClick={() => openWhatsApp('process', { stepName: step.title })}
                  className={`fade-up fade-up-delay-${i+1} ${processInView ? 'visible' : ''}`}
                  style={{ 
                    textAlign: 'center', 
                    padding: '40px 24px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <div style={{ fontSize: '14px', color: 'var(--gold-light)', letterSpacing: '2px', marginBottom: '16px', fontWeight: '600' }}>
                    {step.step}
                  </div>
                  <div style={{ fontSize: '28px', marginBottom: '16px', color: 'var(--gold-light)' }}>{step.icon}</div>
                  <h3 className="font-display" style={{ fontSize: '20px', fontWeight: '500', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: '12px' }}>{step.desc}</p>
                  <span style={{ fontSize: '12px', color: 'var(--gold-muted)', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                    {step.time}
                  </span>
                  <span style={{ 
                    background: 'var(--whatsapp)', 
                    color: '#fff', 
                    padding: '8px 16px', 
                    borderRadius: '20px', 
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {step.cta} →
                  </span>
                </ClickableCard>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US - All Clickable */}
        <section ref={whyRef} style={{ padding: '100px 0', background: '#fff' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '13px', color: 'var(--gold)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: '500' }}>
                The Difference
              </p>
              <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '500' }}>
                Why Discerning Homeowners Choose Us
              </h2>
            </div>

            <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {WHY_CHOOSE_US.map((item, i) => (
                <ClickableCard 
                  key={i} 
                  onClick={() => openWhatsApp('trustBadge', { badge: item.context })}
                  className={`fade-up fade-up-delay-${i % 3 + 1} ${whyInView ? 'visible' : ''}`}
                  style={{ padding: '32px', background: 'var(--cream)', borderRadius: '8px' }}
                >
                  <div style={{ fontSize: '28px', color: 'var(--gold)', marginBottom: '20px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>{item.title}</h3>
                  <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7, marginBottom: '16px' }}>{item.desc}</p>
                  <span style={{ fontSize: '13px', color: 'var(--whatsapp)', fontWeight: '600' }}>Ask About This →</span>
                </ClickableCard>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS - All Clickable */}
        <section ref={testimonialsRef} style={{ padding: '100px 0', background: 'var(--cream)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '13px', color: 'var(--gold)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: '500' }}>
                Client Stories
              </p>
              <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '500', marginBottom: '16px' }}>
                Voices of Transformation
              </h2>
              <p style={{ fontSize: '18px', color: '#666' }}>
                Tap any review to start your transformation
              </p>
            </div>

            <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
              {TESTIMONIALS.map((t, i) => (
                <ClickableCard 
                  key={i} 
                  onClick={() => openWhatsApp('testimonial', { clientName: t.name, project: t.project })}
                  className={`fade-up fade-up-delay-${i+1} ${testimonialsInView ? 'visible' : ''}`}
                  style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
                >
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', color: 'var(--gold)' }}>
                    {[...Array(t.rating)].map((_, j) => <span key={j}>★</span>)}
                  </div>
                  <p className="font-display" style={{ fontSize: '18px', color: '#444', marginBottom: '28px', lineHeight: 1.8, fontStyle: 'italic' }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <p style={{ fontWeight: '600', fontSize: '16px' }}>{t.name}</p>
                      <p style={{ fontSize: '14px', color: '#888' }}>{t.location}</p>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--gold-dark)', background: 'var(--cream)', padding: '6px 12px', borderRadius: '4px' }}>
                      {t.project}
                    </span>
                  </div>
                  <div style={{ 
                    background: 'var(--whatsapp)', 
                    color: '#fff', 
                    padding: '12px', 
                    borderRadius: '8px', 
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    💬 I Want Results Like This!
                  </div>
                </ClickableCard>
              ))}
            </div>
          </div>
        </section>

        {/* VIDEO TESTIMONIALS */}
        <section ref={videoRef} style={{ padding: '100px 0', background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)', overflow: 'hidden' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '13px', color: 'var(--gold-light)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: '500' }}>
                Hear Their Stories
              </p>
              <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '500', marginBottom: '16px', color: '#fff' }}>
                Video Testimonials
              </h2>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto' }}>
                Watch, then tap "I Want This Too!" to start your journey
              </p>
            </div>

            <div className="video-grid" style={{ display: 'grid', gap: '32px', justifyContent: 'center' }}>
              {VIDEO_TESTIMONIALS.map((video, i) => (
                <div key={video.id} className={`fade-up fade-up-delay-${i+1} ${videoInView ? 'visible' : ''}`}>
                  <LazyVideo 
                    video={video} 
                    isVisible={videoInView} 
                    onChatClick={() => openWhatsApp('videoTestimonial', { clientName: video.name, location: video.location })}
                  />
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '48px', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              <span style={{ color: 'var(--gold-light)' }}>★★★★★</span>
              &nbsp;&nbsp;Join 800+ satisfied homeowners
            </div>
          </div>
        </section>

        {/* FAQ - All Questions Clickable */}
        <section ref={faqRef} style={{ padding: '100px 0', background: '#fff' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '13px', color: 'var(--gold)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: '500' }}>
                Common Questions
              </p>
              <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '500', marginBottom: '16px' }}>
                {content.service} FAQ
              </h2>
              <p style={{ fontSize: '16px', color: '#666' }}>
                Have a question? Tap to ask us directly!
              </p>
            </div>
            
            <div className={`fade-up ${faqInView ? 'visible' : ''}`}>
              {faqs.map((f, idx) => (
                <details key={idx} className="faq-item">
                  <summary className="faq-summary">{f.q}</summary>
                  <div className="faq-content">
                    <p style={{ marginBottom: '20px' }}>{f.a}</p>
                    <button 
                      onClick={() => openWhatsApp('faq', { question: f.q })}
                      style={{
                        background: 'var(--whatsapp)',
                        color: '#fff',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '24px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      Ask About This
                    </button>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* INSTANT QUOTE SECTION - Replaces Form */}
        <section style={{ padding: '100px 0', background: 'var(--cream)' }}>
          <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>💬</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '500', marginBottom: '16px' }}>
              Skip the Form.<br />Just Chat.
            </h2>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
              No forms, no emails, no waiting. Just tap the button and tell us about your project. 
              Get a personalized quote within minutes.
            </p>

            <button 
              onClick={() => openWhatsApp('callToAction')}
              className="btn-whatsapp whatsapp-pulse"
              style={{ fontSize: '20px', padding: '24px 48px' }}
            >
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Start Chatting Now
            </button>

            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
              {[
                { icon: '⚡', text: '2 min response' },
                { icon: '🎁', text: 'Free 3D design' },
                { icon: '🔒', text: 'No spam ever' },
              ].map((item, i) => (
                <div key={i} style={{ fontSize: '14px', color: '#666' }}>
                  {item.icon} {item.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AREAS SERVED - All Clickable */}
        <section style={{ padding: '64px 0', background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <div className="container">
            <h3 className="font-display" style={{ fontSize: '24px', fontWeight: '500', textAlign: 'center', marginBottom: '24px' }}>
              Serving Dubai's Finest Communities
            </h3>
            <p style={{ textAlign: 'center', marginBottom: '24px', color: '#888', fontSize: '14px' }}>
              Tap your area to get local expertise
            </p>
            <div className="areas-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '12px', 
              maxWidth: '900px', 
              margin: '0 auto' 
            }}>
              {AREAS_SERVED.map((area, i) => (
                <button
                  key={i}
                  onClick={() => openWhatsApp('area', { areaName: area })}
                  style={{
                    background: 'var(--cream)',
                    border: '1px solid #e8e8e8',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'center'
                  }}
                  className="area-btn"
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ padding: '120px 0', background: 'var(--charcoal)', color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(37,211,102,0.1) 0%, transparent 70%)' }} />
          
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <p style={{ fontSize: '13px', color: 'var(--gold-light)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '24px', fontWeight: '500' }}>
              Your Dream Villa Awaits
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: '500', marginBottom: '24px', lineHeight: 1.2 }}>
              One Tap Away From<br />Your Dream Home
            </h2>
            <p style={{ fontSize: '20px', opacity: 0.8, marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
              800+ homeowners started their journey with a simple WhatsApp message.<br />You're next.
            </p>
            
            <button 
              onClick={() => openWhatsApp('callToAction')}
              className="btn-whatsapp whatsapp-pulse"
              style={{ fontSize: '20px', padding: '24px 48px' }}
            >
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Let's Create Magic Together
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: '48px 0', background: '#0d0d0d', color: '#fff' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span className="font-display" style={{ fontSize: '28px', fontWeight: '600', letterSpacing: '3px' }}>UNICORN</span>
              <p style={{ fontSize: '14px', opacity: 0.5, marginTop: '12px' }}>Crafting Timeless Villa Transformations Since 2012</p>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', marginBottom: '32px' }}>
              {[
                { label: 'Villa Renovation', url: 'https://unicornrenovations.com/villa-renovation/' },
                { label: 'Interior Design', url: 'https://unicornrenovations.com/interior-design/' },
                { label: 'Portfolio', url: 'https://unicornrenovations.com/portfolio/' },
                { label: 'Contact', url: 'https://unicornrenovations.com/contact/' },
              ].map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}>
                  {link.label}
                </a>
              ))}
            </div>
            
            <p style={{ fontSize: '12px', opacity: 0.4, textAlign: 'center' }}>
              © {new Date().getFullYear()} Unicorn Renovations. All rights reserved.
            </p>
          </div>
        </footer>

        {/* FLOATING WHATSAPP BUTTON */}
        <button 
          onClick={() => openWhatsApp('floatingButton')}
          aria-label="WhatsApp" 
          className="whatsapp-pulse"
          style={{ 
            position: 'fixed', 
            bottom: '100px', 
            right: '24px', 
            width: '64px', 
            height: '64px', 
            background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)', 
            borderRadius: '50%', 
            border: 'none', 
            cursor: 'pointer', 
            boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)', 
            zIndex: 50, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
          }}
        >
          <svg style={{ width: '32px', height: '32px' }} fill="#fff" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </button>

        {/* SMART STICKY BAR - Changes based on engagement */}
        <div className={`sticky-bar ${engagement} hide-desktop`} style={{ display: 'flex' }}>
          <div style={{ color: '#fff', fontSize: '14px', flex: 1 }}>
            {engagement === 'hot' && '🔥 You look ready!'}
            {engagement === 'engaged' && '✨ Have questions?'}
            {engagement === 'browsing' && '👋 Need help?'}
            {engagement === 'new' && '💬 Chat with us'}
          </div>
          <button 
            onClick={() => openWhatsApp('sticky', { engagement })}
            style={{
              background: engagement === 'hot' ? '#fff' : 'var(--whatsapp)',
              color: engagement === 'hot' ? 'var(--whatsapp-dark)' : '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            {engagement === 'hot' ? "Let's Talk!" : 'WhatsApp'}
          </button>
        </div>
        <div className="hide-desktop" style={{ height: '72px' }} />

        {/* ANALYTICS */}
        <script dangerouslySetInnerHTML={{ __html: `window.addEventListener('load',function(){setTimeout(function(){var s=document.createElement('script');s.src='https://www.googletagmanager.com/gtag/js?id=AW-612864132';s.async=true;document.head.appendChild(s);s.onload=function(){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','AW-612864132');};},1500);});` }} />
        <script dangerouslySetInnerHTML={{ __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "v5bkaisuew");` }} />
        
        {/* EXTRA HOVER STYLES */}
        <style jsx global>{`
          .area-btn:hover {
            background: var(--whatsapp) !important;
            color: #fff !important;
            border-color: var(--whatsapp) !important;
            transform: translateY(-2px);
          }
          .luxury-card:hover .service-overlay {
            opacity: 1 !important;
          }
        `}</style>
      </div>
    </>
  );
}
