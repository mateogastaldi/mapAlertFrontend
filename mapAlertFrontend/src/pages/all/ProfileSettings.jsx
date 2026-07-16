import React, { useState, useEffect } from "react";
import { Container, Box, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import TextInputBase from "../../components/TextInputBase";
import PasswordInputBase from "../../components/PassworInputBase";
import ButtonAcceptBase from "../../components/ButtonAcceptBase";
import ButtonCancelBase from "../../components/ButtonCancelBase";
import { useAuth } from "../../hooks/useAuth";
import { updateProfile, deleteAccount } from "../../services/usuarioService";
import pallette from "../../styled-components/pallette";

const marginTop = "13px";
const marginBottom = "13px";
const maxWidth = "20rem";
const maxWidthBottom = "8rem";

function ProfileSettings() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [openCancelDialog, setOpenCancelDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    // Custom styled Alert Dialog state
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertCallback, setAlertCallback] = useState(null);

    const showAlert = (msg, callback = null) => {
        setAlertMessage(msg);
        setAlertCallback(() => callback);
        setOpenAlertDialog(true);
    };

    const handleAlertClose = () => {
        setOpenAlertDialog(false);
        if (alertCallback) {
            alertCallback();
        }
    };

    const [form, setForm] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "******",
    });

    useEffect(() => {
        if (user) {
            setForm({
                username: user.username || "",
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                password: "******",
            });
        }
    }, [user]);

    const handleSave = async () => {
        // Validation: Fields must not be empty
        if (!form.username || !form.firstName || !form.lastName || !form.email) {
            showAlert("Campos incompletos");
            return;
        }

        // Validate password if modified
        if (form.password !== "******") {
            const hasUppercase = /[A-Z]/.test(form.password);
            const isMinLength = form.password.length >= 8;
            if (!isMinLength || !hasUppercase) {
                showAlert("La contraseña debe tener mínimo 8 caracteres y una mayúscula");
                return;
            }
        }

        try {
            await updateProfile(form);
            showAlert("Perfil actualizado correctamente", () => {
                navigate("/");
                window.location.reload(); // Refresh session info
            });
        } catch (err) {
            console.error(err);
            showAlert(err.response?.data?.message || "El Usuario y/o Mail ya están registrados");
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount();
            logout();
            navigate("/");
        } catch (err) {
            console.error(err);
            showAlert("Error al eliminar la cuenta");
        }
    };

    return (
        <Layout>
            <Container
                maxWidth="xl"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 4,
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
                        bgcolor: "background.paper",
                        boxShadow: 3,
                        borderRadius: "16px",
                        p: 4,
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: pallette.primary, mb: 3 }}>
                        Mi Perfil
                    </Typography>

                    <TextInputBase
                        nombre="Usuario"
                        value={form.username}
                        mt={marginTop}
                        mb={marginBottom}
                        required={true}
                        mw={maxWidth}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />

                    <TextInputBase
                        nombre="Nombre"
                        value={form.firstName}
                        mt={marginTop}
                        mb={marginBottom}
                        required={true}
                        mw={maxWidth}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    />

                    <TextInputBase
                        nombre="Apellido"
                        value={form.lastName}
                        mt={marginTop}
                        mb={marginBottom}
                        required={true}
                        mw={maxWidth}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    />

                    <TextInputBase
                        nombre="Email"
                        value={form.email}
                        mt={marginTop}
                        mb={marginBottom}
                        type="email"
                        required={true}
                        mw={maxWidth}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <PasswordInputBase
                        nombre="Contraseña"
                        value={form.password}
                        mt={marginTop}
                        mb={marginBottom}
                        required={true}
                        mw={maxWidth}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: maxWidth,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            mt: 3,
                        }}
                    >
                        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                            <ButtonCancelBase
                                mw={maxWidthBottom}
                                onClick={() => setOpenCancelDialog(true)}
                            />
                            <ButtonAcceptBase
                                text="Guardar"
                                mw={maxWidthBottom}
                                onClick={handleSave}
                            />
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setOpenDeleteDialog(true)}
                            sx={{
                                textTransform: "none",
                                borderRadius: "12px",
                                py: 1,
                                fontWeight: "bold",
                            }}
                        >
                            Dar de baja mi cuenta
                        </Button>
                    </Box>
                </Box>
            </Container>

            {/* Cancel Edit Dialog */}
            <Dialog
                open={openCancelDialog}
                onClose={() => setOpenCancelDialog(false)}
                PaperProps={{ sx: { borderRadius: "12px" } }}
            >
                <DialogTitle>Cancelar cambios</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que quieres cancelar? Perderás los cambios no guardados.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <ButtonCancelBase text="No" onClick={() => setOpenCancelDialog(false)} />
                    <ButtonAcceptBase text="Sí" onClick={() => navigate("/")} />
                </DialogActions>
            </Dialog>

            {/* Delete Account Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                PaperProps={{ sx: { borderRadius: "12px" } }}
            >
                <DialogTitle>Eliminar cuenta</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        La cuenta será eliminada, ¿desea continuar?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <ButtonCancelBase text="Cancelar" onClick={() => setOpenDeleteDialog(false)} />
                    <ButtonAcceptBase text="Aceptar" sx={{ bgcolor: "error.main", "&:hover": { bgcolor: "error.dark" } }} onClick={handleDeleteAccount} />
                </DialogActions>
            </Dialog>

            {/* Premium Alert Notification Dialog */}
            <Dialog
                open={openAlertDialog}
                onClose={handleAlertClose}
                PaperProps={{ sx: { borderRadius: "12px", p: 1 } }}
            >
                <DialogTitle sx={{ pb: 1 }}>Atención</DialogTitle>
                <DialogContent>
                    <DialogContentText color="text.primary">
                        {alertMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <ButtonAcceptBase text="Aceptar" mw="80px" onClick={handleAlertClose} />
                </DialogActions>
            </Dialog>
        </Layout>
    );
}

export default ProfileSettings;
