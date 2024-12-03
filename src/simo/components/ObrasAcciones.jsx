import React, { useEffect, useState } from "react"; 
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useViewStore } from "../../../hooks";

export const ObrasAcciones = () => {

  const { estadoPresupuesto } = useViewStore();

  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaTermino, setFechaTermino] = useState(null);

  const [rubros, setRubros] = useState(""); // Estado para los select
  const [programa, setPrograma] = useState(""); // Estado para los select
  const [subprograma, setSubprograma] = useState(""); // Estado para los select
  const [ejecucion, setEjecucion] = useState(""); // Estado para los select
  const [unidadCapacidad, setUnidadCapacidad] = useState(""); // Estado para los select
  const [unidadBeneficio, setUnidadBeneficio] = useState(""); // Estado para los select

  const validarFechas = () => {
    if (!fechaInicio || !fechaTermino) return false;
    return fechaTermino >= fechaInicio;
  };

  // Métodos independientes para cada acción
  const agregarObra = () => {
    console.log("Agregar Obra");
    // Lógica para agregar obra
  };

  const agregarPresupuesto = () => {
    console.log("Agregar Presupuesto");
    // Lógica para agregar presupuesto
  };

  const agregarExpediente = () => {
    console.log("Agregar Expediente");
    // Lógica para agregar expediente
  };

  const generarDictamen = () => {
    console.log("Generar Dictamen");
    // Lógica para generar dictamen
  };

  const finalizarProceso = () => {
    console.log("Finalizar Proceso");
    // Lógica para finalizar el proceso
  };

  useEffect(() => {
    

    
  }, [estadoPresupuesto]);
  return (
    <Box sx={{ padding: 2, backgroundColor: "#f7f7f7" }}>
      <Grid container spacing={2}>
        {/* Columna 1 */}
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Nombre De La Obra"
            variant="outlined"
            size="small"
            sx={{ backgroundColor: "#fff" }}
          />
          <FormControl fullWidth margin="normal" size="small" sx={{ backgroundColor: "#fff" }}>
            <InputLabel>Rubros</InputLabel>
            <Select
              value={rubros} // Se agrega el estado value
              onChange={(e) => setRubros(e.target.value)} // Se maneja el cambio del select
              size="small"
            >
              <MenuItem value="opcion1">Opción 1</MenuItem>
              <MenuItem value="opcion2">Opción 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" size="small" sx={{ backgroundColor: "#fff" }}>
            <InputLabel>Programa</InputLabel>
            <Select
              value={programa} // Se agrega el estado value
              onChange={(e) => setPrograma(e.target.value)} // Se maneja el cambio del select
              size="small"
            >
              <MenuItem value="opcion1">Opción 1</MenuItem>
              <MenuItem value="opcion2">Opción 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" size="small" sx={{ backgroundColor: "#fff" }}>
            <InputLabel>Subprograma</InputLabel>
            <Select
              value={subprograma} // Se agrega el estado value
              onChange={(e) => setSubprograma(e.target.value)} // Se maneja el cambio del select
              size="small"
            >
              <MenuItem value="opcion1">Opción 1</MenuItem>
              <MenuItem value="opcion2">Opción 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" size="small" sx={{ backgroundColor: "#fff" }}>
            <InputLabel>Ejecución</InputLabel>
            <Select
              value={ejecucion} // Se agrega el estado value
              onChange={(e) => setEjecucion(e.target.value)} // Se maneja el cambio del select
              size="small"
            >
              <MenuItem value="opcion1">Opción 1</MenuItem>
              <MenuItem value="opcion2">Opción 2</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Localidad/Colonia"
            variant="outlined"
            margin="normal"
            size="small"
            sx={{ backgroundColor: "#fff" }}
          />
          <TextField
            fullWidth
            label="Empleo Eventual"
            variant="outlined"
            margin="normal"
            size="small"
            sx={{ backgroundColor: "#fff" }}
          />
        </Grid>

        {/* Columna 2 */}
        <Grid item xs={3}>
          <Typography variant="body2">Capacidad</Typography>
          <FormControl fullWidth margin="normal" size="small" sx={{ backgroundColor: "#fff" }}>
            <InputLabel>Unidad</InputLabel>
            <Select
              value={unidadCapacidad} // Se agrega el estado value
              onChange={(e) => setUnidadCapacidad(e.target.value)} // Se maneja el cambio del select
              size="small"
            >
              <MenuItem value="opcion1">Opción 1</MenuItem>
              <MenuItem value="opcion2">Opción 2</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Cantidad"
            variant="outlined"
            margin="normal"
            size="small"
            sx={{ backgroundColor: "#fff" }}
          />
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Beneficio
          </Typography>
          <FormControl fullWidth margin="normal" size="small" sx={{ backgroundColor: "#fff" }}>
            <InputLabel>Unidad</InputLabel>
            <Select
              value={unidadBeneficio} // Se agrega el estado value
              onChange={(e) => setUnidadBeneficio(e.target.value)} // Se maneja el cambio del select
              size="small"
            >
              <MenuItem value="opcion1">Opción 1</MenuItem>
              <MenuItem value="opcion2">Opción 2</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Cantidad"
            variant="outlined"
            margin="normal"
            size="small"
            sx={{ backgroundColor: "#fff" }}
          />
        </Grid>

        {/* Columna 3 */}
        <Grid item xs={3}>
          <Typography variant="body2">Fecha de Obra</Typography>
        <DatePicker
                label="Inicio"
                value={fechaInicio}
                onChange={(newValue) => setFechaInicio(newValue)}
                textField={(params) => (
                    <TextField 
                    fullWidth 
                    {...params} 
                    size="small" 
                    sx={{ backgroundColor: "#fff" }} 
                    />
                )}
                />
                <DatePicker
                sx={{ mt: 2, mb: 4.4 }}
                label="Término"
                value={fechaTermino}
                onChange={(newValue) => setFechaTermino(newValue)}
                textField={(params) => (
                    <TextField
                    fullWidth
                    {...params}
                    error={fechaInicio && fechaTermino && !validarFechas()}
                    helperText={
                        fechaInicio && fechaTermino && !validarFechas()
                        ? "La fecha de término no puede ser menor que la de inicio"
                        : ""
                    }
                    size="small"
                    sx={{ backgroundColor: "#fff" }}
                    />
                )}
                />

          <TextField
            fullWidth
            label="Presupuesto"
            variant="outlined"
            margin="normal"
            value="$0.00"
            disabled
            size="small"
            sx={{ backgroundColor: "#fff" }}
          />
        </Grid>

        {/* Columna 4 */}
        <Grid item xs={3}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              padding: 3,
              backgroundColor: "#fff",
              minHeight: "350px"
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <IconButton
                sx={{
                  flex: 1,
                  justifyContent: "space-between",
                  padding: 1,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 1,
                  minWidth: "150px"
                }}
                onClick={agregarObra}  // Acción independiente
              >
                <Typography sx={{ flex: 1, fontSize: "1rem" }}>Agregar Obra</Typography>
                <CheckCircleIcon fontSize="large" color="success" />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <IconButton
                sx={{
                  flex: 1,
                  justifyContent: "space-between",
                  padding: 1,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 1,
                  minWidth: "150px"
                }}
                onClick={agregarPresupuesto}  // Acción independiente
              >
                <Typography sx={{ flex: 1, fontSize: "1rem" }}>Agregar Presupuesto</Typography>
                <CheckCircleIcon fontSize="large" color="success" />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <IconButton
                sx={{
                  flex: 1,
                  justifyContent: "space-between",
                  padding: 1,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 1,
                  minWidth: "150px"
                }}
                onClick={agregarExpediente}  // Acción independiente
              >
                <Typography sx={{ flex: 1, fontSize: "1rem" }}>Agregar Expediente</Typography>
                <CheckCircleIcon fontSize="large" color="success" />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <IconButton
                sx={{
                  flex: 1,
                  justifyContent: "space-between",
                  padding: 1,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 1,
                  minWidth: "150px"
                }}
                onClick={generarDictamen}  // Acción independiente
              >
                <Typography sx={{ flex: 1, fontSize: "1rem" }}>Generar Dictamen</Typography>
                <CheckCircleIcon fontSize="large" color="success" />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <IconButton
                sx={{
                  flex: 1,
                  justifyContent: "space-between",
                  padding: 1,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 1,
                  minWidth: "150px"
                }}
                onClick={finalizarProceso}  // Acción independiente
              >
                <Typography sx={{ flex: 1, fontSize: "1rem" }}>Finalizar Proceso</Typography>
                <CancelIcon fontSize="large" color="error" />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
