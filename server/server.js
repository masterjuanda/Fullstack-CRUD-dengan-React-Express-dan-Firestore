import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
