import React, { useState } from "react";
import Layout from "../../components/Layout";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useMapEvents } from 'react-leaflet/hooks';
import AddIcon from '@mui/icons-material/Add';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import "leaflet/dist/leaflet.css";
import "./styles.css";
import CustomizeMarker from "../../components/CustomizeMarker";
import { Fab } from "@mui/material";
import pallette from "../../styled-components/pallette.jsx"
import ReportDialog from "../../components/ReportDialog.jsx";
import { reverseGeocode } from "../../services/googleApi.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getReportsByBounds } from "../../services/reporteService.js";

const position = [-31.6353, -60.7031];

const getAddressComponent = (address, type) => {
    const component = address.address_components.find(a => a.types[0].includes(type));
    return component ? component.long_name : "";
}


const handleReverseGeocodeApi = async (e) => {
    const result = await reverseGeocode(e.latlng.lat, e.latlng.lng);
    return result;
}

function OnClickMap({ activeOnClick, setMarkers, setIsActiveOnClick, valueDialog, setValueDialog }) {
    const map = useMapEvents({
        click: async (e) => {
            if (activeOnClick) {
                const reverseGeocodeApi = await handleReverseGeocodeApi(e);
                const newMarker = {
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                    report_type: valueDialog.report_type,
                    report_description: valueDialog.report_description,
                    street: getAddressComponent(reverseGeocodeApi, "route"),
                    street_number: getAddressComponent(reverseGeocodeApi, "street_number"),
                    city: getAddressComponent(reverseGeocodeApi, "locality"),
                    state: getAddressComponent(reverseGeocodeApi, "administrative_area_level_1"),
                    country: getAddressComponent(reverseGeocodeApi, "country"),
                };
                setMarkers((markers) => [...markers, newMarker]);
                setIsActiveOnClick(false);
                setValueDialog(null);
            }
        }
    });
    return null;
}

function MapEventHandler({ activeOnClick, setMarkers, setIsActiveOnClick, valueDialog, setValueDialog }) {
    
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
            if (activeOnClick) {
                const reverseGeocodeApi = await handleReverseGeocodeApi(e);
                const newMarker = {
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                    report_type: valueDialog.report_type,
                    report_description: valueDialog.report_description,
                    street: getAddressComponent(reverseGeocodeApi, "route"),
                    street_number: getAddressComponent(reverseGeocodeApi, "street_number"),
                    city: getAddressComponent(reverseGeocodeApi, "locality"),
                    state: getAddressComponent(reverseGeocodeApi, "administrative_area_level_1"),
                    country: getAddressComponent(reverseGeocodeApi, "country"),
                };
                setMarkers((markers) => [...markers, newMarker]);
                setIsActiveOnClick(false);
                setValueDialog(null);
            }
        }
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

    const [markers, setMarkers] = useState([
        {
            lat: -31.6353,
            lng: -60.7031,
            report_type: "Calle sin luz",
            report_description: "Calle sin luz desde las 22hs",
            street: "location.street",
            street_number: "location.street_number",
            city: "location.city",
            state: "location.state",
            country: "location.country",

        },
        {
            lat: -31.63,
            lng: -60.70,
            report_type: "Bache",
            report_description: "Luz cortada desde las 22hs",
            street: "",
            street_number: "location.street_number",
            city: "location.city",
            state: "location.state",
            country: "location.country",
        },
        {
            lat: -31.64,
            lng: -60.70,
            report_type: "Corte de electricidad",
            report_description: "Luz cortada desde las 22hs",
            street: "",
            street_number: "",
            city: "",
            state: "",
            country: "",
        },

    ]);

    const [isActiveOnClick, setIsActiveOnClick] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [valueDialog, setValueDialog] = useState(null);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = (e) => {
        setOpenDialog(false);
        setValueDialog(e);
        e.needOnClick || e.needOnClick === undefined ? setIsActiveOnClick(true) : setIsActiveOnClick(false);
        if (!e.needOnClick) {
            const { needOnClick, ...newMarker } = e;
            setMarkers((markers) => [...markers, newMarker]);
        }
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
                    activeOnClick={isActiveOnClick}
                    setMarkers={setMarkers}
                    setIsActiveOnClick={setIsActiveOnClick}
                    valueDialog={valueDialog}
                    setValueDialog={setValueDialog}
                />
                <Fab
                    variant='extended'
                    onClick={handleOpenDialog}
                    sx={{
                        position: "absolute",
                        bottom: 40,
                        right: 90,
                        zIndex: 1000,
                        bgcolor: pallette.primary,
                        color: pallette.secondary,
                        borderColor: pallette.secondary,
                        "&:hover": {
                            bgcolor: pallette.secondary,
                            color: pallette.primary,
                            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                        },
                        "&:active": {
                            bgcolor: pallette.secondary,
                            transform: 'scale(0.95)',
                            transition: 'transform 0.1s ease'
                        },
                        ".Mui-focusVisible": {
                            color: pallette.primary,
                            bgcolor: pallette.primary
                        }

                    }}
                >
                    <AddIcon />

                </Fab>
                <Fab
                    variant="extended"
                    sx={{
                        position: "absolute",
                        bottom: 40,
                        right: 20,
                        zIndex: 1000,
                        bgcolor: pallette.primary,
                        color: pallette.secondary,
                        borderColor: pallette.secondary,
                        objectFit: 'contain',
                        "&:hover": {
                            bgcolor: pallette.secondary,
                            color: pallette.primary,
                            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                        },
                        "&:active": {
                            bgcolor: pallette.secondary,
                            transform: 'scale(0.95)',
                            transition: 'transform 0.1s ease'
                        },
                        ".Mui-focusVisible": {
                            color: pallette.primary,
                            bgcolor: pallette.primary
                        }
                    }}

                >
                    <FilterAltOutlinedIcon />

                </Fab>

                <Fab
                    variant="extended"
                    onClick={() => navigate('/login')}
                    sx={{
                        position: "absolute",
                        top: 20,
                        right: 200,
                        zIndex: 1000,
                        bgcolor: pallette.primary,
                        color: pallette.secondary,
                        borderColor: pallette.secondary,
                        "&:hover": {
                            bgcolor: pallette.secondary,
                            color: pallette.primary,
                            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                        },
                        "&:active": {
                            bgcolor: pallette.secondary,
                            transform: 'scale(0.95)',
                            transition: 'transform 0.1s ease'
                        },
                        ".Mui-focusVisible": {
                            color: pallette.primary,
                            bgcolor: pallette.primary
                        }
                    }}
                >
                    Iniciar Sesión
                </Fab>

                <Fab
                    variant="extended"
                    onClick={() => navigate('/register')}
                    sx={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        zIndex: 1000,
                        bgcolor: pallette.primary,
                        color: pallette.secondary,
                        borderColor: pallette.secondary,
                        "&:hover": {
                            bgcolor: pallette.secondary,
                            color: pallette.primary,
                            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                        },
                        "&:active": {
                            bgcolor: pallette.secondary,
                            transform: 'scale(0.95)',
                            transition: 'transform 0.1s ease'
                        },
                        ".Mui-focusVisible": {
                            color: pallette.primary,
                            bgcolor: pallette.primary
                        }
                    }}
                >
                    Crear Usuario
                </Fab>
                <ReportDialog open={openDialog} onClose={handleCloseDialog} />

                {/*<OnClickMap activeOnClick={isActiveOnClick} setMarkers={setMarkers} setIsActiveOnClick={setIsActiveOnClick} valueDialog={valueDialog} setValueDialog={setValueDialog} />*/}
            </MapContainer>
        </Layout>

    )
}

export default Principal;
