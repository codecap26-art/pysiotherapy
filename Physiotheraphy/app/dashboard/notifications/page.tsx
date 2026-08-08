'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { db, DBNotification } from '@/lib/db';
import { 
  Bell, CheckCircle2, Calendar, FileText, Activity, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotificationsPage() {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState<DBNotification[]>([]);

  const refreshNotifs = () => {
    if (user) {
      setNotifications(db.getNotifications(user.id));
    }
  };

  useEffect(() => {
    refreshNotifs();
  }, [user]);

  const handleMarkAllRead = () => {
    db.markAllNotificationsRead(user?.id);
    refreshNotifs();
  };

  const handleMarkSingleRead = (id: string) => {
    db.markNotificationRead(id);
    refreshNotifs();
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0D1421] tracking-tight">
            Notifications & Clinical Alerts
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Stay informed about your upcoming clinical appointments, physician updates, and prescribed home routines.
          </p>
        </div>

        {notifications.some((n) => !n.read) && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#1E6FFF] hover:bg-blue-50 transition-all self-start sm:self-auto cursor-pointer"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-3xl border-2 border-[#E8ECF4] p-12 text-center">
          <Bell className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#0D1421] mb-1">No notifications yet</h3>
          <p className="text-xs text-[#64748B]">You will receive updates here whenever appointment status changes or clinical notes are added.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => {
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => !notif.read && handleMarkSingleRead(notif.id)}
                className={`p-5 rounded-3xl border-2 transition-all flex items-start justify-between gap-4 cursor-pointer ${
                  notif.read
                    ? 'bg-white border-[#E8ECF4]'
                    : 'bg-[#EFF5FF] border-[#BFDBFE] shadow-xs'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    notif.type === 'clinical'
                      ? 'bg-emerald-100 text-emerald-700'
                      : notif.type === 'booking'
                      ? 'bg-blue-100 text-[#1E6FFF]'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {notif.type === 'clinical' ? (
                      <FileText className="w-5 h-5" />
                    ) : (
                      <Calendar className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#0D1421]">{notif.title}</h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-[#1E6FFF]" />
                      )}
                    </div>
                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{notif.message}</p>
                    <span className="text-[10px] font-semibold text-[#8896A8] mt-2 block">
                      {new Date(notif.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                {notif.link && (
                  <Link
                    href={notif.link}
                    className="p-2 text-xs font-bold text-[#1E6FFF] hover:text-[#1558D6] shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
