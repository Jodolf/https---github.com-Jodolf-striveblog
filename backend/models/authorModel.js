import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  data_di_nascita: { type: String, required: true },
  avatar: { type: String }, // URL immagine (opzionale)
});

const Author = mongoose.model("Author", authorSchema);

export default Author;
