import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Rudra Property database...');

  // 1. Create Default Admin User
  const passwordHash = await bcrypt.hash('rudra@pune2026', 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: 'rudrapropertypune@gmail.com' },
    update: {},
    create: {
      username: 'rudra_admin',
      email: 'rudrapropertypune@gmail.com',
      passwordHash: passwordHash,
      name: 'Rudra Property Admin',
      role: 'ADMIN',
    },
  });
  console.log('Admin user seeded:', admin.email);

  // 2. Seed Standard Luxury Amenities
  const amenitiesData = [
    { name: 'Clubhouse & Lounge', icon: 'Building2', category: 'Lifestyle' },
    { name: 'Infinity Swimming Pool', icon: 'Waves', category: 'Lifestyle' },
    { name: 'Fully Equipped Gymnasium', icon: 'Dumbbell', category: 'Sports' },
    { name: 'EV Vehicle Charging Stations', icon: 'Zap', category: 'Convenience' },
    { name: '24/7 3-Tier Security & CCTV', icon: 'ShieldCheck', category: 'Security' },
    { name: 'Covered Podium Car Parking', icon: 'Car', category: 'Convenience' },
    { name: 'Landscaped Zen Garden', icon: 'Trees', category: 'Lifestyle' },
    { name: 'Children Play Zone', icon: 'Smile', category: 'Lifestyle' },
    { name: 'High Speed Elevators', icon: 'ChevronsUp', category: 'Convenience' },
    { name: 'Power Backup (100%)', icon: 'BatteryCharging', category: 'Convenience' },
    { name: 'Rooftop Party Deck', icon: 'SunMedium', category: 'Lifestyle' },
    { name: 'Badminton / Multipurpose Court', icon: 'Trophy', category: 'Sports' },
  ];

  const amenityMap = new Map<string, string>();
  for (const item of amenitiesData) {
    const record = await prisma.amenity.upsert({
      where: { name: item.name },
      update: {},
      create: item,
    });
    amenityMap.set(item.name, record.id);
  }

  // 3. Realistic Pune Luxury Listings
  const properties = [
    {
      propertyCode: 'RP-101',
      title: '3 BHK Ultra-Luxury Riverside Residence',
      slug: '3-bhk-ultra-luxury-riverside-residence-keshav-nagar',
      description: 'Experience refined riverside living in one of Keshav Nagar’s most prestigious high-rise gated communities. This 3 BHK home features expansive sundecks with unobstructed river views, Italian marble flooring in living areas, smart home automation, and close proximity to Koregaon Park & Magarpatta Cybercity.',
      listingType: 'BUY',
      propertyType: 'Apartment',
      bhk: 3,
      price: 11500000, // 1.15 Cr
      priceDisplay: '₹1.15 Cr',
      carpetArea: 1380,
      superArea: 1720,
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      floor: '14th of 24 Floors',
      totalFloors: 24,
      furnishing: 'Semi-Furnished',
      possessionStatus: 'Ready to Move',
      possessionDate: 'Immediate',
      locality: 'Keshav Nagar',
      address: 'Near Godrej Infinity, Keshav Nagar, Mundhwa, Pune 411036',
      landmark: 'Near Mula-Mutha Riverside Promenade',
      latitude: 18.5362,
      longitude: 73.9351,
      reraNumber: 'P52100028912',
      isFeatured: true,
      isVerified: true,
      status: 'AVAILABLE',
      viewsCount: 142,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
          caption: 'Stunning Modern Architectural Facade',
          isCover: true,
          sortOrder: 0,
        },
        {
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          caption: 'Sunlit Living Room with Panoramic Balcony',
          isCover: false,
          sortOrder: 1,
        },
        {
          url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
          caption: 'Designer Modular Kitchen with Island Counter',
          isCover: false,
          sortOrder: 2,
        },
        {
          url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
          caption: 'Spacious Master Bedroom Suite',
          isCover: false,
          sortOrder: 3,
        },
      ],
      amenityNames: [
        'Clubhouse & Lounge',
        'Infinity Swimming Pool',
        'Fully Equipped Gymnasium',
        'EV Vehicle Charging Stations',
        '24/7 3-Tier Security & CCTV',
        'Covered Podium Car Parking',
        'Landscaped Zen Garden',
      ],
    },
    {
      propertyCode: 'RP-102',
      title: '2 BHK Premium Smart Apartment with Deck',
      slug: '2-bhk-premium-smart-apartment-mundhwa',
      description: 'Sophisticated 2 BHK modern flat located strategically on the Mundhwa-Keshav Nagar corridor. Seamless connectivity to Hadapsar Magarpatta and Kharadi IT Parks. Designed with optimal space planning, zero dead space, vitrified tiles, and premium sanitary fittings.',
      listingType: 'BUY',
      propertyType: 'Apartment',
      bhk: 2,
      price: 7800000, // 78 Lakhs
      priceDisplay: '₹78 Lakhs',
      carpetArea: 890,
      superArea: 1120,
      bedrooms: 2,
      bathrooms: 2,
      balconies: 1,
      floor: '8th of 18 Floors',
      totalFloors: 18,
      furnishing: 'Semi-Furnished',
      possessionStatus: 'Ready to Move',
      possessionDate: 'Immediate',
      locality: 'Mundhwa',
      address: 'Main Mundhwa Road, Near Prestige Chamber, Pune 411036',
      landmark: 'Opposite Passport Office Road Junction',
      latitude: 18.5315,
      longitude: 73.9212,
      reraNumber: 'P52100030145',
      isFeatured: true,
      isVerified: true,
      status: 'AVAILABLE',
      viewsCount: 210,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
          caption: 'Contemporary High-rise Architecture',
          isCover: true,
          sortOrder: 0,
        },
        {
          url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
          caption: 'Elegant Minimalist Living Room',
          isCover: false,
          sortOrder: 1,
        },
        {
          url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
          caption: 'Clubhouse and Pool Area',
          isCover: false,
          sortOrder: 2,
        },
      ],
      amenityNames: [
        'Clubhouse & Lounge',
        'Fully Equipped Gymnasium',
        '24/7 3-Tier Security & CCTV',
        'High Speed Elevators',
        'Power Backup (100%)',
      ],
    },
    {
      propertyCode: 'RP-103',
      title: '3.5 BHK Sky Residence near EON IT Park',
      slug: '3-point-5-bhk-sky-residence-near-eon-kharadi',
      description: 'An elite address for corporate leaders and tech executives. Located just 3 minutes from EON Free Zone and World Trade Center (WTC) Kharadi. Features servant room, 3 covered parking slots, double-height ceiling in drawing room, and access to an exclusive 40,000 sq.ft. luxury clubhouse.',
      listingType: 'BUY',
      propertyType: 'Apartment',
      bhk: 4,
      price: 18500000, // 1.85 Cr
      priceDisplay: '₹1.85 Cr',
      carpetArea: 1820,
      superArea: 2280,
      bedrooms: 4,
      bathrooms: 4,
      balconies: 3,
      floor: '19th of 32 Floors',
      totalFloors: 32,
      furnishing: 'Fully Furnished',
      possessionStatus: 'Ready to Move',
      possessionDate: 'Immediate',
      locality: 'Kharadi',
      address: 'EON Free Zone Road, Kharadi, Pune 411014',
      landmark: 'Next to World Trade Center (WTC) & Radisson Blu',
      latitude: 18.5529,
      longitude: 73.9482,
      reraNumber: 'P52100019284',
      isFeatured: true,
      isVerified: true,
      status: 'AVAILABLE',
      viewsCount: 389,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1400&q=80',
          caption: 'Iconic Kharadi Skyline High-Rise',
          isCover: true,
          sortOrder: 0,
        },
        {
          url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
          caption: 'Grand Dining & Lounge Hall',
          isCover: false,
          sortOrder: 1,
        },
        {
          url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
          caption: 'Master Suite with Walk-in Closet',
          isCover: false,
          sortOrder: 2,
        },
      ],
      amenityNames: [
        'Clubhouse & Lounge',
        'Infinity Swimming Pool',
        'Fully Equipped Gymnasium',
        'EV Vehicle Charging Stations',
        '24/7 3-Tier Security & CCTV',
        'Covered Podium Car Parking',
        'Rooftop Party Deck',
        'Badminton / Multipurpose Court',
      ],
    },
    {
      propertyCode: 'RP-104',
      title: '4 BHK Palatial Penthouse with Private Jacuzzi Deck',
      slug: '4-bhk-palatial-penthouse-koregaon-park-annexe',
      description: 'The pinnacle of Pune luxury. Situated in Koregaon Park Annexe overlooking lush green canopy. Private keycard elevator opens directly into your private foyer. Wraparound terrace garden, jacuzzi deck, VRV air conditioning, and bespoke imported finishes.',
      listingType: 'BUY',
      propertyType: 'Penthouse',
      bhk: 4,
      price: 34000000, // 3.40 Cr
      priceDisplay: '₹3.40 Cr',
      carpetArea: 2850,
      superArea: 3600,
      bedrooms: 4,
      bathrooms: 5,
      balconies: 3,
      floor: 'Top Floor (22nd)',
      totalFloors: 22,
      furnishing: 'Fully Furnished',
      possessionStatus: 'Ready to Move',
      possessionDate: 'Immediate',
      locality: 'Koregaon Park',
      address: 'North Main Road Extension, Koregaon Park Annexe, Pune 411001',
      landmark: 'Near German Bakery & Osho Teerth Park',
      latitude: 18.5364,
      longitude: 73.8997,
      reraNumber: 'P52100018742',
      isFeatured: true,
      isVerified: true,
      status: 'AVAILABLE',
      viewsCount: 520,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
          caption: 'Ultra-Luxury Penthouse View & Interior',
          isCover: true,
          sortOrder: 0,
        },
        {
          url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
          caption: 'Private Terrace & Lounge Area',
          isCover: false,
          sortOrder: 1,
        },
        {
          url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
          caption: 'Designer Spa Bathroom with Jacuzzi',
          isCover: false,
          sortOrder: 2,
        },
      ],
      amenityNames: [
        'Clubhouse & Lounge',
        'Infinity Swimming Pool',
        'Fully Equipped Gymnasium',
        'EV Vehicle Charging Stations',
        '24/7 3-Tier Security & CCTV',
        'Covered Podium Car Parking',
        'Rooftop Party Deck',
      ],
    },
    {
      propertyCode: 'RP-105',
      title: 'Luxury 3 BHK Riverside Rental with Modular Kitchen',
      slug: 'luxury-3-bhk-riverside-rental-keshav-nagar',
      description: 'Fully furnished, move-in ready 3 BHK apartment available for immediate company lease or family tenancy in Keshav Nagar. Features air conditioning in all bedrooms, modular kitchen with chimney & hob, refrigerator, washing machine, and 55-inch smart TV.',
      listingType: 'RENT',
      propertyType: 'Apartment',
      bhk: 3,
      price: 42000, // 42,000 / month
      priceDisplay: '₹42,000 / mo',
      carpetArea: 1420,
      superArea: 1750,
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      floor: '11th of 20 Floors',
      totalFloors: 20,
      furnishing: 'Fully Furnished',
      possessionStatus: 'Ready to Move',
      possessionDate: 'Available from 1st of next month',
      locality: 'Keshav Nagar',
      address: 'Florida Riverwalk, Keshav Nagar, Pune 411036',
      landmark: 'Near Lonkar High School & Prestige Chamber',
      latitude: 18.5358,
      longitude: 73.9312,
      reraNumber: 'P52100021489',
      isFeatured: false,
      isVerified: true,
      status: 'AVAILABLE',
      viewsCount: 178,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80',
          caption: 'Cozy Designer Living Room for Rent',
          isCover: true,
          sortOrder: 0,
        },
        {
          url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
          caption: 'Fully Equipped Kitchen',
          isCover: false,
          sortOrder: 1,
        },
      ],
      amenityNames: [
        'Clubhouse & Lounge',
        'Infinity Swimming Pool',
        '24/7 3-Tier Security & CCTV',
        'Covered Podium Car Parking',
        'Power Backup (100%)',
      ],
    },
    {
      propertyCode: 'RP-106',
      title: 'Grade-A Commercial Retail & Office Space',
      slug: 'grade-a-commercial-retail-office-space-mundhwa-road',
      description: 'High-visibility corner commercial showroom and executive office suite on the main Mundhwa-Kharadi connecting highway. High footfall corridor ideal for bank branches, medical clinics, boutique firms, or flagship retail outlets. Ample customer parking.',
      listingType: 'INVEST',
      propertyType: 'Commercial Office',
      bhk: 1,
      price: 12500000, // 1.25 Cr
      priceDisplay: '₹1.25 Cr',
      carpetArea: 1100,
      superArea: 1500,
      bedrooms: 1,
      bathrooms: 2,
      balconies: 0,
      floor: 'Ground & 1st Mezzanine',
      totalFloors: 6,
      furnishing: 'Unfurnished',
      possessionStatus: 'Ready to Move',
      possessionDate: 'Immediate',
      locality: 'Mundhwa',
      address: 'Commercial Hub, Mundhwa Main Road, Pune 411036',
      landmark: 'Near Prestige Chamber',
      latitude: 18.5322,
      longitude: 73.9248,
      reraNumber: 'P52100031899',
      isFeatured: true,
      isVerified: true,
      status: 'AVAILABLE',
      viewsCount: 95,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
          caption: 'Premium Commercial Glass Facade & Atrium',
          isCover: true,
          sortOrder: 0,
        },
        {
          url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
          caption: 'Spacious Column-free Open Floor Plan',
          isCover: false,
          sortOrder: 1,
        },
      ],
      amenityNames: [
        '24/7 3-Tier Security & CCTV',
        'Covered Podium Car Parking',
        'Power Backup (100%)',
        'High Speed Elevators',
        'EV Vehicle Charging Stations',
      ],
    },
  ];

  for (const p of properties) {
    const { images, amenityNames, ...propData } = p;
    const property = await prisma.property.upsert({
      where: { propertyCode: p.propertyCode },
      update: {},
      create: propData,
    });

    // Create Images
    for (const img of images) {
      await prisma.propertyImage.create({
        data: {
          propertyId: property.id,
          url: img.url,
          caption: img.caption,
          isCover: img.isCover,
          sortOrder: img.sortOrder,
        },
      });
    }

    // Connect Amenities
    for (const aName of amenityNames) {
      const aId = amenityMap.get(aName);
      if (aId) {
        await prisma.propertyAmenity.upsert({
          where: {
            propertyId_amenityId: {
              propertyId: property.id,
              amenityId: aId,
            },
          },
          update: {},
          create: {
            propertyId: property.id,
            amenityId: aId,
          },
        });
      }
    }
    console.log(`Seeded Property: ${property.propertyCode} - ${property.title}`);
  }

  // 4. Seed Testimonials
  const testimonials = [
    {
      clientName: 'Rahul & Sneha Kulkarni',
      location: 'Keshav Nagar Homeowners',
      rating: 5,
      comment: 'Rudra Property made buying our 3 BHK in Keshav Nagar completely transparent and stress-free. From verified documentation to negotiation, their advice was honest and spot-on. Highly recommended in Pune!',
    },
    {
      clientName: 'Vikramaditya Shinde',
      location: 'Tech Director, EON Kharadi',
      rating: 5,
      comment: 'Found my dream luxury apartment in Kharadi within 5 days through Rudra Property. Their knowledge of upcoming infrastructure, builder reputation, and price trends is truly unmatched.',
    },
    {
      clientName: 'Dr. Anita Deshmukh',
      location: 'Investor, Mundhwa Commercial Space',
      rating: 5,
      comment: 'Professional, punctual, and reliable. Office at Prestige Chamber Keshav Nagar makes them easily accessible. I have completed two high-yield investments with their guidance.',
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: t,
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
