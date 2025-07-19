import express from "express";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./lib/db.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening to PORT ${process.env.PORT}`);
    connectDB();
});
