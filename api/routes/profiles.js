import express from "express";
import {
  deletePost,
  getPosts,
  updatePost,
} from "../contollers/profile.js";

const router = express.Router();

// Define routes
router.get("/:id", getPosts); // GET all items
router.delete("/:id", deletePost); // DELETE an item by id
router.put("/:id", updatePost); // UPDATE an item by id

export default router;
