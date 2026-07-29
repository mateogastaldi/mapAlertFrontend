import { TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";

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
    onChange,
    onBlur,
    value,
    error,
    helperText,
    infoText,
    maxLength,
}) {
    const [focused, setFocused] = useState(false);

    return (
        <Tooltip title={infoText || ""} open={Boolean(infoText) && focused} placement="right" arrow>
            <TextField
                id="outlined-basic"
                label={nombre}
                variant="outlined"
                type={type}
                required={required}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={(e) => {
                    setFocused(false);
                    onBlur?.(e);
                }}
                value={value}
                error={error}
                helperText={helperText}
                slotProps={{ htmlInput: { maxLength } }}
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
                        "& fieldset": { borderColor: "divider" },
                        "&:hover fieldset": { borderColor: "text.secondary" },
                        "&.Mui-focused fieldset": {
                            borderColor: "primary.main",
                            borderWidth: "1.5px",
                        },
                        "&.Mui-focused": {
                            boxShadow: (theme) => `0 0 0 3px ${theme.palette.primary.main}26`,
                        },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "primary.main"
                    }
                }}
            />
        </Tooltip>
    );
}

export default TextInputBase;
