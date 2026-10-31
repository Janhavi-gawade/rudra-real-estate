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
    youtubeId?: string; // High-definition ambient background loop
    fallbackPoster: string;
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
      description: string;
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
      description: string;
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
      description?: string;
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
    tagline: "Exclusive Under-Construction Private Residences & Sky Mansions",
    developerName: "Rudra Luxury Developments",
    reraNumber: "P52100028912 (MahaRERA Registered)",
    projectStatus: "Under Construction",
    statusBadge: "UNDER CONSTRUCTION • ACTIVE SUPERSTRUCTURE PROGRESS",
    logo: {
      src: "/branding/rudra-logo.jpg",
      alt: "The Riviera Reserve - Rudra",
      placement: "left",
      showEmblem: true,
    },
  },

  hero: {
    eyebrow: "EXCLUSIVE UNDER-CONSTRUCTION LANDMARK • PUNE",
    headline: "WHERE LUXURY MEETS ARCHITECTURAL VISION",
    subheadline:
      "Witness the rise of Pune's most exclusive riverfront residential masterpiece. Currently under active construction with delivery slated for December 2027.",
    primaryCtaText: "EXPLORE THE RESIDENCE",
    secondaryCtaText: "REGISTER INTEREST",
    // 4K Architectural Ambient Flythrough Video ID
    youtubeId: "Er5ojikZizc",
    fallbackPoster:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85",
  },

  constructionProgress: {
    title: "CONSTRUCTION STATUS & LIVE MILESTONES",
    subtitle: "Quarterly Engineering Progress • Verified MahaRERA Construction Milestones",
    currentStage: "Superstructure 14th Floor Slab Casting in Active Progress",
    overallProgress: 48,
    targetPossession: "December 2027 (RERA Timeline Compliant)",
    reraFilingDate: "Quarterly Progress Report: Q3 2026 Verified",
    milestones: [
      {
        step: 1,
        title: "Substructure & Deep Raft Piling",
        description: "100% completed seismic-resistant foundation anchored into basalt bedrock.",
        status: "COMPLETED",
        percentage: 100,
        targetDate: "Completed",
      },
      {
        step: 2,
        title: "Double-Height Podium & Parking",
        description: "Podium slab cast with dedicated EV charging ducting and drainage.",
        status: "COMPLETED",
        percentage: 100,
        targetDate: "Completed",
      },
      {
        step: 3,
        title: "Tower Superstructure (28 Floors)",
        description: "Floor 14 slab cast. High-grade M60 concrete monolithic pouring in progress.",
        status: "IN_PROGRESS",
        percentage: 52,
        targetDate: "Q2 2027",
      },
      {
        step: 4,
        title: "Curtain Glazing & Acoustic Facade",
        description: "German double-glazed facade panels and cantilevered sundeck framing.",
        status: "UPCOMING",
        percentage: 0,
        targetDate: "Q3 2027",
      },
      {
        step: 5,
        title: "Bespoke MEP, Club & Interior Finishes",
        description: "Italian marble flooring, elevator commissioning, and resort clubhouse.",
        status: "UPCOMING",
        percentage: 0,
        targetDate: "Q4 2027",
      },
      {
        step: 6,
        title: "Final Inspections & Key Handover",
        description: "MahaRERA occupancy certificate (OC) verification and VIP handover.",
        status: "UPCOMING",
        percentage: 0,
        targetDate: "Dec 2027",
      },
    ],
    investorAdvantages: [
      {
        title: "Construction-Linked Plan",
        description: "Pay progressively in transparent tranches tied strictly to certified slab casting milestones.",
        iconName: "ShieldCheck",
      },
      {
        title: "Pre-Handover Capital Gain",
        description: "Benefit from anticipated 28-35% price appreciation between under-construction and possession.",
        iconName: "TrendingUp",
      },
      {
        title: "Custom Interior Layouts",
        description: "Work with our architectural team to customize room flow and sundecks before final MEP casting.",
        iconName: "Layers",
      },
      {
        title: "MahaRERA Escrow Security",
        description: "70% of investor funds securely ring-fenced in a dedicated project escrow account.",
        iconName: "Lock",
      },
    ],
  },

  animationVideos: {
    title: "CINEMATIC 3D ANIMATION & WALKTHROUGHS",
    subtitle: "Immerse Yourself in High-Definition 3D Walkthroughs and Architectural Drone Perspectives",
    videos: [
      {
        id: "video-pune-highrise",
        title: "High-Rise Architectural 3D Walkthrough",
        tag: "3D ARCHITECTURAL RENDER",
        description:
          "Cinematic 3D animation gliding through the grand entrance, cantilevered sky terraces, landscaped podium, and riverfront vistas.",
        youtubeId: "Er5ojikZizc",
        posterUrl:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
        duration: "2:15",
      },
      {
        id: "video-ultra-luxury",
        title: "Ultra-Luxury Sky Mansions & Terraces",
        tag: "VIRTUAL WALKTHROUGH",
        description:
          "Experience the sheer grandeur of the 4 BHK sky suites, double-height living salons, and private sunset terraces.",
        youtubeId: "TZbnTChYqx0",
        posterUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        duration: "3:40",
      },
      {
        id: "video-skyline-cinema",
        title: "4K Architectural Visualization Tour",
        tag: "CINEMATIC WALKTHROUGH",
        description:
          "Hyper-realistic 4K architectural render tour capturing the sunrise lighting, imported Italian travertine, and sky observatory.",
        youtubeId: "XtuJBAo0BJA",
        posterUrl:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
        duration: "1:55",
      },
      {
        id: "video-amenities-tour",
        title: "Resort Clubhouse & Infinity Horizon Deck",
        tag: "AMENITY PRECINCT PREVIEW",
        description:
          "Virtual tour of the 40,000 sq. ft. private resident clubhouse, infinity lap pool, screening salon, and zen meditation grove.",
        youtubeId: "pkWz1l2WdcY",
        posterUrl:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
        duration: "2:30",
      },
    ],
  },

  overview: {
    title: "THE UNDER-CONSTRUCTION MASTERPIECE",
    subtitle: "A Biophilic Riverfront Landmark Rising in Pune",
    description:
      "Rising on the banks of Pune's scenic riverfront corridor, The Riviera Reserve is an exclusively under-construction landmark engineered to international standards. Built with high-strength monolithic RCC and acoustic glazing, every residence features cantilevered private sundecks and unblocked panoramic vistas.",
    specifications: [
      {
        label: "Project Status",
        value: "Under Construction",
        description: "Active superstructure works underway • 14th Slab",
      },
      {
        label: "Available Typologies",
        value: "3 & 4 BHK Sky Mansions",
        description: "Limited collection of 72 private residences",
      },
      {
        label: "Prime Location",
        value: "Keshav Nagar – Koregaon Park Extension",
        description: "Minutes from Koregaon Park & Kharadi IT corridor",
      },
      {
        label: "Starting Price",
        value: "₹1.25 Cr*",
        description: "Exclusive pre-launch construction-linked tranches",
      },
      {
        label: "Target Possession",
        value: "December 2027",
        description: "Strictly aligned with MahaRERA milestones",
      },
      {
        label: "Architectural Pedigree",
        value: "Biophilic High-Rise",
        description: "Double-height landscaped sky decks & green facades",
      },
    ],
  },

  gallery: {
    categories: ["All", "Architecture", "Living Spaces", "Sky Decks", "Arrival"],
    items: [
      {
        id: "facade-tower",
        title: "Iconic Tower Facade",
        category: "Architecture",
        caption: "Contemporary crystalline silhouette bathed in golden twilight.",
        imageUrl:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "grand-foyer",
        title: "Double-Height Grand Lobby",
        category: "Arrival",
        caption: "Soaring 24-foot entrance atrium with imported Italian travertine.",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "master-salon",
        title: "Expansive Master Salon",
        category: "Living Spaces",
        caption: "Seamless open-plan design capturing uninterrupted horizon views.",
        imageUrl:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "sky-deck",
        title: "Cantilevered Sky Sundeck",
        category: "Sky Decks",
        caption: "Private 10-foot deep sundecks for alfresco entertaining.",
        imageUrl:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "penthouse-suite",
        title: "Presidential Bedroom Suite",
        category: "Living Spaces",
        caption: "Engineered timber flooring with bespoke en-suite dressing salon.",
        imageUrl:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      },
      {
        id: "evening-facade",
        title: "Architectural Illumination",
        category: "Architecture",
        caption: "Warm accent illumination highlighting geometric terraces.",
        imageUrl:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
      },
    ],
  },

  amenities: {
    title: "PRIVATE CLUB & RESORT EXPERIENCES",
    subtitle: "Curated Wellness and Leisure Across 40,000 Sq. Ft.",
    items: [
      {
        id: "infinity-pool",
        title: "Horizon Infinity Lap Pool",
        category: "Wellness",
        description:
          "Temperature-regulated infinity pool with sun lounger submerged deck overlooking the river.",
        imageUrl:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
        iconName: "Waves",
      },
      {
        id: "sky-lounge",
        title: "Rooftop Observatory & Private Dining",
        category: "Lifestyle",
        description:
          "Private banquet salon and glass-encased observatory deck for exclusive resident gatherings.",
        imageUrl:
          "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=85",
        iconName: "SunMedium",
      },
      {
        id: "wellness-gym",
        title: "Bespoke Fitness & Yoga Pavilion",
        category: "Wellness",
        description:
          "Fully equipped Technogym suite with dedicated pilates studio and outdoor meditation deck.",
        imageUrl:
          "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=85",
        iconName: "Dumbbell",
      },
      {
        id: "zen-gardens",
        title: "Biophilic Zen Reflexology Groves",
        category: "Nature",
        description:
          "Acre-wide sculpted green sanctuary with sensory water features and shaded reading pavilions.",
        imageUrl:
          "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=85",
        iconName: "Trees",
      },
      {
        id: "smart-security",
        title: "3-Tier Biometric Shield & Valet",
        category: "Convenience",
        description:
          "Keycard elevator access direct to private lobby with 24/7 concierge and EV charging bays.",
        imageUrl:
          "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=85",
        iconName: "ShieldCheck",
      },
      {
        id: "clubhouse",
        title: "The Resident Club & Foyer",
        category: "Leisure",
        description:
          "Bespoke private screening theatre, billiards salon, and executive co-working boardroom.",
        imageUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
        iconName: "Building2",
      },
    ],
  },

  floorPlans: {
    title: "UNDER-CONSTRUCTION SCHEMATICS & PLANS",
    subtitle: "Customizable Architectural Layouts Prior to Final Slab Casting",
    configurations: [
      {
        id: "3bhk-luxury",
        bhk: "3 BHK Sky Residence",
        title: "The Imperial 3 BHK Suite",
        carpetArea: "1,380 Sq. Ft.",
        superArea: "1,720 Sq. Ft.",
        priceStarting: "₹1.25 Cr*",
        highlights: [
          "Double-height living & dining salon",
          "East-facing riverview sundeck (60 sq. ft.)",
          "Dedicated servant powder room",
          "Master bedroom with walk-in wardrobe",
          "2 covered podium car parking bays",
        ],
        diagramUrl:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "4bhk-presidential",
        bhk: "4 BHK Presidential Suite",
        title: "The Royal 4 BHK Haven",
        carpetArea: "1,840 Sq. Ft.",
        superArea: "2,350 Sq. Ft.",
        priceStarting: "₹1.85 Cr*",
        highlights: [
          "Private elevator access into your foyer",
          "Wraparound dual sundecks with river vistas",
          "Separate staff quarters with ensuite bath",
          "Gourmet show kitchen plus wet prep area",
          "3 covered podium car parking bays",
        ],
        diagramUrl:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "penthouse-skyline",
        bhk: "Sky Penthouse Duplex",
        title: "The Sky Penthouse Crown",
        carpetArea: "2,850 Sq. Ft.",
        superArea: "3,650 Sq. Ft.",
        priceStarting: "Price on Request",
        highlights: [
          "Double-height glass atrium with open sky views",
          "Private rooftop plunge pool & party deck",
          "Automated climate control & acoustic glazing",
          "Bespoke private wellness spa & jacuzzi",
          "4 covered parking bays with EV chargers",
        ],
        diagramUrl:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },

  location: {
    title: "PRIVILEGED LOCATION & CONNECTIVITY",
    subtitle: "Strategically Placed at Pune's High-Growth Riverfront Nexus",
    address:
      "The Riviera Reserve, Riverside Promenade, Keshav Nagar–Mundhwa Corridor, Pune 411036",
    mapQuery: "Prestige Chamber, Keshav Nagar, Mundhwa, Pune 411036",
    landmarks: [
      {
        destination: "Koregaon Park North Main Road",
        driveTime: "5 - 7 Mins",
        category: "Lifestyle & Fine Dining",
      },
      {
        destination: "Kalyani Nagar & Central Pune",
        driveTime: "8 Mins",
        category: "Commercial Hub",
      },
      {
        destination: "EON Free Zone & WTC Kharadi",
        driveTime: "7 - 9 Mins",
        category: "IT & Tech Hub",
      },
      {
        destination: "Magarpatta Cybercity & Hadapsar",
        driveTime: "10 Mins",
        category: "Business District",
      },
      {
        destination: "Pune International Airport (PNQ)",
        driveTime: "20 Mins",
        category: "Transit",
      },
      {
        destination: "The Orbis School & Columbia Asia Hospital",
        driveTime: "4 Mins",
        category: "Healthcare & Education",
      },
    ],
  },

  contact: {
    phone: "7798504435",
    displayPhone: "+91 7798504435",
    whatsappNumber: "917798504435",
    email: "rudrapropertypune@gmail.com",
    siteOfficeHours: "Monday to Sunday: 10:00 AM – 7:30 PM",
    siteOfficeAddress:
      "Under-Construction Experience Centre & Site Office, Office No. 47, Prestige Chamber, Keshav Nagar–Mundhwa, Pune 411036",
  },
};
