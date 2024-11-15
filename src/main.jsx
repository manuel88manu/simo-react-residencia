import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { SimoApp } from './SimoApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import{Provider} from 'react-redux'
import { store } from '../store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
   <BrowserRouter>
   <SimoApp/>
   </BrowserRouter>
    </Provider>
  </StrictMode>, 
)
