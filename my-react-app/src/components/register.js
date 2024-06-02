// src/components/register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', { username, password }, {
        headers: {
          'Content-Type': 'application/json'
      }});
      alert('Registration successful');
    } catch (error) {
      console.error('Registration error', error);
      alert('Registration failed');
    }
  };

  return (
    <form class="form-center" onSubmit={handleRegister}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;