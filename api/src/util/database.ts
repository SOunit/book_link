const Sequelize = require('sequelize');

const keys = require('./keys');

const sequelize = new Sequelize(keys.pgDatabase, keys.pgUser, keys.pgPassword, {
  dialect: 'postgres',
  host: keys.pgHost,
});

export default sequelize;
