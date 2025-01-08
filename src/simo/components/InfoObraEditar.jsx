import { Box, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useObraStore } from '../../../hooks/useObraStore'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { AgregarPresupuestoModal } from './AgregarPresupuestoModal';
import { ExpedienteModal } from './ExpedienteModal';
import { useExpediStore } from '../../../hooks/useExpediStore';
import { useViewStore } from '../../../hooks';
import Swal from 'sweetalert2';
import { DictamenModal } from './DictamenModal';
import { truncateString } from '../../../helpers';

export const InfoObraEditar = () => {

    const {obras,
        obra,
        startAgregarObra,
        valueDictamenGenerar,
        valueExpedienteAgregar,
        valueFinalizar,
        valueObraAgregar,
        valuePresupuestoAgregar,
        startModalPresuValue,
        startAgregarExpediente,
        startGenerarDictamen,
        startFinalizarObra,
        modalPresupuesto,
        startDictamenValue
    }=useObraStore();   


const { selectViewSimo } = useViewStore();

const{starExpeModalValue}=useExpediStore()

 const agregarPresupuesto = () => {
        if (!modalPresupuesto) { // Verifica que no esté ya abierto
            startModalPresuValue(true);
        }
    };

    const agregarExpediente = () => {
        
        starExpeModalValue(true)
    };

    const generarDictamen = () => {
       startDictamenValue(true)
    };

    const finalizarProceso = () => {
        startFinalizarObra()
        Swal.fire({
            title: "¡Operación exitosa!",
            text: "La Actualizacion de La Obra a sido finalizada",
            icon: "success",
            confirmButtonText: "Aceptar",
        })
        selectViewSimo("inicio")

    };


return (
<Grid container spacing={2} justifyContent="center" alignItems="center">
  <Grid 
    item 
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} // Agrega estilos para centrar
  >
    <Typography variant="h4">{truncateString(String(obra.nombre).toUpperCase(),65)}</Typography>
    <Typography variant="h5">{obra.num_obra}</Typography>
    <Typography variant="h5">{`$${obra.presupuesto.toLocaleString()}`}</Typography>
  </Grid>
<Grid item xs={6} sx={{mt:0.5}}>
    
    <Box
                sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                padding: 3,
                backgroundColor: "#fff",
                minHeight: "40px",
                Width:"80px"
                }}
            >
                <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 2,
                }}
                >
                <IconButton
                    sx={{
                    flex: 1,
                    justifyContent: "space-between",
                    padding: 1,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 1,
                    minWidth: "150px"
                    }}
                    onClick={agregarPresupuesto}  // Acción independiente
                    disabled={valuePresupuestoAgregar.notvisible} 
                >
                   <Typography sx={{ flex: 1, fontSize: "1rem" }}>Editar Presupuesto</Typography>
                    {
                        (valuePresupuestoAgregar.icono)?
                        <CheckCircleIcon fontSize="large" color="success" />
                        :<CancelIcon fontSize="large" color="error" />
                    }
                </IconButton>
                </Box>

                <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 2,
                }}
                >
                <IconButton
                    sx={{
                    flex: 1,
                    justifyContent: "space-between",
                    padding: 1,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 1,
                    minWidth: "150px"
                    }}
                    onClick={agregarExpediente}  // Acción independiente
                    disabled={valueExpedienteAgregar.notvisible}
                >
                    <Typography sx={{ flex: 1, fontSize: "1rem" }}>Editar Expediente</Typography>
                    {
                        (valueExpedienteAgregar.icono)?
                        <CheckCircleIcon fontSize="large" color="success" />
                        :<CancelIcon fontSize="large" color="error" />
                    }
                </IconButton>
                </Box>
                <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 2,
                }}
                >
                <IconButton
                    sx={{
                    flex: 1,
                    justifyContent: "space-between",
                    padding: 1,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 1,
                    minWidth: "150px"
                    }}
                    onClick={generarDictamen}  // Acción independiente
                    disabled={valueDictamenGenerar.notvisible} 
                >
                    <Typography sx={{ flex: 1, fontSize: "1rem" }}>Editar Dictamen</Typography>
                    {
                        (valueDictamenGenerar.icono)?
                        <CheckCircleIcon fontSize="large" color="success" />
                        :<CancelIcon fontSize="large" color="error" />
                    }
                </IconButton>
                </Box>
                <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 2,
                }}
                >
                <IconButton
                    sx={{
                    flex: 1,
                    justifyContent: "space-between",
                    padding: 1,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 1,
                    minWidth: "150px"
                    }}
                    onClick={finalizarProceso}  // Acción independiente
                    disabled={valueFinalizar.notvisible} 
                >
                    <Typography sx={{ flex: 1, fontSize: "1rem" }}>Finalizar Proceso</Typography>
                    {
                        (valueFinalizar.icono)?
                        <CheckCircleIcon fontSize="large" color="success" />
                        :<CancelIcon fontSize="large" color="error" />
                    }
                </IconButton>
                </Box>
            </Box>
</Grid>


<AgregarPresupuestoModal/>
<ExpedienteModal/>
<DictamenModal/>

</Grid>

)
}
