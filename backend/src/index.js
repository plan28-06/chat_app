import express from "express";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening to PORT ${process.env.PORT}`);
    connectDB();
});
