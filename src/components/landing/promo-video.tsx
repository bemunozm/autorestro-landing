"use client";

import { motion } from "framer-motion";

// Placeholder component for Remotion
export function PromoVideo() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 py-24"
    >
      <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border-8 border-charcoal bg-near-black shadow-2xl aspect-video flex items-center justify-center">
        {/* Remotion Player will go here in Sprint 2 */}
        <div className="text-center">
          <p className="text-off-white font-heading text-2xl font-bold mb-4">
            Video Promo: Auto-Restro en Acción
          </p>
          <p className="text-muted-text text-sm uppercase tracking-widest font-bold">
            Configuración @remotion/player preparada para Sprint 2
          </p>
        </div>
      </div>
    </motion.section>
  );
}
