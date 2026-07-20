import type { Metadata } from 'next';
import { SpecialistsDirectory } from './SpecialistsDirectory';

export const metadata: Metadata = { 
  title: 'Clinical Specialists',
  description: 'Our elite team of physiotherapy specialists dedicated to your recovery journey.' 
};

export default function SpecialistsPage() {
  return <SpecialistsDirectory />;
}
