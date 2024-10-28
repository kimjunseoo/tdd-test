const productModel = require("../models/Product");

exports.hello = (req, res) => {
  console.log("API RUNNING");
  res.send("Hello world");
};

exports.createProduct = async (req, res, next) => {
  const createdProduct = await productModel.create(req.body);
  console.log(createdProduct);
  res.status(201).json(createdProduct);
};
