import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { authorRouter } from "./routes/authorRoutes.js";
import { blogPostRouter } from "./routes/blogPostRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/authors", authorRouter);
app.use("/api/blogposts", blogPostRouter);

app.use("/", (req, res) => {
    res.send("Hello from backend");
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});