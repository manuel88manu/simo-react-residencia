import { Typography } from '@mui/material'
import React from 'react'
import { SimoLayout } from '../layout/SimoLayout'
import { AgregarUserView, GestioUsersView } from '../views'
import { EditarUserView } from '../views/EditarUserView'


export const SimoPage = () => {
  return (
    
    <SimoLayout>
      <GestioUsersView>
        {
          <AgregarUserView/>
          //<EditarUserView/>
        }
      </GestioUsersView>
    </SimoLayout>
  
  )
}
