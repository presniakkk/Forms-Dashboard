import { z } from 'zod';

export const formStatusEnum = z.enum(['draft', 'active', 'archived']);

export const formInputSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  fieldsCount: z
    .number()
    .int('Must be a whole number')
    .min(0, 'Minimum is 0')
    .max(50, 'Maximum is 50'),
  status: formStatusEnum,
});

export type FormInputSchema = z.infer<typeof formInputSchema>;