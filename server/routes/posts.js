import express from "express";
const router = express.Router();
import { verifyToken } from "../middlewares/auth.js";
import {
  getFeedPosts,
  likePosts,
  deletePost,
  editPost,
  downPosts,
  createPost,
  getPostImage,
} from "../controllers/posts.js";

router.get("/", verifyToken, getFeedPosts);
router.post("/", verifyToken, createPost);
router.get("/image/:filename", getPostImage);

router.patch("/:id/like", verifyToken, likePosts);
router.patch("/:id/down", verifyToken, downPosts);

router.delete("/:id", verifyToken, deletePost);
router.patch("/:id", verifyToken, editPost);

export default router;
