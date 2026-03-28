import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { PromoVideo } from "@/components/landing/promo-video";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <SocialProof />
      <PromoVideo />
      
      {/* Empty space for next sprints */}
      <section className="flex-1 min-h-[50vh] flex items-center justify-center p-8 bg-background border-t border-border">
        <p className="text-muted-foreground italic font-medium">
          Sprint 2 content: Características, Precios y Demo...
        </p>
      </section>
      
      <footer className="py-12 px-4 border-t border-border bg-charcoal text-off-white dark:bg-near-black">
        <div className="container mx-auto flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
          <p className="text-sm font-medium">
            © {new Date().getFullYear()} Auto-Restro. Todos los derechos reservados.
          </p>
          <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <a href="#" className="hover:text-off-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-off-white transition-colors">Términos</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
