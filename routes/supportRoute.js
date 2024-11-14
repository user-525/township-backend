const express = require("express");
const {
  addSupportRequest,
  getAllSupportRequests,
} = require("../controller/supportController");
const router = express.Router();
router.post("/addSupport", addSupportRequest);
router.get("/getSupports", getAllSupportRequests);
module.exports = router;
