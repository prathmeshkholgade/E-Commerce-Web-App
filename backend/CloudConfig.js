const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloud_name = process.env.CLOUDNAME;
const apiSecret = process.env.APISECRET;
const apiKey = process.env.APIKEY;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: apiKey,
  api_secret: apiSecret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "EcommerceWeb",
    allowerdFormats: ["png", "jpg", "jpeg"], // supports promises as well
  },
});

module.exports = {cloudinary,storage}