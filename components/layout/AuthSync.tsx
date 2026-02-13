'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth.store';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function AuthSync() {
  const { isLoggedIn, login, email } = useAuthStore();

  useEffect(() => {
    // Only sync if not already logged in
    if (isLoggedIn) return;

    const role = getCookie('role');
    const emailFromCookie = getCookie('email');
    
    if (role === 'admin' || role === 'individual') {
      // Use email from cookie, fallback to placeholder only if cookie doesn't exist
      const emailToUse = emailFromCookie || 'user@session.local';
      login(emailToUse, role);
    }
  }, [isLoggedIn, login, email]);

  return null;
}