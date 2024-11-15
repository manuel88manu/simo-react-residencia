import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { SimoRoutes } from '../simo/routes/SimoRoutes'
import { getEnvVariables } from '../../helpers'
import { useAuthStore } from '../../hooks'

export const AppRouter = () => {
  const{status,checkAuthToken}=useAuthStore()

  
  useEffect(() => {
    checkAuthToken()
  }, [])


  if(status==='checking'){
    return(
      <h1>Cargando...</h1>
    )

  }

  
  return (
    <Routes>
         
         {
           
           (status==='not-authenticated')
              ?(
                <>
                  <Route path='/auth/*' element={<AuthRoutes/>}/>
                  <Route path='/*' element={<Navigate to="/auth/login"/>}/>
                </>
            )
              :(
                <>
                   <Route path='/' element={<SimoRoutes/>}/>
                   <Route path='/*' element={<Navigate to="/"/>}/>
                </>
              )
           
         }

       

    </Routes>

  )
}
