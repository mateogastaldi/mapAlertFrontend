import React, { useState } from "react";
import { Popup, Marker } from "react-leaflet";
import { Box, Typography, Button, Divider, Tooltip } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import L from "leaflet";

import pothole from "../assets/bache.png";
import powerOutage from "../assets/sin-luz.png";
import withOutElectricity from "../assets/sin-cargos.png";
import defaultMarker from "../assets/marca-de-ubicacion.png";
import accidenteDeTrafico from "../assets/accidente-de-auto.png";

import { useAuth } from "../hooks/useAuth";
import { rateReport, verifyReport, dismissReport } from "../services/reporteService";

const ICON_MAP = {
  CALLE_SIN_LUZ: powerOutage,
  BACHE: pothole,
  CORTE_DE_LUZ: withOutElectricity,
  ACCIDENTE: accidenteDeTrafico,
};

const AUTH_HINT = "Iniciá sesión para interactuar con los reportes";

// ─── Star Rating ─────────────────────────────────────────────────────────────

function StarRating({ reportId, isLoggedIn }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  // locked = cannot interact (guest OR already voted)
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
      // roll back on failure so the user can retry
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
        Calificar reporte
      </Typography>

      {/* Tooltip wraps the whole star row so it works even when stars are "disabled" */}
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
                // dim stars for guests but keep them visible
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

function VerificationButtons({ reportId, initialConfirmCount, initialDismissCount, isLoggedIn }) {
  const [confirmCount, setConfirmCount] = useState(initialConfirmCount);
  const [dismissCount, setDismissCount] = useState(initialDismissCount);
  // 'confirm' | 'dismiss' | null
  const [vote, setVote] = useState(null);
  const [loading, setLoading] = useState(false);

  const hasVoted = vote !== null;
  const locked = !isLoggedIn || hasVoted;

  const handleVote = async (type) => {
    if (locked || loading) return;
    setLoading(true);
    try {
      if (type === "confirm") {
        await verifyReport(reportId);
        setConfirmCount((c) => c + 1);
      } else {
        await dismissReport(reportId);
        setDismissCount((c) => c + 1);
      }
      setVote(type);
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

      {/* One tooltip over both buttons — works because the Box (not the buttons) gets hover */}
      <Tooltip
        title={!isLoggedIn ? AUTH_HINT : ""}
        placement="top"
        arrow
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* ── "Still there?" ── */}
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
              // dim for guests
              ...(!isLoggedIn && { opacity: 0.5 }),
            }}
          >
            Sigue ahí
          </Button>

          {/* ── "Not there anymore" ── */}
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
              // red tint when unvoted
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

      {/* Community counts */}
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
  const { isLoggedIn } = useAuth();

  const iconUrl = L.icon({
    iconUrl: ICON_MAP[marker.reportType] || defaultMarker,
    iconSize: [40, 40],
  });

  // Backend may return camelCase or snake_case depending on Jackson config
  const description =
    marker.reportDescription ?? marker.report_description ?? "";

  return (
    <Marker position={[marker.lat, marker.lng]} icon={iconUrl}>
      <Popup minWidth={240}>
        <Box sx={{ minWidth: 224, py: 0.5 }}>

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
            <StarRating reportId={marker.id} isLoggedIn={isLoggedIn} />
          </Box>

          <Divider sx={{ mb: 1.5 }} />

          {/* ── Dual verification ── */}
          <VerificationButtons
            reportId={marker.id}
            initialConfirmCount={marker.verificationCount ?? 0}
            initialDismissCount={marker.dismissCount ?? 0}
            isLoggedIn={isLoggedIn}
          />

        </Box>
      </Popup>
    </Marker>
  );
}
