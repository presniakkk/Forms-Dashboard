import { Form, FormStatus } from '@/lib/types/form.types';

export type FormFilter = (forms: Form[]) => Form[];

export const byStatus = (status: FormStatus): FormFilter =>
  (forms) => forms.filter((f) => f.status === status);

export const sortByDate = (order: 'asc' | 'desc' = 'desc'): FormFilter =>
  (forms) =>
    [...forms].sort((a, b) =>
      order === 'desc'
        ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        : new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    );