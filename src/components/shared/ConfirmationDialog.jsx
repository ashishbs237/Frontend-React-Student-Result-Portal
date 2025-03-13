// src/components/ConfirmationDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

// Define colors based on type
const typeStyles = {
  update: { titleBg: "#2196F3", confirmBg: "#1976D2", confirmText: "Update" },
  delete: { titleBg: "#db3f3f", confirmBg: "#db3f3f", confirmText: "Delete" }, // ✅ Lighter red title
  "ok-only": { titleBg: "#C8E6C9", confirmBg: "#388E3C", confirmText: "OK" }, // ✅ Lighter green
};

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  message = "Are you sure you want to proceed?",
  title,
  cancelText = "Cancel",
  type = "ok-only", // Default type
}) => {
  const { titleBg, confirmBg, confirmText } =
    typeStyles[type] || typeStyles["ok-only"];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{
          backgroundColor: titleBg,
          color: "#fff",
          fontWeight: "bold",
          padding: "8px 16px", // ✅ Reduced padding
        }}
      >
        {title || confirmText}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 4, color: "#fff" }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ margin: "16px" }}>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ padding: "16px", justifyContent: "end" }}>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: confirmBg,
            "&:hover": { backgroundColor: confirmBg },
          }}
        >
          {title || confirmText}
        </Button>
        {type !== "ok-only" && (
          <Button onClick={onClose} color="secondary" variant="outlined">
            {cancelText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
