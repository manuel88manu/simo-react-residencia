import { createSlice } from '@reduxjs/toolkit';

export const expediSlice = createSlice({
    name: 'expedi',
    initialState: {
         expediente:{
            acta_apoyo_inv: '',
            ced_regi_obra: '',
            explo_insu: '',
            cro_micro: '',
            res_eje_pro: '',
            val_dic_fac: '',
            num_gene_obra: '',
            dic_imp_amb: '',
            memo_des: '',
            planeria: '',
            acta_dona_prop: '',
            memo_cal: '',
            esp_tec: '',
            cal_fis_finan: '',
            cro_macro: '',
            acta_acep_bene: '',
            soli_obra_bene: '',
            gas_indir: '',
            fotografias_est: '',
            presu_obra: '',
            tar_pre_uni: ''
        },
        expediModal:false,
        cedulaModal:false,
        registModal:false,
        comunidadModal:false,
        factibiModal:false,
        inovacionModal:false,
        calendarModal:false,
        tableExpeModal:false,
        cedulaRegistro:{},
    },
    reducers: {
       setExpediente:(state,{payload})=>{
        state.expediente=payload
       },
       setValueExpModal:(state,{payload})=>{
        state.expediModal=payload
       },
       setValueCedulaModal:(state,{payload})=>{
        state.cedulaModal=payload
       },
       setCedulaRegistro:(state,{payload})=>{
        state.cedulaRegistro=payload
       },
       setValueRegisModal:(state,{payload})=>{
         state.registModal=payload    
        },
       setValueComunidadModal:(state,{payload})=>{
         state.comunidadModal=payload   
        },
        setValueFactibiModal:(state,{payload})=>{
         state.factibiModal=payload   
        },
        setValueInovaModal:(state,{payload})=>{
         state.inovacionModal=payload   
        },
         setValueCalendarModal:(state,{payload})=>{
         state.calendarModal=payload   
        },
      setValueTablaExpModal:(state,{payload})=>{
         state.tableExpeModal=payload   
        },
    }
});


// Action creators are generated for each case reducer function
export const { setExpediente,
            setValueExpModal,
            setValueCedulaModal,
            setCedulaRegistro,
            setValueRegisModal,
            setValueComunidadModal,
            setValueFactibiModal,
            setValueInovaModal,
            setValueCalendarModal,
            setValueTablaExpModal

 } = expediSlice.actions;