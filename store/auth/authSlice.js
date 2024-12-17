import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',// ''authenticated' , 'not-authenticated',
        user:{},
        usuarios:[],
        movimientos:[],
        errorMessage:undefined,
        ingresoExito:false,
        usuarioEditable:{
            idusuario:'',
            nombre:'',
            correo:'',
            username:'',
            activo:'',
            celular:'',
            rol:''
        }
    },
    reducers: {
        onChecking:(state)=>{
            state.status='cheking';
            state.user={};
            state.errorMessage=undefined
        },
        onLogin:(state,{payload})=>{
            state.status='authenticated';
            state.user=payload;
            state.errorMessage=undefined
        },
        onLogout:(state,{payload})=>{
            state.status='not-authenticated'
            state.user={}
            state.errorMessage=payload
        },
        clearErrorMessage:(state)=>{
            state.errorMessage=undefined
        },
        setMessageError:(state,{payload})=>{
          state.errorMessage=payload
        },
        setUsuarios:(state,{payload})=>{
            state.usuarios=payload
        },
        setUserExito:(state,{payload})=>{
            state.ingresoExito=payload
        },
        setUserEdit:(state,{payload})=>{
            state.usuarioEditable.nombre=payload.nombre;
            state.usuarioEditable.correo=payload.correo;
            state.usuarioEditable.username=payload.username;
            state.usuarioEditable.activo=payload.activo;
            state.usuarioEditable.celular=payload.celular;
            state.usuarioEditable.rol=payload.rol;
            state.usuarioEditable.idusuario=payload.idusuario;
        },
        setAgregarMoviemientos:(state,{payload})=>{
            state.movimientos=payload
        },
        setLimpiarMovimiento:(state)=>{
            state.movimientos=[]
        }
    }
});


// Action creators are generated for each case reducer function
    
export const { 
    onChecking,
    onLogin,
    onLogout,
    clearErrorMessage,
    setMessageError,
    setUsuarios,
    setUserExito,
    setUserEdit,
    setAgregarMoviemientos,
    setLimpiarMovimiento 

} = authSlice.actions;