  import React, { useEffect } from 'react'
  import { NavbarLogin } from '../components'
  import { Button, Container, Grid, TextField, Typography } from '@mui/material' // Cambiado a Grid
  import FondoImplan from '../../assets/imagenes/imagenLogin.png'
  import styled from '@emotion/styled'
  import { AuthLayout } from '../layout/AuthLayout'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../../hooks/useForm'
import { useAuthStore } from '../../../hooks'
import Swal from 'sweetalert2'

  const loginFormFields={
      loginEmail:'',
      loginPassword:''
  }

  export const LoginPage = () => {

    const {startLogin,errorMessage}=useAuthStore()
    const {loginEmail,loginPassword,onInputChange:onLoginInputChange}= useForm(loginFormFields)
    
    const loginSubmit=(event)=>{
      event.preventDefault();
      startLogin({correo: loginEmail, contraseña: loginPassword})
    }

    const Img = styled("img")({
      width: 600,
      height: 400,
      objectFit: 'cover',
      objectPosition: "center"
    });

    useEffect(() => {
      if(errorMessage !==undefined){
         Swal.fire('Error en la autentificacion', errorMessage,'error')
      }
  
    }, [errorMessage])
    

    return (
        
        <AuthLayout>
          <Grid container
    spacing={2} // Espaciado entre items
    alignItems="flex-start" // Alineación vertical al inicio
    justifyContent="center" // Centra horizontalmente
    sx={{ position: 'relative', mt: 0 }} // Añadí margen superior al contenedor
  >
      <Grid 
        item 
        xs={8} 
        sx={{ 
          display: { xs:'none', md: 'none',lg: 'flex' }, // Oculta en xs y sm, muestra en md y mayores
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
        display: 'flex', // Utiliza flexbox para centrar el contenido
        flexDirection: 'column', // Alinea el contenido en columna
        alignItems: 'center', // Centra horizontalmente
        mt: 4,
        // Elimina cualquier margen que afecte a otros items
        marginLeft: 0, // Asegúrate de que no haya margen a la izquierda
        marginRight: 13, // Asegúrate de que no haya margen a la derecha
      }}
    >
      <Typography variant='h4' sx={{ mb: 1 }}>Iniciar Sesión</Typography>
      <form onSubmit={loginSubmit} style={{ width: '100%' }}> {/* Asegura que el formulario ocupe todo el ancho */}
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
              type='password'
              placeholder='contraseña'
              autoComplete="current-password"
              fullWidth
              name='loginPassword'
              value={loginPassword}
              onChange={onLoginInputChange}
            />
          </Grid>
          <Grid container justifyContent="center" sx={{margin:5}}>
            <Grid item >
            <Button type='submit' variant='contained' sx={{backgroundColor:'secondary.main', color: '#FFFFFF'}} >
            Ingresar
          </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
    </Grid>

        </AuthLayout>
        
    )
  }
