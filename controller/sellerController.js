const Seller = require("../models/SellerSchema");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new seller
    const seller = new Seller({
      name,
      email,
      password,
    });

    // Save the seller to the database
    await seller.save();

    res
      .status(201)
      .json({ message: "Seller created successfully", sellerId: seller._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the seller exists
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    if (seller.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", sellerId: seller._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login };
