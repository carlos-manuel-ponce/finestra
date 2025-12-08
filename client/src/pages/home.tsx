import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Legal } from "@/components/sections/legal";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-black selection:text-white">
      <main>
        <Hero />
        <Services />
        <Legal />
      </main>
      <Footer />
    </div>
  );
}
