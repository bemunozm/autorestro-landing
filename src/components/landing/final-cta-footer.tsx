"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Calendar, ShieldCheck, Zap, CreditCard, Share2, Globe, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WhatsAppDialog } from "./whatsapp-dialog";

export function FinalCTASection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-purple/10 dark:from-near-black dark:to-purple/5 relative overflow-hidden border-t border-border/30">
      <div className="container mx-auto max-w-5xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-heading text-charcoal dark:text-off-white font-extrabold tracking-tight">
              ¿Listo para simplificar tu <span className="text-purple">restaurante?</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Únete a los restaurantes de Iquique que ya crecen con <span className="text-purple font-bold">Auto-Restro</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="w-full sm:w-auto h-16 px-10 text-xl font-bold rounded-2xl bg-[#D4A017] hover:bg-[#D4A017]/90 text-charcoal shadow-2xl shadow-golden/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 border-none"
            >
              <MessageCircle size={24} className="fill-charcoal" />
              Empieza ahora
            </Button>
            <Button
              variant="link"
              className="text-lg font-bold text-muted-foreground hover:text-purple h-12 flex items-center gap-2 group transition-colors"
            >
              <Calendar size={20} className="group-hover:animate-bounce" />
              Agendar demo
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-12">
            {[
              { icon: ShieldCheck, text: "Sin tarjeta" },
              { icon: Zap, text: "Setup en 1 día" },
              { icon: CreditCard, text: "Sin permanencia" },
            ].map((trust, i) => (
              <Badge key={i} variant="outline" className="px-5 py-2.5 rounded-full border-purple/20 bg-white/50 dark:bg-near-black/50 text-muted-foreground text-sm font-bold flex items-center gap-2 shadow-sm">
                <trust.icon size={16} className="text-purple" />
                {trust.text}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative background effects */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple/20 to-transparent" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-golden/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple/20 rounded-full blur-[120px] -z-10" />

      <WhatsAppDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        source="cta_final"
      />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-20 px-4 bg-charcoal dark:bg-near-black text-off-white border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white flex items-center justify-center shadow-lg shadow-purple/30">
                <Image 
                  src="/auto-restro.png" 
                  alt="Auto-Restro Logo" 
                  width={32} 
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-heading font-extrabold tracking-tighter">Auto-Restro</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              El sistema de gestión definitiva para restaurantes modernos. Un producto de <span className="text-off-white font-bold">EVONOVA</span>.
            </p>
            <div className="flex gap-4">
              {[Share2, Globe, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple/20 hover:text-purple transition-all border border-white/10">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-heading font-bold text-off-white">Plataforma</h4>
            <ul className="space-y-4 text-muted-foreground text-sm font-medium">
              <li><a href="#features" className="hover:text-purple transition-colors">Características</a></li>
              <li><a href="#precios" className="hover:text-purple transition-colors">Precios</a></li>
              <li><a href="#demo" className="hover:text-purple transition-colors">Demo</a></li>
              <li><a href="#testimonios" className="hover:text-purple transition-colors">Testimonios</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-heading font-bold text-off-white">Compañía</h4>
            <ul className="space-y-4 text-muted-foreground text-sm font-medium">
              <li><a href="#" className="hover:text-purple transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-purple transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-purple transition-colors">Privacidad</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-heading font-bold text-off-white">Contacto</h4>
            <ul className="space-y-4 text-muted-foreground text-sm font-medium">
              <li className="flex flex-col gap-1">
                <span className="text-off-white font-bold text-base">+56 9 1234 5678</span>
                <span className="text-xs uppercase tracking-widest text-purple font-bold">WhatsApp Directo</span>
              </li>
              <li className="flex flex-col gap-1 pt-2">
                <span className="text-off-white">Iquique, Chile.</span>
                <span className="text-xs text-muted-foreground">© 2026 Auto-Restro.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
          <p>Potenciado por Evonova</p>
          <p>Hecho con ♥ en el norte de Chile</p>
        </div>
      </div>
    </footer>
  );
}
