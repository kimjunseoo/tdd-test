const request = require("supertest");
const app = require("../../server");

let newProductData = {
  name: "phone",
  description: "samsung",
  price: 999,
};

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

  console.log(response.body);
  expect(response.body).toStrictEqual({
    message:
      "Product validation failed: description: Path `description` is required.",
  });
});
