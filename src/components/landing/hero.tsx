"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const trustSignals = [
  "Sin permanencia",
  "Implementación en 1 día",
  "Soporte en español",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="font-heading text-5xl font-extrabold leading-[1.1] text-foreground sm:text-6xl lg:text-7xl mb-6 max-w-[10ch]"
            >
              Controla tu restaurante desde el <span className="text-primary">celular</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground sm:text-xl mb-10 max-w-[32ch]"
            >
              Gestiona pedidos QR, coordina tu cocina en tiempo real y recibe pagos Transbank sin complicaciones. Moderniza tu local hoy mismo con tecnología diseñada para dueños reales.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link 
                href="https://wa.me/56XXXXXXXXX"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-14 px-8 text-lg font-bold bg-golden-accent text-charcoal hover:bg-golden-accent/90 border-b-4 border-charcoal/20 active:border-b-0 active:translate-y-[2px] transition-all"
                )}
              >
                Habla con nosotros
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center gap-2 text-lg font-bold text-foreground hover:gap-3 transition-all h-14"
              >
                Ver demo <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-y-3 gap-x-6"
            >
              {trustSignals.map((signal) => (
                <div key={signal} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {signal}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] w-full max-w-[600px] mx-auto overflow-hidden rounded-2xl border-8 border-charcoal bg-muted shadow-2xl">
              {/* Mockup content - Placeholder for now */}
              <div className="absolute inset-0 bg-off-white flex flex-col p-4 dark:bg-near-black">
                <div className="h-8 w-1/3 bg-muted rounded mb-4" />
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="h-20 bg-primary/20 rounded" />
                  <div className="h-20 bg-golden-accent/20 rounded" />
                  <div className="h-20 bg-muted rounded" />
                </div>
                <div className="flex-1 bg-muted rounded" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
            </div>
            {/* Memorable element: A small floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-primary text-white p-4 rounded-full shadow-xl hidden sm:block"
            >
              <div className="text-center">
                <span className="block text-2xl font-bold">100%</span>
                <span className="text-[10px] uppercase font-bold">Cloud</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
