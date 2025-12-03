const router = require("express").Router();
const auth = require("../middleware/auth");
const { getStatus } = require("../controllers/userController");
const User = require("../models/User");

// Existing protected route
router.get("/user/status", auth, getStatus);

// NEW: Check if user is already premium
router.post("/verify-premium", async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            isPremium: user.isPremium,
            premiumExpiry: user.premiumExpiry
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

module.exports = router;
