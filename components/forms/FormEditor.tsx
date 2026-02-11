'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { formInputSchema, FormInputSchema } from '@/lib/schemas/form.schema';
import { useToastStore } from '@/lib/store/toast.store';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

interface FormEditorProps {
  defaultValues?: FormInputSchema;
  formId?: string;
}

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
];

export function FormEditor({ defaultValues, formId }: FormEditorProps) {
  const router = useRouter();
  const addToast = useToastStore((state) => state.addToast);
  const isEdit = !!formId;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputSchema>({
    resolver: zodResolver(formInputSchema),
    defaultValues: defaultValues ?? {
      title: '',
      description: '',
      fieldsCount: 0,
      status: 'draft',
    },
  });

  const onSubmit = async (data: FormInputSchema) => {
    try {
      const url = isEdit ? `/api/forms/${formId}` : '/api/forms';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Something went wrong');
      }

      addToast(
        isEdit ? 'Form updated successfully' : 'Form created successfully',
        'success'
      );
      router.push('/forms');
    } catch (error) {
      addToast(
        error instanceof Error ? error.message : 'Something went wrong',
        'error'
      );
    }
  };

  const onDelete = async () => {
    if (!confirm('Are you sure you want to delete this form?')) return;

    try {
      const res = await fetch(`/api/forms/${formId}`, { method: 'DELETE' });

      if (!res.ok) {
        throw new Error('Failed to delete');
      }

      addToast('Form deleted', 'success');
      router.push('/forms');
    } catch {
      addToast('Failed to delete form', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        id="title"
        label="Title"
        placeholder="Enter form title"
        error={errors.title?.message}
        {...register('title')}
      />

      <Textarea
        id="description"
        label="Description (optional)"
        placeholder="What is this form about?"
        error={errors.description?.message}
        {...register('description')}
      />

      <Input
        id="fieldsCount"
        label="Number of Fields"
        type="number"
        min={0}
        max={50}
        error={errors.fieldsCount?.message}
        {...register('fieldsCount', { valueAsNumber: true })}
      />

      <Select
        id="status"
        label="Status"
        options={statusOptions}
        error={errors.status?.message}
        {...register('status')}
      />

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Form' : 'Create Form'}
        </Button>

        <Button variant="secondary" href="/forms">
          Cancel
        </Button>

        {isEdit && (
          <Button variant="danger" type="button" onClick={onDelete}>
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}