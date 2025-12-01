const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

// CREATE ORDER
exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        const order = await razorpay.orders.create({
            amount: amount * 100,     // Razorpay works in paise
            currency: "INR",
            receipt: "receipt_" + Date.now()
        });

        res.json({
            success: true,
            orderId: order.id,
            key: process.env.RAZORPAY_KEY_ID
        });

    } catch (err) {
        console.log("RAZORPAY ERROR:", err);
        res.json({ success: false, error: err.message });
    }
};

// VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {
    try {
        const { orderId, paymentId, signature, userId } = req.body;

        const generated = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(orderId + "|" + paymentId)
            .digest("hex");

        if (generated !== signature) {
            return res.json({ success: false, message: "Payment verification failed" });
        }

        // Update user premium status
        await User.findByIdAndUpdate(userId, {
            isPremium: true,
            premiumExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
        });

        res.json({ success: true, message: "Payment verified and premium activated" });

    } catch (err) {
        res.json({ success: false, error: err.message });
    }
};
