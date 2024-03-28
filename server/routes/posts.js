import express from "express";
const router= express.Router();
import { verifyToken } from "../middlewares/auth.js";
import { getFeedPosts } from "../controllers/posts.js";

router.get("/", verifyToken, getFeedPosts);


export default router;
