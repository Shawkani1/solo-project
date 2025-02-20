const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM donors`
    pool.query(sqlText)
        .then((result) =>{
            console.log('Got stuff back from the database', result)
            res.send(result.rows);
        })
        .catch((error) => {
          console.log(`Error making database query ${sqlText}`, error)
          res.sendStatus(500);
        })
  });
    

  router.post('/', (req, res) =>{
    const NewDonor = req.body
    const sqlText = `INSERT INTO donors (name, email, phone, address, amount) VALUES ($1, $2, $3, $4, $5)`;
    pool.query(sqlText, [NewDonor.name, NewDonor.email, NewDonor.phone, NewDonor.address, NewDonor.amount])
        .then((result) =>{
          console.log(`Added new Donor to the Database`, NewDonor);
          res.sendStatus(201)
        })
        .catch((error) =>{
          console.log(`Error making database query ${sqlText}`, error);
          res.sendStatus(500)
        })
  
  });




router.put('/donors/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { Name, email, phone, address, Amount } = req.body;
      const result = await pool.query(
        'UPDATE "donors" SET "name" = $1, "email" = $2, "phone" = $3, "address" = $4, "amount" = $5 WHERE "donor_id" = $6 RETURNING *',
        [Name, email, phone, address, Amount, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Donor not found' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('DELETE FROM "donors" WHERE "donor_id" = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Donor not found' });
      }
      res.json({ message: 'Donor deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;