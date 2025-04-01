const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.NAME_CLOUD,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.API_SECRET_CLOUD,
});

// Upload image only admin can use
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) console.error("Error removing temp file:", err);
  });
};

module.exports.uploadImage = asyncHandler(async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "No files were uploaded." });
    }

    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "Size too large." });
    }
    if (!["image/jpeg", "image/png"].includes(file.mimetype)) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File format is incorrect." });
    }

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "ShoeShop",
    });
    removeTmp(file.tempFilePath);

    return res.status(200).json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    removeTmp(req.files?.file?.tempFilePath);
    return res.status(500).json({ msg: "Internal Server Error", error: err });
  }
});

// Delete image only admin can use
module.exports.deleteImage = async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res.status(400).json({ msg: "No images selected" });
    }

    cloudinary.uploader.destroy(public_id, (err, result) => {
      if (err) {
        console.error("Cloudinary Error:", err);
        return res.status(500).json({ msg: "Failed to delete image" });
      }
      if (result.result !== "ok") {
        return res.status(500).json({ msg: "Image not deleted" });
      }

      return res.json({ msg: "Deleted Image", result });
    });
  } catch (err) {
    console.error("Internal Server Error:", err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};