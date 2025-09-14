import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const features = [
    {
      title: 'Dubai Municipality Certified',
      description:
        'Fully certified and compliant with all local regulations and building codes.',
      icon: '🏛️',
    },
    {
      title: '15+ Years Experience',
      description:
        'Over a decade and a half of expertise in high-end villa renovations across Dubai.',
      icon: '📅',
    },
    {
      title: '3D Design Visualization',
      description:
        'See your dream home with photorealistic 3D renders before construction begins.',
      icon: '🏠',
    },
  ];

  const portfolioItems = [
    {
      image:
        'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1087&q=80',
      title: 'Emirates Hills Villa',
      description: 'Complete modern transformation',
    },
    {
      image:
        'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Palm Jumeirah Bathroom',
      description: 'Luxury spa-like renovation',
    },
    {
      image:
        'https://images.unsplash.com/photo-1600566753052-d7f4e46f5d20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      title: 'Downtown Dubai Kitchen',
      description: 'Modern luxury kitchen remodel',
    },
  ];

  const testimonials = [
    {
      name: 'Ahmed R.',
      text: 'Unicorn Renovations transformed our villa beyond expectations. Their attention to detail and professionalism was outstanding!',
      rating: 5,
    },
    {
      name: 'Layla M.',
      text: 'The 3D design process helped us visualize exactly what we were getting. The final result was even better than the renderings!',
      rating: 5,
    },
    {
      name: 'Omar S.',
      text: 'Completed our renovation 2 weeks ahead of schedule with exceptional quality. Highly recommend their services.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      <Head>
        <title>Unicorn Renovations | Dubai&apos;s Premier Villa Renovation Specialists</title>
        <meta
          name="description"
          content="Transform your villa with 3D designs before execution. 15+ Years Experience in luxury renovations across Dubai."
        />
      </Head>

      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900">🦄 Unicorn Renovations</div>
          <div className="hidden md:flex space-x-10">
            <a href="#features" className="text-gray-700 hover:text-amber-600">Features</a>
            <a href="#portfolio" className="text-gray-700 hover:text-amber-600">Portfolio</a>
            <a href="#testimonials" className="text-gray-700 hover:text-amber-600">Testimonials</a>
            <a href="#contact" className="text-gray-700 hover:text-amber-600">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Dubai&apos;s Premier Villa Renovation Specialists
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Transform your villa with 3D designs before execution. 15+ Years Experience in
              luxury renovations across Dubai&apos;s most prestigious communities.
            </p>
            <div className="bg-amber-100 p-4 rounded-lg mb-8 inline-block">
              <div className="text-sm text-amber-800 font-semibold mb-2">Limited Time Offer</div>
              <div className="text-2xl font-bold text-amber-700">{formatTime(timeLeft)}</div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full"
            >
              Get Free Consultation
            </button>
          </div>

          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1050&q=80"
                alt="Luxury Villa Renovation"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-amber-50 p-8 rounded-2xl shadow-lg text-center">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">{f.title}</h3>
              <p className="text-gray-700">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 px-6 bg-amber-50">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioItems.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <Image src={item.image} alt={item.title} width={400} height={250} />
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-amber-50 p-8 rounded-2xl shadow-lg">
              <p className="italic text-gray-700 mb-4">"{t.text}"</p>
              <div className="font-bold text-blue-900">{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-blue-900 text-white">
        <div className="container mx-auto max-w-lg">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Villa?</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg text-gray-900" />
            <input type="email" placeholder="Your Email" className="w-full p-3 rounded-lg text-gray-900" />
            <textarea placeholder="Project Details" className="w-full p-3 rounded-lg text-gray-900"></textarea>
            <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg">
              Schedule Free Consultation
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
