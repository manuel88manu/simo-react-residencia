import { useDispatch, useSelector } from "react-redux";
import { onModalUser, onStateSimo, onStateUser } from "../store/views/viewSlice";

export const useViewStore = () => {
  const { stateViewSimo, stateViewUser,stateModalUser } = useSelector((state) => state.views);
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

  return {
    // Propiedades
    stateViewSimo,
    stateViewUser,
    stateModalUser,
    // Métodos
    selectViewSimo,
    selectViewUser,
    selectModalUser
  };
};
