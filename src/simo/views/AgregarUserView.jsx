import React, { useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Grid, TextField, Select, MenuItem, Button, InputLabel, FormControl, IconButton } from '@mui/material';
import { useForm } from '../../../hooks/useForm';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../../hooks';

const registerFormFields = {
  nombrecompleto: '',
  nombreUsuario: '',
  contraseña: '',
  correo: '',
  constreña2: '',
  celular: '',
  rol: ''  // Valor inicial adecuado para el Select
};

const activo=true;
export const AgregarUserView = () => {
   const {startRegister,errorMessage}= useAuthStore()
  // Asegúrate de que el hook useForm esté recibiendo los valores iniciales correctamente
  const { nombrecompleto, nombreUsuario, contraseña, correo, constreña2, celular, rol, onInputChange } = useForm(registerFormFields);

  const registerSubmit=(event)=>{
    event.preventDefault();
    if(contraseña !==constreña2){
      Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error')
    }
    else{
      try {

        startRegister({nombre:nombrecompleto,username:nombreUsuario,contraseña:contraseña,correo:correo,rol:rol,activo:activo,celular:celular })
        Swal.fire({
          title: '¡Operación exitosa!',
          text: 'Se logro Agregar un usuario correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        
      } catch (error) {
        
      }
    
    }
  }

  useEffect(() => {
    if(errorMessage !==undefined){
       Swal.fire('Error en la autentificacion', errorMessage,'error')
    }

  }, [errorMessage])
  return (
    <Grid
      container
      spacing={2}
      sx={{ padding: 2, justifyContent: 'center' }} // Centrado del Grid contenedor
    >
      <Grid item xs={12} md={8} lg={6}> {/* Contenedor más pequeño dentro del grid */}
        <Box
          sx={{
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 3, // Bordes más redondeados
            boxShadow: 5, // Sombra más profunda
            minHeight: '400px', // Un rectángulo más grande
            display: 'flex',
            flexDirection: 'column',
            gap: 3, // Espacio entre los campos
          }}
        >
          <form onSubmit={registerSubmit}>
            <Grid container spacing={2}>
              {/* Nombre Completo */}
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
              {/* Nombre de Usuario */}
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
                  type="password"
                  name="contraseña"
                  value={contraseña}
                  onChange={onInputChange}
                />
              </Grid>

              {/* Correo */}
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
                  type="password"
                  name="constreña2"
                  value={constreña2}
                  onChange={onInputChange}
                />
              </Grid>

              {/* Número de Celular */}
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

              {/* Rol */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Rol</InputLabel>
                  <Select
                    label="Rol"
                    name="rol"
                    value={rol || ''}  // Asegura que nunca sea undefined
                    onChange={onInputChange}
                  >
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="user">Usuario</MenuItem>
                    <MenuItem value="guest">Invitado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Botón Agregar */}
            <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
              <IconButton type='submit'>
                <AddCircleIcon sx={{ fontSize: '3.7rem', color: 'primary.main' }} />
              </IconButton>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
