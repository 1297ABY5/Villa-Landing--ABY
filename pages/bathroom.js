// pages/bathroom-renovation.js
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useCallback, memo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// Optimized Font Loading
import { Playfair_Display, Inter } from 'next/font/google';

// Luxury font combination
const playfair = Playfair_Display({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const inter = Inter({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Lazy load components
const InstagramFeed = dynamic(
  () => import('../components/InstagramFeed'),
  { 
    loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
    ssr: false 
  }
);

const TestimonialsSection = dynamic(
  () => import('../components/TestimonialsSection'),
  { 
    loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
    ssr: false,
  }
);

export default function BathroomRenovation() {
  const router = useRouter();
  const [formState, setFormState] = useState({ submitted: false, loading: false });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [urgencySlots, setUrgencySlots] = useState(3);
  const [loadInstagram, setLoadInstagram] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  // Dynamic content based on URL parameters
  const [dynamicContent, setDynamicContent] = useState({
    headline: 'Transform Your Bathroom Into a Luxury Spa',
    subheadline: 'Premium Bathroom Specialists',
    keyword: 'Bathroom Renovation',
    location: 'Dubai',
    service: 'Bathroom Renovation'
  });

  // Capture URL parameters for dynamic content
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get('keyword') || urlParams.get('utm_term') || 'Bathroom Renovation';
    if (!urlParams.get('keyword') && !urlParams.get('utm_term')) {
      window.history.replaceState({}, '', '?keyword=Bathroom+Renovation&location=Dubai');
    }
    const location = urlParams.get('loc') || urlParams.get('location') || 'Dubai';
    const service = urlParams.get('service') || urlParams.get('utm_content') || 'Bathroom Renovation';
    const campaign = urlParams.get('utm_campaign') || 'bathroom';
    const matchType = urlParams.get('matchtype') || 'broad';

    const headlineMap = {
      'exact': `#1 ${keyword} Company - ${location} Municipality Approved`,
      'phrase': `Professional ${keyword} Services in ${location}`,
      'broad': `Premium ${keyword} Services in ${location}`,
    };

    setDynamicContent({
      headline: headlineMap[matchType] || `Premium ${keyword} Services in ${location}`,
      subheadline: `${location}'s Most Trusted ${service} Company`,
      keyword,
      location,
      service
    });
    
    // Track page view with parameters
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_location: window.location.href,
        keyword: keyword,
        service: service,
        location: location,
        campaign: campaign
      });
    }
  }, [router.query]);

  // Track time on page
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
      
      // Track engagement milestones
      if (timeOnPage === 30 && window.gtag) {
        window.gtag('event', 'engagement_30s', {
          event_category: 'engagement',
          value: 30
        });
      }
      if (timeOnPage === 60 && window.gtag) {
        window.gtag('event', 'engagement_60s', {
          event_category: 'engagement',
          value: 60
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeOnPage]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = docHeight - winHeight;
      const pctScrolled = Math.floor(scrollTop / trackLength * 100);
      
      setScrolled(scrollTop > 20);
      setScrollDepth(pctScrolled);
      
      // Track scroll milestones
      if (window.gtag) {
        if (pctScrolled >= 25 && scrollDepth < 25) {
          window.gtag('event', 'scroll_25', { event_category: 'engagement' });
        }
        if (pctScrolled >= 50 && scrollDepth < 50) {
          window.gtag('event', 'scroll_50', { event_category: 'engagement' });
        }
        if (pctScrolled >= 75 && scrollDepth < 75) {
          window.gtag('event', 'scroll_75', { event_category: 'engagement' });
        }
        if (pctScrolled >= 90 && scrollDepth < 90) {
          window.gtag('event', 'scroll_90', { event_category: 'engagement' });
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDepth]);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !showExitPopup) {
        setShowExitPopup(true);
        if (window.gtag) {
          window.gtag('event', 'exit_intent_triggered', {
            event_category: 'engagement',
            time_on_page: timeOnPage
          });
        }
      }
    };
    
    // Only on desktop
    if (window.innerWidth > 768) {
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [showExitPopup, timeOnPage]);

  useEffect(() => {
    let interactions = 0;
    
    const trackEngagement = () => {
      interactions++;
      if (interactions === 3 && window.gtag) {
        window.gtag('event', 'engaged_user', {
          event_category: 'UX',
          event_label: 'quality_signal'
        });
      }
    };
    
    ['click', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, trackEngagement, { once: true, passive: true });
    });
  }, []);

  // Urgency countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const hour = new Date().getHours();
      if (hour >= 18) {
        setUrgencySlots(1); // Less slots in evening
      } else if (hour >= 12) {
        setUrgencySlots(2); // Afternoon
      } else {
        setUrgencySlots(3); // Morning
      }
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  // Defer Instagram loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadInstagram(true);
    }, 5000); // Load after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  // Load analytics after page load
  useEffect(() => {
    // Wait for page to be idle or 2 seconds max
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        loadAnalytics();
      }, { timeout: 2000 });
    } else {
      setTimeout(() => {
        loadAnalytics();
      }, 2000);
    }
    
    function loadAnalytics() {
      // Load Google Analytics
      const gtagScript = document.createElement('script');
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-612864132';
      gtagScript.async = true;
      gtagScript.defer = true;
      document.head.appendChild(gtagScript);
      
      gtagScript.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'AW-612864132');
        gtag('config', 'AW-612864132', {
          'phone_conversion_number': '+971585658002',
          'allow_enhanced_conversions': true
        });
      };
      
      // Load Facebook Pixel
      (function(f,b,e,v,n,t,s){
        if(f.fbq)return;
        n=f.fbq=function(){
          n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
        };
        if(!f._fbq)f._fbq=n;
        n.push=n;
        n.loaded=!0;
        n.version='2.0';
        n.queue=[];
        t=b.createElement(e);
        t.async=!0;
        t.defer=!0;
        t.src=v;
        s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
      })(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      
      window.fbq('init', 'YOUR_ACTUAL_PIXEL_ID'); // Replace with actual ID
      window.fbq('track', 'PageView');
    }
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setFormState({ submitted: false, loading: true });
    
    // Service-based value mapping for bathroom services
    const serviceValues = {
      'standard-bathroom': 25000,
      'master-bathroom': 35000,
      'luxury-bathroom': 50000,
      'powder-room': 15000,
      'guest-bathroom': 20000,
      'accessible-bathroom': 40000,
      'kids-bathroom': 22000
    };
    
    // Get dynamic value based on selected service
    const estimatedValue = serviceValues[formData.service] || 25000;
    
    // Create WhatsApp message with form data
    const message = `
*New Bathroom Renovation Inquiry*
------------------------
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email || 'Not provided'}
*Service:* ${formData.service}
*Estimated Value:* AED ${estimatedValue.toLocaleString()}
*Message:* ${formData.message || 'No message'}
*Time:* ${new Date().toLocaleString()}
    `.trim();
    
    // Send to your WhatsApp
    const whatsappUrl = `https://wa.me/971585658002?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new window
    window.open(whatsappUrl, '_blank');
    
    // Track the submission with DYNAMIC VALUE
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-612864132/BATHROOM_LEAD',
        'value': estimatedValue,
        'currency': 'AED',
        'transaction_id': `bathroom_lead_${Date.now()}_${formData.service}`
      });
      
      window.gtag('event', `${formData.service}_lead`, {
        'event_category': 'conversions',
        'event_label': formData.service,
        'value': estimatedValue
      });
    }
    
    setTimeout(() => {
      setFormState({ submitted: true, loading: false });
    }, 1500);
  }, [formData, dynamicContent]);

  // Track form field interactions
  const handleFormFieldFocus = (fieldName) => {
    if (window.gtag) {
      window.gtag('event', 'form_field_focus', {
        event_category: 'form',
        field_name: fieldName
      });
    }
  };

  // Bathroom-specific services
  const services = [
    { 
      image: "/standard-bathroom.webp",
      icon: "🚿",
      title: "Standard Bathroom", 
      description: "Complete bathroom renovation with quality materials and fixtures. 21-day completion guarantee.",
      link: "/bathroom-renovation/standard"
    },
    { 
      image: "/master-bathroom.webp",
      icon: "🛁",
      title: "Master Bathroom", 
      description: "Luxury master bathroom with premium fixtures, rain shower, and spa features.",
      link: "/bathroom-renovation/master"
    },
    { 
      image: "/powder-room.webp",
      icon: "🚽",
      title: "Powder Room", 
      description: "Elegant powder room makeover with designer fixtures and premium finishes.",
      link: "/bathroom-renovation/powder-room"
    },
    { 
      image: "/kids-bathroom.webp",
      icon: "🦆",
      title: "Kids Bathroom", 
      description: "Safe, fun, and functional bathroom designs perfect for children.",
      link: "/bathroom-renovation/kids"
    },
    { 
      image: "/guest-bathroom.webp",
      icon: "🏨",
      title: "Guest Bathroom", 
      description: "Welcoming guest bathroom renovation with modern fixtures and timeless design.",
      link: "/bathroom-renovation/guest"
    },
    { 
      image: "/accessible-bathroom.webp",
      icon: "♿",
      title: "Accessible Bathroom", 
      description: "ADA-compliant bathroom with safety features and accessible design.",
      link: "/bathroom-renovation/accessible"
    }
  ];

  const stats = [
    { number: "287+", label: "Bathrooms Completed", icon: "🚿" },
    { number: "21", label: "Days Average", icon: "⚡" },
    { number: "5yr", label: "Waterproofing Warranty", icon: "🛡️" },
    { number: "4.9★", label: "Google Rating", icon: "⭐" }
  ];

  return (
    <>
      <Head>
        <title>{dynamicContent.headline} | Fixed AED 25,000 | 21 Days</title>
        <meta name="description" content={`${dynamicContent.keyword} in ${dynamicContent.location}. Fixed pricing from AED 25,000. 21-day completion guarantee. 5-year waterproofing warranty. ✓ Free Consultation ✓ 287+ Bathrooms ✓ Dubai Municipality Approved`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        
        <link rel="canonical" href={`https://unicornrenovations.com/bathroom-renovation`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${dynamicContent.headline} | Unicorn Renovations`} />
        <meta property="og:description" content={`Transform your bathroom with ${dynamicContent.location}'s premier renovation company`} />
        <meta property="og:image" content="https://unicornrenovations.com/og-bathroom.jpg" />
        <meta property="og:url" content="https://unicornrenovations.com/bathroom-renovation" />
        
        {/* Enhanced Local Business Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Unicorn Renovations - Bathroom Specialists",
            "description": "${dynamicContent.keyword} services in ${dynamicContent.location}",
            "url": "https://unicornrenovations.com/bathroom-renovation",
            "telephone": "+971585658002",
            "priceRange": "AED 25,000 - AED 50,000",
            "image": "https://unicornrenovations.com/logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Regus, The Bridge Building, Sports City , Near Motor City, Dubai , UAE",
              "addressLocality": "Dubai",
              "addressCountry": "AE"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "287",
              "bestRating": "5",
              "worstRating": "1"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Bathroom Renovation Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Standard Bathroom Renovation",
                    "description": "Complete bathroom renovation AED 25,000"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Master Bathroom Renovation",
                    "description": "Luxury master bathroom AED 35,000"
                  }
                }
              ]
            }
          }
        `}} />
        
        {/* FAQ Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does a bathroom renovation take in ${dynamicContent.location}?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A complete bathroom renovation typically takes 21 days for standard bathrooms and 28 days for luxury bathrooms."
                }
              },
              {
                "@type": "Question",
                "name": "What's included in the bathroom renovation price?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our fixed price includes demolition, waterproofing, plumbing, tiling, fixtures, electrical work, and 5-year warranty."
                }
              }
            ]
          }
        `}} />
      </Head>

      <div className={`min-h-screen bg-white ${inter.variable} ${playfair.variable}`}>
        
        {/* Header - Fixed and Simplified */}
        <header 
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled 
              ? 'bg-white shadow-lg' 
              : 'bg-white/95 backdrop-blur-sm'
          }`}
        >
          {/* Main Navigation */}
          <div className="border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex justify-between items-center h-16 md:h-20">
                {/* Logo */}
                <div className="flex items-center">
                  <a 
                    href="https://www.unicornrenovations.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${playfair.className}`}
                  >
                    <div className="text-2xl md:text-3xl font-black text-gray-900">
                      UNICORN<span className="text-amber-600">.</span>
                    </div>
                    <div className={`text-[10px] md:text-xs tracking-widest uppercase ${inter.className} text-gray-600`}>
                      Bathroom Specialists
                    </div>
                  </a>
                </div>
                
                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
                  {['Services', 'Portfolio', 'Process', 'Reviews', 'Contact'].map((item) => (
                    <a 
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className={`font-medium text-gray-700 hover:text-amber-600 transition-colors ${inter.className}`}
                    >
                      {item}
                    </a>
                  ))}
                  
                  <a 
                    href="tel:+971585658002"
                    className={`px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-all ${inter.className}`}
                  >
                    Get Free Quote
                  </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-3 -mr-2"
                  aria-label="Menu"
                >
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Trust Bar - Only on Desktop */}
          <div className="hidden md:block bg-gray-50 py-2 border-b">
            <div className="max-w-7xl mx-auto px-6 flex justify-center items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className={`text-gray-700 ${inter.className}`}>Dubai Municipality Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className={`text-gray-700 ${inter.className}`}>5-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">★★★★★</span>
                <span className={`text-gray-700 ${inter.className}`}>4.9/5 (287 Reviews)</span>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-white z-[60]">
            <div className="flex justify-between items-center p-4 border-b bg-white">
              <div className={`text-2xl font-black ${playfair.className}`}>
                UNICORN<span className="text-amber-600">.</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 -mr-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col p-6 space-y-4">
              {['Services', 'Portfolio', 'Process', 'Reviews', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg py-3 px-4 text-gray-900 hover:bg-amber-50 rounded-lg transition-colors ${inter.className}`}
                >
                  {item}
                </a>
              ))}
              <div className="pt-6 space-y-3 border-t mt-6">
                <a 
                  href="tel:+971585658002"
                  className={`block w-full px-6 py-4 bg-amber-600 text-white text-center text-lg font-semibold rounded-lg ${inter.className}`}
                >
                  📞 Call Now: +971 58 565 8002
                </a>
                
                <a 
                  href="https://wa.me/971585658002"
                  className={`block w-full px-6 py-4 bg-green-500 text-white text-center text-lg font-semibold rounded-lg ${inter.className}`}
                >
                  💬 WhatsApp Chat
                </a>
              </div>
            </nav>
          </div>
        )}

        {/* Spacer for fixed header */}
        <div className="h-16 md:h-28"></div>

        {/* Urgency Banner - Sticky Below Header */}
        <div className="sticky top-16 md:top-28 bg-red-600 text-white py-2 md:py-3 z-40">
          <div className="container mx-auto px-4">
            <p className={`text-center text-sm md:text-base ${inter.className}`}>
              ⚡ Limited Time: <strong>Free Waterproofing Upgrade</strong> (Worth AED 5,000) • Only {urgencySlots} Slots Today • 
              <a href="#contact" className="underline font-bold ml-2">Book Now →</a>
            </p>
          </div>
        </div>
        
        {/* Hero Section */}
        <section
          className="relative flex items-center min-h-screen py-20 md:py-0"
          aria-labelledby="hero-heading"
        >
          <Image
            src="/bathroom-hero-mobile.webp"
            alt="Modern bathroom"
            fill
            sizes="(max-width: 768px) 100vw, 1px"
            className="md:hidden object-cover"
            priority
            quality={70}
          />
          <Image
            src="/bathroom-hero.avif"
            alt="Luxurious bathroom"
            fill
            sizes="(min-width: 769px) 100vw, 1px"
            className="hidden md:block object-cover"
            priority={false}
            quality={70}
          />
          <div className="absolute inset-0 bg-black/40 z-0" aria-hidden="true" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 text-white">
            <div className="text-center">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mb-4 md:mb-6">
                <span className={`text-amber-400 text-[10px] md:text-sm tracking-wider uppercase font-semibold ${inter.className}`}>
                  {dynamicContent.location}'s #1 Bathroom Renovation Company
                </span>
              </div>
              
              <h1
                id="hero-heading"
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 leading-tight ${playfair.className}`}
              >
                {dynamicContent.headline}
              </h1>
              
              <div className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-8 ${playfair.className}`}>
                <span className="gradient-text">Fixed Price from AED 25,000</span>
              </div>
              
              <p className={`text-base md:text-xl text-gray-100 max-w-3xl mx-auto mb-6 md:mb-8 leading-normal md:leading-relaxed ${inter.className}`}>
                Transform your bathroom in just 21 days with our expert team. 5-year waterproofing warranty included.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#quick-quote"
                  className={`px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white text-base md:text-lg font-bold rounded-lg shadow-xl transition-all transform hover:scale-105 ${inter.className}`}
                >
                  Get Free Quote →
                </a>
                
                <a 
                  href="tel:+971585658002"
                  className={`px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 text-base md:text-lg font-bold rounded-lg transition-all ${inter.className}`}
                >
                  📞 Speak to an Expert
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto text-white">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-center">
                      <p className={`font-bold text-lg md:text-xl ${inter.className}`}>287+</p>
                      <p className={`text-xs md:text-sm opacity-80 ${inter.className}`}>Bathrooms Done</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-center">
                      <p className={`font-bold text-lg md:text-xl ${inter.className}`}>21</p>
                      <p className={`text-xs md:text-sm opacity-80 ${inter.className}`}>Days Average</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-center">
                      <p className={`font-bold text-lg md:text-xl ${inter.className}`}>5yr</p>
                      <p className={`text-xs md:text-sm opacity-80 ${inter.className}`}>Warranty</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-center">
                      <p className={`font-bold text-lg md:text-xl ${inter.className}`}>100%</p>
                      <p className={`text-xs md:text-sm opacity-80 ${inter.className}`}>Waterproof</p>
                  </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Bathroom Pricing Packages */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-5xl font-bold text-gray-900 mb-4 ${playfair.className}`}>
                Fixed Bathroom Renovation Packages
              </h2>
              <p className={`text-lg text-gray-600 ${inter.className}`}>
                No hidden costs • All-inclusive pricing • 5-year warranty
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className={`text-2xl font-bold mb-4 ${playfair.className}`}>Standard Bathroom</h3>
                <div className="text-4xl font-bold text-amber-600 mb-2">AED 25,000</div>
                <p className="text-gray-600 mb-6">4-6m² • 21 Days</p>
                <ul className="space-y-2 mb-6">
                  <li>✓ Italian ceramic tiles</li>
                  <li>✓ Grohe fixtures</li>
                  <li>✓ LED mirror</li>
                  <li>✓ Waterproofing warranty</li>
                </ul>
                <a href="#quick-quote" className="block w-full py-3 bg-gray-100 text-center rounded-lg font-bold">
                  Select Package
                </a>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-xl ring-2 ring-amber-600 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-4 py-1 rounded-full text-sm">
                  MOST POPULAR
                </span>
                <h3 className={`text-2xl font-bold mb-4 ${playfair.className}`}>Master Bathroom</h3>
                <div className="text-4xl font-bold text-amber-600 mb-2">AED 35,000</div>
                <p className="text-gray-600 mb-6">6-10m² • 21 Days</p>
                <ul className="space-y-2 mb-6">
                  <li>✓ Premium porcelain tiles</li>
                  <li>✓ Kohler fixtures</li>
                  <li>✓ Rain shower system</li>
                  <li>✓ Heated towel rack</li>
                </ul>
                <a href="#quick-quote" className="block w-full py-3 bg-amber-600 text-white text-center rounded-lg font-bold">
                  Select Package
                </a>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className={`text-2xl font-bold mb-4 ${playfair.className}`}>Luxury Spa</h3>
                <div className="text-4xl font-bold text-amber-600 mb-2">AED 50,000+</div>
                <p className="text-gray-600 mb-6">10m²+ • 28 Days</p>
                <ul className="space-y-2 mb-6">
                  <li>✓ Marble/Natural stone</li>
                  <li>✓ Villeroy & Boch fixtures</li>
                  <li>✓ Japanese toilet</li>
                  <li>✓ Steam shower</li>
                </ul>
                <a href="#quick-quote" className="block w-full py-3 bg-gray-100 text-center rounded-lg font-bold">
                  Select Package
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Google Reviews Section */}
        <section id="reviews" className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-8 md:mb-12">
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 ${playfair.className}`}>
                287+ Bathroom Transformations
              </h2>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-4">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className={`text-base md:text-lg font-bold text-gray-900 ${inter.className}`}>
                  4.9/5 Based on 287 Google Reviews
                </span>
              </div>
            </div>
            
            {/* Review Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  name: "Fatima Al Rashid",
                  location: "Palm Jumeirah",
                  text: "My master bathroom looks like a 5-star hotel spa! Completed in exactly 21 days as promised.",
                  rating: 5,
                  date: "2 weeks ago"
                },
                {
                  name: "James Mitchell",
                  location: "Dubai Marina",
                  text: "The waterproofing warranty gave me peace of mind. 2 years later, still perfect!",
                  rating: 5,
                  date: "1 month ago"
                },
                {
                  name: "Aisha Patel",
                  location: "Arabian Ranches",
                  text: "They handled everything including DEWA approvals. Stress-free bathroom renovation!",
                  rating: 5,
                  date: "3 weeks ago"
                }
              ].map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                  <div className="flex mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className={`text-gray-700 mb-4 text-sm md:text-base ${inter.className}`}>
                    "{review.text}"
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className={`font-bold text-gray-900 ${inter.className}`}>{review.name}</p>
                      <p className={`text-sm text-gray-600 ${inter.className}`}>{review.location}</p>
                    </div>
                    <span className={`text-xs text-gray-500 ${inter.className}`}>{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <a 
                href="https://www.google.com/search?q=unicorn+renovations+bathroom+dubai"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-6 py-3 bg-white border-2 border-gray-300 hover:border-amber-600 rounded-lg text-gray-700 hover:text-amber-600 font-semibold transition-all ${inter.className}`}
              >
                View All Google Reviews
              </a>
            </div>
          </div>
        </section>

        {/* Services Section - Bathroom Specific */}
        <section id="services" className="py-12 md:py-20 px-4 md:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <p className={`text-amber-600 text-xs md:text-sm tracking-[0.2em] uppercase mb-3 font-semibold ${inter.className}`}>
                Our Expertise
              </p>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfair.className}`}>
                Bathroom Renovation Services
              </h2>
              <p className={`text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto ${inter.className}`}>
                Complete bathroom solutions with fixed pricing, 21-day completion, and 5-year warranty.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {services.map((service, index) => (
                <a 
                  key={index}
                  href={service.link}
                  className="group bg-white rounded-xl border-2 border-gray-200 hover:border-amber-600 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <div className="h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
                      <span className="text-6xl">{service.icon}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <h3 className={`text-lg md:text-xl font-bold text-gray-900 mb-3 ${playfair.className}`}>
                      {service.title}
                    </h3>
                    <p className={`text-sm md:text-base text-gray-600 leading-relaxed mb-4 ${inter.className}`}>
                      {service.description}
                    </p>
                    <div className={`text-amber-600 font-semibold text-sm inline-flex items-center ${inter.className}`}>
                      Learn More 
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Quote Form */}
        <section id="quick-quote" className="py-12 md:py-20 bg-amber-50">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 md:p-8 text-white">
                <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${playfair.className}`}>
                  Get Your Bathroom Quote in 60 Seconds
                </h3>
                <p className={`text-white/90 ${inter.className}`}>
                  Fixed pricing • No obligations • Only {urgencySlots} slots left today
                </p>
              </div>
              
              <div className="p-6 md:p-8">
                {formState.submitted ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className={`text-2xl font-bold text-gray-900 mb-4 ${playfair.className}`}>
                      Thank You!
                    </h4>
                    <p className={`text-gray-600 mb-6 ${inter.className}`}>
                      We'll call you within 30 minutes with your bathroom renovation quote.
                    </p>
                    <button
                      onClick={() => setFormState({ submitted: false, loading: false })}
                      className={`text-amber-600 hover:text-amber-700 font-semibold ${inter.className}`}
                    >
                      Submit Another Request →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-semibold text-gray-700 mb-1 ${inter.className}`}>
                          Your Name *
                        </label>
                        <input
                          type="text"
                          placeholder="John Smith"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base ${inter.className}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-semibold text-gray-700 mb-1 ${inter.className}`}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="+971 58 565 8002"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base ${inter.className}`}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-semibold text-gray-700 mb-1 ${inter.className}`}>
                        Bathroom Type *
                      </label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base ${inter.className}`}
                      >
                        <option value="">Select Bathroom Type</option>
                        <option value="standard-bathroom">Standard Bathroom (AED 25,000)</option>
                        <option value="master-bathroom">Master Bathroom (AED 35,000)</option>
                        <option value="luxury-bathroom">Luxury Spa Bathroom (AED 50,000+)</option>
                        <option value="powder-room">Powder Room (AED 15,000)</option>
                        <option value="guest-bathroom">Guest Bathroom (AED 20,000)</option>
                        <option value="kids-bathroom">Kids Bathroom (AED 22,000)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-semibold text-gray-700 mb-1 ${inter.className}`}>
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base ${inter.className}`}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={formState.loading}
                      className={`w-full py-4 bg-amber-600 hover:bg-amber-700 text-white text-lg font-bold rounded-lg shadow-lg transition-all ${inter.className} ${
                        formState.loading ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-[1.02]'
                      }`}
                    >
                      {formState.loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Getting Your Quote...
                        </span>
                      ) : (
                        'Get Instant Quote →'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl mb-3">{stat.icon}</div>
                  <p className={`text-3xl md:text-4xl font-bold text-amber-400 mb-2 ${playfair.className}`}>
                    {stat.number}
                  </p>
                  <p className={`text-sm md:text-base text-gray-300 ${inter.className}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${playfair.className}`}>
              Ready to Transform Your Bathroom?
            </h2>
            <p className={`text-lg md:text-xl mb-8 text-white/90 ${inter.className}`}>
              Join 287+ happy homeowners with stunning bathroom renovations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#quick-quote"
                className={`px-8 py-4 bg-white text-amber-600 hover:bg-gray-100 text-lg font-bold rounded-lg shadow-xl transition-all transform hover:scale-105 ${inter.className}`}
              >
                Get Free Quote Now
              </a>
              
              <a 
                href="tel:+971585658002"
                className={`px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-600 text-lg font-bold rounded-lg transition-all ${inter.className}`}
              >
                📞 +971 58 565 8002
              </a>
            </div>
            <p className={`mt-6 text-sm text-white/80 ${inter.className}`}>
              ✓ Fixed Price AED 25,000 • ✓ 21-Day Completion • ✓ 5-Year Warranty
            </p>
          </div>
        </section>

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/971585658002?text=I%20need%20a%20bathroom%20renovation%20quote"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 md:bottom-8 right-4 md:right-8 w-16 h-16 md:w-20 md:h-20 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-xl transition-all transform hover:scale-110 z-40"
        >
          <svg className="w-9 h-9 md:w-11 md:h-11 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
        
        {/* Mobile Bottom Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 z-40 shadow-2xl">
          <div className="grid grid-cols-2 h-16">
            <a 
              href="tel:+971585658002"
              className="flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors border-r border-gray-200"
            >
              <svg className="w-5 h-5 mb-1 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className={`text-xs font-bold text-gray-700 ${inter.className}`}>Call Now</span>
            </a>
            
            <a 
              href="#quick-quote"
              className="flex flex-col items-center justify-center bg-amber-600 hover:bg-amber-700 text-white transition-colors"
            >
              <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span className={`text-xs font-bold ${inter.className}`}>Get Quote</span>
            </a>
          </div>
        </div>
        
        {/* Add padding to bottom of page for mobile bar */}
        <div className="h-16 md:hidden"></div>
      </div>
    </>
  );
}
