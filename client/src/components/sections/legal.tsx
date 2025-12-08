import { motion } from "framer-motion";

export function Legal() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-serif mb-4">TÉRMINOS Y CONDICIONES</h2>
          <div className="h-px w-16 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground italic">
            Documento oficial de Carlos Manuel Ponce. Este contrato regula la relación jurídica, 
            comercial y tecnológica entre las partes intervinientes.
          </p>
        </motion.div>

        <div className="h-64 overflow-y-auto pr-4 text-sm text-muted-foreground space-y-4 border border-border p-6 font-mono bg-secondary/30">
          <p>
            <strong>1. INTRODUCCIÓN</strong><br/>
            El presente documento establece los términos y condiciones generales de contratación de los servicios ofrecidos por Carlos Manuel Ponce.
          </p>
          <p>
            <strong>2. SERVICIOS</strong><br/>
            Los servicios prestados incluyen consultoría estratégica, desarrollo de software, y transformación digital, sujetos a propuestas específicas aprobadas por el cliente.
          </p>
          <p>
            <strong>3. CONFIDENCIALIDAD</strong><br/>
            Ambas partes se comprometen a mantener la más estricta confidencialidad respecto a la información intercambiada durante la relación comercial.
          </p>
          <p>
            <strong>4. PROPIEDAD INTELECTUAL</strong><br/>
            Todo desarrollo, código, o estrategia creada permanece como propiedad intelectual del autor hasta el cumplimiento total de las obligaciones contractuales.
          </p>
          {/* Add more filler text to demonstrate scroll if needed */}
          <p>
            <strong>5. JURISDICCIÓN</strong><br/>
            Para cualquier controversia que pudiera derivarse de la prestación de los servicios, las partes se someten a los tribunales competentes.
          </p>
        </div>
      </div>
    </section>
  );
}
