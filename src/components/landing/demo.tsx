"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Smartphone, ChefHat, BarChart2, UserCheck } from "lucide-react";
import { useTheme } from "next-themes";

// Dynamic import of Remotion Player to avoid SSR issues
const Player = dynamic(
  () => import("@remotion/player").then((mod) => mod.Player),
  { ssr: false }
);

// Compositions
import { PedidosComposition } from "../remotion/pedidos-comp";
import { CocinaComposition } from "../remotion/cocina-comp";
import { GarzonComposition } from "../remotion/garzon-comp";
import { AnalyticsComposition } from "../remotion/analytics-comp";

export function DemoSection() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const theme = resolvedTheme === "dark" ? "dark" : "light";
  
  // Dimensions based on aspect ratio
  const compWidth = isMobile ? 1080 : 1920;
  const compHeight = isMobile ? 1920 : 1080;

  if (!mounted) {
    return (
      <div className="w-full h-[600px] bg-muted animate-pulse flex items-center justify-center rounded-2xl">
        <span className="text-muted-foreground font-bold">Cargando demo interactiva...</span>
      </div>
    );
  }

  return (
    <section id="demo" className="py-24 px-6 bg-off-white dark:bg-near-black relative overflow-hidden">
      {/* Subtle glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-charcoal dark:text-white">
            Mira la magia en acción
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Así es como Auto-Restro transforma tu restaurante en una máquina eficiente de ventas.
          </p>
        </motion.div>

        <Tabs defaultValue="pedidos" className="w-full [&]:block">
          <TabsList className="grid w-full grid-cols-4 mb-12 max-w-3xl mx-auto h-auto p-1 bg-muted/50 rounded-2xl border border-border/50 backdrop-blur-sm">
            <TabsTrigger value="pedidos" className="flex items-center justify-center gap-2 py-4 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all">
              <Smartphone className="w-5 h-5 text-purple" />
              <span className="font-bold hidden md:inline">Pedidos</span>
            </TabsTrigger>
            <TabsTrigger value="cocina" className="flex items-center justify-center gap-2 py-4 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all">
              <ChefHat className="w-5 h-5 text-golden" />
              <span className="font-bold hidden md:inline">Cocina</span>
            </TabsTrigger>
            <TabsTrigger value="garzon" className="flex items-center justify-center gap-2 py-4 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all">
              <UserCheck className="w-5 h-5 text-purple" />
              <span className="font-bold hidden md:inline">Garzón</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center justify-center gap-2 py-4 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all">
              <BarChart2 className="w-5 h-5 text-purple" />
              <span className="font-bold hidden md:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto max-w-5xl"
          >
            {/* Display Mockup */}
            <div className="relative w-full aspect-[9/16] md:aspect-video rounded-[3rem] border-[12px] md:rounded-[2rem] md:border-[10px] border-charcoal bg-slate-50 dark:bg-zinc-900 shadow-2xl shadow-primary/20 overflow-hidden">
                
                <TabsContent value="pedidos" className="mt-0 p-0 w-full h-full block">
                  <Player
                    component={PedidosComposition}
                    inputProps={{ theme }}
                    durationInFrames={240}
                    fps={30}
                    compositionWidth={compWidth}
                    compositionHeight={compHeight}
                    loop
                    autoPlay
                    controls={false}
                    style={{ width: "100%", height: "100%" }}
                  />
                </TabsContent>
                
                <TabsContent value="cocina" className="mt-0 p-0 w-full h-full block">
                  <Player
                    component={CocinaComposition}
                    inputProps={{ theme }}
                    durationInFrames={300}
                    fps={30}
                    compositionWidth={compWidth}
                    compositionHeight={compHeight}
                    loop
                    autoPlay
                    controls={false}
                    style={{ width: "100%", height: "100%" }}
                  />
                </TabsContent>

                <TabsContent value="garzon" className="mt-0 p-0 w-full h-full block">
                  <Player
                    component={GarzonComposition}
                    inputProps={{ theme }}
                    durationInFrames={300}
                    fps={30}
                    compositionWidth={compWidth}
                    compositionHeight={compHeight}
                    loop
                    autoPlay
                    controls={false}
                    style={{ width: "100%", height: "100%" }}
                  />
                </TabsContent>
                
                <TabsContent value="analytics" className="mt-0 p-0 w-full h-full block">
                  <Player
                    component={AnalyticsComposition}
                    inputProps={{ theme }}
                    durationInFrames={240}
                    fps={30}
                    compositionWidth={compWidth}
                    compositionHeight={compHeight}
                    loop
                    autoPlay
                    controls={false}
                    style={{ width: "100%", height: "100%" }}
                  />
                </TabsContent>

            </div>
            
            {/* Stand effect */}
            <div className="hidden md:block">
              <div className="h-5 w-1/3 bg-charcoal/80 rounded-b-2xl mx-auto" />
              <div className="h-1 w-1/5 bg-charcoal/30 rounded-full mx-auto mt-2" />
            </div>
          </motion.div>
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <p className="text-lg font-sans mb-8 font-medium">¿Listo para modernizar tu negocio?</p>
          <a
            href="https://wa.me/56900000000?text=Hola,%20quiero%20una%20demo%20de%20Auto-Restro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-16 px-12 rounded-2xl bg-[#D4A017] text-charcoal font-black text-xl hover:bg-[#D4A017]/90 hover:scale-105 transition-all shadow-2xl shadow-golden/30"
          >
            Agenda una demo personalizada
          </a>
        </motion.div>
      </div>
    </section>
  );
}
