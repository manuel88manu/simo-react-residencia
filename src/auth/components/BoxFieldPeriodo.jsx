import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useAuthStore, usePeriodoStore, useViewStore } from "../../../hooks";
import Swal from "sweetalert2";
import { AlertaRol, formatToFloat, formatValue } from "../../../helpers";

export const BoxFieldPeriodo = () => {
   const {startIgresarPeriodo,startObtenerPeriodos,periodo}= usePeriodoStore()
   const {user}=useAuthStore()
   const {selectViewSimo}=useViewStore()
   const [budgets, setBudgets] = useState({
    estatal: "",
    fortamun: "",
    faismun: "",
    directas: "",
    federal: "",
    proDim: false,
    indirectos: false,
  });
  

  // Manejar cambios en los campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgets({ ...budgets, [name]: value });
  };

  // Manejar cambios en los checkboxes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setBudgets({ ...budgets, [name]: checked });
  };

  // Acción al guardar
  const handleSave = async() => {

    const result = await Swal.fire({
        title: "¿Estás seguro? VERIFICALO",
        html: `
    <span style="font-size: 20px; font-weight: bold;">FAISMUN: $${formatValue(formatToFloat(budgets.faismun))}</span><br>
    <span style="font-size: 20px; font-weight: bold;">FORTAMUN: $${formatValue(formatToFloat(budgets.fortamun))}</span><br>
    <span style="font-size: 20px; font-weight: bold;">O.Directas: $${formatValue(formatToFloat(budgets.directas))}</span><br>
    <span style="font-size: 20px; font-weight: bold;">Estatal: $${formatValue(formatToFloat(budgets.estatal))}</span><br>
    <span style="font-size: 20px; font-weight: bold;">Federal: $${formatValue(formatToFloat(budgets.federal))}</span><br><br>
    Una vez ingresado los presupuestos para el presente periodo no se podrá modificar`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, ingresar presupuestos",
        cancelButtonText: "No, cancelar",
    });

    if (result.isConfirmed) {
      if(user.rol==='admin'){
        try {

            const presupuestos = [
                { tipo: 'estatal', prodim: 0, indirectos: 0, monto_inici: formatToFloat(budgets.estatal), monto_rest: 0 },
                { tipo: 'faismun', prodim: budgets.proDim, indirectos: budgets.indirectos, monto_inici:  formatToFloat(budgets.faismun), monto_rest: 0 },
                { tipo: 'fortamun', prodim: 0, indirectos: 0, monto_inici: formatToFloat(budgets.fortamun), monto_rest: 0 },
                { tipo: 'odirectas', prodim: 0, indirectos: 0, monto_inici: formatToFloat(budgets.directas), monto_rest: 0 },
                { tipo: 'federal', prodim: 0, indirectos: 0, monto_inici: formatToFloat(budgets.federal), monto_rest: 0 },
            ]; 
    
         await startIgresarPeriodo(presupuestos)
         selectViewSimo("inicio")

         Swal.fire({
            title: "¡Operación exitosa!",
            text: "El periodo con sus respectivos presupuesto fueron agregados correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
        })
    
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message || "Hubo un problema al agregar los presupuestos",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }

      }else{
        AlertaRol("Agregar Presupuestos Anuales",'Administrador')
      }
    }else {
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
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 4,
        backgroundColor: "#fff",
        width: 700, // Más ancho
        margin: "20px auto",
      }}
    >
      {/* Grid para los TextFields */}
      <Grid container spacing={3}>
        {/* Mapeo de campos para evitar repetición */}
        {[
          { label: "Estatal", name: "estatal" },
          { label: "O. Directas", name: "directas" },
          { label: "FORTAMUN", name: "fortamun" },
          { label: "Federal", name: "federal" },
          { label: "FAISMUN", name: "faismun" },
        ].map((field) => (
          <Grid item xs={6} key={field.name}>
            <Typography
              variant="h6"
              sx={{ color: "#DAA520", fontWeight: "bold", marginBottom: 1 }}
            >
              {field.label}
            </Typography>
            <TextField
              fullWidth
              name={field.name}
              value={budgets[field.name]}
              onChange={handleChange}
              variant="outlined"
              size="small"
              slotProps={{ style: { height: 30 } }} // Menos alto
            />
          </Grid>
        ))}
      </Grid>

      {/* Grid para los Checkboxes y el botón */}
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={budgets.proDim}
                onChange={handleCheckboxChange}
                name="proDim"
              />
            }
            label="PRODIM"
            sx={{ color: "#DAA520" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={budgets.indirectos}
                onChange={handleCheckboxChange}
                name="indirectos"
              />
            }
            label="INDIRECTOS"
            sx={{ color: "#DAA520" }}
          />
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="success" // Cambia el color predeterminado del botón a verde
            onClick={handleSave}
            sx={{
              padding: "12px 24px", // Ajusta el padding para un botón más grande
              fontSize: "16px",
              backgroundColor: "#4CAF50", // Un verde más definido
              "&:hover": {
                backgroundColor: "#45A049", // Color de fondo en hover
              },
            }}
          >
            <SaveIcon sx={{ fontSize: "36px", marginRight: "8px" }} />
            Guardar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
