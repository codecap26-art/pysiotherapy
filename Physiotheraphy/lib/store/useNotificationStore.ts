import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Notification {
  id: string;
  type: 'confirmation' | 'reminder' | 'cancelled' | 'rescheduled' | 'general';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: string;
  bookingId?: string;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (id: string) => void;
  clearAll: () => void;
  unreadCount: () => number;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'confirmation',
    title: 'Appointment Confirmed',
    message: 'Your Back Pain Therapy session with Dr. Sarah Jenkins on Jul 25 at 10:00 AM has been confirmed.',
    timestamp: '2026-07-20T09:00:00Z',
    read: false,
    icon: '✅',
    bookingId: 'HM-2026-04821',
  },
  {
    id: 'n2',
    type: 'reminder',
    title: 'Appointment Tomorrow',
    message: 'Reminder: You have a Back Pain Therapy session tomorrow at 10:00 AM with Dr. Sarah Jenkins at Koramangala Clinic.',
    timestamp: '2026-07-24T10:00:00Z',
    read: false,
    icon: '🔔',
    bookingId: 'HM-2026-04821',
  },
  {
    id: 'n3',
    type: 'reminder',
    title: 'Session in 2 Hours',
    message: 'Your session with Dr. Sarah Jenkins starts at 10:00 AM. Please arrive 10 minutes early and bring comfortable clothing.',
    timestamp: '2026-07-25T08:00:00Z',
    read: false,
    icon: '⏰',
    bookingId: 'HM-2026-04821',
  },
  {
    id: 'n4',
    type: 'general',
    title: 'Recovery Update',
    message: 'Great progress! Your recovery is at 58%. Keep up with your home exercises for best results.',
    timestamp: '2026-07-18T14:00:00Z',
    read: true,
    icon: '📈',
  },
  {
    id: 'n5',
    type: 'rescheduled',
    title: 'Appointment Rescheduled',
    message: 'Your appointment on Jul 18 has been rescheduled to Jul 25 at 10:00 AM. Reason: Doctor unavailable.',
    timestamp: '2026-07-15T11:00:00Z',
    read: true,
    icon: '🔄',
    bookingId: 'HM-2026-04821',
  },
];

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: MOCK_NOTIFICATIONS,

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: `n-${Date.now()}`,
          timestamp: new Date().toISOString(),
          read: false,
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));
      },

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      dismissNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearAll: () => set({ notifications: [] }),

      unreadCount: () => get().notifications.filter((n) => !n.read).length,
    }),
    {
      name: 'hm-notifications-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
