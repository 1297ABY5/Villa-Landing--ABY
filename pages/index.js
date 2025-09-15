import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Inter, Playfair_Display } from 'next/font/google';

// --- PREMIUM FONT SETUP ---
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['700', '800'],
  variable: '--font-playfair',
  display: 'swap',
});

// --- CUSTOM HOOK FOR SCROLL ANIMATIONS (NO LIBRARY NEEDED) ---
const useInView = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isInView];
};

// Reusable Animated Component
const AnimatedSection = ({ children, className }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  return (
    <section ref={ref} className={`${className} fade-in-section ${isInView ? 'is-visible' : ''}`}>
      {children}
    </section>
  );
};


export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // (Your portfolioItems and testimonials arrays remain the same as your last version)
  const portfolioItems = [
    { img: "/villa1.jpg", title: "Emirates Hills Villa", desc: "Ultra-modern villa transformation" },
    { img: "/villa2.jpg", title: "Palm Jumeirah Spa", desc: "Resort-style bathroom remodel" },
    { img: "/villa3.jpg", title: "Downtown Penthouse", desc: "Luxury kitchen renovation" },
  ];

  const testimonials = [
    { name: "Ahmed R.", text: "Unicorn's villa renovation services are unparalleled. A masterpiece.", img: "/client1.jpg", rating: 5 },
    { name: "Layla M.", text: "The 3D design for our home renovation was incredible. The result was even better.", img: "/client2.jpg", rating: 5 },
    { name: "Omar S.", text: "The best renovation contractors in Dubai. Delivered our villa refurbishment ahead of schedule.", img: "/client3.jpg", rating: 5 },
  ];


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className={`${inter.variable} ${playfair.variable} min-h-screen bg-brand-light font-sans text-brand-dark`}>
      <Head>
        <title>Luxury Villa Renovation Dubai | Premium Home Transformation | Unicorn Renovations</title>
        <meta name="description" content="Dubai's premier villa renovation company with 15+ years expertise. Specialists in luxury villa remodeling, interior design, and home renovation services across Emirates Hills, Palm Jumeirah & Downtown Dubai." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="villa renovation, villa renovation dubai, home renovation, renovation company, renovation contractors, interior design, home remodeling, bathroom remodel, kitchen remodel, villa extension, villa remodeling, villa restoration, villa renovation services, villa renovation contractors, villa interior design, villa modification, villa makeover, villa refurbishment, home renovation services, renovation experts, interior renovation company" />
      </Head>

      {/* --- PREMIUM NAVBAR --- */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-lg shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold font-heading text-brand-dark flex items-center">
            <span className="mr-2 text-3xl">🦄</span>
            <span className="hidden sm:inline">Unicorn Renovations</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
            <a href="#features" className="group transition-colors">Why Us<span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-brand-gold"></span></a>
            <a href="#portfolio" className="group transition-colors">Portfolio<span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-brand-gold"></span></a>
            <a href="#testimonials" className="group transition-colors">Testimonials<span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-brand-gold"></span></a>
            <a href="#contact" className="bg-brand-dark text-white hover:bg-brand-gold hover:text-black font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-105">
              Free Consultation
            </a>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-6 h-6 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-xl">
            <div className="flex flex-col space-y-2 p-4">
              <a href="#features" className="py-2 px-3 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
              <a href="#portfolio" className="py-2 px-3 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
              <a href="#testimonials" className="py-2 px-3 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
              <a href="#contact" className="py-3 px-3 mt-2 bg-brand-dark text-white text-center rounded-md hover:bg-brand-gold hover:text-black" onClick={() => setMobileMenuOpen(false)}>Free Consultation</a>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* --- PREMIUM HERO --- */}
        <section className="pt-32 pb-24 px-4 bg-gradient-to-b from-white to-brand-light sm:pt-40 sm:pb-32">
          <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 animate-fade-in-up">
            <div className="md:w-6/12 text-center md:text-left">
              <h1 className="text-4xl font-extrabold font-heading text-brand-dark leading-tight mb-6 sm:text-5xl lg:text-6xl">
                Dubai's Premier <span className="text-brand-gold">Villa Renovation</span> Experts
              </h1>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed sm:text-xl">
                As Dubai's leading <strong>villa renovation company</strong>, we specialize in luxury <strong>home renovation</strong>. Our expert <strong>renovation contractors</strong> deliver exceptional <strong>interior design</strong> and <strong>home remodeling</strong> solutions.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 justify-center md:justify-start">
                <a href="#contact" className="bg-brand-dark text-white hover:bg-brand-gold hover:text-black font-bold py-4 px-10 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
                  Book Free Consultation
                </a>
              </div>
            </div>
            <div className="md:w-6/12 relative mt-8 md:mt-0">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/hero-villa.jpg" 
                  alt="Luxury Villa Renovation Dubai by Unicorn Renovations - Villa Transformation Experts" 
                  width={700} height={500} 
                  className="object-cover w-full h-auto" 
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* --- All other sections will now use the AnimatedSection component --- */}

        <AnimatedSection id="features" className="py-24 bg-white px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold font-heading text-brand-dark mb-4 sm:text-4xl">Why Choose Our Villa Renovation Services</h2>
            <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">We are Dubai's preferred <strong>renovation contractors</strong> for luxury <strong>villa transformation</strong> projects.</p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-brand-light p-10 rounded-2xl border border-gray-100">
                  <h3 className="text-xl font-bold font-heading text-brand-dark mb-4">Expert Renovation Contractors</h3>
                  <p className="text-gray-600">Our skilled <strong>renovation experts</strong> deliver precision craftsmanship for your <strong>villa renovation</strong> or <strong>home remodeling</strong> project.</p>
              </div>
              <div className="bg-brand-light p-10 rounded-2xl border border-gray-100">
                  <h3 className="text-xl font-bold font-heading text-brand-dark mb-4">Complete Home Renovation</h3>
                  <p className="text-gray-600">From <strong>villa extension</strong> to <strong>interior renovation</strong>, we provide comprehensive <strong>home renovation services</strong>.</p>
              </div>
              <div className="bg-brand-light p-10 rounded-2xl border border-gray-100">
                  <h3 className="text-xl font-bold font-heading text-brand-dark mb-4">Luxury Interior Design</h3>
                  <p className="text-gray-600">Our <strong>interior design</strong> team creates stunning spaces for your <strong>villa renovation</strong> or <strong>apartment interior design</strong>.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        <AnimatedSection id="portfolio" className="py-24 bg-brand-light px-4">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-heading text-brand-dark mb-4 sm:text-4xl">Our Villa Renovation Portfolio</h2>
              <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">Explore exceptional <strong>villa transformation</strong> and <strong>home renovation</strong> projects.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {portfolioItems.map((p, i) => (
                <div key={i} className="relative group rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-500 hover:-translate-y-2">
                  <Image src={p.img} alt={`${p.title} - Villa Renovation Project`} width={450} height={320} className="object-cover w-full h-96 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h3 className="text-2xl font-bold font-heading">{p.title}</h3>
                    <p className="text-gray-200 mt-1">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="testimonials" className="py-24 bg-white px-4">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-heading text-brand-dark mb-4 sm:text-4xl">What Our Renovation Clients Say</h2>
              <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">Hear from homeowners who trusted our <strong>renovation company</strong>.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-brand-light p-8 rounded-2xl border border-gray-100">
                  <span className="text-7xl text-brand-gold font-heading opacity-20">“</span>
                  <p className="italic text-gray-700 -mt-8 mb-6">"{t.text}"</p>
                  <div className="flex items-center">
                    <Image src={t.img} alt={t.name} width={50} height={50} className="rounded-full" />
                    <div className="ml-4">
                      <h4 className="font-bold text-brand-dark">{t.name}</h4>
                      <p className="text-sm text-gray-500">Villa Renovation Client</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact" className="py-24 bg-brand-dark text-white px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold font-heading mb-4 sm:text-4xl">Start Your Villa Renovation Journey</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">Schedule your complimentary <strong>renovation consultation</strong> with our experts.</p>
            {formSubmitted ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold font-heading text-white mb-4">Thank You!</h3>
                <p className="text-gray-300">Our design specialist will contact you within 24 hours to discuss your <strong>villa renovation</strong> project.</p>
              </div>
            ) : (
              <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <input type="text" placeholder="Full Name*" required className="w-full px-5 py-3 bg-gray-800 border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-brand-gold focus:outline-none" />
                  <input type="email" placeholder="Email Address*" required className="w-full px-5 py-3 bg-gray-800 border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-brand-gold focus:outline-none" />
                </div>
                <select className="w-full px-5 py-3 bg-gray-800 border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-brand-gold focus:outline-none">
                  <option>Villa Renovation</option>
                  <option>Kitchen Remodel</option>
                  <option>Bathroom Remodel</option>
                </select>
                <textarea placeholder="Tell us about your project..." rows={4} className="w-full px-5 py-3 bg-gray-800 border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-brand-gold focus:outline-none"></textarea>
                <button type="submit" className="w-full bg-brand-gold hover:bg-yellow-500 text-black font-bold py-4 rounded-lg transition-all transform hover:scale-105">
                  Request Free Renovation Consultation
                </button>
              </form>
            )}
          </div>
        </AnimatedSection>
        
        <footer className="bg-brand-light text-gray-700 py-16 px-4">
          <div className="container mx-auto text-center">
            <h3 className="text-2xl font-bold font-heading text-brand-dark mb-3">🦄 Unicorn Renovations</h3>
            <p className="text-gray-600 mb-6">Dubai's Premier Villa Transformation Company</p>
            <p className="text-gray-500 text-sm mt-10">© {new Date().getFullYear()} Unicorn Renovations. All rights reserved.</p>
          </div>
        </footer>
      </main>

      <a href={`https://wa.me/971501234567?text=Hello! I'm interested in your villa renovation services. The current date is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.985 0 11.125c0 1.963.545 3.87 1.58 5.54L0 24l7.6-2.39A12.64 12.64 0 0012 22.25c6.627 0 12-4.985 12-11.125S18.627 0 12 0z" /></svg>
      </a>
    </div>
  );
}
