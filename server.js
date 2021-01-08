const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

//db connection
var uri = "mongodb://localhost:27018/list";
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);

//define the first endpoint
app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  //send products back to the client
  res.send(products);
});

//create a product using http post method
app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  //save that product into db
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log("serve at http://localhost:5001"));
