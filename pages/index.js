"use client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Defer cursor for desktop only
const FloatingCursor = dynamic(() => import("@/components/FloatingCursor"), { ssr: false });

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-white to-amber-50 min-h-screen">
      <Head>
        <title>Unicorn Renovations | Dubai Villa Renovation Experts</title>
        <meta
          name="description"
          content="Luxury villa renovations with 3D design previews. Dubai Municipality certified. 15+ years experience."
        />
      </Head>

      {/* Floating Cursor - desktop only */}
      <FloatingCursor />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
        <div className="container mx-auto flex flex-col md:flex-row items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
              Transform Your Dubai Villa Into a Masterpiece
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              From Emirates Hills to Palm Jumeirah, we bring luxury living to life with precision and creativity.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full shadow-lg"
            >
              Get Free Consultation
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="md:w-1/2 mt-10 md:mt-0"
          >
            <Image
              src="/images/hero.webp"
              alt="Luxury Villa Renovation Dubai"
              width={600}
              height={400}
              priority
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section
        id="features"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-white px-6"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Dubai Municipality Certified", desc: "Fully compliant with local building codes." },
              { title: "15+ Years Experience", desc: "Trusted across Dubai’s most exclusive communities." },
              { title: "3D Design Visualization", desc: "Preview your dream villa before construction begins." },
            ].map((f, i) => (
              <div key={i} className="bg-amber-50 p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Portfolio */}
      <motion.section
        id="portfolio"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-amber-50 px-6"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-12">Our Recent Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["work1.webp", "work2.webp", "work3.webp"].map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={`/images/${img}`}
                  alt={`Project ${i + 1}`}
                  width={400}
                  height={260}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        id="testimonials"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-white px-6"
      >
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">What Clients Say</h2>
          <blockquote className="italic text-gray-700 text-lg mb-6">
            “Unicorn Renovations delivered our dream villa with unmatched quality and speed. Truly world-class!”
          </blockquote>
          <p className="font-semibold text-blue-900">– Ahmed, Palm Jumeirah</p>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-blue-900 text-white px-6"
      >
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Book Your Free Consultation</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Name" className="w-full p-3 rounded text-black" />
            <input type="email" placeholder="Email" className="w-full p-3 rounded text-black" />
            <textarea placeholder="Project Details" className="w-full p-3 rounded text-black" rows="4" />
            <button className="bg-amber-500 hover:bg-amber-600 text-white py-3 px-8 rounded-full">
              Submit
            </button>
          </form>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-blue-950 text-blue-200 text-center py-6">
        <p>© {new Date().getFullYear()} Unicorn Renovations – Dubai’s Villa Experts</p>
      </footer>
    </div>
  );
}
