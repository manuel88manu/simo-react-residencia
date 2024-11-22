import { useDispatch, useSelector } from "react-redux"
import { simoApi } from "../api"
import { getPeriodo, getSinVigencia } from "../store/periody/periodoSlice"

export const usePeriodoStore=()=>{
const {periodo,vigente}=useSelector(state=>state.periodo)
const dispatch=useDispatch()

const startPeriodoVigen=async()=>{
    try {
        const {data}= await simoApi.get("/periody/periodo")
        dispatch(getPeriodo(data.periodo))
    } catch (error) {
        dispatch(getSinVigencia())
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar el Periodo';
        throw new Error(messageError);
    }

}

const startIgresarPeriodo=async(presupuestos)=>{
    try {
        
        const {data}=await simoApi.post("/periody/newper",{presupuestos})
        dispatch(getPeriodo(data.periodo))

    } catch (error) {
        dispatch(getSinVigencia())
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar el Periodo';
        throw new Error(messageError);
        
    }

}

return{
    //propiedades
    periodo,
    vigente,

    //Metodos
    startPeriodoVigen,
    startIgresarPeriodo
}

}