export interface ProjectConfig {
  identity: {
    projectName: string;
    tagline: string;
    developerName: string;
    brokerLicense: string;
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
  brokerStats: {
    label: string;
    value: string;
    subtext: string;
  }[];
  underConstructionPortfolio: {
    title: string;
    subtitle: string;
    badge: string;
    projects: {
      id: string;
      name: string;
      corridor: string;
      location: string;
      stage: string;
      progress: number;
      typology: string;
      possession: string;
      priceStarting: string;
      reraNumber: string;
      imageUrl: string;
      isFlagship?: boolean;
      galleryImages?: string[];
      youtubeId?: string;
      description?: string;
      highlights?: string[];
    }[];
  };
  underConstructionAdvantages: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
      iconName: string;
    }[];
  };
  advisoryProcess: {
    badge: string;
    title: string;
    subtitle: string;
    steps: {
      number: string;
      title: string;
      description: string;
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
  constructionProgress: {
    title: string;
    subtitle: string;
    currentStage: string;
    overallProgress: number;
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
}

export const projectConfig: ProjectConfig = {
  identity: {
    projectName: "Rudra Real Estate",
    tagline: "Pune's Premier Under-Construction Real Estate Brokerage & Advisory",
    developerName: "Rudra Realty Advisory",
    brokerLicense: "MahaRERA Reg. Broker: A52100038912",
    reraNumber: "MahaRERA Registered Brokerage • A52100038912",
    projectStatus: "Under-Construction Luxury Portfolio",
    statusBadge: "PUNE REAL ESTATE ADVISORY • EXCLUSIVE UNDER-CONSTRUCTION INVENTORY",
    logo: {
      src: "/branding/rudra-logo.jpg",
      alt: "Rudra Real Estate - Luxury Property Advisory",
      placement: "left",
      showEmblem: true,
    },
  },

  hero: {
    eyebrow: "PUNE'S LUXURY REAL ESTATE BROKERAGE",
    headline: "CURATED UNDER-CONSTRUCTION LUXURY RESIDENCES",
    subheadline:
      "Exclusive access to Pune's top upcoming residential landmarks. Benefit from pre-launch pricing, construction-linked security, and certified MahaRERA verification with zero brokerage.",
    primaryCtaText: "EXPLORE UNDER-CONSTRUCTION PROJECTS",
    secondaryCtaText: "BOOK VIP HARDHAT TOUR",
    youtubeId: "peTnFrq3oEA",
    fallbackPoster:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85",
  },

  brokerStats: [
    {
      label: "Portfolio Advised",
      value: "₹500+ Cr",
      subtext: "In Under-Construction Assets",
    },
    {
      label: "Client Brokerage",
      value: "0% Fee",
      subtext: "Direct Developer Allotments",
    },
    {
      label: "MahaRERA Audited",
      value: "100%",
      subtext: "Strict Title Due Diligence",
    },
    {
      label: "Pre-Launch Gain",
      value: "15% – 25%",
      subtext: "Expected Value Appreciation",
    },
  ],

  overview: {
    title: "PUNE'S TRUSTED REAL ESTATE BROKERAGE",
    subtitle: "Specializing in High-Appreciation Under-Construction Luxury Developments",
    description:
      "Rudra Real Estate is an independent luxury property consultancy. We assist discerning buyers and investors in acquiring high-potential under-construction residences directly from vetted developers with complete legal transparency and zero brokerage charges.",
    specifications: [
      {
        label: "Brokerage Service",
        value: "0% on New Bookings",
      },
      {
        label: "Regulatory Standing",
        value: "MahaRERA Registered (A52100038912)",
      },
      {
        label: "Focus Category",
        value: "Exclusively Under-Construction",
      },
      {
        label: "Core Corridors",
        value: "Koregaon Park, Mundhwa, Kharadi & Baner",
      },
      {
        label: "Typical Typologies",
        value: "3, 4 & 5 BHK Mansions & Penthouses",
      },
      {
        label: "Payment Structure",
        value: "Construction-Linked Tranches (CLP)",
      },
    ],
  },

  underConstructionPortfolio: {
    badge: "UNDER-CONSTRUCTION SHOWCASE",
    title: "FEATURED UNDER-CONSTRUCTION DEVELOPMENTS",
    subtitle: "Curated selection of high-growth residential towers currently in active construction across Pune.",
    projects: [
      {
        id: "proj-riverfront-mansions",
        name: "The Riverfront Mansions",
        corridor: "Keshav Nagar - Mundhwa",
        location: "Keshav Nagar – Mundhwa River Promenade",
        stage: "Active 14th Floor Slab Pouring",
        progress: 48,
        typology: "3 & 4 BHK Riverfront Sky Mansions",
        possession: "December 2027",
        priceStarting: "₹1.25 Cr*",
        reraNumber: "P52100028912",
        imageUrl:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
        isFlagship: true,
        youtubeId: "TZbnTChYqx0",
        description:
          "A landmark riverfront development offering uninterrupted water views, double-height cantilevered balconies, and monolithic shear-wall RCC structure.",
        galleryImages: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
        ],
        highlights: [
          "14th floor active casting under progress",
          "11.8-ft floor-to-ceiling clear slab height",
          "Zero client brokerage on all pre-launch units",
        ],
      },
      {
        id: "proj-koregaon-skyline",
        name: "Koregaon Park Sky Suites",
        corridor: "Koregaon Park Annexe",
        location: "Koregaon Park Extension Corridor",
        stage: "Double-Height Podium & EV Bays",
        progress: 28,
        typology: "4 BHK Ultra-Luxury Penthouses",
        possession: "June 2028",
        priceStarting: "₹2.10 Cr*",
        reraNumber: "P52100030114",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        youtubeId: "XtuJBAo0BJA",
        description:
          "High-altitude sky residences and duplex penthouses bordering Koregaon Park, engineered with imported Italian marble and private biometric elevator foyers.",
        galleryImages: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
        ],
        highlights: [
          "Podium slab & EV charging bays cast",
          "Exclusive private elevator vestibule for each unit",
          "MahaRERA certified milestone schedule",
        ],
      },
      {
        id: "proj-riverside-promenade",
        name: "The Riverside Promenade",
        corridor: "Keshav Nagar - Mundhwa",
        location: "Riverside Sanctuary, Mundhwa",
        stage: "Deep Raft Basalt Piling",
        progress: 15,
        typology: "3 BHK Biophilic Residences",
        possession: "December 2028",
        priceStarting: "₹1.45 Cr*",
        reraNumber: "P52100031890",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
        youtubeId: "pkWz1l2WdcY",
        description:
          "Biophilic sustainable architecture integrating landscaped garden terraces, natural cross-ventilation, and resort-style wellness amenities.",
        galleryImages: [
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=85",
        ],
        highlights: [
          "Deep raft basalt foundation certified",
          "15% to 25% expected pre-handover appreciation",
          "Zero brokerage on all early allotments",
        ],
      },
      {
        id: "proj-kharadi-central",
        name: "Elysium Towers Kharadi",
        corridor: "Kharadi IT Corridor",
        location: "Near EON Free Zone, Kharadi",
        stage: "10th Floor Superstructure RCC",
        progress: 42,
        typology: "2.5 & 3.5 BHK Modern Homes",
        possession: "November 2027",
        priceStarting: "₹1.15 Cr*",
        reraNumber: "P52100039011",
        imageUrl:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
        youtubeId: "TZbnTChYqx0",
        description:
          "Strategically located adjacent to EON IT Park, designed for tech executives seeking luxury living with minutes of commute to top business parks.",
        galleryImages: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1600&q=85",
        ],
        highlights: [
          "10th floor slab underway",
          "High rental yield potential in Kharadi IT corridor",
          "Construction-linked payment tranches (CLP)",
        ],
      },
      {
        id: "proj-baner-crestline",
        name: "The Crestline Baner",
        corridor: "Baner - Balewadi",
        location: "High Street Extension, Baner",
        stage: "6th Floor Slab Casting",
        progress: 32,
        typology: "3 & 4 BHK Urban Mansions",
        possession: "March 2028",
        priceStarting: "₹1.85 Cr*",
        reraNumber: "P52100037890",
        imageUrl:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
        youtubeId: "pkWz1l2WdcY",
        description:
          "Urban luxury residences located off Balewadi High Street, offering high ceilings, expansive glass terraces, and smart home automation integration.",
        galleryImages: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
        ],
        highlights: [
          "Superstructure casting active on 6th level",
          "Baner High Street lifestyle access",
          "Direct developer pricing with zero brokerage",
        ],
      },
      {
        id: "proj-kalyani-heights",
        name: "Kalyani Crest Residences",
        corridor: "Kalyani Nagar",
        location: "Central Avenue, Kalyani Nagar",
        stage: "18th Floor Slab in Progress",
        progress: 65,
        typology: "4.5 BHK River-Facing Residences",
        possession: "October 2026",
        priceStarting: "₹2.75 Cr*",
        reraNumber: "P52100034512",
        imageUrl:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
        youtubeId: "XtuJBAo0BJA",
        description:
          "One of the most prestigious addresses in Pune, offering sprawling single-floor sky suites with panoramic tree-canopy and river vistas.",
        galleryImages: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
        ],
        highlights: [
          "Advanced stage — 18th floor slab underway",
          "Near-handover certainty (October 2026)",
          "100% verified title and MahaRERA escrow ledger",
        ],
      },
    ],
  },

  underConstructionAdvantages: {
    badge: "WHY BUY UNDER-CONSTRUCTION",
    title: "THE STRATEGIC INVESTOR ADVANTAGE",
    subtitle: "Why savvy luxury buyers choose under-construction developments through Rudra Real Estate.",
    items: [
      {
        title: "Pre-Launch Price Arbitrage",
        description:
          "Lock in early-stage developer prices and capture 15% to 25% capital appreciation before final building handover.",
        iconName: "TrendingUp",
      },
      {
        title: "Construction-Linked Tranches (CLP)",
        description:
          "Pay progressively only as verified structural slabs are cast, protected by strict MahaRERA escrow guidelines.",
        iconName: "ShieldCheck",
      },
      {
        title: "100% Legal & RERA Due Diligence",
        description:
          "Every development in our portfolio undergoes rigorous scrutiny of land titles, commencement certificates, and bank escrow accounts.",
        iconName: "FileCheck",
      },
      {
        title: "Zero Brokerage Guarantee",
        description:
          "As authorized channel advisory partners for leading developers, Rudra Real Estate charges absolutely zero brokerage fees to buyers.",
        iconName: "Sparkles",
      },
    ],
  },

  advisoryProcess: {
    badge: "HOW WE WORK",
    title: "A SEAMLESS 3-STEP ADVISORY JOURNEY",
    subtitle: "From portfolio curation to hardhat structural inspection and direct developer allotment.",
    steps: [
      {
        number: "01",
        title: "Curated Portfolio Matching",
        description:
          "We analyze your investment horizon, desired corridor, and floor-plan preferences to present only top-tier vetted developments.",
      },
      {
        number: "02",
        title: "Chauffeured Hardhat Tour",
        description:
          "Experience the project first-hand. Our senior property advisor accompanies you on-site to inspect structural quality and view corridors.",
      },
      {
        number: "03",
        title: "Zero-Brokerage Direct Allotment",
        description:
          "We secure institutional developer pricing, assist with legal documentation, and handle loan approvals with zero brokerage cost.",
      },
    ],
  },

  animationVideos: {
    title: "3D WALKTHROUGHS & VIRTUAL CINEMA",
    subtitle: "Explore high-definition 3D architectural renders and virtual tours of upcoming developments.",
    videos: [
      {
        id: "video-ultra-luxury",
        title: "Ultra-Luxury Sky Mansion Interior",
        tag: "INTERIOR 3D TOUR",
        youtubeId: "TZbnTChYqx0",
        posterUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        duration: "3:40",
      },
      {
        id: "video-amenities-tour",
        title: "Modern Architectural Walkthrough",
        tag: "PROJECT VIRTUAL TOUR",
        youtubeId: "pkWz1l2WdcY",
        posterUrl:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
        duration: "2:30",
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
    ],
  },

  gallery: {
    categories: ["All", "Architecture", "Interiors", "Sky Decks"],
    items: [
      {
        id: "facade-tower",
        title: "Modern Glass Facade",
        category: "Architecture",
        caption: "Soaring contemporary architecture in upcoming developments.",
        imageUrl:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "grand-foyer",
        title: "Grand Arrival Lobby",
        category: "Architecture",
        caption: "Double-height entrance foyers with Italian marble finishes.",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "master-salon",
        title: "Master Living Salon",
        category: "Interiors",
        caption: "Open-plan living spaces framed by panoramic glass windows.",
        imageUrl:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "sky-deck",
        title: "Private Sky Sundeck",
        category: "Sky Decks",
        caption: "Cantilevered sundecks capturing scenic skyline vistas.",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "penthouse-suite",
        title: "Presidential Bedroom Suite",
        category: "Interiors",
        caption: "Generous master bedrooms with en-suite dressing salons.",
        imageUrl:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "evening-facade",
        title: "Architectural Dusk Illumination",
        category: "Architecture",
        caption: "Warm evening lighting across geometric residential terraces.",
        imageUrl:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
      },
    ],
  },

  location: {
    title: "PRIME INVESTMENT CORRIDORS",
    subtitle: "High-growth zones where Rudra Real Estate curates verified under-construction developments",
    address:
      "Rudra Real Estate Advisory, Office No. 47, Prestige Chamber, Keshav Nagar–Mundhwa, Pune 411036",
    mapQuery: "Prestige Chamber, Keshav Nagar, Mundhwa, Pune 411036",
    landmarks: [
      {
        destination: "Keshav Nagar - Mundhwa Riverfront",
        driveTime: "Immediate",
        category: "Corridor",
      },
      {
        destination: "Koregaon Park & North Main Road",
        driveTime: "5 Mins",
        category: "Corridor",
      },
      {
        destination: "EON IT Free Zone, Kharadi",
        driveTime: "7 Mins",
        category: "Corridor",
      },
      {
        destination: "Kalyani Nagar Business Hub",
        driveTime: "8 Mins",
        category: "Corridor",
      },
      {
        destination: "Magarpatta City & Cybercity",
        driveTime: "10 Mins",
        category: "Corridor",
      },
      {
        destination: "Pune International Airport (PNQ)",
        driveTime: "20 Mins",
        category: "Transit",
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
      "Rudra Real Estate Advisory, Office No. 47, Prestige Chamber, Keshav Nagar–Mundhwa, Pune 411036",
  },

  constructionProgress: {
    title: "LIVE CONSTRUCTION STATUS",
    subtitle: "Active on-site progress across under-construction developments",
    currentStage: "Active Superstructure Construction",
    overallProgress: 48,
    targetPossession: "December 2027",
    reraFilingDate: "MahaRERA Audited Quarterly Progress",
    milestones: [
      { step: 1, title: "Foundation & Piling", status: "COMPLETED", percentage: 100, targetDate: "Completed" },
      { step: 2, title: "Podium & Multi-Level Parking", status: "COMPLETED", percentage: 100, targetDate: "Completed" },
      { step: 3, title: "Superstructure Slabs", status: "IN_PROGRESS", percentage: 52, targetDate: "Q2 2027" },
      { step: 4, title: "Curtain Glazing & Facade", status: "UPCOMING", percentage: 0, targetDate: "Q3 2027" },
      { step: 5, title: "Finishes & Clubhouse", status: "UPCOMING", percentage: 0, targetDate: "Q4 2027" },
      { step: 6, title: "Handover & Occupancy", status: "UPCOMING", percentage: 0, targetDate: "Dec 2027" },
    ],
    investorAdvantages: [
      { title: "Construction-Linked Plan", description: "Payments tied directly to certified slab progress.", iconName: "ShieldCheck" },
      { title: "MahaRERA Escrow Safety", description: "70% of buyer funds secured in escrow accounts.", iconName: "Lock" },
      { title: "Pre-Launch Price Gain", description: "Capture strong capital gains before building possession.", iconName: "TrendingUp" },
    ],
  },

  amenities: {
    title: "UNDER-CONSTRUCTION AMENITY PRECINCTS",
    subtitle: "Resort-grade lifestyle amenities planned across our featured developments",
    items: [
      { id: "infinity-pool", title: "Horizon Lap Pool", category: "Wellness", description: "Temperature-regulated infinity pool.", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85", iconName: "Waves" },
      { id: "sky-lounge", title: "Rooftop Observatory", category: "Lifestyle", description: "Skyline lounge and private sundeck.", imageUrl: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=85", iconName: "SunMedium" },
      { id: "wellness-gym", title: "Fitness & Yoga Studio", category: "Wellness", description: "Equipped with state-of-the-art gear.", imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=85", iconName: "Dumbbell" },
    ],
  },

  floorPlans: {
    title: "RESIDENCE CONFIGURATIONS",
    subtitle: "Representative layouts across under-construction portfolios",
    configurations: [
      {
        id: "3bhk-luxury",
        bhk: "3 BHK Residence",
        title: "The Imperial Suite",
        carpetArea: "1,380 Sq. Ft.",
        superArea: "1,720 Sq. Ft.",
        priceStarting: "₹1.25 Cr*",
        highlights: ["Double-height living salon with sundeck", "Covered podium car parking bays"],
        diagramUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "4bhk-presidential",
        bhk: "4 BHK Sky Suite",
        title: "The Royal Haven",
        carpetArea: "1,840 Sq. Ft.",
        superArea: "2,350 Sq. Ft.",
        priceStarting: "₹1.85 Cr*",
        highlights: ["Private elevator foyer", "Wraparound panoramic sundecks"],
        diagramUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
};
