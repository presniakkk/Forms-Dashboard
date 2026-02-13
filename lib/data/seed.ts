import { Form } from '@/lib/types/form.types';

export const seedForms: Form[] = [
  {
    id: '1',
    title: 'Customer Feedback',
    description: 'Collect feedback from customers after purchase',
    fieldsCount: 12,
    status: 'active',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-01T14:30:00Z',
  },
  {
    id: '2',
    title: 'Employee Onboarding',
    description: 'New hire registration form',
    fieldsCount: 25,
    status: 'draft',
    createdAt: '2025-01-20T09:00:00Z',
    updatedAt: '2025-01-28T11:00:00Z',
  },
  {
    id: '3',
    title: 'Event Registration 2024',
    fieldsCount: 8,
    status: 'archived',
    createdAt: '2024-11-01T08:00:00Z',
    updatedAt: '2024-12-15T16:45:00Z',
  },
];