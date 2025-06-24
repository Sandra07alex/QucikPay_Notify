import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
  fullName: '',
  email: '',
  mobile: '',
  amount: '',
};

function PaymentForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.mobile.trim()) errs.mobile = 'Mobile Number is required';
    else if (!/^\d{7,15}$/.test(form.mobile)) errs.mobile = 'Invalid mobile number';
    if (!form.amount) errs.amount = 'Amount is required';
    else if (isNaN(form.amount) || Number(form.amount) <= 0) errs.amount = 'Enter a valid amount';
    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSuccess('');
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess('');
    setError('');
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    console.log('Submitting:', form);

    setLoading(true);
    try {
      const paymentData = {
        fullName: form.fullName,
        email: form.email,
        mobile: form.mobile,
        amount: Number(form.amount),
      };
      
      console.log('Sending payment data:', paymentData);
      
      // Use full URL if backend is on different port
      const response = await axios.post('http://localhost:5000/api/create-payment', paymentData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Payment response:', response.data);
      setSuccess('Payment request created successfully!');
      setForm(initialState);
    } catch (err) {
      console.error('Payment error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.error || 'Failed to create payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        {errors.fullName && <div className="error-message">{errors.fullName}</div>}
      </div>
      <div>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="mobile">Mobile Number</label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          required
        />
        {errors.mobile && <div className="error-message">{errors.mobile}</div>}
      </div>
      <div>
        <label htmlFor="amount">Amount to Pay</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
          min="1"
          step="0.01"
        />
        {errors.amount && <div className="error-message">{errors.amount}</div>}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Proceed to Payment'}
      </button>
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}

export default PaymentForm;