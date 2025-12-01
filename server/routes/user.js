const router = require("express").Router();
const auth = require("../middleware/auth");
const { getStatus } = require("../controllers/userController");

// Protected route
router.get("/user/status", auth, getStatus);

module.exports = router;
