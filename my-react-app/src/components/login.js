import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    // Add authentication logic here
    if (username === '' || password === '') {
      alert('Please enter both username and password');
    }
    try {
      const response = await axios.post('/login', { username, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
    } catch (error) {
      console.error('Login error', error);
      alert('Invalid credentials');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <div>
      <h1 align="center">Login</h1>
      <form class="form-center" onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div align="center">
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Login;