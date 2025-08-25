import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
// Import confirmation dialog
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
// Import toast
import { toast } from "react-toastify";

const Datatable = ({ columns }) => {
  const BASE_URL = import.meta.env.VITE_API_URL || "";
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  // Add state for confirmation dialog
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    id: null,
    title: "",
    message: ""
  });
  const { data, loading, error } = useFetch(`/api/${path}`);

  useEffect(() => {
    if (Array.isArray(data)) {
      setList(data);
    } else if (data && data.users) {
      setList(data.users);
    }
  }, [data]);

  console.log(data);

  // Modified to show confirmation first
  const handleDelete = (id) => {
    // Set item type based on path
    const itemType = path === "users" ? "user" : path === "hotels" ? "hotel" : "room";
    
    // Open confirmation dialog
    setConfirmDialog({
      open: true,
      id: id,
      title: `Delete ${itemType}`,
      message: `Are you sure you want to delete this ${itemType}? This action cannot be undone.`
    });
  };
  
  // New function to handle confirmed deletion with toast notifications
  const handleConfirmedDelete = async () => {
    const id = confirmDialog.id;
    const itemType = path === "users" ? "User" : path === "hotels" ? "Hotel" : "Room";
    
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.delete(`${BASE_URL}/${path}/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      
      setList(list.filter((item) => item._id !== id));
      // Close dialog
      setConfirmDialog({...confirmDialog, open: false});
      
      // Show success toast notification
      toast.success(`${itemType} deleted successfully!`, {
        position: "top-right",
        autoClose: 3000
      });
    } catch (err) {
      console.error("Delete error:", err);
      // Close dialog
      setConfirmDialog({...confirmDialog, open: false});
      
      // Show error toast notification instead of alert
      toast.error(`Failed to delete ${itemType.toLowerCase()}: ${err.response?.data?.message || err.message}`, {
        position: "top-right",
        autoClose: 5000
      });
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
      {/* Add confirmation dialog */}
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({...confirmDialog, open: false})}>
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <p>{confirmDialog.message}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({...confirmDialog, open: false})} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmedDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Datatable;
