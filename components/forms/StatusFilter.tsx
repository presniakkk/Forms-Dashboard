'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormStatus } from '@/lib/types/form.types';

const statuses: Array<{ label: string; value: FormStatus | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
];

export function StatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('status') || 'all';

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'all') {
      params.delete('status');
    } else {
      params.set('status', value);
    }

    router.push(`/forms?${params.toString()}`);
  };

  return (
    <div className="flex gap-2" role="group" aria-label="Filter by status">
      {statuses.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => handleChange(value)}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer ${
            current === value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}