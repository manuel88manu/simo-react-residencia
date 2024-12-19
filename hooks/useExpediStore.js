import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCedulaRegistro, setExpediente, setValueCedulaModal, setValueExpModal } from '../store/expediente/expediSlice'
import { simoApi } from '../api'
import { expfuncion } from '../helpers'

export const useExpediStore = () => {

    const {expediente,expediModal,cedulaModal}=useSelector(state=>state.expedi) 
    
    const dispatch=useDispatch()


    const startAgregarExpe=async(obra_idobra)=>{
        try {
          const {data}=await simoApi.post(`/expedi/agregarexp`,{obra_idobra,expediente:expfuncion()});
          dispatch(setExpediente(data.expediente))
        } catch (error) {
            const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
            throw new Error(messageError);
        }
    }
    const starExpeModalValue=(value)=>{
        dispatch(setValueExpModal(value))
    }
    const startCedulaModalValue=(value)=>{
        dispatch(setValueCedulaModal(value))
    }
    
    const startAgregarCedula=(cedula)=>{
        dispatch(setCedulaRegistro(cedula))
    }
  return {
    //Propiedades
     expediente,
     expediModal,
     cedulaModal,

    //Metodos
    startAgregarExpe,
    starExpeModalValue,
    startCedulaModalValue,
    startAgregarCedula


  }

  
}
