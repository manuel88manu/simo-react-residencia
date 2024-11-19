import React, { useState, useEffect } from 'react';
import { NavbarLogin } from '../components';
import { Button, Container, Grid, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import FondoImplan from '../../assets/imagenes/imagenLogin.png';
import styled from '@emotion/styled';
import { AuthLayout } from '../layout/AuthLayout';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import { useAuthStore } from '../../../hooks';
import Swal from 'sweetalert2';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
};

export const LoginPage = () => {
  const { startLogin, errorMessage } = useAuthStore();
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);

  // Estado para manejar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Función para manejar el clic en el ícono de visibilidad
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ correo: loginEmail, contraseña: loginPassword });
  };

  const Img = styled("img")({
    width: 600,
    height: 400,
    objectFit: 'cover',
    objectPosition: "center"
  });

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autentificación', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <AuthLayout>
      <Grid container
        spacing={2}
        alignItems="flex-start"
        justifyContent="center"
        sx={{ position: 'relative', mt: 0 }}
      >
        <Grid 
          item 
          xs={8} 
          sx={{ 
            display: { xs: 'none', md: 'none', lg: 'flex' }, 
            justifyContent: 'center', 
            mt: 9 
          }}
        >
          <Img src={FondoImplan} alt='Fondo de Implan' />
        </Grid>

        <Grid 
          item
          className='box-shadow'
          xs={3}
          sx={{ 
            background: 'white', 
            padding: 3, 
            borderRadius: 2,
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            mt: 4,
            marginLeft: 0, 
            marginRight: 13, 
          }}
        >
          <Typography variant='h4' sx={{ mb: 1 }}>Iniciar Sesión</Typography>
          <form onSubmit={loginSubmit} style={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant='h5' sx={{ mb: 1 }}>Correo</Typography>
                <TextField 
                  label="Correo"
                  type='email'
                  placeholder='correo@example.com'
                  autoComplete="username"
                  fullWidth
                  name='loginEmail'
                  value={loginEmail}
                  onChange={onLoginInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='h5' sx={{ mb: 1 }}>Contraseña</Typography>
                <TextField 
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'} // Muestra la contraseña si `showPassword` es true
                  placeholder='contraseña'
                  autoComplete="current-password"
                  fullWidth
                  name='loginPassword'
                  value={loginPassword}
                  onChange={onLoginInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          onClick={handleClickShowPassword} 
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid container justifyContent="center" sx={{ margin: 5 }}>
                <Grid item>
                  <Button type='submit' variant='contained' sx={{ backgroundColor: 'secondary.main', color: '#FFFFFF' }}>
                    Ingresar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
