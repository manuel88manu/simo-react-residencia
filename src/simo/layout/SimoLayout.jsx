
import React, { useEffect } from 'react'
import { NavBarHome } from '../components/NavBarHome'
import { Box, Toolbar } from '@mui/material'
import { SideBar } from '../components/SideBar'
import { usePeriodoStore } from '../../../hooks'
import Swal from 'sweetalert2'

export const SimoLayout = ({children}) => {

  const {presuFaismun,vigente}=usePeriodoStore()

  useEffect(() => {
    // const fechaHoy = new Date('2024-06-20T00:00:00Z'); //Prueba
    const fechaHoy = new Date();
    const añoActual = fechaHoy.getUTCFullYear(); 
    
     //Fecha para faismun, prodim y otros
     const fechaLimitFaismun = new Date(Date.UTC(añoActual, 10, 20)); //30 de noviembre del año actual
     const fechaLimitProdim = new Date(Date.UTC(añoActual, 5, 20)); // 30 de junio del año actual en UTC
     const fechaLimitOtros = new Date(Date.UTC(añoActual,11, 20)); // 30 de junio del año actual en UTC

     if(fechaHoy.getTime() === fechaLimitProdim.getTime() && presuFaismun.prodim===1){
      Swal.fire({
        title: `Fecha Limite para PRODIM 30 de junio ${añoActual}`,
        text: "Tienes 10 dias para hacer uso del presupuesto PRODIM",
        icon: "error",
        confirmButtonText: "Aceptar",
    });
     }

     if(fechaHoy.getTime() === fechaLimitFaismun.getTime()){
      Swal.fire({
        title: `Fecha Limite para FAISMUN 30 de Noviembre ${añoActual}`,
        text: "Tienes 10 dias para hacer uso del presupuesto FAISMUN",
        icon: "error",
        confirmButtonText: "Aceptar",
    });
     }

     if(fechaHoy.getTime() === fechaLimitOtros.getTime()){
      Swal.fire({
        title: `Fecha Limite del Periodo 30 de Diciembre ${añoActual}`,
        text: "Tienes 10 dias para hacer uso del presupuesto restante",
        icon: "error",
        confirmButtonText: "Aceptar",
    });
     }


  }, [vigente])


  return (
    
    <Box sx={{display:'flex'}}>
           
           <NavBarHome/>
           <SideBar/>  

        <Box
            component='main'
            sx={{flexGrow:1, pt:3}}
        >
            <Toolbar/>
            {children}

        </Box> 
    </Box>

    
  )
}

