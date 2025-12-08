import { motion } from "framer-motion";
import { 
  Briefcase, 
  Monitor, 
  Code2, 
  Settings2, 
  BrainCircuit, 
  ShieldCheck 
} from "lucide-react";

const services = [
  { title: "Consultoría Estratégica", icon: Briefcase },
  { title: "Transformación Digital", icon: Monitor },
  { title: "Desarrollo de Software", icon: Code2 },
  { title: "Automatización de Procesos", icon: Settings2 },
  { title: "Inteligencia Artificial", icon: BrainCircuit },
  { title: "Ciberseguridad", icon: ShieldCheck }
];

export function Services() {
  return (
    <section className="py-24 lg:py-32 bg-background relative border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-24"
        >
          <h2 className="text-3xl lg:text-4xl font-serif mb-4">Nuestros Servicios</h2>
          <p className="text-muted-foreground uppercase tracking-widest text-sm">Expertise & Innovation</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group cursor-default"
              >
                <div className="h-px w-full bg-border group-hover:bg-primary transition-colors duration-500 mb-6 origin-left" />
                
                <div className="mb-4 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  <Icon strokeWidth={1} className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-serif font-normal text-primary/80 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
