import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../config/db.js";
import { authRouter } from "../routes/authRoutes.js";

// dotenv config
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Initialize express app
const app = express();

// Connect to MongoDB using mongoose
connectDB();

// Middleware for parsing request body
app.use(express.json());

// Router for accessing auth routes
app.use('/api/auth',authRouter)

// Initialize cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server running");
});

// Start server on port (in .env file)
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT} http://localhost:${PORT}/`);
});
