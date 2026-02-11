import { formInputSchema } from '@/lib/schemas/form.schema';
import { formRepository } from '@/lib/repositories/memory.form.repository';

class FormService {
  async getAll() {
    return formRepository.getAll();
  }

  async getById(id: string) {
    return formRepository.getById(id);
  }

  async create(data: unknown) {
    const parsed = formInputSchema.parse(data);
    return formRepository.create(parsed);
  }

  async update(id: string, data: unknown) {
    const parsed = formInputSchema.parse(data);
    return formRepository.update(id, parsed);
  }

  async delete(id: string) {
    return formRepository.delete(id);
  }
}

export const formService = new FormService();