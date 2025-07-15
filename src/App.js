import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabaseClient";
import { PlusCircle, List, BarChart2, Bell, Download, Home, CalendarDays, ChevronLeft, ChevronRight, Eye, Users, Edit } from 'lucide-react'; // Eliminado Settings

// --- Componente Modal Personalizado ---
const Modal = ({ message, type, onConfirm, onCancel, onClose, onInputChange, inputValue, children }) => {
  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Fondo más oscuro para el modal
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  };

  const contentStyle = {
    backgroundColor: '#1A1A1A', // Fondo del modal negro muy oscuro
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.7)', // Sombra más pronunciada
    maxWidth: type === 'details' || type === 'editClient' ? '600px' : '400px', // Más ancho para detalles y edición de cliente
    width: '90%',
    textAlign: 'center',
    color: '#E0E0E0', // Texto gris claro para contraste
    fontFamily: 'Roboto, sans-serif', // Fuente más moderna
    border: '1px solid #333333', // Borde gris oscuro
    maxHeight: '80vh', // Limitar altura para scroll
    overflowY: 'auto', // Scroll si el contenido es largo
  };

  const buttonContainerStyle = {
    marginTop: '30px', // Mayor espacio
    display: 'flex',
    justifyContent: 'center',
    gap: '20px', // Mayor espacio entre botones
  };

  const buttonStyle = {
    padding: '12px 25px', // Mayor padding
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#333333', // Gris oscuro para botones
    color: '#FFFFFF', // Texto blanco
    border: 'none', // Sin borde
    borderRadius: '6px', // Bordes más suaves
    fontSize: '16px',
    transition: 'background-color 0.3s ease, transform 0.2s ease', // Transición para hover
    boxShadow: '0 2px 5px rgba(0,0,0,0.4)', // Sombra sutil
    '&:hover': {
      backgroundColor: '#555555', // Gris más claro al pasar el ratón
      transform: 'translateY(-1px)',
    }
  };

  const cancelButtonLightStyle = {
    ...buttonStyle,
    backgroundColor: '#555555', // Gris medio para cancelar
    '&:hover': {
      backgroundColor: '#777777',
      transform: 'translateY(-1px)',
    }
  };

  const inputStyle = {
    width: 'calc(100% - 20px)',
    padding: '12px',
    margin: '20px 0',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #555555', // Borde gris oscuro
    backgroundColor: '#2A2A2A', // Fondo del input más oscuro
    color: '#E0E0E0', // Texto gris claro
    outline: 'none', // Quitar outline por defecto
  };

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <p style={{ fontSize: '20px', marginBottom: '25px', color: '#FFFFFF' }}>{message}</p> {/* Título del modal en blanco */}
        {(type === 'prompt' || type === 'whatsappConfig') && (
          <input
            type="number" // Asumiendo que los números de WhatsApp son numéricos
            value={inputValue}
            onChange={onInputChange}
            style={inputStyle}
            placeholder={type === 'whatsappConfig' ? "Ingrese el número de WhatsApp" : "Ingrese el monto"}
            autoFocus
          />
        )}
        {children} {/* Para contenido dinámico como los detalles del préstamo o el formulario de edición */}
        <div style={buttonContainerStyle}>
          {(type === 'confirm' || type === 'prompt' || type === 'whatsappConfig' || type === 'editClient') && (
            <button style={buttonStyle} onClick={onConfirm}>
              Aceptar
            </button>
          )}
          {(type === 'confirm' || type === 'prompt' || type === 'whatsappConfig' || type === 'editClient') && (
            <button style={cancelButtonLightStyle} onClick={onCancel}>
              Cancelar
            </button>
          )}
          {(type === 'alert' || type === 'details') && (
            <button style={buttonStyle} onClick={onClose}>
              Cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
// --- Fin Componente Modal Personalizado ---


const StatusBar = ({ usuario }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentDateTime.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#000000", // Negro puro para la barra de estado
        color: "#FFFFFF", // Texto blanco
        padding: "12px 25px", // Mayor padding
        display: "flex",
        justifyContent: "space-around", // Mejorar la distribución
        alignItems: "center",
        zIndex: 1000,
        fontFamily: "Roboto, sans-serif", // Fuente moderna
        fontSize: "14px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.6)", // Sombra más oscura y pronunciada
      }}
    >
      <div>
        <strong style={{ color: '#B0B0B0' }}>Usuario:</strong> {usuario} {/* Gris más claro para etiquetas */}
      </div>
      <div>
        <strong style={{ color: '#B0B0B0' }}>Fecha:</strong> {formattedDate}
      </div>
      <div>
        <strong style={{ color: '#B0B0B0' }}>Hora:</strong> {formattedTime}
      </div>
    </div>
  );
};

const DashboardResumen = ({ capitalInvertido, retornoCapitalInvertido, ganancia }) => {
  const seguro = (valor) =>
    typeof valor === "number" && !isNaN(valor)
      ? valor.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : "0.00";

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F0F0F", // Fondo muy oscuro para el dashboard
    padding: "50px", // Mayor padding
    gap: "30px", // Mayor espacio entre tarjetas
    flexWrap: "wrap",
    fontFamily: "Roboto, sans-serif", // Fuente moderna
    color: "#E0E0E0", // Texto gris claro
    borderRadius: '10px', // Bordes redondeados
    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)', // Sombra interna sutil
  };

  const cardStyle = {
    backgroundColor: '#1A1A1A', // Fondo de tarjeta negro oscuro
    color: '#E0E0E0', // Texto gris claro
    padding: '30px', // Mayor padding
    borderRadius: '8px', // Bordes redondeados
    border: '1px solid #333333', // Borde gris oscuro sutil
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
    minWidth: '280px', // Mayor ancho mínimo
    flex: '1 1 auto',
    boxShadow: '0 6px 15px rgba(0,0,0,0.6)', // Sombra más pronunciada
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Transición para hover
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
    }
  };

  const titleStyle = {
    fontSize: "17px",
    fontWeight: "bold",
    marginBottom: "15px",
    borderBottom: "1px solid #555555", // Borde inferior gris medio
    paddingBottom: "8px",
    letterSpacing: "1.5px", // Más espaciado
    color: "#B0B0B0", // Título gris claro
    textTransform: 'uppercase', // Mayúsculas
  };

  const valueStyle = {
    fontSize: "28px", // Mayor tamaño
    fontWeight: "bold",
    color: "#FFFFFF", // Valor blanco puro
    marginTop: '10px',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={titleStyle}>CAPITAL INVERTIDO</div>
        <div style={valueStyle}>${seguro(capitalInvertido)}</div>
      </div>
      <div style={cardStyle}>
        <div style={titleStyle}>RETORNO DE CAPITAL INVERTIDO</div>
        <div style={valueStyle}>${seguro(retornoCapitalInvertido)}</div>
      </div>
      <div style={cardStyle}>
        <div style={titleStyle}>GANANCIA</div>
        <div style={valueStyle}>${seguro(ganancia)}</div>
      </div>
    </div>
  );
};

const DashboardHistorial = ({ totalAbonado, totalDemora }) => {
  const seguro = (valor) =>
    typeof valor === "number" && !isNaN(valor)
      ? valor.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : "0.00";
  
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F0F0F", // Fondo muy oscuro
    padding: "30px", // Mayor padding
    gap: "25px", // Mayor espacio
    flexWrap: "wrap",
    fontFamily: "Roboto, sans-serif",
    color: "#E0E0E0",
    marginTop: "30px", // Mayor margen superior
    borderRadius: '10px',
    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
  };
  
  const cardStyle = {
    backgroundColor: '#1A1A1A', // Fondo de tarjeta negro oscuro
    color: '#E0E0E0', // Texto gris claro
    padding: '25px', // Mayor padding
    borderRadius: '8px',
    border: '1px solid #333333',
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
    minWidth: '220px',
    flex: '1 1 auto',
    boxShadow: '0 6px 15px rgba(0,0,0,0.6)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
    }
  };
  
  const titleStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "12px",
    borderBottom: "1px solid #555555",
    paddingBottom: "7px",
    letterSpacing: "1.2px",
    color: "#B0B0B0", // Título gris claro
    textTransform: 'uppercase',
  };
  
  const valueStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: '8px',
  };
  
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={titleStyle}>TOTAL ABONADO</div>
        <div style={valueStyle}>${seguro(totalAbonado)}</div>
      </div>
      <div style={cardStyle}>
        <div style={titleStyle}>TOTAL POR DEMORA</div>
        <div style={valueStyle}>${seguro(totalDemora)}</div>
      </div>
    </div>
  );
};

// Mover ESTILOS aquí, fuera de cualquier componente
const ESTILOS = {
  card: {
    backgroundColor: '#1A1A1A', // Fondo de tarjeta negro oscuro
    padding: '25px', // Mayor padding
    borderRadius: '8px',
    border: '1px solid #333333', // Borde gris oscuro
    marginBottom: '25px', // Mayor margen
    boxShadow: '0 6px 15px rgba(0,0,0,0.6)',
  },
  th: {
    border: '1px solid #555555', // Borde gris medio
    padding: '12px 10px', // Mayor padding
    backgroundColor: '#0A0A0A', // Fondo de encabezado de tabla negro puro
    color: '#FFFFFF', // Texto blanco
    fontWeight: 'bold',
    fontSize: '15px',
    letterSpacing: '0.5px',
  },
  td: {
    border: '1px solid #222222', // Borde gris más oscuro
    padding: '10px',
    color: '#E0E0E0', // Texto gris claro
    fontSize: '14px',
  },
  button: {
    padding: '14px 28px', // Mayor padding
    fontWeight: 'bold',
    cursor: 'pointer',
    background: 'linear-gradient(145deg, #222222, #333333)', // Degradado más profesional
    color: '#FFFFFF', // Texto blanco
    border: 'none',
    borderRadius: '8px', // Bordes más redondeados
    fontSize: '17px', // Mayor tamaño de fuente
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px', // Mayor espacio entre icono y texto
    boxShadow: '5px 5px 15px rgba(0,0,0,0.6), -5px -5px 15px rgba(50,50,50,0.2)', // Neumorfismo suave
    transition: 'all 0.3s ease-in-out', // Transición para todos los cambios
    '&:hover': {
      background: 'linear-gradient(145deg, #333333, #444444)', // Degradado más claro al pasar el ratón
      transform: 'translateY(-3px)', // Efecto de elevación
      boxShadow: '8px 8px 20px rgba(0,0,0,0.8), -8px -8px 20px rgba(70,70,70,0.3)', // Sombra más pronunciada
    },
    '&:active': {
      transform: 'translateY(1px)', // Efecto de presión al hacer click
      boxShadow: '2px 2px 5px rgba(0,0,0,0.5) inset', // Sombra interna
    },
    minWidth: '220px', // Añadido para igualar el ancho de los botones
  },
  buttonSecondary: { // Nuevo estilo para botones secundarios si se necesitan
    backgroundColor: '#555555',
    '&:hover': {
      backgroundColor: '#777777',
    }
  }
};

const AuditoriaPrestamos = ({ registros, cambiarEstado, setView, onSendDailyBalanceReport, retornoCapitalInvertido }) => { 
  // Saldo inicial fijo (se edita directamente en el código)
  const SALDO_INICIAL = 0.00;
  
  // Calcular saldo actual
  const prestamosActivos = registros.filter(r => r.estado === "Activo");
  const prestamosPagados = registros.filter(r => r.estado === "Pagado");
  
  const totalEgresos = prestamosActivos.reduce((sum, prestamo) => sum + parseFloat(prestamo.monto || 0), 0);
  const totalIngresos = prestamosPagados.reduce((sum, prestamo) => sum + parseFloat(prestamo.abonado || 0), 0);
  
  const saldoActual = SALDO_INICIAL - totalEgresos + totalIngresos;

  return (
    <div style={{ paddingTop: "80px", maxWidth: '1300px', margin: '0 auto', backgroundColor: '#0F0F0F', borderRadius: '10px', boxShadow: '0 8px 25px rgba(0,0,0,0.7)', padding: '40px' }}>
      <h2 style={{ textAlign: "center", marginBottom: '40px', color: '#FFFFFF', fontSize: '32px', letterSpacing: '2px' }}>Auditoría de Préstamos</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
        <div style={ESTILOS.card}>
          <h3 style={{ marginTop: 0, color: '#B0B0B0', fontSize: '24px', marginBottom: '20px' }}>Saldo del Sistema</h3>
          <p style={{color: '#E0E0E0', fontSize: '18px', marginBottom: '10px'}}><strong>Total Egresos:</strong> <span style={{color: '#FF6B6B'}}>${totalEgresos.toFixed(2)}</span></p> {/* Rojo para egresos */}
          <p style={{color: '#E0E0E0', fontSize: '18px', marginBottom: '10px'}}><strong>Total Ingresos:</strong> <span style={{color: '#6BFF6B'}}>${totalIngresos.toFixed(2)}</span></p> {/* Verde para ingresos */}
          <p style={{color: '#FFFFFF', fontSize: '22px', fontWeight: 'bold', borderTop: '1px solid #555555', paddingTop: '15px', marginTop: '20px'}}><strong>Saldo Actual:</strong> ${saldoActual.toFixed(2)}</p>
        </div>
        {/* Placeholder para un segundo card si se necesita */}
        <div style={ESTILOS.card}>
            <h3 style={{ marginTop: 0, color: '#B0B0B0', fontSize: '24px', marginBottom: '20px' }}>Análisis de Fondos</h3>
            <p style={{color: '#E0E0E0', fontSize: '18px', marginBottom: '10px'}}>Préstamos Activos: <span style={{fontWeight: 'bold'}}>{prestamosActivos.length}</span></p>
            <p style={{color: '#E0E0E0', fontSize: '18px', marginBottom: '10px'}}>Préstamos Pagados: <span style={{fontWeight: 'bold'}}>{prestamosPagados.length}</span></p>
            <p style={{color: '#E0E0E0', fontSize: '18px', marginBottom: '10px'}}>Proyección de ingresos: <span style={{color: '#6BFF6B'}}>${retornoCapitalInvertido.toFixed(2)}</span></p>
        </div>
      </div>
      {/* ELIMINADO: SECCIÓN DEL GRÁFICO DE FLUJO DIARIO DE FONDOS */}
      
      <div style={{ textAlign: 'center', marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setView("home")} 
          style={ESTILOS.button}
        >
          <Home size={22} /> Volver al Inicio
        </button>
        <button 
          onClick={onSendDailyBalanceReport} 
          style={ESTILOS.button}
        >
          <Bell size={22} /> Generar Reporte de Saldo
        </button>
      </div>
    </div>
  );
};

// Nuevo componente para el Calendario
const PantallaCalendario = ({ setView, registros, showCustomAlert }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const numDays = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay(); 

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null); 
    }
    for (let i = 1; i <= numDays; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString("es-ES", { month: "long", year: "numeric" });

  const getEventsForDay = (day) => {
    if (!day) return [];
    const formattedDay = day.toISOString().split('T')[0];
    const allEventsForDay = [];

    registros.forEach(registro => {
      // Eventos de vencimiento
      if (registro.vencimiento === formattedDay) {
        allEventsForDay.push({ type: 'vencimiento', id: registro.id, ...registro });
      }
      // Prestamos activos con fecha de inicio del prestamo igual al día
      if (registro.estado === 'Activo' && registro.created_at?.split('T')[0] === formattedDay) { 
        allEventsForDay.push({ type: 'activo', id: registro.id, ...registro });
      }
    });

    // Filtramos para asegurar que no haya duplicados si un préstamo vence y es creado el mismo día
    const uniqueEvents = Array.from(new Set(allEventsForDay.map(e => e.id)))
                            .map(id => allEventsForDay.find(e => e.id === id));
    
    return uniqueEvents;
  };

  const eventColor = {
    vencimiento: '#FF6B6B', // Rojo suave
    activo: '#6BFF6B', // Verde suave
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1);
      return newMonth;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1);
      return newMonth;
    });
  };

  const handleDayClick = (day) => {
    if (!day) return;
    const events = getEventsForDay(day);
    if (events.length > 0) {
      setSelectedDayEvents(events);
      setDetailsModalVisible(true);
    } else {
      showCustomAlert("No hay préstamos registrados para este día.");
    }
  };

  return (
    <div style={{ paddingTop: "80px", maxWidth: '1100px', margin: '0 auto', backgroundColor: '#0F0F0F', padding: '40px', borderRadius: '10px', boxShadow: '0 8px 25px rgba(0,0,0,0.7)', color: '#E0E0E0' }}>
      <h2 style={{ textAlign: "center", marginBottom: '30px', color: '#FFFFFF', fontSize: '30px', letterSpacing: '1.5px' }}>Calendario de Préstamos</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button 
          onClick={goToPreviousMonth} 
          style={{ ...ESTILOS.button, padding: '10px 20px', fontSize: '16px' }}
        >
          <ChevronLeft size={18} /> Mes Anterior
        </button>
        <h3 style={{ textAlign: "center", margin: '0', color: '#B0B0B0', fontSize: '24px' }}>{monthName}</h3>
        <button 
          onClick={goToNextMonth} 
          style={{ ...ESTILOS.button, padding: '10px 20px', fontSize: '16px' }}
        >
          Mes Siguiente <ChevronRight size={18} />
        </button>
      </div>

      {/* ELIMINADO: FILTROS DEL CALENDARIO */}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '30px' }}>
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} style={{ fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF', fontSize: '16px', paddingBottom: '10px', borderBottom: '1px solid #555555' }}>{day}</div>
        ))}
        {daysInMonth.map((day, index) => {
          const events = day ? getEventsForDay(day) : [];
          const hasEvents = events.length > 0;
          
          const dayStyle = { 
            border: '1px solid #333333', 
            borderRadius: '6px', 
            padding: '12px 8px', 
            minHeight: '100px', 
            textAlign: 'right', 
            position: 'relative',
            backgroundColor: day ? '#1A1A1A' : '#0A0A0A', // Oscuro para días, más oscuro para vacíos
            color: '#E0E0E0',
            cursor: day ? 'pointer' : 'default', 
            transition: 'background-color 0.2s ease, transform 0.2s ease',
            '&:hover': day ? { backgroundColor: '#3A3A3A', transform: 'translateY(-2px)' } : {},
          };

          return (
            <div 
              key={index} 
              style={dayStyle}
              onClick={() => handleDayClick(day)}
            >
              {day && <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '18px', color: '#FFFFFF' }}>{day.getDate()}</div>}
              {hasEvents && (
                <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
                  <Eye size={20} color="#6BFF6B" /> {/* Ojo verde para indicar eventos */}
                </div>
              )}
              {/* ELIMINADO: PUNTOS DE COLORES */}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          onClick={() => setView("home")} 
          style={ESTILOS.button}
        >
          <Home size={22} /> Volver al Inicio
        </button>
      </div>

      {detailsModalVisible && (
        <Modal
          message="Detalles de Préstamos del Día"
          type="details"
          onClose={() => setDetailsModalVisible(false)}
        >
          <div style={{ textAlign: 'left', marginTop: '15px', color: '#E0E0E0', fontSize: '16px' }}>
            {selectedDayEvents.map(event => (
              <div key={event.id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #333333', borderRadius: '6px', backgroundColor: '#2A2A2A', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                <strong>Tipo:</strong> <span style={{ color: eventColor[event.type], fontWeight: 'bold' }}>{event.type === 'vencimiento' ? 'Vencimiento' : 'Activo'}</span><br/>
                <strong>ID:</strong> {event.id}<br/>
                <strong>Cliente:</strong> {event.nombre} {event.apellido}<br/>
                <strong>Monto Entregado:</strong> <span style={{color: '#6BFF6B'}}>${parseFloat(event.monto).toFixed(2)}</span><br/>
                <strong>Monto a Devolver:</strong> <span style={{color: '#FFD700'}}>${parseFloat(event.montoDevolver).toFixed(2)}</span><br/> {/* Amarillo para monto a devolver */}
                <strong>Vencimiento:</strong> {event.vencimiento}
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

// Nuevo componente para la Pantalla de Clientes
const PantallaClientes = ({ setView, clientes, onEditClient, loading, showCustomAlert }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentClientToEdit, setCurrentClientToEdit] = useState(null);
  const [editedApellido, setEditedApellido] = useState('');
  const [editedNombre, setEditedNombre] = useState('');
  const [editedContacto, setEditedContacto] = useState('');
  const [editedDatosBancarios, setEditedDatosBancarios] = useState('');

  // Al hacer click en editar, carga los datos actuales del cliente
  const handleEditClick = (client) => {
    setCurrentClientToEdit(client);
    setEditedApellido(client.apellido);
    setEditedNombre(client.nombre);9
    setEditedContacto(client.contacto || '');
    setEditedDatosBancarios(client.datosBancarios || '');
    setEditModalVisible(true);
  };

  // Al confirmar edición, valida y llama a la función de edición
  const handleEditConfirm = async () => {
    if (!editedApellido || !editedNombre) {
      showCustomAlert("El apellido y el nombre no pueden estar vacíos.");
      return;
    }
    await onEditClient(
      currentClientToEdit.apellido,
      currentClientToEdit.nombre,
      editedApellido,
      editedNombre,
      editedContacto,
      editedDatosBancarios
    );
    setEditModalVisible(false);
  };

  return (
    <div style={{ paddingTop: "80px", maxWidth: '1200px', margin: '0 auto', backgroundColor: '#0F0F0F', padding: '40px', borderRadius: '10px', boxShadow: '0 8px 25px rgba(0,0,0,0.7)', color: '#E0E0E0' }}>
      <h2 style={{ textAlign: "center", marginBottom: '30px', color: '#FFFFFF', fontSize: '32px' }}>Clientes</h2>
      {loading ? (
        <p style={{ textAlign: "center", fontSize: "20px", color: '#B0B0B0' }}>Cargando clientes...</p>
      ) : (
        <table
          style={{
            width: "100%",
            background: "#1A1A1A",
            color: "#E0E0E0",
            marginTop: 20,
            borderCollapse: "collapse",
            fontSize: "15px",
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 6px 15px rgba(0,0,0,0.6)',
          }}
        >
          <thead>
            <tr>
              <th style={ESTILOS.th}>Apellido</th>
              <th style={ESTILOS.th}>Nombre</th>
              <th style={ESTILOS.th}>Contacto</th>
              <th style={ESTILOS.th}>Datos Bancarios</th>
              <th style={ESTILOS.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((client, index) => (
              <tr key={index} style={{ textAlign: "center" }}>
                <td style={ESTILOS.td}>{client.apellido}</td>
                <td style={ESTILOS.td}>{client.nombre}</td>
                <td style={ESTILOS.td}>{client.contacto || "-"}</td>
                <td style={ESTILOS.td}>{client.datosBancarios || "-"}</td>
                <td style={{ ...ESTILOS.td, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button
                    onClick={() => handleEditClick(client)}
                    style={{ ...ESTILOS.button, padding: '8px 15px', fontSize: '14px', gap: '5px', borderRadius: '5px', minWidth: 'unset' }}
                  >
                    <Edit size={16} /> Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Botón Volver al Inicio */}
      {!loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <button
            style={ESTILOS.button}
            onClick={() => setView("home")}
          >
            <Home size={22} /> Volver al Inicio
          </button>
        </div>
      )}

      {/* Modal de edición */}
      {editModalVisible && (
        <Modal
          message="Editar Datos del Cliente"
          type="editClient"
          onClose={() => setEditModalVisible(false)}
          onConfirm={handleEditConfirm}
          onCancel={() => setEditModalVisible(false)}
        >
          <div style={{ textAlign: 'left', marginTop: '15px', color: '#E0E0E0', fontSize: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Apellido:</label>
            <input
              type="text"
              value={editedApellido}
              onChange={(e) => setEditedApellido(e.target.value)}
              style={{ width: 'calc(100% - 20px)', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #555555', backgroundColor: '#2A2A2A', color: '#E0E0E0' }}
            />
            <label style={{ display: 'block', marginBottom: '8px' }}>Nombre:</label>
            <input
              type="text"
              value={editedNombre}
              onChange={(e) => setEditedNombre(e.target.value)}
              style={{ width: 'calc(100% - 20px)', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #555555', backgroundColor: '#2A2A2A', color: '#E0E0E0' }}
            />
            <label style={{ display: 'block', marginBottom: '8px' }}>Contacto:</label>
            <input
              type="text"
              value={editedContacto}
              onChange={(e) => setEditedContacto(e.target.value)}
              style={{ width: 'calc(100% - 20px)', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #555555', backgroundColor: '#2A2A2A', color: '#E0E0E0' }}
            />
            <label style={{ display: 'block', marginBottom: '8px' }}>Datos Bancarios:</label>
            <input
              type="text"
              value={editedDatosBancarios}
              onChange={(e) => setEditedDatosBancarios(e.target.value)}
              style={{ width: 'calc(100% - 20px)', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #555555', backgroundColor: '#2A2A2A', color: '#E0E0E0' }}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

function App() {
  const [view, setView] = useState("login");
  const [form, setForm] = useState({
    apellido: "",
    nombre: "",
    monto: "",
    interes: "",
    plazo: "",
  });
  const [registros, setRegistros] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [loginForm, setLoginForm] = useState({ usuario: "", password: "" });
  const [errorLogin, setErrorLogin] = useState("");
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    const savedNumber = localStorage.getItem('whatsappNumber');
    return savedNumber || '5491112345678'; 
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("alert"); 
  const [modalCallback, setModalCallback] = useState(null);
  const [modalInputValue, setModalInputValue] = useState(""); 

  const [clientSuggestions, setClientSuggestions] = useState([]);
  const [allClients, setAllClients] = useState([]); // Para almacenar la lista de clientes únicos con conteo

  const showCustomAlert = useCallback((message, callback = () => {}) => {
    setModalMessage(message);
    setModalType("alert");
    setModalCallback(() => callback);
    setModalVisible(true);
  }, []); 

  const showCustomConfirm = useCallback((message, onConfirm, onCancel = () => {}) => {
    setModalMessage(message);
    setModalType("confirm");
    setModalCallback(() => ({ onConfirm, onCancel }));
    setModalVisible(true);
  }, []); 

  const showCustomPrompt = useCallback((message, onPromptConfirm, initialValue = "") => {
    setModalMessage(message);
    setModalType("prompt");
    setModalInputValue(initialValue);
    setModalCallback(() => onPromptConfirm);
    setModalVisible(true);
  }, []); 

  // Eliminado showWhatsappConfigModal ya que no se usa directamente en el código actual
  // const showWhatsappConfigModal = useCallback(() => {
  //   setModalMessage("Configurar Número de WhatsApp para Notificaciones:");
  //   setModalType("whatsappConfig");
  //   setModalInputValue(whatsappNumber); 
  //   setModalCallback(() => (newNumber) => {
  //     setWhatsappNumber(newNumber);
  //     localStorage.setItem('whatsappNumber', newNumber);
  //     showCustomAlert("Número de WhatsApp guardado exitosamente.");
  //   });
  //   setModalVisible(true);
  // }, [whatsappNumber, showCustomAlert]); 

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setModalMessage("");
    setModalType("alert");
    setModalCallback(null);
    setModalInputValue("");
  }, []); 

  const USUARIOS_VALIDOS = {
    "PONCECARLOS": "1414",
    "ALANCORREA": "1706",
  };

  const cargarRegistros = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tabla-registros')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error al cargar datos de Supabase:', error.message);
      showCustomAlert('Hubo un error al cargar los registros. Por favor, intente de nuevo.');
    } else {
      setRegistros(data);
      // Procesar clientes únicos y su conteo de préstamos
      const clientsMap = {};
      data.forEach(record => {
        const key = `${record.apellido}-${record.nombre}`;
        if (!clientsMap[key]) {
          clientsMap[key] = { apellido: record.apellido, nombre: record.nombre, loanCount: 0 };
        }
        clientsMap[key].loanCount++;
      });
      setAllClients(Object.values(clientsMap));
    }
    setLoading(false);
  }, [showCustomAlert]); 

  useEffect(() => {
    if (view !== "login") {
        cargarRegistros();
    }
  }, [view, cargarRegistros]); 

  const calcularMonto = () => {
    const monto = parseFloat(form.monto) || 0;
    const interes = parseFloat(form.interes) || 0;
    return monto + (monto * interes) / 100;
  };

  const calcularVencimiento = () => {
    const plazo = parseInt(form.plazo) || 0;
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + plazo);
    return fecha.toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
  if (!form.apellido || !form.nombre || !form.monto || !form.interes || !form.plazo) {
    showCustomAlert("Por favor, complete todos los campos antes de guardar el registro.");
    return;
  }

  // Calcular saldo actual
  const SALDO_INICIAL = 0.00;
  const totalEgresos = registros.filter(r => r.estado === "Activo").reduce((sum, prestamo) => sum + parseFloat(prestamo.monto || 0), 0);
  const totalIngresos = registros.filter(r => r.estado === "Pagado").reduce((sum, prestamo) => sum + parseFloat(prestamo.abonado || 0), 0);
  const saldoActual = SALDO_INICIAL - totalEgresos + totalIngresos;

  if (parseFloat(form.monto) > saldoActual) {
    showCustomAlert(`No se puede registrar un monto mayor al saldo actual del sistema ($${saldoActual.toFixed(2)}).`);
    return;
  }

  setLoading(true);
  const montoDevolverCalculado = calcularMonto();
  const vencimientoCalculado = calcularVencimiento();

  const { data, error } = await supabase
    .from('tabla-registros')
    .insert([
      {
        apellido: form.apellido,
        nombre: form.nombre,
        monto: parseFloat(form.monto),
        interes: parseFloat(form.interes),
        plazo: parseInt(form.plazo),
        montoDevolver: montoDevolverCalculado,
        vencimiento: vencimientoCalculado,
        estado: "Activo",
        abonado: null,
        created_at: new Date().toISOString().split('T')[0],
      },
    ])
    .select();

  if (error) {
    console.error('Error al insertar registro en Supabase:', error.message);
    showCustomAlert('Hubo un error al guardar el registro. Por favor, intente de nuevo.');
  } else if (data && data.length > 0) {
    setRegistros((prevRegistros) => [data[0], ...prevRegistros]);
    setForm({ apellido: "", nombre: "", monto: "", interes: "", plazo: "" });
    setView("registros");
  }
  setLoading(false);
};

  const sendWhatsAppNotification = useCallback((message) => {
    if (!whatsappNumber) {
      showCustomAlert("Por favor, configure el número de WhatsApp antes de enviar notificaciones.");
      return;
    }
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  }, [whatsappNumber, showCustomAlert]); 

  const performStateUpdate = async (id, nuevoEstado, abonadoMonto) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tabla-registros')
      .update({ estado: nuevoEstado, abonado: abonadoMonto })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error al actualizar estado en Supabase:', error.message);
      showCustomAlert('Hubo un error al actualizar el estado. Por favor, intente de nuevo.');
    } else if (data && data.length > 0) {
      setRegistros(
        registros.map((r) => (r.id === id ? data[0] : r))
      );

  const cambiarEstado = async (id, nuevoEstado) => {
    if (nuevoEstado === "Pagado") {
      const registroExistente = registros.find(r => r.id === id);
      if (!registroExistente) {
        showCustomAlert("Registro no encontrado.");
        return;
      }

      showCustomPrompt(
        `Ingrese el monto abonado para el ID ${id} (Monto a Devolver: $${registroExistente.montoDevolver.toFixed(2)}):`,
        (promptValue) => {
          const parsedAbonado = parseFloat(promptValue);

          if (isNaN(parsedAbonado)) {
            showCustomAlert("Monto inválido. El estado no ha sido cambiado a Pagado.");
            return;
          } else if (parsedAbonado < registroExistente.montoDevolver) {
            showCustomAlert(`El monto abonado ($${parsedAbonado.toFixed(2)}) no puede ser menor al monto a devolver ($${registroExistente.montoDevolver.toFixed(2)}).`);
            return;
          } else {
            performStateUpdate(id, nuevoEstado, parsedAbonado);
          }
        },
        registroExistente.montoDevolver.toFixed(2) 
      );
      return; 
    } else if (nuevoEstado === "Vencido") {
      showCustomConfirm(
        `¿Está seguro que desea marcar el registro ID ${id} como Vencido?`,
        () => {
          performStateUpdate(id, nuevoEstado, null);
        },
        () => {
          // El usuario canceló, no hacer nada
        }
      );
      return; 
    }

    performStateUpdate(id, nuevoEstado, null);
  };

  const capitalInvertido = registros
    .filter((r) => r.estado === "Activo")
    .reduce((acc, r) => acc + parseFloat(r.monto || 0), 0);

  const retornoCapitalInvertido = registros
    .filter((r) => r.estado === "Activo")
    .reduce((acc, r) => acc + parseFloat(r.montoDevolver || 0), 0);

  const ganancia = retornoCapitalInvertido - capitalInvertido;

  const totalAbonadoEnHistorial = registros
    .filter((r) => r.estado === "Pagado")
    .reduce((acc, r) => acc + (parseFloat(r.abonado || 0)), 0);

  const totalDemoraEnHistorial = registros
    .filter((r) => r.estado === "Pagado" && r.abonado > r.montoDevolver)
    .reduce((acc, r) => acc + (parseFloat(r.abonado || 0) - parseFloat(r.montoDevolver || 0)), 0);

  const manejarLogin = (e) => {
    e.preventDefault();
    const usuarioUpper = loginForm.usuario.toUpperCase();
    if (USUARIOS_VALIDOS[usuarioUpper] === loginForm.password) {
      setErrorLogin("");
      setLoggedInUser(usuarioUpper);
      setView("home");
    } else {
      setErrorLogin("Usuario o contraseña incorrectos");
    }
  };

  const SALDO_INICIAL = 0.00; 
  const handleSendDailyBalanceReport = () => {
    const currentTotalEgresos = registros.filter(r => r.estado === "Activo").reduce((sum, prestamo) => sum + parseFloat(prestamo.monto || 0), 0);
    const currentTotalIngresos = registros.filter(r => r.estado === "Pagado").reduce((sum, prestamo) => sum + parseFloat(prestamo.abonado || 0), 0);
    const currentSaldoActual = SALDO_INICIAL - currentTotalEgresos + currentTotalIngresos;

    const notificationMessage = `*Reporte de Saldo - Sistema de Registros de GRUPO CAPITAL:*\n\n` +
                                `Fecha: ${new Date().toLocaleDateString("es-ES")}\n\n` +
                                `Total Egresos: $${currentTotalEgresos.toFixed(2)}\n` +
                                `Total Ingresos: $${currentTotalIngresos.toFixed(2)}\n` +
                                `*Saldo Actual del Sistema: $${currentSaldoActual.toFixed(2)}*`;
    sendWhatsAppNotification(notificationMessage);
    showCustomAlert("Se está preparando el mensaje de WhatsApp con el reporte de saldo diario.");
  };

  const exportarHistorialCSV = () => {
    const encabezados = "ID,Apellido,Nombre,Monto Entregado,Interes,Plazo,Vencimiento,Monto a Devolver,Abonado,Demora\n";
    const filasCSV = registros
      .filter((r) => r.estado === "Pagado")
      .map((r) => {
        const demora =
          r.abonado > r.montoDevolver
            ? (r.abonado - r.montoDevolver).toFixed(2)
            : "0.00";
        const montoEntregado = parseFloat(r.monto).toFixed(2);
        const interes = parseFloat(r.interes).toFixed(2);
        const montoDevolver = parseFloat(r.montoDevolver).toFixed(2);
        const abonadoVal = r.abonado ? parseFloat(r.abonado).toFixed(2) : "0.00";

        const apellido = r.apellido.includes(',') ? `"${r.apellido}"` : r.apellido;
        const nombre = r.nombre.includes(',') ? `"${r.nombre}"` : r.nombre;

        return `${r.id},${apellido},${nombre},${montoEntregado},${interes},${r.plazo},${r.vencimiento},${montoDevolver},${abonadoVal},${demora}`;
      })
      .join("\n");

    const contenidoCSV = encabezados + filasCSV;
    const blob = new Blob([contenidoCSV], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "historial_registros_pagados.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      showCustomAlert("Tu navegador no soporta la descarga directa. Copia el texto y guárdalo como .csv");
      console.log(contenidoCSV);
    }
  };

  const handleApellidoChange = (e) => {
    const inputApellido = e.target.value;
    setForm({ ...form, apellido: inputApellido, nombre: "" }); // Reset nombre if apellido changes
    if (inputApellido.length > 0) {
      const filteredSuggestions = allClients.filter(
        (client) => client.apellido.toLowerCase().startsWith(inputApellido.toLowerCase())
      );
      setClientSuggestions(filteredSuggestions);
    } else {
      setClientSuggestions([]);
    }
  };

  const handleSuggestionClick = (client) => {
    setForm({ ...form, apellido: client.apellido, nombre: client.nombre });
    setClientSuggestions([]);
  };

  const handleEditClient = async (oldApellido, oldNombre, newApellido, newNombre) => {
    setLoading(true);
    const { error } = await supabase
      .from('tabla-registros')
      .update({ apellido: newApellido, nombre: newNombre })
      .eq('apellido', oldApellido)
      .eq('nombre', oldNombre);

    if (error) {
      console.error('Error al actualizar cliente en Supabase:', error.message);
      showCustomAlert('Hubo un error al actualizar los datos del cliente. Por favor, intente de nuevo.');
    } else {
      showCustomAlert('Datos del cliente actualizados exitosamente.');
      cargarRegistros(); // Recargar todos los registros para actualizar la vista de clientes
    }
    setLoading(false);
  };


  const pantallaLogin = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#0A0A0A", // Fondo negro oscuro
        fontFamily: "Roboto, sans-serif", // Fuente moderna
        color: "#E0E0E0", // Texto gris claro
      }}
    >
      <h1 style={{ marginBottom: 30, fontWeight: "bold", color: '#FFFFFF', fontSize: '38px', letterSpacing: '2px' }}>Iniciar Sesión</h1>
      <form onSubmit={manejarLogin} style={{ display: "flex", flexDirection: "column", width: 320, padding: '30px', backgroundColor: '#1A1A1A', borderRadius: '10px', boxShadow: '0 8px 25px rgba(0,0,0,0.7)' }}>
        <input
          type="text"
          placeholder="Usuario"
          value={loginForm.usuario}
          onChange={(e) => setLoginForm({ ...loginForm, usuario: e.target.value })}
          style={{ marginBottom: 20, padding: 15, fontSize: 18, border: '1px solid #333333', backgroundColor: '#2A2A2A', color: '#E0E0E0', borderRadius: '6px', outline: 'none' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
          style={{ marginBottom: 20, padding: 15, fontSize: 18, border: '1px solid #333333', backgroundColor: '#2A2A2A', color: '#E0E0E0', borderRadius: '6px', outline: 'none' }}
        />
        {errorLogin && <div style={{ color: "#FF6B6B", marginBottom: 15, fontSize: '15px' }}>{errorLogin}</div>}
        <button
          type="submit"
          style={{
            padding: 15,
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#333333", // Gris oscuro
            color: "#FFFFFF", // Texto blanco
            border: "none",
            borderRadius: 6,
            boxShadow: '0 3px 8px rgba(0,0,0,0.5)',
            fontSize: '18px',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            '&:hover': {
              backgroundColor: '#555555',
              transform: 'translateY(-2px)',
            }
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );

const pantallaInicio = (
    <div style={{ textAlign: "center", padding: 50, fontFamily: "Roboto, sans-serif", backgroundColor: "#0A0A0A", minHeight: "100vh", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1
    style={{
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: "52px",
        marginBottom: "30px",
        letterSpacing: "4px",
        textShadow: "4px 4px 10px rgba(0,0,0,0.8)",
        background: 'none', // Quitamos el gradiente para que sea blanco puro
        WebkitBackgroundClip: 'initial',
        WebkitTextFillColor: 'initial',
        animation: 'none',
        display: 'inline-block',
    }}
>
    <span style={{color: '#FFFFFF'}}>Bienvenido al Sistema de Gestión de </span>
    <span style={{color: '#FFFFFF'}}>GRUPO CAPITAL</span>
</h1>
        <style>{`
            @keyframes shine {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
            }
        `}</style>

        <div
            style={{
                marginTop: "50px",
                backgroundColor: "#1A1A1A",
                border: "1px solid #333333",
                borderRadius: "12px",
                padding: "40px",
                maxWidth: "800px",
                margin: "50px auto 30px auto",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.8)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "25px",
                justifyItems: "center",
                width: '90%',
                boxSizing: 'border-box',
                justifyContent: 'center',
            }}
        >
            {/* ... Tus botones actuales ... */}
            <button
                style={ESTILOS.button}
                onClick={() => setView("nuevo")}
            >
                <PlusCircle size={26} /> Nuevo Registro
            </button>
            <button
                style={ESTILOS.button}
                onClick={() => setView("registros")}
            >
                <List size={26} /> Registros Activos
            </button>
            <button
                style={ESTILOS.button}
                onClick={() => setView("historial")}
            >
                <List size={26} /> Registros Pagados
            </button>
            <button
                style={ESTILOS.button}
                onClick={() => setView("auditoria")}
            >
                <BarChart2 size={26} /> Auditoría
            </button>
            <button
                style={ESTILOS.button}
                onClick={() => setView("calendario")}
            >
                <CalendarDays size={26} /> Calendario
            </button>
            <button
                style={ESTILOS.button}
                onClick={() => setView("clientes")}
            >
                <Users size={26} /> Clientes
            </button>
        </div>
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#777777' }}>
            Derechos Reservados <strong>Finestra</strong>
        </p>
    </div>
);

  const pantallaNuevo = (
    <div style={{ color: "#E0E0E0", padding: 30, backgroundColor: "#0A0A0A", fontFamily: "Roboto, sans-serif", paddingTop: "80px", borderRadius: '10px', boxShadow: '0 8px 25px rgba(0,0,0,0.7)', maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ fontWeight: "bold", color: '#FFFFFF', marginBottom: '30px', fontSize: '32px', textAlign: 'center' }}>Nuevo Registro</h2>
      {loading && <p style={{color: '#B0B0B0', textAlign: 'center'}}>Cargando...</p>}
      
      <div style={{ position: 'relative', margin: "12px 0" }}>
        <input
          style={{ padding: "14px", fontSize: "17px", width: "calc(100% - 28px)", border: '1px solid #333333', backgroundColor: '#2A2A2A', color: '#E0E0E0', borderRadius: '6px', outline: 'none' }}
          placeholder="Apellido"
          type="text"
          value={form.apellido}
          onChange={handleApellidoChange}
        />
        {clientSuggestions.length > 0 && (
          <ul style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#2A2A2A',
            border: '1px solid #333333',
            borderRadius: '0 0 6px 6px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            zIndex: 100,
            maxHeight: '200px',
            overflowY: 'auto',
          }}>
            {clientSuggestions.map((client, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(client)}
                style={{
                  padding: '10px 14px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #333333',
                  color: '#E0E0E0',
                  '&:hover': {
                    backgroundColor: '#3A3A3A',
                  },
                  '&:last-child': {
                    borderBottom: 'none',
                  }
                }}
              >
                {client.apellido}, {client.nombre}
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        style={{ margin: "12px 0", padding: "14px", fontSize: "17px", width: "calc(100% - 28px)", border: '1px solid #333333', backgroundColor: '#2A2A2A', color: '#E0E0E0', borderRadius: '6px', outline: 'none' }}
        placeholder="Nombre"
        type="text"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />

      {["Monto", "Interés (%)", "Plazo (días)"].map((label, i) => {
        const field = ["monto", "interes", "plazo"][i];
        return (
          <input
            key={label}
            style={{ margin: "12px 0", padding: "14px", fontSize: "17px", width: "calc(100% - 28px)", border: '1px solid #333333', backgroundColor: '#2A2A2A', color: '#E0E0E0', borderRadius: '6px', outline: 'none' }}
            placeholder={label}
            type="number"
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        );
      })}
      <p style={{color: '#B0B0B0', fontSize: '18px', marginTop: '20px'}}><b>Monto a devolver:</b> <span style={{color: '#FFFFFF'}}>${calcularMonto().toFixed(2)}</span></p>
      <p style={{color: '#B0B0B0', fontSize: '18px', marginBottom: '30px'}}><b>Fecha de vencimiento:</b> <span style={{color: '#FFFFFF'}}>{calcularVencimiento()}</span></p>
      <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center'}}>
        <button
          style={ESTILOS.button}
          onClick={handleSubmit}
          disabled={loading}
        >
          <PlusCircle size={22} /> Guardar
        </button>
        <button
          style={ESTILOS.button}
          onClick={() => setView("home")}
        >
          <Home size={22} /> Volver al Inicio
        </button>
      </div>
    </div>
  );

  const pantallaRegistros = (
    <div style={{ color: "#E0E0E0", padding: 30, backgroundColor: "#0A0A0A", fontFamily: "Roboto, sans-serif", paddingTop: "80px", minHeight: "100vh" }}>
      <DashboardResumen
        capitalInvertido={capitalInvertido}
        retornoCapitalInvertido={retornoCapitalInvertido}
        ganancia={ganancia}
      />
      <h2 style={{ textAlign: "center", marginTop: 50, marginBottom: '30px', color: '#FFFFFF', fontSize: '32px' }}>Registros Activos</h2>
      {loading ? (
        <p style={{ textAlign: "center", fontSize: "20px", color: '#B0B0B0' }}>Cargando registros...</p>
      ) : (
        <table
          style={{
            width: "100%",
            background: "#1A1A1A", 
            color: "#E0E0E0", 
            marginTop: 20,
            borderCollapse: "collapse", // Asegurar que los bordes se colapsen
            fontSize: "15px",
            borderRadius: '8px',
            overflow: 'hidden', // Para que los bordes redondeados se apliquen correctamente a la tabla
            boxShadow: '0 6px 15px rgba(0,0,0,0.6)',
          }}
        >
          <thead>
            <tr>
              {["ID", "Apellido", "Nombre", "Monto Entregado", "Interés", "Plazo", "Vencimiento", "Monto a Devolver", "Estado", "Acciones"].map((col) => (
                <th key={col} style={ESTILOS.th}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registros
              .filter((r) => r.estado !== "Pagado")
              .map((r) => (
                <tr key={r.id} style={{ textAlign: "center" }}>
                  <td style={ESTILOS.td}>{r.id}</td>
                  <td style={ESTILOS.td}>{r.apellido}</td>
                  <td style={ESTILOS.td}>{r.nombre}</td>
                  <td style={ESTILOS.td}>${parseFloat(r.monto).toFixed(2)}</td>
                  <td style={ESTILOS.td}>{r.interes}%</td>
                  <td style={ESTILOS.td}>{r.plazo} días</td>
                  <td style={ESTILOS.td}>{r.vencimiento}</td>
                  <td style={ESTILOS.td}>${r.montoDevolver.toFixed(2)}</td>
                  <td style={{ ...ESTILOS.td, fontWeight: 'bold', color: r.estado === 'Activo' ? '#6BFF6B' : '#FF6B6B' }}>{r.estado}</td> {/* Colores para estado */}
                  <td style={ESTILOS.td}>
                    <select
                      value={r.estado}
                      onChange={(e) => cambiarEstado(r.id, e.target.value)}
                      style={{ padding: "8px", fontSize: "14px", border: '1px solid #555555', backgroundColor: '#2A2A2A', color: '#E0E0E0', borderRadius: '4px', outline: 'none' }}
                      disabled={loading}
                    >
                      <option value="Activo">Activo</option>
                      <option value="Pagado">Pagado</option>
                      <option value="Vencido">Vencido</option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '40px'}}>
        <button
          style={ESTILOS.button}
          onClick={() => setView("nuevo")}
        >
          <PlusCircle size={22} /> Nuevo Registro
        </button>
        <button
          style={ESTILOS.button}
          onClick={() => setView("home")}
        >
          <Home size={22} /> Volver al Inicio
        </button>
        <button
          style={ESTILOS.button}
          onClick={() => setView("historial")}
        >
          <List size={22} /> Ver Registros Pagados
        </button>
      </div>
    </div>
  );

  const pantallaHistorial = (
    <div style={{ color: "#E0E0E0", padding: 30, backgroundColor: "#0A0A0A", fontFamily: "Roboto, sans-serif", paddingTop: "80px", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: '#FFFFFF', fontSize: '32px', marginBottom: '30px' }}>Registros Pagados</h2>
      <DashboardHistorial
        totalAbonado={totalAbonadoEnHistorial}
        totalDemora={totalDemoraEnHistorial}
      />
      {loading ? (
        <p style={{ textAlign: "center", fontSize: "20px", color: '#B0B0B0' }}>Cargando registros...</p>
      ) : (
        <table
          style={{
            width: "100%",
            background: "#1A1A1A", 
            color: "#E0E0E0", 
            marginTop: 20,
            borderCollapse: "collapse", 
            fontSize: "15px",
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 6px 15px rgba(0,0,0,0.6)',
          }}
        >
          <thead>
            <tr>
              {["ID", "Apellido", "Nombre", "Monto", "Interés", "Plazo", "Vencimiento", "Devolver", "Abonado", "Demora"].map((col) => (
                <th key={col} style={ESTILOS.th}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registros
              .filter((r) => r.estado === "Pagado")
              .map((r) => {
                const demora =
                  r.abonado > r.montoDevolver
                    ? (r.abonado - r.montoDevolver).toFixed(2)
                    : "0.00";
                return (
                  <tr key={r.id} style={{ textAlign: "center" }}>
                    <td style={ESTILOS.td}>{r.id}</td>
                    <td style={ESTILOS.td}>{r.apellido}</td>
                    <td style={ESTILOS.td}>{r.nombre}</td>
                    <td style={ESTILOS.td}>${parseFloat(r.monto).toFixed(2)}</td>
                    <td style={ESTILOS.td}>{r.interes}%</td>
                    <td style={ESTILOS.td}>{r.plazo} días</td>
                    <td style={ESTILOS.td}>{r.vencimiento}</td>
                    <td style={ESTILOS.td}>${r.montoDevolver.toFixed(2)}</td>
                    <td style={ESTILOS.td}>${r.abonado?.toFixed(2)}</td>
                    <td style={{ ...ESTILOS.td, color: demora !== "0.00" ? '#FF6B6B' : '#6BFF6B' }}>${demora}</td> {/* Color para demora */}
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '40px'}}>
        <button
          style={ESTILOS.button}
          onClick={exportarHistorialCSV}
        >
          <Download size={22} /> Exportar a CSV
        </button>
        <button
          style={ESTILOS.button}
          onClick={() => setView("home")}
        >
          <Home size={22} /> Volver al Inicio
        </button>
        <button
          style={ESTILOS.button}
          onClick={() => setView("registros")}
        >
          <List size={22} /> Volver a Registros Activos
        </button>
      </div>
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: "#0A0A0A", // Fondo global de la aplicación
        minHeight: "100vh",
        color: "#E0E0E0", 
        fontFamily: "Roboto, sans-serif", // Aplicar fuente global
      }}
    >
      {view !== "login" && <StatusBar usuario={loggedInUser} />}
      {view === "login" && pantallaLogin}
      {view === "home" && pantallaInicio}
      {view === "nuevo" && pantallaNuevo}
      {view === "registros" && pantallaRegistros}
      {view === "historial" && pantallaHistorial}
      {view === "auditoria" && (
        <AuditoriaPrestamos
          registros={registros}
          cambiarEstado={cambiarEstado}
          setView={setView}
          onSendDailyBalanceReport={handleSendDailyBalanceReport}
          retornoCapitalInvertido={retornoCapitalInvertido} 
        />
      )}
      {view === "calendario" && (
        <PantallaCalendario
          setView={setView}
          registros={registros}
          showCustomAlert={showCustomAlert} 
        />
      )}
      {view === "clientes" && (
        <PantallaClientes
          setView={setView}
          clientes={allClients}
          onEditClient={handleEditClient}
          loading={loading}
          showCustomAlert={showCustomAlert}
        />
      )}


      {/* Renderizar el Modal si está visible */}
      {modalVisible && (
        <Modal
          message={modalMessage}
          type={modalType}
          onClose={closeModal}
          onConfirm={() => {
            if (modalType === 'prompt' || modalType === 'whatsappConfig') {
              modalCallback(modalInputValue);
            } else if (modalType === 'confirm') {
              modalCallback.onConfirm();
            } else if (modalType === 'editClient') { // Para el modal de edición de cliente
              // La confirmación ya se maneja dentro de PantallaClientes
              // Se pasa la función de confirmación desde App a PantallaClientes
            }
            closeModal();
          }}
          onCancel={() => {
            if (modalType === 'confirm') {
              modalCallback.onCancel();
            }
            closeModal();
          }}
          onInputChange={(e) => setModalInputValue(e.target.value)}
          inputValue={modalInputValue}
        />
      )}
    </div>
  );
}

export default App;
