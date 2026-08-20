export type Gender = 'Men' | 'Women' | 'Unisex' | 'All';

export type Category = 'Jeans' | 'Jackets' | 'Shirts & Tops' | 'Accessories' | 'Collections';

export type DenimFit = 
  | 'Skinny'
  | 'Slim'
  | 'Straight'
  | 'Slim Taper'
  | 'Relaxed / Loose'
  | 'Bootcut & Flare'
  | 'Baggy & Skater'
  | 'Cargo & Parachute'
  | 'Korean Wide Leg'
  | 'Barrel & Curved'
  | 'Corset & Tops'
  | 'Trucker Jacket'
  | 'Oversized';

export type WashType = 'Raw / Dark Indigo' | 'Medium Vintage' | 'Light Bleach' | 'Black & Grey' | 'Distressed';

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
  gallery: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large';
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  code: string; // e.g. "00501-0115"
  gender: 'Men' | 'Women' | 'Unisex';
  category: Category;
  fitType: DenimFit;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isIcon?: boolean;
  isTrending?: boolean;
  colors: ProductColor[];
  sizes: string[]; // e.g. ["28x30", "30x32", "32x32", "34x32", "36x34"]
  description: string;
  details: string[];
  wash: WashType;
  rise: 'Low Rise' | 'Mid Rise' | 'High Rise';
  stretch: 'Rigid (100% Cotton)' | 'Low Stretch (1-2%)' | 'Comfort Stretch (3-5%)' | 'Hyperstretch';
  legOpening: string; // e.g. "16 inch straight leg"
  composition: string; // e.g. "100% Cotton heavyweight 14oz redline selvedge denim"
  reviews?: Review[];
}

export interface HeroSlide {
  id: string;
  tagline: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaCategory: Gender;
  secondaryCtaText?: string;
  secondaryCtaCategory?: Gender;
  imageUrl: string;
  textColor: 'light' | 'dark';
  badge?: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  linkText: string;
  bgGradient: string;
  active: boolean;
}

export interface FitGuideItem {
  name: DenimFit;
  gender: 'Men' | 'Women' | 'All';
  description: string;
  waistRise: string;
  thighFit: string;
  legOpening: string;
  stretchLevel: string;
  recommendedFor: string;
  imageUrl: string;
  modelCode: string;
}

export interface BrandConfig {
  brandName: string;
  brandTagline: string;
  brandEstYear: string;
  logoType: 'freakins-bold' | 'red-tab' | 'minimal-modern' | 'vintage-patch' | 'denim-selvedge' | 'custom-text';
  logoText: string;
  tabLabel: string; // e.g. "FREAK" or "LEVI'S" or custom brand tab text
  primaryColor: string; // e.g. #111111 or #E11D48
  accentColor: string; // e.g. #CCFF00 or #111111
  currencySymbol: string; // "₹", "$", "€", "£"
  currencyCode: string; // "INR", "USD", "EUR", "GBP"
  topTickerMessages: string[];
  freeShippingThreshold: number;
  contactEmail: string;
  contactPhone: string;
  storeLocationText: string;
  heroSlides: HeroSlide[];
  storiesHeadline: string;
  storiesSubtitle: string;
  sustainableHeadline: string;
  sustainableText: string;
  bannerCtaTitle: string;
  bannerCtaSubtitle: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface FilterState {
  gender: Gender;
  category: string;
  fit: string;
  wash: string;
  rise: string;
  stretch: string;
  size: string;
  priceRange: [number, number];
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  searchQuery: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface OrderItemSummary {
  productId: string;
  productName: string;
  size: string;
  colorName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface UserOrder {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItemSummary[];
  total: number;
  discount: number;
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  shippingAddress: ShippingAddress;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  gender?: 'Men' | 'Women' | 'Unisex' | 'Prefer not to say';
  avatar?: string;
  joinedDate: string;
  tier: 'SILVER ARCHIVIST' | 'GOLD SELVEDGE' | 'DENIM VIP ICON';
  points: number;
  favoriteFit?: DenimFit;
  defaultWaistSize?: string;
  savedAddresses: ShippingAddress[];
  orders: UserOrder[];
}
