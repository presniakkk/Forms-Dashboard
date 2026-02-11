import { notFound } from 'next/navigation';
import { FormEditor } from '@/components/forms/FormEditor';
import { Form } from '@/lib/types/form.types';
import type { Metadata } from 'next';

interface EditFormPageProps {
  params: Promise<{ id: string }>;
}

async function getForm(id: string): Promise<Form | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/forms/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: EditFormPageProps): Promise<Metadata> {
  const { id } = await params;
  const form = await getForm(id);

  return {
    title: form ? `Edit: ${form.title} — FormBuilder` : 'Form Not Found',
  };
}

export default async function EditFormPage({ params }: EditFormPageProps) {
  const { id } = await params;
  const form = await getForm(id);

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