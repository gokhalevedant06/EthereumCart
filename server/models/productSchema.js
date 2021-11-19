const mongoose = require("mongoose");

// defining a model (document)
// data will be stored in this format
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("PRODUCTS", productSchema);

module.exports = Product;
