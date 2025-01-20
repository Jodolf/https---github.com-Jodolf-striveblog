import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import Author from "../models/authorModel.js";
import BlogPost from "../models/blogPostModel.js";

const router = express.Router();

router.patch("/authors/:id/avatar", upload.single("avatar"), async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, { avatar: req.file.path }, { new: true });
    res.json(updatedAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error uploading avatar");
  }
});

router.patch("/blogposts/:id/cover", upload.single("cover"), async (req, res) => {
  try {
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(req.params.id, { cover: req.file.path }, { new: true });
    res.json(updatedBlogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error uploading cover");
  }
});

export { router as uploadRouter };
