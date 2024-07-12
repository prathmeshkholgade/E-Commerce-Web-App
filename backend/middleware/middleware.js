const Product = require("../model/Product");
const ExpressError = require("../utils/ExpressError");
const productSchema = require("../utils/schema");

module.exports.validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.message);
  } else {
    next();
  }
};

module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.originalUrl);
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    return res.status(400).send("you must be logged in");
  }
  next();
};
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
   res.locals.redirectUrl = req.session.redirectUrl
    // res.send(redireturl);
  }
  next();
};
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product.owner._id.equals(req.user._id)) {
    return res.status(504).send("you are not owner of this product");
  }
  next();
};
