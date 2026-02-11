import { Form, FormInput } from '@/lib/types/form.types';

export interface IFormRepository {
  getAll(): Promise<Form[]>;
  getById(id: string): Promise<Form | null>;
  create(data: FormInput): Promise<Form>;
  update(id: string, data: FormInput): Promise<Form | null>;
  delete(id: string): Promise<boolean>;
}