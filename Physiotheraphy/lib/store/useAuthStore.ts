import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/lib/authData';

export interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  redirectAfterLogin: string | null;

  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  setRedirectUrl: (url: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      redirectAfterLogin: null,

      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
          redirectAfterLogin: null,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          redirectAfterLogin: null,
        }),

      updateProfile: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      setRedirectUrl: (url) => set({ redirectAfterLogin: url }),
    }),
    {
      name: 'hm-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
