import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendLeadAlertEmail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      enquiryType,
      preferredDate,
      preferredTime,
      budget,
      message,
      propertyId,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and Phone are mandatory' },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        phone,
        email: email || null,
        enquiryType: enquiryType || 'GENERAL',
        preferredDate: preferredDate || null,
        preferredTime: preferredTime || null,
        budget: budget || null,
        message: message || null,
        propertyId: propertyId || null,
        status: 'NEW',
      },
    });

    // Send email alert to client's email (rudrapropertypune@gmail.com)
    sendLeadAlertEmail({
      clientName: name,
      clientPhone: phone,
      clientEmail: email,
      enquiryType: enquiryType || 'GENERAL',
      requirement: budget,
      message,
      preferredDate,
      preferredTime,
    }).catch((err) => console.error('Background mailer error:', err));

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error: any) {
    console.error('Enquiry creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to record enquiry' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const enquiries = await prisma.enquiry.findMany({
      where: status ? { status } : undefined,
      include: {
        property: {
          select: {
            id: true,
            title: true,
            propertyCode: true,
            locality: true,
            price: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ enquiries });
  } catch (error: any) {
    console.error('Fetching enquiries failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}
