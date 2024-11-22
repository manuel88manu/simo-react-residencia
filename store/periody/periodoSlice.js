import { createSlice } from '@reduxjs/toolkit';

export const periodoSlice = createSlice({
    name: 'periodo',
    initialState: {
        periodo:{
            idperiodo:null,
            año:'',
            fecha_inicial:'',
            fecha_final:''
        },
        vigente:false
    },
    reducers: {
        getPeriodo:(state,{payload})=>{
            state.periodo=payload;
            state.vigente=true
        },
        getSinVigencia:(state)=>{
            state.periodo={},
            state.vigente=false
        }
    }
});


// Action creators are generated for each case reducer function
export const {getPeriodo,getSinVigencia} = periodoSlice.actions;