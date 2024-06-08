// server/index.js
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();
const authenticateToken = require('./middleware/auth');
const winston = require('winston');

// Configure Winston logger + test
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' }),
  ],
});
logger.info('hello world!');


const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const jwtSecretKey = process.env.JWT_SECRET;

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    logger.info("pool query")
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      logger.info("no match")
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/account', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});