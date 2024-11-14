const Support = require("../models/SupportSchema");

// Add a support request
const addSupportRequest = async (req, res) => {
  console.log("---------request body------------", req.body);
  try {
    const { name, phone, email, subject, message } = req.body;

    const newSupportRequest = new Support({
      name,
      phone,
      email,
      subject,
      message,
    });

    // Save the support request to the database
    await newSupportRequest.save();

    return res.status(201).json({
      success: true,
      data: "Support request created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Get all support requests
const getAllSupportRequests = async (req, res) => {
  console.log("---------fetching all support requests------------");
  try {
    const supportRequests = await Support.find();

    return res.status(200).json({
      success: true,
      data: supportRequests,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  addSupportRequest,
  getAllSupportRequests,
};
