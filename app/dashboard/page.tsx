import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { FormTable } from '@/components/forms/FormTable';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value;

  if (!role) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Manage your forms from here.
            </p>
          </div>
          {role === 'admin' && (
            <Button href="/forms/new">Create New Form</Button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Forms
          </h2>
          <FormTable />
        </div>
      </div>
    </main>
  );
}

