import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCedulaRegistro, setExpediente, setValueCalendarModal, setValueCedulaModal, setValueComunidadModal, setValueExpModal, setValueFactibiModal, setValueInovaModal, setValueRegisModal, setValueTablaExpModal } from '../store/expediente/expediSlice'
import { simoApi } from '../api'
import { expfuncion, getFileNameFromUrl } from '../helpers'
import { useAuthStore } from './useAuthStore'

export const useExpediStore = () => {

    const {expediente,
           expediModal,
           cedulaModal,
           registModal,
           comunidadModal,
           factibiModal,
           inovacionModal,
           tableExpeModal,
           calendarModal}=useSelector(state=>state.expedi) 
    
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
   const startComunuModalValue=(value)=>{
        dispatch(setValueComunidadModal(value))
    }
  const startFactibiModalValue=(value)=>{
        dispatch(setValueFactibiModal(value))
    }
   const startInovaModalValue=(value)=>{
        dispatch(setValueInovaModal(value))
    }
      const startCalendarModalValue=(value)=>{
        dispatch(setValueCalendarModal(value))
    }

    const startTablaExpModalValue=(value)=>{
    dispatch(setValueTablaExpModal(value))
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


const startGenerarComunidad=async(obra,comunidad)=>{
     try {
          const response =await simoApi.post('/excel/comunidad',{obra,comunidad}, { responseType: 'blob' })
          if (response.status === 200) {
            // Crea un Blob a partir de los datos recibidos (en este caso, el archivo Excel)
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Crea una URL temporal para el Blob
            const url = window.URL.createObjectURL(blob);

            // Crea un elemento <a> para simular el clic y descargar el archivo
            const a = document.createElement('a');
            a.href = url;
            a.download =  `Acta de aceptacion de la Comunidad-${obra.num_obra}.xlsx`;  // Puedes personalizar el nombre del archivo
            a.click();  // Simula el clic para iniciar la descarga

            // Limpia la URL temporal
            window.URL.revokeObjectURL(url);
        } else {
            console.error('Error descargando el archivo.');
        }
        await startMovimientoAgregar(`Genero Acta de Aceptacion de la Comunidad para la obra: ${obra.num_obra}`)

    } catch (error) {
       const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
            throw new Error(messageError);
    }
  }

const startGenerarFactibi=async(obra,validacion)=>{
     try {
          const response =await simoApi.post('/excel/factibi',{obra,validacion}, { responseType: 'blob' })
          if (response.status === 200) {
            // Crea un Blob a partir de los datos recibidos (en este caso, el archivo Excel)
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Crea una URL temporal para el Blob
            const url = window.URL.createObjectURL(blob);

            // Crea un elemento <a> para simular el clic y descargar el archivo
            const a = document.createElement('a');
            a.href = url;
            a.download =  `Validacion De Factibilidad-${obra.num_obra}.xlsx`;  // Puedes personalizar el nombre del archivo
            a.click();  // Simula el clic para iniciar la descarga

            // Limpia la URL temporal
            window.URL.revokeObjectURL(url);
        } else {
            console.error('Error descargando el archivo.');
        }
        await startMovimientoAgregar(`Genero Validacion de Factibilidad para la obra: ${obra.num_obra}`)

    } catch (error) {
       const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
            throw new Error(messageError);
    }
  }

const startGenerarInversion=async(obra,apoyo)=>{
     try {
          const response =await simoApi.post('/excel/inversion',{obra,apoyo}, { responseType: 'blob' })
          if (response.status === 200) {
            // Crea un Blob a partir de los datos recibidos (en este caso, el archivo Excel)
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Crea una URL temporal para el Blob
            const url = window.URL.createObjectURL(blob);

            // Crea un elemento <a> para simular el clic y descargar el archivo
            const a = document.createElement('a');
            a.href = url;
            a.download =  `Acta de Apoyo a la Inversion-${obra.num_obra}.xlsx`;  // Puedes personalizar el nombre del archivo
            a.click();  // Simula el clic para iniciar la descarga

            // Limpia la URL temporal
            window.URL.revokeObjectURL(url);
        } else {
            console.error('Error descargando el archivo.');
        }
        await startMovimientoAgregar(`Genero Acta de Apoyo a la Inversion para la obra: ${obra.num_obra}`)

    } catch (error) {
       const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
            throw new Error(messageError);
    }
  }

const startGenerarCalendario=async(obra,dictamen,meses,partidas,info)=>{
     try {
          const response =await simoApi.post('/excel/calendario',{obra,dictamen,meses,partidas,info}, { responseType: 'blob' })
          if (response.status === 200) {
            // Crea un Blob a partir de los datos recibidos (en este caso, el archivo Excel)
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Crea una URL temporal para el Blob
            const url = window.URL.createObjectURL(blob);

            // Crea un elemento <a> para simular el clic y descargar el archivo
            const a = document.createElement('a');
            a.href = url;
            a.download =  `Calendario Financiero-${obra.num_obra}.xlsx`;  // Puedes personalizar el nombre del archivo
            a.click();  // Simula el clic para iniciar la descarga

            // Limpia la URL temporal
            window.URL.revokeObjectURL(url);
        } else {
            console.error('Error descargando el archivo.');
        }
        await startMovimientoAgregar(`Genero Calendario Financiero para la obra: ${obra.num_obra}`)

    } catch (error) {
       const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
            throw new Error(messageError);
    }
  }

const startGuardarFtp=async(obra,prop,file)=>{
    const formData = new FormData();
    formData.append("file", file);
    formData.append("num_obra", obra.num_obra);
 try {

     const {data} =await simoApi.post('/ftp/upload',formData)
 
     const url=data.url
     const {data:data1}=await simoApi.post('/ftp/enlace',{obra,prop,url})

     await startMovimientoAgregar(`Subio archivo de ${file.name}  para la obra: ${obra.num_obra}`)
   
     dispatch(setExpediente(data1.expediente))
  
 } catch (error) {
   const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
    throw new Error(messageError);
 }
}

const startDescargarArchivo = async (url) => {
  try {
    const response = await simoApi.get('/ftp/downenlace', { params: { url }, responseType: 'blob' });
    const fileName = getFileNameFromUrl(url);

    if (response.status === 200 && response.data.size > 0) {
      // Verifica el tipo de archivo recibido
      console.log('Tipo de archivo recibido:', response.headers['content-type']);
      
      // Crea un Blob a partir de los datos recibidos
      const blob = new Blob([response.data], { type: 'application/octet-stream' });  // Usa 'application/octet-stream' para tipo genérico

      // Crea una URL temporal para el Blob
      const downloadUrl = window.URL.createObjectURL(blob);

      // Crea un elemento <a> para simular el clic y descargar el archivo
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileName;  // Usa el nombre del archivo extraído
      a.click();  // Simula el clic para iniciar la descarga

      // Limpia la URL temporal
      window.URL.revokeObjectURL(downloadUrl);
    } else {
      console.error('Error descargando el archivo o archivo vacío.');
    }
  } catch (error) {
    console.error(error);
    const messageError = error.response?.data?.msg || 'Ha ocurrido un error al descargar el archivo';
    throw new Error(messageError);
  }
};


const startDescargarCarpeta = async (num_obra,folderUrl) => {
  try {
    const response = await simoApi.get('/ftp/downcarpeta', {
      params: { url: folderUrl },
      responseType: 'blob', // Asegúrate de recibir datos binarios
    });

    if (response.status === 200) {
      // Crea un Blob a partir de los datos recibidos
      const blob = new Blob([response.data], { type: 'application/zip' });

      // Crea una URL temporal para el Blob
      const url = window.URL.createObjectURL(blob);

      // Crea un elemento <a> para simular el clic y descargar el archivo
      const a = document.createElement('a');
      a.href = url;
      a.download = `Documentos_${num_obra}.zip`; // Nombre del archivo ZIP descargado
      document.body.appendChild(a); // Necesario para Firefox
      a.click(); // Simula el clic para iniciar la descarga
      document.body.removeChild(a); // Limpia el DOM

      // Limpia la URL temporal
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Error al descargar el archivo ZIP: Respuesta del servidor no es 200.');
    }
  } catch (error) {
    console.error('Error al descargar el archivo ZIP:', error);
    alert('Hubo un problema al descargar la carpeta.');
  }
};

  return {
    //Propiedades
     expediente,
     expediModal,
     cedulaModal,
     registModal,
     comunidadModal,
     factibiModal,
     inovacionModal,
     calendarModal,
     tableExpeModal,

    //Metodos
    startAgregarExpe,
    starExpeModalValue,
    startCedulaModalValue,
    startAgregarCedula,
    startRegistroModalValue,
    startGenerarSolicitud,
    startComunuModalValue,
    startGenerarComunidad,
    startFactibiModalValue,
    startGenerarFactibi,
    startInovaModalValue,
    startGenerarInversion,
    startCalendarModalValue,
    startGenerarCalendario,
    startGuardarFtp,
    startTablaExpModalValue,
    startDescargarArchivo,
    startDescargarCarpeta
  }

  
}
