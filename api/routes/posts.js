import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../contollers/post.js";
import isAuth from "../middleware/is-auth";

const router = express.Router();

// Define routes
router.get("/", getPosts); // GET all items
router.get("/:id", getPost); // GET a single item by id
router.post("/",isAuth, addPost); // CREATE a new item
router.delete("/:id",isAuth, deletePost); // DELETE an item by id
router.put("/:id",isAuth, updatePost); // UPDATE an item by id

export default router;
