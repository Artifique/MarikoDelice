"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useSiteStore } from "@/store/useSiteStore";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Accueil", href: "#" },
  { name: "Notre carte", href: "#produits" },
  { name: "Notre histoire", href: "#histoire" },
  { name: "Galerie", href: "#galerie" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { general } = useSiteStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12",
        isScrolled 
          ? "py-4 glass-card shadow-warm mt-4 mx-4 rounded-3xl" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2">
          <motion.span 
            className="font-playfair text-2xl font-bold tracking-tight text-chocolat dark:text-beige-light"
            whileHover={{ scale: 1.05 }}
          >
            {general.name}
          </motion.span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium uppercase tracking-wider text-chocolat/80 dark:text-beige-light/80 hover:text-gold transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-6 py-2.5 rounded-full bg-gold text-white font-semibold text-sm shimmer-effect overflow-hidden flex items-center gap-2"
          >
            <ShoppingBag size={18} />
            Commander
          </motion.button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden text-chocolat dark:text-beige-light"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE NAV MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-2 p-6 glass-card rounded-3xl md:hidden flex flex-col gap-4 items-center shadow-warm"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-playfair font-medium text-chocolat dark:text-beige-light"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button className="w-full py-3 rounded-full bg-gold text-white font-semibold flex items-center justify-center gap-2">
              <ShoppingBag size={20} />
              Commander
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
