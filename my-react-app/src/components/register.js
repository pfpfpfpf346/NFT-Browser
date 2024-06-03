// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { username, password });
      alert('Registration successful');
    } catch (error) {
      if (error.response) {
        console.error('response error', error.response);
      } else if (error.request) {
        console.error('request error', error.request);
      } else {
        console.error('message error', error.message);
      }
      console.error('Registration error', error);
      alert('Registration failed');
    }
  };

  return (
    <form className="form-center" onSubmit={handleRegister}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;