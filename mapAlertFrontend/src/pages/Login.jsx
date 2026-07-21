import { Container, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInputBase from "../components/TextInputBase";
import logo from "../assets/logo.png";
import PasswordInputBase from "../components/PassworInputBase";
import ButtonAcceptBase from "../components/ButtonAcceptBase";
import ButtonCancelBase from "../components/ButtonCancelBase";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../utilities/errorMessage";

const marginTop = "13px";
const marginBottom = "13px";
const maxWidth = "20rem";
const maxWidthBottom = "8rem";
const marginXButton = "8px";

function Login() {
    const [openCancelDialog, setOpenCancelDialog] = useState(false);
    const [openIncompleteDialog, setOpenIncompleteDialog] = useState(false);
    const [openRegisterSuggestDialog, setOpenRegisterSuggestDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = async () => {
        if (!form.username.trim() || !form.password.trim()) {
            setOpenIncompleteDialog(true);
            return;
        }

        try {
            await login(form);
            navigate("/");
        } catch (err) {
            console.error(err);
            setErrorMessage(getErrorMessage(err, "Usuario o contraseña incorrectos."));
            setOpenRegisterSuggestDialog(true);
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

                {/* Cancel Login Dialog */}
                <Dialog
                    open={openCancelDialog}
                    onClose={() => setOpenCancelDialog(false)}
                    PaperProps={{ sx: { borderRadius: "12px", p: 1 } }}
                >
                    <DialogTitle sx={{ fontWeight: 'bold' }}>Cancelar Inicio de sesión</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Está seguro que quiere cancelar?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ p: 2, gap: 1 }}>
                        <ButtonCancelBase
                            text="No"
                            onClick={() => setOpenCancelDialog(false)}
                            sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
                        />
                        <ButtonAcceptBase
                            text="Sí"
                            onClick={() => navigate('/')}
                            sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
                        />
                    </DialogActions>
                </Dialog>

                {/* Incomplete Fields Dialog */}
                <Dialog
                    open={openIncompleteDialog}
                    onClose={() => setOpenIncompleteDialog(false)}
                    PaperProps={{ sx: { borderRadius: "12px", p: 1 } }}
                >
                    <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }}>Campos incompletos</DialogTitle>
                    <DialogContent>
                        <DialogContentText color="text.primary">
                            Por favor completa todos los campos requeridos para iniciar sesión.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <ButtonAcceptBase
                            text="Aceptar"
                            mw="80px"
                            onClick={() => setOpenIncompleteDialog(false)}
                            sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
                        />
                    </DialogActions>
                </Dialog>

                {/* Incorrect Credentials / Suggest Register Dialog */}
                <Dialog
                    open={openRegisterSuggestDialog}
                    onClose={() => setOpenRegisterSuggestDialog(false)}
                    PaperProps={{ sx: { borderRadius: "12px", p: 1 } }}
                >
                    <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }}>Credenciales erróneas</DialogTitle>
                    <DialogContent>
                        <DialogContentText color="text.primary">
                            {errorMessage}
                        </DialogContentText>
                        <DialogContentText color="text.secondary" sx={{ mt: 1 }}>
                            ¿No tienes una cuenta aún? ¿Deseas registrarte?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ p: 2, gap: 1 }}>
                        <ButtonCancelBase
                            text="Reintentar"
                            onClick={() => setOpenRegisterSuggestDialog(false)}
                            sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
                        />
                        <ButtonAcceptBase
                            text="Registrarse"
                            onClick={() => navigate('/register')}
                            sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
                        />
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
}

export default Login;
