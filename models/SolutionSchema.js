const mongoose = require("mongoose");
const { Schema } = mongoose;
// const solutionPackageSchema = require("./SolutionPackageSchema");

const solutionPackageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const solutionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  packages: [solutionPackageSchema],
});

const Solution = mongoose.model("Solution", solutionSchema);

module.exports = Solution;
