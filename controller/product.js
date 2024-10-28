const productModel = require("../models/Product");

exports.hello = (req, res) => {
  res.send("Hello world");
};

exports.createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  await productModel.find({});
};
