import cloudinary from "cloudinary";
import { config } from "dotenv";

// Load environment variables
config();

// Configure Cloudinary
const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export default cloudinaryConfig; 