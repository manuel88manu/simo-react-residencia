import { createSlice } from '@reduxjs/toolkit';

export const viewsSlice = createSlice({
    name: 'views',
    initialState: {
        stateViewSimo:'inicio',
        stateViewUser:'agregarUsuario',
        stateModalUser:false,
        estadoPresupuesto:'estatal'
    },
    reducers: {
        onStateSimo:(state,{payload})=>{
            state.stateViewSimo=payload

        },
        onStateUser:(state,{payload})=>{
            state.stateViewUser=payload
        },
        onModalUser:(state,{payload})=>{
            state.stateModalUser=payload
        },
        onEstadoPresupuesto:(state,{payload})=>{
            state.estadoPresupuesto=payload
        }
    }
});


// Action creators are generated for each case reducer function
export const { onStateSimo,onStateUser,onModalUser,onEstadoPresupuesto} = viewsSlice.actions;