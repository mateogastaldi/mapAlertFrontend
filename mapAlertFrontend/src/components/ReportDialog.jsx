import * as React from "react";
import "./styles.css";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Divider, Typography, Box, TextField, Button } from "@mui/material";
import CustomizeSelect from "./CustomizeSelect";
import CloseIcon from "@mui/icons-material/Close";
import ButtonAcceptBase from "./ButtonAcceptBase";
import ButtonCancelBase from "./ButtonCancelBase";
import { reverseGeocode, loadGoogleMapsScript } from "../services/googleApi";
import { adaptGoogleAddressComponents } from "../adapters/googleAddressAdapter";

function ReportDialog({ open, onClose, lat, lng, mode = "map", onRemark }) {
  const [valueReport, setValueReport] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [streetNumber, setStreetNumber] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [country, setCountry] = React.useState("Argentina");
  const [errorText, setErrorText] = React.useState("");
  const [resolvedLat, setResolvedLat] = React.useState(lat);
  const [resolvedLng, setResolvedLng] = React.useState(lng);
  const [isLocating, setIsLocating] = React.useState(false);

  const handleClose = () => {
    setErrorText("");
    onClose(null);
  };

  const handleRemark = () => {
    setErrorText("");
    onRemark?.();
  };

  const handleAccept = () => {
    if (resolvedLat == null || resolvedLng == null) {
      setErrorText("Selecciona una dirección de la lista de sugerencias para ubicar el incidente.");
      return;
    }

    if (!valueReport || !street || !city || !state || !country) {
      setErrorText("Por favor complete los campos obligatorios (*)");
      return;
    }

    setErrorText("");
    onClose({
      lat: resolvedLat,
      lng: resolvedLng,
      reportType: valueReport,
      reportDescription: description,
      street,
      streetNumber: streetNumber ? parseInt(streetNumber) : null,
      city,
      state,
      country,
    });
  };

  const handlePlaceSelected = (place) => {
    if (!place?.geometry?.location) {
      setErrorText("Selecciona una dirección de la lista de sugerencias.");
      return;
    }
    const adapted = adaptGoogleAddressComponents(place.address_components);
    setStreet(adapted.street);
    setStreetNumber(adapted.streetNumber);
    setCity(adapted.city);
    setState(adapted.state);
    setCountry(adapted.country || "Argentina");
    setResolvedLat(place.geometry.location.lat());
    setResolvedLng(place.geometry.location.lng());
    setErrorText("");
  };

  // A state-backed callback ref (rather than a plain useRef) guarantees this
  // effect re-runs exactly when the <input> actually mounts, regardless of
  // when MUI's Dialog/Modal commits its children.
  const [addressInputEl, setAddressInputEl] = React.useState(null);

  React.useEffect(() => {
    if (mode !== "search" || !addressInputEl) return;

    let autocomplete;
    let listener;

    loadGoogleMapsScript()
      .then(() => {
        autocomplete = new window.google.maps.places.Autocomplete(addressInputEl, {
          types: ["address"],
          componentRestrictions: { country: "ar" },
          fields: ["address_components", "geometry.location"],
        });
        listener = autocomplete.addListener("place_changed", () => {
          handlePlaceSelected(autocomplete.getPlace());
        });
      })
      .catch((err) => console.error("No se pudo cargar el autocompletado de direcciones:", err));

    return () => listener?.remove();
  }, [mode, addressInputEl]);

  React.useEffect(() => {
    if (!open) return;

    setValueReport("");
    setDescription("");
    setStreet("");
    setStreetNumber("");
    setCity("");
    setState("");
    setCountry("Argentina");
    setErrorText("");
    setResolvedLat(lat);
    setResolvedLng(lng);

    if (mode === "map" && lat != null && lng != null) {
      setIsLocating(true);
      reverseGeocode(lat, lng)
        .then((result) => {
          const adapted = adaptGoogleAddressComponents(result?.address_components);
          setStreet(adapted.street);
          setStreetNumber(adapted.streetNumber);
          setCity(adapted.city);
          setState(adapted.state);
          setCountry(adapted.country || "Argentina");
        })
        .catch((err) => console.error("No se pudo geocodificar la ubicación:", err))
        .finally(() => setIsLocating(false));
    }
  }, [open, lat, lng, mode]);

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
        <DialogTitle sx={{ p: 0, fontWeight: "bold", color: "primary.main" }}>
          Registrar Incidente
        </DialogTitle>
        <CloseIcon onClick={handleClose} sx={{ cursor: "pointer", color: "text.secondary" }} />
      </Box>

      <Typography color="text.secondary" sx={{ mb: 1.5 }}>
        {mode === "search"
          ? "Buscá la dirección donde ocurrió el incidente."
          : "Completa los datos del incidente para guardarlo."}
      </Typography>

      <Divider />

      <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        {errorText && (
          <Typography color="error" sx={{ fontWeight: 500, fontSize: "0.85rem" }}>
            {errorText}
          </Typography>
        )}

        {mode === "search" && (
          <TextField
            label="Buscar dirección *"
            placeholder="Ej: Llerena 3360"
            inputRef={setAddressInputEl}
            size="small"
            fullWidth
            InputProps={{ sx: { borderRadius: "12px" } }}
          />
        )}

        {mode === "map" && isLocating && (
          <Typography variant="caption" color="text.secondary">
            Buscando dirección…
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
          disabled
          size="small"
          fullWidth
          InputProps={{ sx: { borderRadius: "12px" } }}
        />

        <TextField
          label="Altura (Nro)"
          value={streetNumber}
          onChange={(e) => setStreetNumber(e.target.value)}
          disabled
          type="number"
          size="small"
          fullWidth
          InputProps={{ sx: { borderRadius: "12px" } }}
        />

        <TextField
          label="Ciudad *"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled
          size="small"
          fullWidth
          InputProps={{ sx: { borderRadius: "12px" } }}
        />

        <TextField
          label="Provincia *"
          value={state}
          onChange={(e) => setState(e.target.value)}
          disabled
          size="small"
          fullWidth
          InputProps={{ sx: { borderRadius: "12px" } }}
        />

        <TextField
          label="País *"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          disabled
          size="small"
          fullWidth
          InputProps={{ sx: { borderRadius: "12px" } }}
        />

        {mode === "map" && (
          <Button
            variant="outlined"
            onClick={handleRemark}
            fullWidth
            sx={{ borderRadius: "12px", textTransform: "none" }}
          >
            Volver a marcar en el mapa
          </Button>
        )}

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
