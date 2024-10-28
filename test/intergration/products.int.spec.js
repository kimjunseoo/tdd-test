const request = require("supertest");
const app = require("../../server");

let newProductData = {
  name: "phone",
  description: "samsung",
  price: 999,
};

let firstProduct;

it("POST /api/products", async () => {
  const response = await request(app).post("/api/product").send(newProductData);

  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProductData.name);
  expect(response.body.description).toBe(newProductData.description);
});

it("should return 500 on /api/products", async () => {
  const response = await request(app)
    .post("/api/product")
    .send({ name: "kim" });

  expect(response.statusCode).toBe(500);
  expect(response.body).toStrictEqual({
    message:
      "Product validation failed: description: Path `description` is required.",
  });
});

it("GET /api/product", async () => {
  const response = await request(app).get("/api/product");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
});

it("Get /api/product/:productId", async () => {
  const response = await request(app).get("/api/product/" + firstProduct._id);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

it("Get id doesnt exist /api/product/:productId", async () => {
  const response = await request(app).get(
    "/api/product/" + "671e321186ccdbaf7270de10"
  );
  expect(response.statusCode).toBe(404);
});
