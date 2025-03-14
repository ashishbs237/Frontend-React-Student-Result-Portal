import React, { useEffect, useState } from "react";
import CustomDataGrid from "../CustomeDataGrid";
import { useGetStudentsQuery } from "../../api/studentApi";
import { toast } from "react-toastify";
import { IconButton, useScrollTrigger } from "@mui/material";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

const StudentList = ({ setAction }) => {
  const { data, isLoading, error, isFetching } = useGetStudentsQuery();
  const [rowSelectionModel, setRowSelectionModel] = useState()
  console.log("rowSelectionmodel : " ,rowSelectionModel)

  if (error) toast.error(error.message);

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
            onClick={() =>
              setAction({ action: "delete", data: [params.row._id] })
            }
          >
            <Delete />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => setAction({ action: "edit", data: [params.row] })}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <CustomDataGrid
        columns={columnsDefs}
        rows={data?.data || []}
        pageSize={5}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(e)=>{
          setRowSelectionModel(e)
        }}
      />
    </>
  );
};

export default StudentList;
