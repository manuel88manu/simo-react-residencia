import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import ReactModal from 'react-modal';
import { useExpediStore } from '../../../hooks/useExpediStore';
import ArchiveIcon from '@mui/icons-material/Archive';
import Swal from 'sweetalert2';
import { useObraStore } from '../../../hooks/useObraStore';

const customStyles = {
content: {
width: '30vw',
height: '65vh',
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



export const SolicitudRegModal = () => {
const {registModal,startRegistroModalValue,startGenerarSolicitud}=useExpediStore()
const {obra}=useObraStore()

const [registro, setregistro] = useState({
    nombre:'',
    area:''                
    })
const {nombre,area}=registro

const oncloseModal = () => {
startRegistroModalValue(false);
setTimeout(() => {
const openButton = document.querySelector('[data-testid="open-modal-button"]');
if (openButton) {
openButton.focus();
}
}, 200);
setregistro({
    nombre:'',
    area:''                
    })
};

const generarRegistro=()=>{
    if(area==='' || nombre===''){
     return Swal.fire({
                title: "Incompleto",
                text:"Error: Algunos campos están vacíos",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
    }
    startGenerarSolicitud(obra,registro)

}

return (
<ReactModal
isOpen={registModal}
onRequestClose={oncloseModal}
style={customStyles}
className="modal"
overlayClassName="modal-fondo"
closeTimeoutMS={200}
>
<Grid container  spacing={2} justifyContent="center" >
<Typography variant='h5' sx={{marginTop:'10px',fontWeight: 'bold' }}>Crear Solicitud de Obra De Beneficiados</Typography>
<Typography variant='h6' sx={{marginTop:'20px', }}>ATENTAMENTE</Typography>
<TextField
    fullWidth
    label="Ingresa Nombre Del Representante"
    name="represen"
    variant="outlined"
    value={nombre}
    onChange={(event)=>setregistro({...registro,nombre:event.target.value})}
    size='small'
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
<Typography variant='h6' sx={{marginTop:'40px', }}>AREA DE REPRESENTACION</Typography>

<TextField
    fullWidth
    label="Ingresa el area del Representante"
    name="area"
    variant="outlined"
    size='small'
    value={area}
    onChange={(event)=>setregistro({...registro,area:event.target.value})}
    multiline
    rows={3} // Puedes ajustar el número de filas según la altura deseada
    sx={{
        backgroundColor: "#fff",
        mt: '10px',
        '& .MuiOutlinedInput-root': {
        height: 'auto', // Esto hace que el campo se ajuste a las líneas de texto
        },
    }}
        />
 
    <IconButton onClick={generarRegistro}    sx={{marginTop:'30px', }}   >
    <ArchiveIcon sx={{color:'green',fontSize:'50px'}}/>
    </IconButton>

</Grid>
</ReactModal>

)
}
