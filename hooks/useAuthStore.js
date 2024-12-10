import { useDispatch, useSelector } from "react-redux"
import { simoApi } from "../api"
import { clearErrorMessage, onChecking, onLogin, onLogout, setMessageError, setUserEdit, setUserExito, setUsuarios } from "../store/auth/authSlice"
import { onModalUser } from "../store/views/viewSlice"

export const useAuthStore=()=>{
    const {status,user,errorMessage,usuarios,ingresoExito,usuarioEditable}=useSelector(state=>state.auth)
    const dispatch= useDispatch()

    const startLogin=async({correo,contraseña})=>{
        dispatch(onChecking())
        try {
            const {data}= await simoApi.post('/auth',{correo,contraseña})
            localStorage.setItem('token',data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({name:data.name, uid:data.uid}))

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || ''))
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
            dispatch(setUserExito(true))
            setTimeout(() => {
                dispatch(setUserExito(false))
            }, 20);

        } catch (error) {
            console.log(error)
            dispatch(setMessageError(error.response.data?.msg || ''))
            dispatch(setUserExito(false))
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

    const startLogout=async()=>{
        localStorage.clear()
        dispatch(onLogout())
    }

    const starUsuarios=async()=>{
    try {
        const {data}=await simoApi.get('/auth/users');
        dispatch(setUsuarios(data.usuariosArr))
    } catch (error) {
        console.log(error)
    }
    }

    const startUsuarioEdit = async (user) => {
        dispatch(setUserEdit(user));
    };

    const startActulizarUsuario = async (payload) => {
        try {
            const { data } = await simoApi.put(`/auth/${payload.idusuario}`, payload);
            dispatch(onModalUser(false))
            // Si todo sale bien, podrías manejar la respuesta aquí
        } catch (error) {
            const messageError = error.response?.data?.msg || 'Ha ocurrido un error al actualizar el usuario.';
            console.log(messageError);
           // Actualiza el estado de error en Redux
            setTimeout(() => {
            // Limpia el mensaje después de un tiempo
            }, 5000); // 5 segundos de espera para visualizar el mensaje
            throw new Error(messageError); // Lanzamos el error para que el catch en `startActualizar` lo capture
        }
    };
    return{
        //Propiedades
            status,
            user,
            errorMessage,
            usuarios,
            ingresoExito,
            usuarioEditable,
        //metodos
            startLogin,
            startRegister,
            checkAuthToken,
            startLogout,
            starUsuarios,
            startUsuarioEdit,
            startActulizarUsuario

    }
}