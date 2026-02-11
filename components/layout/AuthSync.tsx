'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth.store';

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? match[1] : null;
}

export function AuthSync() {
  const { isLoggedIn, login } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) return;

    const role = getCookie('role');
    if (role === 'admin' || role === 'individual') {
      login('user@session.local', role);
    }
  }, [isLoggedIn, login]);

  return null;
}