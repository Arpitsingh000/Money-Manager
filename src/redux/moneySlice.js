import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  transactions: [],
  budgets: []
};

const moneySlice = createSlice({
  name: 'money',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const { amount, type, category, description } = action.payload;
      const amt = Number(amount);

      const newTransaction = {
        id: Date.now(),
        amount: amt,
        type,
        category,
        description,
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString()
      };

      state.transactions.unshift(newTransaction);

      const budgetIndex = state.budgets.findIndex(budget => budget.name === category);
      if (budgetIndex !== -1) {
        if (type === 'debit') {
          state.budgets[budgetIndex].used += amt;
          state.budgets[budgetIndex].left -= amt;
        } else {
          state.budgets[budgetIndex].used -= amt;
          state.budgets[budgetIndex].left += amt;
        }
      }

      if (type === 'debit') {
        state.totalExpenses += amt;
        state.balance -= amt;
      } else {
        state.totalIncome += amt;
        state.balance += amt;
      }
    },
    addBudget: (state, action) => {
      const { name, amount } = action.payload;
      state.budgets.push({
        id: Date.now(),
        name,
        amount: Number(amount),
        used: 0,
        left: Number(amount)
      });
    }
  }
});

export const { addTransaction, addBudget } = moneySlice.actions;
export default moneySlice.reducer;