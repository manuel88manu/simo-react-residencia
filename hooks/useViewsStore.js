import { useDispatch, useSelector } from "react-redux";
import { onEstadoPresupuesto, onModalUser, onStateSimo, onStateUser } from "../store/views/viewSlice";

export const useViewStore = () => {
  const { stateViewSimo, stateViewUser,stateModalUser,estadoPresupuesto } = useSelector((state) => state.views);
  const dispatch = useDispatch();

  const selectViewSimo = async(estado) => {
    dispatch(onStateSimo(estado)); // Ahora simplemente pasamos el estado como una cadena
  };

  const selectViewUser = async(estado) => {
    dispatch(onStateUser(estado)); // Ahora simplemente pasamos el estado como una cadena
  };

  const selectModalUser=async(payload)=>{
    dispatch(onModalUser(payload))
  }

  const selecTipoPeriodo=(tipo)=>{
    if(tipo===estadoPresupuesto)return;
    dispatch(onEstadoPresupuesto(tipo))
  }

  return {
    // Propiedades
    stateViewSimo,
    stateViewUser,
    stateModalUser,
    estadoPresupuesto,
    // Métodos
    selectViewSimo,
    selectViewUser,
    selectModalUser,
    selecTipoPeriodo
  };
};
