import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const portfolioItems = [
    { img: "/villa1.jpg", title: "Emirates Hills Villa", desc: "Ultra-modern transformation" },
    { img: "/villa2.jpg", title: "Palm Jumeirah Spa", desc: "Resort-style bathroom" },
    { img: "/villa3.jpg", title: "Downtown Penthouse", desc: "Luxury kitchen remodel" },
  ];

  const testimonials = [
    { name: "Ahmed R.", text: "Unicorn Renovations transformed our villa into a masterpiece. Worth every dirham.", img: "/client1.jpg", rating: 5 },
    { name: "Layla M.", text: "The 3D design gave us total confidence. The final execution exceeded our expectations.", img: "/client2.jpg", rating: 5 },
    { name: "Omar S.", text: "Delivered ahead of schedule with luxury quality. Highly recommend them.", img: "/client3.jpg", rating: 5 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Head>
        <title>Luxury Villa Renovation Dubai | Premium Home Transformation | Unicorn Renovations</title>
        <meta
          name="description"
          content="Dubai's premier villa renovation company with 15+ years expertise. Specialists in luxury villa remodeling, interior design, and home renovation services across Emirates Hills, Palm Jumeirah & Downtown Dubai."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="villa renovation, villa renovation dubai, home renovation, renovation company, renovation contractors, interior design, home remodeling, bathroom remodel, kitchen remodel, villa extension, villa remodeling, villa restoration, villa renovation services, villa renovation contractors, villa interior design, villa modification, villa makeover, villa refurbishment, home renovation services, renovation experts, interior renovation company" />
      </Head>

      {/* NAVBAR */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900 flex items-center">
            <span className="mr-2">🦄</span> <span className="hidden sm:inline">Unicorn Renovations</span>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-blue-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <a href="#features" className="hover:text-amber-600 transition-colors">Why Choose Us</a>
            <a href="#process" className="hover:text-amber-600 transition-colors">Our Process</a>
            <a href="#portfolio" className="hover:text-amber-600 transition-colors">Portfolio</a>
            <a href="#testimonials" className="hover:text-amber-600 transition-colors">Testimonials</a>
            <a href="#contact" className="hover:text-amber-600 transition-colors">Free Consultation</a>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white px-4 py-4 shadow-lg">
            <div className="flex flex-col space-y-3">
              <a href="#features" className="text-blue-900 hover:text-amber-600 py-2" onClick={() => setMobileMenuOpen(false)}>Why Choose Us</a>
              <a href="#process" className="text-blue-900 hover:text-amber-600 py-2" onClick={() => setMobileMenuOpen(false)}>Our Process</a>
              <a href="#portfolio" className="text-blue-900 hover:text-amber-600 py-2" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
              <a href="#testimonials" className="text-blue-900 hover:text-amber-600 py-2" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
              <a href="#contact" className="text-blue-900 hover:text-amber-600 py-2" onClick={() => setMobileMenuOpen(false)}>Free Consultation</a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-b from-white to-amber-50 sm:pt-32 sm:pb-28 sm:px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-blue-900 leading-tight mb-6 sm:text-5xl lg:text-6xl">
              Dubai's Premier <span className="text-amber-600">Villa Renovation</span> Experts
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed sm:text-xl">
              As Dubai's leading <strong>villa renovation company</strong>, we specialize in luxury <strong>home renovation</strong> and transformation services. Our expert <strong>renovation contractors</strong> deliver exceptional <strong>interior design</strong> and <strong>home remodeling</strong> solutions for discerning clients across Emirates Hills, Palm Jumeirah, and Downtown Dubai.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 justify-center md:justify-start">
              <a
                href="#contact"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-center"
              >
                Book Free Consultation
              </a>
              <a
                href="#portfolio"
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-bold py-4 px-8 rounded-full transition-all duration-300 text-center"
              >
                View Our Villa Portfolio
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>15+ Years Renovation Expertise</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>800+ Villa Transformation Projects</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative rounded-2xl overflow-hidden shadow-xl mt-8 md:mt-0 transform hover:scale-105 transition duration-700">
            <Image 
              src="/hero-villa.jpg" 
              alt="Luxury Villa Renovation Dubai by Unicorn Renovations - Villa Transformation Experts" 
              width={650} 
              height={450} 
              className="object-cover w-full h-auto" 
            />
          </div>
        </div>
      </section>

      {/* TRUST METRICS */}
      <section className="py-16 bg-white px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-12 sm:text-4xl">Dubai's Trusted Villa Renovation Company</h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div className="p-6">
              <div className="text-5xl font-bold text-amber-600 sm:text-6xl">15+</div>
              <div className="text-lg text-gray-700 mt-2">Years of Renovation Excellence</div>
              <p className="text-gray-500 mt-3 text-sm">Specializing in luxury <strong>villa renovation services</strong> and <strong>home remodeling</strong> across Dubai</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-amber-600 sm:text-6xl">800+</div>
              <div className="text-lg text-gray-700 mt-2">Luxury Villa Projects</div>
              <p className="text-gray-500 mt-3 text-sm">Complete <strong>villa transformation</strong> and <strong>renovation</strong> projects completed</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-amber-600 sm:text-6xl">600+</div>
              <div className="text-lg text-gray-700 mt-2">Satisfied Dubai Clients</div>
              <p className="text-gray-500 mt-3 text-sm">5-star rated <strong>renovation company</strong> for <strong>villa remodeling</strong> and <strong>interior design</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16 bg-amber-50 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 sm:text-4xl">Why Choose Our Villa Renovation Services</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">Discover why we're Dubai's preferred <strong>renovation contractors</strong> for luxury <strong>villa transformation</strong> and <strong>home renovation</strong> projects</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Expert Renovation Contractors</h3>
              <p className="text-gray-600 leading-relaxed">Our team of skilled <strong>renovation experts</strong> delivers precision craftsmanship for your <strong>villa renovation</strong> or <strong>home remodeling</strong> project.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Complete Home Renovation Services</h3>
              <p className="text-gray-600 leading-relaxed">From <strong>villa extension</strong> to <strong>interior renovation</strong>, we provide comprehensive <strong>renovation services</strong> for your entire home.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Luxury Interior Design</h3>
              <p className="text-gray-600 leading-relaxed">Our <strong>interior design</strong> team creates stunning spaces for your <strong>villa renovation</strong> or <strong>apartment interior design</strong> project.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-16 bg-white px-4 sm:px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center sm:text-4xl">Our Villa Renovation Process</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto text-center">Experience our meticulous approach to <strong>home renovation</strong> and <strong>villa transformation</strong></p>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto sm:w-20 sm:h-20">
                <span className="text-xl font-bold text-amber-700 sm:text-2xl">1</span>
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-3 sm:text-xl">Consultation & Planning</h3>
              <p className="text-gray-600 text-sm">We discuss your <strong>villa renovation</strong> vision and create a customized plan for your <strong>home remodeling</strong> project</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto sm:w-20 sm:h-20">
                <span className="text-xl font-bold text-amber-700 sm:text-2xl">2</span>
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-3 sm:text-xl">Design Development</h3>
              <p className="text-gray-600 text-sm">Our <strong>interior design</strong> team creates detailed plans for your <strong>villa transformation</strong> or <strong>home renovation</strong></p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto sm:w-20 sm:h-20">
                <span className="text-xl font-bold text-amber-700 sm:text-2xl">3</span>
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-3 sm:text-xl">Exquisite Execution</h3>
              <p className="text-gray-600 text-sm">Our <strong>renovation contractors</strong> bring your <strong>villa renovation</strong> to life with precision craftsmanship</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto sm:w-20 sm:h-20">
                <span className="text-xl font-bold text-amber-700 sm:text-2xl">4</span>
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-3 sm:text-xl">Final Reveal</h3>
              <p className="text-gray-600 text-sm">We present your transformed <strong>villa renovation</strong> project, ensuring every detail exceeds expectations</p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-16 bg-blue-50 px-4 sm:px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center sm:text-4xl">Our Villa Renovation Portfolio</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto text-center">Explore our exceptional <strong>villa transformation</strong> and <strong>home renovation</strong> projects across Dubai's most prestigious communities</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {portfolioItems.map((p, i) => (
              <div key={i} className="relative group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                <Image src={p.img} alt={`${p.title} - Villa Renovation Project by Unicorn Renovations`} width={450} height={320} className="object-cover w-full h-64 group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">{p.title}</h3>
                  <p className="text-gray-200">{p.desc}</p>
                  <button className="mt-4 text-amber-300 hover:text-amber-100 font-medium self-start flex items-center text-sm">
                    View Renovation Project
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#" className="inline-flex items-center text-blue-900 hover:text-amber-600 font-bold text-sm">
              Explore Our Complete Renovation Portfolio
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 bg-white px-4 sm:px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center sm:text-4xl">Comprehensive Renovation Services</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto text-center">From <strong>villa extension</strong> to <strong>interior renovation</strong>, we offer complete <strong>home renovation services</strong></p>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-amber-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Villa Renovation & Remodeling</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Complete <strong>villa transformation</strong>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <strong>Villa extension</strong> and expansion
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <strong>Villa restoration</strong> and refurbishment
                </li>
              </ul>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Interior Renovation Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <strong>Interior design</strong> and decoration
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <strong>Kitchen remodel</strong> and renovation
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <strong>Bathroom remodel</strong> and transformation
                </li>
              </ul>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Specialized Renovation Solutions</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <strong>Apartment interior design</strong>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <strong>Penthouse interior renovation</strong>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <strong>Custom home renovation</strong> solutions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-16 bg-amber-50 px-4 sm:px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center sm:text-4xl">What Our Renovation Clients Say</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto text-center">Hear from homeowners who trusted our <strong>renovation company</strong> for their <strong>villa transformation</strong> projects</p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <Image src={t.img} alt={t.name} width={70} height={70} className="rounded-full border-4 border-amber-400" />
                </div>
                <p className="italic text-gray-700 mb-6 leading-relaxed text-sm">"{t.text}"</p>
                <div className="flex justify-center text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, j) => <span key={j}>★</span>)}
                </div>
                <h4 className="font-bold text-blue-900 text-center">{t.name}</h4>
                <p className="text-gray-500 text-sm text-center">Emirates Hills Villa Renovation Client</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-16 bg-gradient-to-b from-blue-900 to-blue-800 text-white px-4 sm:px-6">
        <div className="container mx-auto max-w-2xl bg-white text-gray-800 rounded-2xl shadow-2xl p-8 sm:p-12">
          {formSubmitted ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-green-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-blue-900 mb-4 sm:text-3xl">Thank You!</h2>
              <p className="text-gray-600 mb-8">We've received your <strong>renovation consultation</strong> request. Our design specialist will contact you within 24 hours to discuss your <strong>villa renovation</strong> project.</p>
              <button onClick={() => setFormSubmitted(false)} className="text-amber-600 hover:text-amber-700 font-medium">
                Submit Another Request
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center sm:text-3xl">Start Your Villa Renovation Journey</h2>
              <p className="text-gray-600 mb-8 text-center text-sm">Schedule your complimentary <strong>renovation consultation</strong> with our experts</p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <input type="text" placeholder="Full Name*" required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <input type="email" placeholder="Email Address*" required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <input type="tel" placeholder="Phone Number*" required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <select className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                      <option>Villa Renovation</option>
                      <option>Kitchen Remodel</option>
                      <option>Bathroom Renovation</option>
                      <option>Villa Extension</option>
                      <option>Interior Design</option>
                      <option>Home Remodeling</option>
                      <option>Apartment Renovation</option>
                      <option>Penthouse Renovation</option>
                    </select>
                  </div>
                </div>
                <div>
                  <textarea placeholder="Tell us about your renovation project*" rows={4} required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"></textarea>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="consent" required className="w-4 h-4 text-amber-600 focus:ring-amber-500" />
                  <label htmlFor="consent" className="ml-2 text-sm text-gray-600">I agree to receive communications about my renovation project</label>
                </div>
                <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Request Free Renovation Consultation
                </button>
                <p className="text-center text-xs text-gray-500">Your privacy is important to us. We never share your information with third parties.</p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 bg-white px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center sm:text-4xl">Villa Renovation FAQs</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto text-center">Common questions about our <strong>renovation services</strong> and <strong>villa transformation</strong> process</p>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">How long does a villa renovation take?</h3>
              <p className="text-gray-600 text-sm">The timeline for your <strong>villa renovation</strong> depends on the scope of work. Most complete <strong>villa transformations</strong> take 3-5 months. We provide a detailed timeline during our initial <strong>renovation consultation</strong>.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Do you handle permits for villa extensions?</h3>
              <p className="text-gray-600 text-sm">Yes, as experienced <strong>renovation contractors</strong>, we manage all necessary permits and approvals for <strong>villa extensions</strong> and <strong>home renovations</strong> in Dubai. Our team is familiar with local regulations.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">What makes your renovation company different?</h3>
              <p className="text-gray-600 text-sm">Our exclusive focus on luxury <strong>villa renovations</strong>, meticulous attention to detail, master craftsmen, premium materials, and personalized service set us apart from other <strong>renovation companies</strong>.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Do you offer interior design services?</h3>
              <p className="text-gray-600 text-sm">Yes, we provide comprehensive <strong>interior design</strong> services as part of our <strong>renovation packages</strong>. Our design team creates cohesive spaces that reflect your style while ensuring functionality.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Can you work with my existing furniture?</h3>
              <p className="text-gray-600 text-sm">Absolutely. Our <strong>interior design</strong> experts can incorporate your existing furniture into the new design or recommend pieces that complement your <strong>villa renovation</strong>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white py-12 px-4 sm:px-6">
        <div className="container mx-auto grid grid-cols-1 gap-8 text-center sm:grid-cols-2 md:grid-cols-4 sm:text-left">
          <div>
            <h3 className="font-bold text-xl mb-4 flex items-center justify-center sm:justify-start">
              <span className="mr-2">🦄</span> Unicorn Renovations
            </h3>
            <p className="text-blue-200 text-sm mb-5">Dubai's premier <strong>renovation company</strong> specializing in luxury <strong>villa transformations</strong>, <strong>home remodeling</strong>, and <strong>interior design</strong> services.</p>
            <div className="flex space-x-4 justify-center sm:justify-start">
              <a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-3">Renovation Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Villa Renovation</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Kitchen Remodeling</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Bathroom Transformation</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Interior Design</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Villa Extension</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Home Remodeling</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Areas We Serve</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Emirates Hills</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Palm Jumeirah</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Downtown Dubai</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Dubai Hills</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Jumeirah</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Arabian Ranches</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Contact Our Renovation Experts</h4>
            <address className="text-blue-200 not-italic text-sm">
              <p className="mb-2">Design Studio #402</p>
              <p className="mb-2">Al Wasl Road, Jumeirah 1</p>
              <p className="mb-2">Dubai, United Arab Emirates</p>
              <p className="mb-2">+971 50 123 4567</p>
              <p className="mb-2">info@unicornrenovations.ae</p>
            </address>
          </div>
        </div>
        <div className="container mx-auto border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-blue-300 text-xs">© {new Date().getFullYear()} Unicorn Renovations - Dubai's Premier Villa Renovation Company. All rights reserved.</p>
        </div>
      </footer>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/971501234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 sm:bottom-6 sm:right-6 sm:p-4"
        aria-label="Chat with our renovation experts on WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 4.985 0 11.125c0 1.963.545 3.87 1.58 5.54L0 24l7.6-2.39A12.64 12.64 0 0012 22.25c6.627 0 12-4.985 12-11.125S18.627 0 12 0z" />
        </svg>
      </a>
    </div>
  );
}
