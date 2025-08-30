import Admin from "../backend/models/admin.model.js";

// Admin Registration
export const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // Create new admin
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();

        res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin Login
export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find admin by username
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Check password (plain text for now)
        if (admin.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            message: "Admin login successful",
            admin: {
                _id: admin._id,
                username: admin.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
