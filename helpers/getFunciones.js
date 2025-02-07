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



export const AlertaRol = (funcion,rol) => {
  Swal.fire({
    title: "¡Alerta Importante No Tienes Los Permisos!",
    html: `
      <p style="font-size: 1.2rem; line-height: 1.3; text-align: left;">
        No tines acceso a la funcion <strong style="font-size: 1.3rem; font-weight: bold;">${funcion}</strong> solamente los usuarios con el rol de ${rol} pueden acceder
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

export const evaluarFechaProdim=()=>{
  //const fechaHoy = new Date('2024-06-30T00:00:00Z'); 
  let fechaHoy = new Date();

  // Ajustar la hora a la zona horaria de México (UTC -6)
  fechaHoy = new Date(fechaHoy.getTime() - (6 * 60 * 60 * 1000)); // Restar 6 horas a UTC
  const añoActual = fechaHoy.getUTCFullYear(); 

  //Fecha para faismun, prodim y otros
  const fechaLimitProdim = new Date(Date.UTC(añoActual, 5, 30)); // 30 de junio del año actual en UTC
  fechaLimitProdim.setUTCHours(23, 59, 59, 999);
  if(fechaHoy<=fechaLimitProdim){
      return true
  }else{
    return false
  }
}

export const expfuncion=()=>{
  return  {
    acta_apoyo_inv: '',
    ced_regi_obra: '',
    explo_insu: '',
    cro_micro: '',
    res_eje_pro: '',
    val_dic_fac: '',
    num_gene_obra: '',
    dic_imp_amb: '',
    memo_des: '',
    planeria: '',
    acta_dona_prop: '',
    memo_cal: '',
    esp_tec: '',
    cal_fis_finan: '',
    cro_macro: '',
    acta_acep_bene: '',
    soli_obra_bene: '',
    gas_indir: '',
    fotografias_est: '',
    presu_obra: '',
    tar_pre_uni: ''
}
}

export const estiloGrid1=()=>{
  return { width: '320px', height: '62px', ml: '1px',mb:'1px', display: "flex",alignItems: "center",gap: 2, }
}

export const estiloCalendar=()=>{
  return { width: '150px', height: '62px', ml: '1px',mb:'1px', display: "flex",alignItems: "center",gap: 2, }
}

export const valueColorExp=()=>{
  
}

export const getFileNameFromUrl = (url) => {
  const fileNameWithId = url.substring(url.lastIndexOf('/') + 1);

  // Extraer todo lo que está después del #
  const fileNameWithoutId = fileNameWithId.split('#').pop();

  return fileNameWithoutId;
};

export const replaceUrl = (input) => {
  return input.replace(/\//g, '_');
};

export const evaluarExpe = (obj) => {
  for (const key in obj) {
    if (obj[key] !== '') {
      return false; // Devuelve true si encuentra al menos un atributo no vacío
    }
  }
  return true; // Devuelve false si todos los atributos son cadenas vacías
};


export function formatToFloat(value) {
    if (typeof value === 'string') {
        // Eliminar comas y espacios
        value = value.replace(/[\s,]/g, '');
    }
    // Convertir a número flotante y redondear a 2 decimales
    return parseFloat(value).toFixed(2);
}

export const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength - 3) + '...'; // Recorta y agrega "..."
    }
    return str;
};


export function formatoFix(value) {
  if (typeof value !== "number" || isNaN(value)) {
    console.warn("El valor no es un número válido:", value);
    return "$0.00";
  }
  return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}