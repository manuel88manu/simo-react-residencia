import React from "react";
import ReactModal from "react-modal";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  InputLabel,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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

  const {usuarioEditable}=useAuthStore()

  const { nombre, username, correo, celular, rol, activo, onInputChange } = useForm(usuarioEditable);
  
  
  const { stateModalUser, selectModalUser } = useViewStore();

  const oncloseModal = () => {
    console.log("Cerrando Modal");
    selectModalUser(false);
  };

  return (
    <ReactModal
      isOpen={stateModalUser}
      onRequestClose={oncloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <Box>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Edición De Usuario
        </h2>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nombre de Usuario"
              defaultValue="manue123"
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
              defaultValue="manue@example.com"
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
              defaultValue="Manuel Flores Rios"
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
              defaultValue="311 338 7917"
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
              defaultValue="ACTIVO"
               label="Estado"
               name="activo"
              value={activo}
              onChange={onInputChange}
              >
                <MenuItem value={1}>ACTIVO</MenuItem>
                <MenuItem value={0}>INACTIVO</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box
          display="flex"
          justifyContent="space-between"
          marginTop="20px"
          paddingX="10px"
        >
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => console.log("Eliminar usuario")}
          >
            Eliminar
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={() => console.log("Guardar usuario")}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </ReactModal>
  );
};
