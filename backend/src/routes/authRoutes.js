import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
    login,
    logout,
    signup,
    updateProfile,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", updateProfile);

export default router;
