import React, { useEffect } from "react";
import ReactModal from "react-modal";
import Swal from "sweetalert2";
import { Box, TextField, Select, MenuItem, Button, Grid, InputLabel, FormControl } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useAuthStore, useForm, useViewStore } from "../../../hooks";

const customStyles = {
  content: {
    width: "600px",
    maxHeight: "90vh",
    overflow: "auto",
    borderRadius: "10px",
    padding: "20px",
    position: "static",
  },
};

ReactModal.setAppElement("#root");

export const EditarUserModal = () => {
  const { usuarioEditable, startActulizarUsuario,errorMessage} = useAuthStore();
  const { nombre, username, correo, celular, rol, activo, onInputChange } = useForm(usuarioEditable);
  const { stateModalUser, selectModalUser } = useViewStore();

  const oncloseModal = () => {
    selectModalUser(false); // Cerramos el modal
  };
  const startActualizar = async () => {
    const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas editar este usuario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, editar",
        cancelButtonText: "No, cancelar",
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
                title: "¡Operación exitosa!",
                text: "El usuario se editó correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
            }).then(() => {
                oncloseModal(); // Cierra el modal después de la operación exitosa
            });
        } catch (error) {
            console.log(error); // Agrega un log aquí para ver el error que se lanza
            Swal.fire({
                title: "Error",
                text: error.message || "Hubo un problema al actualizar el usuario.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    } else {
        await Swal.fire({
            title: "Operación cancelada",
            text: "No se realizó ningún cambio.",
            icon: "info",
            confirmButtonText: "Aceptar",
        });
        return false;
    }
};

  
  return (
    <ReactModal
      isOpen={stateModalUser} // Controlamos si el modal está abierto
      onRequestClose={oncloseModal} // Cerramos el modal al hacer clic fuera
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <Box>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Edición De Usuario</h2>
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
              <Select label="Rol" name="rol" value={rol || ""} onChange={onInputChange}>
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
              <Select label="Estado" name="activo" value={activo} onChange={onInputChange}>
                <MenuItem value={1}>ACTIVO</MenuItem>
                <MenuItem value={0}>INACTIVO</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="space-between" marginTop="20px" paddingX="10px">
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={startActualizar}>
            Guardar
          </Button>
        </Box>
      </Box>
    </ReactModal>
  );
};
