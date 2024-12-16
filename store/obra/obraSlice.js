import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

export const obraSlice = createSlice({
    name: 'obra',
    initialState: {
        obras:[],
        busqueda:[],
        partidas:[],
        conceptos:[],
        obra:{
            idobra:null,
            nombre:"",
            bene_unidad:"",
            subprograma:"",
            programa:"",
            rubros:"",
            empleo_event:"",
            presupuesto:0,
            bene_cantidad:0,
            cap_cantidad:0,
            cap_unidad:'',
            ejecucion:'',
            loca_col:"",
            num_obra:"",
            num_aproba:""
        },
        dictamen:{
            situacion:"IT",
            municipio:"Xalisco",
            subregion:"centro sur",
            capacidad_por:"100%",
            arc_dictamen:"",
            fecha_dictamen: new Date(new Date().setHours(0, 0, 0, 0)).toISOString().split('T')[0],
            fec_inicio:dayjs(new Date()),
            fec_termino:dayjs(new Date().setDate(new Date().getDate() + 1)),
            metas_alc_fechas: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0], // Siempre 31 de diciembre
            meta_porciento:"100%",
            metas_por:"100%"
        },
        valueObraAgregar:{
            icono:false,
            notvisible:false
        },
        valuePresupuestoAgregar:{
            icono:false,
            notvisible:true
        },
        valueExpedienteAgregar:{
            icono:false,
            notvisible:true
        },
        valueDictamenGenerar:{
            icono:false,
            notvisible:true
        },
        valueFinalizar:{
            icono:false,
            notvisible:true,
            termino:null
        },
        modalPresupuesto:false,
        modalAprobacion:false
,
    },
    reducers: {
        setObra:(state,{payload})=>{
            state.obra=payload
        },

        setDictamen:(state,{payload})=>{
            state.dictamen=payload
        },
        setObraExito:(state)=>{
            state.valueObraAgregar.icono=true
            state.valueObraAgregar.notvisible=true

            state.valuePresupuestoAgregar.notvisible=false

            state.valueFinalizar.termino=false
        },
        setPresupuestoExito:(state)=>{
        state.valuePresupuestoAgregar.icono=true
        state.valuePresupuestoAgregar.notvisible=true

        state.valueExpedienteAgregar.icono=false
        state.valueExpedienteAgregar.notvisible=false
        },
        setExpedienteExitoso:(state)=>{
        state.valueExpedienteAgregar.icono=true
        state.valueExpedienteAgregar.notvisible=true

        state.valueDictamenGenerar.icono=false
        state.valueDictamenGenerar.notvisible=false
        },
        setDictamenExitoso:(state)=>{
            state.valueDictamenGenerar.icono=true
            state.valueDictamenGenerar.notvisible=true

            state.valueFinalizar.icono=false
            state.valueFinalizar.notvisible=false
        },
        resetValues:(state)=>{
            state.valueObraAgregar.icono=false
            state.valueObraAgregar.notvisible=false

            state.valuePresupuestoAgregar.icono=false
            state.valuePresupuestoAgregar.notvisible=true

            state.valueExpedienteAgregar.icono=false
            state.valueExpedienteAgregar.notvisible=true

            state.valueDictamenGenerar.icono=false
            state.valueDictamenGenerar.notvisible=true

            state.valueFinalizar.icono=false
            state.valueFinalizar.notvisible=true
            state.valueFinalizar.termino=null


        },
        resetIngresarObra:(state)=>{
        state.partidas=[]
        state.conceptos=[]
        
        state.obra.idobra=null
        state.obra.nombre=""
        state.obra.bene_unidad=""
        state.obra.subprograma=""
        state.obra.programa=""
        state.obra.rubros=""
        state.obra.empleo_event=""
        state.obra.presupuesto=0
        state.obra.bene_cantidad=0
        state.obra.cap_cantidad=0
        state.obra.cap_unidad=""
        state.obra.ejecucion=""
        state.obra.loca_col=""
        state.obra.num_aproba=""
        state.obra.num_obra=""
        if (state.obra?.presupuesto_idpresupuesto) {
            state.obra.presupuesto_idpresupuesto = null; // Solo se hace esto si el atributo existe
          }


        state.dictamen={}



        },
        setModalPresupuesto:(state,{payload})=>{
            state.modalPresupuesto=payload
        },
        setModalAproba:(state,{payload})=>{
            state.modalAprobacion=payload
        },
        getPartidas:(state,{payload})=>{
            state.partidas=payload
        },
        getConceptos:(state,{payload})=>{
            state.conceptos=payload
        },
        getPresupuesto:(state,{payload})=>{
          state.obra.presupuesto=payload;    
        },
        setObrasPresu:(state,{payload})=>{
            state.obras=payload
        },
        setObrasBusqueda:(state,{payload})=>{
            state.busqueda=payload
        },
        setLimpiarBusqueda:(state)=>{
            state.busqueda=[]
        }
    }
});


// Action creators are generated for each case reducer function
export const { setObra,
               setDictamen,
               setObraExito,
               setModalPresupuesto,
               getPartidas,
               getConceptos,
               getPresupuesto,
               setPresupuestoExito,
               setExpedienteExitoso,
               setDictamenExitoso,
               resetValues,
               resetIngresarObra,
               setObrasPresu,
               setModalAproba,
               setObrasBusqueda,
               setLimpiarBusqueda
            } = obraSlice.actions;
