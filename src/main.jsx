import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { SimoApp } from './SimoApp.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
   <SimoApp/>
   </BrowserRouter>
  </StrictMode>, 
)
