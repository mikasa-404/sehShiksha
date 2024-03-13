import express from "express";
const router= express.Router();
import { login, register } from "../controllers/auth.js";

router.post("/login", login);

export default router;