import express from "express";
import { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from "../controllers/authorController.js";
import { authorParser } from "../config/cloudinary.js";
import { uploadAuthorAvatar } from "../controllers/authorController.js";


const router = express.Router();

router.get("/", getAuthors);
router.get("/:id", getAuthorById);
router.post("/", createAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);
router.patch("/:authorld/avatar", authorParser.single("avatar"), uploadAuthorAvatar);

export { router as authorRouter };
