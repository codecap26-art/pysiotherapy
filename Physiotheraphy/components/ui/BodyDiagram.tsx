import React from 'react';

type AffectedArea = 'head' | 'neck' | 'shoulder' | 'back' | 'elbow' | 'wrist' | 'hip' | 'knee' | 'ankle' | 'foot' | 'full-body';

interface BodyDiagramProps {
  affectedArea: AffectedArea;
  className?: string;
}

export const BodyDiagram: React.FC<BodyDiagramProps> = ({ affectedArea, className = '' }) => {
  // Primary brand color
  const highlightColor = 'rgba(30, 111, 255, 0.6)';
  const baseColor = '#E8ECF4';
  const strokeColor = '#8896A8';

  // Helper to check if an area should be highlighted
  const isHighlighted = (area: AffectedArea) => affectedArea === area || affectedArea === 'full-body';

  return (
    <svg 
      viewBox="0 0 200 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-[200px] h-auto ${className}`}
    >
      {/* Base Silhouette (Simplified) */}
      <path 
        d="M100 20 C110 20, 115 28, 115 38 C115 48, 110 55, 100 55 C90 55, 85 48, 85 38 C85 28, 90 20, 100 20 Z" 
        fill={isHighlighted('head') ? highlightColor : baseColor} 
        stroke={strokeColor} 
        strokeWidth="2" 
      />
      
      {/* Neck */}
      <path 
        d="M93 55 L107 55 L110 70 L90 70 Z" 
        fill={isHighlighted('neck') ? highlightColor : baseColor} 
        stroke={strokeColor} 
        strokeWidth="2" 
      />

      {/* Torso / Back */}
      <path 
        d="M75 70 L125 70 L115 160 L85 160 Z" 
        fill={isHighlighted('back') ? highlightColor : baseColor} 
        stroke={strokeColor} 
        strokeWidth="2" 
      />

      {/* Shoulders */}
      <circle cx="75" cy="75" r="10" fill={isHighlighted('shoulder') ? highlightColor : baseColor} stroke={strokeColor} strokeWidth="2" />
      <circle cx="125" cy="75" r="10" fill={isHighlighted('shoulder') ? highlightColor : baseColor} stroke={strokeColor} strokeWidth="2" />

      {/* Upper Arms */}
      <path d="M68 82 L55 130 L65 130 L78 82 Z" fill={baseColor} stroke={strokeColor} strokeWidth="2" />
      <path d="M132 82 L145 130 L135 130 L122 82 Z" fill={baseColor} stroke={strokeColor} strokeWidth="2" />

      {/* Elbows */}
      <circle cx="60" cy="135" r="7" fill={isHighlighted('elbow') ? highlightColor : baseColor} stroke={strokeColor} strokeWidth="2" />
      <circle cx="140" cy="135" r="7" fill={isHighlighted('elbow') ? highlightColor : baseColor} stroke={strokeColor} strokeWidth="2" />

      {/* Lower Arms */}
      <path d="M55 140 L45 180 L55 180 L65 140 Z" fill={baseColor} stroke={strokeColor} strokeWidth="2" />
      <path d="M145 140 L155 180 L145 180 L135 140 Z" fill={baseColor} stroke={strokeColor} strokeWidth="2" />

      {/* Wrists/Hands */}
      <circle cx="50" cy="185" r="6" fill={isHighlighted('wrist') ? highlightColor : baseColor} stroke={strokeColor} strokeWidth="2" />
      <circle cx="150" cy="185" r="6" fill={isHighlighted('wrist') ? highlightColor : baseColor} stroke={strokeColor} strokeWidth="2" />

      {/* Hips / Pelvis */}
      <path 
        d="M80 160 L120 160 L125 190 L75 190 Z" 
        fill={isHighlighted('hip') ? highlightColor : baseColor} 
        stroke={strokeColor} 
        strokeWidth="2" 
      />

      {/* Thighs */}
      <path d="M78 190 L70 260 L95 260 L100 190 Z" fill={baseColor} stroke={strokeColor} strokeWidth="2" />
      <path d="M122 190 L130 260 L105 260 L100 190 Z" fill={baseColor} stroke={strokeColor} strokeWidth="2" />

      {/* Knees */}
      <circle cx="82" cy="270" r="10" fill={isHighlighted('knee') ? highlightColor : baseColor} stroke={strokeColor} strokeWidth="2" />
      <circle cx="118" cy="270" r="10" fill={isHighlighted('knee') ? highlightColor : baseColor} stroke={strokeColor} strokeWidth="2" />

      {/* Calves */}
      <path d="M78 280 L75 350 L90 350 L88 280 Z" fill={baseColor} stroke={strokeColor} strokeWidth="2" />
      <path d="M122 280 L125 350 L110 350 L112 280 Z" fill={baseColor} stroke={strokeColor} strokeWidth="2" />

      {/* Ankles */}
      <circle cx="82" cy="355" r="6" fill={isHighlighted('ankle') ? highlightColor : baseColor} stroke={strokeColor} strokeWidth="2" />
      <circle cx="118" cy="355" r="6" fill={isHighlighted('ankle') ? highlightColor : baseColor} stroke={strokeColor} strokeWidth="2" />

      {/* Feet */}
      <path d="M78 360 L70 380 L95 380 L88 360 Z" fill={isHighlighted('foot') ? highlightColor : baseColor} stroke={strokeColor} strokeWidth="2" />
      <path d="M122 360 L130 380 L105 380 L112 360 Z" fill={isHighlighted('foot') ? highlightColor : baseColor} stroke={strokeColor} strokeWidth="2" />
    </svg>
  );
};
