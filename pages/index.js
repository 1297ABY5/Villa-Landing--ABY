import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      title: "Luxury Villa Renovation",
      subtitle: "Full Interior Transformation",
      image: "/villa1.jpg",
      year: "2024",
    },
    {
      title: "Modern Kitchen Upgrade",
      subtitle: "Custom Joinery & Smart Systems",
      image: "/villa2.jpg",
      year: "2024",
    },
    {
      title: "Elegant Living Room",
      subtitle: "Premium Finishes & Lighting",
      image: "/villa3.jpg",
      year: "2023",
    },
  ];

  return (
    <>
      <Head>
        <title>Unicorn Renovations | Dubai Villa Renovation Experts</title>
        <meta
          name="description"
          content="Transform your Dubai villa with Unicorn Renovations. Luxury interiors, kitchens, bathrooms & full renovations with guaranteed premium finishes."
        />
      </Head>

      <main className="bg-black text-white min-h-screen">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center py-32 px-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Transform Your <span className="text-yellow-400">Dubai Villa</span>
            <br /> Into a Luxury Masterpiece
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl">
            Premium villa renovations with kitchens, bathrooms, joinery, and
            extensions – trusted by Dubai’s most elite homeowners.
          </p>
          <a
            href="#contact"
            className="mt-8 bg-yellow-400 text-black px-8 py-4 font-bold uppercase hover:bg-yellow-500 transition"
          >
            Get Free Consultation
          </a>
        </section>

        {/* Projects */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Recent Villa Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="border border-gray-700 p-4 rounded-lg hover:scale-105 transition"
              >
                <div className="relative aspect-[4/3] mb-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="text-gray-400">{project.subtitle}</p>
                <span className="text-sm text-gray-500">{project.year}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="py-20 px-6 bg-yellow-400 text-black text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Book Your Free Site Visit</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Let our experts inspect your villa and provide a tailored renovation
            plan that maximizes value and luxury.
          </p>
          <form className="max-w-xl mx-auto grid gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-4 border border-black"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-4 border border-black"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="p-4 border border-black"
            />
            <button className="bg-black text-white py-4 font-bold hover:bg-gray-800 transition">
              Submit
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
