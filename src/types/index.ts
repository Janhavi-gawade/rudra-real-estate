export type ListingType = 'BUY' | 'RENT' | 'INVEST';
export type PropertyType = 'Apartment' | 'Penthouse' | 'Villa' | 'Commercial Office' | 'Shop';
export type FurnishingType = 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
export type PossessionStatus = 'Ready to Move' | 'Under Construction';

export interface PropertyImageItem {
  id: string;
  url: string;
  caption?: string | null;
  isCover: boolean;
  sortOrder: number;
}

export interface AmenityItem {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export interface PropertyItem {
  id: string;
  propertyCode: string;
  title: string;
  slug: string;
  description: string;
  listingType: ListingType | string;
  propertyType: PropertyType | string;
  bhk: number;
  price: number;
  priceDisplay?: string | null;
  carpetArea: number;
  superArea?: number | null;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  floor?: string | null;
  totalFloors?: number | null;
  furnishing: FurnishingType | string;
  possessionStatus: PossessionStatus | string;
  possessionDate?: string | null;
  locality: string;
  address: string;
  landmark?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  reraNumber?: string | null;
  isFeatured: boolean;
  isVerified: boolean;
  status: 'AVAILABLE' | 'UNDER_OFFER' | 'SOLD' | string;
  viewsCount: number;
  videoUrl?: string | null;
  brochureUrl?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  images: PropertyImageItem[];
  amenities?: {
    amenity: AmenityItem;
  }[];
}

export interface EnquiryItem {
  id: string;
  propertyId?: string | null;
  property?: {
    id: string;
    title: string;
    propertyCode: string;
    locality: string;
    price: number;
  } | null;
  name: string;
  phone: string;
  email?: string | null;
  enquiryType: string;
  preferredDate?: string | null;
  preferredTime?: string | null;
  budget?: string | null;
  message?: string | null;
  status: 'NEW' | 'CONTACTED' | 'VISIT_SCHEDULED' | 'CONVERTED' | 'CLOSED';
  internalNotes?: string | null;
  followUpDate?: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}
