// lib/conditionData.ts

export type AgeGroupSlug = 'children' | 'teens' | 'adults' | 'seniors';

export interface AgeGroup {
  id: AgeGroupSlug;
  title: string;
  subtitle: string;
  ageRange: string;
  description: string;
  icon: string;
}

export const AGE_GROUPS: AgeGroup[] = [
  {
    id: 'children',
    title: 'Pediatric Physiotherapy',
    subtitle: 'Gentle, play-based therapy for kids',
    ageRange: '0–12 years',
    description: 'Children aren’t just small adults. Their growing bodies need specialized care to ensure proper development, address congenital issues, and recover safely from early injuries.',
    icon: 'Baby',
  },
  {
    id: 'teens',
    title: 'Adolescent & Sports',
    subtitle: 'Supporting growth spurts and active teens',
    ageRange: '13–19 years',
    description: 'Rapid growth, intense sports, and increased screen time can lead to unique musculoskeletal challenges for teenagers. We help teens build strength, correct posture, and recover from sports injuries.',
    icon: 'Activity',
  },
  {
    id: 'adults',
    title: 'General & Orthopedic',
    subtitle: 'Rehab and pain management for active adults',
    ageRange: '20–59 years',
    description: 'Whether it’s desk-related neck pain, a weekend warrior sports injury, or post-surgical rehab, our goal is to get you back to living pain-free and performing at your best.',
    icon: 'PersonStanding',
  },
  {
    id: 'seniors',
    title: 'Geriatric Physiotherapy',
    subtitle: 'Mobility, balance, and arthritis care',
    ageRange: '60+ years',
    description: 'Maintaining independence is key. We focus on fall prevention, joint replacement rehab, arthritis management, and improving overall mobility and confidence for older adults.',
    icon: 'Accessibility',
  },
];

export interface Condition {
  id: string;
  slug: string;
  name: string;
  ageGroups: AgeGroupSlug[];
  shortDesc: string;
  whatItIs: string;
  symptoms: string[];
  causes: string[];
  howWeHelp: string;
  timeline: string;
  urgentSymptoms: string[];
  affectedArea: 'head' | 'neck' | 'shoulder' | 'back' | 'elbow' | 'wrist' | 'hip' | 'knee' | 'ankle' | 'foot' | 'full-body';
}

export const CONDITIONS: Condition[] = [
  // Children
  {
    id: 'c-dev-delay', slug: 'developmental-delay', name: 'Developmental Delay', ageGroups: ['children'],
    shortDesc: 'Support for infants and children not reaching motor milestones.',
    whatItIs: 'A developmental delay occurs when a child takes longer than expected to reach movement milestones like rolling, crawling, or walking.',
    symptoms: ['Difficulty holding head up', 'Not rolling over by 6 months', 'Not sitting independently by 9 months', 'Stiff or floppy limbs'],
    causes: ['Premature birth', 'Genetic conditions', 'Neurological disorders like cerebral palsy', 'Lack of tummy time'],
    howWeHelp: 'We use play-based therapy to strengthen muscles, improve coordination, and encourage the child to achieve motor milestones in a safe, fun environment.',
    timeline: 'Varies greatly depending on the cause; consistent weekly sessions often show progress within 1-3 months.',
    urgentSymptoms: ['Loss of previously acquired motor skills', 'Extreme stiffness or spasticity'],
    affectedArea: 'full-body',
  },
  {
    id: 'c-torticollis', slug: 'torticollis', name: 'Torticollis', ageGroups: ['children'],
    shortDesc: 'Treatment for tight neck muscles causing a persistent head tilt in infants.',
    whatItIs: 'Torticollis, or "wry neck," happens when a baby’s neck muscle is tight, causing the head to tilt to one side and turn to the other.',
    symptoms: ['Head tilts consistently to one side', 'Baby prefers looking in only one direction', 'Flattening of the head on one side (plagiocephaly)', 'Difficulty breastfeeding on one side'],
    causes: ['Positioning in the womb', 'Difficult childbirth', 'Prolonged time in car seats or carriers'],
    howWeHelp: 'Gentle stretching of the tight neck muscles, strengthening the opposite side, and teaching parents positioning techniques to encourage looking both ways.',
    timeline: 'Most infants see significant improvement within 3-6 months with consistent stretching and positioning.',
    urgentSymptoms: ['A firm lump in the neck muscle that grows', 'Vision issues or eye tracking problems'],
    affectedArea: 'neck',
  },
  // Teens
  {
    id: 't-osgood', slug: 'osgood-schlatter', name: 'Osgood-Schlatter Disease', ageGroups: ['teens'],
    shortDesc: 'Knee pain caused by growth spurts and active sports participation.',
    whatItIs: 'An inflammation of the area just below the knee where the tendon from the kneecap attaches to the shinbone. Common during growth spurts in athletic teens.',
    symptoms: ['Knee pain and tenderness at the bony prominence just below the kneecap', 'Swelling', 'Pain that worsens with running, jumping, or stairs'],
    causes: ['Rapid bone growth during puberty combined with repeated stress on the patellar tendon from sports.'],
    howWeHelp: 'We focus on activity modification, pain management, and stretching the tight quadriceps and hamstrings to reduce tension on the tendon.',
    timeline: 'Symptoms typically resolve once the teenager stops growing, but rehab can manage pain and allow sports participation within 4-8 weeks.',
    urgentSymptoms: ['Severe pain at rest', 'Inability to bear weight', 'Fever or redness around the knee'],
    affectedArea: 'knee',
  },
  {
    id: 't-posture', slug: 'tech-neck-posture', name: 'Tech Neck & Posture', ageGroups: ['teens', 'adults'],
    shortDesc: 'Correction for neck and back pain caused by prolonged screen time.',
    whatItIs: 'Neck, shoulder, and upper back pain resulting from prolonged poor posture, particularly looking down at phones or slouching at desks.',
    symptoms: ['Aching neck and shoulders', 'Upper back stiffness', 'Tension headaches', 'Forward head posture'],
    causes: ['Prolonged screen time (phones, gaming, studying)', 'Weak upper back muscles', 'Poor ergonomic setup'],
    howWeHelp: 'Postural re-education, strengthening of the deep neck flexors and upper back, stretching of tight chest muscles, and ergonomic advice.',
    timeline: 'Significant relief in 4-6 weeks with consistent adherence to prescribed postural exercises.',
    urgentSymptoms: ['Numbness or tingling down the arms', 'Weakness in the hands', 'Severe shooting pain'],
    affectedArea: 'neck',
  },
  // Adults
  {
    id: 'a-back-pain', slug: 'back-pain', name: 'Lower Back Pain', ageGroups: ['adults', 'seniors'],
    shortDesc: 'Evidence-based treatment for acute and chronic lumbar spine issues.',
    whatItIs: 'Pain in the lumbar region (lower back) which can range from a dull ache to a sudden sharp pain, often affecting daily activities and sleep.',
    symptoms: ['Muscle aching', 'Shooting or stabbing pain', 'Pain that worsens with bending, lifting, or prolonged sitting', 'Pain that radiates down the leg'],
    causes: ['Muscle or ligament strain', 'Bulging or ruptured discs', 'Poor posture', 'Arthritis', 'Sedentary lifestyle'],
    howWeHelp: 'Through manual therapy to restore joint mobility, dry needling for muscle spasms, and a targeted core strengthening program to stabilize the spine and prevent recurrence.',
    timeline: 'Acute episodes often improve in 2-4 weeks; chronic cases may require 6-12 weeks of structured rehabilitation.',
    urgentSymptoms: ['Loss of bowel or bladder control', 'Saddle anesthesia (numbness in groin)', 'Sudden severe leg weakness'],
    affectedArea: 'back',
  },
  {
    id: 'a-sports', slug: 'sports-injuries', name: 'Adult Sports Injuries', ageGroups: ['adults'],
    shortDesc: 'Fast-track recovery for strains, sprains, and sports-related trauma.',
    whatItIs: 'Musculoskeletal injuries sustained during athletic activities or exercise, ranging from acute sprains to overuse tendinopathies.',
    symptoms: ['Sudden sharp pain during activity', 'Swelling and bruising', 'Inability to bear weight', 'Joint instability or clicking'],
    causes: ['Sudden trauma (twisting, falling)', 'Overuse and repetitive stress', 'Improper technique or footwear', 'Inadequate warm-up'],
    howWeHelp: 'We employ the PRICE protocol initially, followed by manual therapy, progressive loading exercises, and sport-specific drills to ensure a safe return to play.',
    timeline: 'Minor strains heal in 2-4 weeks; severe sprains or tendon issues may take 8-16 weeks for full return to sport.',
    urgentSymptoms: ['Visible joint deformity', 'Inability to move the joint', 'Severe swelling immediately after impact'],
    affectedArea: 'full-body',
  },
  // Seniors
  {
    id: 's-arthritis', slug: 'arthritis-management', name: 'Arthritis Management', ageGroups: ['seniors', 'adults'],
    shortDesc: 'Long-term joint health program to reduce pain and maintain mobility.',
    whatItIs: 'Inflammation of one or more joints, most commonly osteoarthritis (wear and tear) or rheumatoid arthritis (autoimmune), causing pain and stiffness.',
    symptoms: ['Joint pain and stiffness, especially in the morning', 'Swelling around the joint', 'Decreased range of motion', 'Grinding sensation (crepitus)'],
    causes: ['Cartilage degradation over time', 'Previous joint injuries', 'Genetics', 'Obesity placing extra stress on joints'],
    howWeHelp: 'While we cannot reverse arthritis, we significantly reduce pain and improve function through joint mobilization, hydrotherapy, and strengthening the muscles surrounding the joint to offload stress.',
    timeline: 'This is typically an ongoing management plan, but patients often report reduced pain and improved mobility within 4-8 weeks of starting a tailored exercise program.',
    urgentSymptoms: ['Joint is hot, red, and swollen (possible infection)', 'Sudden inability to bear weight', 'Systemic fever accompanying joint pain'],
    affectedArea: 'knee', // often knee or hip
  },
  {
    id: 's-balance', slug: 'fall-prevention', name: 'Balance & Fall Prevention', ageGroups: ['seniors'],
    shortDesc: 'Targeted balance training to improve confidence and prevent dangerous falls.',
    whatItIs: 'A specialized program designed to improve proprioception, vestibular function, and lower body strength to keep older adults stable on their feet.',
    symptoms: ['Feeling unsteady when walking', 'Dizziness when changing positions', 'A history of recent falls or near-misses', 'Fear of falling causing restricted activity'],
    causes: ['Muscle weakness', 'Inner ear (vestibular) issues', 'Medication side effects', 'Vision changes', 'Neuropathy in the feet'],
    howWeHelp: 'We perform a comprehensive fall risk assessment, then prescribe specific balance retraining exercises, gait training, and lower limb strengthening to restore stability and confidence.',
    timeline: 'Noticeable improvements in balance and confidence usually occur within 6-10 weeks of consistent practice.',
    urgentSymptoms: ['Sudden severe dizziness or vertigo', 'Falls accompanied by loss of consciousness or head trauma', 'Sudden unexplained weakness on one side'],
    affectedArea: 'full-body',
  }
];
