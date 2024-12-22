import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import ReactModal from 'react-modal';
import { useExpediStore } from '../../../hooks/useExpediStore';
import ArchiveIcon from '@mui/icons-material/Archive';
import Swal from 'sweetalert2';
import { useObraStore } from '../../../hooks/useObraStore';


const customStyles = {
    content: {
      width: '50vw',
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

export const AceptaComuniModal = () => {
const {startComunuModalValue,comunidadModal,startGenerarComunidad}=useExpediStore()

const {obra}=useObraStore()

const [comunidad, setcomunidad] = useState({
                                nombre:'',
                                zona:'',
                                caracter:'',
                                represe:'',
                                area:''            
})

const {nombre,zona,caracter,represe,area}=comunidad


const generarActaComuni=()=>{
if(nombre==='' || zona==='' || caracter==='' || represe===''||area===''){
 return Swal.fire({
                title: "Incompleto",
                text:"Error: Algunos campos están vacíos",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
}

startGenerarComunidad(obra,comunidad)

}

 const oncloseModal = () => {
        startComunuModalValue(false);
        setTimeout(() => {
          const openButton = document.querySelector('[data-testid="open-modal-button"]');
          if (openButton) {
            openButton.focus();
          }
        }, 200);
        setcomunidad({
            nombre:'',
            zona:'',
            caracter:'',
            represe:'',
            area:''            
})
      };

  return (
    <ReactModal
    isOpen={comunidadModal}
    onRequestClose={oncloseModal}
    style={customStyles}
    className="modal"
    overlayClassName="modal-fondo"
    closeTimeoutMS={200}
  >
    <Grid container spacing={2} justifyContent="center">
    <Typography variant='h5' sx={{marginTop:'10px',fontWeight: 'bold' }}>Crear Acta de Aceptacion de la Comunidad Beneficiada</Typography>
    <Grid item xs={12}>
    <Grid spacing={2} justifyContent="center" container>
     
     <Grid item xs={6}>
    <Typography variant='h6' sx={{marginTop:'10px'}}>Comunidad Beneficiada</Typography>
      <TextField
    fullWidth
    label="Ingresa las Comunidad"
    name="comunidadbene"
    variant="outlined"
    size='small'
    value={nombre}
    onChange={(event)=>setcomunidad({...comunidad,nombre:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
    <Typography variant='h6' sx={{marginTop:'10px'}}>Zona Correspondiente</Typography>
    <TextField
    fullWidth
    label="Ingresa la Zona de la Comunidad"
    name="zonacomuni"
    variant="outlined"
    size='small'
    value={zona}
    onChange={(event)=>setcomunidad({...comunidad,zona:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
   
    <Typography sx={{marginTop:'10px',fontWeight: 'bold'}}>REPRESENTANTE DE LOS BENEFICIARIOS</Typography>
    <TextField
    fullWidth
    label="Ingresa Nombre del Representante"
    name="represen"
    variant="outlined"
    size='small'
    value={represe}
    onChange={(event)=>setcomunidad({...comunidad,represe:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
    </Grid>

    <Grid item xs={6}>
    <Typography variant='h6' sx={{marginTop:'10px'}}>Características</Typography>
    <TextField
    fullWidth
    label="Ingresa Características de la obra"
    name="caracter"
    variant="outlined"
    size='small'
    multiline
    rows={5} // Puedes ajustar el número de filas según la altura deseada
    value={caracter}
    onChange={(event)=>setcomunidad({...comunidad,caracter:event.target.value})}
    sx={{
        backgroundColor: "#fff",
        mt: '10px',
        '& .MuiOutlinedInput-root': {
        height: 'auto', // Esto hace que el campo se ajuste a las líneas de texto
        },
    }}
        />
     <Typography sx={{marginTop:'10px',fontWeight: 'bold'}}>AREA DE REPRESENTACION</Typography>
    <TextField
    fullWidth
    label="Ingresa el area del Representante"
    name="area"
    variant="outlined"
    size='small'
    value={area}
    onChange={(event)=>setcomunidad({...comunidad,area:event.target.value})}
    sx={{ backgroundColor: "#fff",mt:'10px' }}
        />
  
    </Grid>

    </Grid>
   </Grid>
    <IconButton onClick={generarActaComuni}  sx={{marginTop:'30px', }}   >
    <ArchiveIcon sx={{color:'green',fontSize:'50px'}}/>
    </IconButton>
    </Grid>
  </ReactModal>
  )
}
