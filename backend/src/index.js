import express from "express";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

const PORT = process.env.PORT || 5001; 
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// 1. FIXED CORS: Allows both local development and your live production URL
app.use(
    cors({
        origin: process.env.NODE_ENV === "production" 
            ? false // When served together on the same domain, false allows same-origin requests perfectly
            : "http://localhost:5173", 
        credentials: true,
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    // 2. FIXED PATHS: Both now correctly use "../frontend/dist"
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
    connectDB();
});