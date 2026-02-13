import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { FormTable } from '@/components/forms/FormTable';
import { Button } from '@/components/ui/Button';
import { FormListItem } from '@/lib/types/form.types';
import { formService } from '@/lib/services/form.service';
import { sortByDate } from '@/lib/filters/form.filters';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value;

  if (!role) {
    redirect('/login');
  }

  const isAdmin = role === 'admin';
  let forms = await formService.getAll();
  forms = sortByDate('desc')(forms);

  const listItems: FormListItem[] = forms.map(({ id, title, status, updatedAt }) => ({
    id,
    title,
    status,
    updatedAt,
  }));

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
          {isAdmin && (
            <Button href="/forms/new">Create New Form</Button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Forms
          </h2>
          <FormTable forms={listItems} isAdmin={isAdmin} />
        </div>
      </div>
    </main>
  );
}

