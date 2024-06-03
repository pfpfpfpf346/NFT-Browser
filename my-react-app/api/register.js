const express = require('express');
const bcryptjs = require('bcryptjs');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors({
    origin: 'https://nft-browser.vercel.app',
  }));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
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

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});