const multer = require("multer");
const {CloudinaryStorage} =require("multer-storage-cloudinary");
const cloudinary =require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "fixmyroad_potholes",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({storage});

module.exports = upload;
