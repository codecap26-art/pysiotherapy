"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { Info, Target, Zap } from 'lucide-react';

const painData: Record<string, { symptoms: string, treatment: string, recovery: string }> = {
  Neck: {
    symptoms: "Stiffness, headaches, pain radiating to shoulders.",
    treatment: "Postural correction, manual therapy, strengthening.",
    recovery: "2 - 4 Weeks"
  },
  Back: {
    symptoms: "Aching, sharp pain, difficulty bending or standing.",
    treatment: "Core strengthening, spinal mobilization, McKenzie method.",
    recovery: "4 - 8 Weeks"
  },
  Knee: {
    symptoms: "Swelling, clicking, instability, pain climbing stairs.",
    treatment: "Quad/hamstring strengthening, gait analysis, bracing.",
    recovery: "3 - 6 Weeks"
  },
  Shoulder: {
    symptoms: "Limited reach, pain at night, weakness in arm.",
    treatment: "Rotator cuff strengthening, joint mobilization, ultrasound.",
    recovery: "4 - 12 Weeks"
  }
};

const bodyParts = [
  { id: 'Neck', cx: 150, cy: 160, r: 15 },
  { id: 'Shoulder', cx: 115, cy: 190, r: 15 },
  { id: 'Shoulder', cx: 185, cy: 190, r: 15 },
  { id: 'Back', cx: 150, cy: 280, r: 25 },
  { id: 'Knee', cx: 132, cy: 320, r: 15 },
  { id: 'Knee', cx: 168, cy: 320, r: 15 },
];

export function InteractivePainSelector() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const data = selectedArea ? painData[selectedArea] : null;

  return (
    <Card className="flex flex-col md:flex-row bg-white border border-[#E8ECF4] shadow-xl overflow-hidden min-h-[500px]">
      
      {/* Interactive Body Area */}
      <div className="flex-1 bg-[#FAFBFF] border-r border-[#E8ECF4] relative flex flex-col items-center justify-center p-8">
        <h3 className="text-xl font-bold text-[#0D1421] mb-6 self-start md:absolute md:top-8 md:left-8">Click your area of pain</h3>
        
        {/* Abstract SVG Body placeholder */}
        <div className="relative">
           <svg width="300" height="500" viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Real body image overlay */}
              <image href="/images/human_body.png" x="0" y="0" width="300" height="500" preserveAspectRatio="xMidYMid contain" className="opacity-90 mix-blend-multiply pointer-events-none" />

              {/* Clickable hotspots */}
              {bodyParts.map((part, idx) => (
                <circle
                  key={idx}
                  cx={part.cx}
                  cy={part.cy}
                  r={part.r}
                  fill={selectedArea === part.id ? "#1E6FFF" : "#10B981"}
                  className="cursor-pointer transition-colors hover:fill-[#1558D6] opacity-80 animate-pulse"
                  onClick={() => setSelectedArea(part.id)}
                />
              ))}
           </svg>
        </div>
      </div>

      {/* Info Display Area */}
      <div className="flex-1 p-8 flex flex-col">
        <AnimatePresence mode="wait">
          {!selectedArea ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex items-center justify-center text-[#8896A8] text-center"
            >
              <p>Select a highlighted area on the body to see customized recovery information.</p>
            </motion.div>
          ) : (
            <motion.div
              key="data"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#EFF5FF] text-[#1E6FFF] font-bold self-start text-sm">
                {selectedArea} Pain
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-semibold text-[#0D1421] mb-2 text-lg">
                  <Info className="w-5 h-5 text-[#10B981]" /> Common Symptoms
                </h4>
                <p className="text-[#4A5568]">{data?.symptoms}</p>
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-semibold text-[#0D1421] mb-2 text-lg">
                  <Zap className="w-5 h-5 text-[#F59E0B]" /> Our Treatment Approach
                </h4>
                <p className="text-[#4A5568]">{data?.treatment}</p>
              </div>

              <div className="mt-auto bg-[#FAFBFF] p-4 rounded-xl border border-[#E8ECF4] flex items-center justify-between">
                <span className="font-semibold text-[#4A5568]">Estimated Recovery</span>
                <span className="font-bold text-[#1E6FFF] text-lg">{data?.recovery}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </Card>
  );
}
