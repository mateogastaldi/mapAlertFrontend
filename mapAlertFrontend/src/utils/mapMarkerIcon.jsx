import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { getIncidentType } from "../constants/incidentTypes";

const PIN_SIZE = 34;

export function createIncidentMarkerIcon(reportType) {
  const incident = getIncidentType(reportType);
  const Icon = incident.icon;

  const html = ReactDOMServer.renderToStaticMarkup(
    <span className="incident-pin">
      <span className="incident-pin__body" style={{ background: incident.color }}>
        <span className="incident-pin__icon">
          <Icon style={{ fontSize: 18, color: "#fff" }} />
        </span>
      </span>
    </span>
  );

  return L.divIcon({
    html,
    className: "incident-pin-wrapper",
    iconSize: [PIN_SIZE, PIN_SIZE],
    iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
    popupAnchor: [0, -PIN_SIZE],
  });
}
