const keys = require('./keys');

// Postgres client setup
import { Pool } from 'pg';
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

export default pgClient;
