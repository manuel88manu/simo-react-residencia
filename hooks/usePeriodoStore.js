import { useDispatch, useSelector } from "react-redux"
import { simoApi } from "../api"
import { getPeriodo, getPeriodoVigenteTrue, getSinVigencia, setBorrarFaltante, setFaltante, setPresuEstatal, setpresuFaismun, setpresuFederal, setpresuFortamun, setpresuOdirectas} from "../store/periody/periodoSlice"
import { useAuthStore } from "./useAuthStore"
import { getCurrentYear } from "../helpers"

export const usePeriodoStore=()=>{
const {periodo,vigente,presuEstatal,presuFaismun,presuFortamun,presuOdirectas,presuFederal,faltante}=useSelector(state=>state.periodo)
const dispatch=useDispatch()
const {startMovimientoAgregar}=useAuthStore()

const startPeriodoVigen=async()=>{
    try {
        const {data}= await simoApi.get("/periody/periodo")
        dispatch(getPeriodo(data.periodo))
        await startObtenerPeriodos(data.periodo.idperiodo)
    } catch (error) {
        dispatch(getSinVigencia())
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar el Periodo';
        throw new Error(messageError);
    }

}

const startIgresarPeriodo=async(presupuestos)=>{
    try {
        const año=getCurrentYear()
        const {data}=await simoApi.post("/periody/newper",{presupuestos})
        dispatch(getPeriodo(data.periodo))
        await startObtenerPeriodos(data.periodo.idperiodo)
        await startMovimientoAgregar(`Ingreso los presupuestos para el año ${año}`)

    } catch (error) {
        dispatch(getSinVigencia())
        const messageError = 'El presupuesto destinado para cada categoria de obra debe ser decimal a 2 digitos';
        throw new Error(messageError);
    }

}

const startObtenerPeriodos=async(idperiodo)=>{
    try {
    const { data } = await simoApi.get(`/periody/presupuestos`, { params: { idperiodo } });
    if (Array.isArray(data.presupuestos)) {
        data.presupuestos.forEach((presupuesto) => {
            switch (presupuesto.tipo) {
                case "estatal":
                    dispatch(setPresuEstatal(presupuesto))
                    break;
                case "faismun":
                    dispatch(setpresuFaismun(presupuesto))
                    break;
                case "fortamun":
                    dispatch(setpresuFortamun(presupuesto))
                    break;
                case "odirectas":
                    dispatch(setpresuOdirectas(presupuesto))
                    break;
                case "federal":
                    dispatch(setpresuFederal(presupuesto))
                    break;
                default:
                    console.warn(`Tipo no reconocido: ${presupuesto.tipo}`);
                    break;
            }
        });
    } else {
        console.error("El formato de data.presupuestos no es válido.");
    }
     dispatch(getPeriodoVigenteTrue())
    } catch (error) {
        console.log(error.data.msg)
    }

}

const startObtenerFaltante=async(idPresupuesto)=>{
 try {
    dispatch(setBorrarFaltante())
    const { data } = await simoApi.get(`/periody/faltante`, { params: { idPresupuesto } });
    dispatch(setFaltante(data.faltante))
 } catch (error) {
    const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
    throw new Error(messageError);
 }

}


const startActualiPresu=async(presupuestos,periodo)=>{
    try {
        const año=getCurrentYear()
        await simoApi.put("/periody/actualizapresu",{presupuestos})
        await startObtenerPeriodos(periodo.idperiodo)
        await startMovimientoAgregar(`Actualizo los presupuestos para el año ${año}`)

    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }

}



return{
    //propiedades
    periodo,
    vigente,
    presuEstatal,
    presuFaismun,
    presuFederal,
    presuFortamun,
    presuOdirectas,
    faltante,
    //Metodos
    startPeriodoVigen,
    startIgresarPeriodo,
    startObtenerPeriodos,
    startObtenerFaltante,
    startActualiPresu
}

}