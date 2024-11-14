const mongoose = require("mongoose");
const { Schema } = mongoose;
const sellerSolutionPackageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  industryId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  solutionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  isApproved: {
    type: Boolean,
    required: true,
    default: false,
  },
  isRejected: {
    type: Boolean,
    required: true,
    default: false,
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
});
const SellerSolutionPackage = mongoose.model(
  "SellerSolutionPackage",
  sellerSolutionPackageSchema
);

module.exports = SellerSolutionPackage;
