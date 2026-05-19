"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSiteStore } from "@/store/useSiteStore";
import { ChevronDown, Sparkles } from "lucide-react";

export function Hero() {
  const { hero } = useSiteStore();

  // Animation variants pour le titre mot par mot
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  const words = hero.title.split(" ");

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* BACKGROUND MEDIA */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-chocolat/30 z-10" /> {/* Overlay sombre pour lisibilité */}
        {hero.mediaType === "image" ? (
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            src={hero.mediaUrl}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={hero.mediaUrl} type="video/mp4" />
          </video>
        )}
      </div>

      {/* CONTENT */}
      <div className="relative z-20 max-w-5xl px-6 text-center">
        {/* FLOATING BADGE */}
        {hero.showBadge && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Sparkles className="text-gold" size={16} />
            </motion.span>
            {hero.badgeText}
          </motion.div>
        )}

        {/* ANIMATED TITLE */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.3em]">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-lg md:text-xl text-beige-light/90 max-w-2xl mx-auto mb-10 font-light"
        >
          {hero.subtitle}
        </motion.p>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gold text-white rounded-full font-semibold text-lg shimmer-effect overflow-hidden shadow-warm"
          >
            {hero.ctaText}
          </motion.button>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-medium">Découvrir</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
