require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Route imports
const authRoutes = require("./server/routes/auth");
const userRoutes = require("./server/routes/user");
const paymentRoutes = require("./server/routes/payment");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", paymentRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
