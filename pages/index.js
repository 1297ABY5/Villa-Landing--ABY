import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter, Playfair_Display } from 'next/font/google';

// --- FONT OPTIMIZATION ---
// This downloads the fonts at build time for best performance and zero layout shift.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const portfolioItems = [
    { img: '/villa1.jpg', title: 'Emirates Hills Villa', desc: 'Ultra-modern transformation' },
    { img: '/villa2.jpg', title: 'Palm Jumeirah Spa', desc: 'Resort-style bathroom' },
    { img: '/villa3.jpg', title: 'Downtown Penthouse', desc: 'Luxury kitchen remodel' },
  ];

  const testimonials = [
    { name: 'Ahmed R.', text: 'Unicorn Renovations transformed our villa into a masterpiece. Worth every dirham.', img: '/client1.jpg', rating: 5 },
    { name: 'Layla M.', text: 'The 3D design gave us total confidence. The final execution exceeded our expectations.', img: '/client2.jpg', rating: 5 },
    { name: 'Omar S.', text: 'Delivered ahead of schedule with luxury quality. Highly recommend them.', img: '/client3.jpg', rating: 5 },
  ];

  return (
    <div className={`${inter.variable} ${playfairDisplay.variable} min-h-screen bg-white font-sans`}>
      <Head>
        <title>Unicorn Renovations | Dubai’s Luxury Villa Experts</title>
        <meta name="description" content="Dubai’s premium villa renovation specialists. We align your home with your success. Book your private portfolio discovery session today." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className={`text-3xl font-display font-bold text-blue-900`}>🦄 Unicorn</div>
          <div className="hidden md:flex space-x-10 text-gray-700 font-medium">
            <a href="#philosophy" className="hover:text-amber-600 transition-colors">Our Philosophy</a>
            <a href="#portfolio" className="hover:text-amber-600 transition-colors">Portfolio</a>
            <a href="#testimonials" className="hover:text-amber-600 transition-colors">Testimonials</a>
            <a href="#contact" className="hover:text-amber-600 transition-colors">Contact</a>
          </div>
          <button className="md:hidden text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
        {/* --- MOBILE MENU --- */}
        {isMenuOpen && (
          <div className="md:hidden" onClick={() => setIsMenuOpen(false)}>
            <a href="#philosophy" className="block py-2 px-6 text-gray-700 hover:bg-amber-50">Our Philosophy</a>
            <a href="#portfolio" className="block py-2 px-6 text-gray-700 hover:bg-amber-50">Portfolio</a>
            <a href="#testimonials" className="block py-2 px-6 text-gray-700 hover:bg-amber-50">Testimonials</a>
            <a href="#contact" className="block py-3 px-6 text-gray-700 font-bold hover:bg-amber-50">Contact</a>
          </div>
        )}
      </nav>

      <main>
        {/* --- HERO --- */}
        <section className="pt-36 pb-28 px-6 bg-gradient-to-b from-white to-amber-50">
          <div className="container mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h1 className={`text-6xl font-display font-extrabold text-blue-900 leading-tight mb-8`}>
                Redefine Your Villa. <br />
                <span className="bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
                  Live in Timeless Luxury.
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                Your success has not stood still. Your tastes have evolved. We are not here to change your home—we are here to align it with the frequency of your life **today**.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <a href="#contact" className="text-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-10 rounded-full shadow-xl transition transform hover:scale-105">
                  Book a Discovery Session
                </a>
                <a href="#portfolio" className="text-center border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-bold py-4 px-10 rounded-full transition">
                  View Portfolio
                </a>
              </div>
            </div>
            <div className="md:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl mt-8 md:mt-0">
              <Image src="/hero-villa.jpg" alt="A beautifully renovated luxury villa interior" width={650} height={450} className="object-cover w-full h-auto" priority />
            </div>
          </div>
        </section>

        {/* --- TRUST METRICS --- */}
        <section className="py-20 bg-white px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className={`text-6xl font-display font-bold text-amber-600`}>15+</div>
                <div className="text-lg text-gray-700 mt-2">Years of Excellence</div>
              </div>
              <div>
                <div className={`text-6xl font-display font-bold text-amber-600`}>800+</div>
                <div className="text-lg text-gray-700 mt-2">Projects Completed</div>
              </div>
              <div>
                <div className={`text-6xl font-display font-bold text-amber-600`}>600+</div>
                <div className="text-lg text-gray-700 mt-2">Satisfied Clients</div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PHILOSOPHY --- */}
        <section id="philosophy" className="py-24 bg-amber-50 px-6">
          <div className="container mx-auto text-center">
            <h2 className={`text-5xl font-display font-bold text-blue-900 mb-6`}>An Experience of Quiet Anticipation</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-700 mb-16 leading-relaxed">
              Many imagine a renovation as disruption. For our clients, it is a silent symphony. Your life continues uninterrupted while we conduct every detail behind the scenes, ensuring a masterpiece unfolds with serene precision.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition">
                <h3 className={`text-2xl font-display font-bold text-blue-900 mb-4`}>A Photorealistic Promise</h3>
                <p className="text-gray-600 leading-relaxed">Our 3D visualizations are more than a preview; they are our bond. The only surprise you will experience is the moment you realize reality is even more breathtaking than the dream we showed you.</p>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition">
                <h3 className={`text-2xl font-display font-bold text-blue-900 mb-4`}>An Exclusive Partnership</h3>
                <p className="text-gray-600 leading-relaxed">Our calendar is intentionally limited to ensure our principals provide undivided attention to each project. We don't just build; we enter a deep, collaborative partnership with a select few.</p>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition">
                <h3 className={`text-2xl font-display font-bold text-blue-900 mb-4`}>Uncompromising Craft</h3>
                <p className="text-gray-600 leading-relaxed">We pursue perfection in every line, joint, and finish. Our work is not for those who want a simple renovation, but for those who seek to commission a legacy.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- PORTFOLIO --- */}
        <section id="portfolio" className="py-24 bg-white px-6">
          <div className="container mx-auto text-center">
            <h2 className={`text-5xl font-display font-bold text-blue-900 mb-16`}>Our Signature Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {portfolioItems.map((p, i) => (
                <div key={i} className="relative group rounded-3xl overflow-hidden shadow-xl">
                  <Image src={p.img} alt={p.title} width={450} height={320} className="object-cover w-full h-80 transform group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="text-2xl font-bold text-white -mb-2 group-hover:mb-0 transition-all duration-500">{p.title}</h3>
                    <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- TESTIMONIALS --- */}
        <section id="testimonials" className="py-24 bg-amber-50 px-6">
          <div className="container mx-auto text-center">
            <h2 className={`text-5xl font-display font-bold text-blue-900 mb-16`}>The Echo of Excellence</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                  <div className="flex justify-center mb-6">
                    <Image src={t.img} alt={t.name} width={70} height={70} className="rounded-full border-4 border-amber-400" />
                  </div>
                  <p className="italic text-gray-700 mb-6 leading-relaxed">“{t.text}”</p>
                  <div className="flex justify-center text-amber-500 mb-4 text-xl">
                    {[...Array(t.rating)].map((_, j) => <span key={j}>★</span>)}
                  </div>
                  <h4 className="font-bold text-blue-900">{t.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CONTACT FORM --- */}
        <section id="contact" className="py-24 bg-gradient-to-b from-blue-900 to-blue-800 text-white px-6">
          <div className="container mx-auto max-w-3xl bg-white text-gray-800 rounded-3xl shadow-2xl p-12">
            <div className="text-center">
              <h2 className={`text-4xl font-display font-bold text-blue-900 mb-4`}>Commission Your Masterpiece</h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">Your villa is a canvas. When you are ready to create a timeless statement, we invite you to begin the conversation.</p>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="sr-only">Full Name</label>
                  <input id="fullName" type="text" placeholder="Full Name" className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <input id="email" type="email" placeholder="Email Address" className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="sr-only">Phone Number</label>
                  <input id="phone" type="tel" placeholder="Phone Number" className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" />
                </div>
                <div>
                  <label htmlFor="projectType" className="sr-only">Project Type</label>
                  <select id="projectType" className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition">
                    <option>Villa Renovation</option>
                    <option>Kitchen Remodel</option>
                    <option>Bathroom Renovation</option>
                    <option>Full Interior Design</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="details" className="sr-only">Project Details</label>
                <textarea id="details" placeholder="Tell us about your vision..." rows={4} className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"></textarea>
              </div>
              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-5 rounded-lg shadow-lg transition transform hover:scale-105">Begin the Conversation</button>
            </form>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto text-center">
          <h3 className={`font-display font-bold text-2xl mb-3`}>🦄 Unicorn Renovations</h3>
          <p className="text-blue-200 mb-5">Crafting Luxury Homes Across Dubai</p>
          <p className="text-blue-300 text-sm">© {new Date().getFullYear()} Unicorn Renovations. All Rights Reserved.</p>
        </div>
      </footer>

      {/* --- WHATSAPP --- */}
      <a href="https://wa.me/971501234567?text=I'm%20interested%20in%20a%20consultation%20for%20my%20villa." target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 transition transform hover:scale-110">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.505 1.905 6.344l.229.352-1.232 4.493 4.625-1.211.335.205z" /></svg>
      </a>
    </div>
  );
}
