import { describe, it, expect, beforeEach } from 'vitest';
import { formService } from '../form.service';
import { formRepository } from '@/lib/repositories/memory.form.repository';

describe('FormService', () => {
  beforeEach(() => {
    // Reset repository state before each test
    // In a real app, you'd have a reset method or use a test repository
  });

  it('should get all forms', async () => {
    const forms = await formService.getAll();
    expect(Array.isArray(forms)).toBe(true);
    expect(forms.length).toBeGreaterThanOrEqual(0);
  });

  it('should get form by id', async () => {
    const forms = await formService.getAll();
    if (forms.length > 0) {
      const form = await formService.getById(forms[0].id);
      expect(form).not.toBeNull();
      expect(form?.id).toBe(forms[0].id);
    }
  });

  it('should return null for non-existent form', async () => {
    const form = await formService.getById('non-existent-id');
    expect(form).toBeNull();
  });

  it('should create a new form', async () => {
    const formData = {
      title: 'New Test Form',
      description: 'Test description',
      fieldsCount: 15,
      status: 'draft' as const,
    };

    const form = await formService.create(formData);
    expect(form).toBeDefined();
    expect(form.title).toBe(formData.title);
    expect(form.fieldsCount).toBe(formData.fieldsCount);
    expect(form.status).toBe(formData.status);
    expect(form.id).toBeDefined();
    expect(form.createdAt).toBeDefined();
    expect(form.updatedAt).toBeDefined();
  });

  it('should update an existing form', async () => {
    const forms = await formService.getAll();
    if (forms.length > 0) {
      const existingForm = forms[0];
      const updateData = {
        title: 'Updated Title',
        fieldsCount: 20,
        status: 'active' as const,
      };

      const updated = await formService.update(existingForm.id, updateData);
      expect(updated).not.toBeNull();
      expect(updated?.title).toBe(updateData.title);
      expect(updated?.fieldsCount).toBe(updateData.fieldsCount);
      expect(updated?.status).toBe(updateData.status);
    }
  });

  it('should return null when updating non-existent form', async () => {
    const updateData = {
      title: 'Updated Title',
      fieldsCount: 20,
      status: 'active' as const,
    };

    const updated = await formService.update('non-existent-id', updateData);
    expect(updated).toBeNull();
  });

  it('should delete a form', async () => {
    // First create a form
    const formData = {
      title: 'Form to Delete',
      fieldsCount: 5,
      status: 'draft' as const,
    };

    const created = await formService.create(formData);
    const deleted = await formService.delete(created.id);
    expect(deleted).toBe(true);

    // Verify it's deleted
    const found = await formService.getById(created.id);
    expect(found).toBeNull();
  });

  it('should reject invalid form data', async () => {
    const invalidData = {
      title: 'AB', // Too short
      fieldsCount: 100, // Too large
      status: 'invalid' as any,
    };

    await expect(formService.create(invalidData)).rejects.toThrow();
  });
});

