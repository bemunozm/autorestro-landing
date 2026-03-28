"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Smartphone, ChefHat, BarChart2 } from "lucide-react";
import { OrdersComposition } from "@/components/remotion/orders-comp";
import { KitchenComposition } from "@/components/remotion/kitchen-comp";
import { AnalyticsComposition } from "@/components/remotion/analytics-comp";

const Player = dynamic(() => import("@remotion/player").then((mod) => mod.Player), {
  ssr: false,
});

export function DemoSection() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[500px] bg-muted animate-pulse flex items-center justify-center rounded-2xl">
        <span className="text-muted-foreground">Cargando demo interactiva...</span>
      </div>
    );
  }

  const playerConfig = {
    durationInFrames: 120,
    fps: 30,
    compositionWidth: isMobile ? 1080 : 1920,
    compositionHeight: isMobile ? 1920 : 1080,
    inputProps: {},
    loop: true,
    autoPlay: true,
    controls: false,
    className: "rounded-xl overflow-hidden shadow-2xl",
    style: {
      width: "100%",
      aspectRatio: isMobile ? "9/16" : "16/9",
    },
  };

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Subtle glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Mira la magia en acción
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Así es como Auto-Restro transforma tu restaurante en una máquina eficiente de ventas.
          </p>
        </motion.div>

        <Tabs defaultValue="pedidos" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 max-w-2xl mx-auto h-auto p-1 bg-muted/50 rounded-2xl border border-border/50">
            <TabsTrigger value="pedidos" className="flex items-center gap-2 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Smartphone className="w-4 h-4" />
              <span className="hidden md:inline">Pedidos</span>
            </TabsTrigger>
            <TabsTrigger value="cocina" className="flex items-center gap-2 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <ChefHat className="w-4 h-4" />
              <span className="hidden md:inline">Cocina</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BarChart2 className="w-4 h-4" />
              <span className="hidden md:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Laptop Mockup Wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto max-w-4xl"
          >
            {/* Laptop border */}
            <div className="relative rounded-2xl border-8 border-charcoal/80 bg-charcoal p-1 shadow-2xl shadow-primary/10 aspect-video overflow-hidden">
              <TabsContent value="pedidos" className="mt-0 h-full">
                <Player component={OrdersComposition} {...playerConfig} />
              </TabsContent>
              <TabsContent value="cocina" className="mt-0 h-full">
                <Player component={KitchenComposition} {...playerConfig} />
              </TabsContent>
              <TabsContent value="analytics" className="mt-0 h-full">
                <Player component={AnalyticsComposition} {...playerConfig} />
              </TabsContent>
            </div>
            
            {/* Laptop hinge/bottom part effect */}
            <div className="h-4 w-full bg-charcoal/90 rounded-b-3xl mt-[-4px] border-x-8 border-b-8 border-charcoal/80" />
            <div className="h-1 w-1/4 bg-charcoal/40 rounded-full mx-auto mt-2" />
          </motion.div>
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <p className="text-lg font-sans mb-8">¿Listo para modernizar tu negocio?</p>
          <a
            href="https://wa.me/56900000000?text=Hola,%20quiero%20una%20demo%20de%20Auto-Restro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/20"
          >
            Agenda una demo personalizada
          </a>
        </motion.div>
      </div>
    </section>
  );
}
