// pages/bathroom-renovation.js
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const inter = Inter({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function BathroomRenovation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bathroomType: '',
    timeline: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll for header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load analytics after page load
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadAnalytics(), { timeout: 2000 });
    } else {
      setTimeout(loadAnalytics, 2000);
    }
    
    function loadAnalytics() {
      const gtagScript = document.createElement('script');
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-612864132';
      gtagScript.async = true;
      document.head.appendChild(gtagScript);
      
      gtagScript.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'AW-612864132');
      };
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const value = formData.bathroomType === 'master' ? 35000 : 
                 formData.bathroomType === 'luxury' ? 50000 : 25000;
    
    // WhatsApp message
    const message = `
*Bathroom Renovation Quote Request*
------------------------
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Type:* ${formData.bathroomType}
*Timeline:* ${formData.timeline}
*Estimated Value:* AED ${value.toLocaleString()}
    `.trim();
    
    const whatsappUrl = `https://wa.me/971585658002?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-612864132/BATHROOM_LEAD',
        'value': value,
        'currency': 'AED'
      });
    }
    
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  }, [formData]);

  const bathroomPackages = [
    {
      title: "Standard Bathroom",
      price: "25,000",
      timeline: "21 Days",
      size: "4-6m²",
      features: [
        "Italian ceramic tiles",
        "Grohe fixtures",
        "LED mirror",
        "Waterproofing warranty",
        "Full demolition & disposal"
      ],
      popular: false
    },
    {
      title: "Master Bathroom",
      price: "35,000",
      timeline: "21 Days",
      size: "6-10m²",
      features: [
        "Premium porcelain tiles",
        "Kohler fixtures",
        "Rain shower system",
        "Heated towel rack",
        "Smart lighting"
      ],
      popular: true
    },
    {
      title: "Luxury Spa Bathroom",
      price: "50,000+",
      timeline: "28 Days",
      size: "10m²+",
      features: [
        "Marble/Natural stone",
        "Villeroy & Boch fixtures",
        "Japanese toilet",
        "Steam shower",
        "Custom vanity"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Fatima Al Rashid",
      location: "Palm Jumeirah",
      text: "My master bathroom looks like a 5-star hotel spa! Completed in exactly 21 days as promised.",
      rating: 5,
      type: "Master Bathroom"
    },
    {
      name: "James Mitchell",
      location: "Dubai Marina",
      text: "The waterproofing warranty gave me peace of mind. 2 years later, still perfect!",
      rating: 5,
      type: "Standard Bathroom"
    },
    {
      name: "Aisha Patel",
      location: "Arabian Ranches",
      text: "They handled everything including DEWA approvals. Stress-free renovation!",
      rating: 5,
      type: "Luxury Bathroom"
    }
  ];

  const bathroomProcess = [
    { day: "Day 1-3", title: "Design & Planning", description: "3D design, material selection, permits" },
    { day: "Day 4-7", title: "Demolition", description: "Safe removal, waste disposal, prep work" },
    { day: "Day 8-14", title: "Plumbing & Waterproofing", description: "New pipes, 5-layer waterproofing" },
    { day: "Day 15-18", title: "Tiling & Fixtures", description: "Premium installation, grouting" },
    { day: "Day 19-21", title: "Finishing & Handover", description: "Cleaning, testing, warranty docs" }
  ];

  return (
    <>
      <Head>
        <title>Bathroom Renovation Dubai - Fixed AED 25,000 | 21-Day Completion | 5-Year Warranty</title>
        <meta name="description" content="Bathroom renovation Dubai from AED 25,000. 21-day completion guarantee, 5-year waterproofing warranty. 287+ bathrooms completed. Dubai Municipality approved. Get instant quote." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://unicornrenovations.com/bathroom-renovation" />
        
        {/* Schema markup for bathroom renovation */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Bathroom Renovation Dubai",
            "description": "Professional bathroom renovation services in Dubai with fixed pricing and guaranteed timeline",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Unicorn Renovations",
              "telephone": "+971585658002",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dubai",
                "addressCountry": "AE"
              }
            },
            "areaServed": "Dubai",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "AED",
              "lowPrice": "25000",
              "highPrice": "50000",
              "offerCount": "3"
            }
          }
        `}} />
      </Head>

      <Script
        id="gtag-bathroom"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-612864132');
            gtag('event', 'page_view', {
              'page_title': 'Bathroom Renovation Dubai',
              'page_location': window.location.href,
              'service': 'bathroom_renovation'
            });
          `
        }}
      />

      <div className={`min-h-screen bg-white ${inter.variable} ${playfair.variable}`}>
        
        {/* Header */}
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
        }`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center h-16 md:h-20">
              <div className="flex items-center">
                <div className={`${playfair.className}`}>
                  <div className="text-2xl md:text-3xl font-black text-gray-900">
                    UNICORN<span className="text-amber-600">.</span>
                  </div>
                  <div className={`text-[10px] md:text-xs tracking-widest uppercase ${inter.className} text-gray-600`}>
                    Bathroom Specialists
                  </div>
                </div>
              </div>
              
              <nav className="hidden lg:flex items-center space-x-8">
                <a href="#packages" className={`font-medium text-gray-700 hover:text-amber-600 ${inter.className}`}>
                  Packages
                </a>
                <a href="#process" className={`font-medium text-gray-700 hover:text-amber-600 ${inter.className}`}>
                  Process
                </a>
                <a href="#gallery" className={`font-medium text-gray-700 hover:text-amber-600 ${inter.className}`}>
                  Gallery
                </a>
                <a href="tel:+971585658002" 
                   className={`px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg ${inter.className}`}>
                  Get Quote
                </a>
              </nav>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-white z-[60]">
            <div className="flex justify-between items-center p-4 border-b">
              <div className={`text-2xl font-black ${playfair.className}`}>
                UNICORN<span className="text-amber-600">.</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-6 space-y-4">
              <a href="#packages" onClick={() => setMobileMenuOpen(false)} 
                 className="block text-lg py-3 text-gray-900">Packages</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} 
                 className="block text-lg py-3 text-gray-900">Process</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} 
                 className="block text-lg py-3 text-gray-900">Gallery</a>
              <a href="tel:+971585658002" 
                 className="block w-full px-6 py-4 bg-amber-600 text-white text-center text-lg font-semibold rounded-lg">
                📞 058-565-8002
              </a>
            </nav>
          </div>
        )}

        <div className="h-16 md:h-20"></div>

        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center py-20 bg-gradient-to-br from-slate-900 to-slate-700">
          <div className="absolute inset-0 opacity-20">
            <Image src="/bathroom-hero.jpg" alt="Luxury bathroom" fill className="object-cover" priority />
          </div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-white text-center">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${playfair.className}`}>
              Bathroom Renovation Dubai
            </h1>
            <p className={`text-xl md:text-2xl mb-8 text-amber-300 ${inter.className}`}>
              Fixed Price from AED 25,000 • 21-Day Completion • 5-Year Warranty
            </p>
            <p className={`text-lg mb-10 max-w-3xl mx-auto opacity-90 ${inter.className}`}>
              Transform your bathroom into a luxury spa with Dubai's most trusted renovation specialists. 
              287+ bathrooms completed with 100% on-time delivery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="#quote" className={`px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg ${inter.className}`}>
                Get Instant Quote →
              </a>
              <a href="tel:+971585658002" className={`px-8 py-4 bg-white/10 border-2 border-white hover:bg-white hover:text-gray-900 font-bold rounded-lg ${inter.className}`}>
                📞 058-565-8002
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                <p className="text-2xl font-bold">287+</p>
                <p className="text-sm opacity-80">Bathrooms Done</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                <p className="text-2xl font-bold">21</p>
                <p className="text-sm opacity-80">Days Average</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                <p className="text-2xl font-bold">5yr</p>
                <p className="text-sm opacity-80">Warranty</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                <p className="text-2xl font-bold">4.9★</p>
                <p className="text-sm opacity-80">Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${playfair.className}`}>
                Fixed Price Bathroom Packages
              </h2>
              <p className={`text-xl text-gray-600 ${inter.className}`}>
                All-inclusive pricing with no hidden costs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {bathroomPackages.map((pkg, index) => (
                <div key={index} className={`bg-white rounded-xl ${pkg.popular ? 'ring-2 ring-amber-600 relative' : ''} shadow-lg p-8`}>
                  {pkg.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  )}
                  
                  <h3 className={`text-2xl font-bold mb-2 ${playfair.className}`}>{pkg.title}</h3>
                  <div className="text-4xl font-bold text-amber-600 mb-2">AED {pkg.price}</div>
                  <p className="text-gray-600 mb-1">{pkg.size}</p>
                  <p className="text-gray-600 mb-6">{pkg.timeline}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href="#quote" className={`block w-full py-3 text-center font-bold rounded-lg ${
                    pkg.popular 
                      ? 'bg-amber-600 text-white hover:bg-amber-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${inter.className}`}>
                    Select Package
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${playfair.className}`}>
                Your 21-Day Bathroom Renovation Process
              </h2>
              <p className={`text-xl text-gray-600 ${inter.className}`}>
                Transparent timeline with daily updates via WhatsApp
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {bathroomProcess.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    {index + 1}
                  </div>
                  <h3 className={`font-bold mb-2 ${playfair.className}`}>{step.day}</h3>
                  <p className="font-semibold text-gray-900 mb-1">{step.title}</p>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 ${playfair.className}`}>
              287+ Happy Bathroom Transformations
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                  <div>
                    <p className="font-bold">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.location} • {review.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section id="quote" className="py-20 bg-amber-50">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-8 text-white">
                <h3 className={`text-3xl font-bold mb-2 ${playfair.className}`}>
                  Get Your Bathroom Quote in 60 Seconds
                </h3>
                <p>Fixed pricing • No hidden costs • Instant response</p>
              </div>
              
              <div className="p-8">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className={`text-2xl font-bold mb-4 ${playfair.className}`}>Thank You!</h4>
                    <p className="text-gray-600 mb-6">We'll call you within 30 minutes with your bathroom renovation quote.</p>
                    <a href="tel:+971585658002" className="text-amber-600 font-semibold">
                      Call Now: 058-565-8002
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Bathroom Type *</label>
                      <select
                        required
                        value={formData.bathroomType}
                        onChange={(e) => setFormData({...formData, bathroomType: e.target.value})}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="">Select Type</option>
                        <option value="standard">Standard (4-6m²) - AED 25,000</option>
                        <option value="master">Master (6-10m²) - AED 35,000</option>
                        <option value="luxury">Luxury (10m²+) - AED 50,000+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">When to Start? *</label>
                      <select
                        required
                        value={formData.timeline}
                        onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="">Select Timeline</option>
                        <option value="immediate">Immediately</option>
                        <option value="1month">Within 1 Month</option>
                        <option value="3months">Within 3 Months</option>
                        <option value="planning">Just Planning</option>
                      </select>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? 'Sending...' : 'Get Instant Quote →'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp Button */}
        
          href="https://wa.me/971585658002?text=I%20need%20a%20bathroom%20renovation%20quote"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl z-40"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
