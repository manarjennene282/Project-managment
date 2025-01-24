import { Box, Typography, useTheme, MenuItem, Select, FormControl, InputLabel, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState } from "react";

const AccessManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // State to store the original data
  const [rows, setRows] = useState(mockDataTeam);
  
  // State to track the modified rows
  const [modifiedRows, setModifiedRows] = useState([]);

  // Function to handle access level change in the table
  const handleAccessLevelChange = (id, newAccessLevel) => {
    // Update the modifiedRows state with the changed access level
    const updatedModifiedRows = modifiedRows.map(row => 
      row.id === id ? { ...row, access: newAccessLevel } : row
    );

    // If the row is not already in modifiedRows, add it
    if (!updatedModifiedRows.some(row => row.id === id)) {
      updatedModifiedRows.push({ id, access: newAccessLevel });
    }

    setModifiedRows(updatedModifiedRows);
  };

  // Function to handle the validation of changes
  const handleValidation = () => {
    // Apply changes from modifiedRows to rows
    const updatedRows = rows.map(row => {
      const modifiedRow = modifiedRows.find(modified => modified.id === row.id);
      return modifiedRow ? { ...row, access: modifiedRow.access } : row;
    });
    setRows(updatedRows);

    // Clear the modifiedRows since changes have been validated
    setModifiedRows([]);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "manageAccess",
      headerName: "Gestion des droits d'accès",
      renderCell: ({ row }) => {
        return (
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Access</InputLabel>
            <Select
              value={row.access}
              label="Access"
              onChange={(e) => handleAccessLevelChange(row.id, e.target.value)}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Access Management" subtitle="Manage User Access Levels" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>

      {/* Validation Button */}
      <Box mt="20px" display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleValidation}
          disabled={modifiedRows.length === 0}
        >
          Valider
        </Button>
      </Box>
    </Box>
  );
};

export default AccessManagement;
