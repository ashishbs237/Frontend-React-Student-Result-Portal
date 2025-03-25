// src/pages/ManageStudents.jsx
import React, { useState } from "react";

import { Button, Container, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
import AddEditStudentDetail from "../../components/admin/AddEditStudentDetail";
import {
  useAddStudentMutation,
  useDeleteStudentMutation,
  useGetStudentsQuery,
} from "../../api/studentApi";
import ActionMenu from "../../components/ActionMenu";
import { manageStudentMenu } from "../../utils/menuItems";
import ConfirmationDialog from "../../components/shared/ConfirmationDialog";
import EditIcon from "@mui/icons-material/Edit";
import CustomDataGrid from "../../components/CustomeDataGrid";

const ManageStudents = () => {
  const [addStudent] = useAddStudentMutation();
  const [selectedStudent, setSelectedStudents] = useState(null);
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();
  const { data, isLoading, error, isFetching } = useGetStudentsQuery();
  const [rowSelectionModel, setRowSelectionModel] = useState();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleAddStudent = async (newStudent) => {
    try {
      await addStudent(newStudent).unwrap();
      toast.success("Student added successfully!");
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  const deleteSelected = () => {
    handleDeleteStudent("selected");
  };

  const deleteAll = () => {
    handleDeleteStudent("all");
  };

  const handleDeleteStudent = async (type = "default") => {
    let payload = {};

    if (type === "default") {
      payload = { studentsIds: [selectedStudent._id] };
    }
    if (type === "all") {
      payload = { type };
    }
    if (type === "selected") {
      payload = { studentsIds: rowSelectionModel };
    }
    console.log("Payload : ", payload);
    try {
      await deleteStudent(payload).unwrap();
      toast.success("Student deleted!");
    } catch (err) {
      toast.error("Failed to delete student");
    }
  };

  const columnsDefs = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="error"
            onClick={() => {
              setSelectedStudents(params.row);
              setIsDeleteOpen(true);
            }}
          >
            <Delete />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => {
              setSelectedStudents(params.row);
              setIsEditOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Manage Students
      </Typography>
      <div className="d-flex justify-content-between">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsEditOpen(true)}
        >
          Add Student
        </Button>
        <ActionMenu
          menuLabel="Options"
          selectedStudents={rowSelectionModel?.length || 0}
          menuItems={manageStudentMenu(deleteSelected, deleteAll)}
        />
      </div>

      {/* Student Listing */}
      <CustomDataGrid
        columns={columnsDefs}
        rows={data?.data || []}
        pageSize={5}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(e) => {
          setRowSelectionModel(e);
        }}
      />

      {/* Add Student Modal */}
      <AddEditStudentDetail
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={(e) => {
          handleAddStudent(e);
          setSelectedStudents(null);
        }}
        editData={selectedStudent}
      />

      {/* Delete confirmation dialog  */}
      <ConfirmationDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        type="delete"
        message="Are you sure you want to delete?"
        onConfirm={() => {
          handleDeleteStudent();
          setIsDeleteOpen(false);
        }}
      />
    </Container>
  );
};

export default ManageStudents;
