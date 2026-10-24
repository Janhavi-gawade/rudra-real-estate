import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PropertyDetailClient from './PropertyDetailClient';

export const dynamic = 'force-dynamic';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await prisma.property.findFirst({
    where: {
      OR: [{ slug }, { id: slug }, { propertyCode: slug }],
    },
    include: { images: true },
  });

  if (!property) return { title: 'Property Not Found | Rudra Property' };

  return {
    title: `${property.title} | Rudra Property Pune`,
    description: `${property.bhk} BHK ${property.propertyType} in ${property.locality}, Pune. Price: ${property.priceDisplay || 'Contact for price'}. Verified RERA listing.`,
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 150),
      images: property.images?.[0]?.url ? [property.images[0].url] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { slug } = await params;

  const property = await prisma.property.findFirst({
    where: {
      OR: [{ slug }, { id: slug }, { propertyCode: slug }],
    },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      amenities: { include: { amenity: true } },
    },
  });

  if (!property) {
    notFound();
  }

  // Increment views
  await prisma.property.update({
    where: { id: property.id },
    data: { viewsCount: { increment: 1 } },
  });

  // Get similar properties in the same locality or property type
  const similarProperties = await prisma.property.findMany({
    where: {
      id: { not: property.id },
      status: 'AVAILABLE',
      OR: [{ locality: property.locality }, { bhk: property.bhk }],
    },
    include: {
      images: { orderBy: { sortOrder: 'asc' } },
      amenities: { include: { amenity: true } },
    },
    take: 3,
  });

  return (
    <PropertyDetailClient
      property={property as any}
      similarProperties={similarProperties as any}
    />
  );
}
