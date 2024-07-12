const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
    min: 1,
  },
  imageUrl: {
    url:String,
    fileName:String,
  },
  category: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
productSchema.post("findOneAndDelete", async (data) => {
  console.log("post middleware is triggred");
  if (data) {
    const productId = data._id;
    const deleted = await User.updateMany(
      { "cart.product": productId },
      { $pull: { cart: { product: productId } } }
    );
    console.log("deleted this :", deleted);
  }
});

module.exports = mongoose.model("Product", productSchema);
