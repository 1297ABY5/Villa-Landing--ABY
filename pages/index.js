// pages/index.js
import Head from 'next/head';
import { useState, useEffect, useCallback, memo, lazy, Suspense } from 'react';
import { useRouter } from 'next/router';
import { Playfair_Display, Inter } from 'next/font/google';

// Minimal font weights for performance
const playfair = Playfair_Display({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const inter = Inter({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Lazy load heavy components
const InstagramFeed = lazy(() => import('../components/InstagramFeed'));

// Optimized Service Card
const ServiceCard = memo(({ icon, title, description, link }) => (
  <a 
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-amber-600 transition-all"
  >
    <span className="text-4xl mb-4 block">{icon}</span>
    <h3 className={`text-lg font-bold mb-2 ${playfair.className}`}>{title}</h3>
    <p className={`text-sm text-gray-600 ${inter.className}`}>{description}</p>
  </a>
));

ServiceCard.displayName = 'ServiceCard';

export default function Home() {
  const router = useRouter();
  const [formState, setFormState] = useState({ submitted: false, loading: false });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);
  const [analyticsLoaded, setAnalyticsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: ''
  });
  
  const [dynamicContent, setDynamicContent] = useState({
    headline: 'Transform Your Villa Into a Masterpiece',
    subheadline: 'Lyrical Sanctuaries',
    keyword: 'Villa Renovation',
    location: 'Dubai',
    service: 'Renovation'
  });

  // Load analytics after 3 seconds or on interaction
  useEffect(() => {
    let analyticsTimer;
    
    const loadAnalytics = () => {
      if (!analyticsLoaded) {
        // Load Google Analytics
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX';
        script.async = true;
        document.head.appendChild(script);
        
        script.onload = () => {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', 'AW-XXXXXXXXX');
        };
        
        setAnalyticsLoaded(true);
      }
    };
    
    // Load on first interaction or after 3 seconds
    const handleInteraction = () => {
      clearTimeout(analyticsTimer);
      loadAnalytics();
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('click', handleInteraction);
    };
    
    document.addEventListener('scroll', handleInteraction, { once: true, passive: true });
    document.addEventListener('click', handleInteraction, { once: true });
    
    analyticsTimer = setTimeout(loadAnalytics, 3000);
    
    return () => {
      clearTimeout(analyticsTimer);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('click', handleInteraction);
    };
  }, [analyticsLoaded]);

  // URL parameters - simplified
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get('keyword') || 'Villa Renovation';
    const location = params.get('location') || 'Dubai';
    const service = params.get('service') || 'Renovation';
    
    setDynamicContent({
      headline: `Premium ${keyword} Services in ${location}`,
      subheadline: `${location}'s Most Trusted ${service} Company`,
      keyword,
      location,
      service
    });
  }, []);

  // Efficient scroll handler
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll tracking
  useEffect(() => {
    if (!analyticsLoaded) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.tracked) {
            const section = entry.target.dataset.section;
            if (window.gtag) {
              window.gtag('event', `view_${section}`, { 
                event_category: 'engagement' 
              });
            }
            entry.target.dataset.tracked = 'true';
          }
        });
      },
      { threshold: 0.25 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [analyticsLoaded]);

  // Lazy load Instagram after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowInstagram(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Exit intent - desktop only
  useEffect(() => {
    if (window.innerWidth < 768) return;
    
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !showExitPopup) {
        setShowExitPopup(true);
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [showExitPopup]);

  // Form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setFormState({ submitted: false, loading: true });
    
    // Track only if analytics loaded
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        value: 5000,
        currency: 'AED'
      });
    }
    
    setTimeout(() => {
      setFormState({ submitted: true, loading: false });
    }, 1500);
  }, []);

  const services = [
    { icon: "🏛️", title: "Villa Renovation", description: "Complete villa transformation services", link: "https://unicornrenovations.com/villa-renovation" },
    { icon: "🏗️", title: "Villa Extensions", description: "Expand your living space seamlessly", link: "https://unicornrenovations.com/villa-extensions" },
    { icon: "✨", title: "Interior Design", description: "Bespoke designs for your home", link: "https://unicornrenovations.com/interior-design" },
    { icon: "🏊", title: "Swimming Pools", description: "Custom pool design and construction", link: "https://unicornrenovations.com/swimming-pools" },
    { icon: "🏢", title: "Office Fit-Out", description: "Modern workspace solutions", link: "https://unicornrenovations.com/office-fitout" },
    { icon: "🤖", title: "Smart Home", description: "Automated living solutions", link: "https://unicornrenovations.com/smart-home" }
  ];

  const reviews = [
    { name: "Ahmed Al Maktoum", location: "Palm Jumeirah", text: "Exceptional service! Transformed our villa perfectly.", rating: 5 },
    { name: "Sarah Williams", location: "Emirates Hills", text: "Professional team, stunning results. Highly recommend!", rating: 5 },
    { name: "Khalid Al Rashid", location: "Dubai Hills", text: "Best renovation company in Dubai. Quality guaranteed.", rating: 5 }
  ];

  return (
    <>
      <Head>
        <title>{dynamicContent.headline} | Unicorn Renovations Dubai</title>
        <meta name="description" content={`${dynamicContent.keyword} in ${dynamicContent.location}. 15+ years expertise. Free Consultation. 800+ Projects.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Critical CSS inline */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root{--font-playfair:${playfair.style.fontFamily};--font-inter:${inter.style.fontFamily}}
          *{margin:0;padding:0;box-sizing:border-box}
          body{font-family:var(--font-inter);-webkit-font-smoothing:antialiased}
          .min-h-screen{min-height:100vh}
          .fixed{position:fixed}
          .relative{position:relative}
          .text-white{color:#fff}
          .bg-white{background:#fff}
          .hidden{display:none}
          @media(min-width:1024px){.lg\\:flex{display:flex}}
        `}} />
      </Head>

      <div className={`min-h-screen bg-white ${inter.variable} ${playfair.variable}`}>
        
        {/* Header */}
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'}`}>
          <div className="border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex justify-between items-center h-16 md:h-20">
                <a href="https://unicornrenovations.com" className={playfair.className}>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">
                    UNICORN<span className="text-amber-600">.</span>
                  </div>
                </a>
                
                <nav className="hidden lg:flex items-center gap-8">
                  {['Services', 'Portfolio', 'Reviews', 'Contact'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className={`text-gray-700 hover:text-amber-600 transition-colors ${inter.className}`}>
                      {item}
                    </a>
                  ))}
                  <a href="tel:+971501234567" className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg">
                    Get Free Quote
                  </a>
                </nav>

                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-3" aria-label="Menu">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-white z-[60]">
            <div className="flex justify-between items-center p-4 border-b">
              <div className={`text-2xl font-bold ${playfair.className}`}>UNICORN<span className="text-amber-600">.</span></div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-4">
              {['Services', 'Portfolio', 'Reviews', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-lg py-3 px-4 text-gray-900">
                  {item}
                </a>
              ))}
              <a href="tel:+971501234567" className="px-6 py-4 bg-amber-600 text-white text-center text-lg font-semibold rounded-lg mt-4">
                📞 Call Now: +971 50 123 4567
              </a>
            </nav>
          </div>
        )}

        <div className="h-16 md:h-20"></div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center py-20 md:py-0" data-section="hero">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900"></div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-white text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-amber-400 text-xs md:text-sm uppercase font-semibold">{dynamicContent.location}'s #1 Renovation Company</span>
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${playfair.className}`}>
              {dynamicContent.headline}
            </h1>
            
            <p className={`text-lg md:text-xl text-gray-100 max-w-3xl mx-auto mb-8 ${inter.className}`}>
              Transform your space with our expert team. <strong>800+ Projects</strong> • <strong>15+ Years</strong> • <strong>100% Satisfaction</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="px-8 py-4 bg-amber-600 text-white text-lg font-bold rounded-lg">
                Get Free Quote →
              </a>
              <a href="tel:+971501234567" className="px-8 py-4 bg-white/10 border-2 border-white text-white text-lg font-bold rounded-lg">
                📞 +971 50 123 4567
              </a>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-12 md:py-20 bg-gray-50" data-section="reviews">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${playfair.className}`}>
                Trusted by 800+ Homeowners
              </h2>
              <div className="flex justify-center items-center gap-2">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-base font-bold">4.9/5 Based on 287 Reviews</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-yellow-500 mb-3">★★★★★</div>
                  <p className="text-gray-700 mb-4">"{review.text}"</p>
                  <div>
                    <p className="font-bold">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 md:py-20 bg-white" data-section="services">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${playfair.className}`}>
                {dynamicContent.keyword} Services
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Complete solutions for your project. Free consultation, 3D design, and 5-year warranty.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <ServiceCard key={i} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-12 md:py-20 bg-amber-50" data-section="contact">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-white">
                <h3 className={`text-2xl font-bold mb-2 ${playfair.className}`}>Get Your Free Quote</h3>
                <p>No obligations • Instant pricing • Limited slots</p>
              </div>
              
              <div className="p-6">
                {formState.submitted ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className={`text-2xl font-bold mb-4 ${playfair.className}`}>Thank You!</h4>
                    <p>We'll call you within 30 minutes.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="px-4 py-3 border rounded-lg w-full"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="px-4 py-3 border rounded-lg w-full"
                      />
                    </div>
                    
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3 border rounded-lg"
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
                      className={`w-full py-4 bg-amber-600 text-white text-lg font-bold rounded-lg ${formState.loading ? 'opacity-50' : ''}`}
                    >
                      {formState.loading ? 'Sending...' : 'Get Instant Quote →'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Feed - Lazy Loaded */}
        {showInstagram && (
          <section id="portfolio" className="py-12 md:py-20 bg-white" data-section="portfolio">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${playfair.className}`}>
                  Latest Projects
                </h2>
                <a href="https://instagram.com/unicornrenovations" target="_blank" rel="noopener noreferrer" className="text-amber-600">
                  @unicornrenovations
                </a>
              </div>
              <Suspense fallback={<div className="h-96 bg-gray-50 rounded-lg animate-pulse"></div>}>
                <InstagramFeed />
              </Suspense>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-12 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className={`text-xl font-bold mb-4 text-amber-400 ${playfair.className}`}>Unicorn Renovations</h4>
                <p className="text-gray-400 text-sm">Dubai's premier renovation company since 2009.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-4 text-amber-400">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#services" className="text-gray-400 hover:text-amber-400">Services</a></li>
                  <li><a href="#portfolio" className="text-gray-400 hover:text-amber-400">Portfolio</a></li>
                  <li><a href="#reviews" className="text-gray-400 hover:text-amber-400">Reviews</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-4 text-amber-400">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Sheikh Zayed Road, Dubai</li>
                  <li><a href="tel:+971501234567" className="hover:text-amber-400">+971 50 123 4567</a></li>
                  <li><a href="mailto:info@unicornrenovations.com" className="hover:text-amber-400">info@unicornrenovations.com</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-sm text-gray-400">© 2024 Unicorn Renovations. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Exit Popup */}
        {showExitPopup && (
          <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-8 relative">
              <button onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h3 className={`text-2xl font-bold mb-4 ${playfair.className}`}>Wait! Get 15% OFF 🎁</h3>
              <p className="text-gray-600 mb-6">Plus FREE 3D design (Worth AED 5,000)</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" placeholder="Enter your email" required className="w-full px-4 py-3 border rounded-lg" />
                <button type="submit" className="w-full py-3 bg-amber-600 text-white font-bold rounded-lg">
                  Claim 15% Discount
                </button>
              </form>
            </div>
          </div>
        )}

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/971501234567"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl z-40"
          aria-label="WhatsApp"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </>
  );
}

// Add this to next.config.js
/*
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeCss: true,
  },
}
*/
