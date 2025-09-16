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

// Service Card Component
const ServiceCard = memo(({ icon, title, description, index, link }) => (
  <a 
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative bg-white rounded-none shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden block"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    <div className="p-8">
      <div className="text-5xl mb-6 text-amber-600 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className={`text-xl font-bold text-gray-900 mb-3 ${playfair.className}`}>
        {title}
      </h3>
      <p className={`text-gray-600 leading-relaxed ${inter.className}`}>
        {description}
      </p>
    </div>
  </a>
));

ServiceCard.displayName = 'ServiceCard';

export default function Home() {
  const router = useRouter();
  const [formState, setFormState] = useState({ submitted: false, loading: false });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [urgencySlots, setUrgencySlots] = useState(3);
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

  // Enhanced form submission with conversion tracking
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setFormState({ submitted: false, loading: true });
    
    // Track form submission
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        currency: 'AED',
        value: 5000, // Estimated lead value
        form_type: 'consultation',
        service: formData.service || dynamicContent.service,
        location: dynamicContent.location
      });
      
      // Enhanced conversion tracking with user data
      window.gtag('event', 'conversion', {
        send_to: 'AW-XXXXXXXXX/XXXXXXXXX', // Replace with your conversion ID
        value: 5000,
        currency: 'AED',
        enhanced_conversions: {
          email: formData.email,
          phone: formData.phone,
          first_name: formData.name.split(' ')[0],
          last_name: formData.name.split(' ')[1] || '',
          address: {
            city: 'Dubai',
            country: 'AE'
          }
        }
      });
    }
    
    // Simulate API call
    setTimeout(() => {
      setFormState({ submitted: true, loading: false });
      
      // Track successful conversion
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          value: 5000,
          currency: 'AED',
          content_name: dynamicContent.service
        });
      }
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

  // Your brand's actual services with tracking links
  const services = [
    { 
      icon: "🏛️", 
      title: "Villa Renovation", 
      description: "Breathe new life into your villa with our expert renovation services. Full makeovers or selective upgrades.",
      link: "https://www.unicornrenovations.com/services/villa-renovations"
    },
    { 
      icon: "🏗️", 
      title: "Villa Extensions", 
      description: "Expand your living space seamlessly. Premium craftsmanship with compliance to local regulations.",
      link: "https://www.unicornrenovations.com/services/villa-extensions"
    },
    { 
      icon: "✨", 
      title: "Interior Design", 
      description: "Bespoke designs that enhance aesthetics, comfort, and reflect your unique vision.",
      link: "https://www.unicornrenovations.com/services/interior-design"
    },
    { 
      icon: "🏊", 
      title: "Swimming Pools", 
      description: "Custom pool design and construction. Create your private oasis with stunning water features.",
      link: "https://www.unicornrenovations.com/services/swimming-pool"
    },
    { 
      icon: "🏢", 
      title: "Office Fit-Out", 
      description: "Create functional, high-performance workspaces that enhance productivity.",
      link: "https://www.unicornrenovations.com/services/office-fitout"
    },
    { 
      icon: "🤖", 
      title: "Smart Home", 
      description: "Control lighting, AC, security, and entertainment from your smartphone.",
      link: "https://www.unicornrenovations.com/services/smart-home"
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
        <meta name="description" content={`${dynamicContent.keyword} in ${dynamicContent.location}. Dubai's premier renovation company with 15+ years expertise. ✓ Free Consultation ✓ 800+ Projects ✓ Dubai Municipality Approved`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://unicornrenovations.com/${dynamicContent.service.toLowerCase().replace(/\s+/g, '-')}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${dynamicContent.headline} | Unicorn Renovations`} />
        <meta property="og:description" content={`Transform your villa with ${dynamicContent.location}'s premier renovation company`} />
        <meta property="og:image" content="https://unicornrenovations.com/og-image.jpg" />
        <meta property="og:url" content="https://unicornrenovations.com" />
        
        {/* Google Ads Conversion Tracking */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-XXXXXXXXX');
          gtag('config', 'AW-XXXXXXXXX', {
            'allow_enhanced_conversions': true
          });
          
          // Facebook Pixel
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'YOUR_PIXEL_ID');
          fbq('track', 'PageView');
        `}} />
        
        {/* Enhanced Local Business Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Unicorn Renovations",
            "description": "${dynamicContent.keyword} services in ${dynamicContent.location}",
            "url": "https://unicornrenovations.com",
            "telephone": "+971501234567",
            "priceRange": "$$$$",
            "image": "https://unicornrenovations.com/logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "The Curve Building, Sheikh Zayed Road",
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
        
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --font-playfair: ${playfair.style.fontFamily};
            --font-inter: ${inter.style.fontFamily};
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #D4AF37 0%, #F4E4C1 50%, #D4AF37 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }
          
          .animate-pulse-slow {
            animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          html {
            scroll-behavior: smooth;
          }
        `}} />
      </Head>

      <div className={`min-h-screen bg-white ${inter.variable} ${playfair.variable} pb-16 md:pb-0`}>
        
        {/* Urgency Banner */}
        <div className="bg-red-600 text-white text-center py-2 text-sm md:text-base animate-pulse-slow">
          <p className={inter.className}>
            ⚡ Limited Time: Free Design Consultation • Only {urgencySlots} Slots Available Today • 
            <a href="#contact" className="underline font-bold ml-1">Book Now</a>
          </p>
        </div>

        {/* Trust Badges Bar */}
        <div className="bg-gray-50 py-3 border-b">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className={`text-gray-700 ${inter.className}`}>Dubai Municipality Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className={`text-gray-700 ${inter.className}`}>RERA Certified</span>
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

        {/* Header */}
        <header 
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
            scrolled 
              ? 'bg-white/95 backdrop-blur-md shadow-lg py-3 md:py-4' 
              : 'bg-transparent py-4 md:py-6'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <a 
                  href="https://www.unicornrenovations.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${playfair.className} ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  }`}
                  onClick={() => {
                    if (window.gtag) {
                      window.gtag('event', 'click', {
                        event_category: 'navigation',
                        event_label: 'logo_to_main_site'
                      });
                    }
                  }}
                >
                  <div className="text-xl md:text-2xl font-black">
                    UNICORN<span className="text-amber-600">.</span>
                  </div>
                  <div className={`text-[8px] md:text-xs tracking-[0.2em] uppercase ${inter.className} ${
                    scrolled ? 'text-gray-600' : 'text-white/80'
                  }`}>
                    {dynamicContent.location}'s Renovation Experts
                  </div>
                </a>
              </div>
              
              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center space-x-10">
                {['Services', 'Portfolio', 'Process', 'Reviews', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`font-medium transition-all duration-300 ${inter.className} ${
                      scrolled 
                        ? 'text-gray-700 hover:text-amber-600' 
                        : 'text-white/90 hover:text-white'
                    }`}
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
                  href="tel:+971501234567"
                  className={`px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-none font-semibold transition-all duration-300 ${inter.className}`}
                  onClick={() => {
                    if (window.gtag) {
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
                className={`lg:hidden p-2 ${scrolled ? 'text-gray-900' : 'text-white'}`}
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 bg-white z-50">
              <div className="flex justify-between items-center p-4 border-b">
                <div className={`text-xl font-black ${playfair.className}`}>
                  UNICORN<span className="text-amber-600">.</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-900"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col p-6 space-y-6">
                {['Services', 'Portfolio', 'Process', 'Reviews', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-xl text-gray-900 ${inter.className}`}
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-6 space-y-4 border-t">
                  <a
                    href="tel:+971501234567"
                    className={`block w-full px-6 py-4 bg-amber-600 text-white text-center text-lg font-semibold ${inter.className}`}
                  >
                    📞 Call Now
                  </a>
                  <a
                    href="https://wa.me/971501234567"
                    className={`block w-full px-6 py-4 bg-green-500 text-white text-center text-lg font-semibold ${inter.className}`}
                  >
                    💬 WhatsApp Us
                  </a>
                </div>
              </nav>
            </div>
          )}
        </header>

        {/* Hero Section - Dynamic Content */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900" />
            <div className="absolute inset-0 opacity-50">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            </div>
          </div>

          {/* Content - Dynamic Based on Keywords */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center text-white">
            <div className="animate-fadeInUp">
              <p className={`text-amber-400 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 md:mb-6 ${inter.className}`}>
                {dynamicContent.location}'s Most Trusted Since 2009
              </p>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 leading-tight ${playfair.className}`}>
                {dynamicContent.headline}
                <span className="block gradient-text mt-2 md:mt-4">
                  {dynamicContent.subheadline}
                </span>
              </h1>
              <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 md:mb-12 font-light leading-relaxed px-4 md:px-0 ${inter.className}`}>
                Transform your {dynamicContent.service.toLowerCase()} with our expert team. 
                800+ successful projects, 15+ years experience, and 100% client satisfaction guaranteed.
              </p>
              
              {/* Multiple CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4 md:px-0">
                <a
                  href="#contact"
                  className={`px-8 md:px-10 py-4 md:py-5 bg-amber-600 hover:bg-amber-700 text-white text-base md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${inter.className}`}
                  onClick={() => {
                    if (window.gtag) {
                      window.gtag('event', 'cta_click', {
                        event_category: 'engagement',
                        event_label: 'hero_primary_cta',
                        value: 'Get Free Quote'
                      });
                    }
                  }}
                >
                  Get Free Quote in 60 Seconds
                </a>
                <a
                  href="tel:+971501234567"
                  className={`px-8 md:px-10 py-4 md:py-5 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 text-base md:text-lg font-semibold transition-all duration-300 ${inter.className}`}
                  onClick={() => {
                    if (window.gtag) {
                      window.gtag('event', 'click_to_call', {
                        event_category: 'engagement',
                        event_label: 'hero_secondary_cta'
                      });
                    }
                  }}
                >
                  📞 Call Now: +971 50 123 4567
                </a>
              </div>
              
              {/* Social Proof */}
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className={inter.className}>Dubai Municipality Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className={inter.className}>5 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className={inter.className}>Free Consultation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Google Reviews Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${playfair.className}`}>
                Trusted by 800+ Homeowners in {dynamicContent.location}
              </h2>
              <div className="flex justify-center items-center gap-4">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className={`text-lg font-bold text-gray-900 ${inter.className}`}>
                  4.9/5 Based on 287 Google Reviews
                </span>
              </div>
            </div>
            
            {/* Review Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Ahmed Al Maktoum",
                  location: "Palm Jumeirah",
                  text: "Exceptional service! Unicorn transformed our villa beyond expectations.",
                  rating: 5,
                  date: "2 weeks ago"
                },
                {
                  name: "Sarah Williams",
                  location: "Emirates Hills",
                  text: "Professional team, on-time delivery, and stunning results. Highly recommended!",
                  rating: 5,
                  date: "1 month ago"
                },
                {
                  name: "Khalid Al Rashid",
                  location: "Dubai Hills",
                  text: "Best renovation company in Dubai. Quality work and transparent pricing.",
                  rating: 5,
                  date: "3 weeks ago"
                }
              ].map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className={`text-gray-700 mb-4 ${inter.className}`}>"{review.text}"</p>
                  <div className="flex justify-between items-center">
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
                className={`inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold ${inter.className}`}
              >
                View All Google Reviews
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 px-4 md:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <p className={`text-amber-600 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 ${inter.className}`}>
                Our Expertise
              </p>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${playfair.className}`}>
                {dynamicContent.keyword} Services in {dynamicContent.location}
              </h2>
              <p className={`text-base md:text-xl text-gray-600 max-w-3xl mx-auto ${inter.className}`}>
                Complete solutions for your {dynamicContent.service.toLowerCase()} project. 
                All services include free consultation, 3D design, and 5-year warranty.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Quick Quote Form - Above the Fold on Mobile */}
        <section className="py-16 bg-amber-50">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className={`text-2xl font-bold text-gray-900 mb-2 text-center ${playfair.className}`}>
                Get Your Free Quote in 60 Seconds
              </h3>
              <p className={`text-gray-600 text-center mb-6 ${inter.className}`}>
                No obligations • Instant pricing • {urgencySlots} slots left today
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    onFocus={() => handleFormFieldFocus('name')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none ${inter.className}`}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    onFocus={() => handleFormFieldFocus('phone')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none ${inter.className}`}
                  />
                </div>
                
                <select
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  onFocus={() => handleFormFieldFocus('service')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none ${inter.className}`}
                >
                  <option value="">Select Service</option>
                  <option value="villa-renovation">Villa Renovation</option>
                  <option value="swimming-pool">Swimming Pool</option>
                  <option value="kitchen">Kitchen Remodeling</option>
                  <option value="bathroom">Bathroom Renovation</option>
                  <option value="extension">Villa Extension</option>
                </select>
                
                <button
                  type="submit"
                  disabled={formState.loading}
                  className={`w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-all ${inter.className} ${
                    formState.loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {formState.loading ? 'Getting Your Quote...' : 'Get Instant Quote →'}
                </button>
              </form>
              
              <div className="mt-6 flex justify-center gap-8 text-sm text-gray-600">
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
                  Instant Quote
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Free Service
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <p className={`text-3xl md:text-4xl font-bold text-amber-400 mb-2 ${playfair.className}`}>
                    {stat.number}
                  </p>
                  <p className={`text-gray-400 ${inter.className}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Feed */}
        <section id="portfolio" className="py-16 md:py-24 px-4 md:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className={`text-amber-600 text-xs md:text-sm tracking-[0.2em] uppercase mb-4 ${inter.className}`}>
                Follow Our Journey
              </p>
              <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${playfair.className}`}>
                Latest {dynamicContent.keyword} Projects
              </h2>
              <a 
                href="https://instagram.com/unicornrenovations" 
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold ${inter.className}`}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
                @unicornrenovations
              </a>
            </div>

            <div className="max-w-6xl mx-auto">
              <InstagramFeed />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 md:px-6 bg-black text-white">
          <div className="max-w-7xl mx-auto text-center">
            <p className={`text-gray-400 text-sm ${inter.className}`}>
              © {new Date().getFullYear()} Unicorn Renovations. {dynamicContent.keyword} Specialists in {dynamicContent.location}.
            </p>
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

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/971501234567"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-xl transition-all transform hover:scale-110 z-40 animate-pulse-slow"
          aria-label="WhatsApp"
          onClick={() => {
            if (window.gtag) {
              window.gtag('event', 'whatsapp_click', {
                event_category: 'engagement',
                event_label: 'floating_whatsapp'
              });
            }
          }}
        >
          <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
        
        {/* Mobile Bottom Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
          <div className="grid grid-cols-2 h-16">
            <a
              href="tel:+971501234567"
              className="flex flex-col items-center justify-center text-gray-600 hover:text-amber-600 transition-colors border-r"
              onClick={() => {
                if (window.gtag) {
                  window.gtag('event', 'mobile_bottom_call', {
                    event_category: 'engagement'
                  });
                }
              }}
            >
              <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className={`text-xs font-bold ${inter.className}`}>Call Now</span>
            </a>
            <a
              href="#contact"
              className="flex flex-col items-center justify-center text-gray-600 hover:text-amber-600 transition-colors"
            >
              <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span className={`text-xs font-bold ${inter.className}`}>Get Quote</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
