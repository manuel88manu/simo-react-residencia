import React, { useState } from 'react'
import ReactModal from 'react-modal';
import { useExpediStore } from '../../../hooks/useExpediStore';
import { Box, Button, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useObraStore } from '../../../hooks/useObraStore';
import { evaluarExpe, getFileNameFromUrl, replaceUrl } from '../../../helpers';

const customStyles = {
    content: {
      width: '60vw',
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

export const TablaExpeModal = () => {

const {tableExpeModal,startTablaExpModalValue,startDescargarCarpeta}=useExpediStore()

const {expediente,startDescargarArchivo}=useExpediStore()

const {obra,dictamen}=useObraStore()

const [selectedRow, setSelectedRow] = useState(null);

const [url, seturl] = useState('')

  // Función para manejar el click en la fila
  const handleRowClick = (index) => {
    setSelectedRow(index);
    seturl(expediente[Object.keys(expediente)[index]])
  };


const keyToName = {
    acta_apoyo_inv: 'Acta de Apoyo a la Inversion',
    ced_regi_obra: 'Cedula de Registro de Obra',
    explo_insu: 'Explosion de Insumos',
    cro_micro: 'Croquis de Microlocalizacion',
    res_eje_pro: 'Resumen Ejecutivo del Proyecto',
    val_dic_fac: 'Validación de Dictamen de Factibilidad',
    num_gene_obra: 'Numeros Generadores de Obras',
    dic_imp_amb: 'Dictamen sobre Impacto Ambiental',
    memo_des: 'Memoria Descriptiva',
    planeria: 'Planería',
    acta_dona_prop: 'Acta de Donación o Propiedad de Terreno',
    memo_cal: 'Memoria de Calculo',
    esp_tec: 'Especificaciones Tecnicas',
    cal_fis_finan: 'Calendarizacion Fisica Financiera',
    cro_macro: 'Croquis de Macrolocalizacion',
    acta_acep_bene: 'Acta de Aceptación de la Comunidad Beneficiada',
    soli_obra_bene: 'Solicitud de obra de los Beneficiarios',
    gas_indir: 'Gastos Indirectos',
    fotografias_est: 'Fotografías del Estado Actual',
    presu_obra: 'Presupuesto de Obra',
    tar_pre_uni: 'Tarjetas de Precios Unitarios',
  };

const descargarAchivo=()=>{

startDescargarArchivo(url)

}

const descargarDictamen=()=>{

startDescargarArchivo(dictamen.arc_dictamen)

}

const descargarCapeta=()=>{

startDescargarCarpeta(replaceUrl(obra.num_obra),`/${replaceUrl(obra.num_obra)}/`)

}


const oncloseModal = () => {
        startTablaExpModalValue(false);
        setTimeout(() => {
          const openButton = document.querySelector('[data-testid="open-modal-button"]');
          if (openButton) {
            openButton.focus();
          }
        }, 200);
      };

  return (


 <ReactModal
    isOpen={tableExpeModal}
    onRequestClose={oncloseModal}
    style={customStyles}
    className="modal"
    overlayClassName="modal-fondo"
    closeTimeoutMS={200}
  >
<Grid container spacing={2} justifyContent="center">
<Typography variant='h5' sx={{marginTop:'10px',fontWeight: 'bold' }}>GESTIÓN DE DICTAMEN Y EXPEDIENTE</Typography>
<Grid item  xs={12}>
 <Grid container  spacing={2} justifyContent="center">

<Grid item xs={6}  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
<Typography variant='h6' sx={{marginTop:'1px'}}>Descargar Dictamen</Typography>
<IconButton onClick={descargarDictamen} disabled={dictamen.arc_dictamen===''}>
<DownloadIcon sx={{color: dictamen.arc_dictamen==='' ? "gray" : "green",fontSize:'38px'}}/>
</IconButton>
</Grid>

<Grid item xs={6}  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
<Typography variant='h6' sx={{marginTop:'1px'}}>Descargar Documentos</Typography>
<IconButton onClick={descargarCapeta} disabled={evaluarExpe(expediente)}>
<DownloadForOfflineIcon sx={{ color: evaluarExpe(expediente) ? "gray" : "green", fontSize: "38px" }} /></IconButton>
</Grid>

</Grid>
</Grid>

<TableContainer style={{ height: '368px', overflowY: 'auto', width: "880px" }}>
  <Table stickyHeader>
    <TableHead>
      <TableRow>
        <TableCell>Expediente Técnico</TableCell>
        <TableCell>SI</TableCell>
        <TableCell>NO</TableCell>
        <TableCell>Descargar</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {/* Generación de las filas con 21 atributos fijos */}
      {Object.keys(expediente).map((key, index) => (
        <TableRow
          key={index}
          hover
          onClick={() => handleRowClick(index)}
          selected={selectedRow === index} // Marca la fila seleccionada
        >
          {/* Muestra el nombre largo de cada atributo */}
          <TableCell>{keyToName[key] || key}</TableCell>

          {/* Muestra "X" en SI o NO dependiendo si el valor está vacío */}
          <TableCell>{expediente[key] !== '' ? 'X' : ''}</TableCell>
          <TableCell>{expediente[key] === '' ? 'X' : ''}</TableCell>

          {/* Columna para "Descargar" solo si hay un enlace y la fila está seleccionada */}
          <TableCell>
            {selectedRow === index && expediente[key] && expediente[key] !== '' ? (
              <IconButton onClick={descargarAchivo}>
                <CloudDownloadIcon sx={{ color: 'green', fontSize: '36px' }} />
              </IconButton>
            ) : null}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</Grid>
</ReactModal>

  )
}
