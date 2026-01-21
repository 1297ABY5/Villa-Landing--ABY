// pages/index.js - QUALITY SCORE KILLER
// Optimized for: Speed + Relevance + Mobile Experience
// Target: <2s load, 90+ PageSpeed, 9+ Quality Score

import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

export default function QualityScoreKiller() {
  const router = useRouter();
  
  // Minimal state - only what's needed for conversion
  const [formData, setFormData] = useState({ name: '', phone: '', service: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Dynamic content from URL params (for keyword relevance)
  const [content, setContent] = useState({
    keyword: 'Villa Renovation',
    location: 'Dubai',
    h1: 'Villa Renovation Dubai',
    h2: 'Dubai\'s #1 Rated Villa Renovation Company'
  });

  // Services Data with Images
  const services = [
    { 
      image: "/villa-renovation.webp",
      icon: '🏠', 
      title: 'Complete Villa Renovation', 
      desc: 'Full interior & exterior transformation', 
      price: 'From AED 150,000' 
    },
    { 
      image: "/villa-extension.webp",
      icon: '🏗️', 
      title: 'Villa Extension', 
      desc: 'Add rooms, floors & outdoor spaces', 
      price: 'From AED 120,000' 
    },
    { 
      image: "/Interior-Design.webp",
      icon: '🎨', 
      title: 'Interior Design', 
      desc: 'Complete design & furniture', 
      price: 'From AED 60,000' 
    },
    { 
      image: "/swimming-pool.webp",
      icon: '🏊', 
      title: 'Pool Construction', 
      desc: 'Custom pools & landscaping', 
      price: 'From AED 80,000' 
    },
    { 
      image: "/office-fitout.webp",
      icon: '🍳', 
      title: 'Kitchen Renovation', 
      desc: 'Modern kitchens with premium finishes', 
      price: 'From AED 45,000' 
    },
    { 
      image: "/smart-home.webp",
      icon: '🛁', 
      title: 'Bathroom Renovation', 
      desc: 'Luxury bathroom makeovers', 
      price: 'From AED 25,000' 
    },
  ];

  // Parse URL params for dynamic keyword insertion
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get('keyword') || params.get('utm_term') || 'Villa Renovation';
    const location = params.get('location') || params.get('loc') || 'Dubai';
    const matchtype = params.get('matchtype') || 'broad';
    
    const headlines = {
      'exact': `#1 ${keyword} Company in ${location}`,
      'phrase': `Professional ${keyword} in ${location}`,
      'broad': `${keyword} ${location}`
    };

    setContent({
      keyword,
      location,
      h1: headlines[matchtype] || `${keyword} ${location}`,
      h2: `${location}'s Most Trusted ${keyword} Experts`
    });
  }, []);

  // Lightweight form submission -> WhatsApp
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const message = `*New ${content.keyword} Inquiry*
━━━━━━━━━━━━━━━━━━
Name: ${formData.name}
Phone: ${formData.phone}
Service: ${formData.service || content.keyword}
Location: ${content.location}
━━━━━━━━━━━━━━━━━━
Source: Google Ads
Page: ${content.keyword}`;

    // Track conversion (non-blocking)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-612864132/qqQcQNeM-bADEISh7qQC',
        value: 100000,
        currency: 'AED'
      });
    }

    window.location.href = `https://wa.me/971585658002?text=${encodeURIComponent(message)}`;
    setSubmitted(true);
  }, [formData, content]);

  // Quick WhatsApp - no form needed
  const quickWhatsApp = () => {
    const msg = `Hi! I'm interested in ${content.keyword} in ${content.location}. Please send me info.`;
    window.open(`https://wa.me/971585658002?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      <Head>
        {/* SEO + Quality Score Optimization */}
        <title>{content.h1} | Free Quote & 3D Design | Unicorn Renovations</title>
        <meta name="description" content={`${content.keyword} specialists in ${content.location}. 800+ projects completed. Dubai Municipality approved. Free 3D design & quote. Call +971 58 565 8002`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="index, follow" />
        
        {/* Preconnect for speed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        
        {/* Favicon - Multiple formats for all devices */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Schema.org for Rich Results + Quality Score */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "name": "Unicorn Renovations",
          "description": `${content.keyword} company in ${content.location}`,
          "url": "https://unicornrenovations.com",
          "telephone": "+971585658002",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Dubai",
            "addressRegion": "Dubai",
            "addressCountry": "AE"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "25.0657",
            "longitude": "55.1713"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "287"
          },
          "priceRange": "AED 50,000 - AED 500,000"
        })}} />
        
        {/* Critical CSS - Inlined for fastest FCP */}
        <style dangerouslySetInnerHTML={{ __html: `
          *{margin:0;padding:0;box-sizing:border-box}
          html{scroll-behavior:smooth}
          body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;line-height:1.6}
          .container{max-width:1200px;margin:0 auto;padding:0 16px}
          .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:16px 32px;border-radius:8px;font-weight:700;font-size:16px;cursor:pointer;transition:all 0.2s;border:none;text-decoration:none}
          .btn-primary{background:#d97706;color:#fff}
          .btn-primary:hover{background:#b45309;transform:translateY(-2px)}
          .btn-green{background:#22c55e;color:#fff}
          .btn-green:hover{background:#16a34a}
          .btn-outline{background:transparent;border:2px solid #fff;color:#fff}
          .btn-outline:hover{background:#fff;color:#1a1a1a}
          input,select{width:100%;padding:16px;border:2px solid #e5e5e5;border-radius:8px;font-size:16px;transition:border-color 0.2s}
          input:focus,select:focus{outline:none;border-color:#d97706}
          .trust-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.1);backdrop-filter:blur(10px);padding:8px 16px;border-radius:50px;font-size:14px;font-weight:600}
          @media(max-width:768px){.btn{width:100%;padding:14px 24px}.hide-mobile{display:none}}
          .pulse{animation:pulse 2s infinite}
          @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
          .service-card{background:#fff;border-radius:12px;overflow:hidden;border:2px solid #e5e5e5;cursor:pointer;transition:all 0.3s}
          .service-card:hover{border-color:#d97706;transform:translateY(-4px);box-shadow:0 10px 30px rgba(0,0,0,0.1)}
        `}} />
      </Head>

      <div style={{ minHeight: '100vh' }}>
        
        {/* ===== URGENCY BAR - Keyword Rich ===== */}
        <div style={{ background: 'linear-gradient(90deg, #dc2626, #b91c1c)', color: '#fff', padding: '10px 16px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>
          🔥 LIMITED: Free 3D Design (Worth AED 5,000) for {content.keyword} Projects This Month
        </div>

        {/* ===== HEADER - Fast, Simple ===== */}
        <header style={{ background: '#fff', borderBottom: '1px solid #e5e5e5', padding: '12px 0', position: 'sticky', top: 0, zIndex: 50 }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#1a1a1a' }}>
              UNICORN<span style={{ color: '#d97706' }}>.</span>
            </div>
            <a href="tel:+971585658002" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1a1a1a', textDecoration: 'none', fontWeight: '700' }}>
              <span style={{ fontSize: '20px' }}>📞</span>
              <span className="hide-mobile">+971 58 565 8002</span>
            </a>
          </div>
        </header>

        {/* ===== HERO - Keyword Optimized for Quality Score ===== */}
        <section style={{ 
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('/hero-image-optimized.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          padding: '60px 0 80px'
        }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', alignItems: 'center' }}>
              
              {/* Left: Keyword-Rich Content */}
              <div style={{ textAlign: 'center' }}>
                
                {/* Trust Badges - Above Fold */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
                  <span className="trust-badge">✓ Dubai Municipality Approved</span>
                  <span className="trust-badge">⭐ 4.9/5 (287 Reviews)</span>
                  <span className="trust-badge">🏆 15+ Years Experience</span>
                </div>

                {/* H1 - Primary Keyword */}
                <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: '900', lineHeight: '1.1', marginBottom: '16px' }}>
                  {content.h1}
                </h1>
                
                {/* H2 - Secondary Keyword */}
                <h2 style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: '400', opacity: '0.9', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
                  {content.h2} • Free 3D Design • Fixed Price Guarantee
                </h2>

                {/* Stats Row - Trust + Keywords */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '32px', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: '900', color: '#fbbf24' }}>800+</div>
                    <div style={{ fontSize: '14px', opacity: '0.8' }}>Villas Renovated</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: '900', color: '#fbbf24' }}>15+</div>
                    <div style={{ fontSize: '14px', opacity: '0.8' }}>Years in Dubai</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: '900', color: '#fbbf24' }}>5yr</div>
                    <div style={{ fontSize: '14px', opacity: '0.8' }}>Warranty</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '0 auto' }}>
                  <button onClick={quickWhatsApp} className="btn btn-green pulse" style={{ fontSize: '18px' }}>
                    <svg style={{ width: '24px', height: '24px' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp Free Quote Now
                  </button>
                  <a href="tel:+971585658002" className="btn btn-outline">
                    📞 Call +971 58 565 8002
                  </a>
                </div>

                <p style={{ fontSize: '13px', opacity: '0.7', marginTop: '16px' }}>
                  ✓ Free consultation • ✓ No obligation • ✓ Response in 30 min
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SERVICES - With Images ===== */}
        <section style={{ padding: '60px 0', background: '#fff' }}>
          <div className="container">
            <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>
              Our {content.keyword} Services in {content.location}
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {services.map((service, i) => (
                <div 
                  key={i} 
                  className="service-card"
                  onClick={quickWhatsApp}
                >
                  {/* Image Section */}
                  <div style={{ position: 'relative', height: '180px', width: '100%', overflow: 'hidden', background: '#f3f4f6' }}>
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        loading="lazy"
                        quality={60}
                        style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                      />
                    ) : (
                      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fef3c7, #fde68a)' }}>
                        <span style={{ fontSize: '48px' }}>{service.icon}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{service.title}</h3>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>{service.desc}</p>
                    <p style={{ fontSize: '16px', fontWeight: '700', color: '#d97706' }}>{service.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY CHOOSE US - Trust Signals ===== */}
        <section style={{ padding: '60px 0', background: '#1a1a1a', color: '#fff' }}>
          <div className="container">
            <h2 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '40px' }}>
              Why {content.location} Homeowners Choose Unicorn Renovations
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
              {[
                { icon: '✅', title: 'Municipality Approved', desc: 'All permits & approvals handled' },
                { icon: '💰', title: 'Fixed Price Guarantee', desc: 'No hidden costs or surprises' },
                { icon: '📅', title: 'On-Time Delivery', desc: 'Project timeline guaranteed' },
                { icon: '🛡️', title: '5-Year Warranty', desc: 'Full workmanship warranty' },
                { icon: '🎨', title: 'Free 3D Design', desc: 'Visualize before you commit' },
                { icon: '⭐', title: '287 5-Star Reviews', desc: 'Rated 4.9/5 on Google' },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fbbf24', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', opacity: '0.8' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SIMPLE LEAD FORM ===== */}
        <section id="quote" style={{ padding: '60px 0', background: '#fff' }}>
          <div className="container" style={{ maxWidth: '500px' }}>
            <div style={{ background: '#f9fafb', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', textAlign: 'center', marginBottom: '8px' }}>
                Get Your Free {content.keyword} Quote
              </h2>
              <p style={{ textAlign: 'center', color: '#666', marginBottom: '24px', fontSize: '14px' }}>
                Fill in your details • We respond in 30 minutes
              </p>
              
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Request Sent!</h3>
                  <p style={{ color: '#666' }}>We'll contact you on WhatsApp shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <input
                    type="text"
                    placeholder="Your Name *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp Number *"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{ color: formData.service ? '#1a1a1a' : '#999' }}
                  >
                    <option value="">Select Service (Optional)</option>
                    <option value="Villa Renovation">Complete Villa Renovation</option>
                    <option value="Kitchen Renovation">Kitchen Renovation</option>
                    <option value="Bathroom Renovation">Bathroom Renovation</option>
                    <option value="Villa Extension">Villa Extension</option>
                    <option value="Pool Construction">Pool Construction</option>
                    <option value="Interior Design">Interior Design</option>
                  </select>
                  
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ marginTop: '8px' }}>
                    {isSubmitting ? 'Sending...' : 'Get Free Quote →'}
                  </button>
                  
                  <p style={{ fontSize: '12px', color: '#999', textAlign: 'center' }}>
                    🔒 Your information is secure and never shared
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ===== AREAS WE SERVE - Local SEO ===== */}
        <section style={{ padding: '40px 0', background: '#f9fafb' }}>
          <div className="container">
            <h3 style={{ fontSize: '20px', fontWeight: '700', textAlign: 'center', marginBottom: '20px' }}>
              {content.keyword} Services Across Dubai
            </h3>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', maxWidth: '800px', margin: '0 auto' }}>
              Palm Jumeirah • Emirates Hills • Arabian Ranches • Dubai Hills • Jumeirah Golf Estates • 
              Al Barari • District One • The Lakes • The Springs • Meadows • Victory Heights • 
              Jumeirah Islands • Mohammed Bin Rashid City • Downtown Dubai • Al Barsha
            </p>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section style={{ padding: '60px 0', background: 'linear-gradient(135deg, #d97706, #b45309)', color: '#fff', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px' }}>
              Ready to Transform Your Villa?
            </h2>
            <p style={{ fontSize: '18px', opacity: '0.9', marginBottom: '32px' }}>
              Get your free {content.keyword} quote + 3D design today
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '0 auto' }}>
              <button onClick={quickWhatsApp} className="btn" style={{ background: '#22c55e', color: '#fff', fontSize: '18px' }}>
                <svg style={{ width: '24px', height: '24px' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp Us Now
              </button>
              <a href="tel:+971585658002" className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff' }}>
                📞 +971 58 565 8002
              </a>
            </div>
          </div>
        </section>

        {/* ===== FOOTER - Minimal ===== */}
        <footer style={{ padding: '40px 0', background: '#1a1a1a', color: '#fff' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '900', marginBottom: '16px' }}>
              UNICORN<span style={{ color: '#d97706' }}>.</span>
            </div>
            <p style={{ fontSize: '14px', opacity: '0.7', marginBottom: '16px' }}>
              Dubai's Premier {content.keyword} Company<br />
              Dubai Municipality Approved • 15+ Years Experience • 800+ Projects
            </p>
            <p style={{ fontSize: '12px', opacity: '0.5' }}>
              © {new Date().getFullYear()} Unicorn Renovations. All rights reserved.
            </p>
          </div>
        </footer>

        {/* ===== FLOATING WHATSAPP ===== */}
        <button
          onClick={quickWhatsApp}
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '60px',
            height: '60px',
            background: '#22c55e',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="pulse"
          aria-label="WhatsApp"
        >
          <svg style={{ width: '32px', height: '32px', color: '#fff' }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </button>

        {/* ===== MOBILE BOTTOM BAR ===== */}
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
          height: '64px'
        }} className="hide-desktop">
          <a href="tel:+971585658002" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#1a1a1a', textDecoration: 'none', fontWeight: '700', borderRight: '1px solid #e5e5e5' }}>
            📞 Call Now
          </a>
          <button onClick={quickWhatsApp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: '#fff', border: 'none', fontWeight: '700', cursor: 'pointer' }}>
            💬 WhatsApp
          </button>
        </div>
        
        {/* Spacer for mobile bottom bar */}
        <div style={{ height: '64px' }} className="hide-desktop"></div>

        {/* ===== ANALYTICS - Load LAST, Non-Blocking ===== */}
        <script dangerouslySetInnerHTML={{ __html: `
          // Defer analytics to not block rendering
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
        
        {/* Hide desktop class for mobile bottom bar */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media(min-width:769px){.hide-desktop{display:none!important}}
        `}} />
      </div>
    </>
  );
}
