import React, { useEffect, useState } from "react";
import {
    Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    FormControl, InputLabel, Select, MenuItem, Tooltip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import ButtonAcceptBase from "../../components/ButtonAcceptBase";
import ButtonCancelBase from "../../components/ButtonCancelBase";
import TextInputBase from "../../components/TextInputBase";
import PasswordInputBase from "../../components/PassworInputBase";
import { useAuth } from "../../hooks/useAuth";
import {
    adminListUsers, adminCreateUser, adminUpdateUser, adminDeleteUser, adminChangeRole, adminToggleStatus
} from "../../services/usuarioService";
import pallette from "../../styled-components/pallette";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AdminDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [usersList, setUsersList] = useState([]);

    // Dialog states
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    // Delete confirm states
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // Alert states
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
        password: "",
        role: "USER",
    });

    const fetchUsers = async () => {
        try {
            const data = await adminListUsers();
            setUsersList(data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    useEffect(() => {
        if (user && user.role !== "ADMIN") {
            navigate("/");
            return;
        }
        fetchUsers();
    }, [user]);

    const handleOpenCreate = () => {
        setIsEditMode(false);
        setForm({
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "USER",
        });
        setOpenDialog(true);
    };

    const handleOpenEdit = (targetUser) => {
        if (!targetUser.activo) {
            showAlert("No se puede editar una cuenta dada de baja.");
            return;
        }
        setIsEditMode(true);
        setSelectedUserId(targetUser.id);
        setForm({
            username: targetUser.usuario,
            firstName: targetUser.nombres,
            lastName: targetUser.apellidos,
            email: targetUser.email,
            password: "******", // Placeholder
            role: targetUser.rol,
        });
        setOpenDialog(true);
    };

    const handleSave = async () => {
        if (!form.username || !form.firstName || !form.lastName || !form.email) {
            showAlert("Campos incompletos");
            return;
        }

        // Validate password for new user or if modified
        if (!isEditMode || (form.password && form.password !== "******")) {
            const hasUppercase = /[A-Z]/.test(form.password);
            const isMinLength = form.password.length >= 8;
            if (!isMinLength || !hasUppercase) {
                showAlert("La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula");
                return;
            }
        }

        try {
            if (isEditMode) {
                await adminUpdateUser(selectedUserId, form, form.role);
                showAlert("Usuario actualizado correctamente", () => {
                    setOpenDialog(false);
                    fetchUsers();
                });
            } else {
                await adminCreateUser(form, form.role);
                showAlert("Usuario creado correctamente", () => {
                    setOpenDialog(false);
                    fetchUsers();
                });
            }
        } catch (err) {
            console.error(err);
            const serverMsg = err.response?.data?.message || err.response?.data?.reason || (typeof err.response?.data === 'string' ? err.response.data : null);
            showAlert(serverMsg || "El usuario y/o email ya se encuentran registrados.");
        }
    };

    const handleQuickRoleChange = async (targetUser, newRole) => {
        if (!targetUser.activo) {
            showAlert("No se puede modificar el rol de una cuenta dada de baja.");
            return;
        }
        if (targetUser.id === user?.id && newRole !== "ADMIN") {
            showAlert("No puedes quitarte el rol de Administrador a ti mismo.");
            return;
        }
        try {
            await adminChangeRole(targetUser.id, newRole);
            fetchUsers();
        } catch (err) {
            console.error("Error al cambiar rol:", err);
            const serverMsg = err.response?.data?.message || err.response?.data?.reason;
            showAlert(serverMsg || "Error al modificar el rol del usuario");
        }
    };

    const handleDeleteClick = (targetUser) => {
        if (!targetUser.activo) {
            showAlert("La cuenta ya se encuentra eliminada.");
            return;
        }
        if (targetUser.id === user?.id) {
            showAlert("No puedes eliminar tu propia cuenta desde el panel.");
            return;
        }
        setUserToDelete(targetUser.id);
        setOpenDeleteConfirm(true);
    };

    const handleConfirmDeleteUser = async () => {
        setOpenDeleteConfirm(false);
        if (!userToDelete) return;
        try {
            await adminDeleteUser(userToDelete);
            fetchUsers();
        } catch (err) {
            console.error(err);
            showAlert("Error al dar de baja el usuario");
        } finally {
            setUserToDelete(null);
        }
    };

    return (
        <Layout>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* Header Section */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, width: "100%" }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/")}
                        sx={{
                            textTransform: "none",
                            borderRadius: "12px",
                            color: pallette.primary,
                            borderColor: pallette.primary,
                            "&:hover": { borderColor: pallette.primary, bgcolor: "rgba(1, 150, 75, 0.05)" }
                        }}
                    >
                        Volver al Mapa
                    </Button>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: pallette.primary }}>
                        Control de Usuarios - Panel de Administración
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenCreate}
                        sx={{
                            textTransform: "none",
                            borderRadius: "12px",
                            bgcolor: pallette.primary,
                            "&:hover": { bgcolor: "#01783c" }
                        }}
                    >
                        Agregar Usuario
                    </Button>
                </Box>

                {/* Users Table */}
                <TableContainer component={Paper} sx={{ borderRadius: "16px", overflowX: "auto", boxShadow: 3 }}>
                    <Table sx={{ minWidth: 850 }}>
                        <TableHead sx={{ bgcolor: "rgba(1, 150, 75, 0.08)" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Usuario</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Nombre Completo</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Rol (Permisos)</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersList.map((row) => (
                                <TableRow
                                    key={row.id}
                                    hover
                                    sx={{
                                        "&:last-child td, &:last-child th": { border: 0 },
                                        bgcolor: !row.activo ? "rgba(0, 0, 0, 0.02)" : "inherit",
                                        opacity: !row.activo ? 0.75 : 1,
                                    }}
                                >
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{row.usuario}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{`${row.nombres} ${row.apellidos}`}</TableCell>
                                    <TableCell>
                                        <FormControl size="small" variant="standard" sx={{ minWidth: 110 }} disabled={!row.activo}>
                                            <Select
                                                value={row.rol}
                                                onChange={(e) => handleQuickRoleChange(row, e.target.value)}
                                                disableUnderline
                                                sx={{
                                                    fontSize: "0.85rem",
                                                    fontWeight: "bold",
                                                    borderRadius: "12px",
                                                    px: 1,
                                                    py: 0.3,
                                                    bgcolor: row.rol === "ADMIN" ? "rgba(1, 150, 75, 0.15)" : "rgba(0, 0, 0, 0.05)",
                                                    color: row.rol === "ADMIN" ? pallette.primary : "text.secondary",
                                                }}
                                            >
                                                <MenuItem value="USER">USER</MenuItem>
                                                <MenuItem value="ADMIN">ADMIN</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title={row.activo ? "Haz clic para dar de baja" : "Cuenta eliminada (permanente)"}>
                                            <Chip
                                                label={row.activo ? "Activo" : "Eliminada"}
                                                color={row.activo ? "success" : "error"}
                                                variant={row.activo ? "outlined" : "filled"}
                                                size="small"
                                                onClick={() => row.activo && handleDeleteClick(row)}
                                                sx={{
                                                    fontWeight: "bold",
                                                    cursor: row.activo ? "pointer" : "default"
                                                }}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<EditIcon />}
                                                onClick={() => handleOpenEdit(row)}
                                                disabled={!row.activo}
                                                sx={{
                                                    textTransform: "none",
                                                    borderRadius: "10px",
                                                    color: pallette.primary,
                                                    borderColor: pallette.primary,
                                                    "&:hover": { borderColor: pallette.primary, bgcolor: "rgba(1, 150, 75, 0.08)" }
                                                }}
                                            >
                                                Editar
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => handleDeleteClick(row)}
                                                disabled={!row.activo}
                                                sx={{
                                                    textTransform: "none",
                                                    borderRadius: "10px",
                                                }}
                                            >
                                                Eliminar
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            {/* Create/Edit Dialog */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                PaperProps={{ sx: { borderRadius: "12px", p: 2, minWidth: "360px" } }}
            >
                <DialogTitle sx={{ p: 0, mb: 2, fontWeight: "bold", color: pallette.primary }}>
                    {isEditMode ? "Modificar Datos de Usuario" : "Agregar Nuevo Usuario"}
                </DialogTitle>
                <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextInputBase
                        nombre="Usuario"
                        value={form.username}
                        required={true}
                        mw="100%"
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />
                    <TextInputBase
                        nombre="Nombre"
                        value={form.firstName}
                        required={true}
                        mw="100%"
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    />
                    <TextInputBase
                        nombre="Apellido"
                        value={form.lastName}
                        required={true}
                        mw="100%"
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    />
                    <TextInputBase
                        nombre="Email"
                        value={form.email}
                        type="email"
                        required={true}
                        mw="100%"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <PasswordInputBase
                        nombre={isEditMode ? "Contraseña" : "Contraseña"}
                        value={form.password}
                        required={!isEditMode}
                        mw="100%"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                        <InputLabel>Rol (Otorgar Permisos)</InputLabel>
                        <Select
                            value={form.role}
                            label="Rol (Otorgar Permisos)"
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                            sx={{ borderRadius: "12px" }}
                        >
                            <MenuItem value="USER">Usuario Estándar (USER)</MenuItem>
                            <MenuItem value="ADMIN">Administrador (ADMIN)</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ p: 0, mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <ButtonCancelBase text="Cancelar" mw="80px" onClick={() => setOpenDialog(false)} />
                    <ButtonAcceptBase text="Guardar" mw="80px" onClick={handleSave} />
                </DialogActions>
            </Dialog>

            {/* Deactivation Confirmation Dialog */}
            <Dialog
                open={openDeleteConfirm}
                onClose={() => setOpenDeleteConfirm(false)}
                PaperProps={{ sx: { borderRadius: "12px", p: 2 } }}
            >
                <DialogTitle sx={{ p: 0, mb: 1, fontWeight: "bold" }}>¿Eliminar o dar de baja usuario?</DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    <DialogContentText>
                        El usuario seleccionado será dado de baja en el sistema. ¿Deseas continuar?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 0, mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <ButtonCancelBase text="Cancelar" onClick={() => setOpenDeleteConfirm(false)} />
                    <ButtonAcceptBase text="Eliminar" sx={{ bgcolor: pallette.cancel, "&:hover": { bgcolor: "#c63f3f" } }} onClick={handleConfirmDeleteUser} />
                </DialogActions>
            </Dialog>

            {/* Custom Alert Notification Dialog */}
            <Dialog
                open={openAlertDialog}
                onClose={handleAlertClose}
                PaperProps={{ sx: { borderRadius: "12px", p: 2 } }}
            >
                <DialogTitle sx={{ pb: 1, pl: 0, fontWeight: "bold" }}>Atención</DialogTitle>
                <DialogContent sx={{ pl: 0 }}>
                    <DialogContentText color="text.primary">
                        {alertMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, pr: 0 }}>
                    <ButtonAcceptBase text="Aceptar" mw="80px" onClick={handleAlertClose} />
                </DialogActions>
            </Dialog>
        </Layout>
    );
}

export default AdminDashboard;
