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
            vigente:false,
            presuEstatal:{
                idPresupuesto:undefined,
                tipo:'',
                prodim:undefined,
                indirectos:undefined,
                monto_inici:undefined,
                monto_rest:undefined,
                periodo_idperiodo:undefined
            },
            presuFaismun:{
                idPresupuesto:undefined,
                tipo:'',
                prodim:undefined,
                indirectos:undefined,
                monto_inici:undefined,
                monto_rest:undefined,
                periodo_idperiodo:undefined
            },
            presuFortamun:{
                idPresupuesto:undefined,
                tipo:'',
                prodim:undefined,
                indirectos:undefined,
                monto_inici:undefined,
                monto_rest:undefined,
                periodo_idperiodo:undefined
            },
            presuOdirectas:{
                idPresupuesto:undefined,
                tipo:'',
                prodim:undefined,
                indirectos:undefined,
                monto_inici:undefined,
                monto_rest:undefined,
                periodo_idperiodo:undefined
            },
            presuFederal:{
                idPresupuesto:undefined,
                tipo:'',
                prodim:undefined,
                indirectos:undefined,
                monto_inici:undefined,
                monto_rest:undefined,
                periodo_idperiodo:undefined
            },
            faltante:{},
        },
        reducers: {
            getPeriodo:(state,{payload})=>{
                state.periodo=payload;
            },
            getPeriodoVigenteTrue:(state)=>{
                state.vigente=true
            },
            getSinVigencia:(state)=>{
                state.periodo={},
                state.vigente=false
            },
            setPresuEstatal:(state,{payload})=>{
                state.presuEstatal=payload
            },
        setpresuFaismun:(state,{payload})=>{
                state.presuFaismun=payload
            },
            setpresuFortamun:(state,{payload})=>{
                state.presuFortamun=payload
            },
            setpresuOdirectas:(state,{payload})=>{
                state.presuOdirectas=payload
            },
            setpresuFederal:(state,{payload})=>{
                state.presuFederal=payload
            },
            setFaltante:(state,{payload})=>{
                state.faltante=payload
            },
            setBorrarFaltante:(state)=>{
                state.faltante={}
            }
        }
    });


    // Action creators are generated for each case reducer function
    export const {
        getPeriodo,
        getSinVigencia,
        setPresuEstatal,
        setpresuFederal,
        setpresuOdirectas,
        setpresuFortamun,
        setpresuFaismun,
        setFaltante,
        setBorrarFaltante,
        getPeriodoVigenteTrue
    } = periodoSlice.actions;