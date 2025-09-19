import User from "../backend/models/user.model.js";
import mongoose from "mongoose";

// Passenger Registration
export const registerUser = async (req, res) => {
    try {
        const { name, email, studentId, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user (⚠️ store password hashed in production)
        const newUser = new User({
            name,
            email,
            studentId,
            password
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check password (plain text comparison - not secure)
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Successful login
        res.status(200).json({ 
            message: "Login successful", 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                score: user.score,
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // exclude password
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Update user score by name and increment attempts
export const updateUserScore = async (req, res) => {
    try {
        const { name } = req.params;
        const { score } = req.body;

        // Find user by name, update score, and increment attempts
        const updatedUser = await User.findOneAndUpdate(
            { name },
            { 
                score,                // update score
                $inc: { attempts: 1 } // increment attempts by 1
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ 
            message: "Score updated and attempt recorded successfully", 
            user: updatedUser 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get user by name
export const getUserByName = async (req, res) => {
    try {
        const { name } = req.params;
        const user = await User.findOne({ name }).select("-password"); // exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateUserByName = async (req, res) => {
  try {
    const { name } = req.params; // user name from URL
    const updates = req.body;    // fields to update (attempts, score, etc.)

    // Find and update user
    const user = await User.findOneAndUpdate(
      { name },        // find by name
      { $set: updates },
      { new: true }    // return updated user
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Change user password using name + email
export const changePassword = async (req, res) => {
  try {
    const { name, email, newPassword } = req.body;

    // Validate input
    if (!name || !email || !newPassword) {
      return res.status(400).json({ message: "Name, email, and new password are required" });
    }

    // Find user
    const user = await User.findOne({ name, email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update password (⚠️ plain text, use bcrypt in production!)
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
