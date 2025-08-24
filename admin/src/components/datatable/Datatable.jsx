import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const BASE_URL = import.meta.env.VITE_API_URL || ""; // Add this definition at the top of the component
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/api/${path}`);

  useEffect(() => {
    if (Array.isArray(data)) {
      setList(data);
    } else if (data && data.users) {
      setList(data.users);
    }
  }, [data]);

  console.log(data);

  // Update delete function:
  const handleDelete = async (id) => {
    try {
      // Get authentication token
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token || ""; // Add fallback empty string

      // Log for debugging
      console.log(`Deleting ${path} with ID: ${id}`);
      console.log(`Using URL: ${BASE_URL}/${path}/${id}`);

      // Make the delete request with auth header
      await axios.delete(`${BASE_URL}/${path}/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });

      // Update the UI
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete: " + (err.response?.data?.message || err.message));
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
    </div>
  );
};

export default Datatable;
