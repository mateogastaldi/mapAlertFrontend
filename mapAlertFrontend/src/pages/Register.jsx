import { Container, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInputBase from "../components/TextInputBase";
import logo from "../assets/logo.png";
import PasswordInputBase from "../components/PassworInputBase";
import ButtonAcceptBase from "../components/ButtonAcceptBase";
import ButtonCancelBase from "../components/ButtonCancelBase";
import { useAuth } from "../hooks/useAuth";
import { REGISTER_FIELD_RULES } from "../utilities/validators";
import { getErrorMessage } from "../utilities/errorMessage";

const marginTop = "13px";
const marginBottom = "13px";
const maxWidth = "20rem";
const maxWidthBottom = "8rem";
const marginXButton = "8px";

function validateRegisterForm(form) {
    const errors = {};
    for (const field of ["firstName", "lastName", "username", "email", "password"]) {
        errors[field] = REGISTER_FIELD_RULES[field].validate(form[field]);
    }
    if (!form.repeatPassword) {
        errors.repeatPassword = "Debes repetir la contraseña.";
    } else if (form.repeatPassword !== form.password) {
        errors.repeatPassword = "Las contraseñas no coinciden.";
    } else {
        errors.repeatPassword = "";
    }
    return errors;
}

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

    const [touched, setTouched] = useState({});
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const errors = validateRegisterForm(form);
    const showError = (field) => (touched[field] || submitAttempted) && Boolean(errors[field]);
    const markTouched = (field) => () => setTouched((prev) => ({ ...prev, [field]: true }));

    // Custom Alert Dialog state
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const showAlert = (msg) => {
        setAlertMessage(msg);
        setOpenAlertDialog(true);
    };

    const handleSubmit = async () => {
        setSubmitAttempted(true);

        if (Object.values(errors).some(Boolean)) {
            showAlert("Por favor corrige los campos marcados en rojo.");
            return;
        }

        try {
            await register({
                username: form.username,
                password: form.password,
                confirmPassword: form.repeatPassword,
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
            });
            window.location.href = "/";
        } catch (err) {
            console.error(err);
            showAlert(getErrorMessage(err, "El usuario y/o email ya se encuentran registrados"));
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
                    onBlur={markTouched("username")}
                    error={showError("username")}
                    helperText={showError("username") ? errors.username : ""}
                    infoText={REGISTER_FIELD_RULES.username.info}
                    maxLength={REGISTER_FIELD_RULES.username.maxLength}
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
                    onBlur={markTouched("firstName")}
                    error={showError("firstName")}
                    helperText={showError("firstName") ? errors.firstName : ""}
                    infoText={REGISTER_FIELD_RULES.firstName.info}
                    maxLength={REGISTER_FIELD_RULES.firstName.maxLength}
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
                    onBlur={markTouched("lastName")}
                    error={showError("lastName")}
                    helperText={showError("lastName") ? errors.lastName : ""}
                    infoText={REGISTER_FIELD_RULES.lastName.info}
                    maxLength={REGISTER_FIELD_RULES.lastName.maxLength}
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
                    onBlur={markTouched("email")}
                    error={showError("email")}
                    helperText={showError("email") ? errors.email : ""}
                    infoText={REGISTER_FIELD_RULES.email.info}
                    maxLength={REGISTER_FIELD_RULES.email.maxLength}
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
                    onBlur={markTouched("password")}
                    error={showError("password")}
                    helperText={showError("password") ? errors.password : ""}
                    infoText={REGISTER_FIELD_RULES.password.info}
                    maxLength={REGISTER_FIELD_RULES.password.maxLength}
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
                    onBlur={markTouched("repeatPassword")}
                    error={showError("repeatPassword")}
                    helperText={showError("repeatPassword") ? errors.repeatPassword : ""}
                    infoText="Debe coincidir exactamente con la contraseña ingresada arriba."
                    maxLength={REGISTER_FIELD_RULES.password.maxLength}
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
                            sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
                        />
                        <ButtonAcceptBase
                            text="Sí"
                            onClick={() => navigate('/')}
                            sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
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
