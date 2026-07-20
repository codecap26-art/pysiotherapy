'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Activity } from 'lucide-react';
import { Button, LinkButton } from '@/components/ui/Button';

const NAV_LINKS = [
  { href: '/',                  label: 'Home' },
  { href: '/treatments',        label: 'Treatments' },
  { href: '/specialists',       label: 'Specialists' },
  { href: '/recovery-timeline', label: 'Recovery Timeline' },
  { href: '/faqs',              label: 'FAQs' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className={`
          fixed top-0 left-0 right-0 z-50 h-16
          transition-[background,border,box-shadow] duration-300
          ${scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-[#E8ECF4] shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
            : 'bg-transparent border-b border-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#10B981] to-[#1E6FFF] flex items-center justify-center shadow-[0_2px_8px_rgba(30,111,255,0.4)]">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-black tracking-tight text-[#0D1421] group-hover:text-[#1E6FFF] transition-colors">
                Healing Motion
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-widest text-[#10B981]">Physiotherapy</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150
                    ${isActive
                      ? 'text-[#1E6FFF]'
                      : 'text-[#4A5568] hover:text-[#0D1421] hover:bg-[#F8FAFC]'
                    }
                  `}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-[#EFF5FF] rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+15550123"
              className="flex items-center gap-2 text-sm font-semibold text-[#4A5568] hover:text-[#1E6FFF] transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              +1-555-0123
            </a>
            <a
              href="/book"
              className="px-5 py-2.5 bg-gradient-to-r from-[#10B981] to-[#1E6FFF] text-white text-sm font-semibold rounded-xl shadow-[0_4px_15px_rgba(30,111,255,0.3)] hover:opacity-90 transition-opacity"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-[#4A5568] hover:bg-[#F8FAFC] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#E8ECF4] shadow-xl md:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-[#EFF5FF] text-[#1E6FFF]' : 'text-[#4A5568] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-[#E8ECF4] mt-2">
                <Link href="/book" className="block w-full bg-[#1E6FFF] text-white text-center py-3 rounded-xl text-sm font-semibold">
                  Book Appointment
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
