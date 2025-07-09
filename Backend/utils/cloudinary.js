require("dotenv").config();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// console.log("🌩️ Cloudinary config loaded:", {
//   cloud: process.env.CLOUDINARY_CLOUD_NAME,
//   key: process.env.CLOUDINARY_API_KEY ? "✅" : "❌",
//   secret: process.env.CLOUDINARY_API_SECRET ? "✅" : "❌",
// });

module.exports = cloudinary;