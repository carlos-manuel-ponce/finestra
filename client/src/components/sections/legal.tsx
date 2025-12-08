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
          <h2 className="text-2xl font-serif mb-4">COMPETENCIAS, ALCANCES Y CONDICIONES GENERALES</h2>
          <div className="h-px w-16 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground italic">
            Carlos Manuel Ponce — Documento oficial
          </p>
        </motion.div>

        <div className="h-96 overflow-y-auto pr-6 text-sm text-muted-foreground space-y-8 border border-border p-8 font-serif bg-white/5 shadow-inner">
          <section>
            <h3 className="font-bold text-foreground mb-2">1. COMPETENCIA</h3>
            <p className="mb-2">Carlos Manuel Ponce presta servicios de:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Desarrollo de Páginas Web</li>
              <li>Desarrollo de Aplicaciones Web</li>
              <li>Desarrollo de Sistemas de Gestión</li>
              <li>Soporte técnico a usuarios</li>
              <li>Diseño y administración de Bases de Datos</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-foreground mb-2">2. ALCANCE DE RESPONSABILIDAD</h3>
            <p className="mb-2">El Titular asume responsabilidad únicamente sobre:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>La correcta ejecución técnica de las tareas expresamente pactadas.</li>
              <li>La funcionalidad del desarrollo conforme a las especificaciones aprobadas por el Cliente.</li>
              <li>La entrega del producto dentro del alcance funcional y los plazos establecidos.</li>
            </ul>
            <p className="mb-2">Queda expresamente excluida la responsabilidad por:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Fallas o interrupciones derivadas de servicios de terceros (servidores, hosting, dominios, pasarelas de pago, APIs, servicios en la nube, energía eléctrica o conectividad).</li>
              <li>Daños ocasionados por el uso indebido del sistema por parte del Cliente o de terceros.</li>
              <li>Pérdida de información causada por factores externos al desarrollo.</li>
              <li>Modificaciones no autorizadas sobre el sistema entregado.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-foreground mb-2">3. MODALIDAD DE PRESTACIÓN DEL SERVICIO</h3>
            <p className="mb-4">Los servicios podrán contratarse bajo las siguientes modalidades:</p>
            
            <div className="mb-4 pl-4 border-l-2 border-border">
              <h4 className="font-semibold text-foreground">a) Modalidad por Hora</h4>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>El valor de la hora profesional será informado previamente.</li>
                <li>El cómputo del tiempo será real, verificable y documentado.</li>
                <li>El Cliente abonará exclusivamente las horas efectivamente trabajadas.</li>
              </ul>
            </div>

            <div className="pl-4 border-l-2 border-border">
              <h4 className="font-semibold text-foreground">b) Modalidad por Proyecto</h4>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>Se establecerá un alcance funcional definido, plazo de ejecución y precio total.</li>
                <li>Cualquier ampliación, modificación o funcionalidad adicional será presupuestada por separado.</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="font-bold text-foreground mb-2">4. CLIENTE – RESPONSABILIDADES</h3>
            <p className="mb-2">El Cliente es único y exclusivo responsable por:</p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>La legalidad, veracidad y titularidad de los datos suministrados.</li>
              <li>El contenido cargado en los sistemas.</li>
              <li>El uso legítimo de imágenes, textos, marcas, logotipos, bases de datos o cualquier material digital.</li>
            </ul>
            <p className="italic">El Titular no asume responsabilidad legal, administrativa ni penal por los contenidos aportados por el Cliente.</p>
          </section>

          <section>
            <h3 className="font-bold text-foreground mb-2">5. PRIVACIDAD Y PROTECCIÓN DE DATOS PERSONALES</h3>
            <p className="mb-2">El tratamiento de los datos personales se realiza conforme a lo dispuesto por la Ley N.º 25.326 de Protección de Datos Personales y su normativa complementaria.</p>
            <p className="mb-2">Se garantiza:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Uso exclusivo para fines técnicos, operativos y contractuales.</li>
              <li>Prohibición de cesión a terceros sin consentimiento expreso.</li>
              <li>Implementación de medidas razonables de seguridad informática.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-foreground mb-2">6. CONFIDENCIALIDAD</h3>
            <p className="mb-2">Toda información técnica, operativa, institucional, estratégica o comercial a la que las partes accedan con motivo de la prestación del servicio tendrá carácter estrictamente confidencial.</p>
            <p className="mb-2">Las partes se obligan a:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>No divulgar información sin autorización expresa y escrita.</li>
              <li>No utilizar información obtenida fuera del objeto del servicio.</li>
              <li>Mantener el deber de confidencialidad aun finalizada la relación.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-foreground mb-2">7. PROPIEDAD INTELECTUAL</h3>
            <p>Todo desarrollo, sistema, código fuente, arquitectura digital, diseño, base de datos, documentación técnica, estructura lógica o solución tecnológica creada por el Titular es de su exclusiva propiedad intelectual, salvo acuerdo expreso de cesión o licencia debidamente instrumentado por escrito.</p>
          </section>
        </div>
      </div>
    </section>
  );
}
