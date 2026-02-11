import { cookies } from 'next/headers';
import Link from 'next/link';
import { FormStatus, FormListItem } from '@/lib/types/form.types';
import { StatusFilter } from '@/components/forms/StatusFilter';
import { FormTable } from '@/components/forms/FormTable';
import { byStatus, sortByDate } from '@/lib/filters/form.filters';
import { formService } from '@/lib/services/form.service';

interface FormsPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function FormsPage(props: FormsPageProps) {
  const searchParams = await props.searchParams;
  const status = searchParams.status;
  
  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value;
  const isAdmin = role === 'admin';

  let forms = await formService.getAll();

  if (status && ['draft', 'active', 'archived'].includes(status)) {
    forms = byStatus(status as FormStatus)(forms);
  }

  forms = sortByDate('desc')(forms);

  const listItems: FormListItem[] = forms.map(({ id, title, status, updatedAt }) => ({
    id,
    title,
    status,
    updatedAt,
  }));

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Forms</h1>
          {isAdmin && (
            <Link
              href="/forms/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + New Form
            </Link>
          )}
        </div>

        <StatusFilter />

        <FormTable forms={listItems} isAdmin={isAdmin} />
      </div>
    </main>
  );
}
