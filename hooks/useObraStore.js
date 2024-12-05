import React from 'react'
import { useSelector } from 'react-redux'

export const useObraStore = () => {
   const {obras,obra,dictamen}=useSelector(state=>state.obra)
return{
    //propuedades
    obra,
    obras,
    dictamen

    //METODOS



}

}
