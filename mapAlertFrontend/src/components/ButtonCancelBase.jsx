import React from "react";
import { Button } from "@mui/material";

export default function ButtonCancelBase({ text, mr, mt, mb, m, ml, mw, mx, onClick, sx }) {
    const texto = text ? text : "Cancelar";
    return (
        <Button
            variant="contained"
            color="error"
            onClick={onClick}
            sx={{
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
        >
            {texto}
        </Button>
    )
}
