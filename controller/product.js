const productModel = require("../models/Product");

exports.hello = (req, res) => {
  console.log("API RUNNING");
  res.send("Hello world");
};

exports.createProduct = (req, res, next) => {
  const createdProduct = productModel.create(req.body);
  res.status(201).json(createdProduct);
};
