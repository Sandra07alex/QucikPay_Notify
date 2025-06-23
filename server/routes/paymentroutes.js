const express = require("express");
const router = express.Router();
const axios = require("axios");
const UserPayment = require("../models/UserPayment");

// POST /api/create-payment
router.post("/create-payment", async (req, res) => {
  const { name, email, phone, amount } = req.body;

  try {
    // Save user with pending status
    const user = await UserPayment.create({ name, email, phone, amount });

    // Step 1: Call Cashfree API here (Token or Hosted Checkout)
    // Step 2: Respond with payment link or form data (we'll add this)

    res.status(200).json({ message: "Payment data saved", user });
  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({ error: "Failed to create payment" });
  }
});

module.exports = router;
