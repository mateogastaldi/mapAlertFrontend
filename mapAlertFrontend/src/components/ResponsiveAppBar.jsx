import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
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
import logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getUserInitials } from "../utilities/getUserInitials";
import { APP_BAR_HEIGHT } from "../theme/theme";

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

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          height: APP_BAR_HEIGHT,
          boxShadow: "0 2px 12px rgba(1, 150, 75, 0.08)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        color="default"
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            minHeight: "unset !important",
            px: { xs: 2, sm: 4, md: 8 },
          }}
        >
          {/* Logo & Brand */}
          <Box
            onClick={() => navigate("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              height: "100%",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="MapAlert"
              sx={{
                height: "70%",
                objectFit: "contain",
              }}
            />
            <Typography
              noWrap
              sx={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                fontSize: "1.25rem",
                letterSpacing: "-0.01em",
                color: "primary.main",
                display: { xs: "none", sm: "block" },
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
                    <Avatar sx={{ bgcolor: "primary.main", color: "primary.contrastText", fontWeight: "bold", fontSize: "0.9rem" }}>
                      {getUserInitials(user)}
                    </Avatar>
                  </IconButton>
                </Tooltip>

                {/* Logout: Ghost button per design system (no fill, signal-green icon) */}
                <Tooltip title="Cerrar Sesión">
                  <IconButton
                    onClick={handleLogoutClick}
                    sx={{
                      color: "primary.main",
                      bgcolor: "transparent",
                      "&:hover": {
                        bgcolor: "rgba(1, 150, 75, 0.08)",
                      },
                      width: 36,
                      height: 36,
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
                      <Typography sx={{ textAlign: "center", fontSize: "0.9rem", color: "primary.main", fontWeight: 600 }}>
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
                  color="primary"
                  onClick={() => navigate("/login")}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/register")}
                  sx={{
                    borderColor: "secondary.main",
                    color: "secondary.main",
                    "&:hover": {
                      borderColor: "secondary.main",
                      bgcolor: "rgba(52, 58, 64, 0.05)"
                    }
                  }}
                >
                  Crear Usuario
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogoutConfirm}
        onClose={() => setOpenLogoutConfirm(false)}
        PaperProps={{ sx: { p: 1 } }}
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
            sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
          />
          <ButtonAcceptBase
            text="Cerrar Sesión"
            onClick={handleLogoutConfirm}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ResponsiveAppBar;
