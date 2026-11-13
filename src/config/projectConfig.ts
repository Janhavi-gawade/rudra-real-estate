export interface ProjectConfig {
  identity: {
    projectName: string;
    tagline: string;
    developerName: string;
    reraNumber: string;
    projectStatus: string;
    statusBadge: string;
    logo: {
      src: string;
      alt: string;
      placement: 'left' | 'center' | 'split';
      showEmblem: boolean;
    };
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    youtubeId?: string;
    fallbackPoster: string;
  };
  underConstructionPortfolio: {
    title: string;
    subtitle: string;
    badge: string;
    projects: {
      id: string;
      name: string;
      location: string;
      stage: string;
      progress: number;
      typology: string;
      possession: string;
      priceStarting: string;
      reraNumber: string;
      imageUrl: string;
      isFlagship?: boolean;
    }[];
  };
  constructionProgress: {
    title: string;
    subtitle: string;
    currentStage: string;
    overallProgress: number; // percentage
    targetPossession: string;
    reraFilingDate: string;
    milestones: {
      step: number;
      title: string;
      status: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
      percentage: number;
      targetDate: string;
    }[];
    investorAdvantages: {
      title: string;
      description: string;
      iconName: string;
    }[];
  };
  animationVideos: {
    title: string;
    subtitle: string;
    videos: {
      id: string;
      title: string;
      tag: string;
      youtubeId: string;
      posterUrl: string;
      duration: string;
    }[];
  };
  overview: {
    title: string;
    subtitle: string;
    description: string;
    specifications: {
      label: string;
      value: string;
    }[];
  };
  gallery: {
    categories: string[];
    items: {
      id: string;
      title: string;
      category: string;
      caption: string;
      imageUrl: string;
    }[];
  };
  amenities: {
    title: string;
    subtitle: string;
    items: {
      id: string;
      title: string;
      category: string;
      description: string;
      imageUrl: string;
      iconName: string;
    }[];
  };
  floorPlans: {
    title: string;
    subtitle: string;
    configurations: {
      id: string;
      bhk: string;
      title: string;
      carpetArea: string;
      superArea: string;
      priceStarting: string;
      highlights: string[];
      diagramUrl: string;
    }[];
  };
  location: {
    title: string;
    subtitle: string;
    address: string;
    mapQuery: string;
    landmarks: {
      destination: string;
      driveTime: string;
      category: string;
    }[];
  };
  contact: {
    phone: string;
    displayPhone: string;
    whatsappNumber: string;
    email: string;
    siteOfficeHours: string;
    siteOfficeAddress: string;
  };
}

export const projectConfig: ProjectConfig = {
  identity: {
    projectName: "THE RIVIERA RESERVE",
    tagline: "Exclusively Under-Construction Luxury Residences",
    developerName: "Rudra Luxury Developments",
    reraNumber: "P52100028912 (MahaRERA Registered)",
    projectStatus: "Under Construction",
    statusBadge: "EXCLUSIVELY UNDER CONSTRUCTION • ACTIVE 14TH SLAB",
    logo: {
      src: "/branding/rudra-logo.jpg",
      alt: "The Riviera Reserve - Under Construction",
      placement: "left",
      showEmblem: true,
    },
  },

  hero: {
    eyebrow: "PUNE RIVERFRONT • EXCLUSIVELY UNDER CONSTRUCTION",
    headline: "UNDER-CONSTRUCTION RIVERFRONT RESIDENCES",
    subheadline:
      "A limited collection of 72 private residences, currently under active superstructure construction along Pune's scenic riverfront corridor with possession certified for December 2027.",
    primaryCtaText: "VIEW LIVE CONSTRUCTION",
    secondaryCtaText: "BOOK HARDHAT SITE TOUR",
    youtubeId: "Er5ojikZizc",
    fallbackPoster:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85",
  },

  underConstructionPortfolio: {
    badge: "UNDER-CONSTRUCTION PORTFOLIO",
    title: "EXCLUSIVELY UNDER-CONSTRUCTION DEVELOPMENTS",
    subtitle: "Rudra Luxury Developments — Curating High-Appreciation Riverfront Landmarks Prior to Handover",
    projects: [
      {
        id: "proj-riviera-reserve",
        name: "The Riviera Reserve (Flagship)",
        location: "Keshav Nagar – Mundhwa Riverfront",
        stage: "Active 14th Floor Slab Pouring",
        progress: 48,
        typology: "3 & 4 BHK Sky Mansions",
        possession: "December 2027",
        priceStarting: "₹1.25 Cr*",
        reraNumber: "P52100028912",
        imageUrl:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
        isFlagship: true,
      },
      {
        id: "proj-riviera-horizon",
        name: "The Riviera Horizon",
        location: "Koregaon Park Extension Corridor",
        stage: "Double-Height Podium & EV Bays",
        progress: 28,
        typology: "4 BHK Riverfront Penthouses",
        possession: "June 2028",
        priceStarting: "₹2.10 Cr*",
        reraNumber: "P52100030114",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "proj-riviera-promenade",
        name: "The Riviera Promenade",
        location: "Riverside Sanctuary, Mundhwa",
        stage: "Deep Raft Basalt Piling",
        progress: 15,
        typology: "3 BHK Biophilic Residences",
        possession: "December 2028",
        priceStarting: "₹1.45 Cr*",
        reraNumber: "P52100031890",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
      },
    ],
  },

  overview: {
    title: "UNDER-CONSTRUCTION PROJECT DOSSIER",
    subtitle: "Active Superstructure • MahaRERA Certified Milestones",
    description:
      "Exclusively under-construction. Engineered with high-strength monolithic RCC and acoustic double glazing, each private residence features unblocked riverfront vistas and construction-linked tranches.",
    specifications: [
      {
        label: "Construction Stage",
        value: "14th Slab Underway",
      },
      {
        label: "Available Typology",
        value: "3 & 4 BHK Sky Mansions",
      },
      {
        label: "Location Corridor",
        value: "Keshav Nagar – Koregaon Park Ext.",
      },
      {
        label: "Pre-Launch Starting",
        value: "₹1.25 Cr*",
      },
      {
        label: "Possession Target",
        value: "December 2027",
      },
      {
        label: "MahaRERA ID",
        value: "P52100028912",
      },
    ],
  },

  animationVideos: {
    title: "3D PRE-CONSTRUCTION CINEMA",
    subtitle: "Visualizing the architecture prior to final possession",
    videos: [
      {
        id: "video-pune-highrise",
        title: "Architectural Exterior & Riverfront",
        tag: "EXTERIOR 3D TOUR",
        youtubeId: "Er5ojikZizc",
        posterUrl:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
        duration: "2:15",
      },
      {
        id: "video-ultra-luxury",
        title: "4 BHK Sky Mansion Interior",
        tag: "INTERIOR WALKTHROUGH",
        youtubeId: "TZbnTChYqx0",
        posterUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        duration: "3:40",
      },
      {
        id: "video-skyline-cinema",
        title: "Sky Penthouse & Observatory Deck",
        tag: "PENTHOUSE TOUR",
        youtubeId: "XtuJBAo0BJA",
        posterUrl:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
        duration: "1:55",
      },
      {
        id: "video-amenities-tour",
        title: "Clubhouse & Horizon Lap Pool",
        tag: "AMENITY TOUR",
        youtubeId: "pkWz1l2WdcY",
        posterUrl:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
        duration: "2:30",
      },
    ],
  },

  constructionProgress: {
    title: "LIVE CONSTRUCTION STATUS",
    subtitle: "Active on-site progress • Handover December 2027",
    currentStage: "14th Floor Superstructure Slab in Progress",
    overallProgress: 48,
    targetPossession: "December 2027",
    reraFilingDate: "Q3 2026 MahaRERA Inspection Verified",
    milestones: [
      {
        step: 1,
        title: "Substructure & Deep Raft Piling",
        status: "COMPLETED",
        percentage: 100,
        targetDate: "Completed",
      },
      {
        step: 2,
        title: "Podium & Multi-Level Parking",
        status: "COMPLETED",
        percentage: 100,
        targetDate: "Completed",
      },
      {
        step: 3,
        title: "Superstructure (Floor 14 of 28)",
        status: "IN_PROGRESS",
        percentage: 52,
        targetDate: "Q2 2027",
      },
      {
        step: 4,
        title: "Curtain Glazing & Facade",
        status: "UPCOMING",
        percentage: 0,
        targetDate: "Q3 2027",
      },
      {
        step: 5,
        title: "Clubhouse & Interior Finishes",
        status: "UPCOMING",
        percentage: 0,
        targetDate: "Q4 2027",
      },
      {
        step: 6,
        title: "Occupancy Certificate & Handover",
        status: "UPCOMING",
        percentage: 0,
        targetDate: "Dec 2027",
      },
    ],
    investorAdvantages: [
      {
        title: "Construction-Linked Plan",
        description: "Payments aligned directly to certified slab casting milestones.",
        iconName: "ShieldCheck",
      },
      {
        title: "MahaRERA Escrow Account",
        description: "70% of buyer funds securely held in project escrow account.",
        iconName: "Lock",
      },
      {
        title: "Early Stage Price Advantage",
        description: "Significant capital appreciation anticipated by possession.",
        iconName: "TrendingUp",
      },
      {
        title: "Custom Interior Layouts",
        description: "Opportunity to modify room flow prior to final slab pouring.",
        iconName: "Layers",
      },
    ],
  },

  gallery: {
    categories: ["All", "Architecture", "Interiors", "Sky Decks"],
    items: [
      {
        id: "facade-tower",
        title: "Tower Silhouette",
        category: "Architecture",
        caption: "Crystalline high-rise architecture along the riverfront.",
        imageUrl:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "grand-foyer",
        title: "Grand Arrival Lobby",
        category: "Architecture",
        caption: "24-foot double-height foyer with Italian marble finishes.",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "master-salon",
        title: "Master Living Salon",
        category: "Interiors",
        caption: "Open-plan living space framed by floor-to-ceiling glass.",
        imageUrl:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "sky-deck",
        title: "Private Sky Sundeck",
        category: "Sky Decks",
        caption: "Cantilevered sundecks capturing panoramic river views.",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "penthouse-suite",
        title: "Presidential Bedroom",
        category: "Interiors",
        caption: "Engineered timber floors with en-suite dressing salon.",
        imageUrl:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "evening-facade",
        title: "Architectural Illumination",
        category: "Architecture",
        caption: "Warm evening lighting across geometric terraces.",
        imageUrl:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
      },
    ],
  },

  amenities: {
    title: "UNDER-CONSTRUCTION AMENITY PRECINCT",
    subtitle: "Curated experiences across 40,000 sq. ft.",
    items: [
      {
        id: "infinity-pool",
        title: "Horizon Lap Pool",
        category: "Wellness",
        description: "Temperature-regulated infinity pool overlooking the river.",
        imageUrl:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
        iconName: "Waves",
      },
      {
        id: "sky-lounge",
        title: "Rooftop Observatory",
        category: "Lifestyle",
        description: "Private dining terrace and 360-degree skyline lounge.",
        imageUrl:
          "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=85",
        iconName: "SunMedium",
      },
      {
        id: "wellness-gym",
        title: "Fitness & Yoga Studio",
        category: "Wellness",
        description: "Equipped with Technogym suites and private yoga deck.",
        imageUrl:
          "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=85",
        iconName: "Dumbbell",
      },
      {
        id: "zen-gardens",
        title: "Landscaped Zen Groves",
        category: "Nature",
        description: "Acre-wide green retreat with sensory water features.",
        imageUrl:
          "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=85",
        iconName: "Trees",
      },
      {
        id: "smart-security",
        title: "Biometric Access & Valet",
        category: "Convenience",
        description: "Direct elevator access to private lobbies with 24/7 concierge.",
        imageUrl:
          "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=85",
        iconName: "ShieldCheck",
      },
      {
        id: "clubhouse",
        title: "The Resident Club",
        category: "Leisure",
        description: "Private screening theatre, billiards, and business salon.",
        imageUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
        iconName: "Building2",
      },
    ],
  },

  floorPlans: {
    title: "UNDER-CONSTRUCTION SCHEMATICS",
    subtitle: "Customizable layouts prior to slab casting",
    configurations: [
      {
        id: "3bhk-luxury",
        bhk: "3 BHK Residence",
        title: "The Imperial Suite",
        carpetArea: "1,380 Sq. Ft.",
        superArea: "1,720 Sq. Ft.",
        priceStarting: "₹1.25 Cr*",
        highlights: [
          "Double-height living salon with river view sundeck",
          "Master bedroom with private walk-in dressing space",
          "2 dedicated covered podium car parking bays",
        ],
        diagramUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "4bhk-presidential",
        bhk: "4 BHK Sky Suite",
        title: "The Royal Haven",
        carpetArea: "1,840 Sq. Ft.",
        superArea: "2,350 Sq. Ft.",
        priceStarting: "₹1.85 Cr*",
        highlights: [
          "Private elevator access opening into exclusive foyer",
          "Wraparound dual sundecks with river vistas",
          "3 dedicated covered podium car parking bays",
        ],
        diagramUrl:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "penthouse-skyline",
        bhk: "Sky Penthouse",
        title: "The Crown Duplex",
        carpetArea: "2,850 Sq. Ft.",
        superArea: "3,650 Sq. Ft.",
        priceStarting: "Price on Request",
        highlights: [
          "Double-height glass atrium with open sky vistas",
          "Private rooftop plunge pool and sunset deck",
          "4 dedicated covered parking bays with EV chargers",
        ],
        diagramUrl:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },

  location: {
    title: "LOCATION & CONNECTIVITY",
    subtitle: "Minutes from Koregaon Park and Kharadi IT Hub",
    address:
      "The Riviera Reserve, Riverside Promenade, Keshav Nagar–Mundhwa Corridor, Pune 411036",
    mapQuery: "Prestige Chamber, Keshav Nagar, Mundhwa, Pune 411036",
    landmarks: [
      {
        destination: "Koregaon Park",
        driveTime: "5 Mins",
        category: "Lifestyle",
      },
      {
        destination: "EON IT Park, Kharadi",
        driveTime: "7 Mins",
        category: "Tech Hub",
      },
      {
        destination: "Kalyani Nagar",
        driveTime: "8 Mins",
        category: "Commercial",
      },
      {
        destination: "Magarpatta Cybercity",
        driveTime: "10 Mins",
        category: "Business Hub",
      },
      {
        destination: "Pune International Airport",
        driveTime: "20 Mins",
        category: "Transit",
      },
      {
        destination: "Columbia Asia Hospital / Schools",
        driveTime: "4 Mins",
        category: "Healthcare",
      },
    ],
  },

  contact: {
    phone: "7798504435",
    displayPhone: "+91 7798504435",
    whatsappNumber: "917798504435",
    email: "rudrapropertypune@gmail.com",
    siteOfficeHours: "Daily 10:00 AM – 7:30 PM",
    siteOfficeAddress:
      "Under-Construction Experience Centre & Site Office, Office No. 47, Prestige Chamber, Keshav Nagar–Mundhwa, Pune 411036",
  },
};
