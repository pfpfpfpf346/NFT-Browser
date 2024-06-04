import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert data to JSON before sending the fetch request
    const body = JSON.stringify({ username, password });

    try {
      const response = await fetch('https://nft-browser.vercel.app/api/login', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
      });

      // Check for successful response
      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Login successful');
        navigate('/'); // Redirect to home page or desired location after login
      } else {
        console.error('Login successful but no token received');
        alert('Login successful but authorization might fail');
      }
    } catch (error) {
      console.error('Login error', error);
      alert('Login failed'); // More informative message
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

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