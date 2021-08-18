const express = require('express');

// const setupController = require('../controllers/setup');
const pgClient = require('../util/database');
pgClient.on('connect', (client) => {
  // initialize db by creating values table with number column
  client
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch((err) => console.error(err));
});

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('hi');
});

router.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values');
  // values.rows = [ { number: 5 }, { number: 7 }, { number: 3 } ]
  res.send(values.rows);
});

router.post('/values', async (req, res) => {
  // parseInt returns number or NaN
  let index = parseInt(req.body.index);

  // set -1 if index is not a number
  if (isNaN(index)) {
    index = -1;
  }

  // update db
  pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);
  res.send({ working: true });
});

module.exports = router;
