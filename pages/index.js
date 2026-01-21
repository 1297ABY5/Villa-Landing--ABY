// pages/index.js - QS 9-10 + LUXURY FEEL HYBRID
// All Quality Score elements retained + Premium aesthetic
// Target: QS 9-10 with cinematic luxury conversion experience

import Head from 'next/head';
import Image from 'next/image';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';

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
// SERVICES (QS Critical - Elegant Styling)
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
// PROCESS STEPS (QS Critical - Shows Expertise)
// ============================================
const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', desc: 'Complimentary site visit & vision alignment', icon: '◈', time: 'Day 1' },
  { step: '02', title: 'Design', desc: '3D visualization & detailed proposal', icon: '◇', time: 'Days 2-5' },
  { step: '03', title: 'Approvals', desc: 'Municipality permits handled seamlessly', icon: '◆', time: 'Days 6-14' },
  { step: '04', title: 'Craft', desc: 'Master execution with weekly updates', icon: '▣', time: 'Weeks 3-7' },
  { step: '05', title: 'Handover', desc: 'Final walkthrough & warranty activation', icon: '✧', time: 'Week 8' },
];

// ============================================
// TESTIMONIALS (QS Critical - Social Proof)
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
// VIDEO TESTIMONIALS (Local MP4 - Lazy-loaded)
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
// AREAS SERVED (QS Critical - Local SEO)
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
    { q: `What is the investment range for ${service.toLowerCase()} in ${loc}?`, a: `Investment varies based on scope, size, and specification level. We provide a comprehensive fixed-price proposal following a complimentary site assessment. You'll receive a detailed 3D visualization to experience your transformation before commitment.` },
    { q: `What is the typical timeline for a ${service.toLowerCase()} project?`, a: `Most projects reach completion within 6–8 weeks, depending on approvals, material procurement, and scope complexity. We provide a detailed timeline and weekly progress updates throughout your journey.` },
    { q: `Do you manage municipality permits and approvals?`, a: `Absolutely. We handle all required approvals and coordinate documentation seamlessly for your project type and community requirements in ${loc}. This is included in our service.` },
    { q: `Is your quotation truly fixed?`, a: `Yes. We provide a fixed-price proposal for the agreed scope. Should you request modifications or upgrades, we present a clear variation quote for your approval before any work commences. No surprises, ever.` },
    { q: `What warranty coverage do you provide?`, a: `We provide up to 5 years craftsmanship warranty depending on scope, complemented by manufacturer warranties for all materials and fixtures supplied. Your peace of mind is paramount.` },
  ];
}

// ============================================
// SSR - CRITICAL FOR QS
// ============================================
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
// LAZY VIDEO COMPONENT (Responsive Mobile/Desktop)
// ============================================
function LazyVideo({ video, isVisible }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play();
    }
  }, [isPlaying]);

  // Common container styles (responsive)
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

  if (isPlaying) {
    return (
      <div style={containerStyle}>
        <div style={{ paddingBottom: '148%', position: 'relative' }}>
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
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handlePlay}
      style={{
        ...containerStyle,
        cursor: 'pointer',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease',
      }}
      className="video-card"
    >
      {/* Aspect ratio container */}
      <div style={{ paddingBottom: '148%', position: 'relative' }}>
        {/* Thumbnail */}
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

        {/* Play Button - Centered */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div 
            className="play-btn"
            style={{
              width: '72px',
              height: '72px',
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(201, 162, 39, 0.4)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              paddingLeft: '4px',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
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
          letterSpacing: '0.5px',
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

        {/* Client Info */}
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
            textShadow: '0 2px 8px rgba(0,0,0,0.5)'
          }}>
            {video.name}
          </p>
          <p style={{ 
            fontSize: '14px', 
            opacity: 0.9,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ color: 'var(--gold-light)' }}>◆</span>
            {video.location}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function LuxuryQSOptimizer({ initialContent, initialServices }) {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [slotsLeft, setSlotsLeft] = useState(3);

  // Intersection observers for animations
  const [heroRef, heroInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [servicesRef, servicesInView] = useInView();
  const [processRef, processInView] = useInView();
  const [testimonialsRef, testimonialsInView] = useInView();
  const [videoRef, videoInView] = useInView();
  const [faqRef, faqInView] = useInView();

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

  // Schema markup
  const breadcrumbSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dubailuxrenovate.com" },
      { "@type": "ListItem", "position": 2, "name": content.service, "item": `https://dubailuxrenovate.com/?kw=${encodeURIComponent(content.keyword)}` }
    ]
  }), [content]);

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

  // Video testimonials schema for rich results
  const videoSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": VIDEO_TESTIMONIALS.map((v, i) => ({
      "@type": "VideoObject",
      "position": i + 1,
      "name": `${v.name} - ${v.project} Testimonial`,
      "description": `Video testimonial from ${v.name} in ${v.location} about their ${v.project} experience with Unicorn Renovations Dubai.`,
      "thumbnailUrl": `https://dubailuxrenovate.com${v.thumbnail}`,
      "uploadDate": "2024-01-15",
      "contentUrl": `https://dubailuxrenovate.com${v.videoSrc}`,
      "duration": "PT6S"
    }))
  }), []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const message = `✦ *VILLA PROJECT INQUIRY* ✦\n━━━━━━━━━━━━━━━━━━\n\n◈ Name: ${formData.name}\n◈ Phone: ${formData.phone}\n◈ Service: ${formData.service || content.service}\n◈ Location: ${content.location}\n\n━━━━━━━━━━━━━━━━━━\n🔍 Interest: ${content.keyword}\n📊 Source: Google Ads`;
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', { send_to: 'AW-612864132/qqQcQNeM-bADEISh7qQC', value: 150000, currency: 'AED' });
    }
    setSubmitted(true);
    window.location.href = `https://wa.me/971585658002?text=${encodeURIComponent(message)}`;
  }, [formData, content, isSubmitting]);

  const quickWhatsApp = useCallback(() => {
    const msg = `Hello, I'm interested in ${content.service} services in ${content.location}. I'd appreciate a complimentary consultation.`;
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', { send_to: 'AW-612864132/qqQcQNeM-bADEISh7qQC', value: 150000, currency: 'AED' });
    }
    window.open(`https://wa.me/971585658002?text=${encodeURIComponent(msg)}`, '_blank');
  }, [content]);

  return (
    <>
      <Head>
        <title>{content.h1} | Bespoke Transformations | Unicorn Renovations</title>
        <meta name="description" content={content.metaDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href="https://wa.me" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Business Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "name": "Unicorn Renovations",
          "description": content.metaDesc,
          "url": "https://dubailuxrenovate.com",
          "telephone": "+971585658002",
          "email": "info@unicornrenovations.com",
          "address": { "@type": "PostalAddress", "streetAddress": "Al Quoz Industrial Area 3", "addressLocality": "Dubai", "addressCountry": "AE" },
          "geo": { "@type": "GeoCoordinates", "latitude": "25.1425", "longitude": "55.2235" },
          "openingHours": "Mo-Sa 09:00-18:00",
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "287" },
          "priceRange": "AED 25,000 - AED 500,000",
          "areaServed": AREAS_SERVED,
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Renovation Services",
            "itemListElement": ALL_SERVICES.map(s => ({ "@type": "Offer", "itemOffered": { "@type": "Service", "name": s.title } }))
          }
        })}} />
        
        {/* FAQ Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        
        {/* Review Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        
        {/* Video Testimonials Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />

        {/* Critical CSS + Luxury Fonts */}
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
          
          :root {
            --gold: #c9a227;
            --gold-light: #d4af37;
            --gold-dark: #a68521;
            --gold-muted: #b8860b;
            --charcoal: #1a1a1a;
            --charcoal-light: #2d2d2d;
            --cream: #faf8f5;
            --cream-dark: #f5f0e8;
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
          
          /* Luxury Button Styles */
          .btn-gold {
            background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
            color: #fff;
            border: none;
            padding: 18px 36px;
            font-size: 16px;
            font-weight: 600;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            text-transform: uppercase;
            letter-spacing: 1.5px;
            backdrop-filter: blur(10px);
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
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            text-transform: uppercase;
            letter-spacing: 1.5px;
          }
          .btn-dark:hover {
            background: var(--charcoal-light);
            transform: translateY(-2px);
          }
          
          /* Form Styles */
          .form-input {
            width: 100%;
            padding: 16px 20px;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            font-size: 16px;
            font-family: 'Inter', sans-serif;
            transition: all 0.3s ease;
            background: #fff;
          }
          .form-input:focus {
            outline: none;
            border-color: var(--gold);
            box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.1);
          }
          
          /* Card Styles */
          .luxury-card {
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid #f0f0f0;
          }
          .luxury-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            border-color: var(--gold-light);
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
          
          /* FAQ Styles */
          .faq-item {
            border-bottom: 1px solid #e8e8e8;
            transition: all 0.3s ease;
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
          
          /* Responsive */
          @media (max-width: 768px) {
            .container { padding: 0 16px; }
            .hide-mobile { display: none !important; }
            .btn-gold, .btn-outline-light, .btn-dark {
              padding: 16px 24px;
              font-size: 14px;
              width: 100%;
            }
            /* Mobile: Stack everything vertically */
            section { padding: 60px 0 !important; }
            .font-display { letter-spacing: -0.5px; }
            /* Mobile: Services stacked */
            .services-grid {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }
            /* Mobile: Process 2 columns */
            .process-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 16px !important;
            }
            /* Mobile: Testimonials stacked */
            .testimonials-grid {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }
            /* Mobile: Videos stacked */
            .video-grid {
              grid-template-columns: 1fr !important;
              gap: 24px !important;
            }
            /* Mobile: Form padding */
            .form-section { padding: 24px !important; }
            /* Mobile: Smaller stats */
            .stats-num { font-size: 28px !important; }
            /* Mobile: Hero stats centered */
            .hero-stats {
              justify-content: center !important;
              gap: 24px !important;
              text-align: center;
            }
            .hero-stats > div {
              text-align: center !important;
              min-width: 100px !important;
            }
          }
          @media (min-width: 769px) {
            .hide-desktop { display: none !important; }
            /* Desktop: 3 column grid for videos */
            .video-grid {
              grid-template-columns: repeat(3, 320px) !important;
            }
            /* Desktop: Services grid */
            .services-grid {
              grid-template-columns: repeat(3, 1fr) !important;
            }
            /* Desktop: Process grid */
            .process-grid {
              grid-template-columns: repeat(5, 1fr) !important;
            }
            /* Desktop: Testimonials grid */
            .testimonials-grid {
              grid-template-columns: repeat(3, 1fr) !important;
            }
            /* Hover effects for video cards */
            .video-card:hover {
              transform: translateY(-12px) !important;
              box-shadow: 0 30px 80px rgba(0,0,0,0.5) !important;
            }
            .video-card:hover .play-btn {
              transform: scale(1.1);
              box-shadow: 0 12px 40px rgba(201, 162, 39, 0.5);
            }
            /* Desktop: Card hovers */
            .luxury-card:hover {
              transform: translateY(-8px);
            }
          }
          @media (min-width: 1200px) {
            .video-grid {
              gap: 48px !important;
            }
            .container { max-width: 1400px; }
          }
        `}} />
      </Head>

      <div style={{ minHeight: '100vh' }}>
        
        {/* SUBTLE URGENCY BAR */}
        <div style={{ 
          background: 'linear-gradient(90deg, var(--charcoal) 0%, var(--charcoal-light) 100%)', 
          color: '#fff', 
          padding: '12px 24px', 
          textAlign: 'center', 
          fontSize: '13px', 
          letterSpacing: '1px',
          fontWeight: '400'
        }}>
          <span style={{ color: 'var(--gold-light)' }}>✦</span>
          &nbsp;&nbsp;COMPLIMENTARY 3D VISUALIZATION&nbsp;&nbsp;•&nbsp;&nbsp;Only {slotsLeft} Consultation Slots Remaining This Month&nbsp;&nbsp;
          <span style={{ color: 'var(--gold-light)' }}>✦</span>
        </div>

        {/* HEADER - Minimal Luxury */}
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
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <span className="hide-mobile" style={{ fontSize: '13px', color: '#888', letterSpacing: '0.5px' }}>
                ★ 4.9/5 from 287 Reviews
              </span>
              <a href="tel:+971585658002" className="btn-dark" style={{ padding: '12px 24px', fontSize: '13px' }}>
                <span className="hide-mobile">+971 58 565 8002</span>
                <span className="hide-desktop">Call</span>
              </a>
            </div>
          </div>
        </header>

        {/* HERO - Cinematic Luxury */}
        <section ref={heroRef} style={{ 
          position: 'relative', 
          minHeight: '90vh', 
          display: 'flex', 
          alignItems: 'center',
          background: 'var(--charcoal)'
        }}>
          {/* Hero Background */}
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
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(to bottom, rgba(26,26,26,0.7) 0%, rgba(26,26,26,0.9) 100%)' 
            }} />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 10, color: '#fff', paddingTop: '40px', paddingBottom: '60px' }}>
            <div className={`fade-up ${heroInView ? 'visible' : ''}`}>
              
              {/* Trust Badge */}
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '12px', 
                background: 'rgba(255,255,255,0.08)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '10px 20px', 
                borderRadius: '40px', 
                marginBottom: '32px' 
              }}>
                <span style={{ color: 'var(--gold-light)', letterSpacing: '2px' }}>★★★★★</span>
                <span style={{ fontSize: '14px', fontWeight: '400', letterSpacing: '0.5px' }}>4.9 Rating • 287 Verified Reviews</span>
              </div>

              {/* H1 - Keyword Optimized + Luxury Typography */}
              <h1 className="font-display" style={{ 
                fontSize: 'clamp(40px, 7vw, 80px)', 
                fontWeight: '500', 
                lineHeight: 1.1, 
                marginBottom: '16px',
                letterSpacing: '-1px'
              }}>
                {content.h1}
              </h1>

              {/* H2 - Elegant Subheadline */}
              <h2 className="font-display" style={{ 
                fontSize: 'clamp(20px, 3vw, 32px)', 
                fontWeight: '400', 
                color: 'var(--gold-light)',
                marginBottom: '24px',
                fontStyle: 'italic'
              }}>
                {content.h2}
              </h2>

              {/* Keyword Reinforcement */}
              <p style={{ 
                fontSize: '18px', 
                opacity: 0.8, 
                maxWidth: '600px', 
                marginBottom: '40px',
                lineHeight: 1.7,
                fontWeight: '300'
              }}>
                Seeking exceptional <strong style={{ fontWeight: '500' }}>{content.keyword}</strong> in <strong style={{ fontWeight: '500' }}>{content.location}</strong>? 
                Experience the art of transformation with complimentary 3D visualization and fixed pricing.
              </p>

              {/* Stats Row - Responsive */}
              <div 
                className="hero-stats"
                style={{ 
                  display: 'flex', 
                  gap: '32px', 
                  marginBottom: '48px', 
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start'
                }}
              >
                {[
                  { num: '800+', label: 'Villas Transformed' },
                  { num: '15+', label: 'Years of Mastery' },
                  { num: '5yr', label: 'Craftsmanship Warranty' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'left', minWidth: '120px' }}>
                    <div className="stats-num" style={{ fontSize: '36px', fontWeight: '700', color: 'var(--gold-light)', marginBottom: '4px' }}>{s.num}</div>
                    <div style={{ fontSize: '12px', opacity: 0.7, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
                <button onClick={quickWhatsApp} className="btn-gold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                  <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Begin Your Journey
                </button>
                <a href="tel:+971585658002" className="btn-outline-light" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', textDecoration: 'none' }}>
                  <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  Speak With Our Team
                </a>
              </div>

              {/* Trust Points */}
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '24px', 
                marginTop: '32px',
                fontSize: '13px',
                opacity: 0.7,
                letterSpacing: '0.5px'
              }}>
                <span>✓ Complimentary 3D Design</span>
                <span>✓ Fixed Pricing</span>
                <span>✓ Municipality Approved</span>
                <span>✓ 5-Year Warranty</span>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR - Elegant */}
        <section ref={statsRef} style={{ 
          padding: '80px 0', 
          background: 'var(--cream)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
          <div className="container">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '48px', 
              textAlign: 'center' 
            }}>
              {[
                { icon: '◈', title: 'DED Licensed', desc: 'Fully registered contractor' },
                { icon: '◇', title: 'Municipality Approved', desc: 'All permits handled' },
                { icon: '◆', title: 'Fully Insured', desc: 'Complete coverage' },
                { icon: '✧', title: 'Flexible Payment', desc: 'Milestone-based plans' },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`fade-up fade-up-delay-${i+1} ${statsInView ? 'visible' : ''}`}
                >
                  <div style={{ fontSize: '32px', color: 'var(--gold)', marginBottom: '16px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES - Elegant Grid */}
        <section ref={servicesRef} style={{ padding: '100px 0', background: '#fff' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ 
                fontSize: '13px', 
                color: 'var(--gold)', 
                letterSpacing: '3px', 
                textTransform: 'uppercase', 
                marginBottom: '16px',
                fontWeight: '500'
              }}>
                Our Expertise
              </p>
              <h2 className="font-display" style={{ 
                fontSize: 'clamp(32px, 5vw, 48px)', 
                fontWeight: '500',
                marginBottom: '16px'
              }}>
                {content.service} Services
              </h2>
              <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                Comprehensive solutions with fixed pricing and guaranteed timelines
              </p>
            </div>

            <div 
              className="services-grid"
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
                gap: '32px' 
              }}
            >
              {services.map((s, i) => (
                <div 
                  key={i} 
                  className={`luxury-card fade-up fade-up-delay-${i+1} ${servicesInView ? 'visible' : ''}`}
                  onClick={quickWhatsApp} 
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ position: 'relative', height: '240px', background: 'var(--cream)' }}>
                    <Image 
                      src={s.image} 
                      alt={`${s.title} in ${content.location}`} 
                      fill
                      sizes="(max-width: 768px) 100vw, 400px" 
                      style={{ objectFit: 'cover' }} 
                      loading={i < 2 ? 'eager' : 'lazy'} 
                      quality={70}
                    />
                  </div>
                  <div style={{ padding: '28px' }}>
                    <h3 className="font-display" style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px' }}>{s.title}</h3>
                    <p style={{ fontSize: '15px', color: '#666', marginBottom: '16px', lineHeight: 1.6 }}>{s.desc}</p>
                    <p style={{ fontSize: '18px', fontWeight: '600', color: 'var(--gold-dark)' }}>{s.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS - Elegant Timeline */}
        <section ref={processRef} style={{ 
          padding: '100px 0', 
          background: 'var(--charcoal)', 
          color: '#fff' 
        }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ 
                fontSize: '13px', 
                color: 'var(--gold-light)', 
                letterSpacing: '3px', 
                textTransform: 'uppercase', 
                marginBottom: '16px',
                fontWeight: '500'
              }}>
                The Journey
              </p>
              <h2 className="font-display" style={{ 
                fontSize: 'clamp(32px, 5vw, 48px)', 
                fontWeight: '500',
                marginBottom: '16px'
              }}>
                Our {content.service} Process
              </h2>
              <p style={{ fontSize: '18px', opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
                From vision to reality in 6-8 weeks
              </p>
            </div>

            <div 
              className="process-grid"
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '24px' 
              }}
            >
              {PROCESS_STEPS.map((step, i) => (
                <div 
                  key={i} 
                  className={`fade-up fade-up-delay-${i+1} ${processInView ? 'visible' : ''}`}
                  style={{ 
                    textAlign: 'center', 
                    padding: '40px 24px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <div style={{ 
                    fontSize: '14px', 
                    color: 'var(--gold-light)', 
                    letterSpacing: '2px',
                    marginBottom: '16px',
                    fontWeight: '600'
                  }}>
                    {step.step}
                  </div>
                  <div style={{ fontSize: '28px', marginBottom: '16px', color: 'var(--gold-light)' }}>{step.icon}</div>
                  <h3 className="font-display" style={{ fontSize: '20px', fontWeight: '500', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: '12px' }}>{step.desc}</p>
                  <span style={{ 
                    fontSize: '12px', 
                    color: 'var(--gold-muted)', 
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>
                    {step.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US - Elegant Grid */}
        <section style={{ padding: '100px 0', background: '#fff' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ 
                fontSize: '13px', 
                color: 'var(--gold)', 
                letterSpacing: '3px', 
                textTransform: 'uppercase', 
                marginBottom: '16px',
                fontWeight: '500'
              }}>
                The Difference
              </p>
              <h2 className="font-display" style={{ 
                fontSize: 'clamp(32px, 5vw, 48px)', 
                fontWeight: '500'
              }}>
                Why Discerning Homeowners Choose Us
              </h2>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '32px' 
            }}>
              {[
                { icon: '◈', title: 'Municipality Approved', desc: 'All permits and approvals handled seamlessly by our dedicated team' },
                { icon: '◇', title: 'Fixed Price Guarantee', desc: 'Transparent pricing with no hidden costs or surprise additions' },
                { icon: '◆', title: 'On-Time Delivery', desc: '6-8 weeks completion with weekly progress updates' },
                { icon: '✧', title: '5-Year Warranty', desc: 'Comprehensive craftsmanship coverage for peace of mind' },
                { icon: '❖', title: 'Complimentary 3D Design', desc: 'Visualize your transformation before commitment' },
                { icon: '✦', title: '4.9/5 Client Rating', desc: '287 verified reviews from distinguished homeowners' },
              ].map((item, i) => (
                <div key={i} style={{ 
                  padding: '32px',
                  background: 'var(--cream)',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ fontSize: '28px', color: 'var(--gold)', marginBottom: '20px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>{item.title}</h3>
                  <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS - Elegant Cards */}
        <section ref={testimonialsRef} style={{ 
          padding: '100px 0', 
          background: 'var(--cream)' 
        }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ 
                fontSize: '13px', 
                color: 'var(--gold)', 
                letterSpacing: '3px', 
                textTransform: 'uppercase', 
                marginBottom: '16px',
                fontWeight: '500'
              }}>
                Client Stories
              </p>
              <h2 className="font-display" style={{ 
                fontSize: 'clamp(32px, 5vw, 48px)', 
                fontWeight: '500',
                marginBottom: '16px'
              }}>
                Voices of Transformation
              </h2>
              <p style={{ fontSize: '18px', color: '#666' }}>
                ★ 4.9/5 average from 287 verified reviews
              </p>
            </div>

            <div 
              className="testimonials-grid"
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                gap: '32px' 
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div 
                  key={i} 
                  className={`fade-up fade-up-delay-${i+1} ${testimonialsInView ? 'visible' : ''}`}
                  style={{ 
                    background: '#fff', 
                    padding: '40px', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', color: 'var(--gold)' }}>
                    {[...Array(t.rating)].map((_, j) => <span key={j}>★</span>)}
                  </div>
                  <p className="font-display" style={{ 
                    fontSize: '18px', 
                    color: '#444', 
                    marginBottom: '28px', 
                    lineHeight: 1.8,
                    fontStyle: 'italic'
                  }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: '600', fontSize: '16px' }}>{t.name}</p>
                      <p style={{ fontSize: '14px', color: '#888' }}>{t.location}</p>
                    </div>
                    <span style={{ 
                      fontSize: '12px', 
                      color: 'var(--gold-dark)', 
                      background: 'var(--cream)', 
                      padding: '6px 12px', 
                      borderRadius: '4px',
                      letterSpacing: '0.5px'
                    }}>
                      {t.project}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VIDEO TESTIMONIALS - Responsive Mobile/Desktop */}
        <section ref={videoRef} style={{ 
          padding: '100px 0', 
          background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
          overflow: 'hidden'
        }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ 
                fontSize: '13px', 
                color: 'var(--gold-light)', 
                letterSpacing: '3px', 
                textTransform: 'uppercase', 
                marginBottom: '16px',
                fontWeight: '500'
              }}>
                Hear Their Stories
              </p>
              <h2 className="font-display" style={{ 
                fontSize: 'clamp(32px, 5vw, 48px)', 
                fontWeight: '500',
                marginBottom: '16px',
                color: '#fff'
              }}>
                Video Testimonials
              </h2>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto' }}>
                Real stories from homeowners who transformed their villas with us
              </p>
            </div>

            {/* Responsive Grid - Horizontal scroll on mobile, grid on desktop */}
            <div 
              className="video-grid"
              style={{ 
                display: 'grid',
                gap: '32px',
                justifyContent: 'center',
              }}
            >
              {VIDEO_TESTIMONIALS.map((video, i) => (
                <div 
                  key={video.id} 
                  className={`fade-up fade-up-delay-${i+1} ${videoInView ? 'visible' : ''}`}
                >
                  <LazyVideo video={video} isVisible={videoInView} />
                </div>
              ))}
            </div>

            {/* Trust indicator */}
            <div style={{ 
              textAlign: 'center', 
              marginTop: '48px',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '14px'
            }}>
              <span style={{ color: 'var(--gold-light)' }}>★★★★★</span>
              &nbsp;&nbsp;Join 800+ satisfied homeowners
            </div>
          </div>
        </section>

        {/* FAQ - Elegant Accordion */}
        <section ref={faqRef} style={{ padding: '100px 0', background: '#fff' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ 
                fontSize: '13px', 
                color: 'var(--gold)', 
                letterSpacing: '3px', 
                textTransform: 'uppercase', 
                marginBottom: '16px',
                fontWeight: '500'
              }}>
                Common Questions
              </p>
              <h2 className="font-display" style={{ 
                fontSize: 'clamp(32px, 5vw, 48px)', 
                fontWeight: '500',
                marginBottom: '16px'
              }}>
                {content.service} FAQ
              </h2>
              <p style={{ fontSize: '16px', color: '#666' }}>
                Everything you need to know about {content.keyword} in {content.location}
              </p>
            </div>
            
            <div className={`fade-up ${faqInView ? 'visible' : ''}`}>
              {faqs.map((f, idx) => (
                <details key={idx} className="faq-item">
                  <summary className="faq-summary">{f.q}</summary>
                  <div className="faq-content">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* LEAD FORM - Elegant */}
        <section id="quote" style={{ 
          padding: '100px 0', 
          background: 'var(--cream)' 
        }}>
          <div className="container" style={{ maxWidth: '520px' }}>
            <div style={{ 
              background: '#fff', 
              borderRadius: '12px', 
              padding: '48px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.08)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <p style={{ 
                  fontSize: '13px', 
                  color: 'var(--gold)', 
                  letterSpacing: '3px', 
                  textTransform: 'uppercase', 
                  marginBottom: '16px',
                  fontWeight: '500'
                }}>
                  Begin Your Journey
                </p>
                <h2 className="font-display" style={{ fontSize: '28px', fontWeight: '500', marginBottom: '8px' }}>
                  Request Your Consultation
                </h2>
                <p style={{ fontSize: '15px', color: '#666' }}>
                  Complimentary 3D visualization • Response within 30 minutes
                </p>
              </div>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px', color: 'var(--gold)' }}>✓</div>
                  <h3 className="font-display" style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px' }}>Request Received</h3>
                  <p style={{ color: '#666' }}>We'll be in touch within 30 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    className="form-input"
                  />
                  <input 
                    type="tel" 
                    placeholder="WhatsApp Number" 
                    required 
                    value={formData.phone} 
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                    className="form-input"
                  />
                  <select 
                    value={formData.service} 
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })} 
                    className="form-input"
                    style={{ color: formData.service ? 'var(--charcoal)' : '#999' }}
                  >
                    <option value="">Select Service</option>
                    <option value="Villa Renovation">Villa Renovation</option>
                    <option value="Interior Renovation">Interior Renovation</option>
                    <option value="Villa Extension">Villa Extension</option>
                    <option value="Office Fit Out">Office Fit Out</option>
                    <option value="Kitchen Renovation">Kitchen Renovation</option>
                    <option value="Bathroom Renovation">Bathroom Renovation</option>
                  </select>
                  <button type="submit" className="btn-gold" disabled={isSubmitting} style={{ marginTop: '8px' }}>
                    {isSubmitting ? 'Sending...' : 'Request Consultation'}
                  </button>
                  <p style={{ fontSize: '12px', color: '#999', textAlign: 'center' }}>
                    ✓ Your information remains confidential
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* AREAS SERVED - Elegant List */}
        <section style={{ padding: '64px 0', background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <div className="container">
            <h3 className="font-display" style={{ 
              fontSize: '24px', 
              fontWeight: '500', 
              textAlign: 'center', 
              marginBottom: '24px' 
            }}>
              Serving Dubai's Finest Communities
            </h3>
            <p style={{ 
              textAlign: 'center', 
              color: '#666', 
              fontSize: '15px', 
              maxWidth: '900px', 
              margin: '0 auto', 
              lineHeight: 2 
            }}>
              {AREAS_SERVED.join('  •  ')}
            </p>
          </div>
        </section>

        {/* COMPANY INFO - Trust Signals */}
        <section style={{ padding: '48px 0', background: 'var(--cream)', borderTop: '1px solid #e8e8e8' }}>
          <div className="container">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '32px', 
              textAlign: 'center', 
              fontSize: '14px', 
              color: '#666' 
            }}>
              <div>
                <p style={{ fontWeight: '600', color: 'var(--charcoal)', marginBottom: '4px' }}>Office Address</p>
                <p>Al Quoz Industrial Area 3, Dubai, UAE</p>
              </div>
              <div>
                <p style={{ fontWeight: '600', color: 'var(--charcoal)', marginBottom: '4px' }}>Contact</p>
                <p>+971 58 565 8002</p>
              </div>
              <div>
                <p style={{ fontWeight: '600', color: 'var(--charcoal)', marginBottom: '4px' }}>Working Hours</p>
                <p>Monday - Saturday: 9AM - 6PM</p>
              </div>
              <div>
                <p style={{ fontWeight: '600', color: 'var(--charcoal)', marginBottom: '4px' }}>Trade License</p>
                <p>DED Licensed & Fully Insured</p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA - Cinematic */}
        <section style={{ 
          padding: '120px 0', 
          background: 'var(--charcoal)', 
          color: '#fff', 
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'radial-gradient(ellipse at center, rgba(201,162,39,0.1) 0%, transparent 70%)' 
          }} />
          
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <p style={{ 
              fontSize: '13px', 
              color: 'var(--gold-light)', 
              letterSpacing: '3px', 
              textTransform: 'uppercase', 
              marginBottom: '24px',
              fontWeight: '500'
            }}>
              Your Vision Awaits
            </p>
            <h2 className="font-display" style={{ 
              fontSize: 'clamp(36px, 6vw, 64px)', 
              fontWeight: '500', 
              marginBottom: '24px',
              lineHeight: 1.2
            }}>
              Ready to Transform<br />Your Villa?
            </h2>
            <p style={{ 
              fontSize: '20px', 
              opacity: 0.8, 
              marginBottom: '48px',
              maxWidth: '600px',
              margin: '0 auto 48px'
            }}>
              Complimentary consultation • 3D visualization • Fixed pricing
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto' }}>
              <button onClick={quickWhatsApp} className="btn-gold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Begin Your Journey
              </button>
              <a href="tel:+971585658002" className="btn-outline-light" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', textDecoration: 'none' }}>
                <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                +971 58 565 8002
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER - Minimal Elegant */}
        <footer style={{ 
          padding: '48px 0', 
          background: '#0d0d0d', 
          color: '#fff' 
        }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span className="font-display" style={{ fontSize: '28px', fontWeight: '600', letterSpacing: '3px' }}>
                UNICORN
              </span>
              <p style={{ fontSize: '14px', opacity: 0.5, marginTop: '12px' }}>
                Crafting Timeless Villa Transformations Since 2012
              </p>
            </div>
            
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '24px', 
              marginBottom: '32px' 
            }}>
              {[
                { label: 'Villa Renovation', url: 'https://unicornrenovations.com/villa-renovation/' },
                { label: 'Interior Design', url: 'https://unicornrenovations.com/interior-design/' },
                { label: 'Villa Extension', url: 'https://unicornrenovations.com/villa-extension/' },
                { label: 'Portfolio', url: 'https://unicornrenovations.com/portfolio/' },
                { label: 'About', url: 'https://unicornrenovations.com/about-us/' },
                { label: 'Contact', url: 'https://unicornrenovations.com/contact/' },
              ].map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener" 
                  style={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    fontSize: '13px', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    letterSpacing: '0.5px'
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            <p style={{ 
              fontSize: '12px', 
              opacity: 0.4, 
              textAlign: 'center' 
            }}>
              © {new Date().getFullYear()} Unicorn Renovations. All rights reserved.
            </p>
          </div>
        </footer>

        {/* FLOATING WHATSAPP - Elegant */}
        <button 
          onClick={quickWhatsApp} 
          aria-label="WhatsApp" 
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
            transition: 'all 0.3s ease'
          }}
        >
          <svg style={{ width: '32px', height: '32px' }} fill="#fff" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </button>

        {/* MOBILE BOTTOM BAR - Glassmorphism */}
        <div className="hide-desktop" style={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          background: 'rgba(255,255,255,0.95)', 
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(0,0,0,0.08)', 
          zIndex: 40, 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          height: '72px' 
        }}>
          <a 
            href="tel:+971585658002" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px', 
              color: 'var(--charcoal)', 
              textDecoration: 'none', 
              fontWeight: '600',
              fontSize: '15px',
              borderRight: '1px solid rgba(0,0,0,0.08)' 
            }}
          >
            <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            Call
          </a>
          <button 
            onClick={quickWhatsApp} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px', 
              background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)', 
              color: '#fff', 
              border: 'none', 
              fontWeight: '600',
              fontSize: '15px',
              cursor: 'pointer' 
            }}
          >
            <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            WhatsApp
          </button>
        </div>
        <div className="hide-desktop" style={{ height: '72px' }} />

        {/* DEFERRED ANALYTICS */}
        <script dangerouslySetInnerHTML={{ __html: `window.addEventListener('load',function(){setTimeout(function(){var s=document.createElement('script');s.src='https://www.googletagmanager.com/gtag/js?id=AW-612864132';s.async=true;document.head.appendChild(s);s.onload=function(){window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','AW-612864132');};},1500);});` }} />
      </div>
    </>
  );
}
