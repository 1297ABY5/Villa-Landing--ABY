// pages/index.js
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useCallback, memo } from 'react';
import dynamic from 'next/dynamic';

// Optimized Font Loading
import { Playfair_Display, Inter } from 'next/font/google';

// Luxury font combination matching your brand
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
const ServiceCard = memo(({ icon, title, description, index }) => (
  <div 
    className="group relative bg-white rounded-none shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
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
    <div className="absolute bottom-0 right-0 w-20 h-20 bg-amber-50 rounded-tl-full transform translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
  </div>
));

ServiceCard.displayName = 'ServiceCard';

export default function Home() {
  const [formState, setFormState] = useState({ submitted: false, loading: false });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Your brand's actual services
  const services = [
    { 
      icon: "🏛️", 
      title: "Villa Renovation", 
      description: "Breathe new life into your villa with our expert renovation services. Full makeovers or selective upgrades with timeless design." 
    },
    { 
      icon: "🏗️", 
      title: "Villa Extensions", 
      description: "Expand your living space seamlessly. Premium craftsmanship with compliance to local regulations." 
    },
    { 
      icon: "✨", 
      title: "Interior Design", 
      description: "Bespoke designs that enhance aesthetics, comfort, and reflect your unique vision and personality." 
    },
    { 
      icon: "🏡", 
      title: "Exterior Renovation", 
      description: "Transform outdated exteriors into elegant, modern spaces. Façade upgrades, landscaping, and outdoor lighting." 
    },
    { 
      icon: "🏢", 
      title: "Office Fit-Out", 
      description: "Create functional, high-performance workspaces that enhance productivity and reflect your brand identity." 
    },
    { 
      icon: "🤖", 
      title: "Smart Home Automation", 
      description: "Control lighting, AC, security, and entertainment from your smartphone. The future of luxury living." 
    }
  ];

  const stats = [
    { number: "15+", label: "Years of Excellence", icon: "⭐" },
    { number: "800+", label: "Villas Transformed", icon: "🏡" },
    { number: "1600+", label: "Happy Families", icon: "❤️" },
    { number: "100%", label: "Client Satisfaction", icon: "✅" }
  ];

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setFormState({ submitted: false, loading: true });
    setTimeout(() => {
      setFormState({ submitted: true, loading: false });
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Unicorn Group - Luxury Villa Renovation Dubai | We Transform Spaces Into Dreams</title>
        <meta name="description" content="Unicorn Renovations Group transforms spaces into extraordinary experiences. Dubai's poets of construction creating lyrical sanctuaries. Founded by Renu & Rajeev." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://unicornrenovations.com" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Unicorn Group - Luxury Villa Renovation Dubai" />
        <meta property="og:description" content="We don't just renovate; we inspire. Transform your villa into a lyrical sanctuary." />
        
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --font-playfair: ${playfair.style.fontFamily};
            --font-inter: ${inter.style.fontFamily};
          }
          
          /* Smooth animations */
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
          
          /* Luxury gradient text */
          .gradient-text {
            background: linear-gradient(135deg, #D4AF37 0%, #F4E4C1 50%, #D4AF37 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          /* Smooth scroll */
          html {
            scroll-behavior: smooth;
          }
        `}} />
      </Head>

      <div className={`min-h-screen bg-white ${inter.variable} ${playfair.variable}`}>
        {/* Luxury Header */}
        <header 
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
            scrolled 
              ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' 
              : 'bg-transparent py-6'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <a href="/" className={`text-2xl font-black ${playfair.className} ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  UNICORN<span className="text-amber-600">.</span>
                </a>
              </div>
              
              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center space-x-10">
                {['Services', 'Portfolio', 'About', 'Process', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`font-medium transition-all duration-300 ${inter.className} ${
                      scrolled 
                        ? 'text-gray-700 hover:text-amber-600' 
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="tel:+971501234567"
                  className={`px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-none font-semibold transition-all duration-300 ${inter.className}`}
                >
                  Get Consultation
                </a>
              </nav>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 ${scrolled ? 'text-gray-900' : 'text-white'}`}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 bg-white z-50 pt-20">
              <nav className="flex flex-col items-center space-y-8 p-8">
                {['Services', 'Portfolio', 'About', 'Process', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-2xl font-light text-gray-900 ${playfair.className}`}
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="tel:+971501234567"
                  className={`px-8 py-4 bg-amber-600 text-white text-xl ${inter.className}`}
                >
                  Call Now
                </a>
              </nav>
            </div>
          )}
        </header>

        {/* Hero Section - Luxury Style */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background - Luxury Gradient (No Image Required) */}
          <div className="absolute inset-0 z-0">
            {/* Option 1: Beautiful gradient background - no image needed */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900" />
            
            {/* Animated gradient overlay for luxury effect */}
            <div className="absolute inset-0 opacity-50">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
            </div>
            
            {/* Pattern overlay for texture */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
            
            {/* Option 2: If you want to use a placeholder image service, uncomment below */}
            {/* 
            <Image
              src="https://source.unsplash.com/1600x900/?luxury,villa,dubai"
              alt="Luxury Villa"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
            */}
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
            <div className="animate-fadeInUp">
              <p className={`text-amber-400 text-sm tracking-[0.3em] uppercase mb-6 ${inter.className}`}>
                Dubai's Poets of Construction
              </p>
              <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight ${playfair.className}`}>
                We Transform Spaces Into
                <span className="block gradient-text mt-4">Lyrical Sanctuaries</span>
              </h1>
              <p className={`text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 font-light leading-relaxed ${inter.className}`}>
                In the UAE's heart, Unicorn Interiors orchestrates dreams, transcending the mundane. 
                We infuse poetry into every corner, making homes emotional sanctuaries.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="#contact"
                  className={`px-10 py-5 bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${inter.className}`}
                >
                  Begin Your Journey
                </a>
                <a
                  href="#portfolio"
                  className={`px-10 py-5 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg font-semibold transition-all duration-300 ${inter.className}`}
                >
                  View Our Masterpieces
                </a>
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

        {/* Philosophy Section */}
        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-8 ${playfair.className}`}>
                  Beyond Construction,<br />
                  <span className="text-amber-600">We Create Poetry</span>
                </h2>
                <p className={`text-lg text-gray-600 mb-6 leading-relaxed ${inter.className}`}>
                  Founded by <strong>Renu and Rajeev</strong>, Unicorn Renovations Group brings together 
                  expert designers and master craftsmen who share a passion for transforming ordinary spaces 
                  into extraordinary experiences.
                </p>
                <p className={`text-lg text-gray-600 mb-8 leading-relaxed ${inter.className}`}>
                  We stay ahead of trends, using the latest designs and materials to create beautiful, 
                  sustainable spaces. Every project is a harmonious performance where visions become reality.
                </p>
                <div className="flex items-center space-x-8">
                  <div>
                    <p className={`text-4xl font-bold text-amber-600 ${playfair.className}`}>15+</p>
                    <p className={`text-sm text-gray-600 ${inter.className}`}>Years Excellence</p>
                  </div>
                  <div>
                    <p className={`text-4xl font-bold text-amber-600 ${playfair.className}`}>800+</p>
                    <p className={`text-sm text-gray-600 ${inter.className}`}>Villas Transformed</p>
                  </div>
                  <div>
                    <p className={`text-4xl font-bold text-amber-600 ${playfair.className}`}>100%</p>
                    <p className={`text-sm text-gray-600 ${inter.className}`}>Satisfaction</p>
                  </div>
                </div>
              </div>
              <div className="relative h-[500px] bg-gradient-to-br from-amber-100 to-amber-50">
                {/* Decorative elements instead of image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl text-amber-600/20 mb-4">🏛️</div>
                    <p className={`text-3xl font-bold text-amber-600/30 ${playfair.className}`}>
                      Excellence in Every Detail
                    </p>
                  </div>
                </div>
                
                {/* If you want to add your own image later, replace the above with: */}
                {/* 
                <Image
                  src="/your-villa-image.jpg"
                  alt="Luxury Villa Interior"
                  fill
                  className="object-cover shadow-2xl"
                />
                */}
                
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-600"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gray-900"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className={`text-amber-600 text-sm tracking-[0.3em] uppercase mb-4 ${inter.className}`}>
                Our Expertise
              </p>
              <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${playfair.className}`}>
                Services That Transform Lives
              </h2>
              <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${inter.className}`}>
                From luxurious villas to stunning pools, we specialize in high-end renovations 
                that blend timeless design with modern functionality.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-6 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <p className={`text-4xl font-bold text-amber-400 mb-2 ${playfair.className}`}>
                    {stat.number}
                  </p>
                  <p className={`text-gray-400 ${inter.className}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className={`text-amber-600 text-sm tracking-[0.3em] uppercase mb-4 ${inter.className}`}>
                Our Process
              </p>
              <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 ${playfair.className}`}>
                A Journey From Vision to Reality
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Consultation", desc: "Understanding your dreams and goals" },
                { step: "02", title: "Design", desc: "Creating detailed plans with 3D visualization" },
                { step: "03", title: "Execution", desc: "Master craftsmen bring designs to life" },
                { step: "04", title: "Perfection", desc: "Final touches and quality inspection" }
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className={`text-6xl font-bold text-gray-200 group-hover:text-amber-600 transition-colors duration-300 mb-4 ${playfair.className}`}>
                    {item.step}
                  </div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-3 ${playfair.className}`}>
                    {item.title}
                  </h3>
                  <p className={`text-gray-600 ${inter.className}`}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Gallery Section */}
        <section id="portfolio" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className={`text-amber-600 text-sm tracking-[0.3em] uppercase mb-4 ${inter.className}`}>
                Follow Our Journey
              </p>
              <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${playfair.className}`}>
                Latest Projects on Instagram
              </h2>
              <p className={`text-xl text-gray-600 max-w-3xl mx-auto mb-4 ${inter.className}`}>
                See our villa transformations, from Victory Heights to Arabian Ranches and the Meadows
              </p>
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

            {/* Instagram Feed Widget */}
            <div className="max-w-6xl mx-auto">
              <InstagramFeed />
            </div>

            {/* Portfolio Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
              <div className="text-center">
                <p className={`text-3xl font-bold text-amber-600 mb-2 ${playfair.className}`}>800+</p>
                <p className={`text-gray-600 ${inter.className}`}>Villas Renovated</p>
              </div>
              <div className="text-center">
                <p className={`text-3xl font-bold text-amber-600 mb-2 ${playfair.className}`}>1,600+</p>
                <p className={`text-gray-600 ${inter.className}`}>Bathrooms Designed</p>
              </div>
              <div className="text-center">
                <p className={`text-3xl font-bold text-amber-600 mb-2 ${playfair.className}`}>800+</p>
                <p className={`text-gray-600 ${inter.className}`}>Kitchens Delivered</p>
              </div>
              <div className="text-center">
                <p className={`text-3xl font-bold text-amber-600 mb-2 ${playfair.className}`}>100%</p>
                <p className={`text-gray-600 ${inter.className}`}>Satisfied Clients</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className={`text-amber-600 text-sm tracking-[0.3em] uppercase mb-4 ${inter.className}`}>
                Testimonials
              </p>
              <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 ${playfair.className}`}>
                Stories of Transformation
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-12 shadow-xl">
                <svg className="w-12 h-12 text-amber-600 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className={`text-2xl text-gray-700 mb-8 leading-relaxed italic ${playfair.className}`}>
                  "Unicorn team turned our villa into a dream home. Their team was professional, creative, 
                  and paid attention to every little detail. The end result is stunning — it truly feels 
                  like a luxury sanctuary. We're beyond happy!"
                </p>
                <div>
                  <p className={`font-bold text-gray-900 ${inter.className}`}>Fatima & Ahmed Al Rashid</p>
                  <p className={`text-gray-600 ${inter.className}`}>Palm Jumeirah Villa</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <p className={`text-amber-400 text-sm tracking-[0.3em] uppercase mb-4 ${inter.className}`}>
                  Get In Touch
                </p>
                <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${playfair.className}`}>
                  Let's Create Your<br />
                  Dream Sanctuary
                </h2>
                <p className={`text-xl text-gray-400 mb-12 ${inter.className}`}>
                  Join our journey where renovation is not a service but an emotional sonnet, 
                  crafting dreams into reality.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-gray-400 text-sm ${inter.className}`}>Call Us</p>
                      <a href="tel:+971501234567" className={`text-xl hover:text-amber-400 transition-colors ${inter.className}`}>
                        +971 50 123 4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-gray-400 text-sm ${inter.className}`}>Email</p>
                      <a href="mailto:info@unicornrenovations.com" className={`text-xl hover:text-amber-400 transition-colors ${inter.className}`}>
                        info@unicornrenovations.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-gray-400 text-sm ${inter.className}`}>Visit Our Studio</p>
                      <p className={`text-xl ${inter.className}`}>
                        The Curve Building, Sheikh Zayed Road, Dubai
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white text-gray-900 p-10">
                {formState.submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className={`text-3xl font-bold mb-4 ${playfair.className}`}>
                      Thank You!
                    </h3>
                    <p className={`text-gray-600 ${inter.className}`}>
                      Our design specialist will contact you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className={`text-2xl font-bold mb-6 ${playfair.className}`}>
                      Request Free Consultation
                    </h3>
                    
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-amber-600 focus:outline-none transition-colors ${inter.className}`}
                    />
                    
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-amber-600 focus:outline-none transition-colors ${inter.className}`}
                    />
                    
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-amber-600 focus:outline-none transition-colors ${inter.className}`}
                    />
                    
                    <select
                      required
                      className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-amber-600 focus:outline-none transition-colors ${inter.className}`}
                    >
                      <option value="">Select Service</option>
                      <option value="villa-renovation">Villa Renovation</option>
                      <option value="villa-extension">Villa Extension</option>
                      <option value="interior-design">Interior Design</option>
                      <option value="pool">Swimming Pool</option>
                      <option value="smart-home">Smart Home</option>
                      <option value="office">Office Fit-Out</option>
                    </select>
                    
                    <textarea
                      placeholder="Tell us about your dream project..."
                      rows={4}
                      required
                      className={`w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-amber-600 focus:outline-none transition-colors resize-none ${inter.className}`}
                    />
                    
                    <button
                      type="submit"
                      disabled={formState.loading}
                      className={`w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-all duration-300 ${inter.className} ${
                        formState.loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {formState.loading ? 'Submitting...' : 'Begin Your Journey'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className={`text-2xl font-bold mb-4 md:mb-0 ${playfair.className}`}>
                UNICORN<span className="text-amber-600">.</span>
              </div>
              
              <p className={`text-gray-400 text-sm ${inter.className}`}>
                © {new Date().getFullYear()} Unicorn Renovations Group. Crafting Dreams Into Reality.
              </p>
              
              <div className="flex space-x-6 mt-4 md:mt-0">
                {['Instagram', 'Facebook', 'LinkedIn'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className={`text-gray-400 hover:text-amber-600 transition-colors ${inter.className}`}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/971501234567"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-xl transition-all transform hover:scale-110 z-40"
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
