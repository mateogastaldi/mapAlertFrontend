import React from "react";
import { Button } from "@mui/material";
import pallette from "../styled-components/pallette";

export default function ButtonAcceptBase({
  text,
  mr,
  mt,
  mb,
  m,
  ml,
  mw,
  mx,
  sx,
  onClick // 🔥 IMPORTANTE
}) {
  const texto = text ? text : "Aceptar";

  return (
    <Button
      variant="contained"
      onClick={onClick} // 🔥 esto hace que funcione el botón
      sx={{
        backgroundColor: pallette.primary,
        width: {
          xs: "90%",   // móvil
          sm: "70%",   // tablet
          md: "50%",   // escritorio
          lg: mw,
          xl: mw
        },
        maxWidth: mw,
        marginTop: mt,
        marginRight: mr,
        marginBottom: mb,
        marginLeft: ml,
        margin: m,
        marginX: mx,
        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
        padding: { xs: "6px 12px", sm: "8px 16px", md: "10px 20px" },
        borderRadius: "20px", // Redondeado
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#01783c",
        },
        ...sx,
      }}
    >
      {texto}
    </Button>
  );
}