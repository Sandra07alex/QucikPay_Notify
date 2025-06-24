const express = require('express');
const router = express.Router();
const UserPayment = require('../models/UserPayment');

// POST: /api/create-payment
router.post('/create-payment', async (req, res) => {
  console.log('🔥 Payment route hit!');
  console.log('📨 Received request body:', req.body);
  console.log('📋 Request headers:', req.headers);
  
  const { fullName, email, mobile, amount } = req.body;

  try {
    // Validate required fields
    if (!fullName || !email || !mobile || !amount) {
      console.log('❌ Validation failed - Missing fields:', {
        fullName: !!fullName,
        email: !!email,
        mobile: !!mobile,
        amount: !!amount
      });
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log('✅ Validation passed, creating payment document...');

    // Create a new payment document
    const newPayment = new UserPayment({
      name: fullName,
      email,
      phone: mobile,
      amount: Number(amount),
    });

    console.log('💾 Attempting to save to MongoDB...');
    
    // Save to MongoDB
    const savedPayment = await newPayment.save();

    console.log('✅ Payment saved successfully:', savedPayment);
    
    res.status(201).json({ 
      message: 'Payment data saved successfully', 
      user: savedPayment 
    });

  } catch (error) {
    console.error('❌ Error saving payment:', error.message);
    console.error('❌ Full error:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: Object.values(error.errors).map(e => e.message)
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Duplicate entry', 
        details: 'A record with this data already exists'
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to save payment', 
      details: error.message 
    });
  }
});

// GET: /api/payments (Optional - for testing)
router.get('/payments', async (req, res) => {
  try {
    const payments = await UserPayment.find().sort({ createdAt: -1 });
    res.json({ payments, count: payments.length });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

module.exports = router;