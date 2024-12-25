import { Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal';
import { useExpediStore } from '../../../hooks/useExpediStore';
import { estiloCalendar } from '../../../helpers';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useObraStore } from '../../../hooks/useObraStore';
import Swal from 'sweetalert2';

const customStyles = {
content: {
width: '40vw',
maxWidth: '70vw',
maxHeight: '84vh',
borderRadius: '10px',
padding: '20px',
position: 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -42.5%)',
},
};

ReactModal.setAppElement('#root');

export const CalendarioModal = () => {

const {calendarModal,startCalendarModalValue,startGenerarCalendario}=useExpediStore()

const [info, setinfo] = useState({
     localidad:'',
     nombre:'',
     cargo:''
    })

const {localidad,nombre,cargo}=info

const {obra,dictamen,partidas}=useObraStore()
const [meses, setmeses] = useState({
    enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0,
    julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0,
  })

const mesesObjeto=(fec_inicio, fec_termino)=>{
const mesesNombres = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];

// Convertir las fechas a objetos Date
  const fechaInicio = new Date(fec_inicio);
  const fechaTermino = new Date(fec_termino);

   const meses = {};  
     for (
    let fecha = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), 1);
    fecha <= fechaTermino;
    fecha.setMonth(fecha.getMonth() + 1)
  ) {
    // Obtener el nombre del mes en español
    const mesNombre = mesesNombres[fecha.getMonth()];
    // Agregar el mes al objeto con valor inicializado en 0
    meses[mesNombre] = 0;
  }

  return meses; 
}

const sumarValores = (meses) => {
  let suma = 0;
  for (const mes in meses) {
    if (meses.hasOwnProperty(mes)) {
      suma += Number(meses[mes]);;
    }
  }
  return suma;
};

const sumarYRedondear = (meses) => {
  const suma = Object.values(meses).reduce((acc, valor) => acc + Number(valor), 0);

  // Definir el margen de tolerancia para redondear
  const tolerancia = 0.1; // Puede ajustar este valor según lo que considere "cerca de 100"

  if (Math.abs(suma - 100) < tolerancia) {
    return 100; // Redondear a 100 si está lo suficientemente cerca
  } else {
    return suma; // Si no está cerca, devolver el valor original
  }
};

const validarMeses = (meses) => {
  // Verificar si algún valor es igual a 0
  const tieneValorCero = Object.values(meses).some(valor => Number(valor) === 0);

  // Si hay un valor igual a 0, devolver false
  return !tieneValorCero;
};

const validarNoString = (meses) => {
  
  // Verificar si todos los valores son números
  const todosSonNumeros = Object.values(meses).every(valor => !isNaN(Number(valor)));

  return todosSonNumeros;
};

const generarCalendario=()=>{

if(localidad==='' || nombre==='' || cargo===''){
     Swal.fire({
                title: "Informacion incompleta",
                text:"Error: Campos localidad, responsable o cargo no estan vacios",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
return ;
}

const validarStri=validarNoString(meses)

if(validarStri===false){
Swal.fire({
                title: "Valor no valido",
                text:"Error: Los Porcentajes deben ser numeros, no poner el % o caracteres",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
return;

}

const validaceros=validarMeses(meses)

if(validaceros===false){
 Swal.fire({
                title: "Porcentajes Hay Ceros",
                text:"Error: Los porcentajes deben ser mayor que 0",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
return;
}


const suma=sumarYRedondear(meses)

if(suma!=100){
 Swal.fire({
                title: "Porcentajes no Concuerdan",
                text:"Error: La suma de cada porcentaje por mes debe de dar 100%",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
return;
}

//Llamar la funcion que ejecuta el enpoint
startGenerarCalendario(obra,dictamen,meses,partidas,info)

}

const oncloseModal = () => {
startCalendarModalValue(false);
setTimeout(() => {
const openButton = document.querySelector('[data-testid="open-modal-button"]');
if (openButton) {
        openButton.focus();
        }
        }, 200);
       
};


useEffect(() => {
    const {fec_inicio,fec_termino}=dictamen
    const objeto = mesesObjeto(fec_inicio,fec_termino)
    setmeses(objeto)
}, [])

return (
 <ReactModal
    isOpen={calendarModal}
    onRequestClose={oncloseModal}
    style={customStyles}
    className="modal"
    overlayClassName="modal-fondo"
    closeTimeoutMS={200}
  >
<Grid container spacing={2} justifyContent="center">
<Typography variant='h5' sx={{marginTop:'10px',fontWeight: 'bold' }}>Crear Calendarizacion Fisica Financiera</Typography>
  <TextField
    fullWidth
    label="Localidad"
    name="Localidad"
    variant="outlined"
    size='small'
    value={localidad}
    onChange={(event)=>setinfo({...info,localidad:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
<TextField
    fullWidth
    label="Responsable De La Calendarizacion"
    name="nombreencar"
    variant="outlined"
    size='small'
    value={nombre}
    onChange={(event)=>setinfo({...info,nombre:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
<TextField
    fullWidth
    label="Cargo Del Responsable"
    name="cargo"
    variant="outlined"
    size='small'
    value={cargo}
    onChange={(event)=>setinfo({...info,cargo:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
<Typography sx={{marginTop:'10px',fontWeight: 'bold' }}>Ingresa Porcentaje De Avance Por Mes</Typography>

 <Grid item xs={12}>
<Grid container spacing={1} justifyContent="center">

{"enero" in meses && (
<Grid item sx={estiloCalendar()}>
 <TextField
    fullWidth
    label="Enero"
    name="enero"
    variant="outlined"
    size='small'
    value={meses?.enero}
    onChange={(event)=>setmeses({...meses,enero:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
</Grid>
)}

{"febrero" in meses && (
<Grid item sx={estiloCalendar()}>
 <TextField
    fullWidth
    label="Febrero"
    name="febrero"
    variant="outlined"
    size='small'
    value={meses?.febrero}
    onChange={(event)=>setmeses({...meses,febrero:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
</Grid>
)}

{"marzo" in meses && (
<Grid item sx={estiloCalendar()}>
 <TextField
    fullWidth
    label="Marzo"
    name="marzo"
    variant="outlined"
    size='small'
    value={meses?.marzo}
    onChange={(event)=>setmeses({...meses,marzo:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
</Grid>
)}

{"abril" in meses && (
<Grid item sx={estiloCalendar()}>
 <TextField
    fullWidth
    label="Abril"
    name="abril"
    variant="outlined"
    size='small'
    value={meses?.abril}
    onChange={(event)=>setmeses({...meses,abril:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
</Grid>
)}

{"mayo" in meses && (
<Grid item sx={estiloCalendar()}>
 <TextField
    fullWidth
    label="Mayo"
    name="mayo"
    variant="outlined"
    size='small'
    value={meses?.mayo}
    onChange={(event)=>setmeses({...meses,mayo:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
</Grid>
)}

{"junio" in meses && (
<Grid item sx={estiloCalendar()}>
 <TextField
    fullWidth
    label="Junio"
    name="junio"
    variant="outlined"
    size='small'
    value={meses?.junio}
    onChange={(event)=>setmeses({...meses,junio:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
</Grid>
)}

{"julio" in meses && (
<Grid item sx={estiloCalendar()}>
 <TextField
    fullWidth
    label="Julio"
    name="julio"
    variant="outlined"
    size='small'
    value={meses?.julio}
    onChange={(event)=>setmeses({...meses,julio:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
</Grid>
)}

{"agosto" in meses && (
<Grid item sx={estiloCalendar()}>
 <TextField
    fullWidth
    label="Agosto"
    name="agosto"
    variant="outlined"
    size='small'
    value={meses?.agosto}
    onChange={(event)=>setmeses({...meses,agosto:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
</Grid>
)}

{"septiembre" in meses && (
<Grid item sx={estiloCalendar()}>
 <TextField
    fullWidth
    label="Septiembre"
    name="septiembre"
    variant="outlined"
    size='small'
    value={meses?.septiembre}
    onChange={(event)=>setmeses({...meses,septiembre:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
</Grid>
)}

{"octubre" in meses && (
<Grid item sx={estiloCalendar()}>
 <TextField
    fullWidth
    label="Octubre"
    name="octubre"
    variant="outlined"
    size='small'
    value={meses?.octubre}
    onChange={(event)=>setmeses({...meses,octubre:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
</Grid>
)}


{"noviembre" in meses && (
<Grid item sx={estiloCalendar()}>
 <TextField
    fullWidth
    label="Noviembre"
    name="noviembre"
    variant="outlined"
    size='small'
    value={meses?.noviembre}
    onChange={(event)=>setmeses({...meses,noviembre:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
</Grid>
)}

{"diciembre" in meses && (
<Grid item sx={estiloCalendar()}>
 <TextField
    fullWidth
    label="Diciembre"
    name="diciembre"
    variant="outlined"
    size='small'
    value={meses?.diciembre}
    onChange={(event)=>setmeses({...meses,diciembre:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
</Grid>
)}
</Grid>  

</Grid>
 <IconButton onClick={generarCalendario}  sx={{marginTop:'10px', }}   >
    <ArchiveIcon sx={{color:'green',fontSize:'50px'}}/>
    </IconButton>
</Grid>
</ReactModal>
)
}
