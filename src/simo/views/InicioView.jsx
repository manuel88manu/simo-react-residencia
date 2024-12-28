import { Grid, styled, Typography } from '@mui/material'
import React from 'react'
import logoInicio from '../../assets/imagenes/implan inicio.jpg'
import logoPortada from '../../assets/imagenes/portada inicio.jpg'
export const InicioView = () => {
    const Img=styled("img")({
        width:350,
        height:70,
        objectFit:'cover',
        objectPosition:"center"

    })

        const ImgP=styled("img")({
        width:1300,
        height:520,
        objectFit:'cover',
        objectPosition:"center"

    })
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
      <Img src={logoInicio} alt='Logo Inicio' />
      </Grid>
<Grid item xs={12} sx={{ mt: 1 }}>
    <ImgP src={logoPortada}/>
</Grid>
</Grid>
  )
}
