// pages/index.js - ULTRA-FOCUSED LEAD MACHINE
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function LaserLeadPage() {
  const router = useRouter();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  
  // SUPER SIMPLE state - ONLY what converts
  const [formData, setFormData] = useState({
    phone: '',
    community: ''
  });
  
  const [dynamic, setDynamic] = useState({
    keyword: 'Villa Renovation',
    location: 'Dubai'
  });

  // Load URL params ONCE
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setDynamic({
      keyword: params.get('keyword') || 'Villa Renovation',
      location: params.get('location') || 'Dubai'
    });
  }, []);

  // WhatsApp INSTANT submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // ULTRA-COMPACT WhatsApp message
    const message = `Hi! I'm interested in ${dynamic.keyword} in ${dynamic.location}. ${formData.community ? `Community: ${formData.community}` : ''} Phone: ${formData.phone}. Please call me for a free quote.`;
    
    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-612864132/qqQcQNeM-bADEISh7qQC',
        'value': 100000,
        'currency': 'AED'
      });
    }
    
    // INSTANT redirect
    window.location.href = `https://wa.me/971585658002?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      <Head>
        <title>{dynamic.keyword} in {dynamic.location} | Free 3D Design</title>
        <meta name="description" content={`Get instant ${dynamic.keyword} quote in ${dynamic.location}. WhatsApp quote in 30 minutes. 800+ villas completed.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* CRITICAL CSS INLINE - NO EXTERNAL DEPENDENCIES */}
        <style dangerouslySetInnerHTML={{ __html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
          .hero-bg {
            background: linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=80');
            background-size: cover;
            background-position: center;
          }
          .whatsapp-btn {
            background: #25D366;
            color: white;
            font-weight: bold;
            padding: 16px 24px;
            border-radius: 10px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3);
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .call-btn {
            background: #EA580C;
            color: white;
            font-weight: bold;
            padding: 16px 24px;
            border-radius: 10px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            border: 2px solid white;
          }
          .trust-badge {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 20px;
            padding: 8px 16px;
            font-size: 14px;
          }
        `}} />
      </Head>

      {/* FLICKER-FREE HERO - LOADS IN <2s */}
      <section className="hero-bg min-h-screen text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          
          {/* SIMPLE HEADER */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {dynamic.keyword} in {dynamic.location}
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Get exact pricing + 3D design today. WhatsApp response in 15 minutes.
            </p>
          </div>

          {/* TRUST ROW - MINIMAL */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <div className="trust-badge">✓ Dubai Municipality Approved</div>
            <div className="trust-badge">⭐ 4.9/5 (287 Reviews)</div>
            <div className="trust-badge">🏠 800+ Villas Completed</div>
          </div>

          {/* PRIMARY CONVERSION BOX */}
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Get Your Exact Quote in 60 Seconds
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* COMMUNITY (QUALIFIES LEADS) */}
              <div>
                <label className="block text-sm mb-2">Your Community</label>
                <select
                  value={formData.community}
                  onChange={(e) => setFormData({...formData, community: e.target.value})}
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/30 text-white"
                >
                  <option value="">Select Community</option>
                  <option value="Palm Jumeirah">Palm Jumeirah</option>
                  <option value="Emirates Hills">Emirates Hills</option>
                  <option value="Arabian Ranches">Arabian Ranches</option>
                  <option value="Dubai Hills">Dubai Hills</option>
                  <option value="Jumeirah Golf">Jumeirah Golf</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              {/* PHONE - ONLY WHAT WE NEED */}
              <div>
                <label className="block text-sm mb-2">WhatsApp Number</label>
                <input
                  type="tel"
                  placeholder="+971 58 565 8002"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50"
                />
              </div>
              
              {/* PRIMARY SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="whatsapp-btn w-full text-lg justify-center"
              >
                {loading ? 'Sending...' : '📱 Get Instant Quote via WhatsApp'}
              </button>
            </form>
            
            {/* ALTERNATIVE CTA */}
            <div className="mt-4">
              <a href="tel:+971585658002" className="call-btn w-full text-lg justify-center block text-center">
                📞 Or Call Now: +971 58 565 8002
              </a>
            </div>
          </div>

          {/* URGENCY - BELOW FORM */}
          <div className="text-center mt-8">
            <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full animate-pulse">
              ⚡ Only 3 consultation slots left for today
            </div>
          </div>
        </div>
      </section>

      {/* MINIMAL TRUST SECTION */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Why Dubai Homeowners Choose Us
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="font-bold">15+ Years Experience</h3>
              <p className="text-gray-600 text-sm">Since 2009 in Dubai</p>
            </div>
            <div>
              <div className="text-4xl mb-2">💰</div>
              <h3 className="font-bold">Fixed Price Guarantee</h3>
              <p className="text-gray-600 text-sm">No hidden costs</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🛡️</div>
              <h3 className="font-bold">5-Year Warranty</h3>
              <p className="text-gray-600 text-sm">Complete peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* SINGLE CALL TO ACTION AT BOTTOM */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 py-16 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Still Thinking About Your {dynamic.keyword}?
          </h2>
          <p className="mb-8 text-xl">
            Get your free 3D design today. WhatsApp now for instant response.
          </p>
          <a 
            href="https://wa.me/971585658002" 
            className="whatsapp-btn text-2xl py-6 px-10"
          >
            📱 WhatsApp for Free Design
          </a>
        </div>
      </section>

      {/* ULTRA-SIMPLE ANALYTICS */}
      <script dangerouslySetInnerHTML={{ __html: `
        // Load analytics AFTER page is interactive
        window.addEventListener('load', () => {
          setTimeout(() => {
            const script = document.createElement('script');
            script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-612864132';
            script.async = true;
            document.head.appendChild(script);
            
            script.onload = () => {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-612864132');
            };
          }, 1000);
        });
      `}} />
    </>
  );
}
