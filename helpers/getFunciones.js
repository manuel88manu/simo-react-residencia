
export const convertirFechasADate = (obj) => {
    return {
      ...obj,
      fec_inicio: obj.fec_inicio ? obj.fec_inicio.format('YYYY-MM-DD') : null,
      fec_termino: obj.fec_termino ? obj.fec_termino.format('YYYY-MM-DD') : null,
    };
  };