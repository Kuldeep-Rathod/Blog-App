import React, { useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import axios from "axios";
import { server } from "../main";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";    
import Cookies from "js-cookie";
import Swal from "sweetalert2";
// import uploadOnCloudinary from "../../../api/cloudinary.js";

function Write() {
    const state = useLocation().state;
    const [title, setTitle] = useState(state?.title);
    const [value, setValue] = useState(state?.description || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");
    // const [img, setImg] = useState(state.img);

    const navigate = useNavigate();

   

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if title is empty
        if (!title || title.trim() === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Title cannot be empty!",
                confirmButtonText: "OK",
            });
            return;
        }
    
        try {
            // Create a FormData object
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", value);
            formData.append("cat", cat);
            if (file) {
                formData.append("file", file);
            }
            formData.append("date", moment().format("YYYY-MM-DD HH:mm:ss"));
    
            if (state) {
                // Update existing post using PUT
                await axios.put(
                    `${server}/posts/${state.id}`,
                    formData,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            } else {
                // Create new post using POST
                await axios.post(
                    `${server}/posts/`,
                    formData,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                Swal.fire({
                    icon: "success",
                    title: "Post Added!",
                    text: "Your post has been added successfully.",
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 2000,
                });
            }
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Unauthorized error
                Swal.fire({
                    icon: "error",
                    title: "Unauthorized",
                    text: "You are not able to perform this action. Please log in.",
                    confirmButtonText: "OK",
                });
                navigate("/login");
            } else {
                // Other errors
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to submit form. Please try again.",
                    confirmButtonText: "OK",
                });
            }
            console.log("Error submitting form:", error);
        }
    };
    

    //   console.log(value);
    return (
        <div className="add">
            <div className="content">
                <input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <div className="editorContainer">
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        name=""
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    {/* <input
                        type="text"
                        placeholder="Enter image URL"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)} // Assuming setimgUrl is a state setter for image URL
                    /> */}
                    <div className="buttons">
                        <label htmlFor="file">Upload Image</label>
                        <button onClick={handleSubmit}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input
                            className="catName"
                            type="radio"
                            checked={cat === "art"}
                            name="cat"
                            value="art"
                            id="art"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                        <input
                            className="catName"
                            type="radio"
                            checked={cat === "science"}
                            name="cat"
                            value="science"
                            id="science"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="science">Science</label>
                    </div>
                    <div className="cat">
                        <input
                            className="catName"
                            type="radio"
                            checked={cat === "technology"}
                            name="cat"
                            value="technology"
                            id="technology"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                        <input
                            className="catName"
                            type="radio"
                            checked={cat === "cinema"}
                            name="cat"
                            value="cinema"
                            id="cinema"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">
                        <input
                            className="catName"
                            type="radio"
                            checked={cat === "design"}
                            name="cat"
                            value="design"
                            id="design"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="design">Design</label>
                    </div>
                    <div className="cat">
                        <input
                            className="catName"
                            type="radio"
                            checked={cat === "food"}
                            name="cat"
                            value="food"
                            id="food"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="food">Food</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Write;
