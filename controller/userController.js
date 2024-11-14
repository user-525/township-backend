const User = require("../models/UserSchema");

const userSignup = async (req, res) => {
  console.log("controller is working fine");
  const { phoneNumber, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const user = new User({
      phoneNumber,
      email,
      password,
    });

    // Save the user to the database
    await user.save();

    res
      .status(201)
      .json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { userSignup, userLogin };
