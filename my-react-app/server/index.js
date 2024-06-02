const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// Enable CORS
app.use(cors({
  origin: 'https://nft-browser.vercel.app',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());

// PostgreSQL pool setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

console.log(process.env.DATABASE_URL)

// Register/Login
const jwtSecretKey = process.env.JWT_SECRET;

app.post('https://nft-browser.vercel.app/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('https://nft-browser.vercel.app/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      console.log('error length 0');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('error no match');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.log('error other');
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});