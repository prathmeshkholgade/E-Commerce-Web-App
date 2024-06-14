const express = require("express");
const asyncWrap = require("../utils/asyncWrap");
const {
  isLoggedIn,
  validateProduct,
  isOwner,
} = require("../middleware/middleware");
const productController = require("../controllers/product");
const router = express.Router();

router
  .route("/")
  .get(asyncWrap(productController.index))
  .post(isLoggedIn, asyncWrap(productController.addData));

router
  .route("/:id")
  .put(
    isLoggedIn,
    isOwner,
    validateProduct,
    asyncWrap(productController.updateProduct)
  )
  .get(asyncWrap(productController.showProduct))
  .delete(isLoggedIn, isOwner, asyncWrap(productController.destoryProduct));

module.exports = router;
