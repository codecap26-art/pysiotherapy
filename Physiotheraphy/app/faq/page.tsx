import React from 'react';
import Link from 'next/link';
import { Accordion } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'FAQ',
  description: 'Common questions about physiotherapy, booking, and home visits.',
};

const FAQ_DATA = [
  {
    category: 'Appointments & Booking',
    items: [
      { id: 'b1', question: 'How do I book my first appointment?', answer: 'You can book directly through our website using the "Book Appointment" button. You can choose whether you want an in-clinic visit or a home visit, select your preferred specialist, and pick a time slot that works for you.' },
      { id: 'b2', question: 'What is your cancellation policy?', answer: 'We kindly ask for at least 24 hours notice if you need to cancel or reschedule your appointment. Cancellations made with less than 24 hours notice may be subject to a [PLACEHOLDER_FEE] cancellation fee.' },
      { id: 'b3', question: 'What should I wear to my appointment?', answer: 'Please wear comfortable, loose-fitting clothing. If we are treating your knee or leg, shorts are ideal. For shoulder or neck issues, a tank top allows the physiotherapist to easily evaluate the area.' },
      { id: 'b4', question: 'What should I expect during my first visit?', answer: 'Your first visit is a comprehensive assessment. The physiotherapist will discuss your medical history, current symptoms, and goals. They will perform a physical examination to diagnose the issue and create a personalized treatment plan. Treatment usually begins during this first session.' }
    ]
  },
  {
    category: 'Home Visits',
    items: [
      { id: 'h1', question: 'What is your coverage area for home visits?', answer: 'We currently provide home visit physiotherapy across [PLACEHOLDER_CITY] and surrounding suburbs within a [PLACEHOLDER_RADIUS] radius. Please contact us if you are unsure if you fall within our service area.' },
      { id: 'h2', question: 'Does the therapist bring their own equipment?', answer: 'Yes, our physiotherapists come fully equipped with a portable treatment table, resistance bands, massage tools, and any specialized equipment required for your specific treatment plan.' },
      { id: 'h3', question: 'Is home physiotherapy more expensive?', answer: 'Home visits include a standard travel surcharge to cover the time and transportation costs for our therapists. For a detailed pricing breakdown, please contact our clinic directly.' },
      { id: 'h4', question: 'What safety and hygiene protocols are followed?', answer: 'Patient safety is our top priority. All therapists are fully vaccinated, wear appropriate PPE when requested, sanitize all equipment between visits, and perform daily health screenings.' }
    ]
  },
  {
    category: 'Insurance & Payment',
    items: [
      { id: 'i1', question: 'Do you accept insurance?', answer: 'We are in-network with most major insurance providers including [PLACEHOLDER_INSURANCE_1] and [PLACEHOLDER_INSURANCE_2]. For out-of-network providers, we provide a detailed receipt that you can submit for reimbursement.' },
      { id: 'i2', question: 'Do you offer direct billing?', answer: 'Yes, we offer direct billing to supported insurance companies. Please bring your insurance card to your first appointment so we can set it up on your file.' },
      { id: 'i3', question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, debit cards, and [PLACEHOLDER_LOCAL_PAYMENT]. Payment is typically collected at the end of each session.' }
    ]
  },
  {
    category: 'Treatment',
    items: [
      { id: 't1', question: 'How many sessions will I need?', answer: 'Every patient is unique. After your initial assessment, your physiotherapist will discuss your customized treatment plan and provide an estimated timeline for your recovery.' },
      { id: 't2', question: 'Will physiotherapy hurt?', answer: 'Physiotherapy should not cause severe pain. You may experience some mild discomfort or soreness during or after certain manual therapy techniques or exercises, similar to post-workout soreness. Always communicate your pain levels with your therapist.' },
      { id: 't3', question: 'Do I need a doctor\'s referral?', answer: 'In most cases, no. Physiotherapists are primary healthcare practitioners, meaning you can book an appointment directly. However, your specific insurance plan might require a doctor\'s referral for coverage.' }
    ]
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFF] pt-24 pb-24 text-[#0D1421]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-4">Knowledge Base</Badge>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-[#4A5568] max-w-prose mx-auto leading-relaxed">
            Find answers to common questions about our services, booking process, insurance, and what to expect during your recovery journey.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-16">
          {FAQ_DATA.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-2xl font-bold mb-6 text-[#0D1421] border-b border-[#E8ECF4] pb-4">
                {section.category}
              </h2>
              <Accordion items={section.items.map(item => ({ id: item.id, title: item.question, content: item.answer }))} allowMultiple={true} />
            </section>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-24 bg-[var(--color-primary)] rounded-3xl p-10 text-center text-white shadow-xl">
          <h3 className="text-3xl font-black tracking-tight mb-4">Still have questions?</h3>
          <p className="text-white/80 max-w-prose mx-auto mb-8 text-lg">
            Our care team is ready to help you with any specific concerns. Reach out to us through your preferred method.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-white text-[var(--color-primary)] font-bold rounded-2xl shadow-lg hover:bg-[#F8FAFC] transition-colors">
              Contact Us
            </Link>
            <a href="tel:+15550123" className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
              Call [PLACEHOLDER_PHONE]
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
