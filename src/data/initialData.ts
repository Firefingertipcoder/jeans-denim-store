import { BrandConfig, Product, FitGuideItem } from '../types';

export const DEFAULT_BRAND_CONFIG: BrandConfig = {
  brandName: "FREAKINS",
  brandTagline: "Wear Your Vibe. Bold, Unapologetic & Experimentative Street Denim.",
  brandEstYear: "2021",
  logoType: "freakins-bold",
  logoText: "FREAKINS",
  tabLabel: "GEN-Z",
  primaryColor: "#111111", // Pitch Black
  accentColor: "#CCFF00", // Freakins Neon Lime Pop
  currencySymbol: "₹",
  currencyCode: "INR",
  topTickerMessages: [
    "🔥 FREAKIN' DROPS: BUY 2 GET EXTRA 10% OFF | USE CODE: FREAK10",
    "⚡ VIRAL ON INSTA | NEW KOREAN & CARGO DENIMS JUST DROPPED",
    "🚚 FREE EXPRESS SHIPPING ON ALL ORDERS ABOVE ₹999",
    "✨ 100% EXPERIMENTATIVE DENIM | 35+ STREETWEAR CATEGORIES"
  ],
  freeShippingThreshold: 999,
  contactEmail: "help@freakins.denim",
  contactPhone: "1800-419-3732 (Mon-Sat 10am-7pm)",
  storeLocationText: "Store Locator (Mumbai, Delhi, Bengaluru, Pune)",
  heroSlides: [
    {
      id: "slide-1",
      tagline: "VIRAL GEN-Z DROPS",
      title: "THE BAGGY & CARGO REVOLUTION",
      subtitle: "Ultra-relaxed skater silhouettes, multi-pocket tactical utility, and effortless streetwear fits.",
      ctaText: "SHOP BAGGY & CARGOS",
      ctaCategory: "Women",
      secondaryCtaText: "CUSTOM LAB",
      secondaryCtaCategory: "All",
      imageUrl: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=2000&auto=format&fit=crop",
      textColor: "light",
      badge: "🔥 FYP VIRAL"
    },
    {
      id: "slide-2",
      tagline: "UNAPOLOGETIC FIT CULTURE",
      title: "KOREAN SLOUCHY & WIDE-LEG JEANS",
      subtitle: "Engineered for maximum drape and high-impact style. The fits dominating street style feeds.",
      ctaText: "SHOP KOREAN PANTS",
      ctaCategory: "Men",
      secondaryCtaText: "VIEW REELS",
      secondaryCtaCategory: "All",
      imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=2000",
      textColor: "light",
      badge: "⚡ NEW DROP"
    },
    {
      id: "slide-3",
      tagline: "DENIM-ON-DENIM EDIT",
      title: "CORSETS, BOMBERS & TRUCKERS",
      subtitle: "Structured corset bustiers, vintage wash truckers, and statement denim outerwear.",
      ctaText: "SHOP TOPS & JACKETS",
      ctaCategory: "Women",
      secondaryCtaText: "EXPLORE ALL",
      secondaryCtaCategory: "Unisex",
      imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=2000&auto=format&fit=crop",
      textColor: "light",
      badge: "✨ MUST HAVE"
    }
  ],
  storiesHeadline: "BUILT FOR THE UNAPOLOGETIC GENERATION.",
  storiesSubtitle: "Freakins was born to break boring fashion rules. Experimentative denim, creator collaborations, and hyper-trendy street silhouettes designed for self-expression.",
  sustainableHeadline: "ETHICAL CRAFT & RESPONSIBLE DYES.",
  sustainableText: "Our ozone wash processes and recycled cotton blends cut down water and chemical usage by up to 60%. High fashion that respects the future.",
  bannerCtaTitle: "JOIN THE FREAKIN' FAM",
  bannerCtaSubtitle: "Get flat ₹200 off your first drop, early VIP access to limited capsule releases & creator co-design voting rights."
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-freakins-cyber-cargo",
    name: "Cyber Tactical Multi-Pocket Cargo Denim",
    slug: "cyber-tactical-multi-pocket-cargo-denim",
    subtitle: "Viral 8-Pocket Utility Denim with Cinch Hem Toggles",
    code: "FRK-CRG-2026",
    gender: "Unisex",
    category: "Jeans",
    fitType: "Cargo & Parachute",
    price: 2199,
    originalPrice: 3499,
    discountPercent: 37,
    rating: 4.9,
    reviewsCount: 684,
    isNew: true,
    isBestSeller: true,
    isIcon: true,
    isTrending: true,
    colors: [
      {
        name: "Vintage Mineral Wash Grey",
        hex: "#3a3d40",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop"
        ]
      },
      {
        name: "Pitch Shadow Black",
        hex: "#161616",
        image: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1200&auto=format&fit=crop"
        ]
      }
    ],
    sizes: ["26", "28", "30", "32", "34", "36"],
    description: "The viral silhouette that broke Instagram. Built with 8 functional 3D cargo pockets, heavy-gauge tactical zip hardware, and hem toggles that let you switch between ultra-baggy puddle drape and cinched jogger mode.",
    details: [
      "8 3D tactical bellows pockets with snap flaps",
      "Adjustable bungee drawcord hem toggles",
      "Relaxed low/mid-rise drop waist with belt loops",
      "100% heavyweight 13.5oz streetwear cotton denim",
      "Freakins signature rubberized tab badge"
    ],
    wash: "Black & Grey",
    rise: "Mid Rise",
    stretch: "Rigid (100% Cotton)",
    legOpening: "20\" Wide with Toggle Cinch",
    composition: "100% Pure Heavyweight Cotton Denim",
    reviews: [
      {
        id: "rf1",
        author: "Kritika Roy",
        rating: 5,
        date: "July 14, 2026",
        title: "The hype is 100% REAL",
        comment: "Literally get stopped 5 times every time I wear these cargos. The puddle fit over my Jordan 4s is immaculate.",
        fitFeedback: "True to Size",
        verified: true
      }
    ]
  },
  {
    id: "prod-freakins-90s-baggy",
    name: "90s Low-Rise Skater Baggy Jeans",
    slug: "90s-low-rise-skater-baggy-jeans",
    subtitle: "Extreme Wide Leg with Vintage Puddle Hem Drape",
    code: "FRK-BGY-90S",
    gender: "Women",
    category: "Jeans",
    fitType: "Baggy & Skater",
    price: 1999,
    originalPrice: 3299,
    discountPercent: 39,
    rating: 4.9,
    reviewsCount: 890,
    isNew: false,
    isBestSeller: true,
    isIcon: true,
    isTrending: true,
    colors: [
      {
        name: "Sun-Bleached Ocean Tint",
        hex: "#87a4c4",
        image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop"
        ]
      },
      {
        name: "Dirty Tint Vintage Acid",
        hex: "#4d637b",
        image: "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop"
        ]
      }
    ],
    sizes: ["26", "28", "30", "32", "34", "36"],
    description: "Inspired by late 90s underground skate culture. Sits comfortably loose on the hips with a generous balloon drape down to a puddle hem.",
    details: [
      "Low rise relaxed hip fit with deep coin pocket",
      "22\" extra wide leg opening with clean hem",
      "Soft washed vintage hand feel without losing denim structure",
      "Reinforced bartack stitching on stress points"
    ],
    wash: "Light Bleach",
    rise: "Low Rise",
    stretch: "Rigid (100% Cotton)",
    legOpening: "22\" Ultra Wide Skater Leg",
    composition: "100% Sustainable Ring-Spun Cotton",
    reviews: [
      {
        id: "rf2",
        author: "Devika Sen",
        rating: 5,
        date: "August 02, 2026",
        title: "Best baggy jeans in India period",
        comment: "Freakins nailed the waist-to-hip ratio. Usually baggy jeans are way too loose at the waist, but these fit snug on waist and huge on legs.",
        fitFeedback: "True to Size",
        verified: true
      }
    ]
  },
  {
    id: "prod-freakins-korean-slouchy",
    name: "Korean Slouchy Pleated Denim Trousers",
    slug: "korean-slouchy-pleated-denim-trousers",
    subtitle: "Double Front Pleats with Tailored Street Drape",
    code: "FRK-KRN-PLT",
    gender: "Men",
    category: "Jeans",
    fitType: "Korean Wide Leg",
    price: 2299,
    originalPrice: 3599,
    discountPercent: 36,
    rating: 4.8,
    reviewsCount: 420,
    isNew: true,
    isBestSeller: true,
    isIcon: true,
    isTrending: true,
    colors: [
      {
        name: "Deep Midnight Raw Indigo",
        hex: "#1d293d",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1200",
        gallery: [
          "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=1200&auto=format&fit=crop"
        ]
      }
    ],
    sizes: ["28", "30", "32", "34", "36"],
    description: "The intersection of sharp Seoul tailoring and fluid street denim. Features sharp double front pleats and extended leg length designed to stack naturally over loafers and sneakers.",
    details: [
      "Double knife pleats on front for fluid drape",
      "Extended outseam for intentional sneaker stacking",
      "Slash front trouser pockets + welt back pockets",
      "Soft enzyme wash for effortless all-day movement"
    ],
    wash: "Raw / Dark Indigo",
    rise: "High Rise",
    stretch: "Low Stretch (1-2%)",
    legOpening: "20\" Fluid Straight Opening",
    composition: "99% Cotton, 1% Elastane",
    reviews: []
  },
  {
    id: "prod-freakins-corset-top",
    name: "Structure Denim Corset Bustier Top",
    slug: "structure-denim-corset-bustier-top",
    subtitle: "Contour Boned Denim Bustier with Exposed Back Metal Zip",
    code: "FRK-TOP-CRS",
    gender: "Women",
    category: "Shirts & Tops",
    fitType: "Corset & Tops",
    price: 1499,
    originalPrice: 2499,
    discountPercent: 40,
    rating: 4.9,
    reviewsCount: 310,
    isNew: true,
    isBestSeller: true,
    isIcon: true,
    isTrending: true,
    colors: [
      {
        name: "Vintage Washed Indigo",
        hex: "#3d5a80",
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop"
        ]
      }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "The ultimate denim-on-denim statement piece. Structured internal flexible boning hugs your torso with a flattering curved sweetheart neckline and industrial back zipper.",
    details: [
      "Internal structural boning for sculpted fit",
      "Curved sweetheart neckline with contrast gold topstitching",
      "Heavy-duty exposed metal back zip with ring puller",
      "Pairs effortlessly with baggy cargos and wide-leg jeans"
    ],
    wash: "Medium Vintage",
    rise: "Mid Rise",
    stretch: "Comfort Stretch (3-5%)",
    legOpening: "Cropped Waistband",
    composition: "98% Cotton, 2% Spandex Heavy Denim",
    reviews: []
  },
  {
    id: "prod-501-original-men",
    name: "501® Original Fit Jeans",
    slug: "501-original-fit-jeans-men",
    subtitle: "The Timeless Straight Leg with Signature Button Fly",
    code: "00501-0115",
    gender: "Men",
    category: "Jeans",
    fitType: "Straight",
    price: 3999,
    originalPrice: 4999,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 384,
    isNew: false,
    isBestSeller: true,
    isIcon: true,
    isTrending: true,
    colors: [
      {
        name: "Stonewash Medium Vintage",
        hex: "#46607e",
        image: "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=1200&auto=format&fit=crop"
        ]
      },
      {
        name: "Dark Raw Indigo Rinse",
        hex: "#1b2c45",
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop"
        ]
      },
      {
        name: "Onyx Black Enzyme Wash",
        hex: "#222222",
        image: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop"
        ]
      }
    ],
    sizes: ["28x30", "30x30", "30x32", "32x32", "34x32", "36x32", "38x34"],
    description: "Close your eyes. Think 'jeans.' Now open them. They were 501® Originals, right? With a classic straight leg and iconic styling, they are literally the blueprint for every pair of modern jeans in existence.",
    details: [
      "Signature button fly and copper-plated rivets",
      "Sits at the regular waistline with regular seat and thigh",
      "Classic straight leg silhouette with 16.5\" leg opening",
      "Durable 14.25 oz non-stretch heavyweight cotton denim",
      "Iconic Two-Horse pull leather patch on back waistband",
      "Red tab detail stitched onto back right pocket"
    ],
    wash: "Medium Vintage",
    rise: "Mid Rise",
    stretch: "Rigid (100% Cotton)",
    legOpening: "16.5\" Straight Leg",
    composition: "100% Cotton Heavyweight Denim",
    reviews: [
      {
        id: "r1",
        author: "Aarav Sharma",
        rating: 5,
        date: "May 12, 2026",
        title: "The Holy Grail of Jeans",
        comment: "Nothing beats the original 501 button fly. Takes a couple of wears to break in, but once molded, they feel like custom tailored armor.",
        fitFeedback: "True to Size",
        verified: true
      },
      {
        id: "r2",
        author: "Karan Mehta",
        rating: 5,
        date: "April 29, 2026",
        title: "Unmatched durability & wash",
        comment: "I wear these to office and on weekend rides. The medium stonewash has the exact vintage patina I was looking for.",
        fitFeedback: "True to Size",
        verified: true
      }
    ]
  },
  {
    id: "prod-511-slim-fit-men",
    name: "511™ Slim Fit Denim Jeans",
    slug: "511-slim-fit-jeans-men",
    subtitle: "Modern Slim with Room to Move and All-Day Stretch",
    code: "04511-2407",
    gender: "Men",
    category: "Jeans",
    fitType: "Slim",
    price: 3499,
    originalPrice: 4299,
    discountPercent: 18,
    rating: 4.8,
    reviewsCount: 295,
    isNew: false,
    isBestSeller: true,
    isIcon: true,
    colors: [
      {
        name: "Deep Marine Indigo",
        hex: "#283b54",
        image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop"
        ]
      },
      {
        name: "Worn In Light Blue",
        hex: "#6b8ea9",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop"
        ]
      }
    ],
    sizes: ["28x30", "30x30", "32x32", "34x32", "36x32"],
    description: "A modern slim with room to move, the 511™ Slim Fit Jeans are a classic since right now. These jeans sit below the waist with a slim leg from hip to ankle.",
    details: [
      "Sits below waist, slim through seat and thigh",
      "Slim leg with 14.5\" leg opening",
      "Zip fly with signature metal shank button closure",
      "Levi's® Flex advanced stretch technology for max comfort",
      "5-pocket western styling"
    ],
    wash: "Raw / Dark Indigo",
    rise: "Mid Rise",
    stretch: "Comfort Stretch (3-5%)",
    legOpening: "14.5\" Slim Leg",
    composition: "98% Cotton, 2% Elastane",
    reviews: [
      {
        id: "r3",
        author: "Rohan Patel",
        rating: 5,
        date: "June 02, 2026",
        title: "Super comfortable for daily wear",
        comment: "The stretch is just right. Not skin-tight like skinny jeans, but gives a sharp tailored silhouette.",
        fitFeedback: "True to Size",
        verified: true
      }
    ]
  },
  {
    id: "prod-ribcage-straight-women",
    name: "Ribcage Straight Ankle Jeans",
    slug: "ribcage-straight-ankle-jeans-women",
    subtitle: "12-Inch Super High Rise with Iconic Straight Leg",
    code: "72693-0012",
    gender: "Women",
    category: "Jeans",
    fitType: "Straight",
    price: 4499,
    originalPrice: 5299,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 512,
    isNew: true,
    isBestSeller: true,
    isIcon: true,
    isTrending: true,
    colors: [
      {
        name: "At the Ready - Medium Indigo",
        hex: "#3b5577",
        image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop"
        ]
      },
      {
        name: "No Bounds - Black Stone",
        hex: "#202020",
        image: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1200&auto=format&fit=crop"
        ]
      },
      {
        name: "Cloud Bleach Light Wash",
        hex: "#87a7c7",
        image: "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop"
        ]
      }
    ],
    sizes: ["24x29", "26x29", "28x29", "30x29", "32x29", "34x29"],
    description: "Our highest high rise yet. The Ribcage Jean—with its sky-high 12-inch rise—has become a waist-defining, leg-lengthening obsession. This fit will show off your figure and make you feel as amazing as you look.",
    details: [
      "12-inch super high waist rise",
      "Slim through the hip, classic straight leg cut",
      "Ankle length crop with clean finished hem",
      "Button fly closure with embossed vintage hardware",
      "Non-stretch premium denim for authentic structure"
    ],
    wash: "Medium Vintage",
    rise: "High Rise",
    stretch: "Low Stretch (1-2%)",
    legOpening: "17\" Straight Ankle",
    composition: "99% Cotton, 1% Elastane",
    reviews: [
      {
        id: "r4",
        author: "Pooja Hegde",
        rating: 5,
        date: "May 18, 2026",
        title: "Defines the waist perfectly!",
        comment: "These are holy grail jeans. Hugs the high waist without pinching, and the straight leg looks incredible with both heels and sneakers.",
        fitFeedback: "True to Size",
        verified: true
      }
    ]
  },
  {
    id: "prod-trucker-jacket-original",
    name: "Original Denim Trucker Jacket",
    slug: "original-denim-trucker-jacket",
    subtitle: "The Quintessential Denim Layer That Gets Better with Age",
    code: "72334-0130",
    gender: "Unisex",
    category: "Jackets",
    fitType: "Trucker Jacket",
    price: 4999,
    originalPrice: 6299,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 420,
    isNew: false,
    isBestSeller: true,
    isIcon: true,
    colors: [
      {
        name: "Colusa Medium Indigo Wash",
        hex: "#3d5c80",
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop"
        ]
      },
      {
        name: "Washed Black Denim",
        hex: "#262626",
        image: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1200&auto=format&fit=crop"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "A Trucker Jacket makes an outfit. You would be hard-pressed to find a jacket with an easier shape, more versatile weight, or inherent sense of cool. Hits at the hip with pointed collar and chest spade pockets.",
    details: [
      "Point collar with button-front placket",
      "Button-flap patch pockets at chest & welt side pockets",
      "Side waist adjusters for customizable taper",
      "100% Cotton durable non-stretch denim"
    ],
    wash: "Medium Vintage",
    rise: "Mid Rise",
    stretch: "Rigid (100% Cotton)",
    legOpening: "Regular Waistline",
    composition: "100% Heavyweight Cotton",
    reviews: [
      {
        id: "r5",
        author: "Devendra Verma",
        rating: 5,
        date: "May 25, 2026",
        title: "Every man needs one of these",
        comment: "Heavyweight denim, timeless cut. Fits perfectly over a hoodie or t-shirt.",
        fitFeedback: "True to Size",
        verified: true
      }
    ]
  },
  {
    id: "prod-711-skinny-women",
    name: "711™ Skinny Jeans",
    slug: "711-skinny-jeans-women",
    subtitle: "Figure-Flattering Mid Rise with Incredible Sculpting Stretch",
    code: "19543-0008",
    gender: "Women",
    category: "Jeans",
    fitType: "Skinny",
    price: 3299,
    originalPrice: 3999,
    discountPercent: 17,
    rating: 4.7,
    reviewsCount: 310,
    isNew: false,
    isBestSeller: true,
    colors: [
      {
        name: "Deep Rinse Indigo",
        hex: "#19283d",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop"
        ]
      },
      {
        name: "Shadow Black",
        hex: "#1c1c1c",
        image: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1200&auto=format&fit=crop"
        ]
      }
    ],
    sizes: ["26x30", "28x30", "30x30", "32x30", "34x30"],
    description: "Designed to flatter, hold and lift all day, every day. The 711™ Skinny features an easy mid rise and a skinny leg opening that hugs your curves effortlessly.",
    details: [
      "Mid rise: 8.5 inches",
      "Skinny fit through hip and thigh",
      "Narrow 10.5\" leg opening",
      "Sculpt fabrication with 4-way stretch recovery"
    ],
    wash: "Raw / Dark Indigo",
    rise: "Mid Rise",
    stretch: "Hyperstretch",
    legOpening: "10.5\" Skinny Leg",
    composition: "70% Cotton, 20% Polyester, 8% Viscose, 2% Elastane"
  },
  {
    id: "prod-512-slim-taper-men",
    name: "512™ Slim Taper Jeans",
    slug: "512-slim-taper-jeans-men",
    subtitle: "The Perfect Middle Ground Between a Skinny and Regular Taper",
    code: "28833-0104",
    gender: "Men",
    category: "Jeans",
    fitType: "Slim Taper",
    price: 3699,
    originalPrice: 4599,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 340,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    colors: [
      {
        name: "Rinse Dark Indigo",
        hex: "#22354c",
        image: "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop"
        ]
      },
      {
        name: "Vintage Bleach Wash",
        hex: "#789cbd",
        image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=1200&auto=format&fit=crop"
        ]
      }
    ],
    sizes: ["28x30", "30x32", "32x32", "34x32", "36x32"],
    description: "The 512™ Slim Taper hits the sweet spot between a skinny and a regular taper. These jeans are part of our most versatile family of fits and a go-to for every occasion.",
    details: [
      "Same waist, seat and thigh as Levi's® 511™ but with a slimmer tapered leg",
      "Tailored-inspired cut with narrow 12.75\" leg opening",
      "Woven with a hint of stretch for active all-day mobility"
    ],
    wash: "Raw / Dark Indigo",
    rise: "Mid Rise",
    stretch: "Comfort Stretch (3-5%)",
    legOpening: "12.75\" Slim Taper",
    composition: "99% Cotton, 1% Elastane"
  },
  {
    id: "prod-western-denim-shirt",
    name: "Barstow Western Denim Shirt",
    slug: "barstow-western-denim-shirt",
    subtitle: "Authentic Western Yokes and Pearl Snap Buttons",
    code: "85744-0001",
    gender: "Men",
    category: "Shirts & Tops",
    fitType: "Slim",
    price: 2799,
    originalPrice: 3499,
    discountPercent: 20,
    rating: 4.8,
    reviewsCount: 180,
    isNew: false,
    isBestSeller: true,
    colors: [
      {
        name: "Medium Blue Stonewash",
        hex: "#4b6f96",
        image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=1200&auto=format&fit=crop"
        ]
      }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Worn by pioneers and cowboys, our Western shirts have been loved for generations for a reason: With rugged construction and iconic styling, they embody rugged craftsmanship.",
    details: [
      "Front and back pointed western yokes",
      "Chest flap pockets with signature pearlized snaps",
      "Curved shirttail hem for tucked or untucked styling",
      "100% Breathable cotton denim fabric"
    ],
    wash: "Medium Vintage",
    rise: "Mid Rise",
    stretch: "Rigid (100% Cotton)",
    legOpening: "Curved Hem",
    composition: "100% Lightweight Denim Cotton"
  },
  {
    id: "prod-loose-flare-women",
    name: "70s High Flare Jeans",
    slug: "70s-high-flare-jeans-women",
    subtitle: "High-Rise Retro Flare with an Authentic Bell Bottom",
    code: "A0899-0002",
    gender: "Women",
    category: "Jeans",
    fitType: "Bootcut & Flare",
    price: 4799,
    originalPrice: 5999,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 220,
    isNew: true,
    isTrending: true,
    colors: [
      {
        name: "Sunny Meadows Light Wash",
        hex: "#7ba0c4",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop"
        ]
      }
    ],
    sizes: ["25x32", "27x32", "29x32", "31x32", "33x32"],
    description: "Inspired by the free-spirited energy of the 1970s. Designed with a sky-high waist and a wide flared leg opening that elongates your stride.",
    details: [
      "12.5-inch ultra-high rise",
      "Slim through the hips and thighs, dramatically flares from knee to hem",
      "Wide 22\" flared leg opening",
      "Organic cotton blend with vintage texture"
    ],
    wash: "Light Bleach",
    rise: "High Rise",
    stretch: "Comfort Stretch (3-5%)",
    legOpening: "22\" Dramatic Flare",
    composition: "99% Organic Cotton, 1% Elastane"
  },
  {
    id: "prod-baggy-dad-relaxed",
    name: "Baggy Dad Loose Jeans",
    slug: "baggy-dad-loose-jeans",
    subtitle: "Slouchy, Relaxed Through the Hip and Thigh with Casual Puddle",
    code: "A3494-0000",
    gender: "Women",
    category: "Jeans",
    fitType: "Relaxed / Loose",
    price: 4299,
    originalPrice: 4999,
    discountPercent: 14,
    rating: 4.8,
    reviewsCount: 165,
    isNew: true,
    isTrending: true,
    colors: [
      {
        name: "Rad Dad Medium Tint",
        hex: "#4b6585",
        image: "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1200&auto=format&fit=crop"
        ]
      }
    ],
    sizes: ["24x30", "26x30", "28x30", "30x30", "32x30"],
    description: "Like you borrowed them from your dad's 90s closet, but tailored for a relaxed, effortlessly cool drape over boots or sneakers.",
    details: [
      "Mid rise with loose, spacious fit throughout",
      "Straight, wide leg that pools slightly at the hem",
      "Soft cottonized hemp blend"
    ],
    wash: "Medium Vintage",
    rise: "Mid Rise",
    stretch: "Rigid (100% Cotton)",
    legOpening: "18.5\" Loose Leg",
    composition: "80% Cotton, 20% Cottonized Hemp"
  },
  {
    id: "prod-selvedge-501-japan",
    name: "501® Made In Japan Selvedge Jeans",
    slug: "501-made-in-japan-selvedge-jeans",
    subtitle: "Crafted by Artisans on Vintage Shuttle Looms in Kaihara Mills",
    code: "00501-3329",
    gender: "Men",
    category: "Collections",
    fitType: "Straight",
    price: 12999,
    originalPrice: 14999,
    discountPercent: 13,
    rating: 5.0,
    reviewsCount: 142,
    isNew: true,
    isBestSeller: false,
    isIcon: true,
    colors: [
      {
        name: "Deep Raw Japanese Redline Selvedge",
        hex: "#121b2b",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop"
        ]
      }
    ],
    sizes: ["30x32", "32x32", "34x32", "36x34"],
    description: "Woven in Hiroshima, Japan on authentic vintage shuttle looms. Raw, unwashed, heavyweight selvedge denim featuring the signature redline edge inside the outseam.",
    details: [
      "Genuine Kaihara 14oz redline selvedge denim",
      "Made in Japan with artisan stitching",
      "Hidden back pocket rivets and embossed leather patch",
      "Rigid unwashed raw indigo that develops unique personal fades"
    ],
    wash: "Raw / Dark Indigo",
    rise: "Mid Rise",
    stretch: "Rigid (100% Cotton)",
    legOpening: "16.5\" Straight Selvedge",
    composition: "100% Japanese Cotton Selvedge Denim"
  }
];

export const FIT_GUIDE_DATA: FitGuideItem[] = [
  {
    name: "Baggy & Skater",
    gender: "All",
    description: "The viral Gen-Z staple. Wide, slouchy, ultra-relaxed from hip to hem with maximum puddle drape over sneakers.",
    waistRise: "Low or Mid Rise (Wear relaxed on hips)",
    thighFit: "Extra roomy skater cut",
    legOpening: "20\" - 23\" Mega Wide Opening",
    stretchLevel: "Rigid 100% Cotton Heavyweight",
    recommendedFor: "Streetwear heads, Y2K fits, chunky sneakers, everyday comfortable drip",
    imageUrl: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=600&auto=format&fit=crop",
    modelCode: "Freakins 90s Baggy"
  },
  {
    name: "Cargo & Parachute",
    gender: "All",
    description: "Multi-pocket tactical design with utility straps and adjustable bungee cords at the hem.",
    waistRise: "Mid Rise with Elastic/Drawcord waistband",
    thighFit: "Relaxed loose silhouette",
    legOpening: "18\" Wide with toggle cinch",
    stretchLevel: "Lightweight Ripstop or Soft Denim",
    recommendedFor: "Tactical streetwear, festival fits, crop tops, platform boots",
    imageUrl: "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=600&auto=format&fit=crop",
    modelCode: "Freakins Cyber Cargo"
  },
  {
    name: "Korean Wide Leg",
    gender: "All",
    description: "Tailored front pleats with dramatic slouchy drape. The clean Seoul streetwear silhouette.",
    waistRise: "High Rise with clean waistband",
    thighFit: "Voluminous pleat drape",
    legOpening: "21\" Fluid Straight Drape",
    stretchLevel: "Soft washed fluid cotton denim",
    recommendedFor: "Minimalist fashion, oversized shirts, loafers, high-fashion aesthetic",
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop",
    modelCode: "Freakins Korean Pants"
  },
  {
    name: "Barrel & Curved",
    gender: "Women",
    description: "Architectural horseshoe curved leg that bows outward at the calf and tapers subtly at the ankle.",
    waistRise: "High Rise (11.5\"+)",
    thighFit: "Curved balloon shape",
    legOpening: "16\" Cropped Taper",
    stretchLevel: "Rigid 100% Cotton",
    recommendedFor: "Editorial street style, fitted baby tees, statement shoes",
    imageUrl: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=600&auto=format&fit=crop",
    modelCode: "Freakins Curved Barrel"
  },
  {
    name: "Straight",
    gender: "All",
    description: "The original blueprint. Balanced cut straight from hip to hem with zero taper.",
    waistRise: "Mid to High Rise (Sits at natural waist)",
    thighFit: "Regular ease through seat and thigh",
    legOpening: "16\" - 17\" Classic Straight",
    stretchLevel: "Rigid 100% Cotton or Low Stretch",
    recommendedFor: "All body types, boots, sneakers, timeless everyday style",
    imageUrl: "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=600&auto=format&fit=crop",
    modelCode: "Freakins Classic Straight"
  },
  {
    name: "Bootcut & Flare",
    gender: "Women",
    description: "Fitted through thighs and gently opens from the knee down to balance proportions and lengthen legs.",
    waistRise: "High Rise (12\"+)",
    thighFit: "Slim fitted through upper leg",
    legOpening: "20\" - 22\" Flared Bell",
    stretchLevel: "Comfort Stretch",
    recommendedFor: "Elongating the silhouette, 70s rock-and-roll vibe",
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop",
    modelCode: "Freakins Y2K Flare"
  }
];

export const BRAND_PRESETS: { name: string; description: string; config: Partial<BrandConfig> }[] = [
  {
    name: "Freakins (Gen-Z Trendsetter)",
    description: "Hyper-trendy bold Gen-Z denim with pitch black & neon lime pops, baggy fits, and viral drop tickers.",
    config: {
      brandName: "FREAKINS",
      brandTagline: "Wear Your Vibe. Bold, Unapologetic & Experimentative Street Denim.",
      brandEstYear: "2021",
      logoType: "freakins-bold",
      logoText: "FREAKINS",
      tabLabel: "GEN-Z",
      primaryColor: "#111111",
      accentColor: "#CCFF00",
      currencySymbol: "₹",
      currencyCode: "INR",
      freeShippingThreshold: 999
    }
  },
  {
    name: "Sleek Interface (RAW & CO.)",
    description: "High-contrast architectural design with crimson rose #E11D48 accents and sharp edges.",
    config: {
      brandName: "RAW & CO.",
      brandTagline: "Exceptional Craft. Sustainable Denim. Built for the Long Haul.",
      brandEstYear: "1873",
      logoType: "red-tab",
      logoText: "RAW & CO",
      tabLabel: "RAW",
      primaryColor: "#E11D48",
      accentColor: "#1A1A1A",
      currencySymbol: "₹",
      currencyCode: "INR",
      freeShippingThreshold: 1499
    }
  },
  {
    name: "Levi's® Classic Heritage",
    description: "The iconic red tab, bold uppercase headers, and classic golden rivets.",
    config: {
      brandName: "LEVI'S®",
      brandTagline: "Quality Never Goes Out of Style. Since 1873.",
      brandEstYear: "1873",
      logoType: "red-tab",
      logoText: "Levi's",
      tabLabel: "LEVI'S",
      primaryColor: "#E00000",
      accentColor: "#111111",
      currencySymbol: "₹",
      currencyCode: "INR",
      freeShippingThreshold: 1499
    }
  },
  {
    name: "Indigo Selvedge Atelier",
    description: "Raw Japanese denim workshop aesthetic with dark navy & vintage brass tones.",
    config: {
      brandName: "SELVEDGE & CO.",
      brandTagline: "Artisan Kaihara Mills Shuttle Loom Denim",
      brandEstYear: "1982",
      logoType: "denim-selvedge",
      logoText: "SELVEDGE",
      tabLabel: "RAW",
      primaryColor: "#1B365D",
      accentColor: "#C59B27",
      currencySymbol: "₹",
      currencyCode: "INR",
      freeShippingThreshold: 1999
    }
  },
  {
    name: "Nordic Minimalist Denim",
    description: "Ultra clean monochrome studio look with onyx black tab.",
    config: {
      brandName: "DENIM LAB.",
      brandTagline: "Pure Architectural Cotton & Modern Forms.",
      brandEstYear: "2024",
      logoType: "minimal-modern",
      logoText: "DENIM LAB",
      tabLabel: "LAB",
      primaryColor: "#111111",
      accentColor: "#555555",
      currencySymbol: "€",
      currencyCode: "EUR",
      freeShippingThreshold: 75
    }
  }
];
