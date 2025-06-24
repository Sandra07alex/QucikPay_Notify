const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variable or fallback to local MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/quickpay_notify";

console.log("Attempting to connect to MongoDB...");
console.log("MongoDB URI:", mongoURI);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB Connected successfully");
  console.log("Database:", mongoose.connection.db.databaseName);
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  console.error("Please make sure MongoDB is running and the connection string is correct");
  process.exit(1);
});

const paymentRoutes = require("./routes/paymentroutes");
app.use("/api", paymentRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
