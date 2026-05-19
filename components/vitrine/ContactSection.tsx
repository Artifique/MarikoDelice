"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSiteStore } from "@/store/useSiteStore";
import { MessageCircle, Send, Phone, Mail, MapPin } from "lucide-react";

export function ContactSection() {
  const { general } = useSiteStore();

  return (
    <section id="contact" className="py-24 px-6 bg-chocolat relative overflow-hidden">
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-poudré/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* TEXT CONTENT */}
          <div className="flex-1 text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-4 block"
            >
              Contactez-nous
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
            >
              Une envie particulière ? <br /> Parlons-en ensemble.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-beige-light/70 text-lg mb-12 max-w-xl mx-auto lg:mx-0 font-light"
            >
              Qu'il s'agisse d'une commande sur mesure, d'un événement spécial ou d'une simple question, notre équipe est à votre écoute.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-start gap-4 text-white/80">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold border border-white/10 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gold font-bold mb-1">Téléphone</div>
                  <div className="font-medium">{general.contact.phone}</div>
                </div>
              </div>
              <div className="flex items-start gap-4 text-white/80">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold border border-white/10 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gold font-bold mb-1">Email</div>
                  <div className="font-medium">{general.contact.email}</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-md"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] shadow-2xl">
              <h3 className="font-playfair text-2xl font-bold text-white mb-6 text-center">Écrivez-nous</h3>
              
              <div className="space-y-6">
                <motion.a
                  href={`https://wa.me/${general.socials.whatsapp}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-full font-bold shadow-lg hover:shadow-[#25D366]/20 transition-all"
                >
                  <MessageCircle size={22} />
                  WhatsApp
                </motion.a>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase tracking-widest">
                    <span className="bg-transparent px-4 text-white/30">Ou par email</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-gold text-white rounded-full font-bold shimmer-effect overflow-hidden"
                >
                  <Send size={18} />
                  Formulaire de contact
                </motion.button>
              </div>
              
              <p className="mt-8 text-center text-xs text-white/40 leading-relaxed">
                Nous répondons généralement en moins de 24h.<br />
                Horaires de réponse : {general.contact.hours}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
