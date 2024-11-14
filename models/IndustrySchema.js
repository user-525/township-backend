const mongoose = require("mongoose");
const { Schema } = mongoose;

const solutionPackageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
  companyName: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  sellerProductId: {
    type: String,
    required: false,
  },
});

const solutionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  solutionPackage: [solutionPackageSchema],
});

const industrySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  solutions: [solutionSchema],
});

const Industry = mongoose.model("Industry", industrySchema);

module.exports = Industry;
