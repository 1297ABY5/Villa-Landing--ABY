import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
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
        <title>Unicorn Renovations | Dubai's Premier Luxury Villa Transformation Experts</title>
        <meta
          name="description"
          content="Dubai's most trusted luxury villa renovation specialists with 15+ years of excellence. 800+ elite projects completed with precision craftsmanship. Book your complimentary design consultation today."
        />
        <meta name="keywords" content="luxury villa renovation dubai, emirates hills renovation, palm jumeirah home transformation, premium interior design dubai" />
      </Head>

      {/* NAVBAR */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-3xl font-display font-bold text-blue-900 flex items-center">
            <span className="mr-2">🦄</span> Unicorn Renovations
          </div>
          <div className="hidden md:flex space-x-10 text-gray-700 font-medium">
            <a href="#features" className="hover:text-amber-600 transition-colors">Why Choose Us</a>
            <a href="#process" className="hover:text-amber-600 transition-colors">Our Process</a>
            <a href="#portfolio" className="hover:text-amber-600 transition-colors">Portfolio</a>
            <a href="#testimonials" className="hover:text-amber-600 transition-colors">Testimonials</a>
            <a href="#contact" className="hover:text-amber-600 transition-colors">Contact</a>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button would go here */}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-36 pb-28 px-6 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h1 className="text-6xl font-display font-extrabold text-blue-900 leading-tight mb-8">
              Where Visionary Design <br />
              <span className="bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
                Meets Impeccable Execution
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Dubai's most discerning homeowners trust us to transform their villas into extraordinary living spaces that embody elegance, sophistication, and uncompromising quality. From initial concept to final finishing touches, we deliver perfection.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="#contact"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-10 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 text-center"
              >
                Book Complimentary Design Consultation
              </a>
              <a
                href="#portfolio"
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-bold py-4 px-10 rounded-full transition-all duration-300 text-center"
              >
                Explore Our Masterpieces
              </a>
            </div>
            <div className="mt-8 flex items-center text-sm text-gray-500">
              <div className="flex items-center mr-6">
                <svg className="w-5 h-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>15+ Years Expertise</span>
              </div>
              <div className="flex items-center mr-6">
                <svg className="w-5 h-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>800+ Elite Projects</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-700">
            <Image src="/hero-villa.jpg" alt="Luxury Villa Transformation by Unicorn Renovations" width={650} height={450} className="object-cover w-full h-auto" />
          </div>
        </div>
      </section>

      {/* TRUST METRICS */}
      <section className="py-20 bg-white px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-display font-bold text-blue-900 mb-16">Trusted by Dubai's Most Discerning Homeowners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6">
              <div className="text-6xl font-bold text-amber-600">15+</div>
              <div className="text-lg text-gray-700 mt-2">Years of Uncompromising Excellence</div>
              <p className="text-gray-500 mt-3">Over a decade and a half perfecting the art of luxury villa transformations across Dubai's most exclusive communities</p>
            </div>
            <div className="p-6">
              <div className="text-6xl font-bold text-amber-600">800+</div>
              <div className="text-lg text-gray-700 mt-2">Elite Projects Completed</div>
              <p className="text-gray-500 mt-3">From Palm Jumeirah to Emirates Hills, we've delivered perfection to the most prestigious addresses in Dubai</p>
            </div>
            <div className="p-6">
              <div className="text-6xl font-bold text-amber-600">600+</div>
              <div className="text-lg text-gray-700 mt-2">Exceedingly Satisfied Clients</div>
              <p className="text-gray-500 mt-3">Our commitment to excellence has earned the trust of Dubai's most discerning homeowners and property investors</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-amber-50 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-display font-bold text-blue-900 mb-4">Why Elite Clients Choose Unicorn Renovations</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">Discover the unparalleled advantages that set us apart as Dubai's premier villa renovation specialists</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Precision Craftsmanship</h3>
              <p className="text-gray-600 leading-relaxed">Every millimeter is perfected with artisan-level attention to detail. We don't just meet expectations—we exceed them with flawless execution that stands the test of time.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Timely Perfection</h3>
              <p className="text-gray-600 leading-relaxed">Our meticulously planned process ensures your project is delivered on schedule without compromising quality. We respect your time as much as we value exceptional results.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Visionary Design</h3>
              <p className="text-gray-600 leading-relaxed">We create immersive living experiences that resonate with timeless elegance. Our designs don't just follow trends—they set them, ensuring your home remains a masterpiece for years to come.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-white px-6">
        <div className="container mx-auto">
          <h2 className="text-5xl font-display font-bold text-blue-900 mb-4 text-center">Our Meticulous Process</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto text-center">Experience the seamless journey from vision to reality with our carefully crafted renovation process</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-amber-700">1</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Discovery & Vision</h3>
              <p className="text-gray-600">We immerse ourselves in your lifestyle and aspirations to create a design concept that perfectly captures your vision</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-amber-700">2</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Detailed Planning</h3>
              <p className="text-gray-600">Our experts develop comprehensive plans, 3D visualizations, and precise timelines to ensure flawless execution</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-amber-700">3</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Exquisite Execution</h3>
              <p className="text-gray-600">Master craftsmen bring the design to life with precision, using only the finest materials and techniques</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-amber-700">4</span>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Final Reveal</h3>
              <p className="text-gray-600">We present your transformed space with a grand reveal, ensuring every detail exceeds your expectations</p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-blue-50 px-6">
        <div className="container mx-auto">
          <h2 className="text-5xl font-display font-bold text-blue-900 mb-4 text-center">Signature Masterpieces</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto text-center">Explore our portfolio of exceptional villa transformations across Dubai's most prestigious communities</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {portfolioItems.map((p, i) => (
              <div key={i} className="relative group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                <Image src={p.img} alt={p.title} width={450} height={320} className="object-cover w-full h-72 group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white">{p.title}</h3>
                  <p className="text-gray-200">{p.desc}</p>
                  <button className="mt-4 text-amber-300 hover:text-amber-100 font-medium self-start flex items-center">
                    View Project
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#" className="inline-flex items-center text-blue-900 hover:text-amber-600 font-bold">
              Explore Our Complete Portfolio
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-amber-50 px-6">
        <div className="container mx-auto">
          <h2 className="text-5xl font-display font-bold text-blue-900 mb-4 text-center">Praise From Our Distinguished Clients</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto text-center">Hear what Dubai's elite homeowners have to say about their experience with Unicorn Renovations</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <Image src={t.img} alt={t.name} width={70} height={70} className="rounded-full border-4 border-amber-400" />
                </div>
                <p className="italic text-gray-700 mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex justify-center text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, j) => <span key={j}>★</span>)}
                </div>
                <h4 className="font-bold text-blue-900 text-center">{t.name}</h4>
                <p className="text-gray-500 text-sm text-center">Emirates Hills Villa Owner</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-24 bg-gradient-to-b from-blue-900 to-blue-800 text-white px-6">
        <div className="container mx-auto max-w-3xl bg-white text-gray-800 rounded-3xl shadow-2xl p-12">
          {formSubmitted ? (
            <div className="text-center py-12">
              <svg className="w-20 h-20 text-green-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-3xl font-display font-bold text-blue-900 mb-4">Thank You!</h2>
              <p className="text-gray-600 mb-8">We've received your consultation request. Our design specialist will contact you within 24 hours to schedule your complimentary consultation.</p>
              <button onClick={() => setFormSubmitted(false)} className="text-amber-600 hover:text-amber-700 font-medium">
                Submit Another Request
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-4xl font-display font-bold text-blue-900 mb-4 text-center">Begin Your Transformation Journey</h2>
              <p className="text-gray-600 mb-8 text-center">Schedule your complimentary design consultation with our experts</p>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <input type="text" placeholder="Full Name*" required className="w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <input type="email" placeholder="Email Address*" required className="w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <input type="tel" placeholder="Phone Number*" required className="w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                  </div>
                  <div>
                    <select className="w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                      <option>Villa Renovation</option>
                      <option>Kitchen Remodel</option>
                      <option>Bathroom Renovation</option>
                      <option>Full Interior Design</option>
                      <option>Custom Built-ins</option>
                      <option>Outdoor Living Spaces</option>
                    </select>
                  </div>
                </div>
                <div>
                  <textarea placeholder="Tell us about your vision and requirements*" rows={4} required className="w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"></textarea>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="consent" required className="w-4 h-4 text-amber-600 focus:ring-amber-500" />
                  <label htmlFor="consent" className="ml-2 text-sm text-gray-600">I agree to receive communications about my project and exclusive design insights</label>
                </div>
                <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-5 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                  Request Complimentary Consultation
                </button>
                <p className="text-center text-sm text-gray-500">Your privacy is important to us. We never share your information with third parties.</p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-white px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-display font-bold text-blue-900 mb-4 text-center">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto text-center">Get answers to common questions about our luxury renovation process</p>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">How long does a typical villa renovation take?</h3>
              <p className="text-gray-600">The timeline varies based on project scope, but our average complete villa transformation takes 3-5 months. We provide a detailed timeline during our initial consultation and are known for our adherence to schedules.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Do you handle permits and approvals?</h3>
              <p className="text-gray-600">Yes, we manage all necessary permits and community approvals as part of our comprehensive service. Our team is experienced with Dubai's regulations and community requirements.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">What makes Unicorn Renovations different from other contractors?</h3>
              <p className="text-gray-600">Our exclusive focus on high-end villas, meticulous attention to detail, master craftsmen, premium material partnerships, and personalized service set us apart. We don't just renovate spaces—we create timeless masterpieces.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Can I see examples of similar projects before committing?</h3>
              <p className="text-gray-600">Absolutely. During your consultation, we'll share an extensive portfolio of completed projects and can arrange visits to recently finished villas (with owner permission) so you can experience our quality firsthand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-display font-bold text-2xl mb-6 flex items-center">
              <span className="mr-2">🦄</span> Unicorn Renovations
            </h3>
            <p className="text-blue-200 mb-5 leading-relaxed">Crafting extraordinary living experiences across Dubai's most prestigious communities since 2008.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Villa Renovation</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Kitchen Remodeling</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Bathroom Transformation</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Interior Design</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Custom Furniture</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Areas We Serve</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Emirates Hills</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Palm Jumeirah</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Downtown Dubai</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Dubai Hills</a></li>
              <li><a href="#" className="text-blue-200 hover:text-amber-400 transition-colors">Jumeirah</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <address className="text-blue-200 not-italic">
              <p className="mb-3">Design Studio #402</p>
              <p className="mb-3">Al Wasl Road, Jumeirah 1</p>
              <p className="mb-3">Dubai, United Arab Emirates</p>
              <p className="mb-3">+971 50 123 4567</p>
              <p className="mb-3">info@unicornrenovations.ae</p>
            </address>
          </div>
        </div>
        <div className="container mx-auto border-t border-blue-800 mt-12 pt-8 text-center">
          <p className="text-blue-300 text-sm">© {new Date().getFullYear()} Unicorn Renovations. All rights reserved.</p>
        </div>
      </footer>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/971501234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-5 rounded-full shadow-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
        aria-label="Chat with us on WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 4.985 0 11.125c0 1.963.545 3.87 1.58 5.54L0 24l7.6-2.39A12.64 12.64 0 0012 22.25c6.627 0 12-4.985 12-11.125S18.627 0 12 0z" />
        </svg>
      </a>
    </div>
  );
}
