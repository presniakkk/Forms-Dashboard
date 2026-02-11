import { NextRequest, NextResponse } from 'next/server';
import { formService } from '@/lib/services/form.service';
import { ZodError } from 'zod';

export async function GET() {
  const forms = await formService.getAll();
  return NextResponse.json(forms);
}

export async function POST(request: NextRequest) {
  const role = request.cookies.get('role')?.value;

  if (role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const form = await formService.create(body);
    return NextResponse.json(form, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}