import React from 'react';
import './App.css';
import PaymentForm from './PaymentForm';

function App() {
  return (
    <div className="app-container">
      <div className="card">
        <h2>QuickPay Notify</h2>
        <PaymentForm />
      </div>
    </div>
  );
}

export default App; 