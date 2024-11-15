import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',// ''authenticated' , 'not-authenticated',
        user:{},
        usuarios:[],
        errorMessage:undefined
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
        }
    }
});


// Action creators are generated for each case reducer function
    
export const { onChecking,onLogin,onLogout,clearErrorMessage,setMessageError } = authSlice.actions;