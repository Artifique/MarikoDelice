"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSiteStore } from "@/store/useSiteStore";
import useEmblaCarousel from "embla-carousel-react";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const { testimonials } = useSiteStore();
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" });

  return (
    <section id="temoignages" className="py-24 px-6 bg-rose-poudré/20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-4 block"
          >
            Leurs Expériences
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl md:text-5xl font-bold text-chocolat"
          >
            Ce que disent nos clients
          </motion.h2>
        </div>

        {/* CAROUSEL */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {testimonials.map((t, i) => (
              <div key={t.id} className="embla__slide flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-chocolat/40 p-10 rounded-[2.5rem] shadow-warm relative h-full flex flex-col items-center text-center"
                >
                  <Quote className="absolute top-6 right-8 text-rose-poudré/50" size={48} />
                  
                  {/* RATING */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-gold text-gold" />
                    ))}
                  </div>

                  {/* TEXT */}
                  <p className="text-chocolat/80 dark:text-beige-light/80 italic mb-8 flex-grow leading-relaxed">
                    "{t.text}"
                  </p>

                  {/* CUSTOMER */}
                  <div className="flex flex-col items-center">
                    {t.photo ? (
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-gold/20 p-1">
                        <img src={t.photo} alt={t.name} className="w-full h-full object-cover rounded-full" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-beige-light flex items-center justify-center mb-3 text-gold font-bold text-xl">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <h4 className="font-playfair font-bold text-chocolat dark:text-beige-light text-lg">
                      {t.name}
                    </h4>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
