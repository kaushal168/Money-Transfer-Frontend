import React, { useState } from 'react';
import axios from 'axios';
import './CreateAccount.css';

const CreateAccount: React.FC = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateAccount = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/customers/create-account?username=${username}`);
      if (response.status === 200) {
        setMessage('Account created successfully.');
      }
    } catch (error) {
      setMessage('Failed to create an account.');
    }
  };

  return (
    <div className="create-account-container">
      <h2>Create Bank Account</h2>
      <form onSubmit={handleCreateAccount}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Create Account</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateAccount;