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
        firstName: "",
        lastName: "",
        email: "",
    });

    const handleSubmit = async () => {
        try {
            await register(form);
            window.location.href = "/";
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Error al registrarse");
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
                    mt={marginTop}
                    mb={marginBottom}
                    required={true}
                    mw={maxWidth}
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
            </Box>
        </Container>
    );
}

export default Register;