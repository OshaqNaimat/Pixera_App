import express from "express";
import {
  addPost,
  getPost,
  addComment,
  addLikes,
  relaventPosts,
} from "../controller/PostController.js";

const router = express.Router();

// Specific routes first (before parameterized routes)
router.get("/", getPost);
router.post("/comment/:user_id/:post_id", addComment);
router.post("/like/:user_id/:post_id", addLikes);

// Parameterized routes last
router.post("/:user_id", addPost);
router.get("/:id", relaventPosts);

export default router;

