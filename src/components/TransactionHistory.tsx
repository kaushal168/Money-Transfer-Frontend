// src/components/TransactionHistory.tsx
import React, { useState, useEffect } from 'react';
import './TransactionHistory.css';

interface Transaction {
  id: string;
  senderUsername: string;
  receiverUsername: string;
  amount: number;
  timestamp: string;
}

interface TransactionHistoryProps {
  authDetails: {
    username: string;
    password: string;
  };
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ authDetails }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      const { username, password } = authDetails;
      if (!username || !password) {
        setErrorMessage('Missing username or password. Please log in first.');
        return;
      }
      const basicAuth = 'Basic ' + window.btoa(`${username}:${password}`);

      try {
        const response = await fetch(`http://localhost:8080/transactions/history/${username}`, {
          method: 'GET',
          headers: {
            'Authorization': basicAuth,
            'Content-Type': 'application/json',
          },
        });

          if (response.ok) {
            const data = await response.json();
            setTransactions(data);
          } else {
            setErrorMessage('Failed to fetch transaction history.');
          }
        } catch (err) {
          setErrorMessage('An error occurred while fetching data.');
        }
    };

    fetchTransactionHistory();
  }, [authDetails]);

  return (
    <div className="transaction-history-container">
      <h2>Transaction History</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {transactions.length > 0 ? (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Sender Account</th>
              <th>Receiver Account</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.senderUsername}</td>
                <td>{transaction.receiverUsername}</td>
                <td>{transaction.amount}</td>
                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
};

export default TransactionHistory;