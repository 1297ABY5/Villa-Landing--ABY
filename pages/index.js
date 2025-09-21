// pages/index.js
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

// Service Card Component - REMOVED (no longer needed)

export default function Home() {
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
    headline: 'Transform Your Villa Into a Masterpiece',
    subheadline: 'Lyrical Sanctuaries',
    keyword: 'Villa Renovation',
    location: 'Dubai',
    service: 'Renovation'
  });

  // Capture URL parameters for dynamic content
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get('keyword') || urlParams.get('utm_term') || 'Villa Renovation';
    const location = urlParams.get('loc') || urlParams.get('location') || 'Dubai';
    const service = urlParams.get('service') || urlParams.get('utm_content') || 'Renovation';
    const campaign = urlParams.get('utm_campaign') || 'general';
    
    // Update dynamic content based on parameters
    setDynamicContent({
      headline: `Premium ${keyword} Services in ${location}`,
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


    
// This should be with your other useEffects, NOT inside handleSubmit
// Around line 200, BEFORE the handleSubmit function
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
  } // This closing brace was missing

}, []);
// THEN your handleSubmit function starts here (WITHOUT the useEffect inside)
const handleSubmit = useCallback(async (e) => {
  e.preventDefault();
  setFormState({ submitted: false, loading: true });
  
  // Create WhatsApp message with form data
  const message = `
*New Client Requirements*
------------------------
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email || 'Not provided'}
*Service:* ${formData.service}
*Message:* ${formData.message || 'No message'}
*Time:* ${new Date().toLocaleString()}
  `.trim();
  
  // Send to your WhatsApp
  const whatsappUrl = `https://wa.me/971585658002?text=${encodeURIComponent(message)}`;
  
  // Open WhatsApp in new window
  window.open(whatsappUrl, '_blank');
  
  // Track the submission
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-612864132/qqQcQNeM-bADEISh7qQC',
      'value': 5000,
      'currency': 'AED'
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

  // Your brand's actual services with tracking links - UPDATED WITH ICONS
  const services = [
    { 
      image: "/villa-renovation.webp",
      icon: "🏡",
      title: "Villa Renovation", 
      description: "Breathe new life into your villa with our expert renovation services. Full makeovers or selective upgrades.",
      link: "https://www.unicornrenovations.com/services/villa-renovations"
    },
    { 
      image: "/villa-extension.webp",
      icon: "🏗️",
      title: "Villa Extensions", 
      description: "Expand your living space seamlessly. Premium craftsmanship with compliance to local regulations.",
      link: "https://www.unicornrenovations.com/services/villa-renovations"
    },
    { 
      image: "/Interior-Design.webp",
      icon: "🎨",
      title: "Interior Design", 
      description: "Bespoke designs that enhance aesthetics, comfort, and reflect your unique vision.",
      link: "https://www.unicornrenovations.com/services/services-light"
    },
    { 
      image: "/swimming-pool.webp",
      icon: "🏊",
      title: "Swimming Pools", 
      description: "Custom pool design and construction. Create your private oasis with stunning water features.",
      link: "https://www.unicornrenovations.com/services/swimming-pool-installation"
    },
    { 
      image: "/office-fitout.webp",
      icon: "🏢",
      title: "Office Fit-Out", 
      description: "Create functional, high-performance workspaces that enhance productivity.",
      link: "https://www.unicornrenovations.com/services/office-commercial-fit-outs"
    },
    { 
      image: "/smart-home.webp",
      icon: "📱",
      title: "Smart Home", 
      description: "Control lighting, AC, security, and entertainment from your smartphone.",
      link: "https://www.unicornrenovations.com/services/home-automations"
    }
  ];

  const stats = [
    { number: "15+", label: "Years of Excellence", icon: "⭐" },
    { number: "800+", label: "Villas Transformed", icon: "🏡" },
    { number: "1600+", label: "Happy Families", icon: "❤️" },
    { number: "4.9★", label: "Google Rating", icon: "⭐" }
  ];

  return (
    <>
    
   <Head>
  <title>{dynamicContent.headline} | Unicorn Renovations Dubai</title>
  <link rel="preload" as="image" href="/before-after.avif" />
  <meta name="description" content={`${dynamicContent.keyword} in ${dynamicContent.location}. Dubai's premier renovation company with 15+ years expertise. ✓ Free Consultation ✓ 800+ Projects ✓ Dubai Municipality Approved`} />
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
    
  <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
  <link rel="canonical" href={`https://unicornrenovations.com/${dynamicContent.service.toLowerCase().replace(/\s+/g, '-')}`} />
  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content={`${dynamicContent.headline} | Unicorn Renovations`} />
  <meta property="og:description" content={`Transform your villa with ${dynamicContent.location}'s premier renovation company`} />
  <meta property="og:image" content="https://unicornrenovations.com/og-image.jpg" />
  <meta property="og:url" content="https://unicornrenovations.com" />
  
  {/* Your Schema markup scripts continue here... */}
              
        {/* Enhanced Local Business Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Unicorn Renovations",
            "description": "${dynamicContent.keyword} services in ${dynamicContent.location}",
            "url": "https://unicornrenovations.com",
            "telephone": "+971585658002",
            "priceRange": "$$$$",
            "image": "https://unicornrenovations.com/logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Regus, The Bridge Building, Sports City , Near Motor City, Dubai , UAE",
              "addressLocality": "Dubai",
              "addressCountry": "AE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 25.2048,
              "longitude": 55.2708
            },
            "openingHours": "Mo-Sa 09:00-18:00",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "287",
              "bestRating": "5",
              "worstRating": "1"
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Dubai"
              },
              {
                "@type": "City", 
                "name": "Abu Dhabi"
              }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Renovation Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Villa Renovation",
                    "description": "Complete villa renovation services"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Swimming Pool Construction",
                    "description": "Custom pool design and construction"
                  }
                }
              ]
            },
            "review": [
              {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "Fatima Al-Rashid"
                }
              }
            ]
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
                "name": "How long does a villa renovation take in ${dynamicContent.location}?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A complete villa renovation typically takes 3-6 months depending on the scope. Kitchen renovations take 6-8 weeks, bathroom renovations 3-4 weeks."
                }
              },
              {
                "@type": "Question",
                "name": "Do you handle permits for villa renovation in ${dynamicContent.location}?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we handle all Dubai Municipality permits, DEWA connections, and community approvals for your villa renovation project."
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
                    onClick={() => {
                      if (window.gtag) {
                        window.gtag('event', 'click', {
                          event_category: 'navigation',
                          event_label: 'logo_to_main_site'
                        });
                      }
                    }}
                  >
                    <div className="text-2xl md:text-3xl font-black text-gray-900">
                      UNICORN<span className="text-amber-600">.</span>
                    </div>
                    <div className={`text-[10px] md:text-xs tracking-widest uppercase ${inter.className} text-gray-600`}>
                      {dynamicContent.location} Renovations
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
                      onClick={() => {
                        if (window.gtag) {
                          window.gtag('event', 'navigation_click', {
                            event_category: 'navigation',
                            event_label: item.toLowerCase()
                          });
                        }
                      }}
                    >
                      {item}
                    </a>
                  ))}
                  <a
                    href="tel:+971585658002"
                    className={`px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-all ${inter.className}`}
                    onClick={() => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-612864132/qqQcQNeM-bADEISh7qQC',
        'value': 3000,
        'currency': 'AED'
      });
      window.gtag('event', 'click_to_call', {
        event_category: 'engagement',
        event_label: 'header_cta'
      });
    }
  }}
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
                <span className={`text-gray-700 ${inter.className}`}>15+ Years Experience</span>
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
              ⚡ Limited Time Offer: <strong>Free Design Consultation</strong> • Only {urgencySlots} Slots Today • 
              <a href="#contact" className="underline font-bold ml-2">Book Now →</a>
            </p>
          </div>
        </div>
        
{/* Hero Section */}
<section
  className="relative flex items-center min-h-screen py-20 md:py-0"
  aria-labelledby="hero-heading"
>
  {/* CORRECTED: Replaced <img> with optimized Next.js <Image> component for max pagespeed */}
  <Image
    src="/download.webp"
  alt="Modern villa exterior"
  fill
  sizes="(max-width: 768px) 100vw, 1px" // Only load on mobile
  className="md:hidden object-cover"
  priority
  quality={70} // Reduce from 80
  />
  <Image
  src="/before-after.avif"
  alt="Luxurious villa interior"
  fill
  sizes="(min-width: 769px) 100vw, 1px" // Only load on desktop
  className="hidden md:block object-cover"
  priority={false} // Remove priority for desktop on mobile
  quality={70} // Reduce from 80
  />
  <div className="absolute inset-0 bg-black/40 z-0" aria-hidden="true" />

  <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 text-white">
    <div className="text-center">
      <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mb-4 md:mb-6">
        <span className={`text-amber-400 text-[10px] md:text-sm tracking-wider uppercase font-semibold ${inter.className}`}>
          {dynamicContent.location}'s #1 Renovation Company
        </span>
      </div>
      
      <h1
        id="hero-heading"
        className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 leading-tight ${playfair.className}`}
      >
        {dynamicContent.headline}
      </h1>
      
      <div className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-8 ${playfair.className}`}>
        <span className="gradient-text">{dynamicContent.subheadline}</span>
      </div>
      
      {/* IMPROVED: Description is cleaner for mobile */}
      <p className={`text-base md:text-xl text-gray-100 max-w-3xl mx-auto mb-6 md:mb-8 leading-normal md:leading-relaxed ${inter.className}`}>
        Transform your {dynamicContent.service.toLowerCase()} with our expert team. We deliver unparalleled quality and design excellence.
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
onClick={() => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-612864132/qqQcQNeM-bADEISh7qQC',
        'value': 3000,
        'currency': 'AED'
      });
      window.gtag('event', 'click_to_call', {
        event_category: 'engagement',
        event_label: 'hero_call_cta'  
      });
    }
  }}
        >
          📞 Speak to an Expert
        </a>
      </div>

      {/* IMPROVED: Upgraded to a responsive "Bento Grid" for trust badges */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto text-white">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-center">
              <p className={`font-bold text-lg md:text-xl ${inter.className}`}>800+</p>
              <p className={`text-xs md:text-sm opacity-80 ${inter.className}`}>Projects Completed</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-center">
              <p className={`font-bold text-lg md:text-xl ${inter.className}`}>15+</p>
              <p className={`text-xs md:text-sm opacity-80 ${inter.className}`}>Years Experience</p>
          </div>
          <div className="col-span-2 md:col-span-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-center">
              <p className={`font-bold text-lg md:text-xl ${inter.className}`}>100%</p>
              <p className={`text-xs md:text-sm opacity-80 ${inter.className}`}>Client Satisfaction</p>
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
        {/* Google Reviews Section - Mobile Optimized */}
        <section id="reviews" className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-8 md:mb-12">
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 ${playfair.className}`}>
                Trusted by 800+ Homeowners
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
            
            {/* Review Cards - Mobile Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  name: "Ahmed Al Balooshi",
                  location: "Palm Jumeirah",
                  text: "Exceptional service! Unicorn transformed our villa beyond expectations. The team was professional and delivered on time.",
                  rating: 5,
                  date: "2 weeks ago"
                },
                {
                  name: "Sarah Williams",
                  location: "Emirates Hills",
                  text: "Professional team, on-time delivery, and stunning results. They renovated our entire villa and we couldn't be happier!",
                  rating: 5,
                  date: "1 month ago"
                },
                {
                  name: "Aman Atwal",
                  location: "Dubai Hills",
                  text: "Best renovation company in Dubai. Quality work, transparent pricing, and excellent communication throughout the project.",
                  rating: 5,
                  date: "3 weeks ago"
                }
              ].map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
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
                href="https://www.google.com/search?q=unicorn+renovations+dubai"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-6 py-3 bg-white border-2 border-gray-300 hover:border-amber-600 rounded-lg text-gray-700 hover:text-amber-600 font-semibold transition-all ${inter.className}`}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                View All Google Reviews
              </a>
            </div>
          </div>
        </section>
{/* Keyword-Specific Content Block - Place this around line 850 */}
{dynamicContent.keyword.toLowerCase().includes('pool') && (
  <section className="py-12 bg-blue-50">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className={`text-3xl font-bold mb-4 ${playfair.className}`}>
        Swimming Pool Construction in {dynamicContent.location}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold mb-2">Our Pool Services Include:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Custom pool design</li>
            <li>✓ Municipality permits handled</li>
            <li>✓ 5-year waterproofing warranty</li>
            <li>✓ Smart pool automation</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Pool Construction Timeline:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>Week 1-2: Design & Permits</li>
            <li>Week 3-6: Excavation & Structure</li>
            <li>Week 7-8: Finishing & Testing</li>
            <li>Week 9: Handover</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
)}

{dynamicContent.keyword.toLowerCase().includes('kitchen') && (
  <section className="py-12 bg-amber-50">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className={`text-3xl font-bold mb-4 ${playfair.className}`}>
        Kitchen Renovation in {dynamicContent.location}
      </h2>
      <p className="mb-6">Transform your kitchen with German appliances, Italian marble, and smart storage solutions.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-3xl font-bold text-amber-600">6-8</p>
          <p className="text-sm">Weeks Timeline</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-amber-600">5</p>
          <p className="text-sm">Year Warranty</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-amber-600">100%</p>
          <p className="text-sm">Custom Design</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-amber-600">Free</p>
          <p className="text-sm">3D Design</p>
        </div>
      </div>
    </div>
  </section>
)}
        {/* Services Section - Mobile Optimized WITH IMAGES FIXED */}
        <section id="services" className="py-12 md:py-20 px-4 md:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <p className={`text-amber-600 text-xs md:text-sm tracking-[0.2em] uppercase mb-3 font-semibold ${inter.className}`}>
                Our Expertise
              </p>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfair.className}`}>
                {dynamicContent.keyword} Services
              </h2>
              <p className={`text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto ${inter.className}`}>
                Complete solutions for your {dynamicContent.service.toLowerCase()} project. 
                All services include free consultation, 3D design, and 5-year warranty.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {services.map((service, index) => (
                <a
                  key={index}
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-xl border-2 border-gray-200 hover:border-amber-600 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  onClick={() => {
                    if (window.gtag) {
                      window.gtag('event', 'service_click', {
                        event_category: 'engagement',
                        event_label: service.title
                      });
                    }
                  }}
                >
                  {/* Image Section */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    {service.image ? (
                      <Image
                        src={service.image}
  alt={service.title}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" // Max 400px
  loading="lazy"
  quality={60} // Reduce quality
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      // Fallback to icon if image doesn't load
                      <div className="h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
                        <span className="text-6xl">{service.icon}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content Section */}
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
            
            {/* CTA Button */}
            <div className="text-center mt-10 md:mt-12">
              <a
                href="https://www.unicornrenovations.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white text-base md:text-lg font-bold rounded-lg shadow-lg transition-all transform hover:scale-105 ${inter.className}`}
              >
                View All Services
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
{/* Location-Specific Trust Block - Add around line 970 */}
{dynamicContent.location && (
  <section className="py-8 bg-gray-100">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h3 className={`text-2xl font-bold mb-4 ${playfair.className}`}>
        Why Choose Us for {dynamicContent.keyword} in {dynamicContent.location}?
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg">
          <p className="font-bold">Local Expertise</p>
          <p className="text-sm text-gray-600">
            {dynamicContent.location === 'Dubai' && '15+ years serving Dubai communities'}
            {dynamicContent.location === 'Abu Dhabi' && 'Licensed in Abu Dhabi Municipality'}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <p className="font-bold">Municipality Approved</p>
          <p className="text-sm text-gray-600">All permits and approvals handled</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <p className="font-bold">Same-Day Quote</p>
          <p className="text-sm text-gray-600">Get instant pricing for {dynamicContent.service}</p>
        </div>
      </div>
    </div>
  </section>
)}
        {/* Quick Quote Form - Mobile Optimized */}
        <section id="quick-quote" className="py-12 md:py-20 bg-amber-50">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 md:p-8 text-white">
                <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${playfair.className}`}>
                  Get Your Free Quote in 60 Seconds
                </h3>
                <p className={`text-white/90 ${inter.className}`}>
                  No obligations • Instant pricing • Only {urgencySlots} slots left today
                </p>
              </div>
              
              {/* Form Body */}
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
                      We'll call you within 30 minutes with your personalized quote.
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
                          onFocus={() => {
                          handleFormFieldFocus('name');
    // ADD THIS:
    if (window.gtag && !window.formStarted) {
      window.gtag('event', 'begin_checkout', {
        'value': 1000,
        'currency': 'AED'
      });
      window.formStarted = true;
    }
  }}
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
                          onFocus={() => handleFormFieldFocus('phone')}
                          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base ${inter.className}`}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-semibold text-gray-700 mb-1 ${inter.className}`}>
                        Service Required *
                      </label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        onFocus={() => handleFormFieldFocus('service')}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base ${inter.className}`}
                      >
                        <option value="">Select Service</option>
                        <option value="villa-renovation">Complete Villa Renovation</option>
                        <option value="swimming-pool">Swimming Pool Construction</option>
                        <option value="kitchen">Kitchen Remodeling</option>
                        <option value="bathroom">Bathroom Renovation</option>
                        <option value="extension">Villa Extension</option>
                        <option value="interior">Interior Design</option>
                        <option value="smart-home">Smart Home Automation</option>
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
                        onFocus={() => handleFormFieldFocus('email')}
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
                
                {/* Trust Indicators */}
                {!formState.submitted && (
                  <div className="mt-6 pt-6 border-t flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      No Spam
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      100% Free
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Instant Response
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Mobile Optimized */}
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
{/* Dynamic FAQ for Specific Keywords */}
<section className="py-12 bg-white">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className={`text-3xl font-bold mb-8 text-center ${playfair.className}`}>
      Common Questions About {dynamicContent.keyword} in {dynamicContent.location}
    </h2>
    
    {dynamicContent.keyword.toLowerCase().includes('pool') && (
      <div className="space-y-4">
        <details className="bg-gray-50 p-4 rounded-lg">
          <summary className="font-bold cursor-pointer">How much does a swimming pool cost in {dynamicContent.location}?</summary>
          <p className="mt-2 text-gray-600">Swimming pools in {dynamicContent.location} typically range from AED 150,000 to AED 500,000 depending on size, features, and finishes.</p>
        </details>
        <details className="bg-gray-50 p-4 rounded-lg">
          <summary className="font-bold cursor-pointer">Do I need permits for a pool in {dynamicContent.location}?</summary>
          <p className="mt-2 text-gray-600">Yes, Dubai Municipality requires permits. We handle all approvals as part of our service.</p>
        </details>
      </div>
    )}
    
    {dynamicContent.keyword.toLowerCase().includes('kitchen') && (
      <div className="space-y-4">
        <details className="bg-gray-50 p-4 rounded-lg">
          <summary className="font-bold cursor-pointer">How long does kitchen renovation take?</summary>
          <p className="mt-2 text-gray-600">A complete kitchen renovation in {dynamicContent.location} typically takes 6-8 weeks from design to completion.</p>
        </details>
        <details className="bg-gray-50 p-4 rounded-lg">
          <summary className="font-bold cursor-pointer">Can I use my kitchen during renovation?</summary>
          <p className="mt-2 text-gray-600">We can set up a temporary kitchen area to minimize disruption during your renovation.</p>
        </details>
      </div>
    )}
  </div>
</section>
        {/* Instagram Feed - Mobile Optimized */}
        <section id="portfolio" className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-8 md:mb-12">
              <p className={`text-amber-600 text-xs md:text-sm tracking-[0.2em] uppercase mb-3 font-semibold ${inter.className}`}>
                Follow Our Journey
              </p>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 ${playfair.className}`}>
                Latest {dynamicContent.keyword} Projects
              </h2>
              <p className={`text-base md:text-lg text-gray-600 mb-6 ${inter.className}`}>
                See our villa transformations from across Dubai
              </p>
              <a 
                href="https://instagram.com/unicornrenovations" 
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold text-base ${inter.className}`}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
                @unicornrenovations
              </a>
            </div>

            {/* Instagram Widget Container */}
            <div className="max-w-6xl mx-auto bg-gray-50 rounded-xl p-4 md:p-8">
              {loadInstagram ? (
  <InstagramFeed />
) : (
  <div className="h-96 bg-gray-50 animate-pulse rounded-lg flex items-center justify-center">
    <p className="text-gray-400">Loading Instagram feed...</p>
  </div>
)}
            </div>
            
            {/* Portfolio Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 md:mt-16 pt-10 md:pt-16 border-t border-gray-200">
              <div className="text-center">
                <p className={`text-2xl md:text-3xl font-bold text-amber-600 mb-1 ${playfair.className}`}>800+</p>
                <p className={`text-sm md:text-base text-gray-600 ${inter.className}`}>Villas</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl md:text-3xl font-bold text-amber-600 mb-1 ${playfair.className}`}>1600+</p>
                <p className={`text-sm md:text-base text-gray-600 ${inter.className}`}>Bathrooms</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl md:text-3xl font-bold text-amber-600 mb-1 ${playfair.className}`}>800+</p>
                <p className={`text-sm md:text-base text-gray-600 ${inter.className}`}>Kitchens</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl md:text-3xl font-bold text-amber-600 mb-1 ${playfair.className}`}>100%</p>
                <p className={`text-sm md:text-base text-gray-600 ${inter.className}`}>Happy Clients</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section - Mobile Optimized */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${playfair.className}`}>
              Ready to Transform Your Villa?
            </h2>
            <p className={`text-lg md:text-xl mb-8 text-white/90 ${inter.className}`}>
              Join 800+ happy homeowners who trusted us with their dream renovation
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
              ✓ Free Consultation • ✓ No Obligations • ✓ Instant Quote
            </p>
          </div>
        </section>

        {/* Footer - Mobile Optimized */}
        <footer className="py-12 md:py-16 px-4 md:px-6 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className={`text-xl font-bold mb-4 text-amber-400 ${playfair.className}`}>
                  Unicorn Renovations
                </h4>
                <p className={`text-gray-400 text-sm mb-4 ${inter.className}`}>
                  Dubai's premier {dynamicContent.keyword.toLowerCase()} company. 
                  Transforming homes into masterpieces since 2009.
                </p>
                <div className="flex gap-4">
                  <a href="https://instagram.com/unicornrenovations" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                    </svg>
                  </a>
                  <a href="https://facebook.com/unicornrenovations" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className={`text-lg font-bold mb-4 text-amber-400 ${inter.className}`}>Quick Links</h4>
                <ul className={`space-y-2 text-sm ${inter.className}`}>
                  <li><a href="https://www.unicornrenovations.com" className="text-gray-400 hover:text-amber-400">Main Website</a></li>
                  <li><a href="#services" className="text-gray-400 hover:text-amber-400">Our Services</a></li>
                  <li><a href="#portfolio" className="text-gray-400 hover:text-amber-400">Portfolio</a></li>
                  <li><a href="#reviews" className="text-gray-400 hover:text-amber-400">Reviews</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className={`text-lg font-bold mb-4 text-amber-400 ${inter.className}`}>Contact Info</h4>
                <ul className={`space-y-3 text-sm text-gray-400 ${inter.className}`}>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Regus, The Bridge Building, Sports City , Near Motor City, Dubai , UAE, Dubai
                  </li>
                  <li>
                    <a href="tel:+971585658002" className="hover:text-amber-400 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      +971 58 565 8002
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@unicornrenovations.com" className="hover:text-amber-400 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      info@unicornrenovations.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8 mt-8">
              <p className={`text-center text-xs md:text-sm text-gray-400 ${inter.className}`}>
                © {new Date().getFullYear()} Unicorn Renovations. All rights reserved. 
                {dynamicContent.keyword} Specialists in {dynamicContent.location}.
              </p>
            </div>
          </div>
        </footer>

        {/* Exit Intent Popup */}
        {showExitPopup && (
          <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-8 relative">
              <button
                onClick={() => setShowExitPopup(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${playfair.className}`}>
                Wait! Don't Miss Out 🎁
              </h3>
              <p className={`text-gray-600 mb-6 ${inter.className}`}>
                Get <strong>15% OFF</strong> your {dynamicContent.service.toLowerCase()} project + FREE 3D design 
                (Worth AED 5,000)
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none ${inter.className}`}
                />
                <button
                  type="submit"
                  className={`w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-all ${inter.className}`}
                  onClick={() => {
                    if (window.gtag) {
                      window.gtag('event', 'exit_popup_conversion', {
                        event_category: 'conversion',
                        event_label: 'exit_intent_offer'
                      });
                    }
                  }}
                >
                  Claim 15% Discount Now
                </button>
              </form>
              
              <p className={`text-xs text-gray-500 mt-4 text-center ${inter.className}`}>
                Limited time offer • No credit card required
              </p>
            </div>
          </div>
        )}

        {/* WhatsApp Button - Better Mobile Position */}
        <a
          href="https://wa.me/971585658002"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 md:bottom-8 right-4 md:right-8 w-16 h-16 md:w-20 md:h-20 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-xl transition-all transform hover:scale-110 z-40 pulse-animation"
  aria-label="WhatsApp Chat"
          onClick={() => {
            if (window.gtag) {
              window.gtag('event', 'whatsapp_click', {
                event_category: 'engagement',
                event_label: 'floating_whatsapp'
              });
            }
          }}
        >
          <svg className="w-9 h-9 md:w-11 md:h-11 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
        
        {/* Mobile Bottom Bar - Fixed Height and Better Design */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 z-40 shadow-2xl">
          <div className="grid grid-cols-2 h-16">
            <a
              href="tel:+971585658002"
              className="flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors border-r border-gray-200"
              onClick={() => {
                if (window.gtag) {
                  window.gtag('event', 'mobile_bottom_call', {
                    event_category: 'engagement'
                  });
                }
              }}
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
