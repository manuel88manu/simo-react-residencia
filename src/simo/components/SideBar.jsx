import { Box, Drawer, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import IconButtonWithLabel from './IconButtonWithLabel';
import { useAuthStore, useViewStore } from '../../../hooks';
import { AlertaRol } from '../../../helpers';

export const SideBar = () => {
  const { selectViewSimo } = useViewStore();
  const {user}=useAuthStore()

  return (
    <Box
      component="nav"
      sx={{
        width: 150,
        flexShrink: 0,
        bgcolor: 'secondary.main', // Color de fondo del Box, puedes cambiarlo al color deseado
      }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 150,
            top: '90px',
          },
        }}
        PaperProps={{
          sx: {
            bgcolor: 'secondary.main', // Color de fondo del Drawer
            color: '#ffffff', // Color del texto y contenido dentro del Drawer
          },
        }}
      >
        <Grid container justifyContent="center" direction="column">
          <IconButtonWithLabel
            Icon={AddCircleOutlineIcon}
            label="Agregar Obra"
            onClick={() =>{user.rol!='viewer'?selectViewSimo("Agregar Obra"):AlertaRol("Agregar Obra",'Administrador y Moderador')}} // Llamada modificada
          />
          <IconButtonWithLabel
            Icon={PendingActionsIcon}
            label="Gestión de Avance"
            onClick={() =>{user.rol!='editor'?selectViewSimo("Gestión de Avance"):AlertaRol("Gestión de Avance",'Administrador y Visitante')}} // Llamada modificada
          />
          <IconButtonWithLabel
            Icon={CalendarMonthIcon}
            label="Histórico"
            onClick={() =>{user.rol!='editor'?selectViewSimo("Histórico"):AlertaRol("Histórico",'Visitante y Administrador')}} // Llamada modificada
          />
          <IconButtonWithLabel
            Icon={PersonAddIcon}
            label="Gestión de Usuario"
            onClick={() =>{user.rol==='admin'?selectViewSimo("Gestión de Usuario"):AlertaRol("Gestión de Usuario",'Administrador')}} // Llamada modificada
          />
          <IconButtonWithLabel
            Icon={PriceChangeIcon}
            label="Modificar Obras"
            onClick={() =>{user.rol==='admin'?selectViewSimo("Modificar Obras"):AlertaRol("Modificar Obras",'Administrador')}} // Llamada modificada
          />
        </Grid>
      </Drawer>
    </Box>
  );
};
