import { motion, Variants } from "framer-motion";
import heroImage from "@assets/generated_images/abstract_architectural_black_and_white_photography_for_hero_section.png";
import logo from "@assets/generated_images/minimalist_geometric_logo_for_carlos_manuel_ponce.png";

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
    <section className="min-h-screen pt-20 flex flex-col lg:flex-row overflow-hidden">
      {/* Left Column - Visual */}
      <motion.div 
        className="lg:w-1/2 relative min-h-[50vh] lg:min-h-full bg-secondary flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Abstract Architecture" 
            className="w-full h-full object-cover opacity-60 grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <motion.div 
          className="relative z-10 text-center p-8 bg-black/20 backdrop-blur-md border border-white/10 max-w-sm mx-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Changed to brightness-0 invert to force white */}
          <img src={logo} alt="Logo" className="w-24 h-24 mx-auto mb-6 brightness-0 invert" />
          <p className="text-white font-medium tracking-[0.2em] uppercase text-sm drop-shadow-md">
            Pasión por la Excelencia
          </p>
        </motion.div>
      </motion.div>

      {/* Right Column - Content */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-20 bg-background">
        <motion.div 
          className="max-w-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h1 
            className="text-4xl lg:text-6xl font-serif font-medium leading-tight mb-8 text-primary"
            variants={fadeInUp}
          >
            Soluciones para Empresas y Proyectos
          </motion.h1>
          
          <motion.div variants={fadeInUp}>
            <div className="h-1 w-20 bg-primary mb-8" />
          </motion.div>

          <motion.p 
            className="text-lg lg:text-xl text-muted-foreground leading-relaxed font-light"
            variants={fadeInUp}
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
