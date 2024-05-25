const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

async function uploadToCloudinary(req, res, next) {
  try {
    // Handle single file upload
    if (req.file) {
      await cloudinary.uploader.upload(req.file.path, function (error, result) {
        if (error) {
          // console.error(error);
          return res
            .status(500)
            .json({ message: "No Network Try Again" });
        }
        req.cloudinaryUrl = result.secure_url;
        console.log(req.cloudinaryUrl)
        next();
      });
    }


    // Handle multiple file uploads
    else if (req.files) {
      const cloudinaryUrls = [];
      for (const file of req.files) {
        await cloudinary.uploader.upload(file.path, function (error, result) {
          if (error) {
            console.error(error);
            return res
              .status(500)
              .json({ message: "No Network try again" });
          }
          cloudinaryUrls.push(result.secure_url);
        });
      }
      req.cloudinaryUrls = cloudinaryUrls;
      next();
    } else {
      
      req.cloudinaryUrl = null; // Set an empty string for single file upload
      console.log("No file to upload");
      return next();
    }
  } catch (error) {
    console.error("Error uploading files to Cloudinary:", error);
    // Ensure to call next() in case of error to proceed to the next middleware
    next(error);
  }
}

module.exports = uploadToCloudinary;
