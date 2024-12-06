import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Swal from 'sweetalert2';
import SaveAsIcon from '@mui/icons-material/SaveAs';
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
import { useAuthStore, useViewStore } from '../../../hooks';
import { useObraStore } from '../../../hooks/useObraStore';

const customStyles = {
    content: {
      width: '70vw',  // Usa un porcentaje más grande para el ancho
      height: '84vh', // Puedes ajustar la altura para tener más espacio
      maxWidth: '70vw',  // Define un máximo en el ancho si lo necesitas
      maxHeight: '84vh', // Define un máximo en la altura si lo deseas
      borderRadius: '10px',
      padding: '20px',
      position: 'absolute', // Cambié "relative" a "absolute" para control de posicionamiento
      top: '50%', // Esto coloca el modal a la mitad de la pantalla
      left: '50%', // Esto lo coloca al centro horizontal
      transform: 'translate(-50%, -42.5%)', // Este ajuste mueve el modal hacia abajo un poco
    },
  };

ReactModal.setAppElement('#root');

export const AgregarPresupuestoModal = () => {
  const { usuarioEditable, startActulizarUsuario } = useAuthStore();
  const {
    startModalPresuValue,
    modalPresupuesto,
    partidas,
    startObtenerPartidas,
    obra,
    startAgregarPartidas,
  } = useObraStore();

  const [nombre, setNombre] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);

  const handleAddPartida = () => {
    const idobra = obra.idobra;
    startAgregarPartidas(idobra, nombre);
  };

  const handleRowSelect = (row) => {
    console.log('Fila seleccionada:', row);
    setSelectedRow(row.idpartida === selectedRow ? null : row.idpartida);
  };

  const handleEdit = () => {
    if (selectedRow) {
      console.log(
        'Editando partida:',
        partidas.find((p) => p.idpartida === selectedRow)
      );
    }
  };

  const [conceptos, setConceptos] = useState([]);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [formData, setFormData] = useState({
    idPartida: '',
    nombre: '',
    unidad: '',
    pUnitario: '',
    cantidad: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddConcept = () => {
    const { idPartida, nombre, unidad, pUnitario, cantidad } = formData;

    if (idPartida && nombre && unidad && pUnitario && cantidad) {
      const monto = parseFloat(pUnitario) * parseFloat(cantidad);

      setConceptos([
        ...conceptos,
        {
          idConcepto: idPartida,
          nombreConc: nombre,
          monto: monto.toFixed(2),
        },
      ]);

      setFormData({
        idPartida: '',
        nombre: '',
        unidad: '',
        pUnitario: '',
        cantidad: '',
      });
    }
  };

  const handleRowClick = (row, index) => {
    setSelectedConcept(index === selectedConcept ? null : index);
  };

  const handleEditConcept = (concept) => {
    console.log('Editar:', concept);
  };

  const oncloseModal = () => {
    startModalPresuValue(false);

    setTimeout(() => {
      const openButton = document.querySelector(
        '[data-testid="open-modal-button"]'
      );
      if (openButton) {
        openButton.focus();
      }
    }, 200);
  };

  useEffect(() => {
    startObtenerPartidas(obra.idobra);
  }, [obra]);

  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (modalPresupuesto) {
      rootElement.setAttribute('inert', 'true');
    } else {
      rootElement.removeAttribute('inert');
    }
  }, [modalPresupuesto]);

  return (
    <ReactModal
  isOpen={modalPresupuesto}
  onRequestClose={oncloseModal}
  style={customStyles}
  shouldFocusAfterRender
  shouldCloseOnEsc
  className="modal"
  overlayClassName="modal-fondo"
  closeTimeoutMS={200}
>
  <Box>
    <Grid container spacing={3} direction="column">
      {/* Fila 1: Primer Grid Container con dos columnas */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {/* Primera columna: Agregar Partida */}
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
                onChange={(e) => setNombre(e.target.value)}
                margin="normal"
              />
              <Box display="flex" justifyContent="center" marginBottom={2}>
                <IconButton color="primary" onClick={handleAddPartida}>
                  <AddCircleIcon fontSize="large" />
                </IconButton>
              </Box>
              <TableContainer
                component={Paper}
                style={{height:'260px', maxHeight: '260px', overflowY: 'auto' }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID Partida</TableCell>
                      <TableCell>Nombre de Partida</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {partidas.map((partida) => (
                      <TableRow
                        key={partida.idpartida}
                        selected={selectedRow === partida.idpartida}
                        onClick={() => handleRowSelect(partida)}
                        style={{ cursor: 'pointer' }}
                      >
                        <TableCell>{partida.idpartida}</TableCell>
                        <TableCell>{partida.nombre_par}</TableCell>
                        <TableCell>
                          {selectedRow === partida.idpartida && (
                            <IconButton onClick={handleEdit} color="secondary">
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

          {/* Segunda columna: Agregar Concepto */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" align="center">
              Agregar Concepto
            </Typography>
            <Grid container spacing={2}>
            <Grid container spacing={2} alignItems="center" style={{ marginTop: '16px' }}>
  {/* Typography ocupa menos espacio */}
  <Grid item xs={12} sm={3}>
    <Typography variant="body1" align="right">
      {`ID Partida: ${9}`}
    </Typography>
  </Grid>

  {/* TextField ocupa más espacio */}
  <Grid item xs={12} sm={9}>
    <TextField
      fullWidth
      size="small"
      name="nombre"
      value={formData.idPartida}
      onChange={handleInputChange}
      label="Nombre de Concepto"
    />
  </Grid>
</Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  name="unidad"
                  value={formData.unidad}
                  onChange={handleInputChange}
                  label="Unidad"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  name="pUnitario"
                  value={formData.pUnitario}
                  onChange={handleInputChange}
                  label="P. Unitario"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
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
                <AddIcon />
              </IconButton>
            </Box>
            <TableContainer
              component={Paper}
              style={{height:'250px', maxHeight: '250px', overflowY: 'auto' }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>ID Concepto</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Monto</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {conceptos.map((concepto, index) => (
                    <TableRow
                      key={concepto.idConcepto}
                      selected={index === selectedConcept}
                      onClick={() => handleRowClick(concepto, index)}
                    >
                      <TableCell>{concepto.idConcepto}</TableCell>
                      <TableCell>{concepto.nombreConc}</TableCell>
                      <TableCell>{concepto.monto}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>

      {/* Fila 2: Botón centrado */}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" marginTop={2}>
          <IconButton color="secondary" >
            <SaveAsIcon fontSize="large" />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  </Box>
</ReactModal>

  );
};
