export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  badge?: "Nouveau" | "Bestseller";
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  photo?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  order: number;
}

export interface SiteConfig {
  general: {
    name: string;
    slogan: string;
    logo?: string;
    contact: {
      phone: string;
      email: string;
      address: string;
      hours: string;
    };
    socials: {
      instagram?: string;
      facebook?: string;
      whatsapp?: string;
    };
  };
  appearance: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    fontTitle: string;
    fontBody: string;
    darkMode: boolean;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    mediaUrl: string;
    mediaType: "image" | "video";
    showBadge: boolean;
    badgeText: string;
  };
  history: {
    title: string;
    content: string;
    imageUrl: string;
    stats: { label: string; value: string }[];
  };
  products: Product[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
}
