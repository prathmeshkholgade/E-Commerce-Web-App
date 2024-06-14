const Product = require("../model/Product");
const products = require("./data");

const mongoose = require("mongoose");
main()
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerceweb");
}
async function insertData() {
  products.data = products.data.map((obj) => ({
    ...obj,
    owner: "66699e7bd716e4c679b0cbdd",
  }));
  let data = await Product.insertMany(products.data);
  console.log("data saved");
  console.log(data);
}
insertData();
