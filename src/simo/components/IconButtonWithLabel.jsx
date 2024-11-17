import React from 'react';
import { IconButton, Box, Typography } from '@mui/material';

const IconButtonWithLabel = ({ Icon, label, onClick }) => {
  const iconSize = '3.6rem'; // Tamaño uniforme para todos los íconos
  const iconColor = 'white'; // Color uniforme para todos los íconos y textos

  return (
    <IconButton onClick={onClick}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Icon sx={{ fontSize: iconSize, color: iconColor }} />
        <Typography variant="h6" sx={{ color: iconColor }}>
          {label}
        </Typography>
      </Box>
    </IconButton>
  );
};

export default IconButtonWithLabel;