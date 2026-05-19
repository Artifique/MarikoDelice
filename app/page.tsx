"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/vitrine/Navbar";
import { Hero } from "@/components/vitrine/Hero";
import { FeaturedProducts } from "@/components/vitrine/FeaturedProducts";
import { GallerySection } from "@/components/vitrine/GallerySection";
import { TestimonialsSection } from "@/components/vitrine/TestimonialsSection";
import { ContactSection } from "@/components/vitrine/ContactSection";
import { Footer } from "@/components/vitrine/Footer";
import { UtensilsCrossed, Leaf, Truck, Star } from "lucide-react";
import { useSiteStore } from "@/store/useSiteStore";
import { useIsHydrated } from "@/lib/hooks";

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border-2 border-gold rounded-full pointer-events-none z-[9999] hidden lg:block"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
      }}
      transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.5 }}
    />
  );
}

function FeaturesStrip() {
  const features = [
    { icon: UtensilsCrossed, text: "Recettes artisanales" },
    { icon: Leaf, text: "Ingrédients locaux" },
    { icon: Star, text: "Commande sur mesure" },
    { icon: Truck, text: "Livraison domicile" },
  ];

  return (
    <div className="bg-chocolat py-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gold/10 text-gold border border-gold/20">
              <item.icon size={24} />
            </div>
            <span className="text-beige-light font-medium tracking-wide text-sm uppercase">
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HistorySection() {
  const { history } = useSiteStore();

  return (
    <section id="histoire" className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 text-left"
        >
          <span className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-4 block">
            Depuis 2009
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-chocolat mb-6">
            {history.title}
          </h2>
          <p className="text-lg text-chocolat/70 leading-relaxed mb-8 font-light">
            {history.content}
          </p>
          
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-beige">
            {history.stats.map((stat, i) => (
              <div key={i}>
                <div className="font-playfair text-3xl font-bold text-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-chocolat/50 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 relative"
        >
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-warm">
            <img
              src={history.imageUrl}
              alt="Notre Histoire"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-rose-poudré rounded-full -z-10 opacity-30" />
          <div className="absolute -top-6 -left-6 w-48 h-48 border-2 border-gold rounded-full -z-10 opacity-20" />
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen">
      <CustomCursor />
      <Navbar />
      <Hero />
      <FeaturesStrip />
      <FeaturedProducts />
      <HistorySection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
