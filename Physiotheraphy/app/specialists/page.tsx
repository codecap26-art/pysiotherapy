import type { Metadata } from 'next';
import { SpecialistsDirectory } from './SpecialistsDirectory';

export const metadata: Metadata = {
  title: 'Clinical Specialists',
  description: 'Our elite team of physiotherapy specialists dedicated to your recovery journey.',
};

const SPECIALISTS = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins, DPT',
    role: 'Lead Orthopedic Specialist',
    roleVariant: 'primary' as const,
    rating: 4.9,
    description: 'Specializing in post-operative knee and hip recovery, helping patients regain full mobility and strength safely.',
    tags: ['Orthopedic', 'Post-Op'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    reviews: 86,
  },
  {
    id: 2,
    name: 'Marcus Thorne, PT',
    role: 'Neurological Specialist',
    roleVariant: 'warning' as const,
    rating: 4.8,
    description: 'Expertise in spinal cord injury recovery and gait retraining, utilizing advanced neuro-rehab techniques.',
    tags: ['Neurological'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    reviews: 71,
  },
  {
    id: 3,
    name: 'Dr. Elena Rodriguez',
    role: 'Sports Performance Lab',
    roleVariant: 'accent' as const,
    rating: 5.0,
    description: 'Combining biomechanical analysis with elite sports conditioning to keep athletes at their peak performance.',
    tags: ['Sports Injury', 'Performance'],
    image: 'https://images.unsplash.com/photo-1594824432258-c0b5de3c7e3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    reviews: 128,
  },
  {
    id: 4,
    name: 'David Chen, MScPT',
    role: 'Chronic Pain Specialist',
    roleVariant: 'danger' as const,
    rating: 4.7,
    description: 'Holistic approach to managing long-term musculoskeletal conditions and reducing reliance on pain medication.',
    tags: ['Chronic Pain', 'Manual Therapy'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    reviews: 59,
  },
  {
    id: 5,
    name: 'Dr. Michael Hayes',
    role: 'Pediatric Physiotherapist',
    roleVariant: 'primary' as const,
    rating: 4.9,
    description: 'Specializing in early childhood mobility disorders and developmental delays. Creating a fun, engaging recovery environment for kids.',
    tags: ['Pediatric', 'Developmental'],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    reviews: 112,
  },
  {
    id: 6,
    name: 'Jessica Wong, PT',
    role: 'Pelvic Health Specialist',
    roleVariant: 'warning' as const,
    rating: 5.0,
    description: 'Evidence-based pelvic floor rehabilitation for postpartum recovery and chronic pelvic pain management.',
    tags: ['Pelvic Health', 'Postpartum'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    reviews: 94,
  },
  {
    id: 7,
    name: 'Dr. James Carter',
    role: 'Geriatric Specialist',
    roleVariant: 'accent' as const,
    rating: 4.8,
    description: 'Focusing on fall prevention, balance training, and maintaining independence for older adults through targeted strength programs.',
    tags: ['Geriatric', 'Balance'],
    image: 'https://images.unsplash.com/photo-1612276529731-4b21494e6d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    reviews: 81,
  },
  {
    id: 8,
    name: 'Aisha Patel, DPT',
    role: 'Cardiopulmonary Rehab',
    roleVariant: 'danger' as const,
    rating: 4.9,
    description: 'Guiding patients through safe return-to-activity protocols following cardiac events or pulmonary conditions.',
    tags: ['Cardiopulmonary', 'Endurance'],
    image: 'https://images.unsplash.com/photo-1594824432258-c0b5de3c7e3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    reviews: 67,
  }
];

const SPECIALTY_FILTERS = ['Orthopedic', 'Neurological', 'Sports Injury', 'Post-Op', 'Pediatric'];
const EXPERIENCE_FILTERS = ['0-5 Years', '5-10 Years', '10+ Years'];
const AVAILABILITY_FILTERS = ['Today', 'This Week', 'Virtual Only'];

function FilterGroup({ title, items, active }: { title: string; items: string[]; active?: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-[#8896A8] mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
              item === active
                ? 'bg-[#1E6FFF] text-white border-[#1E6FFF] shadow-[0_2px_8px_rgba(30,111,255,0.3)]'
                : 'bg-white border-[#E8ECF4] text-[#4A5568] hover:border-[#1E6FFF]/40 hover:text-[#1E6FFF]'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SpecialistsPage() {
  return <SpecialistsDirectory />;
}
