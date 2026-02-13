'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth.store';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function AuthSync() {
  const { isLoggedIn, login } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) return;

    const role = getCookie('role');
    const email = getCookie('email');
    
    if (role === 'admin' || role === 'individual') {
      // Always use email from cookie if available, otherwise use placeholder
      login(email || 'user@session.local', role);
    }
  }, [isLoggedIn, login]);

  return null;
}