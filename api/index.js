// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pgClient = require('./util/database');

pgClient.on('connect', (client) => {
  // initialize db by creating values table with number column
  client
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch((err) => console.error(err));
});

// FIXME
// move all setup routes to router
// after making pgClient accessible from other files
app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values');
  res.send(values.rows);
});

app.post('/values', async (req, res) => {
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

app.listen(5000, (err) => {
  console.log('Listening');
});
