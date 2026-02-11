'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginSchema, LoginSchema } from '@/lib/schemas/auth.schema';
import { useAuthStore } from '@/lib/store/auth.store';
import { useToastStore } from '@/lib/store/toast.store';
import { setCookie } from '@/lib/helpers/cookies';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const addToast = useToastStore((state) => state.addToast);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      role: 'individual',
    },
  });

  const onSubmit = (data: LoginSchema) => {
    setCookie('role', data.role);
    login(data.email, data.role);
    addToast(`Welcome! Logged in as ${data.role}`, 'success');

    const redirect = searchParams.get('redirect') || '/forms';
    router.push(redirect);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
          <p className="mt-2 text-gray-600">Enter your details to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              {...register('role')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="individual">Individual</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p role="alert" className="mt-1 text-sm text-red-600">
                {errors.role.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
