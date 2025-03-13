// src/components/CustomDataGrid.jsx
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const CustomDataGrid = ({ columns, rows, pageSize = 5, ...rest }) => {
  return (
    <DataGrid
      sx={{
        display: "flex",
        height: 450,
        width: "100%",
        border: "1px solid #ddd", // Light border
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#fafafa", // Light background
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#e3f2fd", // Light blue for headers
          color: "#0d47a1",
          fontSize: "16px",
          fontWeight: "bold",
        },
        "& .MuiDataGrid-row:nth-of-type(odd)": {
          backgroundColor: "#f9f9f9", // Alternate row color
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: "#e1f5fe", // Light hover effect
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "1px solid #ddd",
        },
        "& .MuiTablePagination-root": {
          margin: "0 !important", // Force remove extra bottom margin
        },
        "& .MuiTablePagination-toolbar": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0", // Ensures proper alignment
        },
        "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows ":
          {
            padding: "0",
            margin: "0px",
          },
      }}
      rows={rows || []}
      columns={columns}
      pageSize={pageSize}
      rowsPerPageOptions={[5, 10, 20]}
      checkboxSelection
      disableRowSelectionOnClick
      getRowId={(row)=> row._id }
      {...rest}
    />
  );
};

export default CustomDataGrid;
