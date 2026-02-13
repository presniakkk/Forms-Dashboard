import Link from 'next/link';
import { FormListItem } from '@/lib/types/form.types';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface FormTableProps {
  forms: FormListItem[];
  isAdmin: boolean;
}

export function FormTable({ forms, isAdmin }: FormTableProps) {
  if (forms.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No forms found</p>
        <p className="text-sm mt-1">Try changing the filter</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
            <th className="pb-3 font-medium">Title</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Updated</th>
            {isAdmin && <th className="pb-3 font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr
              key={form.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 font-medium text-gray-900">{form.title}</td>
              <td className="py-4">
                <StatusBadge status={form.status} />
              </td>
              <td className="py-4 text-sm text-gray-500">
                {new Date(form.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
              {isAdmin && (
                <td className="py-4">
                  <Link
                    href={`/forms/${form.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}