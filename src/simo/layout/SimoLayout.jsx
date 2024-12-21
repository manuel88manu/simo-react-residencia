
import React, { useEffect } from 'react'
import { NavBarHome } from '../components/NavBarHome'
import { Box, Toolbar } from '@mui/material'
import { SideBar } from '../components/SideBar'
import { usePeriodoStore } from '../../../hooks'
import Swal from 'sweetalert2'

export const SimoLayout = ({children}) => {

  const {presuFaismun,vigente}=usePeriodoStore()

 useEffect(() => { 
    // Crear la fecha de hoy en la zona horaria local
    const fechaHoy = new Date(); // Fecha en la zona horaria local
    const añoActual = fechaHoy.getFullYear(); // Utiliza getFullYear() en vez de getUTCFullYear()

    // Normalizar la fecha de hoy (solo día, mes y año)
    const normalizarFecha = (fecha) => {
        return {
            year: fecha.getFullYear(), // Usa getFullYear() para la fecha local
            month: fecha.getMonth(), // Usa getMonth() para la fecha local
            day: fecha.getDate() // Usa getDate() para la fecha local
        };
    };

    const fechaHoyNormalizada = normalizarFecha(fechaHoy);
    
    // Fechas límite normalizadas (solo día, mes y año)
    const fechaLimitFaismun = normalizarFecha(new Date(añoActual, 10, 20)); // 20 de noviembre
    const fechaLimitProdim = normalizarFecha(new Date(añoActual, 5, 20));  // 20 de junio
    const fechaLimitOtros = normalizarFecha(new Date(añoActual, 11, 20));  // 20 de diciembre

    // Comparar las fechas solo por día, mes y año
    if (
        fechaHoyNormalizada.year === fechaLimitProdim.year &&
        fechaHoyNormalizada.month === fechaLimitProdim.month &&
        fechaHoyNormalizada.day === fechaLimitProdim.day &&
        presuFaismun.prodim === 1
    ) {
      Swal.fire({
        title: `Fecha Limite para PRODIM 30 de junio ${añoActual}`,
        text: "Tienes 10 días para hacer uso del presupuesto PRODIM",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }

    if (
        fechaHoyNormalizada.year === fechaLimitFaismun.year &&
        fechaHoyNormalizada.month === fechaLimitFaismun.month &&
        fechaHoyNormalizada.day === fechaLimitFaismun.day
    ) {
      Swal.fire({
        title: `Fecha Limite para FAISMUN 30 de Noviembre ${añoActual}`,
        text: "Tienes 10 días para hacer uso del presupuesto FAISMUN",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }

    if (
        fechaHoyNormalizada.year === fechaLimitOtros.year &&
        fechaHoyNormalizada.month === fechaLimitOtros.month &&
        fechaHoyNormalizada.day === fechaLimitOtros.day
    ) {
      Swal.fire({
        title: `Fecha Limite del Periodo 30 de Diciembre ${añoActual}`,
        text: "Tienes 10 días para hacer uso del presupuesto restante",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }

}, [vigente]);

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

