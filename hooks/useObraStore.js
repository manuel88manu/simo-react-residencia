import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { simoApi } from '../api'
import { getConceptos, getPartidas, getPresupuesto, resetIngresarObra, resetValues, setDictamen, setDictamenExitoso, setExpedienteExitoso, setModalAproba, setModalPresupuesto, setObra, setObraExito, setObrasPresu, setPresupuestoExito,setObrasBusqueda, setLimpiarBusqueda, setInfoObra, setEditarInicio, setModalDictamen } from '../store/obra/obraSlice'
import { useAuthStore } from './useAuthStore'
import { formatCurrency } from '../helpers'
import { useExpediStore } from './useExpediStore'
import { setExpediente } from '../store/expediente/expediSlice'

export const useObraStore = () => {

   const {obras,
    obra,
    dictamen,
    valueObraAgregar,
    valuePresupuestoAgregar,
    valueExpedienteAgregar,
    valueDictamenGenerar,
    valueFinalizar,
    modalPresupuesto,
    partidas,
    conceptos,
    modalAprobacion,
    busqueda,
    modalDictamen
    }=useSelector(state=>state.obra)

    const {startMovimientoAgregar}=useAuthStore()

    const {startAgregarExpe}=useExpediStore()

   const dispatch=useDispatch()

   const startAgregarObra=async({Presupuesto_idPresupuesto,obra,dictamen})=>{
    try {
        const {data}=await simoApi.post("/obra/newobra",{Presupuesto_idPresupuesto,obra,dictamen})
        await startMovimientoAgregar(`Inicializo la obra ${obra.num_obra}`)
        dispatch(setObra(data.obra))
        dispatch(setDictamen(data.dictamen))
        dispatch(setObraExito())
        await startAgregarExpe(data.obra.idobra)
        
    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }

   }

   const startIncioEditarObra=()=>{
   dispatch(setEditarInicio())

   }
   const startModalPresuValue=(payload)=>{
   dispatch(setModalPresupuesto(payload))

   }
   const startAprobaModalValue=(payload)=>{
    dispatch(setModalAproba(payload))
   }

    const startDictamenValue=(payload)=>{
    dispatch(setModalDictamen(payload))    
    }
   const  startObtenerPartidas=async(idobra)=>{
    const { data } = await simoApi.get(`/obra/addpartidas`, { params: { idobra } });
    const partidas=data.partidas;
    dispatch(getPartidas(partidas))
   }

   const startAgregarPartidas=async(idobra,nombre)=>{
    try {
        await simoApi.post(`/obra/newpartida`, {obra_idobra:idobra,nombre_par:nombre});
        await startObtenerPartidas(idobra)
        await startMovimientoAgregar(`Agrego la partida: ${nombre} en la obra: ${obra.num_obra}`)
    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }
   }

   const startObtenerConceptos=async(idpartida)=>{
    const {data}=await simoApi.get(`/obra/addconceptos`,{params:{idpartida}})
    const conceptos=data.conceptos;
    dispatch(getConceptos(conceptos))

   }

   const startAgregarConceptos=async(idpartida,concepto,idobra)=>{
    try {
        await simoApi.post(`/obra/newconcepto`, {partida_idpartida:idpartida,concepto:concepto});
        await startObtenerConceptos(idpartida)
        await startObtenerPartidas(idobra)
        await startMovimientoAgregar(`Agrego el concepto: ${concepto.nombre_conc} en la obra: ${obra.num_obra}`)


    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }
   }

   const startValidarPresupuesto=async(idobra)=>{
  
    try {
        const {data}= await simoApi.put(`/obra/updatapresu/${idobra}`)
        const presupuesto= data.resultadoAdicional.presupuesto;
        await startMovimientoAgregar(`Agrego el Presupuesto de: ${formatCurrency(presupuesto)} para la obra: ${obra.num_obra}`)
        dispatch(getPresupuesto(presupuesto))
        dispatch(setPresupuestoExito())

    } catch (error) {
        const errorDetails = {
            message: error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra',
            status: error.response?.status || 500,
            data: error.response?.data || null,
            stack: error.stack,
        };

        // Lanza el error completo para manejo posterior
        throw errorDetails;
    }
   }

   const startFinalizarExpediente=async()=>{
    try {
        
        dispatch(setExpedienteExitoso())
        await startMovimientoAgregar(`Finalizo el registro del Expediente para la obra: ${obra.num_obra}`)

        
    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }

   }

   
   const startGenerarDictamen=async()=>{
    try {

        dispatch(setDictamenExitoso())
        
    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }
   }

   const startFinalizarObra=async()=>{
    try {
        
        dispatch(resetValues())
        dispatch(resetIngresarObra())
        
    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }
   }

 const startResetBox=async()=>{
    try {
        
        dispatch(resetValues())
        
    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }
   }

 const startActualizarConcepto=async(idobra,concepto)=>{
    try {
      await simoApi.put('/obra/updateConcep',{concepto:concepto})
      await startObtenerConceptos(concepto.partida_idpartida)
      await startObtenerPartidas(idobra)


    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }
 }

 const startActualizarPartida=async(idobra,partida)=>{
    try {

       await simoApi.put('/obra/updatepartida',{partida:partida})
       await startObtenerPartidas(idobra) 
        
    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }
 }

 const startEliminarConcepto=async(idobra,concepto)=>{
    try {
        await simoApi.delete(`/obra/deleteconcep/${concepto.idconcepto}`)
        await startObtenerConceptos(concepto.partida_idpartida)
        await startObtenerPartidas(idobra)
        
    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }
 }

 const startEliminarPartida=async(idobra,partida)=>{
    try {
        await simoApi.delete(`/obra/deletepartida/${partida.idpartida}`)
        await startObtenerConceptos(partida.idpartida)
        await startObtenerPartidas(idobra)
    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }
 }

 const starteliminarObra=async(idobra)=>{
    try {
        await simoApi.delete(`/obra/deleteobra/${idobra}`)
        await startMovimientoAgregar(`Elimino la obra: ${obra.num_obra} que habia sido inicializada`)
        startModalPresuValue(false)
        dispatch(resetValues())
        dispatch(resetIngresarObra())

    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }
 }

 const startObtenerObrasPresu=async(idPresupuesto,num_obra)=>{
    try {
        const {data}=await simoApi.get(`/obra/getObrasPresu`,{params:{idPresupuesto,num_obra}})
        const obras=data.obras;
        dispatch(setObrasPresu(obras))     

    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }
 }
 const startActualizarNumApro=async(idobra,num_aproba,idPresupuesto)=>{
    try {
       const{data}=await simoApi.put('/obra/updatenumaproba',{idobra,num_aproba} )
       await startMovimientoAgregar(`Agrego el numero de aprobacion ${num_aproba.codigo} en la obra: ${data.num_obra}`)
       await startObtenerObrasPresu(idPresupuesto,'')
       startAprobaModalValue(false)
    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }
 }
 const startBuscarObras=async(año,tipo,programa,num_obra)=>{
  try {
    const {data}=await simoApi.get(`/obra/shareobras`,{params:{año,tipo,programa,num_obra}})
    const obras=data.obras
    dispatch(setObrasBusqueda(obras))

  } catch (error) {
    const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
    throw new Error(messageError);
  }  
 }
 const startLimpiarBusqueda=()=>{
    dispatch(setLimpiarBusqueda())
 }

const startObtenerInfo=async(idobra)=>{
try {
    
const {data}=await simoApi.get(`/obra/infoobra`,{params:{idobra}})

dispatch(setInfoObra({obra:data.obra,dictamen:data.dictamen,partidas:data.partidas}))

const expediente=data.expediente

delete expediente.idexpediente;
delete expediente.obra_idobra;

dispatch(setExpediente(expediente))


} catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
    throw new Error(messageError);
}
}

return{
    //propuedades
    obra,
    obras,
    dictamen,
    valueDictamenGenerar,
    valueExpedienteAgregar,
    valueFinalizar,
    valueObraAgregar,
    valuePresupuestoAgregar,
    modalPresupuesto,
    partidas,
    conceptos,
    modalAprobacion,
    busqueda,
    modalDictamen,

    //METODOS
    startAgregarObra,
    startModalPresuValue,
    startObtenerPartidas,
    startAgregarPartidas,
    startObtenerConceptos,
    startAgregarConceptos,
    startValidarPresupuesto,
    startFinalizarExpediente,
    startGenerarDictamen,
    startFinalizarObra,
    startActualizarConcepto,
    startActualizarPartida,
    startEliminarConcepto,
    startEliminarPartida,
    starteliminarObra,
    startObtenerObrasPresu,
    startAprobaModalValue,
    startActualizarNumApro,
    startBuscarObras,
    startLimpiarBusqueda,
    startObtenerInfo,
    startResetBox,
    startIncioEditarObra,
    startDictamenValue
    
    

}

}