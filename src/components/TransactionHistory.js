import React from 'react';
import { useSelector } from 'react-redux';

const TransactionHistory = () => {
  const { transactions } = useSelector(state => state.money);

  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Category</th>
              <th>Description</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{transaction.time}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description || '-'}</td>
                <td className={transaction.type === 'credit' ? 'credit' : 'debit'}>
                  {transaction.type}
                </td>
                <td>Rs. {transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;