import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locality = searchParams.get('locality');
    const listingType = searchParams.get('type') || searchParams.get('listingType');
    const propertyType = searchParams.get('propertyType');
    const bhk = searchParams.get('bhk');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const furnishing = searchParams.get('furnishing');
    const possession = searchParams.get('possession');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort') || 'newest';
    const search = searchParams.get('q');

    const where: any = {
      status: 'AVAILABLE',
    };

    if (locality && locality !== 'all') {
      where.locality = { contains: locality };
    }

    if (listingType && listingType !== 'ALL') {
      where.listingType = listingType;
    }

    if (propertyType && propertyType !== 'all') {
      where.propertyType = propertyType;
    }

    if (bhk && bhk !== 'all') {
      where.bhk = parseInt(bhk);
    }

    if (furnishing && furnishing !== 'all') {
      where.furnishing = furnishing;
    }

    if (possession && possession !== 'all') {
      where.possessionStatus = possession;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { locality: { contains: search } },
        { description: { contains: search } },
        { address: { contains: search } },
        { propertyCode: { contains: search } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price-asc') orderBy = { price: 'asc' };
    if (sort === 'price-desc') orderBy = { price: 'desc' };
    if (sort === 'views') orderBy = { viewsCount: 'desc' };

    const properties = await prisma.property.findMany({
      where,
      orderBy,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        amenities: {
          include: { amenity: true },
        },
      },
    });

    return NextResponse.json({ properties });
  } catch (error: any) {
    console.error('Properties fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve properties' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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
      bedrooms,
      bathrooms,
      balconies,
      floor,
      totalFloors,
      furnishing,
      possessionStatus,
      possessionDate,
      locality,
      address,
      landmark,
      reraNumber,
      isFeatured,
      images,
      amenities,
    } = body;

    if (!title || !price || !locality) {
      return NextResponse.json(
        { error: 'Title, price, and locality are required.' },
        { status: 400 }
      );
    }

    // Auto-generate unique code & slug
    const count = await prisma.property.count();
    const propertyCode = `RP-${101 + count}`;
    const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${propertyCode.toLowerCase()}`;

    const property = await prisma.property.create({
      data: {
        propertyCode,
        title,
        slug,
        description: description || 'Exclusive luxury property presented by Rudra Property Consultancy.',
        listingType: listingType || 'BUY',
        propertyType: propertyType || 'Apartment',
        bhk: parseInt(bhk) || 2,
        price: parseFloat(price),
        priceDisplay: priceDisplay || null,
        carpetArea: parseInt(carpetArea) || 1000,
        bedrooms: parseInt(bedrooms) || parseInt(bhk) || 2,
        bathrooms: parseInt(bathrooms) || 2,
        balconies: parseInt(balconies) || 1,
        floor: floor || null,
        totalFloors: totalFloors ? parseInt(totalFloors) : null,
        furnishing: furnishing || 'Semi-Furnished',
        possessionStatus: possessionStatus || 'Ready to Move',
        possessionDate: possessionDate || null,
        locality: locality || 'Keshav Nagar',
        address: address || `${locality}, Pune`,
        landmark: landmark || null,
        reraNumber: reraNumber || null,
        isFeatured: Boolean(isFeatured),
        isVerified: true,
        status: 'AVAILABLE',
        images: {
          create: (images || []).map((img: any, idx: number) => ({
            url: img.url,
            caption: img.caption || title,
            isCover: idx === 0,
            sortOrder: idx,
          })),
        },
      },
      include: {
        images: true,
      },
    });

    // Connect Amenities if provided
    if (amenities && Array.isArray(amenities)) {
      for (const aName of amenities) {
        let amenity = await prisma.amenity.findUnique({ where: { name: aName } });
        if (!amenity) {
          amenity = await prisma.amenity.create({
            data: { name: aName, icon: 'Check', category: 'General' },
          });
        }
        await prisma.propertyAmenity.create({
          data: {
            propertyId: property.id,
            amenityId: amenity.id,
          },
        });
      }
    }

    return NextResponse.json({ success: true, property }, { status: 201 });
  } catch (error: any) {
    console.error('Property creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}
