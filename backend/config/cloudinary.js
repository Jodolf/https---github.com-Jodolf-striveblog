import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const authorStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "authors", // Cartella in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const blogPostStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blogposts", // Cartella per le immagini dei blog posts
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const authorParser = multer({ storage: authorStorage });

// Parser per blog posts
const blogPostParser = multer({ storage: blogPostStorage });

export { cloudinary, authorParser, blogPostParser };
