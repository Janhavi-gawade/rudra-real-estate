import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const property = await prisma.property.findFirst({
      where: {
        OR: [{ id }, { slug: id }, { propertyCode: id }],
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        amenities: {
          include: { amenity: true },
        },
      },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Increment view count asynchronously
    await prisma.property.update({
      where: { id: property.id },
      data: { viewsCount: { increment: 1 } },
    });

    return NextResponse.json({ property });
  } catch (error: any) {
    console.error('Fetch property by ID error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve property' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      title,
      description,
      listingType,
      propertyType,
      bhk,
      price,
      priceDisplay,
      carpetArea,
      furnishing,
      possessionStatus,
      locality,
      address,
      status,
      isFeatured,
    } = body;

    const updated = await prisma.property.update({
      where: { id },
      data: {
        title: title || undefined,
        description: description || undefined,
        listingType: listingType || undefined,
        propertyType: propertyType || undefined,
        bhk: bhk ? parseInt(bhk) : undefined,
        price: price ? parseFloat(price) : undefined,
        priceDisplay: priceDisplay !== undefined ? priceDisplay : undefined,
        carpetArea: carpetArea ? parseInt(carpetArea) : undefined,
        furnishing: furnishing || undefined,
        possessionStatus: possessionStatus || undefined,
        locality: locality || undefined,
        address: address || undefined,
        status: status || undefined,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : undefined,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json({ success: true, property: updated });
  } catch (error: any) {
    console.error('Update property error:', error);
    return NextResponse.json(
      { error: 'Failed to update property' },
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

    await prisma.property.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Property deleted successfully' });
  } catch (error: any) {
    console.error('Delete property error:', error);
    return NextResponse.json(
      { error: 'Failed to delete property' },
      { status: 500 }
    );
  }
}
