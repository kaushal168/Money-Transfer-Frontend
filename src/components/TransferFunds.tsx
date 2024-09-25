import React, { useState } from 'react';
import axios from 'axios';
import './TransferFunds.css';

const TransferFunds: React.FC = () => {
  const [senderUsername, setSenderUsername] = useState('');
  const [senderAccountNumber, setSenderAccountNumber] = useState('');
  const [senderPassword, setSenderPassword] = useState('');
  const [receiverUsername, setReceiverUsername] = useState('');
  const [receiverAccountNumber, setReceiverAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    if (!senderUsername || !senderAccountNumber || !senderPassword || !receiverUsername || !receiverAccountNumber || !amount){
      setErrorMessage('Please fill in all fields.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleTransfer = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    const transferData = {
      senderUsername,
      senderAccountNumber,
      senderPassword,
      receiverUsername,
      receiverAccountNumber,
      amount: parseFloat(amount),
    };

    // Create a Base64-encoded Basic Auth string
    const basicAuth = 'Basic ' + window.btoa(`${senderUsername}:${senderPassword}`);

    try {
      const response = await axios.post('http://localhost:8080/transactions/transfer', transferData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth,
        },
      });
      if (response.status === 200) {
        setMessage('Transfer successful!');
      } else {
        setMessage('Failed to transfer funds. Please try again.');
      }
    } catch (error) {
      console.log(error);
      setMessage('Error occurred while transferring funds.');
    }
  };

  return (
    <div className="transfer-funds-container">
      <h2>Transfer Funds</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleTransfer}>
        <input
          type="text"
          placeholder="Sender Username"
          value={senderUsername}
          onChange={(e) => setSenderUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sender Account Number"
          value={senderAccountNumber}
          onChange={(e) => setSenderAccountNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Sender Password"
          value={senderPassword}
          onChange={(e) => setSenderPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Receiver Username"
          value={receiverUsername}
          onChange={(e) => setReceiverUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Receiver Account Number"
          value={receiverAccountNumber}
          onChange={(e) => setReceiverAccountNumber(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Transfer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TransferFunds;