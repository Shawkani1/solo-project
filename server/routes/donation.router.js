const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Create a new donor
router.post('/donors', async (req, res) => {
    try {
      const { Name, email, phone, address } = req.body;
      const result = await pool.query(
        `INSERT INTO donors ("Name", email, phone, address)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [Name, email, phone, address]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating donor:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Retrieve all donors
router.get('/donors', async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM donors`);
      res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving donors:', error);
      res.status(500).json({ error: error.message });
    }
  });

// Retrieve a single donor by ID
router.get('/donors/:donor_id', async (req, res) => {
    try {
      const { donor_id } = req.params;
      const result = await pool.query(
        `SELECT * FROM donors WHERE donor_id = $1`,
        [donor_id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Donor not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error retrieving donor:', error);
      res.status(500).json({ error: error.message });
    }
  });




module.exports = router;