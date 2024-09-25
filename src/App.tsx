import React, { useState } from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import TransferFunds from './components/TransferFunds';
import TransactionHistory from './components/TransactionHistory';

function App() {
  const [view, setView] = useState('register');
  const [authDetails, setAuthDetails] = useState<{ username: string; password: string }>({ username: '', password: '' });
    
  return (
    <div className="App">
      <div className="toggle-buttons">
        <button onClick={() => setView('register')}>Register</button>
        <button onClick={() => setView('login')}>Login</button>
        <button onClick={() => setView('createAccount')}>Create Account</button>
        <button onClick={() => setView('transferFunds')}>Transfer Funds</button>
        <button onClick={() => setView('transactionHistory')}>Transaction History</button>
      </div>
      {view === 'register' && <Register />}
      {view === 'login' && <Login setAuthDetails={setAuthDetails} />}
      {view === 'createAccount' && <CreateAccount />}
      {view === 'transferFunds' && <TransferFunds />}
      {view === 'transactionHistory' && <TransactionHistory authDetails={authDetails} />}
    </div>
  );
}

export default App;