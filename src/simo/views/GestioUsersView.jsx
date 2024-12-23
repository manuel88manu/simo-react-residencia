import { Box, Button, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useViewStore } from '../../../hooks'

export const GestioUsersView = ({children}) => {
   const {selectViewUser,stateViewUser} =useViewStore()

   const selecEstadoAgregar=()=>{
    selectViewUser("agregarUsuario")
    
   }

   const selecEstadoEditar=()=>{
    selectViewUser("editarUsuario")

   }

  return (
    <Grid 
    container
    spacing={0}
    direction="column"
    alignItems="center"
  >
    <Grid item sx={{
        background: 'white',
        width: '100%', 
        height: '70px', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography variant='h3' sx={{ fontWeight: 'bold' }}> GESTION DE USUARIOS</Typography>
      </Grid>

      <Grid
  item
  sx={{
    width: '100%', 
    height: '70px', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}
>
  <Box 
    sx={{
      display: 'flex',
      gap: 9,
      pt:2 // Espacio entre los botones
    }}
  >
    <Button 
      variant="contained" 
      onClick={selecEstadoAgregar}
      sx={{
        background:(stateViewUser==='agregarUsuario')? 'primary.main':'gray',
        padding: '12px 24px', // Tamaño más grande
        fontSize: '1rem',     // Tamaño de texto más grande
        borderRadius: '20px', // Bordes redondeados
        minWidth: '120px',    // Ancho mínimo para el botón
        color: 'white',          // Color de texto blanco
        fontWeight: 'bold'       // Texto en negrita
      }}
    >
      Agregar Usuario
    </Button>
    <Button 
      variant="contained" 
      onClick={selecEstadoEditar}
      sx={{
        background:(stateViewUser==='editarUsuario')? 'primary.main':'gray',
        padding: '12px 24px', // Tamaño más grande
        fontSize: '1rem',     // Tamaño de texto más grande
        borderRadius: '20px', // Bordes redondeados
        minWidth: '120px',    // Ancho mínimo para el botón
        color: 'white',          // Color de texto blanco
        fontWeight: 'bold'       // Texto en negrita
      }}
    >
      Editar Usuarios
    </Button>
  </Box>
</Grid>
       <Box
            component='main'
            sx={{flexGrow:1, pt:1}}
        >
            {children}

        </Box> 

    </Grid>
  )
}
