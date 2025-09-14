// src/app/page.js
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0)); // ✅ safe decrement
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const features = [
    {
      title: "Dubai Municipality Certified",
      description:
        "Fully certified and compliant with all local regulations and building codes.",
      icon: "🏛️",
    },
    {
      title: "15+ Years Experience",
      description:
        "Over a decade and a half of expertise in high-end villa renovations across Dubai.",
      icon: "📅",
    },
    {
      title: "3D Design Visualization",
      description:
        "See your dream home with photorealistic 3D renders before construction begins.",
      icon: "🏠",
    },
  ];

  const portfolioItems = [
    {
      image: "/images/work1.webp",
      title: "Emirates Hills Villa",
      description: "Complete modern transformation",
    },
    {
      image: "/images/work2.webp",
      title: "Palm Jumeirah Bathroom",
      description: "Luxury spa-like renovation",
    },
    {
      image: "/images/work3.webp",
      title: "Downtown Dubai Kitchen",
      description: "Modern luxury kitchen remodel",
    },
  ];

  const testimonials = [
    {
      name: "Ahmed R.",
      text: "Unicorn Renovations transformed our villa beyond expectations. Their attention to detail and professionalism was outstanding!",
      rating: 5,
    },
    {
      name: "Layla M.",
      text: "The 3D design process helped us visualize exactly what we were getting. The final result was even better than the renderings!",
      rating: 5,
    },
    {
      name: "Omar S.",
      text: "Completed our renovation 2 weeks ahead of schedule with exceptional quality. Highly recommend their services.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      <Head>
        <title>
          Unicorn Renovations | Dubai&apos;s Premier Villa Renovation Specialists
        </title>
        <meta
          name="description"
          content="Transform your villa with 3D designs before execution. 15+ Years Experience in luxury renovations across Dubai."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900">
            🦄 Unicorn Renovations
          </div>
          <div className="hidden md:flex space-x-10">
            <a href="#features" className="hover:text-amber-600">
              Features
            </a>
            <a href="#portfolio" className="hover:text-amber-600">
              Portfolio
            </a>
            <a href="#testimonials" className="hover:text-amber-600">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-amber-600">
              Contact
            </a>
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
              Transform your villa with 3D designs before execution. 15+ Years
              Experience in luxury renovations across Dubai&apos;s most
              prestigious communities.
            </p>

            {/* Countdown Timer */}
            <div className="bg-amber-100 p-4 rounded-lg mb-8 inline-block">
              <div className="text-sm text-amber-800 font-semibold">
                Limited Time Offer
              </div>
              <div className="text-2xl font-bold text-amber-700">
                {formatTime(timeLeft)}
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full shadow-lg"
            >
              Get Free Consultation
            </button>
          </div>

          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero.webp"
                alt="Luxury Villa Renovation"
                width={600}
                height={400}
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Why Choose Unicorn Renovations?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-amber-50 p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  {f.title}
                </h3>
                <p className="text-gray-700">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 px-6 bg-amber-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Our Recent Masterpieces
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioItems.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={300}
                  loading="lazy"
                  className="object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-amber-50 p-8 rounded-2xl shadow-lg">
                <p className="italic text-gray-700 mb-4">"{t.text}"</p>
                <div className="font-bold text-blue-900">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-blue-900 text-white px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform?</h2>
          <p className="mb-8 text-blue-100">
            Book your free consultation today.
          </p>
          <form className="bg-white text-gray-800 rounded-xl shadow-lg p-6 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg"
              aria-label="Your Name"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg"
              aria-label="Your Email"
            />
            <textarea
              rows="4"
              placeholder="Project Details"
              className="w-full p-3 border rounded-lg"
              aria-label="Project Details"
            />
            <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-semibold">
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-blue-200 py-6 text-center">
        <p>© {new Date().getFullYear()} Unicorn Renovations</p>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/971501234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full text-white shadow-lg"
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>
    </div>
  );
}
