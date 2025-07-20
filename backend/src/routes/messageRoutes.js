import express from "express";
import protectRoute from "../middlewares/auth.middleware.js";
import { getUsers } from "../controllers/messageController.js";

const router = express.Router();

router.get("/users", protectRoute, getUsers);

export default router;
