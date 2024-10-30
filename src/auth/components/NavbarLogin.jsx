import styled from '@emotion/styled'
import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import logoImplan from '../../assets/imagenes/logoImplan.png'

export const NavbarLogin = () => {
    const Img=styled("img")({
        width:100,
        height:100,
        objectFit:'cover',
        objectPosition:"center"

    })
  return (
   <>
    <AppBar  position='static' sx={{ width: '100%', height: '90px' }}>
        <Toolbar>
        <Img src={logoImplan} alt='Logo de Implan'/>
        </Toolbar>
    </AppBar>
   </>
  )
}
