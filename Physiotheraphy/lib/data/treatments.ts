export type TreatmentCategory = 
  | 'Physical Therapy'
  | 'Sports Injury'
  | 'Post-Operative Rehabilitation'
  | 'Neurological Rehabilitation'
  | 'Orthopedic Rehabilitation'
  | 'Pediatric Physiotherapy'
  | 'Women\'s Health'
  | 'Geriatric Care'
  | 'Spine Care';

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
    shortDescription: 'Comprehensive cervical rehabilitation using manual therapy, posture correction, mobility exercises, and strengthening programs.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800', // physiotherapist stretching neck
    successRate: 92,
    conditionDescription: 'Comprehensive cervical rehabilitation designed to relieve acute and chronic neck pain while restoring normal mobility.',
    symptoms: ['Neck stiffness', 'Headaches', 'Radiating arm pain'],
    commonCauses: ['Poor posture', 'Whiplash', 'Muscle strain'],
    treatmentTechniques: ['Manual Therapy', 'Mobility Exercises', 'Posture Correction'],
    recoveryTimeline: '2 to 6 weeks',
    sessionsExpected: '6 - 12 Sessions',
    benefits: ['Pain relief', 'Restored motion', 'Better posture'],
    successRateDetail: '92% of patients experience significant pain reduction within 4 weeks.'
  },
  {
    id: 'acl-rehab',
    title: 'ACL Rehabilitation',
    category: 'Post-Operative Rehabilitation',
    shortDescription: 'Progressive rehabilitation after ACL reconstruction focusing on knee stability, strength, balance, and return-to-sport readiness.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800', // squat rehab
    successRate: 88,
    conditionDescription: 'Structured post-surgical protocol to restore knee stability, strength, and function after an ACL reconstruction.',
    symptoms: ['Knee instability', 'Weakness', 'Loss of range of motion'],
    commonCauses: ['Sports injuries', 'Sudden pivoting'],
    treatmentTechniques: ['Weight-bearing exercises', 'Gait training', 'Plyometrics'],
    recoveryTimeline: '6 to 9 months',
    sessionsExpected: '20+ Sessions',
    benefits: ['Restored knee stability', 'Prevention of re-injury', 'Safe return to sport'],
    successRateDetail: '88% of athletes return to their pre-injury level of play.'
  },
  {
    id: 'tennis-elbow',
    title: 'Tennis Elbow Treatment',
    category: 'Sports Injury',
    shortDescription: 'Evidence-based management for lateral epicondylitis using manual therapy, eccentric loading, and ergonomic correction.',
    image: 'https://images.unsplash.com/photo-1629363447547-5264a274dbd2?auto=format&fit=crop&q=80&w=800', // elbow manual treatment
    successRate: 90,
    conditionDescription: 'Evidence-based management for lateral epicondylitis (Tennis Elbow) focused on pain reduction and tissue healing.',
    symptoms: ['Outer elbow pain', 'Weak grip', 'Pain when lifting'],
    commonCauses: ['Repetitive arm motion', 'Overuse', 'Improper technique'],
    treatmentTechniques: ['Eccentric loading', 'Manual therapy', 'Bracing'],
    recoveryTimeline: '4 to 8 weeks',
    sessionsExpected: '8 - 14 Sessions',
    benefits: ['Restored grip strength', 'Pain-free lifting', 'Tissue healing'],
    successRateDetail: '90% of patients achieve full recovery without surgery.'
  },
  {
    id: 'frozen-shoulder',
    title: 'Frozen Shoulder Rehabilitation',
    category: 'Orthopedic Rehabilitation',
    shortDescription: 'Restore shoulder movement through joint mobilization, stretching, strengthening, and pain management.',
    image: 'https://images.unsplash.com/photo-1599557456722-d7b884d5df67?auto=format&fit=crop&q=80&w=800', // shoulder mobility with bands
    successRate: 85,
    conditionDescription: 'Targeted therapy to break down scar tissue and restore mobility in patients with adhesive capsulitis.',
    symptoms: ['Severe shoulder stiffness', 'Night pain', 'Limited arm movement'],
    commonCauses: ['Prolonged immobilization', 'Post-surgery', 'Idiopathic'],
    treatmentTechniques: ['Joint mobilization', 'Stretching', 'Pain management'],
    recoveryTimeline: '3 to 9 months',
    sessionsExpected: '15 - 25 Sessions',
    benefits: ['Restored arm movement', 'Reduced night pain', 'Improved daily function'],
    successRateDetail: '85% regain functional range of motion within 6 months.'
  },
  {
    id: 'lower-back-pain',
    title: 'Lower Back Pain Therapy',
    category: 'Physical Therapy',
    shortDescription: 'Comprehensive rehabilitation targeting chronic and acute back pain through posture correction, core strengthening, and manual therapy.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', // lumbar stabilization
    successRate: 94,
    conditionDescription: 'Comprehensive rehabilitation targeting the root causes of both acute and chronic lower back pain.',
    symptoms: ['Lumbar stiffness', 'Radiating leg pain', 'Muscle spasms'],
    commonCauses: ['Herniated discs', 'Poor lifting mechanics', 'Sedentary lifestyle'],
    treatmentTechniques: ['Core strengthening', 'Lumbar stabilization', 'Manual therapy'],
    recoveryTimeline: '3 to 8 weeks',
    sessionsExpected: '6 - 15 Sessions',
    benefits: ['Pain relief', 'Improved spinal stability', 'Prevention of future episodes'],
    successRateDetail: '94% report significant improvement and reduced pain medication use.'
  },
  {
    id: 'stroke-rehab',
    title: 'Stroke Rehabilitation',
    category: 'Neurological Rehabilitation',
    shortDescription: 'Improve balance, coordination, mobility, muscle control, and independence following neurological injury.',
    image: 'https://images.unsplash.com/photo-1632053001148-f002d1d07c08?auto=format&fit=crop&q=80&w=800', // walking parallel bars
    successRate: 82,
    conditionDescription: 'Specialized neuro-rehabilitation program designed to maximize neuroplasticity and restore functional independence after a stroke.',
    symptoms: ['Hemiparesis (weakness)', 'Loss of balance', 'Gait abnormalities'],
    commonCauses: ['Ischemic stroke', 'Hemorrhagic stroke'],
    treatmentTechniques: ['Gait training', 'Neuro-muscular re-education', 'Balance exercises'],
    recoveryTimeline: '3 to 12+ months',
    sessionsExpected: '30+ Sessions',
    benefits: ['Improved mobility', 'Regained independence', 'Enhanced motor control'],
    successRateDetail: '82% of patients achieve greater functional independence.'
  },
  {
    id: 'parkinsons-therapy',
    title: 'Parkinson\'s Disease Therapy',
    category: 'Neurological Rehabilitation',
    shortDescription: 'Movement retraining, balance improvement, fall prevention, and functional mobility exercises.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800', // elderly patient gait training
    successRate: 78,
    conditionDescription: 'Focused therapy designed to manage symptoms, maintain mobility, and slow the progression of motor decline in Parkinson\'s disease.',
    symptoms: ['Tremors', 'Bradykinesia', 'Postural instability', 'Rigidity'],
    commonCauses: ['Neurodegeneration'],
    treatmentTechniques: ['LSVT BIG therapy', 'Rhythmic auditory stimulation', 'Fall prevention'],
    recoveryTimeline: 'Ongoing management',
    sessionsExpected: 'Ongoing weekly/bi-weekly',
    benefits: ['Improved stride length', 'Reduced freezing episodes', 'Better balance'],
    successRateDetail: '78% maintain independent ambulation for longer periods.'
  },
  {
    id: 'balance-fall-prevention',
    title: 'Balance & Fall Prevention',
    category: 'Geriatric Care',
    shortDescription: 'Improve confidence, stability, coordination, and reduce fall risk through personalized balance training.',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80&w=800', // older adult balance exercises
    successRate: 91,
    conditionDescription: 'A proactive and reactive program tailored for older adults to enhance stability and drastically reduce the risk of falling.',
    symptoms: ['Unsteadiness', 'Fear of falling', 'Frequent trips/stumbles'],
    commonCauses: ['Aging', 'Muscle weakness', 'Neuropathy'],
    treatmentTechniques: ['Proprioceptive training', 'Strengthening', 'Gait assessment'],
    recoveryTimeline: '4 to 12 weeks',
    sessionsExpected: '8 - 16 Sessions',
    benefits: ['Reduced fall risk', 'Increased confidence', 'Better coordination'],
    successRateDetail: '91% of participants report increased confidence and zero falls post-program.'
  },
  {
    id: 'pediatric-physio',
    title: 'Pediatric Physiotherapy',
    category: 'Pediatric Physiotherapy',
    shortDescription: 'Support healthy movement development, posture, coordination, and motor skills for children.',
    image: 'https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&q=80&w=800', // child colorful equipment
    successRate: 89,
    conditionDescription: 'Play-based physical therapy to help children reach developmental milestones and recover from childhood injuries or conditions.',
    symptoms: ['Delayed milestones', 'Clumsiness', 'Torticollis', 'Toe walking'],
    commonCauses: ['Developmental delay', 'Cerebral palsy', 'Sports injuries'],
    treatmentTechniques: ['Play-based exercises', 'Neurodevelopmental treatment', 'Strength training'],
    recoveryTimeline: 'Varies by condition',
    sessionsExpected: '10 - 20 Sessions',
    benefits: ['Met milestones', 'Improved coordination', 'Healthy growth patterns'],
    successRateDetail: '89% of children successfully achieve their target functional goals.'
  },
  {
    id: 'womens-health',
    title: 'Women\'s Pelvic Health',
    category: 'Women\'s Health',
    shortDescription: 'Specialized rehabilitation for pelvic floor dysfunction, postpartum recovery, and women\'s musculoskeletal health.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800', // female physio consulting
    successRate: 93,
    conditionDescription: 'Discreet, evidence-based treatment for pelvic floor disorders, prenatal, and postpartum musculoskeletal issues.',
    symptoms: ['Pelvic pain', 'Incontinence', 'Diastasis recti'],
    commonCauses: ['Pregnancy/Childbirth', 'Surgery', 'Aging'],
    treatmentTechniques: ['Pelvic floor strengthening', 'Biofeedback', 'Core stabilization'],
    recoveryTimeline: '6 to 12 weeks',
    sessionsExpected: '6 - 12 Sessions',
    benefits: ['Improved bladder control', 'Pain reduction', 'Safe return to exercise'],
    successRateDetail: '93% of women report significant improvement in daily symptoms.'
  },
  {
    id: 'hip-replacement',
    title: 'Hip Replacement Rehabilitation',
    category: 'Post-Operative Rehabilitation',
    shortDescription: 'Structured rehabilitation restoring walking ability, hip strength, flexibility, and daily independence.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800', // walker supervision
    successRate: 96,
    conditionDescription: 'Post-surgical care designed to safely restore mobility and strength following a total hip arthroplasty (THA).',
    symptoms: ['Surgical pain', 'Weakness', 'Limited weight bearing'],
    commonCauses: ['Severe osteoarthritis', 'Hip fracture'],
    treatmentTechniques: ['Gait training', 'Hip abductor strengthening', 'Scar tissue management'],
    recoveryTimeline: '3 to 6 months',
    sessionsExpected: '12 - 20 Sessions',
    benefits: ['Restored walking ability', 'Pain-free movement', 'Improved hip strength'],
    successRateDetail: '96% achieve independent, pain-free ambulation.'
  },
  {
    id: 'ankle-sprain',
    title: 'Ankle Sprain Recovery',
    category: 'Sports Injury',
    shortDescription: 'Accelerated recovery using mobility exercises, proprioception training, and progressive strengthening.',
    image: 'https://images.unsplash.com/photo-1550060934-8b63e8a5b2fc?auto=format&fit=crop&q=80&w=800', // single leg balance
    successRate: 95,
    conditionDescription: 'Comprehensive protocol to heal torn ligaments, restore ankle stability, and prevent chronic chronic ankle instability.',
    symptoms: ['Ankle swelling', 'Pain with weight bearing', 'Instability'],
    commonCauses: ['Sports injury', 'Uneven surfaces', 'Inversion trauma'],
    treatmentTechniques: ['PRICE protocol early', 'Proprioception training', 'Taping/Bracing'],
    recoveryTimeline: '3 to 8 weeks',
    sessionsExpected: '6 - 12 Sessions',
    benefits: ['Reduced swelling', 'Restored stability', 'Quick return to activity'],
    successRateDetail: '95% of patients recover fully with no recurrent sprains.'
  },
  {
    id: 'sciatica',
    title: 'Sciatica Treatment',
    category: 'Spine Care',
    shortDescription: 'Relieve nerve pain using spinal mobilization, neural gliding, posture education, and strengthening exercises.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800', // lumbar manual therapy
    successRate: 89,
    conditionDescription: 'Targeted therapy to decompress the sciatic nerve and alleviate shooting pain down the leg.',
    symptoms: ['Shooting leg pain', 'Numbness/Tingling', 'Lower back ache'],
    commonCauses: ['Herniated disc', 'Spinal stenosis', 'Piriformis syndrome'],
    treatmentTechniques: ['Nerve gliding', 'Spinal mobilization', 'McKenzie exercises'],
    recoveryTimeline: '4 to 8 weeks',
    sessionsExpected: '8 - 15 Sessions',
    benefits: ['Nerve pain relief', 'Restored flexibility', 'Core strengthening'],
    successRateDetail: '89% experience significant relief of radicular symptoms.'
  },
  {
    id: 'rotator-cuff',
    title: 'Rotator Cuff Rehabilitation',
    category: 'Orthopedic Rehabilitation',
    shortDescription: 'Improve shoulder strength, flexibility, and stability after injury or surgery.',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800', // resistance cables
    successRate: 91,
    conditionDescription: 'A progressive strengthening program designed to heal tears or tendinopathy in the rotator cuff muscles.',
    symptoms: ['Shoulder weakness', 'Pain when lifting arm', 'Night pain'],
    commonCauses: ['Overuse', 'Heavy lifting', 'Sports trauma'],
    treatmentTechniques: ['Isometric strengthening', 'Scapular stabilization', 'Resistance band training'],
    recoveryTimeline: '3 to 6 months',
    sessionsExpected: '15 - 25 Sessions',
    benefits: ['Restored overhead reach', 'Improved shoulder strength', 'Pain reduction'],
    successRateDetail: '91% regain full functional use of the shoulder.'
  },
  {
    id: 'knee-osteoarthritis',
    title: 'Knee Osteoarthritis Therapy',
    category: 'Orthopedic Rehabilitation',
    shortDescription: 'Reduce joint pain, improve mobility, increase muscle strength, and enhance walking ability.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800', // knee equipment
    successRate: 87,
    conditionDescription: 'Conservative management to delay surgical intervention and improve quality of life for those with knee OA.',
    symptoms: ['Knee stiffness (morning)', 'Joint pain', 'Crepitus (grinding)'],
    commonCauses: ['Cartilage wear and tear', 'Aging', 'Previous injury'],
    treatmentTechniques: ['Quadriceps strengthening', 'Low-impact cardio (cycling)', 'Aquatic therapy'],
    recoveryTimeline: 'Ongoing management',
    sessionsExpected: '10 - 15 initially, then maintenance',
    benefits: ['Reduced joint load', 'Pain mitigation', 'Improved mobility'],
    successRateDetail: '87% report delayed need for joint replacement surgery.'
  },
  {
    id: 'posture-correction',
    title: 'Posture Correction Program',
    category: 'Physical Therapy',
    shortDescription: 'Correct poor posture through ergonomic education, mobility training, and muscle rebalancing.',
    image: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&q=80&w=800', // posture evaluation
    successRate: 94,
    conditionDescription: 'A holistic program addressing structural imbalances caused by modern sedentary lifestyles and tech use.',
    symptoms: ['Upper back ache', 'Forward head posture', 'Rounded shoulders'],
    commonCauses: ['Desk work', 'Excessive phone use', 'Muscular imbalances'],
    treatmentTechniques: ['Ergonomic assessment', 'Thoracic mobility', 'Deep neck flexor training'],
    recoveryTimeline: '4 to 8 weeks',
    sessionsExpected: '6 - 10 Sessions',
    benefits: ['Eliminated tension headaches', 'Aesthetic improvement', 'Spinal alignment'],
    successRateDetail: '94% achieve observable postural improvements and symptom relief.'
  },
  {
    id: 'wrist-hand',
    title: 'Wrist & Hand Rehabilitation',
    category: 'Sports Injury',
    shortDescription: 'Restore grip strength, dexterity, flexibility, and hand function following injury or surgery.',
    image: 'https://images.unsplash.com/photo-1629904853716-f0bc54fee56e?auto=format&fit=crop&q=80&w=800', // hand therapy
    successRate: 92,
    conditionDescription: 'Fine motor and strength rehabilitation for conditions affecting the complex structures of the wrist and hand.',
    symptoms: ['Weak grip', 'Finger stiffness', 'Wrist pain'],
    commonCauses: ['Carpal tunnel syndrome', 'Fractures', 'Tendonitis'],
    treatmentTechniques: ['Dexterity exercises', 'Grip strengthening', 'Custom splinting'],
    recoveryTimeline: '6 to 12 weeks',
    sessionsExpected: '10 - 15 Sessions',
    benefits: ['Restored fine motor skills', 'Improved grip strength', 'Pain-free typing'],
    successRateDetail: '92% return to unrestricted work and hobbies.'
  },
  {
    id: 'vestibular-rehab',
    title: 'Vestibular Rehabilitation',
    category: 'Neurological Rehabilitation',
    shortDescription: 'Evidence-based treatment for dizziness, vertigo, balance disorders, and vestibular dysfunction.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800', // gaze stabilization
    successRate: 95,
    conditionDescription: 'Specialized therapy to retrain the brain to process signals from the inner ear and eyes accurately.',
    symptoms: ['Vertigo', 'Dizziness', 'Nausea', 'Visual blurring with head movement'],
    commonCauses: ['BPPV', 'Vestibular neuritis', 'Concussion'],
    treatmentTechniques: ['Epley maneuver', 'Gaze stabilization', 'Habituation exercises'],
    recoveryTimeline: '1 to 6 weeks',
    sessionsExpected: '2 - 8 Sessions',
    benefits: ['Eliminated vertigo', 'Restored balance', 'Return to normal activities'],
    successRateDetail: '95% of BPPV patients are cured within 1-3 sessions.'
  }
];
