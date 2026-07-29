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
import { alpha, useTheme } from "@mui/material/styles";
import { useAuth } from "../hooks/useAuth";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { INCIDENT_TYPES } from "../constants/incidentTypes";

function FilterDialog({ open, onClose }) {
  const { isLoggedIn } = useAuth();
  const theme = useTheme();

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
    borderColor: "primary.main",
    color: "primary.main",
    "&:hover": {
      borderColor: "primary.main",
      bgcolor: "transparent",
      color: "primary.main",
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
                      color: "primary.main",
                      "&.Mui-checked": { color: "primary.main" },
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
              {INCIDENT_TYPES.map((cat) => {
                const seleccionada = categoriasSeleccionadas.includes(cat.reportType);
                return (
                  <Button
                    key={cat.reportType}
                    variant="outlined"
                    size="small"
                    onClick={() => handleToggleCategoria(cat.reportType)}
                    sx={{
                      borderRadius: "12px",
                      borderColor: seleccionada ? "primary.main" : "divider",
                      color: seleccionada ? "primary.main" : "text.primary",
                      bgcolor: seleccionada
                        ? alpha(theme.palette.primary.main, 0.08)
                        : "transparent",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: alpha(theme.palette.primary.main, 0.06),
                        color: "primary.main",
                      },
                    }}
                  >
                    {cat.title}
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
              color="primary"
              onClick={handleAceptar}
              sx={{ borderRadius: "12px" }}
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