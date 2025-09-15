import Head from "next/head";
import Image from "next/image";

export default function Home() {
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

  return (
    <div className="min-h-screen bg-white font-sans">
      <Head>
        <title>Unicorn Renovations | Dubai’s Luxury Villa Experts</title>
        <meta
          name="description"
          content="Dubai’s premium villa renovation specialists. 15+ years of luxury experience, 800+ completed projects. Book your free consultation today."
        />
      </Head>

      {/* NAVBAR */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-3xl font-display font-bold text-blue-900">🦄 Unicorn</div>
          <div className="hidden md:flex space-x-10 text-gray-700 font-medium">
            <a href="#features" className="hover:text-amber-600">Why Us</a>
            <a href="#portfolio" className="hover:text-amber-600">Portfolio</a>
            <a href="#testimonials" className="hover:text-amber-600">Testimonials</a>
            <a href="#contact" className="hover:text-amber-600">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-36 pb-28 px-6 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h1 className="text-6xl font-display font-extrabold text-blue-900 leading-tight mb-8">
              Redefine Your Villa. <br />
              <span className="bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
                Live in Timeless Luxury.
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              From Palm Jumeirah to Emirates Hills, our designs embody elegance, sophistication, and attention to every detail.
            </p>
            <div className="flex space-x-6">
              <a
                href="#contact"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-10 rounded-full shadow-xl transition transform hover:scale-105"
              >
                Book Free Consultation
              </a>
              <a
                href="#portfolio"
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-bold py-4 px-10 rounded-full transition"
              >
                View Portfolio
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/hero-villa.jpg" alt="Luxury Villa" width={650} height={450} className="object-cover w-full h-auto" />
          </div>
        </div>
      </section>

      {/* TRUST METRICS */}
      <section className="py-20 bg-white px-6">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6">
              <div className="text-6xl font-bold text-amber-600">15+</div>
              <div className="text-lg text-gray-700 mt-2">Years of Excellence</div>
            </div>
            <div className="p-6">
              <div className="text-6xl font-bold text-amber-600">800+</div>
              <div className="text-lg text-gray-700 mt-2">Projects Completed</div>
            </div>
            <div className="p-6">
              <div className="text-6xl font-bold text-amber-600">600+</div>
              <div className="text-lg text-gray-700 mt-2">Satisfied Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-amber-50 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-display font-bold text-blue-900 mb-16">Why Elite Clients Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Crafted with Precision</h3>
              <p className="text-gray-600 leading-relaxed">Every corner, finish, and line is executed with unmatched attention to detail and luxury finesse.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">On-Time, Every Time</h3>
              <p className="text-gray-600 leading-relaxed">Our streamlined process ensures timely delivery without compromising craftsmanship.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Designs That Inspire</h3>
              <p className="text-gray-600 leading-relaxed">We don’t just renovate homes, we create experiences that resonate with timeless elegance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-white px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-display font-bold text-blue-900 mb-16">Our Signature Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {portfolioItems.map((p, i) => (
              <div key={i} className="relative group rounded-3xl overflow-hidden shadow-xl">
                <Image src={p.img} alt={p.title} width={450} height={320} className="object-cover w-full h-72 group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition">
                  <h3 className="text-2xl font-bold text-white">{p.title}</h3>
                  <p className="text-gray-200">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-amber-50 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-display font-bold text-blue-900 mb-16">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <Image src={t.img} alt={t.name} width={70} height={70} className="rounded-full border-4 border-amber-400" />
                </div>
                <p className="italic text-gray-700 mb-6 leading-relaxed">“{t.text}”</p>
                <div className="flex justify-center text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, j) => <span key={j}>★</span>)}
                </div>
                <h4 className="font-bold text-blue-900">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-24 bg-gradient-to-b from-blue-900 to-blue-800 text-white px-6">
        <div className="container mx-auto max-w-3xl bg-white text-gray-800 rounded-3xl shadow-2xl p-12">
          <h2 className="text-4xl font-display font-bold text-blue-900 mb-8 text-center">Book Your Free Consultation</h2>
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input type="text" placeholder="Full Name" className="w-full px-5 py-4 border rounded-lg" />
              <input type="email" placeholder="Email Address" className="w-full px-5 py-4 border rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input type="tel" placeholder="Phone Number" className="w-full px-5 py-4 border rounded-lg" />
              <select className="w-full px-5 py-4 border rounded-lg">
                <option>Villa Renovation</option>
                <option>Kitchen Remodel</option>
                <option>Bathroom Renovation</option>
                <option>Full Interior Design</option>
              </select>
            </div>
            <textarea placeholder="Project Details" rows={4} className="w-full px-5 py-4 border rounded-lg"></textarea>
            <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-5 rounded-lg shadow-lg transition">Submit Request</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto text-center">
          <h3 className="font-display font-bold text-2xl mb-3">🦄 Unicorn Renovations</h3>
          <p className="text-blue-200 mb-5">Crafting Luxury Homes Across Dubai</p>
          <p className="text-blue-300 text-sm">© {new Date().getFullYear()} Unicorn Renovations. All rights reserved.</p>
        </div>
      </footer>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/971501234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-5 rounded-full shadow-xl hover:bg-green-600 transition"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 4.985 0 11.125c0 1.963.545 3.87 1.58 5.54L0 24l7.6-2.39A12.64 12.64 0 0012 22.25c6.627 0 12-4.985 12-11.125S18.627 0 12 0z" />
        </svg>
      </a>
    </div>
  );
}
