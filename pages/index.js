import Head from 'next/head';
import { useState, useCallback, useEffect, useRef } from 'react';
import Script from 'next/script';

export default function BathroomRenovationPremium() {
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    size: '', 
    timeline: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [trustProofVisible, setTrustProofVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const formRef = useRef(null);

  // Enhanced UAE phone validation
  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const uaePattern = /^(?:\+971|0)?5[0-9]{8}$/;
    return uaePattern.test(cleaned) && cleaned.length >= 9;
  };

  // Premium form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Enhanced validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Please enter a valid UAE number (05x xxx xxxx)';
    if (!formData.size) newErrors.size = 'Please select bathroom size';
    if (!formData.timeline) newErrors.timeline = 'Please select preferred timeline';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const firstError = Object.keys(newErrors)[0];
      document.getElementById(firstError)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setLoading(true);

    // Enhanced conversion tracking
    if (typeof window !== 'undefined') {
      // Google Ads
      if (window.gtag) {
        const value = formData.size === 'luxury' ? 50000 : 
                     formData.size === 'master' ? 35000 : 25000;
        window.gtag('event', 'conversion', { 
          'send_to': 'AW-612864132/PREMIUM_BATHROOM_LEAD',
          'value': value,
          'currency': 'AED'
        });
      }
      
      // Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'Lead', { currency: 'AED', value: value });
      }
    }

    // Premium WhatsApp message
    const message = `🏆 PREMIUM BATHROOM QUOTE REQUEST 🏆

👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📏 Size: ${formData.size}
⏰ Timeline: ${formData.timeline}
💬 Message: ${formData.message || 'Not specified'}

Please provide a detailed quote with material options.`;

    // Smart device detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const whatsappUrl = `https://wa.me/971585658002?text=${encodeURIComponent(message)}`;

    if (isMobile) {
      window.open(whatsappUrl, '_blank');
    } else {
      // Desktop fallback with better UX
      window.open(whatsappUrl, '_blank', 'width=600,height=700');
    }

    // Premium backend integration
    try {
      await fetch('/api/premium-lead', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Premium-Source': 'bathroom-renovation-premium'
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'premium-landing-page',
          estimated_value: formData.size === 'luxury' ? 50000 : 
                         formData.size === 'master' ? 35000 : 25000
        })
      });
    } catch (error) {
      console.error('Premium lead submission error:', error);
    }

    setSubmitted(true);
    setLoading(false);
    
    // Scroll to thank you message
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }, [formData]);

  // Premium testimonials data
  const testimonials = [
    {
      name: "Ahmed K.",
      location: "Palm Jumeirah",
      text: "Finished my master bathroom in exactly 21 days. No hidden costs, professional team!",
      rating: 5
    },
    {
      name: "Sarah M.",
      location: "Dubai Marina", 
      text: "The 5-year waterproofing warranty gave me peace of mind. Highly recommend!",
      rating: 5
    },
    {
      name: "Michael R.",
      location: "Arabian Ranches",
      text: "They handled everything including permits. A truly stress-free renovation!",
      rating: 5
    }
  ];

  // Premium effects
  useEffect(() => {
    // Trust proof popup
    const timer = setTimeout(() => setTrustProofVisible(true), 3000);
    
    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    // Scroll progress
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    
    return () => {
      clearTimeout(timer);
      clearInterval(testimonialInterval);
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Luxury Bathroom Renovation Dubai 🏆 | Fixed AED 25,000 | 21-Day Guarantee</title>
        <meta name="description" content="Dubai's premier bathroom renovation service. 5-year warranty, European materials, fixed pricing from AED 25,000. 287+ luxury bathrooms completed. ★★★★★" />
        <meta name="keywords" content="luxury bathroom renovation dubai, premium bathroom remodeling, bathroom renovation cost dubai, 5-star bathroom makeover" />
        <link rel="canonical" href="https://dubailuxrenovate.com/bathroom-renovation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Luxury Bathroom Renovation Dubai | Fixed Price AED 25,000" />
        <meta property="og:description" content="Transform your bathroom into a luxury spa. 21-day completion guarantee, 5-year warranty, premium European materials." />
        <meta property="og:image" content="https://dubailuxrenovate.com/og-bathroom-premium.jpg" />
        <meta property="og:url" content="https://dubailuxrenovate.com/bathroom-renovation" />
        <meta property="og:type" content="website" />

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeRenovation",
              "name": "Unicorn Renovations - Luxury Bathroom Specialist",
              "description": "Premium bathroom renovation services in Dubai with 5-year warranty",
              "telephone": "+971-58-565-8002",
              "areaServed": "Dubai",
              "serviceType": "Bathroom Renovation",
              "offers": {
                "@type": "Offer",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "priceCurrency": "AED",
                  "minPrice": "25000",
                  "maxPrice": "50000"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "287"
              }
            })
          }}
        />
      </Head>

      {/* Enhanced Tracking */}
      <Script
        id="gtag"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-612864132"
      />
      <Script id="gtag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-612864132');
          
          // Enhanced tracking
          gtag('event', 'page_view', {
            'page_title': 'Premium Bathroom Renovation',
            'page_location': window.location.href
          });
        `}
      </Script>

      {/* Premium CSS */}
      <style jsx global>{`
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        body { 
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
        }
        .container { 
          max-width: 1200px; 
          margin: 0 auto; 
          padding: 0 20px; 
        }
        .btn { 
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 18px 32px; 
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white; 
          text-decoration: none; 
          border-radius: 12px; 
          font-weight: bold; 
          font-size: 18px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
          position: relative;
          overflow: hidden;
        }
        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        .btn:hover::before {
          left: 100%;
        }
        .btn:hover { 
          transform: translateY(-3px); 
          box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
        }
        .btn:active {
          transform: translateY(-1px);
        }
        .btn-secondary {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          box-shadow: 0 4px 15px rgba(5, 150, 105, 0.3);
        }
        .btn-secondary:hover {
          box-shadow: 0 8px 25px rgba(5, 150, 105, 0.4);
        }
        
        /* Premium animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: var(--progress-width, 0%); }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Scroll Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'linear-gradient(90deg, #f59e0b, #059669)',
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.3s ease',
        zIndex: 10000
      }} style={{ transform: `scaleX(${scrollProgress / 100})` }} />

      {/* Premium Trust Bar */}
      <div style={{ 
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', 
        color: 'white', 
        padding: '14px 0',
        fontSize: '14px',
        fontWeight: '500'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center'
        }}>
          <span>🏆 Dubai's #1 Bathroom Specialist</span>
          <span>⭐ 4.9/5 (287+ Reviews)</span>
          <span>🛡️ 5-Year Comprehensive Warranty</span>
          <span>⚡ 21-Day Completion Guarantee</span>
        </div>
      </div>

      {/* Premium Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #0f172a 100%)', 
        color: 'white', 
        padding: '80px 20px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(5,150,105,0.1) 0%, transparent 70%)',
          animation: 'float 4s ease-in-out infinite 1s'
        }} />
        
        <div className="container" style={{ 
          textAlign: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          <h1 style={{ 
            fontSize: 'clamp(3rem, 6vw, 5rem)', 
            fontWeight: 'bold', 
            marginBottom: '24px',
            lineHeight: '1.1'
          }}>
            Luxury Bathroom
            <span style={{ 
              display: 'block', 
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '0.9em',
              marginTop: '10px'
            }}>
              Renovation Dubai
            </span>
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)', 
            marginBottom: '40px', 
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: '1.4'
          }}>
            Transform your bathroom into a <strong>5-star luxury spa</strong> with our premium renovation service
          </p>

          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            marginBottom: '60px'
          }}>
            <a href="tel:0585658002" className="btn">
              <span style={{ fontSize: '1.2em' }}>📞</span>
              058-565-8002
            </a>
            <a href="#premium-quote" className="btn btn-secondary">
              <span style={{ fontSize: '1.2em' }}>💎</span>
              Premium Quote
            </a>
          </div>

          {/* Enhanced Trust Indicators */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {[
              { number: "287+", label: "Luxury Bathrooms", icon: "🏆" },
              { number: "4.9★", label: "Customer Rating", icon: "⭐" },
              { number: "21", label: "Days Average", icon: "⚡" },
              { number: "5YR", label: "Warranty", icon: "🛡️" }
            ].map((item, index) => (
              <div key={index} style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '24px 16px', 
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                animation: `float ${3 + index}s ease-in-out infinite`
              }}>
                <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '4px' }}>{item.number}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s ease-in-out infinite'
        }}>
          <div style={{
            width: '24px',
            height: '40px',
            border: '2px solid #f59e0b',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '8px'
          }}>
            <div style={{
              width: '2px',
              height: '8px',
              background: '#f59e0b',
              borderRadius: '1px',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
          </div>
        </div>
      </section>

      {/* Premium Pricing Section */}
      <section style={{ padding: '100px 20px', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', 
            textAlign: 'center', 
            marginBottom: '60px',
            background: 'linear-gradient(135deg, #1e293b, #475569)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Premium Fixed Pricing
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              {
                title: "Standard",
                price: "25,000",
                size: "4-6m² • 21 days",
                popular: false,
                features: ["Italian Tiles", "Grohe Fixtures", "Waterproofing", "Full Warranty"],
                color: "#6b7280"
              },
              {
                title: "Master",
                price: "35,000", 
                size: "6-10m² • 21 days",
                popular: true,
                features: ["Premium Tiles", "Kohler Fixtures", "Rain Shower", "Full Warranty"],
                color: "#f59e0b"
              },
              {
                title: "Luxury",
                price: "50,000+",
                size: "10m²+ • 28 days", 
                popular: false,
                features: ["Marble/Porcelain", "Villeroy & Boch", "Spa Features", "Full Warranty"],
                color: "#10b981"
              }
            ].map((plan, index) => (
              <div key={index} style={{ 
                background: 'white',
                border: `2px solid ${plan.popular ? plan.color : '#e5e7eb'}`,
                borderRadius: '20px',
                padding: '40px 30px',
                textAlign: 'center',
                boxShadow: plan.popular ? '0 20px 40px rgba(245, 158, 11, 0.15)' : '0 10px 30px rgba(0,0,0,0.08)',
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}>
                {plan.popular && (
                  <span style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: plan.color,
                    color: 'white',
                    padding: '6px 20px',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}>
                    🏆 MOST POPULAR
                  </span>
                )}
                <h3 style={{ fontSize: '1.75rem', marginBottom: '16px', color: plan.color }}>{plan.title}</h3>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: plan.color, margin: '24px 0' }}>
                  AED {plan.price}
                </div>
                <p style={{ color: '#6b7280', marginBottom: '30px' }}>{plan.size}</p>
                <ul style={{ listStyle: 'none', marginTop: '20px', textAlign: 'left' }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                      <span style={{ color: plan.color, marginRight: '8px' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a 
                  href="#premium-quote" 
                  style={{
                    display: 'block',
                    marginTop: '30px',
                    padding: '16px',
                    background: plan.color,
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Select This Plan
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Testimonials */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', 
            textAlign: 'center', 
            marginBottom: '60px',
            color: '#1e293b'
          }}>
            What Our Clients Say
          </h2>
          
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
            padding: '40px',
            borderRadius: '20px',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{ fontSize: '4rem', color: '#f59e0b', marginBottom: '20px' }}>❝</div>
            <p style={{ 
              fontSize: '1.25rem', 
              lineHeight: '1.6', 
              marginBottom: '30px',
              fontStyle: 'italic',
              color: '#475569'
            }}>
              {testimonials[activeTestimonial].text}
            </p>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>
                {testimonials[activeTestimonial].name}
              </div>
              <div style={{ color: '#64748b' }}>{testimonials[activeTestimonial].location}</div>
              <div style={{ marginTop: '10px' }}>
                {'★'.repeat(testimonials[activeTestimonial].rating)}
              </div>
            </div>
            
            {/* Testimonial navigation */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    background: index === activeTestimonial ? '#f59e0b' : '#cbd5e1',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Trust Proof Popup */}
      {trustProofVisible && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: 'white',
          padding: '20px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          zIndex: 1000,
          animation: 'slideIn 0.5s ease',
          border: '2px solid #10b981',
          maxWidth: '300px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              marginRight: '10px'
            }}>✓</div>
            <div>
              <p style={{ fontWeight: 'bold', margin: 0 }}>Sarah from Dubai Marina</p>
              <p style={{ fontSize: '0.8rem', color: '#059669', margin: 0 }}>Just booked master bathroom</p>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>2 minutes ago • AED 35,000</p>
        </div>
      )}

      {/* Premium Quote Form */}
      <section id="premium-quote" ref={formRef} style={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
        color: 'white', 
        padding: '100px 20px'
      }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', 
            textAlign: 'center', 
            marginBottom: '20px' 
          }}>
            Get Your Premium Quote
          </h2>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.25rem',
            opacity: 0.8,
            marginBottom: '50px'
          }}>
            Receive a detailed, fixed-price quote within 30 minutes
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '18px',
                    borderRadius: '12px',
                    border: errors.name ? '2px solid #ef4444' : '2px solid #374151',
                    fontSize: '16px',
                    background: '#334155',
                    color: 'white',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#f59e0b';
                    e.target.style.background = '#475569';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.name ? '#ef4444' : '#374151';
                    e.target.style.background = '#334155';
                  }}
                />
                {errors.name && (
                  <p style={{ color: '#ef4444', marginTop: '8px', fontSize: '0.875rem' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  WhatsApp Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="05x xxx xxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '18px',
                    borderRadius: '12px',
                    border: errors.phone ? '2px solid #ef4444' : '2px solid #374151',
                    fontSize: '16px',
                    background: '#334155',
                    color: 'white',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#f59e0b';
                    e.target.style.background = '#475569';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.phone ? '#ef4444' : '#374151';
                    e.target.style.background = '#334155';
                  }}
                />
                {errors.phone && (
                  <p style={{ color: '#ef4444', marginTop: '8px', fontSize: '0.875rem' }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="size" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Bathroom Size *
                </label>
                <select
                  id="size"
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '18px',
                    borderRadius: '12px',
                    border: errors.size ? '2px solid #ef4444' : '2px solid #374151',
                    fontSize: '16px',
                    background: '#334155',
                    color: 'white',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#f59e0b';
                    e.target.style.background = '#475569';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.size ? '#ef4444' : '#374151';
                    e.target.style.background = '#334155';
                  }}
                >
                  <option value="">Select Bathroom Size</option>
                  <option value="standard">Standard (4-6m²) - AED 25,000</option>
                  <option value="master">Master (6-10m²) - AED 35,000</option>
                  <option value="luxury">Luxury (10m²+) - AED 50,000+</option>
                </select>
                {errors.size && (
                  <p style={{ color: '#ef4444', marginTop: '8px', fontSize: '0.875rem' }}>
                    {errors.size}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="timeline" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Preferred Timeline *
                </label>
                <select
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '18px',
                    borderRadius: '12px',
                    border: errors.timeline ? '2px solid #ef4444' : '2px solid #374151',
                    fontSize: '16px',
                    background: '#334155',
                    color: 'white',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#f59e0b';
                    e.target.style.background = '#475569';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.timeline ? '#ef4444' : '#374151';
                    e.target.style.background = '#334155';
                  }}
                >
                  <option value="">Select Timeline</option>
                  <option value="immediate">Immediately (Next 7 days)</option>
                  <option value="1month">Within 1 Month</option>
                  <option value="3months">Within 3 Months</option>
                  <option value="planning">Just Planning/Researching</option>
                </select>
                {errors.timeline && (
                  <p style={{ color: '#ef4444', marginTop: '8px', fontSize: '0.875rem' }}>
                    {errors.timeline}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Additional Requirements
                </label>
                <textarea
                  id="message"
                  placeholder="Tell us about your dream bathroom, specific materials, or special requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '18px',
                    borderRadius: '12px',
                    border: '2px solid #374151',
                    fontSize: '16px',
                    background: '#334155',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#f59e0b';
                    e.target.style.background = '#475569';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#374151';
                    e.target.style.background = '#334155';
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn"
                style={{ 
                  width: '100%', 
                  padding: '20px',
                  fontSize: '1.125rem',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid transparent',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Processing Your Premium Quote...
                  </>
                ) : (
                  <>
                    🏆 Get My Premium Quote Now
                    <span style={{ transition: 'transform 0.3s ease' }}>→</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#f59e0b' }}>
                Thank You for Choosing Premium!
              </h3>
              <p style={{ fontSize: '1.25rem', marginBottom: '30px', opacity: 0.9 }}>
                Your premium bathroom consultation has been scheduled. Our luxury specialist will contact you within 30 minutes with your detailed quote.
              </p>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '30px', 
                borderRadius: '16px',
                display: 'inline-block'
              }}>
                <p style={{ marginBottom: '15px', fontWeight: '500' }}>For immediate assistance:</p>
                <a href="tel:0585658002" style={{
                  fontSize: '1.5rem',
                  color: '#f59e0b',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#fbbf24'}
                onMouseOut={(e) => e.target.style.color = '#f59e0b'}
                >
                  📞 058-565-8002
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Premium Mobile CTA */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
        borderTop: '1px solid #334155',
        zIndex: 1000,
        '@media (min-width: 768px)': { display: 'none' }
      }}>
        <a href="tel:0585658002" style={{
          padding: '18px',
          textAlign: 'center',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: 'white',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.3s ease'
        }}
        onTouchStart={(e) => e.target.style.opacity = '0.8'}
        onTouchEnd={(e) => e.target.style.opacity = '1'}
        >
          <span>📞</span>
          Call Now
        </a>
        <a href="#premium-quote" style={{
          padding: '18px',
          textAlign: 'center',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #059669, #047857)',
          color: 'white',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.3s ease'
        }}
        onTouchStart={(e) => e.target.style.opacity = '0.8'}
        onTouchEnd={(e) => e.target.style.opacity = '1'}
        >
          <span>💎</span>
          Premium Quote
        </a>
      </div>

      {/* Additional animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
          40% { transform: translateY(-10px) translateX(-50%); }
          60% { transform: translateY(-5px) translateX(-50%); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
