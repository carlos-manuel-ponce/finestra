import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white pt-10 pb-6 relative z-10 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="text-2xl font-serif mb-4">Carlos Manuel Ponce</h2>
            <p className="text-white/60 max-w-md font-light">
              Pasión por la Excelencia.
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end">
            <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4">Contacto</h3>
            <Button 
              variant="outline" 
              className="text-white border-white/30 hover:bg-white hover:text-black rounded-none h-10 px-6 text-sm"
              asChild
            >
              <a href="https://wa.me/5492664481572" target="_blank" rel="noopener noreferrer">
                Iniciar Conversación
              </a>
            </Button>
            <p className="mt-4 text-white/40 font-mono text-sm">+54 9 266 448 1572</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex justify-center items-center text-xs text-white/30 font-light">
          <p>© {new Date().getFullYear()} Carlos Manuel Ponce. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
