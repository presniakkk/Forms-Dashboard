import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  timeoutId?: NodeJS.Timeout;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  addToast: (message, type = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    const timeoutId = setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);

    set((state) => ({
      toasts: [...state.toasts, { id, message, type, timeoutId }],
    }));
  },

  removeToast: (id) =>
    set((state) => {
      const toast = state.toasts.find((t) => t.id === id);
      if (toast?.timeoutId) {
        clearTimeout(toast.timeoutId);
      }
      return {
        toasts: state.toasts.filter((t) => t.id !== id),
      };
    }),
}));