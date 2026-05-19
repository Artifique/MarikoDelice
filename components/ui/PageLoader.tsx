"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteStore } from "@/store/useSiteStore";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const { general } = useSiteStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-white flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-chocolat">
                {general.name}
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-1 bg-gold mt-4 origin-left rounded-full"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 text-chocolat/40 font-medium tracking-[0.3em] uppercase text-xs"
            >
              Préparation de vos délices...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
