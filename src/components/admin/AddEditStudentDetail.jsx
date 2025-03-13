// src/components/AddEditStudentDetail.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { validationSchema } from "../../utils/validations";
import ConfirmationDialog from "../shared/ConfirmationDialog";



const AddEditStudentDetail = ({ open, onClose, onSubmit, editData }) => {
const [isOpen, setOpen] = useState(false);

  const { values, handleChange, resetForm, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        name: editData?.name || "",
        email: editData?.email || "",
        phone: editData?.phone || "",
      },
      validationSchema: validationSchema,
      enableReinitialize : true,
      onSubmit: () => {
        onSubmit(values);
        resetForm();
        onClose()
      },
    });

  return (
    <>
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editData ? "Edit Student" : "Add Student"}</DialogTitle>
      <DialogContent>
        <TextField
          onChange={handleChange}
          value={values.name}
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
        />
        <TextField
          onChange={handleChange}
          label="Email"
          name="email"
          value={values.email}
          variant="outlined"
          fullWidth
          margin="normal"
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          onChange={handleChange}
          label="Phone"
          name="phone"
          variant="outlined"
          fullWidth
          margin="normal"
          value={values.phone}
          error={touched.phone && Boolean(errors.phone)}
          helperText={touched.phone && errors.phone}
        />
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary" onClick={() => setOpen(true)}>
            {editData ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
      {/* Delete confirmation dialog  */}
      <ConfirmationDialog
        open={isOpen}
        onClose={() => setOpen(false)}
        type="add"
        message="Are you sure you want to add?"
        onConfirm={() => {
          handleSubmit();
          setOpen(false)
        }}
      />
    </>
  );
};

export default AddEditStudentDetail;
