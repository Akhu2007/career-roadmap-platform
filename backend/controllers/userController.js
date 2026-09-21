const careers = require("../utils/careerData");
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        careerGoal: user.careerGoal,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateCareerGoal = async (req, res) => {
  try {
    const { careerGoal } = req.body;

    // Check whether career exists
    if (!careers[careerGoal]) {
      return res.status(400).json({
        message: "Invalid career goal",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { careerGoal },
      { new: true },
    ).select("-password");

    res.status(200).json({
      message: "Career goal updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET CURRENT LOGGED-IN USER
const getMe = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateCareerGoal,
};
