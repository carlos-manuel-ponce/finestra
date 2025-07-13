import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabaseClient";
import { PlusCircle, List, BarChart2, Bell, Settings, Download, Home, CalendarDays, ChevronLeft, ChevronRight, Eye } from 'lucide-react'; // Importa los iconos de Lucide React

// --- Componente Modal Personalizado ---
const Modal = ({ message, type, onConfirm, onCancel, onClose, onInputChange, inputValue, children }) => {
  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  };

  const contentStyle = {
    backgroundColor: '#F8F8F8', // Fondo del modal claro
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    maxWidth: type === 'details' ? '600px' : '400px', // Más ancho para detalles
    width: '90%',
    textAlign: 'center',
    color: '#666666', // Texto gris
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #CCCCCC', // Borde gris claro
    maxHeight: '80vh', // Limitar altura para scroll
    overflowY: 'auto', // Scroll si el contenido es largo
  };

  const buttonContainerStyle = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#1a2b40', // Azul marino oscuro para botones
    color: '#FFFFFF', // Texto blanco
    border: '1px solid #CCCCCC', // Borde gris claro
    borderRadius: '4px',
    fontSize: '16px',
  };

  const cancelButtonLightStyle = {
    ...buttonStyle,
    backgroundColor: '#999999', // Gris medio para cancelar
    color: '#FFFFFF',
    border: '1px solid #CCCCCC',
  };

  const inputStyle = {
    width: 'calc(100% - 20px)',
    padding: '10px',
    margin: '15px 0',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #CCCCCC', // Borde gris claro
    color: '#666666', // Texto gris
  };

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>{message}</p>
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
        {children} {/* Para contenido dinámico como los detalles del préstamo */}
        <div style={buttonContainerStyle}>
          {(type === 'confirm' || type === 'prompt' || type === 'whatsappConfig') && (
            <button style={buttonStyle} onClick={onConfirm}>
              Aceptar
            </button>
          )}
          {(type === 'confirm' || type === 'prompt' || type === 'whatsappConfig') && (
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
        backgroundColor: "#1a2b40", // Azul marino oscuro
        color: "#FFFFFF", // Texto blanco
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-around", // Mejorar la distribución
        alignItems: "center",
        zIndex: 1000,
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <div>
        <strong>Usuario:</strong> {usuario}
      </div>
      <div>
        <strong>Fecha:</strong> {formattedDate}
      </div>
      <div>
        <strong>Hora:</strong> {formattedTime}
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
    backgroundColor: "#FFFFFF", // Fondo blanco
    padding: "40px",
    gap: "20px",
    flexWrap: "wrap",
    fontFamily: "Arial, sans-serif",
    color: "#666666", // Texto gris
  };

  const cardStyle = {
    backgroundColor: "#F8F8F8", // Fondo de tarjeta casi blanco
    color: "#666666", // Texto gris
    padding: "20px",
    borderRadius: "4px",
    border: "2px solid #1a2b40", // Borde azul marino oscuro
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    minWidth: "250px",
    flex: "1 1 auto",
    boxShadow: "3px 3px 6px #CCCCCC", // Sombra gris claro
  };

  const titleStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
    borderBottom: "1px solid #1a2b40", // Borde inferior azul marino oscuro
    paddingBottom: "6px",
    letterSpacing: "1px",
    color: "#1a2b40", // Título azul marino oscuro
  };

  const valueStyle = {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#666666", // Valor gris
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
    backgroundColor: "#FFFFFF", // Fondo blanco
    padding: "20px",
    gap: "20px",
    flexWrap: "wrap",
    fontFamily: "Arial, sans-serif",
    color: "#666666", // Texto gris
    marginTop: "20px"
  };
  
  const cardStyle = {
    backgroundColor: "#F8F8F8", // Fondo de tarjeta casi blanco
    color: "#666666", // Texto gris
    padding: "15px",
    borderRadius: "4px",
    border: "2px solid #1a2b40", // Borde azul marino oscuro
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    minWidth: "200px",
    flex: "1 1 auto",
    boxShadow: "3px 3px 6px #CCCCCC", // Sombra gris claro
  };
  
  const titleStyle = {
    fontSize: "15px",
    fontWeight: "bold",
    marginBottom: "8px",
    borderBottom: "1px solid #1a2b40", // Borde inferior azul marino oscuro
    paddingBottom: "5px",
    letterSpacing: "1px",
    color: "#1a2b40", // Título azul marino oscuro
  };
  
  const valueStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#666666", // Valor gris
  };
  
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={titleStyle}>TOTAL ABONADO</div>
        <div style={valueStyle}>${seguro(totalAbonado)}</div>
      </div>
      <div style={cardStyle}>
        <div style={titleStyle}>TOTAL DEMORA</div>
        <div style={valueStyle}>${seguro(totalDemora)}</div>
      </div>
    </div>
  );
};

// Mover ESTILOS aquí, fuera de cualquier componente
const ESTILOS = {
  card: {
    backgroundColor: "#F8F8F8", // Fondo de tarjeta casi blanco
    padding: "20px",
    borderRadius: "4px",
    border: "2px solid #1a2b40", // Borde azul marino oscuro
    marginBottom: "20px",
    boxShadow: "3px 3px 6px #CCCCCC", // Sombra gris claro
  },
  // La propiedad 'table' se ha eliminado de aquí y se ha inlined en el componente AuditoriaPrestamos
  th: {
    border: '1px solid #CCCCCC', // Borde gris claro
    padding: '8px',
    backgroundColor: '#1a2b40', // Azul marino oscuro
    color: '#FFFFFF' // Texto blanco
  },
  td: {
    border: '1px solid #CCCCCC', // Borde gris claro
    padding: '8px',
    color: '#666666', // Texto gris
  },
  button: {
    padding: '12px 24px',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#1a2b40', // Azul marino oscuro
    color: '#FFFFFF', // Texto blanco
    border: '1px solid #CCCCCC', // Borde gris claro
    borderRadius: '4px',
    fontSize: '16px',
    display: 'flex', // Para alinear icono y texto
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px', // Espacio entre icono y texto
    boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' // Sombra para botones
  }
};

const AuditoriaPrestamos = ({ registros, cambiarEstado, setView, onSendDailyBalanceReport }) => {
  // Saldo inicial fijo (se edita directamente en el código)
  const SALDO_INICIAL = 0.00;
  
  // Calcular saldo actual
  const prestamosActivos = registros.filter(r => r.estado === "Activo");
  const prestamosPagados = registros.filter(r => r.estado === "Pagado");
  
  const totalEgresos = prestamosActivos.reduce((sum, prestamo) => sum + parseFloat(prestamo.monto || 0), 0);
  const totalIngresos = prestamosPagados.reduce((sum, prestamo) => sum + parseFloat(prestamo.abonado || 0), 0);
  
  const saldoActual = SALDO_INICIAL - totalEgresos + totalIngresos;

  // Preparar datos para el gráfico de egresos e ingresos
  const dailyData = {};
  // Para un gráfico de velas o barras, necesitamos agrupar por fecha.
  // Usaremos la fecha de vencimiento como el punto de referencia principal para cada préstamo.
  // Si un préstamo se activa o paga en una fecha diferente a su vencimiento,
  // idealmente necesitaríamos campos `fechaActivacion` y `fechaPago` en la base de datos.
  // Por ahora, para simplificar y usar los datos existentes, asumiremos que
  // los egresos/ingresos se registran en la fecha de vencimiento o la fecha actual (simulada).
  registros.forEach(registro => {
    // Usar la fecha de vencimiento para agrupar los datos
    const date = registro.vencimiento; 
    if (!dailyData[date]) {
      dailyData[date] = { ingresos: 0, egresos: 0 };
    }
    if (registro.estado === 'Activo') {
      dailyData[date].egresos += parseFloat(registro.monto || 0);
    } else if (registro.estado === 'Pagado') {
      dailyData[date].ingresos += parseFloat(registro.abonado || 0);
    }
  });

  const sortedDates = Object.keys(dailyData).sort();
  const maxAmount = Math.max(...Object.values(dailyData).flatMap(d => [d.ingresos, d.egresos, 1])); // Evitar división por cero
  const chartHeight = 200; // Altura fija para el gráfico

  return (
    <div style={{ paddingTop: "70px", maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: "center", marginBottom: '30px', color: '#1a2b40' }}>Auditoría de Préstamos (EN DESARROLLO)</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={ESTILOS.card}>
          <h3 style={{ marginTop: 0, color: '#1a2b40' }}>Saldo del Sistema</h3>
          <p style={{color: '#666666'}}><strong>Total Egresos:</strong> ${totalEgresos.toFixed(2)}</p>
          <p style={{color: '#666666'}}><strong>Total Ingresos:</strong> ${totalIngresos.toFixed(2)}</p>
          <p style={{color: '#666666'}}><strong>Saldo Actual:</strong> ${saldoActual.toFixed(2)}</p>
        </div>
      </div>
      
      <div style={ESTILOS.card}>
        <h3 style={{ marginTop: 0, color: '#1a2b40' }}>Flujo Diario de Fondos</h3>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: chartHeight + 'px', borderBottom: '1px solid #CCCCCC', paddingBottom: '5px' }}>
          {sortedDates.map(date => {
            const data = dailyData[date];
            const ingresoHeight = (data.ingresos / maxAmount) * chartHeight;
            const egresoHeight = (data.egresos / maxAmount) * chartHeight;
            return (
              <div key={date} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30px', margin: '0 5px' }}>
                <div 
                  title={`Ingresos: $${data.ingresos.toFixed(2)}`}
                  style={{ 
                    width: '20px', 
                    height: ingresoHeight + 'px', 
                    backgroundColor: 'lightgreen', 
                    marginBottom: '2px',
                    borderRadius: '2px',
                  }}
                ></div>
                <div 
                  title={`Egresos: $${data.egresos.toFixed(2)}`}
                  style={{ 
                    width: '20px', 
                    height: egresoHeight + 'px', 
                    backgroundColor: 'salmon', 
                    borderRadius: '2px',
                  }}
                ></div>
                <span style={{ fontSize: '10px', color: '#666666', marginTop: '5px' }}>{date.substring(5)}</span> {/* Muestra solo MM-DD */}
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '10px', color: '#666666' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: 'lightgreen', borderRadius: '2px', marginRight: '5px' }}></span> Ingresos &nbsp;
          <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: 'salmon', borderRadius: '2px', marginRight: '5px' }}></span> Egresos
        </p>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button 
          onClick={() => setView("home")} 
          style={ESTILOS.button}
        >
          <Home size={20} /> Volver al Inicio
        </button>
        <button 
          onClick={onSendDailyBalanceReport} // Botón para enviar reporte diario por WhatsApp
          style={ESTILOS.button}
        >
          <Bell size={20} /> Enviar Reporte Diario (WhatsApp)
        </button>
      </div>
    </div>
  );
};

// Nuevo componente para el Calendario
const PantallaCalendario = ({ setView, registros, showCustomAlert }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [filter, setFilter] = useState('all'); // 'all', 'activo', 'pagado', 'vencimiento', 'activoPagado'
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const numDays = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay(); // 0 for Sunday, 1 for Monday

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null); // Placeholder for days before the 1st
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
      // Check for vencimiento
      if (registro.vencimiento === formattedDay) {
        allEventsForDay.push({ type: 'vencimiento', id: registro.id, ...registro });
      }
      // Simulate creation/payment dates for calendar display
      // IMPORTANT: In a real application, you should have actual date fields for 'fechaActivacion' and 'fechaPago'
      // For this example, we're using current date as a proxy for 'activo' and 'pagado' events on the current day,
      // and 'vencimiento' as the actual date from the record.
      const todayFormatted = new Date().toISOString().split('T')[0];
      if (registro.estado === 'Activo' && formattedDay === todayFormatted) { // This will only show 'activo' on the current real-world date
        allEventsForDay.push({ type: 'activo', id: registro.id, ...registro });
      }
      if (registro.estado === 'Pagado' && formattedDay === todayFormatted && registro.abonado) { // This will only show 'pagado' on the current real-world date
        allEventsForDay.push({ type: 'pagado', id: registro.id, ...registro });
      }
    });

    return allEventsForDay.filter(event => {
      if (filter === 'all') {
        return true;
      } else if (filter === 'activo') {
        return event.type === 'activo';
      } else if (filter === 'pagado') {
        return event.type === 'pagado';
      } else if (filter === 'vencimiento') {
        return event.type === 'vencimiento';
      } else if (filter === 'activoPagado') { // "Activos y Pagados"
        return event.type === 'activo' || event.type === 'pagado';
      }
      return false; // Should not be reached if filter is one of the above
    });
  };

  const eventColor = {
    vencimiento: 'red',
    activo: 'green',
    pagado: 'blue',
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
    <div style={{ paddingTop: "70px", maxWidth: '1000px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: "center", marginBottom: '20px', color: '#1a2b40' }}>Calendario de Préstamos  (EN DESARROLLO)</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button 
          onClick={goToPreviousMonth} 
          style={{ padding: '8px 15px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
        >
          <ChevronLeft size={16} /> Mes Anterior
        </button>
        <h3 style={{ textAlign: "center", margin: '0', color: '#666666' }}>{monthName}</h3>
        <button 
          onClick={goToNextMonth} 
          style={{ padding: '8px 15px', fontWeight: 'bold', cursor: "pointer", backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
        >
          Mes Siguiente <ChevronRight size={16} />
        </button>
      </div>

      {/* Filtros del calendario */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px', color: '#666666' }}>
        <label>
          <input 
            type="radio" 
            value="all" 
            checked={filter === 'all'} 
            onChange={() => setFilter('all')} 
            style={{ marginRight: '5px' }}
          />
          Todos
        </label>
        <label>
          <input 
            type="radio" 
            value="activo" 
            checked={filter === 'activo'} 
            onChange={() => setFilter('activo')} 
            style={{ marginRight: '5px' }}
          />
          Activos
        </label>
        <label>
          <input 
            type="radio" 
            value="pagado" 
            checked={filter === 'pagado'} 
            onChange={() => setFilter('pagado')} 
            style={{ marginRight: '5px' }}
          />
          Pagados
        </label>
        <label>
          <input 
            type="radio" 
            value="activoPagado" 
            checked={filter === 'activoPagado'} 
            onChange={() => setFilter('activoPagado')} 
            style={{ marginRight: '5px' }}
          />
          Activos y Pagados
        </label>
        <label>
          <input 
            type="radio" 
            value="vencimiento" 
            checked={filter === 'vencimiento'} 
            onChange={() => setFilter('vencimiento')} 
            style={{ marginRight: '5px' }}
          />
          Vencimientos
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', marginBottom: '20px' }}>
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} style={{ fontWeight: 'bold', textAlign: 'center', color: '#1a2b40' }}>{day}</div>
        ))}
        {daysInMonth.map((day, index) => {
          const events = day ? getEventsForDay(day) : [];
          return (
            <div 
              key={index} 
              style={{ 
                border: '1px solid #CCCCCC', 
                borderRadius: '4px', 
                padding: '10px 5px', 
                minHeight: '80px', 
                textAlign: 'right', 
                position: 'relative',
                backgroundColor: day ? '#F8F8F8' : '#E0E0E0', // Fondo para días vacíos
                color: '#666666',
                cursor: day ? 'pointer' : 'default', // Cursor de puntero para días con contenido
              }}
              onClick={() => handleDayClick(day)}
            >
              {day && <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{day.getDate()}</div>}
              {events.length > 0 && (
                <div style={{ position: 'absolute', top: '5px', left: '5px' }}>
                  <Eye size={16} color="#1a2b40" />
                </div>
              )}
              <div style={{ position: 'absolute', bottom: '5px', left: '5px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {events.map((event, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: '10px', marginTop: '2px' }}>
                    <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: eventColor[event.type], marginRight: '4px' }}></span>
                    <span>{event.type === 'vencimiento' ? 'Vence' : event.type === 'activo' ? 'Activo' : 'Pagado'}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          onClick={() => setView("home")} 
          style={{ padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', fontSize: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
        >
          <Home size={20} /> Volver al Inicio
        </button>
      </div>

      {detailsModalVisible && (
        <Modal
          message="Detalles de Préstamos del Día"
          type="details"
          onClose={() => setDetailsModalVisible(false)}
        >
          <div style={{ textAlign: 'left', marginTop: '10px', color: '#666666' }}>
            {selectedDayEvents.map(event => (
              <div key={event.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #E0E0E0', borderRadius: '4px', backgroundColor: '#F0F0F0' }}>
                <strong>Tipo:</strong> <span style={{ color: eventColor[event.type] }}>{event.type === 'vencimiento' ? 'Vencimiento' : event.type === 'activo' ? 'Activo' : 'Pagado'}</span><br/>
                <strong>ID:</strong> {event.id}<br/>
                <strong>Cliente:</strong> {event.nombre} {event.apellido}<br/>
                <strong>Monto Entregado:</strong> ${parseFloat(event.monto).toFixed(2)}<br/>
                <strong>Monto a Devolver:</strong> ${parseFloat(event.montoDevolver).toFixed(2)}<br/>
                {/* {event.abonado && <strong>Monto Abonado:</strong> ${parseFloat(event.abonado).toFixed(2)}<br/>} */}
                <strong>Vencimiento:</strong> {event.vencimiento}
              </div>
            ))}
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

  // Estado para el número de WhatsApp, inicializado desde localStorage o un valor predeterminado
  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    const savedNumber = localStorage.getItem('whatsappNumber');
    return savedNumber || '5491112345678'; // Número predeterminado si no hay uno guardado
  });

  // --- Estados y funciones para el Modal personalizado ---
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("alert"); // 'alert', 'confirm', 'prompt', 'whatsappConfig'
  const [modalCallback, setModalCallback] = useState(null);
  const [modalInputValue, setModalInputValue] = useState(""); // Usado para prompt y whatsappConfig

  // Envuelve showCustomAlert con useCallback
  const showCustomAlert = useCallback((message, callback = () => {}) => {
    setModalMessage(message);
    setModalType("alert");
    setModalCallback(() => callback);
    setModalVisible(true);
  }, []); // Dependencias vacías porque setModalMessage, setModalType, etc. son estables

  // Envuelve showCustomConfirm con useCallback
  const showCustomConfirm = useCallback((message, onConfirm, onCancel = () => {}) => {
    setModalMessage(message);
    setModalType("confirm");
    setModalCallback(() => ({ onConfirm, onCancel }));
    setModalVisible(true);
  }, []); // Dependencias vacías

  // Envuelve showCustomPrompt con useCallback
  const showCustomPrompt = useCallback((message, onPromptConfirm, initialValue = "") => {
    setModalMessage(message);
    setModalType("prompt");
    setModalInputValue(initialValue);
    setModalCallback(() => onPromptConfirm);
    setModalVisible(true);
  }, []); // Dependencias vacías

  // Nueva función para mostrar el modal de configuración de WhatsApp
  const showWhatsappConfigModal = useCallback(() => {
    setModalMessage("Configurar Número de WhatsApp para Notificaciones:");
    setModalType("whatsappConfig");
    setModalInputValue(whatsappNumber); // Pre-llenar con el número actual
    setModalCallback(() => (newNumber) => {
      setWhatsappNumber(newNumber);
      localStorage.setItem('whatsappNumber', newNumber);
      showCustomAlert("Número de WhatsApp guardado exitosamente.");
    });
    setModalVisible(true);
  }, [whatsappNumber, showCustomAlert]); // Depende de whatsappNumber y showCustomAlert

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setModalMessage("");
    setModalType("alert");
    setModalCallback(null);
    setModalInputValue("");
  }, []); // Dependencias vacías

  // --- Fin Estados y funciones para el Modal personalizado ---

  const USUARIOS_VALIDOS = {
    "PONCECARLOS": "1414",
    "ALANCORREA": "1706",
  };

  // Envuelve cargarRegistros con useCallback
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
    }
    setLoading(false);
  }, [showCustomAlert]); // showCustomAlert ahora es una dependencia estable

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

      // --- WhatsApp Notification for New Active Record ---
      const newRecord = data[0];
      const notificationMessage = `*Nuevo Registro Activo en Sistema de Registros de GRUPO CAPITAL:*\n\n` +
                                  `ID: ${newRecord.id}\n` +
                                  `Cliente: ${newRecord.nombre} ${newRecord.apellido}\n` +
                                  `Monto Entregado: $${parseFloat(newRecord.monto).toFixed(2)}\n` +
                                  `Monto a Devolver: $${parseFloat(newRecord.montoDevolver).toFixed(2)}\n` +
                                  `Vencimiento: ${newRecord.vencimiento}\n` +
                                  `Estado: Activo`;
      sendWhatsAppNotification(notificationMessage);
      // --- End WhatsApp Notification ---
    }
    setLoading(false);
  };

  // Función para enviar notificaciones de WhatsApp (ahora local a App)
  const sendWhatsAppNotification = useCallback((message) => {
    if (!whatsappNumber) {
      showCustomAlert("Por favor, configure el número de WhatsApp antes de enviar notificaciones.");
      return;
    }
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  }, [whatsappNumber, showCustomAlert]); // Depende de whatsappNumber y showCustomAlert

  // Helper function to encapsulate the actual Supabase update logic
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

      // --- WhatsApp Notification for Paid Record ---
      if (nuevoEstado === "Pagado") {
        const updatedRecord = data[0];
        const notificationMessage = `*Registro Abonado en Sistema de Registros de GRUPO CAPITAL:*\n\n` +
                                    `ID: ${updatedRecord.id}\n` +
                                    `Cliente: ${updatedRecord.nombre} ${updatedRecord.apellido}\n` +
                                    `Monto a Devolver: $${parseFloat(updatedRecord.montoDevolver).toFixed(2)}\n` +
                                    `Monto Abonado: $${parseFloat(updatedRecord.abonado).toFixed(2)}\n` +
                                    `Estado: Pagado`;
        sendWhatsAppNotification(notificationMessage);
      }
      // --- End WhatsApp Notification ---
    }
    setLoading(false);
  };

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
        registroExistente.montoDevolver.toFixed(2) // Valor inicial para el prompt
      );
      return; // Salir de la función, la actualización se maneja en el callback del prompt
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
      return; // Salir de la función, la actualización se maneja en el callback del confirm
    }

    // Si no es 'Pagado' o 'Vencido', realizar la actualización directa
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

  const SALDO_INICIAL = 0.00; // Definido aquí para que handleSendDailyBalanceReport pueda accederlo
  const handleSendDailyBalanceReport = () => {
    const currentTotalEgresos = registros.filter(r => r.estado === "Activo").reduce((sum, prestamo) => sum + parseFloat(prestamo.monto || 0), 0);
    const currentTotalIngresos = registros.filter(r => r.estado === "Pagado").reduce((sum, prestamo) => sum + parseFloat(prestamo.abonado || 0), 0);
    const currentSaldoActual = SALDO_INICIAL - currentTotalEgresos + currentTotalIngresos;

    const notificationMessage = `*Reporte de Saldo Diario - Sistema de Registros de GRUPO CAPITAL:*\n\n` +
                                `Fecha: ${new Date().toLocaleDateString("es-ES")}\n\n` +
                                `Saldo Inicial del Sistema: $${SALDO_INICIAL.toFixed(2)}\n` +
                                `Total Egresos (Préstamos Activos): $${currentTotalEgresos.toFixed(2)}\n` +
                                `Total Ingresos (Préstamos Pagados): $${currentTotalIngresos.toFixed(2)}\n` +
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

  const pantallaLogin = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#FFFFFF", // Fondo blanco
        fontFamily: "Arial, sans-serif",
        color: "#666666", // Texto gris
      }}
    >
      <h1 style={{ marginBottom: 20, fontWeight: "bold", color: '#1a2b40' }}>Iniciar Sesión</h1>
      <form onSubmit={manejarLogin} style={{ display: "flex", flexDirection: "column", width: 280 }}>
        <input
          type="text"
          placeholder="Usuario"
          value={loginForm.usuario}
          onChange={(e) => setLoginForm({ ...loginForm, usuario: e.target.value })}
          style={{ marginBottom: 10, padding: 10, fontSize: 16, border: '1px solid #CCCCCC', color: '#666666' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
          style={{ marginBottom: 10, padding: 10, fontSize: 16, border: '1px solid #CCCCCC', color: '#666666' }}
        />
        {errorLogin && <div style={{ color: "red", marginBottom: 10 }}>{errorLogin}</div>}
        <button
          type="submit"
          style={{
            padding: 10,
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#1a2b40", // Azul marino oscuro
            color: "#FFFFFF", // Texto blanco
            border: "1px solid #CCCCCC", // Borde gris claro
            borderRadius: 4,
            boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' // Sombra para botones
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );

  const pantallaInicio = (
    <div style={{ textAlign: "center", padding: 40, fontFamily: "Arial, sans-serif", backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <h1
        style={{
          color: "#1a2b40", // Azul marino oscuro
          fontWeight: "bold",
          fontSize: "40px", // Tamaño de fuente más grande y responsivo
          marginBottom: "60px", // Aumentado para bajar el título
          letterSpacing: "3px", // Más espaciado entre letras
          textShadow: "3px 3px 6px rgba(0,0,0,0.4)", // Sombra más pronunciada
        }}
      >
        Bienvenido al Sistema de Registros de GRUPO CAPITAL
      </h1>
      
      {/* Recuadro para los botones principales */}
      <div
        style={{
          marginTop: "40px",
          backgroundColor: "#F8F8F8", // Fondo de recuadro casi blanco
          border: "1px solid #1a2b40", // Borde azul marino oscuro
          borderRadius: "8px",
          padding: "30px",
          maxWidth: "700px",
          margin: "40px auto 20px auto",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr", // 2 columnas
          gap: "20px", // Espacio entre los botones
          justifyItems: "center", // Centra los elementos dentro de las celdas de la cuadrícula
        }}
      >
        <button
          style={{ padding: "15px 30px", fontWeight: "bold", cursor: "pointer", fontSize: "20px", width: "80%", maxWidth: "300px", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
          onClick={() => setView("nuevo")}
        >
          <PlusCircle size={24} /> Nuevo Registro
        </button>
        <button
          style={{ padding: "15px 30px", fontWeight: "bold", cursor: "pointer", fontSize: "20px", width: "80%", maxWidth: "300px", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
          onClick={() => setView("registros")}
        >
          <List size={24} /> Registros Activos
        </button>
        <button
          style={{ padding: "15px 30px", fontWeight: "bold", cursor: "pointer", fontSize: "20px", width: "80%", maxWidth: "300px", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
          onClick={() => setView("historial")} // Cambiado a historial para "Registros Pagados"
        >
          <List size={24} /> Registros Pagados
        </button>
        <button
          style={{ padding: "15px 30px", fontWeight: "bold", cursor: "pointer", fontSize: "20px", width: "80%", maxWidth: "300px", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
          onClick={() => setView("auditoria")}
        >
          <BarChart2 size={24} /> Auditoría
        </button>
        <button
          style={{ padding: "15px 30px", fontWeight: "bold", cursor: "pointer", fontSize: "20px", width: "80%", maxWidth: "300px", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
          onClick={() => setView("calendario")}
        >
          <CalendarDays size={24} /> Calendario
        </button>
        <button
          style={{ padding: "15px 30px", fontWeight: "bold", cursor: "pointer", fontSize: "20px", width: "80%", maxWidth: "300px", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
          onClick={showWhatsappConfigModal} // Este botón ahora abre el modal de configuración
        >
          <Settings size={24} /> Configuración
        </button>
      </div>
    </div>
  );

  const pantallaNuevo = (
    <div style={{ color: "#666666", padding: 20, backgroundColor: "#FFFFFF", fontFamily: "Arial, sans-serif", paddingTop: "70px" }}>
      <h2 style={{ fontWeight: "bold", color: '#1a2b40' }}>Nuevo Registro</h2>
      {loading && <p style={{color: '#666666'}}>Cargando...</p>}
      {["Apellido", "Nombre", "Monto", "Interés (%)", "Plazo (días)"].map((label, i) => {
        const field = ["apellido", "nombre", "monto", "interes", "plazo"][i];
        return (
          <input
            key={label}
            style={{ margin: "8px 0", padding: "6px", fontSize: "16px", width: "100%", border: '1px solid #CCCCCC', color: '#666666' }}
            placeholder={label}
            type={field === "monto" || field === "interes" || field === "plazo" ? "number" : "text"}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        );
      })}
      <p style={{color: '#666666'}}><b>Monto a devolver:</b> ${calcularMonto().toFixed(2)}</p>
      <p style={{color: '#666666'}}><b>Fecha de vencimiento:</b> {calcularVencimiento()}</p>
      <button
        style={{ marginRight: 10, padding: "10px 20px", fontWeight: "bold", cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
        onClick={handleSubmit}
        disabled={loading}
      >
        <PlusCircle size={20} /> Guardar
      </button>
      <button
        style={{ padding: "10px 20px", fontWeight: "bold", cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
        onClick={() => setView("home")}
      >
        <Home size={20} /> Volver al Inicio
      </button>
    </div>
  );

  const pantallaRegistros = (
    <div style={{ color: "#666666", padding: 20, backgroundColor: "#FFFFFF", fontFamily: "Arial, sans-serif", paddingTop: "70px" }}>
      <DashboardResumen
        capitalInvertido={capitalInvertido}
        retornoCapitalInvertido={retornoCapitalInvertido}
        ganancia={ganancia}
      />
      <h2 style={{ textAlign: "center", marginTop: 40, color: '#1a2b40' }}> Registros Activos</h2>
      {loading ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: '#666666' }}>Cargando registros...</p>
      ) : (
        <table
          border="1"
          style={{
            width: "100%",
            background: "#F8F8F8", // Fondo de tabla casi blanco
            color: "#666666", // Texto gris
            marginTop: 10,
            // Eliminado temporalmente: borderCollapse: "collapse",
            fontSize: "16px",
          }}
        >
          <thead>
            <tr>
              {["ID", "Apellido", "Nombre", "Monto Entregado", "Interés", "Plazo", "Fechas de Vencimiento", "Monto a Devolver", "Estado", "Acciones"].map((col) => (
                <th key={col} style={{ border: '1px solid #CCCCCC', padding: '8px', backgroundColor: '#1a2b40', color: '#FFFFFF' }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registros
              .filter((r) => r.estado !== "Pagado")
              .map((r) => (
                <tr key={r.id} style={{ textAlign: "center" }}>
                  <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>{r.id}</td>
                  <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>{r.apellido}</td>
                  <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>{r.nombre}</td>
                  <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>${parseFloat(r.monto).toFixed(2)}</td>
                  <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>{r.interes}%</td>
                  <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>{r.plazo} días</td>
                  <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>{r.vencimiento}</td>
                  <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>${r.montoDevolver.toFixed(2)}</td>
                  <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>{r.estado}</td>
                  <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>
                    <select
                      value={r.estado}
                      onChange={(e) => cambiarEstado(r.id, e.target.value)}
                      style={{ padding: "5px", fontSize: "14px", border: '1px solid #CCCCCC', color: '#666666' }}
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
      <button
        style={{ marginTop: 20, padding: "10px 20px", fontWeight: "bold", cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
        onClick={() => setView("nuevo")}
      >
        <PlusCircle size={20} /> Nuevo Registro
      </button>
      <button
        style={{ marginLeft: 10, marginTop: 20, padding: "10px 20px", fontWeight: "bold", cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
        onClick={() => setView("home")}
      >
        <Home size={20} /> Volver al Inicio
      </button>
      <button
        style={{ marginLeft: 10, marginTop: 20, padding: "10px 20px", fontWeight: "bold", cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
        onClick={() => setView("historial")}
      >
        <List size={20} /> Ver Registros Pagados
      </button>
    </div>
  );

  const pantallaHistorial = (
    <div style={{ color: "#666666", padding: 20, backgroundColor: "#FFFFFF", fontFamily: "Arial, sans-serif", paddingTop: "70px" }}>
      <h2 style={{ textAlign: "center", color: '#1a2b40' }}>Registros Pagados</h2>
      <DashboardHistorial
        totalAbonado={totalAbonadoEnHistorial}
        totalDemora={totalDemoraEnHistorial}
      />
      {loading ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: '#666666' }}>Cargando registros...</p>
      ) : (
        <table
          border="1"
          style={{
            width: "100%",
            background: "#F8F8F8", // Fondo de tabla casi blanco
            color: "#666666", // Texto gris
            marginTop: 10,
            // Eliminado temporalmente: borderCollapse: "collapse",
            fontSize: "16px",
          }}
        >
          <thead>
            <tr>
              {["ID", "Apellido", "Nombre", "Monto", "Interés", "Plazo", "Vencimiento", "Devolver", "Abonado", "Demora"].map((col) => (
                <th key={col} style={{ border: '1px solid #CCCCCC', padding: '8px', backgroundColor: '#1a2b40', color: '#FFFFFF' }}>{col}</th>
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
                    <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>{r.id}</td>
                    <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>{r.apellido}</td>
                    <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>{r.nombre}</td>
                    <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>${parseFloat(r.monto).toFixed(2)}</td>
                    <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>{r.interes}%</td>
                    <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>{r.plazo} días</td>
                    <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>{r.vencimiento}</td>
                    <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>${r.montoDevolver.toFixed(2)}</td>
                    <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>${r.abonado?.toFixed(2)}</td>
                    <td style={{ border: '1px solid #CCCCCC', padding: '8px', color: '#666666' }}>${demora}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      <button
        style={{ marginTop: 20, padding: "10px 20px", fontWeight: "bold", cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
        onClick={exportarHistorialCSV}
      >
        <Download size={20} /> Exportar a CSV
      </button>
      <button
        style={{ marginLeft: 10, marginTop: 20, padding: "10px 20px", fontWeight: "bold", cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
        onClick={() => setView("home")}
      >
        <Home size={20} /> Volver al Inicio
      </button>
      <button
        style={{ marginLeft: 10, marginTop: 20, padding: "10px 20px", fontWeight: "bold", cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#1a2b40', color: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '4px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
        onClick={() => setView("registros")}
      >
        <List size={20} /> Volver a Registros Activos
      </button>
    </div>
  );

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: "#FFFFFF", // Fondo blanco
        minHeight: "100vh",
        color: "#666666", // Texto gris
        fontFamily: "Arial, sans-serif",
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
          onSendDailyBalanceReport={handleSendDailyBalanceReport} // Pasar la función de reporte diario
        />
      )}
      {view === "calendario" && (
        <PantallaCalendario
          setView={setView}
          registros={registros}
          showCustomAlert={showCustomAlert} // Pasar showCustomAlert al calendario
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
