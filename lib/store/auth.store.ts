import { create } from 'zustand';

type Role = 'individual' | 'admin' | null;

interface AuthState {
  email: string | null;
  role: Role;
  isLoggedIn: boolean;
  login: (email: string, role: NonNullable<Role>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: null,
  role: null,
  isLoggedIn: false,

  login: (email, role) => set({ email, role, isLoggedIn: true }),
  logout: () => set({ email: null, role: null, isLoggedIn: false }),
}));