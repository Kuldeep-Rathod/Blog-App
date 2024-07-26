import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { AuthContext } from "../context/authContext.jsx";
import { server } from "../main.jsx";
import './Profile.css'; // Import the CSS file

// Define columns with class names for styling
const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    cell: (row) => <span className="title-cell">{row.title}</span>,
  },
  {
    name: "Description",
    selector: (row) => row.description,
    sortable: true,
    cell: (row) => (
      <span className="description-cell">
        {row.description}
      </span>
    ),
  },
  {
    name: "Image",
    selector: (row) => row.img,
    cell: (row) => (
      <img src={row.img} alt={row.title} className="image-cell" />
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
        <button className="edit" onClick={() => handleEdit(row.id)}>Edit</button>
        <button className="delete" onClick={() => handleDelete(row.id)}>Delete</button>
      </div>
    ),
  },
];

function Profile() {
  const { currentUid } = useContext(AuthContext);
  const [data, setData] = useState([]);

  // Handlers
  const handleEdit = (id) => {
    alert(`Edit item with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete item with ID: ${id}`);
  };

  useEffect(() => {
    // Clear data when currentUid changes
    setData([]);


    // Fetch data from the API
    if(currentUid){
    axios
      .get(`${server}/profiles/${currentUid}`)
      .then((response) => {
        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else if (typeof response.data === 'object') {
          // Convert object to array and set data
          setData([response.data]);
        } else {
          console.error("Unexpected data type received:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
      }
  }, [currentUid]);

  return (
    <div className="profile-container">
      <DataTable
        title="My Posts"
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        pointerOnHover
        className="data-table"
      />
    </div>
  );
}

export default Profile;
