import { FormStatus } from '@/lib/types/form.types';

const styles: Record<FormStatus, string> = {
  draft: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-600',
};

export function StatusBadge({ status }: { status: FormStatus }) {
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
}