



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
import { useObraStore } from "../../../hooks/useObraStore";

export const AvancesPresupuestos = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const { estadoPresupuesto } = useViewStore();
  const {
    presuEstatal,
    presuFaismun,
    presuFortamun,
    presuOdirectas,
    presuFederal,
    faltante,
    startObtenerFaltante
  } = usePeriodoStore();

  const {obras}=useObraStore()
 
  // Estado para manejar `faltante`

  const handleRowClick = (row) => {
    setSelectedRow(row);
    console.log(row);
  };


  const renderContent=()=>{
    switch (presupuestoActivo.tipo) {
      case 'faismun':
        return(
          <>
            <Typography variant="body1" gutterBottom>
            {
             !faltante || faltante.monto_restante === undefined ? (
            <span>No hay monto restante disponible</span>
             ) : (
            <>
              <strong style={{ fontSize: '25px', fontWeight: 'bold',color: '#d2010d' }}>
               Presupuesto Restante Total: 
              </strong>
              <br />
              <strong style={{ fontSize: '20px', fontWeight: 'bold',color: '#e24b53' }}>
              {` $${faltante.monto_restante.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
              </strong>
              <br />
               <strong style={{ fontSize: '17px', fontWeight: 'bold' }}>
               Zona de Atención Prioritaria e Incidencia Directa
              </strong>
              <br />
              <strong style={{ fontSize: '15px', fontWeight: 'bold',color: '#089004' }}>
               40% Presupuesto Asignado Minimo: 
              </strong>
              <strong style={{ fontSize: '16px', fontWeight: 'bold' }}>
               {` $${faltante.monto_zap_indirecto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
              </strong>
              <br />
              <strong style={{ fontSize: '15px', fontWeight: 'bold',color: '#d2010d' }}>
               Presupuesto Restante: 
              </strong>
              <strong style={{ fontSize: '16px', fontWeight: 'bold' }}>
              {faltante.monto_zap_indirecto_falt <= 0
                ? " $0"
                : ` $${faltante.monto_zap_indirecto_falt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
               </strong>
              <br/>
              {faltante?.monto_prodim && (
                  <>
                    <strong style={{ fontSize: '17px', fontWeight: 'bold' }}>
                      PRODIM
                    </strong>
                    <br />
                    <strong style={{ fontSize: '15px', fontWeight: 'bold', color: '#089004' }}>
                      2% Presupuesto Asignado Máximo:
                    </strong>
                    <strong style={{ fontSize: '16px', fontWeight: 'bold' }}>
                      {` $${faltante.monto_prodim.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
                    </strong>
                    <br />
                    <strong style={{ fontSize: '15px', fontWeight: 'bold', color: '#d2010d' }}>
                      Presupuesto Restante:
                    </strong>
                    <strong style={{ fontSize: '16px', fontWeight: 'bold' }}>
                      {` $${faltante.monto_prodim_falt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
                    </strong>
                    <br />
                  </>
                )}

              {faltante?.monto_indirectos && (
                <>
                  <strong style={{ fontSize: '17px', fontWeight: 'bold' }}>
                    FAISMUN
                  </strong>
                  <br />
                  <strong style={{ fontSize: '15px', fontWeight: 'bold', color: '#089004' }}>
                    3% Presupuesto Asignado Máximo:
                  </strong>
                  <strong style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {` $${faltante.monto_indirectos.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
                  </strong>
                  <br />
                  <strong style={{ fontSize: '15px', fontWeight: 'bold', color: '#d2010d' }}>
                    Presupuesto Restante:
                  </strong>
                  <strong style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {` $${faltante.monto_indirectos_falt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
                  </strong>
                </>
              )}
            </>  
            )
}
          </Typography>
          </>
        );
        case 'fortamun':
        return(
          <>
            <Typography variant="body1" gutterBottom>
            {
               !faltante || faltante.monto_restante === undefined ? (
                <span>No hay monto restante disponible</span>
                 ) : (
                  <>
                      <strong style={{ fontSize: '25px', fontWeight: 'bold',color: '#d2010d' }}>
                      Presupuesto Restante Total: 
                      </strong>
                      <br />
                      <strong style={{ fontSize: '20px', fontWeight: 'bold',color: '#e24b53' }}>
                      {` $${faltante.monto_restante.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
                      </strong>
                      <br />
                      <br />
                      <strong style={{ fontSize: '25px', fontWeight: 'bold' }}>
                      Seguridad Publica
                      </strong>
                      <br />
                      <strong style={{ fontSize: '17px', fontWeight: 'bold',color: '#089004' }}>
                      20% Presupuesto Asignado Minimo: 
                      </strong>
                      <br />
                      <strong style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      {` $${faltante.monto_seguridad.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
                      </strong>
                      <br />
                      <strong style={{ fontSize: '17px', fontWeight: 'bold',color: '#d2010d' }}>
                      Presupuesto Restante: 
                      </strong>
                      <br />
                      <strong style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      {faltante.monto_seguridad_falt <= 0
                        ? " $0"
                        : ` $${faltante.monto_seguridad_falt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
                      </strong>
                  </>
                 )
            }
          </Typography>
          </>
        );
        case 'estatal':
        case 'federal':
        case 'odirectas':
        return(
          <>
            <Typography variant="body1" gutterBottom>
            {
                !faltante || faltante.monto_restante === undefined ? (
                  <span>No hay monto restante disponible</span>
                   ) : (
                    <>
                      <strong style={{ fontSize: '25px', fontWeight: 'bold',color: '#d2010d' }}>
                      Presupuesto Restante Total: 
                      </strong>
                    <br />
                    <strong style={{ fontSize: '20px', fontWeight: 'bold',color: '#e24b53' }}>
                    {` $${faltante.monto_restante.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
                    </strong>
                    <br />
                    </>
                   )
            }
          </Typography>
          </>
        );
        default:
          return (
            <Typography variant="body1" gutterBottom>
              <strong>No hay información disponible para este tipo.</strong>
            </Typography>
          );
    }
  }


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
    startObtenerFaltante(presupuestoMapping[estadoPresupuesto].idPresupuesto)
  }, [estadoPresupuesto]);

    //-----------------Interface dinamica--------------------------
    

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
  <Grid container spacing={4} direction="row">
    {/* Columna izquierda */}
    <Grid item xs={12} sm={6} md={4}>
      <Box
        sx={{
          p: 3,
          backgroundColor: "#f0f8ff",
          borderRadius: "10px",
          width: "450px", 
          boxShadow: 2,
        }}
      >
        {renderContent()}
      </Box>
    </Grid>

    {/* Columna derecha */}
    <Grid item xs={12} sm={6} md={8}>
    <TableContainer component={Paper} style={{ height: '368px', overflowY: 'auto', width: "880px" }}>
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
             <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {obras.map((obra) => (
              <TableRow
                key={obra.idobra}
                onClick={() => handleRowClick(obra)}
                selected={selectedRow?.idobra===obra.idobra}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{obra.nombre}</TableCell>
                <TableCell>{`$${obra.monto.toLocaleString()}`}</TableCell>
                <TableCell>{obra.meta}</TableCell>
                {selectedRow?.idobra===obra.idobra && (
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
