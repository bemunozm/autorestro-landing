"use client";

import { motion } from "framer-motion";
import { QrCode, Smartphone, Truck, CreditCard, BarChart3 } from "lucide-react";

const features = [
  {
    icon: <QrCode className="w-10 h-10" />,
    benefit: "Pedidos digitales",
    description: "Elimina errores de cocina. Cero papel.",
    color: "text-purple-primary",
  },
  {
    icon: <Smartphone className="w-10 h-10" />,
    benefit: "Cocina en tiempo real",
    description: "Tu cocina ve cada pedido al instante.",
    color: "text-purple-primary",
  },
  {
    icon: <Truck className="w-10 h-10" />,
    benefit: "Delivery propio",
    description: "Deja de pagar 30% de comisión.",
    color: "text-purple-primary",
  },
  {
    icon: <CreditCard className="w-10 h-10" />,
    benefit: "Pagos Transbank",
    description: "Cobros integrados. Sin caja registradora.",
    color: "text-purple-primary",
  },
  {
    icon: <BarChart3 className="w-10 h-10" />,
    benefit: "Estadísticas",
    description: "Sabe qué vende y qué no. Cierra el día en 2 min.",
    color: "text-purple-primary",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold tracking-widest text-primary uppercase mb-4 block">
            Beneficios
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Todo lo que tu restaurante necesita
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden h-full"
            >
              {/* Benjamin's subtle gradient directive */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className={`mb-6 transition-transform group-hover:scale-110 duration-500 ${feature.color}`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 font-heading text-foreground">
                {feature.benefit}
              </h3>
              
              <p className="text-muted-foreground font-sans leading-relaxed">
                {feature.description}
              </p>
              
              {/* Memorable Element: Subtle decorative line */}
              <div className="mt-8 h-px w-1/4 bg-primary/20 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
