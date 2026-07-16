import React, { useState, useRef, useEffect } from "react";
import Layout from "../../components/Layout";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import AddIcon from "@mui/icons-material/Add";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import CustomizeMarker from "../../components/CustomizeMarker";
import { Fab, useMediaQuery, useTheme, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import pallette from "../../styled-components/pallette.jsx";
import ReportDialog from "../../components/ReportDialog.jsx";
import { useNavigate } from "react-router-dom";
import {
  getReportsByBounds,
  reportRegister,
  getReportsByBoundsAndFilters,
} from "../../services/reporteService.js";
import { useAuth } from "../../hooks/useAuth.jsx";
import FilterDialog from "../../components/FilterDialog.jsx";
import ButtonAcceptBase from "../../components/ButtonAcceptBase";

const position = [-31.6353, -60.7031];

function MapEventHandler({
  isMarking,
  setIsMarking,
  setClickedLatLng,
  setOpenDialog,
  setMarkers,
  filters,
}) {
  const map = useMapEvents({
    moveend: () => {
      fetchMarkers();
    },
    load: () => {
      fetchMarkers();
    },
    click: (e) => {
      if (isMarking) {
        setClickedLatLng(e.latlng);
        setIsMarking(false);
        setOpenDialog(true);
      }
    },
  });

  const fetchMarkers = async () => {
    try {
      const data = await getReportsByBoundsAndFilters(map.getBounds(), filters);
      setMarkers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMarkers();
  }, [filters]);

  return null;
}

function InitialFetch({ setMarkers }) {
  const map = useMap();

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const data = await getReportsByBounds(map.getBounds());
        setMarkers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMarkers();
  }, []);

  return null;
}

function Principal() {
  const navigate = useNavigate();

  const [markers, setMarkers] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filtros, setFiltros] = useState({
    soloMios: false,
    desdeFecha: null,
    categorias: []
  });

  // Custom alert states
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setOpenAlertDialog(true);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenDialog = () => {
    setIsMarking(true);
  };

  const handleCloseDialog = async (reportData) => {
    setOpenDialog(false);
    if (!reportData) return;

    try {
      const registered = await reportRegister(reportData);
      setMarkers((prev) => [...prev, registered]);
      showAlert("Reporte registrado con éxito");
    } catch (err) {
      console.error(err);
      showAlert("Error al registrar el reporte");
    }
  };

  const handleCloseFilter = (filtrosDialog) => {
    setOpenFilter(false);
    if (!filtrosDialog) return;
    setFiltros(filtrosDialog);
  };

  const { isLoggedIn, isLoading } = useAuth();

  const fabStyle = {
    zIndex: 1000,
    bgcolor: pallette.primary,
    color: pallette.secondary,
    borderColor: pallette.secondary,
    "&:hover": {
      bgcolor: pallette.secondary,
      color: pallette.primary,
      boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    },
    "&:active": {
      bgcolor: pallette.secondary,
      transform: "scale(0.95)",
      transition: "transform 0.1s ease",
    },
  };

  return (
    <Layout>
      {isMarking && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: "85px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            bgcolor: pallette.primary,
            color: "white",
            px: 3,
            py: 1.5,
            borderRadius: "20px",
            fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            pointerEvents: "none"
          }}
        >
          Haga clic en el mapa para ubicar el incidente
        </Paper>
      )}

      <MapContainer center={position} zoom={14} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <InitialFetch setMarkers={setMarkers} />
        {markers.map((marker, index) => (
          <CustomizeMarker key={marker.id ?? index} marker={marker} />
        ))}

        <MapEventHandler
          isMarking={isMarking}
          setIsMarking={setIsMarking}
          setClickedLatLng={setClickedLatLng}
          setOpenDialog={setOpenDialog}
          setMarkers={setMarkers}
          filters={filtros}
        />

        {/* Action Buttons */}
        {!isLoading && (
          <>
            {isLoggedIn && (
              <Fab
                size={isMobile ? "small" : "medium"}
                onClick={handleOpenDialog}
                sx={{
                  ...fabStyle,
                  position: "absolute",
                  bottom: isMobile ? 20 : 40,
                  right: isMobile ? 60 : 90,
                }}
              >
                <AddIcon fontSize={isMobile ? "small" : "medium"} />
              </Fab>
            )}
            <Fab
              onClick={() => setOpenFilter(true)}
              size={isMobile ? "small" : "medium"}
              sx={{
                ...fabStyle,
                position: "absolute",
                bottom: isMobile ? 20 : 40,
                right: isMobile ? 10 : 20,
              }}
            >
              <FilterAltOutlinedIcon fontSize={isMobile ? "small" : "medium"} />
            </Fab>
          </>
        )}

        <FilterDialog open={openFilter} onClose={handleCloseFilter} />
        
        <ReportDialog
          open={openDialog}
          onClose={handleCloseDialog}
          lat={clickedLatLng?.lat}
          lng={clickedLatLng?.lng}
        />

        {/* Premium Alert Notification Dialog */}
        <Dialog
          open={openAlertDialog}
          onClose={() => setOpenAlertDialog(false)}
          PaperProps={{ sx: { borderRadius: "12px", p: 1 } }}
        >
          <DialogTitle sx={{ pb: 1 }}>Atención</DialogTitle>
          <DialogContent>
            <DialogContentText color="text.primary">
              {alertMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <ButtonAcceptBase text="Aceptar" mw="80px" onClick={() => setOpenAlertDialog(false)} />
          </DialogActions>
        </Dialog>
      </MapContainer>
    </Layout>
  );
}

export default Principal;
