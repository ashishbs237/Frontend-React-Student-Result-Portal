// src/pages/ManageStudents.jsx
import React, { useState } from "react";

import { Button, Container, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

// import { useGetStudentsQuery, useAddStudentMutation, useDeleteStudentMutation } from "../api/studentApi";
import { toast } from "react-toastify";
import AddEditStudentDetail from "../../components/admin/AddEditStudentDetail";
import { useAddStudentMutation } from "../../api/studentApi";
import StudentList from "../../components/admin/StudentList";

const ManageStudents = () => {
  const [addStudent] = useAddStudentMutation();
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleAddStudent = async (newStudent) => {
    try {
      await addStudent(newStudent).unwrap();
      toast.success("Student added successfully!");
    } catch (err) {
      toast.error("Failed to add student");
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Manage Students
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Student
      </Button>

      <StudentList />

      {/* Add Student Modal */}
      <AddEditStudentDetail
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddStudent}
        initialData={selectedStudent}
      />
    </Container>
  );
};

export default ManageStudents;
