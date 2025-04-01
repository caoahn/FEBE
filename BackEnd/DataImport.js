const express = require("express");
const products = require("./data/Products.js");
const users = require("./data/users.js");
const Product = require("./models/product.model.js");
const User = require("./models/user.model.js");
const asyncHandler = require("express-async-handler"); 
const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    // await User.deleteMany({})
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/products",
  asyncHandler(async (req, res) => {
    await Product.deleteMany({})
    const importProducts = await Product.insertMany(products);
    res.send({ importProducts });
  })
);

module.exports = ImportData;
