import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu.jsx";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext.jsx";
import { server } from "../main.jsx";

const Single = () => {
  const [post, setPost] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = useLocation().pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${server}/posts/${postId}`);
        setPost(res.data);
        // console.log("Fetched data:", res.data); // Log the fetched data
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [postId]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${server}/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
      console.log("Fetched data:", res.data); // Log the fetched data
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  
  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} />}
          <div className="info">
            <span>{post.username}</span>
            <p>posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
      </div>
      <Menu cat={post.cat}/>
    </div>
  );
};

export default Single;
