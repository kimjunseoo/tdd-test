const productController = require("../../controller/product");

describe("Product Controller Create", () => {
  it("should have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });

  it("two + two is four", () => {
    expect(2 + 2).not.toBe(5);
  });
});
