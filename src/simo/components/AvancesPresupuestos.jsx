import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { usePeriodoStore, useViewStore } from "../../../hooks";

export const AvancesPresupuestos = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const { estadoPresupuesto } = useViewStore();
  const {
    presuEstatal,
    presuFaismun,
    presuFortamun,
    presuOdirectas,
    presuFederal,
  } = usePeriodoStore();

  const rows = [
    {
      nombre: "Instalación de sistemas de captación de agua de lluvia en la Comunidad",
      monto: 400000,
      meta: "Cantidad: 50 hogares beneficiados. Unidad: Hogares(ml)",
    },
    {
      nombre: "Elaboración de planes estratégicos de desarrollo para el Municipio",
      monto: 45000,
      meta: "Cantidad: 1 plan estratégico elaborado. Unidad: Plan",
    },
    {
      nombre: "Actualización del sistema de gestión municipal para la mejora en la recaudación de impuestos",
      monto: 20000,
      meta: "Cantidad: 1 sistema implementado. Unidad: Sistema",
    },
    {
      nombre: "Rehabilitación de caminos rurales en comunidades indígenas",
      monto: 150000,
      meta: "Cantidad: 20 km de caminos rehabilitados. Unidad: km",
    },
    {
      nombre: "Ampliación de la red eléctrica en zonas marginadas",
      monto: 250000,
      meta: "Cantidad: 200 hogares conectados. Unidad: Hogares",
    },
  ];

  const handleRowClick = (row, index) => {
    setSelectedRow(index);
    console.log(row);
  };

  const [presupuestoActivo, setPresupuestoActivo] = useState({});

  useEffect(() => {
    const presupuestoMapping = {
      estatal: presuEstatal,
      faismun: presuFaismun,
      fortamun: presuFortamun,
      odirectas: presuOdirectas,
      federal: presuFederal,
    };
    setPresupuestoActivo(presupuestoMapping[estadoPresupuesto] || {});
  }, [estadoPresupuesto]);

  return (
    <Grid container direction="column" spacing={3} style={{ padding: "16px" }}>
      {/* Header */}
      <Grid item>
        <Typography variant="h4" align="center" color="primary" fontWeight="bold">
          Monto Autorizado Total:{" "}
          <span style={{ fontWeight: "normal" }}>
            {presupuestoActivo.monto_inici
              ? `$${presupuestoActivo.monto_inici
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
              : "$0.00"}
          </span>
        </Typography>
      </Grid>

      {/* Contenido */}
      <Grid item>
        <Grid container spacing={4}>
          {/* Columna izquierda */}
          <Grid item xs={4}>
            <Box
              sx={{
                p: 3,
                backgroundColor: "#f0f8ff",
                borderRadius: "10px",
                boxShadow: 2,
              }}
            >
              <Typography variant="h6" color="secondary" gutterBottom>
                <strong>Detalles Presupuestales:</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Zona de Atención Prioritaria:</strong> $470,760.15
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Monto para indirectos:</strong> $47,076.02
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Monto para PRODIM:</strong> $31,384.01
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Incidencia Directa:</strong> $31,384.01
              </Typography>
              <Typography variant="body1" gutterBottom color="error">
                <strong>Por Aprobar Total:</strong> $1,104,200.50
              </Typography>
              <Typography variant="body1" gutterBottom color="error">
                <strong>Por Aprobar I.Directas:</strong> $1,104,200.50
              </Typography>
            </Box>
          </Grid>

          {/* Columna derecha */}
          <Grid item xs={8}>
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: 3,
                maxHeight: "365px", // Limita la altura de la tabla para permitir el scroll
                overflowY: "auto", // Habilita el scroll vertical
              }}
            >
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
                    <TableCell>Nombre De Obra</TableCell>
                    <TableCell>Monto Ejercido</TableCell>
                    <TableCell>Metas</TableCell>
                    {selectedRow !== null && <TableCell>Acciones</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleRowClick(row, index)}
                      selected={selectedRow === index}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: selectedRow === index ? "#e3f2fd" : "white",
                        "&:hover": {
                          backgroundColor: "#f1f1f1",
                        },
                      }}
                    >
                      <TableCell>{row.nombre}</TableCell>
                      <TableCell>{`$${row.monto.toLocaleString()}`}</TableCell>
                      <TableCell>{row.meta}</TableCell>
                      {selectedRow === index && (
                        <TableCell>
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
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
    </Grid>
  );
};
