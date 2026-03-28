"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "María González",
    role: "Dueña",
    restaurant: "La Picada del Norte",
    location: "Iquique",
    content: '"Redujimos errores de pedido en un 80%"',
    rating: 5,
    color: "bg-purple/10 text-purple",
  },
  {
    name: "Carlos Rojas",
    role: "Gerente",
    restaurant: "Sushi Iquique",
    location: "Iquique",
    content: '"Dejamos de pagar 18% de comisión. Ahorramos $150.000/mes"',
    rating: 5,
    color: "bg-golden/10 text-golden",
  },
  {
    name: "Ana Torres",
    role: "Administradora",
    restaurant: "Café del Puerto",
    location: "Iquique",
    content: '"Cierro el día en 2 minutos, antes me tomaba 40"',
    rating: 5,
    color: "bg-charcoal/10 text-charcoal",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-24 px-4 bg-off-white dark:bg-near-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading text-charcoal dark:text-off-white"
          >
            Confiado por restaurantes de <span className="text-purple">Iquique</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Nuestros clientes ya están ahorrando tiempo y dinero con Auto-Restro.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-none shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden group">
                <CardContent className="p-8 flex flex-col h-full relative">
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-golden text-golden" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl font-heading text-charcoal dark:text-off-white mb-8 italic flex-grow leading-relaxed">
                    {t.content}
                  </blockquote>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${t.color}`}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-charcoal dark:text-off-white leading-tight">
                        {t.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t.role}, {t.restaurant}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-purple font-bold mt-0.5">
                        {t.location}
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle decorative element */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple/5 rounded-full blur-3xl group-hover:bg-purple/10 transition-colors" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
