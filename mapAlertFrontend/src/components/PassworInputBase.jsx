import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Tooltip from "@mui/material/Tooltip";
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
  onChange,
  onBlur,
  value,
  error,
  helperText,
  infoText,
  maxLength,
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Tooltip title={infoText || ""} open={Boolean(infoText) && focused} placement="right" arrow>
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
        }}
        variant="outlined"
        required={required}
        error={error}
      >
        <InputLabel
          htmlFor="outlined-adornment-password"
          sx={{ "&.Mui-focused": { color: "primary.main" } }}
        >
          {nombre}
        </InputLabel>

        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          value={value}
          inputProps={{ maxLength }}
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
                sx={{ color: "primary.main" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={nombre}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "text.secondary",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
              borderWidth: "1.5px",
            },
            "&.Mui-focused": {
              boxShadow: (theme) => `0 0 0 3px ${theme.palette.primary.main}26`,
            },
          }}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Tooltip>
  );
}
