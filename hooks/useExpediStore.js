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

    //Metodos
    startAgregarExpe,
    starExpeModalValue,
    startCedulaModalValue,
    startAgregarCedula


  }

  
}
