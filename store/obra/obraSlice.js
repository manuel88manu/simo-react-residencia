import { createSlice } from '@reduxjs/toolkit';

export const obraSlice = createSlice({
    name: 'obra',
    initialState: {
        obras:[],
        obra:{
            nombre:"",
            bene_unidad:"",
            subprograma:"",
            programa:"",
            rubros:"",
            empleo_event:"",
            presupuesto:0,
            bene_cantidad:null,
            cap_cantidad:null,
            cap_unidad:'',
            ejecucion:'',
            loca_col:""
        },
        dictamen:{
            situacion:"IT",
            municipio:"Xalisco",
            subregion:"centro sur",
            capacidad_por:"100%",
            arc_dictamen:"",
            fecha_dictamen:new Date(),
            fec_inicio:new Date(),
            fec_termino:new Date(new Date().setDate(new Date().getDate() + 1)),
            metas_alc_fechas: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0], // Siempre 31 de diciembre
            meta_porciento:"100%",
            metas_por:"100%"
        }
,
    },
    reducers: {
        increment: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
});


// Action creators are generated for each case reducer function
export const { increment } = obraSlice.actions;