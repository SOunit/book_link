import pgClient from '../util/database';

pgClient.on('connect', (client) => {
  // initialize db by creating values table with number column
  client
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch((err) => console.error(err));
});

class Value {
  number: number;

  constructor(number: number) {
    this.number = number;
  }

  save() {
    // return 5;
    return pgClient.query('INSERT INTO values(number) VALUES($1)', [
      this.number,
    ]);
  }

  static fetchAll() {
    // return { rows: [{ number: 18 }] };
    return pgClient.query('SELECT * FROM values');
  }
}

export default Value;
