const Sequelize = require('sequelize');

const keys = require('./keys');

export const sequelize = new Sequelize(
  keys.pgDatabase,
  keys.pgUser,
  keys.pgPassword,
  {
    dialect: 'postgres',
    host: keys.pgHost,
  },
);
