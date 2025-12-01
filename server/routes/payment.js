const router = require("express").Router();
const { createOrder, verifyPayment } = require("../controllers/paymentController");

router.post("/payment/order", createOrder);
router.post("/payment/verify", verifyPayment);

module.exports = router;
