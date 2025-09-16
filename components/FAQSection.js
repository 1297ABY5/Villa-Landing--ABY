import { useState } from 'react';

export default function FAQSection({ robotoFont, headingStyle }) {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      q: "How long does a typical villa renovation take?",
      a: "Complete villa renovations typically take 3-6 months. Kitchen renovations: 6-8 weeks, bathrooms: 3-4 weeks."
    },
    {
      q: "Do you handle all permits and approvals?",
      a: "Yes, we manage all Dubai Municipality permits, DEWA connections, and community approvals."
    },
    {
      q: "What warranty do you provide?",
      a: "5-year warranty on structural work, 2 years on finishes, plus lifetime support."
    }
  ];

  return (
    <section className="py-20 bg-white px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center" style={headingStyle}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full text-left p-6 flex justify-between items-center ${robotoFont}`}
              >
                <h3 className="text-lg font-bold text-blue-900">{faq.q}</h3>
                <svg className={`w-5 h-5 text-amber-600 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className={`px-6 pb-6 text-gray-600 ${robotoFont}`}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
