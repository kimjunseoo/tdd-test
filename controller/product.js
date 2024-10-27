const productModel = require("../models/Product");

exports.hello = (req, res) => {
  console.log("API RUNNING");
  res.send("Hello world");
};

exports.createProduct = (req, res) => {
  productModel.create();
};
