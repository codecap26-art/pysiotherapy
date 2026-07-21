"use client";

import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Tube } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// 1. Define the 3D Spline Path
// Creates a curved line that travels downwards and curves left/right
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 5, 0),
  new THREE.Vector3(2, 1, -5),
  new THREE.Vector3(-3, -3, -12),
  new THREE.Vector3(1, -6, -20),
  new THREE.Vector3(-2, -9, -28),
  new THREE.Vector3(0, -12, -35),
], false, 'catmullrom', 0.5);

// The glowing thread component
function ThreadCurve({ progress }: { progress: number }) {
  const tubeRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    // Subtle idle floating animation
    const time = state.clock.getElapsedTime();
    if (tubeRef.current) {
      tubeRef.current.position.y = Math.sin(time * 0.8) * 0.1;
      tubeRef.current.position.x = Math.cos(time * 0.5) * 0.1;
    }
  });

  return (
    <Tube ref={tubeRef} args={[curve, 200, 0.12, 12, false]}>
      <meshStandardMaterial 
        ref={materialRef}
        color="#1E6FFF" 
        emissive="#1E6FFF"
        emissiveIntensity={2}
        roughness={0.2}
        metalness={0.8}
        transparent={true}
        opacity={0.9}
      />
    </Tube>
  );
}

// Controls camera movement along the thread based on scroll
function CameraController({ progress }: { progress: number }) {
  const cameraRef = useRef<{ position: THREE.Vector3, lookAt: THREE.Vector3 }>({
    position: new THREE.Vector3(0, 5, 2),
    lookAt: new THREE.Vector3(0, 5, 0)
  });

  useFrame(({ camera }) => {
    // Map scroll progress (0-1) to curve point
    const targetProgress = Math.max(0.01, Math.min(0.99, progress));
    
    const camPos = curve.getPointAt(targetProgress);
    const lookAtPos = curve.getPointAt(Math.min(1, targetProgress + 0.05));

    // Smoothly interpolate camera position to create a "flying" effect
    cameraRef.current.position.lerp(new THREE.Vector3(camPos.x, camPos.y + 1.5, camPos.z + 4), 0.05);
    camera.position.copy(cameraRef.current.position);
    
    cameraRef.current.lookAt.lerp(lookAtPos, 0.05);
    camera.lookAt(cameraRef.current.lookAt);
  });

  return null;
}

export function ScrollThreeThread() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Setup Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // GSAP ScrollTrigger to track progress
  useGSAP(() => {
    if (!containerRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1, // Smooth scrubbing
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#FAFBFF]">
      {/* Sticky Container for 3D Canvas and UI */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* Gradient Background that shifts based on progress */}
        <div 
          className="absolute inset-0 z-0 transition-colors duration-1000 ease-out"
          style={{
            background: progress < 0.35 ? 'radial-gradient(circle at 50% 50%, #e8f0ff 0%, #FAFBFF 100%)' :
                        progress < 0.65 ? 'radial-gradient(circle at 50% 50%, #f3e8ff 0%, #FAFBFF 100%)' :
                                          'radial-gradient(circle at 50% 50%, #d1fae5 0%, #FAFBFF 100%)'
          }}
        />

        {/* 3D Canvas Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Canvas camera={{ fov: 60, position: [0, 5, 2] }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-5, 5, -5]} intensity={2} color="#1E6FFF" />
            
            {/* The 3D Thread */}
            <ThreadCurve progress={progress} />
            <CameraController progress={progress} />
          </Canvas>
        </div>

        {/* HTML UI Layer (Cards) */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center items-center">
          
          {/* Card 1: ~20% Progress */}
          <div 
            className="absolute left-[5%] md:left-[15%] max-w-[320px] bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_40px_rgba(30,111,255,0.15)] border border-white/50 transition-all duration-700 ease-out"
            style={{
              opacity: progress > 0.05 && progress < 0.35 ? 1 : 0,
              transform: `translateY(${(0.2 - progress) * 400}px) scale(${progress > 0.05 && progress < 0.35 ? 1 : 0.95}) rotateX(${(0.2 - progress) * 10}deg)`,
              pointerEvents: progress > 0.05 && progress < 0.35 ? 'auto' : 'none'
            }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-black mb-5 shadow-lg">01</div>
            <h3 className="text-2xl font-black text-[#0D1421] mb-3 tracking-tight">Assessment & Mapping</h3>
            <p className="text-[#4A5568] text-sm leading-relaxed">Advanced biomechanical analysis and diagnostic imaging pinpoints the exact root cause. We map your pain, posture, and movement.</p>
          </div>

          {/* Card 2: ~50% Progress */}
          <div 
            className="absolute right-[5%] md:right-[15%] max-w-[320px] bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_40px_rgba(168,85,247,0.15)] border border-white/50 transition-all duration-700 ease-out"
            style={{
              opacity: progress > 0.35 && progress < 0.65 ? 1 : 0,
              transform: `translateY(${(0.5 - progress) * 400}px) scale(${progress > 0.35 && progress < 0.65 ? 1 : 0.95}) rotateX(${(0.5 - progress) * 10}deg)`,
              pointerEvents: progress > 0.35 && progress < 0.65 ? 'auto' : 'none'
            }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center font-black mb-5 shadow-lg">02</div>
            <h3 className="text-2xl font-black text-[#0D1421] mb-3 tracking-tight">Restoration & Relief</h3>
            <p className="text-[#4A5568] text-sm leading-relaxed">Hands-on manual therapy and targeted exercises restore lost range of motion and reduce inflammation.</p>
          </div>

          {/* Card 3: ~80% Progress */}
          <div 
            className="absolute left-[5%] md:left-[15%] max-w-[320px] bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_40px_rgba(16,185,129,0.15)] border border-white/50 transition-all duration-700 ease-out"
            style={{
              opacity: progress > 0.65 && progress <= 1.0 ? 1 : 0,
              transform: `translateY(${(0.8 - progress) * 400}px) scale(${progress > 0.65 && progress <= 1.0 ? 1 : 0.95}) rotateX(${(0.8 - progress) * 10}deg)`,
              pointerEvents: progress > 0.65 && progress <= 1.0 ? 'auto' : 'none'
            }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center font-black mb-5 shadow-lg">03</div>
            <h3 className="text-2xl font-black text-[#0D1421] mb-3 tracking-tight">Peak Performance</h3>
            <p className="text-[#4A5568] text-sm leading-relaxed">Gradually increasing loads to build resilience and prevent future injuries, ensuring long-term recovery.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
