import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { ProblemSection } from "@/components/landing/problem";
import { FeaturesSection } from "@/components/landing/features";
import { DemoSection } from "@/components/landing/demo";
import { TestimonialsSection } from "@/components/landing/testimonials";
import { PricingSection } from "@/components/landing/pricing";
import { FAQSection } from "@/components/landing/faq";
import { FinalCTASection, Footer } from "@/components/landing/final-cta-footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col pt-20">
      <Navbar />
      <Hero />
      <SocialProof />
      
      <ProblemSection />
      <FeaturesSection />
      <DemoSection />
      
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
