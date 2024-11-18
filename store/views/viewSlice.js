import { createSlice } from '@reduxjs/toolkit';

export const viewsSlice = createSlice({
    name: 'views',
    initialState: {
        stateViewSimo:'inicio',
        stateViewUser:'agregarUsuario',
        stateModalUser:false
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
        }
    }
});


// Action creators are generated for each case reducer function
export const { onStateSimo,onStateUser,onModalUser } = viewsSlice.actions;