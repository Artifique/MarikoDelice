"use client";

import React from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-white dark:bg-chocolat/20 rounded-3xl overflow-hidden shadow-warm border border-beige/50 hover:border-gold/30 transition-all duration-500"
    >
      {/* BADGE */}
      {product.badge && (
        <div className={cn(
          "absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm",
          product.badge === "Nouveau" ? "bg-gold text-white" : "bg-rose-poudré text-chocolat"
        )}>
          {product.badge}
        </div>
      )}

      {/* IMAGE CONTAINER */}
      <div className="relative aspect-square overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* HOVER OVERLAY */}
        <div className="absolute inset-0 bg-chocolat/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-white text-chocolat rounded-full flex items-center justify-center shadow-lg"
          >
            <Plus size={24} />
          </motion.button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-playfair text-xl font-bold text-chocolat dark:text-beige-light group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          <span className="font-dmsans font-semibold text-gold">
            {product.price}€
          </span>
        </div>
        <p className="text-sm text-chocolat/60 dark:text-beige-light/60 line-clamp-2 font-light">
          {product.description}
        </p>
      </div>
    </motion.div>
  );
}
