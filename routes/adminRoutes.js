const express = require("express");
const { adminAuth, adminSignup } = require("../controller/adminController");
const router = express.Router();
router.post("/login", adminAuth);
router.post("/signup", adminSignup);
module.exports = router;
