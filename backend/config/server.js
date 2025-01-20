import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import { authorRouter } from "./routes/authorRoutes.js";
import { blogPostRouter } from "./routes/blogPostRoutes.js";
import { uploadRouter } from "./routes/uploadRoutes.js";

import authMiddleware from "./middlewares/auth.js";
import authRouter from "./routes/authRoutes.js";



const server = express();
const PORT = process.env.PORT || 3001;

// Middleware
server.use(cors());
server.use(express.json());

// Routes
server.use("/api/auth", authRouter);
server.use("/api/blogposts", authMiddleware, blogPostRouter); // Protetto
server.use("/api/uploads", authMiddleware, uploadRouter); // Protetto

server.use("/api/authors", authorRouter);
//server.use("/api/blogposts", blogPostRouter);
//server.use("/api/uploads", uploadRouter);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(error => console.error("Error connecting to MongoDB:", error));
