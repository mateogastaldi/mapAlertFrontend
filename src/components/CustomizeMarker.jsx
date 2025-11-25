import React from "react";
import { Popup, Marker } from "react-leaflet";
import { Box } from '@mui/material'
import L from "leaflet";

import pothole from "../assets/bache.png";
import powerOutage from "../assets/sin-luz.png";
import withOutElectricity from "../assets/sin-cargos.png";
import defaultMarker from "../assets/marca-de-ubicacion.png";
import accidenteDeTrafico from '../assets/accidente-de-auto.png';



export default function CustomizeMarker({marker}){
    const icon = {
        "Calle sin luz": powerOutage,
        "Bache": pothole,
        "Corte de electricidad": withOutElectricity,
        "Accidente de trafico": accidenteDeTrafico

    }

    const iconUrl = L.icon({
        iconUrl: icon[marker.report_type] || defaultMarker,
        iconSize:[40,40]
    })
    return(
        <Marker position={[marker.lat,marker.lng]} icon={iconUrl}>
            <Popup>
                <p>{marker.report_description}</p>
            </Popup>
        </Marker>
    );
    
}