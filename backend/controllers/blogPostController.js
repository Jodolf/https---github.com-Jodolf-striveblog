import BlogPost from "../models/blogPostModel.js";

const getAllBlogPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, title = "" } = req.query;

    // Costruisci il filtro
    const filter = title ? { title: new RegExp(title, "i") } : {};

    // Cerca i blog post con filtro
    const blogPosts = await BlogPost.find(filter)
      .populate("author", "nome cognome")
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await BlogPost.countDocuments(filter);

    res.json({ total, blogPosts });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Error fetching blog posts" });
  }
};

const createBlogPost = async (req, res) => {
  try {
    const newPost = new BlogPost(req.body);

    // Aggiungi il percorso della cover se il file è presente
    if (req.file) {
      newPost.cover = req.file.path; // Percorso del file caricato
    }

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Error creating blog post" });
  }
};

const updateBlogPostWithCover = async (req, res) => {
  try {
    const { id } = req.params;

    // Controlla i dati ricevuti
    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    let coverUrl = null;
    if (req.file) {
      coverUrl = req.file.path; // URL dell'immagine caricata su Cloudinary
    }

    // Verifica che i campi obbligatori siano presenti
    if (!req.body.title || !req.body.category || !req.body.author) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Aggiorna il blog post
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      id,
      { ...req.body, ...(coverUrl && { cover: coverUrl }) },
      { new: true, runValidators: true }
    );

    if (!updatedBlogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json(updatedBlogPost);
  } catch (error) {
    console.error("Error updating blog post with cover:", error);
    res.status(500).json({ error: "Error updating blog post with cover" });
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlogPost = await BlogPost.findByIdAndDelete(id);
    if (!deletedBlogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting blog post" });
  }
};

const getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findById(id).populate("author");
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blog post" });
  }
};

const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blogPost.comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Error fetching comments" });
  }
};

const getCommentById = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    const comment = blogPost.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ error: "Error fetching comment" });
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author } = req.body;

    if (!text || !author) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const newComment = { text, author };
    blogPost.comments.push(newComment);
    await blogPost.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Error adding comment" });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const comment = blogPost.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.text = text;
    await blogPost.save();

    res.json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Error updating comment" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;

    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const comment = blogPost.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.remove();
    await blogPost.save();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Error deleting comment" });
  }
};

export { getAllBlogPosts, createBlogPost, updateBlogPostWithCover, deleteBlogPost, getBlogPostById, getComments, getCommentById, addComment, updateComment, deleteComment };
