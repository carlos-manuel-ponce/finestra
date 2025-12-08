import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/abstract_architectural_black_and_white_photography_for_hero_section.png";
import logo from "@assets/ChatGPT_Image_8_dic_2025,_13_37_15_1765213554354.png";

export function Hero() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.9, ease: "easeOut" } 
    }
  };

  const stagger: Variants = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="relative bg-background">
      {/* Shared Background for both sections */}
      <div className="fixed inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Abstract Architecture" 
          className="w-full h-full object-cover opacity-40 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* PART 1: LOGO & SLOGAN (Full Screen) */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <img 
            src={logo} 
            alt="Carlos Manuel Ponce Logo" 
            className="w-48 md:w-64 h-auto mb-8 brightness-0 invert opacity-90 drop-shadow-2xl" 
          />
          <div className="h-px w-24 bg-primary/50 mb-6" />
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl tracking-[0.4em] uppercase text-foreground font-medium text-center"
          >
            Pasión por la Excelencia
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-12 text-muted-foreground"
        >
          <ChevronDown className="w-8 h-8 opacity-50" />
        </motion.div>
      </section>

      {/* PART 2: TITLE & CONTENT (Full Screen) */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-transparent to-background/90">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={stagger}
          className="max-w-4xl mx-auto flex flex-col items-center text-center"
        >
          {/* Title Section */}
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight mb-10 text-primary max-w-5xl"
          >
            Soluciones para Empresas y Proyectos
          </motion.h1>
          
          <motion.div variants={fadeInUp} className="w-full flex justify-center mb-12">
            <div className="h-1 w-24 bg-primary" />
          </motion.div>

          {/* Text Section */}
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto"
          >
            Administramos, acompañamos la toma de decisiones y participamos activamente 
            en el crecimiento de empresas y proyectos, brindando soluciones tecnológicas 
            y estratégicas que impulsan su desarrollo, fortalecen su estructura y 
            potencian su impacto.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-12">
            <Button 
              variant="outline" 
              className="text-primary border-primary hover:bg-primary hover:text-primary-foreground rounded-none h-14 px-10 text-lg uppercase tracking-widest font-medium transition-all duration-300"
              asChild
            >
              <a href="https://wa.me/5492664481572" target="_blank" rel="noopener noreferrer">
                Contacto
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
