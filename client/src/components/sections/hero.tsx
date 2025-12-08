import { motion, Variants } from "framer-motion";
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
    <section className="min-h-screen pt-20 relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Abstract Architecture" 
          className="w-full h-full object-cover opacity-40 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-20 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Logo & Frase Section */}
          <motion.div variants={fadeInUp} className="mb-16 flex flex-col items-center">
            <img 
              src={logo} 
              alt="Carlos Manuel Ponce Logo" 
              className="w-32 md:w-40 h-auto mb-6 brightness-0 invert opacity-90" 
            />
            <div className="h-px w-16 bg-primary/50 mb-4" />
            <p className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground font-medium">
              Pasión por la Excelencia
            </p>
          </motion.div>

          {/* Title Section */}
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight mb-8 text-primary max-w-5xl"
          >
            Soluciones para Empresas y Proyectos
          </motion.h1>
          
          <motion.div variants={fadeInUp} className="w-full flex justify-center mb-10">
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
        </motion.div>
      </div>
    </section>
  );
}
