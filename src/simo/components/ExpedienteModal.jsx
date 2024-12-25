import { Box, Grid, IconButton, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
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
import { CalendarioModal } from './CalendarioModal';
import { useObraStore } from '../../../hooks/useObraStore';
import Swal from 'sweetalert2';


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
            startCalendarModalValue,
            startGuardarFtp
            }= useExpediStore()


    const {obra,startFinalizarExpediente}=useObraStore()


    const fileInputRef=useRef()

    const [extraParam, setExtraParam] = useState(null);

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

    const crearCalendario=()=>{
    startCalendarModalValue(true)
    }

    const finExpediente=async()=>{
     const result =await Swal.fire({
            title: "¿Finalizar el Expediente?",
            text: `Deseas Finalizar el registro del expediente, no se modificara despues en esta ventana`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Finalizar Registro",
            cancelButtonText: "Seguir Modificando Expediente",
        });
        
        if (result.isConfirmed) {
           startFinalizarExpediente()
           starExpeModalValue(false);
               
 
      }else{
       return
    }

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

   const  onFileInputChange=({target})=>{
    if(target.files[0]===0) return
    
    console.log('Subiendo archivos:', target.files[0]);
    console.log('Parámetro adicional:', extraParam);
    //realizar metodo para guardar en el ftp y base de datos el enlace
    startGuardarFtp(obra,extraParam,target.files[0])    

    }

     const onButtonClick = (param) => {
        setExtraParam(param); // Configura el parámetro adicional en el estado
        fileInputRef.current.click(); // Dispara el clic en el input
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

<input
type='file'
onChange={onFileInputChange}
style={{display:'none'}}
ref={fileInputRef}
/>
        <Typography variant='h5' sx={{marginTop:'10px',fontWeight: 'bold' }}>AGREGAR EXPEDIENTE</Typography>
        <Grid item xs={12}>
           <Grid container spacing={1} justifyContent="center">

            <Grid item style={{ backgroundColor:expediente.ced_regi_obra===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Cedula de Registro de Obra</Typography>
                <IconButton onClick={crearCedula}>
                   <PostAddIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>

                <IconButton
                  onClick={()=>onButtonClick('ced_regi_obra')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

            <Grid item style={{ backgroundColor:expediente.soli_obra_bene===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Solicitud de Obras de Beneficiados</Typography>
            <IconButton onClick={crearSolicitud}>
                 <PostAddIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
                <IconButton
                  onClick={()=>onButtonClick('soli_obra_bene')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>   
            </Grid>

            <Grid item style={{ backgroundColor:expediente.acta_acep_bene===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Acta de Aceptacion de la Com. Beneficiada</Typography>
            <IconButton onClick={crearAcepComunidad}>
                 <PostAddIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
                <IconButton
                  onClick={()=>onButtonClick('acta_acep_bene')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.val_dic_fac===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Validacion o Dictamen de Factibilidad</Typography>
            <IconButton onClick={crearFactibilidad}>
                 <PostAddIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
                <IconButton
                  onClick={()=>onButtonClick('val_dic_fac')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.cal_fis_finan===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Calendarizacion Fisica Financiera</Typography>
            <IconButton onClick={crearCalendario}>
                 <PostAddIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
                <IconButton
                  onClick={()=>onButtonClick('cal_fis_finan')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.acta_apoyo_inv===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Acta de Apoyo a la Inversión</Typography>
            <IconButton onClick={crearInovacion}>
                 <PostAddIcon sx={{color:'white',fontSize:'36px'}}/>
            </IconButton>
            <IconButton
                  onClick={()=>onButtonClick('acta_apoyo_inv')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.acta_dona_prop===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Acta de Donacion o Propiedad de Terreno</Typography>
                <IconButton
                  onClick={()=>onButtonClick('acta_dona_prop')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.cro_macro===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Croquis de Macrolocalizacion</Typography>
                 <IconButton
                  onClick={()=>onButtonClick('cro_macro')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.cro_micro===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Croquis de Microlocalizacion</Typography>
                <IconButton
                  onClick={()=>onButtonClick('cro_micro')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.dic_imp_amb===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Dictemen sobre Impacto Ambiental</Typography>
                <IconButton
                  onClick={()=>onButtonClick('dic_imp_amb')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.esp_tec===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Especificaiones Tecnicas</Typography>
                <IconButton
                  onClick={()=>onButtonClick('esp_tec')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.explo_insu===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Explosion de Insumos</Typography>
                <IconButton
                  onClick={()=>onButtonClick('explo_insu')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.fotografias_est===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Fotografias del Estado Actual</Typography>
                <IconButton
                  onClick={()=>onButtonClick('fotografias_est')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>  
            </Grid>

            <Grid item style={{ backgroundColor:expediente.gas_indir===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Gastos Indirectos</Typography>
                <IconButton
                  onClick={()=>onButtonClick('gas_indir')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

            <Grid item style={{ backgroundColor:expediente.memo_cal===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
                <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Memoria de Calculo</Typography>
                <IconButton
                  onClick={()=>onButtonClick('memo_cal')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

            <Grid item style={{ backgroundColor:expediente.memo_des===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Memoria de Descriptiva</Typography>
                <IconButton
                  onClick={()=>onButtonClick('memo_des')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

            <Grid item style={{ backgroundColor:expediente.num_gene_obra===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Numeros Generadores de Obra</Typography>
                <IconButton
                  onClick={()=>onButtonClick('num_gene_obra')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

            <Grid item style={{ backgroundColor:expediente.planeria===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Planeria</Typography>
                <IconButton
                  onClick={()=>onButtonClick('planeria')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

            <Grid item style={{ backgroundColor:expediente.presu_obra===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Presupuesto de Obra</Typography>
                <IconButton
                  onClick={()=>onButtonClick('presu_obra')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>
             
            <Grid item style={{ backgroundColor:expediente.res_eje_pro===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Resumen Ejecutivo del Proyecto</Typography>
                <IconButton
                  onClick={()=>onButtonClick('res_eje_pro')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

            <Grid item style={{ backgroundColor:expediente.tar_pre_uni===''? '#fc0303':'#07ad0f'}} sx={estiloGrid1()}>
            <Typography  sx={{ color: 'white', fontWeight: 'bold' }}>Tarjetas de Precios Unitarios</Typography>
                <IconButton
                  onClick={()=>onButtonClick('tar_pre_uni')}    
                 >
                   <FolderCopyIcon sx={{color:'white',fontSize:'36px'}}/>
                </IconButton>
            </Grid>

           </Grid>
        </Grid>
        <Box>
            <IconButton onClick={finExpediente}>
                <SaveIcon sx={{color:'green',fontSize:'50px'}}/>
            </IconButton>
        </Box>
     </Grid>
      <CedulaModal/>
      <SolicitudRegModal/>
      <AceptaComuniModal/>
      <FactibilidadModal/>  
      <InovacionModal/>
      <CalendarioModal/>
  </ReactModal>
  )
}
