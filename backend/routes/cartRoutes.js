const express = require("express");
const asyncWrap = require("../utils/asyncWrap");
const router = express.Router();
const { isLoggedIn } = require("../middleware/middleware");
const cartController = require("../controllers/cart");


router.post("/:id", isLoggedIn, asyncWrap(cartController.addToCart));
router.get("/", isLoggedIn, cartController.showCartitems);

module.exports = router;
