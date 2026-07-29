import CarCrashIcon from "@mui/icons-material/CarCrash";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import ConstructionIcon from "@mui/icons-material/Construction";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import PlaceIcon from "@mui/icons-material/Place";

export const INCIDENT_TYPES = [
  {
    reportType: "ACCIDENTE",
    title: "Accidente de tráfico",
    icon: CarCrashIcon,
    color: "#e53935",
  },
  {
    reportType: "CALLE_SIN_LUZ",
    title: "Calle sin luz",
    icon: LightbulbCircleIcon,
    color: "#546e7a",
  },
  {
    reportType: "CORTE_DE_LUZ",
    title: "Corte de electricidad",
    icon: ElectricalServicesIcon,
    color: "#fb8c00",
  },
  {
    reportType: "BACHE",
    title: "Bache",
    icon: ConstructionIcon,
    color: "#6d4c41",
  },
  {
    reportType: "FALTA_DE_AGUA",
    title: "Falta de suministro de Agua",
    icon: WaterDropIcon,
    color: "#1e88e5",
  },
  {
    reportType: "BASURA",
    title: "Basura acumulada",
    icon: DeleteSweepIcon,
    color: "#8e24aa",
  },
];

export const DEFAULT_INCIDENT = {
  reportType: "OTRO",
  title: "Otro",
  icon: PlaceIcon,
  color: "#9e9e9e",
};

export function getIncidentType(reportType) {
  return INCIDENT_TYPES.find((incident) => incident.reportType === reportType) || DEFAULT_INCIDENT;
}
