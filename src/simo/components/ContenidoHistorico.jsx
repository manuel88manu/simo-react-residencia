import { Autocomplete, Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import React, { useEffect, useState } from 'react'
import { opcionesPrograma } from '../../../helpers';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useObraStore } from '../../../hooks/useObraStore';
import Swal from 'sweetalert2';
import { useAuthStore, useViewStore } from '../../../hooks';

export const ContenidoHistorico = () => {

  const [selectedYear, setSelectedYear] = useState(null);

  //===============Movimientos=========================
  const [correo, setCorreo] = useState('');
  const [selectedAño, setSelectedAño] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  
  const [tipo, setTipo] = useState('');
  const [numobra, setnumobra] = useState('');
  const [programa, setPrograma] = useState('');
  const [programaInputValue, setProgramaInputValue] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const {busqueda,startBuscarObras,startLimpiarBusqueda}=useObraStore()
  const {movimientos,startObtenerMovimientos,startLimpiarMovimientos}=useAuthStore()
  const{ stateViewUser}=useViewStore()

  const handleYearChange = (newValue) => {
    setSelectedYear(newValue);
  };

  const handleAñoChange = (newValue) => {
    setSelectedAño(newValue);
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };
  

  const handleChangeNumobra=(event)=>{
    setnumobra(event.target.value)
  }

  const handleChangeCorreo=(event)=>{
    setCorreo(event.target.value)
  }

  const handleChange = (event, newValue) => {
    if (newValue) {
      setPrograma(newValue.value); // Asegúrate de guardar el valor adecuado
      console.log(newValue.value); // Este será el valor del programa seleccionado
    } else {
      setPrograma(''); // Restablecer si no hay valor seleccionado
    }
  };

  const handleChangeTipo = (event) => {
    setTipo(event.target.value);  // Correcto: Accede a event.target.value
  };

 
  const handleRowClick = (row) => {
    setSelectedRow(row);
    
  };

  const opcionesProgramasSeleccionadas = opcionesPrograma.evaluar;

  const buscarObra=async()=>{
    try {
      const año= selectedYear?.year() ?? '';
       await startBuscarObras(año,tipo,programa,numobra.trim())
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Hubo un problema al agregar los presupuestos",
        icon: "error",
        confirmButtonText: "Aceptar",
    });
    }
  
  }

  const limpiarCampos=()=>{
    setSelectedYear(null)
    setnumobra('')
    setPrograma('')
    setTipo('')
    startLimpiarBusqueda()
  }


  //------------------Movimientos--------------------

  const buscarMovimientos=async()=>{
    try {
      const año = selectedAño ? selectedAño.year() : null; 
      const dia= selectedDate ? selectedDate.format('YYYY-MM-DD') : null;
      await startObtenerMovimientos(dia,año,correo.trim())
   

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Hubo un problema al agregar los presupuestos",
        icon: "error",
        confirmButtonText: "Aceptar",
    });
    }
  }

  const limpiarMovimientos=()=>{
    setCorreo('')
    setSelectedAño(null)
    setSelectedDate(null)
    startLimpiarMovimientos()
  }
  useEffect(() => {
    startLimpiarBusqueda()
    startLimpiarMovimientos()
  }, [stateViewUser])
  
  return (
    <Box sx={{
      width: '100%',
      padding: 2,
      backgroundColor: "#f7f7f7",
      overflowY: 'auto',
    }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container justifyContent="center" alignItems="center" sx={{ marginBottom: 1 }}>
            <Grid item>
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Buscar Obras Por:</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Numero de Obra"
                name="num_obra"
                onChange={handleChangeNumobra}
                value={numobra}
                variant="outlined"
                sx={{ backgroundColor: "#fff", marginBottom: 2 }}
              />
              <DesktopDatePicker
                views={["year"]}
                label="Seleccionar Año"
                value={selectedYear}
                onChange={handleYearChange}
                inputFormat="yyyy"
                TextFieldComponent={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth margin="normal" size="small" sx={{ backgroundColor: "#fff" }}>
                <InputLabel>Tipo</InputLabel>
                <Select
                  onChange={handleChangeTipo}
                  value={tipo || ''}  // Asegura que tipo tenga un valor por defecto si es vacío
                  size="small"
                  label="Tipo"
                >
                  <MenuItem value="faismun">FAISMUN</MenuItem>
                  <MenuItem value="fortamun">FORTAMUN</MenuItem>
                  <MenuItem value="odirectas">O.Directas</MenuItem>
                  <MenuItem value="federal">FEDERAL</MenuItem>
                  <MenuItem value="estatal">ESTATAL</MenuItem>
                </Select>
              </FormControl>
              <Autocomplete
                fullWidth
                margin="normal"
                size="small"
                name="programa"
                onChange={handleChange}
                sx={{ backgroundColor: "#fff", mt: 2 }}
                options={opcionesProgramasSeleccionadas}
                getOptionLabel={(opcion) => opcion.label}
                value={opcionesProgramasSeleccionadas.find((opcion) => opcion.value === programa) || null}
                inputValue={programaInputValue}
                onInputChange={(e, newValue) => setProgramaInputValue(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Programa" variant="outlined" size="small" />
                )}
                isOptionEqualToValue={(option, value) => option.value === value?.value}
              />
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Box>
              <IconButton onClick={buscarObra}>
                <ContentPasteSearchIcon sx={{ color: 'green', fontSize: 50 }}/>
              </IconButton>
              </Box>
                <Box>
                <IconButton onClick={limpiarCampos}>
                <SettingsBackupRestoreIcon sx={{ color: 'red', fontSize: 50 }} />
              </IconButton>
                </Box>
              
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
            <Grid item>
            <TableContainer component={Paper} style={{ height: '310px', overflowY: 'auto', width: "680px" }}>
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
              <TableCell sx={{ width: '100px',  fontWeight: 'bold' }}>Num. de Obra</TableCell>
              <TableCell>Nombre De Obra</TableCell>
              <TableCell>Monto Ejercido</TableCell>
              <TableCell>Metas</TableCell>
              <TableCell >Num. de Aprobacion</TableCell>
             <TableCell>Acciones</TableCell>
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
                <TableCell> {obra.metas.split("<br>").map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}</TableCell>
                <TableCell>{obra.num_aproba.split("\n").map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}</TableCell>
                {selectedRow?.idobra===obra.idobra && (
                  <TableCell>
                    <IconButton color="secondary">
                      <InsertDriveFileIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
        <Grid container justifyContent="center" alignItems="center" sx={{ marginBottom: 1 }}>
            <Grid item>
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Movimientos de Usuarios</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginBottom: '11px' }}>
            <Grid item xs={4}>
            <TextField
            fullWidth
            label="Correo de usuario"
            name="correo"
            variant="outlined"
            value={correo}
            onChange={handleChangeCorreo}
            sx={{ backgroundColor: "#fff" }}
          />
            </Grid>
            
            <Grid item xs={4}>
            <DesktopDatePicker
                views={["year"]}
                label="Seleccionar Año"
                value={selectedAño}
                onChange={handleAñoChange}
                inputFormat="yyyy"
                TextFieldComponent={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={4}>
            <DesktopDatePicker
              label="Seleccionar Fecha"
              inputFormat="dd/MM/yyyy"  // Formato de fecha (día/mes/año)
              value={selectedDate}      // Valor de la fecha seleccionada
              onChange={handleDateChange} // Función que se llama al cambiar la fecha
              TextFieldComponent={(params) => <TextField {...params} />}
            />
            </Grid>
          </Grid>
          <Grid container spacing={5} justifyContent="center" alignItems="center" sx={{ marginBottom: '16px' }}>
            <Grid item>
              <Box>
                <IconButton onClick={buscarMovimientos}>
                  <PlagiarismIcon sx={{ color: 'green', fontSize: 50 }}/>
                </IconButton>
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <IconButton onClick={limpiarMovimientos}>
                  <RotateLeftIcon sx={{ color: 'red', fontSize: 50 }}/>
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
            <TableContainer component={Paper} style={{ height: '310px', overflowY: 'auto', width: "650px" }}>
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
              <TableCell>Correo</TableCell>
              <TableCell>Accion</TableCell>
              <TableCell>fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movimientos.map((movi) => (
              <TableRow>
                <TableCell>{movi.correo}</TableCell>
                <TableCell>{movi.accion}</TableCell>
                <TableCell>{new Date(movi.fecha).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
            </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
