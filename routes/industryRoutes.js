const express = require("express");
const {
  getIndustries,
  addIndustry,
  getIndustryById,
  deleteIndustry,
} = require("../controller/industryController");
const router = express.Router();
router.get("/getIndustries", getIndustries);
router.post("/addIndustry", addIndustry);
router.get("/industry/:id", getIndustryById);
router.delete("/industry/:id", deleteIndustry);
module.exports = router;
