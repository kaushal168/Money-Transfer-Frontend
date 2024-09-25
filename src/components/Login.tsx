import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

interface LoginProps {
  setAuthDetails: (authDetails: { username: string; password: string }) => void;
}

const Login: React.FC<LoginProps> = ({ setAuthDetails }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/auth/login?username=${username}&password=${password}`);
      if (response.status === 200) {
        setMessage('Login successful');
        setAuthDetails({ username, password });
      }
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login Customer</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;