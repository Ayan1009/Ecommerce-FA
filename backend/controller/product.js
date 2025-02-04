const express = require("express");
const mongoose = require("mongoose");
const Product = require("../model/product");
const User = require("../model/user");
const router = express.Router();
const { pupload } = require("../multer");
const validateProductData = (data) => {
  const errors = [];
  if (!data.name) errors.push("Product name is required");
  if (!data.description) errors.push("Product description is required");
  if (!data.category) errors.push("Product category is required");
  if (!data.price || isNaN(data.price) || data.price <= 0)
    errors.push("Valid product price is required");
  if (!data.stock || isNaN(data.stock) || data.stock < 0)
    errors.push("Valid product stock is required");
  if (!data.email) errors.push("Email is required");
  return errors;
};
router.post(
  "/create-product",
  pupload.array("images", 10),
  async (req, res) => {
    console.log("HEllos");
    const { name, description, category, tags, price, stock, email } = req.body;
    const images = req.files.map((file) => file.path); // Get file paths
    const validationErrors = validateProductData({
      name,
      description,
      category,
      price,
      stock,
      email,
    });
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    if (images.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Email does not exist in the users database" });
      }
      const newProduct = new Product({
        name,
        description,
        category,
        tags,
        price,
        stock,
        email,
        images,
      });
      await newProduct.save();
      res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Server error. Could not create product." });
    }
  }
);
module.exports = router;