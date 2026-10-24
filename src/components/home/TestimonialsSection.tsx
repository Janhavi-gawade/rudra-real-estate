import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const reviews = [
    {
      name: 'Rahul & Sneha Kulkarni',
      role: 'Homeowners in Keshav Nagar',
      text: 'Buying our 3 BHK through Rudra Property was an effortless experience. Their office at Prestige Chamber Keshav Nagar is right in the neighbourhood, and their ground team accompanied us to every site visit with complete honesty.',
      rating: 5,
    },
    {
      name: 'Vikramaditya Shinde',
      role: 'Tech Director, EON IT Park Kharadi',
      text: 'I needed a luxury apartment close to my Kharadi office. Rudra Property shortlisted three exceptional projects within 48 hours and helped negotiate a substantially better price than the open market.',
      rating: 5,
    },
    {
      name: 'Dr. Anita Deshmukh',
      role: 'Commercial Investor, Mundhwa',
      text: 'Transparent documentation, zero inflated promises. Guided me into a high-visibility commercial asset with solid 8% rental yield potential. Rudra Property is easily Pune’s most trustworthy broker.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B2881E]">
            CLIENT EXPERIENCES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#08183A] mt-2 mb-4">
            Words From Our Delighted Clients
          </h2>
          <p className="text-sm text-slate-600">
            Read how Pune homeowners and corporate executives achieved their real estate goals with our consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="w-10 h-10 text-[#C59B27]/20 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C59B27] text-[#C59B27]" />
                  ))}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <h4 className="text-base font-bold text-[#08183A] font-serif">
                  {rev.name}
                </h4>
                <p className="text-xs text-slate-500">{rev.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
