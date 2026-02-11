import { notFound } from 'next/navigation';
import { FormEditor } from '@/components/forms/FormEditor';
import { Form } from '@/lib/types/form.types';
import { formService } from '@/lib/services/form.service';
import type { Metadata } from 'next';

interface EditFormPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditFormPageProps): Promise<Metadata> {
  const { id } = await params;
  const form = await formService.getById(id);

  return {
    title: form ? `Edit: ${form.title} — FormBuilder` : 'Form Not Found',
  };
}

export default async function EditFormPage({ params }: EditFormPageProps) {
  const { id } = await params;
  const form = await formService.getById(id);

  if (!form) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Form</h1>
        <FormEditor
          formId={form.id}
          defaultValues={{
            title: form.title,
            description: form.description ?? '',
            fieldsCount: form.fieldsCount,
            status: form.status,
          }}
        />
      </div>
    </main>
  );
}
