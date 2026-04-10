import { TextField } from "@mui/material";
import React from "react";
import pallette from "../styled-components/pallette";

function TextInputBase({
    nombre,
    mr,
    mt,
    mb,
    m,
    ml,
    type,
    required,
    mw,
    onChange, // 🔥 AGREGAR
    value      // 🔥 opcional pero recomendable
}) {
    return (
        <TextField
            id="outlined-basic"
            label={nombre}
            variant="outlined"
            type={type}
            required={required}
            onChange={onChange} // 🔥 CLAVE
            value={value}       // 🔥 opcional
            sx={{
                maxWidth: mw,
                width: {
                    xs: "90%",
                    sm: "70%",
                    md: "50%",
                    lg: mw,
                    xl: mw
                },
                margin: m,
                marginTop: mt,
                marginBottom: mb,
                marginLeft: ml,
                marginRight: mr,
                "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: pallette.primary },
                    "&:hover fieldset": { borderColor: pallette.primary },
                    "&.Mui-focused fieldset": { borderColor: pallette.primary }
                },
                "& .MuiInputLabel-root": { color: pallette.primary },
                "&:hover .MuiInputLabel-root": { color: pallette.primary },
                "& .MuiInputLabel-root.Mui-focused": {
                    color: pallette.primary
                }
            }}
        />
    );
}

export default TextInputBase;
/*import { InputBase, makeStyles, TextField } from "@mui/material";
import React from "react";


function TextInputBase({nombre,mr,mt,mb,m,ml,type,required,mw}){
    return(
        <TextField id="outlined-basic" label={nombre} variant="outlined" type={type} required={required} sx={{
            maxWidth:mw,
            width: {
              xs: "90%",
              sm: "70%",
              md: "50%",
              lg: mw,
              xl: mw
            },
            margin:m,
            marginTop:mt,
            marginBottom:mb,
            marginLeft:ml,
            marginRight:mr,
            "& .MuiOutlinedInput-root":{
                "& fieldset":{borderColor:"#01964bff"},
                "&:hover fieldset":{borderColor:"#01964bff"},
                "&.Mui-focused fieldset":{borderColor:"#01964bff"}
            },
            "& .MuiInputLabel-root":{color:"#01964bff"},
            "&:hover .MuiInputLabel-root":{color:"#01964bff"},
            "& .MuiInputLabel-root.Mui-focused": {  color: "#01964bff"}

        }} />
    )
}

export default TextInputBase;*/