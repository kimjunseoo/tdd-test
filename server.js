const express = require("express");
const res = require("express/lib/response");
const dotenv = require("dotenv");

const PORT = 3000;
const HOST = "0.0.0.0";

const app = express();
const productRouter = require("./route");
const mongoose = require("mongoose");

dotenv.config();
mongoose.connect(process.env.MONGODB_URL);

app.use(express.json());
app.use("/api/product", productRouter);
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app;
