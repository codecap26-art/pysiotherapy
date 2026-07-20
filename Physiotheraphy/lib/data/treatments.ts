export type TreatmentCategory = 'Physical Therapy' | 'Post-Operative Rehabilitation' | 'Sports Injury' | 'Neurological Rehabilitation' | 'Orthopedic Rehabilitation';

export interface TreatmentData {
  id: string;
  title: string;
  category: TreatmentCategory;
  shortDescription: string;
  image: string;
  successRate: number;
  conditionDescription: string;
  symptoms: string[];
  commonCauses: string[];
  treatmentTechniques: string[];
  recoveryTimeline: string;
  sessionsExpected: string;
  benefits: string[];
  successRateDetail: string;
}

export const TREATMENTS: TreatmentData[] = [
  {
    id: 'neck-pain',
    title: 'Neck Pain Treatment',
    category: 'Physical Therapy',
    shortDescription: 'Comprehensive management of cervical pain through manual therapy, posture correction, and targeted strengthening.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    successRate: 92,
    conditionDescription: 'Neck pain (cervicalgia) is a common musculoskeletal issue often caused by poor posture, muscle strain, or nerve compression.',
    symptoms: ['Stiffness', 'Headaches', 'Radiating pain down arms', 'Muscle spasms'],
    commonCauses: ['Poor workplace ergonomics', 'Whiplash', 'Cervical spondylosis', 'Muscle strain'],
    treatmentTechniques: ['Manual Therapy', 'Postural Correction', 'Soft Tissue Mobilization', 'Strengthening Exercises'],
    recoveryTimeline: '2 to 6 weeks depending on severity.',
    sessionsExpected: '6 - 12 Sessions',
    benefits: ['Reduced pain and stiffness', 'Improved range of motion', 'Better posture habits'],
    successRateDetail: '92% of patients experience significant pain reduction within 4 weeks.'
  },
  {
    id: 'acl-rehab',
    title: 'ACL Rehabilitation',
    category: 'Post-Operative Rehabilitation',
    shortDescription: 'Structured post-surgical protocol to restore knee stability, strength, and function after an ACL reconstruction.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
    successRate: 88,
    conditionDescription: 'Rehabilitation following Anterior Cruciate Ligament (ACL) reconstruction surgery. This is a phased program to return the athlete to full function.',
    symptoms: ['Knee instability', 'Weakness', 'Loss of range of motion', 'Swelling'],
    commonCauses: ['Sports injuries', 'Sudden pivoting', 'Landing awkwardly'],
    treatmentTechniques: ['Early weight-bearing', 'Gait training', 'Neuromuscular re-education', 'Plyometrics (late stage)'],
    recoveryTimeline: '6 to 9 months for full return to sports.',
    sessionsExpected: '20+ Sessions',
    benefits: ['Restored knee stability', 'Prevention of re-injury', 'Safe return to sport'],
    successRateDetail: '88% successful return to pre-injury activity levels.'
  },
  {
    id: 'tennis-elbow',
    title: 'Tennis Elbow',
    category: 'Sports Injury',
    shortDescription: 'Evidence-based treatment for lateral epicondylitis focusing on tendon healing and eccentric strengthening.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800',
    successRate: 94,
    conditionDescription: 'Lateral epicondylitis involves inflammation or micro-tearing of the tendons that join the forearm muscles on the outside of the elbow.',
    symptoms: ['Pain on outside of elbow', 'Weak grip strength', 'Pain when lifting or bending arm'],
    commonCauses: ['Repetitive wrist and arm motions', 'Racquet sports', 'Manual labor'],
    treatmentTechniques: ['Eccentric loading', 'Dry Needling', 'Ultrasound Therapy', 'Bracing'],
    recoveryTimeline: '4 to 12 weeks.',
    sessionsExpected: '8 - 14 Sessions',
    benefits: ['Pain alleviation', 'Restored grip strength', 'Tendon regeneration'],
    successRateDetail: '94% success rate with adherence to home exercise programs.'
  },
  {
    id: 'stroke-rehab',
    title: 'Stroke Rehabilitation',
    category: 'Neurological Rehabilitation',
    shortDescription: 'Intensive neuro-rehabilitation to restore motor function, balance, and independence after a cerebrovascular accident.',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800',
    successRate: 75,
    conditionDescription: 'Specialized therapy aimed at helping stroke survivors relearn skills that were lost due to brain damage.',
    symptoms: ['Hemiparesis (weakness on one side)', 'Balance issues', 'Spasticity'],
    commonCauses: ['Ischemic or hemorrhagic stroke'],
    treatmentTechniques: ['Constraint-Induced Movement Therapy', 'Gait Training', 'Balance Exercises', 'Functional Electrical Stimulation (FES)'],
    recoveryTimeline: '3 months to 2 years.',
    sessionsExpected: 'Ongoing',
    benefits: ['Increased independence', 'Improved mobility', 'Fall prevention'],
    successRateDetail: '75% of patients regain significant functional independence.'
  },
  {
    id: 'total-knee',
    title: 'Total Knee Replacement Rehab',
    category: 'Orthopedic Rehabilitation',
    shortDescription: 'Post-surgical care to ensure proper healing, regain knee flexion, and restore normal walking mechanics.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    successRate: 96,
    conditionDescription: 'Rehabilitation following arthroplasty (total knee replacement) to ensure optimal joint mobility and muscle strength.',
    symptoms: ['Post-surgical pain', 'Limited flexion/extension', 'Gait deviations'],
    commonCauses: ['Severe osteoarthritis', 'Rheumatoid arthritis', 'Joint trauma'],
    treatmentTechniques: ['Passive range of motion', 'Strengthening of quads/hamstrings', 'Gait analysis', 'Ice and elevation'],
    recoveryTimeline: '3 to 6 months.',
    sessionsExpected: '15 - 20 Sessions',
    benefits: ['Full knee extension', 'Pain-free walking', 'Return to daily activities'],
    successRateDetail: '96% of patients report significant improvement in quality of life.'
  },
  {
    id: 'sciatica',
    title: 'Sciatica Treatment',
    category: 'Physical Therapy',
    shortDescription: 'Targeted interventions to relieve pressure on the sciatic nerve and eliminate radiating leg pain.',
    image: 'https://images.unsplash.com/photo-1551847677-dc82d7624c1c?auto=format&fit=crop&q=80&w=800',
    successRate: 89,
    conditionDescription: 'Pain radiating along the sciatic nerve, which runs down one or both legs from the lower back.',
    symptoms: ['Radiating pain down the leg', 'Numbness or tingling', 'Weakness in the affected leg'],
    commonCauses: ['Herniated disc', 'Spinal stenosis', 'Piriformis syndrome'],
    treatmentTechniques: ['Nerve gliding exercises', 'Core strengthening', 'McKenzie Method', 'Manual Therapy'],
    recoveryTimeline: '4 to 8 weeks.',
    sessionsExpected: '6 - 12 Sessions',
    benefits: ['Elimination of radiating pain', 'Restored spinal mechanics', 'Prevention of future episodes'],
    successRateDetail: '89% experience full resolution of radicular symptoms.'
  },
];
