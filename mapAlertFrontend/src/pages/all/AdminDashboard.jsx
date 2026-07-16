import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import ButtonAcceptBase from "../../components/ButtonAcceptBase";
import ButtonCancelBase from "../../components/ButtonCancelBase";
import TextInputBase from "../../components/TextInputBase";
import PasswordInputBase from "../../components/PassworInputBase";
import { useAuth } from "../../hooks/useAuth";
import { adminListUsers, adminCreateUser, adminUpdateUser, adminDeleteUser } from "../../services/usuarioService";
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

    // Custom delete confirm states
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // Custom alert states
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
        // Double check admin role
        if (user && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
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
        setIsEditMode(true);
        setSelectedUserId(targetUser.id);
        setForm({
            username: targetUser.usuario,
            firstName: targetUser.nombres,
            lastName: targetUser.apellidos,
            email: targetUser.email,
            password: "******", // Placeholder password
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
        if (!isEditMode || form.password !== "******") {
            const hasUppercase = /[A-Z]/.test(form.password);
            const isMinLength = form.password.length >= 8;
            if (!isMinLength || !hasUppercase) {
                showAlert("La contraseña debe tener mínimo 8 caracteres y una mayúscula");
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
            showAlert(err.response?.data?.message || "El Usuario y/o Mail ya están registrados");
        }
    };

    const handleDeleteClick = (id) => {
        setUserToDelete(id);
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
            showAlert("Error al dar de baja usuario");
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
                        Panel de Administración
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
                <TableContainer component={Paper} sx={{ borderRadius: "16px", overflow: "hidden", boxShadow: 3 }}>
                    <Table>
                        <TableHead sx={{ bgcolor: "rgba(1, 150, 75, 0.08)" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Usuario</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Nombre Completo</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Rol</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersList.map((row) => (
                                <TableRow key={row.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.usuario}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{`${row.nombres} ${row.apellidos}`}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.rol}
                                            color={row.rol === "ADMIN" ? "secondary" : "default"}
                                            size="small"
                                            sx={{
                                                fontWeight: "bold",
                                                bgcolor: row.rol === "ADMIN" ? "rgba(1, 150, 75, 0.15)" : undefined,
                                                color: row.rol === "ADMIN" ? pallette.primary : undefined,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.activo ? "Activo" : "Inactivo"}
                                            color={row.activo ? "success" : "error"}
                                            variant="outlined"
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            onClick={() => handleOpenEdit(row)}
                                            sx={{ color: pallette.primary, mr: 1 }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDeleteClick(row.id)}
                                            color="error"
                                            disabled={!row.activo}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
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
                PaperProps={{ sx: { borderRadius: "12px", p: 2, minWidth: "350px" } }}
            >
                <DialogTitle sx={{ p: 0, mb: 2 }}>
                    {isEditMode ? "Editar Usuario" : "Crear Usuario"}
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
                        nombre="Contraseña"
                        value={form.password}
                        required={!isEditMode}
                        mw="100%"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                        <InputLabel>Rol</InputLabel>
                        <Select
                            value={form.role}
                            label="Rol"
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                            sx={{ borderRadius: "12px" }}
                        >
                            <MenuItem value="USER">USER</MenuItem>
                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                            <MenuItem value="SUPER_ADMIN">SUPER_ADMIN</MenuItem>
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
                <DialogTitle sx={{ p: 0, mb: 1 }}>¿Eliminar cuenta?</DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    <DialogContentText>
                        La cuenta será eliminada, ¿desea continuar?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 0, mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <ButtonCancelBase text="Cancelar" onClick={() => setOpenDeleteConfirm(false)} />
                    <ButtonAcceptBase text="Aceptar" sx={{ bgcolor: pallette.cancel, "&:hover": { bgcolor: "#c63f3f" } }} onClick={handleConfirmDeleteUser} />
                </DialogActions>
            </Dialog>

            {/* Custom Alert Notification Dialog */}
            <Dialog
                open={openAlertDialog}
                onClose={handleAlertClose}
                PaperProps={{ sx: { borderRadius: "12px", p: 2 } }}
            >
                <DialogTitle sx={{ pb: 1, pl: 0 }}>Atención</DialogTitle>
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
