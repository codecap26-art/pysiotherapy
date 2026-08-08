"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Zap, TrendingUp, Activity, Smile } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const TIMELINE_STEPS = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Assessment",
    desc: "Comprehensive evaluation of your condition, medical history, and recovery goals.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Pain Relief",
    desc: "Manual therapy, electrotherapy, and targeted interventions to reduce pain fast.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Strength Recovery",
    desc: "Progressive exercises to rebuild muscle strength, stability, and endurance.",
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Functional Movement",
    desc: "Sport-specific training to restore normal movement patterns.",
  },
  {
    icon: <Smile className="w-6 h-6" />,
    title: "Back to Daily Life",
    desc: "Full return to work, sport, and daily activities with preventive strategies.",
  },
];

export function RecoveryProcessTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <p className="text-[#1E6FFF] font-semibold text-sm tracking-wider uppercase mb-3">Your Journey</p>
          <h2 className="text-[40px] font-black text-[#0D1421] leading-tight tracking-tight mb-4">Recovery Process</h2>
          <p className="text-[18px] text-[#4A5568] leading-relaxed">
            A structured, step-by-step pathway from your first appointment to full recovery.
          </p>
        </motion.div>

        {/* Desktop */}
        <div className="hidden lg:block relative">
          <div className="absolute top-[52px] left-0 right-0 h-[2px] bg-[#E8ECF4]" />
          <motion.div
            className="absolute top-[52px] left-0 h-[2px] bg-gradient-to-r from-[#1E6FFF] to-[#10B981]"
            initial={{ width: "0%" }}
            animate={inView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }}
          />
          <div className="grid grid-cols-5 gap-4 relative z-10">
            {TIMELINE_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={i * 1.5}
                className="flex flex-col items-center text-center gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.2, type: "spring", stiffness: 200 }}
                  className="w-[104px] h-[104px] rounded-full flex flex-col items-center justify-center shadow-[0_8px_24px_rgba(30,111,255,0.15)] border-4 border-white"
                  style={{ background: "linear-gradient(135deg, #1E6FFF, #10B981)" }}
                >
                  <span className="text-white">{step.icon}</span>
                  <span className="text-white text-[11px] font-bold mt-1">{String(i + 1).padStart(2, "0")}</span>
                </motion.div>
                <div>
                  <h4 className="text-[17px] font-bold text-[#0D1421] mb-2">{step.title}</h4>
                  <p className="text-[13px] text-[#4A5568] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex flex-col gap-0 relative">
          <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#1E6FFF] to-[#10B981]" />
          {TIMELINE_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              className="flex gap-6 pl-16 pb-10 relative"
            >
              <div
                className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-md"
                style={{ background: "linear-gradient(135deg, #1E6FFF, #10B981)" }}
              >
                <span className="text-white">{step.icon}</span>
              </div>
              <div>
                <h4 className="text-[17px] font-bold text-[#0D1421] mb-1">{step.title}</h4>
                <p className="text-[14px] text-[#4A5568] leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
