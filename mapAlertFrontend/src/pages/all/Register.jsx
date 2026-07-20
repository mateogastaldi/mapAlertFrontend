import { Container, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInputBase from "../../components/TextInputBase";
import logo from "../../assets/logo png.png";
import PasswordInputBase from "../../components/PassworInputBase";
import ButtonAcceptBase from "../../components/ButtonAcceptBase";
import ButtonCancelBase from "../../components/ButtonCancelBase";
import { useAuth } from "../../hooks/useAuth";
import pallette from "../../styled-components/pallette";

const marginTop = "13px";
const marginBottom = "13px";
const maxWidth = "20rem";
const maxWidthBottom = "8rem";
const marginXButton = "8px";

function Register() {
    const [openCancelDialog, setOpenCancelDialog] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const [form, setForm] = useState({
        username: "",
        password: "",
        repeatPassword: "",
        firstName: "",
        lastName: "",
        email: "",
    });

    // Custom Alert Dialog state
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const showAlert = (msg) => {
        setAlertMessage(msg);
        setOpenAlertDialog(true);
    };

    const handleSubmit = async () => {
        if (!form.username || !form.firstName || !form.lastName || !form.email || !form.password || !form.repeatPassword) {
            showAlert("Por favor completa todos los campos requeridos.");
            return;
        }

        if (form.password !== form.repeatPassword) {
            showAlert("Las contraseñas no coinciden.");
            return;
        }

        const hasUppercase = /[A-Z]/.test(form.password);
        const isMinLength = form.password.length >= 8;

        if (!isMinLength || !hasUppercase) {
            showAlert("La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula.");
            return;
        }

        try {
            await register({
                username: form.username,
                password: form.password,
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
            });
            window.location.href = "/";
        } catch (err) {
            console.error(err);
            const serverMsg = err.response?.data?.message || err.response?.data?.reason || (typeof err.response?.data === 'string' ? err.response.data : null);
            showAlert(serverMsg || "El usuario y/o email ya se encuentran registrados");
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

                <TextInputBase
                    nombre="Usuario"
                    value={form.username}
                    mt={marginTop}
                    mb={marginBottom}
                    required={true}
                    mw={maxWidth}
                    onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                    }
                />

                <TextInputBase
                    nombre="Nombre"
                    value={form.firstName}
                    mt={marginTop}
                    mb={marginBottom}
                    required={true}
                    mw={maxWidth}
                    onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                    }
                />

                <TextInputBase
                    nombre="Apellido"
                    value={form.lastName}
                    mt={marginTop}
                    mb={marginBottom}
                    required={true}
                    mw={maxWidth}
                    onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                    }
                />

                <TextInputBase
                    nombre="Email"
                    value={form.email}
                    mt={marginTop}
                    mb={marginBottom}
                    type="email"
                    required={true}
                    mw={maxWidth}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <PasswordInputBase
                    nombre="Contraseña"
                    value={form.password}
                    mt={marginTop}
                    mb={marginBottom}
                    required={true}
                    mw={maxWidth}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <PasswordInputBase
                    nombre="Repetir contraseña"
                    value={form.repeatPassword}
                    mt={marginTop}
                    mb={marginBottom}
                    required={true}
                    mw={maxWidth}
                    onChange={(e) =>
                        setForm({ ...form, repeatPassword: e.target.value })
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
                        onClick={handleSubmit}
                    />
                </Box>

                {/* Cancel Registration Dialog */}
                <Dialog
                    open={openCancelDialog}
                    onClose={() => setOpenCancelDialog(false)}
                    PaperProps={{ sx: { borderRadius: "12px", p: 1 } }}
                >
                    <DialogTitle sx={{ fontWeight: 'bold' }}>Cancelar Registro</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Está seguro que quiere cancelar?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ p: 2, gap: 1 }}>
                        <ButtonCancelBase
                            text="No"
                            onClick={() => setOpenCancelDialog(false)}
                            sx={{ bgcolor: pallette.primary, "&:hover": { bgcolor: "#01783c" } }}
                        />
                        <ButtonAcceptBase
                            text="Sí"
                            onClick={() => navigate('/')}
                            sx={{ bgcolor: pallette.primary, "&:hover": { bgcolor: "#01783c" } }}
                        />
                    </DialogActions>
                </Dialog>

                {/* Alert Dialog */}
                <Dialog
                    open={openAlertDialog}
                    onClose={() => setOpenAlertDialog(false)}
                    PaperProps={{ sx: { borderRadius: "12px", p: 1 } }}
                >
                    <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }}>Atención</DialogTitle>
                    <DialogContent>
                        <DialogContentText color="text.primary">
                            {alertMessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <ButtonAcceptBase text="Aceptar" mw="80px" onClick={() => setOpenAlertDialog(false)} />
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
}

export default Register;