
import React from 'react'
import { NavBarHome } from '../components/NavBarHome'
import { Box, Toolbar } from '@mui/material'
import { SideBar } from '../components/SideBar'

export const SimoLayout = ({children}) => {
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

