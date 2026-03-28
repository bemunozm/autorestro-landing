"use client";

import { Star, UtensilsCrossed, ChefHat, Coffee, Pizza, Wine, Soup } from "lucide-react";
import { motion } from "framer-motion";

const brands = [
  { name: "La Picada", icon: UtensilsCrossed },
  { name: "Don Gourmet", icon: ChefHat },
  { name: "Coffee Break", icon: Coffee },
  { name: "Pizza Nostra", icon: Pizza },
  { name: "Wine Bar", icon: Wine },
  { name: "Sopa & Más", icon: Soup },
];

export function SocialProof() {
  return (
    <section className="bg-muted/50 py-12 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
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
                  key={brand.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center justify-center gap-2 px-4 hover:opacity-100 transition-all cursor-default group"
                >
                  <brand.icon className="w-8 h-8 mb-1 transition-transform group-hover:scale-110" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {brand.name}
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
