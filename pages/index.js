import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const portfolioItems = [
    {
      img: "/villa1.jpg",
      title: "Emirates Hills Villa",
      desc: "Ultra-modern transformation",
      fullDesc:
        "A complete villa renovation with contemporary design elements, open spaces, and smart home integration.",
    },
    {
      img: "/villa2.jpg",
      title: "Palm Jumeirah Spa",
      desc: "Resort-style bathroom",
      fullDesc:
        "Luxury bathroom renovation inspired by five-star resort designs with premium imported finishes.",
    },
    {
      img: "/villa3.jpg",
      title: "Downtown Penthouse",
      desc: "Luxury kitchen remodel",
      fullDesc:
        "High-end kitchen renovation featuring custom cabinetry, marble counters, and professional-grade appliances.",
    },
  ];

  const testimonials = [
    {
      name: "Ahmed R.",
      text: "Unicorn Renovations transformed our villa into a masterpiece. Worth every dirham.",
      img: "/client1.jpg",
      rating: 5,
      location: "Emirates Hills",
    },
    {
      name: "Layla M.",
      text: "The 3D design gave us complete confidence. The final result exceeded expectations.",
      img: "/client2.jpg",
      rating: 5,
      location: "Palm Jumeirah",
    },
    {
      name: "Omar S.",
      text: "Delivered ahead of schedule with unmatched quality. Highly recommend them.",
      img: "/client3.jpg",
      rating: 5,
      location: "Downtown Dubai",
    },
  ];

  const services = [
    {
      title: "Villa Renovation",
      description: "Luxury home transformations for Dubai’s most prestigious villas.",
      icon: "🏠",
    },
    {
      title: "Kitchen Remodeling",
      description: "Custom kitchen designs with premium cabinetry and appliances.",
      icon: "👨‍🍳",
    },
    {
      title: "Bathroom Renovation",
      description: "Spa-inspired bathroom upgrades with world-class finishes.",
      icon: "🚿",
    },
    {
      title: "Interior Design",
      description: "Comprehensive design services tailored to your lifestyle.",
      icon: "🎨",
    },
    {
      title: "Villa Extension",
      description: "Seamless villa expansions and structural enhancements.",
      icon: "📐",
    },
    {
      title: "Penthouse Renovation",
      description: "Exclusive penthouse transformations with a luxury touch.",
      icon: "🏙️",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Head>
        <title>
          Luxury Villa Renovation Dubai | Unicorn Renovations
        </title>
        <meta
          name="description"
          content="Dubai's premier villa renovation specialists with 15+ years of experience. Experts in villa remodeling, extensions, interiors, and luxury transformations across Emirates Hills, Palm Jumeirah & Downtown Dubai."
        />
        <meta
          name="keywords"
          content="villa renovation dubai, villa remodeling, home renovation, interior design, villa extension, kitchen remodel dubai, bathroom renovation dubai"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900 flex items-center">
            <span className="mr-2">🦄</span>
            <span className="hidden sm:inline">Unicorn Renovations</span>
          </div>
          <button
            className="md:hidden p-2 text-blue-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
          <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <a href="#services" className="hover:text-amber-600">
              Services
            </a>
            <a href="#process" className="hover:text-amber-600">
              Process
            </a>
            <a href="#portfolio" className="hover:text-amber-600">
              Portfolio
            </a>
            <a href="#testimonials" className="hover:text-amber-600">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-amber-600">
              Consultation
            </a>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-3">
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Consultation</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-900 leading-tight mb-6">
              Transform Your Villa Into a Luxury Masterpiece
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8">
              From Emirates Hills to Palm Jumeirah, Unicorn Renovations
              redefines luxury living with world-class villa renovation,
              extensions, and interiors designed for Dubai’s elite.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition transform hover:scale-105"
              >
                Free Consultation
              </a>
              <a
                href="#portfolio"
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-bold py-4 px-8 rounded-full transition"
              >
                View Portfolio
              </a>
            </div>
          </div>
          <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/hero-villa.jpg"
              alt="Dubai Luxury Villa Renovation"
              width={650}
              height={450}
              className="object-cover w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-amber-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">
            Our Renovation Services
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            From complete villa makeovers to spa-inspired bathrooms and designer
            kitchens, we bring your vision to life with unmatched precision.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 bg-blue-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">
            Our Signature Projects
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            A glimpse of the iconic transformations we’ve delivered in Dubai’s
            most exclusive neighborhoods.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioItems.map((p, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden shadow-lg group"
              >
                <Image
                  src={p.img}
                  alt={p.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-64"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">{p.title}</h3>
                  <p className="text-gray-200">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-amber-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Hear from homeowners who trusted us with their villa transformations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <p className="italic text-gray-700 mb-6">"{t.text}"</p>
                <div className="text-amber-500 mb-4">
                  {"★".repeat(t.rating)}
                </div>
                <h4 className="font-bold text-blue-900">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto max-w-2xl bg-white text-gray-800 p-8 sm:p-12 rounded-2xl shadow-2xl">
          {formSubmitted ? (
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Thank You!
              </h2>
              <p className="text-gray-600 mb-6">
                We’ve received your request. Our design specialist will call you
                within 24 hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-amber-600 hover:text-amber-700"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-900 text-center mb-6">
                Start Your Renovation Journey
              </h2>
              <input
                type="text"
                placeholder="Full Name*"
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email Address*"
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="tel"
                placeholder="Phone Number*"
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <textarea
                placeholder="Tell us about your project*"
                rows={4}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-lg"
              >
                Request Free Consultation
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto text-center text-sm">
          <p>
            © {new Date().getFullYear()} Unicorn Renovations — Dubai’s Premier
            Villa Renovation Company. All rights reserved.
          </p>
        </div>
      </footer>

      {/* WhatsApp CTA */}
      <a
        href="https://wa.me/971501234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-110"
      >
        💬
      </a>
    </div>
  );
}
