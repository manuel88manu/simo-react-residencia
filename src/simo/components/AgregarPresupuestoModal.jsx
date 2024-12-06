import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Swal from 'sweetalert2';
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
    width: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
    borderRadius: '10px',
    padding: '20px',
    position: 'static',
  },
};

ReactModal.setAppElement('#root');

export const AgregarPresupuestoModal = () => {
  const { usuarioEditable, startActulizarUsuario } = useAuthStore();
  const { startModalPresuValue, modalPresupuesto, partidas, startObtenerPartidas, obra,startAgregarPartidas } = useObraStore();

  const [nombre, setNombre] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);

  const handleAddPartida = () => {
    const idobra=obra.idobra
    startAgregarPartidas(idobra,nombre)
    
  };

  const handleRowSelect = (row) => {
    console.log("Fila seleccionada:", row);
    setSelectedRow(row.idpartida === selectedRow ? null : row.idpartida);
  };

  const handleEdit = () => {
    if (selectedRow) {
      console.log('Editando partida:', partidas.find((p) => p.idpartida === selectedRow));
    }
  };
  
  
  const oncloseModal = () => {
    startModalPresuValue(false);

    // Devuelve el foco al botón que abrió el modal
    setTimeout(() => {
      const openButton = document.querySelector('[data-testid="open-modal-button"]');
      if (openButton) {
        openButton.focus();
      }
    }, 200);
  };

  useEffect(() => {
    
    startObtenerPartidas(obra.idobra)
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
      shouldFocusAfterRender={true}
      shouldCloseOnEsc={true}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <Box>
        <Grid container spacing={2}>
          {/* Primera fila */}
          <Grid item xs={12}>
            <Box>
              <Typography variant="h6" align="center">Agregar Partida</Typography>
              <TextField
                fullWidth
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                margin="normal"
              />
              <Box display="flex" justifyContent="center" marginBottom={2}>
                <IconButton color="primary" onClick={handleAddPartida}>
                  <AddCircleIcon fontSize="large"/>
                </IconButton>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID Partida</TableCell>
                      <TableCell>Nombre de Partida</TableCell>
                      <TableCell>Monto Total</TableCell>
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
                        <TableCell>{partida.monto_tot}</TableCell>
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
          {/* Segunda fila */}
          <Grid item xs={12}>
            
          </Grid>
          
        </Grid>
      </Box>
    </ReactModal>
  );
};


