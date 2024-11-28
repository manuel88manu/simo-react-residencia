import React, { useEffect, useCallback, useMemo } from 'react';
import ReactModal from 'react-modal';
import Swal from 'sweetalert2';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  InputLabel,
  FormControl,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useAuthStore, useForm, useViewStore } from '../../../hooks';

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

const MemoizedModal = React.memo(() => {
  const { usuarioEditable, startActulizarUsuario } = useAuthStore();
  const { nombre, username, correo, celular, rol, activo, onInputChange } = useForm(usuarioEditable);
  const { stateModalUser, selectModalUser } = useViewStore();

  const oncloseModal = useCallback(() => {
    selectModalUser(false);

    // Devuelve el foco al botón que abrió el modal
    setTimeout(() => {
      const openButton = document.querySelector('[data-testid="open-modal-button"]');
      if (openButton) {
        openButton.focus();
      }
    }, 200);
  }, [selectModalUser]);

  const startActualizar = useCallback(async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas editar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'No, cancelar',
    });

    if (result.isConfirmed) {
      try {
        await startActulizarUsuario({
          nombre,
          correo,
          username,
          activo,
          celular,
          rol,
          idusuario: usuarioEditable.idusuario,
        });

        Swal.fire({
          title: '¡Operación exitosa!',
          text: 'El usuario se editó correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          oncloseModal();
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message || 'Hubo un problema al actualizar el usuario.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  }, [usuarioEditable, startActulizarUsuario, nombre, correo, username, celular, rol, activo, oncloseModal]);

  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (stateModalUser) {
      rootElement.setAttribute('inert', 'true');
    } else {
      rootElement.removeAttribute('inert');
    }
  }, [stateModalUser]);

  return (
    <ReactModal
      isOpen={stateModalUser}
      onRequestClose={oncloseModal}
      style={customStyles}
      shouldFocusAfterRender={true}
      shouldCloseOnEsc={true}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}  // Manteniendo el tiempo de cierre rápido
    >
      <Box>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edición De Usuario</h2>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nombre de Usuario"
              variant="outlined"
              name="username"
              value={username}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              variant="outlined"
              name="correo"
              value={correo}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nombre Completo"
              variant="outlined"
              name="nombre"
              value={nombre}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Rol</InputLabel>
              <Select
                label="Rol"
                name="rol"
                value={rol || ''}
                onChange={onInputChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      transition: 'none', // Deshabilita la animación
                    },
                  },
                }}
              >
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="editor">Usuario</MenuItem>
                <MenuItem value="viewer">Invitado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Número Celular"
              variant="outlined"
              name="celular"
              value={celular}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                label="Estado"
                name="activo"
                value={activo}
                onChange={onInputChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      transition: 'none', // Deshabilita la animación
                    },
                  },
                }}
              >
                <MenuItem value={1}>ACTIVO</MenuItem>
                <MenuItem value={0}>INACTIVO</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" marginTop="20px" paddingX="10px">
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={startActualizar}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </ReactModal>
  );
});

export const EditarUserModal = () => {
  return <MemoizedModal />;
};
