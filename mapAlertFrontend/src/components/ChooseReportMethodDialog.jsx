import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Box, Typography, ButtonBase } from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const OPTIONS = [
  {
    key: "map",
    icon: RoomOutlinedIcon,
    title: "Marcar en el mapa",
    description: "Tocá el punto exacto donde ocurrió el incidente.",
  },
  {
    key: "search",
    icon: SearchOutlinedIcon,
    title: "Buscar dirección",
    description: "Escribí la calle y altura, con autocompletado.",
  },
];

function ChooseReportMethodDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={() => onClose(null)}
      PaperProps={{ sx: { borderRadius: "16px", p: 1, width: "22rem" } }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>¿Cómo querés indicar la ubicación?</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1.5, pb: 2 }}>
        {OPTIONS.map((option) => {
          const Icon = option.icon;
          return (
            <ButtonBase
              key={option.key}
              onClick={() => onClose(option.key)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "divider",
                textAlign: "left",
                justifyContent: "flex-start",
                color: "primary.main",
                "&:hover": { borderColor: "primary.main", bgcolor: "rgba(1, 150, 75, 0.05)" },
              }}
            >
              <Icon sx={{ fontSize: 32 }} />
              <Box>
                <Typography sx={{ fontWeight: 600, color: "text.primary" }}>{option.title}</Typography>
                <Typography variant="body2" color="text.secondary">{option.description}</Typography>
              </Box>
            </ButtonBase>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}

export default ChooseReportMethodDialog;
