import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import ReactModal from 'react-modal';
import { useExpediStore } from '../../../hooks/useExpediStore';
import ArchiveIcon from '@mui/icons-material/Archive';
import { set } from 'date-fns/fp';
import Swal from 'sweetalert2';

const customStyles = {
    content: {
      width: '50vw',
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

  
  export const CedulaModal = () => {
    const {startCedulaModalValue,cedulaModal,startAgregarCedula}= useExpediStore()

    const [Cedula, setCedula] = useState({
                latitud:'',
                longitud:'',
                localidad:'',
                tipo:'',
                descrip:''
    })

    const {latitud,longitud,localidad,tipo,descrip}=Cedula


    const oncloseModal = () => {
        startCedulaModalValue(false);
        setTimeout(() => {
          const openButton = document.querySelector('[data-testid="open-modal-button"]');
          if (openButton) {
            openButton.focus();
          }
        }, 200);
      };

      const generarCedula=()=>{
        if(localidad==='' || latitud==='' || longitud==='' || tipo==='' || descrip==='' ){
            return Swal.fire({
                title: "Incompleto",
                text:"Todos los campos debe ser llenados",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
        startAgregarCedula(Cedula)
      }
    return (
        <ReactModal
        isOpen={cedulaModal}
        onRequestClose={oncloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        
        <Grid container spacing={2} justifyContent="center">
        <Typography variant='h5' sx={{marginTop:'10px',fontWeight: 'bold' }}>Crear Cedula de Registro de Obra</Typography>
        
        <Grid item xs={12}>

            <Grid container spacing={1} justifyContent="center">

                <Grid item xs={6}>
                <Typography  sx={{fontWeight: 'bold' }}>
                COORDENADAS GEOGRAFICAS <br />
                (Grados °, Minutos ', Segundos'')
                </Typography>

                <TextField
                fullWidth
                label="LATITUD"
                name="latitud"
                variant="outlined"
                value={latitud}
                onChange={(event)=>setCedula({...Cedula,latitud:event.target.value})}
                size='small'
                sx={{ backgroundColor: "#fff",mt:'10px' }}
                 />

                 <TextField
                fullWidth
                label="LONGITUD"
                name="longitud"
                variant="outlined"
                value={longitud}
                onChange={(event)=>setCedula({...Cedula,longitud:event.target.value})}
                size='small'
                sx={{ backgroundColor: "#fff",mt:'10px' }}
                 /> 
                  <Typography sx={{mt:'10px', fontWeight: 'bold'}}>
                  CLAVES GEOESTADISTICAS (INEGI)
                </Typography>
                <TextField
                fullWidth
                label="LOCALIDAD"
                name="localidad"
                variant="outlined"
                value={localidad}
                onChange={(event)=>setCedula({...Cedula,localidad:event.target.value})}
                size='small'
                sx={{ backgroundColor: "#fff",mt:'10px' }}
                 />      

                </Grid>

                <Grid item xs={6}>
                <Typography sx={{mt:'10px',fontWeight: 'bold'}}>
                TIPO DE OBRA
                </Typography>
                
                <FormControl fullWidth margin="normal" size="small" sx={{ backgroundColor: "#fff" }}>
                <InputLabel>Selecciona el Tipo</InputLabel>
                <Select
                  size="small"
                  label="Selecciona el Tipo"
                  value={tipo}
                  onChange={(event)=>setCedula({...Cedula,tipo:event.target.value})}
                  >
                  <MenuItem value="nueva">NUEVA</MenuItem>
                  <MenuItem value="rehabilitacion">REHABILITACIÓN</MenuItem>
                  <MenuItem value="ampliacion">AMPLIACION</MenuItem>
                 </Select>
                 </FormControl>

                 <Typography sx={{mt:'10px',fontWeight: 'bold'}}>
                DESCRIPCION DEL PROYECTO
                </Typography>
                <TextField
                fullWidth
                label="Escribe la descripcion"
                name="descripcion"
                variant="outlined"
                size="small"
                value={descrip}
                onChange={(event)=>setCedula({...Cedula,descrip:event.target.value})}

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

                </Grid>

            </Grid>

        </Grid>
                <Box sx={{mt:'30px'}}>
                    <IconButton onClick={generarCedula}>
                        <ArchiveIcon sx={{color:'green',fontSize:'50px'}}/>
                    </IconButton>
                </Box>
        </Grid>
          </ReactModal>
    )
  }
  