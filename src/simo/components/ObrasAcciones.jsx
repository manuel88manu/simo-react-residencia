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
    Autocomplete,
    } from "@mui/material";
    import { DatePicker } from "@mui/x-date-pickers";
    import CheckCircleIcon from "@mui/icons-material/CheckCircle";
    import CancelIcon from "@mui/icons-material/Cancel";
    import { useForm, usePeriodoStore, useViewStore } from "../../../hooks";
    import { convertirFechasADate, opciones, opcionesPrograma, opcionesSubprograma } from "../../../helpers";
import { useObraStore } from "../../../hooks/useObraStore";


    export const ObrasAcciones = () => {
    
    const {obra:obrainicio,obras,dictamen:dictameInicial}=useObraStore();    

    const{nombre,bene_unidad,subprograma,programa,rubros,empleo_event,presupuesto,bene_cantidad,cap_unidad,cap_cantidad,ejecucion,loca_col,onInputChange:onObraChange,formState:obra,onResetForm}=useForm(obrainicio)
    const {fec_inicio,fec_termino,onInputChange:onChangeDictamen,formState}=useForm(dictameInicial)
    



   
    const [rubrosInputValue, setRubrosInputValue] = useState(''); // Para el Autocomplete de rubros
    const [programaInputValue, setProgramaInputValue] = useState('');
    const [subprogramaInputValue, setSubprogramaInputValue] = useState('');  // Para el Autocomplete de programa

    const [presupuestoActivo, setPresupuestoActivo] = useState({});
    const { estadoPresupuesto } = useViewStore();
    const {
        presuEstatal,
        presuFaismun,
        presuFortamun,
        presuOdirectas,
        presuFederal,
    } = usePeriodoStore();

    

    const claveFaismun = `faismun${presupuestoActivo.indirectos}${presupuestoActivo.prodim}`;
    
    const opcionesSeleccionadas =
    presupuestoActivo.tipo === "fortamun"
    ? opciones.fortamun
    : opciones[claveFaismun] || opciones.default || [];

    const opcionesProgramasSeleccionadas =
    presupuestoActivo.tipo === "fortamun"
    ? opcionesPrograma.fortamun
    : opcionesPrograma.faismun || opcionesPrograma.default || [];

    const opcionesSubprogramasSeleccionadas =
    programa === null
    ? opcionesSubprograma.default || []
    : opcionesSubprograma[programa] || [];




    const [unidadCapacidad, setUnidadCapacidad] = useState(""); // Estado para los select
    const [unidadBeneficio, setUnidadBeneficio] = useState(""); // Estado para los select

    const validarFechas = () => {
        if (!fec_inicio || !fec_termino) return false;
        return fec_inicio >= fec_termino;
    };

    // Métodos independientes para cada acción
    const agregarObra = () => {
        const dictamen= convertirFechasADate(formState)
        console.log("Obra",obra);
        console.log("dictamen",dictamen)
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
        const presupuestoMapping = {
        estatal: presuEstatal,
        faismun: presuFaismun,
        fortamun: presuFortamun,
        odirectas: presuOdirectas,
        federal: presuFederal,
        };
        
        onResetForm()
        setRubrosInputValue(''); // Limpia el texto del campo de rubros
        setProgramaInputValue(''); 
        setSubprogramaInputValue('');
        setPresupuestoActivo(presupuestoMapping[estadoPresupuesto] || {});
    }, [estadoPresupuesto]);

    
    return (
        <Box sx={{ padding: 2, backgroundColor: "#f7f7f7", mt: 1.4, maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
        <Grid container spacing={2} >
            {/* Columna 1 */}
            <Grid item xs={3}>
            <TextField
                fullWidth
                label="Nombre De La Obra"
                name="nombre"
                value={nombre}
                onChange={onObraChange}
                variant="outlined"
                size="small"
                sx={{ backgroundColor: "#fff" }}
            />
            {
                (presupuestoActivo.tipo === "fortamun" || presupuestoActivo.tipo === "faismun") && (
                    <Autocomplete
                    fullWidth
                    margin="normal"
                    size="small"
                    name="rubros"
                    sx={{ backgroundColor: "#fff", mt: 2 }}
                    options={opcionesSeleccionadas}
                    getOptionLabel={(opcion) => opcion.label}
                    value={opcionesSeleccionadas.find((opcion) => opcion.value === rubros) || null} // Valor seleccionado
                    inputValue={rubrosInputValue} // Controla el texto visible
                    onInputChange={(e, newValue) => setRubrosInputValue(newValue)} // Sincroniza el texto visible
                    onChange={(e, value) => {
                        onObraChange({ target: { name: "rubros", value: value?.value || "" } }); // Llama a onObraChange con el nuevo valor
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Rubros" variant="outlined" size="small" />
                    )}
                    isOptionEqualToValue={(option, value) => option.value === value?.value}
                />
                
                )
                }
            <Autocomplete
                fullWidth
                margin="normal"
                size="small"
                name="programa"
                onChange={(e, value) => {
                    onObraChange({ target: { name: "programa", value: value?.value || "" } }); // Llama a onObraChange con el nuevo valor
                }}
                sx={{ backgroundColor: "#fff", mt: 2 }}
                options={opcionesProgramasSeleccionadas}
                getOptionLabel={(opcion) => opcion.label}
                value={opcionesProgramasSeleccionadas.find((opcion) => opcion.value === programa) || null}
                inputValue={programaInputValue} // Usar el nuevo estado
                onInputChange={(e, newValue) => setProgramaInputValue(newValue)} // Sincronizar el texto visible
                renderInput={(params) => (
                    <TextField {...params} label="Programa" variant="outlined" size="small" />
                )}
                isOptionEqualToValue={(option, value) => option.value === value?.value}
                />

                <Autocomplete
                fullWidth
                disabled={programa===''?true:false}
                margin="normal"
                size="small"
                name="subprograma"
                onChange={(e, value) => {
                    onObraChange({ target: { name: "subprograma", value: value?.value || "" } }); // Llama a onObraChange con el nuevo valor
                }}
                sx={{ backgroundColor: "#fff", mt: 2 }}
                options={opcionesSubprogramasSeleccionadas}
                getOptionLabel={(opcion) => opcion.label}
                value={opcionesSubprogramasSeleccionadas.find((opcion) => opcion.value === subprograma) || null}
                inputValue={subprogramaInputValue} // Controla el texto visible
                onInputChange={(e, newValue) => setSubprogramaInputValue(newValue)} // Sincroniza el texto
                renderInput={(params) => (
                    <TextField {...params} label="Subprograma" variant="outlined" size="small" />
                )}
                isOptionEqualToValue={(option, value) => option.value === value?.value}
                />
            <FormControl fullWidth margin="normal" size="small" sx={{ backgroundColor: "#fff" }}>
                <InputLabel>Ejecución</InputLabel>
                <Select
                name="ejecucion"
                onChange={onObraChange}
                value={ejecucion} // Se agrega el estado value
                size="small"
                label="ejecucion"
                >
                <MenuItem value="CONTRATO">CONTRATO</MenuItem>
                <MenuItem value="ADMINISTRACION">ADMINISTRACION</MenuItem>
                </Select>
            </FormControl>
            <TextField
                fullWidth
                label="Localidad/Colonia"
                variant="outlined"
                margin="normal"
                size="small"
                name="loca_col"
                onChange={onObraChange}
                value={loca_col} 
                sx={{ backgroundColor: "#fff" }}
            />
            <TextField
                fullWidth
                label="Empleo Eventual"
                variant="outlined"
                margin="normal"
                size="small"
                name="empleo_event"
                onChange={onObraChange}
                value={empleo_event} 
                sx={{ backgroundColor: "#fff" }}
            />
            </Grid>

            {/* Columna 2 */}
            <Grid item xs={3}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Capacidad</Typography>
            
            <TextField
            fullWidth
            label="Unidad"
            variant="outlined"
            margin="normal"
            size="small"
            name="cap_unidad"
            onChange={onObraChange}
            value={cap_unidad} 
            sx={{ backgroundColor: "#fff" }}
        />
            <TextField
                fullWidth
                label="Cantidad"
                variant="outlined"
                margin="normal"
                size="small"
                name="cap_cantidad"
                onChange={onObraChange}
                value={cap_cantidad}
                sx={{ backgroundColor: "#fff" }}
            />
            <Typography variant="body2" sx={{ marginTop: 2 ,fontWeight: 'bold' }}>
                Beneficio
            </Typography>
            <TextField
                fullWidth
                label="Unidad"
                variant="outlined"
                margin="normal"
                size="small"
                name="bene_unidad"
                onChange={onObraChange}
                value={bene_unidad}
                sx={{ backgroundColor: "#fff" }}
            />

            <TextField
                fullWidth
                label="Cantidad"
                variant="outlined"
                margin="normal"
                size="small"
                name="bene_cantidad"
                onChange={onObraChange}
                value={bene_cantidad}
                sx={{ backgroundColor: "#fff" }}
            />
            </Grid>

            {/* Columna 3 */}
            <Grid item xs={3}>
            <Typography variant="body2" sx={{fontWeight: 'bold' }}>Fecha de Obra</Typography>
            <DatePicker
                    label="Inicio"
                    sx={{ mt: 2 }}
                    value={fec_inicio}
                    name="fec_inicio"
                    onChange={(value) => {
                        onChangeDictamen({ target: { name: "fec_inicio", value } }); // Adaptación para `onObraChange`
                    }}
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
                    label="Término"
                    sx={{ mt: 2, mb: 2.6 }}
                    value={fec_termino}
                    name="fec_termino"
                    onChange={(value) => {
                        onChangeDictamen({ target: { name: "fec_termino", value } }); // Adaptación para `onObraChange`
                    }}
                    textField={(params) => (
                        <TextField
                        fullWidth
                        {...params}
                        error={fec_inicio && fec_termino && !validarFechas()}
                        helperText={
                            fec_inicio && fec_termino && !validarFechas()
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
                disabled
                size="small"
                name="presupuesto"
                onChange={onObraChange}
                value={presupuesto}
                sx={{ backgroundColor: "#fff" }}
            />
            </Grid>

            {/* Columna 4 */}
            <Grid item xs={3} sx={{mt:2.4}}>
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
