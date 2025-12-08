import { motion } from "framer-motion";
import { 
  Code2, 
  Database,
  Globe,
  AppWindow,
  Headset
} from "lucide-react";

const services = [
  { title: "Desarrollo de Páginas Web", icon: Globe },
  { title: "Desarrollo de Aplicaciones Web", icon: AppWindow },
  { title: "Desarrollo de Sistemas de Gestión", icon: Code2 },
  { title: "Soporte técnico a usuarios", icon: Headset },
  { title: "Diseño y administración de Bases de Datos", icon: Database }
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group cursor-default bg-white p-8 hover:shadow-2xl transition-all duration-500 border border-white/10"
              >
                <div className="mb-6 text-neutral-800 group-hover:text-black transition-colors duration-300 group-hover:scale-110 transform origin-left">
                  <Icon strokeWidth={1} className="w-10 h-10" />
                </div>
                
                <h3 className="text-2xl font-serif font-medium text-neutral-900 mb-2 leading-tight">
                  {service.title}
                </h3>
                
                <div className="h-0.5 w-12 bg-neutral-200 group-hover:bg-black transition-colors duration-500 mt-4" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
