const express = require("express");
const asyncWrap = require("../utils/asyncWrap");
const {
  isLoggedIn,
  validateProduct,
  isOwner,
} = require("../middleware/middleware");
const productController = require("../controllers/product");
const router = express.Router();
const multer = require("multer");
const { cloudinary, storage } = require("../CloudConfig");

const upload = multer({ storage });
router
  .route("/")
  .get(asyncWrap(productController.index))
  .post(
    isLoggedIn,
    upload.single("imageUrl"),
    asyncWrap(productController.addData)
  );

router
  .route("/:id")
  .put(
    isLoggedIn,
    isOwner,
    upload.single("imageUrl"),
    asyncWrap(productController.updateProduct)
  )
  .get(asyncWrap(productController.showProduct))
  .delete(isLoggedIn, isOwner, asyncWrap(productController.destoryProduct));

module.exports = router;
