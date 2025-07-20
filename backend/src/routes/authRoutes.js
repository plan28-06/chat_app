import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
    login,
    logout,
    signup,
    updateProfilePic,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", updateProfilePic);

export default router;
