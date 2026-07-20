import React, { useState, useEffect } from "react";
import { Popup, Marker } from "react-leaflet";
import { Box, Typography, Button, Divider, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import L from "leaflet";

import pothole from "../assets/bache.png";
import powerOutage from "../assets/sin-luz.png";
import withOutElectricity from "../assets/sin-cargos.png";
import defaultMarker from "../assets/marca-de-ubicacion.png";
import accidenteDeTrafico from "../assets/accidente-de-auto.png";

import { useAuth } from "../hooks/useAuth";
import { rateReport, verifyReport, dismissReport, editReport, deleteReport } from "../services/reporteService";
import ButtonAcceptBase from "./ButtonAcceptBase";
import ButtonCancelBase from "./ButtonCancelBase";
import CustomizeSelect from "./CustomizeSelect";
import pallette from "../styled-components/pallette";

const ICON_MAP = {
  CALLE_SIN_LUZ: powerOutage,
  BACHE: pothole,
  CORTE_DE_LUZ: withOutElectricity,
  ACCIDENTE: accidenteDeTrafico,
};

const AUTH_HINT = "Iniciá sesión para interactuar con los reportes";

// ─── Star Rating ─────────────────────────────────────────────────────────────

function StarRating({ reportId, initialRating, isLoggedIn }) {
  const [rating, setRating] = useState(initialRating || 0);
  const [hover, setHover] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const locked = !isLoggedIn || hasRated;
  const active = hover || rating;

  const handleRate = async (value) => {
    if (locked) return;
    setRating(value);
    setHasRated(true);
    try {
      await rateReport(reportId, value);
    } catch (err) {
      console.error(err);
      setRating(0);
      setHasRated(false);
    }
  };

  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mb: 0.5 }}
      >
        Calificar reporte (Promedio: {initialRating ? initialRating.toFixed(1) : "0.0"})
      </Typography>

      <Tooltip
        title={!isLoggedIn ? AUTH_HINT : ""}
        placement="top"
        arrow
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.25, width: "fit-content" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Box
              key={star}
              onClick={() => handleRate(star)}
              onMouseEnter={() => !locked && setHover(star)}
              onMouseLeave={() => !locked && setHover(0)}
              sx={{
                cursor: locked ? "default" : "pointer",
                color: active >= star ? "#f59e0b" : "#cbd5e1",
                opacity: !isLoggedIn ? 0.45 : 1,
                display: "flex",
                transition: "color 0.1s, transform 0.1s",
                "&:hover": !locked ? { transform: "scale(1.2)" } : {},
              }}
            >
              <StarRoundedIcon sx={{ fontSize: "1.4rem" }} />
            </Box>
          ))}

          {hasRated && (
            <Typography
              variant="caption"
              sx={{ ml: 0.75, color: "success.main", fontWeight: 600 }}
            >
              ¡Gracias!
            </Typography>
          )}
        </Box>
      </Tooltip>
    </Box>
  );
}

// ─── Verification Buttons ─────────────────────────────────────────────────────

function VerificationButtons({ reportId, initialConfirmCount, initialDismissCount, isLoggedIn, onDeactivated }) {
  const [confirmCount, setConfirmCount] = useState(initialConfirmCount);
  const [dismissCount, setDismissCount] = useState(initialDismissCount);
  const [vote, setVote] = useState(null);
  const [loading, setLoading] = useState(false);

  const hasVoted = vote !== null;
  const locked = !isLoggedIn || hasVoted;

  const handleVote = async (type) => {
    if (locked || loading) return;
    setLoading(true);
    try {
      let res;
      if (type === "confirm") {
        res = await verifyReport(reportId);
        setConfirmCount((c) => c + 1);
      } else {
        res = await dismissReport(reportId);
        setDismissCount((c) => c + 1);
      }
      setVote(type);
      if (res && res.activo === false) {
        if (onDeactivated) onDeactivated();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mb: 0.75 }}
      >
        ¿El incidente sigue activo?
      </Typography>

      <Tooltip
        title={!isLoggedIn ? AUTH_HINT : ""}
        placement="top"
        arrow
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant={vote === "confirm" ? "contained" : "outlined"}
            size="small"
            startIcon={
              vote === "confirm" ? <CheckCircleOutlineIcon /> : <ThumbUpOutlinedIcon />
            }
            onClick={() => handleVote("confirm")}
            disabled={locked || loading}
            sx={{
              flex: 1,
              borderRadius: "20px",
              textTransform: "none",
              fontSize: "0.72rem",
              ...(vote === "confirm" && {
                bgcolor: "success.main",
                "&.Mui-disabled": { bgcolor: "success.light", color: "white" },
              }),
              ...(!isLoggedIn && { opacity: 0.5 }),
            }}
          >
            Sigue ahí
          </Button>

          <Button
            variant={vote === "dismiss" ? "contained" : "outlined"}
            size="small"
            startIcon={<ThumbDownOutlinedIcon />}
            onClick={() => handleVote("dismiss")}
            disabled={locked || loading}
            sx={{
              flex: 1,
              borderRadius: "20px",
              textTransform: "none",
              fontSize: "0.72rem",
              ...(vote !== "dismiss" && {
                color: "error.main",
                borderColor: "error.main",
                "&:hover": { borderColor: "error.dark" },
              }),
              ...(vote === "dismiss" && {
                bgcolor: "error.main",
                "&.Mui-disabled": { bgcolor: "error.light", color: "white" },
              }),
              ...(!isLoggedIn && { opacity: 0.5 }),
            }}
          >
            Ya no está
          </Button>
        </Box>
      </Tooltip>

      {(confirmCount > 0 || dismissCount > 0) && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.75 }}>
          {confirmCount > 0 && (
            <Typography variant="caption" color="success.main">
              {confirmCount} {confirmCount === 1 ? "confirma" : "confirman"}
            </Typography>
          )}
          {dismissCount > 0 && (
            <Typography variant="caption" color="error.main">
              {dismissCount} {dismissCount === 1 ? "desmiente" : "desmienten"}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CustomizeMarker({ marker }) {
  const { isLoggedIn, user } = useAuth();
  const [reportData, setReportData] = useState(marker);
  const [deleted, setDeleted] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  // Edit fields
  const [editType, setEditType] = useState(marker.reportType);
  const [editDescription, setEditDescription] = useState(marker.reportDescription || "");

  useEffect(() => {
    setReportData(marker);
    setEditType(marker.reportType);
    setEditDescription(marker.reportDescription || "");
  }, [marker]);

  if (deleted || !reportData || reportData.activo === false) {
    return null;
  }

  const iconUrl = L.icon({
    iconUrl: ICON_MAP[reportData.reportType] || defaultMarker,
    iconSize: [40, 40],
  });

  const description = reportData.reportDescription ?? "";
  const streetName = reportData.street || "";
  const streetNum = reportData.streetNumber ? ` ${reportData.streetNumber}` : "";

  // Check if owner or admin
  const isOwner = isLoggedIn && user && reportData.usuarioId === user.id;
  const isAdmin = isLoggedIn && user && user.role === "ADMIN";
  const canManage = isOwner || isAdmin;

  const handleOpenEdit = () => {
    setEditType(reportData.reportType);
    setEditDescription(description);
    setOpenEdit(true);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedDto = await editReport(reportData.id, {
        lat: reportData.lat,
        lng: reportData.lng,
        street: reportData.street,
        streetNumber: reportData.streetNumber,
        city: reportData.city,
        state: reportData.state,
        country: reportData.country,
        reportType: editType,
        reportDescription: editDescription
      });
      setReportData((prev) => ({
        ...prev,
        reportType: updatedDto.reportType || editType,
        reportDescription: updatedDto.reportDescription || editDescription,
      }));
      setOpenEdit(false);
    } catch (err) {
      console.error("Error editing report:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReport(reportData.id);
      setDeleted(true);
      setOpenConfirmDelete(false);
    } catch (err) {
      console.error("Error deleting report:", err);
    }
  };

  return (
    <>
      <Marker position={[reportData.lat, reportData.lng]} icon={iconUrl}>
        <Popup minWidth={240}>
          <Box sx={{ minWidth: 224, py: 0.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 0.5, color: pallette.primary }}>
              {streetName ? `${streetName}${streetNum}` : "Ubicación seleccionada"}
            </Typography>
            
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
              Por: {reportData.usuarioName || "Vecino"}
            </Typography>

            {/* ── Description ── */}
            <Typography
              component="div"
              variant="body2"
              sx={{ mb: 1.5, lineHeight: 1.5, color: "rgba(0,0,0,0.87)" }}
            >
              {description || <em style={{ color: "#9e9e9e" }}>Sin descripción</em>}
            </Typography>

            <Divider sx={{ mb: 1.5 }} />

            {/* ── Star rating ── */}
            <Box sx={{ mb: 1.5 }}>
              <StarRating reportId={reportData.id} initialRating={reportData.averageRating} isLoggedIn={isLoggedIn} />
            </Box>

            <Divider sx={{ mb: 1.5 }} />

            {/* ── Dual verification ── */}
            <Box sx={{ mb: canManage ? 1.5 : 0 }}>
              <VerificationButtons
                reportId={reportData.id}
                initialConfirmCount={reportData.verificationCount ?? 0}
                initialDismissCount={reportData.dismissCount ?? 0}
                isLoggedIn={isLoggedIn}
                onDeactivated={() => setDeleted(true)}
              />
            </Box>

            {/* ── Owner / Admin Management Options ── */}
            {canManage && (
              <>
                <Divider sx={{ mb: 1 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon sx={{ fontSize: "0.9rem" }} />}
                    onClick={handleOpenEdit}
                    sx={{
                      flex: 1,
                      textTransform: "none",
                      fontSize: "0.75rem",
                      borderRadius: "12px",
                      color: pallette.primary,
                      borderColor: pallette.primary,
                      "&:hover": { borderColor: pallette.primary, bgcolor: "rgba(18, 188, 142, 0.05)" }
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon sx={{ fontSize: "0.9rem" }} />}
                    onClick={() => setOpenConfirmDelete(true)}
                    sx={{
                      flex: 1,
                      textTransform: "none",
                      fontSize: "0.75rem",
                      borderRadius: "12px",
                    }}
                  >
                    Eliminar
                  </Button>
                </Box>
              </>
            )}

          </Box>
        </Popup>
      </Marker>

      {/* ── EDIT DIALOG ── */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        PaperProps={{ sx: { borderRadius: "12px", p: 2, minWidth: "300px" } }}
      >
        <DialogTitle sx={{ p: 0, mb: 2 }}>Editar Incidente</DialogTitle>
        <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Modifica la categoría o descripción del reporte.
          </Typography>
          
          <CustomizeSelect
            value={editType}
            onChange={(e) => setEditType(e.target.value)}
            label="Incidente"
            sx={{ width: "100%" }}
          />

          <TextField
            label="Descripción"
            multiline
            rows={3}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="Describe lo ocurrido..."
            InputProps={{ sx: { borderRadius: "12px" } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 0, mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <ButtonCancelBase text="Cancelar" mw="80px" onClick={() => setOpenEdit(false)} />
          <ButtonAcceptBase text="Guardar" mw="80px" onClick={handleSaveEdit} />
        </DialogActions>
      </Dialog>

      {/* ── CONFIRM DELETE DIALOG ── */}
      <Dialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
        PaperProps={{ sx: { borderRadius: "12px", p: 2 } }}
      >
        <DialogTitle sx={{ p: 0, mb: 1 }}>¿Eliminar reporte?</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <DialogContentText>
            Esta acción desactivará el reporte y no será visible en el mapa. ¿Deseas continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 0, mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <ButtonCancelBase text="Cancelar" mw="80px" onClick={() => setOpenConfirmDelete(false)} />
          <ButtonAcceptBase text="Eliminar" mw="80px" sx={{ bgcolor: pallette.cancel, "&:hover": { bgcolor: "#c63f3f" } }} onClick={handleDelete} />
        </DialogActions>
      </Dialog>
    </>
  );
}
