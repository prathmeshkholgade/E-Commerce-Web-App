const User = require("../model/user");

module.exports.addToCart = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const quantity = req.body.quantity || 1;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const cartItem = user.cart.find((item) => item.product.equals(id));
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    user.cart.push({ product: id, quantity: quantity });
  }
  await user.save();
  res.json({ message: "Product added successfully", cart: user.cart });
};
module.exports.showCartitems = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate("cart.product");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ cart: user.cart });
};
