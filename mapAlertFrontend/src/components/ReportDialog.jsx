import * as React from "react";
import "./styles.css";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Divider, Typography, Box, TextField } from "@mui/material";
import CustomizeSelect from "./CustomizeSelect";
import CloseIcon from "@mui/icons-material/Close";
import ButtonAcceptBase from "./ButtonAcceptBase";
import ButtonCancelBase from "./ButtonCancelBase";
import pallette from "../styled-components/pallette";

function ReportDialog({ open, onClose, lat, lng }) {
  const [valueReport, setValueReport] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [streetNumber, setStreetNumber] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [country, setCountry] = React.useState("Argentina");
  const [errorText, setErrorText] = React.useState("");

  const handleClose = () => {
    setErrorText("");
    onClose(null);
  };

  const handleAccept = () => {
    if (!valueReport || !street || !city || !state || !country) {
      setErrorText("Por favor complete los campos obligatorios (*)");
      return;
    }
    
    setErrorText("");
    onClose({
      lat,
      lng,
      reportType: valueReport,
      reportDescription: description,
      street,
      streetNumber: streetNumber ? parseInt(streetNumber) : null,
      city,
      state,
      country,
    });
  };

  React.useEffect(() => {
    if (open) {
      setValueReport("");
      setDescription("");
      setStreet("");
      setStreetNumber("");
      setCity("");
      setState("");
      setCountry("Argentina");
      setErrorText("");
    }
  }, [open]);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          padding: 2,
          width: "25rem",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <DialogTitle sx={{ p: 0, fontWeight: "bold", color: pallette.primary }}>
          Registrar Incidente
        </DialogTitle>
        <CloseIcon onClick={handleClose} sx={{ cursor: "pointer", color: "text.secondary" }} />
      </Box>

      <Typography color="text.secondary" sx={{ mb: 1.5 }}>
        Completa los datos de la dirección e incidente para guardarlo.
      </Typography>

      <Divider />

      <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        {errorText && (
          <Typography color="error" sx={{ fontWeight: 500, fontSize: "0.85rem" }}>
            {errorText}
          </Typography>
        )}

        <CustomizeSelect
          value={valueReport}
          onChange={(e) => setValueReport(e.target.value)}
          label="Incidente *"
          sx={{ width: "100%" }}
        />

        <TextField
          label="Calle *"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          size="small"
          fullWidth
          InputProps={{ sx: { borderRadius: "12px" } }}
        />

        <TextField
          label="Altura (Nro)"
          value={streetNumber}
          onChange={(e) => setStreetNumber(e.target.value)}
          type="number"
          size="small"
          fullWidth
          InputProps={{ sx: { borderRadius: "12px" } }}
        />

        <TextField
          label="Ciudad *"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          size="small"
          fullWidth
          InputProps={{ sx: { borderRadius: "12px" } }}
        />

        <TextField
          label="Provincia *"
          value={state}
          onChange={(e) => setState(e.target.value)}
          size="small"
          fullWidth
          InputProps={{ sx: { borderRadius: "12px" } }}
        />

        <TextField
          label="País *"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          size="small"
          fullWidth
          InputProps={{ sx: { borderRadius: "12px" } }}
        />

        <TextField
          label="Descripción"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          placeholder="Describe el incidente..."
          InputProps={{ sx: { borderRadius: "12px" } }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 0, mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <ButtonCancelBase text="Cancelar" mw="80px" onClick={handleClose} />
        <ButtonAcceptBase text="Registrar" mw="80px" onClick={handleAccept} />
      </DialogActions>
    </Dialog>
  );
}

export default ReportDialog;
