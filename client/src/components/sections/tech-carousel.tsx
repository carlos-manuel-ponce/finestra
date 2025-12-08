import { motion } from "framer-motion";

const technologies = [
  "Supabase", "Python", "HTML", "CSS", "C++", 
  "JavaScript", "Firebase", "OpenAI", "React", 
  "Gemini", "Twilio", "TypeScript", "Node.js", "PostgreSQL"
];

export function TechCarousel() {
  // Use a continuous linear animation with Framer Motion for true infinite seamless scroll
  // It's often smoother for this specific "ticker" style
  
  return (
    <section className="py-20 bg-secondary overflow-hidden border-y border-border">
      <div className="container mx-auto px-6 mb-12">
        <p className="text-center font-serif text-xl italic text-muted-foreground">Tecnologías que impulsan el futuro</p>
      </div>
      
      <div className="relative flex overflow-hidden w-full">
        <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-40 z-10 bg-gradient-to-r from-secondary to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-40 z-10 bg-gradient-to-l from-secondary to-transparent" />
        
        <motion.div 
          className="flex whitespace-nowrap gap-12 lg:gap-24"
          animate={{ x: [0, -1000] }} // Adjust value based on content width approx
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30, // Very slow speed
              ease: "linear",
            },
          }}
        >
          {[...technologies, ...technologies, ...technologies].map((tech, i) => (
            <span 
              key={i} 
              className="text-4xl lg:text-6xl font-bold text-muted-foreground/20 uppercase tracking-tighter hover:text-primary/80 hover:scale-110 transition-all duration-300 cursor-default select-none"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
