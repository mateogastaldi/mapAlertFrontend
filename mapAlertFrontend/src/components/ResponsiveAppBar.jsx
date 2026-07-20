import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import LogoutIcon from "@mui/icons-material/Logout";
import ButtonAcceptBase from "./ButtonAcceptBase";
import ButtonCancelBase from "./ButtonCancelBase";
import logo from "../assets/logo png.png";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import pallette from "../styled-components/pallette";

function ResponsiveAppBar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openLogoutConfirm, setOpenLogoutConfirm] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (path) => {
    handleCloseUserMenu();
    navigate(path);
  };

  const handleLogoutClick = () => {
    handleCloseUserMenu();
    setOpenLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    setOpenLogoutConfirm(false);
    logout();
    navigate("/");
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!user) return "";
    const first = user.firstName ? user.firstName.charAt(0) : "";
    const last = user.lastName ? user.lastName.charAt(0) : "";
    return (first + last).toUpperCase() || user.username.charAt(0).toUpperCase();
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          bgcolor: pallette.secondary,
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          height: {
            xl: "65px",
            lg: "65px",
            md: "65px",
            sm: "65px",
            xs: "56px",
          },
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        color="default"
      >
        <Container>
          <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Logo & Brand */}
            <Box
              onClick={() => navigate("/")}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                height: {
                  xl: "65px",
                  lg: "65px",
                  md: "65px",
                  sm: "65px",
                  xs: "56px",
                },
              }}
            >
              <Box
                component="img"
                src={logo}
                sx={{
                  height: "85%",
                  objectFit: "contain",
                }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  ml: 1.5,
                  fontWeight: 700,
                  color: pallette.primary,
                  letterSpacing: ".05rem",
                  display: { xs: "none", sm: "block" }
                }}
              >
                MapAlert
              </Typography>
            </Box>

            {/* User Menu / Auth Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {isLoggedIn ? (
                <>
                  {/* Profile Avatar button */}
                  <Tooltip title="Mi Cuenta">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ bgcolor: pallette.primary, color: "white", fontWeight: "bold", fontSize: "0.9rem" }}>
                        {getInitials()}
                      </Avatar>
                    </IconButton>
                  </Tooltip>

                  {/* Circular Logout icon button to the right of Avatar (Green border and color) */}
                  <Tooltip title="Cerrar Sesión">
                    <IconButton
                      onClick={handleLogoutClick}
                      sx={{
                        color: pallette.primary,
                        border: `1.5px solid ${pallette.primary}`,
                        bgcolor: "transparent",
                        "&:hover": {
                          bgcolor: "rgba(1, 150, 75, 0.08)",
                          borderColor: pallette.primary,
                        },
                        width: "36px",
                        height: "36px",
                      }}
                    >
                      <LogoutIcon sx={{ fontSize: "1.2rem" }} />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    PaperProps={{
                      sx: {
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        minWidth: "150px",
                      }
                    }}
                  >
                    <MenuItem onClick={() => handleNavigate("/profile")}>
                      <Typography sx={{ textAlign: "center", fontSize: "0.9rem" }}>Mi Perfil</Typography>
                    </MenuItem>
                    {user?.role === "ADMIN" && (
                      <MenuItem onClick={() => handleNavigate("/admin")}>
                        <Typography sx={{ textAlign: "center", fontSize: "0.9rem", color: pallette.primary, fontWeight: 600 }}>
                          Panel Admin
                        </Typography>
                      </MenuItem>
                    )}
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                    sx={{
                      textTransform: "none",
                      borderRadius: "10px",
                      bgcolor: pallette.primary,
                      "&:hover": { bgcolor: "#01783c" }
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/register")}
                    sx={{
                      textTransform: "none",
                      borderRadius: "10px",
                      borderColor: pallette.primary,
                      color: pallette.primary,
                      "&:hover": {
                        borderColor: pallette.primary,
                        bgcolor: "rgba(1, 150, 75, 0.05)"
                      }
                    }}
                  >
                    Crear Usuario
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Logout Confirmation Dialog with green, rounded buttons */}
      <Dialog
        open={openLogoutConfirm}
        onClose={() => setOpenLogoutConfirm(false)}
        PaperProps={{ sx: { borderRadius: "12px", p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Cerrar Sesión</DialogTitle>
        <DialogContent>
          <DialogContentText color="text.primary">
            ¿Estás seguro de que deseas cerrar tu sesión en MapAlert?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <ButtonCancelBase
            text="Cancelar"
            onClick={() => setOpenLogoutConfirm(false)}
            sx={{ bgcolor: pallette.primary, "&:hover": { bgcolor: "#01783c" } }}
          />
          <ButtonAcceptBase
            text="Cerrar Sesión"
            onClick={handleLogoutConfirm}
            sx={{ bgcolor: pallette.primary, "&:hover": { bgcolor: "#01783c" } }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ResponsiveAppBar;
