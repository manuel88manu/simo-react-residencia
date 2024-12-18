import ReactModal from 'react-modal';
import Swal from 'sweetalert2';
import PropTypes from "prop-types";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';
import { useObraStore } from '../../../hooks/useObraStore';
import dayjs from 'dayjs';

const customStyles = {
  content: {
    width: '30vw',
    height: '70vh',
    maxWidth: '70vw',
    maxHeight: '84vh',
    borderRadius: '10px',
    padding: '20px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -42.5%)',
  },
};

ReactModal.setAppElement('#root');

export const AgregarNumAprobaModal = ({ idobra=0,idPresupuesto=0,num_obra=''}) => {
  const { modalAprobacion, startAprobaModalValue,startActualizarNumApro } = useObraStore();
  const [codigo, setcodigo] = useState('');
  const [Fecha, setFecha] = useState(dayjs(new Date()));

  const handleChangeCodigo = (event) => {
    setcodigo(event.target.value);
  };

  const handleChangeFecha = (newfecha) => {
    setFecha(newfecha);
  };

  const agregarApro=async()=>{

    const result = await Swal.fire({
        title: "¿Estás seguro?",
        text:  `Deseas Agregar Este Oficio de Aprobacion para el Numero De Obra " ${num_obra} "`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, Agregar Oficio",
        cancelButtonText: "No, cancelar",
    });
    if (result.isConfirmed) {
    try {
        const num_aproba={
            codigo:codigo,
            fecha:Fecha.format('YYYY-MM-DD')
        }
        await startActualizarNumApro(idobra,num_aproba,idPresupuesto)
        setFecha(dayjs(new Date()))
        setcodigo('')
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: error.message || "Hubo un problema al agregar los presupuestos",
            icon: "error",
            confirmButtonText: "Aceptar",
        });
    }
}else {
    setFecha(dayjs(new Date()))
    setcodigo('')
  }
  }

  const oncloseModal = () => {
    setFecha(dayjs(new Date()))
    setcodigo('')
    startAprobaModalValue(false);
    setTimeout(() => {
      const openButton = document.querySelector('[data-testid="open-modal-button"]');
      if (openButton) {
        openButton.focus();
      }
    }, 200);
  };

  return (
    <ReactModal
      isOpen={modalAprobacion}
      onRequestClose={oncloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Editar Oficio De Aprobacion
          </Typography>
          <TextField
            label="Numero de Aprobacion"
            variant="outlined"
            name="num_aproba"
            size="small"
            value={codigo}
            onChange={handleChangeCodigo}
            sx={{
              backgroundColor: "#fff",
              width: "300px", // Ajusta el tamaño según tus necesidades
              marginTop: '10px',
            }}
          />
          <Box>
            <DatePicker
              label="Fecha De Aprobacion"
              sx={{ mt: 2, width: "300px" }}
              name="fec_inicio"
              value={Fecha}
              onChange={handleChangeFecha}
              textField={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  size="small"
                  sx={{ backgroundColor: "#fff" }}
                />
              )}
            />
          </Box>
          <Box>
            <IconButton onClick={agregarApro} sx={{ marginLeft: '120px' }}>
              <CheckBoxIcon
                sx={{
                  fontSize: 45,  // Cambiar el tamaño del ícono
                  color: 'green', // Cambiar color a verde
                }}
              />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </ReactModal>
  );
};

AgregarNumAprobaModal.propTypes = {
  idobra: PropTypes.number.isRequired,
  idPresupuesto:PropTypes.number.isRequired,
  num_obra:PropTypes.string.isRequired
};
