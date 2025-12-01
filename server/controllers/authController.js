const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check existing
        const exists = await User.findOne({ email });
        if (exists) return res.json({ success: false, message: "Email already exists" });

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            email,
            password: hashed
        });

        res.json({ success: true, message: "Registered successfully" });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.json({ success: false, message: "User not found" });

        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.json({ success: false, message: "Invalid password" });

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({
            success: true,
            token,
            user: {
                email: user.email,
                isPremium: user.isPremium,
                premiumExpiry: user.premiumExpiry
            }
        });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
};
