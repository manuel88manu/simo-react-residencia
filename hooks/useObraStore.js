import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { simoApi } from '../api'
import { setDictamen, setObra, setObraExito } from '../store/obra/obraSlice'

export const useObraStore = () => {

   const {obras,
    obra,
    dictamen,
    valueObraAgregar,
    valuePresupuestoAgregar,
    valueExpedienteAgregar,
    valueDictamenGenerar,
    valueFinalizar
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

    //METODOS
    startAgregarObra



}

}
