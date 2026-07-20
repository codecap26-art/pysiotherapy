import React from 'react';
import { Hero } from '../components/sections/Hero';
import { MedicalServices } from '../components/sections/MedicalServices';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { InteractivePainSelector } from '../components/sections/InteractivePainSelector';
import { TreatmentCalculator } from '../components/sections/TreatmentCalculator';
import { Badge } from '../components/ui/Badge';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFBFF] text-[#0D1421]">
      <Hero />

      {/* Medical Services */}
      <MedicalServices />

      {/* Stats + Why Choose Us */}
      <WhyChooseUs />

      {/* Interactive Tools Section */}
      <section className="py-24 bg-[#FAFBFF] border-t border-[#E8ECF4]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Interactive Tools</Badge>
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Understand Your Pain & Recovery</h2>
            <p className="text-lg text-[#4A5568] max-w-2xl mx-auto">
              Select your area of pain to see potential causes, treatment options, and estimated recovery timelines.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <InteractivePainSelector />
            </div>
            <div>
              <TreatmentCalculator />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
