const productController = require("../../controller/product");
const productModel = require("../../models/Product");
const httpMocks = require("node-mocks-http");

productModel.create = jest.fn();
productModel.find = jest.fn();

const newProduct = {
  name: "Glove",
  description: "야구글러브임",
  price: 9,
};

const allProducts = [
  {
    name: "test1",
    description: "test1",
    price: 1,
  },
  {
    name: "test2",
    description: "test2",
    price: 2,
  },
];

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });

  it("should have a createProduct function", async () => {
    expect(typeof productController.createProduct).toBe("function");
  });

  it("should call productModel.create", async () => {
    await productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });

  it("should return 201 response code", async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    productModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "description property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("Product Controller Get", () => {
  it("should have a getProducts function", () => {
    expect(typeof productController.getProducts).toBe("function");
  });
  it("should call ProductModel.find({})", async () => {
    await productController.getProducts(req, res, next);
    expect(productModel.find).toHaveBeenCalledWith({});
  });
  it("should return 200 response", async () => {
    await productController.getProducts(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  });

  it("should return json body in reponse", async () => {
    productModel.find.mockReturnValue(allProducts);
    await productController.getProducts(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allProducts);
  });
  it("should handle erros", async () => {
    const errorMessage = { message: "Error finding product data" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.find.mockReturnValue(rejectedPromise);
    await productController.getProducts(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
