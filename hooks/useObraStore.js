import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { simoApi } from '../api'
import { getConceptos, getPartidas, getPresupuesto, resetIngresarObra, resetValues, setDictamen, setDictamenExitoso, setExpedienteExitoso, setModalPresupuesto, setObra, setObraExito, setObrasPresu, setPresupuestoExito } from '../store/obra/obraSlice'

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
    conceptos
    }=useSelector(state=>state.obra)

   const dispatch=useDispatch()

   const startAgregarObra=async({Presupuesto_idPresupuesto,obra,dictamen})=>{
    try {
        const {data}=await simoApi.post("/obra/newobra",{Presupuesto_idPresupuesto,obra,dictamen})
        dispatch(setObra(data.obra))
        dispatch(setDictamen(data.dictamen))
        dispatch(setObraExito())
        
    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        console.log(messageError)
        throw new Error(messageError);
    }

   }

   const startModalPresuValue=(payload)=>{
   dispatch(setModalPresupuesto(payload))

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

    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        throw new Error(messageError);
    }
   }

   const startValidarPresupuesto=async(idobra)=>{
  
    try {
        const {data}= await simoApi.put(`/obra/updatapresu/${idobra}`)
        const presupuesto= data.resultadoAdicional.presupuesto;
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

   const startAgregarExpediente=async()=>{
    try {
        
        dispatch(setExpedienteExitoso())
        
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

    //METODOS
    startAgregarObra,
    startModalPresuValue,
    startObtenerPartidas,
    startAgregarPartidas,
    startObtenerConceptos,
    startAgregarConceptos,
    startValidarPresupuesto,
    startAgregarExpediente,
    startGenerarDictamen,
    startFinalizarObra,
    startActualizarConcepto,
    startActualizarPartida,
    startEliminarConcepto,
    startEliminarPartida,
    starteliminarObra,
    startObtenerObrasPresu
    

}

}
