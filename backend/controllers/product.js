const Product = require("../model/Product");

module.exports.index = async (req, res) => {
  try {
    const data = await Product.find({});
    res.json(data);
    res.status(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports.showProduct = async (req, res, next) => {
  const data = await Product.findById(req.params.id).populate("owner");
  if (!data) {
    next(new ExpressError(404, "there is no product as such"));
  }
  res.status(200).json(data);
};
module.exports.addData = async (req, res, next) => {
  console.log("user:", req.user);
  const newProduct = new Product(req.body);
  newProduct.owner = req.user._id;
  const savedProduct = await newProduct.save();
  res.status(200).json(savedProduct);
};
module.exports.updateProduct = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).json(updatedProduct);
};
module.exports.destoryProduct = async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deletedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  console.log(deletedProduct);
  res.status(200).json({ message: "Product deleted successfully" });
};
