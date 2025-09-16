import { memo } from 'react';

const TestimonialCard = memo(({ text, rating, name, location, robotoFont }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
    <div className="flex justify-center mb-6">
      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
        <span className={`text-white font-bold text-xl ${robotoFont}`}>{name[0]}</span>
      </div>
    </div>
    <p className={`italic text-gray-700 mb-6 leading-relaxed ${robotoFont}`}>"{text}"</p>
    <div className="flex justify-center text-amber-500 mb-4">
      {[...Array(rating)].map((_, i) => (
        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <h4 className={`font-bold text-blue-900 text-center ${robotoFont}`} style={{fontWeight: 700}}>{name}</h4>
    <p className={`text-gray-500 text-sm text-center ${robotoFont}`}>{location} Client</p>
  </div>
));

TestimonialCard.displayName = 'TestimonialCard';

export default function TestimonialsSection({ robotoFont, headingStyle }) {
  const testimonials = [
    { 
      text: "Unicorn Renovations transformed our villa beyond our wildest dreams. Exceptional quality!",
      rating: 5,
      name: "Fatima Al-Rashid",
      location: "Dubai Hills"
    },
    { 
      text: "Professional team, transparent pricing, and stunning results. Highly recommended!",
      rating: 5,
      name: "Omar Khalil",
      location: "Palm Jumeirah"
    },
    { 
      text: "The best renovation decision we made. Our villa feels like a luxury resort now!",
      rating: 5,
      name: "Sarah Laurent",
      location: "Emirates Hills"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-amber-50 to-white px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4" style={headingStyle}>
            What Our Clients Say
          </h2>
          <p className={`text-lg text-gray-600 max-w-3xl mx-auto ${robotoFont}`}>
            Join 800+ satisfied homeowners who trusted us with their villa renovation dreams
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} robotoFont={robotoFont} />
          ))}
        </div>
      </div>
    </section>
  );
}
