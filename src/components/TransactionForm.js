import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTransaction } from '../redux/moneySlice';

const TransactionForm = () => {
  const { budgets } = useSelector(state => state.money);
  const dispatch = useDispatch();
  const [transaction, setTransaction] = useState({
    amount: '',
    type: 'debit',
    category: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transaction.amount && transaction.category) {
      dispatch(addTransaction(transaction));
      setTransaction({
        amount: '',
        type: 'debit',
        category: '',
        description: ''
      });
    }
  };

  return (
    <div className="transaction-form">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={transaction.amount}
            onChange={(e) => setTransaction({...transaction, amount: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Type</label>
          <select
            value={transaction.type}
            onChange={(e) => setTransaction({...transaction, type: e.target.value})}
            required
          >
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select
            value={transaction.category}
            onChange={(e) => setTransaction({...transaction, category: e.target.value})}
            required
          >
            <option value="">Select Category</option>
            {budgets.map(budget => (
              <option key={budget.id} value={budget.name}>{budget.name}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={transaction.description}
            onChange={(e) => setTransaction({...transaction, description: e.target.value})}
          />
        </div>
        
        <button type="submit" className="submit-btn">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;