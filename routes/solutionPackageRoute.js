const express = require("express");
const {
  addSolutionPackage,
  getSolutionPackagesBySolutionId,
  deleteSolutionPackage,
} = require("../controller/solutionPackageController");
const router = express.Router();
router.post("/addSolutionPackage", addSolutionPackage);
router.get(
  "/:industryId/solution/:solutionId",
  getSolutionPackagesBySolutionId
);
router.delete("/deleteSolutionPackage", deleteSolutionPackage);
module.exports = router;
