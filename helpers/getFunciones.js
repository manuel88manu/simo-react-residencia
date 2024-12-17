import dayjs from "dayjs";
import Swal from "sweetalert2";

export const convertirFechasADate = (obj) => {
    return {
      ...obj,
      fec_inicio: obj.fec_inicio ? obj.fec_inicio.format('YYYY-MM-DD') : null,
      fec_termino: obj.fec_termino ? obj.fec_termino.format('YYYY-MM-DD') : null,
    };
  };


   export const obrainicio={
    idobra:null,
    nombre:"",
    bene_unidad:"",
    subprograma:"",
    programa:"",
    rubros:"",
    empleo_event:"",
    presupuesto:0,
    bene_cantidad:0,
    cap_cantidad:0,
    cap_unidad:'',
    ejecucion:'',
    loca_col:"",
    num_obra:"",
    num_aproba:""
}

export const dictameInicial={
    situacion:"IT",
    municipio:"Xalisco",
    subregion:"centro sur",
    capacidad_por:"100%",
    arc_dictamen:"",
    fecha_dictamen: new Date(new Date().setHours(0, 0, 0, 0)).toISOString().split('T')[0],
    fec_inicio:dayjs(new Date()),
    fec_termino:dayjs(new Date().setDate(new Date().getDate() + 1)),
    metas_alc_fechas: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0], // Siempre 31 de diciembre
    meta_porciento:"100%",
    metas_por:"100%"
}

export const formatCurrency = (value) => {
  if (value === null || value === undefined) return "$0.00";
  return `$${value
    .toFixed(2) // Asegura dos decimales
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`; // Inserta comas para separar miles
};

export const showAlert = (nombre, num_obra) => {
  Swal.fire({
    title: "¡Alerta Importante Registro de Obra No Finalizado!",
    html: `
      <p style="font-size: 1.2rem; line-height: 1.3; text-align: left;">
        El registro de la obra llamada <strong style="font-size: 1.3rem; font-weight: bold;">${nombre}</strong>
        con numero de obra: <strong style="font-size: 1.3rem; font-weight: bold;">${num_obra}</strong> no ha sido finalizada aún.<br /> 
       <span style="color: red; font-weight: bold;">No se permitirá registrar ninguna nueva obra si no se ha finalizado la actual.</span>
      </p>
    `,
    icon: "warning", // Icono de advertencia
    background: "#fff", // Fondo blanco
    iconColor: "#856404", // Color del icono
    padding: "30px", // Espaciado dentro de la alerta
    timer: 10400, // Duración de la alerta
    showCloseButton: true, // Botón de cierre visible
    customClass: {
      popup: "swal-popup", // Personalización de la alerta
      title: "swal-title", // Título de la alerta
      content: "swal-content", // Contenido de la alerta
    },
    showConfirmButton: false, // Eliminar el botón de confirmación
  });
};

export function formatValue(value) {
  if (!value) return ''; // Si no hay valor, retornar una cadena vacía.
  
  // Asegurarse de que el valor es un número o una cadena numérica.
  let [integerPart, decimalPart] = value.toString().split('.');
  
  // Formatear la parte entera con comas
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // Si tiene parte decimal, la unimos de nuevo con el punto
  if (decimalPart) {
    return `${integerPart}.${decimalPart}`;
  }
  
  // Si no tiene parte decimal, simplemente devolvemos la parte entera con comas
  return integerPart;
}

export const getCurrentYear = () => {
  const now = new Date(); // Obtiene la fecha y hora actual
  return now.getFullYear(); // Extrae solo el año
};