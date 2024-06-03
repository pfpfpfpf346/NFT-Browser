const { Client } = require('pg');
const axios = require('axios');
require('dotenv').config();
const bcrypt = require('bcryptjs');

// Initialize a PostgreSQL client
const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  
  // Connect to the PostgreSQL database
  client.connect();
  
  // Handler function
  module.exports = async (req, res) => {
    try {
      // Assuming req.body contains the username and password sent by the client
      const { username, password } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Prepare the SQL query to insert data into the database
      const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
      const values = [username, hashedPassword];
  
      // Execute the query
      const dbResponse = await client.query(query, values);
      const newUser = dbResponse.rows[0]; // Assuming the first row is the newly inserted user
  
      // Return success response
      res.status(201).json({ success: true, user: newUser });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };