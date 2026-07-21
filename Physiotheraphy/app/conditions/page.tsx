'use client';

import React from 'react';
import { AGE_GROUPS } from '@/lib/conditionData';
import { AgeWiseConditions } from '@/components/sections/AgeWiseConditions';
import { Badge } from '@/components/ui/Badge';

export default function ConditionsIndexPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFF] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center">
          <Badge variant="primary" className="mb-4">Condition Library</Badge>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-[#0D1421]">
            Understand Your Condition
          </h1>
          <p className="text-lg text-[#4A5568] max-w-2xl mx-auto mb-12">
            Explore our comprehensive library of musculoskeletal conditions. Choose an age group below to see specialized treatments and recovery pathways.
          </p>
        </div>
      </div>
      
      {/* Reusing the AgeWiseConditions component for the grid */}
      <div className="-mt-16">
        <AgeWiseConditions />
      </div>
    </main>
  );
}
