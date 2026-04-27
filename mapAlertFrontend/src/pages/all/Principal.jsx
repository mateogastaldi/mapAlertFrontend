import React, { useState, useRef } from "react";
import Layout from "../../components/Layout";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import AddIcon from "@mui/icons-material/Add";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import CustomizeMarker from "../../components/CustomizeMarker";
import { Fab, useMediaQuery, useTheme } from "@mui/material";
import pallette from "../../styled-components/pallette.jsx";
import ReportDialog from "../../components/ReportDialog.jsx";
import { reverseGeocode } from "../../services/googleApi.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getReportsByBounds,
  reportRegister,
} from "../../services/reporteService.js";
import { useAuth } from "../../hooks/useAuth.jsx";

const position = [-31.6353, -60.7031];

const getAddressComponent = (address, type) => {
  const component = address.address_components.find((a) =>
    a.types[0].includes(type),
  );
  return component ? component.long_name : "";
};

const handleReverseGeocodeApi = async (e) => {
  const result = await reverseGeocode(e.latlng.lat, e.latlng.lng);
  return result;
};

function MapEventHandler({
  activeOnClickRef,
  setMarkers,
  setIsActiveOnClick,
  valueDialog,
  setValueDialog,
}) {
  const fetchMarkers = async () => {
    try {
      const data = await getReportsByBounds(map.getBounds());
      setMarkers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const map = useMapEvents({
    // Se dispara cuando termina de moverse o zoomear
    moveend: () => {
      fetchMarkers();
    },
    // Carga inicial
    load: () => {
      fetchMarkers();
    },
    click: async (e) => {
      if (activeOnClickRef.current) {
        const reverseGeocodeApi = await handleReverseGeocodeApi(e);
        const newMarker = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          reportType: valueDialog.report_type,
          reportDescription: valueDialog.report_description,
          street: getAddressComponent(reverseGeocodeApi, "route"),
          streetNumber: getAddressComponent(reverseGeocodeApi, "street_number"),
          city: getAddressComponent(reverseGeocodeApi, "locality"),
          state: getAddressComponent(
            reverseGeocodeApi,
            "administrative_area_level_1",
          ),
          country: getAddressComponent(reverseGeocodeApi, "country"),
        };
        try {
          await reportRegister(newMarker);
          setMarkers((markers) => [...markers, newMarker]);
        } catch (err) {
          console.log(err);
        }

        activeOnClickRef.current = false;
        setIsActiveOnClick(false);
        setValueDialog(null);
      }
    },
  });

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

  const [isActiveOnClick, setIsActiveOnClick] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [valueDialog, setValueDialog] = useState(null);
  const isActiveOnClickRef = useRef(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenDialog = () => setOpenDialog(true);

  const handleCloseDialog = async (e) => {
    setOpenDialog(false);
    if (!e) return;

    if (!e.needOnClick) {
      const { needOnClick, ...reporteDTO } = e;
      try {
        await reportRegister(reporteDTO);
      } catch (err) {
        console.error(err);
      }
    } else {
      setValueDialog(e);
      setIsActiveOnClick(true);
      isActiveOnClickRef.current = true;
    }
  };

  const { isLoggedIn, user, logout } = useAuth();

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
      <MapContainer center={position} zoom={14} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <InitialFetch setMarkers={setMarkers} />
        {markers.map((marker, index) => (
          <CustomizeMarker key={marker.id ?? index} marker={marker} />
        ))}

        {/* Reemplaza OnClickMap */}
        <MapEventHandler
          activeOnClickRef={isActiveOnClickRef}
          setMarkers={setMarkers}
          setIsActiveOnClick={setIsActiveOnClick}
          valueDialog={valueDialog}
          setValueDialog={setValueDialog}
        />

        {isLoggedIn ? (
          <>
            <Fab
              size={isMobile ? "small" : "medium"}
              onClick={logout}
              sx={{
                ...fabStyle,
                position: "absolute",
                top: isMobile ? 10 : 20,
                right: isMobile ? 10 : 20,
              }}
            >
              <LogoutIcon fontSize={isMobile ? "small" : "medium"} />
            </Fab>
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
            <Fab
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
            <ReportDialog open={openDialog} onClose={handleCloseDialog} />
          </>
        ) : (
          <>
            <Fab
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

            <Fab
              variant="extended"
              size={isMobile ? "small" : "medium"}
              onClick={() => navigate("/login")}
              sx={{
                ...fabStyle,
                position: "absolute",
                top: isMobile ? 10 : 20,
                right: isMobile ? 110 : 200,
                fontSize: isMobile ? "0.7rem" : "0.875rem",
              }}
            >
              {isMobile ? "Ingresar" : "Iniciar Sesión"}
            </Fab>

            <Fab
              variant="extended"
              size={isMobile ? "small" : "medium"}
              onClick={() => navigate("/register")}
              sx={{
                ...fabStyle,
                position: "absolute",
                top: isMobile ? 10 : 20,
                right: isMobile ? 10 : 20,
                fontSize: isMobile ? "0.7rem" : "0.875rem",
              }}
            >
              {isMobile ? "Registro" : "Crear Usuario"}
            </Fab>
          </>
        )}

        {/*<OnClickMap activeOnClick={isActiveOnClick} setMarkers={setMarkers} setIsActiveOnClick={setIsActiveOnClick} valueDialog={valueDialog} setValueDialog={setValueDialog} />*/}
      </MapContainer>
    </Layout>
  );
}

export default Principal;
