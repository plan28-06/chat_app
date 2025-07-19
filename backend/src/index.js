import express from "express";
import authRoutes from "./routes/authRoutes.js";
const app = express();

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening to PORT ${process.env.PORT}`);
});
