import Link from 'next/link';
import { ArrowUpRight, Activity } from 'lucide-react';

const EXPLORE = [
  { href: '/treatments', label: 'Treatments' },
  { href: '/specialists', label: 'Specialists' },
  { href: '/credentials', label: 'Clinical Credentials' },
];
const LEGAL = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/sitemap', label: 'Sitemap' },
];
const CONNECT = [
  { href: '#', label: 'LinkedIn', icon: '🔗' },
  { href: '#', label: 'Instagram', icon: '📷' },
  { href: 'mailto:contact@healingmotion.fit', label: 'Email', icon: '✉️' },
];
 
export default function Footer() {
  return (
    <footer className="bg-[#0D1421] text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10B981] to-[#1E6FFF] flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">Healing Motion</span>
            </div>
            <p className="text-[#8896A8] text-sm leading-relaxed max-w-xs">
              Professional physiotherapy with a focus on guided recovery and patient empowerment through evidence-based treatment.
            </p>
            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-[#8896A8] mb-1 font-medium">Clinic Hours</p>
              <p className="text-sm text-white font-medium">Mon – Fri: 8:00 AM – 7:00 PM</p>
              <p className="text-sm text-[#8896A8]">Sat: 9:00 AM – 2:00 PM</p>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8896A8] mb-5">Explore</h4>
            <ul className="space-y-3">
              {EXPLORE.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#CBD5E1] hover:text-white transition-colors group flex items-center gap-1">
                    {label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8896A8] mb-5">Legal</h4>
            <ul className="space-y-3">
              {LEGAL.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-[#CBD5E1] hover:text-white transition-colors group flex items-center gap-1">
                    {label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8896A8] mb-5">Start your recovery</h4>
            <p className="text-sm text-[#8896A8] mb-6 leading-relaxed">
              Ready to begin? Book your initial assessment and let us build a personalized path to full mobility.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#1E6FFF] hover:bg-[#1558D6] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              Book an Appointment <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#4A5568]">© 2024 Healing Motion Physiotherapy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {CONNECT.map(({ href, label }) => (
              <a key={label} href={href} aria-label={label} className="text-[#4A5568] hover:text-white text-xs transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
