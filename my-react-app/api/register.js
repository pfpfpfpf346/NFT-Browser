const { Client } = require('pg');
const axios = require('axios');
require('dotenv').config();

// Initialize a PostgreSQL client
const client = new Client({
  connectionString: process.env.DATABASE_URL
});

// Connect to the PostgreSQL database
client.connect();

// Handler function
module.exports = async (req, res) => {
  try {
    // Assuming req.body contains registration data (e.g., username, email, password)
    const { username, password } = req.body;

    // Insert new user into the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const values = [username, hashedPassword];

    const dbResponse = await client.query(query, values);
    const newUser = dbResponse.rows[0]; // Assuming the first row is the newly inserted user

    // Post the registration data to another endpoint
    await axios.post(process.env.DATABASE_URL, newUser);

    // Return success response
    res.status(200).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};