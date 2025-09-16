// pages/index.js
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useCallback, memo } from 'react';
import dynamic from 'next/dynamic';

// FIXED: Using next/font properly without local font files
import { Roboto } from 'next/font/google';

// Self-hosted Roboto with only 400 & 700 weights for maximum performance
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
});

// FIXED: Just use system fonts for headings - no file needed!
const systemHeading = {
  className: '',
  style: {
    fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    fontWeight: 600,
  }
};

// Ultra-lazy loading for non-critical components
const InstagramFeed = dynamic(
  () => import('../components/InstagramFeed'),
  { 
    loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
    ssr: false 
  }
);

const TestimonialsSection = dynamic(
  () => import('../components/TestimonialsSection'),
  { 
    loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
    ssr: false,
    suspense: true
  }
);

const FAQSection = dynamic(
  () => import('../components/FAQSection'),
  { 
    loading: () => null,
    ssr: false
  }
);

// Memoized component with proper equality check
const ServiceCard = memo(({ icon, title, description }) => (
  <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 will-change-transform">
    <div className="text-4xl mb-4 select-none">{icon}</div>
    <h3 className="text-xl font-bold text-blue-900 mb-4" style={systemHeading.style}>
      {title}
    </h3>
    <p className={`text-gray-600 ${roboto.className}`}>
      {description}
    </p>
  </div>
), (prevProps, nextProps) => 
  prevProps.title === nextProps.title && 
  prevProps.description === nextProps.description
);

ServiceCard.displayName = 'ServiceCard';

// Portfolio card component
const PortfolioCard = memo(({ img, title, desc, budget, duration }) => (
  <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer">
    <div className="aspect-w-4 aspect-h-3 relative h-80">
      <Image
        src={img}
        alt={`${title} - Villa Renovation Dubai`}
        fill
        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAAAwAgCdASoIAAYAAkA4JZwCdAEO/gjeAA+gAP79O7/7PYkr+8H/v3/85bgAJfUA51AAtQBOYACeAE6YAHC8AaH0AOeGUjX+4EWB/kAA"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-2xl font-bold mb-2" style={systemHeading.style}>{title}</h3>
        <p className={`text-gray-200 mb-3 ${roboto.className}`}>{desc}</p>
        <div className={`flex gap-4 text-sm ${roboto.className}`}>
          <span className="flex items-center gap-1">💰 {budget}</span>
          <span className="flex items-center gap-1">⏱️ {duration}</span>
        </div>
      </div>
    </div>
  </div>
));

PortfolioCard.displayName = 'PortfolioCard';

export default function Home() {
  const [formState, setFormState] = useState({ submitted: false, loading: false });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  // Static data - no re-computation
  const services = [
    { icon: "🏗️", title: "Villa Renovation", description: "Complete luxury transformation with premium materials" },
    { icon: "🍳", title: "Kitchen Remodeling", description: "Modern kitchens with German appliances" },
    { icon: "🛁", title: "Bathroom Renovation", description: "Spa-inspired luxury bathrooms" },
    { icon: "🎨", title: "Interior Design", description: "Bespoke interior solutions" },
    { icon: "🏠", title: "Villa Extensions", description: "Seamless home additions" },
    { icon: "🌟", title: "Smart Home", description: "Advanced automation systems" }
  ];

  const portfolioItems = [
    { 
      img: "/portfolio1.webp", 
      title: "Palm Jumeirah Villa", 
      desc: "6-bedroom luxury renovation",
      budget: "AED 3.2M",
      duration: "4 months"
    },
    { 
      img: "/portfolio2.webp", 
      title: "Emirates Hills Mansion", 
      desc: "Modern extension with pool",
      budget: "AED 4.8M",
      duration: "6 months"
    },
    { 
      img: "/portfolio3.webp", 
      title: "Downtown Penthouse", 
      desc: "Ultra-luxury with Burj views",
      budget: "AED 2.1M",
      duration: "3 months"
    }
  ];

  const processSteps = [
    { number: "01", title: "Consultation", description: "Free on-site assessment" },
    { number: "02", title: "Design", description: "3D renders & planning" },
    { number: "03", title: "Execution", description: "Expert craftsmanship" },
    { number: "04", title: "Handover", description: "Quality inspection" }
  ];

  // Ultra-optimized scroll handler with RAF
  useEffect(() => {
    let ticking = false;
    
    const updateScrollState = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 10);
      
      // Progressive loading based on scroll position
      if (!showTestimonials && scrollY > 600) {
        setShowTestimonials(true);
      }
      if (!showInstagram && scrollY > 1200) {
        setShowInstagram(true);
      }
      if (!showFAQ && scrollY > 1800) {
        setShowFAQ(true);
      }
      
      ticking = false;
    };
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showTestimonials, showInstagram, showFAQ]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setFormState({ submitted: false, loading: true });
    
    // Form submission logic
    setTimeout(() => {
      setFormState({ submitted: true, loading: false });
      // Track conversion if GTM is available
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          'event': 'form_submit',
          'form_name': 'consultation_request'
        });
      }
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Luxury Villa Renovation Dubai | Unicorn Renovations</title>
        <meta name="description" content="Dubai's premier villa renovation company. Transform your villa with luxury remodeling services. ✓ Free Consultation ✓ 800+ Projects ✓ 5-Star Reviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://unicornrenovations.ae" />
        
        {/* Critical Resource Hints */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Luxury Villa Renovation Dubai | Unicorn Renovations" />
        <meta property="og:description" content="Transform your villa into a masterpiece with Dubai's premier renovation company" />
        <meta property="og:image" content="https://unicornrenovations.ae/hero2.webp" />
        <meta property="og:url" content="https://unicornrenovations.ae" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Luxury Villa Renovation Dubai" />
        <meta name="twitter:description" content="Transform your villa with Dubai's premier renovation company" />
        
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/hero2.webp" type="image/webp" fetchpriority="high" />
        
        {/* Minimal Critical CSS - Most styles handled by Tailwind */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* CSS Variables for fonts */
          :root {
            --font-roboto: ${roboto.style.fontFamily};
            --font-heading: 'Segoe UI', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          }
          
          /* Prevent CLS */
          html {
            scroll-behavior: smooth;
            -webkit-text-size-adjust: 100%;
          }
          
          body {
            margin: 0;
            font-family: var(--font-roboto);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Optimize rendering */
          img {
            max-width: 100%;
            height: auto;
            content-visibility: auto;
          }
          
          /* Hardware acceleration */
          .will-change-transform {
            will-change: transform;
          }
          
          /* Reduce motion for accessibility */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}} />
        
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              "name": "Unicorn Renovations",
              "description": "Dubai's premier villa renovation company",
              "url": "https://unicornrenovations.ae",
              "telephone": "+971501234567",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Al Wasl Road, Jumeirah 1",
                "addressLocality": "Dubai",
                "addressCountry": "AE"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "287"
              }
            })
          }}
        />
      </Head>

      {/* Apply font classes to body */}
      <div className={`min-h-screen bg-white ${roboto.variable}`}>
        {/* Ultra-light Header */}
        <header 
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
            scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/80 backdrop-blur-sm'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-amber-600" style={systemHeading.style}>
              Unicorn Renovations
            </a>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {['Services', 'Portfolio', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-gray-700 hover:text-amber-600 font-bold transition-colors ${roboto.className}`}
                >
                  {item}
                </a>
              ))}
              <a
                href="tel:+971501234567"
                className={`bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full font-bold transition-all ${roboto.className}`}
              >
                📞 Call Now
              </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t shadow-lg">
              <nav className="px-4 py-4 space-y-2">
                {['Services', 'Portfolio', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-gray-700 font-bold ${roboto.className}`}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* Hero Section - Optimized for LCP */}
        <section className="relative pt-32 pb-24 px-4 bg-gradient-to-br from-amber-50 via-white to-blue-50 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left space-y-6">
                <div className={`inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold ${roboto.className}`}>
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Dubai's #1 Rated Renovation Company
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-blue-900 leading-tight" style={systemHeading.style}>
                  Transform Your Villa Into a{" "}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                    Masterpiece
                  </span>
                </h1>
                
                <p className={`text-lg sm:text-xl text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0 ${roboto.className}`}>
                  Experience luxury villa renovations with <strong>15+ years expertise</strong>, <strong>800+ completed projects</strong>, and master craftsmen dedicated to exceeding expectations.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="#contact"
                    className={`bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center justify-center ${roboto.className}`}
                  >
                    Book Free Consultation
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  
                  <a
                    href="#portfolio"
                    className={`bg-white text-blue-900 font-bold py-4 px-8 rounded-full border-2 border-blue-900 hover:bg-blue-900 hover:text-white transition-all ${roboto.className}`}
                  >
                    View Portfolio
                  </a>
                </div>
                
                {/* Trust Badges */}
                <div className={`flex flex-wrap gap-6 justify-center lg:justify-start pt-4 text-sm ${roboto.className}`}>
                  <span className="flex items-center gap-2">
                    ✅ <strong>100%</strong> Licensed
                  </span>
                  <span className="flex items-center gap-2">
                    ✅ <strong>5-Year</strong> Warranty
                  </span>
                  <span className="flex items-center gap-2">
                    ✅ <strong>4.9★</strong> Rating
                  </span>
                </div>
              </div>
              
              {/* Hero Image with priority loading */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/hero2.webp"
                    alt="Luxury Villa Renovation in Dubai"
                    width={600}
                    height={450}
                    priority={true}
                    quality={85}
                    className="w-full h-auto"
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAAAwAgCdASoIAAYAAkA4JZwCdAEO/gjeAA+gAP79O7/7PYkr+8H/v3/85bgAJfUA51AAtQBOYACeAE6YAHC8AaH0AOeGUjX+4EWB/kAA"
                  />
                  <div className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg ${roboto.className}`}>
                    <span className="text-sm font-bold text-blue-900">800+ Villas Renovated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gradient-to-b from-white to-amber-50 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4" style={systemHeading.style}>
                Our Premium Services
              </h2>
              <p className={`text-lg text-gray-600 max-w-3xl mx-auto ${roboto.className}`}>
                Comprehensive villa renovation solutions tailored to your vision
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-20 bg-white px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4" style={systemHeading.style}>
                Our Proven Process
              </h2>
              <p className={`text-lg text-gray-600 max-w-3xl mx-auto ${roboto.className}`}>
                A transparent approach ensuring your villa transformation exceeds expectations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                    <span className={`text-2xl font-bold text-white ${roboto.className}`}>{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3" style={systemHeading.style}>{step.title}</h3>
                  <p className={`text-gray-600 text-sm ${roboto.className}`}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 bg-gradient-to-b from-blue-50 to-white px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4" style={systemHeading.style}>
                Our Portfolio
              </h2>
              <p className={`text-lg text-gray-600 max-w-3xl mx-auto ${roboto.className}`}>
                Exceptional villa transformations across Dubai's prestigious communities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {portfolioItems.map((project, index) => (
                <PortfolioCard key={index} {...project} />
              ))}
            </div>

            {/* Lazy Load Instagram */}
            {showInstagram && (
              <div className="max-w-5xl mx-auto">
                <h3 className="text-2xl font-bold text-blue-900 text-center mb-8" style={systemHeading.style}>
                  Follow Our Latest Projects
                </h3>
                <InstagramFeed />
              </div>
            )}
          </div>
        </section>

        {/* Testimonials - Lazy Loaded */}
        {showTestimonials && (
          <TestimonialsSection robotoFont={roboto.className} headingStyle={systemHeading.style} />
        )}

        {/* Contact Form Section */}
        <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {formState.submitted ? (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-blue-900 mb-4" style={systemHeading.style}>
                    Thank You!
                  </h3>
                  <p className={`text-gray-600 mb-8 max-w-md mx-auto ${roboto.className}`}>
                    Our renovation specialist will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormState({ submitted: false, loading: false })}
                    className={`text-amber-600 hover:text-amber-700 font-bold underline ${roboto.className}`}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-8 text-white">
                    <h2 className="text-3xl font-bold mb-2" style={systemHeading.style}>
                      Start Your Renovation Journey
                    </h2>
                    <p className={roboto.className}>
                      Get a free consultation and detailed quote
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none ${roboto.className}`}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none ${roboto.className}`}
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone *"
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none ${roboto.className}`}
                      />
                      <select
                        name="service"
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none ${roboto.className}`}
                      >
                        <option value="">Select Service *</option>
                        <option value="villa">Villa Renovation</option>
                        <option value="kitchen">Kitchen Remodeling</option>
                        <option value="bathroom">Bathroom Renovation</option>
                        <option value="extension">Villa Extension</option>
                      </select>
                    </div>
                    
                    <textarea
                      name="message"
                      placeholder="Tell us about your project *"
                      rows={4}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none ${roboto.className}`}
                    />
                    
                    <button
                      type="submit"
                      disabled={formState.loading}
                      className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-all ${
                        formState.loading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transform hover:scale-105'
                      } ${roboto.className}`}
                    >
                      {formState.loading ? 'Processing...' : 'Get Free Consultation'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* FAQ - Lazy Loaded */}
        {showFAQ && <FAQSection robotoFont={roboto.className} headingStyle={systemHeading.style} />}

        {/* Footer */}
        <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-amber-400" style={systemHeading.style}>
                  Unicorn Renovations
                </h3>
                <p className={`text-blue-200 mb-4 ${roboto.className}`}>
                  Dubai's premier villa renovation company since 2009.
                </p>
                <div className="flex gap-4">
                  {['F', 'I', 'L', 'Y'].map((letter, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 bg-blue-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors"
                      aria-label={`Social ${letter}`}
                    >
                      {letter}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4 text-amber-400" style={systemHeading.style}>Services</h4>
                <ul className={`space-y-2 text-blue-200 ${roboto.className}`}>
                  <li><a href="#" className="hover:text-amber-400 transition-colors">Villa Renovation</a></li>
                  <li><a href="#" className="hover:text-amber-400 transition-colors">Kitchen Remodeling</a></li>
                  <li><a href="#" className="hover:text-amber-400 transition-colors">Bathroom Renovation</a></li>
                  <li><a href="#" className="hover:text-amber-400 transition-colors">Smart Home</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4 text-amber-400" style={systemHeading.style}>Areas</h4>
                <ul className={`space-y-2 text-blue-200 ${roboto.className}`}>
                  <li><a href="#" className="hover:text-amber-400 transition-colors">Emirates Hills</a></li>
                  <li><a href="#" className="hover:text-amber-400 transition-colors">Palm Jumeirah</a></li>
                  <li><a href="#" className="hover:text-amber-400 transition-colors">Dubai Hills</a></li>
                  <li><a href="#" className="hover:text-amber-400 transition-colors">Downtown Dubai</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4 text-amber-400" style={systemHeading.style}>Contact</h4>
                <address className={`not-italic space-y-2 text-blue-200 ${roboto.className}`}>
                  <p>Al Wasl Road, Jumeirah 1</p>
                  <p>Dubai, UAE</p>
                  <p><a href="tel:+971501234567" className="hover:text-amber-400">+971 50 123 4567</a></p>
                  <p><a href="mailto:info@unicornrenovations.ae" className="hover:text-amber-400">info@unicornrenovations.ae</a></p>
                </address>
              </div>
            </div>
            
            <div className="border-t border-blue-800 pt-8 text-center">
              <p className={`text-sm text-blue-300 ${roboto.className}`}>
                © {new Date().getFullYear()} Unicorn Renovations LLC. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/971501234567"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 z-40"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
