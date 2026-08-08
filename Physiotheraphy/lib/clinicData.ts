// ─────────────────────────────────────────────────────────────────────────────
// lib/clinicData.ts  —  Clinic branches data layer
// ─────────────────────────────────────────────────────────────────────────────

export interface ClinicBranch {
  id: string;
  name: string;
  tagline: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  hours: string;
  distanceKm: number;
  image: string;
  coordinates: { lat: number; lng: number };
  amenities: string[];
  parking: boolean;
  wheelchairAccessible: boolean;
  publicTransit: string;
  rating: number;
  reviewsCount: number;
  doctorsCount: number;
}

export const CLINIC_BRANCHES: ClinicBranch[] = [
  {
    id: 'clinic-indiranagar',
    name: 'Indiranagar Flagship Centre',
    tagline: 'Comprehensive Orthopedic & Sports Medicine Facility',
    address: '842, 100 Feet Rd, HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru, Karnataka 560038',
    phone: '+91 80 4123 4567',
    email: 'indiranagar@healingmotion.com',
    hours: 'Mon - Sat: 7:00 AM - 9:00 PM | Sun: 8:00 AM - 2:00 PM',
    distanceKm: 2.4,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    coordinates: { lat: 12.9716, lng: 77.6412 },
    amenities: ['Hydrotherapy Pool', 'Isokinetic Lab', 'Private Treatment Suites', 'Digital Gait Lab'],
    parking: true,
    wheelchairAccessible: true,
    publicTransit: '150m from CMH Road Metro Station (Purple Line)',
    rating: 4.9,
    reviewsCount: 342,
    doctorsCount: 6,
  },
  {
    id: 'clinic-koramangala',
    name: 'Koramangala Sports & Rehab Hub',
    tagline: 'High-Performance Athlete Recovery & Spine Clinic',
    address: '4th Block, 80 Feet Road, Near Sony World Signal, Koramangala',
    city: 'Bengaluru, Karnataka 560034',
    phone: '+91 80 4123 7890',
    email: 'koramangala@healingmotion.com',
    hours: 'Mon - Sat: 7:00 AM - 8:30 PM | Sun: 9:00 AM - 1:00 PM',
    distanceKm: 5.1,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    coordinates: { lat: 12.9352, lng: 77.6245 },
    amenities: ['Class IV Laser', 'Cryotherapy Chamber', 'Spine Decompression', 'Therapeutic Gym'],
    parking: true,
    wheelchairAccessible: true,
    publicTransit: 'Direct bus connectivity from Hosur Main Road',
    rating: 4.8,
    reviewsCount: 289,
    doctorsCount: 5,
  },
  {
    id: 'clinic-whitefield',
    name: 'Whitefield Ortho & Neuro Care',
    tagline: 'Specialized Stroke, Spinal & Ergonomic Health Centre',
    address: 'Prestige Tech Vista, ITPL Main Road, Whitefield',
    city: 'Bengaluru, Karnataka 560066',
    phone: '+91 80 4123 9900',
    email: 'whitefield@healingmotion.com',
    hours: 'Mon - Sat: 8:00 AM - 9:00 PM | Sun: Closed',
    distanceKm: 12.8,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
    coordinates: { lat: 12.9698, lng: 77.7499 },
    amenities: ['Robotic Neuro-Rehab', 'Shockwave Therapy', 'Ergonomic Studio', 'EMG Diagnostics'],
    parking: true,
    wheelchairAccessible: true,
    publicTransit: '300m from Kadugodi Tree Park Metro Station',
    rating: 4.9,
    reviewsCount: 215,
    doctorsCount: 4,
  },
  {
    id: 'clinic-jayanagar',
    name: 'Jayanagar Geriatric & Pediatric Clinic',
    tagline: 'Gentle Mobility, Women’s Health & Developmental Therapy',
    address: '9th Main, 4th Block, Near Jayanagar Shopping Complex',
    city: 'Bengaluru, Karnataka 560011',
    phone: '+91 80 4123 1122',
    email: 'jayanagar@healingmotion.com',
    hours: 'Mon - Sat: 8:00 AM - 8:00 PM | Sun: 8:30 AM - 1:30 PM',
    distanceKm: 7.6,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    coordinates: { lat: 12.9250, lng: 77.5838 },
    amenities: ['Pediatric Sensory Room', 'Pelvic Health Suite', 'Balance Training Park', 'Ultrasound'],
    parking: true,
    wheelchairAccessible: true,
    publicTransit: '200m from South End Circle Metro Station (Green Line)',
    rating: 4.9,
    reviewsCount: 198,
    doctorsCount: 4,
  },
];
