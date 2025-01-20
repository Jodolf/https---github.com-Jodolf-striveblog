import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Author from "../models/authorModel.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Request body received:", req.body);

    // Trova l'utente nel database
    const user = await Author.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("User found:", user);

    // Confronta la password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Genera il token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Token generated successfully");

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error.message, error);
    res.status(500).json({ error: "Login failed" });
  }
};

export const register = async (req, res) => {
  const { email, password, nome, cognome, data_di_nascita } = req.body;

  try {
    console.log("Request body:", req.body);

    // Verifica se l'email è già registrata
    const existingUser = await Author.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email);
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 1);
    console.log("Password hashed");

    // Crea un nuovo utente
    const user = new Author({
      email,
      password: hashedPassword,
      nome,
      cognome,
      data_di_nascita,
    });

    const savedUser = await user.save();
    console.log("User saved:", savedUser);

    // Genera il token JWT
    const token = jwt.sign({ id: savedUser._id, email: savedUser.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Token generated");

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error during registration:", error.message, error);
    res.status(500).json({ error: "Registration failed" });
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
