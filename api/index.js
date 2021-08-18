// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// route setup
const setupRouter = require('./routes/setup');
app.use(setupRouter);

app.listen(5000, (err) => {
  console.log('Listening');
});
