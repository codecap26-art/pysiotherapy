// ─────────────────────────────────────────────────────────────────────────────
// lib/bookingData.ts  —  Complete data layer for the booking system
// ─────────────────────────────────────────────────────────────────────────────

export type AppointmentType = 'initial' | 'followup' | 'home' | 'online' | 'emergency';

export interface Treatment {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  duration: string;
  sessions: string;
  startingPrice: number;
  recovery: string;
  conditions: string[];
  benefits: string[];
  sessionStructure: string[];
  outcomes: string[];
  faqs: { q: string; a: string }[];
  tags: string[];
  popular?: boolean;
}

export interface Specialist {
  id: string;
  name: string;
  title: string;
  qualifications: string;
  experience: number;
  specializations: string[];
  certifications: string[];
  languages: string[];
  rating: number;
  reviews: number;
  image: string;
  nextAvailable: string;
  availability: string[];
  bio: string;
  pricing: Record<string, { initial: number; followup: number; home: number; online: number; emergency: number }>;
}

export interface TimeSlot {
  id: string;
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
  available: boolean;
}

export const TREATMENTS: Treatment[] = [
  {
    id: 'back-pain', name: 'Back Pain Therapy',
    shortDesc: 'Evidence-based treatment for acute and chronic back pain using manual therapy and targeted exercises.',
    fullDesc: 'Our Back Pain Therapy program combines the latest evidence-based techniques including manual therapy, dry needling, and neuromuscular re-education to provide lasting relief.',
    image: 'https://images.unsplash.com/photo-1576091160399-a1c371ce616e?auto=format&fit=crop&w=600&q=80',
    duration: '45–60 min', sessions: '6–12 sessions', startingPrice: 1000, recovery: '4–8 weeks',
    conditions: ['Lumbar disc herniation', 'Muscle strain', 'Sciatica', 'Postural back pain', 'Degenerative disc disease'],
    benefits: ['Pain reduction within 2–3 sessions', 'Improved posture and core strength', 'Prevention of recurrence'],
    sessionStructure: ['Assessment & pain mapping', 'Manual therapy & mobilisation', 'Therapeutic exercise', 'Home exercise program'],
    outcomes: ['85% report significant pain reduction', 'Average 70% improvement in mobility'],
    faqs: [
      { q: 'How soon will I feel better?', a: 'Most patients experience noticeable relief within 2–3 sessions. Full recovery typically takes 6–12 weeks.' },
      { q: 'Do I need a referral?', a: 'No referral required. You can book directly and our therapist will conduct a comprehensive assessment.' },
    ],
    tags: ['Back Pain', 'Manual Therapy', 'Posture'], popular: true,
  },
  {
    id: 'neck-pain', name: 'Neck Pain & Cervical Therapy',
    shortDesc: 'Specialised treatment for cervical spine disorders, tension headaches, and nerve-related neck pain.',
    fullDesc: 'Our cervical therapy programme targets the underlying causes of neck pain through joint mobilisation, soft tissue release, and posture correction strategies.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80',
    duration: '45 min', sessions: '4–8 sessions', startingPrice: 900, recovery: '3–6 weeks',
    conditions: ['Cervical spondylosis', 'Whiplash', 'Tension headaches', 'Cervicogenic headache'],
    benefits: ['Headache relief', 'Restored neck mobility', 'Reduced nerve symptoms'],
    sessionStructure: ['Cervical assessment', 'Joint mobilisation', 'Soft tissue therapy', 'Postural retraining'],
    outcomes: ['90% headache reduction', '80% mobility improvement'],
    faqs: [{ q: 'Can you treat headaches?', a: 'Yes. Cervicogenic headaches respond exceptionally well to targeted cervical physiotherapy.' }],
    tags: ['Neck Pain', 'Headaches', 'Cervical'], popular: true,
  },
  {
    id: 'shoulder-rehab', name: 'Shoulder Rehabilitation',
    shortDesc: 'Comprehensive shoulder recovery for rotator cuff injuries, impingement, and instability.',
    fullDesc: 'Our shoulder rehabilitation programme restores full range of motion, strength, and stability through progressive exercise therapy and joint mobilisation.',
    image: 'https://images.unsplash.com/photo-1594824432258-c0b5de3c7e3f?auto=format&fit=crop&w=600&q=80',
    duration: '60 min', sessions: '8–16 sessions', startingPrice: 1100, recovery: '6–12 weeks',
    conditions: ['Rotator cuff tear', 'Shoulder impingement', 'Shoulder instability', 'AC joint injury'],
    benefits: ['Full overhead reach restoration', 'Eliminated impingement pain', 'Return to sport/work'],
    sessionStructure: ['Shoulder biomechanics assessment', 'Pain-free range of motion work', 'Rotator cuff strengthening'],
    outcomes: ['Avoid surgery in 70% of impingement cases'],
    faqs: [{ q: 'Can physio help me avoid shoulder surgery?', a: 'In many cases, yes. Conservative physiotherapy resolves rotator cuff impingement and partial tears.' }],
    tags: ['Shoulder', 'Rotator Cuff', 'Sports'],
  },
  {
    id: 'knee-rehab', name: 'Knee Rehabilitation',
    shortDesc: 'Targeted knee recovery for osteoarthritis, ligament injuries, and post-surgical rehabilitation.',
    fullDesc: 'A structured knee rehabilitation programme using strength training, proprioception work, and biomechanical correction.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    duration: '60 min', sessions: '10–18 sessions', startingPrice: 1200, recovery: '8–16 weeks',
    conditions: ['Knee osteoarthritis', 'Patellofemoral syndrome', 'Meniscus injury', 'PCL/MCL sprain'],
    benefits: ['Pain-free walking and stairs', 'Improved strength and balance', 'Delayed knee replacement need'],
    sessionStructure: ['Biomechanical knee assessment', 'Swelling and pain management', 'Quadriceps/hamstring strengthening'],
    outcomes: ['85% avoid knee replacement for 5+ years'],
    faqs: [{ q: 'Can physio delay a knee replacement?', a: 'A structured exercise programme can delay or eliminate the need for knee replacement in many patients.' }],
    tags: ['Knee', 'Osteoarthritis', 'Ligament'], popular: true,
  },
  {
    id: 'acl-rehab', name: 'ACL Rehabilitation',
    shortDesc: 'Specialised ACL recovery programme — from initial injury through full sport return.',
    fullDesc: 'Our ACL programme follows the latest return-to-sport criteria, taking you from initial swelling through explosive sport-specific training.',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&q=80',
    duration: '75 min', sessions: '24–36 sessions', startingPrice: 1400, recovery: '6–12 months',
    conditions: ['ACL tear', 'ACL reconstruction post-op', 'ACL sprain'],
    benefits: ['Safe return to competitive sport', 'Reduce re-tear risk by 70%', 'Symmetrical strength'],
    sessionStructure: ['Phase 1: Swelling control', 'Phase 2: Range of motion', 'Phase 3: Strengthening', 'Phase 4: Sport-specific'],
    outcomes: ['92% return to previous sport level'],
    faqs: [{ q: 'How long before I can play sport again?', a: 'Most athletes return in 9–12 months when following a structured programme.' }],
    tags: ['ACL', 'Sport', 'Post-Op'], popular: true,
  },
  {
    id: 'sports-injury', name: 'Sports Injury Recovery',
    shortDesc: 'Fast-track recovery for sprains, strains, and sports-related musculoskeletal injuries.',
    fullDesc: 'Our sports injury specialists design rapid recovery programmes that get you back to performance while preventing re-injury.',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=600&q=80',
    duration: '45–60 min', sessions: '4–12 sessions', startingPrice: 1100, recovery: '2–8 weeks',
    conditions: ['Hamstring strain', 'Ankle sprain', 'Calf strain', 'Groin strain', 'Tennis elbow'],
    benefits: ['Rapid return to training', 'Prevent compensation injuries', 'Injury prevention education'],
    sessionStructure: ['Injury assessment & grading', 'Acute phase management', 'Rehabilitation progression', 'Return-to-sport testing'],
    outcomes: ['Average 40% faster recovery vs rest-only'],
    faqs: [{ q: 'Should I rest or keep moving?', a: 'Active recovery with guided movement is far superior to complete rest for most sports injuries.' }],
    tags: ['Sports', 'Sprain', 'Strain'],
  },
  {
    id: 'frozen-shoulder', name: 'Frozen Shoulder Treatment',
    shortDesc: 'Progressive treatment to restore full shoulder mobility in adhesive capsulitis.',
    fullDesc: 'Our specialised frozen shoulder programme uses proven techniques including joint mobilisation and capsular stretching.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80',
    duration: '60 min', sessions: '12–24 sessions', startingPrice: 1200, recovery: '3–12 months',
    conditions: ['Adhesive capsulitis', 'Post-surgical frozen shoulder', 'Diabetic frozen shoulder'],
    benefits: ['Full range of motion restoration', 'Reduced night pain', 'Independence in daily activities'],
    sessionStructure: ['Pain & phase assessment', 'Gentle capsular mobilisation', 'Progressive stretching'],
    outcomes: ['80% avoid corticosteroid injection or surgery'],
    faqs: [{ q: 'Will it get better on its own?', a: 'Frozen shoulder can self-resolve in 2–3 years. Physiotherapy accelerates recovery to 3–6 months.' }],
    tags: ['Frozen Shoulder', 'Mobility'],
  },
  {
    id: 'sciatica', name: 'Sciatica Treatment',
    shortDesc: 'Targeted neural treatment to relieve sciatic nerve pain, tingling, and leg weakness.',
    fullDesc: 'Our sciatica programme targets the nerve root compression causing your symptoms through spinal mobilisation and core stability training.',
    image: 'https://images.unsplash.com/photo-1576091160399-a1c371ce616e?auto=format&fit=crop&w=600&q=80',
    duration: '60 min', sessions: '8–16 sessions', startingPrice: 1100, recovery: '6–12 weeks',
    conditions: ['L4/L5/S1 disc herniation', 'Piriformis syndrome', 'Spinal stenosis'],
    benefits: ['Eliminated leg pain and tingling', 'Restored walking ability', 'Core strength improvement'],
    sessionStructure: ['Neural assessment', 'Disc unloading techniques', 'Neural mobilisation', 'Core stability'],
    outcomes: ['75% avoid surgery', '85% significant improvement in 6 weeks'],
    faqs: [{ q: 'Is surgery necessary?', a: 'Surgery is rarely required. Conservative physiotherapy resolves sciatica in 75–85% of cases.' }],
    tags: ['Sciatica', 'Nerve Pain', 'Spine'],
  },
  {
    id: 'arthritis', name: 'Arthritis Management',
    shortDesc: 'Long-term joint health programme for osteoarthritis and rheumatoid arthritis management.',
    fullDesc: 'Our arthritis management programme provides a sustainable, evidence-based approach to managing joint pain and maintaining independence.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80',
    duration: '45 min', sessions: 'Ongoing monthly', startingPrice: 900, recovery: 'Long-term management',
    conditions: ['Knee OA', 'Hip OA', 'Rheumatoid arthritis', 'Psoriatic arthritis'],
    benefits: ['Pain reduction without medication increase', 'Maintained independence', 'Delayed joint replacement'],
    sessionStructure: ['Joint status assessment', 'Pain management strategies', 'Hydrotherapy exercises'],
    outcomes: ['70% reduction in pain medication need'],
    faqs: [{ q: 'Can exercise make arthritis worse?', a: 'No — appropriate exercise is the most effective treatment for arthritis.' }],
    tags: ['Arthritis', 'Joint', 'Chronic'],
  },
  {
    id: 'stroke-rehab', name: 'Stroke Rehabilitation',
    shortDesc: 'Neurological rehabilitation to restore movement, balance, and independence after stroke.',
    fullDesc: 'Our stroke rehabilitation programme uses the latest neuroplasticity science to help patients regain movement and daily living skills.',
    image: 'https://images.unsplash.com/photo-1576091160399-a1c371ce616e?auto=format&fit=crop&w=600&q=80',
    duration: '60–90 min', sessions: '24+ sessions', startingPrice: 1500, recovery: '3–18 months',
    conditions: ['Ischaemic stroke', 'Haemorrhagic stroke', 'TIA', 'Hemiplegia'],
    benefits: ['Restored functional movement', 'Improved balance and gait', 'Regained hand function'],
    sessionStructure: ['Neurological assessment', 'CIMT therapy', 'Gait retraining', 'ADL functional training'],
    outcomes: ['Significant functional improvement in 80% of patients who begin within 3 months'],
    faqs: [{ q: 'How soon should I start?', a: 'The sooner the better. Starting within 24–48 hours significantly improves outcomes.' }],
    tags: ['Stroke', 'Neurological', 'Balance'],
  },
  {
    id: 'post-surgery', name: 'Post-Surgery Rehabilitation',
    shortDesc: 'Accelerated recovery after joint replacement, spinal surgery, or orthopaedic procedures.',
    fullDesc: 'Our post-surgical rehabilitation programme ensures optimal healing and full functional recovery following surgery.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    duration: '60 min', sessions: '12–24 sessions', startingPrice: 1300, recovery: '6–16 weeks',
    conditions: ['Total knee replacement', 'Total hip replacement', 'Spinal fusion', 'Rotator cuff repair'],
    benefits: ['Faster wound healing', 'Prevented complications', 'Earlier discharge', 'Full functional recovery'],
    sessionStructure: ['Post-operative assessment', 'Early mobilisation', 'Strengthening progression', 'Return-to-function testing'],
    outcomes: ['Average 30% faster recovery vs no physiotherapy'],
    faqs: [{ q: 'When should I start after surgery?', a: 'Ideally within 24–48 hours for in-hospital and 1–2 weeks for outpatient physiotherapy.' }],
    tags: ['Post-Op', 'Surgery', 'Rehabilitation'], popular: true,
  },
  {
    id: 'pediatric', name: 'Pediatric Physiotherapy',
    shortDesc: 'Child-friendly physiotherapy for developmental delays, cerebral palsy, and sports injuries in children.',
    fullDesc: 'Our paediatric specialists use play-based therapy to help children achieve movement milestones in a safe, engaging environment.',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    duration: '45–60 min', sessions: 'Ongoing as needed', startingPrice: 1100, recovery: 'Varies by condition',
    conditions: ['Developmental delay', 'Cerebral palsy', 'Torticollis', 'Scoliosis', 'Club foot'],
    benefits: ['Achieved developmental milestones', 'Improved coordination', 'Pain-free movement'],
    sessionStructure: ['Child-specific assessment', 'Play-based therapy', 'Parent education', 'Home activity programme'],
    outcomes: ['90% of children meet treatment goals within the programme'],
    faqs: [{ q: 'At what age can my child start?', a: 'We treat children from newborns to 18 years.' }],
    tags: ['Pediatric', 'Children', 'Development'],
  },
  {
    id: 'womens-health', name: "Women's Health Physiotherapy",
    shortDesc: "Specialised pelvic floor rehabilitation and women's health physiotherapy across all life stages.",
    fullDesc: "Our women's health physiotherapists specialise in pelvic floor dysfunction, pre and postnatal care with private, dignified consultations.",
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    duration: '60 min', sessions: '6–12 sessions', startingPrice: 1300, recovery: '6–16 weeks',
    conditions: ['Urinary incontinence', 'Pelvic organ prolapse', 'Postpartum recovery', 'Prenatal pain', 'Diastasis recti'],
    benefits: ['Resolved incontinence without surgery', 'Safe return to exercise postpartum'],
    sessionStructure: ['Comprehensive pelvic assessment', 'Pelvic floor therapy', 'Core restoration', 'Return-to-exercise guidance'],
    outcomes: ['85% resolved or significantly improved incontinence'],
    faqs: [{ q: 'Is the assessment private?', a: 'Absolutely. All assessments are conducted in private rooms with full dignity and consent protocols.' }],
    tags: ["Women's Health", 'Pelvic Floor', 'Postnatal'],
  },
  {
    id: 'geriatric', name: 'Geriatric Physiotherapy',
    shortDesc: 'Specialised physiotherapy for older adults — fall prevention, balance, and active ageing.',
    fullDesc: 'Our geriatric physiotherapy programme focuses on maintaining independence, preventing falls, and supporting active ageing.',
    image: 'https://images.unsplash.com/photo-1612276529731-4b21494e6d71?auto=format&fit=crop&w=600&q=80',
    duration: '45–60 min', sessions: 'Ongoing monthly', startingPrice: 900, recovery: 'Long-term management',
    conditions: ['Fall risk', 'Balance disorders', 'Osteoporosis', "Parkinson's disease", 'Hip fracture'],
    benefits: ['Reduced fall risk by 60%', 'Maintained independence', 'Improved confidence'],
    sessionStructure: ['Falls risk assessment', 'Balance retraining', 'Strength training', 'Environmental advice'],
    outcomes: ['60% reduction in fall risk', '80% maintained independent living at 2 years'],
    faqs: [{ q: 'My parent has had a fall — when should they start?', a: 'Immediately. Starting within a week dramatically reduces the risk of a second fall.' }],
    tags: ['Geriatric', 'Elderly', 'Balance', 'Falls'],
  },
];

export const SPECIALISTS: Specialist[] = [
  {
    id: 'sarah-jenkins', name: 'Dr. Sarah Jenkins', title: 'DPT, COMT',
    qualifications: 'Doctor of Physical Therapy, Certified Orthopaedic Manual Therapist',
    experience: 12, specializations: ['Orthopedic', 'Post-Op Rehab', 'Knee & Hip'],
    certifications: ['COMT', 'McKenzie Method', 'Dry Needling'],
    languages: ['English', 'Hindi'], rating: 4.9, reviews: 286,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    nextAvailable: 'Tomorrow 10:00 AM', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    bio: 'Dr. Sarah Jenkins is a distinguished orthopaedic physiotherapist with 12 years of clinical excellence. Her expertise in post-operative knee and hip rehabilitation has helped hundreds of patients achieve full functional recovery.',
    pricing: {
      'back-pain': { initial: 1500, followup: 1000, home: 1800, online: 700, emergency: 2200 },
      'neck-pain': { initial: 1400, followup: 900, home: 1700, online: 650, emergency: 2000 },
      'shoulder-rehab': { initial: 1600, followup: 1100, home: 1900, online: 750, emergency: 2300 },
      'knee-rehab': { initial: 1700, followup: 1200, home: 2000, online: 800, emergency: 2500 },
      'acl-rehab': { initial: 2000, followup: 1400, home: 2400, online: 900, emergency: 2800 },
      'sports-injury': { initial: 1600, followup: 1100, home: 1900, online: 750, emergency: 2300 },
      'frozen-shoulder': { initial: 1600, followup: 1100, home: 1900, online: 750, emergency: 2300 },
      'sciatica': { initial: 1500, followup: 1000, home: 1800, online: 700, emergency: 2200 },
      'arthritis': { initial: 1400, followup: 900, home: 1700, online: 650, emergency: 2000 },
      'stroke-rehab': { initial: 2000, followup: 1400, home: 2400, online: 900, emergency: 2800 },
      'post-surgery': { initial: 1700, followup: 1200, home: 2000, online: 800, emergency: 2500 },
      'pediatric': { initial: 1500, followup: 1000, home: 1800, online: 700, emergency: 2200 },
      'womens-health': { initial: 1600, followup: 1100, home: 1900, online: 750, emergency: 2300 },
      'geriatric': { initial: 1400, followup: 900, home: 1700, online: 650, emergency: 2000 },
    },
  },
  {
    id: 'marcus-thorne', name: 'Marcus Thorne', title: 'PT, MSc Neurological Rehab',
    qualifications: 'Masters in Neurological Rehabilitation',
    experience: 9, specializations: ['Neurological', 'Stroke', 'Spinal Cord'],
    certifications: ['Bobath', 'NDT', 'CIMT'],
    languages: ['English', 'Tamil'], rating: 4.8, reviews: 171,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    nextAvailable: 'Today 3:00 PM', availability: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat'],
    bio: 'Marcus Thorne specialises in complex neurological conditions, bringing a compassionate and scientific approach to stroke rehabilitation and spinal cord injury recovery.',
    pricing: {
      'back-pain': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
      'neck-pain': { initial: 1100, followup: 750, home: 1400, online: 550, emergency: 1700 },
      'shoulder-rehab': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
      'knee-rehab': { initial: 1300, followup: 900, home: 1600, online: 650, emergency: 1900 },
      'acl-rehab': { initial: 1600, followup: 1100, home: 1900, online: 750, emergency: 2300 },
      'sports-injury': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
      'frozen-shoulder': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
      'sciatica': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
      'arthritis': { initial: 1100, followup: 750, home: 1400, online: 550, emergency: 1700 },
      'stroke-rehab': { initial: 2200, followup: 1500, home: 2600, online: 1000, emergency: 3000 },
      'post-surgery': { initial: 1400, followup: 950, home: 1700, online: 700, emergency: 2100 },
      'pediatric': { initial: 1300, followup: 900, home: 1600, online: 650, emergency: 1900 },
      'womens-health': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
      'geriatric': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
    },
  },
  {
    id: 'elena-rodriguez', name: 'Dr. Elena Rodriguez', title: 'PhD Sports Science, CSCS',
    qualifications: 'PhD in Sports Science, Certified Strength & Conditioning Specialist',
    experience: 15, specializations: ['Sports Performance', 'ACL', 'Biomechanics'],
    certifications: ['CSCS', 'FMS', 'Sports Acupuncture', 'Blood Flow Restriction'],
    languages: ['English', 'Spanish', 'Hindi'], rating: 5.0, reviews: 328,
    image: 'https://images.unsplash.com/photo-1594824432258-c0b5de3c7e3f?auto=format&fit=crop&w=400&q=80',
    nextAvailable: 'Mon 9:00 AM', availability: ['Tue', 'Wed', 'Thu', 'Fri'],
    bio: 'Dr. Elena Rodriguez brings 15 years of elite sports rehabilitation experience, having worked with national-level athletes. Her PhD and cutting-edge techniques deliver superior outcomes for active patients.',
    pricing: {
      'back-pain': { initial: 1800, followup: 1200, home: 2200, online: 900, emergency: 2600 },
      'neck-pain': { initial: 1700, followup: 1100, home: 2100, online: 850, emergency: 2500 },
      'shoulder-rehab': { initial: 1900, followup: 1300, home: 2300, online: 950, emergency: 2700 },
      'knee-rehab': { initial: 2000, followup: 1400, home: 2400, online: 1000, emergency: 2800 },
      'acl-rehab': { initial: 2500, followup: 1700, home: 3000, online: 1200, emergency: 3500 },
      'sports-injury': { initial: 2000, followup: 1400, home: 2400, online: 1000, emergency: 2800 },
      'frozen-shoulder': { initial: 1900, followup: 1300, home: 2300, online: 950, emergency: 2700 },
      'sciatica': { initial: 1800, followup: 1200, home: 2200, online: 900, emergency: 2600 },
      'arthritis': { initial: 1700, followup: 1100, home: 2100, online: 850, emergency: 2500 },
      'stroke-rehab': { initial: 2500, followup: 1700, home: 3000, online: 1200, emergency: 3500 },
      'post-surgery': { initial: 2000, followup: 1400, home: 2400, online: 1000, emergency: 2800 },
      'pediatric': { initial: 1800, followup: 1200, home: 2200, online: 900, emergency: 2600 },
      'womens-health': { initial: 1900, followup: 1300, home: 2300, online: 950, emergency: 2700 },
      'geriatric': { initial: 1700, followup: 1100, home: 2100, online: 850, emergency: 2500 },
    },
  },
  {
    id: 'david-chen', name: 'David Chen', title: 'MScPT, Chronic Pain Specialist',
    qualifications: 'Masters in Physiotherapy, Certified Chronic Pain Management Specialist',
    experience: 8, specializations: ['Chronic Pain', 'Manual Therapy', 'Pain Science'],
    certifications: ['Explain Pain', 'Dry Needling', 'Manual Therapy Level 5'],
    languages: ['English', 'Mandarin', 'Hindi'], rating: 4.7, reviews: 159,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    nextAvailable: 'Tomorrow 2:00 PM', availability: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat'],
    bio: "David Chen's expertise in pain science and chronic pain management offers a transformative approach for patients who have suffered for years.",
    pricing: {
      'back-pain': { initial: 1300, followup: 900, home: 1600, online: 650, emergency: 1900 },
      'neck-pain': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
      'shoulder-rehab': { initial: 1300, followup: 900, home: 1600, online: 650, emergency: 1900 },
      'knee-rehab': { initial: 1400, followup: 950, home: 1700, online: 700, emergency: 2000 },
      'acl-rehab': { initial: 1700, followup: 1150, home: 2000, online: 800, emergency: 2400 },
      'sports-injury': { initial: 1300, followup: 900, home: 1600, online: 650, emergency: 1900 },
      'frozen-shoulder': { initial: 1300, followup: 900, home: 1600, online: 650, emergency: 1900 },
      'sciatica': { initial: 1400, followup: 950, home: 1700, online: 700, emergency: 2000 },
      'arthritis': { initial: 1300, followup: 900, home: 1600, online: 650, emergency: 1900 },
      'stroke-rehab': { initial: 1800, followup: 1200, home: 2200, online: 900, emergency: 2600 },
      'post-surgery': { initial: 1400, followup: 950, home: 1700, online: 700, emergency: 2000 },
      'pediatric': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
      'womens-health': { initial: 1300, followup: 900, home: 1600, online: 650, emergency: 1900 },
      'geriatric': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
    },
  },
  {
    id: 'jessica-wong', name: 'Jessica Wong', title: "PT, Women's Health Specialist",
    qualifications: "Bachelor of Physiotherapy, Post-Graduate Certificate Women's Health",
    experience: 7, specializations: ["Women's Health", 'Pelvic Floor', 'Postnatal'],
    certifications: ["Women's Health Physiotherapy", 'Pregnancy Pilates', 'Lymphoedema Management'],
    languages: ['English', 'Cantonese', 'Tamil'], rating: 5.0, reviews: 194,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    nextAvailable: 'Today 5:00 PM', availability: ['Mon', 'Tue', 'Thu', 'Fri'],
    bio: "Jessica Wong is our dedicated Women's Health physiotherapist. Her compassionate approach to pelvic floor rehabilitation has transformed the lives of hundreds of women.",
    pricing: {
      'back-pain': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
      'neck-pain': { initial: 1100, followup: 750, home: 1400, online: 550, emergency: 1700 },
      'shoulder-rehab': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
      'knee-rehab': { initial: 1300, followup: 900, home: 1600, online: 650, emergency: 1900 },
      'acl-rehab': { initial: 1500, followup: 1050, home: 1800, online: 750, emergency: 2200 },
      'sports-injury': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
      'frozen-shoulder': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
      'sciatica': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
      'arthritis': { initial: 1100, followup: 750, home: 1400, online: 550, emergency: 1700 },
      'stroke-rehab': { initial: 1800, followup: 1200, home: 2200, online: 900, emergency: 2600 },
      'post-surgery': { initial: 1300, followup: 900, home: 1600, online: 650, emergency: 1900 },
      'pediatric': { initial: 1200, followup: 800, home: 1500, online: 600, emergency: 1800 },
      'womens-health': { initial: 1500, followup: 1050, home: 1800, online: 750, emergency: 2200 },
      'geriatric': { initial: 1100, followup: 750, home: 1400, online: 550, emergency: 1700 },
    },
  },
  {
    id: 'james-carter', name: 'Dr. James Carter', title: 'DPT, Geriatric Specialist',
    qualifications: 'Doctor of Physical Therapy, Board Certified Geriatric Clinical Specialist',
    experience: 18, specializations: ['Geriatric', 'Falls Prevention', "Parkinson's", 'Balance'],
    certifications: ['BCGCS', 'LSVT BIG', 'Falls Prevention Instructor'],
    languages: ['English', 'Hindi', 'Bengali'], rating: 4.8, reviews: 281,
    image: 'https://images.unsplash.com/photo-1612276529731-4b21494e6d71?auto=format&fit=crop&w=400&q=80',
    nextAvailable: 'Wed 11:00 AM', availability: ['Mon', 'Wed', 'Thu', 'Sat'],
    bio: "Dr. James Carter has dedicated 18 years to improving the lives of older adults. His LSVT BIG certification makes him uniquely qualified for Parkinson's disease rehabilitation.",
    pricing: {
      'back-pain': { initial: 1600, followup: 1100, home: 1900, online: 750, emergency: 2300 },
      'neck-pain': { initial: 1500, followup: 1000, home: 1800, online: 700, emergency: 2200 },
      'shoulder-rehab': { initial: 1600, followup: 1100, home: 1900, online: 750, emergency: 2300 },
      'knee-rehab': { initial: 1700, followup: 1150, home: 2000, online: 800, emergency: 2400 },
      'acl-rehab': { initial: 2000, followup: 1400, home: 2400, online: 1000, emergency: 2800 },
      'sports-injury': { initial: 1600, followup: 1100, home: 1900, online: 750, emergency: 2300 },
      'frozen-shoulder': { initial: 1600, followup: 1100, home: 1900, online: 750, emergency: 2300 },
      'sciatica': { initial: 1600, followup: 1100, home: 1900, online: 750, emergency: 2300 },
      'arthritis': { initial: 1500, followup: 1000, home: 1800, online: 700, emergency: 2200 },
      'stroke-rehab': { initial: 2200, followup: 1500, home: 2600, online: 1100, emergency: 3000 },
      'post-surgery': { initial: 1800, followup: 1200, home: 2200, online: 900, emergency: 2600 },
      'pediatric': { initial: 1600, followup: 1100, home: 1900, online: 750, emergency: 2300 },
      'womens-health': { initial: 1600, followup: 1100, home: 1900, online: 750, emergency: 2300 },
      'geriatric': { initial: 1700, followup: 1150, home: 2000, online: 800, emergency: 2400 },
    },
  },
];

export const TIME_SLOTS: TimeSlot[] = [
  { id: 'slot-1', time: '7:00 AM', period: 'morning', available: true },
  { id: 'slot-2', time: '8:00 AM', period: 'morning', available: false },
  { id: 'slot-3', time: '8:30 AM', period: 'morning', available: true },
  { id: 'slot-4', time: '9:00 AM', period: 'morning', available: true },
  { id: 'slot-5', time: '9:30 AM', period: 'morning', available: false },
  { id: 'slot-6', time: '10:00 AM', period: 'morning', available: true },
  { id: 'slot-7', time: '10:30 AM', period: 'morning', available: true },
  { id: 'slot-8', time: '11:00 AM', period: 'morning', available: true },
  { id: 'slot-9', time: '11:30 AM', period: 'morning', available: false },
  { id: 'slot-10', time: '12:00 PM', period: 'afternoon', available: true },
  { id: 'slot-11', time: '1:00 PM', period: 'afternoon', available: false },
  { id: 'slot-12', time: '1:30 PM', period: 'afternoon', available: true },
  { id: 'slot-13', time: '2:00 PM', period: 'afternoon', available: true },
  { id: 'slot-14', time: '2:30 PM', period: 'afternoon', available: true },
  { id: 'slot-15', time: '3:00 PM', period: 'afternoon', available: false },
  { id: 'slot-16', time: '3:30 PM', period: 'afternoon', available: true },
  { id: 'slot-17', time: '4:00 PM', period: 'afternoon', available: true },
  { id: 'slot-18', time: '4:30 PM', period: 'afternoon', available: false },
  { id: 'slot-19', time: '5:00 PM', period: 'evening', available: true },
  { id: 'slot-20', time: '5:30 PM', period: 'evening', available: true },
  { id: 'slot-21', time: '6:00 PM', period: 'evening', available: true },
  { id: 'slot-22', time: '6:30 PM', period: 'evening', available: false },
  { id: 'slot-23', time: '7:00 PM', period: 'evening', available: true },
  { id: 'slot-24', time: '7:30 PM', period: 'evening', available: true },
];

export const APPOINTMENT_TYPES = [
  { id: 'initial' as AppointmentType, label: 'Initial Assessment', icon: '🔬', desc: 'Comprehensive first consultation with full assessment and treatment plan', duration: '60 min' },
  { id: 'followup' as AppointmentType, label: 'Follow-up Session', icon: '🔄', desc: 'Continue your treatment programme — builds on previous session progress', duration: '45 min' },
  { id: 'home' as AppointmentType, label: 'Home Visit', icon: '🏠', desc: 'Physiotherapist comes to your home — ideal for mobility-limited patients', duration: '60 min' },
  { id: 'online' as AppointmentType, label: 'Online Consultation', icon: '💻', desc: 'Video consultation — assessment, exercise guidance, and progress review', duration: '45 min' },
  { id: 'emergency' as AppointmentType, label: 'Emergency Consultation', icon: '⚡', desc: 'Same-day appointment for urgent pain or injury requiring immediate attention', duration: '60 min' },
];

export const MOCK_SESSIONS = [
  { id: 's1', date: '2026-06-15', session: 1, therapist: 'Dr. Sarah Jenkins', treatment: 'Back Pain Therapy', painScore: 8, mobilityScore: 40, notes: 'Initial assessment completed. Significant lumbar stiffness noted. Manual therapy applied. Home exercises prescribed.', exercises: ['Pelvic tilts x15', 'Cat-cow stretches x10', 'Knee-to-chest stretch 30s hold'], progress: 15 },
  { id: 's2', date: '2026-06-22', session: 2, therapist: 'Dr. Sarah Jenkins', treatment: 'Back Pain Therapy', painScore: 6, mobilityScore: 55, notes: 'Notable improvement in flexion. Patient reports 25% reduction in morning pain. Progressed exercises.', exercises: ['Bird-dog x12', 'Dead bug x10', 'Hip hinge practice x15'], progress: 35 },
  { id: 's3', date: '2026-06-29', session: 3, therapist: 'Dr. Sarah Jenkins', treatment: 'Back Pain Therapy', painScore: 4, mobilityScore: 70, notes: 'Excellent progress. Patient achieving full flexion. Core activation improved significantly.', exercises: ['McGill big 3', 'Wall sits x30s', 'Romanian deadlift with band x12'], progress: 58 },
];

export const MOCK_UPCOMING = [
  { id: 'u1', bookingId: 'HM-2026-04821', date: '2026-07-25', time: '10:00 AM', therapist: 'Dr. Sarah Jenkins', treatment: 'Back Pain Therapy', type: 'Follow-up Session', status: 'confirmed', fee: 1000 },
];

export const MOCK_INVOICES = [
  { id: 'inv-001', date: '2026-06-15', amount: 1500, treatment: 'Back Pain Therapy (Initial)', therapist: 'Dr. Sarah Jenkins', status: 'paid' },
  { id: 'inv-002', date: '2026-06-22', amount: 1000, treatment: 'Back Pain Therapy (Follow-up)', therapist: 'Dr. Sarah Jenkins', status: 'paid' },
  { id: 'inv-003', date: '2026-06-29', amount: 1000, treatment: 'Back Pain Therapy (Follow-up)', therapist: 'Dr. Sarah Jenkins', status: 'paid' },
];

export function getTreatmentById(id: string) { return TREATMENTS.find(t => t.id === id); }
export function getSpecialistById(id: string) { return SPECIALISTS.find(s => s.id === id); }
export function formatPrice(price: number) { return `\u20B9${price.toLocaleString('en-IN')}`; }
export function generateBookingId() {
  return `HM-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
}

