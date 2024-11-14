const mongoose = require("mongoose");
const { Schema } = mongoose;
const solutionPackageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
const solutionPackage = mongoose.model(
  "SolutionPackage",
  solutionPackageSchema
);

module.exports = solutionPackage;
