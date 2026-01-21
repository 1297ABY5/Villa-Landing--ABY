// pages/villa-reno.js
// REBUILT - Aligned with Google Ads Keywords & Ad Copy
// Target: 90+ PageSpeed, Quality Score 7+
// Keywords: villa renovation, interior designer, home renovation, renovation contractor, remodeling

import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';

// Keyword mapping for dynamic content
const KEYWORD_CONFIG = {
  'villa renovation': {
    h1: 'Villa Renovation',
    service: 'villa renovation',
    description: 'Transform your villa with Dubai\'s top renovation experts'
  },
  'interior renovation': {
    h1: 'Interior Renovation',
    service: 'interior renovation',
    description: 'Expert interior renovation services in Dubai'
  },
  'interior designer': {
    h1: 'Interior Designer',
    service: 'interior design',
    description: 'Top interior designers in Dubai for luxury homes'
  },
  'home renovation': {
    h1: 'Home Renovation',
    service: 'home renovation',
    description: 'Complete home renovation services in Dubai'
  },
  'home remodeling': {
    h1: 'Home Remodeling',
    service: 'home remodeling',
    description: 'Professional home remodeling contractors in Dubai'
  },
  'renovation contractor': {
    h1: 'Renovation Contractor',
    service: 'renovation contracting',
    description: 'Licensed renovation contractors in Dubai'
  },
  'renovation company': {
    h1: 'Renovation Company',
    service: 'renovation services',
    description: 'Dubai\'s leading renovation company'
  },
  'house designers': {
    h1: 'House Designers',
    service: 'house design',
    description: 'Expert house designers in Dubai'
  },
  'renovation service': {
    h1: 'Renovation Service',
    service: 'renovation services',
    description: 'Premium renovation services in Dubai'
  },
  'villa extension': {
    h1: 'Villa Extension',
    service: 'villa extension',
    description: 'Expert villa extension services in Dubai'
  },
  'kitchen renovation': {
    h1: 'Kitchen Renovation',
    service: 'kitchen renovation',
    description: 'Modern kitchen renovation in Dubai'
  },
  'bathroom renovation': {
    h1: 'Bathroom Renovation',
    service: 'bathroom renovation',
    description: 'Luxury bathroom renovation in Dubai'
  },
  'default': {
    h1: 'Villa Renovation',
    service: 'renovation',
    description: 'Dubai\'s top renovation experts'
  }
};

// Services that match ad groups - with backlinks
const SERVICES = [
  { id: 'villa', title: 'Villa Renovation', desc: 'Complete villa makeovers', price: 'From AED 150,000', icon: '🏠', url: 'https://unicornrenovations.com/villa-renovation/' },
  { id: 'interior', title: 'Interior Design', desc: 'Bespoke luxury interiors', price: 'From AED 50,000', icon: '✨', url: 'https://unicornrenovations.com/interior-design/' },
  { id: 'extension', title: 'Villa Extension', desc: 'Expand your living space', price: 'From AED 200,000', icon: '🏗️', url: 'https://unicornrenovations.com/villa-extension/' },
  { id: 'kitchen', title: 'Kitchen Renovation', desc: 'Modern kitchen makeovers', price: 'From AED 45,000', icon: '🍳', url: 'https://unicornrenovations.com/villa-renovation/' },
  { id: 'bathroom', title: 'Bathroom Renovation', desc: 'Luxury bathroom upgrades', price: 'From AED 25,000', icon: '🛁', url: 'https://unicornrenovations.com/villa-renovation/' },
  { id: 'pool', title: 'Swimming Pool', desc: 'Pool construction & renovation', price: 'From AED 80,000', icon: '🏊', url: 'https://unicornrenovations.com/swimming-pool/' }
];

export default function VillaRenoLanding() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [content, setContent] = useState({
    keyword: 'Villa Renovation',
    location: 'Dubai',
    h1: 'Villa Renovation',
    service: 'renovation',
    description: 'Dubai\'s top renovation experts'
  });

  // Dynamic keyword insertion from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let keyword = params.get('kw') || params.get('keyword') || params.get('utm_term') || '';
    const location = params.get('loc') || params.get('location') || 'Dubai';
    
    // Normalize keyword
    keyword = keyword.toLowerCase().replace(/[+_-]/g, ' ').trim();
    
    // Find matching config
    let config = KEYWORD_CONFIG['default'];
    for (const [key, value] of Object.entries(KEYWORD_CONFIG)) {
      if (keyword.includes(key) || key.includes(keyword)) {
        config = value;
        break;
      }
    }
    
    setContent({
      keyword: config.h1,
      location,
      h1: config.h1,
      service: config.service,
      description: config.description
    });
  }, []);

  // WhatsApp function
  const openWhatsApp = useCallback((customMsg) => {
    const msg = customMsg || `Hi! I'm interested in ${content.keyword} services in ${content.location}. Please send me info about the FREE 3D Design offer.`;
    window.open(`https://wa.me/971585658002?text=${encodeURIComponent(msg)}`, '_blank');
  }, [content]);

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*New ${content.keyword} Inquiry*
━━━━━━━━━━━━━━━━━━
👤 Name: ${formData.name}
📱 Phone: ${formData.phone}
📧 Email: ${formData.email || 'Not provided'}
🏠 Service: ${formData.service || content.service}
💬 Message: ${formData.message || 'Interested in free consultation'}
━━━━━━━━━━━━━━━━━━
📍 Source: Google Ads
🔍 Keyword: ${content.keyword}
🎁 Offer: FREE 3D Design + AED 50K Upgrade`;

    // Track conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-612864132/qqQcQNeM-bADEISh7qQC',
        value: 100000,
        currency: 'AED'
      });
    }

    window.location.href = `https://wa.me/971585658002?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      <Head>
        <title>{content.h1} {content.location} | Free 3D Design | Unicorn Renovations</title>
        <meta name="description" content={`${content.h1} in ${content.location}. 800+ projects completed. 12+ years experience. FREE 3D design & quote. Up to AED 50K upgrade offer. Fixed price. 6-8 weeks delivery.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow" />
        
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://wa.me" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "name": "Unicorn Renovations",
          "description": `${content.h1} company in ${content.location}`,
          "url": "https://dubailuxrenovate.com",
          "telephone": "+971585658002",
          "priceRange": "AED 25,000 - AED 500,000",
          "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "287" },
          "areaServed": ["Dubai Hills", "Emirates Hills", "Arabian Ranches", "Palm Jumeirah", "Damac Hills"]
        })}} />

        <style dangerouslySetInnerHTML={{ __html: `
          *{margin:0;padding:0;box-sizing:border-box}
          html{scroll-behavior:smooth}
          body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0a;color:#fff;-webkit-font-smoothing:antialiased}
          img{max-width:100%;height:auto;display:block}
          .gold{color:#d4af37}
          input:focus,select:focus,textarea:focus{outline:none;border-color:#d4af37 !important}
        `}} />
      </Head>

      <div style={{ minHeight: '100vh', paddingBottom: '70px' }}>
        
        {/* ===== HEADER ===== */}
        <header style={{ background: '#fff', padding: '12px 16px', position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="https://unicornrenovations.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#1a1a1a', fontWeight: 800, fontSize: '15px' }}>
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="46" stroke="#1a1a1a" strokeWidth="2"/>
              <path d="M50 20 L50 50 M35 35 L50 50 L65 35 M30 55 L50 80 L70 55" stroke="#1a1a1a" strokeWidth="2.5" fill="none"/>
            </svg>
            UNICORN GROUP
          </a>
          <a href="tel:+971585658002" style={{ background: '#d4af37', color: '#1a1a1a', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
            Call Now
          </a>
        </header>

        {/* ===== HERO ===== */}
        <section style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)', padding: '24px 16px 32px', textAlign: 'center' }}>
          
          {/* Urgency Badge - Matches Ad Copy */}
          <div style={{ display: 'inline-block', background: '#d4af37', color: '#1a1a1a', fontSize: '11px', fontWeight: 700, padding: '6px 14px', borderRadius: '20px', marginBottom: '16px' }}>
            🎁 Up to AED 50,000 FREE Upgrade • Limited Slots
          </div>
          
          {/* H1 - Dynamic Keyword Insertion */}
          <h1 style={{ fontSize: '26px', fontWeight: 800, lineHeight: 1.25, color: '#d4af37', marginBottom: '8px' }}>
            {content.h1} in {content.location}
          </h1>
          
          {/* Subheadline - Matches Ad Copy */}
          <p style={{ fontSize: '18px', color: '#fff', marginBottom: '16px', fontWeight: 500 }}>
            Fixed Price • 6-8 Weeks Handover
          </p>
          
          {/* Trust Signals - From Ads */}
          <div style={{ fontSize: '14px', color: '#d4af37', marginBottom: '20px', fontStyle: 'italic' }}>
            Luxury. Precision. Commitment.
          </div>
          
          {/* Stats Row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {[
              { num: '12+', label: 'Years Experience' },
              { num: '800+', label: 'Villas Completed' },
              { num: '4.9★', label: 'Google Rating' }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#d4af37' }}>{stat.num}</div>
                <div style={{ fontSize: '11px', color: '#999' }}>{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* CTA Button - Matches Ad Copy */}
          <button 
            onClick={() => openWhatsApp()}
            style={{ width: '100%', background: '#d4af37', color: '#1a1a1a', fontSize: '16px', fontWeight: 700, padding: '16px', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '12px' }}
          >
            Get FREE 3D Design & Quote
          </button>
          
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '24px' }}>
            ✓ Free Consultation • ✓ No Obligations • ✓ Instant Quote
          </p>
          
          {/* Before/After */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px', zIndex: 1 }}>BEFORE</span>
              <img src="/before-villa.webp" alt={`${content.keyword} Before`} width={200} height={180} style={{ width: '100%', height: '160px', objectFit: 'cover' }} loading="eager" />
            </div>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', top: '8px', left: '8px', background: '#d4af37', color: '#1a1a1a', fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px', zIndex: 1 }}>AFTER</span>
              <img src="/after-villa.webp" alt={`${content.keyword} After`} width={200} height={180} style={{ width: '100%', height: '160px', objectFit: 'cover' }} loading="eager" />
            </div>
          </div>
        </section>

        {/* ===== SERVICES - Matches All Ad Keywords ===== */}
        <section style={{ background: '#0a0a0a', padding: '40px 16px' }}>
          <h2 style={{ color: '#fff', fontSize: '20px', textAlign: 'center', marginBottom: '8px', fontWeight: 700 }}>
            Our {content.keyword} Services
          </h2>
          <p style={{ color: '#888', fontSize: '13px', textAlign: 'center', marginBottom: '24px' }}>
            All services include FREE consultation, 3D design & 5-year warranty
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {SERVICES.map((service, i) => (
              <a 
                key={i}
                href={service.url}
                target="_blank"
                rel="noopener"
                style={{ 
                  background: '#1a1a1a', 
                  borderRadius: '12px', 
                  padding: '16px', 
                  textAlign: 'center',
                  border: '1px solid #333',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s'
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{service.icon}</div>
                <h3 style={{ color: '#d4af37', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>{service.title}</h3>
                <p style={{ color: '#888', fontSize: '11px', marginBottom: '6px' }}>{service.desc}</p>
                <p style={{ color: '#fff', fontSize: '12px', fontWeight: 600 }}>{service.price}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ===== WHY CHOOSE US - Matches Ad USPs ===== */}
        <section style={{ background: '#1a1a1a', padding: '40px 16px' }}>
          <h2 style={{ color: '#d4af37', fontSize: '22px', textAlign: 'center', marginBottom: '32px', fontWeight: 700 }}>
            Why Choose Unicorn?
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { icon: '🏠', title: 'ALL-IN-ONE CONTRACTOR', desc: 'From design to municipality approvals, we manage everything. No subcontractors.' },
              { icon: '📊', title: 'AI-POWERED PRECISION', desc: 'Houston AI ensures accurate estimates & quality control on every project.' },
              { icon: '⏱️', title: 'FIXED PRICE & TIMELINE', desc: 'Guaranteed pricing with 6-8 week handover. No surprises, no delays.' },
              { icon: '✨', title: 'LUXURY UPGRADES INCLUDED', desc: 'Premium kitchens, smart home automation & solar systems included.' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ fontSize: '32px', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <h3 style={{ color: '#d4af37', fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>{item.title}</h3>
                  <p style={{ color: '#ccc', fontSize: '13px', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SPECIAL OFFER - From Ad Copy ===== */}
        <section style={{ background: '#d4af37', padding: '24px 16px', textAlign: 'center' }}>
          <h2 style={{ color: '#1a1a1a', fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>
            🎁 Limited Time Offer
          </h2>
          <p style={{ color: '#1a1a1a', fontSize: '14px', marginBottom: '16px' }}>
            Get up to <strong>AED 50,000</strong> FREE upgrade on your {content.keyword.toLowerCase()} project
          </p>
          <button 
            onClick={() => openWhatsApp(`Hi! I'm interested in the AED 50K free upgrade offer for ${content.keyword} in ${content.location}.`)}
            style={{ background: '#1a1a1a', color: '#d4af37', fontSize: '14px', fontWeight: 700, padding: '14px 32px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Claim Your FREE Upgrade →
          </button>
          <p style={{ color: '#1a1a1a', fontSize: '11px', marginTop: '12px', opacity: 0.7 }}>
            *Limited to first 5 clients this month
          </p>
        </section>

        {/* ===== PORTFOLIO ===== */}
        <section style={{ background: '#0a0a0a', padding: '40px 16px' }}>
          <h2 style={{ color: '#fff', fontSize: '18px', marginBottom: '24px', fontWeight: 600 }}>
            Our Key Portfolio Projects
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { img: '/portfolio-dubai-hills.webp', name: 'Dubai Hills', type: 'Full Villa Renovation' },
              { img: '/portfolio-emirates-hills.webp', name: 'Emirates Hills', type: 'Interior Design' },
              { img: '/portfolio-damac-hills.webp', name: 'Damac Hills', type: 'Villa Extension' }
            ].map((project, i) => (
              <div key={i} style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <img src={project.img} alt={`${project.name} ${content.keyword}`} width={400} height={160} style={{ width: '100%', height: '160px', objectFit: 'cover' }} loading="lazy" />
                <div style={{ background: '#fff', color: '#1a1a1a', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700 }}>{project.name}</span>
                  <span style={{ fontSize: '12px', color: '#666' }}>{project.type}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Projects Link */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <a 
              href="https://unicornrenovations.com/portfolio/" 
              target="_blank" 
              rel="noopener"
              style={{ color: '#d4af37', fontSize: '14px', fontWeight: 600, textDecoration: 'none', padding: '12px 24px', border: '1px solid #d4af37', borderRadius: '8px', display: 'inline-block' }}
            >
              View All 800+ Projects →
            </a>
          </div>
        </section>

        {/* ===== AREAS SERVED - Matches Search Intent ===== */}
        <section style={{ background: '#1a1a1a', padding: '32px 16px' }}>
          <h3 style={{ color: '#d4af37', fontSize: '16px', textAlign: 'center', marginBottom: '16px' }}>
            {content.keyword} Services Across Dubai
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
            {['Dubai Hills', 'Emirates Hills', 'Arabian Ranches', 'Palm Jumeirah', 'Damac Hills', 'JVC', 'Motor City', 'Al Barsha'].map((area, i) => (
              <span key={i} style={{ background: '#333', color: '#fff', fontSize: '11px', padding: '6px 12px', borderRadius: '16px' }}>{area}</span>
            ))}
          </div>
        </section>

        {/* ===== TRUSTED PARTNERS ===== */}
        <section style={{ background: '#fff', padding: '24px 16px' }}>
          <h3 style={{ color: '#1a1a1a', fontSize: '12px', textAlign: 'center', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Premium Materials & Brands</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {['Miele', 'Blum', 'Hansgrohe', 'Duravit', 'Geberit', 'Vitra'].map((brand, i) => (
              <span key={i} style={{ fontWeight: 700, color: '#666', fontSize: '13px' }}>{brand}</span>
            ))}
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section style={{ background: '#f9f9f9', padding: '40px 16px' }}>
          <h2 style={{ color: '#1a1a1a', fontSize: '18px', textAlign: 'center', marginBottom: '24px', fontWeight: 600 }}>
            What Our Clients Say
          </h2>
          
          {[
            { text: '"Unicorn Renovations transformed our outdated villa into a modern masterpiece. Professional team, on-time delivery, and stunning results. Highly recommended!"', name: 'Ayesha R.', loc: 'Arabian Ranches', rating: '⭐⭐⭐⭐⭐' },
            { text: '"Best renovation company in Dubai. Quality work, transparent pricing, and excellent communication throughout the project. They delivered exactly what they promised."', name: 'Michael T.', loc: 'Dubai Hills Estate', rating: '⭐⭐⭐⭐⭐' }
          ].map((t, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '20px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ marginBottom: '8px' }}>{t.rating}</div>
              <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.6, marginBottom: '12px' }}>{t.text}</p>
              <p style={{ color: '#d4af37', fontWeight: 600, fontSize: '14px' }}>{t.name}</p>
              <p style={{ color: '#666', fontSize: '12px' }}>{t.loc}</p>
            </div>
          ))}
        </section>

        {/* ===== CORPORATE CLIENTS ===== */}
        <section style={{ background: '#fff', padding: '24px 16px' }}>
          <h3 style={{ color: '#1a1a1a', fontSize: '12px', textAlign: 'center', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Trusted by Leading Developers</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
            {['EMAAR', 'NAKHEEL', 'SOBHA', 'MERAAS', 'DAMAC', 'ALDAR'].map((client, i) => (
              <span key={i} style={{ fontWeight: 800, color: '#1a1a1a', fontSize: '12px' }}>{client}</span>
            ))}
          </div>
        </section>

        {/* ===== ABOUT WITH BACKLINKS ===== */}
        <section style={{ background: '#1a1a1a', padding: '40px 16px' }}>
          <h2 style={{ color: '#fff', fontSize: '20px', marginBottom: '8px', fontWeight: 600 }}>About Unicorn Renovations</h2>
          <h3 style={{ color: '#d4af37', fontSize: '15px', marginBottom: '16px' }}>Dubai's Premier {content.keyword} Experts</h3>
          <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
            With over 12 years of experience and 800+ completed projects, <a href="https://unicornrenovations.com/" target="_blank" rel="noopener" style={{ color: '#d4af37', textDecoration: 'none' }}>Unicorn Renovations</a> is Dubai's most trusted name in luxury <a href="https://unicornrenovations.com/villa-renovation/" target="_blank" rel="noopener" style={{ color: '#d4af37', textDecoration: 'none' }}>villa renovations</a>, <a href="https://unicornrenovations.com/interior-design/" target="_blank" rel="noopener" style={{ color: '#d4af37', textDecoration: 'none' }}>interior design</a>, and home remodeling.
          </p>
          <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
            From <a href="https://dubailuxrenovate.com/villa-reno?kw=villa+renovation&loc=Dubai+Hills" style={{ color: '#d4af37', textDecoration: 'none' }}>Dubai Hills</a> to <a href="https://dubailuxrenovate.com/villa-reno?kw=villa+renovation&loc=Palm+Jumeirah" style={{ color: '#d4af37', textDecoration: 'none' }}>Palm Jumeirah</a>, we've transformed homes across the UAE. Our all-in-one approach includes design, <a href="https://unicornrenovations.com/villa-extension/" target="_blank" rel="noopener" style={{ color: '#d4af37', textDecoration: 'none' }}>villa extensions</a>, <a href="https://unicornrenovations.com/swimming-pool/" target="_blank" rel="noopener" style={{ color: '#d4af37', textDecoration: 'none' }}>swimming pools</a>, and <a href="https://unicornrenovations.com/smart-home/" target="_blank" rel="noopener" style={{ color: '#d4af37', textDecoration: 'none' }}>smart home automation</a>.
          </p>
          
          {/* Explore More Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <a href="https://unicornrenovations.com/about-us/" target="_blank" rel="noopener" style={{ color: '#d4af37', fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '8px 16px', border: '1px solid #d4af37', borderRadius: '20px' }}>
              About Us →
            </a>
            <a href="https://unicornrenovations.com/portfolio/" target="_blank" rel="noopener" style={{ color: '#d4af37', fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '8px 16px', border: '1px solid #d4af37', borderRadius: '20px' }}>
              Our Portfolio →
            </a>
            <a href="https://unicornrenovations.com/contact-us/" target="_blank" rel="noopener" style={{ color: '#d4af37', fontSize: '13px', fontWeight: 600, textDecoration: 'none', padding: '8px 16px', border: '1px solid #d4af37', borderRadius: '20px' }}>
              Contact Us →
            </a>
          </div>
        </section>

        {/* ===== QUOTE FORM ===== */}
        <section id="quote-form" style={{ background: '#0a0a0a', padding: '40px 16px' }}>
          <h2 style={{ color: '#d4af37', fontSize: '14px', marginBottom: '4px' }}>Get Your Free Quote</h2>
          <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '8px', fontWeight: 600 }}>Request a Call Back</h3>
          <p style={{ color: '#888', fontSize: '13px', marginBottom: '20px' }}>
            Get FREE 3D design + up to AED 50K upgrade
          </p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              placeholder="Full Name *"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '14px 16px', borderRadius: '8px', fontSize: '16px' }}
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '14px 16px', borderRadius: '8px', fontSize: '16px' }}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '14px 16px', borderRadius: '8px', fontSize: '16px' }}
            />
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', color: formData.service ? '#fff' : '#888', padding: '14px 16px', borderRadius: '8px', fontSize: '16px' }}
            >
              <option value="">Select Service *</option>
              <option value="Villa Renovation">Villa Renovation</option>
              <option value="Interior Design">Interior Design</option>
              <option value="Villa Extension">Villa Extension</option>
              <option value="Home Renovation">Home Renovation</option>
              <option value="Kitchen Renovation">Kitchen Renovation</option>
              <option value="Bathroom Renovation">Bathroom Renovation</option>
              <option value="Swimming Pool">Swimming Pool</option>
              <option value="Other">Other</option>
            </select>
            <textarea
              placeholder="Tell us about your project"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '14px 16px', borderRadius: '8px', fontSize: '16px', resize: 'none' }}
            />
            <button
              type="submit"
              style={{ width: '100%', background: '#d4af37', color: '#1a1a1a', fontSize: '16px', fontWeight: 700, padding: '16px', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '8px' }}
            >
              Get FREE Quote & 3D Design →
            </button>
          </form>
          
          <p style={{ textAlign: 'center', color: '#666', fontSize: '11px', marginTop: '16px' }}>
            ✓ Free Consultation • ✓ No Spam • ✓ Response within 1 hour
          </p>
        </section>

        {/* ===== FIXED BOTTOM BAR ===== */}
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', height: '60px', zIndex: 100, boxShadow: '0 -2px 10px rgba(0,0,0,0.3)' }}>
          <a
            href="tel:+971585658002"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#2563eb', color: '#fff', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            Call Us
          </a>
          <button
            onClick={() => openWhatsApp()}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: '#fff', fontSize: '15px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </button>
        </div>

        {/* ===== FOOTER WITH BACKLINKS ===== */}
        <footer style={{ background: '#0a0a0a', padding: '40px 16px 100px', borderTop: '1px solid #222' }}>
          
          {/* Company Info */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <a href="https://unicornrenovations.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#fff', fontWeight: 800, fontSize: '18px', marginBottom: '12px' }}>
              <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="46" stroke="#d4af37" strokeWidth="2"/>
                <path d="M50 20 L50 50 M35 35 L50 50 L65 35 M30 55 L50 80 L70 55" stroke="#d4af37" strokeWidth="2.5" fill="none"/>
              </svg>
              UNICORN GROUP
            </a>
            <p style={{ color: '#888', fontSize: '13px', maxWidth: '300px', margin: '0 auto' }}>
              Dubai's Premier Villa Renovation & Interior Design Company. 12+ Years of Excellence.
            </p>
          </div>

          {/* Service Links */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#d4af37', fontSize: '14px', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>Our Services</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
              {[
                { label: 'Villa Renovation', url: 'https://unicornrenovations.com/villa-renovation/' },
                { label: 'Interior Design', url: 'https://unicornrenovations.com/interior-design/' },
                { label: 'Villa Extension', url: 'https://unicornrenovations.com/villa-extension/' },
                { label: 'Swimming Pool', url: 'https://unicornrenovations.com/swimming-pool/' },
                { label: 'Office Fitout', url: 'https://unicornrenovations.com/office-fitout/' },
                { label: 'Smart Home', url: 'https://unicornrenovations.com/smart-home/' }
              ].map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener" style={{ color: '#ccc', fontSize: '12px', textDecoration: 'none', padding: '6px 12px', background: '#1a1a1a', borderRadius: '16px' }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#d4af37', fontSize: '14px', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              {[
                { label: 'Home', url: 'https://unicornrenovations.com/' },
                { label: 'About Us', url: 'https://unicornrenovations.com/about-us/' },
                { label: 'Portfolio', url: 'https://unicornrenovations.com/portfolio/' },
                { label: 'Contact', url: 'https://unicornrenovations.com/contact-us/' },
                { label: 'Free Quote', url: 'https://dubailuxrenovate.com/' }
              ].map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener" style={{ color: '#888', fontSize: '13px', textDecoration: 'none' }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Location Links */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#d4af37', fontSize: '14px', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>Areas We Serve</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
              {[
                { label: 'Dubai Hills', url: 'https://dubailuxrenovate.com/villa-reno?kw=villa+renovation&loc=Dubai+Hills' },
                { label: 'Emirates Hills', url: 'https://dubailuxrenovate.com/villa-reno?kw=villa+renovation&loc=Emirates+Hills' },
                { label: 'Arabian Ranches', url: 'https://dubailuxrenovate.com/villa-reno?kw=villa+renovation&loc=Arabian+Ranches' },
                { label: 'Palm Jumeirah', url: 'https://dubailuxrenovate.com/villa-reno?kw=villa+renovation&loc=Palm+Jumeirah' },
                { label: 'Damac Hills', url: 'https://dubailuxrenovate.com/villa-reno?kw=villa+renovation&loc=Damac+Hills' }
              ].map((link, i) => (
                <a key={i} href={link.url} style={{ color: '#666', fontSize: '11px', textDecoration: 'none' }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <p style={{ color: '#888', fontSize: '13px', marginBottom: '8px' }}>
              📍 Regus, The Bridge Building, Sports City, Dubai, UAE
            </p>
            <p style={{ color: '#888', fontSize: '13px', marginBottom: '8px' }}>
              📞 <a href="tel:+971585658002" style={{ color: '#d4af37', textDecoration: 'none' }}>+971 58 565 8002</a>
            </p>
            <p style={{ color: '#888', fontSize: '13px' }}>
              ✉️ <a href="mailto:info@unicornrenovations.com" style={{ color: '#d4af37', textDecoration: 'none' }}>info@unicornrenovations.com</a>
            </p>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
            <a href="https://www.instagram.com/unicornrenovations/" target="_blank" rel="noopener" style={{ color: '#888', fontSize: '13px', textDecoration: 'none' }}>Instagram</a>
            <a href="https://www.facebook.com/unicornrenovations/" target="_blank" rel="noopener" style={{ color: '#888', fontSize: '13px', textDecoration: 'none' }}>Facebook</a>
            <a href="https://www.linkedin.com/company/unicornrenovations/" target="_blank" rel="noopener" style={{ color: '#888', fontSize: '13px', textDecoration: 'none' }}>LinkedIn</a>
            <a href="https://www.youtube.com/@unicornrenovations" target="_blank" rel="noopener" style={{ color: '#888', fontSize: '13px', textDecoration: 'none' }}>YouTube</a>
          </div>

          {/* Copyright */}
          <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid #222' }}>
            <p style={{ color: '#666', fontSize: '11px' }}>
              © 2025 Unicorn Renovations Group. All Rights Reserved.
            </p>
            <p style={{ color: '#555', fontSize: '10px', marginTop: '4px' }}>
              Dubai Municipality Approved Contractor | DED Licensed
            </p>
          </div>
        </footer>

        {/* Deferred Analytics */}
        <script dangerouslySetInnerHTML={{ __html: `
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
            }, 2000);
          });
        `}} />
      </div>
    </>
  );
}
