    import jwt from "jsonwebtoken";
    import User from "../models/user.model.js";

    export const protectRoute = async (req, res, next) => {
        try {
            const token = req.cookies.jwt;
            if (!token) {
                return res.status(401).json({
                    message: "Unauthorized,  Please login first",
                });
            }
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            if (!decoded) {
                return res.status(401).json({
                    message: "Unauthorized,  Please login first",
                });
            }
            const user = await User.findOne({ _id: decoded.userId }).select(
                "-password"
            );
            req.user = user;
            next();
        } catch (error) {
            console.log("Error is protectRoute middleware ", error.message);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
