import { formInputSchema } from '@/lib/schemas/form.schema';
import { Form } from '@/lib/types/form.types';
import { formRepository } from '@/lib/repositories/memory.form.repository';

class FormService {
  async getAll(): Promise<Form[]> {
    return formRepository.getAll();
  }

  async getById(id: string): Promise<Form | null> {
    return formRepository.getById(id);
  }

  async create(data: unknown): Promise<Form> {
    const parsed = formInputSchema.parse(data);
    return formRepository.create(parsed);
  }

  async update(id: string, data: unknown): Promise<Form | null> {
    const parsed = formInputSchema.parse(data);
    return formRepository.update(id, parsed);
  }

  async delete(id: string): Promise<boolean> {
    return formRepository.delete(id);
  }
}

export const formService = new FormService();
