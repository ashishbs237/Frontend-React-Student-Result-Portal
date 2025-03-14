// src/pages/ManageStudents.jsx
import React, { useState } from "react";

import { Button, Container, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

// import { useGetStudentsQuery, useAddStudentMutation, useDeleteStudentMutation } from "../api/studentApi";
import { toast } from "react-toastify";
import AddEditStudentDetail from "../../components/admin/AddEditStudentDetail";
import {
  useAddStudentMutation,
  useDeleteStudentMutation,
} from "../../api/studentApi";
import StudentList from "../../components/admin/StudentList";
import ActionMenu from "../../components/ActionMenu";
import { manageStudentMenu } from "../../utils/menuItems";
import ConfirmationDialog from "../../components/shared/ConfirmationDialog";

const ManageStudents = () => {
  const [addStudent] = useAddStudentMutation();
  const [action, setAction] = useState({ action: "", data: [] });
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();

  const handleAddStudent = async (newStudent) => {
    try {
      await addStudent(newStudent).unwrap();
      toast.success("Student added successfully!");
    } catch (err) {
      toast.error("Failed to add student");
    }
  };

  const deleteSelected = () => {
    console.log("Delete Selected : ");
  };

  const deleteAll = () => {
    console.log("Delete All Student : ");
  };

  const handleDeleteStudent = async () => {
    try {
      await deleteStudent(action.data[0]).unwrap();
      toast.success("Student deleted!");
    } catch (err) {
      toast.error("Failed to delete student");
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Manage Students
      </Typography>
      <div className="d-flex justify-content-between">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAction({ ...action, action: "edit" })}
        >
          Add Student
        </Button>
        <ActionMenu
          menuLabel="Options"
          menuItems={manageStudentMenu(deleteSelected, deleteAll)}
        />
      </div>

      <StudentList
        setAction={(e) => {
          setAction({ action: e?.action, data: e?.data });
        }}
      />

      {/* Add Student Modal */}
      <AddEditStudentDetail
        open={action.action === "edit"}
        onClose={() => setAction({})}
        onSubmit={handleAddStudent}
        editData={action?.data?.[0]}
      />

      {/* Delete confirmation dialog  */}
      <ConfirmationDialog
        open={action?.action === "delete"}
        onClose={() => setAction({})}
        type="delete"
        message="Are you sure you want to delete?"
        onConfirm={() => {
          handleDeleteStudent();
          setAction({});
        }}
      />
    </Container>
  );
};

export default ManageStudents;
