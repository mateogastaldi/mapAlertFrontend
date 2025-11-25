import React from "react";
import { Button } from "@mui/material";

export default function ButtonAcceptBase({text, mr,mt,mb,m,ml,mw,mx, sx}){
    const texto = text ? text : "Aceptar";
    return(
        <Button variant="contained" sx={{
        backgroundColor: "#01964bff",
        width: {
          xs: "90%",   // móvil
          sm: "70%",    // tablet
          md: "50%", // escritorio
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
        ...sx,
      }}
    >{texto}</Button>
    )
}