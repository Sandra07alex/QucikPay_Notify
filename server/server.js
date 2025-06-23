const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to local MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB (local)");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
