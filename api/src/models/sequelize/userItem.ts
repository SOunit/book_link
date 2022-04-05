import { Model, DataTypes } from 'sequelize';
import { db } from '../../config/database.config';

interface UserItemAttributes {
  UserId: string;
  ItemId: string;
}

export class UserItem extends Model<UserItemAttributes> {}

UserItem.init(
  {
    UserId: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    ItemId: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'Items',
        key: 'id',
      },
    },
  },
  { sequelize: db, modelName: 'UserItem' },
);
