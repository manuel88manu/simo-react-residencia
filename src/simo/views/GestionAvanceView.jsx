import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useAuthStore, useViewStore } from '../../../hooks'
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { AlertaRol } from '../../../helpers';

export const GestionAvanceView = ({children}) => {

  const {selecTipoPeriodo,estadoPresupuesto,selectViewSimo}=useViewStore()
  const {user}=useAuthStore()

  const selectPresupuesto=(tipo)=>{

     selecTipoPeriodo(tipo)

  }
  return (
    <>
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
  justifyContent: 'space-between', // Esto asegura que los elementos se distribuyan
  alignItems: 'center',
  paddingLeft: '10px', // Un poco de espacio al lado izquierdo
  paddingRight: '10px' // Un poco de espacio al lado derecho
}}>

  <IconButton onClick={() =>{user.rol==='admin'?selectViewSimo("Editar Presupuesto"):AlertaRol("Editar Presupuesto",'Administrador')}}  sx={{ marginRight: 'auto' }}>
    <PriceChangeIcon sx={{ color: 'green', fontSize: '70px' }} />
  </IconButton>

  <Typography variant='h3' sx={{ fontWeight: 'bold', flexGrow: 1, textAlign: 'center' }}>
    GESTION DE AVANCE
  </Typography>

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
      justifyContent: 'space-between', // Distribución uniforme
      gap: 2, // Espacio entre los botones
      width: '80%', // Anchura del contenedor para ajustar la separación
      pt: 2 // Espaciado superior
    }}
  >
    <Button 
      variant="contained" 
      onClick={()=>selectPresupuesto('estatal')}
      sx={{
        background: (estadoPresupuesto==='estatal') ? 'primary.main' : 'gray',
        padding: '12px 24px',
        fontSize: '1.5rem',
        borderRadius: '20px',
        minWidth: '120px',
        color: 'white',
        fontWeight: 'bold'
      }}
    >
      Estatal
    </Button>
    <Button 
      variant="contained" 
      onClick={()=>selectPresupuesto('faismun')}
      sx={{
        background: (estadoPresupuesto==='faismun') ? 'primary.main' : 'gray',
        padding: '12px 24px',
        fontSize: '1.5rem',
        borderRadius: '20px',
        minWidth: '120px',
        color: 'white',
        fontWeight: 'bold'
      }}
    >
      FAISMUN
    </Button>
    <Button 
      variant="contained" 
      onClick={()=>selectPresupuesto('fortamun')}
      sx={{
        background: (estadoPresupuesto==='fortamun') ? 'primary.main' : 'gray',
        padding: '12px 24px',
        fontSize: '1.5rem',
        borderRadius: '20px',
        minWidth: '120px',
        color: 'white',
        fontWeight: 'bold'
      }}
    >
      FORTAMUN
    </Button>
    <Button 
      variant="contained" 
      onClick={()=>selectPresupuesto('odirectas')}
      sx={{
        background: (estadoPresupuesto==='odirectas') ? 'primary.main' : 'gray',
        padding: '12px 24px',
        fontSize: '1.5rem',
        borderRadius: '20px',
        minWidth: '120px',
        color: 'white',
        fontWeight: 'bold'
      }}
    >
      O.Directas
    </Button>
    <Button 
      variant="contained" 
      onClick={()=>selectPresupuesto('federal')}
      sx={{
        background: (estadoPresupuesto==='federal') ? 'primary.main' : 'gray',
        padding: '12px 24px',
        fontSize: '1.5rem',
        borderRadius: '20px',
        minWidth: '120px',
        color: 'white',
        fontWeight: 'bold'
      }}
    >
      Federal
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
    </>
  )
}
