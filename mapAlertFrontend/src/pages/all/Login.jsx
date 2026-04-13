import { Container, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInputBase from "../../components/TextInputBase";
import logo from "../../assets/logo png.png";
import PasswordInputBase from "../../components/PassworInputBase";
import ButtonAcceptBase from "../../components/ButtonAcceptBase";
import ButtonCancelBase from "../../components/ButtonCancelBase";
import { register } from "../../services/authService";

const marginTop = "13px";
const marginBottom = "13px";
const maxWidth = "20rem";
const maxWidthBottom = "8rem";
const marginXButton = "8px";

function Login() {
    const [openCancelDialog, setOpenCancelDialog] = useState(false);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        usuario: "",
        contrasena: ""
    });

    const handleSubmit = async () => {
        try {
            console.log(form);
            await register(form);
            alert("Usuario creado correctamente");

            // opcional: redirigir al login
            window.location.href = "/login";

        } catch (err) {
            console.error(err); // 🔥 VER ERROR REAL
            alert(err.response?.data?.message || "Error al iniciar sesion");
        }
    };

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: {
                        xs: "90%",
                        sm: "70%",
                        md: "60%",
                        lg: "50%",
                        xl: "40%",
                    },
                }}
            >
                <Box
                    component="img"
                    src={logo}
                    alt="Logo"
                    sx={{
                        width: "100%",
                        objectFit: "contain",
                    }}
                />

                {/* 🔥 AGREGADO: usuario */}
                <TextInputBase
                    nombre="Usuario"
                    mt={marginTop}
                    mb={marginBottom}
                    required={true}
                    mw={maxWidth}
                    onChange={(e) =>
                        setForm({ ...form, usuario: e.target.value })
                    }
                />

                <PasswordInputBase
                    nombre="Contraseña"
                    mt={marginTop}
                    mb={marginBottom}
                    required={true}
                    mw={maxWidth}
                    onChange={(e) =>
                        setForm({ ...form, contrasena: e.target.value })
                    }
                />

                <Box
                    sx={{
                        width: "100%",
                        maxWidth: maxWidth,
                    }}
                >
                    <ButtonCancelBase
                        mt={marginTop}
                        mb={marginBottom}
                        mw={maxWidthBottom}
                        mx={marginXButton}
                        onClick={() => setOpenCancelDialog(true)}
                    />

                    <ButtonAcceptBase
                        mt={marginTop}
                        mb={marginBottom}
                        mw={maxWidthBottom}
                        mx={marginXButton}
                        onClick={handleSubmit} // 🔥 clave

                    />
                </Box>
                <Dialog open={openCancelDialog} onClose={() => setOpenCancelDialog(false)}>
                    <DialogTitle sx={{ fontWeight: 'bold' }}>Cancelar Inicio de sesion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Está seguro que quiere cancelar?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenCancelDialog(false)} color="primary">
                            No
                        </Button>
                        <Button onClick={() => navigate('/')} color="error" autoFocus>
                            Sí
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
}

export default Login;
