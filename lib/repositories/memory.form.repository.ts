import { Form, FormInput } from '@/lib/types/form.types';
import { IFormRepository } from './form.repository.interface';
import { seedForms } from '@/lib/data/seed';

class MemoryFormRepository implements IFormRepository {
  private forms: Form[] = [...seedForms];
  private nextId: number = 4;

  async getAll(): Promise<Form[]> {
    return this.forms;
  }

  async getById(id: string): Promise<Form | null> {
    return this.forms.find((f) => f.id === id) ?? null;
  }

  async create(data: FormInput): Promise<Form> {
    const now = new Date().toISOString();
    const form: Form = {
      id: String(this.nextId++),
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    this.forms.push(form);
    return form;
  }

  async update(id: string, data: FormInput): Promise<Form | null> {
    const index = this.forms.findIndex((f) => f.id === id);
    if (index === -1) return null;

    this.forms[index] = {
      ...this.forms[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.forms[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.forms.findIndex((f) => f.id === id);
    if (index === -1) return false;

    this.forms.splice(index, 1);
    return true;
  }
}

const globalForForms = globalThis as unknown as {
  formRepository: MemoryFormRepository;
};

export const formRepository =
  globalForForms.formRepository ?? new MemoryFormRepository();

if (process.env.NODE_ENV !== 'production') {
  globalForForms.formRepository = formRepository;
}