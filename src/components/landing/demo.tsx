"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, ChefHat, BarChart2, CheckCircle2, Clock, DollarSign, TrendingUp, ShoppingBag, Bell } from "lucide-react";

export function DemoSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[500px] bg-muted animate-pulse flex items-center justify-center rounded-2xl">
        <span className="text-muted-foreground">Cargando demo interactiva...</span>
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
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Mira la magia en acción
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Así es como Auto-Restro transforma tu restaurante en una máquina eficiente de ventas.
          </p>
        </motion.div>

        <Tabs defaultValue="pedidos" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 max-w-2xl mx-auto h-auto p-1 bg-muted/50 rounded-2xl border border-border/50 backdrop-blur-sm">
            <TabsTrigger value="pedidos" className="flex items-center gap-2 py-4 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all">
              <Smartphone className="w-5 h-5 text-purple" />
              <span className="font-bold">Pedidos</span>
            </TabsTrigger>
            <TabsTrigger value="cocina" className="flex items-center gap-2 py-4 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all">
              <ChefHat className="w-5 h-5 text-golden" />
              <span className="font-bold">Cocina</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 py-4 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all">
              <BarChart2 className="w-5 h-5 text-purple" />
              <span className="font-bold">Analytics</span>
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
            <div className="relative rounded-[2rem] border-[10px] border-charcoal bg-charcoal shadow-2xl shadow-primary/20 overflow-hidden">
                
                <TabsContent value="pedidos" className="mt-0 p-0">
                  <div className="min-h-[400px] md:min-h-[500px]">
                    <PedidosShowcase />
                  </div>
                </TabsContent>
                
                <TabsContent value="cocina" className="mt-0 p-0">
                  <div className="min-h-[400px] md:min-h-[500px]">
                    <CocinaShowcase />
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics" className="mt-0 p-0">
                  <div className="min-h-[400px] md:min-h-[500px]">
                    <AnalyticsShowcase />
                  </div>
                </TabsContent>

            </div>
            
            {/* Stand effect */}
            <div className="h-5 w-1/3 bg-charcoal/80 rounded-b-2xl mx-auto" />
            <div className="h-1 w-1/5 bg-charcoal/30 rounded-full mx-auto mt-2" />
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

function PedidosShowcase() {
  return (
    <div className="w-full flex bg-slate-50 dark:bg-slate-950 p-4 md:p-8 items-center justify-center gap-8">
       {/* Phone Mockup */}
       <div className="w-[240px] h-[400px] bg-charcoal rounded-[3rem] border-[8px] border-charcoal shadow-2xl overflow-hidden relative hidden md:block flex-shrink-0">
         <div className="h-full w-full bg-white flex flex-col p-4">
           <div className="flex justify-between items-center mb-6">
             <div className="w-10 h-10 rounded-full bg-purple/10 flex items-center justify-center">
               <ShoppingBag className="w-5 h-5 text-purple" />
             </div>
             <div className="w-20 h-3 bg-slate-100 rounded-full" />
           </div>
           
           <div className="space-y-4">
             <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center text-4xl">🍕</div>
             <div className="space-y-2">
               <div className="h-4 w-3/4 bg-slate-200 rounded-full" />
               <div className="h-3 w-1/2 bg-slate-100 rounded-full" />
             </div>
             <div className="h-10 w-full bg-purple rounded-xl mt-4 flex items-center justify-center text-white font-bold text-sm">
               Agregar al pedido
             </div>
           </div>
         </div>
         {/* Order animation overlay */}
         <motion.div 
           initial={{ y: 100, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
           className="absolute bottom-10 left-4 right-4 bg-golden p-3 rounded-xl shadow-xl flex items-center gap-3"
         >
           <CheckCircle2 className="w-5 h-5 text-charcoal" />
           <span className="text-xs font-bold text-charcoal tracking-tight">¡Pedido enviado!</span>
         </motion.div>
       </div>

       {/* Experience details */}
       <div className="max-w-md space-y-6">
         <div className="p-6 bg-white dark:bg-charcoal rounded-3xl shadow-xl border border-border/50">
            <h4 className="text-2xl font-bold mb-4 text-purple">Experiencia Digital</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium">Menú digital interactivo vía QR</span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium">Pagos directos desde la mesa</span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium">Sin descargar apps</span>
              </li>
            </ul>
         </div>
       </div>
    </div>
  );
}

function CocinaShowcase() {
  return (
    <div className="w-full flex bg-zinc-900 p-4 md:p-8 flex-col">
       <div className="flex justify-between items-center mb-6 text-white border-b border-zinc-800 pb-4">
         <div className="flex items-center gap-3">
           <ChefHat className="w-6 h-6 text-golden" />
           <span className="text-xl font-bold font-heading">KITCHEN DISPLAY SYSTEM</span>
         </div>
         <div className="text-xs font-mono bg-zinc-800 px-3 py-1 rounded-full text-zinc-400">
           ESTADO: ACTIVO
         </div>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
          {[
            { id: "102", time: "05:12", items: ["2x Pizza Pepperoni", "1x Coca-Cola"], color: "border-red-500/50" },
            { id: "103", time: "02:45", items: ["1x Hamburguesa XL", "1x Papas Fritas"], color: "border-golden/50" },
            { id: "104", time: "00:30", items: ["1x Ensalada Cesar"], color: "border-blue-500/50" }
          ].map((order, i) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className={`bg-zinc-800 rounded-2xl p-4 border-l-4 ${order.color} flex flex-col`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-zinc-500 text-[10px] font-bold">ORDEN #{order.id}</span>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Clock className="w-3 h-3" />
                  <span className="text-[10px] font-mono">{order.time}</span>
                </div>
              </div>
              <div className="flex-1 space-y-2 mb-4">
                {order.items.map((item, j) => (
                  <div key={j} className="text-white text-sm font-bold border-b border-zinc-700 pb-1">
                    {item}
                  </div>
                ))}
              </div>
              <button className="w-full py-2 bg-zinc-700 hover:bg-golden hover:text-charcoal text-white rounded-lg text-xs font-black uppercase transition-colors">
                Marcar Listo
              </button>
            </motion.div>
          ))}
       </div>
    </div>
  );
}

function AnalyticsShowcase() {
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
       <div className="flex items-center gap-4 mb-8">
         <div className="w-12 h-12 rounded-2xl bg-purple/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-purple" />
         </div>
         <div>
            <h4 className="text-xl font-bold dark:text-white">Panel de Control</h4>
            <p className="text-sm text-slate-500">Métricas en tiempo real</p>
         </div>
       </div>

       <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Ventas Hoy", val: "$450.200", icon: DollarSign, color: "text-green-600" },
            { label: "Pedidos", val: "86", icon: ShoppingBag, color: "text-blue-600" },
            { label: "Tiempo Prom.", val: "14 min", icon: Clock, color: "text-purple-600" },
            { label: "Nuevas Alertas", val: "3", icon: Bell, color: "text-amber-600" }
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-charcoal p-4 rounded-2xl shadow-sm border border-border/50">
               <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{stat.label}</span>
                 <stat.icon className={`w-4 h-4 ${stat.color}`} />
               </div>
               <div className="text-xl font-black dark:text-white">{stat.val}</div>
            </div>
          ))}
       </div>

       <div className="bg-white dark:bg-charcoal rounded-3xl p-6 border border-border/50 shadow-sm flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="h-4 w-40 bg-slate-100 rounded-full" />
            <div className="h-8 w-24 bg-slate-50 rounded-lg" />
          </div>
          <div className="space-y-4">
             <div className="flex items-end gap-2 h-32 px-4">
                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="flex-1 bg-purple/20 rounded-t-lg relative group"
                  >
                    <div className="absolute inset-0 bg-purple opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
                  </motion.div>
                ))}
             </div>
             <div className="flex justify-between px-2">
               {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(d => (
                 <span key={d} className="text-[10px] font-bold text-slate-400">{d}</span>
               ))}
             </div>
          </div>
       </div>
    </div>
  );
}
