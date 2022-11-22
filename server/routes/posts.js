import express from "express";
import {
  addPost,
  deletePost,
  getPosts,
  getPost,
  updatePost,
  getUserPosts,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/userposts/:id", getUserPosts);
router.post("/addpost", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
