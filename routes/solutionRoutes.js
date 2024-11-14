const express = require("express");
const {
  addSolution,
  deleteSolution,
} = require("../controller/solutionController");
const router = express.Router();
router.post("/addSolution", addSolution);
router.delete("/deleteSolution", deleteSolution);
module.exports = router;
