// server.js
const express = require('express');
const { Pool } = require('pg'); // PostgreSQL client
const cors = require('cors');

// Create an Express application
const app = express();
const port = 8000;

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Middleware to parse JSON requests

// Create a pool to connect to PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Using the environment variable defined in Docker Compose
});

app.get('/api/stations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM station_info'); // Query to fetch station data
    res.status(200).json(result.rows); // Send back the rows from the database as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// server.js (Node.js API)
app.get('/api/regions', async (req, res) => {
    try {
      const result = await pool.query('SELECT DISTINCT region_id FROM station_info');
      res.status(200).json(result.rows); // Return unique region IDs
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.get('/api/stations/:region_id', async (req, res) => {
    const { region_id } = req.params;
  
    try {
      const result = await pool.query('SELECT short_name, station_id FROM station_info WHERE region_id = $1', [region_id]);
      res.status(200).json(result.rows); // Return stations in the selected region
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
// Start the server
app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});
