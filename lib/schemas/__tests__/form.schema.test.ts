import { describe, it, expect } from 'vitest';
import { formInputSchema } from '../form.schema';

describe('formInputSchema', () => {
  it('should validate correct form data', () => {
    const validData = {
      title: 'Test Form',
      description: 'A test form',
      fieldsCount: 10,
      status: 'active' as const,
    };

    const result = formInputSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it('should accept optional description', () => {
    const validData = {
      title: 'Test Form',
      fieldsCount: 5,
      status: 'draft' as const,
    };

    const result = formInputSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject title shorter than 3 characters', () => {
    const invalidData = {
      title: 'AB',
      fieldsCount: 5,
      status: 'active' as const,
    };

    const result = formInputSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('title');
    }
  });

  it('should reject fieldsCount less than 0', () => {
    const invalidData = {
      title: 'Test Form',
      fieldsCount: -1,
      status: 'active' as const,
    };

    const result = formInputSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject fieldsCount greater than 50', () => {
    const invalidData = {
      title: 'Test Form',
      fieldsCount: 51,
      status: 'active' as const,
    };

    const result = formInputSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject invalid status', () => {
    const invalidData = {
      title: 'Test Form',
      fieldsCount: 10,
      status: 'invalid' as any,
    };

    const result = formInputSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

