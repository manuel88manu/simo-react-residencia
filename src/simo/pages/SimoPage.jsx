import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { SimoLayout } from '../layout/SimoLayout'
import { AgregarUserView, GestioUsersView } from '../views'
import { EditarUserView } from '../views/EditarUserView'
import { useViewStore } from '../../../hooks'

export const SimoPage = () => {
  const { stateViewSimo,stateViewUser } = useViewStore()

  // Crear una constante para simular que el valor de stateViewUser siempre es 'tablaUsuario'

  // Añadido para depuración
  useEffect(() => {
  }, [stateViewSimo,stateViewUser])

  return (
    <SimoLayout>
      {stateViewSimo === "Gestión de Usuario"? (
        <GestioUsersView>
          {
            stateViewUser==="agregarUsuario"?
            <AgregarUserView/>
            :
            <EditarUserView/>

          }
               
        </GestioUsersView>
      ) : stateViewSimo === 'inicio' ? (
        <div>
          <Typography variant="h4">Bienvenido a la Página de Inicio</Typography>
        </div>
      ) : stateViewSimo === 'agregarUsuario' ? (
        // Si el estado es 'agregarUsuario', mostrar la vista de agregar usuario
        <div>
          <Typography variant="h4">Agregar Nuevo Usuario</Typography>
          <AgregarUserView />
        </div>
      ) : stateViewSimo === 'editarUsuario' ? (
        // Si el estado es 'editarUsuario', mostrar la vista de edición de usuario
        <div>
          <Typography variant="h4">Editar Usuario</Typography>
          <EditarUserView />
        </div>
      ) : stateViewSimo === 'otraVista' ? (
        // Si el estado es 'otraVista', mostrar otro componente
        <div>
          <Typography variant="h4">Otra Vista</Typography>
        </div>
      ) : stateViewSimo === 'perfil' ? (
        // Si el estado es 'perfil', mostrar vista de perfil
        <div>
          <Typography variant="h4">Mi Perfil</Typography>
        </div>
      ) : (
        // Si el estado no coincide con ninguno de los anteriores, mostrar un mensaje por defecto
        <Typography variant="h6">Vista desconocida</Typography>
      )}
    </SimoLayout>
  )
}
