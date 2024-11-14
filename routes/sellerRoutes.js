const express = require("express");
const { signup, login } = require("../controller/sellerController");
const upload = require("../middleware/upload"); // Adjust the path to your multerConfig file
const {
  createSellerSolutionPackage,
  getSellerSolutionPackage,
  approveRequest,
  updateSellerSolutionPackageName,
  getSellerSolutionPackageById,
} = require("../controller/sellerSolutionPackageController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// POST /api/sellerSolutionPackages
router.post("/sellerSolutionPackages", createSellerSolutionPackage);
router.get("/sellerSolutionPackages", getSellerSolutionPackage);
router.post("/approveOrder", upload, approveRequest);
router.get("/sellerSolutionPackagesById/:id", getSellerSolutionPackageById);
router.put(
  "/sellerSolutionPackages/updateName",
  updateSellerSolutionPackageName
);
module.exports = router;
