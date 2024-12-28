import React, { useEffect, useState } from 'react'
import { usePeriodoStore, useViewStore } from '../../../hooks';
import { useObraStore } from '../../../hooks/useObraStore';
import { useExpediStore } from '../../../hooks/useExpediStore';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { AgregarPresupuestoModal } from './AgregarPresupuestoModal';

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

const {busqueda,partidas,startBuscarObras,startObtenerInfo,startResetBox,startModalPresuValue,modalPresupuesto}=useObraStore()
const {startTablaExpModalValue}=useExpediStore()
const [idobra, setidobra] = useState(0)
const [numObra, setNumObra] = useState("");


  const handleRowClick = (row) => {
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
<TableContainer component={Paper} style={{ height: '442px', overflowY: 'auto', width: "990px" }}>
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
             <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {busqueda.map((obra) => (
              <TableRow
                key={obra.idobra}
                onClick={() => handleRowClick(obra)}
                selected={selectedRow?.idobra===obra.idobra}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{obra.num_obra}</TableCell>
                <TableCell>{obra.nombre}</TableCell>
                <TableCell>{`$${obra.presupuesto.toLocaleString()}`}</TableCell>
                <TableCell>{obra.num_aproba.split("\n").map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}</TableCell>
                {selectedRow?.idobra===obra.idobra && (
                  <TableCell>
                   <IconButton onClick={agregarPresupuesto}>
                    <PriceChangeIcon  style={{ fontSize: '48px', color: 'green' }}/>
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AgregarPresupuestoModal/>
</Grid>

  )
}
