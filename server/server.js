const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


app.get('/api/regions', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM regions');
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.get('/api/stations-list/:region_id', async (req, res) => {
    const { region_id } = req.params;
  
    try {
      const result = await pool.query('SELECT * FROM station_info WHERE region_id = $1', [region_id]);
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.get('/api/station-status/:station_id', async (req, res) => {
  const { station_id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM station_status WHERE short_name = $1', [station_id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ error: 'Station not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/status-date', async (req, res) => {

  try {
    const result = await pool.query('SELECT Distinct last_updated FROM station_status');
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ error: 'Date not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });

  }
});

app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});
