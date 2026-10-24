import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('rudra_admin_session')?.value;

    if (!sessionId) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const admin = await prisma.adminUser.findUnique({
      where: { id: sessionId },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!admin) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, admin });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
