// Express App Setup
import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');

import setupRouter from './routes/setup';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// route setup
app.use(setupRouter);

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
