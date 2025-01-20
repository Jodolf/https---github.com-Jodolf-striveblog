import Author from "../models/authorModel.js";

const getAuthors = async (req, res) => {
  try {
    const { page, limit } = req.query;

    if (limit === "all") {
      const authors = await Author.find(); // Nessuna paginazione
      return res.json(authors);
    }

    const currentPage = parseInt(page) || 1;
    const currentLimit = parseInt(limit) || 10;

    const authors = await Author.find()
      .skip((currentPage - 1) * currentLimit)
      .limit(currentLimit);
    const total = await Author.countDocuments();
    res.json({ total, authors });
  } catch (error) {
    console.error(error);
    res.status(500).json("Error fetching authors");
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json("Author not found");
    res.json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error fetching author");
  }
};

const createAuthor = async (req, res) => {
  try {
    const { nome, cognome, email, data_di_nascita } = req.body;
    if (!nome || !cognome || !email || !data_di_nascita) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error creating author");
  }
};

const uploadAuthorAvatar = async (req, res) => {
  try {
    console.log("Params:", req.params);
    console.log("File:", req.file);

    const { authorld } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      authorld,
      { avatar: req.file.path }, // URL di Cloudinary
      { new: true }
    );

    if (!updatedAuthor) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.json(updatedAuthor);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Error uploading avatar" });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAuthor) return res.status(404).json("Author not found");
    res.json(updatedAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error updating author");
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).json("Author not found");
    res.json("Author deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error deleting author");
  }
};

export { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor, uploadAuthorAvatar };
