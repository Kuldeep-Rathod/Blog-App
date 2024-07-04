import jwt from "jsonwebtoken";
import { db } from "../db.js"; // Ensure correct import for db

export const getPosts = (req, res) => {
  try {
    const q = req.query.cat
      ? "SELECT * FROM posts WHERE cat=?"
      : "SELECT * FROM posts";

    db.query(q, [req.query.cat], (err, data) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send(err);
      }

      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (req, res) => {
  const q = `
    SELECT 
      u.username, 
      p.title, 
      p.description, 
      p.img,
      p.id,
      p.cat,
      p.date 
    FROM users u 
    JOIN posts p ON u.id = p.uid 
    WHERE p.id = ?
  `;

  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).send(err);
    }

    if (data.length === 0) {
      console.log("No post found with the given ID:", req.params.id);
      return res.status(404).json({ message: "Post not found" });
    }

    // console.log("Post data fetched:", data[0]); // Log the fetched data
    return res.status(200).json(data[0]); // Return the first (and likely only) result
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  console.log(req.cookies)
  if (!token) {
    return res.status(401).json("Not authenticated user!");
  }

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    const q =
      "INSERT INTO posts (`title`, `description`, `img`, `cat`, `date`, `uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send(err);
      }
      return res.json("post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json("Not authenticated user!");
  }

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) {
        console.log("Error deleting post:", err);
        return res.status(403).json("You can delete only your post!");
      }

      return res.json("Post has been deleted!");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json("Not authenticated user!");
  }

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    const postId = req.params.id
    const q =
      "UPDATA posts SET `title`=?, `description`=?, `img`=?, `cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.cat,
    ];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send(err);
      }
      return res.json("post has been updated.");
    });
  });
};
