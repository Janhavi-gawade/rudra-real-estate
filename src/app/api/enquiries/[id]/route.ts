import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, internalNotes, followUpDate } = body;

    const updated = await prisma.enquiry.update({
      where: { id },
      data: {
        status: status || undefined,
        internalNotes: internalNotes !== undefined ? internalNotes : undefined,
        followUpDate: followUpDate ? new Date(followUpDate) : undefined,
      },
    });

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error: any) {
    console.error('Update enquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to update enquiry' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.enquiry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete enquiry' },
      { status: 500 }
    );
  }
}
