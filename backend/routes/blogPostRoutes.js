import express from "express";
import { blogPostParser } from "../config/cloudinary.js";
import {
  updateBlogPostWithCover,
  deleteBlogPost,
  getBlogPostById,
  getAllBlogPosts,
  createBlogPost,
  addComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment
} from "../controllers/blogPostController.js";


const router = express.Router();

router.get("/", getAllBlogPosts); // Nuova rotta per tutti i blog post
router.get("/:id", getBlogPostById);
router.post("/", blogPostParser.single("cover"), createBlogPost);
router.put("/:id/with-cover", blogPostParser.single("cover"), updateBlogPostWithCover);
router.delete("/:id", deleteBlogPost);

router.get("/:id/comments", getComments);
router.get("/:id/comments/:commentId", getCommentById);
router.post("/:id/comments", addComment);
router.put("/:id/comments/:commentId", updateComment);
router.delete("/:id/comments/:commentId", deleteComment);

export { router as blogPostRouter };
