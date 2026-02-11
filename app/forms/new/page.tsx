import { FormEditor } from '@/components/forms/FormEditor';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Form — FormBuilder',
};

export default function NewFormPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Form</h1>
        <FormEditor />
      </div>
    </main>
  );
}