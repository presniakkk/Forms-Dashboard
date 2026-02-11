import { formInputSchema } from '@/lib/schemas/form.schema';
import { Form, FormInput } from '@/lib/types/form.types';
import { seedForms } from '@/lib/data/seed';

class FormService {
  async getAll(): Promise<Form[]> {
    return [...seedForms];
  }

  async getById(id: string): Promise<Form | null> {
    return seedForms.find((f) => f.id === id) ?? null;
  }

  async create(data: unknown): Promise<Form> {
    const parsed = formInputSchema.parse(data);
    const now = new Date().toISOString();
    const form: Form = {
      id: String(Date.now()),
      ...parsed,
      createdAt: now,
      updatedAt: now,
    };
    return form;
  }

  async update(id: string, data: unknown): Promise<Form | null> {
    const parsed = formInputSchema.parse(data);
    const form = seedForms.find((f) => f.id === id);
    if (!form) return null;
    
    return {
      ...form,
      ...parsed,
      updatedAt: new Date().toISOString(),
    };
  }

  async delete(id: string): Promise<boolean> {
    return seedForms.some((f) => f.id === id);
  }
}

export const formService = new FormService();
