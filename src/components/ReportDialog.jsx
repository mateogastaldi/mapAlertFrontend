import * as React from "react";
import "./styles.css";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Divider, Typography, Box, Button, TextField } from "@mui/material";
import CustomizeSelect from "./CustomizeSelect";
import CloseIcon from "@mui/icons-material/Close";
import pallette from "../styled-components/pallette";
import {
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useRef,  } from "react";


function ReportDialog({ open, onClose }) {
  const [valueReport, setValueReport] = React.useState(null);
  const [selectedCargarDireccion, setSelectedCargarDireccion] =
    React.useState(false);
  const [selectedElegirPunto, setSelectedElegirPunto] = React.useState(false);
  const [direction, setDirection] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState(null);

  const libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries,
  });

  const inputref = useRef(null);

  const handleClose = (value) => {
    onClose(value);
  };

  const handleCloseCross = () => {
    handleClose(null);
  };
  const handleAccept = () => {
    let valueAccept;
    if(selectedCargarDireccion){
      valueAccept = {
        street: location.street,
        street_number: location.street_number,
        city: location.city,
        state: location.state,
        country: location.country,
        lat: location.lat,
        lng: location.lng,
        report_type:valueReport,
        report_description: description,
        needOnClick: false
      }
    }else{
      valueAccept = {
        report_type:valueReport,
        report_description: description,
        needOnClick: true
      }
    }
    console.log("Value accept",valueAccept);
    handleClose(valueAccept);
  };

  const getAddressComponent = (address,type) => {
    const component = address.address_components.find(a => a.types[0].includes(type));
    return component ? component.long_name : "";
  }

  const handleOnPlacesChanged = () => {
    const address = (inputref.current.getPlaces())[0];
    if(address){
      console.log(address);
      const street = getAddressComponent(address,"route");
      const street_number = getAddressComponent(address,"street_number");
      const city = getAddressComponent(address,"locality");
      const country = getAddressComponent(address,"country");
      const state = getAddressComponent(address,"administrative_area_level_1");
      const lng = address.geometry.location.lng(); 
      const lat = address.geometry.location.lat();
      setDirection(address.formatted_address);
      setLocation({
        street:street,
        street_number:street_number,
        city:city,
        state:state,
        country:country,
        lat:lat,
        lng:lng
      })

    }
    
  };

  

  console.log(isLoaded);

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
          display: "block",
          marginY: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{
            height: "15px",
            width: "100%",
            m: 0,
            p: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingX: 0,
              paddingTop: 0,
              pb: 0,
            }}
          >
            Reportar Incidente
          </DialogTitle>
          <Button
            onClick={handleCloseCross}
            sx={{
              height: "100%",
              width: "5%",
              m: 0,
              p: 0,
              minWidth: 0,
              minHeight: 0,
            }}
          >
            <CloseIcon sx={{ height: "100%", width: "100%", m: 0, p: 0 }} />
          </Button>
        </Box>

        <Typography color="text.secondary">
          Ayuda a la comunidad reportando un incidente
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginY: 1,
        }}
      >
        <Typography variant="button text" sx={{ mt: 1, mb: 0.5 }}>
          Tipo de Incidente
        </Typography>
        <CustomizeSelect
          value={valueReport}
          onChange={(e) => setValueReport(e.target.value)}
          label="Incidente"
          sx={{ mt: 0.5, mb: 1 }}
        />
        {valueReport ? (
          <Box sx={{ mt: 1 }}>
            <Typography variant="button text">Ubicación</Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
                mt: 0.5,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedCargarDireccion(false);
                  setSelectedElegirPunto(true);
                  setDirection(null);
                }}
                sx={{
                  flex: 1,
                  mr: 1,
                  borderRadius: "12px",
                  borderColor: selectedElegirPunto
                    ? pallette.primary
                    : "rgba(0,0,0,0.23)",
                  color: selectedElegirPunto ? pallette.primary : "black",
                  "&:hover": {
                    borderColor: pallette.primary,
                    bgcolor: "transparent",
                    color: pallette.primary,
                  },
                  "&:active": {
                    borderColor: pallette.primary,
                    color: pallette.primary,
                  },
                  "&.Mui-focused": {
                    borderColor: pallette.primary,
                    color: pallette.primary,
                  },
                  "&.Mui-focusVisible": {
                    borderColor: pallette.primary,
                  },
                }}
              >
                Marcar en el mapa
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedCargarDireccion(true);
                  setSelectedElegirPunto(false);
                }}
                sx={{
                  flex: 1,
                  ml: 1,
                  borderRadius: "12px",
                  borderColor: selectedCargarDireccion
                    ? pallette.primary
                    : "rgba(0,0,0,0.23)",
                  color: selectedCargarDireccion ? pallette.primary : "black",
                  "&:hover": {
                    borderColor: pallette.primary,
                    bgcolor: "transparent",
                    color: pallette.primary,
                  },
                  "&:active": {
                    borderColor: pallette.primary,
                    color: pallette.primary,
                  },
                  "&.Mui-focused": {
                    borderColor: pallette.primary,
                    color: pallette.primary,
                  },
                  "&.Mui-focusVisible": {
                    borderColor: pallette.primary,
                  },
                }}
              >
                Ingresar direction
              </Button>
            </Box>
            {selectedCargarDireccion ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  mt: 1,
                  mb: 1,
                  p: 0,
                }}
              >
                <Typography variant="button text" sx={{ m: 0 }}>
                  Cargar dirección
                </Typography>
                {isLoaded && 
                  <StandaloneSearchBox
                    onLoad={(ref) => (inputref.current = ref)}
                    onPlacesChanged={handleOnPlacesChanged}
                  >
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      value={direction}
                      placeholder=""
                      onChange={(e) => setDirection(e.target.value)}
                      sx={{
                        width:"100%",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& fieldset": {
                            borderRadius: "12px",
                          },
                        },
                        mt: 0.5,
                      }}
                    />
                  </StandaloneSearchBox>
                }
              </Box>
            ) : (
              <></>
            )}
          </Box>
        ) : (
          <></>
        )}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography variant="button text" sx={{ m: 0, width: "100%" }}>
            Descripción
          </Typography>
          <TextField
            variant="outlined"
            size="medium"
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              width: "100%",
              mb: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "& fieldset": {
                  borderRadius: "12px",
                },
              },
            }}
          />

          <Button
            disabled={
              selectedCargarDireccion
                ? direction
                  ? false
                  : true
                : !selectedElegirPunto
            }
            sx={{
              bgcolor: pallette.primary,
              color: pallette.secondary,
              borderRadius: "12px",
              mt: 1,
            }}
            onClick={handleAccept}
          >
            ACEPTAR
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default ReportDialog;
