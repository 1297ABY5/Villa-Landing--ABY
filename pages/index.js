import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-yellow-50 text-gray-900">
      {/* HERO SECTION */}
      <section className="text-center py-20 relative">
        <Image
          src="/hero-villa.jpg"
          alt="Dubai Villa Renovation"
          fill
          className="object-cover opacity-20 -z-10"
        />
        <h1 className="text-5xl font-extrabold mb-6">
          Dubai’s Luxury Villa Renovators
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Transforming villas with premium design & finishing.
        </p>
        <a
          href="https://wa.me/971585658002?text=Hi, I want a villa renovation consultation."
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg"
        >
          Get Free Consultation
        </a>
      </section>
    </main>
  );
}
