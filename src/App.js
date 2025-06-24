import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header';
import Balance from './components/Balance';
import BudgetList from './components/BudgetList';
import TransactionForm from './components/TransactionForm';
import TransactionHistory from './components/TransactionHistory';
import './styles.css';
import './App.css';


function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <div className="main-content">
          <div className="left-panel">
            <Balance />
            <TransactionForm />
          </div>
          <div className="right-panel">
            <BudgetList />
            <TransactionHistory />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;