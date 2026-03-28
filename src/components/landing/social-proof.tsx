"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const brands = [
  "Resto 1",
  "Resto 2",
  "Resto 3",
  "Resto 4",
  "Resto 5",
  "Resto 6",
];

export function SocialProof() {
  return (
    <section className="bg-muted/50 py-12 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-golden-accent text-golden-accent" />
              ))}
            </div>
            <span className="text-sm font-bold tracking-tight">
              4.9/5 <span className="text-muted-foreground font-normal">de rating en Iquique</span>
            </span>
          </div>

          <div className="flex flex-col items-center gap-6 w-full">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground text-center">
              Confiado por restaurantes en Iquique
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 grayscale opacity-50 dark:invert dark:opacity-40">
              {brands.map((brand, i) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-center h-10 px-4 border-2 border-transparent hover:border-border transition-all cursor-default"
                >
                  <span className="text-xl font-heading font-black tracking-tighter uppercase italic">
                    {brand}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
