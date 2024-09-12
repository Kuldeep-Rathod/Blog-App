import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../contollers/post.js";

const router = express.Router();
import  {upload} from '../middleware/multerMiddleware.js'

// Define routes
router.get("/", getPosts); // GET all items
router.get("/:id", getPost); // GET a single item by id
router.post("/", upload.single('file') , addPost); // CREATE a new item
router.delete("/:id", deletePost); // DELETE an item by id
router.put("/:id", updatePost); // UPDATE an item by id

export default router;
