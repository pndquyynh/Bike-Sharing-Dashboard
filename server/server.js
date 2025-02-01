// server.js
const express = require('express');
const { Pool } = require('pg'); // PostgreSQL client
const cors = require('cors');
// const { DateTime } = require('luxon');

// Create an Express application
const app = express();
const port = 8000;

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Middleware to parse JSON requests

// Create a pool to connect to PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Using the environment variable defined in Docker Compose
});

// app.get('/api/stations', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM station_info'); // Query to fetch station data
//     res.status(200).json(result.rows); // Send back the rows from the database as JSON
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// server.js (Node.js API)
app.get('/api/regions', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM regions');
      res.status(200).json(result.rows); // Return unique region IDs
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.get('/api/stations-list/:region_id', async (req, res) => {
    const { region_id } = req.params;
  
    try {
      const result = await pool.query('SELECT * FROM station_info WHERE region_id = $1', [region_id]);
      res.status(200).json(result.rows); // Return stations in the selected region
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // API endpoint to get the station status
app.get('/api/station-status/:station_id', async (req, res) => {
  const { station_id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM station_status WHERE short_name = $1', [station_id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Station not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.get('/api/station-info/:station_id', async (req, res) => {
//   const { station_id } = req.params;  // Expecting station_id to be passed as short_name

//   try {
//     const result = await pool.query('SELECT * FROM station_info WHERE short_name = $1', [station_id]);
//     if (result.rows.length > 0) {
//       res.status(200).json(result.rows[0]); // Return station status
//     } else {
//       res.status(404).json({ error: 'Station not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// Start the server
app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});
