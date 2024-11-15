import React from 'react';
import { IconButton, Box, Typography } from '@mui/material';

const IconButtonWithLabel = ({ Icon, label }) => {
    const iconSize = '3.6rem'; // Tamaño uniforme para todos los íconos
    const iconColor = 'white'; // Color uniforme para todos los íconos y textos
  return (
    <IconButton>
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