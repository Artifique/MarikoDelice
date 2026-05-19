"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteStore } from "@/store/useSiteStore";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

export function FeaturedProducts() {
  const { products } = useSiteStore();
  const [activeCategory, setActiveCategory] = useState("Tous");

  const categories = ["Tous", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = activeCategory === "Tous" 
    ? products 
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="produits" className="py-24 px-6 bg-beige/30">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-4 block"
          >
            Nos Douceurs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-chocolat mb-8"
          >
            Les Incontournables
          </motion.h2>

          {/* FILTERS */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                  activeCategory === cat
                    ? "bg-chocolat text-white border-chocolat shadow-md"
                    : "bg-white text-chocolat/60 border-beige hover:border-gold/50"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* VIEW ALL CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="px-10 py-4 border-2 border-chocolat text-chocolat rounded-full font-bold hover:bg-chocolat hover:text-white transition-all duration-300">
            Voir toute la carte
          </button>
        </motion.div>
      </div>
    </section>
  );
}
