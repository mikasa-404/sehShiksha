import express from "express";
const router= express.Router();
import { verifyToken } from "../middlewares/auth.js";
import { getAllQuestion } from "../controllers/forum.js";
router.get("/", getAllQuestion);
export default router;
