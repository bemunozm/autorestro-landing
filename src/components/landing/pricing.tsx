"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WhatsAppDialog } from "./whatsapp-dialog";

const plans = [
  {
    name: "Starter",
    price: { monthly: 29990, annual: 23990 },
    description: "Ideal para locales pequeños",
    features: ["1 local", "Pedidos QR", "Kitchen Display", "Pagos Transbank"],
    cta: "Empieza gratis",
    popular: false,
    color: "bg-purple/10 text-purple border-purple/20",
  },
  {
    name: "Pro",
    price: { monthly: 49990, annual: 39990 },
    description: "Todo lo que necesitas para crecer",
    features: [
      "Hasta 3 locales",
      "Todo Starter",
      "Delivery propio",
      "Analytics avanzado",
      "WhatsApp Bot",
    ],
    cta: "Empieza gratis",
    popular: true,
    color: "bg-golden/10 text-golden border-golden/20",
  },
  {
    name: "Enterprise",
    price: { monthly: "A convenir", annual: "A convenir" },
    description: "Para cadenas de restaurantes",
    features: ["Cadenas ilimitadas", "API Access", "SLA 99.9%", "Soporte 24/7"],
    cta: "Conversemos",
    popular: false,
    color: "bg-charcoal/10 text-charcoal border-charcoal/20",
  },
];

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>();

  const handleCTA = (plan: string) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  return (
    <section id="precios" className="py-24 px-4 bg-white dark:bg-near-black overflow-hidden">
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-16 space-y-6">
          <Badge variant="outline" className="px-4 py-1.5 border-purple text-purple rounded-full font-bold uppercase tracking-wider text-[10px] animate-pulse">
            Precio de lanzamiento — sube en abril
          </Badge>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading text-charcoal dark:text-off-white"
          >
            Planes simples para tu <span className="text-purple">negocio</span>
          </motion.h2>

          <div className="flex flex-col items-center justify-center gap-4">
            <Tabs defaultValue="monthly" onValueChange={(v) => setBilling(v as "monthly" | "annual")} className="w-full max-w-xs">
              <TabsList className="grid w-full grid-cols-2 rounded-full p-1 h-12 bg-muted/50">
                <TabsTrigger value="monthly" className="rounded-full font-bold text-sm">
                  Mensual
                </TabsTrigger>
                <TabsTrigger value="annual" className="rounded-full font-bold text-sm relative overflow-visible">
                  Anual
                  <Badge className="absolute -top-4 -right-2 bg-purple text-off-white text-[10px] rounded-full font-bold border-none shadow-lg">
                    -20%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-golden text-charcoal font-bold px-4 py-1.5 rounded-full border-2 border-white dark:border-near-black shadow-xl uppercase text-[10px] tracking-widest flex items-center gap-1.5">
                    <Sparkles size={12} className="fill-charcoal" />
                    Más Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full border-2 flex flex-col transition-all duration-300 rounded-[2.5rem] overflow-hidden ${
                p.popular ? "border-golden shadow-2xl scale-105" : "border-border shadow-lg"
              }`}>
                <CardHeader className="p-8 pb-4 text-center">
                  <CardTitle className="text-2xl font-heading text-charcoal dark:text-off-white mb-2">
                    {p.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm font-medium">
                    {p.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-8 pt-0 flex-grow">
                  <div className="mb-8 text-center h-20 flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${billing}-${i}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-baseline justify-center"
                      >
                        {typeof p.price.monthly === "number" ? (
                          <>
                            <span className="text-4xl font-heading text-charcoal dark:text-off-white font-extrabold">$</span>
                            <span className="text-5xl font-heading text-charcoal dark:text-off-white font-extrabold tracking-tight">
                              {billing === "monthly" 
                                ? p.price.monthly.toLocaleString('es-CL') 
                                : p.price.annual.toLocaleString('es-CL')}
                            </span>
                            <span className="text-muted-foreground text-sm font-bold ml-1">/mes</span>
                          </>
                        ) : (
                          <span className="text-3xl font-heading text-charcoal dark:text-off-white font-extrabold">
                            {p.price.monthly}
                          </span>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  <div className="space-y-4 mb-2">
                    {p.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${p.color}`}>
                          <Check size={14} className="stroke-[3]" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground dark:text-off-white/80">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="p-8 pt-0 mt-auto flex flex-col gap-4">
                  <Button
                    onClick={() => handleCTA(p.name)}
                    className={`w-full h-14 rounded-2xl text-lg font-bold transition-all active:scale-95 border-none ${
                      p.popular 
                        ? "bg-[#D4A017] hover:bg-[#D4A017]/90 text-charcoal shadow-xl shadow-golden/20" 
                        : "bg-charcoal hover:bg-charcoal/90 text-off-white dark:bg-off-white dark:text-charcoal dark:hover:bg-off-white/90 border border-border/50 shadow-lg"
                    }`}
                  >
                    {p.cta}
                  </Button>
                  <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1 opacity-70">
                    <Info size={10} /> Sin contrato · Cancela cuando quieras
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Subtle decorative shapes */}
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-purple/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 -right-24 w-64 h-64 bg-golden/10 rounded-full blur-[100px] -z-10" />
      </div>

      <WhatsAppDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        source="pricing"
        plan={selectedPlan}
      />
    </section>
  );
}
