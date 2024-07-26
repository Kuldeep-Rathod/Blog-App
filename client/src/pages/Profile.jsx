import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { AuthContext } from "../context/authContext.jsx";
import { server } from "../main.jsx";
import './Profile.css';
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const { currentUid, currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // For navigation

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(`${server}/profiles/${currentUid}`);
      // Check if the response data is an array
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else if (typeof response.data === 'object') {
        // Convert object to array and set data
        setData([response.data]);
      } else {
        console.error("Unexpected data type received:", response.data);
      }
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  // Handlers
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/posts/${id}`, {
        withCredentials: true,
      });
      // Re-fetch the data after successful deletion
      fetchData();
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  useEffect(() => {
    // Check if user is logged in before fetching data
    if (currentUser) {
      fetchData();
    } else {
      // Redirect to login page or handle logout state
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // Define columns with class names for styling
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      cell: (row) => <span className="title-cell">{row.title}</span>,
    },
    {
      name: "Image",
      selector: (row) => row.img,
      cell: (row) => (
        <img src={`../upload/${row.img}`} alt={row.title} className="image-cell" />
      ),
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      cell: (row) => (
        <span>{new Date(row.date).toLocaleDateString()}</span>
      ),
    },
    {
      name: "Category",
      selector: (row) => row.cat,
      sortable: true,
      cell: (row) => <span className="category-cell">{row.cat}</span>,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="actions-button">
          <Link className="link" to={`/${row.cat}/post/${row.id}`}>
            <button className="edit">Edit</button>
          </Link>
          <button className="delete" onClick={() => handleDelete(row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="profile-container">
      {currentUser ? (
        <DataTable
          title="My Posts"
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          pointerOnHover
          className="data-table"
        />
      ) : (
        <p>Please log in to view your posts.</p>
      )}
    </div>
  );
}

export default Profile;
