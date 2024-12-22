import { Box, Grid, IconButton, Typography } from '@mui/material';
import React from 'react'
import ReactModal from 'react-modal';
import { useExpediStore } from '../../../hooks/useExpediStore';
import { estiloGrid1 } from '../../../helpers';
import SaveIcon from '@mui/icons-material/Save';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { CedulaModal } from './CedulaModal';
import { SolicitudRegModal } from './SolicitudRegModal';
import { AceptaComuniModal } from './AceptaComuniModal';
import { FactibilidadModal } from './FactibilidadModal';
import { InovacionModal } from './InovacionModal';


const customStyles = {
    content: {
      width: '80vw',
      height: '82.6vh',
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


export const ExpedienteModal = () => {

    const {expediModal,
            starExpeModalValue,
            expediente,
            startCedulaModalValue,
            cedulaModal,
            startRegistroModalValue,
            startComunuModalValue,
            startFactibiModalValue,
            startInovaModalValue,
            }= useExpediStore()

    const crearCedula =()=>{
        startCedulaModalValue(true)
    }
    
    const crearSolicitud=()=>{
        startRegistroModalValue(true)
    }
    const crearAcepComunidad=()=>{
        startComunuModalValue(true)
    }

    const crearFactibilidad=()=>{
        startFactibiModalValue(true)
    }

    const crearInovacion=()=>{
    startInovaModalValue(true)

    }

    const oncloseModal = () => {
        starExpeModalValue(false);
        setTimeout(() => {
          const openButton = document.querySelector('[data-testid="open-modal-button"]');
          if (openButton) {
            openButton.focus();
          }
        }, 200);
      };
  return (
    <ReactModal
    isOpen={expediModal}
    onRequestClose={oncloseModal}
    style={customStyles}
    className="modal"
    overlayClassName="modal-fondo"
    closeTimeoutMS={200}
  >
     <Grid container spacing={2} justifyContent="center">
        <Typography variant='h5' sx={{marginTop:'10px',fontWeight: 'bold' }}>AGREGAR EXPEDIENTE</Typography>
        <Grid item xs={12}>
           <Grid container spacing={1} justifyContent="center">

            <Grid item style={{ backgroundColor:expediente.ced_regi_obra===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Cedula de Registro de Obra</Typography>
                <IconButton onClick={crearCedula}>
                   <PostAddIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
                <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

            <Grid item style={{ backgroundColor:expediente.soli_obra_bene===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Solicitud de Obras de Beneficiados</Typography>
            <IconButton onClick={crearSolicitud}>
                 <PostAddIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
                <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>   
            </Grid>

            <Grid item style={{ backgroundColor:expediente.acta_acep_bene===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Acta de Aceptacion de la Com. Beneficiada</Typography>
            <IconButton onClick={crearAcepComunidad}>
                 <PostAddIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
                <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.val_dic_fac===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Validacion o Dictamen de Factibilidad</Typography>
            <IconButton onClick={crearFactibilidad}>
                 <PostAddIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
                <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.cal_fis_finan===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Calendarizacion Fisica Financiera</Typography>
            <IconButton>
                 <PostAddIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
                <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.acta_apoyo_inv===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Acta de Apoyo a la Inversión</Typography>
            <IconButton onClick={crearInovacion}>
                 <PostAddIcon sx={{color:'white',fontSize:'36px'}}/>
            </IconButton>
            <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.acta_dona_prop===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Acta de Donacion o Propiedad de Terreno</Typography>
                <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.cro_macro===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Croquis de Macrolocalizacion</Typography>
                 <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.cro_micro===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Croquis de Microlocalizacion</Typography>
                <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.dic_imp_amb===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Dictemen sobre Impacto Ambiental</Typography>
                <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.esp_tec===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Especificaiones Tecnicas</Typography>
                <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.explo_insu===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Explosion de Insumos</Typography>
            <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.fotografias_est===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Fotografias del Estado Actual</Typography>
                <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.gas_indir===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Gastos Indirectos</Typography>
                <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

            <Grid item style={{ backgroundColor:expediente.memo_cal===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
                <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Memoria de Calculo</Typography>
                <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

            <Grid item style={{ backgroundColor:expediente.memo_des===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Memoria de Descriptiva</Typography>
            <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

            <Grid item style={{ backgroundColor:expediente.num_gene_obra===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Numeros Generadores de Obra</Typography>
            <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

            <Grid item style={{ backgroundColor:expediente.planeria===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Planeria</Typography>
            <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

            <Grid item style={{ backgroundColor:expediente.presu_obra===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Presupuesto de Obra</Typography>
                <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>
             
            <Grid item style={{ backgroundColor:expediente.res_eje_pro===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Resumen Ejecutivo del Proyecto</Typography>
               <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

            <Grid item style={{ backgroundColor:expediente.tar_pre_uni===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Tarjetas de Precios Unitarios</Typography>
                <IconButton>
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

           </Grid>
        </Grid>
        <Box>
            <IconButton>
                <SaveIcon sx={{color:'green',fontSize:'50px'}}/>
            </IconButton>
        </Box>
     </Grid>
      <CedulaModal/>
      <SolicitudRegModal/>
      <AceptaComuniModal/>
      <FactibilidadModal/>  
      <InovacionModal/>
  </ReactModal>
  )
}
