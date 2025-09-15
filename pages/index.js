import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
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

// Reusable Animated Section Component
const AnimatedSection = ({ children, id, className = '' }) => {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <section 
      id={id} 
      ref={ref} 
      className={`${className} fade-in-section ${isInView ? 'is-visible' : ''}`}
    >
      {children}
    </section>
  );
};

// FAQ Item Component
const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 py-6">
            <button
                className="w-full flex justify-between items-center text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-xl font-bold font-heading text-brand-dark">{question}</h3>
                <span className={`transform transition-transform duration-300 ${isOpen ? '-rotate-180' : 'rotate-0'}`}>
                    <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
            </button>
            <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <p className="text-gray-600 text-sm pt-4">{answer}</p>
                </div>
            </div>
        </div>
    );
};


export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // --- ALL YOUR ORIGINAL DATA IS PRESERVED ---
  const portfolioItems = [
    { img: "/villa1.jpg", title: "Emirates Hills Villa", desc: "Ultra-modern transformation", fullDesc: "Complete villa renovation with contemporary design elements and smart home integration." },
    { img: "/villa2.jpg", title: "Palm Jumeirah Spa", desc: "Resort-style bathroom", fullDesc: "Luxury bathroom renovation inspired by five-star resort designs with premium finishes." },
    { img: "/villa3.jpg", title: "Downtown Penthouse", desc: "Luxury kitchen remodel", fullDesc: "High-end kitchen renovation with custom cabinetry and professional-grade appliances." },
  ];

  const testimonials = [
    { name: "Ahmed R.", text: "Unicorn Renovations transformed our villa into a masterpiece. Worth every dirham.", img: "/client1.jpg", rating: 5, location: "Emirates Hills" },
    { name: "Layla M.", text: "The 3D design gave us total confidence. The final execution exceeded our expectations.", img: "/client2.jpg", rating: 5, location: "Palm Jumeirah" },
    { name: "Omar S.", text: "Delivered ahead of schedule with luxury quality. Highly recommend them.", img: "/client3.jpg", rating: 5, location: "Downtown Dubai" },
  ];

  const services = [
    { title: "Villa Renovation", description: "Complete home transformation services for luxury villas in Dubai", icon: "🏠" },
    { title: "Kitchen Remodeling", description: "Custom kitchen designs with premium materials and appliances", icon: "👨‍🍳" },
    { title: "Bathroom Renovation", description: "Spa-like bathroom transformations with luxury finishes", icon: "🚿" },
    { title: "Interior Design", description: "Complete interior design services for villas and apartments", icon: "🎨" },
    { title: "Villa Extension", description: "Professional villa expansion and structural modifications", icon: "📐" },
    { title: "Penthouse Renovation", description: "Luxury renovation services for premium penthouses", icon: "🏙️" },
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="fixed w-full bg-white/80 backdrop-blur-lg shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold font-heading text-brand-dark flex items-center">
                <span className="mr-2 text-3xl">🦄</span>
                <span className="hidden sm:inline">Unicorn Renovations</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
                <a href="#services" className="group transition-colors">Services<span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-brand-gold"></span></a>
                <a href="#process" className="group transition-colors">Process<span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-brand-gold"></span></a>
                <a href="#portfolio" className="group transition-colors">Portfolio<span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-brand-gold"></span></a>
                <a href="#contact" className="bg-brand-dark text-white hover:bg-brand-gold hover:text-black font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-105">
                    Free Consultation
                </a>
            </div>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
                <svg className="w-6 h-6 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
        </div>
        {mobileMenuOpen && (
            <div className="md:hidden bg-white shadow-xl">
                <div className="flex flex-col space-y-2 p-4">
                    <a href="#services" className="py-2 px-3 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>Services</a>
                    <a href="#process" className="py-2 px-3 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>Process</a>
                    <a href="#portfolio" className="py-2 px-3 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
                    <a href="#contact" className="py-3 px-3 mt-2 bg-brand-dark text-white text-center rounded-md hover:bg-brand-gold hover:text-black" onClick={() => setMobileMenuOpen(false)}>Free Consultation</a>
                </div>
            </div>
        )}
      </nav>

      <main>
        <section className="pt-32 pb-24 px-4 bg-gradient-to-b from-white to-brand-light sm:pt-40 sm:pb-32">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 animate-fade-in-up">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold font-heading text-brand-dark leading-tight mb-6 sm:text-5xl lg:text-6xl">
                Dubai's Premier <span className="text-brand-gold">Villa Renovation</span> Experts
              </h1>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed sm:text-xl">
                As Dubai's leading <strong>villa renovation company</strong>, we specialize in luxury <strong>home renovation</strong> and transformation services. Our expert <strong>renovation contractors</strong> deliver exceptional <strong>interior design</strong> and <strong>home remodeling</strong> solutions for discerning clients across Emirates Hills, Palm Jumeirah, and Downtown Dubai.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 justify-center md:justify-start">
                <a href="#contact" className="bg-brand-dark text-white hover:bg-brand-gold hover:text-black font-bold py-4 px-10 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
                  Book Free Consultation
                </a>
                <a href="#portfolio" className="border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white font-bold py-4 px-10 rounded-full transition-colors text-center">
                  View Our Villa Portfolio
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform md:rotate-3 transition-transform duration-500 hover:rotate-0 hover:scale-105">
                <Image src="/hero-villa.jpg" alt="Luxury Villa Renovation Dubai by Unicorn Renovations" width={700} height={500} className="object-cover w-full h-auto" priority />
              </div>
            </div>
          </div>
        </section>

        <AnimatedSection id="trust-metrics" className="py-24 bg-white px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold font-heading text-brand-dark mb-16 sm:text-4xl">Dubai's Trusted Villa Renovation Company</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-6">
                <div className="text-5xl font-extrabold font-heading text-brand-gold sm:text-6xl">15+</div>
                <h3 className="text-lg font-bold text-brand-dark mt-2">Years of Renovation Excellence</h3>
                <p className="text-gray-500 mt-2 text-sm">Specializing in luxury <strong>villa renovation services</strong> and <strong>home remodeling</strong> across Dubai.</p>
              </div>
              <div className="p-6">
                <div className="text-5xl font-extrabold font-heading text-brand-gold sm:text-6xl">800+</div>
                <h3 className="text-lg font-bold text-brand-dark mt-2">Luxury Villa Projects</h3>
                <p className="text-gray-500 mt-2 text-sm">Complete <strong>villa transformation</strong> and <strong>renovation</strong> projects delivered to perfection.</p>
              </div>
              <div className="p-6">
                <div className="text-5xl font-extrabold font-heading text-brand-gold sm:text-6xl">600+</div>
                <h3 className="text-lg font-bold text-brand-dark mt-2">Satisfied Dubai Clients</h3>
                <p className="text-gray-500 mt-2 text-sm">A 5-star rated <strong>renovation company</strong> for <strong>villa remodeling</strong> and <strong>interior design</strong>.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        <AnimatedSection id="services" className="py-24 bg-brand-light px-4">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-heading text-brand-dark mb-4 sm:text-4xl">Our Renovation Services</h2>
              <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">Comprehensive <strong>villa renovation</strong> and <strong>home remodeling services</strong> across Dubai.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="text-5xl mb-5">{service.icon}</div>
                  <h3 className="text-xl font-bold font-heading text-brand-dark mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="process" className="py-24 bg-white px-4">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-heading text-brand-dark mb-4 sm:text-4xl">Our Villa Renovation Process</h2>
              <p className="text-lg text-gray-600 mb-20 max-w-3xl mx-auto">A seamless journey from vision to reality, meticulously planned for your <strong>home renovation</strong>.</p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" aria-hidden="true"></div>
              <div className="space-y-16">
                <div className="relative flex md:items-center flex-col md:flex-row"><div className="md:w-1/2 md:pr-16 text-center md:text-right"><div className="text-5xl font-extrabold font-heading text-brand-gold mb-2">01</div><h3 className="text-xl font-bold font-heading text-brand-dark mb-3">Consultation & Planning</h3><p className="text-gray-600">We discuss your <strong>villa renovation</strong> vision and create a customized plan for your <strong>home remodeling</strong> project.</p></div><div className="md:w-1/2 md:pl-16"></div></div>
                <div className="relative flex md:items-center flex-col md:flex-row"><div className="md:w-1/2 md:pr-16"></div><div className="md:w-1/2 md:pl-16 text-center md:text-left"><div className="text-5xl font-extrabold font-heading text-brand-gold mb-2">02</div><h3 className="text-xl font-bold font-heading text-brand-dark mb-3">Design Development</h3><p className="text-gray-600">Our <strong>interior design</strong> team creates detailed plans and 3D renders for your <strong>villa transformation</strong>.</p></div></div>
                <div className="relative flex md:items-center flex-col md:flex-row"><div className="md:w-1/2 md:pr-16 text-center md:text-right"><div className="text-5xl font-extrabold font-heading text-brand-gold mb-2">03</div><h3 className="text-xl font-bold font-heading text-brand-dark mb-3">Exquisite Execution</h3><p className="text-gray-600">Our <strong>renovation contractors</strong> bring your <strong>villa renovation</strong> to life with precision craftsmanship.</p></div><div className="md:w-1/2 md:pl-16"></div></div>
                <div className="relative flex md:items-center flex-col md:flex-row"><div className="md:w-1/2 md:pr-16"></div><div className="md:w-1/2 md:pl-16 text-center md:text-left"><div className="text-5xl font-extrabold font-heading text-brand-gold mb-2">04</div><h3 className="text-xl font-bold font-heading text-brand-dark mb-3">Final Reveal</h3><p className="text-gray-600">We present your transformed <strong>villa renovation</strong>, ensuring every detail exceeds expectations.</p></div></div>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        <AnimatedSection id="portfolio" className="py-24 bg-brand-light px-4">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-heading text-brand-dark mb-4 sm:text-4xl">Our Villa Renovation Portfolio</h2>
              <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">Explore our <strong>villa transformation</strong> and <strong>home renovation</strong> projects.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((p, index) => (
                <div key={index} className="group rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
                  <Image src={p.img} alt={`${p.title} - Villa Renovation Project`} width={600} height={400} className="object-cover w-full h-72" />
                  <div className="p-6 bg-white">
                    <h3 className="text-lg font-bold font-heading text-brand-dark">{p.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{p.fullDesc}</p>
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
              {testimonials.map((t, index) => (
                <div key={index} className="bg-brand-light p-8 rounded-2xl border border-gray-100 relative">
                  <span className="absolute top-4 left-6 text-8xl text-brand-gold font-heading opacity-10" aria-hidden="true">“</span>
                  <p className="italic text-gray-700 mt-8 mb-6 z-10 relative">"{t.text}"</p>
                  <div className="flex items-center">
                    <Image src={t.img} alt={t.name} width={50} height={50} className="rounded-full" />
                    <div className="ml-4">
                      <h4 className="font-bold text-brand-dark">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t.location} Renovation Client</p>
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
                <p className="text-gray-300">Our specialist will contact you within 24 hours to discuss your <strong>villa renovation</strong> project.</p>
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
                  <option>Bathroom Renovation</option>
                </select>
                <textarea placeholder="Tell us about your project..." rows={4} className="w-full px-5 py-3 bg-gray-800 border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-brand-gold focus:outline-none"></textarea>
                <button type="submit" className="w-full bg-brand-gold hover:bg-yellow-500 text-black font-bold py-4 rounded-lg transition-all transform hover:scale-105">
                  Request Free Renovation Consultation
                </button>
              </form>
            )}
          </div>
        </AnimatedSection>
        
        <AnimatedSection id="faq" className="py-24 bg-white px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold font-heading text-brand-dark mb-4 sm:text-4xl">Villa Renovation FAQs</h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">Common questions about our <strong>renovation services</strong> and <strong>villa transformation</strong> process.</p>
                </div>
                <div className="space-y-4">
                    <FaqItem
                        question="How long does a villa renovation take?"
                        answer="The timeline for your villa renovation depends on the scope of work. Most complete villa transformations take 3-5 months. We provide a detailed timeline during our initial renovation consultation."
                    />
                    <FaqItem
                        question="Do you handle permits for villa extensions?"
                        answer="Yes, as experienced renovation contractors, we manage all necessary permits and approvals for villa extensions and home renovations in Dubai. Our team is familiar with local regulations."
                    />
                    <FaqItem
                        question="What makes your renovation company different?"
                        answer="Our exclusive focus on luxury villa renovations, meticulous attention to detail, master craftsmen, premium materials, and personalized service set us apart from other renovation companies."
                    />
                </div>
            </div>
        </AnimatedSection>

        <footer className="bg-brand-light text-gray-700 py-16 px-4">
          <div className="container mx-auto grid grid-cols-1 gap-8 text-center sm:grid-cols-2 md:grid-cols-4 sm:text-left">
            <div>
              <h3 className="font-bold font-heading text-lg mb-4 text-brand-dark">Unicorn Renovations</h3>
              <p className="text-gray-600 text-sm">Dubai's premier <strong>renovation company</strong> specializing in luxury <strong>villa transformations</strong>, <strong>home remodeling</strong>, and <strong>interior design</strong>.</p>
            </div>
            <div>
              <h4 className="font-bold font-heading text-lg mb-4 text-brand-dark">Renovation Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-brand-gold">Villa Renovation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-brand-gold">Kitchen Remodeling</a></li>
                <li><a href="#" className="text-gray-600 hover:text-brand-gold">Bathroom Renovation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-brand-gold">Villa Extension</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold font-heading text-lg mb-4 text-brand-dark">Areas We Serve</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-brand-gold">Emirates Hills</a></li>
                <li><a href="#" className="text-gray-600 hover:text-brand-gold">Palm Jumeirah</a></li>
                <li><a href="#" className="text-gray-600 hover:text-brand-gold">Downtown Dubai</a></li>
                <li><a href="#" className="text-gray-600 hover:text-brand-gold">Dubai Hills</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold font-heading text-lg mb-4 text-brand-dark">Contact Experts</h4>
              <address className="text-gray-600 not-italic text-sm">
                <p>Al Wasl Road, Jumeirah 1</p>
                <p>Dubai, UAE</p>
                <p>+971 50 123 4567</p>
              </address>
            </div>
          </div>
          <div className="container mx-auto border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Unicorn Renovations. All rights reserved.</p>
          </div>
        </footer>
      </main>
      
      <a href={`https://wa.me/971501234567?text=Hello! I'm interested in your villa renovation services. The current date is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.985 0 11.125c0 1.963.545 3.87 1.58 5.54L0 24l7.6-2.39A12.64 12.64 0 0012 22.25c6.627 0 12-4.985 12-11.125S18.627 0 12 0z" /></svg>
      </a>
    </div>
  );
}
