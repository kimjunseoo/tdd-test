const express = require("express");
const res = require("express/lib/response");

const PORT = 3000;
const HOST = "0.0.0.0";

const app = express();
const productRouter = require("./route");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://kimjunseo:57365736kjH!@tdd-test.1kbrn.mongodb.net/?retryWrites=true&w=majority&appName=tdd-test"
);

app.use(express.json());
app.use("/api/product", productRouter);
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
