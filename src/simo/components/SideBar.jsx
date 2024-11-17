import { Box, Drawer, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import IconButtonWithLabel from './IconButtonWithLabel';
import { useViewStore } from '../../../hooks';

export const SideBar = () => {
  const { selectViewSimo } = useViewStore();

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
            onClick={() => selectViewSimo("Agregar Obra")} // Llamada modificada
          />
          <IconButtonWithLabel
            Icon={PendingActionsIcon}
            label="Gestión de Avance"
            onClick={() => selectViewSimo("Gestión de Avance")} // Llamada modificada
          />
          <IconButtonWithLabel
            Icon={CalendarMonthIcon}
            label="Histórico"
            onClick={() => selectViewSimo("Histórico")} // Llamada modificada
          />
          <IconButtonWithLabel
            Icon={PersonAddIcon}
            label="Gestión de Usuario"
            onClick={() => selectViewSimo("Gestión de Usuario")} // Llamada modificada
          />
          <IconButtonWithLabel
            Icon={PriceChangeIcon}
            label="Editar Presupuesto"
            onClick={() => selectViewSimo("Editar Presupuesto")} // Llamada modificada
          />
        </Grid>
      </Drawer>
    </Box>
  );
};
