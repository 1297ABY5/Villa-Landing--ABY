import Head from 'next/head';
import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import Script from 'next/script';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'], 
  weight: ['700'], 
  display: 'swap', 
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'], 
  weight: ['400', '600'], 
  display: 'swap', 
  variable: '--font-inter',
});

export default function BathroomRenovation() {
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    bathroomSize: '', 
    timeline: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPhoneFallback, setShowPhoneFallback] = useState(false);

  // Phone validation
  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 9 && cleaned.length <= 15;
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Validate
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name required';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Valid phone required';
    if (!formData.bathroomSize) newErrors.bathroomSize = 'Size required';
    if (!formData.timeline) newErrors.timeline = 'Timeline required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Track conversion
    if (typeof window !== 'undefined' && window.gtag) {
      const value = formData.bathroomSize === 'luxury' ? 50000 : 
                   formData.bathroomSize === 'master' ? 35000 : 25000;
      window.gtag('event', 'conversion', { 
        'send_to': 'AW-612864132/BATHROOM', 
        'value': value, 
        'currency': 'AED' 
      });
    }

    // Try WhatsApp first
    const message = `New Bathroom Quote Request:\nName: ${formData.name}\nPhone: ${formData.phone}\nSize: ${formData.bathroomSize}\nTimeline: ${formData.timeline}`;
    
    // Check if mobile with WhatsApp
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      window.open(`https://wa.me/971585658002?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      // Show phone number for desktop users
      setShowPhoneFallback(true);
    }

    // Also send to your backend (implement this endpoint)
    try {
      await fetch('/api/bathroom-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (error) {
      console.error('Lead submission error:', error);
    }

    setSubmitted(true);
    setLoading(false);
  }, [formData]);

  // Lazy load testimonials
  const [testimonialVisible, setTestimonialVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTestimonialVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('testimonials');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Bathroom Renovation Dubai - Fixed AED 25,000 | 21 Days</title>
        <meta name="description" content="Bathroom renovation Dubai in 21 days. Fixed AED 25,000. 5-year waterproof warranty. 287 completed. Call 058-565-8002 for same-day quote." />
        <link rel="canonical" href="https://dubailuxrenovate.com/bathroom-renovation" />
        
        {/* Schema markup for local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Bathroom Renovation",
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
              "priceRange": "AED 25,000 - 50,000"
            })
          }}
        />
      </Head>

      {/* Google Ads - Replace with your actual ID */}
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
        `}
      </Script>

      <div className={`${inter.variable} ${playfair.variable} font-sans`}>
        {/* Trust Bar */}
        <div className="bg-green-50 py-2 text-center text-sm">
          ✅ Licensed #12345 | ✅ 287 Bathrooms Done | ✅ Same-Day Quote
        </div>

        {/* Hero - No complex image, just gradient */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
              Bathroom Renovation Dubai
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Fixed Price from AED 25,000 • Completed in 21 Days
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:0585658002" 
                className="bg-amber-600 hover:bg-amber-700 px-8 py-4 rounded font-bold text-lg"
              >
                📞 Call: 058-565-8002
              </a>
              <a 
                href="#quote" 
                className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded font-bold text-lg"
              >
                💬 Get WhatsApp Quote
              </a>
            </div>
            
            {/* Social proof */}
            <div className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
              <div className="bg-white/10 p-4 rounded">
                <div className="text-3xl font-bold">287</div>
                <div className="text-sm">Bathrooms Done</div>
              </div>
              <div className="bg-white/10 p-4 rounded">
                <div className="text-3xl font-bold">4.9★</div>
                <div className="text-sm">Google Rating</div>
              </div>
              <div className="bg-white/10 p-4 rounded">
                <div className="text-3xl font-bold">5yr</div>
                <div className="text-sm">Warranty</div>
              </div>
            </div>
          </div>
        </section>

        {/* Simple Pricing */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-center mb-12">
              Fixed, Transparent Pricing
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="border-2 border-gray-200 p-6 rounded text-center">
                <h3 className="font-bold text-xl mb-2">Standard</h3>
                <div className="text-3xl font-bold text-amber-600 mb-2">AED 25,000</div>
                <p className="text-gray-600">4-6m² • 21 days</p>
              </div>
              <div className="border-2 border-amber-600 p-6 rounded text-center relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-4 py-1 text-sm rounded-full">
                  POPULAR
                </span>
                <h3 className="font-bold text-xl mb-2">Master</h3>
                <div className="text-3xl font-bold text-amber-600 mb-2">AED 35,000</div>
                <p className="text-gray-600">6-10m² • 21 days</p>
              </div>
              <div className="border-2 border-gray-200 p-6 rounded text-center">
                <h3 className="font-bold text-xl mb-2">Luxury</h3>
                <div className="text-3xl font-bold text-amber-600 mb-2">AED 50,000+</div>
                <p className="text-gray-600">10m²+ • 28 days</p>
              </div>
            </div>
          </div>
        </section>

        {/* Simple testimonials - text only, no images */}
        <section id="testimonials" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-center mb-12">
              Recent Customer Reviews
            </h2>
            {testimonialVisible && (
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-lg">
                  <p className="italic mb-4">
                    "Finished in exactly 21 days. No hidden costs."
                  </p>
                  <p className="font-bold">Ahmed K.</p>
                  <p className="text-sm text-gray-600">Palm Jumeirah</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <p className="italic mb-4">
                    "The 5-year warranty gives peace of mind."
                  </p>
                  <p className="font-bold">Sarah M.</p>
                  <p className="text-sm text-gray-600">Dubai Marina</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <p className="italic mb-4">
                    "They handled all permits. Stress-free!"
                  </p>
                  <p className="font-bold">Michael R.</p>
                  <p className="text-sm text-gray-600">Arabian Ranches</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Quote Form */}
        <section id="quote" className="py-16 bg-slate-800 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-center mb-8">
              Get Your Fixed-Price Quote
            </h2>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full p-4 rounded text-black ${errors.name ? 'border-2 border-red-500' : ''}`}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div className="mb-4">
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full p-4 rounded text-black ${errors.phone ? 'border-2 border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div className="mb-4">
                  <select
                    value={formData.bathroomSize}
                    onChange={(e) => setFormData({...formData, bathroomSize: e.target.value})}
                    className={`w-full p-4 rounded text-black ${errors.bathroomSize ? 'border-2 border-red-500' : ''}`}
                  >
                    <option value="">Select Size *</option>
                    <option value="standard">Standard (4-6m²)</option>
                    <option value="master">Master (6-10m²)</option>
                    <option value="luxury">Luxury (10m²+)</option>
                  </select>
                  {errors.bathroomSize && <p className="text-red-400 text-sm mt-1">{errors.bathroomSize}</p>}
                </div>
                
                <div className="mb-6">
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                    className={`w-full p-4 rounded text-black ${errors.timeline ? 'border-2 border-red-500' : ''}`}
                  >
                    <option value="">When to Start? *</option>
                    <option value="immediate">Immediately</option>
                    <option value="1month">Within 1 Month</option>
                    <option value="3months">Within 3 Months</option>
                    <option value="planning">Just Planning</option>
                  </select>
                  {errors.timeline && <p className="text-red-400 text-sm mt-1">{errors.timeline}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-700 py-4 rounded font-bold text-lg disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Get My Quote →'}
                </button>
              </form>
            ) : (
              <div className="text-center max-w-md mx-auto">
                <h3 className="text-2xl mb-4">✅ Quote Request Received!</h3>
                {showPhoneFallback ? (
                  <div>
                    <p className="mb-4">Call us now for immediate quote:</p>
                    <a href="tel:0585658002" className="text-3xl text-amber-400">
                      058-565-8002
                    </a>
                  </div>
                ) : (
                  <p>Check your WhatsApp - quote coming in 30 minutes.</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Mobile sticky CTA */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t grid grid-cols-2 z-50">
          <a href="tel:0585658002" className="bg-amber-600 text-white py-4 text-center font-bold">
            📞 Call
          </a>
          <a href="#quote" className="bg-green-600 text-white py-4 text-center font-bold">
            💬 Quote
          </a>
        </div>
      </div>
    </>
  );
}
