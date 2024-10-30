
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import React from 'react'
import { goldenTheme } from './goldenTheme'

export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={goldenTheme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    {children}
  </ThemeProvider>

  )
}
