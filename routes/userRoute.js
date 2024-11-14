const express = require("express");
const { userLogin, userSignup } = require("../controller/userController");
const router = express.Router();
router.post("/login", userLogin);
router.post("/signup", userSignup);
module.exports = router;
