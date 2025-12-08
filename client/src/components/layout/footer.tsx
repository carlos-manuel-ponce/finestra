import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-serif mb-6">Carlos Manuel Ponce</h2>
            <p className="text-white/60 max-w-md font-light">
              Impulsando la excelencia en cada proyecto. Soluciones estratégicas para el mundo digital.
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end">
            <h3 className="text-sm uppercase tracking-widest text-white/40 mb-6">Contacto</h3>
            <Button 
              variant="outline" 
              className="text-white border-white/30 hover:bg-white hover:text-black rounded-none h-12 px-8 text-lg"
              asChild
            >
              <a href="https://wa.me/5492664481572" target="_blank" rel="noopener noreferrer">
                Iniciar Conversación
              </a>
            </Button>
            <p className="mt-4 text-white/40 font-mono text-sm">+54 9 266 448 1572</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 font-light">
          <p>© {new Date().getFullYear()} Carlos Manuel Ponce. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
