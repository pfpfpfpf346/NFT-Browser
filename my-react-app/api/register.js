// api/register.js
console.log('hi2')
const { Client } = require('pg');
require('dotenv').config();
const bcrypt = require('bcryptjs');

// Initialize a PostgreSQL client
const client = new Client({
        connectionString: process.env.POSTGRES_URL
    });
  
// Connect to the PostgreSQL database
client.connect();
console.log('hi3')
  
// Handler function
module.exports = async (req, res) => {

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
        const values = [username, hashedPassword];
    
        const dbResponse = await client.query(query, values);
        const newUser = dbResponse.rows[0];
    
        return res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};