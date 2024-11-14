const Admin = require("../models/AdminSchema");
const adminAuth = async (req, res) => {
  console.log("---------request body------------", req.body);
  try {
    const { email, password } = req.body;
    const admin = await Admin.find({ email });
    console.log("---------admin------------", admin);
    if (!admin) {
      res.status(500).json({
        success: false,
        data: "admin is not available",
      });
    }

    if (admin[0].password !== password) {
      console.log("inside password condition ");
      return res.status(500).json({
        success: false,
        data: "password is incorrect",
      });
    }
    return res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

const adminSignup = async (req, res) => {
  console.log("---------request body------------", req.body);
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        data: "Admin already exists",
      });
    }

    // Create new admin
    const newAdmin = new Admin({
      email,
      password, // Store the plain password (not recommended for production)
    });

    // Save admin to database
    await newAdmin.save();

    return res.status(201).json({
      success: true,
      data: "Admin created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = { adminAuth, adminSignup };
