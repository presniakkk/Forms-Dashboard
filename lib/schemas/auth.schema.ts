import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['individual', 'admin']),
});

export type LoginSchema = z.infer<typeof loginSchema>;