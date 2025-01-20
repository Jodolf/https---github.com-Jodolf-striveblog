import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { authorRouter } from "./routes/authorRoutes.js";
import { blogPostRouter } from "./routes/blogPostRoutes.js";
import { uploadRouter } from "./routes/uploadRoutes.js";
import authRouter from "./routes/authRoutes.js";
import authMiddleware from "./middlewares/auth.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Routes
app.use("/api/auth", authRouter); // Autenticazione
app.use("/api/authors", authorRouter); // Gestione autori
app.use("/api/blogposts", authMiddleware, blogPostRouter); // Protetto
app.use("/api/uploads", authMiddleware, uploadRouter); // Protetto

// Gestione delle rotte non trovate
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
