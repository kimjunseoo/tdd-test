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
  try {
    const allProducts = await productModel.find({});

    res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.productId);

    if (!product) {
      return res.status(404).send();
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const updateProduct = await productModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );

    if (!updateProduct) {
      return res.status(404).send();
    }

    res.status(201).json(updateProduct);
  } catch (error) {
    next(error);
  }
};
