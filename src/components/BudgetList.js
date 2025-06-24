import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBudget } from '../redux/moneySlice';

const BudgetList = () => {
  const { budgets } = useSelector(state => state.money);
  const dispatch = useDispatch();
  const [newBudget, setNewBudget] = useState({ name: '', amount: '' });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newBudget.name && newBudget.amount) {
      dispatch(addBudget(newBudget));
      setNewBudget({ name: '', amount: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="budget-list">
      <div className="budget-header">
        <h2>Budgets</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>Add Budget</button>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit} className="budget-form">
          <input
            type="text"
            placeholder="Budget Name"
            value={newBudget.name}
            onChange={(e) => setNewBudget({...newBudget, name: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={newBudget.amount}
            onChange={(e) => setNewBudget({...newBudget, amount: e.target.value})}
            required
          />
          <button type="submit">Add</button>
        </form>
      )}
      
      <table className="budget-table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>BUDGET</th>
            <th>USED AMOUNT</th>
            <th>BALANCE LEFT</th>
            <th>EDIT</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map(budget => (
            <tr key={budget.id}>
              <td>{budget.name}</td>
              <td>Rs. {budget.amount}</td>
              <td>
                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${(budget.used / budget.amount) * 100}%` }}
                  ></div>
                  <span>Rs. {budget.used}</span>
                </div>
              </td>
              <td>Rs. {budget.left}</td>
              <td>
                <button className="edit-btn">✏️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetList;