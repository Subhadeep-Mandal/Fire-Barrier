const User = require("../models/User");

exports.getStatus = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        return res.json({
            success: true,
            isPremium: user.isPremium,
            premiumExpiry: user.premiumExpiry
        });
    } catch (err) {
        return res.json({ success: false, error: err.message });
    }
};
