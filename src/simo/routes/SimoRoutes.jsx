import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SimoPage } from '../pages/SimoPage'

export const SimoRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<SimoPage/>}/>
        <Route path='/*' element={<Navigate to="/"/>}/>
    </Routes>
  )
}
