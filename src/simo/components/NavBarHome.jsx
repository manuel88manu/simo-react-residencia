import { AppBar, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import logoImplan from '../../assets/imagenes/logoImplan.png'
import styled from '@emotion/styled'
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthStore } from '../../../hooks';
export const NavBarHome = () => {
    const {startLogout,user}=useAuthStore()
    const Img=styled("img")({
        width:100,
        height:100,
        objectFit:'cover',
        objectPosition:"center"

    })
  return (
    <>
        <AppBar  position='fixed' sx={{ width: '100%', height: '90px' }}>
         <Grid container
             spacing={0}
             direction="row"
             alignItems="center"
             justifyContent="space-between" 
         >

        <Grid item>
           <Typography variant='h4' sx={{ml:2}} >{user.name}</Typography>
        </Grid>    

    <Grid 
        item 
        sx={{ 
            display: 'flex', 
            alignItems: 'center', // Alinea verticalmente
            flexDirection: 'row'  // Organiza en una fila
        }}
        >
        <Img src={logoImplan} alt='Logo de Implan' />
        <Typography variant='h2' sx={{ fontWeight: 'bold' }}>SIMO</Typography>
        </Grid>

    <Grid item>
        <IconButton 
            sx={{ 
            color: 'black', // Cambia el color del ícono a negro
            fontSize: '5rem', // Ajusta el tamaño del botón y el ícono
            mr:2
            }}
            onClick={startLogout}
        >
            <LogoutIcon sx={{ fontSize: '5rem' }} /> {/* Ajusta el tamaño del ícono */}
        </IconButton>
        </Grid>

            
         </Grid>   
        </AppBar>
    </>
  )
}
