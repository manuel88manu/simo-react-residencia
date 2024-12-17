import { useDispatch, useSelector } from "react-redux"
import { simoApi } from "../api"
import { clearErrorMessage, onChecking, onLogin, onLogout, setAgregarMoviemientos, setLimpiarMovimiento, setMessageError, setUserEdit, setUserExito, setUsuarios } from "../store/auth/authSlice"
import { onModalUser } from "../store/views/viewSlice"

export const useAuthStore=()=>{
    const {status,user,errorMessage,usuarios,ingresoExito,usuarioEditable,movimientos}=useSelector(state=>state.auth)
    const dispatch= useDispatch()

    const startLogin=async({correo,contraseña})=>{
        dispatch(onChecking())
        try {
            const {data}= await simoApi.post('/auth',{correo,contraseña})
            localStorage.setItem('token',data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({name:data.name, uid:data.uid,correo:correo}))

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
            await startMovimientoAgregar(`Dio de alta al usuario ${correo}`)
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
            await startMovimientoAgregar(`Actualizo al usuario ${payload.correo}`)
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

    const startMovimientoAgregar=async(accion)=>{
        try {
            const idUsuario=user.uid
            const correo=user.correo
            await simoApi.post('/auth/movimientos',{idUsuario,correo,accion})

        } catch (error) {
            const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
            throw new Error(messageError);
        }
    }

    const startObtenerMovimientos=async(dia,año,correo)=>{
        try {
            const {data}=await simoApi.get(`/auth/obtenermovi`,{params:{dia,año,correo}})
            dispatch(setAgregarMoviemientos(data.movimientos))
        } catch (error) {
            const messageError = error.response?.data?.msg || 'Ha ocurrido un error al Ingresar la obra';
            throw new Error(messageError);
        }
    }

    const startLimpiarMovimientos=()=>{
        dispatch(setLimpiarMovimiento())
    }
    return{
        //Propiedades
            status,
            user,
            errorMessage,
            usuarios,
            ingresoExito,
            usuarioEditable,
            movimientos,
        //metodos
            startLogin,
            startRegister,
            checkAuthToken,
            startLogout,
            starUsuarios,
            startUsuarioEdit,
            startActulizarUsuario,
            startMovimientoAgregar,
            startObtenerMovimientos,
            startLimpiarMovimientos

    }
}