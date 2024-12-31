import React, { useEffect, useState } from 'react'
import { usePeriodoStore, useViewStore } from '../../../hooks';
import { useObraStore } from '../../../hooks/useObraStore';
import { useExpediStore } from '../../../hooks/useExpediStore';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { AgregarPresupuestoModal } from './AgregarPresupuestoModal';
import { TablaExpeModal } from './TablaExpeModal';

export const TablaPresupuesto = () => {

const [selectedRow, setSelectedRow] = useState(null);
const { estadoPresupuesto } = useViewStore();
  const {
    presuEstatal,
    presuFaismun,
    presuFortamun,
    presuOdirectas,
    presuFederal,
    faltante,
    startObtenerFaltante
  } = usePeriodoStore();
const {selectViewSimo,stateViewSimo}=useViewStore()

const {busqueda,partidas,startBuscarObras,startObtenerInfo,startResetBox,startModalPresuValue,modalPresupuesto,startIncioEditarObra}=useObraStore()
const {startTablaExpModalValue}=useExpediStore()
const [idobra, setidobra] = useState(0)
const [numObra, setNumObra] = useState("");


  const handleRowClick = (row,event) => {
  if (event.target.tagName !='TD') {
       console.log('entro button')
    return;
     }
    
    console.log('entro button')
    setSelectedRow(row);
    startObtenerInfo(row.idobra)
    startResetBox()  
  
  };


  const handleChange = (event) => {
    const año = new Date().getFullYear();
    setNumObra(event.target.value);
    startBuscarObras(año,'','',(event.target.value).trim())
  };

  const agregarPresupuesto=()=>{
   startModalPresuValue(true);
  }

  const mostrarTabla=()=>{
  startTablaExpModalValue(true)

  }

 useEffect(() => {
    const año = new Date().getFullYear();
    const presupuestoMapping = {
      estatal: presuEstatal,
      faismun: presuFaismun,
      fortamun: presuFortamun,
      odirectas: presuOdirectas,
      federal: presuFederal,
    };
    startBuscarObras(año,'','',numObra)
    setNumObra('')

  }, []);

useEffect(() => {
const año = new Date().getFullYear();
startBuscarObras(año,'','',numObra)

}, [partidas])


useEffect(() => {

if (selectedRow !=null) {
    startResetBox();
 
}

}, [modalPresupuesto])



  return (

<Grid container spacing={2}  direction="column"
    alignItems="center" >
<TextField
      label="Buscar por No. De Obra"
      variant="outlined"
      name="num_obra_buscar"
      size="small"
      sx={{
        backgroundColor: "#fff",
        width: "300px",
        mb:'20px'
      }}
      value={numObra} // El valor del TextField será el estado numObra
      onChange={handleChange} // Al escribir en el TextField, actualizamos el estado
    />
<TableContainer component={Paper} style={{ height: '442px', overflowY: 'auto', width: "1100px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#1976d2", // Color de fondo azul para el encabezado
                "& th": {
                  color: "black", // Aseguramos que el texto sea blanco
                  fontWeight: "bold",
                },
              }}
            > 
              <TableCell sx={{ width: '150px', fontWeight: 'bold' }}>Num. de Obra</TableCell>
              <TableCell>Nombre De Obra</TableCell>
              <TableCell>Monto Ejercido</TableCell>
              <TableCell sx={{ width: '160px', fontWeight: 'bold' }}>Num. de Aprobacion</TableCell>
              <TableCell sx={{ width: '80px', fontWeight: 'bold' }}>Mostrar Expediente</TableCell>
              <TableCell sx={{ width: '80px', fontWeight: 'bold' }}>Editar Presupuesto</TableCell>
              <TableCell sx={{ width: '80px', fontWeight: 'bold' }}>Modificar Obra</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {busqueda.map((obra) => (
              <TableRow
                key={obra.idobra}
                onClick={(event) => handleRowClick(obra,event)}
                selected={selectedRow?.idobra===obra.idobra}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{obra.num_obra}</TableCell>
                <TableCell>{obra.nombre}</TableCell>
                <TableCell>{`$${obra.presupuesto.toLocaleString()}`}</TableCell>
                <TableCell>{obra.num_aproba}</TableCell>

               {selectedRow?.idobra===obra.idobra && (
                  <TableCell>
                   <IconButton onClick={mostrarTabla}>
                    <InsertDriveFileIcon  style={{ fontSize: '40px', color: 'green' }}/>
                    </IconButton>
                  </TableCell>
                )}
                {selectedRow?.idobra===obra.idobra && (
                  <TableCell>
                   <IconButton onClick={agregarPresupuesto}>
                    <PriceChangeIcon  style={{ fontSize: '40px', color: 'green' }}/>
                    </IconButton>
                  </TableCell>
                )}
                  {selectedRow?.idobra===obra.idobra && (
                  <TableCell>
                   <IconButton onClick={(e) =>{ e.stopPropagation();selectViewSimo("Editar Obra");startIncioEditarObra()}}>
                    <BorderColorIcon  style={{ fontSize: '40px', color: 'green' }}/>
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AgregarPresupuestoModal/>
      <TablaExpeModal/>
</Grid>

  )
}
