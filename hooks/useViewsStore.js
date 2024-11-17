import { useDispatch, useSelector } from "react-redux";
import { onStateSimo, onStateUser } from "../store/views/viewSlice";

export const useViewStore = () => {
  const { stateViewSimo, stateViewUser } = useSelector((state) => state.views);
  const dispatch = useDispatch();

  const selectViewSimo = (estado) => {
    dispatch(onStateSimo(estado)); // Ahora simplemente pasamos el estado como una cadena
  };

  const selectViewUser = (estado) => {
    dispatch(onStateUser(estado)); // Ahora simplemente pasamos el estado como una cadena
  };

  return {
    // Propiedades
    stateViewSimo,
    stateViewUser,
    // Métodos
    selectViewSimo,
    selectViewUser
  };
};
