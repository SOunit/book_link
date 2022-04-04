import { Model, DataTypes } from 'sequelize';
import { db } from '../../config/database.config';
import { Item } from './item';
import { User } from './user';

interface UserItemAttributes {
  UserId: string;
  ItemId: string;
}

export class UserItem extends Model<UserItemAttributes> {}

UserItem.init(
  {
    userId: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id',
      },
    },
    itemId: {
      type: DataTypes.STRING,
      references: {
        model: Item,
        key: 'id',
      },
    },
  },
  { sequelize: db, tableName: 'userItems' },
);
