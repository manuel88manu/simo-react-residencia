import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { simoApi } from '../api'
import { getConceptos, getPartidas, getPresupuesto, setDictamen, setModalPresupuesto, setObra, setObraExito, setPresupuestoExito } from '../store/obra/obraSlice'

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

        console.log(data)
        
    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        console.log(messageError)
        throw new Error(messageError);
    }

   }

   const startModalPresuValue=(payload)=>{
    console.log(payload)
   dispatch(setModalPresupuesto(payload))

   }

   const  startObtenerPartidas=async(idobra)=>{
    const { data } = await simoApi.get(`/obra/addpartidas`, { params: { idobra } });
    const partidas=data.partidas;
    console.log(partidas)
    dispatch(getPartidas(partidas))
   }

   const startAgregarPartidas=async(idobra,nombre)=>{
    try {
        await simoApi.post(`/obra/newpartida`, {obra_idobra:idobra,nombre_par:nombre});
        await startObtenerPartidas(idobra)
    } catch (error) {
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        console.log(messageError)
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
        console.log(messageError)
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
        const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
        console.log(messageError)
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
    startValidarPresupuesto

}

}
