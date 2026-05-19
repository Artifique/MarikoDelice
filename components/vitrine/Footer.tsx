"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSiteStore } from "@/store/useSiteStore";
import { Instagram, Facebook, Phone, Mail, MapPin, Heart } from "lucide-react";

export function Footer() {
  const { general } = useSiteStore();

  const socialIcons = {
    instagram: Instagram,
    facebook: Facebook,
  };

  return (
    <footer className="bg-white pt-24 pb-12 px-6 border-t border-beige">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* BRAND & LOGO */}
          <div className="space-y-6">
            <h2 className="font-playfair text-3xl font-bold text-chocolat">
              {general.name}
            </h2>
            <p className="text-chocolat/60 leading-relaxed font-light">
              {general.slogan}
            </p>
            <div className="flex gap-4">
              {Object.entries(general.socials).map(([platform, handle]) => {
                if (platform === "whatsapp") return null;
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                return handle ? (
                  <motion.a
                    key={platform}
                    href={`https://${platform}.com/${handle}`}
                    whileHover={{ scale: 1.1, color: "#C9A84C" }}
                    className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-chocolat transition-colors"
                  >
                    <Icon size={18} />
                  </motion.a>
                ) : null;
              })}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-playfair text-xl font-bold text-chocolat mb-6">Navigation</h4>
            <ul className="space-y-4">
              {["Accueil", "Notre carte", "Notre histoire", "Galerie", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-chocolat/60 hover:text-gold transition-colors font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h4 className="font-playfair text-xl font-bold text-chocolat mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-chocolat/60">
                <MapPin size={18} className="text-gold shrink-0 mt-1" />
                <span>{general.contact.address}</span>
              </li>
              <li className="flex items-center gap-3 text-chocolat/60">
                <Phone size={18} className="text-gold shrink-0" />
                <span>{general.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-chocolat/60">
                <Mail size={18} className="text-gold shrink-0" />
                <span>{general.contact.email}</span>
              </li>
            </ul>
          </div>

          {/* HOURS */}
          <div>
            <h4 className="font-playfair text-xl font-bold text-chocolat mb-6">Horaires</h4>
            <div className="p-6 bg-beige rounded-3xl">
              <p className="text-chocolat/70 text-sm leading-relaxed whitespace-pre-line">
                {general.contact.hours}
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-beige flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-chocolat/40">
          <p>© {new Date().getFullYear()} {general.name}. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Fait avec <Heart size={14} className="text-rose-poudré fill-rose-poudré" /> pour les gourmands.
          </p>
        </div>
      </div>
    </footer>
  );
}
