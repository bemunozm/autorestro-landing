"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type ConversionSource = "hero" | "pricing" | "cta_final" | "navbar";

interface WhatsAppDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  source?: ConversionSource;
  plan?: string;
}

export function WhatsAppDialog({ isOpen, onOpenChange, source, plan }: WhatsAppDialogProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !restaurant) return;

    setIsSubmitting(true);

    // Track event if available
    if (typeof window !== "undefined") {
      const win = window as Window & { trackEvent?: (name: string, params: Record<string, unknown>) => void };
      if (win.trackEvent) {
        win.trackEvent("form_submit", { source, plan });
      }
    }

    const message = `Hola! Soy ${name} de ${restaurant}. Me interesa Auto-Restro${plan ? ` (Plan ${plan})` : ""}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/56912345678?text=${encodedMessage}`;

    // Small delay for visual feedback
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
      onOpenChange(false);
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-charcoal">
            ¡Empecemos ahora!
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Cuéntanos un poco de tu restaurante y te contactaremos por WhatsApp de inmediato.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tu Nombre</Label>
            <Input
              id="name"
              placeholder="Ej: María González"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-xl border-border focus:border-primary focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Ej: +56 9 1234 5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="rounded-xl border-border focus:border-primary focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="restaurant">Nombre del Restaurante</Label>
            <Input
              id="restaurant"
              placeholder="Ej: La Picada del Norte"
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              required
              className="rounded-xl border-border focus:border-primary focus:ring-primary"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-golden hover:bg-golden/90 text-charcoal font-bold h-12 rounded-xl text-lg mt-4 transition-all active:scale-95"
          >
            {isSubmitting ? "Redirigiendo..." : "Solicitar Información"}
          </Button>
          <p className="text-[10px] text-center text-muted-foreground mt-2">
            Al hacer clic, se abrirá un chat de WhatsApp con nuestro equipo.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
