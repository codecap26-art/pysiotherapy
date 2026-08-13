'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, PhoneCall, Activity, User, LogIn, LogOut, Bell, 
  Calendar, Stethoscope, ShieldCheck, ChevronDown, LayoutDashboard 
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { db } from '@/lib/db';

const NAV_LINKS = [
  { href: '/',                  label: 'Home' },
  { href: '/treatments',        label: 'Treatments' },
  { href: '/specialists',       label: 'Specialists' },
  { href: '/recovery-timeline', label: 'Recovery Timeline' },
  { href: '/faqs',              label: 'FAQs' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu & dropdown on route change
  useEffect(() => {
    setMobileOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  // Click outside to close user dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync unread notifications count
  useEffect(() => {
    if (isAuthenticated && user) {
      const notifs = db.getNotifications(user.id);
      setUnreadCount(notifs.filter((n) => !n.read).length);
    } else {
      setUnreadCount(0);
    }
  }, [isAuthenticated, user, pathname]);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    router.push('/auth/login');
  };

  const getDashboardHref = () => {
    if (!user) return '/dashboard';
    if (user.role === 'therapist' || user.role === 'doctor') return '/dashboard/therapist';
    if (user.role === 'admin') return '/admin';
    return '/dashboard';
  };
  return (
    <>
      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className={`
          fixed z-50 flex items-center
          transition-all duration-300
          left-4 right-4 top-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[95%] lg:w-[90%] md:max-w-6xl h-16 rounded-[24px]
          ${scrolled
            ? 'bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
            : 'bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
          }
        `}
      >
        <div className="w-full px-4 sm:px-6 h-full flex items-center justify-between">
          {/* Logo — left corner */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0 outline-none">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#10B981] to-[#1E6FFF] flex items-center justify-center shadow-[0_2px_8px_rgba(30,111,255,0.4)]">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`text-sm font-black tracking-tight transition-colors ${
                scrolled ? 'text-[#0D1421] group-hover:text-[#1E6FFF]' : 'text-white group-hover:text-white/90'
              }`}>
                Healing Motion
              </span>
              <span className={`text-[9px] font-bold uppercase tracking-widest ${
                scrolled ? 'text-[#10B981]' : 'text-emerald-300'
              }`}>Physiotherapy</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    px-4 py-1.5 rounded-full text-[13px] font-bold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                    ${isActive
                      ? scrolled
                        ? 'bg-[#EFF5FF] text-[#1E6FFF] shadow-xs'
                        : 'bg-white/30 text-white border border-white/40 shadow-xs'
                      : scrolled
                        ? 'text-[#4A5568] hover:text-[#0D1421] hover:bg-slate-100/60'
                        : 'text-white/85 hover:text-white hover:bg-white/15'
                    }
                  `}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Action Area */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3" ref={dropdownRef}>
                {/* Notification Bell */}
                <Link
                  href="/dashboard/notifications"
                  className={`relative p-2 rounded-full transition-all ${
                    scrolled
                      ? 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0D1421]'
                      : 'bg-white/15 text-white border border-white/20 hover:bg-white/25'
                  }`}
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center animate-pulse border-2 border-white">
                      {unreadCount}
                    </span>
                  )}
                </Link>

                {/* User Dropdown Trigger */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className={`flex items-center gap-2 p-1 pr-3 rounded-full transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                      scrolled 
                        ? 'bg-white border border-[#E2E8F0] hover:border-[#1E6FFF]/50 hover:shadow-xs' 
                        : 'bg-white/15 border border-white/25 hover:bg-white/25 backdrop-blur-md'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#EFF5FF] border border-[#BFDBFE] flex items-center justify-center text-xs font-black text-[#1E6FFF] overflow-hidden shrink-0">
                      {user.avatar ? (
                        <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span>{user.firstName?.[0] || 'U'}</span>
                      )}
                    </div>
                    <div className="text-left leading-none">
                      <div className={`text-xs font-extrabold truncate max-w-[80px] ${scrolled ? 'text-[#0D1421]' : 'text-white'}`}>
                        {user.firstName}
                      </div>
                      <div className={`text-[8px] font-extrabold uppercase tracking-widest mt-0.5 ${scrolled ? 'text-[#1E6FFF]' : 'text-cyan-200'}`}>
                        {user.role}
                      </div>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 shrink-0 ${scrolled ? 'text-[#8896A8]' : 'text-white/80'}`} />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-12 w-60 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-2 z-50 space-y-1"
                      >
                        <div className="px-3 py-2 border-b border-gray-100">
                          <p className="text-xs font-bold text-[#0D1421] truncate">{user.firstName} {user.lastName}</p>
                          <p className="text-[11px] text-[#64748B] truncate">{user.email}</p>
                        </div>

                        <Link
                          href={getDashboardHref()}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#0D1421] hover:bg-[#EFF5FF] hover:text-[#1E6FFF] transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#1E6FFF]" />
                          <span>{user.role === 'therapist' || user.role === 'doctor' ? 'Doctor Portal' : user.role === 'admin' ? 'Admin Portal' : 'Patient Dashboard'}</span>
                        </Link>

                        <Link
                          href={user.role === 'therapist' || user.role === 'doctor' ? '/dashboard/therapist' : '/dashboard/appointments'}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#0D1421] hover:bg-[#EFF5FF] hover:text-[#1E6FFF] transition-colors"
                        >
                          <Calendar className="w-4 h-4 text-[#10B981]" />
                          <span>{user.role === 'therapist' || user.role === 'doctor' ? 'Clinical Schedule' : 'My Appointments'}</span>
                        </Link>

                        <Link
                          href="/dashboard/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#0D1421] hover:bg-[#EFF5FF] hover:text-[#1E6FFF] transition-colors"
                        >
                          <User className="w-4 h-4 text-[#8896A8]" />
                          <span>Profile Settings</span>
                        </Link>

                        <div className="pt-1 border-t border-gray-100">
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 w-full transition-colors cursor-pointer"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/book"
                  className="hidden xl:flex px-4 py-2 bg-[#1E6FFF] text-white text-[13px] font-bold rounded-full shadow-md hover:bg-[#1558D6] transition-colors items-center"
                >
                  Book Appointment
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all border ${
                    scrolled 
                      ? 'text-[#4A5568] hover:text-[#0D1421] hover:bg-slate-50 border-transparent hover:border-gray-200' 
                      : 'text-white hover:bg-white/10 border-transparent'
                  }`}
                >
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/book"
                  className="px-5 py-2 bg-[#1E6FFF] text-white text-[13px] font-bold rounded-full shadow-md hover:bg-[#1558D6] transition-colors flex items-center"
                >
                  Book Appointment
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            {isAuthenticated && user && (
              <Link
                href="/dashboard/notifications"
                className={`relative p-2 rounded-lg ${scrolled ? 'text-[#64748B]' : 'text-white'}`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Link>
            )}

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={`p-2 rounded-xl transition-colors ${scrolled ? 'text-[#4A5568] hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
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
            className="fixed top-16 left-0 right-0 z-40 bg-white/98 backdrop-blur-xl border-b border-[#E8ECF4] shadow-xl md:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {/* If authenticated user info in mobile */}
              {isAuthenticated && user ? (
                <div className="p-3 mb-2 rounded-2xl bg-[#EFF5FF] border border-[#BFDBFE] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white text-[#1E6FFF] font-black flex items-center justify-center text-xs">
                      {user.firstName?.[0] || 'U'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0D1421]">{user.firstName} {user.lastName}</div>
                      <div className="text-[10px] text-[#1E6FFF] font-semibold uppercase">{user.role}</div>
                    </div>
                  </div>
                  <Link
                    href={getDashboardHref()}
                    className="px-3 py-1.5 bg-[#1E6FFF] text-white text-xs font-bold rounded-xl"
                  >
                    Dashboard
                  </Link>
                </div>
              ) : null}

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

              <div className="pt-3 mt-2 border-t border-[#E8ECF4] flex flex-col gap-2">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-[#0D1421] bg-[#F8FAFC] border border-[#E2E8F0]"
                  >
                    <LogIn className="w-4 h-4 text-[#1E6FFF]" />
                    Sign In
                  </Link>
                )}

                <Link
                  href="/book"
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#10B981] to-[#1E6FFF] text-white text-center text-xs font-bold rounded-xl shadow-sm"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
