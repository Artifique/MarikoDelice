"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteStore } from "@/store/useSiteStore";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { cn } from "@/lib/utils";

export function GallerySection() {
  const { gallery } = useSiteStore();
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [index, setIndex] = useState(-1);

  const categories = ["Tous", ...Array.from(new Set(gallery.map((img) => img.category)))];

  const filteredImages = activeCategory === "Tous" 
    ? gallery 
    : gallery.filter((img) => img.category === activeCategory);

  const slides = filteredImages.map((img) => ({ src: img.url }));

  return (
    <section id="galerie" className="py-24 px-6 bg-white dark:bg-chocolat/10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-4 block"
          >
            Instants Gourmands
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl md:text-5xl font-bold text-chocolat mb-8"
          >
            Galerie Photos
          </motion.h2>

          {/* FILTERS */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => ( cat &&
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                  activeCategory === cat
                    ? "bg-gold text-white border-gold"
                    : "bg-transparent text-chocolat/60 border-beige hover:border-gold/50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MASONRY GRID (CSS Columns for simplicity) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, i) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative group cursor-pointer overflow-hidden rounded-3xl"
                onClick={() => setIndex(i)}
              >
                <img
                  src={image.url}
                  alt={`Galerie ${i}`}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-chocolat/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-playfair text-xl border-b border-white pb-1">Voir l'image</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Lightbox
          index={index}
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={slides}
        />
      </div>
    </section>
  );
}
