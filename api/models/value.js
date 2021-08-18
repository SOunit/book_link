// const setupController = require('../controllers/setup');
const pgClient = require('../util/database');
pgClient.on('connect', (client) => {
  // initialize db by creating values table with number column
  client
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch((err) => console.error(err));
});

module.exports = class Value {
  constructor(number) {
    this.number = number;
  }

  save() {
    return pgClient.query('INSERT INTO values(number) VALUES($1)', [
      this.number,
    ]);
  }

  static fetchAll() {
    return pgClient.query('SELECT * FROM values');
  }
};
