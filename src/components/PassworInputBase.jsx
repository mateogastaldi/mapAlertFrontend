import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PasswordInputBase({
  nombre,
  mr,
  mt,
  mb,
  m,
  ml,
  required,
  mw,
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      sx={{
        display: "flex",
        maxWidth: mw,
        width: {
          xs: "90%",
          sm: "70%",
          md: "50%",
          lg: mw,
          xl: mw,
        },
        margin: m,
        marginTop: mt,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        color: "#01964bff",
      }}
      variant="outlined"
      required={required}
    >
      <InputLabel
        htmlFor="outlined-adornment-password"
        sx={{ color: "#03723bff", "&.Mui-focused": { color: "#01964bff" } }}
      >
        {nombre}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "display the password"
              }
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
              sx={{ color: "#01964bff" }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
        sx={{
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#01964bff" },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#01964bff",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#01964bff",
          },
        }}
      />
    </FormControl>
  );
}
