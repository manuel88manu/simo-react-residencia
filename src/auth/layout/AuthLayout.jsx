import { Grid, Typography } from '@mui/material'
import React from 'react'
import { NavbarLogin } from '../components'

export const AuthLayout = ({children}) => {
  return (
    <Grid 
      container
      spacing={0}
      direction="column"
      alignItems="center"
    >
      <NavbarLogin />
      <Grid item sx={{
        background: 'white',
        width: '100%', 
        height: '70px', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography variant='h3' sx={{ fontWeight: 'bold' }}> Bienvenido a SIMO</Typography>
      </Grid>

        {children}

      </Grid>
  )
}
