import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import ReactModal from 'react-modal';
import { useObraStore } from '../../../hooks/useObraStore';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useExpediStore } from '../../../hooks/useExpediStore';
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
transform: 'translate(-40%, -43.5%)',
},
};

ReactModal.setAppElement('#root');

export const DictamenModal = () => {

const {modalDictamen,startDictamenValue,obra,dictamen,partidas}=useObraStore()
const {expediente}= useExpediStore()

const [infoexp, setinfoexp] = useState({
                            nombre:'',
                            resultado:'',
                            observa:'',    
                                })

const {nombre,resultado,observa}=infoexp


const validarExpediente = (obj) => {
  return Object.entries(obj).every(([key, value]) => {
    // Excluir los campos 'idexpediente' y 'obra_idobra'
    if (key === 'idexpediente' || key === 'obra_idobra') {
      return true; // Ignorar estas propiedades
    }
    // Verificar que las demás propiedades no sean ''
    return value !== '';
  });
};


const generarDictamen=()=>{


if (
  nombre === '' || 
  resultado === '' || 
  (resultado != 'positivo' && observa === '')
) {
 return Swal.fire({
                title: "Incompleto",
                text:"Error: Algunos campos están vacíos",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
}

if(resultado==='positivo' && validarExpediente(expediente)===false){

setinfoexp({ ...infoexp, resultado: '', observa: '' });
return Swal.fire({
                title: "Expediente Incompleto",
                text:"Error: El Dictamen no puede ser Positivo porque esta incompleto el Expediente",
                icon: "error",
                confirmButtonText: "Aceptar",
            });

}


}
const oncloseModal = () => {
startDictamenValue(false);
setTimeout(() => {
const openButton = document.querySelector('[data-testid="open-modal-button"]');
if (openButton) {
        openButton.focus();
        }
        }, 200);
       
};
  return (
    <ReactModal
    isOpen={modalDictamen}
    onRequestClose={oncloseModal}
    style={customStyles}
    className="modal"
    overlayClassName="modal-fondo"
    closeTimeoutMS={200}
  >
<Grid container spacing={2} justifyContent="center">
<Grid item xs={12}>
<Grid container spacing={2} justifyContent="center" >

<Grid item xs={6}>
<Box
sx={{
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
mt: '20px',
}}>
<Typography variant='h5' sx={{marginTop:'10px',fontWeight: 'bold' }}>Generar Dictamen</Typography>
<Typography variant='h6' sx={{marginTop:'10px',fontWeight: 'bold' }}>Responsable Quien Dictamina</Typography>
<TextField
    fullWidth
    label="Nombre de Quien Dictaminó"
    name="nomdicta"
    variant="outlined"
    size='small'
    value={nombre}
    onChange={(event)=>setinfoexp({...infoexp,nombre:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
<FormControl fullWidth margin="normal" size="small" sx={{ backgroundColor: "#fff" }}>
<InputLabel>Resultado del Dictamen</InputLabel>
<Select
size="small"
label="Resultado del Dictamen"
value={resultado}
onChange={(event)=>setinfoexp({...infoexp,resultado:event.target.value})}
>
<MenuItem value="positivo">POSITIVO</MenuItem>
<MenuItem value="negativo">NEGATIVO</MenuItem>
<MenuItem value="condicionado">CONDICIONADO</MenuItem>
</Select>
</FormControl>


{resultado!='positivo' && resultado!=''
&&
(
<TextField
fullWidth
label="Observaciones del Dictamen"
name="observaciones"
variant="outlined"
size="small"
value={observa}
onChange={(event)=>setinfoexp({...infoexp,observa:event.target.value})}
multiline
rows={4} // Puedes ajustar el número de filas según la altura deseada
sx={{
    backgroundColor: "#fff",
    mt: '10px',
    '& .MuiOutlinedInput-root': {
    height: 'auto', // Esto hace que el campo se ajuste a las líneas de texto
    },
}}
/> 
)
}

<Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
    <IconButton onClick={generarDictamen}>
      <MoveToInboxIcon sx={{ color: 'green', fontSize: '50px' }} />
    </IconButton>
  </Box>
</Box>
</Grid>

 <Grid item xs={6}>
<Box
sx={{
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
mt: '20px',
}}
>
<Typography variant="h5" sx={{ fontWeight: 'bold', mt: '10px' }}>
Guardar Dictamen
</Typography>
<IconButton>
<DriveFolderUploadIcon sx={{ color: 'green', fontSize: '50px' }} />
</IconButton>

<Typography variant="h5" sx={{ fontWeight: 'bold', mt: '70px' }}>
Finalizar Proceso
</Typography>
<IconButton>
<CheckCircleOutlineIcon sx={{ color: 'green', fontSize: '50px' }} />
</IconButton>

</Box>

</Grid>

</Grid>
</Grid>

</Grid>

</ReactModal>
  )
}
