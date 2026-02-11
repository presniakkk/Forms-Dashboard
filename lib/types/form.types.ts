export type FormStatus = 'draft' | 'active' | 'archived';

export interface Form {
  id: string;
  title: string;
  description?: string;
  fieldsCount: number;
  status: FormStatus;
  createdAt: string;
  updatedAt: string;
}

export interface FormListItem {
  id: string;
  title: string;
  status: FormStatus;
  updatedAt: string;
}

export interface FormInput {
  title: string;
  description?: string;
  fieldsCount: number;
  status: FormStatus;
}