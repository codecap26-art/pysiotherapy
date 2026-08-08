export interface CategoryConfig {
  id: string;
  emoji: string;
  label: string;
  color: string;
  bg: string;
  description: string;
  items: string[];
  treatmentIds: string[];
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: "orthopedic",
    emoji: "🦴",
    label: "Orthopedic Care",
    color: "#1E6FFF",
    bg: "#EFF5FF",
    description: "Specialized joint, bone, and spine rehabilitation for pain relief and restored mobility.",
    items: ["Joint Pain", "Arthritis", "Frozen Shoulder", "Hip Pain"],
    treatmentIds: [
      "lower-back-pain",
      "frozen-shoulder",
      "knee-osteoarthritis",
      "hip-replacement",
      "sciatica",
      "neck-pain",
      "posture-correction",
    ],
  },
  {
    id: "sports-injury",
    emoji: "🏃",
    label: "Sports Injury",
    color: "#F59E0B",
    bg: "#FFFBEB",
    description: "Fast-track athletic recovery protocols to rebuild peak performance and prevent reinjury.",
    items: ["ACL Tear", "Muscle Tear", "Sprain", "Runner's Knee"],
    treatmentIds: [
      "acl-rehab",
      "tennis-elbow",
      "ankle-sprain",
      "rotator-cuff",
      "wrist-hand",
    ],
  },
  {
    id: "neurological",
    emoji: "🧠",
    label: "Neurological Care",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    description: "Evidence-based neuro-rehabilitation to restore neuromuscular function and independence.",
    items: ["Stroke Rehab", "Parkinson's", "Balance Disorders"],
    treatmentIds: [
      "stroke-rehab",
      "parkinsons-therapy",
      "vestibular-rehab",
      "balance-fall-prevention",
    ],
  },
  {
    id: "pediatric",
    emoji: "👶",
    label: "Pediatric Care",
    color: "#EC4899",
    bg: "#FDF2F8",
    description: "Play-based motor skill development, postural guidance, and pediatric physical therapy.",
    items: ["Development", "Motor Skills", "Posture"],
    treatmentIds: [
      "pediatric-physio",
      "posture-correction",
      "neck-pain",
    ],
  },
  {
    id: "geriatric",
    emoji: "👵",
    label: "Geriatric Care",
    color: "#10B981",
    bg: "#ECFDF5",
    description: "Senior wellness, fall prevention, joint preservation, and independence programs.",
    items: ["Mobility", "Balance", "Fall Prevention"],
    treatmentIds: [
      "balance-fall-prevention",
      "knee-osteoarthritis",
      "hip-replacement",
      "parkinsons-therapy",
    ],
  },
];
