import { create } from 'zustand';

export interface ToastNotification {
  id: string;
  type: 'confirmation' | 'reminder' | 'cancelled' | 'rescheduled' | 'general' | 'error';
  title: string;
  message: string;
  timestamp: string;
  icon: string;
  bookingId?: string;
}

interface NotificationState {
  toasts: ToastNotification[];
  addToast: (notification: Omit<ToastNotification, 'id' | 'timestamp'>) => void;
  dismissToast: (id: string) => void;
  clearAllToasts: () => void;
}

/**
 * useNotificationStore — for UI toast/popup notifications only.
 * Real persistent notifications are stored in the server database
 * and fetched via /api/notifications with the user's auth token.
 *
 * This store is NOT persisted to localStorage to prevent cross-user data leaks.
 */
export const useNotificationStore = create<NotificationState>()(
  (set) => ({
    toasts: [],

    addToast: (notification) => {
      const newToast: ToastNotification = {
        ...notification,
        id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: new Date().toISOString(),
      };
      set((state) => ({
        toasts: [newToast, ...state.toasts].slice(0, 10), // Keep max 10 toasts
      }));

      // Auto-dismiss after 8 seconds
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== newToast.id),
        }));
      }, 8000);
    },

    dismissToast: (id) =>
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      })),

    clearAllToasts: () => set({ toasts: [] }),
  })
);
