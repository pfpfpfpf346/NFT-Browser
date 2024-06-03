const { Client } = require('pg');
require('dotenv').config();

// Initialize a PostgreSQL client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Connect to the PostgreSQL database
client.connect();

// Handler function
module.exports = async (req, res) => {
  try {
    // Assuming req.body contains the data to be inserted into the database
    const { username, password} = req.body;

    // Prepare the SQL query to insert data into the database
    const query = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *';
    const values = [username, password];

    // Execute the query
    const dbResponse = await client.query(query, values);

    // Extract the inserted data (assuming the first row is the newly inserted record)
    const newUser = dbResponse.rows[0];

    // Return the inserted data in the response
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error posting to database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};