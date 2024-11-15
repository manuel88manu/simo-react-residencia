import { useDispatch, useSelector } from "react-redux"
import { simoApi } from "../api"
import { clearErrorMessage, onChecking, onLogin, onLogout, setMessageError } from "../store/auth/authSlice"

export const useAuthStore=()=>{
    const {status,user,errorMessage}=useSelector(state=>state.auth)
    const dispatch= useDispatch()

    const startLogin=async({correo,contraseña})=>{
        dispatch(onChecking())
        try {
            const {data}= await simoApi.post('/auth',{correo,contraseña})
            localStorage.setItem('token',data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({name:data.name, uid:data.uid}))

        } catch (error) {
            dispatch(onLogout('Credenciales incorectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }

    }

    const startRegister=async({nombre,correo,username,activo,celular,rol,contraseña})=>{
        try {
            const {data}= await simoApi.post('/auth/new',{nombre,correo,username,activo,celular,rol,contraseña})
            //localStorage.setItem('token',data.token)
            //localStorage.setItem('token-init-date', new Date().getTime())
            //dispatch(onLogin({name:data.name, uid:data.uid}))

        } catch (error) {
            dispatch(setMessageError(error.response.data?.msg || ''))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }

    }

    const checkAuthToken=async()=>{
        const token=localStorage.getItem('');
        if(!token) return dispatch(onLogout())
        
            try {
                const {data}=await simoApi.get('/auth/renew');
                localStorage.setItem('token',data.token)
                localStorage.setItem('token-init-date', new Date().getTime())
                dispatch(onLogin({name:data.name, uid:data.uid}))
            } catch (error) {
                localStorage.clear()
                return dispatch(onLogout())
            }
    }

    const startLogout=()=>{
        localStorage.clear()
        dispatch(onLogout())
    }

  
    return{
        //Propiedades
            status,
            user,
            errorMessage,
        //metodos
            startLogin,
            startRegister,
            checkAuthToken,
            startLogout

    }
}