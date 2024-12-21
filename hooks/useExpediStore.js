import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCedulaRegistro, setExpediente, setValueCedulaModal, setValueExpModal, setValueRegisModal } from '../store/expediente/expediSlice'
import { simoApi } from '../api'
import { expfuncion } from '../helpers'
import { useAuthStore } from './useAuthStore'

export const useExpediStore = () => {

    const {expediente,expediModal,cedulaModal,registModal}=useSelector(state=>state.expedi) 
    
    const dispatch=useDispatch()

    const {startMovimientoAgregar}=useAuthStore()


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
  const startRegistroModalValue=(value)=>{
        dispatch(setValueRegisModal(value))
    }
    
    const startAgregarCedula=async(Cedula,obra,dictamen)=>{
     try {
          const response =await simoApi.post('/excel/cedula',{obra,dictamen,Cedula}, { responseType: 'blob' })
          if (response.status === 200) {
            // Crea un Blob a partir de los datos recibidos (en este caso, el archivo Excel)
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Crea una URL temporal para el Blob
            const url = window.URL.createObjectURL(blob);

            // Crea un elemento <a> para simular el clic y descargar el archivo
            const a = document.createElement('a');
            a.href = url;
            a.download =  `Cedula de Registro-${obra.num_obra}.xlsx`;  // Puedes personalizar el nombre del archivo
            a.click();  // Simula el clic para iniciar la descarga

            // Limpia la URL temporal
            window.URL.revokeObjectURL(url);
        } else {
            console.error('Error descargando el archivo.');
        }
        
        await startMovimientoAgregar(`Genero Cedula de Registro para la obra: ${obra.num_obra}`)

  
    } catch (error) {
       const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
            throw new Error(messageError);
    }
  }

const startGenerarSolicitud=async(obra,registro)=>{
     try {
          const response =await simoApi.post('/excel/solicitud',{obra,registro}, { responseType: 'blob' })
          if (response.status === 200) {
            // Crea un Blob a partir de los datos recibidos (en este caso, el archivo Excel)
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Crea una URL temporal para el Blob
            const url = window.URL.createObjectURL(blob);

            // Crea un elemento <a> para simular el clic y descargar el archivo
            const a = document.createElement('a');
            a.href = url;
            a.download =  `Solicitud de Beneficiados-${obra.num_obra}.xlsx`;  // Puedes personalizar el nombre del archivo
            a.click();  // Simula el clic para iniciar la descarga

            // Limpia la URL temporal
            window.URL.revokeObjectURL(url);
        } else {
            console.error('Error descargando el archivo.');
        }
        await startMovimientoAgregar(`Genero Solicitud de Beneficiados para la obra: ${obra.num_obra}`)

    } catch (error) {
       const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
            throw new Error(messageError);
    }
  }
  return {
    //Propiedades
     expediente,
     expediModal,
     cedulaModal,
     registModal,

    //Metodos
    startAgregarExpe,
    starExpeModalValue,
    startCedulaModalValue,
    startAgregarCedula,
    startRegistroModalValue,
    startGenerarSolicitud


  }

  
}
