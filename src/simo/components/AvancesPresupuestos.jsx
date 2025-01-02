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
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useAuthStore, usePeriodoStore, useViewStore } from "../../../hooks";
import { useObraStore } from "../../../hooks/useObraStore";
import { AgregarNumAprobaModal } from "./AgregarNumAprobaModal";
import { AlertaRol, evaluarFechaProdim } from "../../../helpers";
import { TablaExpeModal } from "./TablaExpeModal";
import { useExpediStore } from "../../../hooks/useExpediStore";

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

  const {obras,startObtenerObrasPresu,startAprobaModalValue,startObtenerInfo,startResetBox}=useObraStore()

  const {startTablaExpModalValue}=useExpediStore()

  const {user}=useAuthStore()  

  const [presupuestoActivo, setPresupuestoActivo] = useState({});

  const [idobra, setidobra] = useState(0)
  const [numObra, setNumObra] = useState("");

  // Función para manejar el cambio en el TextField
  const handleChange = (event) => {
    setNumObra(event.target.value); // Actualiza el estado con el valor del input
    startObtenerObrasPresu(presupuestoActivo.idPresupuesto,(event.target.value).trim())
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    startObtenerInfo(row.idobra)
    startResetBox()
    
  };

  const handleEditObra=(obra)=>{
    if(user.rol==='viewer'){
      AlertaRol("Editar Num. de Aprobacion y Obra",'Administrador')
      return;
     }
    setidobra(obra.idobra)
    startAprobaModalValue(true)
  }

  const mostrarTabla=()=>{
  startTablaExpModalValue(true)

  }

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
               <strong style={{ fontSize: '18px', fontWeight: 'bold' }}>
               Zona de Atención Prioritaria e Incidencia Directa
              </strong>
              <br />
              <strong style={{ fontSize: '16px', fontWeight: 'bold',color: '#089004' }}>
               40% Presupuesto Asignado Minimo: 
              </strong>
              <strong style={{ fontSize: '17px', fontWeight: 'bold' }}>
               {` $${faltante.monto_zap_indirecto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
              </strong>
              <br />
              <strong style={{ fontSize: '16px', fontWeight: 'bold',color: '#d2010d' }}>
               Presupuesto Restante: 
              </strong>
              <strong style={{ fontSize: '17px', fontWeight: 'bold' }}>
              {faltante.monto_zap_indirecto_falt <= 0
                ? " $0"
                : ` $${faltante.monto_zap_indirecto_falt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
               </strong>
              <br/>
              {faltante?.monto_prodim && (
                  <>
                    <strong style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      PRODIM
                    </strong>
                    <br />
                    <strong style={{ fontSize: '16px', fontWeight: 'bold', color: '#089004' }}>
                      2% Presupuesto Asignado Máximo:
                    </strong>
                    <strong style={{ fontSize: '17px', fontWeight: 'bold' }}>
                      {` $${faltante.monto_prodim.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
                    </strong>
                    <br />
                    <strong style={{ fontSize: '16px', fontWeight: 'bold', color: '#d2010d' }}>
                      Presupuesto Restante:
                    </strong>
                    <strong style={{ fontSize: '17px', fontWeight: 'bold' }}>
                      { evaluarFechaProdim()?
                      ` $${faltante.monto_prodim_falt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
                      :'$0'
                      }
                    </strong>
                    <br />
                  </>
                )}

              {faltante?.monto_indirectos && (
                <>
                  <strong style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    INDIRECTOS
                  </strong>
                  <br />
                  <strong style={{ fontSize: '16px', fontWeight: 'bold', color: '#089004' }}>
                    3% Presupuesto Asignado Máximo:
                  </strong>
                  <strong style={{ fontSize: '17px', fontWeight: 'bold' }}>
                    {` $${faltante.monto_indirectos.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
                  </strong>
                  <br />
                  <strong style={{ fontSize: '16px', fontWeight: 'bold', color: '#d2010d' }}>
                    Presupuesto Restante:
                  </strong>
                  <strong style={{ fontSize: '17px', fontWeight: 'bold' }}>
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
    startObtenerObrasPresu(presupuestoMapping[estadoPresupuesto].idPresupuesto,numObra)
    setNumObra('')
    setSelectedRow(null)

  }, [estadoPresupuesto]);

    //-----------------Interface dinamica--------------------------
    

  return (
    <Grid container direction="column" spacing={3} style={{marginTop: "1px" }}>
      {/* Header */}
      <Grid item xs={12}>
    {/* Contenedor de tipo flex */}
    
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <TextField
      label="Buscar No. De Obra"
      variant="outlined"
      name="num_obra_buscar"
      size="small"
      sx={{
        backgroundColor: "#fff",
        width: "190px", // Ajusta el tamaño según tus necesidades
      }}
      value={numObra} // El valor del TextField será el estado numObra
      onChange={handleChange} // Al escribir en el TextField, actualizamos el estado
    />
      {/* Título centrado */}
      <div style={{ flex: 1, textAlign: "center",marginRight:"145px" }}>
        <Typography variant="h4" color="primary" fontWeight="bold">
          Monto Autorizado Total:{" "}
          <span style={{ fontWeight: "normal" }}>
            {presupuestoActivo.monto_inici
              ? `$${presupuestoActivo.monto_inici
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
              : "$0.00"}
          </span>
        </Typography>
      </div>
    </div>
  </Grid>

      {/* Contenido */}
      <Grid item>
  <Grid container spacing={4} direction="row">
    {/* Columna izquierda */}
    <Grid item xs={12} sm={6} md={4}>
      <Box
        sx={{
          p: 3,
          backgroundColor: "white",
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
              <TableCell sx={{ width: '120px', fontWeight: 'bold' }}>Num. de Obra</TableCell>
              <TableCell>Nombre De Obra</TableCell>
              <TableCell>Monto Ejercido</TableCell>
              <TableCell>Metas</TableCell>
              <TableCell sx={{ width: '160px', fontWeight: 'bold' }}>Num. de Aprobacion</TableCell>
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
                <TableCell>{obra.num_obra}</TableCell>
                <TableCell>{obra.nombre}</TableCell>
                <TableCell>{`$${obra.presupuesto.toLocaleString()}`}</TableCell>
                <TableCell> {obra.metas.split("<br>").map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}</TableCell>
                <TableCell>{obra.num_aproba.split("\n").map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}</TableCell>
                {selectedRow?.idobra===obra.idobra && (
                  <TableCell>
                    <IconButton onClick={() => handleEditObra(obra)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={mostrarTabla} color="secondary">
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
<AgregarNumAprobaModal 
    idobra={idobra} 
    idPresupuesto={presupuestoActivo?.idPresupuesto || 0} 
    num_obra={selectedRow?.num_obra || 'ValorPredeterminado'} 
/>
<TablaExpeModal/>
    </Grid>
  );
};
