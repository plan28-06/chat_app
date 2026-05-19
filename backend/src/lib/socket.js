import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin:
            process.env.NODE_ENV === "production"
                ? ["https://chat-app-ao2f.onrender.com"] // Your live Render URL
                : ["http://localhost:5173"],
    },
});

const userSocketMap = {}; // Store Online Users as { userId: socket.id }

const getReceiverSocketId = (userId) => {
    return userSocketMap[userId];
};

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;

    // CRITICAL FIX: Ensure userId exists and is not the string "undefined"
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // Broadcast the updated list of online users to EVERYONE
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);

        // Remove the user from the map safely
        if (userId && userId !== "undefined") {
            delete userSocketMap[userId];
        }

        // Broadcast the updated list again so everyone's screen updates
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server, getReceiverSocketId };
