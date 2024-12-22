import { Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import ReactModal from 'react-modal';
import { useExpediStore } from '../../../hooks/useExpediStore';
import ArchiveIcon from '@mui/icons-material/Archive';
import Swal from 'sweetalert2';
import { useObraStore } from '../../../hooks/useObraStore';

const customStyles = {
content: {
width: '30vw',
height: '75vh',
maxWidth: '70vw',
maxHeight: '84vh',
borderRadius: '10px',
padding: '20px',
position: 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -44.5%)',
},
};

ReactModal.setAppElement('#root');

export const FactibilidadModal = () => {

const {factibiModal,startFactibiModalValue,startGenerarFactibi}=useExpediStore()
const [validacion, setvalidacion] = useState({
            nombre:'',
            cargo:'',
            opinion:''        
    })

const {obra}=useObraStore()

const {cargo,nombre,opinion}=validacion

const generarValidacion=()=>{
if(cargo==='' || nombre===''|| opinion===''){
 return Swal.fire({
                title: "Incompleto",
                text:"Error: Algunos campos están vacíos",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
}
startGenerarFactibi(obra,validacion)

}



const oncloseModal = () => {
startFactibiModalValue(false);
setTimeout(() => {
const openButton = document.querySelector('[data-testid="open-modal-button"]');
if (openButton) {
openButton.focus();
}
}, 200);

setvalidacion({
            nombre:'',
            cargo:'',
            opinion:''        
    })

};
  return (
<ReactModal
isOpen={factibiModal}
onRequestClose={oncloseModal}
style={customStyles}
className="modal"
overlayClassName="modal-fondo"
closeTimeoutMS={200}
>
<Grid container  spacing={2} justifyContent="center" >
<Grid item xs={12} >
<Grid container  spacing={2} justifyContent="center" >
<Typography variant='h5' sx={{marginTop:'10px',fontWeight: 'bold' }}>Crear Dictamen de Factibilidad</Typography>
<Typography variant='h6' sx={{marginTop:'20px', }}>Nombre designado por la entidad normativa</Typography>
<TextField
    fullWidth
    label="Ingresa Nombre De La Persona Designada"
    name="entidad"
    variant="outlined"
    value={nombre}
    onChange={(event)=>setvalidacion({...validacion,nombre:event.target.value})}
    size='small'
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
<Typography variant='h6' sx={{marginTop:'20px', }}>Cargo Dentro De La Entidad</Typography>
<TextField
    fullWidth
    label="Ingresa Puesto Que Ejerce"
    name="puesto"
    variant="outlined"
    size='small'
    value={cargo}
    onChange={(event)=>setvalidacion({...validacion,cargo:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />

<TextField
    fullWidth
    label="Ingresa La Opinion Tecnica"
    name="tecnica"
    variant="outlined"
    size='small'
    multiline
    rows={5} // Puedes ajustar el número de filas según la altura deseada
    value={opinion}
    onChange={(event)=>setvalidacion({...validacion,opinion:event.target.value})}
    sx={{
        backgroundColor: "#fff",
        mt: '10px',
        '& .MuiOutlinedInput-root': {
        height: 'auto', // Esto hace que el campo se ajuste a las líneas de texto
        },
    }}
        />
</Grid>
</Grid>
  <IconButton onClick={generarValidacion}  sx={{marginTop:'30px', }}   >
    <ArchiveIcon sx={{color:'green',fontSize:'50px'}}/>
    </IconButton>

</Grid>
</ReactModal>
  )
}
