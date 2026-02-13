import { NextRequest, NextResponse } from 'next/server';
import { formService } from '@/lib/services/form.service';
import { ZodError } from 'zod';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const form = await formService.getById(id);

  if (!form) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 });
  }

  return NextResponse.json(form);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const role = request.cookies.get('role')?.value;

  if (role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const form = await formService.update(id, body);

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    // Revalidate all related pages
    revalidatePath('/forms');
    revalidatePath(`/forms/${id}`);
    revalidatePath('/dashboard');

    return NextResponse.json(form);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error updating form:', error);
    return NextResponse.json(
      { error: 'Server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const role = request.cookies.get('role')?.value;

  if (role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const success = await formService.delete(id);

    if (!success) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    // Revalidate all related pages
    revalidatePath('/forms');
    revalidatePath(`/forms/${id}`);
    revalidatePath('/dashboard');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting form:', error);
    return NextResponse.json(
      { error: 'Server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

