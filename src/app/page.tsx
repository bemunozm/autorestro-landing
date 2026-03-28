import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { PromoVideo } from "@/components/landing/promo-video";
import { ProblemSection } from "@/components/landing/problem";
import { FeaturesSection } from "@/components/landing/features";
import { DemoSection } from "@/components/landing/demo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <SocialProof />
      <PromoVideo />
      
      <ProblemSection />
      <FeaturesSection />
      <DemoSection />
      
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
