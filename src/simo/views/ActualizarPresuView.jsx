import React from 'react'
import { Box, Grid, Typography } from '@mui/material'


export const ActualizarPresuView = ({children}) => {
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
        <Typography variant='h3' sx={{ fontWeight: 'bold' }}> ACTUALIZAR PRESUPUESTOS</Typography>
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
