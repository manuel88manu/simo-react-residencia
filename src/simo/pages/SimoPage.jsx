import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { SimoLayout } from '../layout/SimoLayout'
import { AgregarUserView, GestionAvanceView, GestioUsersView } from '../views'
import { EditarUserView } from '../views/EditarUserView'
import { useViewStore } from '../../../hooks'
import { usePeriodoStore } from '../../../hooks/usePeriodoStore'
import { AgregarPeriodoView } from '../views/AgregarPeriodoView'
import { BoxFieldPeriodo } from '../../auth/components/BoxFieldPeriodo'
import { AvancesPresupuestos } from '../components/AvancesPresupuestos'
import { AgregarObraView } from '../views/AgregarObraView'
import { ObrasAcciones } from '../components/ObrasAcciones'
import { HistoricoView } from '../views/HistoricoView'
import { ContenidoHistorico } from '../components/ContenidoHistorico'
import { EditarPresupuesto } from '../views/EditarPresupuesto'
import { TablaPresupuesto } from '../components/TablaPresupuesto'
import { EditarObraView } from '../views/EditarObraView'
import { InfoObraEditar } from '../components/InfoObraEditar'
import { InicioView } from '../views/InicioView'
import { useObraStore } from '../../../hooks/useObraStore'
import { useExpediStore } from '../../../hooks/useExpediStore'
import { ActualizarPresuView } from '../views/ActualizarPresuView'
import { BoxActualPresu } from '../components/BoxActualPresu'

export const SimoPage = () => {
const { stateViewSimo,stateViewUser } = useViewStore()
const {vigente,startPeriodoVigen}=usePeriodoStore()
const {startAprobaModalValue,startModalPresuValue,startDictamenValue}=useObraStore()
const {starExpeModalValue,startTablaExpModalValue}=useExpediStore()


  // Crear una constante para simular que el valor de stateViewUser siempre es 'tablaUsuario'

  // Añadido para depuración
useEffect(() => {
startPeriodoVigen();

startAprobaModalValue(false);
startModalPresuValue(false);
startDictamenValue(false);

starExpeModalValue(false);
startTablaExpModalValue(false);


}, [stateViewSimo,stateViewUser,vigente])
  

  return (
    <>
    <SimoLayout>
      {
      (!vigente)?(
        <AgregarPeriodoView>
          <BoxFieldPeriodo/>
        </AgregarPeriodoView>
      ) :(
      stateViewSimo === "Gestión de Usuario"? (
        <GestioUsersView>
          {
            stateViewUser==="agregarUsuario"?
            <AgregarUserView/>
            :
            <EditarUserView/>

          }
               
        </GestioUsersView>
      ) : stateViewSimo === 'inicio' ? (
        <InicioView/>
      ) : stateViewSimo === 'Gestión de Avance' ? (
        <GestionAvanceView>
          {
            <AvancesPresupuestos/>
          }
        </GestionAvanceView>
      ) : stateViewSimo === 'Agregar Obra' ? (
          <AgregarObraView>
            {
              <ObrasAcciones/>
            }
          </AgregarObraView>
      ) : stateViewSimo === 'Histórico' ? (
        // Si el estado es 'otraVista', mostrar otro componente
        <HistoricoView>
          {<ContenidoHistorico/>}
        </HistoricoView>
      ) : stateViewSimo === 'Modificar Obras' ? (
        // Si el estado es 'perfil', mostrar vista de perfil
        <EditarPresupuesto>
          {<TablaPresupuesto/>}
        </EditarPresupuesto>
      ) : stateViewSimo === 'Editar Obra' ? (
        // Si el estado es 'perfil', mostrar vista de perfil
        <EditarObraView>
        {<InfoObraEditar/>}
        </EditarObraView>
      ): stateViewSimo === 'Editar Presupuesto' ? (
          <ActualizarPresuView>
          {
          <BoxActualPresu/>
          }
           </ActualizarPresuView>
      ): (
        // Si el estado no coincide con ninguno de los anteriores, mostrar un mensaje por defecto
        <Typography variant="h6">Vista desconocida</Typography>
      ))}
    </SimoLayout>
    </>
  )
}
