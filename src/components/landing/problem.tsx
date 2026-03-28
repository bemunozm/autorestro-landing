"use client";

import { motion } from "framer-motion";
import { ClipboardList, Layers, TrendingDown, Clock, X } from "lucide-react";

const painPoints = [
  {
    icon: <ClipboardList className="w-6 h-6 text-red-500" />,
    title: "Anotar pedidos en papel",
    description: "Errores de cocina y letra ilegible que retrasan el servicio.",
  },
  {
    icon: <Layers className="w-6 h-6 text-red-500" />,
    title: "3+ pantallas para gestionar",
    description: "Rappi, Justo y tu POS viejo no se hablan entre sí. Un caos logístico.",
  },
  {
    icon: <TrendingDown className="w-6 h-6 text-red-500" />,
    title: "Comisiones que se comen el margen",
    description: "Pagar 30% por cada envío hace que trabajes para las apps, no para ti.",
  },
  {
    icon: <Clock className="w-6 h-6 text-red-500" />,
    title: "Cierres de día eternos",
    description: "Pasar 30+ minutos cuadrando cajas manualmente al final del turno.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-background">
      {/* Subtle background gradient as per Benjamin's directive */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(123,94,167,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            ¿Reconoces este caos?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
            Los dueños de restaurantes pierden hasta <span className="text-foreground font-semibold underline decoration-primary/30">3 horas al día</span> en tareas manuales que Auto-Restro automatiza.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-sm transition-all group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/5 flex items-center justify-center border border-red-500/10 group-hover:scale-110 transition-transform">
                <X className="w-4 h-4 text-red-500 absolute -top-1 -right-1" />
                {point.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 font-heading">{point.title}</h3>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
