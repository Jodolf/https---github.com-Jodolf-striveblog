import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true }, // Nome o ID dell'autore del commento
});

const blogPostSchema = new mongoose.Schema({
  title: { type: String,  },
  category: { type: String,  },
  readTime: {
    value: { type: Number,  },
    unit: { type: String,  },
  },

  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", },
  content: { type: String,  },
  cover: { type: String }, // Campo per l'URL della cover
  comments: [commentSchema], // Embedding dei commenti
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
