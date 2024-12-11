import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Swal from 'sweetalert2';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Grid,
  TextField,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useObraStore } from '../../../hooks/useObraStore';

const customStyles = {
  content: {
    width: '70vw',
    height: '84vh',
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

export const AgregarPresupuestoModal = () => {
  const {
    startModalPresuValue,
    modalPresupuesto,
    partidas,
    startObtenerPartidas,
    obra,
    startAgregarPartidas,
    conceptos,
    startObtenerConceptos,
    startAgregarConceptos,
    startValidarPresupuesto,
    startActualizarConcepto,
    startActualizarPartida,
    startEliminarConcepto
  } = useObraStore();

  const [nombre, setNombre] = useState('');
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [formData, setFormData] = useState({
    nombre_conc: '',
    unidad: '',
    p_unitario: 0,
    cantidad: 0,
  });

  const handleAddPartida = async () => {
    try {
      const idobra = obra.idobra;
      await startAgregarPartidas(idobra, nombre);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message || 'Hubo un problema al agregar los presupuestos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const nombrePartiRef = useRef();

  const handleRowSelect = (row) => {
    setNombre(row.nombre_par)
    setSelectedRow(row);
    const clean={nombre_conc: '',
        unidad: '',
        p_unitario: 0,
        cantidad: 0}
        setFormData(clean)
    if (nombrePartiRef.current) {
        nombrePartiRef.current.focus(); // Esto pone el foco en el TextField
        nombrePartiRef.current.select(); // Esto selecciona todo el texto en el TextField
      }

  };


  const handleDeleteConcepto=async(row)=>{

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text:  `Deseas eliminar el concepto llamado " ${selectedConcept.nombre_conc} "`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar concepto",
      cancelButtonText: "No, cancelar",
  });

  if (result.isConfirmed) {
    try {
    
    console.log(selectedConcept)
    await startEliminarConcepto(obra.idobra,selectedConcept)
    const clean={nombre_conc: '',
      unidad: '',
      p_unitario: 0,
      cantidad: 0}
     setFormData(clean)

    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message || 'Hubo un problema al agregar los presupuestos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }else {
    return;
  }
  }

  const handleEdit = async(row) => {
    try {
        await startActualizarConcepto(obra.idobra,formData)
        const clean={nombre_conc: '',
            unidad: '',
            p_unitario: 0,
            cantidad: 0}
        setFormData(clean)
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.message || 'Hubo un problema al agregar los presupuestos',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
    }
  };

  const handleEditPartida=async(part)=>{
    try {
        const partida={
            idpartida:selectedRow.idpartida,
            nombre_par:nombre
        }
        await startActualizarPartida(obra.idobra,partida)
        setNombre('')
        setSelectedRow({})
 
    } catch (error) {
        setSelectedRow({})
        Swal.fire({
            title: 'Error',
            text: error.message || 'Hubo un problema al agregar los presupuestos',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddConcept = async () => {
    try {
      if (!selectedRow?.idpartida) {
        Swal.fire('Error', 'Por favor, selecciona una partida primero.', 'error');
        return;
      }

      const concepto = {
        ...formData,
        p_unitario: parseFloat(formData.p_unitario).toFixed(2),
        cantidad: parseFloat(formData.cantidad).toFixed(2),
      };

      const idobra = obra.idobra;
      await startAgregarConceptos(selectedRow.idpartida, concepto, idobra);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message || 'Hubo un problema al agregar los presupuestos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };
  const nombreConcRef = useRef();

  

  const handleRowClick = (concepto) => {
    setSelectedConcept(selectedConcept?.idconcepto === concepto.idconcepto ? null : concepto);
    setFormData(concepto)
    if (nombreConcRef.current) {
        nombreConcRef.current.focus(); // Esto pone el foco en el TextField
        nombreConcRef.current.select(); // Esto selecciona todo el texto en el TextField
      }
    
  };


  const validarPresupuesto=async()=>{
    try {
        await startValidarPresupuesto(obra.idobra)
        Swal.fire({
            title: "¡Operación exitosa!",
            text: "El presupuesto es valido y se agrego correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
        })

        setSelectedConcept({})
        setSelectedRow({})
        startModalPresuValue(false)
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.message || 'Hubo un problema al agregar los presupuestos',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
    }
  }

  const oncloseModal = () => {
    startModalPresuValue(false);
    setTimeout(() => {
      const openButton = document.querySelector('[data-testid="open-modal-button"]');
      if (openButton) {
        openButton.focus();
      }
    }, 200);
  };

  useEffect(() => {
    startObtenerPartidas(obra.idobra);
  }, [obra]);

  useEffect(() => {
    if (selectedRow?.idpartida) startObtenerConceptos(selectedRow.idpartida);
  }, [selectedRow]);

  return (
    <ReactModal
      isOpen={modalPresupuesto}
      onRequestClose={oncloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <Box>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="h6" align="center">
                    Agregar Partida
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    label="Nombre"
                    value={nombre}
                    inputRef={nombrePartiRef}
                    onChange={(e) => setNombre(e.target.value)}
                    margin="normal"
                  />
                  <Box display="flex" justifyContent="center" marginBottom={2}>
                    <IconButton color="primary" onClick={handleAddPartida}>
                      <AddCircleIcon fontSize="large" />
                    </IconButton>
                  </Box>
                  <TableContainer component={Paper} style={{ height: '292px', overflowY: 'auto' }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>Nombre de Partida</TableCell>
                          <TableCell>Monto Total</TableCell>
                          <TableCell>Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {partidas.map((partida) => (
                          <TableRow
                            key={partida.idpartida}
                            selected={selectedRow?.idpartida === partida.idpartida}
                            onClick={() => handleRowSelect(partida)}
                            style={{ cursor: 'pointer' }}
                          >
                            <TableCell>{partida.nombre_par}</TableCell>
                            <TableCell>{partida.monto_tot}</TableCell>
                            <TableCell>
                              {selectedRow?.idpartida === partida.idpartida && (
                                <IconButton onClick={() => handleEditPartida(partida)} color="secondary">
                                  <EditIcon />
                                </IconButton>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="center">
                  Agregar Concepto
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      name="nombre_conc"
                      value={formData.nombre_conc}
                      onChange={handleInputChange}
                      inputRef={nombreConcRef}// Conectamos la referencia aquí
                      label="Nombre de Concepto"
                      sx={{mt:1.99}}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      size="small"
                      name="unidad"
                      value={formData.unidad}
                      onChange={handleInputChange}
                      label="Unidad"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      size="small"
                      name="p_unitario"
                      value={formData.p_unitario}
                      onChange={handleInputChange}
                      label="P. Unitario"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      size="small"
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleInputChange}
                      label="Cantidad"
                    />
                  </Grid>
                </Grid>
                <Box textAlign="center" marginTop={2}>
                  <IconButton color="primary" onClick={handleAddConcept}>
                    <AddCircleIcon fontSize="large" />
                  </IconButton>
                </Box>
                <TableContainer component={Paper} style={{ height: '245px', overflowY: 'auto' }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {conceptos.map((concepto) => (
                        <TableRow
                          key={concepto.idconcepto}
                          selected={selectedConcept?.idconcepto === concepto.idconcepto}
                          onClick={() => handleRowClick(concepto)}
                          style={{ cursor: 'pointer' }}
                        >
                          <TableCell>{concepto.nombre_conc}</TableCell>
                          <TableCell>{concepto.monto}</TableCell>
                          <TableCell>
                    {selectedConcept?.idconcepto === concepto.idconcepto && (
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton onClick={() => handleEdit(concepto)} color="secondary">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteConcepto(concepto)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )}
                  </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" marginTop={2}>
              <IconButton color="secondary" onClick={validarPresupuesto}>
                <SaveAsIcon fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ReactModal>
  );
};
