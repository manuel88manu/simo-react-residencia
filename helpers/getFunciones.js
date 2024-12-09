import dayjs from "dayjs";

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
    loca_col:""
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
