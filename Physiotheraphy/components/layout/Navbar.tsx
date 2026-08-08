'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
<<<<<<< HEAD
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
    if (user.role === 'therapist') return '/dashboard/therapist';
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
          fixed top-0 left-0 right-0 z-50 h-16
          transition-[background,border,box-shadow] duration-300
          ${scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-[#E8ECF4] shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
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
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    relative px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150
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

          {/* Desktop Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3" ref={dropdownRef}>
                {/* Notification Bell */}
                <Link
                  href="/dashboard/notifications"
                  className="relative p-2 rounded-xl text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0D1421] transition-all"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </Link>

                {/* User Dropdown Trigger */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#1E6FFF]/50 hover:shadow-xs transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#EFF5FF] border border-[#BFDBFE] flex items-center justify-center text-xs font-black text-[#1E6FFF] overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span>{user.firstName?.[0] || 'U'}</span>
                      )}
                    </div>
                    <div className="text-left leading-none">
                      <div className="text-xs font-bold text-[#0D1421] max-w-[100px] truncate">
                        {user.firstName}
                      </div>
                      <div className="text-[9px] font-semibold text-[#1E6FFF] uppercase tracking-wider mt-0.5">
                        {user.role}
                      </div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-[#8896A8]" />
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
                          <span>{user.role === 'therapist' ? 'Doctor Portal' : user.role === 'admin' ? 'Admin Portal' : 'Patient Dashboard'}</span>
                        </Link>

                        <Link
                          href={user.role === 'therapist' ? '/dashboard/therapist' : '/dashboard/appointments'}
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#0D1421] hover:bg-[#EFF5FF] hover:text-[#1E6FFF] transition-colors"
                        >
                          <Calendar className="w-4 h-4 text-[#10B981]" />
                          <span>{user.role === 'therapist' ? 'Clinical Schedule' : 'My Appointments'}</span>
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
                  className="px-4 py-2 bg-gradient-to-r from-[#10B981] to-[#1E6FFF] text-white text-xs font-bold rounded-xl shadow-sm hover:opacity-90 transition-opacity"
                >
                  Book Session
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#0D1421] hover:text-[#1E6FFF] hover:bg-[#F8FAFC] border border-[#E2E8F0] transition-all"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#1E6FFF]" />
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/book"
                  className="px-5 py-2.5 bg-gradient-to-r from-[#10B981] to-[#1E6FFF] text-white text-xs font-bold rounded-xl shadow-[0_4px_15px_rgba(30,111,255,0.3)] hover:opacity-90 transition-opacity"
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
                className="relative p-2 rounded-lg text-[#64748B]"
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
              className="p-2 rounded-lg text-[#4A5568] hover:bg-[#F8FAFC] transition-colors"
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
