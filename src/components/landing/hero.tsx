"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, MessageCircle, LayoutDashboard, Utensils, CreditCard } from "lucide-react";
import { WhatsAppDialog } from "./whatsapp-dialog";

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
  "Setup en 1 día",
  "Soporte 24/7",
];

export function Hero() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-white to-purple/5 dark:from-near-black dark:to-purple/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col text-left relative z-10"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple/10 text-purple text-xs font-bold uppercase tracking-widest border border-purple/20">
                🚀 Disponible en Iquique
              </span>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="font-heading text-5xl font-extrabold leading-[1.1] text-charcoal dark:text-off-white sm:text-6xl lg:text-7xl mb-6 max-w-[12ch] tracking-tight"
            >
              Controla tu restaurante desde el <span className="text-purple">celular</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground sm:text-xl mb-10 max-w-[35ch] leading-relaxed"
            >
              Gestiona pedidos QR, coordina tu cocina en tiempo real y recibe pagos Transbank. La tecnología que tu restaurante necesita, sin complicaciones.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button 
                onClick={() => setIsDialogOpen(true)}
                size="lg"
                className="h-16 px-10 text-xl font-bold bg-[#D4A017] text-charcoal hover:bg-[#D4A017]/90 rounded-2xl shadow-xl shadow-golden/20 transition-all active:scale-95 flex items-center gap-3 border-none"
              >
                <MessageCircle size={24} className="fill-charcoal" />
                Empieza ahora
              </Button>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center gap-2 text-lg font-bold text-charcoal dark:text-off-white hover:gap-3 transition-all h-16 px-6 group"
              >
                Ver demo <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-y-3 gap-x-8"
            >
              {trustSignals.map((signal) => (
                <div key={signal} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple" />
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    {signal}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:ml-auto"
          >
            <div className="relative aspect-[4/3] w-full max-w-[600px] mx-auto overflow-hidden rounded-[2.5rem] border-8 border-charcoal bg-muted shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 group">
              {/* Mockup content */}
              <div className="absolute inset-0 bg-off-white dark:bg-near-black flex flex-col">
                {/* Dashboard Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-border/50 bg-white/50 dark:bg-charcoal/50 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                      <Image 
                        src="/auto-restro.png" 
                        alt="Logo" 
                        width={24} 
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <div className="h-4 w-24 bg-muted rounded-full" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-purple/10 rounded-lg flex items-center justify-center">
                       <LayoutDashboard className="w-4 h-4 text-purple" />
                    </div>
                    <div className="h-8 w-8 bg-golden/10 rounded-lg flex items-center justify-center">
                       <div className="w-2 h-2 bg-golden rounded-full animate-ping" />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col gap-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-charcoal rounded-3xl shadow-sm border border-border/50 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Utensils className="w-3 h-3 text-purple" />
                        <div className="w-12 h-2 bg-muted rounded-full" />
                      </div>
                      <div className="text-2xl font-bold text-charcoal dark:text-off-white">$145.200</div>
                    </div>
                    <div className="bg-white dark:bg-charcoal rounded-3xl shadow-sm border border-border/50 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="w-3 h-3 text-golden" />
                        <div className="w-12 h-2 bg-muted rounded-full" />
                      </div>
                      <div className="text-2xl font-bold text-charcoal dark:text-off-white">24</div>
                    </div>
                  </div>

                  {/* Orders List */}
                  <div className="flex-1 bg-white dark:bg-charcoal rounded-3xl shadow-sm border border-border/50 p-6">
                     <div className="flex justify-between items-center mb-4">
                       <div className="h-3 w-32 bg-muted rounded-full" />
                       <div className="h-5 w-16 bg-purple/10 rounded-full" />
                     </div>
                     <div className="space-y-4">
                       {[
                         { icon: "🍕", status: "Cocina" },
                         { icon: "🍔", status: "Listo" },
                         { icon: "🥗", status: "Pendiente" }
                       ].map((item, i) => (
                         <div key={i} className="flex gap-4 items-center">
                           <div className="w-10 h-10 bg-muted/30 rounded-xl flex items-center justify-center text-xl">
                             {item.icon}
                           </div>
                           <div className="flex-1 space-y-2">
                             <div className="w-3/4 h-3 bg-muted rounded-full" />
                             <div className="w-1/2 h-2 bg-muted/50 rounded-full" />
                           </div>
                           <div className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                             item.status === "Cocina" ? "bg-amber-100 text-amber-700" :
                             item.status === "Listo" ? "bg-green-100 text-green-700" :
                             "bg-blue-100 text-blue-700"
                           }`}>
                             {item.status}
                           </div>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-purple/5 via-transparent to-golden/5 pointer-events-none" />
            </div>
            
            {/* Decorative background shapes */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple/20 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-golden/20 rounded-full blur-[100px] -z-10" />
          </motion.div>
        </div>
      </div>
      
      <WhatsAppDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        source="hero"
      />
    </section>
  );
}
