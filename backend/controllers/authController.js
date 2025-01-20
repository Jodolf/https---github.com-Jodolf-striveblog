import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Author from "../models/authorModel.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Author.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const register = async (req, res) => {
  const { email, password, nome, cognome } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAuthor = new Author({ email, password: hashedPassword, nome, cognome });
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await Author.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user details" });
  }
};
