import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const features = [
    { title: "Dubai Municipality Certified", desc: "Fully compliant with local laws & building codes.", icon: "🏛️" },
    { title: "15+ Years of Excellence", desc: "Trusted by Dubai’s most prestigious communities.", icon: "🌟" },
    { title: "3D Luxury Visualization", desc: "Photorealistic previews before execution.", icon: "🏠" },
  ];

  const portfolioItems = [
    { img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1087&q=80", title: "Emirates Hills Villa", desc: "Ultra-modern transformation" },
    { img: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?auto=format&fit=crop&w=1170&q=80", title: "Palm Jumeirah Spa", desc: "Resort-style bathroom" },
    { img: "https://images.unsplash.com/photo-1600566753052-d7f4e46f5d20?auto=format&fit=crop&w=1170&q=80", title: "Downtown Penthouse", desc: "Luxury kitchen remodel" },
  ];

  const testimonials = [
    { name: "Ahmed R.", text: "Unicorn Renovations transformed our villa into a masterpiece. Worth every dirham.", img: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5 },
    { name: "Layla M.", text: "The 3D design gave us total confidence. The final execution exceeded our expectations.", img: "https://randomuser.me/api/portraits/women/44.jpg", rating: 5 },
    { name: "Omar S.", text: "Delivered ahead of schedule with luxury quality. Highly recommend them.", img: "https://randomuser.me/api/portraits/men/65.jpg", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      <Head>
        <title>Unicorn Renovations | Dubai’s Luxury Villa Experts</title>
        <meta name="description" content="Dubai’s premium villa renovation specialists. 3D designs, certified quality, and 15+ years of luxury experience." />
      </Head>

      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold text-blue-900">🦄 Unicorn</div>
          <div className="hidden md:flex space-x-10 text-gray-700 font-medium">
            <a href="#features" className="hover:text-amber-600">Features</a>
            <a href="#portfolio" className="hover:text-amber-600">Portfolio</a>
            <a href="#testimonials" className="hover:text-amber-600">Testimonials</a>
            <a href="#contact" className="hover:text-amber-600">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-5xl font-extrabold text-blue-900 leading-tight mb-6">
              Redefine Your Villa with <span className="text-amber-600">Luxury Renovations</span>
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              From Palm Jumeirah to Emirates Hills, we create homes that exude prestige, sophistication, and timeless design.
            </p>
            <div className="bg-amber-100 p-4 rounded-lg mb-6 inline-block">
              <div className="text-sm text-amber-800">Exclusive Offer Ends In</div>
              <div className="text-3xl font-bold text-amber-700">{formatTime(timeLeft)}</div>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => setIsModalOpen(true)} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">
                Book Free Consultation
              </button>
              <a href="#portfolio" className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-bold py-3 px-8 rounded-full transition">
                View Portfolio
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative rounded-2xl overflow-hidden shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1050&q=80" alt="Luxury Villa" width={600} height={400} className="object-cover w-full h-auto" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <p className="text-sm">Featured Project</p>
              <h3 className="text-2xl font-bold">Emirates Hills Villa</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-12">Why Elite Clients Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-amber-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 bg-amber-50 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-12">Luxury Projects Across Dubai</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioItems.map((p, i) => (
              <div key={i} className="relative group rounded-2xl overflow-hidden shadow-lg">
                <Image src={p.img} alt={p.title} width={400} height={300} className="object-cover w-full h-64 group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition">
                  <h3 className="text-xl font-bold text-white">{p.title}</h3>
                  <p className="text-gray-200">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-amber-50 p-8 rounded-2xl shadow-lg">
                <div className="flex justify-center mb-4">
                  <Image src={t.img} alt={t.name} width={60} height={60} className="rounded-full border-4 border-amber-400" />
                </div>
                <p className="italic text-gray-700 mb-4">“{t.text}”</p>
                <div className="flex justify-center text-amber-500 mb-2">
                  {[...Array(t.rating)].map((_, j) => <span key={j}>★</span>)}
                </div>
                <h4 className="font-bold text-blue-900">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gradient-to-b from-blue-900 to-blue-800 text-white px-6">
        <div className="container mx-auto max-w-3xl bg-white text-gray-800 rounded-2xl shadow-2xl p-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Book Your Free Consultation</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Full Name" className="w-full px-4 py-3 border rounded-lg" />
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 border rounded-lg" />
              <select className="w-full px-4 py-3 border rounded-lg">
                <option>Villa Renovation</option>
                <option>Kitchen Remodel</option>
                <option>Bathroom Renovation</option>
                <option>Full Interior Design</option>
              </select>
            </div>
            <textarea placeholder="Project Details" rows={4} className="w-full px-4 py-3 border rounded-lg"></textarea>
            <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-lg shadow-lg transition">Submit Request</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-10">
        <div className="container mx-auto text-center">
          <h3 className="font-bold text-xl mb-2">🦄 Unicorn Renovations</h3>
          <p className="text-blue-200 mb-4">Crafting Luxury Homes Across Dubai</p>
          <p className="text-blue-300 text-sm">© {new Date().getFullYear()} Unicorn Renovations. All rights reserved.</p>
        </div>
      </footer>

      {/* WhatsApp */}
      <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472..."/></svg>
      </a>
    </div>
  );
}
