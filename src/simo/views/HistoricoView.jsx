import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

export const HistoricoView = ({children}) => {
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
        <Typography variant='h3' sx={{ fontWeight: 'bold' }}> HISTORICO</Typography>
      </Grid>
      <Box
            component='main'
            sx={{flexGrow:1, pt:1, width: '100%',}}
        >
            {children}

        </Box> 
  </Grid>
  )
}
