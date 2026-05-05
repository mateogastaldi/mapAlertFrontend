import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  Divider,
  Typography,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import pallette from "../styled-components/pallette";
import { useAuth } from "../hooks/useAuth";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const categorias = [
  { label: "Accidente de tráfico", value: "ACCIDENTE" },
  { label: "Calle sin luz", value: "CALLE_SIN_LUZ" },
  { label: "Corte de electricidad", value: "CORTE_DE_LUZ" },
  { label: "Bache", value: "BACHE" },
];

function FilterDialog({ open, onClose }) {
  const { isLoggedIn } = useAuth();

  const [soloMios, setSoloMios] = React.useState(false);
  const [desdeFecha, setDesdeFecha] = React.useState(null);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = React.useState([]);

  const handleToggleCategoria = (value) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const handleLimpiar = () => {
    setSoloMios(false);
    setDesdeFecha(null);
    setCategoriasSeleccionadas([]);
  };

  const handleAceptar = () => {
    onClose({
      soloMios,
      desdeFecha: desdeFecha,
      categorias: categoriasSeleccionadas,
    });
  };

  const handleCerrar = () => onClose(null);

  const buttonStyle = {
    borderRadius: "12px",
    borderColor: pallette.primary,
    color: pallette.primary,
    "&:hover": {
      borderColor: pallette.primary,
      bgcolor: "transparent",
      color: pallette.primary,
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        onClose={handleCerrar}
        open={open}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            padding: 2,
            width: "25rem",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <DialogTitle sx={{ p: 0 }}>Filtrar Reportes</DialogTitle>
          <Button
            onClick={handleCerrar}
            sx={{ minWidth: 0, minHeight: 0, p: 0 }}
          >
            <CloseIcon />
          </Button>
        </Box>

        <Typography color="text.secondary" sx={{ mb: 1 }}>
          Filtrá los reportes según tus preferencias
        </Typography>

        <Divider />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>

          {/* Filtro 1: Solo mis reportes */}
          {isLoggedIn && (
            <Box>
              <Typography variant="button" display="block" sx={{ mb: 0.5 }}>
                Mis reportes
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={soloMios}
                    onChange={(e) => setSoloMios(e.target.checked)}
                    sx={{
                      color: pallette.primary,
                      "&.Mui-checked": { color: pallette.primary },
                    }}
                  />
                }
                label="Ver solo mis reportes"
              />
            </Box>
          )}

          {/* Filtro 2: Desde fecha */}
          <Box>
            <Typography variant="button" display="block" sx={{ mb: 0.5 }}>
              Fecha
            </Typography>
            <DatePicker
              label="Desde"
              value={desdeFecha}
              onChange={(newValue) => setDesdeFecha(newValue)}
              disableFuture
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  sx: {
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  },
                },
              }}
            />
          </Box>

          {/* Filtro 3: Categorías */}
          <Box>
            <Typography variant="button" display="block" sx={{ mb: 0.5 }}>
              Categoría
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {categorias.map((cat) => {
                const seleccionada = categoriasSeleccionadas.includes(cat.value);
                return (
                  <Button
                    key={cat.value}
                    variant="outlined"
                    size="small"
                    onClick={() => handleToggleCategoria(cat.value)}
                    sx={{
                      borderRadius: "12px",
                      borderColor: seleccionada
                        ? pallette.primary
                        : "rgba(0,0,0,0.23)",
                      color: seleccionada ? pallette.primary : "black",
                      bgcolor: seleccionada
                        ? `${pallette.primary}15`
                        : "transparent",
                      "&:hover": {
                        borderColor: pallette.primary,
                        bgcolor: `${pallette.primary}10`,
                        color: pallette.primary,
                      },
                    }}
                  >
                    {cat.label}
                  </Button>
                );
              })}
            </Box>
          </Box>

          {/* Botones */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Button
              variant="outlined"
              onClick={handleLimpiar}
              sx={buttonStyle}
            >
              Limpiar filtros
            </Button>
            <Button
              variant="contained"
              onClick={handleAceptar}
              sx={{
                bgcolor: pallette.primary,
                color: pallette.secondary,
                borderRadius: "12px",
                "&:hover": { bgcolor: pallette.primary },
              }}
            >
              Aplicar
            </Button>
          </Box>
        </Box>
      </Dialog>
    </LocalizationProvider>
  );
}

export default FilterDialog;