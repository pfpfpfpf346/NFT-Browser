// api/login.js
const { Client } = require('pg');
require('dotenv').config();
const bcrypt = require('bcryptjs');

// Initialize a PostgreSQL client
const client = new Client({
        connectionString: process.env.POSTGRES_URL
    });
  
// Connect to the PostgreSQL database
client.connect();

module.exports = async (req, res) => {

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { username, password } = req.body;

    try {
        const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: user.id }, jwtSecretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
