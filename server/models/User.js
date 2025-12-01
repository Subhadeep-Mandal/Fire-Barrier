const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isPremium: { type: Boolean, default: false },
  premiumExpiry: { type: Date, default: null }
});

module.exports = mongoose.model("User", UserSchema);
