import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const features = [
    {
      title: "Dubai Municipality Certified",
      description: "Fully certified and compliant with all local regulations and building codes.",
      icon: "🏛️"
    },
    {
      title: "15+ Years Experience",
      description: "Over a decade and a half of expertise in high-end villa renovations across Dubai.",
      icon: "📅"
    },
    {
      title: "3D Design Visualization",
      description: "See your dream home with photorealistic 3D renders before construction begins.",
      icon: "🏠"
    }
  ];

  const portfolioItems = [
    {
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1087&q=80",
      title: "Emirates Hills Villa",
      description: "Complete modern transformation"
    },
    {
      image: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      title: "Palm Jumeirah Bathroom",
      description: "Luxury spa-like renovation"
    },
    {
      image: "https://images.unsplash.com/photo-1600566753052-d7f4e46f5d20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      title: "Downtown Dubai Kitchen",
      description: "Modern luxury kitchen remodel"
    }
  ];

  const testimonials = [
    {
      name: "Ahmed R.",
      text: "Unicorn Renovations transformed our villa beyond expectations. Their attention to detail and professionalism was outstanding!",
      rating: 5
    },
    {
      name: "Layla M.",
      text: "The 3D design process helped us visualize exactly what we were getting. The final result was even better than the renderings!",
      rating: 5
    },
    {
      name: "Omar S.",
      text: "Completed our renovation 2 weeks ahead of schedule with exceptional quality. Highly recommend their services.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      <Head>
        <title>Unicorn Renovations | Dubai's Premier Villa Renovation Specialists</title>
        <meta name="description" content="Transform your villa with 3D designs before execution. 15+ Years Experience in luxury renovations across Dubai." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-900">🦄 Unicorn Renovations</div>
          </div>
          <div className="hidden md:flex space-x-10">
            <a href="#features" className="text-gray-700 hover:text-amber-600 transition">Features</a>
            <a href="#portfolio" className="text-gray-700 hover:text-amber-600 transition">Portfolio</a>
            <a href="#testimonials" className="text-gray-700 hover:text-amber-600 transition">Testimonials</a>
            <a href="#contact" className="text-gray-700 hover:text-amber-600 transition">Contact</a>
          </div>
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
              Dubai's Premier Villa Renovation Specialists
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Transform your villa with 3D designs before execution. 15+ Years Experience in luxury renovations across Dubai's most prestigious communities.
            </p>
            
            {/* Countdown Timer */}
            <div className="bg-amber-100 p-4 rounded-lg mb-8 inline-block">
              <div className="text-sm text-amber-800 font-semibold mb-2">Limited Time Offer</div>
              <div className="text-2xl font-bold text-amber-700">{formatTime(timeLeft)}</div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
              >
                Get Free Consultation
              </button>
              <a 
                href="#portfolio" 
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-bold py-3 px-8 rounded-full transition duration-300 text-center"
              >
                View Our Work
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80"
                alt="Luxury Villa Renovation"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <div className="text-sm font-semibold mb-1">Before & After</div>
                  <div className="text-xl font-bold">Emirates Hills Villa Transformation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">Why Choose Unicorn Renovations?</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            We combine innovative design with expert craftsmanship to deliver exceptional results for your villa renovation project.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-amber-50 p-8 rounded-2xl shadow-lg text-center transition-transform duration-300 hover:translate-y-2">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6 bg-amber-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">Our Recent Masterpieces</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Explore our portfolio of luxury villa renovations across Dubai's most exclusive communities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="relative h-60">
                  <Image 
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Don't just take our word for it. Here's what our satisfied clients have to say about our work.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-amber-50 p-8 rounded-2xl shadow-lg">
                <div className="flex text-amber-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
                <div className="font-bold text-blue-900">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto bg-white text-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">Ready to Transform Your Villa?</h2>
            <p className="text-gray-600 text-center mb-8">Get a free consultation with our renovation experts today.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Project Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                    <option>Villa Renovation</option>
                    <option>Kitchen Remodel</option>
                    <option>Bathroom Renovation</option>
                    <option>Full Interior Design</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Project Details</label>
                <textarea rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"></textarea>
              </div>
              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300">
                Schedule Free Consultation
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold mb-2">🦄 Unicorn Renovations</div>
              <p className="text-blue-200">Dubai's Premier Villa Renovation Experts</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm-1.327 16.8c-1.754 0-3.146-.585-4.073-1.754l1.365-1.169c.585.877 1.317 1.317 2.634 1.317 1.097 0 1.828-.365 1.974-1.023h-2.07c-.146-.292-.219-1.317-.219-1.754h4.316v-.877c0-2.34-1.462-3.801-3.801-3.801-2.34 0-3.874 1.609-3.874 4.022 0 2.633 1.754 4.022 4.388 4.022 1.609 0 2.853-.658 3.363-1.754h-1.609zm-.219-8.179c1.317 0 2.047.804 2.047 1.975h-4.316c0-1.171.73-1.975 2.269-1.975z" />
                </svg>
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm-1.327 16.8c-1.754 0-3.146-.585-4.073-1.754l1.365-1.169c.585.877 1.317 1.317 2.634 1.317 1.097 0 1.828-.365 1.974-1.023h-2.07c-.146-.292-.219-1.317-.219-1.754h4.316v-.877c0-2.34-1.462-3.801-3.801-3.801-2.34 0-3.874 1.609-3.874 4.022 0 2.633 1.754 4.022 4.388 4.022 1.609 0 2.853-.658 3.363-1.754h-1.609zm-.219-8.179c1.317 0 2.047.804 2.047 1.975h-4.316c0-1.171.73-1.975 2.269-1.975z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>© {new Date().getFullYear()} Unicorn Renovations. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/971501234567" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg z-40 hover:bg-green-600 transition"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488" />
        </svg>
      </a>

      {/* Consultation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Free Consultation</h3>
            <p className="text-gray-600 mb-6">Fill out this form and our experts will contact you within 24 hours.</p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Your Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex space-x-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-amber-500 text-white py-2 rounded-lg font-semibold"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
