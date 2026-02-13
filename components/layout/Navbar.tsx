'use client';

import { useMounted } from '@/lib/hooks/useMounted';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth.store';
import { useToastStore } from '@/lib/store/toast.store';
import { deleteCookie } from '@/lib/helpers/cookies';

export function Navbar() {
  const router = useRouter();
  const { isLoggedIn, email, role, logout } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);
  const mounted = useMounted();

  const handleLogout = () => {
    deleteCookie('role');
    logout();
    addToast('Logged out', 'info');
    router.push('/');
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold text-gray-900">
            FormBuilder
          </Link>

          {mounted && isLoggedIn && (
            <Link
              href="/forms"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Forms
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!mounted ? (
            <div className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
          ) : isLoggedIn ? (
            <>
              <span className="text-sm text-gray-500 hidden sm:inline">
                {email}
                <span className="ml-1.5 px-1.5 py-0.5 bg-gray-100 rounded text-xs font-medium">
                  {role}
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
