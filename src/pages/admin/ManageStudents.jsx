// src/pages/ManageStudents.jsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
// import { useGetStudentsQuery, useAddStudentMutation, useDeleteStudentMutation } from "../api/studentApi";
import { toast } from "react-toastify";
import AddEditStudentDetail from "../../components/AddEditStudentDetail";
import { useAddStudentMutation, useDeleteStudentMutation } from "../../api/studentApi";

const ManageStudents = () => {
  // const { data: students, isLoading, error } = useGetStudentsQuery();
  const students = [];
  const [addStudent] = useAddStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();
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

  const handleDeleteStudent = async (id) => {
    // try {
    //   await deleteStudent(id).unwrap();
    //   toast.success("Student deleted!");
    // } catch (err) {
    //   toast.error("Failed to delete student");
    // }
  };

  // if (isLoading) return <Typography>Loading...</Typography>;
  // if (error) return <Typography color="error">Error loading students</Typography>;

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Manage Students
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Student
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Student Modal */}
      <AddEditStudentDetail
        open={open}
        onClose={()=> setOpen(false)}
        onSubmit={handleAddStudent}
        initialData={selectedStudent}
      />
    </Container>
  );
};

export default ManageStudents;
