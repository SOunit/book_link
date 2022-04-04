import { Sequelize } from 'sequelize';
import { keys } from '../util/keys';

const { pgDatabase, pgUser, pgPassword, pgHost } = keys;

export const db = new Sequelize(pgDatabase!, pgUser!, pgPassword!, {
  dialect: 'postgres',
  host: pgHost!,
});
