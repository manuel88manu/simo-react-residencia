import React from 'react';
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const SimoApp = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </LocalizationProvider>
  );
};
