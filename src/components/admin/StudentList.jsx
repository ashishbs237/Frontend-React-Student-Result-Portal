import React, { useEffect } from "react";
import CustomDataGrid from "../CustomeDataGrid";
import {
  useGetStudentsQuery,
  useDeleteStudentMutation,
} from "../../api/studentApi";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmationDialog from "../shared/ConfirmationDialog";

const StudentList = () => {
  const { data, isLoading, error, isFetching } = useGetStudentsQuery();
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();
  const [deleteId, setDeleteId] = React.useState(false);

  if (error) toast.error(error.message);

  const columnsDefs = [
    { field: "name", headerName: "Name", width : 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton color="error" onClick={() => setDeleteId(params.row._id)}>
            <Delete />
          </IconButton>
          <IconButton color="error" onClick={() => setDeleteId(params.row._id)}>
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDeleteStudent = async () => {
    try {
      await deleteStudent(deleteId).unwrap();
      toast.success("Student deleted!");
    } catch (err) {
      toast.error("Failed to delete student");
    }
  };
  return (
    <>
      <CustomDataGrid
        columns={columnsDefs}
        rows={data?.data || []}
        pageSize={5}
      />
      {/* Delete confirmation dialog  */}
      <ConfirmationDialog
        open={deleteId}
        onClose={() => setDeleteId(null)}
        type="delete"
        message="Are you sure you want to delete?"
        onConfirm={() => {
          handleDeleteStudent();
          setDeleteId(null);
        }}
      />
    </>
  );
};

export default StudentList;
