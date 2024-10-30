import { createTheme } from "@mui/material";
import { green, red } from "@mui/material/colors";

export const goldenTheme=createTheme({
    palette:{
        primary:{
            main:'#D4AF37'
        },
        secondary:{
            main:'#800020'
        },
        error:{
            main:red.A400
        },
        fine:{
            main:green[800]
        },
        background: {
            default: '#F0F3F8', // Establecer el color de fondo aquí
        },
    }
   
})