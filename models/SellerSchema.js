// models/Seller.js
const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
