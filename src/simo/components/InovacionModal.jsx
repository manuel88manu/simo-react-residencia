import { Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import ReactModal from 'react-modal';
import { useExpediStore } from '../../../hooks/useExpediStore';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useObraStore } from '../../../hooks/useObraStore';
import Swal from 'sweetalert2';
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

export const InovacionModal = () => {

const {inovacionModal,startInovaModalValue,startGenerarInversion}=useExpediStore()
const {obra}=useObraStore()
const [apoyo, setapoyo] = useState({
            nombre:'',
            cargo:''
})
const {nombre,cargo}=apoyo

const generarInova=()=>{
    if(nombre==='' || cargo===''){
     return Swal.fire({
                title: "Incompleto",
                text:"Error: Algunos campos están vacíos",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
    }
    startGenerarInversion(obra,apoyo)

}

const oncloseModal = () => {
startInovaModalValue(false);
setTimeout(() => {
const openButton = document.querySelector('[data-testid="open-modal-button"]');
if (openButton) {
openButton.focus();
}
}, 200);
setapoyo({
            nombre:'',
            cargo:''
})
};

return (
<ReactModal
isOpen={inovacionModal}
onRequestClose={oncloseModal}
style={customStyles}
className="modal"
overlayClassName="modal-fondo"
closeTimeoutMS={200}
>
<Grid container  spacing={2} justifyContent="center" >
<Typography variant='h5' sx={{marginTop:'10px',fontWeight: 'bold' }}>Crear Acta de Apoyo a la Inovacion</Typography>
<Typography variant='h6' sx={{marginTop:'20px', }}>ATENTAMENTE</Typography>
<TextField
    fullWidth
    label="Nombre De Quien Se Compromete Dentro de IMPLAN"
    name="nombreimplan"
    variant="outlined"
    size='small'
    value={nombre}
    onChange={(event)=>setapoyo({...apoyo,nombre:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
<Typography variant='h6' sx={{marginTop:'40px', }}>Cargo Dentro De IMPLAN</Typography>

<TextField
    fullWidth
    label="Ingresa cargo que ejerce quien se compromete"
    name="cargoimplan"
    variant="outlined"
    size='small'
    multiline
    value={cargo}
    onChange={(event)=>setapoyo({...apoyo,cargo:event.target.value})}
    rows={3} // Puedes ajustar el número de filas según la altura deseada
    sx={{
        backgroundColor: "#fff",
        mt: '10px',
        '& .MuiOutlinedInput-root': {
        height: 'auto', // Esto hace que el campo se ajuste a las líneas de texto
        },
    }}
        />
 
   <IconButton onClick={generarInova} sx={{marginTop:'30px', }}   >
    <ArchiveIcon sx={{color:'green',fontSize:'50px'}}/>
    </IconButton>

</Grid>
</ReactModal>
)
}
