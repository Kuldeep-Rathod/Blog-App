import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { server } from "../main.jsx";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${server}/posts/${cat}`);
        // Sort posts by date (newest first)
        const sortedPosts = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setPosts(sortedPosts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [cat]);

  //   const posts = [
  //       {
  //           id: 1,
  //           title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //           desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //           img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //       },
  //   ];

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <Link className="link" to={`${post.cat}/post/${post.id}`}>
                <img src={`./upload/${post.img}`} alt="" />
              </Link>
            </div>

            <div className="content">
              <Link className="link" to={`${post.cat}/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.description)}</p>
              {/* <button>Read more</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
