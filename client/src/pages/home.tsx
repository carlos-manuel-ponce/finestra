import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { TechCarousel } from "@/components/sections/tech-carousel";
import { Legal } from "@/components/sections/legal";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-black selection:text-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <TechCarousel />
        <Legal />
      </main>
      <Footer />
    </div>
  );
}
