import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import axios from "axios";
import { server } from "../main";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Cookies from "js-cookie";

function Write() {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.description || "");
  // const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [cat, setCat] = useState(state?.cat || "");

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  // const upload = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     const res = await axios.post(`${server}/upload`, formData, {
  //       withCredentials: true,
  //     });
  //     console.log(res.data);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(Cookies.get("access_token"))
    try {
      // Assuming 'upload' is an asynchronous function
      // const imgUrl = file ? await upload() : "";
      console.log(url);
      if (state) {
        // Update existing post using PUT
        await axios.put(
          `${server}/posts/${state.id}`,
          {
            title,
            description: value,
            cat,
            // img: file ? imgUrl : "",
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
            withCredentials: true,
          }
        );
      } else {
        // Create new post using POST
        await axios.post(
          `${server}/posts/`,
          {
            title,
            description: value,
            cat,
            // img: file ? imgUrl : "",
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
            withCredentials: true,
          }
        );
      }
      navigate("/");
    } catch (err) {
      // console.log("Upload failed", err);
      if (err.response.status === 401) {
        navigate("/login");
      }
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
        />
        <div className="editorContainer">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
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
          {/* <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          /> */}

          {/* <label htmlFor="file">Upload Image</label> */}

          <label htmlFor="img">Image URL</label>
          <input
            type="url"
            id="img"
            required
            onChange={(e) => setUrl(e.target.value)}
          />

          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
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
