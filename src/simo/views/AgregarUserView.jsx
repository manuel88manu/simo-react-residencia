import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Grid, TextField, Select, MenuItem, Button, InputLabel, FormControl, IconButton } from '@mui/material';
import { useForm } from '../../../hooks/useForm';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../../hooks';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const registerFormFields = {
  nombrecompleto: '',
  nombreUsuario: '',
  contraseña: '',
  correo: '',
  constreña2: '',
  celular: '',
  rol: ''  // Valor inicial adecuado para el Select
};

const activo = true;
export const AgregarUserView = () => {
  const { startRegister, errorMessage, ingresoExito } = useAuthStore();
  const { nombrecompleto, nombreUsuario, contraseña, correo, constreña2, celular, rol, onInputChange } = useForm(registerFormFields);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerSubmit = (event) => {
    event.preventDefault();
    if (contraseña !== constreña2) {
      Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
    } else {
      startRegister({ nombre: nombrecompleto, username: nombreUsuario, contraseña: contraseña, correo: correo, rol: rol, activo: activo, celular: celular });
    }
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autentificación', errorMessage, 'error');
    }
  }, [errorMessage]);

  useEffect(() => {
    if (ingresoExito) {
      Swal.fire({
        title: '¡Operación exitosa!',
        text: 'Se logró agregar un usuario correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    }
  }, [ingresoExito]);

  return (
    <Grid container spacing={2} sx={{ padding: 2, justifyContent: 'center' }}>
      <Grid item xs={12} md={8} lg={6}>
        <Box
          sx={{
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 3,
            boxShadow: 5,
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <form onSubmit={registerSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre Completo"
                  variant="outlined"
                  name="nombrecompleto"
                  value={nombrecompleto}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre de Usuario"
                  variant="outlined"
                  name="nombreUsuario"
                  value={nombreUsuario}
                  onChange={onInputChange}
                />
              </Grid>

              {/* Contraseña */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contraseña"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  name="contraseña"
                  value={contraseña}
                  onChange={onInputChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  variant="outlined"
                  type="email"
                  name="correo"
                  value={correo}
                  onChange={onInputChange}
                />
              </Grid>

              {/* Repetir Contraseña */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Repita Contraseña"
                  variant="outlined"
                  type={showConfirmPassword ? "text" : "password"}
                  name="constreña2"
                  value={constreña2}
                  onChange={onInputChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Número de Celular"
                  variant="outlined"
                  type="tel"
                  name="celular"
                  value={celular}
                  onChange={onInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Rol</InputLabel>
                  <Select
                    label="Rol"
                    name="rol"
                    value={rol || ''}
                    onChange={onInputChange}
                  >
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="editor">Usuario</MenuItem>
                    <MenuItem value="viewer">Invitado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
              <IconButton type="submit">
                <AddCircleIcon sx={{ fontSize: '3.7rem', color: 'primary.main' }} />
              </IconButton>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};
