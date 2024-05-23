import express from "express";
const router= express.Router();
import { verifyToken } from "../middlewares/auth.js";
import { getFeedPosts, likePosts, deletePost, editPost } from "../controllers/posts.js";

router.get("/", verifyToken, getFeedPosts);
router.patch("/:id/like", verifyToken, likePosts);
router.delete("/:id", verifyToken, deletePost);
router.patch("/:id",verifyToken, editPost);

export default router;
