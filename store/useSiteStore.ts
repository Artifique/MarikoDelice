import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SiteConfig, Product, GalleryImage, Testimonial } from "../types";

interface SiteState extends SiteConfig {
  setGeneral: (general: SiteConfig["general"]) => void;
  setAppearance: (appearance: SiteConfig["appearance"]) => void;
  setHero: (hero: SiteConfig["hero"]) => void;
  setHistory: (history: SiteConfig["history"]) => void;
  
  // Produits
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  reorderProducts: (products: Product[]) => void;

  // Galerie
  addGalleryImage: (image: GalleryImage) => void;
  deleteGalleryImage: (id: string) => void;
  reorderGallery: (images: GalleryImage[]) => void;

  // Témoignages
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
}

const initialState: SiteConfig = {
  general: {
    name: "Mariko Délice",
    slogan: "Pâtisserie Artisanale & Créations Gourmandes",
    logo: "/images/logo.png",
    contact: {
      phone: "+33 1 23 45 67 89",
      email: "contact@marikodelice.fr",
      address: "123 Rue de la Gourmandise, 75000 Paris",
      hours: "Lun - Sam: 8h - 19h | Dim: 8h - 13h",
    },
    socials: {
      instagram: "marikodelice",
      facebook: "marikodelice",
      whatsapp: "33123456789",
    },
  },
  appearance: {
    primaryColor: "#3D1C08",
    secondaryColor: "#E8C4B8",
    backgroundColor: "#F5EFE6",
    fontTitle: "Playfair Display",
    fontBody: "DM Sans",
    darkMode: false,
  },
  hero: {
    title: "L'art de la pâtisserie, réinventé pour vous",
    subtitle: "Découvrez nos créations uniques faites avec amour et des ingrédients d'exception.",
    ctaText: "Découvrir la carte",
    mediaUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1920&auto=format&fit=crop",
    mediaType: "image",
    showBadge: true,
    badgeText: "Fait maison chaque jour 🍰",
  },
  history: {
    title: "Notre Histoire",
    content: "Depuis plus de 15 ans, Mariko Délice s'efforce de porter l'art de la pâtisserie à son sommet. Chaque gâteau est une œuvre d'art, chaque macaron une promesse de voyage.",
    imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=800&auto=format&fit=crop",
    stats: [
      { label: "Années d'expérience", value: "15" },
      { label: "Recettes uniques", value: "200+" },
      { label: "Clients heureux", value: "10k+" },
    ],
  },
  products: [
    {
      id: "1",
      name: "Macarons Signature",
      description: "Un assortiment de nos 12 meilleurs macarons artisanaux.",
      price: 24,
      category: "Macarons",
      image: "https://images.unsplash.com/photo-1569864358642-9d161970225b?q=80&w=400&auto=format&fit=crop",
      badge: "Bestseller",
      order: 0,
    },
    {
      id: "2",
      name: "Tarte Framboise",
      description: "Pâte sablée croustillante et framboises fraîches du jardin.",
      price: 38,
      category: "Tartes",
      image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=400&auto=format&fit=crop",
      badge: "Nouveau",
      order: 1,
    },
    {
      id: "3",
      name: "Éclairs Chocolat",
      description: "Pâte à chou onctueuse avec un glaçage miroir chocolat noir 70%.",
      price: 6,
      category: "Viennoiseries",
      image: "https://images.unsplash.com/photo-1571115177098-24ec42093de9?q=80&w=400&auto=format&fit=crop",
      order: 2,
    },
    {
      id: "4",
      name: "Gâteau Opéra",
      description: "L'élégance à la française : biscuit joconde imbibé de café et crème au beurre.",
      price: 45,
      category: "Gâteaux",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop",
      badge: "Bestseller",
      order: 3,
    },
  ],
  gallery: [
    { id: "1", url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800", category: "Boutique", order: 0 },
    { id: "2", url: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=800", category: "Atelier", order: 1 },
    { id: "3", url: "https://images.unsplash.com/photo-1569864358642-9d161970225b?q=80&w=800", category: "Produits", order: 2 },
    { id: "4", url: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=800", category: "Produits", order: 3 },
    { id: "5", url: "https://images.unsplash.com/photo-1571115177098-24ec42093de9?q=80&w=800", category: "Atelier", order: 4 },
    { id: "6", url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800", category: "Boutique", order: 5 },
  ],
  testimonials: [
    {
      id: "1",
      name: "Sophie Laurent",
      text: "Les meilleurs macarons que j'ai jamais goûtés ! Une texture parfaite et des parfums subtils qui changent au fil des saisons.",
      rating: 5,
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    },
    {
      id: "2",
      name: "Marc Durand",
      text: "Une expérience inoubliable pour mon gâteau de mariage. Non seulement il était magnifique, mais il était aussi délicieux.",
      rating: 5,
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    },
    {
      id: "3",
      name: "Emma Petit",
      text: "Le détour par Mariko Délice est devenu mon rituel du samedi matin. Leurs viennoiseries sont tout simplement divines.",
      rating: 5,
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    },
  ],
};

export const useSiteStore = create<SiteState>()(
  persist(
    (set) => ({
      ...initialState,
      setGeneral: (general) => set({ general }),
      setAppearance: (appearance) => set({ appearance }),
      setHero: (hero) => set({ hero }),
      setHistory: (history) => set({ history }),
      
      addProduct: (product) => 
        set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      reorderProducts: (products) => set({ products }),

      addGalleryImage: (image) =>
        set((state) => ({ gallery: [...state.gallery, image] })),
      deleteGalleryImage: (id) =>
        set((state) => ({
          gallery: state.gallery.filter((i) => i.id !== id),
        })),
      reorderGallery: (gallery) => set({ gallery }),

      addTestimonial: (testimonial) =>
        set((state) => ({ testimonials: [...state.testimonials, testimonial] })),
      updateTestimonial: (id, updatedTestimonial) =>
        set((state) => ({
          testimonials: state.testimonials.map((t) => (t.id === id ? { ...t, ...updatedTestimonial } : t)),
        })),
      deleteTestimonial: (id) =>
        set((state) => ({
          testimonials: state.testimonials.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "mariko-delice-store",
    }
  )
);
