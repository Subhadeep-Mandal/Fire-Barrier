const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header) {
            return res.json({ success: false, message: "No token provided" });
        }

        const token = header.replace("Bearer ", "");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (err) {
        return res.json({ success: false, message: "Invalid token" });
    }
};
