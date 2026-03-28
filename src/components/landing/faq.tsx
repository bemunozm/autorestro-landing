"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Necesito saber de tecnología?",
    answer: "No. Te ayudamos en todo el proceso. El sistema es tan fácil de usar como enviar un mensaje por WhatsApp.",
  },
  {
    question: "¿Cuánto tarda la implementación?",
    answer: "1 día. Llegamos a tu local y lo dejamos listo para funcionar. Incluye capacitación para ti y tu equipo.",
  },
  {
    question: "¿Funciona sin internet?",
    answer: "Sí, tiene modo offline. Los datos se sincronizan automáticamente al reconectar, para que nunca dejes de vender.",
  },
  {
    question: "¿Tienen soporte en Chile?",
    answer: "Sí. Ofrecemos soporte directo por WhatsApp con respuesta en menos de 5 minutos para resolver cualquier duda.",
  },
  {
    question: "¿Hay contrato de permanencia?",
    answer: "No. Queremos que te quedes porque amas el sistema. Puedes cancelar cuando quieras, sin preguntas ni multas.",
  },
  {
    question: "¿Qué pasa con mis datos si cancelo?",
    answer: "Tus datos son tuyos. Te exportamos toda la información de tus ventas e inventario sin costo adicional.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 px-4 bg-off-white dark:bg-near-black">
      <div className="container mx-auto max-w-4xl relative overflow-hidden">
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading text-charcoal dark:text-off-white"
          >
            Preguntas <span className="text-purple">frecuentes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Resolvemos tus dudas para que des el siguiente paso con confianza.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-charcoal/30 p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
        >
          <Accordion className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/50 py-2">
                <AccordionTrigger className="text-left text-lg md:text-xl font-heading hover:no-underline hover:text-purple transition-colors py-4 px-0">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base md:text-lg leading-relaxed pt-2 pb-6 pr-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
        
        {/* Decorative corner accent */}
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-purple/5 rounded-full blur-3xl -z-10" />
        <div className="absolute -top-8 -left-8 w-40 h-40 bg-golden/5 rounded-full blur-3xl -z-10" />
      </div>
    </section>
  );
}
