import Sequelize from 'sequelize';
import sequelize from '../../util/database';
import { Item } from './item';
import { User } from './user';

export const UserItem = sequelize.define('userItem', {
  userId: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: 'id',
    },
  },
  itemId: {
    type: Sequelize.STRING,
    references: {
      model: Item,
      key: 'id',
    },
  },
});
