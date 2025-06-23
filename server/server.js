const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const paymentRoutes = require("./routes/paymentroutes");
app.use("/api", paymentRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
