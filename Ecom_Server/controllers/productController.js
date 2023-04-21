const fs = require("fs");
const path = require("path");
const Inventory = require("../models/inventoryModel");
const Product = require("../models/productModel");
const upload = require("../middleware/uploadHandler");

const productController = {
  addProduct: async (req, res) => {
    try {
      // Upload the files
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: err });
        } else {
          const {
            name,
            description,
            price,
            brand,
            rating,
            category,
            quantity,
          } = req.body;

          // Create a new product with the uploaded files
          const product = new Product({
            name,
            description,
            price,
            brand,
            rating,
            category,
            createdBy: req.user.id,
            images: req.files.map((file) => file.filename),
          });

          // Save the product to the database
          await product.save();
          console.log("images", product.images);

          // Create a new inventory for the product
          const inventory = new Inventory({
            product: product._id,
            quantity,
            createdBy: req.user.id,
          });

          // Save the inventory to the database
          await inventory.save();

          // Update the product with the inventory ID
          product.inventory = inventory._id;
          await product.save();

          res.status(200).json({ product, inventory });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Something went wrong" });
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Product.find({ createdBy: req.user.id }).sort({
        name: 1,
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong" });
    }
  },
};

module.exports = productController;
