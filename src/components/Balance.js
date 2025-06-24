import React from 'react';
import { useSelector } from 'react-redux';

const Balance = () => {
  const { budgets, balance } = useSelector(state => state.money);


  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalUsed = budgets.reduce((sum, b) => sum + b.used, 0);
  const totalLeft = totalBudget - totalUsed;

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <h3>Total Budget</h3>
        <p>Rs. {totalBudget}</p>
      </div>
      <div className="summary-card">
        <h3>Total Used</h3>
        <p>Rs. {totalUsed}</p>
      </div>
      <div className="summary-card balance">
        <h3>Current Balance</h3>
        <p style={{ color: balance < 0 ? 'green' : 'red' }}>Rs. {totalLeft}</p>
      </div>
    </div>
  );
};

export default Balance;
